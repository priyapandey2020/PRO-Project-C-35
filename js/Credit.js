class Credit {
    constructor(){

    this.image=loadImage('Images/Food Stock.png');
    }

    display(){
        var CreditS;
       imageMode(CENTER);
       image(this.image,80,70,120,120);
     
       var CreditStock=database.ref('Credit');
       CreditStock.on("value",function (data){
         CreditS=data.val();
       });

       textSize(15);
       fill(255,255,254);
       stroke("black");
       text("Food Stock: "+ CreditS,20,150);
      
    }
}
