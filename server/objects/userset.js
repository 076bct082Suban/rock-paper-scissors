const STATE = {
    INITIAL: 0,
    SEARCHING: 1,
    PLAYING: 2,
    GAMEOVER: 3
}

module.exports = class UserSet {
    constructor(){
        this.users = []
        console.log("Userset Created")
    }
    addUser(user){
        this.users.push(user)
    }
    setSearching(userID){   
        if(this.users.length == 0){
            return
        }
        for(let user of this.users) {
            if(user.userID == userID){
                console.log("change state excuted")
                user.changeState(STATE.SEARCHING)
                break;
            }
        }
    }
}