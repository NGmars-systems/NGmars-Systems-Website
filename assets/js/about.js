// About page: reveal on scroll + gentle parallax for background shapes
;(function () {
  // Reveal
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'))
  if (reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    reveals.forEach(function (el) { io.observe(el) })
  }

  // Gentle parallax for hero blobs on scroll
  var hblobs = Array.prototype.slice.call(document.querySelectorAll('.hero-accents .hblob'))
  if (hblobs.length) {
    function onScroll() {
      var y = window.scrollY || window.pageYOffset
      hblobs.forEach(function (b, i) {
        var depth = (i + 1) * 0.06
        b.style.transform = 'translateY(' + y * depth * 0.2 + 'px)'
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
})()


