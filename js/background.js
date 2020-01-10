let direction = 'forward'

const reverseDirection = () => direction = direction === 'forward' ? 'backward' : 'forward'

const iconForDirection = direction => direction === 'forward' ? 'assets/right-arrow.png' : 'assets/left-arrow.png'

const selectorForDirection = direction => direction === 'forward' ? '.blog-pager-newer-link' : '.blog-pager-older-link'

const setCorrectIcon = (tabId) => {
    browser.pageAction.setIcon({
        path: iconForDirection(direction),
        tabId
    })
}

const navigateAppropriately = (tabId) => {
    const script = {
        code: `document.querySelector('${selectorForDirection(direction)}').click()`
    }
    browser.tabs.executeScript(
        tabId,
        script
    )
}

const handleClick = (tab, {button}) => {
    const { id } = tab
    // see contents of tab at https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/Tab

    if (button === 1) {
        // middle click is to change direction

        reverseDirection()
        setCorrectIcon(id)

    } else {
        // normal click

        navigateAppropriately(id)

    }
}

browser.pageAction.onClicked.addListener(handleClick);

const handleTabUpdate = (tabId, changeInfo) => {
    if (changeInfo.status !== 'loading') return;
    setCorrectIcon(tabId)
}

browser.tabs.onUpdated.addListener(handleTabUpdate);

const handleTabActive = ({tabId}) => {
    setCorrectIcon(tabId)
}

browser.tabs.onActivated.addListener(handleTabActive);
