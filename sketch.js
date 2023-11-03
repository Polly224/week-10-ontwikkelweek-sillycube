let squares = [];
let color = 0;
let bounceCount = 0;
let boundaryX = 800;
let boundaryY = 400;
let boundaryWidth = 700;
let boundaryHeight = 600;
let sillyPrice = 20, sillyButton, upgradeButtons = [], sellButtons = [], screenSwitchButton, upgradeScreen = 1;
let squareCount = 0, upgradePrices = [], upgradeLevels = [0, 0, 0, 0, 0, 0];
let funnyColor = 0, chicaMode = false, chicaImg, sillySound;

function setup() {
  createCanvas(1600, 800);
  upgradePrices[0] = 500;
  upgradePrices[1] = 800;
  upgradePrices[2] = 1000;
  upgradePrices[3] = 3000;
  upgradePrices[4] = 3500;
  upgradePrices[5] = 9999;
  rectMode(CENTER);
  colorMode(HSB);
  background(80);
  chicaImg = loadImage("assets/chica.jpg");
  sillySound = loadSound("assets/silly.mp3");
  squares.push(new SillyCube(boundaryX, boundaryY, 1, 50,[color, 100, 100]));
  squares[0].xVelValue = 5;
  sillyButton = new Button(200, 400, 300, 300, "Buy Silly", 1);
  sillyButton.onClick = () => {if(bounceCount >= sillyPrice){buyNewSilly();}}
  if(localStorage.getItem("bounceCount")!= null){
    bounceCount = parseInt(localStorage.getItem("bounceCount"));
  }
  if(getItem("squares")!= null){
    squareCount = parseInt(getItem("squares"));
  }
  for(let i = 0; i < squareCount - 1; i++){
    squares.push(new SillyCube(random(boundaryX - boundaryWidth / 2 + 10 + 50 + 10 * upgradeLevels[0], boundaryX + boundaryWidth / 2 - 10 - (50 + 10 * upgradeLevels[0])), random(boundaryY - boundaryHeight / 2 + boundaryHeight / 10 + (50 + 10 * upgradeLevels[0]), boundaryY + boundaryHeight / 2 - boundaryHeight / 8 - (50 + 10 * upgradeLevels[0])), 1, 50,[color, 100, 100])); 
  }
  if(getItem("sillyPrice")!= null){
    sillyPrice = getItem("sillyPrice");
  }
  if(getItem("upgradePrices")!= null){
    upgradePrices = getItem("upgradePrices");
  }
  if(getItem("upgradeLevels")!= null){
    upgradeLevels = getItem("upgradeLevels");
  }
  if(upgradeLevels[5]){
    chicaMode = true;
  }
  for(let i = 0; i < upgradeLevels.length; i++){
    if(upgradeLevels[i] == 0){
      switch(i){
        case 0: upgradePrices[i] = 500; break;
        case 1: upgradePrices[i] = 800; break;
        case 2: upgradePrices[i] = 1000; break;
        case 3: upgradePrices[i] = 3000; break;
        case 4: upgradePrices[i] = 3500; break;
        case 5: upgradePrices[i] = 9999; break;
      }
    }
  }
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 2; j++){
      sellButtons[i + (j * 3)] = new Button(1500, 220 + 250 * i, 75, 100, "Sell", 1, 5);
      if(j == 0){
        sellButtons[i + (j * 3)].onClick = () => {
          if(upgradeScreen == 1){
            sellUpgrade(i + (j * 3));
          }
        }
      } else {
        sellButtons[i + (j * 3)].onClick = () => {
          if(upgradeScreen == 2){
            sellUpgrade(i + (j * 3));
          }
        }
      }
    }
  }
  upgradeButtons[0] = new Button(1290, 220, 75, 100, "Buy", 1, 5);
  upgradeButtons[0].onClick = () => {if(bounceCount >= upgradePrices[0]){buyUpgrade(0);}}
  upgradeButtons[1] = new Button(1290, 470, 75, 100, "Buy", 1, 5);
  upgradeButtons[1].onClick = () => {if(bounceCount >= upgradePrices[1]){buyUpgrade(1);}}
  upgradeButtons[2] = new Button(1290, 720, 75, 100, "Buy", 1, 5);
  upgradeButtons[2].onClick = () => {if(bounceCount >= upgradePrices[2]){buyUpgrade(2);}}
  upgradeButtons[3] = new Button(1290, 220, 75, 100, "Buy", 1, 5);
  upgradeButtons[3].onClick = () => {if(bounceCount >= upgradePrices[3]){buyUpgrade(3);}}
  upgradeButtons[4] = new Button(1290, 470, 75, 100, "Buy", 1, 5);
  upgradeButtons[4].onClick = () => {if(bounceCount >= upgradePrices[4]){buyUpgrade(4);}}
  upgradeButtons[5] = new Button(1290, 720, 75, 100, "Buy", 1, 5);
  upgradeButtons[5].onClick = () => {if(bounceCount >= upgradePrices[5]){buyUpgrade(5);}}
  screenSwitchButton = new Button(1525, 775, 75, 20, "v", 2, 5);
  screenSwitchButton.onClick = () => {if(upgradeScreen == 1){upgradeScreen = 2;} else {upgradeScreen = 1;}}
  for(let i = 0; i < squares.length; i++){
    squares[i].color[0] = random(360);
  }
}

function draw() {
  background(80);
  text("Press R to Reset.", 10,20);
  push();
  strokeWeight(8)
  rect(1400, 400, 392, 792);
  pop();
  push();
  noStroke()
  textSize(20);
  fill(0);
  text("Total Sillies: " + squares.length + "!!", 700, 50);
  pop();
  rect(100,200,70,40);
  push();
  textAlign(CENTER,CENTER);
  textSize(20);
  text("Bounce Count", 100, 150)
  text(bounceCount, 100, 200);
  pop();
  push();
  strokeWeight(10);
  rect(boundaryX, boundaryY, boundaryWidth, boundaryHeight);
  pop();

  for(let i = 0; i < squares.length; i++){
    squares[i].display();
  }
  
  // UPGRADE SCREEN 2
  
  if(upgradeScreen == 2){
    screenSwitchButton.y = 25;
    screenSwitchButton.text = "^"
    screenSwitchButton.display();
    for(let i = 0; i < 3; i++){
      upgradeButtons[i + 3].display();
    }
    push();
    noFill();
    textSize(20);
    fill(0);
    strokeWeight(8);
    if(upgradeLevels[3] < 1){
      text("PRICE DISCOUNT  -  Cost: " + upgradePrices[3], 1250, 50);
    } else {
      text("PRICE DISCOUNT  -  MAX LEVEL", 1250, 50);
    }
    if(upgradeLevels[4] < 1){
      text("SILLY MODE  -  Cost: " + upgradePrices[4], 1250, 300);
    } else {
      text("SILLY MODE  -  MAX LEVEL", 1250, 300);
    }
    if(upgradeLevels[5] < 1){
      text("CHICA MODE  -  Cost: " + upgradePrices[5], 1250, 550);
    } else {
      text("CHICA MODE  -  MAX LEVEL", 1250, 550);
    }
    fill(50);
    textSize(12);
    textAlign(CENTER);
    text("Every subsequent Silly purchase is 50% cheaper!", 1400, 75);
    text("SILLY MODE makes every Silly play a silly sound effect on bounce!", 1400, 325);
    text("Enable CHICA MODE, making \nevery Silly 10x sillier and more POWERFUL!", 1400, 561);
    pop();
    push();
    noStroke();
    if(funnyColor < 360){
      funnyColor+=2;
    } else {
      funnyColor = 0;
    }
    fill(funnyColor, 100, 100);
    rectMode(CORNER);
    strokeWeight(8)
    rect(1250, 80, 300 * upgradeLevels[3], 75);
    rect(1250, 330, 300 * upgradeLevels[4], 75);
    rect(1250, 580, 300 * upgradeLevels[5], 75);
    pop();
    push();
    noFill();
    strokeWeight(8);
    rect(1400, 120, 300, 75);
    rect(1400, 370, 300, 75);
    rect(1400, 620, 300, 75);
    pop();
  }
  
  // UPGRADE SCREEN 1
  
  if(upgradeScreen == 1){
    for(let i = 0; i < 3; i++){
      upgradeButtons[i].display();
    }
    screenSwitchButton.y = 775;
    screenSwitchButton.text = "v"
    screenSwitchButton.display();
    push();
    textSize(20)
    strokeWeight(8);
    if(upgradeLevels[0] < 5){
      text("SIZE UPGRADE  -  Cost: " + upgradePrices[0], 1250, 50);
    } else {
      text("SIZE UPGRADE  -  MAX LEVEL", 1250, 50);
    }
    if(upgradeLevels[1] < 5){
      text("GRAVITY UPGRADE  -  Cost: " + upgradePrices[1], 1250, 300);
    } else {
      text("GRAVITY UPGRADE  -  MAX LEVEL", 1250, 300);
    }
    if(upgradeLevels[2] < 5){
      text("LAUNCH UPGRADE  -  Cost: " + upgradePrices[2], 1250, 550);
    } else {
      text("LAUNCH UPGRADE  -  MAX LEVEL", 1250, 550);
    }
    textSize(12);
    fill(50);
    textAlign(CENTER);
    text("The Sillies get bigger, which means more bounces!", 1400, 75);
    text("Gravity increased! The Sillies fall faster, even more bounces!", 1400, 325);
    text("Every Silly gets a random chance to launch itself! (Level = chance!)", 1400, 575);
    noStroke();
    fill(26, 46, 100);
    rectMode(CORNER);
    strokeWeight(8)
    rect(1250, 80, 60 * upgradeLevels[0], 75);
    rect(1250, 330, 60 * upgradeLevels[1], 75);
    rect(1250, 580, 60 * upgradeLevels[2], 75);
    strokeWeight(8);
    stroke(0);
    rectMode(CENTER)
    noFill();
    rect(1400, 120, 300, 75);
    rect(1400, 370, 300, 75);
    rect(1400, 620, 300, 75);
    for(let i = 0; i < 4; i++){
      stroke(0)
      fill(0);
      line(1310 + i * 60, 120 - 75 / 2, 1310 + i * 60, 120 + 75 / 2)
    }
    for(let i = 0; i < 4; i++){
      stroke(0)
      fill(0);
      line(1310 + i * 60, 370 - 75 / 2, 1310 + i * 60, 370 + 75 / 2)
    }
    for(let i = 0; i < 4; i++){
      stroke(0)
      fill(0);
      line(1310 + i * 60, 620 - 75 / 2, 1310 + i * 60, 620 + 75 / 2)
    }
    pop();
  }
  
  for(let i = 0; i < sellButtons.length; i++){
    sellButtons[i].display();
  }
  sillyButton.display();
  storeItem("bounceCount", bounceCount);
  squareCount = squares.length;
  storeItem("squares", squareCount);
  storeItem("sillyPrice", sillyPrice);
  storeItem("upgradeLevels", upgradeLevels);
  storeItem("upgradePrices", upgradePrices);
}

function buyNewSilly() {
  bounceCount -= sillyPrice;
  sillyPrice += round((10 + squareCount * 5) / (upgradeLevels[3] + 1));
  squares.push(new SillyCube(random(boundaryX - boundaryWidth / 2 + 10 + 50 + 10 * upgradeLevels[0], boundaryX + boundaryWidth / 2 - 10 - (50 + 10 * upgradeLevels[0])), random(boundaryY - boundaryHeight / 2 + boundaryHeight / 10 + (50 + 10 * upgradeLevels[0]), boundaryY + boundaryHeight / 2 - boundaryHeight / 8 - (50 + 10 * upgradeLevels[0])), 1, 50,[color, 100, 100])); 
}

function resetSilly() {
  sillyPrice = 10;
  bounceCount = 0;
  squares = [];
  squares.push(new SillyCube(boundaryX, boundaryY, 1, 50,[color, 100, 100]));
  upgradeLevels = [0, 0, 0, 0, 0, 0];
  upgradePrices = [500, 800, 1000, 3000, 3500, 9999];
  chicaMode = false;
}

function keyPressed() {
  if(key == "r"){
    resetSilly();
  }
}

function buyUpgrade(boughtNum){
  if(upgradeLevels[boughtNum] < 5 && boughtNum < 3){
    upgradeLevels[boughtNum] += 1;
    bounceCount -= upgradePrices[boughtNum];
    upgradePrices[boughtNum] += upgradeLevels[boughtNum] * 300;
  }
  if(boughtNum > 2 && upgradeLevels[boughtNum] == 0){
    upgradeLevels[boughtNum] += 1;
    bounceCount -= upgradePrices[boughtNum];
  }
  if(boughtNum == 0){
    for(let i = 0; i < squares.length; i++){
      squares[i].y -= 10;
    }
  }
  if(boughtNum == 3){
    sillyPrice = round(sillyPrice / 2)
  }
  if(boughtNum == 5){
    chicaMode = true;
  }
}

function sellUpgrade(boughtNum){
  if(upgradeLevels[boughtNum] > 0){
    if(boughtNum < 3){
      upgradePrices[boughtNum] -= upgradeLevels[boughtNum] * 300;
    }
    if(boughtNum == 3){
      sillyPrice = sillyPrice * 2;
    }
    if(boughtNum == 5){
      chicaMode = false;
    }
    bounceCount += upgradePrices[boughtNum];
    upgradeLevels[boughtNum] -= 1;
  }
}