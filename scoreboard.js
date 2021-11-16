var scoreBoard = {
    board: window.localStorage.getItem("scoreboard") == null ? []  : JSON.parse(window.localStorage.getItem("scoreboard")),
    setScore(score){
        if(this.board == null){
            window.localStorage.setItem(JSON.stringify([score]))
        }else if(this.board.length < 3){
            this.board.push(score)
        }else{
            if(score > this.board[0])
                this.board[0] = score;
            else if(score > this.board[1])
                this.board[1] = score;
            else if(score > this.board[2])
                this.board[2] = score;
        }
        this.board.sort(function(a, b) {
            return a - b;
          }).reverse();
        window.localStorage.setItem("scoreboard", JSON.stringify(this.board))
    }
}
