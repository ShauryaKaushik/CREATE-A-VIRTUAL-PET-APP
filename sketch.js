var dog;
var dogImage;
var happyDog;
var database;
var foodStock;
var feedDog,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
dogImage = loadImage("dogImg.png");
happyDog = loadImage("dogImg1.png");
}

function setup() {
  
  dog = createSprite(250,300,15,20);
  dog.scale = 0.3;
  dog.addImage(dogImage);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock); 


  feed = createButton("Feed The Dog"); 
  feed.position(700,95);
  feed.mousePressed(feedDog); 

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  createCanvas(500, 500);
  
}


function draw() {  

  background(46,139,87);
  
  fedTime = database.ref('Feed Time');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill("white");
  text("Press the Up Arrow Key to Feed Drago !",100,50);
  fill("white");
  text("Food Remaining = "+ foodS,200,100);
  
  if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
    dog.addImage(happyDog);
  }
  
  if(keyWentDown(DOWN_ARROW)){
   dog.addImage(dogImage); 
  }
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + "PM", 350 , 30); 
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + "AM", 350,30); 
    } 

 drawSprites();

}

function readStock(data){

foodS = data.val();

}

function writeStock(x){

if(x <= 0){
x = 0;   
}else{
x = x-1;
}

database.ref("/").update({
Food:x
})

}

 function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  }) 

  function addFoods(){
   foodS++;
   database.ref("/").update({
     Food:foodS
   }) 

  }

}
