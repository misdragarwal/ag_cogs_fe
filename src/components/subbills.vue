<template >
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">



          <th width="20%">
            <v-autocomplete clearable v-bind:items="branch" v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-autocomplete>
          </th>

          <v-spacer></v-spacer>
          <v-select :items="bill_status" v-model="SetStatus" label="Bill Status" @change='statuschange' id="SelEntity" item-text="shortCode" item-value="text"></v-select>

          <v-spacer></v-spacer>
          <v-select :items="date_type" v-model="Setdatetype" label="Date type" id="Seldate" item-text="shortCode" item-value="text"></v-select>


          <v-spacer></v-spacer>
          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="fromdate" placeholder="Select Month" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="fromdate" type="month" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>



          <v-btn rounded color="primary" dark @click="apichpendingdrtbill(fromdate,SetStatus,SetBranch,Setdatetype)">Generate</v-btn>

          <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelsubDrtbill">
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
            <v-toolbar-title>IC Bills</v-toolbar-title>
            <v-spacer></v-spacer>



            <v-spacer></v-spacer>
            <v-text-field v-model="search" v-if="subill" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="subill" v-model="selected" :search="search" class="elevation-4">
            <template slot="items" slot-scope="props">
              <tr>
                <td @click="rowClick(props.item.drtApproval_status)">{{ props.item.drtApproval_status }}</td>
                <td class="text-xs-left">{{ props.item.Bill_no }}</td>
                <td class="text-xs-left" style="white-space: nowrap;">{{ props.item.bill_date }}</td>
                <td class="text-xs-left">{{ props.item.Mrn }}</td>
                <td class="text-xs-left">{{ props.item.Name }}</td>
                <td class="text-xs-left">{{props.item.Net_amount }}</td>
                <td class="text-xs-left">{{props.item.Reference }}</td>
                <td class="text-xs-left">{{props.item.DRTNAME}}</td>
                <td class="text-xs-left">{{props.item.Aggreed_percentage_value}}</td>
                <td class="text-xs-left">{{props.item.Drt_percentage_value}}</td>
                <td class="text-xs-left">{{props.item.Drt_amount}}</td>
                <td class="text-xs-left">{{props.item.Comments}}</td>
				<td class="text-xs-left" v-if="!(props.item.Referal_slip===null)">

                <v-btn slot="activator" small fab color="primary" @click="downloadbill(props.item.Referal_slip)">
                  <v-icon>cloud_download</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-left" v-else="(props.item.Referal_slip===null)">
                NA
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
    branch: [{
      shortCode: 'Select All',
      text: 'All'
    }],
    bill_status: [{
        shortCode: 'Select All',
        text: 'All'
      },
      {
        shortCode: 'Approved',
        text: '2'
      },
      {
        shortCode: 'Approved By SCH',
        text: '1'
      },
      {
        shortCode: 'Cancelled By Finance',
        text: '4'
      },
      {
        shortCode: 'Cancelled by SCH',
        text: '3'
      },
      {
        shortCode: 'Need SCH Approval',
        text: '0'
      },
    ],

    date_type: '',
    headers: [{
        text: 'Status',
        align: 'left',
        sortable: false,
        value: 'status'

      },
      {
        text: 'Bill no',
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
        text: 'Slip',
        value: ''
      }


    ],
    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {
      "Bill No": "Bill_no",
      "Bill Date": "bill_date",
      "Mrn": "Mrn",
      "Name": "Name",
      "Total Net Amount": "Net_amount",
      "Reference": "Reference",
      "DRT Name": "DRTNAME",
      "Agreed %": "Aggreed_percentage_value",
      "Comm %": "Drt_percentage_value",
      "Comm Amt": "Drt_amount",
      "Comments": "Comments",
      "Net Amount": "Net_amount",
      "Status": "drtApproval_status",
      "Expense date":"Expense_date",
	  "Slip":"Referal_slip"
    },
    fileName: null,
    fromdate: null,
    todate: null,
    loading: false,
    isLoading: false,
    fullPage: true,
    minDate: "2020-04-01",
    maxDate: curday('-'),
    search: '',
    menu1: false,
    menu2: false,
    SetBranch: [],
    SetStatus: [],
    subill: null,

    Setdatetype: ''
  }),
  mounted() {
    this.loadbranch();
  },
  methods: {
    loadbranch() {
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      this.SetBranch = [];
      this.branch = [];
      var arr1 = [{
        shortCode: 'Select All',
        text: 'All'
      }];
      this.axios
        //  .get(`https://scm.dragarwal.com/api-branch/${selectObj}`).then(response =>{
        .get(`https://mis.dragarwal.com/api-chbranch/${userid.userName}`).then(response => {
          this.branch = arr1.concat(response.data);

        })


    },
    getToday() {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },
    apichpendingdrtbill(fromdate, SetStatus, SetBranch, Setdatetype) {
      console.log(fromdate + " " + SetStatus + " " + SetBranch + " " + Setdatetype);

      var date3 = new Date();
      var date4 = date3.getMonth() + "/" + date3.getDay() + "/" + date3.getYear();
      var currentDate = new Date(date4);
      let datetype = '';

      if ((this.SetStatus == '') || (this.SetBranch == '')) {
        alert("Please select status and Branch");
        return false;
      } else if ((this.SetStatus === null) || (this.SetBranch == null)) {
        alert("Please select status and Branch");
        return false;
      } else if ((this.fromdate == '') || (this.fromdate == null)) {
        alert("Please select Month")
        return false;
      }

      if (this.Setdatetype.text == 1) {
        datetype = this.Setdatetype.text;

      } else if (this.Setdatetype.text == 2) {
        datetype = this.Setdatetype.text;

      } else {
        datetype = this.Setdatetype;

      }

      let frmdate = this.fromdate;

      let Status = this.SetStatus;
      let Branch = this.SetBranch;
      console.log(frmdate + " " + Status + " " + Branch + " " + datetype);

      let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
      console.log(normalusername);
      this.isLoading = true;
      this.axios
        .get(`https://mis.dragarwal.com/api-submittedbills/${this.fromdate}/${datetype}/${this.SetStatus}/${this.SetBranch}/${normalusername.name}`)
        .then(response => {

          console.log(response.data);
          this.isLoading = false;
          this.processlistsubbill(response.data);
          // this.isLoading=false;
        })
      var str = "_"
      this.fileDate = this.fromdate.concat(str, this.todate);
      this.fileName = `IC_claim_bills_${this.fileDate}.csv`;

    },
    processlistsubbill(data) {
      this.subill = data.result["subbill"]
      console.log(this.subill);
      this.show = true
    },
    downloadExcelsubDrtbill() {
      let tempDataArr = [];
      if (this.fileDate !== null) {
        tempDataArr = this.subill

        return tempDataArr;
      } else {
        return null;
      }
    },
    statuschange(a) {

      if (a == 2) {
        this.datevalue = {
          shortCode: 'Expense Date',
          text: '2'
        }, {
          shortCode: 'Bill Date',
          text: '1'
        };
        this.date_type = [{
          shortCode: 'Expense Date',
          text: '2'
        }, {
          shortCode: 'Bill Date',
          text: '1'
        }];
        console.log(this.date_type);
        this.Setdatetype = this.datevalue;
      } else {
        this.datevalue = {
          shortCode: 'Bill Date',
          text: '1'
        }
        this.date_type = [this.datevalue];
        console.log(this.date_type);
        this.Setdatetype = this.datevalue;
      }

    },
	downloadbill(filename) {
      this.axios({
        //url: `https://mis.dragarwal.com/api-bill-download/${filename}`,
        url: `https://mis.dragarwal.com/api-download-slip/${filename}`,
        method: 'GET',
        responseType: 'blob',
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', filename);
        document.body.appendChild(fileLink);
        //con
        fileLink.click();
      })

  }
  }
}
</script>
