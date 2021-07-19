// Game constants and variables
let inputdir={x:0,y:0};
const foundSound=new Audio('musicf/food.mp3');
const gameoverSound=new Audio('musicf/gameover.mp3');
const moveSound=new Audio('musicf/move.mp3');
const musicSound=new Audio('/musicf/music.mp3');
let speed=5;
let score=0;
let lastTime=0;
let snakeArray=[
    {
        x:13,
        y:15
    }
];
let food= {x:6,y:5} ;

// Game Functions
function main(ctime){
    window.webkitRequestAnimationFrame(main); // Game Loop it call main function again and again after some changes occur
    if((ctime-lastTime)/1000 < 1/speed) return; // we make a return statement that dont render the untill it passes 0.5sec 
    lastTime=ctime; // then update lastTime
    gameEngine(); // it will run the game
}
function isCollide(snakeArr){
    for(let i=1;i<snakeArray.length;i++){
    // when it bumps or collide with itself
       if(snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y) return true;
    }
    // when collide with wall
    if(snakeArray[0].x>=18 || snakeArray[0].x<=0 ||  snakeArray[0].y>=18 || snakeArray[0].y<=0) return true;

}
function gameEngine(){
// Part-1 To update the snake array(move the snake) and Food
if(isCollide(snakeArray)){
    gameoverSound.play();
    musicSound.pause();
    inputdir={x:0,y:0};
    alert("Game over !!! Press any key to continue to play");
    // when user play again
    snakeArray=[{x:13,y:15}];  // if user clicks then snake array will be reset to its intial state
    musicSound.play();
    score=0;
}

//MOVING THE SNAKE
for(let i=snakeArray.length-2;i>=0;i--){
snakeArray[i+1]={...snakeArray[i]};  // move i+1 to i and so on
}
snakeArray[0].x+=inputdir.x;    // moving 0 index foward by x and y coordinates
snakeArray[0].y+=inputdir.y;


//if Snake eats the food,increments the score and regenerate the food
if(snakeArray[0].x==food.x && snakeArray[0].y==food.y){
    snakeArray.unshift({x:snakeArray[0].x+inputdir.x,y:snakeArray[0].y+inputdir.y}); // adds a new segment of snake by adding a element into the array
    let a=2;
    let b=16;
    score+=1;
    scoreBox.innerHTML="Score: "+score; // we get variable of id name in js so name should be different 
    foundSound.play();
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}; // food will regenerated between and b
}

//Moving the snake


//Part-2 Display the snake and Food
//Dispaly Snake
board.innerHTML=" ";
snakeArray.forEach((e,index)=>{
    snakeElement=document.createElement('div'); // creating a div in html using js dom
    snakeElement.style.gridRowStart=e.y; // Snake start from y row
    snakeElement.style.gridColumnStart=e.x; // Snake start from x col
    if(index === 0) {
        snakeElement.classList.add('head'); // if index==0 of snake body then add head of snake
    }
    else{
        snakeElement.classList.add('snake'); // add snake body if index is not equal to 1
    }
    board.appendChild(snakeElement); // add snake element div into board class.
})

//Display food of snake
FoodElement=document.createElement('div'); // creating a div in html using js dom
    FoodElement.style.gridRowStart=food.y; // Food start from y row
    FoodElement.style.gridColumnStart=food.x; // Food start from x col
    FoodElement.classList.add('food'); // adding a class to our new div
    board.appendChild(FoodElement); //add Food div into board
}











// Main Logic Starts Here
musicSound.play();
window.webkitRequestAnimationFrame(main);

window.addEventListener('keydown',e=>{
inputdir={x:0,y:1}; // game start here 
moveSound.play();

// in switch we are chane the coodrdinates depensding on the key user is clicking 
switch (e.key) {
    case "ArrowUp":
        inputdir.x=0;
        inputdir.y=-1; 
        break;
    case "ArrowDown":
        inputdir.x=0;
        inputdir.y=1; 
            break;
    case "ArrowLeft":
        inputdir.x=-1;
        inputdir.y=0; 
        break;
    case "ArrowRight":
        inputdir.x=1;
        inputdir.y=0; 
        break;
    default:
        break;
}
})