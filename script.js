const game = document.getElementById('game');
const skier = document.getElementById('skier');
let counter = 0;
let blue = true;

game.addEventListener('mousemove', (event) => {
  const gameRect = game.getBoundingClientRect();
  const x = event.clientX - gameRect.left + 10;

  if((event.clientX) < (gameRect.right - 70)) {
    skier.style.left = `${x}px`;
  }
});

function checkCollision() {
  const skierRect = skier.getBoundingClientRect();
  const gates = document.querySelectorAll('.gate');

  gates.forEach(gate => {
    const gateRect = gate.getBoundingClientRect();
    if (skierRect.bottom >= gateRect.top && skierRect.top <= gateRect.bottom &&
        skierRect.right >= gateRect.left && skierRect.left <= gateRect.right) {
      console.log('Collision detected!');
      // handle collision here, such as game over or score increment
      alert("You hit a gate. score: "+Math.floor(counter/100));
      counter=0;
    }
    else {
      if (gate.style.backgroundColor == "red") {
        if (skierRect.bottom >= gateRect.top && skierRect.left <= gateRect.right && skierRect.top <= gateRect.bottom) {
          alert("You missed a red gate. score: "+ Math.floor(counter/100));
          counter=0;
        }
      }
      if (gate.style.backgroundColor == "blue"){
        //if the gate is blue, the skier should be on the left side of the gate before the top of the gate passes the bottom of the skier
        if (skierRect.bottom >= gateRect.top && skierRect.right >= gateRect.left && skierRect.top <= gateRect.bottom) {
          alert("You missed a blue gate. score: "+Math.floor(counter/100));
          counter=0;
        }
      }
      counter++;
      document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
  });
}

function createGate() {
  const gate = document.createElement('div');
  gate.classList.add('gate');
  const gameRect = game.getBoundingClientRect();
  const minDistanceFromEdge = 80; // minimum distance from the edge

  // Generate a random gate position on the left or right half of the screen
  const gatePosition = blue ? Math.random() * (gameRect.width/2 - minDistanceFromEdge * 2 - 50) + minDistanceFromEdge : Math.random() * (gameRect.width/2 - minDistanceFromEdge * 2 - 50) + gameRect.width/2 + minDistanceFromEdge;

  gate.style.left = `${gatePosition}px`;
  gate.style.backgroundColor = blue ? 'blue' : 'red';
  game.appendChild(gate);

  //alternate the value of blue
  blue = !blue;

  gate.addEventListener('animationend', () => {
    gate.remove();
  });
}




setInterval(createGate, 1000);
setInterval(checkCollision, 10);
