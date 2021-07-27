<template>
	<el-header style="height: auto">
		<div class="header">
			<div class="header_c">
				<el-row type="flex" justify="start" align="middle">
					<el-col :span="6">
						<a href="/" class="logo"></a>
					</el-col>
					<el-col :span="10" :offset="2"></el-col>
					<el-col :span="6" :offset="3" class="avatar-box" v-if="isLogin">
						<router-link :to="{ name: 'space' }">
							<el-avatar
								style="vertical-align: middle"
								shape="square"
								size="medium"
								:src="userInfo.avatar"
							></el-avatar>
						</router-link>
						<router-link :to="{ name: 'space' }" class="user-name">{{
							userInfo.name
						}}</router-link>
						<router-link :to="{ name: 'create' }" class="collection"
							>发布菜谱</router-link
						>
						<a href="javascript:;" class="collection" @click="loginOut">退出</a>
					</el-col>
					<el-col :span="6" :offset="3" class="avatar-box" v-else>
						<router-link
							:to="{ name: 'login', query: { activeName: 'login' } }"
							class="user-name"
							>登录</router-link
						>
						<router-link :to="{ name: 'login', query: { activeName: 'second' } }" class="collection"
							>注册</router-link
						>
					</el-col>
				</el-row>
			</div>
			<div class="nav-box">
				<div class="nav_c">
					<Menus></Menus>
				</div>
			</div>
		</div>
	</el-header>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from "vuex";
	import Menus from "@/components/menus";
	import { login_out } from "@/service/api";
	export default {
		name: "headers",
		components: { Menus },
		computed: {
			...mapState(["userInfo"]),
			...mapGetters(["isLogin"]),
		},
		methods: {
			...mapMutations(["changeUserInfo"]),
			loginOut() {
				this.$confirm("您确定要退出吗？", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(async () => {
						const res = await login_out();
						if (res.code === 0) {
							localStorage.removeItem("token");
							this.changeUserInfo({});

							this.$route.name !== "home" &&
								this.$router.replace({ name: "home" });

							this.$message({
								type: "success",
								message: res.mes,
							});
						} else {
							this.$message({
								type: "warning",
								message: res.mes,
							});
						}
					})
					.catch(() => {});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.header {
		height: 129px;
		background-color: #c90000;
		.logo {
			display: block;
			height: 129px;
			width: 184px;
			background: url(https://s1.c.meishij.net/n/images/logo2.png) -15px 9px no-repeat;
		}
	}

	.header_c,
	.nav_c {
		width: 990px;
		margin: 0 auto;
	}

	.nav-box {
		height: 60px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.3);
	}

	.user-name {
		margin-left: 5px;
		color: #fff;
	}

	.collection {
		margin-left: 5px;
		color: #fff;
	}
</style>