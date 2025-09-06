// Mobile nav toggle and Services mega menu accessibility
(function () {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    var services = document.querySelector('.nav-item.has-mega');
    if (services) {
        var btn = services.querySelector('button.nav-link');
        btn.addEventListener('click', function () {
            services.classList.toggle('open');
            var expanded = services.classList.contains('open');
            btn.setAttribute('aria-expanded', String(expanded));
        });
        services.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                services.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                btn.focus();
            }
        });

        // Category switching
        var cats = services.querySelectorAll('.mega-cat');
        var panels = services.querySelectorAll('.mega-panel');
        function activate(target) {
            cats.forEach(function (c) { c.classList.toggle('active', c.dataset.target === target); c.setAttribute('aria-selected', String(c.dataset.target === target)); });
            panels.forEach(function (p) { p.classList.toggle('active', p.id === 'panel-' + target); });
        }
        cats.forEach(function (cat) {
            cat.addEventListener('mouseenter', function () { activate(cat.dataset.target); });
            cat.addEventListener('focus', function () { activate(cat.dataset.target); });
        });
    }
})();

// Gentle JS-driven drift for hero blobs
(function () {
    var blobs = Array.prototype.slice.call(document.querySelectorAll('.hero .blob'));
    if (!blobs.length) return;

    function rand(min, max) { return Math.random() * (max - min) + min; }

    // Initialize transition properties
    blobs.forEach(function(blob) {
        blob.style.transition = 'transform 1s ease-in-out';
    });

    function animate() {
        blobs.forEach(function (blob) {
            var x = rand(-20, 20); // Increased movement range for better effect
            var y = rand(-20, 20);
            var s = rand(0.95, 1.1); // Slight scale variations
            blob.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ')';
        });
    }

    // Run animation every 300ms for faster floating motion
    setInterval(animate, 400);
    
    // Initial call to start immediately
    animate();
})();



