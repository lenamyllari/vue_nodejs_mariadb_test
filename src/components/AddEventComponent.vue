<template>
    <div>
        <h1>Add an event</h1>
        <form id="form">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Event name:</label>
                        <input type="text" class="form-control" v-model="event.eventName">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Event location:</label>
                        <input type="text" class="form-control" v-model="event.eventPlace">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Event date</label>
                        <input type="date" class="form-control" v-model="event.eventDate">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Event type</label>
                        <input type="text" class="form-control" v-model="event.eventType">
                    </div>
                </div>
            </div><br />
            <div class="form-group">
                <el-button @click="addEvent" class="btn btn-primary">Add</el-button >
            </div>
        </form>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                event: {
                    eventname: '',
                    eventPlace: '',
                    eventDate: '',
                    eventType: ''
                }
            }
        },

        methods: {
            addEvent() {
                const body = {
                    "eventName": this.event.eventName,
                    "eventPlace": this.event.eventPlace,
                    "eventDate": this.event.eventDate,
                    "eventType": this.event.eventType
                };
                const axios = require('axios');
                /* eslint-disable no-console */
                console.log("here is body" + JSON.stringify(body));
                let uri = 'http://localhost:3000/api/event/addEvent';
                axios.post(uri, body).then((response) => {
                    console.log(response);
                    /* eslint-enable no-console */
                });

                this.event = {
                    eventName: '',
                    eventPlace: '',
                    eventDate: '',
                    eventType: ''
                };
            },
        }
    }
</script>