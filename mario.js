const ground = new Image();
const groundWidth = 50;
const groundHeight = 50;
ground.src = "/fotos/Brick.webp";
ground.width = groundWidth;
ground.height = groundHeight;
console.log("ground.height ===", ground.height);

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 470,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else this.velocity.y = 0;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y,
    };
    this.image = ground;
    this.width = groundWidth;
    this.height = groundHeight;
  }
  draw() {
    // ctx.fillStyle = "blue";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.drawImage(
      ground,
      this.position.x,
      this.position.y,
      groundWidth,
      groundHeight
    );
  }
}

const image = new Image();

const player = new Player();
// const platform = new Platform();
// const platforms = [
//   new Platform({ x: -1, y: 530, image: ground }),
//   new Platform({ x: groundWidth - 2, y: 530, image: ground }),
// ];

const platformCount = 22;
const airPlatformCount = 4;
const pyramidLevels = 6;
const pyramid = [];
const platforms = [];

for (let i = -1; i < platformCount; i++) {
  const x = i * (groundWidth - 2);
  platforms.push(new Platform({ x, y: 530, image: ground }));
}
for (let i = 0; i < airPlatformCount; i++) {
  const x = (5 + i) * (groundWidth - 2);
  platforms.push(new Platform({ x, y: 200, image: ground }));
}

document.getElementById("pyramidInput").addEventListener("input", function () {
  const inputValue = parseInt(this.value);
  console.log("inputValue ===", inputValue);
  makePyramid(inputValue);
});

function makePyramid(number) {
  if (number <= 6) {
    pyramid.length = 0;
    console.log("pyramid.length ===", pyramid.length);
    for (let level = 0; level < number; level++) {
      for (let i = 0; i < number - level; i++) {
        const x1 = (12.5 + i) * (groundWidth - 1);
        const x2 = (12.5 - i) * (groundWidth - 1);
        const y = 482 - level * 48;
        pyramid.push(new Platform({ x: x1, y, image: ground }));
        pyramid.push(new Platform({ x: x2, y, image: ground }));
      }
    }
    console.log("pyramid.length ===", pyramid.length);
  } else return console.log("per didelis sk");
}

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

player.update();

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  platforms.forEach((platform) => {
    platform.draw();
  });
  pyramid.forEach((block) => {
    block.draw();
  });
  player.update();

  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
  }
  //platform colision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  //pyramid colision detection
  pyramid.forEach((block) => {
    if (
      player.position.y + player.height <= block.position.y &&
      player.position.y + player.height + player.velocity.y >=
        block.position.y &&
      player.position.x + player.width >= block.position.x &&
      player.position.x <= block.position.x + block.width
    ) {
      player.velocity.y = 0;
    }
  });
}
animate();

window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;

      break;
    case 83:
      //   player.velocity.y += 20;
      console.log("player.velocity.y ===", player.velocity.y);
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 5;
      break;
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;

      break;
    case 83:
      //   player.velocity.y += 5;
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;

      player.velocity.x = 0;
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 5;
      break;
  }
});

//padaryt, kad negaletu praeiti per blokus
//padaryt kad negaletu uzeit uz ribu
//padaryt zmogeliuka
