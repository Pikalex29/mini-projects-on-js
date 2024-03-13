function generateMeme() {
    var image = document.getElementById("image").value; var topText = document.getElementById("top-text").value; var bottomText = document.getElementById("bottom-text").value; var textPosition = document.getElementById("text-position").value; var textColor = document.getElementById("text-color").value; var savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
    var memeContainer = document.getElementById("meme-container");
    memeContainer.innerHTML = "";

    var memeImage = document.createElement("img");
    memeImage.src = image;
    memeImage.classList.add("meme-image");
    memeContainer.appendChild(memeImage);

    var topTextContainer = document.createElement("div");
    topTextContainer.innerText = topText;
    topTextContainer.classList.add("meme-text", "top-text");
    memeContainer.appendChild(topTextContainer);
    topTextContainer.style.color = textColor;

    var bottomTextContainer = document.createElement("div");
    bottomTextContainer.innerText = bottomText;
    bottomTextContainer.classList.add("meme-text", "bottom-text");
    memeContainer.appendChild(bottomTextContainer);
    bottomTextContainer.style.color = textColor;

    setMemeTextPosition(topTextContainer, bottomTextContainer, textPosition);

    // Save meme data in local storage
    savedMemes.push({
        image: image,
        topText: topText,
        bottomText: bottomText,
        textPosition: textPosition,
        textColor: textColor
    });
    localStorage.setItem("savedMemes", JSON.stringify(savedMemes));
    // Display saved memes
    displaySavedMemes();
}



function setMemeTextPosition(topTextContainer, bottomTextContainer, position) {
    switch (position) {
        case "top-left":
            topTextContainer.style.top = "10px";
            topTextContainer.style.left = "10px";
            bottomTextContainer.style.bottom = "10px";
            bottomTextContainer.style.left = "10px";
            break;
        case "top-right":
            topTextContainer.style.top = "10px";
            topTextContainer.style.right = "10px";
            bottomTextContainer.style.bottom = "10px";
            bottomTextContainer.style.right = "10px";
            break;
        case "center":
            topTextContainer.style.top = "20px";
            topTextContainer.style.left = "50%";
            topTextContainer.style.transform = "translate(-50%, -40%)";
            bottomTextContainer.style.bottom = "20px";
            bottomTextContainer.style.left = "50%";
            bottomTextContainer.style.transform = "translate(-50%, 40%)";
            break;

    }
}

function shareOnTwitter() {
    var memeHtml = generateMeme();

    var newWindow = window.open("", "_blank");
    newWindow.document.write("<html><head><title>Meme Preview</title><style>body{ margin: 0; }</style></head><body>" + memeHtml + "</body></html>");

    setTimeout(function () {
        html2canvas(newWindow.document.body).then(function (canvas) {
            var dataUrl = canvas.toDataURL();
            var url = "https://web.telegram.org" + encodeURIComponent(dataUrl);
            newWindow.location.href = url;
        });
    }, 500);
}

function displaySavedMemes() {
    var savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
    var savedMemesList = document.querySelector(".saved-memes-list");
    savedMemesList.innerHTML = "";
    savedMemes.forEach(function (meme, index) {
        var memeImage = document.createElement("img");
        memeImage.src = meme.image;
        memeImage.alt = "Saved Meme";
        memeImage.addEventListener("click", function () {
            loadSavedMeme(index);
        });
        savedMemesList.appendChild(memeImage);
    });
}

function loadSavedMeme(index) {
    var savedMemes = JSON.parse(localStorage.getItem("savedMemes")) || [];
    if (index >= 0 && index < savedMemes.length) {
        var meme = savedMemes[index];
        document.getElementById("image").value = meme.image;
        document.getElementById("top-text").value = meme.topText;
        document.getElementById("bottom-text").value = meme.bottomText;
        document.getElementById("text-position").value = meme.textPosition;
        document.getElementById("text-color").value = meme.textColor;
        generateMeme();
    }
}
// Display saved memes when the page loads
displaySavedMemes();

// Save Meme Function
function saveMeme() {
    var memeContainer = document.getElementById("meme-container");

    html2canvas(memeContainer, {
        allowTaint: true,
        useCORS: true
    }).then(function (canvas) {
        var link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "meme.png"; link.click();
    });
}