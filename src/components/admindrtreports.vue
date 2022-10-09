<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-toolbar-title>DRT reports </v-toolbar-title>
          <v-divider class="mx-2 black" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="fromdate" placeholder="Select From Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="fromdate" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>


          <v-menu absolute ref="menu2" :close-on-content-click="false" v-model="menu2" :nudge-right="40" :return-value.sync="todate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="todate" placeholder="Select To Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="todate" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu2 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu2.save(todate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>

          <v-btn rounded color="primary" dark @click="apiRequesttotaldrtbill(fromdate,todate)">Generate</v-btn>

          <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelDrt">
            <v-btn fab flat medium color="black">
              <v-tooltip bottom>
                <v-icon slot="activator" color="green darken-4">fas fa-file-excel</v-icon>
                <span>Export</span>
              </v-tooltip>
            </v-btn>
          </download-excel>

        </v-toolbar>
        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>
        <!-- Vuetify Data table -->

        <template>
          <v-card-title>

            <v-text-field v-model="search" v-if="billdata" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="billdata" v-model="selected" :search="search" v-bind:pagination.sync="pagination" class="elevation-4">
            <template slot="items" slot-scope="props">
              <tr>
                <td @click="rowClick(props.item.Bill_id)">{{ props.item.Bill_no }}</td>
                <td class="text-xs-left">{{ props.item.bill_date }}</td>
                <td class="text-xs-left">{{ props.item.Mrn }}</td>
                <td class="text-xs-left">{{ props.item.PATIENT_NAME }}</td>
                <td class="text-xs-left">{{ props.item.Net_amount }}</td>
                <td class="text-xs-left">{{props.item.Reference }}</td>
                <td class="text-xs-left">{{props.item.drt_cusname }}</td>
                <td class="text-xs-left">{{props.item.Aggreed_percentage_value}}</td>
                <td class="text-xs-left">{{props.item.Drt_percentage_value}}</td>
                <td class="text-xs-left">{{props.item.Drt_amount}}</td>
                <td class="text-xs-left">{{props.item.Comments}}</td>
                <td class="text-xs-left">{{props.item.ITEMNAME}}</td>
                <td class="text-xs-left">{{props.item.QUANTITY}}</td>
                <td class="text-xs-left">{{props.item.TOTAL_AMOUNT}}</td>
                <td class="text-xs-left">{{props.item.DISCOUNT_AMOUNT}}</td>
                <td class="text-xs-left">{{props.item.NET_AMOUNT}}</td>
                <td class="text-xs-left">{{props.item.status}}</td>
                <td class="text-xs-left">{{props.item.Created_by}}</td>
                <td class="text-xs-left">{{props.item.Drt_Created_on}}</td>
                <td class="text-xs-left">{{props.item.sch_Approved_by}}</td>
                <td class="text-xs-left">{{props.item.Drt_Approved_time}}</td>
                <td class="text-xs-left">{{props.item.Admin_approved_by}}</td>
                <td class="text-xs-left">{{props.item.Drt_Admin_Approved_time}}</td>
                <td class="text-xs-left">{{props.item.Cancelled_by}}</td>
                <td class="text-xs-left">{{props.item.Drt_Cancelled_time}}</td>



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
} from "../main";

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
    pagination: {
      'sortBy': 'column2',
      'descending': true,
      'rowsPerPage': -1
    },
    approval: true,
    Mrn: '',
    search: '',
    Name: '',
    vdate: '',
    reftype: '',
    refby: '',
    Billno: '',
    vdate: '',
    billamount: '',
    netamount: '',
    refsub: '',
    fNumber: '',
    servicename: '',
    branchcode: '',
    commissions: '',
    billid: '',
    drtid: '',
    drtcomments: '',
    aggcommission: '',
    drtcomments: '',
    drtcommission: '',
    drttable: '',
    drtamount: '',
    drt: '',
    buttonstatus: '',
    drtcategory: '',
    selected: [],
    gstin: [],
    panno: [],

    drtpertcent: [],
    aggcommission: [],
    commission: [],
    total: [],
    dialog: false,
    test: true,
    GSTIN: '',
    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {
      "Bill No": "Bill_no",
      "Bill Date": "bill_date",
      "Mrn": "Mrn",
      "Name": "PATIENT_NAME",
      "Total Net Amount": "Net_amount",
      "Reference": "Reference",
      "DRT Name": "drt_cusname",
      "Agreed %": "Aggreed_percentage_value",
      "Comm %":"Drt_percentage_value",
      "Comm Amt":"Drt_amount",
      "Comments":"Comments",
      "Item name":"ITEMNAME",
      "QTY":"QUANTITY",
      "Total Amount":"TOTAL_AMOUNT",
      "Discount Amount":"DISCOUNT_AMOUNT",
      "Net Amount":"NET_AMOUNT",
      "Status":"status",
      "Created by":"Created_by",
      "Submitted time":"Drt_Created_on",
      "SCH Approved by":"sch_Approved_by",
      "SCH Approved Time":"Drt_Approved_time",
      "Finance Approved by":"Admin_approved_by",
      "Finance Approved Time":"Drt_Admin_Approved_time",
      "Cancelled By":"Cancelled_by",
      "Cancelled Time":"Drt_Cancelled_time"
    },
    fileName: null,

    headers: [{
        text: 'Bill no',
        align: 'left',
        sortable: false,
        value: 'Bill_no'

      },
      {
        text: 'Date',
        value: 'bill_date'
      },

      {
        text: 'MRN',
        value: 'Mrn'
      },
      {
        text: 'Name',
        value: 'Name'
      },
      {
        text: 'Net Amount',
        value: 'Net_amount'
      },
      {
        text: 'Reference',
        value: 'Reference'
      },
      {
        text: 'DRT Name',
        value: 'DRT Name'
      },
      {
        text: 'Agreed %',
        value: 'Aggreed_percentage_value'
      },
      {
        text: 'Comm %',
        value: 'Drt_percentage_value'
      },
      {
        text: 'Comm Amt',
        value: 'Drt_amount'
      },
      {
        text: 'Comments',
        value: 'Comments'
      },
      {
        text: 'Item name ',
        value: 'Item_name'
      },
      {
        text: 'QTY',
        value: 'QTY'
      },
      {
        text: 'Total Amount',
        value: 'Total AMount'
      },
      {
        text: 'Discount Amount',
        value: 'Discount AMount'
      },
      {
        text: 'Net Amount',
        value: 'Net AMount'
      },
      {
        text: 'Status',
        value: 'Statust'
      },
      {
        text: 'Created by',
        value: 'Created_by'
      },
      {
        text: 'Submitted time',
        value: 'Submitted_time'
      },
      {
        text: 'SCH Approved by',
        value: 'sch_approved_by'
      },
      {
        text: 'SCH Approved Time',
        value: 'sch_approved_time'
      },
      {
        text: 'Finance Approved by',
        value: 'fin_approved_by'
      },
      {
        text: 'Finance Approved Time',
        value: 'fin_approved_time'
      },
      {
        text: 'Cancelled By',
        value: 'Cancelled_by'
      },
      {
        text: 'Cancelled Time',
        value: 'Cancelled_time'
      },

    ],

    message1: '',
    minDate: "2020-01-01",
    maxDate: curday('-'),


    SetBranch: [],
    SetStatus: [],
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
    billdata: null,
    billstatus: null,
  }),
  created() {
    this.getToday();
  },


  methods: {


    apiRequesttotaldrtbill(fromdate, todate) {
      var date3 = new Date();
      var date4 = date3.getMonth() + "/" + date3.getDay() + "/" + date3.getYear();

      var today = new Date();

      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      console.log(date);

      if (fromdate > todate) {
        alert("From date should be less than todate");
        return false;
      } else if (fromdate > date) {
        alert("From Date should be less than current date");
        return false;
      } else if (todate > date) {
        alert("To Date should be less than current date");
        return false;
      }


      if ((!this.fromdate) || (!this.todate)) {
        alert("Please Select Date");
        return false;
      } else {
        let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
        this.loading = true;
        this.isLoading = true;
        this.$http

          .get(`https://mis.dragarwal.com/api-totaldrtbills/${this.fromdate}/${this.todate}/${normalusername.name}`)
          .then(response => {
            console.log(response.data);
            this.processDatatotal(response.data);
            this.isLoading = false;
          });

        // branch = this.SetBranch;
        // status = this.SetStatus;
        var str = "_"
        this.fileDate = this.fromdate.concat(str, this.todate);

        console.log(this.fileDate);

        this.fileName = `DRT_Report_${this.fileDate}.csv`;


      }

    },

    processDatatotal(data) {
      if (sessionStorage.getItem('super_user')) {
        this.user_role = 'super_user';
      } else if (sessionStorage.getItem('overseas_user')) {
        this.user_role = 'overseas_user';
      } else if (sessionStorage.getItem('indian_user')) {
        this.user_role = 'indian_user';
      } else if (sessionStorage.getItem('optical_user')) {
        this.user_role = 'optical_user';
      } else if (sessionStorage.getItem('coll_user')) {
        this.user_role = 'coll_user';
      } else if (sessionStorage.getItem('fin_user')) {
        this.user_role = 'fin_user';
      }

      this.billdata = data.result['bill'];
      console.log(this.billdata);
      this.show = true;
    },
    downloadExcelDrt() {
      let tempDataArr = [];
      if (this.billdata !== null) {
        tempDataArr = this.billdata

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

.inputPrice input[type='number'] {
  -moz-appearance: textfield;
}

.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
