
var monkey , monkey_running,monkeyob;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup;
var score=0;
var ground,road;
var ivisibleGround;
var obstacleGroup;
var survivalTime=0;
var PLAY = 0;
var END = 1;
var gameState=PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  road=loadImage("ground.png")

}



function setup() {
  createCanvas(600,400)
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  monkey=createSprite(300,270,20,20);
  monkey.addAnimation("m",monkey_running)
  monkey.scale=0.15;
  
  ground=createSprite(200,410,1000,10);
 ground.addImage("gro",road);
  
  
  invisibleGround=createSprite(200,350,1000,10);
  invisibleGround.visible=false;
  

}


function draw() {
background("lightblue")
  
  stroke("black")
  fill("black")
  textSize(20)
 text("SURVIVAL TIME: "+survivalTime, 340, 20);
  text("BANANAS COLLECTED: "+score,340,50);
  survivalTime= survivalTime + Math.round(getFrameRate()/60);
  
    monkey.debug=true;
  
  
  if (gameState === PLAY){

    
    
    ground.velocityX = -2;
  
    if(keyDown("space")&&monkey.y>235) {
      monkey.velocityY = -14; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 300){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      score=score+1;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
      
    }
    
  }
  
  else if (gameState === END){
    ground.velocityX = 0;

    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
      survivalTime = 0;
      gameState = PLAY; 
    }
  }
  
  Obstacles();
    bananas();
  
  drawSprites(); 
  
  monkey.collide(invisibleGround);


  
}



function bananas(){
  if (frameCount%300 === 0){
    
    banana = createSprite(600,100, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-3         
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }

}

function Obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(600,300, 50, 50 )
    obstacle.addImage("rock",obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX =-2;        
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    

    
  }

}

    
  
  
  




