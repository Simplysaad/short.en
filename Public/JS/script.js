fetch("/get-all-urls")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data[0]);
        
        data.forEach(url=>{
          console.log(url.shortUrl);
        })
    });

const copyValue = (btn, inputElement) => {
    btn.addEventListener("click", e => {
        e.preventDefault();

        const textToCopy = inputElement.value;

        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                console.log("Text copied to clipboard");

                // Change button style to indicate success
                let icon = btn.querySelector(".fa-clipboard");
                btn.classList.add("text-success");
                icon.classList.replace("fa-clipboard", "fa-check");

                // Reset button icon after 2 seconds
                setTimeout(() => {
                    let icon = btn.querySelector(".fa-check");
                    btn.classList.remove("text-success");
                    icon.classList.replace("fa-check", "fa-clipboard");
                }, 5000); // Reset after 5 seconds
            })
            .catch(err => {
                console.error("Failed to copy text", err);
            });
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
