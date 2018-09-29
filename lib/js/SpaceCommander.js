// var ctx = canvas.getContext("2d");
// var gl = canvas.getContext("webgl");
// 特殊坐标：
let app=new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
document.body.appendChild(app.view);
canvas = document.getElementsByTagName("canvas");
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
// $(document).on('touchmove', function (e) {
//     e.preventDefault();
// });
window.onresize = resizeCanvas
resizeCanvas()
function SpaceCommander() {
    window.requestAnimationFrame(loop);
}
function loop() {
}
