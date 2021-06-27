<template>
	<div class="recipe">
		<el-tabs v-model="activeName" type="border-card">
			<el-tab-pane
				:name="'cuisine' + item"
				:label="'菜系' + item"
				v-for="item in 3"
				:key="item"
			>
				<div class="recipe-link">
					<router-link :to="{}" class="active"> 分类1 </router-link>
					<router-link :to="{}"> 分类2 </router-link>
					<router-link :to="{}"> 分类3 </router-link>
				</div>
			</el-tab-pane>
		</el-tabs>
		<h2>家常好味道，给你家一般的温暖</h2>
		<el-container>
			<el-aside width="220px" class="recipe-aside">
				<div class="filter-box">
					<h4>筛选</h4>
					<el-collapse v-model="name">
						<el-collapse-item
							:title="'筛选项' + item"
							v-for="item in 3"
							:key="item"
						>
							<div class="filter-tags">
								<el-tag type="info"></el-tag>
							</div>
						</el-collapse-item>
					</el-collapse>
				</div>
			</el-aside>
			<el-main class="filter-menus-box">
				<MenuCard style="min-height: 75%"></MenuCard>
				<div class="pagination">
					<el-pagination
						style="display: inline-block"
						:page-size="10"
						layout="total, prev, pager, next"
						:total="50"
					>
					</el-pagination>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import MenuCard from "@/components/menu-card.vue";
	export default {
		name: "recipe",
		data() {
			return {
				activeName: "cuisine1",
        name: ''
			};
		},
		components: {
			MenuCard,
		},
	};
</script>

<style lang="scss" scoped>
	.recipe-link {
		font-size: 0;
		margin-top: 5px;

		a {
			display: inline-block;
			font-size: 12px;
			padding: 0 8px;
			height: 28px;
			line-height: 28px;
		}

		.active {
			background-color: #ff3232;
			color: #fff;
		}
	}

	.recipe {
		h2 {
			text-align: center;
			line-height: 150px;
		}

		.el-main {
			padding: 0;
		}

		.filter-box {
			background-color: #fff;
			padding: 10px 10px 0;
			width: 100%;
			float: left;
			box-sizing: border-box;

			h4 {
				margin-bottom: 10px;
			}
		}
	}

	.filter-tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		.tag-selected {
			background-color: #ff3232;
			color: #fff;
		}
	}

	.menu-empty {
		width: 100%;
		text-align: center;
		font-size: 20px;
	}

	.pagination {
		text-align: right;
	}
</style>