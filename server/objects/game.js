const STATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
}

const PICKS = {
    ROCK: 0,
    PAPER: 1, 
    SCISSORS: 2,
    TBD: 3
}

const WIN_SCORE = 5

const { v4: uuidv4 } = require('uuid');

module.exports = class Game {
    constructor(gameSet){
        this.players = []
        this.score = [0, 0]
        this.history = []
        this.gameID = uuidv4();
        console.log("Game created")
        this.gameSet = gameSet
        this.addRound()
        this.winScore = WIN_SCORE

    }
    hasWon(){
        for( let _ of this.score){
            if( _ >= this.winScore){
                return true
            }
        }
        return false
    }
    whoWon(){
        for(let i = 0; i < 2;i ++ ){
            if( this.score[i] >= this.winScore){
                return this.players[i].userID;
            }
        }
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
    addRound(){
        let canAdd = true
        for(let choice in this.history[this.history.length - 1]){
            console.log("checking")
            if(choice == PICKS.TBD){
                canAdd = false
                console.log("cannot add")
                return
            }
        }
        if(canAdd){
            this.history.push([PICKS.TBD, PICKS.TBD])
            console.log("round added")
        }else{
            return
        }
        
    }

    updateScore(){
        this.score = [0, 0]
        for(let round of this.history){
            if(round[0] === round[1]){
                continue
            }
            if(round[0] == PICKS.ROCK){
                if(round[1] == PICKS.SCISSORS){
                    this.score[0] += 1
                }else if (round[1] == PICKS.PAPER){
                    this.score[1] += 1
                }
            }else if (round[0] == PICKS.PAPER){
                if(round[1] == PICKS.ROCK){
                    this.score[0] += 1
                }else if (round[1] == PICKS.SCISSORS){
                    this.score[1] += 1
                }
            }else if (round[0] == PICKS.SCISSORS){
                if(round[1] == PICKS.PAPER){
                    this.score[0] += 1
                }else if (round[1] == PICKS.ROCK){
                    this.score[1] += 1
                }
            }
        }
    }

    isRoundComplete(){
        // Returns boolean
        let round = this.history[this.history.length - 1]
        let complete = true
        for(let _ of round){
            if(_ == PICKS.TBD){
                complete = false
            }
        }
        if(complete){
            this.updateScore()
            return true
        }else {
            return false
        }
    }

    addPick(userID, pick){
        let pickIsMadeBy = 2
        if(userID == this.players[0].userID){
            pickIsMadeBy = 0
        }else if (userID == this.players[1].userID){
            pickIsMadeBy = 1
        }
        if(pickIsMadeBy == 2){
            console.log("invalid request")
            return {error : "invalid request"}
        }
        console.log(this.history)
        let current = this.history.pop()
        if(current[pickIsMadeBy] === PICKS.TBD){
            current[pickIsMadeBy] = pick
        }
        this.history.push(current)

        if(this.isRoundComplete()){
            return this
        }
    }
}
