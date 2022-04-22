// last update 2019.07.31

class Starr { //도형그리는 클래스
  constructor(x,y,rad,col,mx,my,angle,aVel,aAccel) {
    this.x = x;
    this.y = y;
    this.angle = angle; // 각도. 벡터아님
    this.aVel = aVel; // 각도가 변화하는 속력.
    this.aAccel = aAccel; // 각도가 변화하는 가속도
    this.crosslineX = (x-rad/2);
    this.crosslineY = (y-rad/2);
    this.rad = rad;
    this.col = col;
    this.mx = mx;
    this.my = my;
  }
  update() {
    // 회전속력이 늘어났다가 점차 줄어들고 늘어나기 반복
      this.angle += this.aVel;
      this.aVel += this.aAccel;
      if (Math.abs(this.aVel) > 0.4) {
        this.aAccel = this.aAccel*(-1)
      }
    }
  stop() {
    // 마우스 누를때 도형회전 멈추는 용도
    this.aVel = 0;
    this.aAccel = 0;
  }
  display() {
    // 도형회전 및 마우스위치에 배치
    push();
    translate(this.mx,this.my);
    rotate(this.angle);
    //도형그리는 코드
    line(-this.crosslineX, -this.crosslineY, this.crosslineX, this.crosslineY);
    line(this.crosslineX, -this.crosslineY, -this.crosslineX, this.crosslineY);
    ellipse(this.crosslineX + this.rad, this.crosslineY + this.rad, this.rad);
    ellipse(-(this.crosslineX + this.rad), this.crosslineY + this.rad, this.rad);
    ellipse(this.crosslineX + this.rad, -(this.crosslineY + this.rad), this.rad);
    ellipse(-(this.crosslineX + this.rad), -(this.crosslineY + this.rad), this.rad);
    pop();
    strokeWeight(2.2);
    fill(this.col);
  }
}

let starrs = [];
let starrColor;
let turnStarr;
let randColor = 'yellow';


function setup() {
  createCanvas(520, 520);
}

function draw() {
  background(255);
  if (turnStarr) {
    turnStarr = new Starr(turnStarr.x,turnStarr.y,turnStarr.rad,turnStarr.col,mouseX,mouseY,turnStarr.angle,turnStarr.aVel,turnStarr.aAccel);
  }
  else {
    turnStarr = new Starr(16,16,12,'yellow',mouseX,mouseY,0,0,0.01); // 초기값
  }
  if (mouseIsPressed) {
    turnStarr.rad = turnStarr.rad + Math.abs(turnStarr.aVel*2);
    turnStarr.x = turnStarr.x + Math.abs(turnStarr.aVel*2);
    turnStarr.y = turnStarr.y + Math.abs(turnStarr.aVel*2);
  } // 누르면 커짐
  else {
      if(turnStarr.rad>12) {
        turnStarr.rad -= Math.abs(turnStarr.aVel)*8;
      }
      if(turnStarr.x>16) {
        turnStarr.x -= Math.abs(turnStarr.aVel)*8;
      }
      if(turnStarr.y>16) {
        turnStarr.y -= Math.abs(turnStarr.aVel)*8;
      } // 마우스 뗀후 초기화할때 easing 넣기
  }
  turnStarr.update();
  turnStarr.display();
  for (let i in starrs) {
    starrs[i].display();
  }
}

function mouseReleased() {
  randColor = random(['yellow','coral','aqua','lime']);
  starrColor = randColor;
  console.log('angle:'+ turnStarr.angle + 'velocity:'+ turnStarr.aVel + 'Acceleration:'+ turnStarr.aAccel);
  let stillStarr = new Starr(turnStarr.x,turnStarr.y,turnStarr.rad,starrColor,turnStarr.mx,turnStarr.my,turnStarr.angle,turnStarr.aVel,turnStarr.aAccel); // 현재 도형 복사
  stillStarr.stop(); // 복사한 도형 멈춤
  starrs.push(stillStarr); // 복사한 도형 기록
  // turnStarr.x = 16;
  // turnStarr.y = 16; // 도형사이즈 초기화
}
