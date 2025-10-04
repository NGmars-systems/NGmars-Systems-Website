document.addEventListener('DOMContentLoaded', () => {
  const tagButtons = Array.from(document.querySelectorAll('.blog-tags .tag'));
  const posts = Array.from(document.querySelectorAll('.post'));
  const toReveal = Array.from(document.querySelectorAll('.reveal, .post'));

  function applyFilter(category) {
    posts.forEach(post => {
      const cat = post.getAttribute('data-cat');
      const show = category === 'all' || category === cat;
      post.style.display = show ? '' : 'none';
    });
  }

  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      applyFilter(cat);
    });
  });

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  toReveal.forEach(el => io.observe(el));
});


