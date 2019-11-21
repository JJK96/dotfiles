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

// Help
krabby.modes.modal.map('Page', ['F1'], () => krabby.modes.modal.help(), 'Show help')
krabby.modes.modal.map('Page', ['Shift', 'F1'], () => window.open('https://github.com/alexherbo2/krabby/tree/master/doc'), 'Open the documentation in a new tab')

// External editor
krabby.modes.modal.map('Text', ['Alt', key_map['KeyL']], () => krabby.extensions.editor.send('edit', krabby.env.EDITOR), 'Open your favorite editor', 'External editor')

// Tab search
krabby.modes.modal.map('Command', [key_map['KeyQ']], () => krabby.extensions.dmenu.send('tab-search'), 'Tab search with dmenu')

// Scroll
krabby.modes.modal.map('Command', [key_map['KeyN']], (event) => krabby.scroll.down(event.repeat), 'Scroll down')
krabby.modes.modal.map('Command', [key_map['KeyE']], (event) => krabby.scroll.up(event.repeat), 'Scroll up')
krabby.modes.modal.map('Command', [key_map['KeyI']], (event) => krabby.scroll.right(event.repeat), 'Scroll right')
krabby.modes.modal.map('Command', [key_map['KeyH']], (event) => krabby.scroll.left(event.repeat), 'Scroll left')

// Scroll faster
krabby.modes.modal.map('Command', ['Shift', key_map['KeyN']], () => krabby.scroll.pageDown(), 'Scroll page down')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyE']], () => krabby.scroll.pageUp(), 'Scroll page up')
krabby.modes.modal.map('Command', [key_map['KeyG']], () => krabby.scroll.top(), 'Scroll to the top of the page')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyG']], () => krabby.scroll.bottom(), 'Scroll to the bottom of the page')

// Navigation
krabby.modes.modal.map('Command', ['Shift', key_map['KeyH']], () => history.back(), 'Go back in history')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyI']], () => history.forward(), 'Go forward in history')
krabby.modes.modal.map('Command', [key_map['KeyU']], () => location.assign('..'), 'Go up in hierarchy')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyU']], () => location.assign('/'), 'Go to the home page')
krabby.modes.modal.map('Command', ['Alt', key_map['KeyU']], () => location.assign('.'), 'Remove any URL parameter')

// Zoom
krabby.modes.modal.map('Command', ['Shift', 'Equal'], () => krabby.extensions.commands.send('zoom-in'), 'Zoom in')
krabby.modes.modal.map('Command', ['Minus'], () => krabby.extensions.commands.send('zoom-out'), 'Zoom out')
krabby.modes.modal.map('Command', ['Equal'], () => krabby.extensions.commands.send('zoom-reset'), 'Reset to default zoom level')

// Create tabs
krabby.modes.modal.map('Command', [key_map['KeyT']], () => krabby.extensions.commands.send('new-tab'), 'New tab')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyT']], () => krabby.extensions.commands.send('restore-tab'), 'Restore tab')
krabby.modes.modal.map('Command', [key_map['KeyB']], () => krabby.extensions.commands.send('duplicate-tab'), 'Duplicate tab')

// Create windows
krabby.modes.modal.map('Command', [key_map['KeyK']], () => krabby.extensions.commands.send('new-window'), 'New window')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyK']], () => krabby.extensions.commands.send('new-incognito-window'), 'New incognito window')

// Close tabs
krabby.modes.modal.map('Command', [key_map['KeyX']], () => krabby.extensions.commands.send('close-tab'), 'Close tab')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyX']], () => krabby.extensions.commands.send('close-other-tabs'), 'Close other tabs')
krabby.modes.modal.map('Command', ['Alt', key_map['KeyX']], () => krabby.extensions.commands.send('close-right-tabs'), 'Close tabs to the right')

// Refresh tabs
krabby.modes.modal.map('Command', [key_map['KeyR']], () => location.reload(), 'Reload the page')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyR']], () => location.reload(true), 'Reload the page, ignoring cached content')
krabby.modes.modal.map('Command', ['Alt', key_map['KeyR']], () => krabby.extensions.commands.send('reload-all-tabs'), 'Reload all tabs')

// Switch tabs
krabby.modes.modal.map('Command', ['Alt', key_map['KeyI']], () => krabby.extensions.commands.send('next-tab'), 'Next tab')
krabby.modes.modal.map('Command', ['Alt', key_map['KeyH']], () => krabby.extensions.commands.send('previous-tab'), 'Previous tab')
krabby.modes.modal.map('Command', ['Digit1'], () => krabby.extensions.commands.send('first-tab'), 'First tab')
krabby.modes.modal.map('Command', ['Digit0'], () => krabby.extensions.commands.send('last-tab'), 'Last tab')

// Move tabs
krabby.modes.modal.map('Command', ['Alt', 'Shift', key_map['KeyI']], () => krabby.extensions.commands.send('move-tab-right'), 'Move tab right')
krabby.modes.modal.map('Command', ['Alt', 'Shift', key_map['KeyH']], () => krabby.extensions.commands.send('move-tab-left'), 'Move tab left')
krabby.modes.modal.map('Command', ['Alt', 'Digit1'], () => krabby.extensions.commands.send('move-tab-first'), 'Move tab first')
krabby.modes.modal.map('Command', ['Alt', 'Digit0'], () => krabby.extensions.commands.send('move-tab-last'), 'Move tab last')

// Detach tabs
krabby.modes.modal.map('Command', [key_map['KeyD']], () => krabby.extensions.commands.send('detach-tab'), 'Detach tab')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyD']], () => krabby.extensions.commands.send('attach-tab'), 'Attach tab')

// Discard tabs
krabby.modes.modal.map('Command', ['Shift', 'Escape'], () => krabby.extensions.commands.send('discard-tab'), 'Discard tab')

// Mute tabs
krabby.modes.modal.map('Command', ['Alt', key_map['KeyM']], () => krabby.extensions.commands.send('mute-tab'), 'Mute tab')
krabby.modes.modal.map('Command', ['Alt', 'Shift', key_map['KeyM']], () => krabby.extensions.commands.send('mute-all-tabs'), 'Mute all tabs')

// Pin tabs
krabby.modes.modal.map('Command', ['Alt', key_map['KeyP']], () => krabby.extensions.commands.send('pin-tab'), 'Pin tab')

// Link hints
krabby.modes.modal.map('Command', [key_map['KeyF']], () => krabby.modes.hint({ selections: krabby.selections, selectors: krabby.env.HINT_SELECTORS }).start(), 'Focus link')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyF']], () => krabby.modes.hint({ selections: krabby.selections, selectors: krabby.env.HINT_SELECTORS, lock: true }).start(), 'Select multiple links')
krabby.modes.modal.map('Command', [key_map['KeyL']], () => krabby.modes.hint({ selectors: krabby.env.HINT_TEXT_SELECTORS }).start(), 'Focus input')
krabby.modes.modal.map('Command', [key_map['KeyV']], () => krabby.modes.hint({ selectors: krabby.env.HINT_VIDEO_SELECTORS }).start(), 'Focus video')

// Open links
krabby.modes.modal.map('Command', ['Enter'], () => krabby.commands.click(krabby.selections), 'Open selection')
krabby.modes.modal.map('Link', ['Enter'], () => krabby.commands.click(krabby.selections), 'Open link')
krabby.modes.modal.map('Link', ['Control', 'Enter'], () => krabby.commands.openInNewTab(krabby.selections), 'Open link in new tab')
krabby.modes.modal.map('Link', ['Shift', 'Enter'], () => krabby.commands.openInNewWindow(krabby.selections), 'Open link in new window')
krabby.modes.modal.map('Link', ['Alt', 'Enter'], () => krabby.commands.download(krabby.selections), 'Download link')
krabby.modes.modal.map('Link', ['Alt', 'Shift', 'Enter'], () => krabby.commands.open(krabby.selections), 'Open link in the associated application')

// Selection manipulation
krabby.modes.modal.map('Command', [key_map['KeyS']], () => krabby.selections.add(document.activeElement), 'Select active element')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyS']], () => krabby.commands.select(krabby.selections), 'Select elements that match the specified group of selectors')
krabby.modes.modal.map('Command', ['Shift', 'Digit5'], () => krabby.selections.set([document.documentElement]), 'Select document')
krabby.modes.modal.map('Command', ['Shift', 'Digit0'], () => krabby.selections.next(), 'Focus next selection')
krabby.modes.modal.map('Command', ['Shift', 'Digit9'], () => krabby.selections.previous(), 'Focus previous selection')
krabby.modes.modal.map('Command', ['Space'], () => krabby.selections.clear(), 'Clear selections')
krabby.modes.modal.map('Command', ['Control', 'Space'], () => krabby.selections.focus(), 'Focus main selection')
krabby.modes.modal.map('Command', ['Alt', 'Space'], () => krabby.selections.remove(), 'Remove main selection')
krabby.modes.modal.map('Command', ['Alt', key_map['KeyA']], () => krabby.selections.parent(), 'Select parent elements')
krabby.modes.modal.map('Command', ['Alt', key_map['KeyL']], () => krabby.selections.children(), 'Select child elements')
krabby.modes.modal.map('Command', ['Alt', 'Shift', key_map['KeyL']], () => krabby.selections.select('a'), 'Select links')
krabby.modes.modal.map('Command', ['Alt', 'Shift', 'Digit0'], () => krabby.selections.nextSibling(), 'Select next sibling elements')
krabby.modes.modal.map('Command', ['Alt', 'Shift', 'Digit9'], () => krabby.selections.previousSibling(), 'Select previous sibling elements')
krabby.modes.modal.map('Command', ['BracketLeft'], () => krabby.selections.firstChild(), 'Select first child elements')
krabby.modes.modal.map('Command', ['BracketRight'], () => krabby.selections.lastChild(), 'Select last child elements')
krabby.modes.modal.map('Command', ['Alt', key_map['KeyE']], () => krabby.commands.keep(krabby.selections, true, 'textContent'), 'Keep selections that match the given RegExp')
krabby.modes.modal.map('Command', ['Alt', 'Shift', key_map['KeyE']], () => krabby.commands.keep(krabby.selections, true, 'href'), 'Keep links that match the given RegExp')
krabby.modes.modal.map('Command', ['Alt', key_map['KeyN']], () => krabby.commands.keep(krabby.selections, false, 'textContent'), 'Clear selections that match the given RegExp')
krabby.modes.modal.map('Command', ['Alt', 'Shift', key_map['KeyN']], () => krabby.commands.keep(krabby.selections, false, 'href'), 'Clear links that match the given RegExp')

// Phantom selections
krabby.modes.modal.map('Command', ['Shift', key_map['KeyZ']], () => krabby.selections.save(), 'Save selections')
krabby.modes.modal.map('Command', [key_map['KeyZ']], () => krabby.selections.restore(), 'Restore selections')

// Unfocus
krabby.modes.modal.map('Page', ['Escape'], () => document.activeElement.blur(), 'Unfocus active element')

// Pass keys
krabby.modes.modal.map('Page', ['Alt', 'Escape'], krabby.modes.pass, 'Pass all keys to the page')
krabby.modes.pass.map('Page', ['Alt', 'Escape'], krabby.modes.modal, 'Stop passing keys to the page')

// Clipboard
krabby.modes.modal.map('Command', [key_map['KeyY']], () => krabby.commands.copyToClipboard(location.href, 'Page address copied'), 'Copy page address')
krabby.modes.modal.map('Command', ['Alt', key_map['KeyY']], () => krabby.commands.copyToClipboard(document.title, 'Page title copied'), 'Copy page title')
krabby.modes.modal.map('Command', ['Shift', key_map['KeyY']], () => krabby.commands.copyToClipboard(`[${document.title}](${location.href})`, 'Page address and title copied'), 'Copy page address and title')
krabby.modes.modal.map('Link', [key_map['KeyY']], () => krabby.commands.yank(krabby.selections, (selection) => selection.href, 'Link address copied'), 'Copy link address')
krabby.modes.modal.map('Link', ['Alt', key_map['KeyY']], () => krabby.commands.yank(krabby.selections, (selection) => selection.textContent, 'Link text copied'), 'Copy link text')
krabby.modes.modal.map('Link', ['Shift', key_map['KeyY']], () => krabby.commands.yank(krabby.selections, (selection) => `[${selection.textContent}](${selection.href})`, 'Link address and text copied'), 'Copy link address and text')
krabby.modes.modal.map('Image', [key_map['KeyY']], () => krabby.commands.yank(krabby.selections, (selection) => selection.src, 'Image address copied'), 'Copy image address')
krabby.modes.modal.map('Image', ['Alt', key_map['KeyY']], () => krabby.commands.yank(krabby.selections, (selection) => selection.alt, 'Image description copied'), 'Copy image description')
krabby.modes.modal.map('Image', ['Shift', key_map['KeyY']], () => krabby.commands.yank(krabby.selections, (selection) => `[${selection.alt}](${selection.src})`, 'Image address and description copied'), 'Copy image address and description')

// Player
krabby.modes.modal.map('Video', ['Space'], () => krabby.commands.player().pause(), 'Pause video')
krabby.modes.modal.map('Video', [key_map['KeyM']], () => krabby.commands.player().mute(), 'Mute video')
krabby.modes.modal.map('Video', [key_map['KeyI']], () => krabby.commands.player().seekRelative(5), 'Seek forward 5 seconds')
krabby.modes.modal.map('Video', [key_map['KeyH']], () => krabby.commands.player().seekRelative(-5), 'Seek backward 5 seconds')
krabby.modes.modal.map('Video', [key_map['KeyG']], () => krabby.commands.player().seekAbsolutePercent(0), 'Seek to the beginning')
krabby.modes.modal.map('Video', ['Shift', key_map['KeyG']], () => krabby.commands.player().seekAbsolutePercent(1), 'Seek to the end')
krabby.modes.modal.map('Video', [key_map['KeyE']], () => krabby.commands.player().increaseVolume(0.1), 'Increase volume')
krabby.modes.modal.map('Video', [key_map['KeyN']], () => krabby.commands.player().decreaseVolume(0.1), 'Decrease volume')
krabby.modes.modal.map('Video', [key_map['KeyF']], () => krabby.commands.player().fullscreen(), 'Toggle full-screen mode')
krabby.modes.modal.map('Video', [key_map['KeyP']], () => krabby.commands.player().pictureInPicture(), 'Toggle picture-in-picture mode')

// mpv
krabby.modes.modal.map('Video', ['Enter'], () => krabby.commands.mpvResume(), 'Play with mpv')
krabby.modes.modal.map('Link', [key_map['KeyM']], () => krabby.commands.mpv({ selections: krabby.selections }), 'Play with mpv')
krabby.modes.modal.map('Link', ['Alt', key_map['KeyM']], () => krabby.commands.mpv({ selections: krabby.selections, reverse: true }), 'Play with mpv in reverse order')

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
krabby.modes.modal.map('Command', [key_map['KeyP']], ezproxyfy, 'Ezproxyfy url')
