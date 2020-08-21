const Game = require("./game.js")

const STATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
}

module.exports = class GameSet {
    constructor(userSet, connection){
        this.games = []
        this.userSet = userSet
        this.connection = connection
        console.log("GameSet created")
    }
    findGame(user){
        let found = false
        for(let game of this.games){
            if(!game.isFull()){
                game.addUser(user)
                found = true;
                break;
            }
        }
        if(!found){
            this.createNewGame(user)
        }
    }
    createNewGame(user){
        let game = new Game(this);
        game.addUser(user);
        this.games.push(game)
    }

    addPick(userID, pick, gameID){
        for(let game of this.games) {
            console.log("checking for games")
            // console.log(gameID, game.gameID)
            if(gameID == game.gameID){
                return game.addPick(userID, pick)
            }
        }
        return {error: "game NOt found"}
    }
    checkifWon(gameID){
        for(let game of this.games){
            if(gameID == game.gameID){
                if(game.hasWon()) {
                    return true
                }
            }
        }
        return false
    }
    addRound(gameID){
        for(let game of this.games){
            if(gameID == game.gameID){
                console.log("going to add round")
                game.addRound()
            }
        }
    }
    getWinner(gameID){
        for(let game of this.games){
            if(gameID == game.gameID){
                if(game.hasWon()) {
                    return game.whoWon()
                }
            }
        }
        return ""
    }
}