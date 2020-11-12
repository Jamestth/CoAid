<template>
  <div class="small">
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
import LineChart from "./BarChart.js";
//import { DateTime } from "luxon";
export default {
  props: ["data", "selectedDay"],
  components: {
    LineChart
  },
  data() {
    return {
      sizeChange: 0,
      chartWidth: 0,
      chartHeight: 0,
      locations: [],
      dataset: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        legend: {
          display: false
        },

        scales: {
          xAxes: [
            {
              type: "category",
              labels: []
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  },
  mounted() {

    window.addEventListener("resize", this.onResize);
    this.chartWidth = document.getElementsByClassName("small")[0].clientWidth;
    this.chartHeight = document.getElementsByClassName("small")[0].clientHeight;
    this.formatData();
  },
  watch: {
    props: function() {
      this.formatData();
    },
    chartWidth: function() {
      this.sizeChange++;
    },
    chartHeight: function() {
      this.sizeChange++;
    }
  },
  methods: {
    onResize(event) {
      event;
      this.chartWidth = document.getElementsByClassName("small")[0].clientWidth;
      this.chartHeight = document.getElementsByClassName(
        "small"
      )[0].clientHeight;
    },
    formatData() {
      this.$props.data.forEach(meetings => {
        if (!this.locations.includes(meetings.locationName)) {
          this.locations.push(meetings.locationName);
        }
      });
      /*
        this.locations.forEach(location=> 
        {
            let locData = {
                label: [],
                borderColor: "#ffc107",
                //backgroundColor: "#ffc107",
                fill: false,
                data: [this.$props.data.filter(meetings=> meetings.locationName == location).length ]
            }
            this.dataset.datasets.push(locData);
        }
        )*/

      let locData = {
        data: [],
        label: [],
        backgroundColor: []
      };
      let palette = [
        "#F9E79F",
        "#82E0AA",
        "#F8C471",
        "#DAF7A6",
        "#27AE60",
        "#90BE6D",
        "#43AA8B",
        "#4D908E",
        "#577590",
        "#277DA1"
      ];
      var i = 0;
      this.locations.forEach(location => {
        locData.data.push(
          this.$props.data.filter(meetings => meetings.locationName == location)
            .length
        );
        locData.label.push(location);
        this.options.scales.xAxes[0].labels.push(location);
        locData.backgroundColor.push(palette[i % 11]);
        i++;
      });
      this.dataset.datasets.push(locData);
    }
  }
};
</script>

<style>
.small {
  padding: 0;
  position: relative;
  display: -webkit-inline-box;
  width: 100%;
  height: 100%;
}
</style>