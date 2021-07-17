<template>
	<div class="login-page">
		<el-tabs
			v-model="activeName"
			type="card"
			@tab-click="handleTab"
		>
			<el-tab-pane label="登录" name="login">
				<Login></Login>
			</el-tab-pane>
			<el-tab-pane label="注册" name="second">
				<Register></Register>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import Login from "./login";
	import Register from "./register";
	export default {
		name: "login",
		components: {
			Login,
			Register,
		},
		watch: {
			'$route'() {
				this.activeName = this.$route.query.activeName
			}
		},
		data() {
			return {
				activeName: this.$route.query.activeName
			}
		},
		methods: {
			handleTab() {
				if(this.activeName === this.$route.query.activeName) return
				this.$router.push({ name: "login", query: { activeName: this.activeName } });
			},
		},
	};
</script>

<style lang="scss" scoped>
	.login-page {
		width: 500px;
		background-color: #fff;
		margin: 0 auto;
		box-shadow: 0 0 25px #cac6c6;
		border-radius: 10px;
	}
</style>