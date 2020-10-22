<template>
  <div class="schedule">
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <h2> Here's your schedule, James </h2>
          <br>
          <h1> You are in TEAM A</h1>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="4">
          Calendar
          <Calendar color='blue' :attributes='attrs' is-expanded />
        </b-col>
        <b-col cols="4">
          <table>
            <tr>
              <th>Team A</th>
              <th>Team B</th>
            </tr>
            <tr>
              <th>Andy</th>
              <th>Charlie</th>
            </tr>
            <tr>
              <th>Bobby</th>
              <th>Fanny</th>
            </tr>
            <tr>
              <th>Daisy</th>
              <th>Elaine</th>
            </tr>
            <tr>
              <th>Georgia</th>
              <th>Hilary</th>
            </tr>
            <tr>
              <th>Ian</th>
              <th></th>
            </tr>

          </table>
        </b-col>

        <b-col></b-col>
        
      </b-row>
  </div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'
//import DatePicker from 'v-calendar/lib/components/date-picker.umd'

// Or just use in separate component
export default {
  components: {
    Calendar//,
    //DatePicker
  },
  data() {
    return {
      attrs: [
        {
          //key: 'today',
          highlight: 'red',
          dates: {
            start: new Date(2020, 10 - 1, 1),
            weekdays: [2,3,4,5,6], 
            weeklyInterval: 2
            }
        },
      ],
    };
  },
}
</script>