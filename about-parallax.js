// About Section Parallax Effect for Videos - v1.2
console.log("Initializing About Section Video Parallax Effect (Version 1.2)");

// Get DOM elements
const aboutSection = document.getElementById('about');
const firstVideo = document.querySelector('#about .about-video-container:first-child');
const secondVideo = document.querySelector('#about .about-video-container:last-child');
const aboutContent = document.querySelector('#about .parallax-content');

// State tracking
let aboutSectionVisible = false;
let aboutSectionStartPosition = 0;
let secondVideoVisible = false;
let secondVideoStartPosition = 0;
let isMobile = window.innerWidth <= 768;

// Check if all elements exist
if (!aboutSection || !firstVideo || !secondVideo || !aboutContent) {
  console.error('Missing elements for About section parallax effect:', {
    section: !!aboutSection,
    firstVideo: !!firstVideo,
    secondVideo: !!secondVideo,
    content: !!aboutContent
  });
} else {
  console.log('All About section elements found for parallax effect');
  
  // Ensure videos have proper initial styles with smooth transitions
  firstVideo.style.transform = 'translateX(0)';
  firstVideo.style.transition = 'transform 0.2s ease-out, opacity 0.3s ease-out';
  secondVideo.style.transform = 'translateX(0)';
  secondVideo.style.transition = 'transform 0.2s ease-out, opacity 0.3s ease-out';
  
  // Update mobile status on resize
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
    console.log(`Screen mode: ${isMobile ? 'Mobile' : 'Desktop'}`);
  });
  
  // Handle scroll event for parallax effect
  function handleAboutScroll() {
    const rect = aboutSection.getBoundingClientRect();
    const secondVideoRect = secondVideo.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate if section is entering or fully visible in viewport
    const isEntering = rect.top < windowHeight && rect.bottom > 0;
    
    // Set state if section is becoming visible
    if (isEntering && !aboutSectionVisible) {
      aboutSectionVisible = true;
      aboutSectionStartPosition = window.scrollY;
      console.log('About section is now visible at scroll position:', aboutSectionStartPosition);
    }
    
    // Reset state if section is no longer visible
    if (!isEntering && aboutSectionVisible) {
      aboutSectionVisible = false;
      console.log('About section is no longer visible');
    }
    
    // Check if second video is visible (for mobile)
    const isSecondVideoVisible = secondVideoRect.top < windowHeight && secondVideoRect.bottom > 0;
    
    // Set state for second video visibility (mobile only)
    if (isMobile && isSecondVideoVisible && !secondVideoVisible) {
      secondVideoVisible = true;
      secondVideoStartPosition = window.scrollY;
      console.log('Second video is now visible at scroll position:', secondVideoStartPosition);
    }
    
    // Reset second video state
    if (isMobile && !isSecondVideoVisible && secondVideoVisible) {
      secondVideoVisible = false;
      console.log('Second video is no longer visible');
    }
    
    // Apply parallax effect when section is visible
    if (aboutSectionVisible) {
      // Calculate scroll progress (0 to 1) based on how far we've scrolled from the start position
      // Make the scrolling distance longer for smoother effect
      const scrolledPastSection = window.scrollY - aboutSectionStartPosition;
      const sectionHeight = rect.height * 1.5; // Increase scrolling distance
      const progress = Math.min(Math.max(scrolledPastSection / (sectionHeight), 0), 1);
      
      // First video always moves when section is visible
      // Reduced movement from 150px to 80px for a more subtle effect
      const firstVideoMovement = -progress * 80; // Negative value moves left
      firstVideo.style.transform = `translateX(${firstVideoMovement}px)`;
      firstVideo.style.opacity = (1 - progress * 0.2).toString(); // More subtle fade
      
      // Second video behavior depends on device
      if (!isMobile) {
        // Desktop: move second video with first video
        // Reduced movement from 150px to 80px for a more subtle effect
        const secondVideoMovement = progress * 80; // Positive value moves right
        secondVideo.style.transform = `translateX(${secondVideoMovement}px)`;
        secondVideo.style.opacity = (1 - progress * 0.2).toString(); // More subtle fade
      } else if (secondVideoVisible) {
        // Mobile: move second video only when it's visible
        const scrolledPastSecondVideo = window.scrollY - secondVideoStartPosition;
        // Make the scrolling distance longer for smoother effect
        const secondVideoProgress = Math.min(Math.max(scrolledPastSecondVideo / (sectionHeight * 0.6), 0), 1);
        
        // Reduced movement from 150px to 80px for a more subtle effect
        const secondVideoMovement = secondVideoProgress * 80; // Positive value moves right
        secondVideo.style.transform = `translateX(${secondVideoMovement}px)`;
        secondVideo.style.opacity = (1 - secondVideoProgress * 0.2).toString(); // More subtle fade
        
        if (secondVideoProgress > 0 && secondVideoProgress % 0.1 < 0.01) {
          console.log(`Second video parallax progress: ${secondVideoProgress.toFixed(2)}`);
        }
      }
      
      // Log overall progress for debugging (less frequent)
      if (progress > 0 && progress % 0.25 < 0.01) {
        console.log(`About section parallax progress: ${progress.toFixed(2)}`);
      }
    }
  }
  
  // Use requestAnimationFrame for smoother animations
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleAboutScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial call to set up state
  handleAboutScroll();
  
  console.log('About section video parallax effect initialized successfully (Version 1.2)');
} 