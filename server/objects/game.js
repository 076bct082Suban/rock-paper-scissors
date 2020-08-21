const STATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
}

const { v4: uuidv4 } = require('uuid');

module.exports = class Game {
    constructor(gameSet){
        this.players = []
        this.score = [0, 0]
        this.gameID = uuidv4();
        console.log("Game created")
        this.gameSet = gameSet
    }
    isFull(){
        if(this.players.length >=2 ){
            return true;
        }else {
            return false;
        }
    }
    addUser(user){
        this.players.push(user)

        if(this.players.length == 2){
            this.players.forEach(player => {
                this.gameSet.connection.notifyStartGame(player.userID, this)
            })
        }
    }
}
