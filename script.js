const game = document.getElementById('game');
const skier = document.getElementById('skier');

game.addEventListener('mousemove', (event) => {
  const gameRect = game.getBoundingClientRect();
  const x = event.clientX - gameRect.left + 10;

  if((event.clientX) < (gameRect.right - 70)) {
    skier.style.left = `${x}px`;
  }
});

function createGate() {
  const gate = document.createElement('div');
  gate.classList.add('gate');
  const gameRect = game.getBoundingClientRect();
  gate.style.left = `${Math.random() * (gameRect.width - 50)}px`; // limit to the width of the game
  game.appendChild(gate);

  gate.addEventListener('animationend', () => {
    gate.remove();
  });
}

setInterval(createGate, 1000);
