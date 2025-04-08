(function() {
    // Check if the current URL is netfree.cc or its subdomains/subpages
    if (!window.location.hostname.includes('netfree.cc')) {
        console.log('Navigation bar only works on netfree.cc domains');
        return;
    }

    // Create style element
    const style = document.createElement('style');
    style.textContent = `
        .custom-bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #000;
            display: flex;
            height: 60px;
            border-top: 1px solid #333;
            z-index: 9999;
        }
        .custom-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            flex: 1;
            position: relative;
            overflow: hidden;
        }
        .custom-nav-icon-container {
            position: relative;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-nav-icon {
            width: 32px;
            height: 32px;
            object-fit: contain;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            filter: grayscale(100%) brightness(0.7) opacity(0.8);
            position: absolute;
        }
        .custom-nav-item.active .custom-nav-icon {
            width: 38px;
            height: 38px;
            filter: none;
            opacity: 1;
        }
        .custom-active-indicator {
            position: absolute;
            bottom: 0;
            height: 3px;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .custom-nav-item:nth-child(1) .custom-active-indicator {
            right: 0;
            width: 0%;
            transform-origin: right center;
            background: #e50914;
        }
        .custom-nav-item:nth-child(1).active .custom-active-indicator {
            width: 100%;
            left: 0;
            right: auto;
        }
        .custom-nav-item:nth-child(2) .custom-active-indicator {
            left: 0;
            width: 0%;
            transform-origin: left center;
            background: #1399FF;
        }
        .custom-nav-item:nth-child(2).active .custom-active-indicator {
            width: 100%;
        }
        @keyframes custom-selection-pop {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-12px) scale(1.15); }
            100% { transform: translateY(0) scale(1.08); }
        }
        .custom-nav-selection-animation {
            animation: custom-selection-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes custom-deselection-smooth {
            0% { transform: scale(1.08); }
            100% { transform: scale(1); }
        }
        .custom-nav-deselection-animation {
            animation: custom-deselection-smooth 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
    `;
    
    // Create nav element
    const nav = document.createElement('nav');
    nav.className = 'custom-bottom-nav';
    nav.innerHTML = `
        <a href="#" class="custom-nav-item" data-tab="netflix">
            <div class="custom-active-indicator"></div>
            <div class="custom-nav-icon-container">
                <img src="https://i.postimg.cc/Hntg3JL9/99ea8317d4057161b002f47d0827d852.png" class="custom-nav-icon" alt="Netflix">
            </div>
        </a>
        <a href="#" class="custom-nav-item" data-tab="prime">
            <div class="custom-active-indicator"></div>
            <div class="custom-nav-icon-container">
                <img src="https://i.postimg.cc/zXzRcLD0/20250406-135713.png" class="custom-nav-icon" alt="Prime">
            </div>
        </a>
    `;
    
    // Add to document
    document.head.appendChild(style);
    document.body.appendChild(nav);

    // Initialize selected service
    const loadServiceScript = () => {
        const selectedService = localStorage.getItem('selectedService') || 'netflix';
        const activeItem = nav.querySelector(`.custom-nav-item[data-tab="${selectedService}"]`);
        activeItem.classList.add('active');
        
        // Load appropriate script based on selection
        const scriptUrl = selectedService === 'netflix' 
            ? 'https://digitalaga.github.io/Zeroflix/flix.js'
            : 'https://digitalaga.github.io/Zeroflix/prime.js';
        
        // Check if script already exists
        if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
            const script = document.createElement('script');
            script.src = scriptUrl;
            document.head.appendChild(script);
        }
    };
    
    // Handle service selection
    const handleServiceSelection = (service) => {
        localStorage.setItem('selectedService', service);
        
        $(".move-ott").removeClass("hide");
        if (!sessionStorage.getItem("ott_sent")) {
            const ottValue = service === 'netflix' ? 'nf' : 'pv';
            
            $.ajax({
                type: "POST",
                url: "/mobile/setting.php",
                data: { ott: ottValue },
                success: function(result) {
                    if (result.error == "no") {
                        sessionStorage.setItem("ott_sent", "1");
                        console.log("OTT set successfully");
                        window.location.reload();
                    } else {
                        $(".move-ott").addClass("hide");
                        alert_msg("warning", result.error);
                    }
                },
                error: function() {
                    $(".move-ott").addClass("hide");
                    alert_msg("warning", "Failed to set OTT");
                }
            });
        } else {
            window.location.reload();
        }
    };
    
    // Add event listeners
    nav.querySelectorAll('.custom-nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.getAttribute('data-tab');
            handleServiceSelection(service);
        });
    });
    
    // Initialize on load
    loadServiceScript();
    console.log('Custom navigation bar injected successfully');
})();
