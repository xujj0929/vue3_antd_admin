<template>
	<a-row type="flex" align="middle" justify="center">
		<a-col
			:xs="{ span: 22 }"
			:sm="{ span: 16 }"
			:md="{ span: 10 }"
			:lg="{ span: 8 }"
			:xl="{ span: 6 }"
			:xxl="{ span: 4 }"
		>
			<UserLoginForm />
		</a-col>
	</a-row>
</template>

<script>
import { defineComponent } from 'vue';
import UserLoginForm from '@form/UserLoginForm';
export default defineComponent({
	name: 'Login',
	components: { UserLoginForm },
});
</script>

<style lang="less" scoped>
.ant-row.ant-row-center.ant-row-middle {
	padding-top: 20vh;
}
</style>
