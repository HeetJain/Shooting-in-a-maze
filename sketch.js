var canvas, backgroundImage;

var gameState=0;
var playerCount = 0;
var allPlayers;
var database;
var rank;

var form, player, game;

var player1,player2;

var player1S,player2S,playerS;

var groundArray;

var bullet;

function preload(){
console.log("hello");
player1Image = loadImage("images/player_left.png");
player2Image = loadImage("images/player_right.jpg");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  //player1 = createSprite()
  console.log("1");
  database = firebase.database();
  console.log("2");
  game = new Game();
  game.getState();
  bulletsGroup = new Group();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
  }
}

