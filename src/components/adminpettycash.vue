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
          <v-select :items="bill_status" v-model="SetStatus" label="Bill Status" id="SelEntity" item-text="shortCode" item-value="text"></v-select>


          <v-btn rounded color="primary" dark @click="apiRequestfinpc(SetStatus,SetBranch)">Generate</v-btn>



        </v-toolbar>
        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>

        <!-- Vuetify Data table -->

        <template>
          <v-card-title>
            <v-toolbar-title>Petty Cash</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn color="primary" dark @click="categoryreference()">
              Change category
            </v-btn>
			
			
			

                  <v-btn color="primary" dark @click="gotosummary(SetBranch)">
                    Summary
                  </v-btn>
         

            <v-spacer></v-spacer>
            <v-text-field v-model="search" v-if="strch" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="strch" v-model="selected" :search="search" class="elevation-4">
            <template slot="items" slot-scope="props">
              <tr>
                <td @click="rowClick(props.item.STATUS)">{{ props.item.STATUS }}</td>
                <td class="text-xs-left">{{ props.item.branch }}</td>
                <td class="text-xs-left">{{ props.item.Opening_Balance }}</td>
                <td class="text-xs-right">{{ props.item.credit }}</td>
                <td class="text-xs-right">{{ props.item.approved }}</td>

                <td class="text-xs-right" style="color:red">{{ props.item.can }}</td>
                <td class="text-xs-right" style="color:blue">{{ props.item.pending }}</td>
                <td class="text-xs-right" style="color:green">{{ props.item.balance }}</td>
                <td class="text-xs-right" style="color:magenta">{{ props.item.refill }}</td>
                <td class="text-xs-left" style="white-space: nowrap;">{{ props.item.Submitted_date }}</td>
                <td class="text-xs-left">
                  <v-btn slot="activator" small color="primary" @click="rowClick(props.item)">
                    View
                  </v-btn>
                </td>
                <td class="text-xs-left" v-if="props.item.STATUS==='Pending'">
                  <!-- <v-btn slot="activator" small fab color="success" @click="rowApproveAll(props.item)">
                    <v-icon>check</v-icon>
                  </v-btn> -->
                  <v-btn slot="activator" small fab @click.stop="$set(dialogapprove, props.item.test, true)" color="green">
                    <v-icon>check</v-icon>
                  </v-btn>


                  <v-dialog v-model="dialogapprove[props.item.test]" persistent max-width="800px" lazy absolute :key="props.item.test">
                    <v-card>

                      <v-card-title class="headline">Branch : {{props.item.branch }}</v-card-title>

                      <!-- <v-card-subtitle>Total amount : {{props.item.credit}}</v-card-subtitle> -->

                      <v-card-title>

                        <span>Total amount: {{props.item.credit}}{{"-----"}} Used amount : {{props.item.pending}} {{"------"}} Balance : {{props.item.balance}}</span>

                      </v-card-title>

                      <v-card-title>

                        <span>Approving amount: {{props.item.pending}}</span>

                        <!-- <span>Cancelled amount :{{props.item.Cancelled_amount}}</span> -->

                      </v-card-title>

                      <v-card-title>
                        <!--
                        <span>Approving amount: {{props.item.totalamount}}</span> -->

                        <span style="color:red">Cancelled amount :{{props.item.can}}</span>

                      </v-card-title>

                      <v-card-text>

                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12 sm6>
                              <v-checkbox v-model="enabled" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                              <v-text-field type="number" :disabled="!enabled" clearable v-model="refillamount" label="Enter Manual Amount" required></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6>
                              <v-checkbox v-model="enabled1" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                              <v-textarea clearable :disabled="!enabled1" clear-icon="cancel" label="Comments" v-model='schcomments'></v-textarea>
                            </v-flex>

                            <v-flex xs12>
                              <input type="file" ref="billupload" id="billupload" accept="image/x-png, image/gif, image/jpeg,application/pdf" v-on:change="handleFileUploadBill()" /><span id="billUploaderr" ref="billUploaderr"
                                style='color:red'></span>
                            </v-flex>

                          </v-layout>
                        </v-container>
                      </v-card-text>


                      <v-card-actions>

                        <v-btn color="primary" flat @click.stop="$set(dialogapprove, props.item.test, false)">Close</v-btn>
                        <v-btn color="blue darken-1" flat :disabled="!approvevalid" @click="rowApproveAll(props.item,refillamount,schcomments,)" @click.stop="$set(dialogapprove, props.item.test, false)">Refill&Approve</v-btn>

                      </v-card-actions>
                    </v-card>
                  </v-dialog>


                </td>

                <td class="text-xs-left" v-if="props.item.STATUS !='Pending'">
                  {{ }}
                </td>

                <td class="text-xs-left" v-if="(!((props.item.Payment_receipt ==='NA')||(props.item.Payment_receipt ===null)||(props.item.Payment_receipt ==='')))">

                  <v-btn slot="activator" small fab color="primary" @click="downloadPayreceipt(props.item.Payment_receipt)">
                    <v-icon>download</v-icon>
                  </v-btn>


                </td>

                <v-dialog v-model="dialog" persistent max-width="2000px" lazy absolute>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Information</span>
                    </v-card-title>

                    <v-card-text>

                      <table align="center" v-if="showgroup" class="inlineTable table-hover table-bordered" border="2">
                        <tr>
                          <th class="text-left">Category</th>
                          <th class="text-left">Total amount</th>
                          <th class="text-left">Decline</th>
                        </tr>
                        <tr v-for="(grpdata) in groupdata" :key="grpdata.category_name" @click="">
                          <td @click="groupclick(grpdata)" class="text-xs-left" style="color:blue">
                            <u>{{grpdata.category_name}}</u>
                          </td>
                          <td class="text-xs-right">{{grpdata.totalamount}}</td>
                          <td class="text-xs-right" v-if="grpdata.status==='Pending'">
                            {{grpdata.status}}
                          </td>
                          <td class="text-xs-right" v-else>
                            {{grpdata.status}}
                          </td>

                        </tr>
                      </table>
                      <table align="center" v-if="showgroupdetail" class="inlineTable table-hover table-bordered" border="1">
                        <tr>

                          <th class="text-left">Bill date</th>

                          <th class="text-left">Category name</th>
                          <th class="text-left">Bill No</th>
                          <th class="text-left">Vendor Name </th>
                          <th class="text-left">Voucher No </th>
                          <th class="text-left">Total Amount</th>
                          <th class="text-left">Comments</th>
                          <th class="text-left">Decline</th>
                          <th class="text-left">Voucher Download</th>
                          <th class="text-left">Bill Download</th>
                          <th class="text-left">Category change</th>
                        </tr>
                        <tr v-for="item in groupdatadetail" :key="item.name">
                          <td class="text-left">{{ item.Bill_date }}</td>
                          <td class="text-left">{{ item.category_name }}</td>
                          <td class="text-left">{{ item.bill_no }}</td>
                          <td class="text-left">{{ item.vendorname }}</td>
                          <td class="text-left">{{ item.voucher_no }}</td>
                          <td class="text-right">{{ item.totalamount }}</td>
                          <td class="text-left"> {{item.Comments}}</td>
                          <td class="text-xs-right" v-if="item.Active_status==='Pending'">
                            <v-btn slot="activator" small fab @click.stop="$set(dialogcancel, item.voucher_no, true)" color="red">
                              <v-icon>fas fa-times</v-icon>
                            </v-btn>


                            <v-dialog v-model="dialogcancel[item.voucher_no]" persistent max-width="800px" lazy absolute :key="props.item">
                              <v-card>
                                <v-card-title>
                                  <span>{{'branch : '}}{{ item.branch }}{{" -- Bill no : "}}{{item.bill_no}} </span><br>
                                  <span>{{" -- Vendor no : "}}{{item.voucher_no}} {{'-- Vendorname : '}}{{item.vendorname}} </span><br />
                                </v-card-title>
                                <v-card-title>
                                  <span>{{' -- Amount : '}}{{item.debit}} </span>
                                </v-card-title>
                                <v-card-title>
                                  <span>Cancel Remark</span>
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

                                  <v-btn color="primary" flat @click.stop="$set(dialogcancel, item.voucher_no, false)">Close</v-btn>
                                  <v-btn color="blue darken-1" flat :disabled="!declinievalid" @click="rowDecline(item,schcomments)" @click.stop="$set(dialogcancel, item.voucher_no, false)">Decline</v-btn>

                                </v-card-actions>
                              </v-card>
                            </v-dialog>


                          </td>
                          <td class="text-xs-right" v-else="!(item.Active_status==='Pending')">
                            {{item.Active_status}}
                          </td>
                          <td class="text-xs-right" v-if="!(item.voucher_attach==='NA')">
                            <v-btn slot="activator" small fab color="primary" @click="downloadvouchher(item.voucher_attach)">
                              <v-icon>cloud_download</v-icon>
                            </v-btn>

                          </td>
                          <td class="text-xs-right" v-else="(item.voucher_attach==='NA')">
                            {{ }}
                          </td>
                          <td class="text-xs-right" v-if="!(item.bill_attach==='NA')">
                            <v-btn slot="activator" small fab color="primary" @click="downloadbill(item.bill_attach)">
                              <v-icon>cloud_download</v-icon>
                            </v-btn>

                          </td>
                          <td class="text-xs-right" v-else="(item.bill_attach==='NA')">
                            {{ }}
                          </td>

                          <td class="text-xs-right" v-if="(item.Active_status !='Approved')">
                            <v-btn slot="activator" small fab @click.stop="$set(dialogcategory, item.voucher_no, true)" color="pink">
                              <v-icon>fas fa-exchange-alt</v-icon>
                            </v-btn>



                            <v-dialog v-model="dialogcategory[item.voucher_no]" persistent max-width="800px" lazy absolute :key="props.item">
                              <v-card>
                                <v-card-title>
                                  <span>{{'branch : '}}{{ item.branch }}{{" -- Bill no : "}}{{item.bill_no}} </span><br>
                                  <span>{{" -- Vendor no : "}}{{item.voucher_no}} {{'-- Vendorname : '}}{{item.vendorname}} </span><br />
                                </v-card-title>
                                <v-card-title>
                                  <span>{{' Amount : '}}{{item.debit}} </span>
                                </v-card-title>
                                <v-card-title>
                                  <span>{{' Category : '}}{{item.category_name}} </span>
                                </v-card-title>
                                <v-card-title>
                                  <span>Change Category</span>
                                </v-card-title>

                                <v-card-text>
                                  <v-container grid-list-md>
                                    <v-layout wrap>

                                      <!-- <v-flex xs12 sm6>
                                        <v-textarea clearable clear-icon="cancel" label="Comments" v-model='schcomments'></v-textarea>
                                      </v-flex> -->
                                      <v-flex xs12>
                                        <v-select v-model="category" :items="items" label="Category" item-text="shortCode" item-value="text"></v-select>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>


                                <v-card-actions>

                                  <v-btn color="primary" flat @click.stop="$set(dialogcategory, item.voucher_no, false)">Close</v-btn>
                                  <v-btn color="blue darken-1" flat @click="rowChange(item,category)" @click.stop="$set(dialogcategory, item.voucher_no, false)">Change</v-btn>

                                </v-card-actions>
                              </v-card>
                            </v-dialog>


                          </td>
                          <td class="text-xs-right" v-else="!(item.Active_status==='Pending')">
                            {{item.Active_status}}
                          </td>

                        </tr>
                      </table>

                    </v-card-text>


                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="dialogclose()">Close</v-btn>
                    </v-card-actions>



                  </v-card>
                </v-dialog>

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
      "Bill No": "Bill_no",
      "Bill Date": "bill_date",
      "Mrn": "Mrn",
      "Name": "Name",
      "Total Net Amount": "Net_amount",
      "Category": "Category",
      "Reg ref": "REFERRALTYPENAME",
      "Bill Ref": "Reference",
      "DRT Name": "DRTNAME",
      "Payment type": "Payment_type",
      "Infavour of": "Infavour_of",
      "Pan no": "Pan_no",
      "Bank name": "Bank_name",
      "Bank ifsc": "Bank_ifsc",
      "Account no": "Account_no",
      "Agreed %": "Aggreed_percentage_value",
      "Comm %": "Drt_percentage_value",
      "Comm Amt": "Drt_amount",
      "Comments": "Comments",
      "Net Amount": "Net_amount",
      "Status": "drtApproval_status",
      "Created by": "Created_by",
      "Submitted time": "Drt_Created_on",
      "SCH Approved by": "sch_Approved_by",
      "SCH Approved Time": "Drt_Approved_time",
      "Finance Approved by": "Admin_approved_by",
      "Finance Approved Time": "Drt_Admin_Approved_time",
      "Cancelled By": "Cancelled_by",
      "Cancelled Time": "Drt_Cancelled_time",
      "Ch name": "CH_Name",
      "Ch Branch": "CH_branch",
      "Sch Name": "SCH_Name",
      "Sch Branch": "SCH_Branch",
      "Expense date": "Expense_date"
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
    bill_status: [{
        shortCode: 'Select All',
        text: 'All'
      },
      {
        shortCode: 'Pending',
        text: '2'
      },
      {
        shortCode: 'Approved',
        text: '4'
      },
      {
        shortCode: 'Need SCH Approval',
        text: '1'
      },

      {
        shortCode: 'Cancelled By SCH',
        text: '3'
      },
      {
        shortCode: 'Cancelled',
        text: '5'
      },
    ],

    fromdate: null,
    todate: null,
    minDate: "2020-08-01",
    maxDate: curday('-'),
    menu1: false,
    menu2: false,
    isLoading: false,
    fullPage: true,
    headers: [{
        text: 'Status',
        align: 'left',
        sortable: false,
        value: 'Status'
      },
      {
        text: 'Branch',
        value: 'branch',
        sortable: false
      },
      {
        text: 'Opening Balance',
        value: 'Allocated',
        sortable: false
      },
      {
        text: 'credit',
        value: 'Allocated',
        sortable: false
      },

      {
        text: 'Approved',
        value: 'Approved',
        sortable: false
      },
      {
        text: 'Cancelled',
        value: 'Cancelled',
        sortable: false
      },
      {
        text: 'Pending',
        value: 'Pending'


      },

      {
        text: 'Balance',
        value: 'Balance',
        sortable: false
      },
      {
        text: 'Refilled amount',
        value: 'Balance',
        sortable: false
      },
      {
        text: 'Submitted',
        value: 'Submitted',
        sortable: false
      },

      {
        text: 'View',
        value: 'View',
        sortable: false
      },
      {
        text: 'Approve',
        value: 'Approve',
        sortable: false

      },
      {
        text: 'Payment_receipt',
        value: 'Payment_receipt',
        sortable: false

      },

      // {
      //   text: 'Decline',
      //   value: 'Decline'
      // }
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

  }),
  mounted() {
    this.loadbranch();
    this.loadcategory();
  },
  methods: {
    gotosummary() {
      serverBus.$emit('changeComponent', 'pettcashsummary')
    },
    categoryreference() {
      serverBus.$emit('changeComponent', 'changecategory')
    },
    loadcategory() {

      this.axios
        .get(`https://mis.dragarwal.com/api-pettycashcategory`).then(response => {
          this.items = response.data;

        })
    },

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

    apiRequestfinpc(SetStatus, SetBranch) {
      // if ((this.fromdate == '') || (this.fromdate == '')) {
      //   alert("Please select Month");
      //   return false;
      // }
      if ((this.SetBranch == '') || (this.SetBranch == null)) {
        alert("Please select branch")
        return false;
      } else if ((this.SetStatus === null) || (this.SetStatus == '')) {
        alert("Please select status");
        return false;
      }


      this.isLoading = true;
      //    let userid = JSON.parse(sessionStorage.getItem("fin_user"));
      let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
      console.log(normalusername);
      this.$http.get(`https://mis.dragarwal.com/api-finpc/${this.SetBranch}/${this.SetStatus}/${normalusername.name}`)
        .then(response => {
          this.isLoading = false;
          console.log(response.data);

          this.processliststrchdata(response.data);



        })
      var str = "_"

      this.fileName = `Drt_Report.csv`;


    },
    processliststrchdata(data) {
      this.strch = data.result["pcbill"]
      console.log(this.strch);

      this.show = true
    },
    rowClick(id) {
      console.log("hit in ");
      console.log(id);
      //return false;
      this.dialog = true;
      this.showgroup = true;
      this.isLoading = true;
      this.showgroupdetail = false;
      this.$http.get(`https://mis.dragarwal.com/api-finpcbranchgroupbill/${id.branch}/${id.statusno}`)
        .then(response => {
          this.isLoading = false;
          this.groupdata = response.data;
          console.log(response.data);
        })

    },

    dialogclose() {
      this.dialog = false;
      this.allSelected = false;
      this.selecteddata = false;
      this.isLoading = true;
      let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
      console.log(normalusername);
      this.$http.get(`https://mis.dragarwal.com/api-finpc/${this.SetBranch}/${this.SetStatus}/${normalusername.name}`)
        .then(response => {
          this.isLoading = false;
          console.log(response.data);
          this.processliststrchdata(response.data);

        })


    },
    groupclick(item) {
      //  return false;
      console.log(item);
      this.isLoading = true;
      this.$http.get(`https://mis.dragarwal.com/api-finpcbranchgroupbilldetail/${item.branch}/${item.category_id}/${item.status1}`).
      then(response => {
        console.log("group click");
        console.log(response);
        this.isLoading = false;
        this.showgroupdetail = true;
        this.groupdatadetail = response.data;
      })


    },
    rowApproveAll(item, refillamount, schcomments) {
      this.approvevalid = false;
      if (refillamount == '') {
        refillamount = item.pending
      }

      if (item.pending < refillamount) {

        if (confirm("Entering amount is greater than refilled amount")) {} else {
          alert('Cancel')
          return false
        }
      }


      if ((this.fileBill == null) || (this.fileBill == '')) {
        alert("Please upload Payment Receipt")
        return false
      } else if ((this.fileBill.size > 1000000)) {
        alert("Voucher file is greater than 1Mb");
        return false;
      }


      let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));

      var formData = new FormData()

      formData.append("strch_id", normalusername.name);
      formData.append("strch_branch", item.branch);
      formData.append("strch_date", item.bill_submission);
      formData.append("status", item.statusno);
      formData.append("finrefilledamount", refillamount);
      formData.append("comments", schcomments);
      formData.append("payment_receipt", this.fileBill);

      this.$http.post(`https://mis.dragarwal.com/api-finptycshbillgroupapproveall`, formData, {}).then(response => {
        this.isLoading = false;
        this.refillamount = '';
        this.enabled = false;
        if (response.data.dataupdated == true) {
          alert("approved");
          this.isLoading = true;
          let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
          console.log(normalusername);
          this.$http.get(`https://mis.dragarwal.com/api-finpc/${this.SetBranch}/${this.SetStatus}/${normalusername.name}`)
            .then(response => {
              this.refillamount = '';
              this.isLoading = false;
              console.log(response.data);
              this.processliststrchdata(response.data);
              this.approvevalid = true;
            })
        } else {
          alert("Error in approving date");
          this.refillamount = '';
          this.enabled = false;
          this.approvevalid = true;
        }
      })

    },
    downloadPayreceipt(filename) {
      this.axios({
        url: `https://mis.dragarwal.com/api-payment-download/${filename}`,
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
    downloadvouchher(filename) {
      this.axios({
        url: `https://mis.dragarwal.com/api-voucher-download/${filename}`,
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
    downloadbill(filename) {
      this.axios({
        url: `https://mis.dragarwal.com/api-bill-download/${filename}`,
        //url: `https://mis.dragarwal.com/api-bill-download/${filename}`,
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

    rowDecline(item, schcomments) {
      console.log(item);
      console.log("jhit");


      this.declinievalid = false;

      //  this.dialogcancel=false;
      let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
      this.isLoading = true;
      this.$http.post(`https://mis.dragarwal.com/api-finpcbillgroupdecline`, {
        strch_id: normalusername.name,
        strch_groupcategory: item.category_name,
        strch_branch: item.branch,
        strch_date: item.created_date,
        amount: item.totalamount,
        comments: schcomments,
        strch_billno: item.bill_no,
        strch_vouchername: item.vendorname,
        strch_voucherno: item.voucher_no,
        bill_attach: item.bill_attach,
        voucher_attach: item.voucher_attach


      }).then(response => {
        this.isLoading = true;

        if (response.data.dataupdated == true) {
          alert('Cancelled');
          this.schcomments = '';
          console.log(item);
          this.$http.get(`https://mis.dragarwal.com/api-finpcbranchgroupbilldetail/${item.branch}/${item.category_id}/${item.status}`).
          then(response => {
            console.log(response);

            this.showgroupdetail = true;
            this.groupdatadetail = response.data;

            this.$http.get(`https://mis.dragarwal.com/api-finpcbranchgroupbill/${item.branch}/${item.status}`)
              .then(response => {
                this.isLoading = false;
                this.groupdata = response.data;
                console.log(response.data);
                this.showgroup = true;
                this.showgroupdetail = true;
              });

          });

          this.declinievalid = true;

        } else {
          alert('error in cancelling data');
          this.schcomments = '';
          this.declinievalid = true;
        }
      })

    },
    rowChange(item, category) {

      let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
      this.isLoading = true;

      this.$http.post(`https://mis.dragarwal.com/api-categoryupdate`, {
        categoryid: category,
        itemid: item.sno,
        branch: item.branch
      }).then(response => {
        if (response.data.dataupdated == true) {
          alert("Category changed")
          this.isLoading = true;
          this.$http.get(`https://mis.dragarwal.com/api-finpcbranchgroupbilldetail/${item.branch}/${item.category_id}/${item.status}`).
          then(response => {

            this.isLoading = false;
            this.showgroupdetail = true;
            this.groupdatadetail = response.data;

            this.dialog = true;
            this.showgroup = true;
            this.isLoading = true;
            this.showgroupdetail = false;
            this.$http.get(`https://mis.dragarwal.com/api-finpcbranchgroupbill/${item.branch}/${item.status}`)
              .then(response => {
                this.isLoading = false;
                this.groupdata = response.data;
                console.log(response.data);
              })


          })





        } else {
          alert("Error in saving data")
          this.isLoading = true;
          this.$http.get(`https://mis.dragarwal.com/api-finpcbranchgroupbilldetail/${item.branch}/${item.category_id}/${item.status}`).
          then(response => {

            this.isLoading = false;
            this.showgroupdetail = true;
            this.groupdatadetail = response.data;

            this.dialog = true;
            this.showgroup = true;
            this.isLoading = true;
            this.showgroupdetail = false;
            this.$http.get(`https://mis.dragarwal.com/api-finpcbranchgroupbill/${item.branch}/${item.status}`)
              .then(response => {
                this.isLoading = false;
                this.groupdata = response.data;
                console.log(response.data);
              })


          })





        }
      })


    },

    handleFileUploadBill() {
      this.fileBill = this.$refs.billupload.files[0];
      if ((this.fileBill.size > 1000000)) {

        alert("Bill file is greater than 1MB");
        this.fileBill = '';
        console.log(this.fileBill);
        return false;

      }
    }

  }
}
</script>

<style >
.inlineTable {
  display: inline-block;
}
</style>
