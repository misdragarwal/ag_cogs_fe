<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-toolbar-title>Collection Recon Admin</v-toolbar-title>
          <v-divider class="mx-2 black" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- <v-autocomplete v-model="selbranch" :items="branch" label="Branch" item-text="shortCode" item-value="shortCode"></v-autocomplete>
          <v-spacer></v-spacer> -->
          <v-menu absolute ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="200px">
            <v-text-field slot="activator" v-model="date" placeholder="Select Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="date" no-title scrollable min="2021-07-01" :max="today" type=date backgroundRevenue-color="grey" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date);apiRequestCollectionrecon(date)" style="outline:none">Generate</v-btn>
            </v-date-picker>
          </v-menu>

          <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelCollectionrecon">
            <v-btn fab flat medium color="black">
              <v-tooltip bottom>
                <v-icon slot="activator" color="green darken-4">fas fa-file-excel</v-icon>
                <span>Export</span>
              </v-tooltip>
            </v-btn>
          </download-excel>


        </v-toolbar>


        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>

        <v-card-title>
          <v-text-field v-model="search" v-if="colldata" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>

        <v-card height='150' v-if="totalcollection">

          <v-card-text>
            <h4>
              <span style="float:left;">Total Cash collection <b>YTD</b></span>
              <span style="float:right;">Total Card Collection <b>YTD</b></span>

            </h4>

          </v-card-text>
          <v-card-text>
            <span style="float:left;">total IM cash collection (YTD) : {{NumberFormat(totalimcash)}}</span>
            <span style="float:right;">total IM card collection (YTD) : {{NumberFormat(totalimcard)}}</span>
          </v-card-text>
          <v-card-text>
            <span style="float:left;">total cash Deposit (YTD) : {{NumberFormat(totaldepcash)}}</span>
            <span style="float:right;">total card Deposit (YTD) : {{NumberFormat(totaldepcard)}}</span>
          </v-card-text>

          <v-card-text>
            <span style="float:left;">total cash Deposit Difference (YTD) : <b>{{NumberFormat((totalimcash-totaldepcash)-totalcashadmin1)}} </b></span>
            <span style="float:right;">total card Deposit Difference (YTD) : <b>{{NumberFormat((totalimcard-totaldepcard)-totalcardadmin1)}} </b> </span>
          </v-card-text>


        </v-card>




        <!-- Vuetify Data table -->
        <v-data-table :headers="headers" v-bind:pagination.sync="pagination" :items="colldata" v-model="selected" :search="search" class="elevation-1">
          <template slot="items" slot-scope="props">
            <tr @click="rowClick(props.item)">
            
              <td class="text-xs-right"
                <v-btn v-if="(((props.item.CASH_ADMIN ==null) || (props.item.CASH_ADMIN == '') || (props.item.CASH_ADMIN == 0)
                                 || (props.item.CARD_ADMIN ==null) || (props.item.CARD_ADMIN == '') || (props.item.CARD_ADMIN == 0)
                                 && (editoption(props.item.PAYMENT_OR_REFUND_DATE)!==null)))"

                    slot="activator" small fab @click.stop="$set(dialogsubmit, props.item.BRANCH, true)"  color="primary">
                  <v-icon>fas fa-pen</v-icon>
                </v-btn>

                <v-dialog v-model="dialogsubmit[props.item.BRANCH]" persistent max-width="1000px" lazy absolute :key="props.item.BRANCH">
                  <v-card>
                  <v-card-title>
                    <span class="headline">Collection Information</span>
                    <v-spacer></v-spacer>
                    <span class="headline">{{'Branch : '}}{{ props.item.BRANCH }} </span>
                    <v-spacer></v-spacer>
                    <span class="headline"> {{" Date : "}}{{props.item.PAYMENT_OR_REFUND_DATE}}</span>
                  </v-card-title>

                  <v-card-title>
                    <v-flex xs12 sm6 md3>
                      {{"Enter Diff Cash Amount :"}}
                    </v-flex>
                    <v-flex xs12 sm6 md3 v-if="(props.item.CASH_DIFF !=0)">
                      <v-text-field  class="inputPrice" type='number' v-model="collcashfin" clearable label="Cash Difference amount"></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm4 md3>
                      {{"Cash Difference :"}} <b>{{ Number(props.item.CASH_DIFF) + Number(collcashfin)}}</b>
                    </v-flex>
                  </v-card-title>

                  <v-card-title>
                    <v-flex xs12 sm6 md3>
                      {{"Enter Diff Card Amount :"}}
                    </v-flex>
                    <v-flex xs12 sm6 md3 v-if="(props.item.CARD_DIFF !=0)">
                      <v-text-field  class="inputPrice" type='number' v-model="collcardfin" clearable label="Card Difference amount"></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm8 md3>
                      {{"Card Difference :"}} <b>{{ Number(props.item.CARD_DIFF) + Number(collcardfin)}}</b>
                    </v-flex>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6>
                          <v-textarea clearable clear-icon="cancel" label="Remarks" v-model='collremarks'></v-textarea>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>


                  <v-card-actions>

                    <v-btn color="blue darken-1" flat @click.stop="$set(dialogsubmit, props.item.BRANCH, false)" >Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="rowSubmit(props.item,collcashfin,collcardfin,collremarks)" @click.stop="$set(dialogsubmit, props.item.BRANCH, false)" >Submit</v-btn>

                  </v-card-actions>

                </v-card>
                  </v-dialog>


                
              </td>
              
			  <td class="text-xs-left" >
                  <v-btn v-if="(props.item.challan)" slot="activator" small fab color="primary" @click="downloadchallan(props.item.challan)">
                    <v-icon>cloud_download</v-icon>
                  </v-btn>
              </td>
              <td class="text-xs-left" > <a @click="finview()">{{ props.item.BRANCH }} </a></td>
              <td class="text-xs-left" style="white-space: nowrap;">{{ props.item.PAYMENT_OR_REFUND_DATE }}</td>
              <td class="text-xs-left">{{ NumberFormat(props.item.CASH_AMOUNT) }}</td>
              <td class="text-xs-left">{{ NumberFormat(props.item.CASH_DEPOSIT) }}</td>
              <td class="text-xs-left">{{ NumberFormat(props.item.CASH_ADMIN) }}</td>
              <td class="text-xs-left">{{NumberFormat(props.item.CASH_DIFF)}}</td>
              <td class="text-xs-left">{{props.item.cash_remark}}</td>
              <!-- <td class="text-xs-left">{{props.item.status | statusVal}}</td> -->
              <td class="text-xs-left">{{NumberFormat(props.item.CARD_AMOUNT)}}</td>
              <td class="text-xs-left">{{NumberFormat(props.item.CARD_DEPOSIT)}}</td>
              <td class="text-xs-left">{{ NumberFormat(props.item.CARD_ADMIN)}}</td>
              <td class="text-xs-left">{{NumberFormat(props.item.CARD_DIFF)}}</td>
              <td class="text-xs-left">{{props.item.card_remark}}</td>
              <td class="text-xs-left">{{props.item.CH_REMARKS}}</td>
              <td class="text-xs-left">{{props.item.FINANCE_REMARKS}}</td>
              




            </tr>
          </template>
        </v-data-table>


        <back-to-top bottom="90px" right="90px">
          <v-btn class="red darken-4" dark absolute fab small>
            <v-icon>expand_less</v-icon>
          </v-btn>
        </back-to-top>


      </v-flex>
    </v-layout>
  </v-slide-y-transition>
</v-container>
</template>

<script>
import moment from "moment";
import {  serverBus } from "../main";
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
      dialogsubmit: {},
    pagination: {
      'sortBy': 'column2',
      'descending': true,
      'rowsPerPage': -1
    },
    minDate: '2021-07-01',
    maxDate: curday('-'),
    userName: null,
    isLoading: false,
    fullPage: true,
    branch: [],
    date: null,
    menu: false,
    today: "",
    yesterday: '',
    selbranch: '',
    search: '',
    colldata: null,
    selected: '',
    headers: [{
        text: 'EDIT',
        value: ''
      },
	  {
        text: 'Challan',
        value: ''
      },
      {
        text: 'Branch',
        value: 'BRANCH'
      },
      {
        text: 'Date',
        value: 'PAYMENT_OR_REFUND_DATE'
      },
      {
        text: 'Cash',
        value: 'CASH_AMOUNT'
      },
      {
        text: 'Branch Deposit',
        value: 'CASH_DEPOSIT'
      },
      {
        text: 'Fiance Input',
        value: 'Finance_input'
      },

      {
        text: 'Cash Diff(YTD)',
        value: 'Cash_Diff'
      },
      {
        text: 'Remarks(Cash diff)',
        value: 'Cash_Remark'
      },
      {
        text: 'Card',
        value: 'CARD_AMOUNT'
      },
      {
        text: 'Branch Deposit',
        value: 'CARD_DEPOSIT'
      },
      {
        text: 'Fiance Input',
        value: 'Finance_input'
      },
      {
        text: 'Card Diff(YTD)',
        value: 'Card_Diff'
      },
      {
        text: 'Remarks(Card diff)',
        value: 'Card_Remarks'
      },
      {
        text: 'Remarks',
        value: 'Remarks'
      },

      {
        text: 'Finance Comments',
        value: 'Finance Comments'
      }
      

    ],

    collcashch: '',
    collcashfin:'',
    collcardch: '',
    collcardfin:'',
    collremark: '',
    groupdata: '',
    collectionrecondata: '',
    collbranch: '',
    colldate: '',
    collcash: '',
    fincollcash:'',
    collimcash: '',
    collcard: '',
    fincollcard:'',
    collimcard: '',
    collremarks: '',
    totalcollection: null,
    totalbranch: '',
    totalimcash: '',
    totaldepcash: '',
    totalimcard: '',
    totaldepcard: '',
	totalcashadmin1:'',
	totalcardadmin1:'',
    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {
      "Entity": "PARENT_BRANCH",
      "BRANCH": "BRANCH",
      "DATE": "PAYMENT_OR_REFUND_DATE",
      "IM_CASH": "CASH_AMOUNT",
      "DEPOSITED_CASH": "CASH_DEPOSIT",
      "FINANCE_CASH":"CASH_ADMIN",
      "CASH_DIFF": "CASH_DIFF",
      "Cash_Remark":"cash_remark",
      "CASH_DEP_DATE":"CASH_DEP_DATE",
      "IM_CARD": "CARD_AMOUNT",
      "DEPOSITED_CARD": "CARD_DEPOSIT",
      "FINANCE_CARD":"CARD_ADMIN",
      "CARD_DIFF":"CARD_DIFF",
      "Card_Remarks":"card_remark",
      "CARD_DEP_DATE":"CARD_DEP_DATE",
      "Comments": "CH_REMARKS",
      "Finance_Comments":"FINANCE_REMARKS"
    },
    fileName: null,
    fileDate: null,
    prevcolldate: '',
    cashdiff: '',
    carddiff: '',
    collcashchdate: '',
    collcardchdate: '',
    collstatus: '',
    statuschcash: '',
    statuschcard: '',
    show: false,
	editdate:'',
	todaytime:'',

  }),
  created() {
    this.loadbranch();
	this.edtableDateOption();
    this.getYesterday();
  },
  methods: {

    getYesterday() {
      this.today = moment()
        .subtract(0, "days")
        .format("YYYY-MM-DD");
      this.yesterday = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      console.log(this.yesterday, this.today);

    },

    dated(date) {
      if (date == this.today) {
        return 'a'
      }
      // else if (date == this.yesterday) {
      //   return 'b'
      // }
       else {
        return null
      }
    },
	editoption(date) {
	
	  
      if (date >  moment(this.editdate).format("YYYY-MM-DD")) {
        return 'a'
      }
      
       else {
        return null
      }
    },
	finview(){
	    serverBus.$emit('changeComponent', 'coll_recon_fin_view')
	},
    loadbranch() {
      this.axios
        //.get(`https://mis.dragarwal.com/api-chbranch/${userid.userName}`).then(response => {
        .get(`https://mis.dragarwal.com/api-finbranch/${userid.userName}`).then(response => {
          this.branch = response.data;
        })
    },
	edtableDateOption() {
      this.axios
        //.get(`https://mis.dragarwal.com/collection_fin_edit_date`).then(response => {
        .get(`https://mis.dragarwal.com/api-collection_fin_edit_date`).then(response => {	  
		  
          this.editdate = response.data.result[0]['collection_deposit_edit'];
		 
        })
    },

    apiRequestCollectionrecon( date) {

      this.fileDate = date;
      this.fileName = `Collection_recon_Report_${this.fileDate}.csv`;

      this.isLoading = true;
      this.axios.get(`https://mis.dragarwal.com/api-fincollection-recon/${date}`)
        .then(response => {
          console.log(response);
          this.processDatacollection(response.data);
          console.log(this.today);
          this.axios.get(`https://mis.dragarwal.com/api-fingettotalcollection/${date}`)
            .then(response => {
              this.totalcollection = true;
              this.totalbranch = response.data[0]['BRANCH'];
              this.totalimcash = response.data[0]['CASH_AMOUNT'];
              this.totaldepcash = response.data[0]['CASH_DEPOSIT'];
              this.totalimcard = response.data[0]['CARD_AMOUNT'];
              this.totaldepcard = response.data[0]['CARD_DEPOSIT'];
			   this.totalcashadmin1 = response.data[0]['CASH_ADMIN'];
			  this.totalcardadmin1 = response.data[0]['CARD_ADMIN'];  
              this.isLoading = false;
            })


        })

    },
	downloadchallan(challan) {

      this.axios({
        //url: `https://mis.dragarwal.com/api-download-challan/${challan}`,
		url: `https://mis.dragarwal.com/api-download-challan/${challan}`,		
        method: 'GET',
        responseType: 'blob',
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', challan);
        document.body.appendChild(fileLink);

        fileLink.click();
      })

    },
    processDatacollection(data) {
      this.colldata = data.result['collection'];
    },

    rowSubmit(data,collcashfin,collcardfin,collremarks) {


      this.isLoading = true;
      this.$http.post(`https://mis.dragarwal.com/api-findepositamount`, {
        postingdate: data.PAYMENT_OR_REFUND_DATE,
        collcashfin: collcashfin,
        collcardfin: collcardfin,
        remarks: collremarks,
        branch: data.BRANCH,


      }).then(response => {
        if (response.data.dataupdated == true) {
          alert("Successfully updated")
          this.axios.get(`https://mis.dragarwal.com/api-fincollection-recon/${this.date}`)
            .then(response => {
              console.log(response);
              this.processDatacollection(response.data);
              this.collcash = '';
              this.collcard = '';
              this.statuschcash = '';
              this.statuschcard = '';
              this.collcashfin = '';
              this.collcardfin = '';

              this.collremarks = '';


              this.axios.get(`https://mis.dragarwal.com/api-fingettotalcollection/${this.date}`)
                .then(response => {

                  this.totalcollection = true;
                  this.totalbranch = response.data[0]['BRANCH'];
                  this.totalimcash = response.data[0]['CASH_AMOUNT'];
                  this.totaldepcash = response.data[0]['CASH_DEPOSIT'];
                  this.totalimcard = response.data[0]['CARD_AMOUNT'];
                  this.totaldepcard = response.data[0]['CARD_DEPOSIT'];
				  this.totalcashadmin1 = response.data[0]['CASH_ADMIN'];
			      this.totalcardadmin1 = response.data[0]['CARD_ADMIN'];  

                  this.isLoading = false;

                })


            })

        } else {
          this.isLoading = false;
          alert("Error in saving data")

        }
      })

    },

    rowclick(data) {
      //  process.exit();

      this.dialog = true;
      this.isLoading = true;
      this.$http.get(`https://mis.dragarwal.com/api-collectionrecon-data/${data.BRANCH}/${data.PAYMENT_OR_REFUND_DATE}`)
        .then(response => {
          console.log(response);

          this.collectionrecondata = response.data;
          this.collbranch = this.collectionrecondata[0]['BRANCH'];
          this.colldate = this.collectionrecondata[1]['PAYMENT_OR_REFUND_DATE'];
          this.collcash = this.collectionrecondata[1]['CASH_DEPOSIT'];
          this.collimcash = this.collectionrecondata[0]['CASH_AMOUNT'];

          this.collcard = this.collectionrecondata[1]['CARD_DEPOSIT'];
          this.collimcard = this.collectionrecondata[0]['CARD_AMOUNT'];
          this.collremarks = this.collectionrecondata[0]['CH_REMARKS'];
          this.prevcolldate = this.collectionrecondata[0]['PAYMENT_OR_REFUND_DATE'];
          this.cashdiff = this.collectionrecondata[1]['CASH_DIFF'];
          this.carddiff = this.collectionrecondata[1]['CARD_DIFF'];
          console.log(this.collectionrecondata);

  this.isLoading = false;

        })
    },
    downloadExcelCollectionrecon() {
      let tempDataArr = [];

      if (this.fileDate !== null) {
        tempDataArr = this.colldata;

        return tempDataArr;
      } else {
        return null;
      }
    },
    NumberFormat(data) {
      //    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(data)
      return new Number(data).toLocaleString("en-IN");
    },
    calccashamt(a) {
      this.calcamt_cash = Number(this.cashdiff) + Number(a)
      console.log(this.calcamt_cash);
    },
    collstatussel(a) {

      if (a == 'oth') {
        this.show = true;
      }
    }

  }

}
</script>
<style>

.inputPrice input[type='number'] {
    -moz-appearance:textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}



</style>
