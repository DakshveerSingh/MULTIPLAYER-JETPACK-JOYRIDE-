class Form {

    constructor() {
        this.input = createInput("");
        this.button = createButton('Play');
        this.reset = createButton("Reset");
    }
    hide() {
        this.button.hide();
        this.input.hide();
    }

    display() {
        background(formImage);

        

        this.reset.position(width - 50, 20);
        this.reset.mousePressed(() => {
            player.updateCount(0);
            game.update(0);
            player.updateRank(0);
            database.ref('players').remove();
        })

        this.input.position(displayWidth / 2 - 350, displayHeight - 250);
        this.button.position(displayWidth / 2 - 280, displayHeight - 215);
        
        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);

            fill(255);
            textFont(font,36);
            textAlign("center")
            text("Hello " + player.name, width / 2, height - 40);
            text("Waiting for Players...", width / 2, 100);
        });
    }
}
