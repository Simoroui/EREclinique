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
    const drSafaSection = document.getElementById('dr-safa');
    
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
    
    // Effet parallaxe pour la section Dr Safa
    if (drSafaSection) {
        // Effet de parallaxe à la souris
        drSafaSection.addEventListener('mousemove', (e) => {
            const imageWrapper = document.querySelector('.dr-safa-image-wrapper');
            const drSafaImage = document.querySelector('.dr-safa-image');
            if (!imageWrapper || !drSafaImage) return;
            
            const rect = drSafaSection.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Effet 3D amélioré sur l'image du Dr Safa
            imageWrapper.style.transform = `translateZ(50px) perspective(1000px) rotateY(${mouseX * 15}deg) rotateX(${-mouseY * 15}deg)`;
            
            // L'image elle-même bouge légèrement dans la direction opposée pour un effet de profondeur
            drSafaImage.style.transform = `scale(1.05) translateX(${-mouseX * 10}px) translateY(${-mouseY * 10}px)`;
            
            // Effet d'ombre qui suit la souris plus dynamique
            const shadowX = mouseX * 25;
            const shadowY = mouseY * 25;
            const shadowBlur = 30 + Math.abs(mouseX) * 15 + Math.abs(mouseY) * 15;
            imageWrapper.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.25), 
                                           ${shadowX * 0.5}px ${shadowY * 0.5}px ${shadowBlur * 0.5}px rgba(0, 0, 0, 0.15)`;
            
            // Effet brillant sur l'image (highlight)
            const highlightX = 50 + mouseX * 50; // Position en pourcentage
            const highlightY = 50 + mouseY * 50;
            drSafaImage.style.backgroundImage = `radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`;
            
            // Effet sur le texte
            const title = document.querySelector('.dr-safa-title');
            const subtitle = document.querySelector('.dr-safa-subtitle');
            const description = document.querySelectorAll('.dr-safa-description');
            const qualifications = document.querySelectorAll('.qualification-item');
            
            if (title) title.style.transform = `translateX(${mouseX * 20}px) translateY(${mouseY * 12}px)`;
            if (subtitle) subtitle.style.transform = `translateX(${mouseX * 15}px) translateY(${mouseY * 10}px)`;
            
            description.forEach((para, index) => {
                const delay = index * 0.1;
                para.style.transform = `translateX(${mouseX * (12 - index * 2)}px) translateY(${mouseY * (8 - index * 1.5)}px)`;
            });
            
            qualifications.forEach((item, index) => {
                const depth = 0.7 + (index * 0.15);
                item.style.transform = `translateX(${mouseX * 25 * depth}px) translateY(${mouseY * 10 * depth}px)`;
                // Effet de rotation légère
                item.style.rotate = `${mouseX * 2}deg`;
            });
        });
        
        // Réinitialiser l'effet au départ de la souris
        drSafaSection.addEventListener('mouseleave', () => {
            const imageWrapper = document.querySelector('.dr-safa-image-wrapper');
            const drSafaImage = document.querySelector('.dr-safa-image');
            const title = document.querySelector('.dr-safa-title');
            const subtitle = document.querySelector('.dr-safa-subtitle');
            const description = document.querySelectorAll('.dr-safa-description');
            const qualifications = document.querySelectorAll('.qualification-item');
            
            if (imageWrapper) {
                imageWrapper.style.transform = 'translateZ(50px) perspective(1000px)';
                imageWrapper.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)';
            }
            
            if (drSafaImage) {
                drSafaImage.style.transform = '';
                drSafaImage.style.backgroundImage = '';
            }
            
            if (title) title.style.transform = '';
            if (subtitle) subtitle.style.transform = '';
            
            description.forEach(para => {
                para.style.transform = '';
            });
            
            qualifications.forEach(item => {
                item.style.transform = '';
                item.style.rotate = '';
            });
        });
    }
    
    // Effet de parallaxe au défilement pour la section Dr Safa
    function applyDrSafaParallax(scrolled) {
        if (!drSafaSection) return;
        
        const sectionTop = drSafaSection.offsetTop;
        const sectionHeight = drSafaSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Calcul simple pour le déplacement vertical
        const imageWrapper = document.querySelector('.dr-safa-image-wrapper');
        const drSafaImage = document.querySelector('.dr-safa-image');
        
        if (imageWrapper && drSafaImage) {
            // Forcer un déplacement vertical très simple basé uniquement sur la position de défilement
            // Plus on scrolle, plus l'image descend
            const scrollAmount = scrolled - sectionTop;
            const maxMove = 300; // Déplacement maximum en pixels
            
            // Ne déplacer que si on est proche ou dans la section
            if (scrolled >= sectionTop - viewportHeight && scrolled <= sectionTop + sectionHeight) {
                // Déplacement simple: plus on scrolle, plus ça descend
                const moveY = Math.min(scrollAmount * 0.5, maxMove);
                
                // Appliquer directement la transformation avec translate Y uniquement
                imageWrapper.style.transform = `translateY(${moveY}px)`;
                
                // Logguer le déplacement pour le débogage
                console.log(`Dr Safa image move Y: ${moveY}px`);
                
                // S'assurer que l'image est visible
                imageWrapper.style.opacity = "1";
                
                // Zoom progressif léger
                const zoomFactor = 1 + Math.min(scrollAmount / 1000, 0.2);
                drSafaImage.style.transform = `scale(${zoomFactor})`;
            }
        }
    }
    
    // Appliquer les effets de parallaxe en fonction du défilement
    function applyParallaxEffects(scrolled) {
        // Parallaxe pour la section d'accueil
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            const scrollProgress = Math.min(scrolled / heroHeight, 1);
            
            // Animation du logo overlay
            const logoOverlay = document.querySelector('.logo-overlay');
            if (logoOverlay) {
                // Afficher progressivement le logo à partir d'un certain point de défilement
                const scrollThreshold = 50;
                
                if (scrolled <= scrollThreshold) {
                    // Avant le seuil, logo invisible
                    logoOverlay.style.opacity = "0";
                    logoOverlay.style.transform = "translateY(0)";
                } else {
                    // Après le seuil, logo visible
                    const logoOpacity = Math.min((scrolled - scrollThreshold) / 100, 1);
                    
                    // Position Y du logo qui monte progressivement avec le défilement
                    const targetPosition = Math.min(scrolled * 0.35, window.innerHeight * 0.6);
                    
                    // Appliquer les transformations
                    logoOverlay.style.opacity = logoOpacity;
                    logoOverlay.style.transform = "translateY(" + targetPosition + "px)";
                }
            }
            
            // Effet sur les éléments du hero
            const heroTitle = document.querySelector('.hero-title');
            const heroImage = document.querySelector('.hero-image');
            const keywords = document.querySelectorAll('.keyword');
            
            if (heroTitle) {
                const moveX = -scrolled * 0.8;
                heroTitle.style.transform = `translateX(${moveX}px)`;
            }
            
            if (heroImage) {
                const moveY = scrolled * 0.3;
                heroImage.style.transform = `translateY(${moveY}px)`;
            }
            
            if (keywords.length > 0) {
                keywords.forEach((keyword, index) => {
                    const direction = keyword.getAttribute('data-direction');
                    
                    if (direction === 'right') {
                        const moveX = scrolled * 0.7;
                        keyword.style.transform = `translateX(${moveX}px)`;
                    } else if (direction === 'left') {
                        const moveX = -scrolled * 0.8;
                        keyword.style.transform = `translateX(${moveX}px)`;
                    } else if (direction === 'down') {
                        const moveY = scrolled * 0.7;
                        keyword.style.transform = `translateY(${moveY}px)`;
                    }
                });
            }
        }
        
        // Appliquer l'effet de parallaxe à la section Dr Safa
        applyDrSafaParallax(scrolled);
    }
    
    // Gestionnaire d'événement de défilement pour les effets de parallaxe
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        applyParallaxEffects(scrolled);
    });
    
    // Appliquer les effets de parallaxe immédiatement
    applyParallaxEffects(window.pageYOffset || document.documentElement.scrollTop);
}); 