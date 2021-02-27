
var monkey , monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground,invisibleGround;
var survivalTime = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var gameState = RESTART;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {

  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(450,350,900,10);
  ground.velocityX = -4,
  ground.x=ground.width/2;
  console.log(ground.x)
  
  invisibleGround = createSprite(450,360,900,10);
  invisibleGround.visible = false;
  

  score=0;
  survivalTime = 0;
  
}


function draw() {

  background("pink")
  
  stroke("black");
  textSize(12);
  fill("black");
  text("Score: " + score, 300,20);
  
  stroke("black");
  textSize(12);
  fill("black");
  
  text("Survival Time: " + survivalTime, 40, 20);
  
  if(gameState === PLAY){

    survivalTime=Math.ceil(frameCount/frameRate());
    obstacles();
   bananas();
    
  //jump when space bar pressed
  if(keyDown("space")&& monkey.y >= 155){
    monkey.velocityY = -10;
  }
    
    
  
  //apply gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  //scrolling ground 
  if (ground.x < 0){
      ground.x = ground.width/2;}
    
  //collide   
  monkey.collide(invisibleGround);
  
  if(monkey.isTouching(obstacleGroup)){
        gameState = END;
    }
    if(monkey.isTouching(bananaGroup)){
      score = score +1;
      bananaGroup.destroyEach();
    } 
  } else if(gameState === END){
    console.log("ss");
    ground.velocityX =0;
    
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    
      textSize(18)
    fill("grey")
    text("YOU HIT A ROCK....Try again by pressing 'r'", 20,90)
    
    if(keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      
      score=0;
      survivalTime=0;
      gameState = PLAY;
    }
 
    
  }
  drawSprites();
  
  
  monkey.collide(invisibleGround);
}

  
function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,230,40,10);
    banana.addAnimation ("banana", bananaImage);
    banana.addImage(bananaImage);
    banana.velocityX = -3;
  
    banana.lifetime = 200;
    banana.scale = 0.1
    bananaGroup.add(banana);
  }
}
  function obstacles(){
    if (frameCount % 200 === 0) {
    obstacle = createSprite(400,330,40,50);
    obstacle.addAnimation("rock", obstacleImage)  
    
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.scale = 0.1
    obstacle.lifetime = 200;
      obstacleGroup.add(obstacle);
    
  }
}
