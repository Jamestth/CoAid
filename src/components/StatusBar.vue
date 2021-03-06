<template>
  <div class="LineChart">
    <line-chart
      v-if="dataset.datasets[0]"
      :chart-data="dataset"
      :options="options"
      :width="chartWidth"
      :height="chartHeight"
      :key="sizeChange"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from "./StatusBar.js";
import { DateTime } from "luxon";
export default {
  props: ["data", "selectedDay"],
  components: {
    LineChart,
  },
  data() {
    return {
      sizeChange: 0,
      chartWidth: 0,
      chartHeight: 0,
      checkIn: [],
      dataset: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
        },

        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.chartWidth = document.getElementsByClassName(
      "LineChart"
    )[0].clientWidth;
    this.chartHeight = document.getElementsByClassName(
      "LineChart"
    )[0].clientHeight;
    this.formatData();
  },
  watch: {
    props: function () {
      this.formatData();
    },
    chartWidth: function () {
      this.sizeChange++;
    },
    chartHeight: function () {
      this.sizeChange++;
    },
  },
  methods: {
    onResize(event) {
      try {
        event;
        this.chartWidth = document.getElementsByClassName(
          "LineChart"
        )[0].clientWidth;
        this.chartHeight = document.getElementsByClassName(
          "LineChart"
        )[0].clientHeight;
      } catch (err) {
        err;
      }
    },
    formatData() {
      var i;
      this.$props.data.forEach((x) => {
        let record = {
          checkIn: DateTime.fromSeconds(x.checkIn.seconds),
          status: this.evaluateStatus(
            x.fluFlag,
            x.shnFlag,
            x.contactFlag,
            x.temperature
          ),
        };
        this.checkIn.push(record);
      });
      let RiskyData = {
        label: "Risky",
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.1)",
        fill: true,
        data: [],
      };
      let DangerData = {
        label: "Danger",
        borderColor: "#dc3545",
        backgroundColor: "rgba(255, 10, 13, 0.1)",
        fill: true,
        data: [],
      };

      for (i = -this.$props.selectedDay.value; i >= 0; i--) {
        let curDay = DateTime.local().minus({ days: i });
        this.dataset.labels.push(curDay.toFormat("dd LLL"));
        let curDayCheckins = this.checkIn.filter((x) => {
          let difftime = x.checkIn.diff(curDay, ["days", "hours"]).toObject();
          return difftime.days == 0 && difftime.hours >= 0;
        });
        if (curDayCheckins) {
          RiskyData.data.push(
            curDayCheckins.filter((x) => x.status == "Risky").length
          );
          DangerData.data.push(
            curDayCheckins.filter((x) => x.status == "Danger").length
          );
        } else {
          RiskyData.data.push(0);
          DangerData.data.push(0);
        }
      }
      this.dataset.datasets.push(RiskyData);
      this.dataset.datasets.push(DangerData);
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
  },
};
</script>

<style>
.LineChart {
  padding: 0;
  position: relative;
  display: -webkit-inline-box;
  width: 100%;
  height: 100%;
}
</style>