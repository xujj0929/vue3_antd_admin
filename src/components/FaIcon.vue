<template>
	<span class="anticon" :style="{ color }">
		<i :class="faClass"></i>
	</span>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'Home',
	props: {
		fa: { type: String, required: true },
		color: {
			type: String,
			default: '#000',
		},
	},
	setup(props) {
		const faClass = `fa fa-${props.fa}`;
		return {
			faClass,
		};
	},
});
</script>

<style lang="less" scoped></style>
