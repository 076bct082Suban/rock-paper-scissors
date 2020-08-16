const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();



class Game {
    constructor(){
        this.players = []
        this.score = [0, 0]
        this.gameID = uuidv4();
    }
    isFull(){
        if(this.players.length >=2 ){
            return true;
        }else {
            return false;
        }
    }
}

class Player{
    constructor(username){
        this.username = username;
        this.userID = uuidv4();
    }
    searchGame(){
    } 
}

class GameSet {
    constructor(){
        this.games = []
    }
}
class UserSet {
    constructor(){
        this.users = []
    }
}

router.get("/", async(req, res) => {
    res.send("hi")
})

router.post("/user", async (req, res) => {
    let username = req.body.username
    const player = new Player(username)
    console.log(username)
    console.log(player)
    res.send(player)

})

router.post("/game", async(req, res) => {

})

module.exports = router;