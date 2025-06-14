document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll pour les ancres
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                let offset = 70; // Hauteur du header
                if (window.innerWidth <= 768 && document.body.classList.contains('nav-open')) { // Si le menu mobile est ouvert
                    toggleNav(); // Fermer le menu avant de scroller
                }
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navigation mobile (toggle)
    const navToggle = document.querySelector('.nav-toggle');
    const body = document.body;

    if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
    }

    function toggleNav() {
        body.classList.toggle('nav-open');
    }

    // Fermer le menu mobile si on clique sur un lien (pour les pages à ancre)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (body.classList.contains('nav-open')) {
                body.classList.remove('nav-open');
            }
        });
    });



    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('main section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;

    function changeLinkState() {
        let index = sections.length;

        while(--index && window.scrollY + headerHeight < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        // S'assurer que le lien correspondant à la section actuelle existe
        if (sections[index]) {
            const activeLink = document.querySelector(`.nav-links a[href="#${sections[index].id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else if (window.scrollY < sections[0].offsetTop - headerHeight) { // Si tout en haut, avant la première section
            const homeLink = document.querySelector('.nav-links a[href="#accueil"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    // Gérer le cas où on est tout en haut au chargement
    if (window.scrollY === 0) {
        const homeLink = document.querySelector('.nav-links a[href="#accueil"]');
        if (homeLink) homeLink.classList.add('active');
    }

    window.addEventListener('scroll', changeLinkState);
    changeLinkState(); // Appel initial

});

