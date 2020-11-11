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
  props: ["data"],
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
        this.$props.data.forEach(meetings=> { 
            if(!this.locations.includes(meetings.locationName)) {
                this.locations.push(meetings.locationName) 
            }
        })
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
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
    }

        this.locations.forEach(location=> 
        {
locData.data.push(this.$props.data.filter(meetings=> meetings.locationName == location).length)
//          locData.label.push(location)
            
        }
        )
          this.dataset.datasets.push(locData);

    }}
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