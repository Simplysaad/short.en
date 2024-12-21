const originalUrlBtn = document.getElementById("originalUrlBtn");
const originalUrl = document.getElementById("originalUrl");

const shortUrlBtn = document.getElementById("shortUrlBtn");
const shortUrl = document.getElementById("shortUrl");

const copyValue = (btn, text) => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        navigator.clipboard
            .writeText(text.value)
            .then(data => {
                alert(`you copied ${data} to clipboard`);
                console.log(data);
            })
            .catch(err => {
                console.error("failed to copy text", err);
            });

        btn.classList.add("text-success");
        btn.classList.replace("fa-clipboard", "fa-check");
    });
};

copyValue(shortUrlBtn, shortUrl);
copyValue(originalUrlBtn, originalUrl);
