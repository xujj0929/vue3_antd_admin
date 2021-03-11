<template>
	<a-layout>
		<a-layout-sider v-model:collapsed="collapsed">
			<router-link to="/" class="logo">
				<img src="~@/assets/logo.png" alt="" />
				<span :hidden="collapsed">业务管理系统</span>
			</router-link>
			<a-menu
				mode="inline"
				theme="dark"
				:inline-collapsed="collapsed"
				v-model:openKeys="openKeys"
				v-model:selectedKeys="selectedKeys"
			>
				<a-sub-menu key="Home">
					<template #title>
						<span>
							<fa-icon fa="indent" color="#fff" />
							<span>菜单</span>
						</span>
					</template>
					<a-menu-item key="1">
						<fa-icon fa="indent" color="#fff" />
						<span>子菜单 1</span>
					</a-menu-item>
					<a-menu-item key="2">
						<fa-icon fa="indent" color="#fff" />
						<span>子菜单 2</span>
					</a-menu-item>
				</a-sub-menu>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header>
				<a-button type="link" @click="toggleCollapsed">
					<fa-icon fa="indent" v-if="collapsed" />
					<fa-icon fa="outdent" v-else />
				</a-button>
				<a-menu v-model:selectedKeys="current" mode="horizontal">
					<a-menu-item key="Home">
						<router-link to="/">Home</router-link>
					</a-menu-item>
				</a-menu>
				<a-dropdown>
					<a class="ant-dropdown-link" @click.prevent>
						{{ userInfo.name }}
					</a>
					<template #overlay>
						<a-menu>
							<a-menu-item>
								<a href="javascript:;">修改资料</a>
							</a-menu-item>
							<a-menu-item>
								<router-link to="login">登出</router-link>
							</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
			</a-layout-header>
			<a-layout-content>
				<router-view />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';
import store from '@/store';
export default defineComponent({
	name: 'Home',
	setup() {
		const userInfo = store.getters.user;
		const state = reactive({
			collapsed: false,
			current: ['Home'],
			openKeys: ['Home'],
			preOpenKeys: ['Home'],
			selectedKeys: ['1'],
		});
		watch(
			() => state.openKeys,
			(val, oldVal) => {
				state.preOpenKeys = oldVal;
			}
		);
		const toggleCollapsed = () => {
			state.collapsed = !state.collapsed;
			state.openKeys = state.collapsed ? [] : state.preOpenKeys;
		};
		return {
			userInfo,
			...toRefs(state),
			toggleCollapsed,
		};
	},
});
</script>

<style lang="less" scoped>
.ant-layout {
	.ant-layout-header {
		display: flex;
		align-items: center;
		height: 64px;
		padding: 0;
		background: #fff;
		> .ant-btn {
			margin: 0 10px;
		}
		.ant-menu-horizontal {
			flex: 1;
			.ant-menu-item {
				text-align: center;
				line-height: 64px;
			}
		}
		.ant-dropdown-link {
			padding: 0 20px;
		}
	}
	.ant-layout-sider {
		.logo {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 64px;
			line-height: 64px;
			width: 100%;
			text-align: center;
			span {
				font-size: 16px;
				color: #fff;
				margin-left: 20px;
				white-space: nowrap;
			}
			img {
				width: 40px;
				height: 40px;
			}
		}
		ul {
			height: calc(100% - 70px);
			overflow-y: auto;
		}
		ul::-webkit-scrollbar {
			width: 0;
		}
	}
	.ant-layout-content {
		padding: 10px;
		border-radius: 10px;
	}
}
</style>
