document.addEventListener('DOMContentLoaded', () => {
  const filters = Array.from(document.querySelectorAll('.portfolio-filters .filter'))
  const cards = Array.from(document.querySelectorAll('.project-card'))

  function apply(category){
    cards.forEach(c => {
      const cat = c.getAttribute('data-cat')
      c.style.display = (category === 'all' || category === cat) ? '' : 'none'
    })
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'))
      btn.classList.add('active')
      apply(btn.getAttribute('data-filter'))
    })
  })

  // Reveal support (mirrors blog reveal behavior)
  const toReveal = Array.from(document.querySelectorAll('.reveal, .project-card'))
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible')
        io.unobserve(e.target)
      }
    })
  }, {threshold:0.08})
  toReveal.forEach(el=>io.observe(el))
})



