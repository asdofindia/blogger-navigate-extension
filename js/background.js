const handleClick = (tab) => {

    // see contents of tab at https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/Tab
    const { id } = tab

    const script = {
        code: `document.querySelector('.blog-pager-newer-link').click()`
    }
    browser.tabs.executeScript(
        id,
        script
    )
}
browser.pageAction.onClicked.addListener(handleClick);
