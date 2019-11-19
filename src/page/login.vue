<template>
    <div class="login_page">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class='titleArea rflex'>
                    <img class="logo" :src="logo" alt="小爱admin">
                    <span class='title'>天笙<i>网络</i></span>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
                    <el-form-item prop="username" class="login-item">
                        <span class="loginTips"><i class="el-icon-user"></i></span>
                        <el-input @keyup.enter.native="submitForm('loginForm')" class="area" type="text"
                                  placeholder="用户名" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="login-item">
                        <span class="loginTips"><icon-svg icon-class="iconLock"/></span>
                        <el-input @keyup.enter.native="submitForm('loginForm')" class="area" type="password"
                                  placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login('loginForm')" class="submit_btn">登录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="regist()" class="submit_btn">注册</el-button>
                    </el-form-item>

                    <div class="sanFangArea">
                        <p class="title">第三方账号登录</p>
                        <ul class="rflex">
                            <li @click="loginByWechat">
                                <icon-svg icon-class="iconwechat"/>
                            </li>
                            <li>
                                <icon-svg icon-class="iconweibo"/>
                            </li>
                            <li>
                                <icon-svg icon-class="iconGithub"/>
                            </li>
                        </ul>
                    </div>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    import logoImg from "@/assets/img/logo.png";
    import {login} from "@/api/user";
    import {setToken} from '@/utils/auth'
    //    import ws from '@/utils/ws'
    import axios from '@/utils/myaxios';
    import message from '@/utils/message'

    export default {
        data() {
            return {
                logo: logoImg,
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                },
                token: 'admin'
            }
        },
        mounted() {
        },
        methods: {
            loginByWechat() {
            },
            showMessage(type, message) {
                this.$message({
                    type: type,
                    message: message
                });
            },
            login(loginForm) {
                let notify = this.$notify;
                let router = this.$router;
                let store = this.$store;
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        let userinfo = this.loginForm;
                        let token = this.token;
//                        let wx = this.StartWebSocket;
                        axios.post('/login', {
                            password: userinfo.password,
                            userName: userinfo.username
                        }).then(function (response) {
                            console.log(response);
                            if (response.data.code == 200) {
//                                wx("ws://127.0.0.1:6700/event");
                                setToken("Token", token);
                                router.push({path: '/'});
                                store.dispatch('initLeftMenu'); //设置左边菜单始终为展开状态
                            }
                            console.log(response);
                        })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                });
            },

            StartWebSocket(wsUri) {
                var websocket = new WebSocket(wsUri);
                websocket.onopen = function (evt) {
                    console.log(evt);
                };
                websocket.onclose = function (evt) {
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
            },
            regist() {
                this.$router.push({path: '/regist'})
                console.log("---")
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_page {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../assets/img/bg9.jpg) no-repeat center center;
        background-size: 100% 100%;
    }

    .form_contianer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        width: 370px;
        border-radius: 5px;
        padding: 25px;
        text-align: center;
        .titleArea {
            justify-content: center;
            align-items: center;
            text-transform: uppercase;
            font-size: 22px;
            width: 100%;
            padding-bottom: 20px;
            .logo {
                width: 40px;
                margin-right: 10px;
            }
            .title {
                i {
                    color: #FF6C60;
                }
            }
        }

        .loginForm {
            .submit_btn {
                width: 100%;
                padding: 13px 0;
                font-size: 16px;
            }
            .loginTips {
                position: absolute;
                left: 10px;
                z-index: 20;
                // color: #FF7C1A;
                font-size: 18px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

    .manage_tip {
        margin-bottom: 20px;
        .title {
            font-family: cursive;
            font-weight: bold;
            font-size: 26px;
            color: #fff;
        }
        .logo {
            width: 60px;
            height: 60px;
        }
    }

    .tiparea {
        text-align: left;
        font-size: 12px;
        color: #4cbb15;
        padding: 10px 0;
        .tip {
            margin-left: 54px;
        }
    }

    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }

    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }

    .loginForm {
        .el-button--primary {
            background-color: #FF7C1A;
            border: 1px solid #FF7C1A;
        }
    }

    .sanFangArea {
        border-top: 1px solid #DCDFE6;
        padding: 10px 0;
        display: none;
        .title {
            font-size: 14px;
            color: #8b9196;
            margin-bottom: 10px;
        }
        ul {
            li {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                .svg-icon {
                    font-size: 24px;
                }
            }
        }
    }
</style>
