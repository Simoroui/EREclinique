// Dr. Safa Section Parallax Effect - v7.0 (Universal Parallax for all screen sizes)
console.log("Initializing Dr. Safa Section Parallax Effect (Universal Version 7.0)");

// Get DOM elements
const drSafaSection = document.getElementById('dr-safa');
const drSafaImage = document.querySelector('#dr-safa .dr-safa-image');
const drSafaQuote = document.querySelector('#dr-safa .dr-safa-quote');
const drSafaBlockquote = document.querySelector('#dr-safa .dr-safa-quote blockquote');
const drSafaCite = document.querySelector('#dr-safa .dr-safa-quote cite');

// State tracking
let sectionVisible = false;
let sectionStartPosition = 0;

// Apply debug classes
if (drSafaSection) drSafaSection.classList.add('dr-safa-debug');
if (drSafaImage) drSafaImage.classList.add('dr-safa-image-debug');
if (drSafaQuote) drSafaQuote.classList.add('dr-safa-quote-debug');
if (drSafaBlockquote) drSafaBlockquote.classList.add('dr-safa-blockquote-debug');
if (drSafaCite) drSafaCite.classList.add('dr-safa-cite-debug');

// Check if all elements exist
if (!drSafaSection || !drSafaImage || !drSafaQuote || !drSafaBlockquote || !drSafaCite) {
  console.error('Missing elements for Dr. Safa section parallax effect:', {
    section: !!drSafaSection,
    image: !!drSafaImage,
    quote: !!drSafaQuote,
    blockquote: !!drSafaBlockquote,
    cite: !!drSafaCite
  });
} else {
  console.log('All Dr. Safa section elements found');
  
  // Ensure image is visible with proper styles
  drSafaImage.style.display = 'block';
  drSafaImage.style.opacity = '1';
  drSafaImage.style.transform = 'translateY(0)';
  drSafaImage.style.transition = 'transform 0.3s ease-out';
  drSafaImage.style.willChange = 'transform';
  
  // Ensure quote is visible
  drSafaQuote.style.display = 'block';
  drSafaQuote.style.opacity = '1';
  
  // Handle scroll event for parallax effect
  function handleScroll() {
    const rect = drSafaSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate if section is entering or fully visible in viewport
    const isEntering = rect.top < windowHeight && rect.bottom > 0;
    
    // Set state if section is becoming visible
    if (isEntering && !sectionVisible) {
      sectionVisible = true;
      sectionStartPosition = window.scrollY;
      console.log('Dr. Safa section is now visible at scroll position:', sectionStartPosition);
    }
    
    // Reset state if section is no longer visible
    if (!isEntering && sectionVisible) {
      sectionVisible = false;
      console.log('Dr. Safa section is no longer visible');
    }
    
    // Apply parallax effect when section is visible
    if (sectionVisible) {
      // Calculate scroll progress (0 to 1) based on how far we've scrolled from the start position
      const scrolledPastSection = window.scrollY - sectionStartPosition;
      const sectionHeight = rect.height;
      const progress = Math.min(Math.max(scrolledPastSection / (sectionHeight * 0.8), 0), 1);
      
      // Log progress for debugging
      if (progress > 0 && progress % 0.1 < 0.01) {
        console.log(`Dr. Safa parallax progress: ${progress.toFixed(2)}`);
      }
      
      // Apply universal parallax effects to all elements
      
      // Image moves down as user scrolls (slower for a subtle effect)
      const imageYMovement = progress * 150; // Reduced from 500 to make it more subtle
      drSafaImage.style.transform = `translateY(${imageYMovement}px)`;
      
      // Quote moves left and down slightly
      drSafaQuote.style.transform = `translate(${-progress * 50}px, ${progress * 20}px)`;
      
      // Blockquote and cite have their own movements
      drSafaBlockquote.style.transform = `translate(${-progress * 80}px, ${progress * 30}px)`;
      drSafaCite.style.transform = `translate(${-progress * 120}px, ${progress * 40}px)`;
      
      // Fade elements as they move
      const fadeOut = 1 - progress * 0.6; // Never fully fade out (min opacity of 0.4)
      drSafaImage.style.opacity = fadeOut.toString();
      drSafaQuote.style.opacity = fadeOut.toString();
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Initial call to set up state
  handleScroll();
  
  console.log('Dr. Safa section parallax effect initialized successfully (Universal Version 7.0)');
} 