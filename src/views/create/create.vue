<template>
	<div class="create">
		<h2>欢迎发布新菜谱，先介绍一下你的大作！</h2>
		<div class="create-introduce">
			<h5>标题</h5>
			<el-input
				class="create-input"
				placeholder="请输入内容"
				v-model="backData.title"
			></el-input>
			<h5>属性</h5>
			<div>
				<el-select
					v-for="item in properties"
					v-model="backData.property[item.title]"
					:key="item.parent_type"
					:placeholder="item.parent_name"
				>
					<el-option
						v-for="option in item.list"
						:key="option.type"
						:label="option.name"
						:value="option.type"
					></el-option>
				</el-select>
			</div>
			<h5>菜谱分类</h5>
			<div>
				<el-select v-model="backData.classify" placeholder="请选择菜谱分类">
					<el-option-group
						v-for="group in classifies"
						:key="group.parent_type"
						:label="group.parent_name"
					>
						<el-option
							v-for="item in group.list"
							:key="item.type"
							:label="item.name"
							:value="item.type"
						>
						</el-option>
					</el-option-group>
				</el-select>
			</div>
			<h5>成品图 (328*440)</h5>
			<div class="upload-img-box clearfix">
				<div class="upload-img">
					<UploadImg
						:imgMaxWidth="328"
						action="api/upload?type=product"
						:image-url="backData.product_pic_url"
						@res-url="
							(res) => {
								backData.product_pic_url = res.resImgUrl;
							}
						"
					/>
				</div>
				<el-input
					class="introduce-text"
					type="textarea"
					:rows="10"
					placeholder="请输入内容"
					v-model="backData.product_story"
				>
				</el-input>
			</div>
		</div>
		<h2>记录所有原材料</h2>
		<div class="create-introduce">
			<h5>主料</h5>
			<Stuff v-model="backData.raw_material.main_material" />
			<h5>辅料</h5>
			<Stuff v-model="backData.raw_material.accessories_material" />
		</div>
		<h2>开始写步骤了！能否简单易学就看你怎么写了，加油！</h2>
		<div class="create-introduce">
			<Upload />
			<el-button
				class="eaeaea add-step-button"
				type="primary"
				size="medium"
				icon="el-icon-plus"
				>增加一步</el-button
			>
			<h5>烹饪小技巧</h5>
			<el-input
				class="introduce-text"
				type="textarea"
				:rows="8"
				placeholder="分享下你做这道菜的过程中的心得和小技巧吧！"
			>
			</el-input>
		</div>
		<el-button class="send" type="primary" size="medium" :icon="icon"
			>搞定，提交审核</el-button
		>
	</div>
</template>

<script>
	import Stuff from "./stuff";
	import UploadImg from "@/components/upload-img";
	import Upload from "./step-upload";
	import { getProperty, getClassify } from "@/service/api";
	const backData = {
		title: "", // 标题
		product_pic_url: "", // 成品图URL
		product_story: "", // 成品图故事
		property: {
			craft: 0, // 工艺 enum: [1,2,3,4],
			flavor: 0, // 口味  enum: [1,2,3,4],
			hard: 0, // 难度 enum: [1,2,3,4],
			pepole: 0, // pepole 人数: [1,2,3,4],
		}, // 属性
		raw_material: {
			// 料
			main_material: [{ name: "", specs: "" }], // 主料
			accessories_material: [{ name: "", specs: "" }], // 辅料
		},
		steps: [{ img_url: "", describe: "" }], // 步骤
		classify: "", // 菜谱分类
		skill: "",
	};
	backData;
	export default {
		name: "create",
		components: {
			UploadImg,
			Stuff,
			Upload,
		},
		data() {
			let rawIndex = 0;
			return {
				classifies: [],
				properties: [],
				backData: {
					title: "",
					property: {},
					classify: "",
					product_pic_url: "",
					product_story: "",
					raw_material: {
						main_material: new Array(3).fill(1).map(() => ({
							name: "",
							specs: "",
							id: ++rawIndex,
						})),
						accessories_material: new Array(3).fill(1).map(() => ({
							name: "",
							specs: "",
							id: ++rawIndex,
						})),
					},
				},
			};
		},
		async mounted() {
			const { data: property } = await getProperty();
			this.properties = property;
			this.backData.property = property.reduce((o, item) => {
				o[item.title] = "";
				return o;
			}, {});
			const { data: classify } = await getClassify();
			this.classifies = classify;
		},
	};
</script>

<style lang="scss" scoped>
	.create-introduce {
		background-color: #fff;
		padding: 20px;

		.add-step-button {
			margin-left: 100px;
		}
	}

	.create {
		width: 100%;

		h2 {
			text-align: center;
			margin: 20px 0;
		}

		.send {
			height: 70px;
			width: 220px;
			background: #ff3232;
			color: #fff;
			border: none;
			margin: 20px auto;
			display: block;
		}

		h5 {
			margin: 20px 0;
		}
	}

	.create-input input {
		width: 446px;
		line-height: 22px;
	}

	.upload-img-box {
		.upload-img {
			float: left;
		}

		.introduce-text {
			float: left;
		}

		.el-textarea {
			width: 60%;
			margin-left: 10px;
		}
	}
</style>