<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card card-default">
                <div class="card-header">All events</div>

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
        </div>
    </div>

</template>

<script>
    const axios = require('axios');
    export default {

        name: "app",
        computed: {
            hasEvents() {
                return this.isLoading === false && this.events.length > 0;
            },
            noEvents() {
                return this.isLoading === false && this.events.length === 0;
            }
        },
        data() {
            return {
                event: {
                    eventName: '',
                    eventPlace: '',
                    eventDate: '',
                    eventType: ''
                },
                events: [],
                isLoading: true,
            }
        },


        methods:{

            loadEvents() {
                axios
                    .get( "http://localhost:3000/api/event/events")
                    .then( responce => {
                        this.isLoading = false;
                        /* eslint-disable no-console */
                        console.log( "got a result");
                        console.log(responce);
                        this.events = responce.data;
                        console.log(this.events);
                        console.log(JSON.stringify(this.events));
                    } )
                    .catch( err => {
                        //this.msg = err.message;
                        /* eslint-disable no-console */
                        console.log( err );
                        /* eslint-enable no-console */
                    } );
            }
        },
        mounted() {
            return this.loadEvents();
        }
    }
</script>