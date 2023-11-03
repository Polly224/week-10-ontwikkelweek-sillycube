class Button {
    constructor(x = 0, y = 0, w = 0, h = 0, text = "", shape = 1, stroke = 1) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.shape = shape;
        this.stroke = stroke;
    }
    clicked = false;
    onClick = function (){}
    display() {
        if(this.x == 200){
            textSize(18)
            this.text = "Buy a new Silly for\n" + sillyPrice + " silly coins!!!";
        }
        push();
        fill(255);
        strokeWeight(this.stroke);
        rectMode(CENTER);
        textAlign(CENTER, CENTER)
        if(this.shape == 1){
            ellipse(this.x, this.y, this.w);
        } else if(this.shape == 2){
            rect(this.x, this.y, this.w, this.h);
        }
        fill(0);
        textSize();
        text(this.text, this.x, this.y);
        pop();
        if(mouseIsPressed && !this.clicked && this.hasMouse()){
                this.onClick();
                this.clicked = true;
        }
        if(!mouseIsPressed){
            this.clicked = false;
        }
    }
    hasMouse(){
        if(this.shape == 2){
            return mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2
        } 
        if(this.shape == 1){
            return sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2) <= this.w / 2 ? true : false // ternary operator
        }
    }
}