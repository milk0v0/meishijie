<template>
	<el-menu
		default-active="1"
		class="el-menu-demo"
		mode="horizontal"
		:unique-opened="true"
		:router="true"
	>
		<el-menu-item index="1" :route="{ name: 'home' }">
			<a>首页</a>
		</el-menu-item>
		<el-menu-item index="2" :route="{ name: 'recipe' }">
			<a>菜谱大全</a>
		</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		name: "menus",
	};
</script>