<template>
    <div class="notesPage">
		<div class="singleNote" @dblclick="editNote(note)" v-for="note in notes" :key="note.id">
			<input type="text" v-bind:placeholder="note.name" class="noteTitleInput">
			<div>
				<h3>Details:</h3>
				<textarea class="noteDetails" v-bind:placeholder="note.desc"></textarea>
				<button class="note-expand" @click="editNote(note)"><h5>+</h5></button>
			</div>
		</div>
		<div class="overlayContainer" v-if="edittingNote">
			<div class="overlay" @click="edittingNote = false"></div>
			<div class="overlayCard">
				<input class="overlay-name" type="text" v-model.lazy="activeNoteData.name" required>
				<button class="overlay-leave" @click="updateNote(activeNoteData.id)">X</button>
				<textarea class="overlay-desc" type="text" v-model.lazy="activeNoteData.desc"></textarea>
				<input class="overlay-date" type="date" v-model.lazy="activeNoteData.date">
				<input class="overlay-submit" type="submit" value="Finish" @click="updateNote(activeNoteData.id)">
			</div>
		</div>
		<button @click="newNote()" class="new-note-button">New Note</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
			edittingNote: false,
			activeNoteData: { id: '', name: '', desc: '', date: new Date(), shared: false, shareLink: '' },
			defaultNoteData: { id: '', name: 'New Note', desc: 'Give further details... (Optional)', date: new Date(), shared: false, shareLink: '' }
        }
	},
	methods: {
		shareNote: function(username) {
			this.$http.get('https://bitnote-50e75.firebaseio.com/users.json').then(function(data) {
				return data.json();
			}).then(function(data) {
				for(let key in data) {
					if(data[key].username === username) {
						this.$http.post('https://bitnote-50e75.firebaseio.com/users/' + key + '/notes.json', 
						{ id: '', name: '', desc: '', date: new Date(), shared: true, shareLink: 'https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes/' + this.activeNoteData.id + '.json' }).then(function(data) {
							console.log('Note shared');
						});
					}
				}
			});
		},
		deleteNote: function() {

		},
		editNote: function(note) {
			this.activeNoteData = note;
			this.edittingNote = true;
		},
		newNote: function() {
			//this.$store.dispatch('newNote');
			if(this.activeUser.active) {
				this.$http.post('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes.json', this.defaultNoteData).then(function(data) {
					//console.log(key);
					this.notes.push(this.defaultNoteData);
					//this.notes[this.notes.length].id = key;
					
					console.log(this.notes[this.notes.length - 1]);
					this.setIds();
				});
			}
		},
		setIds: function() {
			console.log('-setIds-');
			this.$http.get('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes.json').then(function(data) {
				return data.json();
			}).then(function(data) {
				var i = 0
				for(let key in data) {
					this.notes[key].id = key;
					this.$http.put('https://bitnote-50e75.firebasoio.com/users/' + this.activeUser.id + '/notes/' + key + '.json', this.notes[key]).then(function(data) {
						return data.json();
					});
					i++;
				}
			});
		}
	},
	computed: {
		activeUser() {
			return this.$store.state.activeUser;
		},
		notes() {
			return this.$store.state.notes;
		},
		updateNote: function(id) {
			if(this.activeNoteData.shared) {
				var temp = this.activeNoteData;
				temp.shared = false;
				temp.shareLink = '';
				this.$http.put(this.activeNoteData.shareLink, temp).then(function(data) {
					return data.json();
				});
			} else {
				this.$http.put('https://bitnote-50e75.firebasioio.com/users/' + this.activeUser.id + '/notes/' + this.activeNoteData.id + '.json', this.activeNoteData).then(function(data) {
					return data.json();
				});
			}
			this.edittingNote = false;
		}
	}
}
</script>

<style scoped>
.notesPage {
	padding: 2em;
	display: inline-grid;
	/*grid-template-columns: minmax(1fr, repeat(5, 1fr));*/
	grid-template-columns: repeat(auto-fill, minmax(10em, 18em));
	grid-auto-rows: 14em;
	grid-gap: 2em;
}
.singleNote {
	height: 100%;
	width: minmax(6em, 100%);
	display: inline-block;
	background: #1653b7;
	color: #fff;
	padding: 0;
	border-radius: 5px 5px 0 0;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
}
.noteTitleInput {
	margin: 0 0 0 10%;
	width: 90%;
	height: 20%;
	border: none;
	font-size: 20px;
	background: none;
	color: #fff;
}
.singleNote div {
	width: 100%;
	height: 80%;
	background: #ccc;
	border-radius: 0 0 5px 5px;
}
.singleNote div h3 {
	margin-left: 10px;
	height: 15%;
	color: #000;
}
.noteDetails {
	background: none;
	border: none;
	padding: 0;
	width: 90%;
	margin-left: 10%;
	font-size: 16px;
	height: 65%;
	resize: none;
	color: #000;
}
.note-expand {
	width: 100%;
	height: 20%;
	display: flex;
	background: none;
	border: none;
	font-size: 2rem;
	font-weight: bolder;
	padding: 0;
	line-height: 1;
}
.note-expand h5 {
	margin: auto;
}
.new-note-button {
	background: none;
	border: 2px dashed #000;
	font-size: 1.6rem;
	color: #fff;
	height: 100%;
}
.new-note-button:hover {
	background-color: rgba(22, 83, 183, 0.3);
	border: 1px solid #1653b7;
}
</style>