// Function to detect when user returns to netfree.cc and reload the page twice
function detectReturnToNetfree() {
    let lastUrl = "";

    setInterval(() => {
        let currentUrl = window.location.href;

        if (!currentUrl.includes("netfree.cc")) {
            lastUrl = currentUrl;
        } else if (lastUrl && currentUrl.includes("netfree.cc")) {
            location.reload();
            setTimeout(() => location.reload(), 500);
            lastUrl = "";
        }
    }, 1000);
}

// Execute return detection
detectReturnToNetfree();

// Redirect if URL does not contain "netfree"
if (!window.location.href.includes("netfree")) {
    window.location.href = "https://digitalaga.github.io/ZeroflixWeb/ad.html";
}

// Add loading screen
let loadingOverlay = document.createElement("div");
loadingOverlay.style.position = "fixed";
loadingOverlay.style.top = "0";
loadingOverlay.style.left = "0";
loadingOverlay.style.width = "100%";
loadingOverlay.style.height = "100%";
loadingOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
loadingOverlay.style.zIndex = "9998";
loadingOverlay.style.display = "flex";
loadingOverlay.style.justifyContent = "center";
loadingOverlay.style.alignItems = "center";

let loadingContainer = document.createElement("div");
loadingContainer.style.textAlign = "center";

let loadingImage = document.createElement("img");
loadingImage.src = "https://i.postimg.cc/Hntg3JL9/99ea8317d4057161b002f47d0827d852.png";
loadingImage.style.width = "30%";

let loadingSpinner = document.createElement("div");
loadingSpinner.style.width = "50px";
loadingSpinner.style.height = "50px";
loadingSpinner.style.border = "5px solid white";
loadingSpinner.style.borderTop = "5px solid red";
loadingSpinner.style.borderRadius = "50%";
loadingSpinner.style.margin = "20px auto";
loadingSpinner.style.animation = "spin 1s linear infinite";

let styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    article .card-img-container img.loading, 
    .top10-img-1.loading,
    article .card-img-container img.error {
        background: #0000 url("https://i.postimg.cc/28sfgH23/20250331-003104.jpg") center/130% no-repeat;
    }

    .header .brand-logo {
        width: 12vw !important;
        transition: all 1s ease-in-out;
        pointer-events: none;
    }
    
    .header.hhide .brand-logo {
        width: 12vw !important;
    }
`;
document.head.appendChild(styleSheet);

loadingContainer.appendChild(loadingImage);
loadingContainer.appendChild(loadingSpinner);
loadingOverlay.appendChild(loadingContainer);
document.body.appendChild(loadingOverlay);

setTimeout(() => {
    loadingOverlay.remove();
}, 1000);

["note-msg", "download-app-container", "appdownload", "footer", "ott-list"].forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(element => element.remove());
});

document.querySelectorAll(".telemsg").forEach(element => element.remove());

let accountDiv = document.querySelector(".account");
if (accountDiv) accountDiv.remove();

// Replace images
document.querySelectorAll('img[src="https://netfree.cc/mobile/img/p11111.png"]').forEach(img => {
    img.src = "https://i.postimg.cc/28sfgH23/20250331-003104.jpg";
});

document.querySelectorAll('.brand-logo').forEach(img => {
    img.src = "https://i.postimg.cc/Hntg3JL9/99ea8317d4057161b002f47d0827d852.png";
});

let disneyDiv = document.querySelector('.iconClass.disneyplus');
if (disneyDiv) {
    let img = document.createElement("img");
    img.src = "https://i.postimg.cc/Hntg3JL9/99ea8317d4057161b002f47d0827d852.png";
    img.style.width = "50px";
    img.style.height = "50px";
    disneyDiv.replaceWith(img);
}

// Update favicon
let favicon = document.querySelector("link[rel~='icon']");
if (favicon) {
    favicon.href = "https://i.postimg.cc/Hntg3JL9/99ea8317d4057161b002f47d0827d852.png";
} else {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "https://i.postimg.cc/Hntg3JL9/99ea8317d4057161b002f47d0827d852.png";
    document.head.appendChild(favicon);
}

// Replace text occurrences
document.querySelectorAll('a, p').forEach(element => {
    let oldHTML = element.innerHTML;
    let newHTML = oldHTML.replace(/NETMIRROR/g, "Zeroflix").replace(/NetMirror/g, "Zeroflix");

    if (newHTML !== oldHTML && element.tagName === "A") {
        element.removeAttribute("href");
    }

    element.innerHTML = newHTML;
});

document.querySelectorAll('a[onclick*="location.href=\'/mobile/?app=2\';"]').forEach(a => {
    a.removeAttribute("onclick");
});

// Set "nav-logo" width
let navLogo = document.querySelector(".brand-logo");
if (navLogo) {
    navLogo.style.width = "20vw";
    navLogo.style.height = "auto";
}

console.log("All modifications applied successfully!");
