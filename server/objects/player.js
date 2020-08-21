const STATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
}

module.exports =  class Player{
    constructor(username, userID, gameSet){
        this.username = username;
        this.userID = userID;
        this.state = STATE.INITIAL;
        console.log("New User created")
        console.log(this)
        this.gameSet = gameSet
    }
    searchGame(){
        this.gameSet.findGame(this)
    } 
    changeState(state){
        if(this.state === STATE.SEARCHING && state === STATE.SEARCHING){
            this.state = STATE.INITIAL
            return
        }
        this.state = state
        if(this.state === STATE.SEARCHING){
            this.searchGame()            
        }

        // Todo
    }
}