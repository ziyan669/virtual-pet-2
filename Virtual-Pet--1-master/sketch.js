//Create variables here
var dog, happyDog, database, food, foodStock, Dog, feed,feedDog, addFood
var fedTime, lastFed
var foodObj
var foodS = 0

function preload()
{
  Dog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  foodObj=new Food();

  feed = createButton("Feed the dog");
  feed = feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(750,95);
  addFood.mousePressed(addFoods);

  dog = createSprite(250,420);
  dog.addImage(Dog);
  dog.scale=0.2

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

  
}
 

function draw() {  
  background(46, 139, 87);
  foodObj.display();
  FeedTime=database.ref('feedTime')
  FeedTime.on("value",function(data){
    lastFed=data.val();
  })

 
  fill(255); 
 
  textSize(13);
  if(lastFed>=12){
    text("last fed : " + lastFed%12 +"PM", 350,30)
  }else if(lastFed==0){
    text("last fed : "+ lastFed +"AM",350,30)
  }else{
    text("last fed : "+ lastFed +"AM",350,30)
  }
   drawSprites();
  //add styles here
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS  
  })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

