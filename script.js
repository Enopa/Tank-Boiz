 //obtaining a variable for the canvas
var canvas = document.getElementById("canvas");
//needed so you can move player with keyboard inputs
document.addEventListener('keydown', keys, false);
//below is needed to clear the canvas for future frames
const clear = canvas.getContext("2d");

//spawns player
var squ = canvas.getContext("2d");
squ.fillStyle = "#086A00";
squ.fillRect(260,260,25,25);

//all the variables needed for the different properties in the game
var x = 260;
var y = 260;
var upspeed = 10;
var downspeed = 10;
var leftspeed = 10;
var rightspeed = 10;
var shoot_timer = 0;

//all the functions required for movement
function right(rightspeed) {
  clear.clearRect(0,0,520,520);
  x = x + rightspeed;
  idle() ;
}
function left(leftspeed) {
  clear.clearRect(0,0,520,520);
  x = x - leftspeed;
  idle();
}
function up(upspeed) {
  clear.clearRect(0,0,520,520);
  y = y - upspeed;
  idle() ;
}
function down(downspeed) {
  clear.clearRect(0,0,520,520);
  y = y + downspeed;
  idle();
}
function idle() {
  squ.fillStyle = "#086A00"
  squ.fillRect(x,y,25,25)
}
var test = setInterval(idle, 25)
function idle_bullet() {
  bullet.fillStyle = "#131313";
  bullet.fillRect(bullet_x, bullet_y,10,10);
}

//meatspin.com
//also bulletspin.com
var directions = ["right", "up", "left", "down"]
var c_direction = 0
var direction = directions[c_direction]
var bullet_speed = 10
function r_spin() {
  if (c_direction == 0) {
    c_direction = 3
  } else {
    c_direction = c_direction - 1
  }
}
function l_spin() {
  if (c_direction == 3) {
    c_direction = 0
  } else {
    c_direction = c_direction + 1
  }
}
function bullet_direction() {
  direction = directions[c_direction];
  if (direction == "right") {
    bullet_speed = 10;
  } else if (direction == "left") {
    bullet_speed = -10;
  } else if (direction == "up") {
    bullet_speed = -10;
  } else if (direction == "down") {
    bullet_speed = 10;
  }
}

//this is the little indicator to show your direction
function indicator() {
  direction = directions[c_direction]
  var dot = canvas.getContext("2d");
  dot.fillStyle = "#173D00";
  if (direction == "right") {
    dot.fillRect(x + 15, y + 8, 10, 10)
  } else if (direction == "left") {
    dot.fillRect(x, y + 8, 10, 10)
  } else if (direction == "down") {
    dot.fillRect(x + 7, y + 15, 10, 10)
  } else if (direction == "up") {
    dot.fillRect(x + 7, y , 10, 10)
  }
}
var noscope = setInterval(indicator, 5)

//bullet variables;
var bullet = canvas.getContext("2d");
var bullet_appear = false;
var bullet_x = x + 25;
var bullet_y = y + 8;
var shoot_interval = 0
var bullet_speed = 10
var bullet_time; 
//pew pew shooty dooty
function space() {
  if (bullet_appear == false) {
    bullet_direction()
    shoot_interval = 0
    // this determines where the bulllet will come out of player from
    if (direction == "right") {
      bullet_x = x + 25;
      bullet_y = y + 8;
    } else if (direction == "left") {
      bullet_x = x
      bullet_y = y + 8
    } else if (direction == "down") {
      bullet_x = x + 12
      bullet_y = y + 25
    } else if (direction == "up") {
      bullet_x = x + 12
      bullet_y = y
    }
    bullet_appear = true
    bullet.fillRect(bullet_x, bullet_y,10,10);
    bullet_direction()
    bullet_time = setInterval(shoot, 35);
  } else if (bullet_appear == true && shoot_interval > 20) {
    bullet_appear = false;
    clearInterval(bullet_time)
    clear.clearRect(bullet_x + 10,bullet_y, 10, 10);
    space()
  }
}
//how 2 shoot up the skool, this actually makes the bullet move
function shoot() {
  if (shoot_interval == 20) {
    clearInterval(bullet_time);
    bullet_x = 600
    bullet_y = 600
  }
  shoot_interval = shoot_interval + 1
  //the code above creates the intervals for the bullet shooting
  clear.clearRect(bullet_x,bullet_y,10,10);
  idle();
  bullet.fillStyle = "#131313";
  //this will determine the direction of the bullet
  if (direction == "up" || direction == "down") {
    bullet_y = bullet_y + bullet_speed
  } else if (direction == "left" || direction == "right") {
    bullet_x = bullet_x + bullet_speed
  }
  bullet.fillRect(bullet_x, bullet_y,10,10);
}

//item variables
var item_appear = false;
//the initial coordinates of the item
var item_x = Math.round(Math.random() * 520);
var item_y = Math.round(Math.random() * 520)
var score = 0
//This function holds all of the collisions and the keyboard inputs
//the function runs everytime you move, good for looping other functions
function keys(key) {
    // Collsion with right wall
  if (x == 500) {
    rightspeed = 0;
  } else if (game_over != true) {
    rightspeed = 10;
  }
  // Collsion with left wall
  if (x == 0) {
    leftspeed = 0;
  } else if (game_over != true){
    leftspeed = 10;
  }
  //Collision with top (ceiling?)
  if (y == 0) {
    upspeed = 0;
  } else if (game_over != true){
    upspeed = 10;
  }
  //Collision with bottom (floor?)
  if (y == 500) {
    downspeed = 0;
  } else if (game_over != true) {
    downspeed = 10;
  }
  //keyboard inputs
  if (key.keyCode == 65) {
    left(leftspeed);
  } else if (key.keyCode == 68) {
    right(rightspeed);
  } else if (key.keyCode == 87) {
    up(upspeed);
  } else if (key.keyCode == 83) {
    down(downspeed);
  } else if (key.keyCode == 32) {
    space();
  } else if (key.keyCode == 37) {
    l_spin()
  } else if (key.keyCode == 39) {
    r_spin()
  }
  var ix = item_x
  var iy = item_y
  if (bullet_appear == true) {
    idle_bullet()
  }
  //item interaction
  if (item_appear == false) {
    //defining the item if it doesn't exist
    item_x = Math.round(Math.random() * 520);
    item_y = Math.round(Math.random() * 520)
    var item = canvas.getContext("2d");
    item.fillStyle = "#131313";
    item.fillRect(item_x,item_y,10,10);
    item_appear = true;
  } else if (item_appear == true) {
    var item = canvas.getContext("2d");
    item.fillStyle = "#131313";
    item.fillRect(ix,iy,10,10);
    if (x + 25 < item_x   || item_x + 25 < x || y + 25 < item_y || item_y + 25 < y) {
    } else {
      item_appear = false;
      score = score + 1
      document.getElementById("score").innerHTML = score;
      if (speed == 0){
      } else {
        speed = speed + 1
      }
    }
  }
  enemy_move()
}

//beep boop beep boop i am a robot
var ai_x = 0
var ai_y = 0
var u_fx = 10 + (Math.sqrt(x - ai_x) + (y - (ai_y + 10)))
var d_fx = 10 + (Math.sqrt(x - ai_x) + (y - (ai_y - 10)))
var l_fx = 10 + (Math.sqrt(x - (ai_x - 10)) + (y - ai_y))
var r_fx = 10 + (Math.sqrt(x - (ai_x + 10)) + (y - ai_y))

var speed = 2
function enemy_move() {
  clear.clearRect(ai_x,ai_y,25,25)
  //these values have been calculated for the pythagoras theorem below
  var u_dis = (ai_y + 2) - y
  var d_dis = (ai_y - 2) - y
  var l_dis = (ai_x - 2) - x
  var r_dis = (ai_x + 2) - x
  var x_norm = ai_x - x
  var y_norm = ai_y - y
  //below are variables that define the distance between the place the ai will be and the player
  //to calculate these values we use pythagoras theorem
  u_fx = Math.sqrt((u_dis * u_dis) + (x_norm * x_norm))
  d_fx = Math.sqrt((d_dis * d_dis) + (x_norm * x_norm))
  l_fx = Math.sqrt((l_dis * l_dis) + (y_norm * y_norm))
  r_fx = Math.sqrt((r_dis * r_dis) + (y_norm * y_norm))
  //whichever distance is the shortest, the ai will move in that direction
  var max_d = Math.min(u_fx, d_fx, l_fx, r_fx)
  if (max_d == u_fx) {
    ai_y = ai_y + speed
  } else if (max_d == d_fx) {
    ai_y = ai_y - speed
  } else if (max_d == l_fx) {
    ai_x = ai_x - speed
  } else if (max_d == r_fx) {
    ai_x = ai_x + speed
  } else {
    enemy_move()
  }
  //:3 owo messing awound wif hitwox stooff (.w.) uwu x3
  if (x + 25 < ai_x   || ai_x + 25 < x || y + 25 < ai_y || ai_y + 25 < y) {
  } else {
    speed = 0 
    nani()  
    clearInterval(ee)
  }
  if (bullet_x + 10 < ai_x   || ai_x + 25 < bullet_x || bullet_y + 10 < ai_y || ai_y + 25 < bullet_y) {
  } else {
    speed = 0
    clear.clearRect(ai_x,ai_y,25,25)
    clearInterval(ee)
  }
  var enemy = canvas.getContext("2d");
  enemy.fillStyle = "#aa0016";
  enemy.fillRect(ai_x,ai_y,25,25)
}

//robot_takeover.exe
var ee = setInterval(enemy_move , 50)

//displays the fx values to see if anything is fucked
function debug() {
  console.log(u_fx)
  console.log(d_fx)
  console.log(l_fx)
  console.log(r_fx)
}

var game_over = false
//omae wa mou shinderu
function nani() {
  game_over = true
  leftspeed = 0
  rightspeed = 0
  downspeed = 0
  upspeed = 0
  var go = new Image();
  go.src = 'thiccyoshi.png';
  go.onload = function () {
    fill_canvas(go)
  }
  function fill_canvas(img) {
    var gameover = canvas.getContext('2d');
    gameover.drawImage(img, 0, 0, 500, 500);
  }
  var text = canvas.getContext("2d");
  text.font = "100px, Ariel";
  text.fillText("Game Over", 210, 210)
}
