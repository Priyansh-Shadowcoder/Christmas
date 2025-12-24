function createGalaxy() {
    const starField = document.getElementById('star-field');
    if (!starField) return;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'galaxy-star';
        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 3 + 1 + 's';
        star.style.setProperty('--duration', duration);
        starField.appendChild(star);
    }
}
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄';
    snowflake.classList.add('snowflake');

    // Randomize horizontal start
    snowflake.style.left = Math.random() * 100 + 'vw';
    
    // Randomize vertical speed (7s to 12s)
    const fallDuration = Math.random() * 5 + 7;
    snowflake.style.animationDuration = `${fallDuration}s, ${Math.random() * 3 + 2}s`;

    // Randomize size and blur for a 3D depth look
    const size = Math.random() * 15 + 10;
    snowflake.style.fontSize = size + 'px';
    snowflake.style.opacity = Math.random();
    if (size < 15) snowflake.style.filter = "blur(1px)"; 

    // IMPORTANT: Always append to body so they don't get hidden by containers
    document.body.appendChild(snowflake);

    // Clean up
    setTimeout(() => {
        snowflake.remove();
    }, fallDuration * 1000);
}

// Keep the interval running
setInterval(createSnowflake, 150);
function createGlitter() {
    const treeBox = document.querySelector('.neon-tree-box');
    if (!treeBox || treeBox.parentElement.style.display === 'none') return;

    // Create a burst of 3 particles
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'glitter';
        
        // Position them near the top of the tree where the star lands
        // (Adjust these coordinates if your star is in a different spot)
        const startX = 150; // Center of the neon-tree-box
        const startY = 50;  // Top of the tree
        
        particle.style.left = (startX + (Math.random() * 40 - 20)) + 'px';
        particle.style.top = (startY + (Math.random() * 40 - 20)) + 'px';
        
        treeBox.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

function revealMessage() {
    // Hide the initial gift card
    document.querySelector('.card').style.display = 'none';
    
    // Show the tree container
    const container = document.getElementById('tree-container');
    container.style.display = 'block';
    
    // Hide the text initially so it doesn't pop up before the tree is ready
    const specialText = document.getElementById('special-text');
    specialText.style.opacity = "0";
    specialText.style.display = "none";

    createGalaxy();

    // Start creating glitter particles when the star arrives (at 4.2 seconds)
    setTimeout(() => {
        const glitterInterval = setInterval(createGlitter, 50);
        setTimeout(() => clearInterval(glitterInterval), 2000);
    }, 4200);

    // WAIT for the tree to finish drawing (approx 5.5 - 6 seconds) 
    // before showing the "A Magical Christmas" message
    setTimeout(() => {
        specialText.style.display = "block";
        // Trigger the fade-in
        setTimeout(() => {
            specialText.style.opacity = "1";
            specialText.style.transition = "opacity 2s ease-in-out";
        }, 10);
    }, 5500); 
}
function showTypewriterPage() {
    // Hide the tree container
    document.getElementById('tree-container').style.display = 'none';
    
    // Show the typewriter page
    const typePage = document.getElementById('typewriter-page');
    typePage.style.display = 'flex';
    
    // Focus the textarea automatically
    document.getElementById('user-note').focus();
}


function createMagicTrail() {
    const container = document.getElementById('santa-container');
    const colors = ['#ff3131', '#39ff14', '#00f2ff', '#fbff00'];
    
    if (document.getElementById('santa-page').style.display === 'none') return;

    const sparkle = document.createElement('div');
    sparkle.className = 'trail-sparkle';
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Position at the LEFT side (back of the sleigh)
    sparkle.style.left = '20px'; 
    sparkle.style.top = (Math.random() * 50 + 70) + 'px';

    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
}

// Update showSantaPage to start the trail
function showSantaPage() {
    const userText = document.getElementById('user-note').value;
    document.getElementById('typewriter-page').style.display = 'none';
    
    const santaPage = document.getElementById('santa-page');
    santaPage.style.display = 'block';

    const displayArea = document.getElementById('display-user-text');
    displayArea.innerText = userText.trim() === "" ? "Merry Christmas!" : `"${userText}"`;

    // Start Trail
    setInterval(createMagicTrail, 50);

    // Initial Star creation for this page
    const santaSky = santaPage.querySelector('.sky-background');
    for (let i = 0; i < 60; i++) {
        const star = document.createElement('div');
        star.className = 'galaxy-star';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        santaSky.appendChild(star);
    }
}