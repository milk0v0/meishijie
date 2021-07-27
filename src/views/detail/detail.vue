<template>
	<div class="menu-detail">
		<DetailHeader :info="menuInfo" />
		<DetailContent :info="menuInfo" />
		<Comment></Comment>
	</div>
</template>

<script>
	import DetailHeader from "./detail-header";
	import DetailContent from "./detail-content";
	import Comment from "./comment";
	import { menuInfo } from "@/service/api";
	export default {
		name: "detail",
		components: {
			DetailHeader,
			DetailContent,
			Comment,
		},
		data() {
			return {
				menuInfo: {
					userInfo: {},
					raw_material: {
						main_material: [],
						accessories_material: []
					},
					steps: []
				},
			};
		},
		watch: {
			$route: {
				async handler() {
					const { menuId } = this.$route.query;
					if (!menuId) return this.$message.warning("无数据，请重新进入");

					const res = await menuInfo({ menuId });
					if (res.code !== 0) return this.$message.error(res.mes);

					this.menuInfo = res.data.info;
				},
				immediate: true,
			},
		},
	};
</script>