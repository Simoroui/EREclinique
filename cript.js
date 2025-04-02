warning: in the working copy of 'script.js', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/script.js b/script.js[m
[1mindex 7d7c89d..3f999e1 100644[m
[1m--- a/script.js[m
[1m+++ b/script.js[m
[36m@@ -148,31 +148,31 @@[m [mdocument.addEventListener('DOMContentLoaded', () => {[m
         function handleMouseMove(e) {[m
             if (isMobileView()) return; // Désactiver complètement sur mobile[m
             [m
[31m-            const rect = methodeEreSection.getBoundingClientRect();[m
[31m-            const mouseX = (e.clientX - rect.left) / rect.width - 0.5;[m
[31m-            const mouseY = (e.clientY - rect.top) / rect.height - 0.5;[m
[32m+[m[32m                const rect = methodeEreSection.getBoundingClientRect();[m
[32m+[m[32m                const mouseX = (e.clientX - rect.left) / rect.width - 0.5;[m
[32m+[m[32m                const mouseY = (e.clientY - rect.top) / rect.height - 0.5;[m
 [m
[31m-            // Effet sur les grandes lettres[m
[31m-            document.querySelectorAll('.ere-letter').forEach((letter, index) => {[m
[31m-                const depthFactor = 50 + (index * 10);[m
[31m-                letter.style.transform = `translateY(-50%) translateX(${mouseX * depthFactor}px) translateZ(-100px) rotateY(${mouseX * 15}deg)`;[m
[31m-            });[m
[32m+[m[32m                // Effet sur les grandes lettres[m
[32m+[m[32m                document.querySelectorAll('.ere-letter').forEach((letter, index) => {[m
[32m+[m[32m                    const depthFactor = 50 + (index * 10);[m
[32m+[m[32m                    letter.style.transform = `translateY(-50%) translateX(${mouseX * depthFactor}px) translateZ(-100px) rotateY(${mouseX * 15}deg)`;[m
[32m+[m[32m                });[m
 [m
[31m-            // Effet sur les contenus[m
[31m-            document.querySelectorAll('.ere-content').forEach((content, index) => {[m
[31m-                const depthFactor = 20 - (index * 5);[m
[31m-                content.style.transform = `translateZ(20px) translateX(${mouseX * depthFactor}px) rotateY(${-mouseX * 5}deg)`;[m
[31m-            });[m
[32m+[m[32m                // Effet sur les contenus[m
[32m+[m[32m                document.querySelectorAll('.ere-content').forEach((content, index) => {[m
[32m+[m[32m                    const depthFactor = 20 - (index * 5);[m
[32m+[m[32m                    content.style.transform = `translateZ(20px) translateX(${mouseX * depthFactor}px) rotateY(${-mouseX * 5}deg)`;[m
[32m+[m[32m                });[m
 [m
[31m-            // Effet sur les images[m
[31m-            document.querySelectorAll('.ere-image').forEach(image => {[m
[31m-                image.style.transform = `translateZ(15px) translateX(${-mouseX * 15}px) translateY(${-mouseY * 15}px)`;[m
[31m-            });[m
[32m+[m[32m                // Effet sur les images[m
[32m+[m[32m                document.querySelectorAll('.ere-image').forEach(image => {[m
[32m+[m[32m                    image.style.transform = `translateZ(15px) translateX(${-mouseX * 15}px) translateY(${-mouseY * 15}px)`;[m
[32m+[m[32m                });[m
 [m
[31m-            // Effet sur le titre[m
[31m-            const ereTitle = document.querySelector('.ere-title');[m
[31m-            if (ereTitle) {[m
[31m-                ereTitle.style.transform = `translateY(${mouseY * 10}px) translateX(${mouseX * 10}px)`;[m
[32m+[m[32m                // Effet sur le titre[m
[32m+[m[32m                const ereTitle = document.querySelector('.ere-title');[m
[32m+[m[32m                if (ereTitle) {[m
[32m+[m[32m                    ereTitle.style.transform = `translateY(${mouseY * 10}px) translateX(${mouseX * 10}px)`;[m
             }[m
         }[m
         [m
[36m@@ -185,15 +185,15 @@[m [mdocument.addEventListener('DOMContentLoaded', () => {[m
             document.querySelectorAll('.ere-letter').forEach(letter => {[m
                 letter.style.transform = 'translateY(-50%) translateZ(-100px)';[m
             });[m
[31m-            [m
[32m+[m
             document.querySelectorAll('.ere-content').forEach(content => {[m
                 content.style.transform = '';[m
             });[m
[31m-            [m
[32m+[m
             document.querySelectorAll('.ere-image').forEach(image => {[m
                 image.style.transform = 'translateZ(15px)';[m
             });[m
[31m-            [m
[32m+[m
             const ereTitle = document.querySelector('.ere-title');[m
             if (ereTitle) {[m
                 ereTitle.style.transform = '';[m
