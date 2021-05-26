class Projectile{
  public int x,y;//offsets from center of canvas
  public int showx,showy;//where projectile appears(as we see it on the canvas)
  public int atx,aty;//for calculating block indices
  public float dir;
  public int block_x,block_y;
  
  Projectile(){
    this.x = player1.x + player1.size;
    this.y = player1.y + player1.size;
    this.dir = player1.dir;
    this.showx  = int(awidth*player1.visionFactor/2);
    this.showy  = int(aheight*player1.visionFactor/2);
    this.atx = this.x + showx;
    this.aty = this.y + showy;
  }
  
  
  void move(){
    if(!this.hit()){
      this.x += 30*cos(dir);
      this.y += 30*sin(dir);
    }
  }
  
  
  void show(){
    fill(252,228,0);stroke(252,25,16);
    circle(this.showx,this.showy,3);
  }
  
  
  boolean hit(){//if projectile hits wall or blocks
    if(this.showy  < -player1.y ){return true;}
    if(this.showx < -player1.x){return true;}
    if(this.showy > aheight-player1.y){;return true;}
    if(this.showx > awidth-player1.x){;return true;}
    if(blocks[this.block_y][this.block_x] == 1){return true;}
    return false;
  }
  
  
  void update(){//these things needs to be updated every frame regardless of whatever
    this.atx = this.x + int(awidth*player1.visionFactor/2);
    this.aty = this.y + int(aheight*player1.visionFactor/2);
    this.block_x = ((this.atx )/int(awidth/10) )%10 ; 
    this.block_y = ((this.aty )/int(aheight/10) )%10;
    this.showx = int(awidth*player1.visionFactor/2)-player1.x+this.x;
    this.showy = int(aheight*player1.visionFactor/2)-player1.y+this.y;
  }

}
