import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
} from 'vue-router';
import { beforeEach } from './permission';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '@page/Home'),
	},
	{
		path: '/about',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '@page/About'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '@page/Login'),
	},
];

const isProduction = process.env.NODE_ENV === 'production';
const router = createRouter({
	history: isProduction
		? createWebHashHistory()
		: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(beforeEach);

export default router;
