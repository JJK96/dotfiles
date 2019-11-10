class Prompt {
  constructor() {
    // Events
    this.events = {}
    this.events['open'] = []
    this.events['close'] = []
    // Style
    this.style = `
      dialog {
        position: fixed;
        margin-right: 0;
        top: 0;
        right: 0;
        color: gray;
        background-color: white;
        border: 1px solid lightgray;
        border-bottom-left-radius: 4px;
      }
      input {
        font-family: sans-serif;
        font-size: 18px;
        background-color: white;
        border: none;
      }
      input:focus {
        outline: none;
      }
    `
  }
  on(type, listener) {
    this.events[type].push(listener)
  }
  triggerEvent(type, ...parameters) {
    for (const listener of this.events[type]) {
      listener(...parameters)
    }
  }
  fire(message) {
    const dialog = document.createElement('dialog')
    switch (typeof dialog.showModal) {
      case 'function':
        return this.fireDialog(message)
        break
      case 'undefined':
        return this.firePrompt(message)
        break
    }
  }
  fireDialog(message) {
    return new Promise((resolve, reject) => {
      const root = document.createElement('div')
      root.id = 'prompt'
      // Place the prompt in a shadow root,
      // so that the prompt and page styles won’t affect each other.
      // Use an open shadow root to mitigate key-binding issues.
      // For example, sites can access the real active element with document.activeElement.shadowRoot.activeElement.
      const shadow = root.attachShadow({ mode: 'open' })
      // Dialog
      const dialog = document.createElement('dialog')
      const form = document.createElement('form')
      form.method = 'dialog'
      const input = document.createElement('input')
      input.placeholder = message
      // Style
      const style = document.createElement('style')
      style.textContent = this.style
      // Attach
      shadow.append(style)
      shadow.appendChild(dialog).appendChild(form).appendChild(input)
      document.documentElement.append(root)
      // Show modal
      dialog.showModal()
      this.triggerEvent('open')
      // Events
      dialog.addEventListener('close', () => {
        resolve(dialog.returnValue)
        this.triggerEvent('close')
      })
      form.addEventListener('submit', () => {
        dialog.close(input.value)
      })
      dialog.addEventListener('cancel', () => {
        dialog.close(null)
      })
      dialog.addEventListener('keydown', (event) => {
        // Stop the propagation of the event
        event.stopImmediatePropagation()
      })
    })
  }
  firePrompt(message) {
    return new Promise((resolve, reject) => {
      const value = window.prompt(message)
      resolve(value)
    })
  }
}
