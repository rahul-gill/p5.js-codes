import java.util.LinkedList;
Player player1;
Enemy enemy;
int enemymovechange = 0,olddecision,pos = 0;
int aheight = 600,awidth = 600;
int pause = 0;
int[][] blocks = {//this matrix define the world
    {0,0,0,0,0,0,0,0,0,0},
    {0,0,0,1,1,1,1,1,0,0},
    {0,1,0,0,0,1,0,0,0,0},
    {0,1,0,1,0,0,0,1,0,1},
    {0,1,0,1,1,0,0,0,0,0},
    {0,1,0,1,1,1,1,1,0,0},
    {0,1,0,0,0,0,0,0,0,0},
    {0,1,0,0,0,0,0,1,0,0},
    {0,1,1,1,1,1,0,1,0,0},
    {0,0,0,0,0,0,0,0,0,0},
  };
LinkedList<Projectile> bullets = new LinkedList<Projectile>();


void setup(){
  size(700,600);//function don't allow variables as arguments);so adjust it according to vision factor
  player1 = new Player();
  enemy = new Enemy(pos);pos=1;
  background(0);
  frameRate(60);
}

void draw(){
  background(0);
  //draw the world boudary,white objects etc.
  world(player1.x,player1.y);
  //player things
  player1.show();
  if(pause==0){player1.move(awidth,aheight);}
  player1.update();

  //enemy things
  enemy.show();
  if(pause==0){olddecision = enemy.move(awidth,aheight,enemymovechange,olddecision);
  enemymovechange  = (enemymovechange+1)%15;}
  enemy.update();
  //enemy dead things
  for(int i=0; i != bullets.size(); i++){
    float dist = sqrt( sq(bullets.get(i).showx - enemy.showx - enemy.size) + sq(bullets.get(i).showy - enemy.showy - enemy.size));
    if(dist<=10){
      player1.score++;
      println("dead",player1.score);
      enemy = new Enemy(pos);
      pos = (pos+1)%4;
      break;
    }
  }
  /******managing projectiles******/
  LinkedList<Projectile> toBeDeleted = new LinkedList<Projectile>();
  for(int i=0; i != bullets.size(); i++){
    bullets.get(i).show();
    if(pause==0){bullets.get(i).move();}
    bullets.get(i).update();
    if( bullets.get(i).hit() ){
      toBeDeleted.add(bullets.get(i));
    }
  }
  for(int j=0; j != toBeDeleted.size(); j++){
      if(bullets.contains(toBeDeleted.get(j))){
        bullets.remove(toBeDeleted.get(j));
      }
  }
  
   //side bar
  stroke(0,0,0);fill(255,255,0);
  rect(600,0,100,600);
  stroke(0,0,0);fill(0,0,0,0);
  rect(601,30,100,30);
  stroke(0);fill(0);
  textSize(16);
  text("Score :",610,50);
  text(player1.score,670,50);
  stroke(0,0,0);fill(170,162,84);
  if(mousePressed && mouseX>601 && mouseX<700 && mouseY>60 && mouseY<88){fill(113,109,72);}
  rect(601,60,100,30);
  stroke(0);fill(0);
  textSize(16);
  text("Pause",625,80);
  textSize(10);
  text("Your score depends",601,120);
  text("upon how long you",601,140);
  text("can play",601,160);
}


void mousePressed(){
  if(mouseX>601 && mouseX<700 && mouseY>60 && mouseY<88){
    if(pause==1){pause=0;}else{pause=1;}
  }
  else{player1.shoot();}
}

void world(int transx,int transy){
  stroke(255);
  fill(255);
  for(int i=0;i!=10;i++){
    for(int j=0;j!=10;j++){
      if(blocks[j][i] == 1){
        rect(awidth*i/10 - transx, aheight*j/10 - transy, awidth/10, aheight/10);  
      }
    }  
  }
  //boundaries of world
  stroke(255,0,0);
  fill(255,0,0);
  line(-transx,-transy,awidth-transx,-transy);
  line(-transx,-transy,-transx,aheight-transy);
  line(awidth-transx,-transy,awidth-transx,aheight-transy);
  line(-transx,aheight-transy,awidth-transx,aheight-transy);

}
