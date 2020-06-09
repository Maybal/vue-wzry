import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CategoryEdit from "../components/CategoryEdit";
import CategoryList from "../components/CategoryList";

import ItemEdit from "../components/ItemEdit";
import ItemList from "../components/ItemList";

import HeroEdit from "../components/HeroEdit";
import HeroList from "../components/HeroList";

import ArticleEdit from "../components/ArticleEdit";
import ArticleList from "../components/ArticleList";

import AdEdit from "../components/AdEdit";
import AdList from "../components/AdList";

import UserEdit from "../components/UserEdit";
import UserList from "../components/UserList";

import Login from "../components/Login";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/categories/create"
    },
    {
        path: "/login",
        component: Login,
        meta: { isPublic:true }
    },
    {
        path: "/",
        component: Home,
        children: [
            { path: "/categories/create", component: CategoryEdit },
            {
                path: "/categories/edit/:id",
                component: CategoryEdit,
                props: true
            },
            { path: "/categories/list", component: CategoryList },

            { path: "/items/create", component: ItemEdit },
            {
                path: "/items/edit/:id",
                component: ItemEdit,
                props: true
            },
            { path: "/items/list", component: ItemList },

            { path: "/heroes/create", component: HeroEdit },
            {
                path: "/heroes/edit/:id",
                component: HeroEdit,
                props: true
            },
            { path: "/heroes/list", component: HeroList },

            { path: "/articles/create", component: ArticleEdit },
            {
                path: "/articles/edit/:id",
                component: ArticleEdit,
                props: true
            },
            { path: "/articles/list", component: ArticleList },

            { path: "/ads/create", component: AdEdit },
            {
                path: "/ads/edit/:id",
                component: AdEdit,
                props: true
            },
            { path: "/ads/list", component: AdList },

            { path: "/users/create", component: UserEdit },
            {
                path: "/users/edit/:id",
                component: UserEdit,
                props: true
            },
            { path: "/users/list", component: UserList }
        ]
    }
];

const router = new VueRouter({
    routes
});

//路由守卫 
router.beforeEach((to,from,next)=>{
    if(!to.meta.isPublic && !localStorage.token){
        return next('/login')
    }
    next()
})
export default router;
