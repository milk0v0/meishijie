<template>
	<div class="stuff">
		<div class="clearfix">
			<div class="raw-item" v-for="(item, index) in value" :key="item.id">
				<el-input
					placeholder="请输入内容"
					style="width: 200px"
					v-model="item.name"
				></el-input>
				<el-input
					placeholder="请输入内容"
					style="width: 100px"
					v-model="item.specs"
				></el-input>
				<i
					class="delete-icon el-icon-close"
					v-if="value.length > 1"
					@click="handleRemove(index)"
				></i>
			</div>
		</div>
		<el-button
			class="eaeaea"
			type="primary"
			size="medium"
			icon="el-icon-plus"
			@click="handleAdd"
			>增加一项</el-button
		>
	</div>
</template>

<script>
	export default {
		name: "stuff",
		props: {
			value: {
				type: Array,
				default: () => [],
			},
		},
		methods: {
			handleAdd() {
				this.$emit("input", [
					...this.value,
					{ name: "", specs: "", id: Date.now() },
				]);
			},
			handleRemove(index) {
				const arr = [...this.value];
				arr.splice(index, 1);
				this.$emit("input", arr);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.delete-icon {
		background-color: #ccc;
		border-radius: 50%;
		color: #fff;

		:hover {
			background: #ff3232;
			color: #fff;
		}
	}

	.raw-item {
		float: left;
		margin-right: 65px;
		margin-bottom: 20px;

		.el-input {
			margin-right: 5px;
		}
	}
</style>