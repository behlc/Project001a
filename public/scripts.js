var robotsList = [];
var yFactor = 0.2;
var blockYPos;
var blockWidth;
var blockHeight;
var gamePoints = 0;
var robotLives = 4;
var gameTimeout;


function preload() {
  backgroundImage = loadImage("bgimage.png");
  robotImage = loadImage("robots.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  blockYPos = windowHeight-200;
  blockWidth = windowWidth*0.05;
  blockHeight = windowWidth*0.03;
  makeRobots();
}

function draw() {
  background("black");
  
  image(backgroundImage,0,0,windowWidth, windowHeight);
  makeBlocks();

  fill("#ff8000");

  textSize(18);
  //text('🌈', 0, 100);

  text("Points : " + gamePoints, 20, 30);

  text("Lives  : " + robotLives, 20, 60);

  robotsList.forEach(processRobotList);
}

function processRobotList(item, index) {
  item.move();
  if (item.x > windowWidth) {
    robotsList.splice(index,1);
    gamePoints += 1;
  }

  if (item.y > windowHeight) {
    robotsList.splice(index,1);
    robotLives -= 1;
    if (robotLives === 0) {
      endGame();
    }
  }
}

class Robots {
  constructor() {
    this.x = 10;
    this.y = windowHeight / 2;
    //this.y = 10;

    this.height = 40;
    this.width = 40;
    this.xSpeed = random(3,10);
    this.ySpeed = random(-3,-10);
  }
 
  move() {
    this.x += this.xSpeed;

    this.ySpeed += yFactor;
    if (this.y + this.height > blockYPos && this.y < blockYPos + blockHeight 
        && this.x + this.width > mouseX && this.x < mouseX + blockWidth) 
    {
      this.ySpeed = -1 * this.ySpeed;
      
    }
    
    this.y += this.ySpeed;     

    image(robotImage, this.x, this.y, this.width, this.height);

  }
  
}

function makeRobots() {
  robotObj = new Robots();
  robotsList.push(robotObj);
  console.log(robotsList);
  gameTimeout = setTimeout(makeRobots, 1000);
  
}

function makeBlocks() {
  fill("#ff0080");
  rect(mouseX, blockYPos, blockWidth, blockHeight,0,0,20,20);

}

function endGame() {
  noLoop();
  background('#ffce99');

  textSize(64);
  textAlign(CENTER);
  text('GAME OVER', windowWidth / 2, windowWidth / 6);
  text('Points : ' + gamePoints, windowWidth / 2, windowWidth / 8)
  clearTimeout(gameTimeout);
  
}