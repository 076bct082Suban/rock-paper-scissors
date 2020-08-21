const Game = require("./objects/game.js")
const Player = require("./objects/player")
const GameSet = require("./objects/gameset")
const UserSet = require("./objects/userset")

const { v4: uuidv4 } = require('uuid');

module.exports =  class Connection {
    constructor(io){
        this.gameSet = new GameSet(new UserSet, this)
        this.io = io
        console.log("Created Connection")
    }

    createNewUser(username, userId){
        const player = new Player(username, userId, this.gameSet)
        this.gameSet.userSet.addUser(player)
    }

    setSearching(userId){
        this.gameSet.userSet.setSearching(userId)
    }
    notifyStartGame(userId, theGame){
        let game = {
            gameID: theGame.gameID,
            score: theGame.score,
            players: [
                {
                    username: theGame.players[0].username,
                    userID: theGame.players[0].userID,
                    state: theGame.players[0].state
                }, 
                {
                    username: theGame.players[1].username,
                    userID: theGame.players[1].userID,
                    state: theGame.players[1].state
                }
            ] 
        }
        // this.io.emit("hello", {game: game})
        this.io.to(userId).emit("notifyStartGame", {game: game});



    }
}