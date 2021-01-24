var desert,desertImg;
var boy,boyImg,boyRunImg;
var gameover,gameoverImg;
var gameState = "play";
var score = 0;
var obstacle1,obstacle2,obstacle2Img,obstacle1Img;
var obstacle3,obstacle3Img,obstaclesGroup;
var coin,coinImg,coinsGroup;
var diamond,diamondImg,diamondsGroup;
var boost,boostImg,boostsGroup;
var bag,bagImg,bagsGroup;
var jewellery,jewelleryImg,jewellerysGroup;
var speed;

function preload() {
desertImg = loadImage("desert.jpg");
boostImg = loadImage("boost.jpg");
coinImg = loadImage("coin.jpg");
diamondImg = loadImage("diamond.jpg");
gameoverImg = loadImage("gameover.jpg");
jewelleryImg = loadImage("jewellery.jpg");
obstacle1Img = loadImage("obstacle1.jpg");
obstacle2Img = loadImage("obstacle2.jpg");
obstacle3Img = loadImage("obstacle3.jpg");
bagImg = loadImage("bag.jpg");
boyRunImg = loadAnimation("boy1.jpg","boy2.jpg","boy3.jpg","boy4.jpg","boy5.jpg","boy6.jpg","boy7.jpg","boy8.jpg");
}


function setup() {
createCanvas(windowWidth, windowHeight);
  
desert = createSprite(windowWidth-580,windowHeight-300);
desert.addImage("desert",desertImg);
desert.velocityX = -4;
  
boy = createSprite(100,windowHeight - 95);
boy.addAnimation("boy",boyRunImg);
boy.depth = desert.depth;
boy.depth = boy.depth + 1;

desert.depth = boy.depth;
boy.depth = boy.depth + 3;
boy.scale = 0.5;

  
textSize(17);
  
obstaclesGroup = new Group();
coinsGroup = new Group();
bagsGroup = new Group();
diamondsGroup = new Group();
jewellerysGroup = new Group();
boostsGroup = new Group();

boy.debug = false;
}

function draw() {
if(gameState === "play"){
  
if(boy.y > windowHeight-95){
boy.y = windowHeight-95;
}
  
if(boy.y < windowHeight-245){
boy.y = windowHeight-244;
}  
  
if(boy.isTouching(obstaclesGroup)){
destroy();
gameState = "end";
}
if(boy.isTouching(bagsGroup)){
bagsGroup.destroyEach();
score = score+7;
desert.velocityX = -4;
}
if(boy.isTouching(coinsGroup)){
coinsGroup.destroyEach();
score = score+1;
desert.velocityX = -4;
}
if(boy.isTouching(jewellerysGroup)){
jewellerysGroup.destroyEach();
score = score+12;
desert.velocityX = -4;
}
if(boy.isTouching(diamondsGroup)){
diamondsGroup.destroyEach();
score = score+18;
desert.velocityX = -4;
}
if(boy.isTouching(boostsGroup)){
boostsGroup.destroyEach();
desert.velocityX = -11;
energy();
}
if(desert.velocityX === -11 && boy.isTouching(obstaclesGroup)){
speed = "fast";
}
if(speed === "fast"){
obstaclesGroup.destroyEach();
coinsGroup.destroyEach();
}
if(desert.velocityX === -4){
speed = "slow";
}
if(keyDown("up")){
boy.y = boy.y - 10;
}
if(keyDown("down")){
boy.y = boy.y+10;
}
if(desert.x < 200){
desert.x = desert.width/2;
}

if(frameCount%700===0){
obstacles1();
}
if(frameCount%1500===0){
obstacles2();
}
if(frameCount%2300===0){
obstacles3();
}
if(frameCount%2850===0){
bags();
}
if(frameCount%950===0){
jewellerys();
}
if(frameCount%1700===0){
diamonds();
}
if(frameCount%3500===0){
boosts();
}
if(frameCount%320===0){
coins(); 
}
desert.velocityX = -(score+4)*3/2
obstaclesGroup.velocityXEach = desert.velocityX;
bagsGroup.velocityXEach = desert.velocityX;
coinsGroup.velocityXEach = desert.velocityX;
diamondsGroup.velocityXEach = desert.velocityX;
jewellerysGroup.velocityXEach = desert.velocityX;
boostsGroup.velocityXEach = desert.velocityX;
}

  
drawSprites();

  
fill("red");
text("SCORE : " + score,20,20);
  
if(gameState === "end"){
desert.velocityX = 0;
  
gameover = createSprite(windowWidth/2,windowHeight/2);
gameover.addImage("gameover",gameoverImg);
gameover.scale = 1;
  

drawSprites();

}
}

function obstacles1(){
obstacle1 = createSprite(50,windowHeight-95,20,20);
obstacle1.addImage("obstacle1",obstacle1Img);
obstacle1.scale = 0.4;
obstacle1.velocityX = desert.velocityX;
obstacle1.x = Math.ceil(random(windowWidth/2+70,windowWidth/2+500));
obstaclesGroup.add(obstacle1);
}
function obstacles2(){
obstacle2 = createSprite(50,windowHeight-95,20,20);
obstacle2.addImage("obstacle2",obstacle2Img);
obstacle2.velocityX = desert.velocityX;
obstacle2.scale = 0.7;
obstacle2.x=Math.round(random(windowWidth/2+70,windowWidth/2+500));
//obstacle2.lifetime = 
obstaclesGroup.add(obstacle2);
}
function obstacles3(){
obstacle3 = createSprite(50,windowHeight-95,20,20);
obstacle3.addImage("obstacle3",obstacle3Img);
obstacle3.velocityX = desert.velocityX;
obstacle3.scale = 0.4;
obstacle3.x = Math.ceil(random(windowWidth/2+70,windowWidth/2+500));
//obstacle1.lifetime = 
obstaclesGroup.add(obstacle3);
}
function coins(){
coin = createSprite(50,windowHeight-95,20,20);
coin.addImage("coin",coinImg);
coin.velocityX = desert.velocityX;
coin.x = Math.ceil(random(windowWidth/2+70,windowWidth/2+500));
//coin.lifetime = 
coinsGroup.add(coin);
}
function boosts(){
boost = createSprite(50,windowHeight-95,20,20);
boost.addImage("boost",boostImg);
boost.velocityX = desert.velocityX;
boost.scale=0.5;
boost.x = Math.ceil(random(windowWidth/2+70,windowWidth/2+500));
//boost.lifetime = 
boostsGroup.add(boost);
}
function diamonds(){
diamond = createSprite(50,windowHeight-95,20,20);
diamond.addImage("diamond",diamondImg);
diamond.velocityX = desert.velocityX;
diamond.scale = 0.3;
diamond.x = Math.ceil(random(windowWidth/2+70,windowWidth/2+500));
//diamond.lifetime = 
diamondsGroup.add(diamond);
}
function bags(){
bag = createSprite(50,windowHeight-95,20,20);
bag.addImage("bag",bagImg);
bag.velocityX = desert.velocityX;
bag.scale=0.3;
bag.x = Math.ceil(random(windowWidth/2+70,windowWidth/2+500));
//bag.lifetime = 
bagsGroup.add(bag);
}
function jewellerys(){
jewellery = createSprite(50,windowHeight-95,20,20);
jewellery.addImage("jewellery",jewelleryImg);
jewellery.velocityX = desert.velocityX;
jewellery.scale=0.4;
jewellery.x = Math.ceil(random(windowWidth/2+70,windowWidth/2+500));
//jewellery.lifetime = 
jewellerysGroup.add(jewellery);
}
function destroy(){
boy.visible = false;
obstaclesGroup.destroyEach();
bagsGroup.destroyEach();
coinsGroup.destroyEach();
jewellerysGroup.destroyEach();
diamondsGroup.destroyEach();
boostsGroup.destroyEach();
desert.setVelocity(0,0);
gameState="end";
}
function energy(){
obstaclesGroup.velocityXEach = -11;
diamondsGroup.velocityXEach = -11;
jewellerysGroup.velocityXEach = -11;
coinsGroup.velocityXEach = -11;
bagsGroup.velocityXEach = -11;
}