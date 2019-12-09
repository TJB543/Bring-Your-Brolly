class Enemy {
  constructor() {
    this.side = random(0, 3, 1);
    if (this.side < 2) {
      this.x = random(0, width);
      this.y = 10;
    } else {
      this.y = random(height - 20, 20);
      this.x = 10;
    }
    this.gra = random(0.5, 1);
    this.v = 0.05;
    this.destroy = 0;
    this.maxspeed = 1;
  }
  update() {
    if (this.side < 2) {
      this.y = this.y + this.gra * this.v;
      if (this.y < height - 5) {
        this.v += 0.1;
      } else if (this.y > height - 5) {
        this.v = 0;
        this.gra = random(this.maxspeed/4,this.maxspeed);
        this.y = 10;
        this.x = random(10, width - 10)
      }
    } else {
      this.x = this.x + this.gra * this.v;
      if (this.x < width - 5) {
        this.v += 0.05;
      } else if (this.x > width - 5) {
        this.v = 0;
        this.gra = random(this.maxspeed/4,this.maxspeed);
        this.y = random(height - 20, 20);
        this.x = 10;
      }
    }
    if (this.destroy != 1) {
      fill(0, 0, 255);
      circle(this.x, this.y, 10);
    }
  }
}

class Player {
  constructor() {
    this.x = 200;
    this.y = height - 5;
    this.xmove = 0;
    this.ymove = 0;
    this.gra = 1;
    this.v = 0;
    this.fat_1 = 20;
    this.fat_2 = 20;
    this.dead = 1;
    this.j = 0;
    this.sheild = 0;
    this.sheildable = 0;
    this.guide = 0;
  }
  guideupdate() {
    if (this.guide == 1 && this.dead == 1) {
      if (this.sheild != 1) {
        fill(0);
      } else {
        fill(0, 255, 255);
      }
      rect(this.x, 5, this.fat_1, this.fat_2);
    }
  }
  update() {
    if (this.dead == 1) {
      if (this.sheild != 1) {
        fill(0);
      } else {
      }
      rect(this.x, this.y, this.fat_1, this.fat_2);
      this.x = this.x + this.xmove;
      this.y = this.y + this.gra * this.v;
      if (this.y < height - this.fat_2 / 2) {
        this.v += 0.05;
      } else if (this.y > height - this.fat_2 / 2) {
        this.v = 0;
        this.y = height - (this.fat_2 / 2);
      }
      if (this.x > width - (this.fat_1 / 2)) {
        this.x = width - (this.fat_1 / 2)
      } else if (this.x < this.fat_1 / 2) {
        this.x = this.fat_1 / 2
      }
    } else {
      fill(255, 0, 0);
      rect(this.x, this.y, this.fat_1, this.fat_2);
      this.fat_1 += this.j;
      this.fat_2 -= this.j;
      this.j += 0.05;
    }
  }
}
class Savestate {
constructor(){
  this.gra = 0;
  this.v = 0;
}
}
var enemy = [];
var savestate = [];
let highscore;
var gamestate = 0;
var graphical_version = 0;
var seconds_currency;
var upgrades_1;
var upgrades_2;
var upgrades_3;
function setup() {
  upgrades_1 = 0;
  upgrades_2 = 0;
  upgrades_3 = 0;
  upgrade1 = createButton("upgrade sheild duration")
  upgrade2 = createButton("upgrade sheild warm up")
  upgrade3 = createButton("upgrade size")
  upgrades = 0;
  umbrella = loadImage('umbrella-1.png');
  legacy = createButton('Legacy');
  graphical = createButton('Graphical')
  textAlign(CENTER);
  reset()
  highscore = getItem('highscore');
  if (highscore === null) {
    highscore = '0';
  }
  seconds_currency = getItem('seconds_currency')
  if (seconds_currency === null) {
    seconds_currency = '0';
  }
}

function reset() {
  createCanvas(windowWidth, windowHeight);
  amount = (width + height) / (1049 / 30);
  rectMode(CENTER);
  player = new Player();
  for (let i = 0; i < amount; i++) {
    enemy[i] = new Enemy();
    savestate[i] = new Savestate();
    savestate[i].gra = enemy[i].gra;
    savestate[i].v = enemy[i].v;
  }
  sec = 1000;
  Delay = 0;
  t = 0;
  sheildtime = 0;
  sheilded = 0;
  player.sheildable = 1;
  sheildcooldown = 600 - int(upgrades_2);
  gamefrozen = 0;
  ten_seconds = 0;
  coat = -1;
}

function arrowmovement() {
  if (keyCode === LEFT_ARROW && keyIsPressed || key === 'a' && keyIsPressed) {
    player.xmove = -2.5;
    if (player.fat_2 < 10-upgrades_3) {
      player.fat_2 += 0.5;
    } else {
      player.fat_2 = 10-upgrades_3;
    }
    if (player.fat_1 > 10-upgrades_3) {
      player.fat_1 -= 0.5;
    } else {
      player.fat_1 = 10-upgrades_3;
    }
  } else if (keyCode === RIGHT_ARROW && keyIsPressed || key === 'd' && keyIsPressed) {
    player.xmove = 2.5;
    if (player.fat_2 < 10-upgrades_3) {
      player.fat_2 += 0.5;
    } else {
      player.fat_2 = 10-upgrades_3;
    }
    if (player.fat_1 > 10-upgrades_3) {
      player.fat_1 -= 0.5;
    } else {
      player.fat_1 = 10-upgrades_3;
    }
  } else if (keyCode === DOWN_ARROW && keyIsPressed || keyCode === UP_ARROW && keyIsPressed || key === 'w' && keyIsPressed || key === 's' && keyIsPressed) {
    if (player.fat_2 > 3) {
      player.fat_2 -= 0.5;
    } else {
      player.fat_2 = 2.5;
    }
    if (player.fat_1 < 17.5) {
      player.fat_1 += 0.5;
    } else {
      player.fat_1 = 17.5;
    }
    for(let i = 0; i<amount;i++) {
      enemy[i].v= enemy[i].v/1.1
    }
    t = t-50
  } else {
    player.xmove = 0;
    if (player.fat_2 < 10-upgrades_3) {
      player.fat_2 += 0.5;
    } else {
      player.fat_2 = 10-upgrades_3;
    }
    if (player.fat_1 > 10-upgrades_3) {
      player.fat_1 -= 0.5;
    } else {
      player.fat_1 = 10-upgrades_3;
    }
  }
}

function upgraded1() {
  seconds_currency -= 10;
  upgrades_1 += 10;
}

function upgraded2() {
  seconds_currency -= 10;
  upgrades_2 += 10;
}

function upgraded3() {
  if(upgrades_3 < 2){
  seconds_currency -= 10;
  upgrades_3 += 1;
  player.fat_1 -= 1;
  player.fat_2 -= 1;
     }
}

function distance() {
  for (let i = 0; i < amount; i++) {
    var d = dist(player.x, player.y, enemy[i].x, enemy[i].y);
    if (d < 5 +player.fat_2 || key === ' ' && keyIsPressed) {
      if (player.sheild != 1) {
        player.dead = 0;
      }
    }
  }
}
function legacy_pressed() {
      legacy.remove();
      graphical.remove();
      gamestate = 1;
      reset();
      for(let i = 0; i< amount;i++) {
        enemy[i].gra = random(0.5,0.75);
      }
    }
function graphical_pressed() {
  graphical.remove();
  legacy.remove();
  gamestate = 1;
  reset();
  for(let i = 0; i< amount;i++) {
        enemy[i].gra = random(0.5,0.75);
      }
  graphical_version = 1;
}

function draw() {
  if (gamestate == 1) {
    upgrade1.hide();
    upgrade2.hide();
    upgrade3.hide();
    // The game is being played
    if (key === 'e' || key === '/') {
      gamestate = 2;
      
      //Transport to the menu/shop screen
    }
//     if (key === '`') {
//       gamefrozen = 1;
//       }
//     if(gamefrozen == 1) {
//       for (let i = 0; i < amount; i++) {
//         if(enemy[i].gra != 0){
//         savestate[i].gra = enemy[i].gra;
//           savestate[i].v = enemy[i].v;
//         }
//         enemy[i].gra = 0;
//         enemy[i].v = 0;
//       }
//         t -= 100;
//       }
//     if (key === '1') {
//       gamefrozen = 0;
//     }
//      if(gamefrozen == 0) {
//       for (let i = 0; i < amount; i++) {
//         if(enemy[i].gra != savestate[i].gra && enemy[i].v != savestate[i].v) {
//         enemy[i].gra = savestate[i].gra;
//         if(savestate[i].v != 0) {
//         enemy[i].v = savestate[i].v;
//           }else{
//             enemy[i].v = 0.5;
//           }
//         }
//         }
//     }
    stroke(255);
    background(220);
    if (player.dead == 1) {
      frameRate(60);
      arrowmovement();
    } else {
      frameRate(60);
    }
    player.guideupdate();
    distance();
    for (let i = 0; i < amount; i++) {
      enemy[i].update();
    }
    if (key === 'k') {
      player.guide = 1;
    }
    if(graphical_version == 0) {
      if(player.sheild == 1) {
        fill(0,255,255);
      }
    }
    player.update();
    fill(0);
    if (player.dead == 1) {
      textSize(17.5)
      text(round(sec / 6000, 0), width / 2, 50);
      textSize(12.5);
      text(highscore + " seconds is the highscore", width / 2, 70);
      if (sheildtime != 0 && sheilded < 0) {
        text(round(sheildtime * 10) + "% shield", player.x, player.y - 10);
      } else if (sheilded == -1) {
        text("0% shield", player.x, player.y - 10);
      } else {
        text(round(sheilded / 12 * 10, 0) + "% shield", player.x, player.y - 10);
      }
    } else {
      Delay += 0.1;
      if (Delay > 30) {
        textSize(60);
        text(round(sec / 6000, 0) + ' seconds in, you died! Reseting in ' + round((4 - Delay * 60 / 1000), 0), width / 2, height / 2);
        if (round(sec / 6000, 0) > int(highscore)) {
          highscore = round(sec / 6000, 0);
          storeItem("highscore", highscore);
        }
        text(highscore + " seconds is the highscore to beat!", width / 2, height / 2 + 60);
      }
      if (Delay > 50) {
        seconds_currency = int(seconds_currency)+ round(sec / 6000, 0);
        storeItem("seconds_currency", seconds_currency);
        reset();
      }
    }

    if (t > sec && player.dead == 1) {
      sec += 6000;
      if (sheildtime > 9-(upgrades_2/60)) {
        player.sheildable = 1;
        sheildtime = 10;
      } else {
        sheildtime += 1+ upgrades_2/100;
      }if (ten_seconds % 10 == 0) {
        for( let i = 0;i < amount ; i++) {
        enemy[i].maxspeed += 1;
        }
        ten_seconds += 1;
        print("Bullet Speed Up!")
      } else {
        ten_seconds += 1;
      }
    }
    t += 100
    if (keyCode === SHIFT && player.sheildable == 1 && sheildcooldown <= 0 && keyIsPressed && sheilded <= 0) {
      player.sheildable = 0;
      player.sheild = 1;
      sheilded = 120+int(upgrades_1);
      sheildcooldown = 600 - int(upgrades_2);
      print(upgrades_1)
      print(upgrades_2)
    }
    if (sheilded > 0) {
      sheilded -= 1;
    }
    if (sheilded == 0) {
      player.sheild = 0;
      sheildtime = 0;
      sheilded -= 1;
    }
    if (sheildcooldown > 0) {
      sheildcooldown -= 1;
    }
    if (player.dead != 0) {
      if(graphical_version == 1) {
        if (player.sheild == 1) {
          if(coat < player.fat_1){
            coat++
           }
          fill(0,255,255);
          rect(player.x,player.y,coat,player.fat_2);
        } else if(coat >= 0){
          coat--
          fill(0,255,255);
          rect(player.x,player.y,coat,player.fat_2);
        } else{}
      }
    }
    

  } else if(gamestate == 0){
    upgrade1.hide();
    upgrade2.hide();
    upgrade3.hide();
    background(255);
    stroke(255);
    image(umbrella,width/2-35,height/4,100,100);
    for (let i = 0; i < amount; i++) {
      if (enemy[i].side < 2) {
        enemy[i].update();
      }
    }
    fill(0);
    textSize(20);
    text("Welcome to 'Bring Your Brolly!'", width / 2, 50);
    text("By Tobey Bell", width / 2, 70);
    text("Press The Button Corresponding to the version of 'Bring Your Brolly!' that you would like to play!", width / 2, height / 2);
    text("(WARNING!!!) The Game Starts Immediately!",width/2,height/2+20);
    legacy.position(width/2-50,height/2+50);
    legacy.mousePressed(legacy_pressed);
    graphical.position(width/2+10,height/2+50);
    graphical.mousePressed(graphical_pressed);
    text('(WIP)',width/2+48,height/2+90);
    textAlign(LEFT);
    text("Controls:", 0, height - 160);
    text("- Left Arrow / A = Move Left", 0, height - 130);
    text("- Right Arrow / D = Move Right", 0, height - 100);
    text("- Down Arrow / S = Duck (+Slow Down Time)", 0, height - 70);
    text("- Up Arrow / W = Duck (+Slow Down Time)", 0, height - 40);
    text("- Shift = Shield (When Ready)", 0, height - 10);
    text("Release Version 1.0",width-180,height-10);
    textAlign(CENTER);
    if (key === '6') {
      storeItem("highscore", 0)
    }
  } else if (gamestate == 2) {
    background(0);
    textSize(15);
    text("Press q (Or ' ) to return to the game",width/2,height/4);
    text("This feature is currenly being added currently, well done for finding this, while it is in its eater egg form",width/2,height/2)
    text("Though, once this feature is added, this will be your currency count "+seconds_currency+" secoins",width/2,height/2+50);
    if (seconds_currency > 9) {
      upgrade1.position(width/8,height/4*3)
      upgrade1.show();
      upgrade1.mousePressed(upgraded1);
      upgrade2.position(width/4,height/4*3)
      upgrade2.show();
      upgrade2.mousePressed(upgraded2);
      upgrade3.position(width/2,height/4*3)
      if(upgrades_3 <= 10){
      upgrade3.show();
    }else{
      upgrade3.hide();
    }
      upgrade3.mousePressed(upgraded3);
      
      } else {
        upgrade1.hide()
        upgrade2.hide()
        upgrade3.hide()
      }
    for (let i = 0; i < amount; i++) {
        if(enemy[i].gra != 0){
        savestate[i].gra = enemy[i].gra;
          savestate[i].v = enemy[i].v;
        }
        enemy[i].gra = 0;
        enemy[i].v = 0;
      }
    if (key === 'q' || key === "'") {
      for (let i = 0; i < amount; i++) {
        if(enemy[i].gra != savestate[i].gra && enemy[i].v != savestate[i].v) {
        enemy[i].gra = savestate[i].gra;
        enemy[i].v = 0;
        }
      gamefrozen = 0;
      gamestate = 1;
    }
}
}
}
