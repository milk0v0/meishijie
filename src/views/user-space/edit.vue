<template>
	<div class="edit">
		<div class="edit-item">
			<span class="label">修改头像</span>
			<UploadImg
				action="/api/upload?type=user"
				:imageUrl="avatar"
				:imgMaxWidth="210"
				@res-url="
					(url) => {
						avatar = url.resImgUrl;
					}
				"
			/>
		</div>
		<div class="edit-item">
			<span class="label">修改名称</span>
			<div>
				<el-input
					v-model="name"
					class="create-input"
					placeholder="请输入内容"
				></el-input>
			</div>
		</div>
		<div class="edit-item">
			<span class="label">个人简介</span>
			<div>
				<el-input
					v-model="sign"
					type="textarea"
					class="create-input"
					placeholder="请输入内容"
				></el-input>
			</div>
		</div>
		<div>
			<el-button class="send" type="primary" size="medium" @click="handleSave"
				>保存</el-button
			>
		</div>
	</div>
</template>

<script>
	import UploadImg from "@/components/upload-img";
	import { userEdit } from "@/service/api";
	export default {
		name: "edit",
		components: {
			UploadImg,
		},
		data() {
			const { name, sign, avatar } = this.$store.state.userInfo;
			return {
				name,
				sign,
				avatar,
			};
		},
		methods: {
			async handleSave() {
				const res = await userEdit({
					name: this.name,
					sign: this.sign,
					avatar: this.avatar,
				});
				if (res.code === 0) {
					this.$message.success(res.mes);
					this.$router.push({ name: "space" });
				} else {
					this.$message.error(res.mes);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.edit {
		background-color: #fff;
		padding: 10px 0 20px 20px;

		.edit-item {
			display: flex;
			margin-bottom: 20px;

			.label {
				margin-right: 10px;
			}
		}
	}
</style>