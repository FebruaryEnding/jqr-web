// let wsConnection = {
//     $ws: null,
//     lockReturn: false,
//     timeout: 5 * 1000,
//     timeoutObj: null,
//     timeoutNum: null,
//     serverTimeoutObj: null,
//     //初始化webSocket长连接
//     initWebSocket: function () {
//         this.$ws = new WebSocket("ws://127.0.0.1:6700/event");//写入地址 这里的地址可以在initWebSocket方法加入参数
//         this.$ws.onopen = this.wsOpen;
//         this.$ws.onclose = this.wsClose;
//         this.$ws.onmessage = this.wsMsg;
//         this.$ws.onerror = this.wsError;
//     },
//     //打开websocket
//     wsOpen: function (e) {
//         //开始websocket心跳
//         wsConnection.startWsHeartbeat();
//         console.log('ws success')
//     },
//     wsClose: function (e) {
//         console.log(e, 'ws close')
//     },
//     wsMsg: function (msg) {
//         //每次接收到服务端消息后 重置websocket心跳
//         console.log(msg);
//         wsConnection.resetHeartbeat();
//         //服务端发送来的消息存到vuex
//         // store.commit('web_socket_msg', msg)
//     },
//     wsError: function (err) {
//         console.log(err, 'ws error');
//         wsConnection.reconnect()
//     },
//     //重启websocket
//     reconnect: function () {
//         let _this = this;
//         if (_this.lockReturn) {
//             return;
//         }
//         _this.lockReturn = true;
//         _this.timeoutNum && clearTimeout(_this.timeoutNum);
//         _this.timeoutNum = setTimeout(function () {
//             _this.initWebSocket();
//             _this.lockReturn = false;
//         }, 3000);
//     },
//     startWsHeartbeat: function () {
//         // console.log("try ping");
//         // let _this = this;
//         //
//         // _this.timeoutObj && clearTimeout(_this.timeoutObj);
//         // _this.serverTimeoutObj && clearTimeout(_this.serverTimeoutObj);
//         // _this.timeoutObj = setInterval(function () {
//         //     //判断websocket当前状态
//         //     if (_this.$ws.readyState != 1) {
//         //
//         //         console.log("reconnect")
//         //         _this.reconnect()
//         //     }else {
//         //         _this.$ws.send("ping");
//         //     }
//         // }, _this.timeout);
//         var self = this;
//         this.timeoutObj = setTimeout(function() {
//             //这里发送一个心跳，后端收到后，返回一个心跳消息，
//             //onmessage拿到返回的心跳就说明连接正常
//             self.$ws.send("ping");
//             console.log("ping!");
//             self.serverTimeoutObj = setTimeout(function() {
//                 //如果超过一定时间还没重置，说明后端主动断开了
//                 console.log("try=close");
//                 // self.$ws.close();
//                 //这里为什么要在send检测消息后，倒计时执行这个代码呢，因为这个代码的目的时为了触发onclose方法，这样才能实现onclose里面的重连方法 //所以这个代码也很重要，没有这个方法，有些时候发了定时检测消息给后端，后端超时（我们自己设定的时间）后，不会自动触发onclose方法。我们只有执行ws.close()代码，让ws触发onclose方法 //的执行。如果没有这个代码，连接没有断线的情况下而后端没有正常检测响应，那么浏览器时不会自动超时关闭的（比如谷歌浏览器）,谷歌浏览器会自动触发onclose //是在断网的情况下，在没有断线的情况下，也就是后端响应不正常的情况下，浏览器不会自动触发onclose，所以需要我们自己设定超时自动触发onclose，这也是这个代码的 //的作用。
//             }, self.timeout);
//         }, this.timeout);
//     },
//     //重置websocket心跳
//     resetHeartbeat: function () {
//         let _this = this;
//         clearTimeout(_this.timeoutObj);
//         clearTimeout(_this.serverTimeoutObj);
//         _this.startWsHeartbeat()
//     }
// };
//
// //抛出websocket对象
// export default wsConnection