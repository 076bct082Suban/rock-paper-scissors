const GAMEBRIDGESTATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
}

const PLAYERSTATE = {
    PICKING: 0,
    WAITING: 1,
    RESULT: 2
}

const PICKS = {
    ROCK: 0,
    PAPER: 1, 
    SCISSORS: 2
}
const GAMEWIDTH = 800
const GAMEHEIGHT = 600

const playButtonImage = document.getElementById("play-button-image")
const paperImage = document.getElementById("paper-image");
const rockImage = document.getElementById("rock-image")
const scissorsImage = document.getElementById("scissors-image");
const searchingImage = document.getElementById("searching-image")

export default class GameBridge{
    constructor(socket){
        this.socket = socket;
        this.gameWidth = GAMEWIDTH
        this.gameHeight = GAMEHEIGHT
        this.gameid = ""
        this.state = GAMEBRIDGESTATE.INITIAL; 
        this.refrenceObject = {}
        this.playerState = PLAYERSTATE.PICKING
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
            
            ctx.fillText("Choose: ", this.gameWidth / 2, this.gameHeight / 3);
            ctx.drawImage(rockImage, this.gameWidth / 4, this.gameHeight / 2, 100, 100)
            ctx.drawImage(paperImage, this.gameWidth / 2 - this.gameWidth / 16, this.gameHeight / 2, 100, 100)
            ctx.drawImage(scissorsImage, this.gameWidth / 2 + this.gameWidth / 8, this.gameHeight / 2, 100, 100)
        }
        // console.log(this.state)
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
        this.socket.emit("userPicks", {pick: pick})
    }
}