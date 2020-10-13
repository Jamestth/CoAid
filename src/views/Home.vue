<template>
  <b-container fluid>
    <b-row class="text-center">
      <b-col></b-col>
      <b-col cols="6">
        <h1 style = "text-align:left; font-size:2.5em;">Welcome back {{ this.userInfo.name }}</h1>
        <!-- User Interface controls -->
        <b-row class="pb-3">
          <b-col></b-col>
          <b-col cols="6" class="mr-auto">
            <b-form-group
              label="Department"
              label-class="font-weight-bold"
              label-cols-sm="4"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
            >
              <b-form-select
                v-model="filter.department"
                id="perPageSelect"
                size="sm"
                :options="filterOptions"
              ></b-form-select>
            </b-form-group>
            <b-form-group
              class="mb-0"
              label="Name"
              label-class="font-weight-bold"
              label-cols-sm="4"
              label-align-sm="right"
              label-size="sm"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filter.name"
                  type="search"
                  id="filterInput"
                  placeholder="Search by Name"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- Main table element -->
        <b-table
          show-empty
          small
          stacked="md"
          :items="employees"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-function="filterPredicate"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          :striped="true"
          :bordered="true"
          :hover="true"
          :head-variant="headVariant"
        >
          <template v-slot:cell(status)="row">
            <b-badge :variant="row.item.statusType">
              {{ row.item.status }}</b-badge
            >
          </template>
          <template v-slot:cell(avatar)="row">
            <b-avatar
              src="https://placekitten.com/300/300"
              size="2rem"
            ></b-avatar>
            {{ row.empty }}
          </template>
        </b-table>

        <b-row>
          <b-col sm="7" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="right"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import stringSimilarity from "string-similarity";
import employees from "../assets/employees.js";
export default {
  data() {
    return {
      components: {
        stringSimilarity,
      },
      employees: employees,
      userId: 9102,
      userInfo: [],
      fields: [
        {
          key: "avatar",
          label: "",
          sortable: false,
        },
        {
          key: "name",
          label: "Employee",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "department",
          label: "Department",
          sortable: true,
          class: "text-center",
        },
        {
          key: "status",
          label: "Status",
          // eslint-disable-next-line no-unused-vars
          formatter: (value, key, item) => {
            if (value == "COVID") {
              return 3;
            } else if (value == "Healthy") {
              return 1;
            } else {
              return 2;
            }
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: {
        department: "All",
        name: "",
      },
      filterOptions: ["All", "HR", "Marketing", "IT", "Sales"],
      headVariant: "dark",
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.employees.length;
    // Get user info
    this.userInfo = this.employees.filter(x => x.eID == this.userId)[0];

  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    filterPredicate(item, filter) {
      var deptPred =
        filter.department == "All" || item.department == filter.department;
      var filterlen = filter.name.length;
      var itemSubstring = item.name.substring(0, filterlen).toUpperCase();
      var searchString = filter.name.toUpperCase();
      var namePred =
        filter.name == "" ||
        stringSimilarity.compareTwoStrings(itemSubstring, searchString) >= 0.4;
      return deptPred && namePred;
    },

  },
};
</script>
