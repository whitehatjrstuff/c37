const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var player,web
var Score=0;
function setup() {
  console.log("1.4")
  createCanvas(windowWidth,windowHeight);
  //createSprite(400, 200, 50, 50);
  //scale(1000/height)
  engine = Engine.create();
  world = engine.world;
  player = new SpiderMan(width/2,height/2)
  web = new Web(player.body,{x:player.body.position.x,y:player.body.position.y})
  roof = newWall(400,height*0.1,500,height*0.03);
  base = newWall(400,0,100000,height*0.1)
  base = newWall(400,height,100000,height*0.1)
  for(let i =1;i<500;i+=2){
    newWall(i*200+random(200,400),random(height*2/3,height*4/5),random(100,300),random(50,height/5))
  }
  for(let i =1;i<500;i+=2){
    newWall(i*200+random(200,400),50,random(height*0.1,height*0.3),random(height*0.05,height*0.15))
  }
  web.fly()
}

function draw() {
  background("#A2DAE3");  
  Engine.update(engine);
  
  player.display();web.display()
 drawWalls()
  drawSprites();
  joystick = new Joystick(width/2,height*4/5,50)
    camera.position.x = player.body.position.x;
   // camera.position.y = player.body.position.y;
  push()
  translate((camera.position.x - width/2),(camera.position.y - height/2))
  if(player.body.position.x>Score){Score = player.body.position.x}
   fill(0)
   textSize(30)
  textAlign(CENTER);
  text("Score: "+int(Score/100),width/2,height/7)
  textSize(20)
  text("Use Arrow Keys To Move",width/2,height*0.8)
  text("Click on Brown Area to Swing There",width/2,height*0.88)
  pop()
}
function mouseClicked(){
  
  for(let i =0;i<walls.length;i++) {
    if(walls[i].isCliked()==true){
      web.join(player.body)
      web.setTarget(mouseX+(camera.position.x - width/2),mouseY+(camera.position.y - height/2))
    }
    //console.log("mouse")
  };
    

  
}
function  keyPressed(){
  if(keyCode == 40){
    web.fly()
  }
  if(keyCode ==39){
    move("right")
  }
  if(keyCode ==38){  
    move("up")
  }
  if(keyCode ==37){
   move("left")
  }
  
}
function move(pos){
  switch (pos) {
    case "left":
      Matter.Body.applyForce(player.body, player.body.position, {x:-75,y:0})      
      break;
    case "right":
      Matter.Body.applyForce(player.body, player.body.position, {x:75,y:0})      
      break;
    case "up":
      if(player.body.velocity.y<5){
        Matter.Body.applyForce(player.body, player.body.position, {x:0,y:-100})
      }
      else if(player.body.velocity.y>5){
        Matter.Body.applyForce(player.body, player.body.position, {x:0,y:-50})
      }    
      break;  
  
    default:
      break;
  }
}
