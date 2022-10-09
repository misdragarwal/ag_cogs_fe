<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-select :items="entities" v-model="SetEntity" label="Entity:" :disabled="!enabled" id="SelEntity" item-text="shortCode" item-value="text" v-on:change='getBranches'></v-select>

          <v-spacer></v-spacer>
          <v-autocomplete :items="branch" v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-autocomplete>

          <v-spacer></v-spacer>
          <v-select :items="bill_status" v-model="SetStatus" label="Bill Status" id="SelEntity" item-text="shortCode" item-value="text"></v-select>


          <v-spacer></v-spacer>
          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="fromdate" placeholder="Select From Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="fromdate" type="month" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn rounded color="primary" dark @click="apiRequesttpabillfin(SetEntity,SetBranch,fromdate,SetStatus)">Generate</v-btn>

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
            <v-toolbar-title>TPA Bill Approval</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" v-if="tpabilldata" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="tpabilldata" :search="search" class="elevation-4">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.entity }}</td>
              <td class="text-xs-left">{{ props.item.region }}</td>
              <td class="text-xs-left">{{ props.item.BILLED }}</td>
              <td class="text-xs-left">{{ props.item.BILLEDDATE }}</td>
              <td class="text-xs-left">{{ props.item.MRN }}</td>
              <td class="text-xs-left">{{ props.item.PATIENT_NAME}}</td>
              <td class="text-xs-left">{{ props.item.BILLNO}}</td>
              <td class="text-xs-left">{{ props.item.AGENCY_NAME}}</td>
              <td class="text-xs-left">{{ props.item.TPA_CLAIM}}</td>
              <td class="text-xs-left">{{ props.item.totalamount}}</td>
              <td class="text-xs-left">{{ props.item.discount}}</td>
              <td class="text-xs-left">{{ props.item.netamount}}</td>
              <td class="text-xs-left">{{ props.item.patamount}}</td>
              <td class="text-xs-left">{{ props.item.tpaamount}}</td>
              <td class="text-xs-right">
                {{props.item.senddate}}
              </td>

              <td class="text-xs-right" v-if="((props.item.ACKNOWLEDGE_DATE ===null) ) ">
                <v-btn slot="activator" small fab color="success" @click="rowacknowledge(props.item)">
                  <v-icon>check</v-icon>
                </v-btn>

              </td>
              <td class="text-xs-right" v-else="((props.item.send_date !=null)&&(props.item.acknowledge_date !=null) )">
                {{props.item.ackdate}}

              </td>
              <!-- <td class="text-xs-right" v-if="((props.item.submitted_date ===null) )">
                <v-btn slot="activator" small fab color="success" @click="rowsubmitted(props.item)">
                  <v-icon>check</v-icon>
                </v-btn>

              </td> -->

              <td class="text-xs-right" v-if="((props.item.SUBMITTED_DATE ===null) )">
                <v-btn slot="activator" small fab color="success" @click.stop="$set(dialogexpensedate, props.item.BILLNO, true)">
                  <v-icon>check</v-icon>
                </v-btn>

                <v-dialog v-model="dialogexpensedate[props.item.BILLNO]" persistent max-width="400px" lazy absolute :key="props.item.BILLNO">
                  <v-card>

                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>

                          <v-flex xs12 sm6 md6>
                            <v-date-picker v-model="finexpensedate" :min="props.item.BILLEDDATE" :max="maxDate" color="green lighten-1" header-color="primary">
                            </v-date-picker>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>


                      <v-btn color="primary" flat @click.stop="$set(dialogexpensedate, props.item.BILLNO, false)">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click.stop="rowsubmitted(props.item,finexpensedate),$set(dialogexpensedate, props.item.BILLNO, false)">Update</v-btn>

                    </v-card-actions>


                    <v-card-title>
                      <span>Bill submission date</span>
                    </v-card-title>
                    <v-card-title>

                      <span>{{ props.item.MRN }}{{ " -- "}}{{ props.item.BILLNO  }}</span>
                      <br>

                    </v-card-title>

                  </v-card>
                </v-dialog>


              </td>
              <td class="text-xs-right" v-else="((props.item.send_date !=null)&&(props.item.acknowledge_date !=null)&&(props.item.submitted_date !=null) )">
                {{props.item.subdate}}

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

var expensecurmonth = function(sp) {
  var today = new Date();

  var dd = today.getDate();
  var mm = (today.getMonth() + 1) - 2; //As January is 0.
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10 && mm >= 0) mm = '0' + mm;
  else if (mm < 0) mm = '11';
  return (yyyy + sp + mm + sp + dd);
};


export default {

  data: () => ({
    //minExDate: expensecurmonth('-'),
    dialogexpensedate: {},
    finexpensedate: "",
    enabled: false,
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
    bill_status: [{
        shortCode: 'Select All',
        text: 'All'
      },
      {
        shortCode: 'Pending',
        text: '0'
      },
      {
        shortCode: 'Acknowledge',
        text: '1'
      },
      {
        shortCode: 'Submitted',
        text: '2'
      },


    ],
    headers: [{
        text: 'Entity',
        sortable: false,
        value: 'entity'
      },
      {
        text: 'Region',
        sortable: false,
        value: 'region'
      },
      {
        text: 'Branch',
        sortable: false,
        value: 'BILLED'
      },
      {
        text: 'Date',
        sortable: false,
        value: 'BILLEDDATE'
      },
      {
        text: 'MRN',
        sortable: false,
        value: 'MRN'
      },
      {
        text: 'Name',
        sortable: false,
        value: 'PATIENT_NAME'
      },
      {
        text: 'Bill no',
        sortable: false,
        value: 'BILLNO'
      },
      {
        text: 'Payor name',
        sortable: false,
        value: 'AGENCY_NAME'
      },
      {
        text: 'Claim id',
        sortable: false,
        value: 'tpa_claim'
      },
      {
        text: 'Total Amount',
        sortable: false,
        value: 'totalamount'
      },
      {
        text: 'Discount',
        sortable: false,
        value: 'discount'
      },
      {
        text: 'Net amount',
        sortable: false,
        value: 'netamount'
      },
      {
        text: 'Patient amount',
        sortable: false,
        value: 'patamount'
      },
      {
        text: 'Payor amount',
        sortable: false,
        value: 'tpaamount'
      },
      {
        text: 'CH submitted',
        sortable: false,
        value: 'Submit'
      },
      {
        text: 'Acknowledged',
        sortable: false,
        value: 'acknowledge_date'
      },
      {
        text: 'Submitted',
        sortable: false,
        value: 'submitted_date'
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
    send_date: '',

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
    ],
    SetEntity: [],
    entity: '',
    region: '',
    acknowledge_date: '',
    submitted_date: '',
    ackdate: '',
    subdate: '',
    SetStatus: [],
    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {
      "Entity": "entity",
      "Region": "region",
      "branch": "BILLED",
      "Date": "BILLEDDATE",
      "MRN": "MRN",
      "Name": "PATIENT_NAME",
      "Bill no": "BILLNO",
      "Payor name": "AGENCY_NAME",
      "Claim id": "tpa_claim",
      "Total amount": "totalamount",
      "Discount": "discount",
      "Net amount": "netamount",
      "Patient amount": "patamount",
      "Payor amount": "tpaamount",
      "CH submitted": "SEND_DATE",
      "Ch Name": "SENT_ID",
      "Acknowledged date": "ACKNOWLEDGE_DATE",
      "Acknowledged Name": "ACKNOWLEDGE_ID",
      "Submitted date": "SUBMITTED_DATE",
      "Submitted Name": "SUBMITTED_ID",
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
    minExDate(a) {
      console.log(a);
    },
    getBranches(selectObj) {
      this.SetBranch = [];
      this.branch = [];
      var arr1 = [{
        shortCode: 'Select All',
        text: 'All'
      }];

      this.axios
        .get(`https://mis.dragarwal.com/api-branch/${selectObj}`).then(response => {
          this.branch = arr1.concat(response.data);
        })

    },


    loadbranch() {
      let normalusername = JSON.parse(sessionStorage.getItem("tpa_user"));
  console.log(normalusername);
      this.axios
        .get(`https://mis.dragarwal.com/api-finbranch/${normalusername.name}`).then(response => {
          console.log(response.data);
          if (response.data[0].TEXT == 'ALL') {
            this.enabled = true;

            this.SetBranch = [];
            this.branch = [];
            this.axios
              .get(`https://mis.dragarwal.com/api-finbranch/${userid.userName}`).then(response => {
                this.branch = (response.data);
                console.log(this.branch);
              })


          } else {
            console.log("NOT IN ALL");
            this.enabled = false;
            console.log();
            this.SetEntity = "Noentity";
            this.SetBranch = [];
            this.branch = [];
            var arr1 = [{
              shortCode: 'Select All',
              text: 'All'
            }];
            this.axios
              .get(`https://mis.dragarwal.com/api-fintpabranch/${normalusername.name}`).then(response => {
                this.branch = arr1.concat(response.data);
                console.log(this.branch);
              })



          }

        })
    },

    getToday() {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },

    apiRequesttpabillfin(SetEntity, SetBranch, fromdate, SetStatus) {

      if ((this.SetEntity == '') || (this.SetEntity == null)) {
        alert("Please select Entity type")
        return false;
      } else if ((this.SetBranch == '') || (this.SetBranch == null)) {
        alert("Please select Branch type")
        return false;
      } else if ((this.fromdate == '') || (this.fromdate == null)) {
        alert("Please select Month type")
        return false;
      } else if ((this.SetStatus == '') || (this.SetStatus == null)) {
        alert("Please select Status type")
        return false;
      } else {
        console.log(SetEntity + " " + SetBranch + " " + fromdate);

        this.isLoading = true;
        let normalusername = JSON.parse(sessionStorage.getItem("tpa_user"));
        if (SetStatus == 'All') {

          this.axios.get(`https://mis.dragarwal.com/api-tpabillfin/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
            .then(response => {
              this.processDatatpabill(response.data)
              this.isLoading = false;

            })
        } else if (SetStatus == 0) {
          this.axios.get(`https://mis.dragarwal.com/api-tpabillfinpend/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
            .then(response => {
              this.processDatatpabill(response.data)
              this.isLoading = false;

            })
        } else if (SetStatus == 1) {
          this.axios.get(`https://mis.dragarwal.com/api-tpabillfinack/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
            .then(response => {
              this.processDatatpabill(response.data)
              this.isLoading = false;

            })
        } else if (SetStatus == 2) {
          this.axios.get(`https://mis.dragarwal.com/api-tpabillfinsub/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
            .then(response => {
              this.processDatatpabill(response.data)
              this.isLoading = false;

            })
        }
      }



      this.fileName = `TPA_report.csv`;


    },

    processDatatpabill(data) {

      this.tpabilldata = data.result['tpabillfin'];
      console.log(this.tpabilldata);

    },

    rowacknowledge(data) {
      console.log(data);
      let normalusername = JSON.parse(sessionStorage.getItem("tpa_user"));

      this.isLoading = true;
      this.axios.post(`https://mis.dragarwal.com/api-tpabillack`, {
        tpabillid: data.BILL_ID,
        tpaid: data.id,
        submitted_id: normalusername.name
      }).then(response => {
        if (response.data.dataupdated == true) {
          alert("Bill Acknowledged")
          this.isLoading = true;
          console.log(this.SetStatus);


          if (this.SetStatus == 'All') {
            console.log(this.SetStatus);
            this.axios.get(`https://mis.dragarwal.com/api-tpabillfin/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
              //  this.axios.get(`https://mis.dragarwal.com/api-tpabillfin/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}`)
              .then(response => {
                this.processDatatpabill(response.data)
                this.isLoading = false;

              })
          } else if (this.SetStatus == 0) {
            console.log(this.SetStatus);
            this.axios.get(`https://mis.dragarwal.com/api-tpabillfinpend/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
              .then(response => {
                this.processDatatpabill(response.data)
                this.isLoading = false;

              })
          } else if (this.SetStatus == 1) {
            console.log(this.SetStatus);
            this.axios.get(`https://mis.dragarwal.com/api-tpabillfinack/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
              .then(response => {
                this.processDatatpabill(response.data)
                this.isLoading = false;

              })
          } else if (this.SetStatus == 2) {
            console.log(this.SetStatus);
            this.axios.get(`https://mis.dragarwal.com/api-tpabillfinsub/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
              .then(response => {
                this.processDatatpabill(response.data)
                this.isLoading = false;

              })
          }
          this.fileName = `TPA_report.csv`;

        } else {
          alert("error in updating record")
          this.isLoading = true;
          this.axios.get(`https://mis.dragarwal.com/api-tpabillfin/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
            //  this.axios.get(`https://mis.dragarwal.com/api-tpabillfin/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}`)
            .then(response => {
              this.processDatatpabill(response.data)
              this.isLoading = false;

            })
        }


      })


    },


    rowsubmitted(data, date) {
      console.log(data);
      console.log(date);

      let normalusername = JSON.parse(sessionStorage.getItem("tpa_user"));

      this.isLoading = true;
      this.axios.post(`https://mis.dragarwal.com/api-tpabillsub`, {
        tpabillid: data.BILL_ID,
        tpaid: data.id,
        submitted_id: normalusername.name,
        submitted_date: date
      }).then(response => {
        if (response.data.dataupdated == true) {
          alert("TPA bill sumbitted")
          this.isLoading = true;
          if (this.SetStatus == 'All') {
            //    this.axios.get(`https://mis.dragarwal.com/api-tpabillfin/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}`)
            this.axios.get(`https://mis.dragarwal.com/api-tpabillfin/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
              .then(response => {
                this.processDatatpabill(response.data)
                this.isLoading = false;

              })
          } else if (this.SetStatus == 0) {
            this.axios.get(`https://mis.dragarwal.com/api-tpabillfinpend/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
              .then(response => {
                this.processDatatpabill(response.data)
                this.isLoading = false;

              })
          } else if (this.SetStatus == 1) {
            this.axios.get(`https://mis.dragarwal.com/api-tpabillfinack/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
              .then(response => {
                this.processDatatpabill(response.data)
                this.isLoading = false;

              })
          } else if (this.SetStatus == 2) {
            this.axios.get(`https://mis.dragarwal.com/api-tpabillfinsub/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
              .then(response => {
                this.processDatatpabill(response.data)
                this.isLoading = false;

              })
          }

          this.fileName = `TPA_report.csv`;

        } else {
          alert("error in updating record")
          this.isLoading = true;
          this.axios.get(`https://mis.dragarwal.com/api-tpabillfin/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}/${normalusername.name}`)
            //    this.axios.get(`https://mis.dragarwal.com/api-tpabillfin/${this.SetEntity}/${this.SetBranch}/${this.fromdate}/${this.SetStatus}`)
            .then(response => {
              this.processDatatpabill(response.data)
              this.isLoading = false;

            })
        }

        this.fileName = `TPA_report.csv`;

      })

    },

    downloadExceltpabill() {
      let tempDataArr = [];
      console.log("hit");
      if (this.fileDate !== null) {

        tempDataArr = this.tpabilldata

        return tempDataArr;
      } else {
        return null;
      }
    },

  }
}
</script>
