//Проверка положения экрана---------------------------------------------
let changeOr = document.querySelector('div.changeor');
let leftBtn = document.getElementById("left");
let rightBtn= document.getElementById("right");
let upBtn = document.getElementById("up");
let downBtn = document.getElementById("down");
let again = document.getElementById("again");
let snakeColor = document.getElementById("snakeColor");
let isGameWorking = true;

leftBtn.onclick = () => snake.nextDir = "left";
rightBtn.onclick = () => snake.nextDir = "right";
upBtn.onclick = () => snake.nextDir = "up";
downBtn.onclick = () => snake.nextDir = "down";

again.onclick = () => {
  snake = new Snake();
  count = 0;  
  isGameWorking = true;
}

function checkFirstOrientation(){
  if (outerHeight > outerWidth){
    changeOr.classList.add("_active");
    isGameWorking = false;
  }
}
checkFirstOrientation();

window.addEventListener("resize", function() {
  if (outerHeight > outerWidth){
    changeOr.classList.add("_active");
    isGameWorking = false;
  }else{
    changeOr.classList.remove("_active");
    isGameWorking = true;
  }
});
//---------------------------------------------------

let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    blockSize = 10,
    count = 0,
    width = canvas.width / blockSize,
    height = canvas.height / blockSize,
    isCollision;

function border(){
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, blockSize);
  ctx.fillRect(0, canvas.height - blockSize, canvas.width, blockSize);
  ctx.fillRect(0, 0, blockSize, canvas.height);
  ctx.fillRect(canvas.width - blockSize, 0, blockSize, canvas.height);
}
border();
function score(){
  ctx.fillStyle = "black";
  ctx.font = "17px Areal";
  ctx.fillText("Счет: " + count, 20, 30);
}
function Block(x, y, color){
  this.x = x;
  this.y = y;
  this.color = color;
}
Block.prototype.drawCircle = function(){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x * blockSize + blockSize / 2, this.y * blockSize + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
  ctx.fill();
}
Block.prototype.drawRect = function(){
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x * blockSize, this.y * blockSize, blockSize, blockSize);
}
function Snake(){
  this.segments = [
    new Block(5, 7, this.color),
    new Block(4, 7, this.color),
    new Block(3, 7, this.color),
  ];
  this.color = snakeColor.value;
  this.dir = "right";
  this.nextDir = "right";
}
function Apple(){
  this.position = new Block(Math.floor(Math.random() * (width - 2) + 1), Math.floor(Math.random() * (height - 2) + 1), "green");
}
Apple.prototype.draw = function(){
  this.position.drawCircle();
}
Apple.prototype.move = function(){
  this.position = new Block(Math.floor(Math.random() * (width - 2) + 1), Math.floor(Math.random() * (height - 2) + 1), "green");
}
Snake.prototype.collision = function() {
  isCollision = false;
  for (let i = 1; i < this.segments.length; i++){
    if (this.segments[i].x == this.segments[0].x && this.segments[i].y == this.segments[0].y){
      ctx.fillStyle = "black";
      ctx.font = "30px Areal";
      ctx.fillText("Game over", 120, 200);
      isGameWorking = false;
    }
  }
  if (this.segments[0].x + 2 > width || this.segments[0].y + 2 > height || this.segments[0].x - 1 < 0 || this.segments[0].y - 1 < 0){
    ctx.fillStyle = "black";
    ctx.font = "30px Areal";
    ctx.fillText("Game over", 120, 200);
    isGameWorking = false;
  }
  if (this.segments[0].x == apple.position.x && this.segments[0].y == apple.position.y){
    apple.move();
    isCollision = true;
    count++;
  }
}
let apple = new Apple();
Snake.prototype.move = function(){
  let head = this.segments[0];
  let newHead;
  if (this.dir === "right" && this.nextDir === "left"){
  }else if(this.dir === "left" && this.nextDir === "right"){
  }else if(this.dir === "up" && this.nextDir === "down"){
  }else if(this.dir === "down" && this.nextDir === "up"){
  }else{
    this.dir = this.nextDir;
  }
  if (this.dir === "right") {
    newHead = new Block(head.x + 1, head.y, this.color);
  } else if (this.dir === "down") {
    newHead = new Block(head.x, head.y + 1, this.color);
  } else if (this.dir === "left") {
    newHead = new Block(head.x - 1, head.y, this.color);
  } else if (this.dir === "up") {
    newHead = new Block(head.x, head.y - 1, this.color);
  }
  if (!isCollision){
    this.segments.pop();
  }
  this.segments.unshift(newHead);
}
let snake = new Snake();
let intervalGame = setInterval(()=> {
  if (isGameWorking){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    border();
    score();
    snake.collision();
    snake.move();
    for (let i = 0; i < snake.segments.length; i++){
      snake.segments[i].drawRect();
    }
    apple.draw();
  }
}, 100);

window.onkeydown = function(e){
  if (e.keyCode === 38){
    snake.nextDir = "up";
  }else if(e.keyCode === 39){
    snake.nextDir = "right";
  }else if(e.keyCode === 40){
    snake.nextDir = "down";
  }else if(e.keyCode === 37){
    snake.nextDir = "left";
  }
}
