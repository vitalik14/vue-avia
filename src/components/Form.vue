<template>
<div class="form">
	<div>
		<span :class="{error:iataDepartureError}">IATA отправления: </span>
		<input @input="validate" v-model.trim="iataDeparture" type="text" required>
	</div>
	<div>
		<span :class="{error:iataArrivalError}">IATA прибытия: </span>
		<input @input="validate" v-model.trim="iataArrival" type="text" required>
	</div>
	<div>
		<span :class="{error:dateError}"> Дата: </span>
		<input @input="validate" v-model.trim="date" type="date" required>
	</div>
	<div>
		<span :class="{error:classAviaError}">Класс: </span>
		<select @change="validate" v-model="classAvia">
			<option value="E" selected>
				Эконом
			</option>
			<option value="W">
				Эконом премиум
			</option>
			<option value="B">
				Бизнес
			</option>
			<option  value="F">
				Первый
			</option>
		</select>
	</div>
	<div class="btn">
		<button v-if="!loader" :disabled="!activeSearch" class="search" @click="sendSearchToParams">Поиск</button>
		<div class="avia-loader" v-else="loader"></div>
	</div>
	
</div>
</template>

<script>

export default {
	name: "Form",

	props: ["loader"],

	data() {
		return {
			iataDeparture: "ODS", //sample
			iataArrival: "IST", //sample
			date: null,
			classAvia: null,
			iataDepartureError: false,
			iataArrivalError: false,
			dateError: false,
			classAviaError: false,
			activeSearch: false // if form validate
		}
	},

	methods: {
		validate() {
			const reg = /([A-Za-z]){3}/; // IATA CODE
			this.iataDepartureError = false;
			this.iataArrivalError = false;
			this.dateError = false;
			this.classAviaError = false;
			this.activeSearch = false;

			if (!this.iataDeparture || this.iataDeparture.length != 3 || !this.iataDeparture.match(reg)) {
				this.iataDepartureError = true;

			} else if (!this.iataArrival || this.iataArrival.length != 3 || !this.iataArrival.match(reg)) {
				this.iataArrivalError = true;

			} else if (!this.date || new Date(this.date).getTime() < new Date().getTime()) {
				this.dateError = true;

			} else if (!this.classAvia) {
				this.classAviaError = true;
			} else {
				this.activeSearch = true;
			}
		},

		sendSearchToParams() {
			this.$emit("formData", {
				params: {
					departure_code: this.iataDeparture,
					arrival_code: this.iataArrival,
					date: this.date,
					//time: "M",
				},
				class: this.classAvia
			});
			this.resetForm();
		},

		resetForm() {
			 this.iataDeparture = "";
			 this.iataArrival = "";
			 this.date = "";
			 this.classAvia = "";
			 this.activeSearch = false;
		}
	}
};
</script>


<style scoped lang="stylus">
.form
	width 330px
	height 235px
	margin 0 auto
	padding 10px
	border-radius 5px
	background #eee6dc
	.btn
		float none
		display inline-block
		.avia-loader
			background #FFF
			width 20px
			height 20px
			transition all 0.5s ease
			animation rotate 1s linear infinite
	.search
		margin 10px 0 5px
		padding 5px 10px
	.error
		color red
		+input, +select
			border-color red
	div
		padding 5px
		margin 5px
		float left
		span
			text-align right
			width 140px
			float left
			line-height 1.8
			padding-right 10px
			color #333
		input, select
			text-align left
			width 150px
			float right
			height 24px
			padding 0 0 0 5px
			margin 0
			font-size 14px
			border-radius 3px
			border 1px solid #aaa
		select
			width 157px
			height 28px

@keyframes rotate {
	from {
		transform: rotate(360deg);
	}
}
</style>
