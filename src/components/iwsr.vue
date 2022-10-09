<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-toolbar-title>IWSR </v-toolbar-title>
          <v-divider class="mx-2 black" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-select :items=entities v-model="SetEntity" label="Entity:" id="SelEntity" item-text="shortCode" item-value="text"></v-select>

          <v-spacer></v-spacer>
          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="200px">
            <v-text-field slot="activator" v-model="fromdate" placeholder="Select From Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="fromdate" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>
          <v-menu absolute ref="menu2" :close-on-content-click="false" v-model="menu2" :nudge-right="40" :return-value.sync="todate" lazy transition="scale-transition" offset-y full-width min-width="200px">
            <v-text-field slot="activator" v-model="todate" placeholder="Select To Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="todate" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu2 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu2.save(todate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>

          <v-btn rounded color="primary" dark @click="apiRequestiwsr(fromdate,todate,SetEntity)">Generate</v-btn>



          <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelCollectionSuper">
            <v-btn fab flat medium color="black">
              <v-tooltip bottom>
                <v-icon slot="activator" color="green darken-4">fas fa-file-excel</v-icon>
                <span>Export</span>
              </v-tooltip>
            </v-btn>
          </download-excel>
        </v-toolbar>
        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>
        <v-dialog
             v-model="dialog"
             persistent
             max-width="290"
           >
           <v-card>
        <v-card-title class="headline">
          Use Google's location service?
        </v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

        </v-card-actions>
      </v-card>
         </v-dialog>
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
} from "../main";

var curday = function(sp) {
  var today = new Date();
  var dd = today.getDate() - 1;
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return (yyyy + sp + mm + sp + dd);
};
var start = function() {

  alert("Download Started... Please wait Untill Download complete....");
};
var stop = function() {
  alert("Download Completed");
};

export default {
  data: () => ({
    minDate: "2020-04-01",
    maxDate: curday('-'),
    entities: [{
        shortCode: 'Select All',
        text: 'All'
      },
      {
        shortCode: 'AEH',
        text: 'AEH'
      },
      {
        shortCode: 'AHC',
        text: 'AHC'
      },
	  {
        shortCode: 'AHI',
        text: 'AHI'
      },
      {
        shortCode: 'OHC',
        text: 'OHC'
      },
    ],
    branch: [{
        shortCode: 'Select All',
        text: ''
      }

    ],
dialog:false,
    SetBranch: [],
    SetEntity: [],
    userName: null,
    isLoading: false,
    fullPage: true,

    title: null,
    user_role: null,

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
    collection: null,
    Iwsrlist: null,

    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {
      "BILLID": "EXTERNAL_ID",
      "BRANCH": "NATIVE",
      "Billed": "BILLED",
      "BILLDATE": "TRANSACTION_DATE",
      "BILLNO": "BILLNO",
      "PATIENTID": "MRN",
      "PATIENTNAME": "AGENCY_NAME",
      "PATIENT_AGE": "PATIENT_AGE",
      "VISITTYPE": "vtype",
      "UNIT": "UNIT",
      "GROUP": "GROUP",
      "SUBGROUP": "SUBGROUP",
      "ITEMNAME": "ITEMNAME",
      "ITEMCODE": "ITEMCODE",
      "AMOUNT": "TOTAL_AMOUNT",
      "QUANTITY": "QUANTITY",
      "DISCOUNT_AMOUNT": "DISCOUNT_AMOUNT",
      "NET_AMOUNT": "NET_AMOUNT",
      "PAYOR_AMOUNT": "PAYOR_AMOUNT",
      "PATIENT_AMOUNT": "PATIENT_AMOUNT",
      "PAYORTYPE": "PAYORTYPE",
      "PAYORNAME": "PAYER_NAME",
      "CGST": "CGST",
      "SGST": "SGST",
      "GST %": "GST%",
      "Patient Amount W/O GST": "Net_Amount_W/O_GST",
      "CGST Value": "CGST_Value",
      "SGST Value": "SGST_Value",
      "MANUFACTURER": "MANUFACTURER"


    },
    fileName: null
  }),
  created() {
    this.getToday();
  },
  methods: {
    getToday() {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },


    numberformat(number) {

      var fNumber = number;
      var sNumber = parseFloat(fNumber.toFixed(2)).toLocaleString('en-IN');
      return sNumber;
    },

    apiRequestiwsr(fromdate, todate, SetEntity) {



      var date3 = new Date();
      var date4 = date3.getMonth() + "/" + date3.getDay() + "/" + date3.getYear();
      var currentDate = new Date(date4);

      if (fromdate > todate) {
        alert("From date should be less than todate");
        return false;
      } else if (fromdate > currentDate) {
        alert("From Date should be less than current date");
        return false;
      } else if (todate > currentDate) {
        alert("To Date should be less than current date");
        return false;
      }

      if ((!this.fromdate) || (!this.todate)) {
        alert("Please Select Date");
        return false;
      } else {

        let entity = '';
        let branch = '';
        let fromdate = '';
        let todate = '';

        if ((this.SetEntity == '') || (this.SetEntity == 'All')) {
          entity = 'All'
          this.isLoading = true;
          this.$http
            .get(`https://mis.dragarwal.com/api-iwsr/${this.fromdate}/${this.todate}/${entity}`)
            .then(response => {
              this.processDataiwsr(response.data);
              this.isLoading = false;
              console.log(response.data);
              if (response.data != '') {
                alert('Data loaded.... Please download in excel');
              }

            });


        } else {
          this.isLoading = true;
          this.$http
            .get(`https://mis.dragarwal.com/api-iwsr/${this.fromdate}/${this.todate}/${SetEntity}`)
            .then(response => {
              this.processDataiwsr(response.data);
              this.isLoading = false;
              console.log(response.data);
              if (response.data != '') {
                alert('Data loaded.... Please download in excel');
              }

            });


        }


        entity = this.SetEntity;
        var str = "_"
        this.fileDate = this.fromdate.concat(str, this.todate);
        this.file = entity.concat(str, this.fileDate)
        console.log(this.fileDate);

        this.fileName = `Iwsr_Report_${this.file}.csv`;


      }

    },

    processDataiwsr(data) {

      this.Iwsrlist = data.result['iwsr'];
    },

    downloadExcelCollectionSuper() {
      let tempDataArr = [];
  start()
      if (this.fileDate !== null) {
      tempDataArr = this.Iwsrlist
      for(let i=0;i<=tempDataArr.length;i++){
        console.log(i);
        if(i==tempDataArr.length){
          alert("Download completed...")
        }
      }

      return tempDataArr
      } else {
        alert("No data found");

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

.table-striped>tbody>tr:nth-child(2n + 2)>td,
.table-striped>tbody>tr:nth-child(2n + 2)>th {
  background-color: #e5e5f2;
  touch-action: none;
}

.allindiagroup {
  background-color: #f0ae19 !important
}

.targetcolor {
  background-color: #FCD12A !important
}

.targetachicolor {
  background-color: #87CEFA !important
}

.branchesgrp {
  background-color: #7083a9 !important
}

.rotgrp {
  background-color: #264e99 !important
}

.whitefont {
  font-weight: 900 !important;
  color: #ffffff !important
}

.ochfont {
  background-color: #f9e699 !important;
  font-weight: 900 !important;
  color: #1d1d1d !important
}
</style>
