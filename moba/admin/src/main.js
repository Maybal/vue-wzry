import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import './style.css'

import axios from "axios";
const http = axios.create({
    baseURL:process.env.VUE_APP_API_URL || '/admin/api'
    // baseURL: "http://localhost:3000/admin/api"
});

http.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        Vue.prototype.$message({
            type: "error",
            message: err.response.data.message
        });
        if (err.response.status === 401) {
            router.push("/login");
        }
        return Promise.reject(err);
    }
);

http.interceptors.request.use(
    config => {
        if (localStorage.token) {
            config.headers.Authorization =
                "Bearer " + (localStorage.token || "");
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

Vue.prototype.$http = http;

Vue.mixin({
    methods: {
        getAuthorization() {
            return { Authorization: `Bearer ${localStorage.token || ""}` };
        }
    }
});

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
