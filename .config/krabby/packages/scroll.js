class Scroll {
  constructor() {
    this.element = document.scrollingElement
    this.step = 70
    this.fastFactor = 3
    this.pageFactor = 0.9
    this.animation = null
  }
  get fastStep() {
    return this.step * this.fastFactor
  }
  get pageScroll() {
    return window.innerHeight * this.pageFactor
  }
  down(repeat) {
    this.animate('down', this.step, repeat)
  }
  up(repeat) {
    this.animate('up', this.step, repeat)
  }
  right(repeat) {
    this.animate('right', this.step, repeat)
  }
  left(repeat) {
    this.animate('left', this.step, repeat)
  }
  // Honor pageScroll the first time a key is pressed, then fastStep in rapid succession.
  pageDown(repeat) {
    if (repeat) {
      this.animate('down', this.fastStep, repeat)
    } else {
      this.element.scrollBy({ top: this.pageScroll, behavior: 'smooth' })
    }
  }
  pageUp(repeat) {
    if (repeat) {
      this.animate('up', this.fastStep, repeat)
    } else {
      this.element.scrollBy({ top: -this.pageScroll, behavior: 'smooth' })
    }
  }
  // Do not use the built-in methods.
  // Reason: The smooth scrolling is too slow on Chrome.
  //
  // Scrolls the amount needed to reach top / bottom.
  // Reason: Animations are relative.
  top(repeat) {
    this.animate('up', this.element.scrollTop, repeat)
  }
  bottom(repeat) {
    this.animate('down', this.element.scrollHeight - this.element.scrollTop, repeat)
  }
  // Saka Key – https://key.saka.io
  //
  // Scrolls the selected element smoothly.  Works around the quirks of keydown events.
  // The first time a key is pressed (and held), a keydown event is fired immediately.
  // After that, there is a delay before the second keydown event is fired.
  // The third and all subsequent keydown events fire in rapid succession.
  // event.repeat is false for the first keydown event, but true for all others.
  // The delay (step and (step × 10)) are carefully selected to keep scrolling smooth, but
  // prevent unexpected scrolling after the user has released the scroll key.
  // Relying on keyup events exclusively to stop scrolling is unreliable.
  //
  // https://github.com/lusakasa/saka-key/tree/master/src/modes/command/client/commands/scroll
  //
  // Engineering
  // ‾‾‾‾‾‾‾‾‾‾‾
  // Decision:
  // – Start smooth scrolling animation on key-down and end smooth scrolling animation on key-up.
  // Motivation:
  // – Smooth scrolling is surprisingly tricky to get “just right”.
  // – My early attempts all resulted in scrolling for a fraction of a second, then a tiny pause, then smooth scrolling as you’d expect.
  // – I learned that, calling cancelAnimationFrame was a bad idea.
  // – I tried a timeout based solution.
  //
  // https://github.com/lusakasa/saka-key/blob/master/notes/engineering.md
  //
  // Scroll.directions is a { down, up, right, left } interface around scrollTop and scrollLeft properties.
  // To do: Use public static fields when supported by Firefox
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields#Public_static_fields
  static directions() {
    const direction = (direction, sign) => ({ direction, sign })
    return {
      down: direction('scrollTop', 1),
      up: direction('scrollTop', -1),
      right: direction('scrollLeft', 1),
      left: direction('scrollLeft', -1)
    }
  }
  // Function to unify scrolling mechanisms.
  animate(direction, step, repeat) {
    // Use Scroll.directions to abstract scrollTop and scrollLeft, and set its value (positive or negative) accordingly.
    const { direction: directionKey, sign } = Scroll.directions()[direction]
    // longThrow is used for frictions and to prevent installing keyup event.
    const longThrow = step >= this.pageScroll
    // Compute dynamic friction for short, medium and long scroll distances.
    const friction = longThrow
      ? Math.log(Math.pow(step, 2))
      : Math.log(step)
    // Relative animations
    const animation = () => this.element[directionKey] += (step / friction) * sign
    // Cancel potential animation being proceeded
    cancelAnimationFrame(this.animation)
    let start = null
    // Store the last scrollTop and scrollLeft positions to handle animations that stop progressing
    // (because the top or bottom of the page has been reached, for example).
    let lastScrollTop = null
    let lastScrollLeft = null
    // Compute delay value
    const delay = repeat ? step : (step * 10)
    const animationStep = (timeStamp) => {
      if (start === null) {
        start = timeStamp
      }
      const progress = timeStamp - start
      lastScrollTop = this.element.scrollTop
      lastScrollLeft = this.element.scrollLeft
      animation()
      // Continue until done, but prevent further animations when scrolling stops progressing
      // (because the top or bottom of the page has been reached, for example).
      if (progress < delay && this.scrollProgress(lastScrollTop, lastScrollLeft)) {
        this.animation = requestAnimationFrame(animationStep)
      } else {
        this.animation = null
      }
    }
    requestAnimationFrame(animationStep)
    // End smooth scrolling animation on key-up.
    const onKeyUp = (event) => {
      cancelAnimationFrame(this.animation)
    }
    const once = {
      once: true
    }
    // Do not install keyup event on repeat and long jumps.
    if (! (repeat || longThrow)) {
      this.element.addEventListener('keyup', onKeyUp, once)
    }
  }
  scrollProgress(scrollTop, scrollLeft) {
    return (scrollTop !== this.element.scrollTop) || (scrollLeft !== this.element.scrollLeft)
  }
}
