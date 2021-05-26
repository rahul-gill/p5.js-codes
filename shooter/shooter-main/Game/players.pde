class Player{
  public int x,y;
  public int atx,aty;//for calculating block indices
  public int showx,showy;////where player appears(as we see it on the canvas)
  public float dir;
  public int block_x,block_y;
  public float visionFactor;
  public int size;
  public int velocityx=0,velocityy=0;// 1 for +x/+y direction, -1 for -x/-y, 0 for none
  public int score=0;
  Player(){
        this.x = 20;
        this.y = -10;
        this.visionFactor = 1;
        this.size = 5;
        this.showx = int((this.visionFactor)*awidth/2);
        this.showy = int((this.visionFactor)*aheight/2);
        this.atx = this.x + this.showx;
        this.aty = this.y + this.showy;
  }
  
  
  void move(int awidth,int aheight){
    int oldx = this.x,oldy = this.y;
    
    if(keyPressed && blocks[player1.block_y][player1.block_x] == 0){
        if(keyCode == LEFT){this.x -= 5;}
        else if(keyCode == RIGHT ){this.x += 5;}
        if(keyCode == UP){this.y -= 5;}
        else if(keyCode == DOWN){this.y += 5;}
        
        atx = this.x + this.showx;
        aty = this.y + this.showy;
        //if crossing boundries push it back
        if(this.aty < 0 ){this.y +=5;}
        if(this.atx < 0){this.x += 5;}
        if(this.aty > aheight -this.size){this.y -= 5;}
        if(this.atx > awidth-this.size){this.x -= 5;}
        
        
        if(this.x != oldx){velocityx = (this.x-oldx)>0 ? 1:-1;}
        else{velocityx =0;}
        if(this.y != oldy){velocityy = (this.y-oldy)>0 ? 1:-1;}
        else{velocityy =0;}
    }
    //if pushes into blocks
    if(blocks[this.block_y][this.block_x] == 1){
        if(this.velocityx == 1){this.x -= 5;}
        else if(this.velocityx == -1){this.x += 5;}
        if(this.velocityy == 1){this.y -= 5;}
        else if(this.velocityy == -1){this.y += 5;}
    }
  }
  
  
  void show(){
    fill(0,255,0);stroke(0,255,0);
    rect(showx,showy,this.size,this.size);
  }
  
  
  void update(){//these things needs to be updated every frame regardless of whatever
    atx = this.x + this.showx;
    aty = this.y + this.showy;
    block_x = ((this.atx)/int(awidth/10) )%10 ; 
    block_y = ((this.aty)/int(aheight/10) )%10;
    if(mouseX-showx >=0){
      dir = atan(1.0*(mouseY-showy)/(mouseX-showx));
    }else{
      dir = - PI + atan(1.0*(mouseY-showy)/(mouseX-showx));
    }
  }
  
  
  void shoot(){
    Projectile abullet = new Projectile();
    bullets.add(abullet);
  } 
  
}
