const GAMEBRIDGESTATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
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
                console.log(topCorner, bottomCorner)
                if(x >= topCorner.x && x <=bottomCorner.x && y >= topCorner.y && y <= bottomCorner.y){
                    console.log("play")
                    this.game.setSearching()
                }
            }
        };
        
    }
}