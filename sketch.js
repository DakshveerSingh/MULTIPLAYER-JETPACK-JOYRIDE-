var bg, bgImage;
var barry, barry_Walk, barry_Fly,barry_Die1,barry_Die2,barry_Fall;
var ground, roof;
var zapGroup,zapImg_1, zapImg_2, zapImg_3, zapImg_4,zapImg_5;

var gameState = "play";

function preload() {
  bgImage = loadImage("Img/bg6.jpg");

  barry_Walk = loadAnimation("Img/walk1.png", "Img/walk2.png");
  barry_Fly = loadAnimation("Img/flying1.png");
  barry_Fall = loadAnimation("Img/barryFalling.png")
  barry_Die1 = loadAnimation("Img/dead.png");

  zapImg_1 = loadImage("Img/zap.png");
  zapImg_2 = loadImage("Img/zap1.png");
  zapImg_3 = loadImage("Img/zap2.png");
  zapImg_4 = loadImage("Img/zap3.png");
  zapImg_5 = loadImage("Img/zap4.png");
}

function setup() {
  createCanvas(800, 600);

  // background
  bg = createSprite(width / 2, height / 2, width * 2, height);
  bg.addImage(bgImage);
  bg.scale = 0.8;
  bg.setVelocity(-5, 0);

  // main character
  barry = createSprite(75, height - 100, 20, 20);
  barry.addAnimation("walking", barry_Walk);
  barry.addAnimation("jumping", barry_Fly);
  barry.addAnimation("dying", barry_Die1);
  barry.addAnimation("falling", barry_Fall);
  barry.scale = 0.6;

  // ground and roof
  ground = createSprite(width / 2, height - 70, width, 10);
  ground.visible = false;
  roof = createSprite(width / 2, 55, width, 10);
  roof.visible = false;

  zapGroup = new Group();
}

function draw() {
  background(0);
  // looped background
  if (bg.x < 0) {
    bg.x = 800;
  }
  // gravity
  barry.velocityY = barry.velocityY + 0.6;
  barry.collide(ground);
  barry.collide(roof);

  // levitation
  if (keyDown("space")) {
    barry.velocityY = -8;
     barry.changeAnimation("jumping");
  }

  // dying
 if (barry.isTouching(zapGroup)) {
   barry.changeAnimation("dying");
 }
  
  // Main Animations
  if (barry.velocityY > 0) {
    barry.changeAnimation("falling");
  }
  if (barry.y > 490) {
    barry.changeAnimation("walking");
  }
    
  spawnZaps();
  drawSprites()
}

function spawnZaps() {
  if (frameCount % 100 === 0) {
    var zap = createSprite(850, Math.round(random(roof.y + 80, ground.y - 50), 20, 20));
    zap.velocityX = -5;

    var rdm = Math.round(random(1, 5));
    switch (rdm) {
      case 1: zap.addImage(zapImg_1);
        break;
      case 2: zap.addImage(zapImg_2);
        break;
      case 3: zap.addImage(zapImg_3);
        break;
      case 4: zap.addImage(zapImg_4);
        break;
      case 5: zap.addImage(zapImg_5);
        break;
      default: break;
    }

    zap.scale = 0.5;
    zap.lifetime = width;
    zapGroup.add(zap);
  }
}