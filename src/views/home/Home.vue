<template>
	<div class="home">
		<el-carousel :interval="5000" type="card" height="300px">
			<el-carousel-item v-for="item in banners" :key="item._id">
				<router-link to="">
					<img :src="item.product_pic_url" width="100%" />
				</router-link>
			</el-carousel-item>
		</el-carousel>
		<div>
			<h2>内容精选</h2>
			<Waterfall>
				<MenuCard :margin-left="13" />
			</Waterfall>
		</div>
	</div>
</template>

<script>
	import MenuCard from "@/components/menu-card";
	import Waterfall from "@/components/waterfall";
	import { getBanner } from "@/service/api";
	export default {
		name: "home",
		components: {
			Waterfall,
			MenuCard,
		},
		data() {
			return {
				banners: [],
			};
		},
		mounted() {
			getBanner().then((data) => {
				this.banners = data.data.list;
			});
		},
	};
</script>

<style lang="scss" scoped>
	.home {
		h2 {
			text-align: center;
			padding: 20px 0;
		}

		.el-carousel__item h3 {
			color: #475669;
			font-size: 14px;
			opacity: 0.75;
			line-height: 200px;
			margin: 0;
		}

		.el-carousel__item:nth-child(2n) {
			background-color: #99a9bf;
		}

		.el-carousel__item:nth-child(2n + 1) {
			background-color: #d3dce6;
		}
	}
</style>