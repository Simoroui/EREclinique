// Force refresh for font Grown v1.1
console.log("Force font refresh loaded - v1.1");

// Attendre que la police soit chargée
document.fonts.ready.then(function() {
    console.log("Toutes les polices sont chargées");
    forceFontLoad();
});

// Fonction pour forcer le chargement de la police
function forceFontLoad() {
    // Créer un élément temporaire avec la police
    const tempElement = document.createElement('div');
    tempElement.style.fontFamily = "'Grown', 'Playfair Display', serif";
    tempElement.style.position = "absolute";
    tempElement.style.left = "-9999px";
    tempElement.style.visibility = 'hidden';
    tempElement.textContent = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    // Ajouter l'élément au document et le supprimer après un délai
    document.body.appendChild(tempElement);
    console.log("Élément temporaire créé pour précharger la police Grown");
    
    // Appliquer directement la police au titre
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('grown-font');
        heroTitle.style.fontFamily = "'Grown', 'Playfair Display', serif !important";
        console.log("Style appliqué directement au titre avec la classe grown-font");
    } else {
        console.warn("Titre hero introuvable");
    }
}

// Exécuter aussi lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM chargé - Application des styles de police");
    
    // Vérifier si la police est disponible
    const isFontAvailable = document.fonts.check("1em 'Grown'");
    console.log("Police Grown disponible:", isFontAvailable);
    
    forceFontLoad();
    
    // Alternative: créer et appliquer un style directement
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .hero-title {
            font-family: 'Grown', 'Playfair Display', serif !important;
            letter-spacing: 0.02em;
            font-weight: normal;
        }
    `;
    document.head.appendChild(styleElement);
    console.log("Style CSS injecté directement");
}); 