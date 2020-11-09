<template>
  <div class="small">
    <line-chart
      v-if="dataset.datasets[0]"
      :chart-data="dataset"
      :options="options"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from "./StatusBar.js";
import { DateTime } from "luxon";
export default {
  props: ["data"],
  components: {
    LineChart
  },
  data() {
    return {
      checkIn: [],
      dataset: {
        labels: [],
        datasets: []
      },
      datacollection: null,
      options: {
        responsive: true,
       // maintainAspectRatio: false,
       AspectRatio :3,
        title: {
          display: true,
          text: "Risky and Danger (Past 30 Days)",
          fontColor: "Black",
          fontSize: 15
        },

        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.fillData();
    this.formatData();
  },
  methods: {
    formatData() {
      var i;
      this.$props.data.forEach(x => {
        let record = {
          checkIn: DateTime.fromSeconds(x.checkIn.seconds),
          status: this.evaluateStatus(
            x.fluFlag,
            x.shnFlag,
            x.contactFlag,
            x.temperature
          )
        };
        this.checkIn.push(record);
      });
      let RiskyData = {
        label: "Risky",
        borderColor: "#ffc107",
        //backgroundColor: "#ffc107",
        fill: false,
        data: []
      };
      let DangerData = {
        label: "Danger",
        borderColor: "#dc3545",
        //backgroundColor: "#dc3545",
        fill: false,
        data: []
      };

      for (i = 30; i > 0; i--) {
        let curDay = DateTime.local().minus({ days: i });
        this.dataset.labels.push(curDay.toFormat("dd LLL"));
        let curDayCheckins = this.checkIn.filter(x => {
          return x.checkIn.diff(curDay, ["days", "hours"]).toObject().days < 0;
        });
        if (curDayCheckins) {
          RiskyData.data.push(
            curDayCheckins.filter(x => x.status == "Risky").length
          );
          DangerData.data.push(
            curDayCheckins.filter(x => x.status == "Danger").length
          );
        } else {
          RiskyData.data.push(0);
          DangerData.data.push(0);
        }
      }
      this.dataset.datasets.push(RiskyData);
      this.dataset.datasets.push(DangerData);
      //console.log(this.$props.data);
      console.log(this.dataset);
    },
    evaluateStatus(fluFlag, shnFlag, contactFlag, temperature) {
      let status = "???";

      if (fluFlag !== undefined) {
        let flags =
          Number(fluFlag) +
          Number(shnFlag) +
          Number(contactFlag) +
          Number(temperature > 37.5);
        status = flags == 0 ? "Safe" : flags < 3 ? "Risky" : "Danger";
      } else {
        status = "Out of Office";
      }
      return status;
    },
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style>
.small {
  height: 100%;
  width:100%;
  padding: 0;
  position: relative;
}
</style>