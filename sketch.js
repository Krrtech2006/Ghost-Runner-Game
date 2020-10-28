var gameState="play";
var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGrp;
var spookySound;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
   
  spookySound.loop();
  
  tower=createSprite(300,300,10,10);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  doorGroup=createGroup();
  climberGroup=createGroup();
  
  ghost=createSprite(200,100,10,10);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  invisibleBlockGrp=createGroup();
}


function draw(){
  background(0);
  if(gameState==="play"){
  if(tower.y>400){
    tower.y=300;
  }
  spawnDoors();  
  
  if(keyDown("A")){
    ghost.velocityY=-5;       
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGrp.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
    drawSprites();
  }
  if(gameState==="END"){
    stroke("black");
    fill("yellow");
    textSize(30);
    text("GameOver",230,250);
        
  }
}   
  
function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,50,10,10);
    door.addImage(doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    doorGroup.add(door);
    
    climber=createSprite(200,110,10,10);
    climber.addImage(climberImg);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=800;
    climberGroup.add(climber);
    
   ghost.depth=door.depth;
  ghost.depth+=1;
    
    invisibleBlock=createSprite(200,115,10,10);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock .lifetime=800;
    invisibleBlock.debug=true;
    invisibleBlockGrp.add(invisibleBlock);
  }
  
  
}
  
  
 




