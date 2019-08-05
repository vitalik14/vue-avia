<template>
<div class="listings-avia">
	<div class="title-info" v-if="loader">Поиск ...</div>
	<ul v-for="(airCompany, i) in listAirlines" :key="i">
		<li>
			<div @click="pressAviaCompany($event)" class="avia-company">
				<div class="logo"><img :src="airCompany.carrier_logo" alt="" /></div>
				<div class="name">{{ airCompany.carrier_name }}</div>
			</div>
			<table class="proposal-sheet" v-for="items in airCompany.offers">
				<tr>
					<th>Вылет</th>
					<th>Прилет</th>
					<th>Дата вылета</th>
					<th>Дата прилета</th>
					<th>Время в пути</th>
					<th>Цена</th>
				</tr>
				<tr v-for="(segment, n) in items.segments" :key="n">
					<td class="departure">{{segment.departure_airport}}</td>
					<td class="arrival">{{segment.arrival_airport}}</td>
					<td class="travel-data-start">{{segment.departure_date}} {{segment.departure_time}}</td>
					<td class="travel-data-end">{{segment.arrival_date}} {{segment.arrival_time}}</td>
					<td class="travel-time">{{segment.duration_formated}}</td>
					<td class="price">{{segment.price_details[0].total}}</td>
				</tr>
			</table>
		</li>
	</ul>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "ListingsAvia",

	props: ["listAirlines", "loader"],

	methods: {
		pressAviaCompany(event) {
			event.currentTarget.classList.toggle("open");
		}
	},

	computed: {
		...mapGetters(["AIR_LIST"])
	}
};
</script>


<style scoped lang="stylus">
.title-info
	margin 10px 0

.listings-avia 
	>ul
		list-style: none;
		padding:0px 5px;
		margin:0 auto;
		max-width: 650px;
		border-radius: 3px;
		border: 1px solid #eee6dc;
		>li
			background: #efefef;
			display: flex;
			flex-wrap: wrap;
			padding: 5px 0;
			margin: 5px 0;
			overflow: hidden;
			&:nth-child(odd)
				background: #e3e3e3
			.avia-company
				display: flex;
				width: 100%;
				cursor: pointer
				&:hover
					opacity: 0.5;
					transition: all 0.1s;
				div
					display: inline-block;
					padding: 0 10px;
					&.logo
						width: calc(35% - 10px);
						height:40px;
					img
						width:100%;
						height:100%;
					&.name
						text-align: center;
						line-height: 2.5;
						width: (65% - 10px);

.listings-avia table
	width:100%;
	margin-top: 10px;
	display: none;
	th
		font-size: 12px;
		padding: 10px;
		border-bottom: 1px solid #666;
	tr
		font-size: 16px;
		background: #e7eeee;
		&:nth-child(odd)
			font-size: 16px;
			background: #c5d9d9;

.avia-company.open + table
	display: table;

</style>
