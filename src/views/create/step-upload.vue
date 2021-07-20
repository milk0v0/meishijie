<template>
	<div class="step clearfix">
		<div class="step-number">{{ n }}.</div>
		<div class="upload-box">
			<UploadImg
				:imgMaxWidth="328"
				action="api/upload?type=step"
				@res-url="handleUrl"
				:imageUrl="value.img_url"
			/>
		</div>
		<el-input
			class="introduce-text"
			type="textarea"
			:rows="8"
			placeholder="请输入内容"
			v-model="value.describe"
		>
		</el-input>
		<i class="delete-icon el-icon-close" v-if="showDelete" @click="handleRemove"></i>
	</div>
</template>

<script>
	import UploadImg from "@/components/upload-img";
	export default {
		name: "stepUpload",
		components: {
			UploadImg,
		},
		props: {
			n: {
				type: Number,
				default: 1,
			},
			value: {
				type: Object,
				default: () => {},
			},
			showDelete: {
				type: Boolean,
				default: true,
			}
		},
		methods: {
			handleUrl(data) {
				this.$emit("input", {
					...this.value,
					img_url: data.resImgUrl,
				});
			},
			handleRemove() {
				this.$emit("remove", this.n - 1);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.step {
		margin-bottom: 20px;

		> div {
			float: left;
		}

		.step-number {
			height: 180px;
			width: 100px;
			font-size: 60px;
			color: #aaa;
			font-family: Arial, Helvetica, sans-serif;
			font-weight: bold;
			vertical-align: top;
			line-height: 180px;
		}

		.introduce-text {
			width: 60%;
			margin-left: 40px;
		}

		.upload-box {
			img {
				vertical-align: top;
			}
		}
	}
</style>