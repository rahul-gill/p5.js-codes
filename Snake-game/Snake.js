class Snake{
    constructor(){
        this.guys=[[0,0]];
        this.dirx=1;
        this.diry=0;
        this.scl=20;

    this.move = function(dirx,diry){
            
        if(eaten()==false){
            if(this.dirx==1 && this.diry==0){
                this.guys.unshift([  this.guys[0][0]+this.scl , this.guys[0][1]  ])
                this.guys.pop();
                }
            else if(this.dirx==-1 && this.diry==0){
                this.guys.unshift([  this.guys[0][0]-this.scl , this.guys[0][1]  ])
                this.guys.pop();}
            else if(this.dirx==0 && this.diry==1){
                this.guys.unshift([  this.guys[0][0] , this.guys[0][1]+this.scl  ])
                this.guys.pop();}
            else if(this.dirx==0 && this.diry==-1){
                this.guys.unshift([  this.guys[0][0] , this.guys[0][1]-this.scl  ])
                this.guys.pop();}
            }

            
            
        }

    this.show = function(){
        fill(255,255,0);
        for(var i=0;i<this.guys.length;i++){
            rect(this.guys[i][0],this.guys[i][1],this.scl)
        }
    }
    }
}
