const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();

const STATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
}

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
    addUser(user){
        this.players.push(user)
        console.log(user)
        console.log(this)
    }
}

class Player{
    constructor(username){
        this.username = username;
        this.userID = uuidv4();
        this.state = STATE.INITIAL;
    }
    searchGame(gameSet){
        gameSet.findGame(this)
    } 
    changeState(state){
        this.state = state
        if(this.state === STATE.SEARCHING){
            this.searchGame()
        }

        // Todo
    }
}

class GameSet {
    constructor(userSet){
        this.games = []
        this.userSet = userSet
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
class UserSet {
    constructor(){
        this.users = []
    }
    addUser(user){
        this.users.push(user)
    }
    setSearching(userID){   
        if(this.users.length == 0){
            // console.log("fk here")
            return
        }
        console.log(this)
        for(let user of this.users) {
            console.log("here")
            console.log(user, userID)
            if(user.userID == userID){
                console.log("change state excuted")
                user.changeState(STATE.SEARCHING)
                break;
            }
        }
    } 
}
// let userSet = new UserSet;
let gameSet = new GameSet(new UserSet);


router.get("/", async(req, res) => {
    res.send("hi")
})

router.post("/user", async (req, res) => {
    let username = req.body.username
    const player = new Player(username)
    gameSet.userSet.addUser(player)
    res.status(201).send(player)

})
router.patch("/user", async (req, res) => {
    let userID = req.body.userID;
    console.log(userID)
    gameSet.userSet.setSearching(userID)
    // console.log(gameSet)
    res.status(201).send(gameSet)

})

router.post("/game", async(req, res) => {

})

module.exports = router;