var PLAY = 1;
var END = 0;
var gameState = PLAY;


var eagle,eagleImage;
var dragon,dragonImage,dragonsGroup;
var sky,skyImage;
var mountain,mountainImage,mountainsGroup;

var score;

var gameOver, gameOverImage;
var restart,restartImage;


function preload(){


    eagleImage = loadImage("eagle.png");
    dragonImage = loadImage("dragon.png");
    skyImage = loadImage("sky.png");
    mountainImage = loadImage("mountain.png");
    gameOverImage = loadImage("gameOver.png");
    restartImage = loadImage("restart.png");

}

function setup() {
    createCanvas(600,600); 

    sky = createSprite(0,0,1200,1200);
    sky.addImage(skyImage);
    sky.scale = 8; 
   
    eagle = createSprite(50,160,20,20);
    eagle.addImage(eagleImage);
    eagle.scale = 0.5;
    //eagle.debug = true;
    eagle.setCollider("circle",0,0,40);


    gameOver = createSprite(330,300);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 0.5;
    //gameOver.visible = false;

    restart = createSprite(330,330);
    restart.addImage(restartImage);
    restart.scale = 0.2;
   // restart.visible = false;

  
    

    
    dragonsGroup = createGroup();
    mountainsGroup = createGroup();

    



     score = 0;

    

 
}

function draw() {
    background(255);

    //console.log(PLAY);
   // console.log(END);
  
    if(gameState === PLAY){
        gameOver.visible = false;
        restart.visible = false;

       

        sky.velocityX = -(3+3*score/100);

        score = score + Math.round(frameCount/400);

        if (sky.x<0){
            sky.x = sky.width/2;
        }


        if (keyDown("up") && eagle.y >= 10){
            eagle.y = eagle.y-9;

        }
        if (keyDown("down") && eagle.y<=490){
            eagle.y = eagle.y+9;

        }

       
        spawnDragon();
        spawnMountain();


        if (eagle.isTouching(dragonsGroup)){
            gameState = END;
        }
        if (eagle.isTouching(mountainsGroup)){
            gameState = END;
        }

    }
   else  if(gameState === END){
        gameOver.visible = true;
        restart.visible = true;

        sky.velocityX = 0;
        eagle.velocityY = 0;

        dragonsGroup.setLifetimeEach(-1);
        mountainsGroup.setLifetimeEach(-1);

        dragonsGroup.setVelocityXEach(0);
        mountainsGroup.setVelocityXEach(0);

        if(mousePressedOver(restart)){
            reset();
            
        }

    }

    
    
   // eagle.collide(sky);
   
    drawSprites();
    textSize(32);
    fill("red");
    text("Survival Time = "+ score,270,50);
 
   

   
}
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    dragonsGroup.destroyEach();
    mountainsGroup.destroyEach();
    score = 0;
}
function spawnDragon() {
    if(frameCount % 60===0){
        dragon = createSprite(500,200,20,20);
        dragon.y = Math.round(random(80,490));
        dragon.addImage(dragonImage);
        dragon.scale = 0.9;
        dragon.velocityX = -(3+3*score/100);
        dragon.lifetime = 200;
        dragon.setCollider("circle",0,0,40);
        //dragon.debug = true;
        dragonsGroup.add(dragon);


    }
}
function spawnMountain(){
    if(frameCount % 120===0){
        mountain = createSprite(490,540,20,20);
        mountain.addImage(mountainImage);
        mountain.scale = 0.5;
        mountain.velocityX = -(3+3*score/100);
        mountain.lifetime = 200;
        //mountain.debug = true;
        mountain.setCollider("rectangle",0,0,300,300);

        mountainsGroup.add(mountain);

    }
}
