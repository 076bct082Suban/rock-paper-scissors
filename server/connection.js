const Game = require("./objects/game.js")
const Player = require("./objects/player")
const GameSet = require("./objects/gameset")
const UserSet = require("./objects/userset")

const { v4: uuidv4 } = require('uuid');

module.exports =  class Connection {
    constructor(){
        this.gameSet = new GameSet(new UserSet)
        console.log("Created Connection")
    }

    createNewUser(username, userId){
        const player = new Player(username, userId, this.gameSet)
        this.gameSet.userSet.addUser(player)
    }

    setSearching(userId){
        this.gameSet.userSet.setSearching(userId)
        console.log(this.gameSet.userSet)

    }
}