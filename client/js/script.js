import GameBridge from "./gameBridge.js"
import InputHandler from "./input.js"
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d")

let game = new GameBridge()
new InputHandler(game, canvas)

document.getElementById("game").style.display = "none";
document.getElementById("input-name-submit").onclick = () => {
    document.getElementById("game").style.display = "block";
    username = document.getElementById("input-name-value");

    localStorage.setItem("username", username);
    game.makePlayer()
    
    document.getElementById("input-name").style.display = "none";
}



game.draw(ctx)

// ctx.fillRect(0, 0, 40, 40);