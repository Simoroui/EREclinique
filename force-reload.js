// FORCE RELOAD - VERSION 2.0 - RELOAD AGRESSIF
// Ce fichier sert uniquement à forcer le navigateur à recharger les ressources
console.log("Force reload v2.0 activé - mode AGRESSIF");

// Fonction pour vider le cache du navigateur via JavaScript
function clearBrowserCache() {
    // Ajouter un timestamp unique à toutes les URLs des ressources
    const timestamp = new Date().getTime();
    
    // Stocker le timestamp dans le localStorage
    localStorage.setItem('lastCacheReload', timestamp);
    
    // Trouver tous les liens CSS et JS
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    const scripts = document.querySelectorAll('script[src]');
    
    console.log("FORCE RELOAD: Ajout de timestamps à toutes les ressources");
    
    // Ajouter le timestamp aux CSS
    links.forEach(link => {
        const baseUrl = link.href.split('?')[0];
        link.href = baseUrl + '?v=' + timestamp;
        console.log("CSS rechargé: " + link.href);
    });
    
    // Ajouter le timestamp aux JS
    scripts.forEach(script => {
        if (script.src) {
            const baseUrl = script.src.split('?')[0];
            script.src = baseUrl + '?v=' + timestamp;
            console.log("JS rechargé: " + script.src);
        }
    });
    
    console.log("FORCE RELOAD: Rechargement du cache terminé avec timestamp: " + timestamp);
}

// Attendre que tous les éléments soient chargés
document.addEventListener('DOMContentLoaded', function() {
    console.log("Force reload: DOM chargé");
    
    // Forcer le rechargement si première visite ou si plus de 5 minutes
    const lastReload = localStorage.getItem('lastCacheReload') || 0;
    const now = new Date().getTime();
    const fiveMinutes = 5 * 60 * 1000;
    
    if (now - lastReload > fiveMinutes) {
        console.log("Force reload: Plus de 5 minutes depuis le dernier rechargement, vidage du cache...");
        clearBrowserCache();
        
        // Forcer le rafraîchissement immédiat sur mobile
        if (window.innerWidth <= 768) {
            console.log("Force reload: Mode mobile détecté, rafraîchissement de la page...");
            // Recharger la page après un court délai
            setTimeout(function() {
                window.location.reload(true);
            }, 500);
        }
    } else {
        console.log("Force reload: Cache déjà rechargé récemment, aucune action nécessaire");
    }
}); 