<template>
	<div id="app">
		<el-container>
			<Header></Header>
			<el-main>
				<div class="main">
					<router-view></router-view>
				</div>
			</el-main>
			<el-footer>
				<div class="footer">Copyright © 2019 - 2019</div>
			</el-footer>
		</el-container>
	</div>
</template>

<script>
	import { mapMutations } from "vuex";
	import { userInfo } from "@/service/api";
	import Header from "@/components/header";
	export default {
		components: { Header },
		methods: {
			...mapMutations(["changeUserInfo"]),
		},
		created() {
			if (localStorage.getItem("token")) {
				userInfo().then((res) => {
					if (res.error === 400) {
						localStorage.removeItem("token");
						this.changeUserInfo({});
					} else {
						this.changeUserInfo(res.data);
					}
				});
			}
		},
	};
</script>

<style lang="scss">
	body {
		background: #fae8c8;
		font-size: 12px;
	}
	.main {
		width: 990px;
		margin: 0 auto;
	}
	.footer {
		text-align: center;
		height: 42px;
		line-height: 42px;
	}
</style>