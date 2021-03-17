/**
 * 全局axios封装,每个请求都继承,默认导出AjaxRequest的实例
 *      @CLass AjaxRequest
 *      @Attribute queue 记录每次请求的次数,针对多次请求只执行一次.Loading时候可用
 *      @function  _merge 合并类和每个实例传递进来的参数
 *      @function  _setInterceptor 全局请求拦截
 *      @Function  对外暴露的方法,供实例调用
 *
 * Auth: Jie
 * Date: 2020-07-07
 */

import axios from "axios";
import router from "../router"
import store from "@/store/index"
import { Toast } from "vant"

class AjaxRequest {
    constructor() {
        this.baseURL =
            process.env.NODE_ENV === "development"
                ? "https://development.com"
                : "https://production.com";
        this.timeout = 5000;
        this.queue = {};
    }

    _merge(options) {
        return { ...options, baseURL: this.baseURL, timeout: this.timeout };
    }

    _setInterceptor(instance, url) {
        instance.interceptors.request.use(
            config => {
                if (!config.headers["Content-Type"]) {
                    config.headers["Content-Type"] = "application/json";
                }
                if (Object.keys(this.queue).length === 0) {
                   
                }
                // token处理
                const token = store.state.token
                token && (config.headers.Authorization = token)
                // 将每一次请求添加到队列,防止重复请求
                this.queue[url] = url;

                return config;
            },
            error => {
                return Promise.error(error)
            }
        );
        instance.interceptors.response.use(
            res => {
                // 从队列中删除请求
                delete this.queue[url];
                if (Object.keys(this.queue).length === 0) {
                    
                }

                if (res.status === 200) {
                    return Promise.resolve(res.data)
                } else {
                    return Promise.reject(res)
                }
            },
            error => {
                // 对失败情况进行判断
                if (error.response.status) {
                    switch (error.response.status) {
                        // 401 未登录
                        case 401:
                            router.replace({
                                path: '/login',
                                query: {
                                    redirect: router.currentRoute.fullPath
                                }
                            })
                            break;
                        // 403
                        case 403: // token过期
                            Toast({
                                message: "登录过期,请重新登录",
                                duration: 1000,
                                forbidClick: true
                            });
                            // 清除token
                            localStorage.removeItem('token')
                            store.commit('loginSuccess', null)
                            // 跳转登录页面,并将要浏览的页面fullPath传过去,登录成功后跳转需要访问的页面
                            setTimeout(() => {
                                router.replace({
                                    path: '/login',
                                    query: {
                                        redirect: router.currentRoute.fullPath
                                    }
                                })
                            }, 1000)
                            break;
                        case 404: //请求不存在
                            Toast({
                                message: "网络请求不存在",
                                duration: 1500,
                                forbidClick: true
                            });
                            break;
                        // 其他错误直接抛出提示
                        default:
                            Toast({
                                message: error.response.data.message,
                                duration: 1500,
                                forbidClick: true
                            })
                    }
                    return Promise.reject(error.response)
                }
            }
        );
    }

    request(options) {
        const instance = axios.create();
        this._setInterceptor(instance, options.url);
        let config = this._merge(options);
        return instance(config);
    }
}

export default new AjaxRequest();
