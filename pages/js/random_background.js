function randomBackground(){
    var backgrounds = [
        {path:"../img/background1.png",id:0},
        {path:"../img/background2.png",id:1},
        {path:"../img/background3.png",id:2},
        {path:"../img/background4.png",id:3},
        {path:"../img/background5.png",id:4},
        {path:"../img/background6.png",id:5},
        {path:"../img/background7.png",id:6},
        {path:"../img/background8.png",id:7},
        {path:"../img/background9.png",id:8},
        {path:"../img/background10.png",id:9},
        {path:"../img/background11.png",id:10},
        {path:"../img/background12.png",id:11},
        {path:"../img/background13.png",id:12},
        {path:"../img/background14.png",id:13},
        {path:"../img/background15.png",id:14},
        {path:"../img/background16.png",id:15},
        {path:"../img/background17.png",id:16},
        {path:"../img/background18.png",id:17},
        {path:"../img/background19.png",id:18},
        {path:"../img/background20.png",id:19},
    ];
    var num = Math.floor(Math.random() * backgrounds.length);
    var random_background = document.getElementsByClassName("background");
    random_background[0].style.backgroundImage = `url(${backgrounds[num].path})`;
}
randomBackground();