import { HorizontalBar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: ["options"],

  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    width: function() {
      //console.log(this.width);
      //console.log(this.$data._chart.chart.width);
 
      this.renderChart(this.chartData, this.options);
      //this.$data._chart.chart.width = this.width;
    },
  },
};