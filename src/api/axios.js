import axios from 'axios';
import { message as antdMessage } from 'ant-design-vue';

const instance = axios.create({
	baseURL: process.env.VUE_APP_BASEURL,
	timeout: 6000,
});

instance.interceptors.request.use(
	(config) => {
		return config;
	},
	() => Promise.resolve(null)
);

instance.interceptors.response.use(
	(response) => {
		const key = response.config.url;
		if (response.status != 200) return null;
		const { status, success, message, data } = response.data;
		if (!success) return antdMessage.error('网络错误') && null;
		if (!message) antdMessage.destroy();
		switch (status) {
			case 200:
				message && antdMessage.success({ content: message, key });
				console.info(data);
				return data;
			case 401:
				message && antdMessage.warning({ content: message, key });
				return null;
			default:
				message && antdMessage.error({ content: message, key });
				return null;
		}
	},
	() => antdMessage.error('接口错误') && Promise.resolve(null)
);

export default {
	get: (url, data) => instance.get(url, { params: data }),
	post: (url, data) => instance.post(url, data),
	delete: (url, data) => instance.delete(url, { params: data }),
	put: (url, data) => instance.put(url, data),
};
