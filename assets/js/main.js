// Mobile nav toggle and Services mega menu accessibility
;(() => {
  var toggle = document.querySelector(".nav-toggle")
  var menu = document.getElementById("nav-menu")
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      var isOpen = menu.classList.toggle("open")
      toggle.setAttribute("aria-expanded", String(isOpen))
    })
  }

  var services = document.querySelector(".nav-item.has-mega")
  if (services) {
    var servicesLink = services.querySelector("a.services-link")
    if (servicesLink) {
      // Handle click on Services link
      servicesLink.addEventListener("click", (e) => {
        // On desktop, prevent navigation and show dropdown
        if (window.innerWidth > 760) {
          e.preventDefault()
          e.stopPropagation()
          services.classList.toggle("open")
          var expanded = services.classList.contains("open")
          servicesLink.setAttribute("aria-expanded", String(expanded))
        }
        // On mobile, allow normal navigation to services.html
      })

      // Handle hover for dropdown
      services.addEventListener("mouseenter", () => {
        if (window.innerWidth > 760) {
          services.classList.add("open")
          servicesLink.setAttribute("aria-expanded", "true")
        }
      })

      services.addEventListener("mouseleave", () => {
        if (window.innerWidth > 760) {
          services.classList.remove("open")
          servicesLink.setAttribute("aria-expanded", "false")
        }
      })

      services.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          services.classList.remove("open")
          servicesLink.setAttribute("aria-expanded", "false")
          servicesLink.focus()
        }
      })

      document.addEventListener("click", (e) => {
        if (!services.contains(e.target)) {
          services.classList.remove("open")
          servicesLink.setAttribute("aria-expanded", "false")
        }
      })
    }

    // Category switching
    var cats = services.querySelectorAll(".mega-cat")
    var panels = services.querySelectorAll(".mega-panel")
    function activate(target) {
      cats.forEach((c) => {
        c.classList.toggle("active", c.dataset.target === target)
        c.setAttribute("aria-selected", String(c.dataset.target === target))
      })
      panels.forEach((p) => {
        p.classList.toggle("active", p.id === "panel-" + target)
      })
    }
    cats.forEach((cat) => {
      cat.addEventListener("mouseenter", () => {
        activate(cat.dataset.target)
      })
      cat.addEventListener("focus", () => {
        activate(cat.dataset.target)
      })
    })

    var megaLinks = services.querySelectorAll(".mega-links a")
    megaLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Allow normal link behavior
        console.log("Navigating to:", link.href)
      })
    })
  }
})()

// Mobile overlay (simple main links) toggle
;(() => {
  var hamburger = document.querySelector(".nav-toggle")
  var overlay = document.getElementById("nav-overlay")
  var closeBtn = document.getElementById("nav-overlay-close")
  if (!hamburger || !overlay || !closeBtn) return

  function openOverlay() {
    overlay.classList.add("open")
    document.body.classList.add("menu-open")
    overlay.setAttribute("aria-hidden", "false")
  }

  function closeOverlay() {
    overlay.classList.remove("open")
    document.body.classList.remove("menu-open")
    overlay.setAttribute("aria-hidden", "true")
  }

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation()
    if (window.innerWidth <= 760) {
      openOverlay()
    }
  })

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    closeOverlay()
  })

  overlay.addEventListener("click", (e) => {
    var target = e.target
    if (target.classList && target.classList.contains("nav-overlay-item")) {
      closeOverlay()
    }
  })

  // Close overlay when clicking on background
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeOverlay()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      closeOverlay()
    }
  })
})()

// Gentle JS-driven drift for hero blobs
;(() => {
  var blobs = Array.prototype.slice.call(document.querySelectorAll(".hero .blob"))
  if (!blobs.length) return

  function rand(min, max) {
    return Math.random() * (max - min) + min
  }

  // Initialize transition properties
  blobs.forEach((blob) => {
    blob.style.transition = "transform 1s ease-in-out"
  })

  function animate() {
    blobs.forEach((blob) => {
      var x = rand(-20, 20) // Increased movement range for better effect
      var y = rand(-20, 20)
      var s = rand(0.95, 1.1) // Slight scale variations
      blob.style.transform = "translate(" + x + "px," + y + "px) scale(" + s + ")"
    })
  }

  // Run animation every 300ms for faster floating motion
  setInterval(animate, 400)

  // Initial call to start immediately
  animate()
})()
