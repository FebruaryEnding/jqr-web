<template>
    <div class="fillcontain">
        <div class="contain" ref="contain">
            <div class="errPage-container cflex wflex">
                <!--<img class="errorImg" :src="errorImg" />-->
                <el-button type="primary" @click="open" ><div v-text="butInfo" ></div></el-button>
                <p class="errorTitle">{{wsInfo}}</p>
                <p class="errorTro">后续功能开发中,敬请期待</p>
                <el-button type="primary" @click="loginOut" >登出</el-button>

            </div>
        </div>
    </div>
</template>

<script>
    import * as mutils from '@/utils/mUtils'
    import store from "@/store";

    export default {
        data() {
            return {
                butInfo: '开启监听',
                wsInfo: '监听未开启',
                ws : null
            }
        },
        mounted(){
//            mutils.setContentHeight(this,this.$refs.contain,250);
        },


        methods: {
            loginOut(){
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({path:'/jqr/login'})
                })
            },
            open(){
              if(this.butInfo == "开启监听") {
                  this.ws = this.StartWebSocket("ws://127.0.0.1:6700/event");
                  this.butInfo = "关闭监听";
                  this.wsInfo ="监听已经开启，请勿关闭页面";
              }else {
                  this.closeWs(this.ws);
                  this.butInfo = "开启监听";
                  this.wsInfo ="监听未开启";
              }
            },
            closeWs(ws){
                ws = null;
            },
            StartWebSocket(wsUri){
                var websocket = new WebSocket(wsUri);
                websocket.onopen = function (evt) {
                    websocket.open();
                    console.log("开启ws");
                    console.log(evt);
                };
                websocket.onclose = function (evt) {
                    websocket.close();
                    console.log("关闭ws");
                    console.log(evt);
                };
                websocket.onmessage = function (evt) {
                    var data = evt.data;
                    console.log("data" + data);
                    var dataObject = JSON.parse(data);
                    console.log(dataObject);
                    var message = dataObject.message;
                    console.log("message" + message);
                    var reg = new RegExp("(￥[^￥]+￥)");
                    var result = message.match(reg);
                    var result0 = result[0];
                    console.log("resukt0" + result[0]);
                    console.log(result[0]);
                    if (result[0] != undefined) {
                        axios({
                            type: "GET",
                            url: "http://118.25.88.251:7777/jqr/api/tkl/" + result[0]
                        })
                            .then(function (response) {
                                console.log("返回信息");
                                console.log(response.data.data);
                                window.open(response.data.data);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                };
                websocket.onerror = function (evt) {
                    console.log(evt);
                };
                return websocket;
            }
        }
    }
</script>

<style lang="less" scoped>
    .contain{
        display: flex;
        justify-content: center;
        padding: 20px;
        .errPage-container {
            align-items: center;
            p{
                line-height: 30px;
            }
            .errorImg{
                width:286px;
                height: 325px;
                margin-bottom: 10px;
            }
            .errorTitle{
                color: rgba(0,0,0,.85);
                font-size: 24px;
            }
            .errorTro{
                color: rgba(0,0,0,.45);
                font-size: 14px;
            }
            a{
                text-decoration: underline;
            }
            .rows{
                height: 100%;
                .el-col{
                    text-align: center;
                    height: 100%;
                }
                .title{
                    font-size: 170px;
                    line-height: 1.2;
                    color: #a9d86e;
                }
                .neirongItem{
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    .tip{
                        font-size: 30px;
                        font-weight: bold;
                        text-align: left;
                    }
                    .neirong{
                        font-size: 20px;
                        text-align: left;
                    }
                }
            }
            .home{
                text-align: center;
            }
            .router-link-active:hover{
                color:#a9d86e;
                text-decoration: underline;
            }
        }
    }

</style>
