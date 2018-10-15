<template>
	<div>
		<div class="calMonths">
			<div class="imgContainer">
				<img src="../assets/MonthSelectImgLeft.png" alt="Last Month" class="monthImg" @click="changeMonth(2)">
			</div>
			<div class="imgContainer month-name">
				<h1 class="calMonth">{{ selectedMonth }}</h1>
			</div>
			<div class="imgContainer">
				<img src="../assets/MonthSelectImgRight.png" alt="Next Month" class="monthImg" @click="changeMonth(1)">
			</div>
			<h1 class="cal-year">{{ selectedYear }}</h1>
		</div>
		<div class="calDayNames">
			<h3 class="calText" v-for="day in weekdays" :key="day.id">{{ day }}</h3>
		</div>
		<div class="calDates">
			<div class="calWeek" v-for="week in calendar" :key="week.id">
				<div v-for="day in week" :key="day.id" v-bind:class="{calSelectedDay: selectedDay == day.num && calSelectedMonth == day.month}" @click="selectDay(day)">
					<h3 class="calText dateMargin" v-bind:class="{calCurrentDay: currentDay == day.num && currentMonth == day.month}">{{ day.num }}</h3>
					<div class="datedNotes">
						<div class="datedNote" v-for="note in day.notes" :key="note.id">
							<p>{{ note.name }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--div class="overlayContainer" v-if="edittingCalNote">
			<div class="overlay" @click="edittingCalNote = false"></div>
			<form class="overlayCard">
				<input type="text" placeholder="selectedNoteData.name" required>
				<input type="text" placeholder="Give further details... (Optional)">
				<input type="datetime-local" v-model.lazy="activeData.time">
				<input type="submit" value="Finish">
			</form>
		</div-->
	</div>
</template>

<script>
export default {
	data() {
		return {
			weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			currentMonth: '',
			currentDate: new Date(),
			currentDay: this.currentDate,
			currentYear: new Date().getYear(),
			selectedDate: this.currentDate,
			selectedDay: this.currentDate,
			selectedMonth: '',
			calSelectedMonth: this.currentDate,
			selectedYear: '',
			daysInMonth: 0,
			calendar: []
		}
	},
	beforeMount: function() {
		var moment = require('moment');
		this.currentMonth = moment(this.currentDate).format('MMMM');
		this.selectedMonth = moment(this.selectedDate).format('MMMM');
		this.selectedYear = moment(this.selectedDate).format('YYYY');
		this.currentDay = moment(this.currentDay).format('DD');
		this.selectedDay = moment(this.selectedDay).format('DD');
		this.calSelectedMonth = moment(this.selectedDate).format('MMMM');
		this.getMonth();
	},
	methods: {
		changeMonth: function(num) {
			var moment = require('moment');
			if(num === 1) {
				this.selectedMonth = moment(this.selectedDate).add(1, 'month').format('MMMM');
				this.selectedDate = moment(this.selectedDate).add(1, 'month');
			} else {
				this.selectedMonth = moment(this.selectedDate).subtract(1, 'month').format('MMMM');
				this.selectedDate = moment(this.selectedDate).subtract(1, 'month');
			}
			this.selectedYear = moment(this.selectedDate).format('YYYY');
			this.getMonth();
		},
		getMonth: function() {
			var moment = require('moment');
			var daysInMonth = moment(this.selectedDate).daysInMonth();
			var day = moment(this.selectedDate).startOf(this.selectedDate).add(1, 'day').format('dd');
			var daysBefore = 0;
			var daysAfter = 0;
			if(day === 'Su') {
				daysAfter = 42 - daysInMonth;
			} else if(day === 'Mo') {
				daysBefore = 1;
				daysAfter = 41 - daysInMonth;
			} else if(day === 'Tu') {
				daysBefore = 2;
				daysAfter = 40 - daysInMonth;
			} else if(day === 'We') {
				daysBefore = 3;
				daysAfter = 39 - daysInMonth;
			} else if(day === 'Th') {
				daysBefore = 4;
				daysAfter = 38 - daysInMonth;
			} else if(day === 'Fr') {
				daysBefore = 5;
				daysAfter = 37 - daysInMonth;
			} else if(day === 'Sa') {
				daysBefore = 6;
				daysAfter = 36 - daysInMonth;
			}
			var daysLastMonth = moment(this.selectedDate).subtract(1, 'month').daysInMonth();
			var dates = [];
			for(var i = daysBefore; i > 0; i--) {
				dates.push({ date: daysLastMonth + 1 - i, month: moment(this.selectedDate).subtract(1, 'month').format('MMMM') });
			}
			for(var i = 0; i < daysInMonth; i++) {
				dates.push({ date: i + 1, month: this.selectedMonth });
			}
			for(var i = 0; i < daysAfter; i++) {
				dates.push({ date: i + 1, month: moment(this.selectedDate).add(1, 'month').format('MMMM') });
			}
			var weeks = [];
			for(var i = 0; i < 6; i++) {
				weeks.push(this.getWeek(dates.slice(7 * i, 7 * i + 7)));
			}
			this.calendar = weeks;
		},
		getWeek: function(dates) {
			var week = [];
			for(var i = 0; i < 7; i++) {
				week.push(this.getDay(dates[i]));
			}
			return week;
		},
		getDay: function(date) {
			var moment = require('moment');
			var day = { num: date.date, month: date.month, notes: [] };
			for(var i = 0; i < this.notes.length; i++) {
				if(moment(this.notes[i].date).format('MMM Do YY') === moment(this.selectedYear + '/' + date.month + '/' + date.date).format('MMM Do YY')) {
					day.notes.push(this.notes[i]);
				}
			}
			return day;
		},
		selectDay(day) {
			this.selectedDay = day.num;
			this.calSelectedMonth = day.month;
		}
	},
	computed: {
		notes() {
			return this.$store.state.notes;
		}
	}
}
</script>

<style>
.calDates {
	display: grid;
	grid-template-rows: repeat(6, 1fr);
	grid-auto-rows: 4em;
	background-color: #eee;
	opacity: 0.6;
}
.calMonth {
	width: 100%;
	color: #fff;
	font-size: 4em;
	font-weight: 400;
	text-align: center;
	font-weight: bolder;
}
.month-name {
	width: 20em;
}
.cal-year {
	font-size: 4em;
	height: 100%;
	color: #fff;
	font-weight: bolder;
	margin-left: 4em;
}
.calDayNames {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	background-color: #eee;
	opacity: 0.6;
	border-bottom: 2px solid #000;
}
.calText {
	text-align: center;
	color: #000;
	font-size: 1.5rem;
}
.calWeek {
	font-size: 1.5rem;
	height: 13.18vh;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
}
.calCurrentDay {
	color: #5772e9;
}
.calSelectedDay {
	border: 2px solid #5772e9;
}
.dateMargin {
	margin-bottom: 10px;
}
.datedNote {
	background-color: #5869ff;
	border-left: 6px solid #4921fc;
	width: 100%;
	height: auto;
}
.datedNote p {
	line-height: 1;
	margin-left: 10px;
	font-size: 1.4rem;
	text-align: left;
	word-wrap: normal;
}
.datedNote:hover {
	cursor: pointer;
}
.imgContainer {
	float: left;
}
.monthImg {
	margin: 1em;
	height: 4em;
	width: 4em;
	cursor: pointer;
}
.monthImg:hover {
	opacity: 0.6;
}
.calMonths::after {
	content: "";
	clear: both;
	display: table;
}
</style>