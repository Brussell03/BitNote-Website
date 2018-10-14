<template>
    <div id="dashboard">
        <sidebar id="sidebarView" v-bind:activeView="activeView"></sidebar>
        <notes v-show="activeView.notes" class="contentView"></notes>
        <lists v-show="activeView.groups" class="contentView"></lists>
        <calendar v-show="activeView.calendar" class="contentView"></calendar>
    </div>
</template>

<script>
import sidebar from '../components/sidebar.vue';
import notes from '../components/notes.vue';
import calendar from '../components/calendar.vue';
import lists from '../components/lists.vue';
export default {
    data() {
        return {
            
        }
    },
    computed: {
        activeView() {
            return this.$store.state.activeView;
        }
    },
    components: {
        'sidebar': sidebar,
        'notes': notes,
        'calendar': calendar,
        'lists': groups
    }
}
</script>

<style>
#dashboard {
    display: grid;
    grid-gap: 0;
    grid-template-columns: repeat(8, 1fr);
}
#sidebarView {
    background-color: #222;
    position: fixed;
	top: 5.6vh;
	z-index: 100;
    height: 94.4vh;
    width: 12.5%;
    list-style-type: none;
    text-align: center;
    margin: 0;
    padding: 0;
}
.contentView {
    position: relative;
    grid-column: 2 / 9;
    top: 5.6vh;
    height: 94.4vh;
}
.overlay {
	position: fixed;
	top: 5.6vh;
	left: 12.5%;
	right: 0;
	bottom: 0;
	background-color: #222;
	opacity: 0.8;
	z-index: 1000;
}
.overlay-card {
	position: fixed;
	top: 10%;
	left: 30%;
	height: 80%;
	width: 40%;
	opacity: 1;
	background-color: #fff;
	z-index: 1001;
	border-radius: 1em;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
}
.overlay-name {
    background: none;
    border: none;
    border-bottom: 1px solid #000;
    grid-row: 2;
    grid-column: 2/8;
    color: #000;
    font-size: 1.6rem;
}
.overlay-leave {
    font-size: 2rem;
    color: #000;
    grid-row: 1/3;
    grid-column: 9/11;
    background: none;
    border: none;
    margin: auto;
}
.overlay-desc {
    resize: none;
    background: none;
    border: none;
    border-bottom: 1px solid #000;
    grid-row: 4/6;
    grid-column: 2/10;
    font-size: 1.6rem;
}
.overlay-date {
    background: none;
    border: none;
    border-bottom: 1px solid #000;
    font-size: 1.6rem;
    grid-row: 7;
    grid-column: 2/8;
}
.overlay-buttons {
    display: flex;
    grid-row: 9;
    grid-column: 2 / 10;
    width: 100%;
}
.overlay-button {
    flex: 1;
    background-color: #5772e9;
    font-size: 1.6rem;
    border: none;
    border-radius: 10px;
    width: 4em;
    height: 100%;
    color: #fff;
}
.overlay-button:first-child {
    margin-right: 25%;
}
.overlay-button:last-child {
    align-items: flex-end;
    margin-left: 25%;
}
.overlay-share {
    background-color: #5772e9;
    border-radius: 10px;
    grid-row: 4;
    grid-column: 2 / 5;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 1.6rem;
    color: #fff;
}
.shared-users {
    grid-row: 6 / 10;
    grid-column: 2 / 10;
    width: 100%;
    height: 100%;
    list-style-type: none;
}
.shared-users-title {
    font-size: 1.6rem;
    width: 100%;
    position: relative;
}
.shared-users-title::after {
    content: " ";
    display: block;
    position: absolute;
    height: 2px;
    background: #000;
    width: 60%;
    left: 38%;
    top: calc(50% - 1px);
}
.shared-name {
    font-size: 1rem;
    color: #242424;
    margin: 10px 0 10px 1em;
}
.shared-name::before {
    height: 1rem;
    width: 5px;
    background-color: #242424;
}
.share-pass {
    grid-row: 4;
    grid-column: 5/10;
    color: #1c7a24;
    font-size: 1.6rem;
    margin: auto;
}
.share-fail {
    grid-row: 4;
    grid-column: 5 / 10;
    color: #b83434;
    font-size: 1.6rem;
    margin: auto;
}
@media only screen and (max-width: 1400px) {
    #sidebarView {
        display: inline-block;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 6vh;
    }
    .contentView {
        grid-column: 1 / 9;
        top: 11.6vh;
        height: 88.4vh;
    }
    .overlay {
        top: 11.6vh;
        left: 0;
    }
}
</style>