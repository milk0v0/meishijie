<template>
	<div class="home">
		<el-carousel :interval="5000" type="card" height="300px">
			<el-carousel-item v-for="item in banners" :key="item._id">
				<router-link :to="{ name: 'detail', query: { menuId: item.menuId } }">
					<img :src="item.product_pic_url" width="100%" />
				</router-link>
			</el-carousel-item>
		</el-carousel>
		<div>
			<h2>内容精选</h2>
			<Waterfall @arrive="handleArrive">
				<MenuCard :margin-left="13" :info="info" />
			</Waterfall>
		</div>
	</div>
</template>

<script>
	import MenuCard from "@/components/menu-card";
	import Waterfall from "@/components/waterfall";
	import { getBanner, getMenus } from "@/service/api";
	export default {
		name: "home",
		components: {
			Waterfall,
			MenuCard,
		},
		data() {
			return {
				banners: [],
				info: [],
				page: 1,
			};
		},
		methods: {
			handleArrive(cb) {
				getMenus({ page: this.page }).then((data) => {
					const { list, total, page_size } = data.data;
					this.info.push(...list);
					if (total <= page_size * this.page) {
						cb && cb("到底了");
					} else {
						cb && cb();
					}
					this.page++;
				});
			},
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