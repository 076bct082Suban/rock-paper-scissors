const GAMEBRIDGESTATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
}

const PLAYERSTATE = {
    PICKING: 0,
    WAITING: 1,
    RESULT: 2,
    GAMEOVER: 3
}

const PICKS = {
    ROCK: 0,
    PAPER: 1, 
    SCISSORS: 2,
    TBD: 3
}
const GAMEWIDTH = 800
const GAMEHEIGHT = 600

const playButtonImage = document.getElementById("play-button-image")
const paperImage = document.getElementById("paper-image");
const rockImage = document.getElementById("rock-image")
const scissorsImage = document.getElementById("scissors-image");
const searchingImage = document.getElementById("searching-image")

function getChoiceImage(pick){
    if(pick == 0){
        return rockImage
    }else if (pick == 1){
        return paperImage
    }else if (pick == 2){
        return scissorsImage
    }
}

function getRoundMessage(lastResult, userID){

}

export default class GameBridge{
    constructor(socket){
        this.socket = socket;
        this.gameWidth = GAMEWIDTH
        this.gameHeight = GAMEHEIGHT
        this.gameid = ""
        this.state = GAMEBRIDGESTATE.INITIAL; 
        this.refrenceObject = {}
        this.playerState = PLAYERSTATE.PICKING
        this.pick = PICKS.TBD
    }

    draw(ctx){
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight)
        if(this.state == GAMEBRIDGESTATE.INITIAL) {
            ctx.drawImage(playButtonImage, this.gameWidth / 2 - this.gameWidth / 10, this.gameHeight / 2 - this.gameHeight / 10, this.gameWidth / 5, this.gameHeight/ 10)

        }else if (this.state == GAMEBRIDGESTATE.SEARCHING){
            ctx.drawImage(searchingImage, this.gameWidth / 2 - this.gameWidth / 10, this.gameHeight / 2 - this.gameHeight / 10, this.gameWidth / 5, this.gameHeight/ 10)

        }
        else if( this.state == GAMEBRIDGESTATE.PLAYING){
            
            // ctx.drawImage()
            ctx.fillStyle = "white";
            ctx.font = "36px Arial";
            ctx.textAlign = "center";

            if(!(Object.keys(this.refrenceObject).length === 0 && this.refrenceObject.constructor === Object)){
                ctx.fillText(this.refrenceObject.players[0].username, this.gameWidth / 4, this.gameHeight / 6);
                ctx.fillText(this.refrenceObject.players[1].username, this.gameWidth / 4 * 3, this.gameHeight / 6);
                ctx.fillText(`${this.refrenceObject.score[0]} | ${this.refrenceObject.score[1]}`, this.gameWidth / 2, this.gameHeight / 6);
            }
            console.log(this.playerState)
            if(this.playerState == PLAYERSTATE.PICKING){
                ctx.fillText("Choose: ", this.gameWidth / 2, this.gameHeight / 3);
                ctx.drawImage(rockImage, this.gameWidth / 4, this.gameHeight / 2, 100, 100)
                ctx.drawImage(paperImage, this.gameWidth / 2 - this.gameWidth / 16, this.gameHeight / 2, 100, 100)
                ctx.drawImage(scissorsImage, this.gameWidth / 2 + this.gameWidth / 8, this.gameHeight / 2, 100, 100)
            }else if (this.playerState == PLAYERSTATE.WAITING){
                ctx.fillText("Waiting", this.gameWidth / 2, this.gameHeight / 3);
                if(this.pick == PICKS.ROCK){
                    ctx.drawImage(rockImage, this.gameWidth / 4, this.gameHeight / 2, 100, 100)
                }else if (this.pick == PICKS.PAPER){
                    ctx.drawImage(paperImage, this.gameWidth / 2 - this.gameWidth / 16, this.gameHeight / 2, 100, 100)
                }else if (this.pick == PICKS.SCISSORS){
                    ctx.drawImage(scissorsImage, this.gameWidth / 2 + this.gameWidth / 8, this.gameHeight / 2, 100, 100)
                }
            }else if (this.playerState == PLAYERSTATE.RESULT){
                // this.lastResult
                ctx.fillText(this.getRoundMessage(), this.gameWidth / 2, this.gameHeight / 3);
                ctx.drawImage(getChoiceImage(this.lastResult[0]), this.gameWidth / 4, this.gameHeight / 2)
                ctx.drawImage(getChoiceImage(this.lastResult[1]), this.gameWidth / 4 * 3, this.gameHeight / 2)
            }
        }
    }
        
    async makePlayer(username){

        this.socket.emit("createNewUser", {
            username: username
        })

    }
    setSearching(){

        this.socket.emit("setSearching");
        this.state = GAMEBRIDGESTATE.SEARCHING;

        // For testing
        // this.state = GAMEBRIDGESTATE.PLAYING;
    }

    async startGame(refrenceObject){
        this.state = GAMEBRIDGESTATE.PLAYING
        this.refrenceObject = await refrenceObject.game;
        this.playerState = PLAYERSTATE.PICKING
    }

    sendPick(pick){
        let toSend =  {pick: pick, gameID : this.refrenceObject.gameID }
        console.log(toSend)
        this.playerState = PLAYERSTATE.WAITING
        this.pick = pick
        this.socket.emit("userPicks",toSend) 
    }

    showResult(data){
        this.refrenceObject = data.game
        this.playerState = PLAYERSTATE.RESULT;
        if(data.winner === ""){
            console.log("as usual")
        }
        this.lastResult = data.game.history[data.game.history.length - 1]
        
        setTimeout(() => {
            this.playerState = PLAYERSTATE.PICKING;
        }, 3000)

    }
    getRoundMessage(){
        let id = this.userID
        let round = this.lastResult
        if(round[0] === round[1]){
            return "It is a tie"
        }
        if(round[0] == PICKS.ROCK){
            if(round[1] == PICKS.SCISSORS){
                return `${this.refrenceObject.players[0].username} has won`
            }else if (round[1] == PICKS.PAPER){
                return `${this.refrenceObject.players[1].username} has won`
            }
        }else if (round[0] == PICKS.PAPER){
            if(round[1] == PICKS.ROCK){
                return `${this.refrenceObject.players[0].username} has won`
            }else if (round[1] == PICKS.SCISSORS){
                return `${this.refrenceObject.players[1].username} has won`
            }
        }else if (round[0] == PICKS.SCISSORS){
            if(round[1] == PICKS.PAPER){
                return `${this.refrenceObject.players[0].username} has won`
            }else if (round[1] == PICKS.ROCK){
                return `${this.refrenceObject.players[1].username} has won`
            }
        }
    }
}