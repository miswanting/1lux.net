var ctx = canvas.getContext("2d");
var viewPortWidth = 800
var viewPortHeight = 600
var tileLength = 50
var flag_worker = false

var tileTable = new Array()

// 特殊坐标：
var cx = tileLength / 2
var cy = tileLength / 2

var lastStartTileForTrunkX = 0
var lastStartTileForTrunkY = 0
var mapTrunk = document.createElement('canvas')
var ctx_mapTrunk = mapTrunk.getContext('2d')
// var gl = canvas.getContext("webgl");
// if (!gl) {
//     alert("Unable to initialize WebGL. Your browser or machine may not support it.");
// }
// gl.clearColor(255, 255, 255, 0);
// gl.clear(gl.COLOR_BUFFER_BIT);

function TextSandboxGame() {
    window.requestAnimationFrame(gameLoop);
}

function HPosToVPos(h) {
    vx = cx - canvas.width / 2 + h[0]
    vy = cy - canvas.height / 2 + h[1]
    return [vx, vy]
}

function VPosToHPos(v) {
    hx = v[0] + canvas.width / 2 - cx
    hy = v[1] + canvas.height / 2 - cy
    return [hx, hy]
}

function gameLoop() {
    // 游戏运算
    cx++
    cy++
    // 渲染计算
    tileCountH = Math.floor(viewPortWidth / tileLength) + 2
    tileCountV = Math.floor(viewPortHeight / tileLength) + 2
    startTileForTrunkX = Math.floor((cx - viewPortWidth / 2) / tileLength)
    startTileForTrunkY = Math.floor((cy - viewPortHeight / 2) / tileLength)
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清屏
    if (!(startTileForTrunkX == lastStartTileForTrunkX && startTileForTrunkY == lastStartTileForTrunkY)) {
        // 刷新地图块
        lastStartTileForTrunkX = startTileForTrunkX
        lastStartTileForTrunkY = startTileForTrunkY
        mapTrunk.width = tileCountH * tileLength
        mapTrunk.height = tileCountV * tileLength
        var tileCountH = Math.floor(viewPortWidth / tileLength) + 2
        var tileCountV = Math.floor(viewPortHeight / tileLength) + 2
        if (tileTable.length == 0) {
            for (let i = startTileForTrunkX; i < startTileForTrunkX + tileCountH; i++) {
                var newTileRow = new Array()
                for (let j = startTileForTrunkY; j < startTileForTrunkY + tileCountV; j++) {
                    var tile = document.createElement('canvas')
                    tile.width = tileLength
                    tile.height = tileLength
                    var ctx_tile = tile.getContext('2d')
                    if (i == 0 && j == 0) {
                        ctx_tile.fillStyle = 'rgb(255, 255, 250)';
                    } else if (i == 0 || j == 0) {
                        ctx_tile.fillStyle = 'rgb(200, 200, 200)';
                    } else {
                        ctx_tile.fillStyle = 'rgb(255, 255, 250)';
                    }
                    ctx_tile.fillRect(0, 0, tileLength, tileLength);
                    ctx_tile.strokeStyle = 'rgb(0, 0, 0)';
                    ctx_tile.strokeRect(0, 0, tileLength, tileLength);
                    ctx_tile.fillStyle = 'rgb(0, 0, 0)';
                    ctx_tile.textBaseline = 'top';
                    ctx_tile.fillText(i + 'x' + j, 0, 0)
                    ctx_mapTrunk.drawImage(tile, (i - startTileForTrunkX) * tileLength, (j - startTileForTrunkY) * tileLength);
                    newTileRow.push(tile)
                }
                tileTable.push(tile)
            }
        } else {
            var newTileTable = new Array()
            var dX = startTileForTrunkX - lastStartTileForTrunkX
            var dY = startTileForTrunkY - lastStartTileForTrunkY
            for (let i = startTileForTrunkX; i < startTileForTrunkX + tileCountH; i++) {
                var newTileRow = new Array()
                for (let j = startTileForTrunkY; j < startTileForTrunkY + tileCountV; j++) {
                    if (0 <= i + dX && i + dX <= tileCountH && 0 <= j + dY && j + dY <= tileCountV) {
                        newTileRow.push(tileTable[i + dX][j + dY])
                        console.log(tileTable, tileTable[i + dX][j + dY], dX, dY);
                        ctx_mapTrunk.drawImage(tileTable[i + dX][j + dY], (i - startTileForTrunkX) * tileLength, (j - startTileForTrunkY) * tileLength);
                    } else {
                        var tile = document.createElement('canvas')
                        tile.width = tileLength
                        tile.height = tileLength
                        var ctx_tile = tile.getContext('2d')
                        if (i == 0 && j == 0) {
                            ctx_tile.fillStyle = 'rgb(255, 255, 250)';
                        } else if (i == 0 || j == 0) {
                            ctx_tile.fillStyle = 'rgb(200, 200, 200)';
                        } else {
                            ctx_tile.fillStyle = 'rgb(255, 255, 250)';
                        }
                        ctx_tile.fillRect(0, 0, tileLength, tileLength);
                        ctx_tile.strokeStyle = 'rgb(0, 0, 0)';
                        ctx_tile.strokeRect(0, 0, tileLength, tileLength);
                        ctx_tile.fillStyle = 'rgb(0, 0, 0)';
                        ctx_tile.textBaseline = 'top';
                        ctx_tile.fillText(i + 'x' + j, 0, 0)
                        newTileRow.push(tile)
                        ctx_mapTrunk.drawImage(tile, (i - startTileForTrunkX) * tileLength, (j - startTileForTrunkY) * tileLength);
                    }

                }
                newTileTable.push(tile)
            }
            tileTable = newTileTable
        }
    }
    // 影子
    ctx.drawImage(mapTrunk, canvas.width / 2 - cx + Math.floor((cx - viewPortWidth / 2) / tileLength) * tileLength,
        canvas.height / 2 - cy + Math.floor((cy - viewPortHeight / 2) / tileLength) * tileLength);
    ctx.beginPath();
    var hx = VPosToHPos([cx, cy])[0]
    var hy = VPosToHPos([cx, cy])[1]
    console.log(hx, hy);

    ctx.save();
    ctx.scale(1, 0.6);
    ctx.translate(hx, hy / 0.6);
    ctx.arc(0, 0, 10, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.restore();

    // 遮罩
    ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, (canvas.height - viewPortHeight) / 2);
    // ctx.fillRect(0, (canvas.height + viewPortHeight) / 2, canvas.width, (canvas.height - viewPortHeight) / 2);
    // ctx.fillRect(0, 0, (canvas.width - viewPortWidth) / 2, canvas.height);
    // ctx.fillRect((canvas.width + viewPortWidth) / 2, 0, (canvas.width - viewPortWidth) / 2, canvas.height);

    window.requestAnimationFrame(gameLoop);
}
