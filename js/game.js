class Game{
    constructor() {
        this.image;
    }

    getState() {
        var gameStateRef = database.ref('GameState');
        gameStateRef.on("value", function (data) {
            GameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            'GameState': state
        });
    }
    async start() {
        if (gameState === "start") {
            player = new Player();
            var playerCountRef = await database.ref('PlayerCount').once("value");

            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form();
            form.display();
        }
    }

    play() {
        
        player.getRank();
        Player.getPlayerInfo();
        if (isDead === false) {
            form.hide();
      
            if (allPlayers !== undefined) {
                background(0);
           
                var index = 0;
                for (var plr in allPlayers) {
                    //add 1 to the index for every loop
                    index = index + 1;
                
                    // Moving Ground
                    bg.velocityX = -(6 + score / 100);
                
                    if (bg.x < 0) {
                        bg.x = 800;
                    }

                 
                    if (index === player.index) {
                
                        // Score Updating
                        score = score + Math.round(getFrameRate() / 60);
                        player.score = score;
                        player.update();
                    
                        // levitation
                        if (keyDown("space")) {
                            barry.velocityY = -8;
                            barry.changeAnimation("jumping");
                        }
                        barry.velocityY = barry.velocityY + 0.6;
                        // Barry Animations
                        if (barry.velocityY > 0) {
                            barry.changeAnimation("falling");
                        }
                        if (barry.y > 490) {
                            barry.changeAnimation("walking");
                        }
    
                        spawnZaps();
    
                        // dying
                        if (barry.isTouching(zapGroup)) {
                            barry.changeAnimation("dying");
                    
                            player.gg = true;
                            player.updateGG(player.gg);
                        }
                        if (player.gg === true) {
                            isDead = true;
                        }
                    }
                }
        
                drawSprites();
                fill(255);
                textFont(font, 18);
            
                //  score display
                text(allPlayers["player1"].name + " : " + allPlayers["player1"].score, width - 150, 60);
                text(allPlayers["player2"].name + " : " + allPlayers["player2"].score, width - 150, 90);
            }
        }
   
        if (isDead === true){

            bg.setVelocity(0, 0);
            zapGroup.setVelocityXEach(0);
            barry.velocityX = 3;
            zapGroup.setLifetimeEach(-1);

            gameState = "end";
            
            // dying animation
            if (barry.velocityY > 0) {
                barry.changeAnimation("dead");
            }
            barry.velocityY = barry.velocityY + 0.6;
            drawSprites();
        }
    }
    end() {
        background(leaderboardImg);
// leaderboard
        textSize(100);
        text(":" + player.score, 200,200);
        if (allPlayers["player1"].rank === 1) {
            textSize(25);
            text(":" + allPlayers["player1"].score, 600, 125);
            text(":" + allPlayers["player2"].score, 600, 175);
        }
        else {
            textSize(25);
            text(":" + allPlayers["player2"].score, 600, 125);
            text(":" + allPlayers["player1"].score, 600, 165);
        }

        if (allPlayers["player1"].score > allPlayers["player2"].score) {
            allPlayers["player1"].rank++;
            allPlayers["player1"].updateRank(player.rank);
        }
        else {
            allPlayers["player2"].rank++;
            allPlayers["player2"].updateRank(player.rank); 
        }
    }
}