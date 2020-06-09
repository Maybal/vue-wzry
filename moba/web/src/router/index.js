import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import Match from "../views/Match.vue";
import Strategy from "../views/Strategy.vue";
import Article from "../views/Article.vue";
import Hero from "../views/Hero.vue";

Vue.use(VueRouter);

const routes = [
    {
      path:'/',
      redirect:'/home'
    },
    {
        path: "/",
        component: Main,
        children: [
          { path: "/home", component: Home },
          { path: "/article/:id", component: Article, props:true },
          { path: "/match", component: Match },
          { path: "/strategy", component: Strategy }
        ]
    },
    {
      path:'/hero/:id',component:Hero,props:true
    }
];

const router = new VueRouter({
    routes
});

export default router;
