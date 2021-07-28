<template>
	<el-menu
		:default-active="$route.name"
		class="el-menu-demo"
		mode="horizontal"
		:unique-opened="true"
		:router="true"
	>
		<el-menu-item index="home" :route="{ name: 'home' }">
			<a>首页</a>
		</el-menu-item>
		<el-menu-item index="recipe" :route="{ name: 'recipe' }">
			<a>菜谱大全</a>
		</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		name: "menus",
	};
</script>