class SillyCube{
    squareRight = random([true, false]);
    xVelValue = random(10);
    xVelocity = this.xVelValue;
    yVelocity = 0;
    isBoosted = false;
    recentlyTouchedWall = "right";
    actualSize = this.size
    constructor(x, y, gravity = 1, size, color){
        this.x = x;
        this.y = y;
        this.gravity = gravity;
        this.size = size;
        this.color = color;
        if(this.squareRight){
            this.recentlyTouchedWall = "left";
        } else {
            this.recentlyTouchedWall = "right";
        }
    }
    
    display(){
        this.actualSize = this.size + 10 * upgradeLevels[0];
        if(this.squareRight){
            if(this.xVelocity > this.xVelValue){
                this.xVelocity -= 0.1;
                this.isBoosted = true;
            } else {
                this.isBoosted = false;
            }
        }
        if(!this.squareRight){
            if(this.xVelocity < -this.xVelValue){
                this.xVelocity += 0.1;
                this.isBoosted = true;
            } else {
                this.isBoosted = false;
            }
        }
        if(this.x > boundaryX - 10 + boundaryWidth / 2 - this.actualSize / 2){
            this.squareRight = false;
            this.xVelocity = -this.xVelocity - 0.5;
            if(this.recentlyTouchedWall == "left"){
                if(upgradeLevels[4] == 1){
                    sillySound.play();
                }
                bounceCount++;
                this.recentlyTouchedWall = "right";
            }
        }
        if(this.x - this.actualSize / 2 <= boundaryX - boundaryWidth / 2){
            this.squareRight = true;
            this.xVelocity = -this.xVelocity + 0.5;
            if(this.recentlyTouchedWall == "right"){
                if(upgradeLevels[4] == 1){
                    sillySound.play();
                }
                bounceCount++;
                this.recentlyTouchedWall = "left";
            }
        }
        if(this.y < boundaryY + boundaryHeight / 2 - 10 - this.actualSize / 2){
            this.yVelocity += 0.5 * this.gravity + ((upgradeLevels[1]) / 5);
        } else {
            let funnySilly = round(random(50 / (upgradeLevels[2] + 1)))
            if(upgradeLevels[2] > 0){
                if(funnySilly == 1 && this.xVelocity < this.xVelValue + 5 && this.xVelocity > -this.xVelValue * 2){
                    if(this.xVelocity * 3 - (this.xVelocity / this.xVelValue * 2) > this.xVelValue + 5){
                        this.xVelocity = this.xVelValue * 5;
                    } else if(this.xVelocity * 3 - (this.xVelocity / this.xVelValue * 2) < this.xVelValue * 2){
                        this.xVelocity = -this.xVelValue * 5;
                    } else {
                        this.xVelocity = this.xVelocity * 5 - (this.xVelocity / this.xVelValue * 2);
                    }
                }
            }
            this.yVelocity = -this.yVelocity;
            bounceCount++;
            if(upgradeLevels[4] == 1){
                sillySound.play();
            }
        }
        this.y += this.yVelocity;
        this.x += this.xVelocity;
        push();
        fill(this.color);
        if(this.color[0] < 361){
            this.color[0] ++;
            if(this.isBoosted){
                this.color[0] += 4;
            }
        } else {
            this.color[0] = 0;
        }
        if(!chicaMode){
            rect(this.x, this.y, this.actualSize);
            push();
            textSize((this.actualSize - this.actualSize / 5))
            fill(0);
            textAlign(CENTER, CENTER);
            translate(this.x, this.y);
            text(":3", 0, 0);
            pop();
        } else {
            imageMode(CENTER, CENTER);
            image(chicaImg, this.x, this.y, this.actualSize, this.actualSize);
        }
        pop();
    }
}