<template>
	<el-row class="menu-card" type="flex" justify="start">
		<el-col
			v-for="item in info"
			:key="item._id"
			:style="marginLeft && {
				'margin-left': marginLeft + 'px',
			}"
		>
			<el-card :body-style="{ padding: '0px' }">
				<router-link :to="{ name: 'detail', query: { menuId: item._id } }">
					<img :src="item.product_pic_url" class="image" />
					<div class="menu-card-detail">
						<strong>{{ item.title }}</strong>
						<span>{{ item.comments_len }} 评论</span>
						<router-link
							:to="{ name: 'space', query: { userId: item.userId } }"
							custom
							v-slot="{ navigate }"
						>
							<em @click="navigate"> {{ item.name }} </em>
						</router-link>
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
				default: 0,
			},
			info: {
				type: Array,
				default: () => [],
			},
		}
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