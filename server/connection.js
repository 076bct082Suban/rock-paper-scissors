const Game = require("./objects/game.js")
const Player = require("./objects/player")
const GameSet = require("./objects/gameset")
const UserSet = require("./objects/userset")

const { v4: uuidv4 } = require('uuid');
const PICKS = {
    ROCK: 0,
    PAPER: 1, 
    SCISSORS: 2,
    TBD: 3
}

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
            history: theGame.history,
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

    addPick(userID, pick, gameID){
        // console.log(gameID)
        let theGame = this.gameSet.addPick(userID, pick, gameID)
        // console.log(theGame)
        if(!theGame){
            console.log("waiting")
            return
        }
        try {
            let game = {
                gameID: theGame.gameID,
                score: theGame.score,
                history: theGame.history,
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
            let roundPlayed = true;
            let lastGame = game.history[game.history.length - 1]
            for(let _ of lastGame){
                if(_ === PICKS.TBD){
                    roundPlayed = false
                    break
                }
            }
            let winner = ""
            if(this.gameSet.checkifWon(gameID)){
                winner = this.gameSet.getWinner(gameID)
            }
            if(roundPlayed){
                for(let player of game.players){
                    this.io.to(player.userID).emit("picked", {game: game, winner: winner});
                }
                console.log(winner)
                if(winner == ""){
                    console.log("here")
                    this.gameSet.addRound(gameID)
                    
                }
                
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
}