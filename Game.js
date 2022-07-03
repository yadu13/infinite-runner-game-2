class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background("#c68767");
        image(track,0,-displayHeight,displayWidth*4,displayHeight)
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
  
        //x and y position of the monkey
        var x ;
        var y = 305;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          
          x =  displayWidth - allPlayers[plr].distance;
          monkey[index-1].x = x;
          monkey[index-1].y = y;;
          //use data form the database to display the monkey in  direction
          y ;
  
          if (index === player.index){
            monkey[index - 1].shapeColor = "brown";
            camera.position.x = monkey[index - 1];
            camera.position.y = displayHeight/2;
          }
         
          
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if(player.distance>3500){
        gameState=2;
      }
  
      drawSprites();
    }
    end(){
      console.log("Ended");
    }
  }
  