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
            <v-toolbar-title>Discount </v-toolbar-title>
            <v-divider
              class="mx-2 black"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-select :items=department
            v-model="Setdepartment"
            label="Department"
            item-text="shortCode"
           item-value="text"
            ></v-select>

<v-spacer></v-spacer>
            <v-menu
              absolute
              ref="menu1"
              :close-on-content-click="false"
              v-model="menu1"
              :nudge-right="40"
              :return-value.sync="fdate"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="200px"
            >
              <v-text-field
                slot="activator"
                v-model="fdate"
                placeholder="Select From Date"
                prepend-inner-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                color="primary"
                v-model="fdate"
                no-title
                scrollable
                :min="minDate"
                :max="maxDate"
                backgroundRevenue-color="red"
                style="box-shadow:none"
              >
                <v-spacer></v-spacer>
                <v-btn
                  flat
                  color="primary"
                  @click="menu1 = false"
                  style="outline:none"
                >Cancel</v-btn>
                <v-btn
                  flat
                  color="primary"
                  @click="$refs.menu1.save(fdate)"
                  style="outline:none"
                >Ok</v-btn>
              </v-date-picker>
            </v-menu>

        <v-spacer></v-spacer>
            <v-menu
              absolute
              ref="menu2"
              :close-on-content-click="false"
              v-model="menu2"
              :nudge-right="40"
              :return-value.sync="tdate"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="200px"
            >
              <v-text-field
                slot="activator"
                v-model="tdate"
                placeholder="Select To Date"
                prepend-inner-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker

                color="primary"
                v-model="tdate"
                no-title
                scrollable
                :min="minDate"
       :max="maxDate"
                backgroundRevenue-color="red"
                style="box-shadow:none"

              >
              <v-spacer></v-spacer>
              <v-btn
                flat
                color="primary"
                @click="menu2 = false"
                style="outline:none"
              >Cancel</v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.menu2.save(tdate)"
                style="outline:none"
              >Ok</v-btn>
              </v-date-picker>
            </v-menu>

             <v-btn rounded color="primary" dark
              @click="apiRequestDiscount(fdate,tdate,Setdepartment)">Generate</v-btn>



            <download-excel
              :data="json_data"
              :fields="json_fields"
              type="csv"
              :name="fileName"
              :fetch="downloadExcelRevenueSuper"
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
                  >Branch</th>
          <th class="text-xs-center"
              scope="col">Gross Bill amount</th>
          <th class="text-xs-center"
              scope="col">Discount Given</th>
          <th class="text-xs-center"
              scope="col">Net Amount (Cash received)</th>
          <th class="text-xs-center"
              scope="col">Discount as % of Gross Amount</th>
              <th class="text-xs-center"
                  scope="col">No Of Bills Raised</th>
              <th class="text-xs-center"
                  scope="col"># Bills Provided Discounts</th>
              <th class="text-xs-center"
                  scope="col"># Discounted Bills (%)</th>
                  <th class="text-xs-center"
                      scope="col">Actual Discount %* ( discounted bills only)</th>
                      <th class="text-xs-center"
                          scope="col">Position of Branch @ Group</th>
                </tr>


              </thead>
              <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in Discountlist"
                          >
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.BILLED}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black text-xs-right"
                          >{{(numberformat(item.GrossBillamount))}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black text-xs-right"
                          >{{(numberformat(item.DiscountGiven))}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black text-xs-right"
                          >{{(numberformat(item.NetAmount))}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black text-xs-right"
                          >{{Number(item.Discount_as_of_Gross_Amount).toFixed()}}%</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black text-xs-right"
                          >{{item.NoOfBillsRaised}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black text-xs-right"
                          >{{item.Bills_Provided_Discounts}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black text-xs-right"
                          >{{Number(item.Discounted_Bills).toFixed()}}%</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black text-xs-right"
                          >{{Number(item.ActualDiscount).toFixed()}}%</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black text-xs-right"
                          >{{index+1}}</td>
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

var curday = function(sp){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //As January is 0.
var yyyy = today.getFullYear();

if(dd<10) dd='0'+dd;
if(mm<10) mm='0'+mm;
return (yyyy+sp+mm+sp+dd);
};


export default {
  data: () => ({
    minDate: "2018-04-01",
        maxDate: curday('-'),
department:[
  { shortCode:'Select All' ,text:'' },
  {shortCode:'Pharmacy' ,text:'Pharmacy'},
      {shortCode:'Opticals' ,text:'Opticals'},
        {shortCode:'Laboratory' ,text:'Laboratory'},//combination unit=( INVESTIGATION,TREATEMT,LAB)
    {shortCode:'Surgery' ,text:'Surgery'},// unit=surgery
    {shortCode:'Surgery-Cataract' ,text:'Cataract'},// group = cataract and unit = surgery
        {shortCode:'Surgery-Refractive' ,text:'Refractive'},//unit=surgery group  =refractive
          {shortCode:'Surgery-Cornea' ,text:'Cornea'},// unit=surgery group  =cornea
      {shortCode:'Surgery-VR Injection' ,text:'VRInjection'},// unit=surgery, subgroup==vr - injection
          {shortCode:'Surgery-VR Surgery' ,text:'VRSurgery'},// unit=surgery and subgroup= vr-surgery
          {shortCode:'Surgery-Others' ,text:'Others'},//unit =surgery group = NOT IN ABOVE MENTIONED

],
Setdepartment:[],


    userName: null,
    isLoading: false,
    fullPage: true,

    title: null,
	  user_role : null,

    rowColor: null,
    isActive: false,
    save: "save",
    show: false,
    fileDate: null,
    loading: false,
    fdate: null,
    tdate: null,
    menu: false,
    menu1: false,
    modal: false,
    menu2: false,
    today: "",
discount:null,
Discountlist:null,

    json_data: null,
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
    json_fields: {
      "Branch":"BILLED",
      "Gross Bill amount": "GrossBillamount",
      "Discount Given":"DiscountGiven",
      "Net Amount (Cash received)": "NetAmount",
      "Discount as % of Gross Amount": "Discount_as_of_Gross_Amount",
	    "No Of Bills Raised": "NoOfBillsRaised",
	    "# Bills Provided Discounts": "Bills_Provided_Discounts",
      "# Discounted Bills (%)":"Discounted_Bills",
      "Actual Discount %* ( discounted bills only)":"ActualDiscount"

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


    numberformat(number){

      var fNumber = number;
      var sNumber = parseFloat(fNumber.toFixed(2)).toLocaleString('en-IN');
      return sNumber;
        },

    apiRequestDiscount(fdate,tdate,Setdepartment) {

      var date3 = new Date();
      var date4 = date3.getMonth() + "/" + date3.getDay() + "/" + date3.getYear();
      var currentDate = new Date(date4);

      if(fdate > tdate)
         {
             alert("From date should be less than todate");
             return false;
         }
         else if(fdate > currentDate)
         {
             alert("From Date should be less than current date");
             return false;
         }
                    else if(tdate > currentDate)
                    {
                        alert("To Date should be less than current date");
                        return false;
                     }


if((!this.fdate)||(!this.tdate) ){
  	alert("Please Select Date");
return false;
}else
{


  let department='';
  let frmdate='';
  let todate='';
  if (this.Setdepartment=='')
  {
   department='All' ;
   this.loading = true;
   this.isLoading = true;
   this.$http
    .get(`https://mis.dragarwal.com/api-discount-super/${this.fdate}/${this.tdate}/${department}`)
    //.get(`http://localhost:8888/api-discount-super/${this.fdate}/${this.tdate}/${department}`)
               .then(response => {
       this.processDatadiscount(response.data);
       this.isLoading = false;
     });

  }
  else if((this.Setdepartment=='Cataract')||(this.Setdepartment=='Refractive')||(this.Setdepartment=='Cornea') ||
(this.Setdepartment=='VR Injection')||(this.Setdepartment=='VR Surgery')||(this.Setdepartment=='Others'))
{
  //alert(this.Setdepartment);
  department=this.Setdepartment
  this.loading = true;
  this.isLoading = true;
  this.$http
    .get(`https://mis.dragarwal.com/api-discount-super/${this.fdate}/${this.tdate}/${department}`)
    //.get(`http://localhost:8888/api-discount-super/${this.fdate}/${this.tdate}/${department}`)
              .then(response => {
      this.processDatadiscount(response.data);
      this.isLoading = false;
    });

}
  else
  {

    department= this.Setdepartment;


    this.loading = true;
    this.isLoading = true;
    this.$http
      .get(`https://mis.dragarwal.com/api-discount-super/${this.fdate}/${this.tdate}/${department}`)
      //.get(`http://localhost:8888/api-discount-super/${this.fdate}/${this.tdate}/${department}`)
                .then(response => {
        this.processDatadiscount(response.data);
        this.isLoading = false;
      });
  }
  var str="_"
  this.fileDate = fdate.concat(str,tdate);
  console.log(this.fileDate);
  this.fileName = `Discount_Report_${this.fileDate}.csv`;


}

  },

    processDatadiscount (data) {
	  if (sessionStorage.getItem('super_user')){
	     this.user_role = 'super_user';
	  }else if(sessionStorage.getItem('overseas_user')){
	    this.user_role = 'overseas_user';
	  }else if(sessionStorage.getItem('indian_user')){
		this.user_role = 'indian_user';
  }else if(sessionStorage.getItem('optical_user')){
		this.user_role = 'optical_user';
  }

    this.Discountlist=data.result['Discount'];
    console.log(this.Discountlist);
      this.show = true;
    },

    downloadExcelRevenueSuper () {
let tempDataArr = [];
if (this.fileDate !== null) {
tempDataArr =this.Discountlist

return tempDataArr;
} else {
return null;
}
    },

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
.allindiagroup {
background-color : #f0ae19!important
}
.targetcolor {
  background-color : #FCD12A!important
}
.targetachicolor {
  background-color : #87CEFA!important
}
.branchesgrp{
background-color : #7083a9!important
}
.rotgrp{
background-color : #264e99!important
}
.whitefont{
font-weight: 900!important;
color : #ffffff!important
}
.ochfont{
background-color : #f9e699!important;
font-weight: 900!important;
color : #1d1d1d!important
}


</style>
