import Mock from 'mockjs';

Mock.setup({
	timeout: '200-600',
});

const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
	if (key === './index.js') return;
	for (let [path, target] of Object.entries(files(key).default)) {
		const protocol = path.split('|');
		Mock.mock(protocol[1], protocol[0], target);
	}
});
