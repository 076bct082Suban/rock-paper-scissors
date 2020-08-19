const Game = require("./game.js")

const STATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
}

module.exports = class GameSet {
    constructor(userSet){
        this.games = []
        this.userSet = userSet
        console.log("GameSet created")
    }
    findGame(user){
        let found = false
        for(let game in this.games){
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
        let game = new Game();
        game.addUser(user);
        this.games.push(game)
    }
}