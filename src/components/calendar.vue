<template>
	<div>
		<div class="calMonths">
			<div class="imgContainer">
				<img src="../assets/MonthSelectImgLeft.png" alt="Last Month" class="monthImg" @click="changeMonth(1)">
			</div>
			<div class="imgContainer">
				<h1 class="calMonth">{{ findMonth(months) }}</h1>
			</div>
			<div class="imgContainer">
				<img src="../assets/MonthSelectImgRight.png" alt="Next Month" class="monthImg" @click="changeMonth(2)">
			</div>
		</div>
		<div class="calDayNames">
			<h3 class="calText" v-for="day in days" :key="day.id">{{ day }}</h3>
		</div>
		<div class="calDates">
			<div class="calWeek" v-for="week in calendar.weeks" :key="week.id">
				<div v-bind:class="{calCurrentDay: day.date === currentDate.toString()}" v-for="day in week" :key="day.id" @dblclick="newCalNote()">
					<h3 class="calText dateMargin">{{ day.date }}</h3>
					<div class="datedNotes">
						<div class="datedNote" v-for="note in day.notes" :key="note.id" @click="editCalNote(note)">
							<p>{{ note.name }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="overlayContainer" v-if="edittingCalNote">
			<div class="overlay" @click="edittingCalNote = false"></div>
			<form class="overlayCard">
				<input type="text" placeholder="selectedNoteData.name" required>
				<input type="text" placeholder="Give further details... (Optional)">
				<input type="datetime-local" v-model.lazy="selectedNoteData.time">
				<input type="submit" value="Finish">
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			edittingCalNote: false,
			currentDate: new Date().getDate(),
			calendar: {
				totalDays: 31,
				beforeDays: 1,
				afterDays: 10,
				weeks: [
					{ 1: { date: '30', notes: [ { name: 'testing', desc: 'This is a test', time: '6:00', location: '510 Paddington Drive' } ] }, 2: { date: '1', notes: [] }, 3: { date: '2', notes: [] }, 4:{ date: '3', notes: [] }, 5:{ date: '4', notes: [] }, 6:{ date: '5', notes: [] }, 7:{ date: '6', notes: [] } },
					{ 1: { date: '7', notes: [] }, 2: { date: '8', notes: [] }, 3: { date: '9', notes: [] }, 4:{ date: '10', notes: [] }, 5:{ date: '11', notes: [] }, 6:{ date: '12', notes: [] }, 7:{ date: '13', notes: [] } },
					{ 1: { date: '14', notes: [] }, 2: { date: '15', notes: [] }, 3: { date: '16', notes: [] }, 4:{ date: '17', notes: [] }, 5:{ date: '18', notes: [] }, 6:{ date: '19', notes: [] }, 7:{ date: '20', notes: [] } },
					{ 1: { date: '21', notes: [] }, 2: { date: '22', notes: [] }, 3: { date: '23', notes: [] }, 4:{ date: '24', notes: [] }, 5:{ date: '25', notes: [] }, 6:{ date: '26', notes: [] }, 7:{ date: '27', notes: [] } },
					{ 1: { date: '28', notes: [] }, 2: { date: '29', notes: [] }, 3: { date: '30', notes: [] }, 4:{ date: '31', notes: [] }, 5:{ date: '1', notes: [] }, 6:{ date: '2', notes: [] }, 7:{ date: '3', notes: [] } },
					{ 1: { date: '4', notes: [] }, 2: { date: '5', notes: [] }, 3: { date: '6', notes: [] }, 4:{ date: '7', notes: [] }, 5:{ date: '8', notes: [] }, 6:{ date: '9', notes: [] }, 7:{ date: '10', notes: [] } }
				]
			},
			selectedNoteData: {
				name: '',
				desc: '',
				time: '',
				location: ''
			}
		}
	},
	methods: {
		findMonth: function(months) {
			return months[new Date().getMonth()];
		},
		getDate: function(date) {
			return date;
		},
		editCalNote: function(note) {
			this.edittingCalNote = true;
			this.selectedNoteData = { name: note.name, desc: note.desc, time: note.time, location: note.location };
		},
		newCalNote: function() {
			this.edittingCalNote = true;
			this.selectedNoteData = { name: 'Note Title', desc: '', time: '', location: '' };
		},
		changeMonth: function(num) {
			
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
	color: #000;
	font-size: 4em;
	font-weight: 400;
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
	background-color: aquamarine;
}
dateMargin {
	margin-bottom: 10px;
}
.datedNote {
	background-color: #c22c2c;
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