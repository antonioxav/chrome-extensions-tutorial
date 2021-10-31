let page = document.getElementById("buttonDiv");
let selectedClassName = "cuurent";
const presetButtonColours = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"]

// Styles the clicked button as selected and saves the selection
function handleButtonClick(event) {
    //Remove styling from the previously selected colour
    let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    if (current && current!=event.target) {
        current.classList.remove(selectedClassName);
    }

    //Mark the button as selected
    let colour = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({colour})
}

// Add a button to the page for each supplied colour
function constructOptions(buttonColours) {
    chrome.storage.sync.get("colour", (data) => {
        let currentColour = data.colour;
        // For each colour create a button with that colour
        for (let buttonColour of buttonColours){
            let button = document.createElement("button");
            button.dataset.color = buttonColour;
            button.style.backgroundColor = buttonColour;

            //mark the currently selectedcolour
            if (buttonColour == currentColour) {
                button.classList.add(selectedClassName);
            }

            //register a click listener
            button.addEventListener("click", handleButtonClick);
            page.appendChild(button);
        }
    })
}

//Initialize page
constructOptions(presetButtonColours);