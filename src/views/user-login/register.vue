<template>
	<div class="login-section">
		<el-form
			:rules="rules"
			label-position="top"
			label-width="100px"
			class="demo-ruleForm"
			ref="ruleForm"
			:model="ruleForm"
			:status-icon="true"
		>
			<el-form-item label="用户名" prop="name">
				<el-input v-model="ruleForm.name" type="text"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="ruleForm.password" type="password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input v-model="ruleForm.checkPass" type="password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')"
					>提交</el-button
				>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { register } from "@/service/api";
	export default {
		name: "loginSection",
		data() {
			var validatePass = (rule, value, callback) => {
				if (
					this.ruleForm.checkPass &&
					this.ruleForm.password !== this.ruleForm.checkPass
				) {
					callback(new Error("两次输入密码不一致"));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					name: "",
					password: "",
					checkPass: "",
				},
				rules: {
					name: { required: true, message: "请输入注册用户名", trigger: "blur" },
					password: [{ required: true, message: "请输入密码", trigger: "blur" }],
					checkPass: [
						{ required: true, message: "请再次输入密码", trigger: "blur" },
						{
							validator: validatePass,
							trigger: "blur",
						},
					],
				},
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const res = await register({
							name: this.ruleForm.name,
							password: this.ruleForm.password,
						});
						if (res.code === 0) {
							this.$message({
								message: res.mes,
								type: "success",
							});
						} else {
							this.$message({
								message: res.mes,
								type: "warning",
							});
						}
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.login-section {
		padding: 0px 20px;
	}
</style>