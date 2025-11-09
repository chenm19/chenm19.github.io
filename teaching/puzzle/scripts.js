/**********************************************************************
 * @scripts.js
 * @brief puzzle game
 * @ author Haixia Yong & Hanzhang Wu
 * @date April 25 , 2020
 **********************************************************************/

/*initialization when start the game or reload the website*/
window.addEventListener('load', function() {
   reset();}, false);

/*store number of blocks in d*/
var d = new Array(10);
for (var i = 1;i<9;i++){
   d[i]=i;
}
d[9]=0;

/*store the position that each block can move in an array*/
var direct=new Array(
                [0],
                [2,4],
                [1,3,5],
                [2,6],
                [1,5,7],
                [2,4,6,8],
                [3,5,9],
                [4,8],
                [5,7,9],
                [6,8]
            );

/*store the position of each block*/
var position=new Array(
                [0],
                [0,0],
                [150,0],
                [300,0],
                [0,150],
                [150,150],
                [300,150],
                [0,300],
                [150,300],
                [300,300]
            );

/*search the position of the block which the player want to move*/
function move(id){
    var j=1;
    for(j=1; j<10; ++j){
      if( d[j] == id ){
         break;
        }
    }

/*search the positions that the block could move to*/
    var target=0;
    target=whereToGo(j);

    if( target != 0){
          d[j]=0;
          d[target]=id;
          document.getElementById("d"+id).style.left = position[target][0]+"px";
          document.getElementById("d"+id).style.top = position[target][1]+"px";
       }
 }



/*judge the positions that whether the block can move to a certain block*/
function whereToGo(cur_div){
    var q=0;
    var direction_arr = direct[cur_div]
    var move_flag=false;
    for(q=0; q<direction_arr.length; q++){
     if( d[direction_arr[q]] == 0 ){
         move_flag=true;
         break;
       }
    }
    if(move_flag){
       return direction_arr[q];
    }
    else{
       return 0;
    }
 }

/*function to reset blocks and restart the game*/
function reset(){
      for(var i=9; i>1; --i){
          var to=parseInt(Math.random()*(i-1)+1);
          if(d[i]!=0){
                    document.getElementById("d"+d[i]).style.left = position[to][0]+"px";
                    document.getElementById("d"+d[i]).style.top = position[to][1]+"px";
                }

          if(d[to]!=0){
                    document.getElementById("d"+d[to]).style.left = position[i][0]+"px";
                    document.getElementById("d"+d[to]).style.top = position[i][1]+"px";
                }

                var tem=d[to];
                    d[to]=d[i];
                    d[i]=tem;
            }
        }

/*set the message when player wins*/
 var finish=false;
             for(var k=1; k<9; ++k){
                 if( d[k] != k){
                     finish=false;
                     break;
                 }
             }
             if(finish==true){
                 alert("Congratulation!");
             }