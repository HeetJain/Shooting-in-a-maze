class Player {
  constructor(){
    this.index = null;
    this.name = null;
    this.health = 100;
    this.x = 0;
    this.y  = 0
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }


  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      name:this.name,
      health:this.health
    });
    /*if(this.index === 1){
      this.x = 70;
      this.y = 150;
    }
    else{
      this.x = 1110;
      this.y = 520;
    }*/
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  updatePosition(){
    var playerIndex = "players/player" + this.index + "/position";
    database.ref(playerIndex).set({
      x:this.x,
      y:this.y
    });
  }

}
