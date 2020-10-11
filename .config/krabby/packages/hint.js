class Hint {

  // Constants ─────────────────────────────────────────────────────────────────

  // TODO: Use public static fields when supported by Firefox.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields#Public_static_fields

  // Key values
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values

  static MODIFIER_KEYS() {
    return ['Shift', 'Control', 'Alt', 'Meta']
  }

  static NAVIGATION_KEYS() {
    return ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp']
  }

  static KEY_MAP() {
    return {
      Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0',
      KeyQ: 'q', KeyW: 'w', KeyE: 'e', KeyR: 'r', KeyT: 't', KeyY: 'y', KeyU: 'u', KeyI: 'i', KeyO: 'o', KeyP: 'p',
      KeyA: 'a', KeyS: 's', KeyD: 'd', KeyF: 'f', KeyG: 'g', KeyH: 'h', KeyJ: 'j', KeyK: 'k', KeyL: 'l',
      KeyZ: 'z', KeyX: 'x', KeyC: 'c', KeyV: 'v', KeyB: 'b', KeyN: 'n', KeyM: 'm'
    }
  }

  // Settings ──────────────────────────────────────────────────────────────────

  static keys() {
    return ['KeyA', 'KeyJ', 'KeyS', 'KeyK', 'KeyD', 'KeyL', 'KeyG', 'KeyH', 'KeyE', 'KeyW', 'KeyO', 'KeyR', 'KeyU', 'KeyV', 'KeyN', 'KeyC', 'KeyM']
  }

  static style() {
    return {
      fontSize: 12,
      textColor: 'hsl(45, 81%, 10%)',
      activeCharacterTextColor: 'hsl(44, 64%, 53%)',
      backgroundColorStart: 'hsl(56, 100%, 76%)',
      backgroundColorEnd: 'hsl(42, 100%, 63%)',
      borderColor: 'hsl(39, 70%, 45%)',
      fontFamilies: ['Roboto', 'sans-serif'],
      fontWeight: 900,
      horizontalPadding: 0.25,
      verticalPadding: 0.15,
      borderWidth: 1,
      borderRadius: 4,
      shadow: true,
      hintCSS: '',
      characterCSS: '',
      activeCharacterCSS: ''
    }
  }

  // Methods ───────────────────────────────────────────────────────────────────

  // Initialization ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

  constructor() {
    this.selectors = '*'
    this.filters = [Hint.isClickable]
    this.keys = Hint.keys()
    this.lock = false
    this.hints = []
    this.inputKeys = []
    this.validatedElements = []
    this.keyMap = Hint.KEY_MAP()

    // State
    this.state = {}
    this.state.observers = []
    this.state.updateRequests = []
    this.state.style = Hint.style()

    // Style
    this.style = {}

    // Events
    this.events = {}
    this.events['validate'] = []
    this.events['start'] = []
    this.events['exit'] = []
  }

  // Style ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

  get style() {
    return this.state.style
  }

  set style(style) {
    Object.assign(this.state.style, style)
  }

  getDocumentStyle() {
    const style = document.createElement('style')

    style.textContent = `
      .hint {
        padding: ${this.style.verticalPadding}rem ${this.style.horizontalPadding}rem;
        border: ${this.style.borderWidth}px solid ${this.style.borderColor};
        text-transform: uppercase;
        text-align: center;
        vertical-align: middle;
        background: linear-gradient(to bottom, ${this.style.backgroundColorStart} 0%, ${this.style.backgroundColorEnd} 100%);
        border-radius: ${this.style.borderRadius}px;
        box-shadow: ${this.style.shadow
          ? '0 3px 1px -2px hsla(0, 0%, 0%, 0.2), 0 2px 2px 0 hsla(0, 0%, 0%, 0.14), 0 1px 5px 0 hsla(0, 0%, 0%, 0.12)'
          : ''
        };
        transform: translate3d(0%, -50%, 0);
        cursor: pointer;
        ${this.style.hintCSS}
      }

      .hint .character {
        font-family: ${this.style.fontFamilies.join(',')};
        font-size: ${this.style.fontSize}px;
        font-weight: ${this.style.fontWeight};
        color: ${this.style.textColor};
        text-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.6);
        ${this.style.characterCSS}
      }

      .hint .character.active, .hint:hover .character {
        color: ${this.style.activeCharacterTextColor};
        ${this.style.activeCharacterCSS}
      }
    `

    return style
  }

  // Processing ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

  updateHints() {
    const hintableElements = Array.from(document.querySelectorAll(this.selectors)).filter((element) => this.isHintable(element))

    this.hints = Hint.generateHints(hintableElements, this.keys)
  }

  filterHints(input) {
    const filteredHints = this.hints.filter(([label]) => input.every((key, index) => label[index] === key))

    return filteredHints
  }

  processKeys(keys, validate = false) {
    const filteredHints = this.filterHints(keys)
    switch (filteredHints.length) {
      case 0:
        break

      case 1:
        this.inputKeys = []
        this.render()
        this.processHint(filteredHints[0])
        break

      default:
        if (validate) {
          this.inputKeys = []
          this.render()
          this.processHint(filteredHints[0])

        } else {
          this.inputKeys = keys
          this.render()
        }
    }
  }

  processHint([label, element]) {
    // Request immediate update
    this.requestUpdate()

    // Observe changes in parentElement to keep hints up-to-date.
    // Note: We could watch the whole document, but in practice,
    // observing changes in the parent element works well enough.
    this.observe(element.parentElement)
    this.validatedElements.push(element)

    if (this.lock === false) {
      this.stop()
    }

    this.triggerEvent('validate', element)
  }

  // Events ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

  on(type, listener) {
    this.events[type].push(listener)
  }

  triggerEvent(type, ...parameters) {
    for (const listener of this.events[type]) {
      listener(...parameters)
    }
  }

  // Observers ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

  get observers() {
    return this.state.observers
  }

  set observers(observers) {
    this.state.observers = observers
  }

  observe(target) {
    const options = {
      attributes: true,
      childList: true,
      subtree: true
    }

    const observer = new MutationObserver((mutationList, observer) => {
      for (const mutation of mutationList) {
        switch (mutation.type) {
          case 'childList':
            this.requestUpdate()
            break
        }
      }
    })

    // Register observer
    this.observers.push(observer)

    // Start observing
    observer.observe(target, options)
  }

  clearObservers() {
    for (const observer of this.observers) {
      observer.disconnect()
    }
    this.observers = []
  }

  // Requests ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

  get updateRequests() {
    return this.state.updateRequests
  }

  set updateRequests(handles) {
    this.state.updateRequests = handles
  }

  requestUpdate() {
    // Update hints and reset keys during the next idle period.
    // A timeout is set to prevent resetting keys after a too long period.
    const handle = requestIdleCallback((deadline) => {
      this.updateHints()
      this.processKeys([])

      // Just update hints
      // A second request – may be necessary, and is generally enough –
      // to ensure elements have been rendered (after a click, for example).
      const handle = requestIdleCallback((deadline) => {
        this.updateHints()
      })

      // Register request
      this.updateRequests.push(handle)
    }, { timeout: 1000 })

    // Register request
    this.updateRequests.push(handle)
  }

  clearUpdateRequests() {
    for (const handle of this.updateRequests) {
      cancelIdleCallback(handle)
    }
    this.updateRequests = []
  }

  // Running ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

  start() {
    this.onKey = (event) => {
      // Skip modifier and navigation keys
      if ([...Hint.MODIFIER_KEYS(), ...Hint.NAVIGATION_KEYS()].includes(event.key)) {
        return
      }

      // Prevent the browsers default behavior (such as opening a link)
      // and stop the propagation of the event.
      event.preventDefault()
      event.stopImmediatePropagation()

      // Use event.key for layout-independent keys.
      // Motivation: Swap Caps Lock and Escape.
      switch (event.key) {
        case 'Escape':
          this.stop()
          break
        case 'Backspace':
          this.processKeys(this.inputKeys.slice(0, -1))
          break
        case 'Enter':
          this.processKeys(this.inputKeys, true)
          break
        default:
          this.processKeys(this.inputKeys.concat(event.code))
      }
    }

    this.onViewChange = (event) => {
      this.updateHints()
      this.processKeys([])
    }

    this.onClick = (event) => {
      const targeted = ([label, element]) => element === event.target
      if (! this.hints.some(targeted)) {
        this.stop()
      }
    }

    // Use the capture method.
    //
    // This setting is important to trigger the listeners during the capturing phase
    // if we want to prevent bubbling.
    //
    // Phase 1: Capturing phase: Window (1) → ChildElement (2) → Target (3)
    // Phase 2: Target phase: Target (1)
    // Phase 3: Bubbling phase: Window (3) ← ParentElement (2) ← Target (1)
    //
    // https://w3.org/TR/DOM-Level-3-Events#event-flow
    window.addEventListener('keydown', this.onKey, true)
    window.addEventListener('scroll', this.onViewChange)
    window.addEventListener('resize', this.onViewChange)
    window.addEventListener('click', this.onClick)

    // Start before processing hints
    this.triggerEvent('start')

    // Process hints
    this.updateHints()
    this.processKeys([])
  }

  stop() {
    // Clear observers and update requests
    this.clearObservers()
    this.clearUpdateRequests()

    window.removeEventListener('keydown', this.onKey, true)
    window.removeEventListener('scroll', this.onViewChange)
    window.removeEventListener('resize', this.onViewChange)
    window.removeEventListener('click', this.onClick)

    this.clearViewport()

    this.triggerEvent('exit', this.validatedElements)

    this.hints = []
    this.inputKeys = []
    this.validatedElements = []
  }

  // Rendering ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

  render() {
    const root = document.createElement('div')
    root.id = 'hints'

    // Place the hints in a closed shadow root,
    // so that the hint and page styles won’t affect each other.
    const shadow = root.attachShadow({ mode: 'closed' })

    for (const [label, element] of this.filterHints(this.inputKeys)) {
      const container = document.createElement('div')
      container.classList.add('hint')

      for (const [index, code] of label.entries()) {
        const atom = document.createElement('span')
        atom.classList.add('character', code === this.inputKeys[index] ? 'active' : 'normal')
        atom.textContent = this.keyMap[code]
        container.append(atom)
      }

      const rectangle = element.getBoundingClientRect()

      // Place hints relative to the viewport
      container.style.position = 'fixed'

      // Vertical placement: center
      container.style.top = rectangle.top + (rectangle.height / 2) + 'px'

      // Horizontal placement: left
      container.style.left = rectangle.left + 'px'

      // Control overlapping
      container.style.zIndex = 2147483647 // 2³¹ − 1

      // Click handler
      container.addEventListener('click', (event) => {
        // Stop propagation
        event.stopImmediatePropagation()
        this.processHint([label, element])
      })

      shadow.append(container)
    }

    this.clearViewport()

    // Attach
    shadow.append(this.getDocumentStyle())
    document.documentElement.append(root)
  }

  clearViewport() {
    const root = document.querySelector('#hints')
    if (root) {
      root.remove()
    }
  }

  // Focusing ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

  static focus(element) {
    // Leverage the `tabindex` attribute to force focus.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
    if (element.tabIndex === -1) {
      element.tabIndex = 0
    }

    element.focus()
  }

  // Generating ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

  static generateHints(elements, keys) {
    const hintKeys = this.generateHintKeys(keys, elements.length)
    const hints = elements.map((element, index) => [hintKeys[index], element])

    return hints
  }

  static generateHintKeys(keys, count) {
    const hints = [[]]
    let offset = 0
    while (hints.length - offset < count || hints.length === 1) {
      const hint = hints[offset++]
      for (const key of keys) {
        hints.push(hint.concat(key))
      }
    }

    return hints.slice(offset, offset + count)
  }

  // Helpers ───────────────────────────────────────────────────────────────────

  isHintable(element) {
    return Hint.isVisible(element) && this.filters.every((filter) => filter(element))
  }

  static isVisible(element) {
    return element.offsetParent !== null && this.isInViewport(element)
  }

  static isInViewport(element) {
    const rectangle = element.getBoundingClientRect()

    return rectangle.top >= 0 && rectangle.left >= 0 && rectangle.bottom <= window.innerHeight && rectangle.right <= window.innerWidth
  }

  static isClickable(element) {
    const nodeNames = ['A', 'BUTTON', 'SELECT', 'TEXTAREA', 'INPUT', 'VIDEO']
    const roles = ['button', 'checkbox', 'combobox', 'link', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'radio', 'tab', 'textbox']
    const style = getComputedStyle(element)
    const parentStyle = getComputedStyle(element.parentElement)

    return element.offsetParent !== null && (nodeNames.includes(element.nodeName) || roles.includes(element.getAttribute('role')) || element.hasAttribute('onclick') || (style.cursor === 'pointer' && parentStyle.cursor !== 'pointer'))
  }
}
