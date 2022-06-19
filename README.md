# Reversi

>  黑白棋 - 看完测不准的阿波连之后突然发现之前完全没接触过这个棋，了解下之后想做一个游戏试一下

##### 棋盘大小

8 X 8: 八行八列，一共64个棋子，最中心有四个棋子（两黑两白）预先设置好。

##### 落子规则

黑方先手，随后依次落子

当落子后，如黑子落下，发现**同行**或者**同列**或者**斜向**存在其他的黑子，与当前黑子包夹住另外一个白子，此时可以把这个白子翻面，变成黑子。当双方无子可下的时候，游戏结束。子多者胜出。

[在线demo](https://mushrr.github.io/Reversi/index)

![主界面](https://github.com/Mushrr/Reversi/blob/main/img/mainWindow.png)
![游戏进行终](https://github.com/Mushrr/Reversi/blob/main/img/gaming.png)
