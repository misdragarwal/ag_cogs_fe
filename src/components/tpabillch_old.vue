<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-spacer></v-spacer>
          <v-select :items="branch" v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-select>

          <v-spacer></v-spacer>
          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="fromdate" placeholder="Select From Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="fromdate" type="month" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn rounded color="primary" dark @click="apiRequesttpabill(SetBranch,fromdate)">Generate</v-btn>


                    <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExceltpabill">
                      <v-btn fab flat medium color="black">
                        <v-tooltip bottom>
                          <v-icon slot="activator" color="green darken-4">fas fa-file-excel</v-icon>
                          <span>Export</span>
                        </v-tooltip>
                      </v-btn>
                    </download-excel>


        </v-toolbar>
        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>



        <template>
          <v-card-title>
            <v-toolbar-title>TPA Bill Submission</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" v-if="tpabilldata" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="tpabilldata" :search="search" class="elevation-4">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.BILLED }}</td>
              <td class="text-xs-left">{{ props.item.BILLEDDATE }}</td>
              <td class="text-xs-left">{{ props.item.MRN }}</td>
              <td class="text-xs-left">{{ props.item.PATIENT_NAME}}</td>
              <td class="text-xs-left">{{ props.item.BILLNO}}</td>
              <td class="text-xs-left">{{ props.item.AGENCY_NAME}}</td>
              <td class="text-xs-left">{{ props.item.tpa_claim}}</td>
              <td class="text-xs-left">{{ props.item.totalamount}}</td>
              <td class="text-xs-left">{{ props.item.discount}}</td>
              <td class="text-xs-left">{{ props.item.netamount}}</td>
              <td class="text-xs-left">{{ props.item.patamount}}</td>
              <td class="text-xs-left">{{ props.item.tpaamount}}</td>
              <td class="text-xs-right" v-if="props.item.send_date===null">
                <v-btn slot="activator" small fab color="success" @click="rowApprove(props.item)">
                  <v-icon>check</v-icon>
                </v-btn>

              </td>

              <td class="text-xs-right" v-else="props.item.send_date !=null">
                {{props.item.senddate}}

              </td>

            </template>
          </v-data-table>
        </template>



        </v-toolbar>
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
    branch: [],
    SetBranch: [],
    menu1: false,
    fromdate: null,
    minDate: "2020-04-01",
    maxDate: curday('-'),
    isLoading: false,
    fullPage: true,
    tpabilldata: null,
    search: '',
    headers: [{
        text: 'Branch',
        value: 'BILLED'
      },
      {
        text: 'Date',
        value: 'BILLEDDATE'
      },
      {
        text: 'MRN',
        value: 'MRN'
      },
      {
        text: 'Name',
        value: 'PATIENT_NAME'
      },
      {
        text: 'Bill no',
        value: 'BILLNO'
      },
      {
        text: 'Payor name',
        value: 'AGENCY_NAME'
      },
      {
        text: 'Claim id',
        value: 'tpa_claim'
      },
      {
        text: 'Total Amount',
        value: 'totalamount'
      },
      {
        text: 'Discount Amount',
        value: 'discountamount'
      },
      {
        text: 'Net amount',
        value: 'netamount'
      },
      {
        text: 'Patient amount',
        value: 'patamount'
      },
      {
        text: 'Payor amount',
        value: 'tpaamount'
      },
      {
        text: 'Submit',
        value: 'Submit'
      },

    ],
    selected: [],
    BILLED: '',
    MRN: '',
    BILLEDDATE: '',
    BILLNO: '',
    AGENCY_NAME: '',
    PATIENT_NAME: '',
    netamount: '',
    patamount: '',
    tpaamount: '',
    tpa_claim: '',
    senddate: '',
    send_date:'',
    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {

      "branch":"BILLED",
      "Date": "BILLEDDATE",
      "MRN": "MRN",
      "Name": "PATIENT_NAME",
      "Bill no": "bill_no",
      "Payor name": "AGENCY_NAME",
      "Claim id": "tpa_claim",
      "Total amount":"totalamount",
      "Discount amount":"discount",
      "Net amount": "netamount",
      "Patient amount": "patamount",
      "Payor amount": "tpaamount",
      "CH submitted": "send_date",
      "Ch Name":"sent_id",
      "Acknowledged date": "acknowledge_date",
      "Acknowledged Name":"acknowledge_id",
      "Submitted date": "submitted_date",
      "Submitted Name":"submitted_id",
    },
    fileName: null,
  }),
  created() {
    this.getToday();
  },
  mounted() {
    this.loadbranch();
  },
  methods: {
    loadbranch() {
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      this.SetBranch = [];
      this.branch = [];
      this.axios
        //  .get(`https://scm.dragarwal.com/api-branch/${selectObj}`).then(response =>{
        .get(`https://mis.dragarwal.com/api-chbranch/${userid.userName}`).then(response => {
          this.branch = (response.data);
          console.log(this.branch);
        })
    },

    getToday() {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },

    apiRequesttpabill(SetBranch, fromdate) {


      this.isLoading = true;
      this.axios.get(`https://mis.dragarwal.com/api-tpabill/${this.SetBranch}/${this.fromdate}`)
        .then(response => {
          this.processDatatpabill(response.data)
          this.isLoading = false;

        })
          this.fileName = `TPA_report.csv`;
    },

    processDatatpabill(data) {

      this.tpabilldata = data.result['tpabills'];
      console.log(this.tpabilldata);

    },

    rowApprove(data){
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));

      this.isLoading=true;
      this.axios.post(`https://mis.dragarwal.com/api-tpabillsubmit`,{
        tpabillid:data.bill_id,
        tpaid:data.id,
        submitted_id:userid.name
      }).then(response =>{
        if(response.data.dataupdated==true){
          alert("TPA bill sumbitted")
          this.isLoading = true;
          this.axios.get(`https://mis.dragarwal.com/api-tpabill/${this.SetBranch}/${this.fromdate}`)
            .then(response => {
              this.processDatatpabill(response.data)
              this.isLoading = false;

            })
              this.fileName = `TPA_report.csv`;
        }
        else{
          alert("error in updating record")
          this.isLoading = true;
          this.axios.get(`https://mis.dragarwal.com/api-tpabill/${this.SetBranch}/${this.fromdate}`)
            .then(response => {
              this.processDatatpabill(response.data)
              this.isLoading = false;

            })
        }
  this.fileName = `TPA_report.csv`;

      })


    },
    downloadExceltpabill(){
      let tempDataArr = [];
      console.log("hit");
      if (this.fileDate !== null) {

      tempDataArr =this.tpabilldata

      return tempDataArr;
      } else {
      return null;
      }
    },
  }
}
</script>
