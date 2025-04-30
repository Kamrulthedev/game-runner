// Create UI container
const panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.top = '20px';
panel.style.right = '20px';
panel.style.padding = '10px';
panel.style.background = 'rgba(0,0,0,0.8)';
panel.style.color = 'white';
panel.style.zIndex = 9999;
panel.style.borderRadius = '10px';
panel.style.fontFamily = 'monospace';
panel.innerHTML = `
  <h4 style="margin:0 0 10px 0;">🦖 Dino Hack Panel</h4>
  <button id="toggleAutoJump">Auto Jump: OFF</button><br/><br/>
  <label>Speed: <span id="speedValue">6</span></label><br/>
  <input id="speedSlider" type="range" min="1" max="100" value="6"><br/><br/>
  <button id="pauseGame">Pause</button>
  <button id="resumeGame">Resume</button><br/><br/>
  <button id="disableGameOver">🚫 Disable Game Over</button>
`;

document.body.appendChild(panel);

// Speed Controller
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
speedSlider.addEventListener('input', () => {
  const val = Number(speedSlider.value);
  Runner.instance_.setSpeed(val);
  speedValue.innerText = val;
});

// Auto Jump Toggle
let autoJump = false;
let autoJumpInterval = null;
document.getElementById('toggleAutoJump').onclick = () => {
  autoJump = !autoJump;
  const btn = document.getElementById('toggleAutoJump');
  btn.textContent = `Auto Jump: ${autoJump ? 'ON' : 'OFF'}`;
  if (autoJump) {
    autoJumpInterval = setInterval(() => {
      const tRex = Runner.instance_.tRex;
      const obs = Runner.instance_.horizon.obstacles;
      if (obs.length > 0) {
        const obsX = obs[0].xPos - tRex.xPos;
        if (obsX < 120 && obsX > 0 && !tRex.jumping) {
          tRex.startJump();
        }
      }
    }, 10);
  } else {
    clearInterval(autoJumpInterval);
  }
};

// Pause & Resume
document.getElementById('pauseGame').onclick = () => Runner.instance_.stop();
document.getElementById('resumeGame').onclick = () => Runner.instance_.play();

// Disable Game Over
document.getElementById('disableGameOver').onclick = () => {
  Runner.prototype.gameOver = () => {};
  alert("Game Over Disabled!");
};
