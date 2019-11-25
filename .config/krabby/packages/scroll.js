class Scroll {
  constructor() {
    this.element = document.scrollingElement
    this.step = 70
    this.behavior = 'smooth'
    this.animation = null
  }
  down(repeat) {
    if (this.behavior === 'smooth') {
      this.animate(() => this.element.scrollTop += this.step / 4, repeat)
    } else {
      this.element.scrollBy({ top: this.step })
    }
  }
  up(repeat) {
    if (this.behavior === 'smooth') {
      this.animate(() => this.element.scrollTop -= this.step / 4, repeat)
    } else {
      this.element.scrollBy({ top: -this.step })
    }
  }
  right(repeat) {
    if (this.behavior === 'smooth') {
      this.animate(() => this.element.scrollLeft += this.step / 4, repeat)
    } else {
      this.element.scrollBy({ left: this.step })
    }
  }
  left(repeat) {
    if (this.behavior === 'smooth') {
      this.animate(() => this.element.scrollLeft -= this.step / 4, repeat)
    } else {
      this.element.scrollBy({ left: -this.step })
    }
  }
  pageDown(percent = 0.9) {
    this.element.scrollBy({ top: window.innerHeight * percent, behavior: this.behavior })
  }
  pageUp(percent = 0.9) {
    this.element.scrollBy({ top: -window.innerHeight * percent, behavior: this.behavior })
  }
  // Force instant scroll to top / bottom
  // Reason: The smooth scrolling is too slow on Chrome.
  top() {
    this.element.scrollTo({ top: 0, behavior: 'auto' })
  }
  bottom() {
    this.element.scrollTo({ top: this.element.scrollHeight, behavior: 'auto' })
  }
  // Saka Key – https://key.saka.io
  //
  // Scrolls the selected element smoothly.  Works around the quirks of keydown events.
  // The first time a key is pressed (and held), a keydown event is fired immediately.
  // After that, there is a delay before the second keydown event is fired.
  // The third and all subsequent keydown events fire in rapid succession.
  // event.repeat is false for the first keydown event, but true for all others.
  // The delay (70 and 700) are carefully selected to keep scrolling smooth, but
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
  animate(animation, repeat) {
    // Cancel potential animation being proceeded
    cancelAnimationFrame(this.animation)
    let start = null
    const delay = repeat ? 70 : 700
    const step = (timeStamp) => {
      if (start === null) {
        start = timeStamp
      }
      const progress = timeStamp - start
      animation()
      if (progress < delay) {
        this.animation = requestAnimationFrame(step)
      } else {
        this.animation = null
      }
    }
    requestAnimationFrame(step)
    // End smooth scrolling animation on key-up.
    const onKeyUp = (event) => {
      cancelAnimationFrame(this.animation)
    }
    const once = {
      once: true
    }
    if (! repeat) {
      this.element.addEventListener('keyup', onKeyUp, once)
    }
  }
}
