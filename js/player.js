class Player {
    constructor() {
        this.index = null;
        this.score = 0;
        this.name = null;
        this.gg = false;
        this.rank = 0;
    }

    getCount() {
        var playerCountRef = database.ref('PlayerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            'PlayerCount': count
        });
    }
    getGG() {
        var GGRef = database.ref('players/player' + this.index);
        GGRef.on("value", (data) => {
            this.gg = data.val();
        })
    }
    updateGG(flag) {
        database.ref('players/player' + this.index).update({
            'gg': flag
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            'name': this.name,
            'score': this.score,
            'gg' : this.gg
        })
    }
    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    getRank() {
        var rank;
        rank = database.ref('rank');
        rank.on("value", (data) => {
            this.rank = data.val();
        });
    }

    static updateRank() {
        database.ref('/').update({
            PlayerCount: data.ref()
        });
    }
}