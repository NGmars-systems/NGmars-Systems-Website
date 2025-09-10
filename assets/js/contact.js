// EmailJS Configuration - REPLACE THESE WITH YOUR ACTUAL VALUES
const EMAILJS_CONFIG = {
    SERVICE_ID: "service_rvasv5b", // Replace with your EmailJS service ID
    TEMPLATE_ID: "template_15zhydq", // Replace with your EmailJS template ID
    PUBLIC_KEY: "0TEX1uXtx1dnDhgUM", // Replace with your EmailJS public key
  }
  
  // Declare emailjs variable
  const emailjs = window.emailjs
  
  // Initialize EmailJS
  ;(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
  })()
  
  // Form handling
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form")
    const submitBtn = document.getElementById("submit-btn")
    const btnText = submitBtn.querySelector(".btn-text")
    const spinner = submitBtn.querySelector(".spinner")
    const successMessage = document.getElementById("success-message")
    const errorMessage = document.getElementById("error-message")
  
    // Form submission handler
    form.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Show loading state
      setLoadingState(true)
      hideMessages()
  
      // Get form data
      const formData = new FormData(form)
      const templateParams = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        service_interest: formData.get("service_interest"),
      }
  
      // Send email using EmailJS
      emailjs
        .send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text)
          showSuccessMessage()
          form.reset()
        })
        .catch((error) => {
          console.log("FAILED...", error)
          showErrorMessage()
        })
        .finally(() => {
          setLoadingState(false)
        })
    })
  
    // Helper functions
    function setLoadingState(loading) {
      if (loading) {
        submitBtn.disabled = true
        btnText.textContent = "Sending..."
        spinner.style.display = "block"
        submitBtn.querySelector("i").style.display = "none"
      } else {
        submitBtn.disabled = false
        btnText.textContent = "Send Message"
        spinner.style.display = "none"
        submitBtn.querySelector("i").style.display = "inline"
      }
    }
  
    function showSuccessMessage() {
      successMessage.style.display = "flex"
      setTimeout(() => {
        successMessage.style.display = "none"
      }, 5000)
    }
  
    function showErrorMessage() {
      errorMessage.style.display = "flex"
      setTimeout(() => {
        errorMessage.style.display = "none"
      }, 5000)
    }
  
    function hideMessages() {
      successMessage.style.display = "none"
      errorMessage.style.display = "none"
    }
  
    // Form validation enhancements
    const inputs = form.querySelectorAll("input, textarea, select")
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField)
      input.addEventListener("input", clearFieldError)
    })
  
    function validateField(e) {
      const field = e.target
      const value = field.value.trim()
  
      // Remove existing error styling
      field.classList.remove("error")
  
      // Validate required fields
      if (field.hasAttribute("required") && !value) {
        showFieldError(field, "This field is required")
        return false
      }
  
      // Validate email
      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          showFieldError(field, "Please enter a valid email address")
          return false
        }
      }
  
      // Validate phone
      if (field.type === "tel" && value) {
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
        if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ""))) {
          showFieldError(field, "Please enter a valid phone number")
          return false
        }
      }
  
      return true
    }
  
    function showFieldError(field, message) {
      field.classList.add("error")
  
      // Remove existing error message
      const existingError = field.parentNode.querySelector(".field-error")
      if (existingError) {
        existingError.remove()
      }
  
      // Add new error message
      const errorDiv = document.createElement("div")
      errorDiv.className = "field-error"
      errorDiv.textContent = message
      field.parentNode.appendChild(errorDiv)
    }
  
    function clearFieldError(e) {
      const field = e.target
      field.classList.remove("error")
      const errorMsg = field.parentNode.querySelector(".field-error")
      if (errorMsg) {
        errorMsg.remove()
      }
    }
  
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(".quick-btn, .social-btn, .info-item")
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.05)"
      })
  
      element.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)"
      })
    })
  })
  
  // Add CSS for field errors
  const style = document.createElement("style")
  style.textContent = `
      .form-group input.error,
      .form-group textarea.error,
      .form-group select.error {
          border-color: #e74c3c;
          box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
      }
      
      .field-error {
          color: #e74c3c;
          font-size: 12px;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
      }
      
      .field-error::before {
          content: "⚠";
          font-size: 14px;
      }
  `
  document.head.appendChild(style)
  
  /*
  EMAILJS SETUP INSTRUCTIONS:
  ==========================
  
  1. Go to https://www.emailjs.com/ and create an account
  2. Create a new service (Gmail, Outlook, etc.)
  3. Create an email template with these variables:
     - {{name}} - Sender's name
     - {{email}} - Sender's email
     - {{phone}} - Sender's phone
     - {{company}} - Sender's company
     - {{subject}} - Message subject
     - {{message}} - Message content
     - {{service_interest}} - Selected service
  
  4. Get your credentials:
     - Service ID: Found in your EmailJS dashboard under "Email Services"
     - Template ID: Found under "Email Templates"
     - Public Key: Found under "Account" > "API Keys"
  
  5. Replace the values in EMAILJS_CONFIG object above:
     - SERVICE_ID: 'your_service_id_here'
     - TEMPLATE_ID: 'your_template_id_here'  
     - PUBLIC_KEY: 'your_public_key_here'
  
  Example EmailJS Template:
  ========================
  Subject: New Contact Form Submission - {{subject}}
  
  Hello,
  
  You have received a new message from your website contact form:
  
  Name: {{name}}
  Email: {{email}}
  Phone: {{phone}}
  Company: {{company}}
  Service Interest: {{service_interest}}
  Subject: {{subject}}
  
  Message:
  {{message}}
  
  Best regards,
  Website Contact Form
  */
  