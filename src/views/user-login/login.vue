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
	import { mapMutations } from "vuex";
	import { login, userInfo } from "@/service/api";
	export default {
		name: "loginSection",
		data() {
			return {
				ruleForm: {
					name: "",
					password: "",
				},
				rules: {
					name: { required: true, message: "请输入用户名", trigger: "blur" },
					password: { required: true, message: "请输入密码", trigger: "blur" },
				},
			};
		},
		methods: {
			...mapMutations(["changeUserInfo"]),
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						login(this.ruleForm).then((res1) => {
							if (res1.code === 400) {
								this.$message.error(res1.mes);
							} else {
								localStorage.setItem("token", res1.data.token);
								userInfo().then((res2) => {
									if (res2.error === 400) {
										localStorage.removeItem("token");
										this.changeUserInfo({});
										this.$message.error(res2.mes);
									} else {
										this.changeUserInfo(res2.data);
										this.$router.replace({ name: "home" });
									}
								});
							}
						});
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
		padding: 0 20px;
	}
</style>