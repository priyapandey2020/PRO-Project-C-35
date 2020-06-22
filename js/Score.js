class Score {
    constructor(){

    this.image=loadImage('Images/Milk.png');
    }

    display(){
        var foodS;
       imageMode(CENTER);
       image(this.image,200,320,70,70);
     
       var foodStock=database.ref('Food');
       foodStock.on("value",function (data){
         foodS=data.val();
       });

       textSize(15);
       fill(255,255,254);
       text("Remaining Food: "+foodS,200,370);
      
    }
}
