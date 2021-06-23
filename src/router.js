import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Product from './components/product/Product.vue'
import Admin from './components/admin/Admin.vue'
import addProduct from './components/product/addProduct.vue'
Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home', component: Home,
            redirect: '/welcome',
            children: [{
                path: '/welcome', component: Welcome
            }, {
                path: '/product', component: Product
            }, {
                path: '/admin', component: Admin
            }, {
                path: '/addProduct', component: addProduct
            }]
        }
    ]
})

//挂载导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        return next();
    }
    //获取token
    const token = window.sessionStorage.getItem("token");
    if (!token) return next('/login')
    next();
})

export default router