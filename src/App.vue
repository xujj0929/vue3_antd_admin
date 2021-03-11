<template>
	<a-layout>
		<a-layout-content>
			<a-config-provider :locale="locale"> <router-view /> </a-config-provider
		></a-layout-content>
		<a-layout-footer>
			<a-breadcrumb separator="|">
				<a-breadcrumb-item></a-breadcrumb-item>
				<a-breadcrumb-item>{{ env.VUE_APP_TITLE }}</a-breadcrumb-item>
				<a-breadcrumb-item>{{ env.VUE_APP_VERSION }}</a-breadcrumb-item>
				<a-breadcrumb-item></a-breadcrumb-item>
			</a-breadcrumb>
		</a-layout-footer>
	</a-layout>
</template>
<script>
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default defineComponent({
	name: 'Home',
	setup() {
		return {
			env: process.env,
			locale: zhCN,
		};
	},
});
</script>

<style lang="less" scoped>
#app,
.ant-layout {
	height: 100%;
	background: rgba(255, 255, 255, 1);
	footer {
		padding: 5px;
	}
}
</style>
