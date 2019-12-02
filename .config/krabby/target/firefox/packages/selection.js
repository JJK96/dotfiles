class SelectionListBase {
  constructor() {
    this.main = 0
    this.collection = []
    // Events
    this.events = {}
    this.events['selection-change'] = []
    // Style
    this.style = {}
    this.style.primarySelection = undefined
    this.style.secondarySelection = undefined
  }
  on(type, listener) {
    this.events[type].push(listener)
  }
  triggerEvent(type, ...parameters) {
    for (const listener of this.events[type]) {
      listener(...parameters)
    }
  }
  get length() {
    return this.collection.length
  }
  get mainSelection() {
    return this.collection[this.main]
  }
  map(callback) {
    return this.collection.map(callback)
  }
  includes(element) {
    return this.collection.includes(element)
  }
  set(collection = this.collection, main = collection.length - 1) {
    this.clear()
    this.main = main >= 0 && main <= collection.length - 1
      ? main
      : 0
    // Support for HTML collections
    // Example: selections.set(document.querySelectorAll('a'))
    this.collection = Array.from(collection)
    this.sort()
    this.merge()
    this.render()
    this.focus()
    this.triggerEvent('selection-change', collection)
  }
  add(...elements) {
    const collection = this.collection.concat(elements)
    const main = collection.length - 1
    this.set(collection, main)
  }
  remove(...elements) {
    const collection = Object.assign([this.mainSelection], elements)
    this.filter((candidate) => collection.includes(candidate) === false)
  }
  filter(callback) {
    this.fold((element, index, array) => callback(element, index, array) ? [element] : [])
  }
  parent(count = 1) {
    const getParent = (element, count) => {
      if (count < 1) {
        return element
      }
      if (element === null) {
        return null
      }
      return getParent(element.parentElement, count - 1)
    }
    this.fold((element) => {
      const parent = getParent(element, count)
      return parent ? [parent] : []
    })
  }
  children(depth = 1) {
    if (depth < 1 || this.length === 0) {
      return
    }
    this.fold((element) => element.children)
    this.children(depth - 1)
  }
  nextSibling() {
    this.fold((element) => [element.nextElementSibling])
  }
  previousSibling() {
    this.fold((element) => [element.previousElementSibling])
  }
  firstChild() {
    this.fold((element) => [element.firstElementChild])
  }
  lastChild() {
    this.fold((element) => [element.lastElementChild])
  }
  select(selectors = '*') {
    this.fold((element) => Array.from(element.querySelectorAll(selectors)))
  }
  fold(callback) {
    let main = this.main
    const collection = []
    for (const [index, element] of this.collection.entries()) {
      const elements = callback(element, index, this.collection)
      switch (elements.length) {
        case 0:
          if (index < this.main || this.main === this.length - 1) {
            --main
          }
          break
        case 1:
          collection.push(elements[0])
          break
        default:
          collection.push(...elements)
          if (index <= this.main) {
            main += elements.length - 1
          }
      }
    }
    this.set(collection, main)
  }
  focus(element = this.mainSelection) {
    if (this.length === 0) {
      return
    }
    const main = this.collection.indexOf(element)
    if (main === -1) {
      return
    }
    if (main !== this.main) {
      const secondary = this.mainSelection
      secondary.classList.remove(this.style.primarySelection)
      secondary.classList.add(this.style.secondarySelection)
      element.classList.remove(this.style.secondarySelection)
      element.classList.add(this.style.primarySelection)
      this.main = main
      this.triggerEvent('selection-change', this.collection)
    }
    element.focus()
    element.scrollIntoView({ block: 'nearest' })
  }
  next(count = 1) {
    const main = SelectionListBase.modulo(this.main + count, this.length)
    this.focus(this.collection[main])
  }
  previous(count = 1) {
    this.next(-count)
  }
  sort() {
    if (this.length <= 1) {
      return
    }
    const main = this.mainSelection
    this.collection.sort(SelectionListBase.compare)
    this.main = this.collection.indexOf(main)
  }
  merge() {
    if (this.length <= 1) {
      return
    }
    let main = this.main
    const collection = []
    let target = 0
    let candidate
    for (candidate = 1; candidate < this.length; ++candidate) {
      if (this.collection[target] === this.collection[candidate] || this.collection[target].contains(this.collection[candidate])) {
        if (candidate <= this.main) {
          --main
        }
        continue
      }
      collection.push(this.collection[target])
      target = candidate
    }
    collection.push(this.collection[target])
    this.main = main
    this.collection = collection
  }
  render() {
    if (this.length === 0) {
      return
    }
    this.mainSelection.classList.add(this.style.primarySelection)
    for (const [index, element] of this.collection.entries()) {
      if (index !== this.main) {
        element.classList.add(this.style.secondarySelection)
      }
    }
  }
  clear() {
    if (this.length === 0) {
      return
    }
    this.mainSelection.classList.remove(this.style.primarySelection)
    for (const [index, element] of this.collection.entries()) {
      if (index !== this.main) {
        element.classList.remove(this.style.secondarySelection)
      }
    }
    this.main = 0
    this.collection = []
    this.triggerEvent('selection-change', this.collection)
  }
  static compare(element, other) {
    if (element.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_FOLLOWING) {
      return -1
    }
    if (element.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_PRECEDING) {
      return 1
    }
    return 0
  }
  static modulo(dividend, divisor) {
    return ((dividend % divisor) + divisor) % divisor
  }
}

class SelectionList extends SelectionListBase {
  constructor() {
    super()
    this.style.primarySelection = 'primary-selection'
    this.style.secondarySelection = 'secondary-selection'
    this.phantoms = new PhantomList
  }
  save() {
    this.phantoms.add(...this.collection)
  }
  restore() {
    const main = this.mainSelection
    this.add(...this.phantoms.collection)
    this.focus(main)
    this.phantoms.clear()
  }
}

class PhantomList extends SelectionListBase {
  constructor() {
    super()
    this.style.primarySelection = 'primary-phantom'
    this.style.secondarySelection = 'secondary-phantom'
  }
}
