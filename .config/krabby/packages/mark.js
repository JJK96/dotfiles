class Mark {
  constructor() {
    this.marks = []
    // Events
    this.events = {}
    this.events['push'] = []
    this.events['pop'] = []
    this.events['jump'] = []
    this.events['clear'] = []
  }
  on(type, listener) {
    this.events[type].push(listener)
  }
  triggerEvent(type, ...parameters) {
    for (const listener of this.events[type]) {
      listener(...parameters)
    }
  }
  push() {
    const [x, y] = Mark.getPosition()
    const index = this.marks.length
    this.marks.push([x, y])
    this.triggerEvent('push', x, y, index)
  }
  pop() {
    if (this.marks.length === 0) {
      return
    }
    const [x, y] = this.marks.pop()
    const index = this.marks.length
    this.triggerEvent('pop', x, y, index)
  }
  jump() {
    if (this.marks.length === 0) {
      return
    }
    const [x, y] = Mark.getPosition()
    const index = this.marks.findIndex(([xMark, yMark]) => xMark === x && yMark === y)
    const nextIndex = index === -1
      ? this.marks.length - 1
      : Mark.modulo(index - 1, this.marks.length)
    const [nextX, nextY] = this.marks[nextIndex]
    Mark.setPosition(nextX, nextY)
    this.triggerEvent('jump', nextX, nextY, nextIndex)
  }
  clear() {
    this.marks = []
    this.triggerEvent('clear')
  }
  static getPosition() {
    const x = document.documentElement.scrollLeft
    const y = document.documentElement.scrollTop
    return [x, y]
  }
  static setPosition(x, y) {
    document.documentElement.scrollLeft = x
    document.documentElement.scrollTop = y
  }
  static modulo(dividend, divisor) {
    return ((dividend % divisor) + divisor) % divisor
  }
}
