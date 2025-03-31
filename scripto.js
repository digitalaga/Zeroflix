(function() { console.log("Script loaded!");

function applyModifications() {
    console.log("Applying modifications...");

    // Remove unwanted elements
    ["note-msg", "download-app-container", "appdownload", "footer", "ott-list"].forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(element => element.remove());
    });

    document.querySelectorAll(".telemsg").forEach(element => element.remove());

    let accountDiv = document.querySelector(".account");
    if (accountDiv) accountDiv.remove();

    // Replace specific images
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

    let favicon = document.querySelector("link[rel~='icon']");
    if (favicon) {
        favicon.href = "https://i.postimg.cc/Hntg3JL9/99ea8317d4057161b002f47d0827d852.png";
    } else {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = "https://i.postimg.cc/Hntg3JL9/99ea8317d4057161b002f47d0827d852.png";
        document.head.appendChild(favicon);
    }

    // Replace NETMIRROR text with Zeroflix
    document.querySelectorAll("a, p").forEach(element => {
        let oldHTML = element.innerHTML;
        let newHTML = oldHTML.replace(/NETMIRROR/g, "Zeroflix").replace(/NetMirror/g, "Zeroflix");

        if (newHTML !== oldHTML && element.tagName === "A") {
            element.removeAttribute("href");
        }

        element.innerHTML = newHTML;
    });

    document.querySelectorAll('a[onclick*="location.href='/mobile/?app=2';"]').forEach(a => {
        a.removeAttribute("onclick");
    });

    console.log("Modifications applied successfully!");
}

// Run modifications immediately
applyModifications();

// Debounced MutationObserver to prevent excessive executions
let debounceTimer;
const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        console.log("Detected page changes, reapplying modifications...");
        applyModifications();
    }, 500); // Adjust debounce delay if needed
});

observer.observe(document.body, { childList: true, subtree: true });

})();

                               
