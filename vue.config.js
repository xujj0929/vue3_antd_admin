const path = require('path');
const resolve = (dir) => {
	return path.join(__dirname, dir);
};

// vue.config.js
const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
	css: [
		'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
		'https://cdn.jsdelivr.net/npm/ant-design-vue@2.0.1/dist/antd.min.css',
	],
	js: [
		'https://cdn.jsdelivr.net/npm/vue@3.0.7/dist/vue.global.min.js',
		'https://cdn.jsdelivr.net/npm/vuex@4.0.0/dist/vuex.global.min.js',
		'https://cdn.jsdelivr.net/npm/vue-router@4.0.4/dist/vue-router.global.min.js',
		'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
		'https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js',
		'https://cdn.jsdelivr.net/npm/moment@2.29.1/locale/zh-cn.min.js',
		'https://cdn.jsdelivr.net/npm/ant-design-vue@2.0.1/dist/antd.js',
		'https://cdn.jsdelivr.net/npm/mockjs@1.1.0/dist/mock.min.js',
	],
};
module.exports = {
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@assets', resolve('src/assets'))
			.set('@page', resolve('src/views'))
			.set('@api', resolve('src/api'))
			.set('@form', resolve('src/components/form'));
		if (isProduction) {
			config.plugins.delete('prefetch');
			// config
			// 	.plugin('webpack-bundle-analyzer')
			// 	.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
			// 	.end();
		} else {
			cdn.js = [];
		}
		config.plugin('html').tap((args) => {
			args[0].title = process.env.VUE_APP_TITLE;
			args[0].cdn = cdn;
			return args;
		});
	},
	configureWebpack: (config) => {
		config.optimization.minimizer[0].options.terserOptions.compress.drop_console = isProduction;
		if (isProduction) {
			config.externals = {
				vue: 'Vue',
				vuex: 'Vuex',
				'vue-router': 'VueRouter',
				axios: 'axios',
				'ant-design-vue': 'antd',
				mockjs: 'Mock',
			};
		}
	},
	productionSourceMap: false,
};
