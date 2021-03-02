<template>
	<div class="waterfall" ref="waterfall">
		<slot></slot>
		<div class="waterfall-loading" ref="loading" v-show="isLoading">
			<i class="el-icon-loading"></i>
		</div>
	</div>
</template>

<script>
	import { throttle } from "throttle-debounce";
	export default {
		name: "Waterfall",
		data() {
			return {
				isLoading: true,
			};
		},
		methods: {
			handleScroll(e) {
				if (
					!this.isLoading &&
					this.$refs.waterfall.getBoundingClientRect().bottom <
						document.documentElement.clientHeight
				) {
					this.isLoading = true;
					this.$emit("view");
				}
			},
		},
		mounted() {
			this.scroll = throttle(300, this.handleScroll);
			window.addEventListener("scroll", this.scroll);
		},
		beforeDestroy() {
			window.removeEventListener("scroll", this.scroll);
		},
	};
</script>

<style lang="stylus">
	.waterfall-loading {
		width: 100%;
		height: 20px;
		text-align: center;
	}
</style>