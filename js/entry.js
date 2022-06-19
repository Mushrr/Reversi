// 游戏控件


// class GameWindowControl {
//     constructor() {
//         this.end = false; // 游戏默认还未结束
//         this.boardSize = 8; // 默认棋盘大小
//         this.boardDiv = document.querySelector('#gameBoard'); // 获取游戏的board
//     }

//     _getIndex(row, column) {
//         return row * this.boardSize + column;
//     }

//     init() {
//         // 初始化棋盘
//         let itemList = this.boardDiv.querySelectorAll('div');

//         let { lt, lb, rt, rb } = {
//             lt: itemList[this._getIndex(3, 3)],
//             lb: itemList[this._getIndex(4, 3)],
//             rt: itemList[this._getIndex(3, 4)],
//             rb: itemList[this._getIndex(4, 4)]
//         }

//         lt.style.backgroundColor = 'var(--color-black)';
//         rb.style.backgroundColor = 'var(--color-black)';
//         rt.style.backgroundColor = 'var(--color-white)';
//         lb.style.backgroundColor = 'var(--color-white)';
//     }
// }

// let gw = new GameWindowControl();

// gw.init();

// 游戏开始的时候黑子先手，随后他选中终止的时候，end，结束之前
// 他所点的区域会触发事件，检测是否可以更改颜色，如果可以更改颜色，
// 则修改，并向infoboard 传递消息

class InfoBoard {
    constructor() {
        // 消息面板控制类
        this.infoboard = document.querySelector('#infoBoard');
        this.blackScoreElement = document.querySelector('#blackScore > span');
        this.whiteScoreElement = document.querySelector('#whiteScore > span');
        this.currentHand = true;
        this.currentPlayer = 1;
        this.currentNewItems = 0;
        this.infoSpace = document.querySelector('#info');
    }
    get black() {
        return Number(this.blackScoreElement.innerText);
    }
    set black(update) {

        if (update.to) {
            this.blackScoreElement.innerText = update.to;
        }

        if (update.increment) {
            this.blackScoreElement.innerText = Number(this.blackScoreElement.innerText) + update.increment;
        }
    }

    get white() {
        return Number(this.whiteScoreElement.innerText);
    }
    set white(update) {

        if (update.to) {
            this.whiteScoreElement.innerText = update.to;
        }

        if (update.increment) {
            this.whiteScoreElement.innerText = Number(this.whiteScoreElement.innerText) + update.increment;
        }
    }

    info(msg) {
        let p = document.createElement('p');
        p.innerText = msg;
        this.infoSpace.appendChild(p);
        this.infoSpace.scrollTop = this.infoSpace.scrollHeight;
    }

    gameChange() {
        this.currentNewItems = 0;
        if (this.currentHand) {
            this.currentPlayer = -1;
            this.currentHand = !this.currentHand;
        } else {
            this.currentPlayer = 1;
            this.currentHand = !this.currentHand;
        }

        document.querySelector('#currentPlayer > span').innerText = this.currentPlayer === 1 ? '黑方' : '白方';
        this.info(`现在${this.currentPlayer === 1 ? '黑方' : '白方'} 落子`);
    }
}


let ib = new InfoBoard();

class Rule {
    // 规则机器，页面上每个div都可以点击，但是是不是可以进行转换
    // 还需要经过Rule解析之后
    constructor() {
        this.gameBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, -1, 0, 0, 0],
            [0, 0, 0, -1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
    }

    _validate(row, col, currentPlayer) {
        if ([row, col] === [0, 0] ||
            [row, col] === [63, 0] ||
            [row, col] === [0, 63] ||
            [row, col] === [63, 63]) {
            return false;
        }
        if (row > 0 && row < 7 && col > 0 && col < 7) {
            // 非边界情况
            if (this.gameBoard[row - 1][col] === this.gameBoard[row + 1][col]
                && this.gameBoard[row + 1][col] === currentPlayer
                && currentPlayer != this.gameBoard[row][col]) {
                return true;
            }
            if (this.gameBoard[row][col - 1] === this.gameBoard[row][col + 1]
                && this.gameBoard[row][col + 1] === currentPlayer
                && currentPlayer != this.gameBoard[row][col]) {

                return true;
            }
            if (this.gameBoard[row - 1][col - 1] === this.gameBoard[row + 1][col + 1]
                && this.gameBoard[row + 1][col + 1] === currentPlayer
                && currentPlayer != this.gameBoard[row][col]) {
                return true;
            }
            if (this.gameBoard[row - 1][col + 1] === this.gameBoard[row + 1][col - 1]
                && this.gameBoard[row + 1][col - 1] === currentPlayer
                && currentPlayer != this.gameBoard[row][col]) {

                return true;
            }
        } else {
            if (row === 0 || row === 7) {
                if (this.gameBoard[row][col - 1] === this.gameBoard[row][col + 1]
                    && this.gameBoard[row][col + 1] === currentPlayer
                    && currentPlayer != this.gameBoard[row][col]) {
                    return true;
                }
            } 
            if (col === 0 || col === 7) {
                if (this.gameBoard[row - 1][col] === this.gameBoard[row + 1][col]
                    && this.gameBoard[row + 1][col] === currentPlayer
                    && currentPlayer != this.gameBoard[row][col]) {
                    return true;
                }
            }
        }
        return false;
    }

    check(row, col, currentPlayer) {
        if (this.gameBoard[row][col] === 0) {
            return true;
        } else {
            return this._validate(row, col, currentPlayer);
        }
    }
}

class Drawer {
    constructor() {
        this.items = document.querySelector('#gameBoard').querySelectorAll('div');
    }

    _getItem(row, col) {
        return this.items[row * 8 + col];
    }

    draw(row, col, currentPlayer) {
        if (currentPlayer === 1) {
            this._getItem(row, col).style.backgroundColor = 'var(--color-black)';
        }
        if (currentPlayer === -1) {
            this._getItem(row, col).style.backgroundColor = 'var(--color-white)';
        }
        if (currentPlayer === 0) {
            this._getItem(row, col).style.backgroundColor = 'var(--color-empty)';
        }
    }
}



class GameControl {
    constructor(infoBoard, drawer, rule) {
        this.infoBoard = infoBoard;
        this.drawer = drawer;
        this.rule = rule;
    }

    render() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.drawer.draw(i, j, this.rule.gameBoard[i][j]);
            }
        }
    }
    _loc(div) {
        return Number(div.id.substr(1)) - 1;
    }

    _getInd(ind) {
        let row = Math.floor((ind / 8));
        let col = ind - 8 * row;
        return { row, col };
    }

    end() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.rule.gameBoard[i][j] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    init() {
        this.render();
        for (let div of this.drawer.items) {
            div.addEventListener('click', (e) => {
                console.log('点击')
                let currentPoint = this._getInd(this._loc(e.target));
                this.infoBoard.info(`${this.infoBoard.currentPlayer === 1 ? '黑方' : '白方'} 选择了 ${currentPoint.row} ${currentPoint.col}`);
                if (this.rule.check(currentPoint.row, currentPoint.col, this.infoBoard.currentPlayer)) {
                    if (this.rule.gameBoard[currentPoint.row][currentPoint.col] === 0 && this.infoBoard.currentNewItems === 0) {
                        this.drawer.draw(currentPoint.row, currentPoint.col, this.infoBoard.currentPlayer);
                        if (this.infoBoard.currentPlayer === 1) {
                            this.infoBoard.black = { increment: 1 };
                        } else {
                            this.infoBoard.white = { increment: 1 };
                        }

                        // 
                        // 更新board
                        this.infoBoard.currentNewItems = 1;

                        this.rule.gameBoard[currentPoint.row][currentPoint.col] = this.infoBoard.currentPlayer;

                        this.render();
                    } else if (this.rule.gameBoard[currentPoint.row][currentPoint.col] === 0 && this.infoBoard.currentNewItems === 1) {
                        this.infoBoard.info('抱歉你不能再落空子了');
                    } else {
                        this.drawer.draw(currentPoint.row, currentPoint.col, this.infoBoard.currentPlayer);
                        if (this.infoBoard.currentPlayer === 1) {
                            this.infoBoard.black = { increment: 1 };
                            this.infoBoard.white = { increment: -1 };
                        } else {
                            this.infoBoard.white = { increment: 1 };
                            this.infoBoard.black = { increment: -1 };
                        }

                        // 
                        // 更新board
                        this.rule.gameBoard[currentPoint.row][currentPoint.col] = this.infoBoard.currentPlayer;
                        this.render();
                    }
                }

                if (this.end()) {
                    this.infoBoard.info('游戏结束')
                    if (this.infoBoard.black > this.infoBoard.white) {
                        this.infoBoard.info('黑方胜出')
                    } else {
                        this.infoBoard.info('白方胜出');
                    }
                }
            })
        }
    }

    refersh() {
        this.infoBoard = new InfoBoard();
        this.infoBoard.black = {to: 2};
        this.infoBoard.white = {to: 2};
        this.infoBoard.infoSpace
        this.infoBoard.currentPlayer = 1;
        this.drawer = new Drawer();
        this.rule = new Rule();
        this.render();
    }
}


let gc = new GameControl(new InfoBoard(), new Drawer(), new Rule());

gc.init();

function change() {
    gc.infoBoard.gameChange();
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode === 67) {
        gc.infoBoard.gameChange();
    } else if (e.keyCode === 82 ) {
        gc.refersh();
    }
})

