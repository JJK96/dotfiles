// Configuration for Krabby (https://github.com/alexherbo2/krabby/blob/master/src/krabby.js)

/*Modal.KEY_MAP = () => {
      Backquote: { key: '`', shiftKey: '~' }, Digit1: { key: '1', shiftKey: '!' }, Digit2: { key: '2', shiftKey: '@' }, Digit3: { key: '3', shiftKey: '#' }, Digit4: { key: '4', shiftKey: '$' }, Digit5: { key: '5', shiftKey: '%' }, Digit6: { key: '6', shiftKey: '^' }, Digit7: { key: '7', shiftKey: '&' }, Digit8: { key: '8', shiftKey: '*' }, Digit9: { key: '9', shiftKey: '(' }, Digit0: { key: '0', shiftKey: ')' }, Minus: { key: '-', shiftKey: '_' }, Equal: { key: '=', shiftKey: '+' },
      KeyQ: { key: 'q', shiftKey: 'Q' }, KeyW: { key: 'w', shiftKey: 'W' }, KeyE: { key: 'e', shiftKey: 'E' }, KeyR: { key: 'r', shiftKey: 'R' }, KeyT: { key: 't', shiftKey: 'T' }, KeyY: { key: 'y', shiftKey: 'Y' }, KeyU: { key: 'u', shiftKey: 'U' }, KeyI: { key: 'i', shiftKey: 'I' }, KeyO: { key: 'o', shiftKey: 'O' }, KeyP: { key: 'p', shiftKey: 'P' }, BracketLeft: { key: '[', shiftKey: '{' }, BracketRight: { key: ']', shiftKey: '}' }, Backslash: { key: '\\', shiftKey: '|' },
      KeyA: { key: 'a', shiftKey: 'A' }, KeyS: { key: 's', shiftKey: 'S' }, KeyD: { key: 'd', shiftKey: 'D' }, KeyF: { key: 'f', shiftKey: 'F' }, KeyG: { key: 'g', shiftKey: 'G' }, KeyH: { key: 'h', shiftKey: 'H' }, KeyJ: { key: 'j', shiftKey: 'J' }, KeyK: { key: 'k', shiftKey: 'K' }, KeyL: { key: 'l', shiftKey: 'L' }, Semicolon: { key: ';', shiftKey: ':' }, Quote: { key: "'", shiftKey: '"' },
      KeyZ: { key: 'z', shiftKey: 'Z' }, KeyX: { key: 'x', shiftKey: 'X' }, KeyC: { key: 'c', shiftKey: 'C' }, KeyV: { key: 'v', shiftKey: 'V' }, KeyB: { key: 'b', shiftKey: 'B' }, KeyN: { key: 'n', shiftKey: 'N' }, KeyM: { key: 'm', shiftKey: 'M' }, Comma: { key: ',', shiftKey: '<' }, Period: { key: '.', shiftKey: '>' }, Slash: { key: '/', shiftKey: '?' }
}*/

Hint.KEY_MAP = () => {
    return {
      Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0',
      KeyQ: 'q', KeyW: 'w', KeyE: 'f', KeyR: 'p', KeyT: 'g', KeyY: 'j', KeyU: 'l', KeyI: 'u', KeyO: 'y', KeyP: ';',
      KeyA: 'a', KeyS: 'r', KeyD: 's', KeyF: 't', KeyG: 'd', KeyH: 'h', KeyJ: 'n', KeyK: 'e', KeyL: 'i',
      KeyZ: 'z', KeyX: 'x', KeyC: 'c', KeyV: 'v', KeyB: 'b', KeyN: 'k', KeyM: 'm'
    }
}

key_map = {
      KeyQ: 'KeyQ', KeyW: 'KeyW', KeyE: 'KeyK', KeyR: 'KeyS', KeyT: 'KeyF', KeyY: 'KeyO', KeyU: 'KeyI', KeyI: 'KeyL', KeyO: 'Semicolon', KeyP: 'KeyR',
      KeyA: 'KeyA', KeyS: 'KeyD', KeyD: 'KeyG', KeyF: 'KeyE', KeyG: 'KeyT', KeyH: 'KeyH', KeyJ: 'KeyY', KeyK: 'KeyN', KeyL: 'KeyU',
      KeyZ: 'KeyZ', KeyX: 'KeyX', KeyC: 'KeyC', KeyV: 'KeyV', KeyB: 'KeyB', KeyN: 'KeyJ', KeyM: 'KeyM'
}

// Mappings ────────────────────────────────────────────────────────────────────

// Help
modal.map('Page', ['F1'], () => modal.help(), 'Show help')
modal.map('Page', ['Shift', 'F1'], () => window.open('https://github.com/alexherbo2/krabby/tree/master/doc'), 'Open the documentation in a new tab')

// Tab search
modal.map('Command', [key_map['KeyQ']], () => dmenu.send('tab-search'), 'Tab search with dmenu')

// Scroll
modal.map('Command', [key_map['KeyJ']], (event) => scroll.down(event.repeat), 'Scroll down')
modal.map('Command', [key_map['KeyK']], (event) => scroll.up(event.repeat), 'Scroll up')
modal.map('Command', [key_map['KeyL']], (event) => scroll.right(event.repeat), 'Scroll right')
modal.map('Command', [key_map['KeyH']], (event) => scroll.left(event.repeat), 'Scroll left')

// Scroll faster
modal.map('Command', ['Shift', key_map['KeyJ']], () => scroll.pageDown(), 'Scroll page down')
modal.map('Command', ['Shift', key_map['KeyK']], () => scroll.pageUp(), 'Scroll page up')
modal.map('Command', [key_map['KeyG']], () => scroll.top(), 'Scroll to the top of the page')
modal.map('Command', ['Shift', key_map['KeyG']], () => scroll.bottom(), 'Scroll to the bottom of the page')

// Navigation
modal.map('Command', ['Shift', key_map['KeyH']], () => history.back(), 'Go back in history')
modal.map('Command', ['Shift', key_map['KeyL']], () => history.forward(), 'Go forward in history')
modal.map('Command', [key_map['KeyU']], () => location.assign('..'), 'Go up in hierarchy')
modal.map('Command', ['Shift', key_map['KeyU']], () => location.assign('/'), 'Go to the home page')
modal.map('Command', ['Alt', key_map['KeyU']], () => location.assign('.'), 'Remove any URL parameter')

// Zoom
modal.map('Command', ['Shift', 'Equal'], () => commands.send('zoom-in'), 'Zoom in')
modal.map('Command', ['Minus'], () => commands.send('zoom-out'), 'Zoom out')
modal.map('Command', ['Equal'], () => commands.send('zoom-reset'), 'Reset to default zoom level')

// Create tabs
modal.map('Command', [key_map['KeyT']], () => commands.send('new-tab'), 'New tab')
modal.map('Command', ['Shift', key_map['KeyT']], () => commands.send('restore-tab'), 'Restore tab')
modal.map('Command', [key_map['KeyB']], () => commands.send('duplicate-tab'), 'Duplicate tab')

// Create windows
modal.map('Command', [key_map['KeyN']], () => commands.send('new-window'), 'New window')
modal.map('Command', ['Shift', key_map['KeyN']], () => commands.send('new-incognito-window'), 'New incognito window')

// Close tabs
modal.map('Command', [key_map['KeyX']], () => commands.send('close-tab'), 'Close tab')
modal.map('Command', ['Shift', key_map['KeyX']], () => commands.send('close-other-tabs'), 'Close other tabs')
modal.map('Command', ['Alt', key_map['KeyX']], () => commands.send('close-right-tabs'), 'Close tabs to the right')

// Refresh tabs
modal.map('Command', [key_map['KeyR']], () => location.reload(), 'Reload the page')
modal.map('Command', ['Shift', key_map['KeyR']], () => location.reload(true), 'Reload the page, ignoring cached content')
modal.map('Command', ['Alt', key_map['KeyR']], () => commands.send('reload-all-tabs'), 'Reload all tabs')

// Switch tabs
modal.map('Command', ['Alt', key_map['KeyL']], () => commands.send('next-tab'), 'Next tab')
modal.map('Command', ['Alt', key_map['KeyH']], () => commands.send('previous-tab'), 'Previous tab')
modal.map('Command', ['Digit1'], () => commands.send('first-tab'), 'First tab')
modal.map('Command', ['Digit0'], () => commands.send('last-tab'), 'Last tab')

// Move tabs
modal.map('Command', ['Alt', 'Shift', key_map['KeyL']], () => commands.send('move-tab-right'), 'Move tab right')
modal.map('Command', ['Alt', 'Shift', key_map['KeyH']], () => commands.send('move-tab-left'), 'Move tab left')
modal.map('Command', ['Alt', 'Digit1'], () => commands.send('move-tab-first'), 'Move tab first')
modal.map('Command', ['Alt', 'Digit0'], () => commands.send('move-tab-last'), 'Move tab last')

// Detach tabs
modal.map('Command', [key_map['KeyD']], () => commands.send('detach-tab'), 'Detach tab')
modal.map('Command', ['Shift', key_map['KeyD']], () => commands.send('attach-tab'), 'Attach tab')

// Discard tabs
modal.map('Command', [key_map['KeyZ']], () => commands.send('discard-tab'), 'Discard tab')

// Mute tabs
modal.map('Command', ['Alt', key_map['KeyM']], () => commands.send('mute-tab'), 'Mute tab')
modal.map('Command', ['Alt', 'Shift', key_map['KeyM']], () => commands.send('mute-all-tabs'), 'Mute all tabs')

// Pin tabs
modal.map('Command', ['Alt', key_map['KeyP']], () => commands.send('pin-tab'), 'Pin tab')

// Link hints
modal.map('Command', [key_map['KeyF']], () => hint().start(), 'Focus link')
modal.map('Command', ['Shift', key_map['KeyF']], () => hint({ selections, lock: true }).start(), 'Select multiple links')
modal.map('Command', [key_map['KeyI']], () => hint({ selectors: HINT_TEXT_SELECTORS }).start(), 'Focus input')
modal.map('Command', [key_map['KeyV']], () => hint({ selectors: HINT_VIDEO_SELECTORS }).start(), 'Focus video')

// Open links
modal.map('Link', ['Enter'], () => click(selections), 'Open link')
modal.map('Link', ['Control', 'Enter'], () => click(selections, { ctrlKey: true }), 'Open link in new tab')
modal.map('Link', ['Shift', 'Enter'], () => click(selections, { shiftKey: true }), 'Open link in new window')
modal.map('Link', ['Alt', 'Enter'], () => click(selections, { altKey: true }), 'Download link')
modal.map('Link', [key_map['KeyO']], () => open(selections), 'Open link in the associated application')

// Selection manipulation
modal.map('Command', [key_map['KeyS']], () => selections.add(document.activeElement), 'Select active element')
modal.map('Command', ['Shift', key_map['KeyS']], () => select(selections), 'Select elements that match the specified group of selectors')
modal.map('Command', ['Shift', 'Digit5'], () => selections.set([document.documentElement]), 'Select document')
modal.map('Command', ['Shift', 'Digit0'], () => selections.next(), 'Focus next selection')
modal.map('Command', ['Shift', 'Digit9'], () => selections.previous(), 'Focus previous selection')
modal.map('Command', ['Space'], () => selections.clear(), 'Clear selections')
modal.map('Command', ['Control', 'Space'], () => selections.focus(), 'Focus main selection')
modal.map('Command', ['Alt', 'Space'], () => selections.remove(), 'Remove main selection')
modal.map('Command', ['Alt', key_map['KeyA']], () => selections.parent(), 'Select parent elements')
modal.map('Command', ['Alt', key_map['KeyI']], () => selections.children(), 'Select child elements')
modal.map('Command', ['Alt', 'Shift', key_map['KeyI']], () => selections.select('a'), 'Select links')
modal.map('Command', ['Alt', key_map['KeyK']], () => keep(selections, true, 'textContent'), 'Keep selections that match the given RegExp')
modal.map('Command', ['Alt', 'Shift', key_map['KeyK']], () => keep(selections, true, 'href'), 'Keep links that match the given RegExp')
modal.map('Command', ['Alt', key_map['KeyJ']], () => keep(selections, false, 'textContent'), 'Clear selections that match the given RegExp')
modal.map('Command', ['Alt', 'Shift', key_map['KeyJ']], () => keep(selections, false, 'href'), 'Clear links that match the given RegExp')

// Unfocus
modal.map('Page', ['Escape'], () => document.activeElement.blur(), 'Unfocus active element')

// Pass keys
modal.map('Page', ['Alt', 'Escape'], pass, 'Pass all keys to the page')
pass.map('Page', ['Alt', 'Escape'], modal, 'Stop passing keys to the page')

// Clipboard
modal.map('Command', [key_map['KeyY']], () => copyToClipboard(location.href, 'Page address copied'), 'Copy page address')
modal.map('Command', ['Alt', key_map['KeyY']], () => copyToClipboard(document.title, 'Page title copied'), 'Copy page title')
modal.map('Command', ['Shift', key_map['KeyY']], () => copyToClipboard(`[${document.title}](${location.href})`, 'Page address and title copied'), 'Copy page address and title')
modal.map('Link', [key_map['KeyY']], () => yank(selections, (selection) => selection.href, 'Link address copied'), 'Copy link address')
modal.map('Link', ['Alt', key_map['KeyY']], () => yank(selections, (selection) => selection.textContent, 'Link text copied'), 'Copy link text')
modal.map('Link', ['Shift', key_map['KeyY']], () => yank(selections, (selection) => `[${selection.textContent}](${selection.href})`, 'Link address and text copied'), 'Copy link address and text')

// Player
modal.map('Video', ['Space'], () => player().pause(), 'Pause video')
modal.map('Video', [key_map['KeyM']], () => player().mute(), 'Mute video')
modal.map('Video', [key_map['KeyL']], () => player().seekRelative(5), 'Seek forward 5 seconds')
modal.map('Video', [key_map['KeyH']], () => player().seekRelative(-5), 'Seek backward 5 seconds')
modal.map('Video', [key_map['KeyG']], () => player().seekAbsolutePercent(0), 'Seek to the beginning')
modal.map('Video', ['Shift', key_map['KeyG']], () => player().seekAbsolutePercent(1), 'Seek to the end')
modal.map('Video', [key_map['KeyK']], () => player().increaseVolume(0.1), 'Increase volume')
modal.map('Video', [key_map['KeyJ']], () => player().decreaseVolume(0.1), 'Decrease volume')
modal.map('Video', [key_map['KeyF']], () => player().fullscreen(), 'Toggle full-screen mode')
modal.map('Video', [key_map['KeyP']], () => player().pictureInPicture(), 'Toggle picture-in-picture mode')

// mpv
modal.map('Video', ['Enter'], () => mpvResume(), 'Play with mpv')
modal.map('Link', [key_map['KeyM']], () => mpv({ selections }), 'Play with mpv')
modal.map('Link', ['Alt', 'KeyM'], () => mpv({ selections, reverse: true }), 'Play with mpv in reverse order')
