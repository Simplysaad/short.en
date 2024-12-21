
// const copyValue = (btn, text) => {
//     btn.addEventListener("click", e => {
//         e.preventDefault();
//         navigator.clipboard
//             .writeText(text.value)
//             .then(() => {
//                 console.log("text copied to clipboard");
//             })
//             .catch(err => {
//                 console.error("failed to copy text", err);
//             });

//         btn.classList.add("text-success");
//         btn.classList.replace("fa-clipboard", "fa-check");
//     });
// };

// const originalUrlBtn = document.getElementById("originalUrlBtn");
// const originalUrl = document.getElementById("originalUrl");

// const shortUrlBtn = document.getElementById("shortUrlBtn");
// const shortUrl = document.getElementById("shortUrl");


// copyValue(shortUrlBtn, shortUrl);
// copyValue(originalUrlBtn, originalUrl);

const copyValue = (btn, inputElement) => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        
        // Get the value of the input element
        const textToCopy = inputElement.value;

        // Copy the text to the clipboard
        navigator.clipboard
            .then(() => {
                console.log("Text copied to clipboard");
            })
            .catch(err => {
                console.error("Failed to copy text", err);
            });

        // Change button style to indicate success
        btn.classList.add("text-success");
        btn.classList.replace("fa-clipboard", "fa-check");
    });
};

// Get references to the buttons and input elements
const originalUrlBtn = document.getElementById("originalUrlBtn");
const originalUrl = document.getElementById("originalUrl");

const shortUrlBtn = document.getElementById("shortUrlBtn");
const shortUrl = document.getElementById("shortUrl");

// Initialize the copy functionality
copyValue(shortUrlBtn, shortUrl);
copyValue(originalUrlBtn, originalUrl);
