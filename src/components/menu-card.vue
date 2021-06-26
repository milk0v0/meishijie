<template>
	<el-row class="menu-card" type="flex" justify="start">
		<el-col
			v-for="item in 5"
			:key="item"
			:style="{
				'margin-left': marginLeft + 'px',
			}"
		>
			<el-card :body-style="{ padding: '0px' }">
				<router-link to="">
					<img class="image" />
					<div class="menu-card-detail">
						<strong>菜品名称</strong>
						<span>0 评论</span>
						<router-link to="" tag="em"> 作者 </router-link>
					</div>
				</router-link>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: "MenuCard",
		props: {
			marginLeft: {
				type: Number,
				default: 12,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.menu-card {
		flex-wrap: wrap;

		.image {
			width: 232px;
			height: 232px;
		}

		.el-col-24 {
			width: auto;
			margin-bottom: 20px;
			margin-left: 22px;
		}

		.menu-card-detail {
			padding: 14px;

			> * {
				display: block;
			}

			strong {
				height: 24px;
				line-height: 24px;
				font-size: 14px;
				font-weight: bold;
				color: #333;
			}

			span {
				height: 26px;
				line-height: 26px;
				font-size: 12px;
				color: #999;
			}

			em {
				height: 23px;
				line-height: 23px;
				font-size: 12px;
				color: #ff3232;
			}
		}
	}
</style>