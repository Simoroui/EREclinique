document.addEventListener('DOMContentLoaded', () => {
    console.log("Script principal chargé correctement");
    
    // Variables globales
    const isMobileView = () => window.innerWidth <= 768;
    let ereElementsActive = false;

    // Sections principales
    const heroSection = document.querySelector('.hero-section');
    const aboutSection = document.querySelector('#about');
    const methodeEreSection = document.getElementById('methode-ere');
    const soinsSection = document.getElementById('nos-soins');
    const equipeSection = document.getElementById('notre-equipe');
    
    // Fonction pour activer les éléments de la Méthode ERE
    function activateEreElements() {
        if (ereElementsActive) return; // Éviter l'activation multiple
        
        const elements = document.querySelectorAll('.ere-element');
        const title = document.querySelector('.ere-title');
        
        if (title) {
            title.classList.add('active');
        }
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, 200 * index);
        });
        
        ereElementsActive = true;
        console.log("ERE elements activated");
    }
    
    // Fonction pour désactiver les éléments de la Méthode ERE
    function deactivateEreElements() {
        if (!ereElementsActive) return; // Éviter la désactivation multiple
        
        const elements = document.querySelectorAll('.ere-element');
        const title = document.querySelector('.ere-title');
        
        if (title) {
            title.classList.remove('active');
        }
        
        // Désactiver dans l'ordre inverse de l'activation
        for (let i = elements.length - 1; i >= 0; i--) {
            const element = elements[i];
            const delay = (elements.length - 1 - i) * 150;
            
            setTimeout(() => {
                element.classList.remove('active');
            }, delay);
        }
        
        ereElementsActive = false;
        console.log("ERE elements deactivated");
    }
    
    // Observer pour activer/désactiver les éléments ERE
    const ereObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateEreElements();
                console.log("Méthode ERE section is now visible");
                methodeEreSection.classList.add('active');
            } else {
                deactivateEreElements();
                console.log("Méthode ERE section is now hidden");
                methodeEreSection.classList.remove('active');
            }
        });
    }, { 
        threshold: 0.2, 
        rootMargin: "0px 0px -10% 0px" 
    });
    
    // Observer pour les éléments de soin
    const soinsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Retarder l'apparition de chaque élément de soin
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }, 200 * index);
                
                // Arrêter d'observer une fois visible
                //observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove('visible');
                
                // Réinitialiser pour effet de réapparition lors du défilement
                const direction = entry.target.getAttribute('data-direction') === 'right' ? 50 : -50;
                entry.target.style.transform = `translateY(50px) translateX(${direction}px)`;
                entry.target.style.opacity = '0';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -15% 0px"
    });
    
    // Observer pour les membres de l'équipe
    const equipeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Retarder l'apparition de chaque membre
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }, 200 * index);
                
                // Arrêter d'observer une fois visible
                //observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove('visible');
                
                // Réinitialiser pour effet de réapparition lors du défilement
                const direction = entry.target.getAttribute('data-direction');
                if (direction === 'up') {
                    entry.target.style.transform = 'translateY(80px)';
                } else if (direction === 'down') {
                    entry.target.style.transform = 'translateY(-80px)';
                } else {
                    entry.target.style.transform = 'translateY(50px)';
                }
                entry.target.style.opacity = '0';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -15% 0px"
    });

    if (methodeEreSection) {
        ereObserver.observe(methodeEreSection);
        
        // Effet parallaxe avancé au mouvement de la souris (désactivé sur mobile)
        function handleMouseMove(e) {
            if (isMobileView()) return; // Désactiver complètement sur mobile
            
                const rect = methodeEreSection.getBoundingClientRect();
                const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
                const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

                // Effet sur les grandes lettres
                document.querySelectorAll('.ere-letter').forEach((letter, index) => {
                    const depthFactor = 50 + (index * 10);
                    letter.style.transform = `translateY(-50%) translateX(${mouseX * depthFactor}px) translateZ(-100px) rotateY(${mouseX * 15}deg)`;
                });

                // Effet sur les contenus
                document.querySelectorAll('.ere-content').forEach((content, index) => {
                    const depthFactor = 20 - (index * 5);
                    content.style.transform = `translateZ(20px) translateX(${mouseX * depthFactor}px) rotateY(${-mouseX * 5}deg)`;
                });

                // Effet sur les images
                document.querySelectorAll('.ere-image').forEach(image => {
                    image.style.transform = `translateZ(15px) translateX(${-mouseX * 15}px) translateY(${-mouseY * 15}px)`;
                });

                // Effet sur le titre
                const ereTitle = document.querySelector('.ere-title');
                if (ereTitle) {
                    ereTitle.style.transform = `translateY(${mouseY * 10}px) translateX(${mouseX * 10}px)`;
            }
        }
        
        methodeEreSection.addEventListener('mousemove', handleMouseMove);
        
        // Réinitialiser les styles au départ de la souris
        methodeEreSection.addEventListener('mouseleave', () => {
            if (isMobileView()) return;
            
            document.querySelectorAll('.ere-letter').forEach(letter => {
                letter.style.transform = 'translateY(-50%) translateZ(-100px)';
            });

            document.querySelectorAll('.ere-content').forEach(content => {
                content.style.transform = '';
            });

            document.querySelectorAll('.ere-image').forEach(image => {
                image.style.transform = 'translateZ(15px)';
            });

            const ereTitle = document.querySelector('.ere-title');
            if (ereTitle) {
                ereTitle.style.transform = '';
            }
        });
        
        // Gestion du redimensionnement pour adapter l'affichage
        window.addEventListener('resize', () => {
            if (isMobileView()) {
                // Réinitialiser les styles pour mobile
                document.querySelectorAll('.ere-letter').forEach(letter => {
                    letter.style.transform = 'translateY(-50%)';
                });
                
                document.querySelectorAll('.ere-content').forEach(content => {
                    content.style.transform = '';
                });
                
                document.querySelectorAll('.ere-image').forEach(image => {
                    image.style.transform = '';
                });
                
                const ereTitle = document.querySelector('.ere-title');
                if (ereTitle) {
                    ereTitle.style.transform = '';
                }
            }
        });
    }

    // Transition de fond au défilement pour la section À propos
    if (aboutSection && document.querySelector('.parallax-bg-2')) {
        const bgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelector('.parallax-bg-2').style.opacity = '1';
                    document.querySelector('.parallax-bg-2').style.transition = 'opacity 0.8s ease-in-out';
                } else {
                    document.querySelector('.parallax-bg-2').style.opacity = '0';
                }
            });
        }, { threshold: 0.5 });
        
        bgObserver.observe(aboutSection);
    }

    // Appliquer les observateurs aux éléments de soins
    if (soinsSection) {
        const soinItems = soinsSection.querySelectorAll('.soin-item');
        soinItems.forEach(item => {
            soinsObserver.observe(item);
        });
    }

    // Appliquer les observateurs aux membres de l'équipe
    if (equipeSection) {
        const membreCards = equipeSection.querySelectorAll('.membre-card');
        membreCards.forEach(card => {
            equipeObserver.observe(card);
        });
    }
}); 