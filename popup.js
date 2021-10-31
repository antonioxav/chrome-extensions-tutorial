// Initialize button with user's preferred colour
let changeColour = document.getElementById("changeColour");

chrome.storage.sync.get("colour", ({ colour }) => {
  changeColour.style.backgroundColor = colour;
});

// When the button is clicked, execute SetBackgroundPageColour. Implemented using programatic injection: prevents loading unnecessary code.
changeColour.addEventListener("click", async () => {
    // get current tab
    let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

    // execute SetBackgroundPageColour on current lab
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: SetBackgroundPageColour
  });
});

// The body of this function will be executed as a content script inside the current page
function SetBackgroundPageColour() {
    chrome.storage.sync.get("colour", ({colour}) => {
        document.body.style.backgroundColor = colour;
    });
}