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
            <v-toolbar-title>Stock Expiry </v-toolbar-title>
            <v-divider
              class="mx-2 black"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-select
              :items=peroid
              v-model="SetPeroid"
              label="Period:"
              id="SelPeroid"
               item-text="shortCode"
               item-value="text"
             

            ></v-select>


            <v-spacer></v-spacer>
           
           
             <v-btn rounded color="primary" dark
              @click="apiRequestCollection(SetPeroid)">Generate</v-btn>



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
                  >Entity</th>
          <th class="text-xs-center"
              scope="col">Branch</th>
          <th class="text-xs-center"
              scope="col">ItemCode</th>
          <th class="text-xs-center"
              scope="col">ADITMNAME</th>
          <th class="text-xs-center"
              scope="col">DEPEARTNMENTNAME </th>
              <th class="text-xs-center"
                  scope="col">QUANTITY</th>
              <th class="text-xs-center"
                  scope="col">BATCH_NO</th>
              <th class="text-xs-center"
                  scope="col">EXPITY DATE</th>
                  <th class="text-xs-center"
                      scope="col">UNITY PRICE</th>
                    
                    
                          <th class="text-xs-center"
                              scope="col">VENDOR</th>
                          

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
                          >{{item.DESCRIPTION}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.ORGANIZATIONNAME}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.REGION}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.ITEMCODE}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.ADITMNAME}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.DEPARTMENTNAME}}</td>

                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.QUANTITY}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.BATCH_NO}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.EXPIRYDATE}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.UNIT_PRICE}}</td>
                         
                         

                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black"
                          >{{item.VENDOR}}</td>
                          
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
	peroid:[  
	  {shortCode:'3 Month' ,text:'3'},
      {shortCode:'4 Month' ,text:'4'},
      {shortCode:'6 Month' ,text:'6'},
	], 
    SetPeroid : [],
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
stocklist:null,

    json_data: null,
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
    json_fields: {
      "ENTITY":"DESCRIPTION",
      "BRANCH": "ORGANIZATIONNAME",
      "REGION":"REGION",
      "ITEMCODE": "ITEMCODE",
      "ADITMNAME": "ADITMNAME",
	  "DEPARTMENTNAME": "DEPARTMENTNAME",
	  "QUANTITY": "QUANTITY",     
      "BATCH_NO":"BATCH_NO",
      "EXPIRYDATE":"EXPIRYDATE",
      "UNIT_PRICE":"UNIT_PRICE",
      "Total Value OF Expiry Items":"Total Value OF Expiry Items",	  
      "VENDOR":"VENDOR"


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

    apiRequestCollection(SetPeroid) {  
    
    if((this.SetPeroid=='')){
		alert("Please Select Period");
		return false;
	}





   this.loading = true;
   this.isLoading = true;
   this.$http
	//.get(`https://mis.dragarwal.com/api-stockexpiry/${this.SetPeroid}`)
     .get(`https://mis.dragarwal.com/api-stockexpiry/${this.SetPeroid}`)
               .then(response => {
       this.processDatacollection(response.data);
       this.isLoading = false;
        if(response.data!='')
       {
			alert('Data loaded.... Please download in excel');

       }
       console.log(response.data);

     });

  

  this.fileName = `StockExpiry_Report_${this.SetPeroid}.csv`;




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

     this.stocklist=data.result['stock'];
    // console.log('hit');
    // console.log(this.Collectionlist);
    //  this.show = true;
    },

    downloadExcelCollectionSuper() {
		let tempDataArr = [];
		tempDataArr =this.stocklist
		return tempDataArr;

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
