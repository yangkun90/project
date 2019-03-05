/*
mouseenter
mouseover
区别：mouseenter 可以阻止冒泡传递，更加好控制。
1 over父进入子也会触发父的out
    enter。从父进入子没有离开父，不会触发父的leave,只触发子的enter.
2 enter和leave阻止了时间的冒泡传播，而over和out还存在冒泡传播。
所以对于父元素嵌套子元素这种情况，使用over会照成很多不愿意出现的情况，所以我们更多的使用enter更多。

 */