<template>
	<div class="menu-detail">
		<DetailHeader />
		<DetailContent />
		<Comment></Comment>
	</div>
</template>

<script>
	import DetailHeader from "./detail-header";
	import DetailContent from "./detail-content";
	import Comment from "./comment";
	export default {
		name: "detail",
		components: {
			DetailHeader,
			DetailContent,
			Comment,
		},
	};
</script>

<style lang="scss" scoped>
</style>