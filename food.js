class Food{

constructor(){

this.foodStock = 0;
this.lastFed = null;
this.image = loadImage("Milk.png");
}

getFoodStock(){

    var reference;   
    reference = database.ref("foodObj");
    reference.on("value",function(data){
    foodObj = data.val();    
    });

}

updateFoodStock(stock){

database.ref("/").update({foodStock:stock});    

}

deductFood(){

}

display(){

var x = 80,y = 100; 

imageMode(CENTER);
image(this.image,720,220,70,70);

  if(this.foodStock!=0){

    for(var i = 0;i<this.foodStock;i++){
      if(i%10===0){
       x = 80;
       y = y+50;
      }
      image(this.image,x,y,50,50);
      x = x+30;
    }

 } 

}

}