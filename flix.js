(function () {
  const url = window.location.hostname;
  if (!url.includes("netfree.cc")) return;

  // Avoid duplicates
  if (document.querySelector('.netflix-bottom-nav')) return;

  // Inject Material Icons
  const iconFont = document.createElement('link');
  iconFont.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  iconFont.rel = 'stylesheet';
  document.head.appendChild(iconFont);

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    .netflix-bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #141414;
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.6);
      z-index: 9999;
      border-top: 2px solid #e50914;
    }

    .netflix-bottom-nav .nav-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #bbb;
      text-decoration: none;
      transition: color 0.3s ease, transform 0.3s ease;
      border-radius: 50px;
      padding: 6px 12px;
    }

    .netflix-bottom-nav .material-icons {
      font-size: 26px;
      margin-bottom: 3px;
      transition: transform 0.3s ease;
    }

    .netflix-bottom-nav .label {
      font-size: 12px;
      transition: opacity 0.3s ease;
    }

    .netflix-bottom-nav .nav-btn.active,
    .netflix-bottom-nav .nav-btn:hover {
      color: #fff;
      background: rgba(229, 9, 20, 0.2);
    }

    .netflix-bottom-nav .nav-btn.active .material-icons,
    .netflix-bottom-nav .nav-btn:hover .material-icons {
      transform: scale(1.2);
    }

    .netflix-bottom-nav .nav-btn.active .label,
    .netflix-bottom-nav .nav-btn:hover .label {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // Inject HTML
  const navBar = document.createElement('div');
  navBar.className = 'netflix-bottom-nav';
  navBar.innerHTML = `
    <a href="https://netfree.cc/mobile/movies?app=1" class="nav-btn active">
      <span class="material-icons">movie</span>
      <span class="label">Movies</span>
    </a>
    <a href="https://netfree.cc/mobile/home?app=1" class="nav-btn">
      <span class="material-icons">home</span>
      <span class="label">Home</span>
    </a>
    <a href="https://netfree.cc/mobile/series?app=1" class="nav-btn">
      <span class="material-icons">live_tv</span>
      <span class="label">Series</span>
    </a>
  `;
  document.body.appendChild(navBar);

  // Inject JS for active state switching
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();

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
