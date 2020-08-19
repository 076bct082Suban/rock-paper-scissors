const GAMEBRIDGESTATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
}
const GAMEWIDTH = 800
const GAMEHEIGHT = 600

const playButtonImage = document.getElementById("play-button-image")

export default class GameBridge{
    constructor(socket){
        this.socket = socket;
        this.gameWidth = GAMEWIDTH
        this.gameHeight = GAMEHEIGHT
        this.gameid = ""
        this.state = GAMEBRIDGESTATE.INITIAL; 
    }

    draw(ctx){
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight)

        ctx.drawImage(playButtonImage, this.gameWidth / 2 - this.gameWidth / 10, this.gameHeight / 2 - this.gameHeight / 10, this.gameWidth / 5, this.gameHeight/ 10)
    }

    async makePlayer(username){

        this.socket.emit("createNewUser", {
            username: username
        })

    }
    setSearching(){
        // userId = localStorage.getItem("userID")
        // await axios.patch
        this.socket.emit("setSearching")
    }
}