class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
      console.log(gameState)

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
       
      console.log("25")   
      var playerCountRef = await database.ref('playerCount').once("value");
      console.log("27")
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
     
    

      form = new Form()
      form.display();
    }

    player1S = createSprite(370,140,100,100);
    player1S.addImage(player1Image);
    player1S.scale = 0.15
    player1S.debug = true
    player2S = createSprite(1110,520,100,100);
    player2S.addImage(player2Image);
    player2S.scale = 0.15
    player2S.debug = true;
    playerS = [player1S,player2S]

    var ground1 = createSprite(220,210,110,10)
    var ground2 = createSprite(220,100,120,10)
    var ground3 = createSprite(280,280,10,150)
    var ground4 = createSprite(280,50,10,110)
    var ground5 = createSprite(280,570,10,150)
    var ground6 = createSprite(400,50,10,150)
    var ground7 = createSprite(400,300,10,150)
    var ground8 = createSprite(400,580,10,150)
    var ground9 = createSprite(520,100,10,150)
    var ground10 = createSprite(520,350,10,150)
    var ground11 = createSprite(520,650,10,150)
    var ground12 = createSprite(640,60,10,150)
    var ground13 = createSprite(640,270,10,150)
    var ground14 = createSprite(640,500,10,150)
    var ground15 = createSprite(770,30,10,120)
    var ground16 = createSprite(770,220,10,120)
    var ground17 = createSprite(770,450,10,120)
    var ground18 = createSprite(900,100,10,150)
    var ground19 = createSprite(900,350,10,150)
    var ground20 = createSprite(900,50,10,120)
    var ground21 = createSprite(900,480,10,100)
    var ground22 = createSprite(900,680,10,120)
    var ground23 = createSprite(1020,80,10,150)
    var ground24 = createSprite(1020,370,10,150)
    var ground25 = createSprite(1020,670,10,150)
    var ground26 = createSprite(1090,450,150,10)
    var ground27 = createSprite(1090,590,150,10)
 
     groundArray =  [ground1,ground2,ground3,ground4,ground5,ground6,ground7,ground8,ground9,ground10,ground11,ground12,ground13,ground14,ground15,ground16,ground17,ground18,ground19,ground20,ground21,ground22,ground23,ground24,ground25,ground26,ground27]
 
 

    ground1.shapeColor = "green"
    ground2.shapeColor = "green"
    ground3.shapeColor = "blue"
    ground4.shapeColor = "blue"
    ground5.shapeColor = "blue"
    ground6.shapeColor = "blue"
    ground7.shapeColor = "blue"
    ground8.shapeColor = "blue"
    ground9.shapeColor = "blue"
    ground10.shapeColor = "blue"
    ground11.shapeColor = "blue"
    ground12.shapeColor = "blue"
    ground13.shapeColor = "blue"
    ground14.shapeColor = "blue"
    ground15.shapeColor = "blue"
    ground16.shapeColor = "blue"
    ground17.shapeColor = "blue"
    ground18.shapeColor = "blue"
    ground19.shapeColor = "blue"
    ground20.shapeColor = "blue"
    ground21.shapeColor = "blue"
    ground22.shapeColor = "blue"
    ground23.shapeColor = "blue"
    ground24.shapeColor = "blue"
    ground25.shapeColor = "blue"
    ground26.shapeColor = "green"
    ground27.shapeColor = "green"
  }

  play(){
    background(255);
    form.hide();

    Player.getPlayerInfo();

   
    if(allPlayers !== undefined){
    
      //index of the array
      var index = 0;


      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ; 
        playerS[index-1].x = allPlayers[plr].position.x;
        
        playerS[index-1].y = allPlayers[plr].position.y;

        fill("red");
        if( index == 2)
        rect(1100+(allPlayers[plr].health)/2,660,(allPlayers[plr].health),20);
        if(index == 1)
        rect((allPlayers[plr].health)/2,60,(allPlayers[plr].health),20)

       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }


    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y -=10
      player.updatePosition();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y +=10
      player.updatePosition();
      
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.x -=10
      player.updatePosition();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.x +=10
      player.updatePosition();
    }

    if(keyIsDown(32)){
      if(player.index == 1){
      var bullet = createSprite(player.x + 100,player.y,10,5);
      bullet.velocityX = 10
    }

    if(player.index == 2){
      bullet = createSprite(player.x - 100,player.y,10,5);
      bullet.velocityX = -10
    }
      bullet.debug = true 
      bullet.shapeColor = "yellow";

      bulletsGroup.add(bullet);
    }

    for(var i = 0; i<groundArray.length; i++){
      if(groundArray[i].isTouching(bulletsGroup)){
        bulletsGroup.destroyEach();
      }
    }

    for(var i  = 0;i<playerS.length; i++){
      playerS[i].collide(groundArray);
    }

    /*if(player.index == 1 && player1S.isTouching(bulletsGroup) ){
     player.health -=  1;
     player.update();
    }*/
    if( player1S.isTouching(bulletsGroup)){
      console.log(allPlayers[player1]);
      health1 = (allPlayers[player1].health - 10)
      
      database.ref('players/player1').update({
        health:health1

    });
  }

    if(    player.index == 2 && player2S.isTouching(bulletsGroup) ){
      player.health -=  1;
      player.update();
    }

    drawSprites();

  }

  end(){
    console.log("game End")
    /*console.log("Rank: " + rank)
    var leaderBoard = createSprite(displayWidth/2,-displayHeight*4,600,400);
    leaderBoard.shapeColor = "yellow";

    drawSprites();

    textSize(20);
    fill("red");
    imageMode(CENTER);

    switch(rank){
      case 1:text("Congratulations! You are the winner!",displayWidth/2 - 150,-displayHeight*4 - 50);
             image(rank1,displayWidth/2,-displayHeight*4 + 50,150,150);
             break ; 
      
      case 2:text("Congratulations! You are the runner up!",displayWidth/2 - 150,-displayHeight*4 - 50);
             image(rank2,displayWidth/2,-displayHeight*4 + 50,150,150);
             break ;
 
      case 3:text("Nice try! You got 3rd rank!",displayWidth/2 - 120,-displayHeight*4 - 50);
             image(rank3,displayWidth/2,-displayHeight*4 + 50,150,150);
             break ;
             
      case 4:text("Better luck next time",displayWidth/2 - 50,-displayHeight*4);
             break ;             
    }*/


  }
}
