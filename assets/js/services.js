// Services Page Specific JavaScript

// Enhanced hero blobs animation with better movement
;(() => {
    var blobs = Array.prototype.slice.call(document.querySelectorAll(".services-accents .sblob"))
    if (!blobs.length) return
  
    function rand(min, max) {
      return Math.random() * (max - min) + min
    }
  
    // Initialize transition properties
    blobs.forEach((blob) => {
      blob.style.transition = "transform 2s ease-in-out"
    })
  
    function animate() {
      blobs.forEach((blob, index) => {
        var x = rand(-25, 25)
        var y = rand(-25, 25)
        var s = rand(0.9, 1.15)
        var r = rand(-3, 3)
        // Different movement patterns for each blob
        var multiplier = (index + 1) * 0.8
        blob.style.transform =
          "translate(" + x * multiplier + "px," + y * multiplier + "px) scale(" + s + ") rotate(" + r + "deg)"
      })
    }
  
    // Run animation every 3 seconds for smoother floating motion
    setInterval(animate, 3000)
  
    // Initial call to start immediately
    animate()
  })()
  
  // Enhanced reveal-on-scroll with staggered animations - RESTORED for non-service sections
  ;(() => {
    var targets = Array.prototype.slice.call(document.querySelectorAll(".reveal"))
    if (!targets.length) return
  
    // Filter out service sections to prevent their animation
    var nonServiceTargets = targets.filter((target) => !target.classList.contains("service-section"))
  
    function revealNowInView() {
      nonServiceTargets.forEach((t, index) => {
        if (t.classList.contains("show")) return
        var rect = t.getBoundingClientRect()
        if (rect.top < window.innerHeight - 100) {
          // Add slight delay for staggered effect
          setTimeout(() => {
            t.classList.add("show")
          }, index * 150)
        }
      })
    }
  
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains("service-section")) {
              setTimeout(() => {
                entry.target.classList.add("show")
              }, index * 150)
              io.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: "100px 0px" },
      )
  
      nonServiceTargets.forEach((t) => {
        io.observe(t)
      })
    }
  
    // Fallback and first-pass reveal for elements already in or near viewport
    revealNowInView()
    window.addEventListener("scroll", revealNowInView, { passive: true })
  })()
  
  // Interactive FAQ toggles with enhanced animation
  ;(() => {
    var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"))
    if (!faqItems.length) return
  
    faqItems.forEach((item) => {
      var btn = item.querySelector(".faq-q")
      var ans = item.querySelector(".faq-a")
      if (!btn || !ans) return
  
      btn.addEventListener("click", () => {
        var isOpen = item.classList.contains("open")
  
        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("open")
            var otherBtn = otherItem.querySelector(".faq-q")
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false")
          }
        })
  
        // Toggle current item
        var newState = !isOpen
        item.classList.toggle("open", newState)
        btn.setAttribute("aria-expanded", String(newState))
      })
    })
  })()
  
  // Enhanced button hover effects - SIMPLIFIED for better performance
  ;(() => {
    var primaryBtns = Array.prototype.slice.call(document.querySelectorAll(".btn.primary"))
    var ghostBtns = Array.prototype.slice.call(document.querySelectorAll(".btn.ghost"))
  
    // Add bounce effect to primary buttons on click
    primaryBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Add extra bounce on click
        btn.style.animation = "bounce 0.6s ease"
        setTimeout(() => {
          btn.style.animation = "subtlePulse 3s ease-in-out infinite"
        }, 600)
      })
    })
  
    // Add subtle hover feedback for ghost buttons
    ghostBtns.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-3px) scale(1.03)"
      })
  
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0) scale(1)"
      })
    })
  })()
  
  // Service cards - ALL ANIMATIONS DISABLED for stable layout
  // Hover effects are now handled purely by CSS without JavaScript transforms
  
  // Parallax effect for section dividers
  ;(() => {
    var dividers = Array.prototype.slice.call(document.querySelectorAll(".section-divider"))
  
    function updateParallax() {
      var scrolled = window.pageYOffset
  
      dividers.forEach((divider, index) => {
        var rect = divider.getBoundingClientRect()
        var speed = 0.5 + index * 0.2
  
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          var yPos = -(scrolled * speed)
          divider.style.transform = `translateY(${yPos * 0.1}px)`
        }
      })
    }
  
    window.addEventListener("scroll", updateParallax, { passive: true })
  })()
  
  // Chip animations DISABLED - handled by CSS only for stable layout
  
  // Hero panel hover enhancement
  ;(() => {
    var heroPanel = document.querySelector(".hero-panel")
    if (!heroPanel) return
  
    heroPanel.addEventListener("mouseenter", () => {
      heroPanel.style.transform = "translateY(-6px) scale(1.01)"
    })
  
    heroPanel.addEventListener("mouseleave", () => {
      heroPanel.style.transform = "translateY(0) scale(1)"
    })
  })()
  
  // Value cards entrance animation - RESTORED
  ;(() => {
    var valueCards = Array.prototype.slice.call(document.querySelectorAll(".value-card"))
  
    function animateValueCards() {
      valueCards.forEach((card, index) => {
        var rect = card.getBoundingClientRect()
        if (rect.top < window.innerHeight - 50 && !card.classList.contains("animated")) {
          setTimeout(() => {
            card.style.animation = "slideInUp 0.6s ease forwards"
            card.classList.add("animated")
          }, index * 150)
        }
      })
    }
  
    // Add animation keyframes
    var style = document.createElement("style")
    style.textContent = `
          @keyframes slideInUp {
              from {
                  opacity: 0;
                  transform: translateY(30px);
              }
              to {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
      `
    document.head.appendChild(style)
  
    window.addEventListener("scroll", animateValueCards, { passive: true })
    animateValueCards() // Initial check
  })()
  
  // Process steps sequential animation - RESTORED
  ;(() => {
    var processSteps = Array.prototype.slice.call(document.querySelectorAll(".p-step"))
  
    function animateProcessSteps() {
      var processSection = document.querySelector(".svc-process")
      if (!processSection) return
  
      var rect = processSection.getBoundingClientRect()
      if (rect.top < window.innerHeight - 100) {
        processSteps.forEach((step, index) => {
          if (!step.classList.contains("animated")) {
            setTimeout(() => {
              step.style.animation = "fadeInScale 0.8s ease forwards"
              step.classList.add("animated")
            }, index * 200)
          }
        })
      }
    }
  
    // Add animation keyframes
    var style = document.createElement("style")
    style.textContent = `
          @keyframes fadeInScale {
              from {
                  opacity: 0;
                  transform: scale(0.8);
              }
              to {
                  opacity: 1;
                  transform: scale(1);
              }
          }
      `
    document.head.appendChild(style)
  
    window.addEventListener("scroll", animateProcessSteps, { passive: true })
    animateProcessSteps() // Initial check
  })()
  
  // Engagement models cards hover effect enhancement
  ;(() => {
    var modelCards = Array.prototype.slice.call(document.querySelectorAll(".model"))
  
    modelCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        var pill = card.querySelector(".pill")
        if (pill) {
          pill.style.transform = "scale(1.1)"
          pill.style.background = "rgba(99,102,241,.25)"
        }
      })
  
      card.addEventListener("mouseleave", () => {
        var pill = card.querySelector(".pill")
        if (pill) {
          pill.style.transform = "scale(1)"
          pill.style.background = "rgba(99,102,241,.15)"
        }
      })
    })
  })()
  
  // Services page scroll effects - DISABLED to prevent animation loops
  // All service sections now have static positioning for better stability
  