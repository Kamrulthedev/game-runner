// runner chrome game function
Runner.prototype.gameOver = () =>{}


// To increase speed 
Runner.instance_.setSpeed(1000);



// Auto Jump
setInterval(() => {
    const tRex = Runner.instance_.tRex;
    const obstacles = Runner.instance_.horizon.obstacles;
    if (obstacles.length > 0) {
      const obstacle = obstacles[0];
      const distance = obstacle.xPos - tRex.xPos;
      if (distance < 120 && distance > 0 && tRex.jumping === false) {
        tRex.startJump();
      }
    }
  }, 10);



// score customize
Runner.instance_.distanceRan = 12345;




// Pause & Resume Control
Runner.instance_.stop(); // Pause
Runner.instance_.play(); // Resume



//Gravity  
Runner.instance_.tRex.config.GRAVITY = 0.1;




  
