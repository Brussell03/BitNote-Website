<template>
    <div class="notesPage">
		<div class="singleNote" @click="activeNoteData = note" @dblclick="editNote(note)" v-for="note in notes" :key="note.id">
			<input type="text" @click="activeNoteData = note" @keyup="updateNote(note.id)" v-bind:placeholder="note.name" v-model="note.name" class="noteTitleInput">
			<div>
				<h3>Details:</h3>
				<textarea class="noteDetails" @click="activeNoteData = note" @keyup="updateNote(note.id)" v-bind:placeholder="note.desc" v-model="note.desc"></textarea>
				<button class="note-expand" @click="editNote(note)"><h5>+</h5></button>
			</div>
		</div>
		<div v-if="edittingNote">
			<div class="overlay" @click="edittingNote = false"></div>
			<div class="overlay-card">
				<input class="overlay-name" type="text" v-bind:placeholder="activeNoteData.name" v-model.lazy="activeNoteData.name" required>
				<button class="overlay-leave" @click="updateNote(activeNoteData.id)">X</button>
				<textarea class="overlay-desc" type="text" v-model.lazy="activeNoteData.desc"></textarea>
				<input class="overlay-date" type="date" v-model.lazy="activeNoteData.date">
				<div class="overlay-buttons">
					<input class="overlay-button" type="submit" value="Finish" @click="updateNote(activeNoteData.id)">
					<input class="overlay-button" type="submit" value="Share" @click="shareNote()">
				</div>
			</div>
		</div>
		<div v-if="sharingNote">
			<div class="overlay" @click="sharingNote = false"></div>
			<div class="overlay-card">
				<input v-show="!activeNoteData.shared === true" class="overlay-name" type="text" placeholder="Share with username" v-model.lazy="newShare" required>
				<button class="overlay-leave" @click="sharingNote = false">X</button>
				<input class="overlay-share" type="submit" value="Share" @click="startShare()">
				<h4 v-show="shareSuccess" class="share-pass">Successfully shared with {{ newShare }}!</h4>
				<h4 v-show="shareFail1" class="share-fail">You have already shared this with {{ newShare }}</h4>
				<h4 v-show="shareFail2" class="share-fail">This user does not exist</h4>
				<ul class="shared-users">
					<h3 class="shared-users-title">Shared With</h3>
					<li class="shared-name" v-for="name in activeNoteData.sharedWith" :key="name.id">{{ name }}</li>
				</ul>
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
			sharingNote: false,
			shareSuccess: false,
			shareFail1: false,
			shareFail2: false,
			newShare: '',
			activeNoteData: { id: '', name: '', desc: '', date: new Date(), shared: false, shareLink: '', sharedWith: [] },
        }
	},
	methods: {
		shareNote: function() {
			this.updateNote(this.activeNoteData.id);
			this.edittingNote = false;
			this.sharingNote = true;
		},
		startShare: function() {
			if(this.newShare != '') {
				var username = this.newShare;
				for(var i = 1; i < this.activeNoteData.sharedWith.length; i++) {
					if(username === sharedWith[i]) {
						this.shareFail1 = true;
					}
				}
				if(!this.shareFail1) {
					console.log('Passed share trials');
					this.$http.get('https://bitnote-50e75.firebaseio.com/users.json').then(function(data) {
						return data.json();
					}).then(function(data) {
						var userFound = false;
						for(let key in data) {
							if(data[key].username === username) {
								this.$http.post('https://bitnote-50e75.firebaseio.com/users/' + key + '/notes.json', 
								{ id: '', name: '', desc: '', date: new Date(), shared: true, shareLink: 'https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes/' + this.activeNoteData.id + '.json', sharedWith: ['Start'] }).then(function(data) {
									console.log('Note shared');
									userFound = true;
									this.activeNoteData.sharedWith.push(username);
									this.shareSuccess = true;
								}).then(function() {
									if(userFound === false) {
										this.shareFail2 = true;
									}
								})
							}
						}	
					});
				}
			} else {
				this.shareFail2 = true;
			}
		},
		deleteNote: function() {

		},
		editNote: function(note) {
			this.activeNoteData = note;
			this.edittingNote = true;
			console.log(note);
			console.log(this.activeNoteData);
		},
		newNote: function() {
			if(this.activeUser.active) {
				this.$http.post('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes.json', Object.assign({}, this.defaultNoteData)).then(function(data) {
					this.notes.push(Object.assign({}, this.defaultNoteData));
					this.notes[this.notes.length - 1].id = data.data.name;
				});
			}
		},
		updateNote: function(id) {
			console.log(this.activeNoteData);
			if(this.activeNoteData.shared) {
				var temp = Object.assign({}, this.activeNoteData);
				temp.shared = false;
				temp.shareLink = '';
				console.log(this.activeNoteData.shareLink);
				this.$http.put(this.activeNoteData.shareLink, temp).then(function(data) {
					return data.json();
				});
			} else {
				this.$http.put('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes/' + id + '.json', JSON.stringify(this.activeNoteData)).then(function(data) {
					return data.json();
				});
			}
			this.edittingNote = false;
		}
	},
	computed: {
		activeUser() {
			return this.$store.state.activeUser;
		},
		notes() {
			return this.$store.state.notes;
		},
		defaultNoteData() {
			return this.$store.state.defaultNoteData;
		}
	}
}
</script>

<style scoped>
.notesPage {
	padding: 2em;
	display: inline-grid;
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