<template>
	<div class="login-section">
		<el-form label-position="top" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="name">
				<el-input type="text"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password1">
				<el-input type="password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="password2">
				<el-input type="password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">提交</el-button>
				<el-button>重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'loginSection'
	};
</script>

<style lang="scss" scoped>
	.login-section {
		padding: 0px 20px;
	}
</style>