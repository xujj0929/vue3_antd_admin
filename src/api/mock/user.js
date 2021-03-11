const user = { id: 0, account: 'admin', name: '管理员', sex: 1 };
export default {
	'post|/userLogin': ({ body }) => {
		const { account, password, toke } = JSON.parse(body);
		const loginSuccess = toke || (account == 'admin' && password == '123456');
		const status = loginSuccess ? 200 : 500,
			message = !loginSuccess && '登录失败';
		return {
			status,
			success: true,
			message,
			data: { toke: new Date().getTime(), user },
		};
	},
};
