<template>
    <div>
        <h1>Search for events</h1>
        <form id="form">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Start date:</label>
                        <input type="date" class="form-control" v-model="event.startDate">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>End date:</label>
                        <input type="date" class="form-control" v-model="event.endDate">
                    </div>
                </div>
            </div><br />
            <div class="form-group">
                <el-button @click="searchEvent" class="btn btn-primary">Search</el-button >
            </div>
        </form>
        <h2>Event List</h2>
        <table v-if="hasEvents">
            <thead>
            <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Type</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="event in events" :key="event.id">
                <td>{{ event.Name }} </td>
                <td>{{ event.Location_name }} </td>
                <td>{{ event.Date }}</td>
                <td>{{ event.Type }}</td>
            </tr>
            </tbody>
        </table>
        <p v-if="noEvents">No events yet!</p>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                event: {
                    eventName: '',
                    eventPlace: '',
                    eventDate: '',
                    eventType: '',
                    startDate: '',
                    endDate: ''

                },
                events: []
            }
        },
        computed: {
            hasEvents() {
                return  this.events.length > 0;
            },
            noEvents() {
                return this.isLoading === false && this.events.length === 0;
            }
        },
        methods: {
            async searchEvent() {
                const body = {
                    "startDate": this.event.startDate,
                    "endDate": this.event.endDate
                };

                const axios = require('axios');
                var uri = "http://localhost:3000/api/event/searchEvent/?startDate=" + body.startDate+"&endDate="+ body.endDate;

                axios
                    .get( uri)
                    .then( responce => {
                       // ;

                        this.isLoading = false;
                        /* eslint-disable no-console */
                        console.log( "got a result");
                        console.log(responce);
                        this.events = responce.data;
                        console.log(this.events);
                        console.log(JSON.stringify(this.events))
                        /* eslint-enable no-console */
                    } )
                    .catch( err => {

                        /* eslint-disable no-console */
                        console.log( err );
                        /* eslint-enable no-console */
                    } );


                    this.event = {
                        startDate: '',
                        endDate: ''
                    };
            },
        }
    }
</script>

