// Animation.js

import React, { useEffect } from 'react';

function Animation() {
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const body = document.body;

    canvas.width = body.clientWidth;
    canvas.height = body.clientHeight;

    let fireballX = 0; // Initial position of fireball
    const fireballSpeed = 5; // Speed of fireball

    function animate() {
      // Clear previous frame
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fireball
      context.beginPath();
      context.arc(fireballX, canvas.height / 2, 20, 0, Math.PI * 2);
      context.fillStyle = 'orange';
      context.fill();
      context.closePath();

      // Update fireball position
      fireballX += fireballSpeed;

      // Check if fireball has gone off-screen
      if (fireballX > canvas.width + 20) {
        fireballX = -20; // Reset fireball position
      }

      requestAnimationFrame(animate); // Repeat animation loop
    }

    function revealText() {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      context.font = '30px Arial';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText('SkyCity Design', canvas.width / 2, canvas.height / 2);
    }

    animate(); // Start the animation loop

    // Cleanup function (optional)
    return () => {
      cancelAnimationFrame(animate); // Stop animation when component unmounts
    };
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  return (
    <canvas style={{ width: '100%', height: '85%', position: 'absolute', top: 0, left: 0 }}></canvas>
  );
}

export default Animation;
