<template>
	
</template>

<script>
export default {
	data () {
        return {
			edittingGroup: false,
			sharingGroup: false,
			shareSuccess: false,
			shareFail1: false,
			shareFail2: false,
			newShare: '',
			activeGroupData: { id: '', name: '', desc: '', items: [], date: new Date(), shared: false, shareLink: '', sharedWith: [] },
        }
	},
	methods: {
		shareNote: function() {
			this.updateNote(this.activeGroupData.id);
			this.edittingGroup = false;
			this.sharingGroup = true;
		},
		startShare: function() {
			if(this.newShare != '') {
				var username = this.newShare;
				for(var i = 1; i < this.activeGroupData.sharedWith.length; i++) {
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
								{ id: '', name: '', desc: '', date: new Date(), shared: true, shareLink: 'https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes/' + this.activeGroupData.id + '.json', sharedWith: ['Start'] }).then(function(data) {
									console.log('Note shared');
									userFound = true;
									this.activeGroupData.sharedWith.push(username);
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
			this.activeGroupData = note;
			this.edittingGroup = true;
			console.log(note);
			console.log(this.activeGroupData);
		},
		newNote: function() {
			if(this.activeUser.active) {
				this.$http.post('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes.json', Object.assign({}, this.defaultGroupData)).then(function(data) {
					this.notes.push(Object.assign({}, this.defaultGroupData));
					this.notes[this.notes.length - 1].id = data.data.name;
				});
			}
		},
		updateNote: function(id) {
			console.log(this.activeGroupData);
			if(this.activeGroupData.shared) {
				var temp = Object.assign({}, this.activeGroupData);
				temp.shared = false;
				temp.shareLink = '';
				console.log(this.activeGroupData.shareLink);
				this.$http.put(this.activeGroupData.shareLink, temp).then(function(data) {
					return data.json();
				});
			} else {
				this.$http.put('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/notes/' + id + '.json', JSON.stringify(this.activeGroupData)).then(function(data) {
					return data.json();
				});
			}
			this.edittingGroup = false;
		}
	},
	computed: {
		activeUser() {
			return this.$store.state.activeUser;
		},
		notes() {
			return this.$store.state.notes;
		},
		defaultGroupData() {
			return this.$store.state.defaultGroupData;
		},
		defaultGroupItem() {
			return this.$store.state.defaultGroupItem;
		}
	}
}
</script>

<style>

</style>