// Configuration for Krabby (https://github.com/alexherbo2/krabby/blob/master/src/krabby.js)

// Scroll
modal.map('Command', ['n'], (event) => scroll.down(event.repeat), 'Scroll down')
modal.map('Command', ['e'], (event) => scroll.up(event.repeat), 'Scroll up')
modal.map('Command', ['i'], (event) => scroll.right(event.repeat), 'Scroll right')

modal.map('Command', ['Shift', 'n'], () => scroll.pageDown(), 'Scroll page down')
modal.map('Command', ['Shift', 'e'], () => scroll.pageUp(), 'Scroll page up')

modal.map('Command', ['Shift', 'i'], () => history.forward(), 'Go forward in history')
// Create windows
modal.map('Command', ['k'], () => commands.send('new-window'), 'New window')
modal.map('Command', ['Shift', 'k'], () => commands.send('new-incognito-window'), 'New incognito window')

modal.map('Command', ['Alt', 'i'], () => commands.send('next-tab'), 'Next tab')
modal.map('Command', ['Alt', 'Shift', 'i'], () => commands.send('move-tab-right'), 'Move tab right')

modal.map('Command', ['l'], () => hint({ selectors: HINT_TEXT_SELECTORS }).start(), 'Focus input')
modal.map('Command', ['Alt', 'l'], () => selections.children(), 'Select child elements')
modal.map('Command', ['Alt', 'Shift', 'l'], () => selections.select('a'), 'Select links')
modal.map('Command', ['Alt', 'e'], () => keep(selections, true, 'textContent'), 'Keep selections that match the given RegExp')
modal.map('Command', ['Alt', 'Shift', 'e'], () => keep(selections, true, 'href'), 'Keep links that match the given RegExp')
modal.map('Command', ['Alt', 'n'], () => keep(selections, false, 'textContent'), 'Clear selections that match the given RegExp')
modal.map('Command', ['Alt', 'Shift', 'n'], () => keep(selections, false, 'href'), 'Clear links that match the given RegExp')

modal.map('Video', ['i'], () => player().seekRelative(5), 'Seek forward 5 seconds')
modal.map('Video', ['e'], () => player().increaseVolume(0.1), 'Increase volume')
modal.map('Video', ['n'], () => player().decreaseVolume(0.1), 'Decrease volume')
