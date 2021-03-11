import { message } from 'ant-design-vue';
import store from '@/store';
import { postUserLogin } from '@api/user';
const loginPath = '/login';
const redirectPath = '/redirect';
const whiteList = [loginPath, redirectPath];

const initAppData = async (toke, next) => {
	console.info('initAppData', toke);
	message.loading({ content: '系统加载中', key: '/userLogin', duration: 0 });
	const res = await postUserLogin({ toke });
	res && store.dispatch('initAppData', res);
	if (!res) return next(loginPath);
	return next();
};

const beforeEach = async (to, from, next) => {
	const { toke, user } = store.getters;
	if (to.path == loginPath) store.dispatch('resetAppData');
	if (whiteList.includes(to.path)) return next();
	if (!toke) return next(loginPath);
	if (toke && !user) return await initAppData(toke, next);
	return next();
};

export { beforeEach };
