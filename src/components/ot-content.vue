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
            <v-toolbar-title>Surgery Cogs</v-toolbar-title>
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
                backgroundRevenueSuper-color="grey"
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
                  @click="$refs.menu.save(date);apiRequestOTSuper(date)"
                  style="outline:none"
                >Generate</v-btn>
              </v-date-picker>
            </v-menu>
           
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
                    width="15%"
                    scope="col"
                    colspan="2"
                  ></th>
                  <th                    
                    width="15%"
                    scope="col"
                    colspan="6"
                  >Revenue</th>
                  <th
                    
                    scope="col"
                    colspan="6"
                  >Cogs</th>
                  
                </tr>
			  
			  
			  
			  
			  
                <tr class="grey lighten-2">
                  <th
                    
                    width="15%"
                    scope="col"
                    rowspan="4"
                  >Branch</th>
                  <th
                    
                    scope="col"
                    colspan="3"
                  >FTD</th>
                  <th
                    
                    scope="col"
                    colspan="3"
                  >MTD</th>
				  <th
                    
                    scope="col"
                    colspan="3"
                  >FTD</th>
                  <th
                    
                    scope="col"
                    colspan="3"
                  >MTD</th>
                </tr>
                <tr class="grey lighten-2">
                  <th
                    scope="col"
                    
                  >Catract</th>
                  <th
                    scope="col"
                    
                  >Refractive</th>
                  <th
                    scope="col"
                    
                  >Vitro Retinal</th>
                  <th
                    scope="col"
                    
                  >Catract</th>
                  <th
                    scope="col"
                    
                  >Refractive</th>
                  <th
                    scope="col"
                    
                  >Vitro Retinal</th>
                  <th
                    scope="col"
                    
                  >Catract</th>
                  <th
                    scope="col"
                    
                  >Refractive</th>
                  <th
                    scope="col"
                    
                  >Vitro Retinal</th>
                  <th
                    scope="col"
                    
                  >Catract</th>
                  <th
                    scope="col"
                    
                  >Refractive</th>
                  <th
                    scope="col"
                    
                  >Vitro Retinal</th>
                </tr>
              </thead>
              <tbody>
                
                <tr
                  scope="row"
                  v-for="(item,index) in ot_details"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="text-xs-center"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    
                  >{{item.ftdCattraackt}}</td>
                  <td
                    scope="row"
                    
                  >{{item.ftdRefertactive}}</td>
                  <td
                    scope="row"
                    
                  >{{item.ftdVitroRetinal}}</td>
                  <td
                    scope="row"
                    
                  >{{item.mtdCattraackt}}</td>
                  <td
                    scope="row"
                    
                  >{{item.mtdRefertactive}}</td>
                  <td
                    scope="row"
                    
                  >{{item.mtdVitroRetinal}}</td>
                  <td
                    scope="row"
                    
                  >{{item.ftdCatractCogs}}</td>
                  <td
                    scope="row"
                    
                  >{{item.ftdRefertactiveCogs}}</td>
                  <td
                    scope="row"
                    
                  >{{item.ftdVitroRetinalCogs}}</td>
                  <td
                    scope="row"
                    
                  >{{item.mtdCatractCogs}}</td>
				  <td
                    scope="row"
                    
                  >{{item.mtdRefertactiveCogs}}</td>
				  <td
                    scope="row"
                    
                  >{{item.mtdVitroRetinalCogs}}</td>
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
  data: () => ({
    userName: null,
    isLoading: false,
    fullPage: true,
    dialog: false,
    dialogdata: null,
    title: null,
    formatteddate: null,
    rowColor: null,
    isActive: false,
    save: "save",
    show: false,
    fileDate: null,
    loading: false,
    date: null,
    menu: false,
    modal: false,
    menu2: false,
    today: "",    
    json_data: null,
	ot_details : null,
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
     json_fields: {
      "Branch": "branch",
      "FTD Catract": "ftdCattraackt",
      "FTD Refractive": "ftdRefertactive",
      "FTD Vitro Retinal": "ftdVitroRetinal",
      "MTD Catract": "mtdCattraackt",
      "MTD Refractive": "mtdRefertactive",
      "MTD Vitro Retinal": "mtdVitroRetinal",
      "FTD CatractCogs": "ftdCatractCogs",
      "FTD RefractiveCogs": "ftdRefertactiveCogs",
      "FTD Vitro RetinalCogs": "ftdVitroRetinalCogs",
      "MTD CatractCogs": "mtdCattraacktCogs",
      "MTD RefractiveCogs": "mtdRefertactiveCogs",
      "MTD Vitro RetinalCogs": "mtdVitroRetinalCogs"
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
    apiRequestOTSuper (date) {
      // let superUserName = sessionStorage.getItem("super_user");
      if (date !== null) {
        this.fileDate = date;
        this.fileName = `OT_Report_${this.fileDate}.csv`;
        this.loading = true;
        this.isLoading = true;
        this.$http
          .get(`https://mis.dragarwal.com/api-super-ot/${date}`)
          //.get(`http://localhost:8888/api-super-ot/${date}`)
                    .then(response => {
					
					console.log(response.data);
            this.processDataOT(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processDataOT (data) {
      this.ot_details = data;
      this.show = true;
    },
	downloadExcelOTSuper () {

      
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
