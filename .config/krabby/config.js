// Configuration for Krabby (https://github.com/alexherbo2/krabby/blob/master/src/krabby.js)

// Keymaps for colemak

Modal.KEY_MAP = () => {
    return {
      Backquote: { key: '`', shiftKey: '~' }, Digit1: { key: '1', shiftKey: '!' }, Digit2: { key: '2', shiftKey: '@' }, Digit3: { key: '3', shiftKey: '#' }, Digit4: { key: '4', shiftKey: '$' }, Digit5: { key: '5', shiftKey: '%' }, Digit6: { key: '6', shiftKey: '^' }, Digit7: { key: '7', shiftKey: '&' }, Digit8: { key: '8', shiftKey: '*' }, Digit9: { key: '9', shiftKey: '(' }, Digit0: { key: '0', shiftKey: ')' }, Minus: { key: '-', shiftKey: '_' }, Equal: { key: '=', shiftKey: '+' },
      KeyQ: { key: 'q', shiftKey: 'Q' }, KeyW: { key: 'w', shiftKey: 'W' }, KeyE: { key: 'f', shiftKey: 'F' }, KeyR: { key: 'p', shiftKey: 'P' }, KeyT: { key: 'g', shiftKey: 'G' }, KeyY: { key: 'j', shiftKey: 'J' }, KeyU: { key: 'l', shiftKey: 'L' }, KeyI: { key: 'u', shiftKey: 'U' }, KeyO: { key: 'y', shiftKey: 'Y' }, KeyP: { key: ';', shiftKey: ':' }, BracketLeft: { key: '[', shiftKey: '{' }, BracketRight: { key: ']', shiftKey: '}' }, Backslash: { key: '\\', shiftKey: '|' },
      KeyA: { key: 'a', shiftKey: 'A' }, KeyS: { key: 'r', shiftKey: 'R' }, KeyD: { key: 's', shiftKey: 'S' }, KeyF: { key: 't', shiftKey: 'T' }, KeyG: { key: 'd', shiftKey: 'D' }, KeyH: { key: 'h', shiftKey: 'H' }, KeyJ: { key: 'n', shiftKey: 'N' }, KeyK: { key: 'e', shiftKey: 'E' }, KeyL: { key: 'i', shiftKey: 'I' }, Semicolon: { key: 'o', shiftKey: 'O' }, Quote: { key: "'", shiftKey: '"' },
      KeyZ: { key: 'z', shiftKey: 'Z' }, KeyX: { key: 'x', shiftKey: 'X' }, KeyC: { key: 'c', shiftKey: 'C' }, KeyV: { key: 'v', shiftKey: 'V' }, KeyB: { key: 'b', shiftKey: 'B' }, KeyN: { key: 'k', shiftKey: 'K' }, KeyM: { key: 'm', shiftKey: 'M' }, Comma: { key: ',', shiftKey: '<' }, Period: { key: '.', shiftKey: '>' }, Slash: { key: '/', shiftKey: '?' }
}
}

Hint.KEY_MAP = () => {
    return {
      Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0',
      KeyQ: 'q', KeyW: 'w', KeyE: 'f', KeyR: 'p', KeyT: 'g', KeyY: 'j', KeyU: 'l', KeyI: 'u', KeyO: 'y', KeyP: ';',
      KeyA: 'a', KeyS: 'r', KeyD: 's', KeyF: 't', KeyG: 'd', KeyH: 'h', KeyJ: 'n', KeyK: 'e', KeyL: 'i',
      KeyZ: 'z', KeyX: 'x', KeyC: 'c', KeyV: 'v', KeyB: 'b', KeyN: 'k', KeyM: 'm'
    }
}

// Reverse keymap for more comprehensible bindings

key_map = {
      KeyQ: 'KeyQ', KeyW: 'KeyW', KeyE: 'KeyK', KeyR: 'KeyS', KeyT: 'KeyF', KeyY: 'KeyO', KeyU: 'KeyI', KeyI: 'KeyL', KeyO: 'Semicolon', KeyP: 'KeyR',
      KeyA: 'KeyA', KeyS: 'KeyD', KeyD: 'KeyG', KeyF: 'KeyE', KeyG: 'KeyT', KeyH: 'KeyH', KeyJ: 'KeyY', KeyK: 'KeyN', KeyL: 'KeyU',
      KeyZ: 'KeyZ', KeyX: 'KeyX', KeyC: 'KeyC', KeyV: 'KeyV', KeyB: 'KeyB', KeyN: 'KeyJ', KeyM: 'KeyM'
}

const krabby = new Krabby({ dormant: false })

krabby.env.EDITOR = '$TERMINAL -e "editor -t \"$1\""'

// Mappings ──────────────────────────────────────────────────────────────────

// ezproxyfy

function ezproxyfy() {
    //replace url with new url using ezproxy2.utwente.nl
    url = window.location.href
    url = url.split('/')
    url[2] = url[2].replace(/\./g,'-') + '.ezproxy2.utwente.nl'
    url = url.join('/')
    window.location.replace(url)
}

krabby.modes.modal.unmap('Command', [key_map['KeyP']])
krabby.modes.modal.map('Command', [key_map['KeyP']], ezproxyfy, 'Ezproxyfy url', 'Ezproxyfy')
