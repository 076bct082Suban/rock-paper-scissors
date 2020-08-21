import GameBridge from "./gameBridge.js"
import InputHandler from "./input.js"


// Make connection
let socket = io.connect("http://localhost:3000");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d")

let game = new GameBridge(socket)
new InputHandler(game, canvas)

document.getElementById("game").style.display = "none";
document.getElementById("input-name-submit").onclick = async () => {
    document.getElementById("game").style.display = "block";
    let username = document.getElementById("input-name-value").value;

    // localStorage.setItem("username", username);
    let player = await game.makePlayer(username)
    // localStorage.setItem("userID", player.userID)
    
    document.getElementById("input-name").style.display = "none";


}
socket.on("notifyStartGame", (data) => {
    console.log(data)
    game.startGame(data)

    
})
socket.on("hello", (data) => {
    console.log(data)
})
game.draw(ctx)

let lastTime = 0;
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
//   game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

