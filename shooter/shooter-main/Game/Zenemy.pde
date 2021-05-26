class Enemy{
  public int x,y;//offsets from center of canvas
  public int showx,showy;//where projectile appears(as we see it on the canvas)
  public int atx,aty;//for calculating block indices
  public float dir;
  public int block_x,block_y;
  public int size;
  public int velocityx,velocityy;
  Enemy(int pos){
    if(pos==0)
      {this.x = -210;
      this.y = -230;}
    else if(pos==1)
      {this.x = -210;
      this.y = 250;}
    else if(pos==2)
      {this.x = 210;
      this.y = -230;}
    else if(pos==3)
      {this.x = -210;
      this.y = -230;}
    this.dir = player1.dir;
    this.showx  = int(awidth*player1.visionFactor/2);
    this.showy  = int(aheight*player1.visionFactor/2);
    this.atx = this.x + showx;
    this.aty = this.y + showy;
    this.size = 5;
  }
  
  
  int move(int awidth,int aheight,int counter,int old){
    int oldx = this.x,oldy = this.y;
    int decision;
    if(counter==0){decision = floor(random(0,4));}
    else{decision = old;}
    if(blocks[this.block_y][this.block_x] == 0){
        if(decision == 0){this.x -= 3;}
        else if(decision == 1 ){this.x += 3;}
        if(decision == 2){this.y -= 3;}
        else if(decision == 3){this.y += 3;}
        
        atx = this.x + this.showx;
        aty = this.y + this.showy;
        //if crossing boundries push it back
        if(this.aty < 0 ){this.y +=3;}
        if(this.atx < 0){this.x += 3;}
        if(this.aty > aheight -this.size){this.y -= 3;}
        if(this.atx > awidth-this.size){this.x -= 3;}
        
        if(this.x != oldx){velocityx = (this.x-oldx)>0 ? 1:-1;}
        else{velocityx =0;}
        if(this.y != oldy){velocityy = (this.y-oldy)>0 ? 1:-1;}
        else{velocityy =0;}
    }
    //if pushes into blocks
    if(blocks[this.block_y][this.block_x] == 1){
        if(this.velocityx == 1){decision = 0;this.x -=5;}
        else if(this.velocityx == -1){decision = 1;this.x += 5;}
        if(this.velocityy == 1){decision = 2;this.y -=5;}
        else if(this.velocityy == -1){decision =3;this.y += 5;}
    }
    return decision;
  }
  
  
  void show(){
    fill(255,0,0);stroke(255,0,0);
    rect(this.showx,this.showy,5,5);
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
