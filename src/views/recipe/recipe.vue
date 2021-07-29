<template>
	<div class="recipe">
		<el-tabs
			v-model="activeName"
			@tab-click="handleTabClick"
			type="border-card"
		>
			<el-tab-pane
				v-for="item in classify"
				:key="item.parent_type"
				:name="item.parent_type"
				:label="item.parent_name"
			>
				<div class="recipe-link">
					<router-link
						v-for="opt in item.list"
						:key="opt.type"
						:to="{ query: { ...$route.query, classify: opt.type, page: 1 } }"
						:class="{
							active: classifyType === opt.type,
						}"
					>
						{{ opt.name }}
					</router-link>
				</div>
			</el-tab-pane>
		</el-tabs>
		<h2>家常好味道，给你家一般的温暖</h2>
		<el-container>
			<el-aside width="220px" class="recipe-aside">
				<div class="filter-box">
					<h4>筛选</h4>
					<el-collapse v-model="propertyName">
						<el-collapse-item
							v-for="item in properties"
							:key="item.parent_type"
							:title="item.parent_name"
							:name="item.parent_type"
						>
							<div class="filter-tags">
								<el-tag
									type="info"
									v-for="opt in item.list"
									:key="opt.type"
									@click="handleSelectedTag(opt)"
									:class="{
										'tag-selected': propertyType[opt.title] === opt.type,
									}"
									>{{ opt.name }}</el-tag
								>
							</div>
						</el-collapse-item>
					</el-collapse>
				</div>
			</el-aside>
			<el-main class="filter-menus-box">
				<div class="menu-empty" v-show="!list.length && !loading">
					暂时没有过滤出菜谱信息，请选择其他的筛选条件
				</div>
				<MenuCard :info="list"></MenuCard>
				<div class="pagination" v-if="!loading">
					<el-pagination
						style="display: inline-block"
						:page-size="page_size"
						:total="total"
						:current-page="+$route.query.page"
						layout="total, prev, pager, next"
						:hide-on-single-page="true"
						@current-change="handleCurrentChange"
					>
					</el-pagination>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import MenuCard from "@/components/menu-card.vue";
	import { getClassify, getProperty, getMenus } from "@/service/api";
	export default {
		name: "recipe",
		data() {
			return {
				classify: [],
				properties: [],
				activeName: "",
				classifyType: "",
				propertyType: {},
				propertyName: [],
				list: [],
				loading: true,
				total: 0,
				page_size: 0,
			};
		},
		components: {
			MenuCard,
		},
		watch: {
			$route: {
				handler() {
					const { query } = this.$route;
					const { classify } = query;
					this.classifyType = classify;
					classify && (this.activeName = classify[0]);

					this.getMenus();
				},
				immediate: true,
			},
		},
		async mounted() {
			this.classify = (await getClassify()).data;

			const { query } = this.$route;
			const opts = { ...query };
			opts.classify = opts.classify ?? this.classify[0].list[0].type;
			opts.page = opts.page ?? 1;

			(!query.classify || !query.page) && this.$router.push({ query: opts });

			this.properties = (await getProperty()).data;
			this.propertyType = this.properties.reduce((o, item) => {
				if (query[item.title]) {
					o[item.title] = query[item.title];
					this.propertyName.push(query[item.title][0]);
				}
				return o;
			}, {});
		},
		methods: {
			handleSelectedTag(opt) {
				const query = { ...this.$route.query };
				if (this.propertyType[opt.title] === opt.type) {
					this.propertyType[opt.title] = "";
					delete query[opt.title];
				} else {
					this.propertyType[opt.title] = query[opt.title] = opt.type;
				}
				query.page = 1;
				this.$router.push({ query });
			},
			async getMenus() {
				const query = { ...this.$route.query };
				const params = {
					page: query.page,
					classify: query.classify,
				};
				delete query.page;
				delete query.classify;
				if (Object.keys(query).length) {
					params.property = query;
				}

				let handleLoad;
				this.$nextTick(() => {
					handleLoad = this.$loading({
						target: ".filter-menus-box",
						background: "rgba(0,0,0,0)",
					});
				});

				const res = await getMenus(params);
				if (res.code === 0) {
					this.list = res.data.list;
					this.total = res.data.total;
					this.page_size = res.data.page_size;
				} else {
					this.$message.error(res.mes);
				}

				this.loading = false;
				handleLoad && handleLoad.close();
			},
			handleCurrentChange(page) {
				this.$router.push({ query: { ...this.$route.query, page } });
			},
			handleTabClick() {
				const classify = this.classify.find(
					(item) => item.parent_type === this.activeName
				);

				if (!classify) return;
				this.$router.push({
					query: {
						...this.$route.query,
						classify: classify.list[0].type,
					},
				});
			},
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
			min-height: 232px;
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