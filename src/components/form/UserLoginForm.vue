<template>
	<a-spin :spinning="spinning">
		<a-form
			ref="formRef"
			:model="formState"
			:rules="formRules"
			:wrapper-col="{ span: 24 }"
		>
			<a-form-item ref="account" name="account">
				<a-input placeholder="请输入账号" v-model:value="formState.account">
					<template #prefix>
						<fa-icon fa="user" color="#999" />
					</template>
				</a-input>
			</a-form-item>
			<a-form-item ref="password" name="password">
				<a-input placeholder="请输入密码" v-model:value="formState.password">
					<template #prefix>
						<fa-icon fa="key" color="#999" />
					</template>
				</a-input>
			</a-form-item>
			<a-form-item>
				<a-button type="primary" htmlType="submit" @click="onSubmit" block
					>提交</a-button
				>
			</a-form-item>
		</a-form>
	</a-spin>
</template>

<script>
import { defineComponent, reactive, ref, toRaw } from 'vue';
import { postUserLogin } from '@api/user';

import store from '@/store';
import router from '@/router';

export default defineComponent({
	name: 'Login',
	setup() {
		const spinning = ref(false);
		const formRef = ref();
		const formState = reactive({ account: '', password: '' });
		const formRules = {
			account: [{ required: true, message: '请输入账号' }],
			password: [{ required: true, message: '请输入密码' }],
		};
		const onSubmit = async () => {
			try {
				await formRef.value.validate();
				spinning.value = true;
				store.dispatch('initAppData', await postUserLogin(toRaw(formState)));
				router.push({ path: '/' });
			} catch (error) {
				spinning.value = false;
			}
		};
		return { spinning, formRef, formState, formRules, onSubmit };
	},
});
</script>

<style lang="less" scoped></style>
