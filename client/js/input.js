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

export default class InputHandler {
    constructor(game, canvas){ 
        this.game = game;
        this.canvas = canvas

        document.getElementById("game").onclick = (event) => {
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            console.log(x, y)
            console.log()
            if(this.game.state === GAMEBRIDGESTATE.INITIAL){
                // Top right corner
                let topCorner = {
                    x: this.game.gameWidth / 2 - this.game.gameWidth/ 10,
                    y: this.game.gameHeight / 2 - this.game.gameHeight / 10
                } 
                // Bottom left corner
                let bottomCorner = {
                    x: this.game.gameWidth / 2 + this.game.gameWidth/ 10,
                    y: this.game.gameHeight / 2 + this.game.gameHeight / 10
                }
                if(x >= topCorner.x && x <=bottomCorner.x && y >= topCorner.y && y <= bottomCorner.y){
                    console.log("play")
                    this.game.setSearching()
                }
            }
            
            if(this.game.state === GAMEBRIDGESTATE.PLAYING){
                if(this.game.playerState === PLAYERSTATE.PICKING){

                    // We check which he picked 
                    let gameWidth = this.game.gameWidth
                    let gameHeight = this.game.gameHeight
                    if(x >= gameWidth / 4 && x <= gameWidth / 4 + 100 && y >= gameHeight / 2 && y <=gameHeight / 2 + 100){
                        console.log("rock")
                        this.game.sendPick(PICKS.ROCK)
                    }
                    if(x >=gameWidth / 2 - gameWidth / 16 && x <= gameWidth / 2 - gameWidth / 16 + 100 && y >= gameHeight / 2 && y <= gameHeight / 2 + 100){
                        console.log("paper")
                        this.game.sendPick(PICKS.PAPER)
                    }
                    if(x >= gameWidth / 2 + gameWidth / 8 && x <= gameWidth / 2 + gameWidth / 8 + 100 && y >= gameHeight / 2 && y <= gameHeight / 2 + 100){
                        console.log("scissors")
                        this.game.sendPick(PICKS.SCISSORS)
                    }

                }

            }
        };
        
    }
}