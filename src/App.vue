<template>
<div id="app">
	<div v-if="AUTH">
		<Form @formData="formData" :loader="LOADER" />
		<ListingsAvia :listAirlines="AIR_LIST" :loader="LOADER" />
	</div>
	<div v-else>
		<button @click="authorization">Авторизация</button>
		<div class="error info">{{ INFO }}</div>
	</div>

</div>
</template>

<script>
import Form from "./components/Form.vue";
import ListingsAvia from "./components/ListingsAvia.vue";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "app",

	data() {
		return {
			listAirlines: ""
		}
	},
	components: {
		Form,
		ListingsAvia
	},

	created() {
		this.authorization();
	},

	methods: {
		...mapActions([
			"authorization",
			"search"
		]),

		formData(data) {
			this.$store.commit("clearResults");
			this.search(data);
		}
	},

	computed: {
		...mapGetters(["AUTH", "AIR_LIST", "LOADER", "INFO"])
	}
};
</script>

<style lang="stylus">
#app
	font-family "Avenir", Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50
	margin-top 60px
.error.info
	color red
	padding 10px
</style>
