var player;
var obstacle;
var obstacles
var ground;
var groundImage;
var playerImage;
var playerImage2;
var x
var spike;
var spike2;
var spike3;
var gamestate
var score
var y
var grounds
var fal
function preload(){
    playerImage = loadAnimation('person2.png','person.png','person3.png')
    spike = loadImage('spike.png')
    spike2 = loadImage('spike2.png')
    spike3 = loadImage('spike3.png')
    playerImage2 = loadImage('person.png')
    groundImage = loadImage('s.png')
}
function setup() {
    createCanvas(800,100)
    fal = false
    player = createSprite(50,50,20,20)
    obstacles = new Group()
    gamestate = 'play'
     score = 0
    player.addAnimation('lol',playerImage)
    player.scale  = 3
    grounds = new Group() 
    player.debug = true
    player.setCollider('rectangle',-1.4,0,6,15)
}
function cgrounds(){
    if(frameCount%2==0){
        ground = createSprite(850,95,800,10)
        ground.addImage(groundImage)
        ground.scale = 0.03
        ground.velocityX = -10
        grounds.add(ground)
    }
}
function createObstacles(){
    if(frameCount % 30 == 0){
        x = Math.round(random(10,25))
        obstacle = createSprite(900,65,x,x)
        obstacle.velocityX = -10
        obstacle.scale = 1.5 
        obstacle.lifetime = 100;
        y = Math.round(random(0,5))  
        switch(y){ 
            case 0:    
              obstacle.addImage(spike)
            break;
            case 1:
                obstacle.addImage(spike2)
            break;
            case 2:
                obstacle.addImage(spike3)
            break;
            case 3:
                obstacle.destroy()
            break;
            case 4:
                obstacle.destroy()
            break;
            case 5:
                obstacle.destroy()
            break;
            default:
              break;
          }

        obstacles.add(obstacle)

    }
}
function draw() {
    background('lightGray')
    text('Score: '+score,15,25)
    if(gamestate == 'play'){
        score +=1
        createObstacles()
        if(frameCount >= 80){
            player.velocityY +=1.5
            player.velocityX = -1* (ground.velocityX)
        }
        if(keyDown('space') && player.collide(grounds)){   
            player.velocityY = -10;
            player.addImage(playerImage2)
        }
    }
    cgrounds()
    if(player.isTouching(obstacles)){
        gamestate = 'over'
        obstacles.setVelocityXEach(0)
        player.velocityY = 0
        swal(
            {
                title : 'Game Over!',
                text : 'Thanks for Playing!',
                imageUrl : 'personc.png',
                imageSize : '150x150',
                confirmButtonText : 'RESTART',
            },
            function(confirm){
                if(confirm){
                    location.reload();
                }
            }
        )
    }
    if(gamestate == 'over'){
        push()
        textSize(30)
        text('Game Over',300,50)
        pop()
    }
    player.collide(grounds)  
    drawSprites()
}