var dog,sadDog,happyDog, database;
var credit,creditRem;
var foodS,foodStock;
var fedTime,lastFed;
var feed,buyFood;
var score,credit1;
var h;


function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
}


function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(300,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  score = new Score();
  credit1 = new Credit();
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  credit=database.ref('Credit');
  credit.on("value",function(data){
    creditRem=data.val();
  });
 
  feed=createButton("Feed the dog");
  feed.position(730,100);
  feed.mousePressed(writeStock);

  buyFood=createButton("Buy Food");
  buyFood.position(740,130);
  buyFood.mousePressed(buyaFood);
}

function draw() {
     background(46,139,87);

 score.display();
 credit1.display();
 
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });

 if(lastFed>=12){
   text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(){
  h=hour();
  dog.addImage(happyDog);
  if(foodS==0){
    foodS=0;
  }else{
    foodS--;
  }
  database.ref('/').update({
    Food:foodS,
    FeedTime:h
  })
}

function buyaFood(){
  if(creditRem==0){
    creditRem=0;
  }else{
    creditRem=creditRem-5;
    foodS++;
  }
  database.ref('/').update({
    Credit:creditRem,
    Food:foodS
  })
}