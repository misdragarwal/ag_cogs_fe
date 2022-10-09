<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">



          <th width="20%">
            <v-select :items="branch" v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-select>
          </th>

          <v-spacer></v-spacer>
          <v-select :items="bill_status" v-model="SetStatus" label="Bill Status" @change='statuschange' id="SelEntity" item-text="shortCode" item-value="text"></v-select>

          <v-spacer></v-spacer>
          <v-select :items="date_type" v-model="Setdatetype" label="Date type" id="Seldate" item-text="shortCode" item-value="text"></v-select>


          <v-spacer></v-spacer>
          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="fromdate" placeholder="Select From Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="fromdate" type="month" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>


          <v-btn rounded color="primary" dark @click="apiRequestschdrtbill(fromdate,SetStatus,SetBranch,Setdatatype)">Generate</v-btn>

          <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelschDrt">
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
            <v-toolbar-title>IC Approval</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" v-if="billdata" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="billdata" v-model="selected" :search="search" v-bind:pagination.sync="pagination" class="elevation-4">
            <template slot="items" slot-scope="props">
              <tr>
                <td @click="rowClick(props.item.Bill_id)">{{ props.item.Bill_no }}</td>
                <td class="text-xs-left" style="white-space: nowrap;">{{ props.item.bill_date }}</td>
                <td class="text-xs-left">{{ props.item.Mrn }}</td>
                <td class="text-xs-left">{{ props.item.Name }}</td>
				<td class="text-xs-left">{{props.item.Mobile}}</td>
                <td class="text-xs-left">{{ props.item.Net_amount }}</td>
                <td class="text-xs-left">{{ props.item.Reference}}</td>
                <td class="text-xs-left">{{props.item.DRTNAME }}</td>
                <td class="text-xs-left">{{props.item.Aggreed_percentage_value}}</td>
                <td class="text-xs-left">{{props.item.Drt_percentage_value}}</td>
                <td class="text-xs-left">{{props.item.Drt_amount}}</td>
                <td class="text-xs-left">{{props.item.Comments}}</td>			    
				<td class="text-xs-left">{{props.item.Email}}</td>
				<td class="text-xs-left" v-if="!(props.item.Referal_slip===null)">

                <v-btn slot="activator" small fab color="primary" @click="downloadbill(props.item.Referal_slip)">
                  <v-icon>cloud_download</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-left" v-else="(props.item.Referal_slip===null)">
                NA
              </td>
                <td class="text-xs-left">{{props.item.drtApproval_status}}</td>
                <td class="text-xs-right" v-if="props.item.drtApproval_status==='Pending'">
                  <v-btn slot="activator" small fab color="success" @click="rowApprove(props.item)">
                    <v-icon>check</v-icon>
                  </v-btn>

                </td>
                <td class="text-xs-right" v-if="props.item.drtApproval_status==='Pending'">

                  <v-btn slot="activator" small fab @click.stop="$set(dialogcancel, props.item.Bill_no, true)" color="red">
                    <v-icon>fas fa-times</v-icon>
                  </v-btn>

                  <v-dialog v-model="dialogcancel[props.item.Bill_no]" persistent max-width="800px" lazy absolute :key="props.item.Bill_no">
                    <v-card>
                      <v-card-title>
                        <span>{{ props.item.Mrn }}{{"--"}}{{props.item.Bill_no}} Cance Note</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>

                            <v-flex xs12 sm6>
                              <v-textarea clearable clear-icon="cancel" label="Comments" v-model='schcomments'></v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>


                      <v-card-actions>

                        <v-btn color="primary" flat @click.stop="$set(dialogcancel, props.item.Bill_no, false)">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click="rowDecline(props.item,schcomments)">Decline</v-btn>

                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>

                <td class="text-xs-right">
                  <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent max-width="800px" lazy absolute>

                      <v-card>
                        <v-card-title>
                          <span class="headline">Information</span>

                        </v-card-title>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>

                              <v-flex xs12>
                                <div class="table-responsive">
                                  <table align="center" class="table table-hover table-bordered" v-if="show">
                                    <thead>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td class="text-xs-left">Mrn : {{ Mrn }}</td>
                                        <td class="text-xs-left">Name : {{ Name }}</td>
                                        <td class="text-xs-left">Visited date : {{ vdate }}</td>
                                      </tr>
                                      <tr>
                                        <td class="text-xs-left">Ref Type : {{ reftype }}</td>
                                        <td class="text-xs-left">Ref Sub : {{ refsub }}</td>
                                        <td class="text-xs-left">Ref By : {{ refby }}</td>
                                      </tr>
                                      <tr>
                                        <td class="text-xs-left">Bill No : {{ Billno }}</td>
                                        <td class="text-xs-left" colspan="2">Bill Date : {{ vdate}}</td>
                                      </tr>
                                      <tr>
                                        <td class="text-xs-left">Bill Amount : {{ billamount}}</td>
                                        <td class="text-xs-left">Discount Amount : {{ discount }}</td>
                                        <td class="text-xs-left">Net Amount : {{ netamount }}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </v-flex>

                              <v-flex xs12>
                                <div class="table-responsive">
                                  <table align="center" class="table table-hover table-bordered" v-if="show">
                                    <thead>
                                      <tr>
                                        <th class="text-left">Service/Item</th>
                                        <th class="text-left">QTY</th>
                                        <th class="text-left">Amount</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr v-for="item in drtbilldetail" :key="item.name">
                                        <td>{{ item.ITEMNAME }}</td>
                                        <td>{{ item.QUANTITY }}</td>
                                        <td>{{ item.NET_AMOUNT }}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </v-flex>


                              <v-flex xs12>
                                <div class="table-responsive">
                                  <table align="center" class="table table-hover table-bordered" v-if="show">
                                    <thead>


                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td class="text-xs-left" colspan="2">Selected DRT : {{ drtcusname }}</td>
                                        <td class="text-xs-left">PAN no : {{ panno }}</td>

                                      </tr>
                                      <tr>
                                        <td class="text-xs-left">Agreed % : {{ aggcommission }}</td>
                                        <td class="text-xs-left">Given % : {{ drtcommission }}</td>
                                        <td class="text-xs-left">DRT Amount : {{ drtamount }}</td>
                                      </tr>
                                      <tr>
                                        <td class="text-xs-left" colspan="3">Comments : {{ drtcomments }}</td>
                                      </tr>
                                      <tr>
                                        <td class="text-xs-left">Selected category : {{ drtcat }}</td>
                                      </tr>
                                      <tr>
                                        <td class="text-xs-left">Created by : {{ Createdby }}</td>
                                        <td class="text-xs-left">Sch Approved by : {{ schapprovedby }}</td>
                                        <td class="text-xs-left">Finance Approved by : {{ Financeapprovedby }}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </v-flex>



                            </v-layout>
                          </v-container>

                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>

                        </v-card-actions>
                      </v-card>



                    </v-dialog>
                  </v-layout>
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
    dialogcancel: {},
    pagination: {
      'sortBy': 'column2',
      'descending': true,
      'rowsPerPage': -1
    },
    date_type: '',
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

    aggcommission: '',
    drtcomments: '',
    schcomments: '',
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
    dialog: false,
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
      "Mobile": "Mobile",
      "Total Net Amount": "Net_amount",
      "Reference": "Reference",
      "DRT Name": "DRTNAME",
      "Agreed %": "Aggreed_percentage_value",
      "Comm %": "Drt_percentage_value",
      "Comm Amt": "Drt_amount",
      "Comments": "Comments",	  
      "Email": "Email",
      "Net Amount": "Net_amount",
      "Status": "drtApproval_status",
      "Created by": "Created_by",
      "Submitted time": "Created_on",
      "SCH Approved by": "sch_Approved_by",
      "SCH Approved Time": "Approved_time",
      "Finance Approved by": "Admin_approved_by",
      "Finance Approved Time": "Admin_Approved_time",
      "Cancelled By": "Cancelled_by",
      "Cancelled Time": "Cancelled_time",
      "Ch Name ": "CH_Name",
      "Ch Branch": "CH_branch",
      "Expense date": "Expense_date",
	  "Slip":"Referal_slip"
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
        text: 'Mobile',
        value: 'Mobile'
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
        text: 'Email',
        value: 'Email'
      },
      {
        text: 'Slip',
        value: ''
      },
      {
        text: 'Status',
        value: 'Status'
      },
      {
        text: 'Appr',
        value: ''
      },
      {
        text: 'Decline',
        value: ''
      }
    ],
    category: [{
        shortCode: 'GPC',
        text: 'GPC'
      },
      {
        shortCode: 'IPC',
        text: 'IPC'
      },
      {
        shortCode: 'DPC',
        text: 'DPC'
      },
      {
        shortCode: 'YPP',
        text: 'YPP'
      },
      {
        shortCode: 'IC',
        text: 'IC'
      }
    ],
    message1: '',
    minDate: "2020-04-01",
    maxDate: curday('-'),

    bill_status: [{
        shortCode: 'Select All',
        text: 'All'
      },
      {
        shortCode: 'Pending',
        text: '0'
      },
      {
        shortCode: 'Approved',
        text: '1'
      },
      {
        shortCode: 'Approved By Finance',
        text: '2'
      },

      {
        shortCode: 'Cancelled',
        text: '3'
      },
      {
        shortCode: 'Cancelled By Finance',
        text: '4'
      },
    ],
    branch: [{
        shortCode: 'Select All',
        text: ''
      }

    ],

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
    discount: [],
    drtbilldetail: [],
    drtcusname: [],
    drtcat: [],
    Createdby: [],
    schapprovedby: [],
    Financeapprovedby: [],
    Setdatetype: ''
  }),
  created() {
    this.getToday();
  },
  mounted() {
    this.loadbranch();
    //  this.loaddrt();
  },

  methods: {

    rowClick(id) {
      // alert(id);
      this.billid = id;
      this.dialog = true;
      this.axios.get(`https://mis.dragarwal.com/api-approvalbills/${this.billid}`).then(response => {
        this.drtbilldetail = response.data;
        console.log(this.drtbilldetail);
        this.Name = this.drtbilldetail[0]["PATIENT_NAME"]
        this.Mrn = this.drtbilldetail[0]["MRN"];
        this.vdate = this.drtbilldetail[0]["TRANSACTION_DATE"];
        this.reftype = this.drtbilldetail[0]["REFERRAL_TYPE"];
        this.refby = this.drtbilldetail[0]["REFERRAL_VALUE"];
        this.refsub = this.drtbilldetail[0]["REFERRAL_BY"];
        this.Billno = this.drtbilldetail[0]["BILLNO"];
        this.billamount = this.drtbilldetail[0]["BILL_TOTAL_AMOUNT"];
        this.billid = this.drtbilldetail[0]["EXTERNAL_ID"];
        this.netamount = this.drtbilldetail[0]["BILL_NET_AMOUNT"];
        this.buttonstatus = this.drtbilldetail[0]["status"];
        this.drtcomments = this.drtbilldetail[0]["Comments"];
        this.aggcommission = this.drtbilldetail[0]["Aggreed_percentage_value"];
        this.drtcommission = this.drtbilldetail[0]["Drt_percentage_value"];
        this.panno = this.drtbilldetail[0]["DRT_Pan"];
        this.billedbranch = this.drtbilldetail[0]['BILLED']
        this.drtamount = this.drtbilldetail[0]["Drt_amount"];
        this.drtbilldate = this.drtbilldetail[0]["TRANSACTION_DATE"];
        this.drtcusname = this.drtbilldetail[0]["DRT_Name"];
        this.drtcat = this.drtbilldetail[0]["DRT_Category"];
        this.drtcusid = this.drtbilldetail[0]["DRT_Id"]
        this.discount = this.drtbilldetail[0]["BILL_DISCOUNT_AMOUNT"];
        this.Createdby = this.drtbilldetail[0]["Created_by"];
        this.schapprovedby = this.drtbilldetail[0]["sch_Approved_by"];
        this.Financeapprovedby = this.drtbilldetail[0]["Admin_approved_by"];
      })
    },

    rowApprove(row) {
      // console.log(row.Approval_status);
      let sch_id = '';
      let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));

      this.isLoading = true;
      this.$http
        .post(`https://mis.dragarwal.com/api-schbillinsert`, {
          sch_bill_id: row.id,
          sch_id: normalusername.name,
        }).then(response => {
          this.isLoading = false;
          alert("Approved")
          let status = '';
          let branch = '';
          let fromdate = '';
          let todate = '';
          if ((this.SetStatus == '') && (this.SetBranch == '')) {
            // alert("if");
            status = 'All';
            branch = 'All'
            let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
            // alert(normalusername.name);

            this.loading = true;
            this.isLoading = true;
            this.$http

              //    .get(`https://scm.dragarwal.com/api-opticals-super/${date}`)
              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-schbills/${this.fromdate}/${this.todate}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;

              });

          } else if ((this.SetStatus == '') || (this.SetBranch == '')) {
            // alert('else if');

            if (this.SetStatus == '') {
              this.SetStatus = 'All'
            } else if (this.SetBranch == '') {
              this.SetBranch = 'All'
            }

            let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
            // alert(normalusername.name);
            branch = this.SetBranch;
            status = this.SetStatus;
            this.loading = true;
            this.isLoading = true;
            this.$http
              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-schbills/${this.fromdate}/${this.todate}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;


              });


          } else {
            // alert("else");
            let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
            // alert(normalusername.name);
            branch = this.SetBranch;
            status = this.SetStatus;
            this.loading = true;
            this.isLoading = true;
            this.$http

              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-schbills/${this.fromdate}/${this.todate}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;

              });

          }
        })
    },

    rowDecline(row, schcomments) {
      this.dialogcancel = true;

      let sch_id = '';
      let sch_comments = '';

      let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));


      this.isLoading = true;
      this.$http.post(`https://mis.dragarwal.com/api-schbillcancel`, {
        sch_bill_id: row.id,
        sch_id: normalusername.name,
        sch_comments: this.schcomments,
      }).then(response => {
        this.isLoading = false


        if (response.data.Dataschcancelled === 'cancelled') {
          alert("Cancelled")

          let status = '';
          let branch = '';
          let fromdate = '';
          let todate = '';
          this.schcomments = '';
          if ((this.SetStatus == '') && (this.SetBranch == '')) {
            // alert("if");
            status = 'All';
            branch = 'All'
            let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
            // alert(normalusername.name);

            this.loading = true;
            this.isLoading = true;
            this.$http

              //    .get(`https://scm.dragarwal.com/api-opticals-super/${date}`)
              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-schbills/${this.fromdate}/${this.todate}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;
                this.schcomments = '';
              });

          } else if ((this.SetStatus == '') || (this.SetBranch == '')) {
            // alert('else if');

            if (this.SetStatus == '') {
              this.SetStatus = 'All'
            } else if (this.SetBranch == '') {
              this.SetBranch = 'All'
            }

            let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
            // alert(normalusername.name);
            branch = this.SetBranch;
            status = this.SetStatus;
            this.loading = true;
            this.isLoading = true;
            this.$http
              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-schbills/${this.fromdate}/${this.todate}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;
                this.schcomments = '';


              });


          } else {
            // alert("else");
            let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
            // alert(normalusername.name);
            branch = this.SetBranch;
            status = this.SetStatus;
            this.loading = true;
            this.isLoading = true;
            this.$http

              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-schbills/${this.fromdate}/${this.todate}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;
                this.schcomments = '';
              });

          }

        } else {
          alert("data not inserted")
        }



      })

    },

    getDRTcategory(selectObj1) {
      this.drtcategory = selectObj1;
    },
    getDRTdetail(selectObj) {
      this.drtdetail = [];
      this.drtid = selectObj;
      this.axios
        .get(`https://mis.dragarwal.com/api-drtdetail/${selectObj}`).then(response => {
          this.drtdetail = response.data;
          console.log(this.drtdetail[0]["GSTIN"]);
          this.gstin = this.drtdetail[0]["GSTIN"]
          this.panno = this.drtdetail[0]["Pan_no"]
          this.aggcommission = this.drtdetail[0]["Percentage"]
          this.commission = this.drtdetail[0]["Percentage"]
          console.log(this.commissions = this.drtdetail[0]["Percentage"]);
          this.drtname = this.drtdetail[0]["Name"]
        })

    },

    loadbranch() {
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      this.SetBranch = [];
      this.branch = [];
      var arr1 = [{
        shortCode: 'Select All',
        text: ''
      }];
      this.axios
        //  .get(`https://scm.dragarwal.com/api-branch/${selectObj}`).then(response =>{
        .get(`https://mis.dragarwal.com/api-schbranch/${userid.userName}`).then(response => {
          this.branch = arr1.concat(response.data);
          console.log(this.branch);
        })


    },
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
    apiRequestschdrtbill(fromdate, SetStatus, SetBranch, Setdatatype) {
      var date3 = new Date();
      var date4 = date3.getMonth() + "/" + date3.getDay() + "/" + date3.getYear();
      var currentDate = new Date(date4);
      let datetype = '';
      console.log(fromdate+" "+SetStatus+" "+SetBranch+" "+Setdatatype);
      if ((this.fromdate == '') || (this.fromdate == null)){
        alert("Please select Month");
        return false;
      }
      else if ((this.SetStatus === null) || (this.SetStatus == '')) {
        alert("Please select status");
        return false;
      }

       else {
         if (this.Setdatetype.text == 1) {
           datetype = this.Setdatetype.text;

         } else if (this.Setdatetype.text == 2) {
           datetype = this.Setdatetype.text;

         } else {
           datetype = this.Setdatetype;

         }

        let status = '';
        let branch = '';
        let fromdate = '';
        let todate = '';
        if ((this.SetStatus == '') && (this.SetBranch == '')) {
          status = 'All';
          branch = 'All'
          let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));


          this.loading = true;
          this.isLoading = true;
          this.$http

            .get(`https://mis.dragarwal.com/api-schbills/${this.fromdate}/${datetype}/${status}/${branch}/${normalusername.name}`)
            .then(response => {
              this.processDatabillsch(response.data);
              this.isLoading = false;

            });

        } else if ((this.SetStatus == '') || (this.SetBranch == '')) {

          if (this.SetStatus == '') {
            this.SetStatus = 'All'
          } else if (this.SetBranch == '') {
            this.SetBranch = 'All'
          }

          let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
          branch = this.SetBranch;
          status = this.SetStatus;
          this.loading = true;
          this.isLoading = true;
          this.$http
            .get(`https://mis.dragarwal.com/api-schbills/${this.fromdate}/${datetype}/${status}/${branch}/${normalusername.name}`)
            .then(response => {
              this.processDatabillsch(response.data);
              this.isLoading = false;


            });


        } else {
            let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
          branch = this.SetBranch;
          status = this.SetStatus;
          this.loading = true;
          this.isLoading = true;
          this.$http

            .get(`https://mis.dragarwal.com/api-schbills/${this.fromdate}/${datetype}/${status}/${branch}/${normalusername.name}`)
            .then(response => {
              this.processDatabillsch(response.data);
              this.isLoading = false;

            });



        }

        var str = "_"
        this.fileDate = this.fromdate.concat(str);

        console.log(this.fileDate);

        this.fileName = `Drt_Report_${this.fileDate}.csv`;


      }

    },

    processDatabillsch(data) {
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
      }

      this.billdata = data.result['bill'];
      console.log(this.billdata);
      this.show = true;
    },

    downloadExcelschDrt() {
      let tempDataArr = [];
      if (this.fileDate !== null) {
        tempDataArr = this.billdata

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
