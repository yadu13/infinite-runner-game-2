var monkey , monkey_running
var banana ,banana2,bananabunch,bananaImage,bananabunchImage,backgroundImage;
var ground
var obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survival_time = 0;
var score = 0;
var count = 0;
var gameState = "play";
var monkey,monkey_running;
var banana2Group,bananaGroup,obstaclesGroup;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

function preload(){
  
  monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananabunchImage= loadImage("bananabunch.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backgroundImage = loadImage("bg2.png");

}

function setup() {
  createCanvas(displayWidth- 20,displayHeight- 30);
 // database = firebase.database();
  monkey = createSprite(280,305,100,120);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(225,400,1000,10);
  ground.velocityX = -3;
  ground.shapeColor = ("brown");
  ground.visible = false;
  
  banana2Group = createGroup();
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  
  Background = createSprite(0,0,800,1000);
  Background.addImage("bg2",backgroundImage);
  Background.velocityX =-2;
  Background.scale = 4.5;
  
}

function draw() {
  
  background("black");
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  }
  if(gameState===2){
    game.end();
  
  if(gameState === "play"){
   
      if(ground.x<0){
    ground.x = ground.width/2;
  }
      if(keyDown("space")&&monkey.y>140){
    monkey.velocityY = -15;
  }
    if (Background.x< 0){
      Background.x = Background.width/2;
    }
    if(monkey.isTouching(bananaGroup)){
   bananaGroup.destroyEach();
   score = score + 1;
 }
  
   if(monkey.isTouching(banana2Group)){
   banana2Group.destroyEach();
   score = score + 1;
 }
    
  if(monkey.isTouching(obstaclesGroup)){
 monkey.scale = 0.09;
 count = count + 1;
  obstaclesGroup.destroyEach();
 }
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
      default: break;
  }
   Food();
   banana2();
   Obstacles();
survival_time = survival_time+Math.round(getFrameRate()/62);
   monkey.velocityY = monkey.velocityY + 1;
    
   if(count >= 2){
   gameState = "end";
  }
}

  monkey.collide(ground);

 if(gameState === "end"){
   monkey.visible = false;
   Background.visible = false;
   bananaGroup.visible = false;
   banana2Group.visible = false;
   bananaGroup.setLifetimeEach(0);
   banana2Group.setLifetimeEach(0);
   obstaclesGroup.setLifetimeEach(0);
   fill("yellow");
   stroke("yellow");
   textSize(40);
   text("GAME OVER",530,225);
   textSize(25);
   fill("orange");
   stroke("orange");
   text("Press R To Restart The Game",517,325);
    if(keyDown("R")){
      reset();
    }
 }

  drawSprites();
 
  fill("white");
  stroke("white");
  textSize(22);
  textFont("algerian")
  text("SURVIVAL TIME :- " + survival_time,900,35);
  textFont("algerian")
  text("SCORE - "+ score,780,35);
}

function Food(){
  if(frameCount % 80 === 0){
    var banana = createSprite(450,220,20,20);
    banana.y = Math.round(random(50,100));
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.06;
    banana.lifetime = 90;
    bananaGroup.add(banana);
    monkey.depth = banana.depth + 1;
  }
}  
function banana2(){
  if(frameCount % 80 === 0){
    var banana = createSprite(420,210,20,20);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananabunchImage);
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.lifetime = 90;
    banana2Group.add(banana);
    monkey.depth = banana.depth + 1;
  }
}
function Obstacles(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(450,378,30,30);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.16;
    obstacle.lifetime = 76;
    obstaclesGroup.add(obstacle);
    monkey.depth = obstacle.depth + 1;
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",monkey_running);
}

function reset(){
  gameState = "play";
  monkey.visible = true
  Background.visible = true
  score = 0;
  count = 0;
  survival_time = 0;
}