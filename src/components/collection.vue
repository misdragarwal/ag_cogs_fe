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
            <v-toolbar-title>Collection </v-toolbar-title>
            <v-divider
              class="mx-2 black"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-select
              :items=entities
              v-model="SetEntity"
              label="Entity:"
              id="SelEntity"
               item-text="shortCode"
               item-value="text"
              v-on:change='getBranches'

            ></v-select>


            <v-spacer></v-spacer>
            <th width="20%">
              <v-select
                :items=branch
                v-model="SetBranch"
                label="Branch:"
                item-text="shortCode"
                item-value="text"
                id="SelBranch"

              ></v-select>
            </th>
            <v-spacer></v-spacer>
            <v-menu
              absolute
              ref="menu1"
              :close-on-content-click="false"
              v-model="menu1"
              :nudge-right="40"
              :return-value.sync="fromdate"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="200px"
            >
              <v-text-field
                slot="activator"
                v-model="fromdate"
                placeholder="Select From Date"
                prepend-inner-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                color="primary"
                v-model="fromdate"
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
                  @click="$refs.menu1.save(fromdate)"
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
              :return-value.sync="todate"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="200px"
            >
              <v-text-field
                slot="activator"
                v-model="todate"
                placeholder="Select To Date"
                prepend-inner-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker

                color="primary"
                v-model="todate"
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
                @click="$refs.menu2.save(todate)"
                style="outline:none"
              >Ok</v-btn>
              </v-date-picker>
            </v-menu>

             <v-btn rounded color="primary" dark
              @click="apiRequestCollection(fromdate,todate,SetEntity,SetBranch)">Generate</v-btn>



            <download-excel
              :data="json_data"
              :fields="json_fields"
              type="csv"
              :name="fileName"
              :fetch="downloadExcelCollectionSuper"
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
                  >PARENT_BRANCH</th>
          <th class="text-xs-center"
              scope="col">BRANCH</th>
          <th class="text-xs-center"
              scope="col">PATIENT_MRN</th>
          <th class="text-xs-center"
              scope="col">PATIENT_NAME</th>
          <th class="text-xs-center"
              scope="col">PAYMENT_OR_REFUND_DATE</th>
              <th class="text-xs-center"
                  scope="col">BILL_NO</th>
              <th class="text-xs-center"
                  scope="col">RECEIPT_NO</th>
              <th class="text-xs-center"
                  scope="col">TOTAL_BILL_AMT</th>
                  <th class="text-xs-center"
                      scope="col">CASH_AMOUNT</th>
                      <th class="text-xs-center"
                          scope="col">CARD_AMOUNT</th>
                          <th class="text-xs-center"
                              scope="col">CARD_SERVICE_CHARGE_AMOUNT</th>
                          <th class="text-xs-center"
                              scope="col">CHEQUE_AMOUNT</th>
                          <th class="text-xs-center"
                              scope="col">FUND_TRANSFER_AMOUNT</th>
                          <th class="text-xs-center"
                              scope="col">PAYTM_AMOUNT</th>
                              <th class="text-xs-center"
                                  scope="col">DD_AMOUNT</th>
                              <th class="text-xs-center"
                                  scope="col">REFUND_CASH_AMOUNT</th>
                              <th class="text-xs-center"
                                  scope="col">REFUND_CARD_AMOUNT</th>
                                  <th class="text-xs-center"
                                      scope="col">REFUND_CHEQUE_AMOUNT</th>
                                      <th class="text-xs-center"
                                          scope="col">CREDIT_CHEQUE_AMOUNT</th>
                                          <th class="text-xs-center"
                                              scope="col">CREDIT_CASH_AMOUNT</th>
                                              <th class="text-xs-center"
                                                  scope="col">PAYTM_CASH_AMOUNT</th>
                                              <th class="text-xs-center"
                                                  scope="col">PAYTM_FUND_AMOUNT</th>
                                              <th class="text-xs-center"
                                                  scope="col">DEPARTMENT</th>
                                                  <th class="text-xs-center"
                                                      scope="col">PAYMENT_NATURE</th>
                                                      <th class="text-xs-center"
                                                          scope="col">CREDIT_CHEQUE_AMOUNT</th>

                                                          <th class="text-xs-center"
                                                              scope="col">PAID_AMOUNT</th>
                                                              <th class="text-xs-center"
                                                                  scope="col">CREATEDBY</th>
                                                              <th class="text-xs-center"
                                                                  scope="col">PAYMENT_REFERENCE</th>
                                                                  <th class="text-xs-center"
                                                                      scope="col">PAYMENT_DETAIL</th>

                </tr>


              </thead>
              <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in Collectionlist"
                          >
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PARENT_BRANCH}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.BRANCH}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PATIENT_MRN}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PATIENT_NAME}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PAYMENT_OR_REFUND_DATE}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.BILL_NO}}</td>

                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.RECEIPT_NO}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.TOTAL_BILL_AMT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.CASH_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.CARD_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.CARD_SERVICE_CHARGE_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.CHEQUE_AMOUNT}}</td>

                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.FUND_TRANSFER_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PAYTM_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.DD_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.REFUND_CASH_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.REFUND_CARD_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.REFUND_CHEQUE_AMOUNT}}</td>

                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.CREDIT_CHEQUE_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.CREDIT_CASH_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PAYTM_CASH_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PAYTM_FUND_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.DEPARTMENT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PAYMENT_NATURE}}</td>

                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PAYMENT_MODE}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PAID_AMOUNT}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.CREATEDBY}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PAYMENT_REFERENCE}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.PAYMENT_DETAIL}}</td>
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
var dd = today.getDate()-1;
var mm = today.getMonth()+1; //As January is 0.
var yyyy = today.getFullYear();

if(dd<10) dd='0'+dd;
if(mm<10) mm='0'+mm;
return (yyyy+sp+mm+sp+dd);
};


export default {
  data: () => ({
    minDate: "2020-01-01",
        maxDate: curday('-'),
entities:[
  { shortCode:'Select All' ,text:'All' },
  {shortCode:'AEH' ,text:'AEH'},
      {shortCode:'AHC' ,text:'AHC'},
      {shortCode:'OHC' ,text:'OHC'},
],branch : [
    { shortCode: 'Select All', text: ''}

  ],

SetBranch : [],
SetEntity : [],
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
    fromdate: null,
    todate: null,
    menu: false,
    menu1: false,
    modal: false,
    menu2: false,
    today: "",
collection:null,
Collectionlist:null,

    json_data: null,
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
    json_fields: {
      "PARENT BRANCH":"PARENT_BRANCH",
      "BRANCH": "BRANCH",
      "PATIENT MRN":"PATIENT_MRN",
      "PATIENT NAME": "PATIENT_NAME",
      "PAYMENT OR REFUND_DATE": "PAYMENT_OR_REFUND_DATE",
	    "BILL NO": "BILL_NO",
	    "RECEIPT NO": "RECEIPT_NO",     
      "CASH AMOUNT":"CASH_AMOUNT",
      "CARD AMOUNT":"CARD_AMOUNT",
      "CARD SERVICE CHARGE_AMOUNT":"CARD_SERVICE_CHARGE_AMOUNT",
      "CHEQUE AMOUNT":"CHEQUE_AMOUNT",
      "FUND TRANSFER AMOUNT":"FUND_TRANSFER_AMOUNT",
      "PAYTM AMOUNT":"PAYTM_AMOUNT",
      "DD AMOUNT":"DD_AMOUNT",
      "BAJAJ_AMOUNT":"BAJAJ_AMOUNT",
      "REFUND CASH AMOUNT":"REFUND_CASH_AMOUNT",
      "REFUND CARD AMOUNT":"REFUND_CARD_AMOUNT",
      "REFUND CHEQUE AMOUNT":"REFUND_CHEQUE_AMOUNT",
      "CREDIT CHEQUEAMOUNT":"CREDIT_CHEQUE_AMOUNT",
      "CREDIT CASHAMOUNT":"CREDIT_CASH_AMOUNT",
      "PAYTM CASHAMOUNT":"PAYTM_CASH_AMOUNT",
      "PAYTM FUNDAMOUNT":"PAYTM_FUND_AMOUNT",
      "DEPARTMENT":"DEPARTMENT",
      "PAYMENT NATURE":"PAYMENT_NATURE",
      "PAYMENT MODE":"PAYMENT_MODE",
      "PAID AMOUNT":"PAID_AMOUNT",
      "CREATEDBY":"CREATEDBY",
      "PAYMENT REFERENCE":"PAYMENT_REFERENCE",
      "PAYMENT DETAIL":"PAYMENT_DETAIL",
	  "ONLINE AMOUNT":"ONLINE_AMOUNT",
    "ONLINE_MOBILE":"ONLINE_MOBILE",
      "REFUND_FUND_TRANSFER_AMOUNT":"REFUND_FUND_TRANSFER_AMOUNT",
      "REFUND_PAYTM_AMOUNT":"REFUND_PAYTM_AMOUNT",
      "REFUND_DD_AMOUNT":"REFUND_DD_AMOUNT",
      "REFUND_ONLINE_AMOUNT":"REFUND_ONLINE_AMOUNT"



    },
    fileName: null
  }),
  created () {
    this.getToday();
  },
  methods: {
getBranches(selectObj){
this.SetBranch = [];
  this.branch=[];
  var arr1=[{shortCode: 'Select All', text: ''}];
//if(this.SetEntity!='' && selectObj!='')
  this.axios
  .get(`https://mis.dragarwal.com/api-branch/${selectObj}`).then(response =>{
  //.get(`https://mis.dragarwal.com/api-branch/${selectObj}`).then(response =>{
    this.branch = arr1.concat(response.data);
  console.log(arr1);

    console.log(this.branch);

  })

//alert(selectObj);
},

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

    apiRequestCollection(fromdate,todate,SetEntity,SetBranch) {



      var date3 = new Date();
      var date4 = date3.getMonth() + "/" + date3.getDay() + "/" + date3.getYear();
      var currentDate = new Date(date4);

      if(fromdate > todate)
         {
             alert("From date should be less than todate");
             return false;
         }
         else if(fromdate > currentDate)
         {
             alert("From Date should be less than current date");
             return false;
         }
                    else if(todate > currentDate)
                    {
                        alert("To Date should be less than current date");
                        return false;
                     }


if((!this.fromdate)||(!this.todate) ){
  	alert("Please Select Date");
return false;
}
else
{

let entity='';
  let branch='';
  let fromdate='';
  let todate='';
  if ((this.SetEntity=='')&&(this.SetBranch==''))
  {
   entity='All' ;
   branch='All'


   this.loading = true;
   this.isLoading = true;
   this.$http
	//.get(`https://mis.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${entity}/${branch}`)
     .get(`https://mis.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${entity}/${branch}`)
               .then(response => {
       this.processDatacollection(response.data);
       this.isLoading = false;
        if(response.data!='')
       {
      alert('Data loaded.... Please download in excel');

       }
       console.log(response.data);

     });

  } else if((this.SetEntity=='')||(this.SetBranch==''))
  {
    console.log('else if');
if(this.SetEntity=='')
{
  this.SetEntity='All'
}else if(this.SetBranch=='')
{
  this.SetBranch='All'
}

branch=this.SetBranch;
entity=this.SetEntity;
this.loading = true;
this.isLoading = true;
 this.$http
 //.get(`https://mis.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${entity}/${branch}`)
.get(`https://mis.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${entity}/${branch}`)
  .then(response => {
this.processDatacollection(response.data);
this.isLoading = false;
console.log(response.data);
  if(response.data!='')
{
alert('Data loaded.... Please download in excel');
}

});


}else{
console.log('else');

  branch=this.SetBranch;
  entity=this.SetEntity;
  this.loading = true;
  this.isLoading = true;
   this.$http
   //.get(`https://mis.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${entity}/${branch}`)
  .get(`https://mis.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${entity}/${branch}`)
    .then(response => {
  this.processDatacollection(response.data);
  this.isLoading = false;
  console.log(response.data);
  if(response.data!='')
  {
alert('Data loaded.... Please download in excel');
  }

  });


}



branch=this.SetBranch;
entity=this.SetEntity;
  var str="_"
  this.fileDate = this.fromdate.concat(str,this.todate);
  this.file=entity.concat(str,branch,str,this.fileDate)
  console.log(this.fileDate);

  this.fileName = `Collection_Report_${this.file}.csv`;


}

  },

    processDatacollection (data) {
	  if (sessionStorage.getItem('super_user')){
	     this.user_role = 'super_user';
	  }else if(sessionStorage.getItem('overseas_user')){
	    this.user_role = 'overseas_user';
	  }else if(sessionStorage.getItem('indian_user')){
		this.user_role = 'indian_user';
  }else if(sessionStorage.getItem('optical_user')){
		this.user_role = 'optical_user';
  }else if(sessionStorage.getItem('coll_user')){
		this.user_role = 'coll_user';
  }

     this.Collectionlist=data.result['collection'];
    // console.log('hit');
    // console.log(this.Collectionlist);
    //  this.show = true;
    },

    downloadExcelCollectionSuper() {
let tempDataArr = [];
if (this.fileDate !== null) {
tempDataArr =this.Collectionlist

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
