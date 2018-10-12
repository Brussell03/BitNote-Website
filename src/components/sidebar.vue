<template>
    <nav id="sidebar">
        <ul>
            <li class="sidebarLink" @click="changeView(1)">Dashboard</li>
            <li class="sidebarLink" @click="changeView(2)">Notes</li>
            <li class="sidebarLink" @click="changeView(3)">Planner</li>
            <li class="sidebarLink" @click="changeView(4)">Groups</li>
            <li class="sidebarLink" @click="changeView(5)">Calendar</li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        activeView: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        changeView: function(num) {
            if(num === 1) {
                this.activeView.dashboard = true;
                this.activeView.notes = false;
                this.activeView.planner = false;
                this.activeView.groups = false;
                this.activeView.calendar = false;
            } else if(num === 2) {
                this.activeView.dashboard = false;
                this.activeView.notes = true;
                this.activeView.planner = false;
                this.activeView.groups = false;
                this.activeView.calendar = false;
            } else if(num === 3) {
                this.activeView.dashboard = false;
                this.activeView.notes = false;
                this.activeView.planner = true;
                this.activeView.groups = false;
                this.activeView.calendar = false;
            } else if(num === 4) {
                this.activeView.dashboard = false;
                this.activeView.notes = false;
                this.activeView.planner = false;
                this.activeView.groups = true;
                this.activeView.calendar = false;
            } else if(num === 5) {
                this.activeView.dashboard = false;
                this.activeView.notes = false;
                this.activeView.planner = false;
                this.activeView.groups = false;
                this.activeView.calendar = true;
            }
        }
    }
}
</script>

<style>
#sidebar ul {
    list-style-type: none;
    text-align: center;
    margin: 0;
    padding: 0;
}
.sidebarLink {
    color: #fff;
    text-decoration: none;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.2em;
    line-height: 2;
}
.sidebarLink:hover {
    background-color: #333;
}
</style>