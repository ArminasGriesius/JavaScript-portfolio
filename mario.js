const ground = new Image();
ground.src = "/fotos/Brick.webp";
const groundWidth = 50;
const groundHeight = 50;
ground.width = groundWidth;
ground.height = groundHeight;

const mario = new Image();
mario.src = "/fotos/mario.webp";

const marioBack = new Image();
marioBack.src = "/fotos/marioBack.webp";

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;
let frames = 0;
let movingDirection = "right";
let isMovingRight = false;
let isMovingLeft = false;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 350,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 50;
    this.height = 100;
    this.sprites = {
      run: {
        right: mario,
        left: marioBack,
      },
    };
  }
  draw() {
    const currentSprite =
      movingDirection === "right"
        ? this.sprites.run.right
        : this.sprites.run.left;

    ctx.drawImage(
      currentSprite,
      180 * Math.round(frames),
      0,
      150,
      220,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
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

const player = new Player();

const platformCount = 22;
const airPlatformCount = 4;
const pyramid = [];
const platforms = [];

class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.image = ground;
    this.width = groundWidth;
    this.height = groundHeight;
  }
  draw() {
    ctx.drawImage(
      ground,
      this.position.x,
      this.position.y,
      groundWidth,
      groundHeight
    );
  }
}

for (let i = -1; i < platformCount; i++) {
  const x = i * (groundWidth - 2);
  platforms.push(new Platform({ x, y: 530, image: ground }));
}
for (let i = 0; i < airPlatformCount; i++) {
  const x = (5 + i) * (groundWidth - 2);
  platforms.push(new Platform({ x, y: 200, image: ground }));
}

const pyramidInput = document.getElementById("pyramidInput");

pyramidInput.addEventListener("input", () => {
  const inputValue = parseInt(pyramidInput.value);
  makePyramid(inputValue);
});

function makePyramid(number) {
  if (number <= 6) {
    pyramid.length = 0;
    for (let level = 0; level < number; level++) {
      for (let i = 0; i < number - level; i++) {
        const x1 = (12.5 + i) * (groundWidth - 1);
        const x2 = (12.5 - i) * (groundWidth - 1);
        const y = 482 - level * 48;
        pyramid.push(new Platform({ x: x1, y, image: ground }));
        pyramid.push(new Platform({ x: x2, y, image: ground }));
      }
    }
  } else return;
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

  if (keys.right.pressed && player.position.x < 991) {
    player.velocity.x = 5;
    frames += 0.2;
    if (frames > 2) {
      frames = 0;
    }
  } else if (keys.left.pressed && player.position.x > 0) {
    player.velocity.x = -5;
    frames += 0.2;
    if (frames > 2) {
      frames = 0;
    }
  } else {
    player.velocity.x = 0;
  }
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

    if (
      (player.position.x + player.width <= block.position.x &&
        player.position.x + player.width + player.velocity.x >=
          block.position.x &&
        player.position.y + player.height >= block.position.y &&
        player.position.y <= block.position.y + block.height) ||
      (player.position.x >= block.position.x + block.width &&
        player.position.x + player.velocity.x <=
          block.position.x + block.width &&
        player.position.y + player.height >= block.position.y &&
        player.position.y <= block.position.y + block.height)
    ) {
      player.velocity.x = 0;
    }
  });
}
animate();

let isJumping = false;

let lastPressedKey = null;

addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "a":
    case "A":
      keys.left.pressed = true;
      isMovingRight = false;
      isMovingLeft = true;
      if (!keys.right.pressed) {
        movingDirection = "left";
      }
      lastPressedKey = key;
      break;

    case "d":
    case "D":
      keys.right.pressed = true;
      isMovingRight = true;
      isMovingLeft = false;
      movingDirection = "right";
      lastPressedKey = key;
      break;
    case "w":
    case "W":
      if (player.velocity.y == 0 && !isJumping) {
        player.velocity.y -= 10;
        isJumping = true;
      }
      lastPressedKey = key;
      break;
  }
});

addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
    case "A":
      keys.left.pressed = false;
      frames = 2;
      if (keys.right.pressed) {
        movingDirection = "right";
      }
      break;

    case "d":
    case "D":
      frames = 0;
      keys.right.pressed = false;
      if (keys.left.pressed) {
        movingDirection = "left";
      }
      player.velocity.x = 0;
      break;
    case "w":
    case "W":
      isJumping = false;
      break;
  }
});
