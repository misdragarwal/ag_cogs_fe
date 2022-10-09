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
            <v-toolbar-title>Revenue Report(with Referral)</v-toolbar-title>
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
                  @click="$refs.menu.save(date);apiRequestRevenueReportSuper(date)"
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
                    scope="col"
                    
                  >Date</th>
                  <th
                    scope="col"
                    
                  >Branch</th>
                  <th
                    scope="col"
                    
                  >CONSULTATION</th>
                  <th
                    scope="col"
                    
                  >CONTACT LENS</th>
                  <th
                    scope="col"
                    
                  >INVESTIGATION</th>
                  <th
                    scope="col"
                    
                  ><th
                    scope="col"
                    
                  >LAB</th>
                  <th
                    scope="col"
                    
                  >OPTICALS</th>
                  <th
                    scope="col"
                    
                  >OTHERS</th>
                  <th
                    scope="col"
                    
                  >PHARMACY</th>
                  <th
                    scope="col"
                    
                  >SURGERY</th>
                  <th
                    scope="col"
                    
                  >TREATMENT</th>
                  <th
                    scope="col"
                    
                  >Grand Total</th>
                </tr>
              </thead>
              <tbody>
                
                <tr
                  scope="row"
                  v-for="(item,index) in revenue_report_details.FTD"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="text-xs-center"
                    
                    style="cursor:pointer"
                  >{{item.DATE}}</td>
				  <td
                    scope="row"
                    :class="text-xs-center"
                    
                    style="cursor:pointer"
                  >CMH</td>
                  <td
                    scope="row"
                    
                  >{{item.CONSULTATION}}</td>
                  <td
                    scope="row"
                    
                  >{{item.CONTACTLENS}}</td>
                  <td
                    scope="row"
                    
                  >{{item.INVESTIGATION}}</td>
				  <td
                    scope="row"
                    
                  >{{item.LAB}}</td>
                  <td
                    scope="row"
                    
                  >{{item.LABORATORY}}</td>
                  <td
                    scope="row"
                    
                  >{{item.OPTICALS}}</td>
                  <td
                    scope="row"
                    
                  >{{item.OTHERS}}</td>
                  <td
                    scope="row"
                    
                  >{{item.PHARMACY}}</td>
                  <td
                    scope="row"
                    
                  >{{item.SURGERY}}</td>
                  <td
                    scope="row"
                    
                  >{{item.TREATMENT}}</td>
                  <td
                    scope="row"
                    
                  >{{item.TOTAL}}</td>
				  
                </tr>       
              </tbody>
			  
			  
			   <thead>
				
                <tr class="grey lighten-2">
                  <th
                    scope="col"
                    
                  >Grand Total</th>
                  <th
                    scope="col"
                    
                  >CMH</th>
                  <th
                    scope="col"
					                  
                  >{{consuMtdAmount}}</th>
                  <th
                    scope="col"
                    
                  >{{lensMtdAmount}}</th>
                  <th
                    scope="col"
                    
                  >{{investMtdAmount}}</th>
                  <th
                    scope="col"
                    
                  >{{labMtdAmount}}</th>
				  <th
                    scope="col"
                    
                  >{{laboratoryMtdAmount}}</th>
                  <th
                    scope="col"
                    
                  >{{optiMtdAmount}}</th>
                  <th
                    scope="col"
                    
                  >{{othersMtdAmount}}</th>
                  <th
                    scope="col"
                    
                  >{{phrMtdAmount}}</th>
                  <th
                    scope="col"
                    
                  >{{surgMtdAmount}}</th>
                  <th
                    scope="col"
                    
                  >{{treatmentMtdAmount}}</th>
                  <th
                    scope="col"
                    
                  >{{totalMtdAmt}}</th>
                </tr>
              </thead>
			  
			  
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
	revenue_report_details : null,
    phrMtdAmount : null,
	surgMtdAmount : null,
	consuMtdAmount : null,
	othersMtdAmount : null,
	treatmentMtdAmount : null,
	investMtdAmount : null,
	optiMtdAmount : null,
	totalMtdAmt : null,
	laboratoryMtdAmount: null,
	lensMtdAmount: null,
    labMtdAmount: null
    
    
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
    apiRequestRevenueReportSuper (date) {
      // let superUserName = sessionStorage.getItem("super_user");
      if (date !== null) {
       
        this.loading = true;
        this.isLoading = true;
        this.$http
          .get(`https://mis.dragarwal.com/api-super-ideamed-revenue/${date}`)
           //.get(`http://localhost:8888/api-super-ideamed-revenue/${date}`)
                    .then(response => {
					
					console.log(response.data);
            this.processRevenueReportData(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processRevenueReportData (data) {
      this.revenue_report_details = data;
      this.show = true;
	  this.phrMtdAmount = data.MTD.PHARMACYMTD;
	  this.surgMtdAmount = data.MTD.SURGERYMTD;
		this.consuMtdAmount = data.MTD.CONSULTATIONMTD;
		this.othersMtdAmount = data.MTD.OTHERSMTD;
		this.treatmentMtdAmount = data.MTD.TREATMENTMTD;
		this.investMtdAmount = data.MTD.INVESTIGATIONMTD;
		this.optiMtdAmount = data.MTD.OPTICALSMTD;
		this.totalMtdAmt = data.MTD.TOTALMTD;
		this.laboratoryMtdAmount=data.MTD.LABORATORYMTD;
		this.lensMtdAmount=data.MTD.CONTACTLENSMTD;
		this.labMtdAmount=data.MTD.LABMTD;
		
	  
	  
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
