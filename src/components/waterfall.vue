<template>
	<div class="waterfall" ref="waterfall">
		<slot></slot>
		<div class="waterfall-loading" ref="loading" v-show="isLoading">
			<span v-if="loadStr">{{ loadStr }}</span>
			<i class="el-icon-loading" v-else></i>
		</div>
	</div>
</template>

<script>
	import { throttle } from "throttle-debounce";
	export default {
		name: "waterfall",
		data() {
			return {
				isLoading: false,
				loadStr: "",
			};
		},
		methods: {
			handleScroll() {
				if (this.isLoading) return;
				const { waterfall } = this.$refs;
				if (
					waterfall.getBoundingClientRect().bottom <
					document.documentElement.clientHeight
				) {
					this.isLoading = true;
					this.$emit("arrive", (str) => {
						if (str) {
							this.loadStr = str;
						} else {
							this.isLoading = false;
						}
					});
				}
			},
		},
		mounted() {
			this.handleScroll = throttle(300, this.handleScroll.bind(this));
			this.handleScroll();
			window.addEventListener("scroll", this.handleScroll);
		},
		destroyed() {
			window.removeEventListener("scroll", this.handleScroll);
		},
	};
</script>

<style lang="scss" scoped>
	.waterfall-loading {
		width: 100%;
		height: 20px;
		text-align: center;
	}
</style>