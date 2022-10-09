<template>
  <v-container
    fluid
    fill-height
    class="grey lighten-3"
  >
    <v-slide-y-transition mode="out-in">
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm10
          offset-sm1
          md10
          offest-md1
          lg10
          offset-lg1
        >
          <v-toolbar
            flat
            color="grey lighten-2"
          >
            <v-toolbar-title>Domestic </v-toolbar-title>
            <v-divider
              class="mx-2 black"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-menu
              absolute
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="200px"
            >
              <v-text-field
                slot="activator"
                v-model="date"
                placeholder="Select Date"
                prepend-inner-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                color="primary"
                v-model="date"
                no-title
                scrollable
                min="2018-04-01"
                :max="today"
                backgroundRevenue-color="grey"
                style="box-shadow:none"
              >
                <v-spacer></v-spacer>
                <v-btn
                  flat
                  color="primary"
                  @click="menu = false"
                  style="outline:none"
                >Cancel</v-btn>
                <v-btn
                  flat
                  color="primary"
                  @click="$refs.menu.save(date);apiRequestRevenue(date)"
                  style="outline:none"
                >Generate</v-btn>
              </v-date-picker>
            </v-menu>
            <download-excel
              :data="json_data"
              :fields="json_fields"
              type="csv"
              :name="fileName"
              :fetch="downloadExcelRevenue"
            >
              <v-btn
                fab
                flat
                medium
                color="black"
              >
                <v-tooltip bottom>
                  <v-icon
                    slot="activator"
                    color="green darken-4"
                  >fas fa-file-excel</v-icon>
                  <span>Export</span>
                </v-tooltip>
              </v-btn>
            </download-excel>
          </v-toolbar>
          <loading
            :active.sync="isLoading"
            :is-full-page="fullPage"
            color="#7f0000"
            loader="bars"
          ></loading>
          <!-- Vuetify Data table -->
          <div class="table-responsive">
            <table
              class="table table-hover table-bordered"
              v-if="show"
            >
              <thead>
                <tr class="grey lighten-2">
                  <th
                    class="text-xs-left"
                    width="15%"
                    scope="col"
                    rowspan="2"
                  >Branch</th>
                  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >FTD (in lacs)	</th>
				  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >MTD (in lacs)	</th>
				  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >LYSMTD</th>
				  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >MTD Gr.%</th>
				 
				   <th
                    class="text-xs-center"
                    scope="col"
                    
                  >Target for the Month</th>
				  
				    <th
                    class="text-xs-center"
                    scope="col"
                    
                  >MTD Ach.%</th>
                </tr>
                
              </thead>
              <tbody>
                <tr
                  scope="row"
                  v-for="(item,index) in result"
                  :key="index+item.branch"
                  :class="changeColorRevenue(item) ? 'font-weight-black indigo lighten-2':'grey lighten-4'"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenue(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                
                </tr>
              </tbody>
            </table>
          </div>
          <back-to-top
            bottom="90px"
            right="90px"
          >
            <v-btn
              class="red darken-4"
              dark
              absolute
              fab
              small
            >
              <v-icon>expand_less</v-icon>
            </v-btn>
          </back-to-top>
          <!-- end Data Tabel -->
        </v-flex>
		
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
import moment from "moment";
import { serverBus } from "../main";
export default {
  // components: {
  //   loading
  // },
  data: () => ({

    mappings: null,
    globalStore: null,
    // ftdotcount: null,
    // mtdotcount: null,
    // cogsftdotcount: null,
    // cogsmtdotcount: null,
    userName: null,
    isLoading: false,
    fullPage: true,
    dialog: false,
    title: null,
    isActive: false,
    save: "save",
    show: false,
    fileDate: null,
    loading: false,
    date: null,
    formatteddate: null,
    menu: false,
    menu2: false,
    today: "",
    rowdata: null,
    rowColor: null,
    headingdata: null,
    tabledata: null,
result:null,	
    json_data: null,
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
    json_fields: {
      "Group/Branch": "branch",
      "FTD": "ftdopdrev",
      "MTD": "mtdopdrev",
	  "LMTD": "mtdopdrevlastyear",
	  "MTD%": "mtdopdpercentage",
    },
    fileName: null    
    
  }),
  created () {
    this.getToday();
  },
  methods: {
    getToday () {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },
    changeColorRevenue (data) {
      if (data.code === undefined) {
        return true;
      } else {
        return false;
      }
    },
    apiRequestRevenue (date) {
	console.log(date);
      let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
      if (date !== null) {
        this.fileDate = date;
        this.fileName = `revenue_${this.fileDate}.csv`;
        this.loading = true;
        this.isLoading = true;
        this.$http
         .get(`https://mis.dragarwal.com/mis-revenue-normal/${date}/${normalusername.name}`)
         //.get(`http://localhost:7777/mis-revenue-normal/${date}/${normalusername.name}`)
         
         .then(response => {
		 
		 console.log(response.data);		 
            this.processDataRevenue(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processDataRevenue (data) {
      let tempdata = [];
      let defCount = data.branch.length;
      let count = 0;
      this.globalStore = data.specialBranch;
      if (data.mappings.length === 0) {
        this.result = data.branch;
        count = defCount;
      } else {
        data.mappings.forEach(element => {
          // if (element.heading === "Karnataka") {
          //   tempdata.push(_.filter(data.group, { branch: element.heading })[0]);
          // } else {
          if (element.branches.length === 3) {
            tempdata.push(_.filter(data.group, { branch: element.heading })[0]);
          } else {
            if (element.heading === "Karnataka") {
              let splitbranches = element.branches.split("+");
              tempdata.push(
                _.filter(data.group, { branch: element.heading })[0]
              );
              splitbranches.forEach(branchele => {
                if (!["HUB", "MCC", "MYS","DWD"].includes(branchele)) {
                  tempdata.push(_.filter(data.branch, { code: branchele })[0]);
                  count++;
                }
              });
            } else {
              let splitbranches = element.branches.split("+");
              tempdata.push(
                _.filter(data.group, { branch: element.heading })[0]
              );
              splitbranches.forEach(branchele => {
                tempdata.push(_.filter(data.branch, { code: branchele })[0]);
                count++;
              });
            }
          }

          // }
        });
        data.branch.forEach(record => {
          if (!_.includes(tempdata, record)) {
            tempdata.push(record);
          }
        });
        this.result = tempdata;
		  
		
		
		
		
		
      }
      this.show = true;
    },
    downloadExcelRevenue () {
      let tempDataArr = [];
      if (this.fileDate !== null) {
        tempDataArr = this.result;
        return tempDataArr;
      } else {
        return null;
      }
    }
   
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
button.v-btn.v-btn--active.v-btn--icon.v-btn--floating.theme--light.primary::after {
  outline: none;
  box-shadow: none;
}
.btn:focus,
.btn.focus {
  outline: none;
  box-shadow: none;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.customTable {
  table-layout: fixed;
  width: 100px;
  height: 100px;
  border-collapse: collapse;
  touch-action: none;
}
table#stickyHeader thead {
  border-top: none;
  border-bottom: none;
  background-color: #000;
  touch-action: none;
}
.table-striped > tbody > tr:nth-child(2n + 2) > td,
.table-striped > tbody > tr:nth-child(2n + 2) > th {
  background-color: #e5e5f2;
  touch-action: none;
}
</style>
