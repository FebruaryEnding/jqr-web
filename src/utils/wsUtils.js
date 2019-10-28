// var websock = null;
// var global_callback = null;
// var serverPort = '7777';	//webSocket连接端口
// var lockReconnect = false;
// var timeout = 28 * 1000;//30秒一次心跳
// var timeoutObj = null;//心跳心跳倒计时
//
// var heartCheck = {
//     timeout: 60000,//60s
//     timeoutObj: null,
//     reset: function () {
//         clearInterval(this.timeoutObj);
//         this.start();
//     },
//     start: function () {
//         this.timeoutObj = setInterval(function () {
//             if (websocket.readyState == 1) {
//                 websocket.send("HeartBeat");
//             }
//         }, this.timeout)
//     }
// };
//
// function getWebIP() {
//     var curIP = window.location.hostname;
//     return curIP;
// }
//
// function initWebSocket() { //初始化weosocket
//     //ws地址
//     var wsuri = "ws://127.0.0.1:7777/jqr/webSocket/1234";
//     websock = new WebSocket(wsuri);
//     websock.onmessage = function (e) {
//         websocketonmessage(e);
//     }
//     websock.onclose = function (e) {
//         websocketclose(e);
//     }
//     websock.onopen = function () {
//         websocketOpen();
//     }
//
//     //连接发生错误的回调方法
//     websock.onerror = function () {
//         console.log("WebSocket连接发生错误");
//     }
// }
//
// // 实际调用的方法
// function sendSock(agentData, callback) {
//     global_callback = callback;
//     if (websock.readyState === websock.OPEN) {
//         //若是ws开启状态
//         websocketsend(agentData)
//     } else if (websock.readyState === websock.CONNECTING) {
//         // 若是 正在开启状态，则等待1s后重新调用
//         setTimeout(function () {
//             sendSock(agentData, callback);
//         }, 1000);
//     } else {
//         // 若未开启 ，则等待1s后重新调用
//         setTimeout(function () {
//             sendSock(agentData, callback);
//         }, 1000);
//     }
// }
//
// //数据接收
// function websocketonmessage(e) {
//     // global_callback(JSON.parse(e.data));
//     console.log(e);
//     heartCheck.reset();
//     return e;
// }
//
// //数据发送
// function websocketsend(agentData) {
//     websock.send(JSON.stringify(agentData));
// }
//
// //关闭
// function websocketclose(e) {
//     console.log("connection closed (" + e.code + ")");
// }
//
// function websocketOpen(e) {
//     console.log("连接成功");
//     heartCheck.start();
// }
//
// function reconnect() {//重新连接
//     var that = this;
//     if (that.lockReconnect) {
//         return;
//     }
//     ;
//     that.lockReconnect = true;
//     //没连接上会一直重连，设置延迟避免请求过多
//     that.timeoutnum && clearTimeout(that.timeoutnum);
//     that.timeoutnum = setTimeout(function () {
//         //新连接
//         initWebSocket();
//         that.lockReconnect = false;
//     }, 5000);
// }
//
// initWebSocket();
//
// export {sendSock}