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
    
    // Effet parallaxe pour l'image hero
    const heroImage = document.querySelector('.hero-image');
    let lastScrollY = window.scrollY || 0;
    let ticking = false;
    
    // Fonction pour l'effet parallaxe de l'image hero
    function updateHeroImageParallax() {
        if (!heroImage || !heroSection) return;
        
        const scrollY = window.scrollY;
        
        // Calculer la position de l'élément hero pour n'appliquer l'effet que lorsqu'il est visible
        const heroRect = heroSection.getBoundingClientRect();
        
        // Appliquer l'effet parallaxe uniquement si la section hero est visible
        if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
            // Calculer le déplacement en Y basé sur le défilement
            const translateY = scrollY * 0.4;
            
            // Appliquer la transformation
            heroImage.style.transform = `translateY(${translateY}px)`;
            
            lastScrollY = scrollY;
        }
        
        ticking = false;
    }
    
    // Optimiser les performances en utilisant requestAnimationFrame pour l'image hero
    function onHeroScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeroImageParallax);
            ticking = true;
        }
    }
    
    // Ajouter l'écouteur d'événement pour l'image hero
    window.addEventListener('scroll', onHeroScroll, { passive: true });
    
    // Initialiser l'effet au chargement
    updateHeroImageParallax();
    
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

    // Formulaire de réservation multi-étapes
    const reservationForm = document.querySelector('.reservation-form');
    if (!reservationForm) return;

    console.log('Initialisation du formulaire de réservation v1.0');

    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.form-next');
    const prevButtons = document.querySelectorAll('.form-prev');
    const submitButton = document.querySelector('.submit-button');

    let currentStep = 1;
    const totalSteps = formSteps.length;

    // Initialiser les étapes et la barre de progression
    function initForm() {
        // Cacher toutes les étapes sauf la première
        formSteps.forEach(step => {
            step.style.display = 'none';
        });
        formSteps[0].style.display = 'block';
        
        // Mettre à jour la barre de progression
        updateProgressBar();
        
        // Animation d'apparition du formulaire
        formSteps[0].style.animation = 'formAppear 0.8s ease forwards';
    }

    // Mettre à jour la barre de progression
    function updateProgressBar() {
        progressSteps.forEach((step, index) => {
            if (index + 1 < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }

    // Aller à l'étape suivante
    function goToNextStep() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                formSteps[currentStep - 1].style.display = 'none';
                formSteps[currentStep].style.display = 'block';
                formSteps[currentStep].style.animation = 'formAppear 0.5s ease forwards';
                currentStep++;
                updateProgressBar();
            }
        }
    }

    // Aller à l'étape précédente
    function goToPrevStep() {
        if (currentStep > 1) {
            currentStep--;
            formSteps[currentStep].style.display = 'none';
            formSteps[currentStep - 1].style.display = 'block';
            formSteps[currentStep - 1].style.animation = 'formAppear 0.5s ease forwards';
            updateProgressBar();
        }
    }

    // Valider l'étape actuelle
    function validateCurrentStep() {
        const currentFormStep = formSteps[currentStep - 1];
        const requiredFields = currentFormStep.querySelectorAll('[required]');
        
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Ajouter une animation d'erreur
                field.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    field.style.animation = '';
                }, 500);
                
                // Créer ou mettre à jour le message d'erreur
                let errorMsg = field.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                    errorMsg = document.createElement('div');
                    errorMsg.classList.add('error-message');
                    errorMsg.style.color = '#e74c3c';
                    errorMsg.style.fontSize = '0.85rem';
                    errorMsg.style.marginTop = '0.25rem';
                    field.parentNode.insertBefore(errorMsg, field.nextSibling);
                }
                errorMsg.textContent = 'Ce champ est requis';
            } else {
                field.classList.remove('error');
                const errorMsg = field.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            }
        });
        
        return isValid;
    }

    // Gérer la soumission du formulaire
    function handleSubmit(e) {
        e.preventDefault();
        
        if (validateCurrentStep()) {
            // Animation de chargement
            submitButton.innerHTML = '<span class="loading-icon">⟳</span> Envoi en cours...';
            submitButton.disabled = true;
            
            // Simuler un délai d'envoi (à remplacer par votre logique d'envoi réelle)
            setTimeout(() => {
                // Remplacer par votre logique d'envoi de formulaire
                console.log('Formulaire envoyé avec succès!');
                
                // Afficher un message de succès
                const formWrapper = document.querySelector('.reservation-form-wrapper');
                formWrapper.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 3rem 1rem;">
                        <div class="success-icon" style="font-size: 4rem; color: rgba(128, 141, 97, 0.9); margin-bottom: 1.5rem;">✓</div>
                        <h2 style="font-size: 2rem; color: rgba(128, 141, 97, 0.9); margin-bottom: 1rem;">Réservation Envoyée !</h2>
                        <p style="font-size: 1.1rem; color: #555; margin-bottom: 2rem;">Merci pour votre réservation. Nous vous contacterons prochainement pour confirmer votre rendez-vous.</p>
                        <button class="new-reservation" style="background-color: rgba(128, 141, 97, 0.9); color: white; border: none; border-radius: 8px; padding: 0.8rem 1.5rem; cursor: pointer; font-weight: 500; transition: all 0.3s ease;">Nouvelle Réservation</button>
                    </div>
                `;
                
                // Ajouter un événement pour réinitialiser le formulaire
                document.querySelector('.new-reservation').addEventListener('click', function() {
                    window.location.reload();
                });
                
            }, 2000);
        }
    }

    // Initialiser le formulaire
    initForm();

    // Ajouter les écouteurs d'événements
    nextButtons.forEach(button => {
        button.addEventListener('click', goToNextStep);
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', goToPrevStep);
    });

    if (submitButton) {
        submitButton.addEventListener('click', handleSubmit);
    }

    // Ajouter une animation CSS pour le shake
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(styleSheet);
}); 