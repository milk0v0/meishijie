<template>
	<div>
		<el-upload
			class="avatar-uploader"
			:action="action"
			:show-file-list="false"
			:on-success="handleAvatarSuccess"
			:before-upload="beforeAvatarUpload"
		>
			<img v-if="imageUrl" :src="imageUrl" class="avatar" />
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>

<script>
	export default {
		name: "uploadImg",
		props: {
			action: String,
			imageUrl: {
				type: String,
				default: "",
			},
			imgMaxSize: {
				type: Number,
				default: 2,
			},
			imgMaxWidth: {
				type: [Number, String],
				default: "auto",
			},
		},
		methods: {
			handleAvatarSuccess(res) {
				this.$emit('res-url', {
					resImgUrl: res.data.url
				})
			},
			beforeAvatarUpload(file) {
				return new Promise((res, rej) => {
					const img = new Image();
					img.src = URL.createObjectURL(file);

					img.onload = () => {
						const isWidth =
							img.width <= this.imgMaxWidth || img.height <= this.imgMaxWidth;
						const isJPG = file.type === "image/jpeg";
						const isLt2M = file.size / 1024 / 1024 < this.imgMaxSize;

						if (!isJPG) {
							this.$message.error("上传头像图片只能是 JPG 格式!");
						}
						if (!isWidth) {
							this.$message.error(
								`上传头像图片宽高不能超过 ${this.imgMaxWidth}px!`
							);
						}
						if (!isLt2M) {
							this.$message.error("上传头像图片大小不能超过 2MB!");
						}

						if (isJPG && isWidth && isLt2M) {
							res();
						} else {
							rej();
						}
					};
				});
			},
		},
	};
</script>

<style lang="scss">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>