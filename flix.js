// Determine which image to use based on presence of any image with "prime-user.png" in the src  
let isPrimeUser = Array.from(document.images).some(img => img.src.includes("prime-user.png"));  
let customImageSrc = isPrimeUser  
    ? "https://i.postimg.cc/zXzRcLD0/20250406-135713.png"  
    : "https://i.postimg.cc/Hntg3JL9/99ea8317d4057161b002f47d0827d852.png";  
  
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
  
detectReturnToNetfree();    
  
if (!window.location.href.includes("netfree")) {    
    window.location.href = "https://digitalaga.github.io/ZeroflixWeb/ad.html";    
}    
  
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
loadingImage.src = customImageSrc;    
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
        width: 20vw !important;    
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
  
["note-msg", "download-app-container", "appdownload", "footer", "ott-head", "ott-apps", "modal-account"].forEach(className => {    
    document.querySelectorAll(`.${className}`).forEach(element => element.remove());    
});    
  
document.querySelectorAll(".telemsg").forEach(element => element.remove());    
  
let accountDiv = document.querySelector(".account");    
if (accountDiv) accountDiv.remove();    
  
document.querySelectorAll('img[src="https://netfree.cc/mobile/img/p11111.png"]').forEach(img => {    
    img.src = "https://i.postimg.cc/28sfgH23/20250331-003104.jpg";    
});    
  
document.querySelectorAll('.brand-logo').forEach(img => {    
    img.src = customImageSrc;    
});    
  
let disneyDiv = document.querySelector('.iconClass.disneyplus');    
if (disneyDiv) {    
    let img = document.createElement("img");    
    img.src = customImageSrc;    
    img.style.width = "50px";    
    img.style.height = "50px";    
    disneyDiv.replaceWith(img);    
}    
  
let favicon = document.querySelector("link[rel~='icon']");    
if (favicon) {    
    favicon.href = customImageSrc;    
} else {    
    favicon = document.createElement("link");    
    favicon.rel = "icon";    
    favicon.href = customImageSrc;    
    document.head.appendChild(favicon);    
}    
  
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
  
let navLogo = document.querySelector(".brand-logo");    
if (navLogo) {    
    navLogo.style.width = "20vw";    
    navLogo.style.height = "auto";    
}    
  
console.log("All modifications applied successfully!");

// Create styles for animation, grayscale, and indicator
let enhancedNavStyle = document.createElement("style");
enhancedNavStyle.textContent = `
  @media (orientation: landscape) {
    .bottom-nav-hidden {
      display: none !important;
    }
  }

  .bottom-nav-hidden {
    transition: all 0.3s ease;
  }

  .bottom-nav-icon {
    height: 17px;
    filter: grayscale(100%);
    transition: all 0.2s ease;
    transform: scale(1);
  }

  .bottom-nav-icon.active {
    filter: grayscale(0%);
    transform: scale(1.1);
  }

  .bottom-nav-icon:hover {
    transform: scale(1.15);
  }

  .bottom-nav-icon:active {
    transform: scale(0.95);
  }

  .bottom-indicator {
    position: absolute;
    bottom: 0;
    height: 4px;
    width: 50%;
    transition: all 0.3s ease;
  }

  .bottom-indicator.netflix {
    background-color: red;
    left: 0;
  }

  .bottom-indicator.prime {
    background-color: #1399ff;
    left: 50%;
  }

`;
document.head.appendChild(enhancedNavStyle);

// Create the bottom nav
let bottomNav = document.createElement("div");
bottomNav.style.position = "fixed";
bottomNav.style.bottom = "0";
bottomNav.style.left = "0";
bottomNav.style.width = "100%";
bottomNav.style.height = "60px";
bottomNav.style.backgroundColor = "#111";
bottomNav.style.display = "flex";
bottomNav.style.justifyContent = "space-around";
bottomNav.style.alignItems = "center";
bottomNav.style.zIndex = "9999";
bottomNav.style.position = "fixed";
bottomNav.classList.add("bottom-nav-hidden");
bottomNav.style.boxShadow = "0 -2px 5px rgba(0,0,0,0.5)";
bottomNav.style.position = "fixed";

// Create the indicator
let indicator = document.createElement("div");
indicator.classList.add("bottom-indicator");

// Determine active state
let isPrime = isPrimeUser; // already defined
if (isPrime) {
    indicator.classList.add("prime");
} else {
    indicator.classList.add("netflix");
}

// Create images
let netflixImg = document.createElement("img");
netflixImg.src = "https://i.postimg.cc/Hntg3JL9/99ea8317d4057161b002f47d0827d852.png";
netflixImg.className = "bottom-nav-icon";
if (!isPrime) netflixImg.classList.add("active");

netflixImg.onclick = () => {
    $(".move-ott").removeClass("hide");
    $.ajax({
        type: "POST",
        url: "/mobile/setting.php",
        data: { ott: "nf" },
        success: function(result) {
            if (result.error == "no") {
                console.log("OTT set to nf successfully.");
            } else {
                $(".move-ott").addClass("hide");
                alert_msg("warning", result.error);
            }
            setTimeout(() => location.reload(), 1000);
        }
    });
};

let primeImg = document.createElement("img");
primeImg.src = "https://i.postimg.cc/zXzRcLD0/20250406-135713.png";
primeImg.className = "bottom-nav-icon";
if (isPrime) primeImg.classList.add("active");

primeImg.onclick = () => {
    $(".move-ott").removeClass("hide");
    $.ajax({
        type: "POST",
        url: "/mobile/setting.php",
        data: { ott: "pv" },
        success: function(result) {
            if (result.error == "no") {
                console.log("OTT set to pv successfully.");
            } else {
                $(".move-ott").addClass("hide");
                alert_msg("warning", result.error);
            }
            setTimeout(() => location.reload(), 1000);
        }
    });
};

// Add everything
bottomNav.appendChild(netflixImg);
bottomNav.appendChild(primeImg);
bottomNav.appendChild(indicator);
document.body.appendChild(bottomNav);

               
