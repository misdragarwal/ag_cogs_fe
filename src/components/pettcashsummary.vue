<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-spacer></v-spacer>
          <th width="20%">
            <v-autocomplete :items="branch" v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-autocomplete>
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

          <v-btn rounded color="primary" dark @click="apiRequestfinpcsummary(SetBranch,fromdate,todate)">Generate</v-btn>
          <v-btn color="primary" dark @click="gotoback()">
                    Back
                  </v-btn>


        </v-toolbar>
        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>

        <!-- Vuetify Data table -->

        <template>
          <v-card-title>
            <v-toolbar-title>Petty Cash Summary</v-toolbar-title>
            
            
  
            
          </v-card-title>

          <v-data-table :headers="headers" :items="strch" v-model="selected" :search="search" class="elevation-4">
            <template slot="items" slot-scope="props">
              <tr>
                <td >{{ props.item.OPENING_BALANCE }}</td>
                <td class="text-xs-left">{{ props.item.refilled }}</td>
                <td class="text-xs-left">{{ props.item.SCHApproved }}</td>
                <td class="text-xs-right">{{ props.item.Finance_approved }}</td>
                <td class="text-xs-right">{{ props.item.CHcancelled }}</td>

                <td class="text-xs-right" style="color:red">{{ props.item.SCHcancelled }}</td>
                <td class="text-xs-right" style="color:blue">{{ props.item.Finance_cancelled }}</td>
				 <td class="text-xs-right" style="color:blue">{{ props.item.balance }}</td>
				 
				 
                 <td class="text-xs-left">
                   <download-excel
					  :data="json_data"
					  :fields="json_fields"
					  type="csv"
					  :name="fileName"
					  :fetch="downloadExcelPCDetails"
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
                </td>
              

              </tr>
            </template>
          </v-data-table>
		  
		  
		  

        </template>

        <back-to-top bottom="90px" right="90px">
          <v-btn class="red darken-4" dark absolute fab small>
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
import {
  serverBus
} from "@/main";

var curday = function(sp) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return (yyyy + sp + mm + sp + dd);
};

export default {
  data: () => ({
    
    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {
      "STATUS": "STATUS",
          "sno": "sno",
          "entity": "entity",
          "branch": "branch",
          "CODE": "CODE",
          "category name": "category_name Welfare",
          "ledger head": "ledger_head",
          "voucher no": "voucher_no",
          "vendorname": "vendorname",
          "bill no": "bill_no",
          "bill date": "bill_date",
          "remarks": "remarks",
          "credit": "credit",
          "debit": "debit",
          "refilled_date": "refilled_date",
          "ch id": "ch_id",
          "created_date": "created_date",
          "sch id": "sch_id",
          "sch approved_date": "sch_approved_date",
          "fin id": "fin_id",
          "fin approved_date": "fin_approved_date",
          "bill submission": "bill_submission",
          "cancel by": "cancel_by",
          "cancel date": "cancel_date",
          "OPENING": "OPENING_VALUE", 
		  "CLOSING VALUE": "CLOSING_VALUE"
    },
    fileName: null,
    approvevalid: true,
    declinievalid: true,
    items: [],
    category: [],
    enabled: false,
    enabled1: false,
    dialogcancel: {},
    dialogcategory: {},
    dialogapprove: {},
    refillamount: '',
    schcomments: '',
    SetBranch: [],
    branch: [{
        shortCode: 'Select All',
        text: 'All'
      }

    ],
    SetStatus: [],
    fromdate: null,
    todate: null,
    minDate: "2020-08-01",
    maxDate: curday('-'),
    menu1: false,
    menu2: false,
    isLoading: false,
    fullPage: true,
    headers: [{
        text: 'Opening Balance',
        value: 'OPENING_BALANCE',	
        sortable: false,
        
      },
      {
        text: 'Refilled',
        value: 'refilled',
        sortable: false
      },
      {
        text: 'SCHApproved',
        value: 'SCHApproved',
        sortable: false
      },
      {
        text: 'FinanceApproved',
        value: 'FinanceApproved',
        sortable: false
      },

      {
        text: 'CHcancelled',
        value: 'CHcancelled',
        sortable: false
      },
      {
        text: 'SCHcancelled',
        value: 'SCHcancelled',
        sortable: false
      },
      {
        text: 'Financecancelled',
        value: 'Finance_cancelled'


      },

      {
        text: 'Balance',
        value: 'balance',
        sortable: false
      }
	  ,
	  
	  {
        text: 'Download',
        value: 'Download',
        sortable: false
      }
    ],
    selected: '',
    search: '',
    strch: null,
    dialog: false,
    show: false,
    showgroup: false,

    showgroupdetail: false,

    selecteddata: [],
    reportpettycash: null,
    groupdata: '',
	Collectionlist:null,
	

  }),
  mounted() {
    this.loadbranch();
    
  },
  methods: {
    
 

    loadbranch() {
      let userid = JSON.parse(sessionStorage.getItem("fin_user"));
      this.SetBranch = [];
      this.branch = [];
      var arr1 = [{
        shortCode: 'Select All',
        text: 'All'
      }];
      this.axios
        //  .get(`https://scm.dragarwal.com/api-branch/${selectObj}`).then(response =>{
        .get(`https://mis.dragarwal.com/api-finbranch/${userid.userName}`).then(response => {
          this.branch = arr1.concat(response.data);
          console.log(this.branch);
        })


    },

    apiRequestfinpcsummary(SetBranch,fromdate,todate) {
      // if ((this.fromdate == '') || (this.fromdate == '')) {
      //   alert("Please select Month");
      //   return false;
      // }
	  var date3 = new Date();
      var date4 = date3.getMonth() + "/" + date3.getDay() + "/" + date3.getYear();
      var currentDate = new Date(date4);
	  
      if ((this.SetBranch == '') || (this.SetBranch == null)) {
        alert("Please select branch")
        return false;
      }else if((!this.fromdate)||(!this.todate) ){
			alert("Please Select Date");
			return false;
	 } 
     else if(fromdate > todate)
	 {
		 alert("From date should be less than todate");
		 return false;
	 }
         
	 else if(todate > currentDate)
	 {
		alert("To Date should be less than current date");
		return false;
	 }
      this.isLoading = true;
      //    let userid = JSON.parse(sessionStorage.getItem("fin_user"));
      let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
      console.log(normalusername);
      this.$http.get(`https://mis.dragarwal.com/api-finpc-summary/${this.SetBranch}/${fromdate}/${todate}`)
        .then(response => {
           
          this.processliststrchdata(response.data,this.SetBranch,fromdate,todate);



        })
      


    },
    processliststrchdata(data,branch,fromdate,todate) {
      this.strch = data.result["pcbill"];
      this.show = true;
	  
	  this.$http.get(`https://mis.dragarwal.com/api-finpc-details/${this.SetBranch}/${fromdate}/${todate}`)
        .then(response => {
		   this.isLoading = false;
            this.fileName = `pc_details_${this.SetBranch}.csv`;	
            if(response.data!='')
			{   this.Collectionlist=response.data.result['pcbill'];
				
			}		  
        })
    },
	downloadExcelPCDetails() { 
		let tempDataArr = [];		
		if (this.Collectionlist !== null) {	  
				tempDataArr =this.Collectionlist;
				return tempDataArr;
		   } else {
				return null;
		   } 
    },
	gotoback(){
		serverBus.$emit('changeComponent', 'Cashapproval')
	}
	
    

   


   

  }
}
</script>

<style >
.inlineTable {
  display: inline-block;
}
</style>
