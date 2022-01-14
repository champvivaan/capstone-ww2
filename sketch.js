
var plane,planeImg;

var backImg;

var count = 0;
var tanksDestroyed= 0;
var health=100;
var bulletsLeft=50;
var bombsLeft=20;
var fuel=400;

var bombImg;
var tankBImg;

var tankMissileGroup;

var tankMissile;

var airDropImg;

var explode1Sound,explode2Sound;

var planeSound;

var bulletSound;

var explode2Img ;

var bomb;

var airDrop;

var enemy1,enemy2;
var enemyPlane;
var tanksGroup;

var tank;

var bullet,bulletImg;

var bulletGroup;
var bombGroup;
var airGroup;

var enemyPlaneGroup;
var gameState;

var planeEx;

var tank1,tank2,tank3,tank4;

var lineTop,lineRight,lineLeft,lineBottom;

function preload(){
 
  backImg=loadImage("background.jpg")
  planeImg=loadImage("plane.png")   

  planeEx=loadImage("explodes.png")

  enemy1=loadImage("enemy1.png");
  enemy2=loadImage("enemy2.png");
  
  bulletImg=loadImage("planegun.png");
  bombImg=loadImage("planebomb.png")

  tank1=loadImage("tank1.png");
  tank2=loadImage("tank2.png")
  tank3=loadImage("tank3.png")
  tank4=loadImage("tank4.png");

  airDropImg=loadImage("airDrop.png")

  explode2Img=loadImage("explode2.png")

  tankBImg=loadImage("TankB2.png");

  bulletSound=loadSound("BulletSound.mp3")

 

  explode1Sound=loadSound("explode1.mp3");

}

function setup() {
  createCanvas(1200,500);
   
  plane=createSprite(900,200,20,20);
  plane.scale=0.7
  plane.addImage(planeImg);

  lineTop=createSprite(600,0,1200,10);
  lineBottom=createSprite(600,460,1200,10);
  lineBottom.visible=false;

  lineLeft=createSprite(0,250,10,500);
  lineRight=createSprite(1200,250,10,500);

  bulletGroup= createGroup();
  bombGroup= createGroup();
  enemyPlaneGroup = createGroup();
  tanksGroup = createGroup();
  airGroup = createGroup();
  tankMissileGroup = createGroup();
  
  gameState="play"

}





function draw() {

  background(backImg);

  //planeSound.play();

  if(gameState==="play"){
    fuel--;

    keyControl();

    die();

    if (airGroup.isTouching(plane)){

      airGroup.destroyEach();
      fuel+=500;
      bulletsLeft+=30;
      bombsLeft+=10;
    
    }
    
    for(var i=0;i< enemyPlaneGroup.length; i++){
      if (enemyPlaneGroup.get(i).isTouching(bulletGroup)){
        enemyPlaneGroup.get(i).destroy();
        count++;
      }
    }
  
    for(var t=0;t< tanksGroup.length; t++){
      if (tanksGroup.get(t).isTouching(bombGroup)){
        tanksGroup.get(t).destroy();
        tanksDestroyed++;
        explode1Sound.play();
        tank.addImage(planeEx);
      }
    }
  }

  scoreText()

  //making plane stop from going out of canvas
  plane.collide(lineTop);
  plane.collide(lineBottom);
  plane.collide(lineRight);
  plane.collide(lineLeft);

  airDrops();
  enemyPlanes();
  enemyTanks()  
  drawSprites();

  if(gameState==="end"){
    
    textSize(100);
    fill(random(50,160), random(20,190),random(100,200));
    stroke(random(50,160), random(20,190),random(100,200));
    strokeWeight(7)
    text("Game Over",300,200)
  }
}



function scoreText(){
  
  fill("blue")
  textSize(25);
  text("PlaneDestroyed: "+ count, 900, 50);

  fill("blue")
  textSize(25);
  text(" TanksDestroyed: "+  tanksDestroyed, 890, 80);

  fill("blue")
  textSize(25);
  text(" Fuel: "+  fuel, 895, 110);

  fill("blue")
  textSize(25);
  text(" Bullets: "+ bulletsLeft , 896 , 140);

  fill("blue")
  textSize(25);
  text(" Bombs: "+ bombsLeft , 896 , 170);
}

function keyControl(){
  if(keyDown("S")){
    gameState==="play"
  }
  if(keyDown("up")){
  plane.y-=8;
  }
  if (keyDown("down")){
    plane.y+=8;
  }
  if (keyDown("right")){
  plane.x+=6;
  }
  if(keyDown("left")){
    plane.x-=6;
  }
  if(keyWentDown("space")){
    bullets();
    bulletsLeft--;
    bulletSound.play();
  }
  if(keyWentDown("b")){
    bombs();
    bombsLeft--;
  }
}

function die(){
  if (plane.isTouching(enemyPlaneGroup)){

    gameState="end";
    plane.addImage(explode2Img);
    enemyPlaneGroup.destroyEach();

  }

  if(plane.isTouching(tankMissileGroup)){

    gameState="end";
    plane.addImage(explode2Img);
    tankMissileGroup.destroyEach();
  }
  //crashing on ground
  if(plane.isTouching(lineBottom)){
    gameState="end"
    plane.addImage(planeEx);

  }

  if (fuel===0){
    gameState="end";
    plane.velocityY=5;
    fuel===0;
  }
}

function bullets (){

  var  bullet =   createSprite( plane.x,plane.y);
  bullet.velocityX= -30;
  bullet.addImage(bulletImg)
  bullet.scale=0.2;
  bulletGroup.add(bullet);
}



function bombs (){

  var  bomb =   createSprite( plane.x,plane.y);
   bomb.velocityY= +10;
   bomb.addImage(bombImg)
   bomb.scale=0.1;
   bombGroup.add(bomb);
}

function enemyPlanes(){

  if(frameCount % 180 === 0 ){
    enemyPlane=createSprite(-100,random(50,300))
    var r=Math.round(random(1,2));
    enemyPlaneGroup.add(enemyPlane);
    enemyPlane.velocityX+=6;
    enemyPlane.scale=0.5;
  
    if(r===1){
      enemyPlane.addImage(enemy1);
    }
    else{
      enemyPlane.addImage(enemy2);
    }
  }
}


function enemyTanks(){

  if( frameCount % 150 === 0 ){
  
    tank=createSprite(200,450);
    tank.velocityX+=4;
    tank.scale=0.6;
    tanksGroup.add(tank);
    var r=Math.round(random(1,4));
    if(r===1){
      tank.addImage(tank1);
    }
    else if (r===2){ 
      tank.addImage(tank2);
    }
    else if (r===3){
      tank.addImage(tank3)
    }
    else{
      tank.addImage(tank4)
    }

    if(frameCount %18   === 0 ){
      tankMissile=createSprite(tank.x,tank.y);
      tankMissile.addImage(tankBImg);
      tankMissile.velocityY=-3;
      tankMissile.velocityX=random(-4,7);
      tankMissile.scale=0.5;
      tankMissileGroup.add(tankMissile);

    }
  }
}

function airDrops(){
    
   if(frameCount % 300 === 0 ){
    airDrop=createSprite(random(200,800),-100);
    airDrop.addImage(airDropImg);
    airDrop.velocityY=3;
    airDrop.velocityX=random(-4,4);
    airDrop.scale=0.5;
    airGroup.add(airDrop);
   }
}