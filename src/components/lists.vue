<template>
	<div class="list-page">
		<div class="single-list" @click="activeListData = list" @dblclick="editList(list)" v-for="list in lists" :key="list.id">
			<div class="list-head">
				<input class="list-title" type="text" @click="activeListData = list" @keyup="updateList(list.id)" v-model="list.name">
				<button class="list-remove" @click="deleteList(list.id)">X</button>
			</div>
			<div class="list-container">
				<div class="list-details">
					<h3 class="list-details-title">Details</h3>
					<textarea class="list-details-text" @click="activeListData = list" @keyup="updateList(list.id)" v-model="list.desc"></textarea>
				</div>
				<div class="list-items" @click="activeListData = list">
					<div class="list-toolbar">
						<h3 class="list-toolbar-title">Items</h3>
						<button class="item-add" @click="addItem(list)">+</button>
					</div>
					<ul v-show="list.type === 'Checklist'" class="list-items-container">
						<div class="list-item" v-for="item in list.items" :key="item.id">
							<input class="item-check" type="checkbox" v-model="item.checked" @click="updateList(list.id)">
							<input class="item-check-name" type="text" v-model="item.name" @keyup="updateList(list.id)">
							<button class="item-remove" @click="removeItem(item.id, list)">X</button>
						</div>
					</ul>
					<ol v-show="list.type === 'Ordered List'" class="list-items-container">
						<li class="list-item" v-for="item in list.items" :key="item.id">
							<input class="item-ordered-name" type="text" v-model="item.name" @keyup="updateList(list.id)">
							<button class="item-remove" @click="removeItem(item.id, list)">X</button>
						</li>
					</ol>
				</div>
			</div>
		</div>
		<button @click="newList()" class="new-note-button">New List</button>
	</div>
</template>

<script>
export default {
	data () {
        return {
			edittingList: false,
			sharingList: false,
			shareSuccess: false,
			shareFail1: false,
			shareFail2: false,
			newShare: '',
			activeListData: { id: '', name: '', desc: '', type: '', items: [], date: new Date(), shared: false, shareLink: '', sharedWith: [] },
        }
	},
	methods: {
		shareList: function() {
			this.updateList(this.activeListData.id);
			this.edittingList = false;
			this.sharingList = true;
		},
		startShare: function() {
			if(this.newShare != '') {
				var username = this.newShare;
				for(var i = 1; i < this.activeListData.sharedWith.length; i++) {
					if(username === sharedWith[i]) {
						this.shareFail1 = true;
					}
				}
				if(!this.shareFail1) {
					this.$http.get('https://bitnote-50e75.firebaseio.com/users.json').then(function(data) {
						return data.json();
					}).then(function(data) {
						var userFound = false;
						for(let key in data) {
							if(data[key].username === username) {
								this.$http.post('https://bitnote-50e75.firebaseio.com/users/' + key + '/lists.json', 
								{ id: '', name: '', desc: '', date: new Date(), type: '', items: [], shared: true, shareLink: 'https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/lists/' + this.activeListData.id + '.json', sharedWith: ['Start'] }).then(function(data) {
									userFound = true;
									this.activeListData.sharedWith.push(username);
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
		deleteList: function(id) {
			for(var i = 0; i < this.lists.length; i++) {
				if(id === this.lists[i].id) {
					this.lists.splice(i, 1);
					this.$http.delete('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/lists/' + id + '.json').then(function(data) {
						return data.json();
					});
				}
			}
		},
		addItem(list) {
			this.$http.post('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/lists/' + list.id + '/items.json', Object.assign({}, this.defaultItemData)).then(function(data) {
				list.items.push(Object.assign({}, this.defaultItemData));
				list.items[list.items.length - 1].id = data.data.name;
			});
		},
		removeItem(itemId, list) {
			for(var i = 0; i < list.items.length; i++) {
				if(itemId === list.items[i].id) {
					list.items.splice(i, 1);
					this.$http.delete('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/lists/' + list.id + '/items/' + itemId + '.json').then(function(data) {
						return data.json();
					});
				}
			}
		},
		editList: function(list) {
			this.activeListData = list;
			this.edittingList = true;
		},
		newList: function() {
			if(this.activeUser.active) {
				this.$http.post('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/lists.json', Object.assign({}, this.defaultListData)).then(function(data) {
					this.lists.push(Object.assign({}, this.defaultListData));
					this.lists[this.lists.length - 1].id = data.data.name;
				});
			}
		},
		updateList: function(id) {
			if(this.activeListData.shared) {
				var temp = Object.assign({}, this.activeListData);
				temp.shared = false;
				temp.shareLink = '';
				this.$http.put(this.activeListData.shareLink, temp).then(function(data) {
					return data.json();
				});
			} else {
				this.$http.put('https://bitnote-50e75.firebaseio.com/users/' + this.activeUser.id + '/lists/' + id + '.json', JSON.stringify(this.activeListData)).then(function(data) {
					return data.json();
				});
			}
			this.edittingList = false;
		}
	},
	computed: {
		activeUser() {
			return this.$store.state.activeUser;
		},
		lists() {
			return this.$store.state.lists;
		},
		defaultListData() {
			return this.$store.state.defaultListData;
		},
		defaultItemData() {
			return this.$store.state.defaultItemData;
		}
	}
}
</script>

<style>
.list-page {
	padding: 2em;
	display: inline-grid;
	grid-template-columns: repeat(auto-fill, minmax(18em, 24em));
	grid-auto-rows: 20em;
	grid-gap: 2em;
}
.single-list {
	height: 100%;
	width: minmax(12em, 100%);
	display: inline-block;
	background: #1653b7;
	color: #fff;
	padding: 0;
	border-radius: 5px 5px 0 0;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
}
.list-head {
	margin: 0 0 0 10%;
	width: 90%;
	height: 20%;
	display: inline-flex;
}
.list-title {
	border: none;
	background: none;
	font-size: 2rem;
	color: #fff;
	width: 85%;
	height: 100%;
}
.list-remove {
	font-size: 2rem;
	width: 15%;
	height: 100%;
	color: #fff;
	background: none;
	outline: none;
	font-weight: bolder;
	border: none;
}
.list-remove:hover {
	color: #ce3d3d;
}
.list-container {
	height: 80%;
	width: 100%;
	background: #ccc;
	border-radius: 0 0 5px 5px;
	display: flex;
}
.list-details {
	flex: 1;
	height: 100%;
	border-right: 2px solid #000;
}
.list-details-title {
	font-size: 1.6rem;
	width: 100%;
	padding-left: 10%;
	border-bottom: 2px solid #000;
	height: 15%;
	color: #000;
}
.list-details-text {
	border: none;
	background: none;
	padding: 0;
	width: 100%;
	font-size: 16px;
	height: 85%;
	resize: none;
	color: #000;
}
.list-items {
	flex: 2;
	height: 100%;
}
.list-toolbar {
	height: 15%;
	width: 100%;
	border-bottom: 2px solid #000;
	display: flex;
}
.list-toolbar-title {
	flex: 3;
	margin-left: 10%;
	font-size: 1.6rem;
	color: #000;
}
.item-add {
	flex: 1;
	font-size: 1.5rem;
	font-weight: bolder;
	padding: 0;
	height: 100%;
	margin: auto;
	background: none;
	outline: none;
	border: none;
}
.item-add:hover {
	color: #1653b7;
}
.list-items-container {
	height: 85%;
}
.list-item {
	width: 100%;
	height: 20%;
	display: flex;
}
.item-check {
	flex: 1;
	width: 10%;
	height: 50%;
	margin: auto;
	background: none;
	color: #000;
}
.item-check-name {
	flex: 4;
	margin: auto;
	height: 80%;
	width: 80%;
	font-size: 16px;
	border-bottom: 1px solid #000;
	color: #000;
	background: none;
	border: none;
	border-bottom: 1px solid #000;
}
.item-remove {
	flex: 1;
	margin: auto;
	font-size: 1.6rem;
	font-weight: bolder;
	color: #000;
	background: none;
	border: none;
	padding: none;
}
.item-remove:hover {
	color: #ce3d3d;
}
.list-items ol {
	list-style-type: upper-roman;
}
.item-ordered-name {
	margin-left: 10px;
	flex: 5;
	font-size: 16px;
	height: 80%;
	width: 80%;
	background: none;
	border: none;
	margin: auto;
	border-bottom: 1px solid #000;
	color: #000;
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