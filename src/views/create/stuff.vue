<template>
	<div class="stuff">
		<div class="clearfix">
			<div class="raw-item">
				<el-input placeholder="请输入内容" style="width: 200px"></el-input>
				<el-input placeholder="请输入内容" style="width: 100px"></el-input>
				<i class="delete-icon el-icon-close"></i>
			</div>
		</div>
		<el-button class="eaeaea" type="primary" size="medium" icon="el-icon-plus"
			>增加一项</el-button
		>
	</div>
</template>

<script>
	export default {
		name: "stuff",
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