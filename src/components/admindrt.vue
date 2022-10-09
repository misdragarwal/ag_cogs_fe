<template>
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

          <v-btn rounded color="primary" dark @click="apiRequestfindrtbill(fromdate,todate,SetStatus,SetBranch,Setdatatype)">Generate</v-btn>

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
            <v-toolbar-title>DRT Approval</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="doctorapproval()">
              <v-badge>
                <template v-slot:badge>
                  <span>{{loaddr.count}}</span>
                </template>

                Doctor Approval
              </v-badge>
            </v-btn>

            <v-spacer></v-spacer>
<!--
            <v-text-field v-if="username=='finadmin'" v-model="fixdate" label="No of Days " outlined type="Number" shaped></v-text-field> -->

            <v-menu absolute ref="menu3" v-if="username=='finadmin'" :close-on-content-click="false" v-model="menu3" :nudge-right="40" :return-value.sync="fromdate1" lazy transition="scale-transition" offset-y full-width min-width="150px">
              <v-text-field slot="activator" v-model="fromdate1" placeholder="Select Date" prepend-inner-icon="event" readonly></v-text-field>
              <v-date-picker color="primary" v-model="fromdate1" no-title scrollable :min="minDate1" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu3 = false" style="outline:none">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu3.save(fromdate1)" style="outline:none">Ok</v-btn>
              </v-date-picker>
            </v-menu>

            <v-btn color="primary" v-if="username=='finadmin'" dark @click="lockdate(fromdate1)">
              Lockdate
            </v-btn>

  <v-spacer></v-spacer>
  <v-toolbar-title>Previous cutoff : {{this.fix_dte}}</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-text-field v-model="search" v-if="billdata" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="billdata" v-model="selected" :search="search" class="elevation-4">
            <template slot="items" slot-scope="props">
              <tr>
                <td @click="rowClick(props.item.Bill_id)">{{ props.item.Bill_no }}</td>
                <td class="text-xs-left" style="white-space: nowrap;">{{ props.item.bill_date }}</td>
                <td class="text-xs-left">{{ props.item.Mrn }}</td>
                <td class="text-xs-left">{{ props.item.Name }}</td>
                <td class="text-xs-left">{{props.item.Mobile}}</td>
                <td class="text-xs-left">{{ props.item.Net_amount }}</td>
                <td class="text-xs-left">{{ props.item.Category }}</td>
                <td class="text-xs-left">{{props.item.REFERRALTYPENAME }}</td>
                <td class="text-xs-left">{{props.item.Reference }}</td>
                <!-- <td class="text-xs-left">{{props.item.REFERREDBYNAME }}</td> -->
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

                <td class="text-xs-right" v-else="props.item.drtApproval_status==='Approved'">
                </td>

                <!--
                <td class="text-xs-right" v-if="props.item.drtApproval_status==='Pending'">
                  <v-btn slot="activator" small fab color="red" @click="rowDecline(props.item)">
                    <v-icon>fas fa-times</v-icon>
                  </v-btn>
                </td> -->
                <td class="text-xs-right" v-if="props.item.drtApproval_status==='Pending'">

                  <v-btn slot="activator" small fab @click.stop="$set(dialogcancel, props.item.Bill_no, true)" color="red">
                    <v-icon>fas fa-times</v-icon>
                  </v-btn>

                  <v-dialog v-model="dialogcancel[props.item.Bill_no]" persistent max-width="800px" lazy absolute :key="props.item.Bill_no">
                    <v-card>
                      <v-card-title>
                        <span>{{ props.item.Mrn }}{{ " -- "}}{{ props.item.Bill_no  }} Cance Note</span>
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

                <td class="text-xs-right" v-else="props.item.drtApproval_status==='Approved'">
                </td>

                <td class="text-xs-right" v-if="props.item.drtApproval_status==='Pending' && (props.item.Expense_date ==='')||(props.item.Expense_date ===null) ">
                  {{(fin_expense_date(props.item.bill_date))}}
                  <v-btn slot="activator" small fab @click.stop="$set(dialogexpensedate, props.item.Bill_no, true)" color="grey">
                    <v-icon>fas fa-info</v-icon>
                  </v-btn>

                  <v-dialog v-model="dialogexpensedate[props.item.Bill_no]" persistent max-width="400px" lazy absolute :key="props.item.Bill_no">
                    <v-card>
                      <v-card-title>
                        <span>{{ props.item.Mrn }}{{ " -- "}}{{ props.item.Bill_no  }}</span>
                        <br>

                        <span>Change expense date</span>

                      </v-card-title>

                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>

                            <v-flex xs12 sm6>
                              <v-date-picker v-model="finexpensedate" type="month" :min="minExDate" :max="maxDate" color="green lighten-1" header-color="primary"></v-date-picker>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>


                      <v-card-actions>


                        <v-btn color="primary" flat @click.stop="$set(dialogexpensedate, props.item.Bill_no, false)">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click.stop="rowupdatexpense(props.item,finexpensedate),$set(dialogexpensedate, props.item.Bill_no, false)">Update</v-btn>

                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
                <td class="text-xs-right" v-else-if="props.item.drtApproval_status==='Pending' && props.item.Expense_date !=='' ">
                  {{ props.item.Expense_date}}
                  <v-btn slot="activator" small fab @click.stop="$set(dialogexpensedate, props.item.Bill_no, true)" color="orange">
                    <v-icon>fas fa-info</v-icon>
                  </v-btn>

                  <v-dialog v-model="dialogexpensedate[props.item.Bill_no]" persistent max-width="400px" lazy absolute :key="props.item.Bill_no">
                    <v-card>
                      <v-card-title>
                        <span>{{ props.item.Mrn }}{{ " -- "}}{{ props.item.Bill_no  }}</span>
                        <br>

                        <span>Change expense date</span>

                      </v-card-title>

                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>

                            <v-flex xs12 sm6>
                              <v-date-picker v-model="finexpensedate" type="month" :min="minExDate" :max="maxDate" color="green lighten-1" header-color="primary"></v-date-picker>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>


                      <v-card-actions>


                        <v-btn color="primary" flat @click.stop="$set(dialogexpensedate, props.item.Bill_no, false)">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click.stop="rowupdatexpense(props.item,finexpensedate),$set(dialogexpensedate, props.item.Bill_no, false)">Update</v-btn>

                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
                <td class="text-xs-right" v-else="props.item.drtApproval_status==='Approved'">
                  {{props.item.Expense_date}}
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
import admindoctorapproval from "@/components/admindoctorapproval";
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
  console.log(yyyy + sp + mm + sp + dd);

  return (yyyy + sp + mm + sp + dd);
};


var expensecurmonth = function(sp) {
  var today = new Date(new Date().getTime()-(30*24*60*60*1000));

    var dd=today.getDate();
    var mm=today.getMonth();
    var yyyy=today.getFullYear();

if (dd < 10) dd = '0' + dd;
    if (mm < 10 && mm >= 0) mm = '0' + mm;
    else  if(mm>=10){
      mm
    }
    console.log(dd+"-"+mm+"-"+yyyy);
  //
  // var dd = today.getDate();
  // var mm = (today.getMonth() + 1) - 2; //As January is 0.
  // var yyyy = today.getFullYear();
  //
  //
  // if (dd < 10) dd = '0' + dd;
  // if (mm < 10 && mm >= 0) mm = '0' + mm;
  // else if (mm < 0) mm = '11';
  return (yyyy + sp + mm + sp + dd);
};



export default {

  components: {
    admindoctorapproval
  },
  data: () => ({
    finexpensedate: new Date().toISOString().substr(0, 7),
    dialogcancel: {},
    dialogexpensedate: {},
    fixdate: '',
    Setdatetype: '',
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
      "Name": "Name",
	  "Mobile": "Mobile",
      "Total Net Amount": "Net_amount",
      "Category":"Category",
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
	  "Email": "Email",
	 
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
        text: 'Category',
        value: 'Category'
      },
      {
        text: 'Reg ref',
        value: 'Reference'
      },
      {
        text: 'Bill Ref',
        value: 'Reference'
      },
      {
        text: 'DRT Name',
        value: 'DRT Name'
      },
      // {
      //   text: 'Bill DRT Name',
      //   value: 'DRT Name'
      // },
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
      },
      {
        text: 'Expense date',
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
    minDate1:'2020-04-01',
    maxDate: curday('-'),
    minExDate: expensecurmonth('-'),
    bill_status: [{
        shortCode: 'Select All',
        text: 'All'
      },
      {
        shortCode: 'Approved',
        text: '2'
      },
      {
        shortCode: 'Pending',
        text: '1'
      },
      {
        shortCode: 'Cancelled',
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
    fromdate1:null,
    todate: null,
    menu: false,
    menu1: false,
    modal: false,
    menu2: false,
    today: "",
    collection: null,
    billdata: null,
    billstatus: null,
    loaddr: null,
    drtbilldetail: null,
    Financeapprovedby: null,
    schapprovedby: null,
    Createdby: null,
    drtcat: null,
    drtcusname: null,
    discount: null,
    schcomments: '',
    username:'',
    fix_dte: '',

  }),
  created() {
    this.getToday();
  },
  mounted() {
    this.loadbranch();
    this.loaddoctorlist();
      this.loadfixdate();
  },

  methods: {
    doctorapproval() {
      serverBus.$emit('changeComponent', 'admindoctorapproval')
    },

    fin_expense_date(date) {

      var finemonth = new Date(date)
      var month='';
      var finexpmonth = finemonth.getMonth() + 1;
        if(finexpmonth<10){
        month=("0" + (finemonth.getMonth() + 1)).slice(-2);
      }
      else {
        month=finexpmonth;

      }
      var finexpyear = finemonth.getFullYear();

      var expensedate = finexpyear + "-" + month;

    console.log(month);
      console.log(expensedate);
      return  finexpyear + "-" + month;
    },

    loaddoctorlist() {
      this.axios
        .get(`https://mis.dragarwal.com/api-loaddoc`).then(response => {
          console.log(response.data);
          this.loaddoctor = response.data;
          this.loaddr = this.loaddoctor[0];
          console.log(this.loaddr.count);
        })
    },
    loadfixdate() {
      this.axios.get(`https://mis.dragarwal.com/api-getfixdate`).then(response => {

        this.fix_dte = response.data.fixeddate[0].fix_date;

      })
    },
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

      let expensedate = '';
      let expense_date = '';
      console.log("roe");
      if ((row.Expense_date == '') || (row.Expense_date == null)) {
        console.log("hit in empty expense");
        expense_date = new Date(row.bill_date);
        const ye = new Intl.DateTimeFormat('en', {
          year: 'numeric'
        }).format(expense_date)
        const mo = new Intl.DateTimeFormat('en', {
          month: 'numeric'
        }).format(expense_date)
        if (mo < 10) {
          var mon = '0'.concat(mo)
        }else{
          var mon=mo
        }
        expensedate = ye.concat("-", mon);

      } else {
        console.log("hit in expnese");
        expensedate = row.Expense_date;

      }


      let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));

      this.isLoading = true;
      this.$http
        /*.post(`https://mis.dragarwal.com/api-finbillinsert`, {
          sch_bill_id: row.id,
          sch_id: normalusername.name,
          sch_expensedate: expensedate,
        }).then(response => {
        */
       .post(`https://mis.dragarwal.com/api-finbillinsert`, {
          sch_bill_id: row.id,
          sch_id: normalusername.name,
          sch_expensedate: expensedate,
        }).then(response => {
          this.isLoading = false;
          alert("Approved")
          let status = '';
          let branch = '';
          let fromdate = '';
          let todate = '';
		  let datetype='';
          if ((this.SetStatus == '') && (this.SetBranch == '')) {
            // alert("if");
            status = 'All';
            branch = 'All'
            let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
            // alert(normalusername.name);

            this.loading = true;
            this.isLoading = true;
            this.$http

              //    .get(`https://scm.dragarwal.com/api-opticals-super/${date}`)
              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${this.datetype}/${status}/${branch}/${normalusername.name}`)
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

            let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
            // alert(normalusername.name);
            branch = this.SetBranch;
            status = this.SetStatus;
            this.loading = true;
            this.isLoading = true;
            this.$http
              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${this.datetype}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;


              });


          } else {
            // alert("else");
            let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
            // alert(normalusername.name);
            branch = this.SetBranch;
            status = this.SetStatus;
            this.loading = true;
            this.isLoading = true;
            this.$http

              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${this.datetype}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;

              });

          }
        })
    },


    rowDecline(row, schcomments) {
      //  alert(row.Bill_no);
      if ((schcomments == '') || (schcomments == null)) {
        alert("Please enter Comments")
        return false;
      }

      let sch_id = '';
      let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
      let sch_comments = '';
      this.isLoading = true;
      this.$http.post(`https://mis.dragarwal.com/api-finbillcancel`, {
        sch_bill_id: row.id,
        sch_id: normalusername.name,
        sch_comments: this.schcomments,
      }).then(response => {
        this.isLoading = false;

        if (response.data.Dataschcancelled === 'cancelled') {
          alert("Cancelled")

          let status = '';
          let branch = '';
          let fromdate = '';
          let todate = '';
		  let datetype='';
          this.schcomments = '';
          if ((this.SetStatus == '') && (this.SetBranch == '')) {
            // alert("if");
            status = 'All';
            branch = 'All'
            let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
            // alert(normalusername.name);

            this.loading = true;
            this.isLoading = true;
            this.$http

              //    .get(`https://scm.dragarwal.com/api-opticals-super/${date}`)
              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${this.datetype}/${status}/${branch}/${normalusername.name}`)
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

            let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
            // alert(normalusername.name);
            branch = this.SetBranch;
            status = this.SetStatus;
            this.loading = true;
            this.isLoading = true;
            this.$http
              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${this.datetype}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;
                this.schcomments = '';

              });


          } else {
            // alert("else");
            let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
            // alert(normalusername.name);
            branch = this.SetBranch;
            status = this.SetStatus;
            this.loading = true;
            this.isLoading = true;
            this.$http

              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${this.datetype}/${status}/${branch}/${normalusername.name}`)
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
    rowupdatexpense(row, finexpensedate) {

      let sch_expensedate = '';
      let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
      this.isLoading = true;
      this.$http
		//.post(`https://mis.dragarwal.com/api-finbillexpenseupdate`, {
        .post(`https://mis.dragarwal.com/api-finbillexpenseupdate`, {
          sch_bill_id: row.id,
          sch_id: normalusername.name,
          sch_expensedate: finexpensedate,
        }).then(response => {
          this.isLoading = false;

          console.log(this.dialogexpensedate);
          alert("updated")
          let status = '';
          let branch = '';
          let fromdate = '';
          let todate = '';
		  let datetype='';
          if ((this.SetStatus == '') && (this.SetBranch == '')) {
            // alert("if");
            status = 'All';
            branch = 'All'
            let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
            // alert(normalusername.name);

            this.loading = true;
            this.isLoading = true;
            this.$http

              //    .get(`https://scm.dragarwal.com/api-opticals-super/${date}`)
              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${this.datetype}/${status}/${branch}/${normalusername.name}`)
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

            let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
            // alert(normalusername.name);
            branch = this.SetBranch;
            status = this.SetStatus;
            this.loading = true;
            this.isLoading = true;
            this.$http
              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${this.datetype}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;


              });


          } else {
            // alert("else");
            let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
            // alert(normalusername.name);
            branch = this.SetBranch;
            status = this.SetStatus;
            this.loading = true;
            this.isLoading = true;
            this.$http

              //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
              .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${this.datetype}/${status}/${branch}/${normalusername.name}`)
              .then(response => {
                this.processDatabillsch(response.data);
                this.isLoading = false;

              });

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
      let userid = JSON.parse(sessionStorage.getItem("fin_user"));
      this.SetBranch = [];
      this.branch = [];
      var arr1 = [{
        shortCode: 'Select All',
        text: ''
      }];
      this.axios
        //  .get(`https://scm.dragarwal.com/api-branch/${selectObj}`).then(response =>{
        .get(`https://mis.dragarwal.com/api-finbranch/${userid.userName}`).then(response => {
          this.branch = arr1.concat(response.data);
          console.log(this.branch);
          this.username=userid.name;

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
    apiinsertbill(billid, netamount, aggcommission, drtcommission, drtamount, drtid, drtcategory, drtcomments, buttonstatus) {
      let bill_id = '';
      let net_amount = '';
      let drt_commission = '';
      let drt_amount = '';
      let drt_id = '';
      let drt_category = '';
      let drt_user = null;
      let drt_comments = '';
      let drt_aggcommission = '';
      let drt_billstatus = '';
      console.log("billid : " + this.billid);
      console.log(" netamount : " + this.netamount);
      console.log("commission : " + this.drtcommission);
      console.log("drtamount : " + this.drtamount);
      console.log("drtid : " + this.drtid);
      console.log("drtcategory : " + this.drtcategory);
      console.log("comments : " + this.drtcomments);
      console.log("agg comments : " + this.aggcommission);
      console.log("status ; " + this.buttonstatus);

      if (this.billid == '') {
        alert("please select DRT name");
        return false;
      } else if (this.drtcategory == '') {
        alert("please select Category")
        return false;
      } else if (this.drtcommission > 100) {
        alert("please enter valid drt percentage")
        return false;
      } else if (!(this.drtamount <= this.netamount)) {
        alert("Enter amount is greater than Net amount")
        return false;
      } else {
        let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));

        this.loading = true;
        this.isLoading = true;
        this.$http
          .post(`https://mis.dragarwal.com/api-drtbills`, {
          //  .post(`https://localhost:8888/api-drtbills`, {
            bill_id: billid,
            net_amount: netamount,
            drt_aggcommission: aggcommission,
            drt_commission: drtcommission,
            drt_amount: drtamount,
            drt_id: drtid,
            drt_category: drtcategory,
            drt_user: normalusername.name,
            drt_comments: drtcomments


          }).then(response => {
            console.log("response : " + response);
            this.isLoading = false;
            if (response.data.Datainserted === true) {
              alert("Drt amount sent for approval")
              this.approval = false;
              this.gstin = '',
                this.panno = '';
              this.aggcommission = '',
                this.commission = '';
              this.drtdetail = '';
              this.drtid = '';
              this.drt = null;
              this.drtcomments = '';
              this.aggcommission = '';
              this.drtamount = '';
              this.datatable = 'inserted';

              return true;
            } else if (response.data.Datainserted === "Updated") {
              alert("the bill is updated successfully")
              this.approval = false;
              return true;
            } else {
              alert("please verify the entered data")
              return false
            }
          })
      }

    },

    apiRequestfindrtbill(fromdate,todate, SetStatus, SetBranch, Setdatatype) {
      var date3 = new Date();
      var date4 = date3.getMonth() + "/" + date3.getDay() + "/" + date3.getYear();
      var currentDate = new Date(date4);
      let datetype = '';
      console.log(fromdate+" "+SetStatus+" "+SetBranch+" "+Setdatatype);
	  
	  
	  
	  if((!this.fromdate)||(!this.todate) ){
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
          // alert("if");
          status = 'All';
          branch = 'All'
          let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
          // alert(normalusername.name);

          this.loading = true;
          this.isLoading = true;
          this.$http

            //    .get(`https://scm.dragarwal.com/api-opticals-super/${date}`)
            //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
            .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${datetype}/${status}/${branch}/${normalusername.name}`)
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

          let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
          // alert(normalusername.name);
          branch = this.SetBranch;
          status = this.SetStatus;
          this.loading = true;
          this.isLoading = true;
          this.$http
            //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
            .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${datetype}/${status}/${branch}/${normalusername.name}`)
            .then(response => {
              this.processDatabillsch(response.data);
              this.isLoading = false;


            });


        } else {
          // alert("else");
          let normalusername = JSON.parse(sessionStorage.getItem("fin_user"));
          // alert(normalusername.name);
          branch = this.SetBranch;
          status = this.SetStatus;
          this.loading = true;
          this.isLoading = true;
          this.$http

            //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${status}/${branch}`)
            .get(`https://mis.dragarwal.com/api-finbills/${this.fromdate}/${this.todate}/${datetype}/${status}/${branch}/${normalusername.name}`)
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
      } else if (sessionStorage.getItem('fin_user')) {
        this.user_role = 'fin_user';
      }

      this.billdata = data.result['bill'];
      console.log(this.billdata);
      this.show = true;
    },

    downloadExcelDrt() {
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

    }


    ,
    lockdate(data) {
  this.isLoading = true;
        this.axios.get(`https://mis.dragarwal.com/api-fixdate/${data}`).then(response => {

          console.log(response.data);
          if (response.data.datefix == true) {
            alert("date is fixed to : " + response.data.rest)
            this.axios.get(`https://mis.dragarwal.com/api-getfixdate`).then(response => {

              this.fix_dte = response.data.fixeddate[0].fix_date;
              this.isLoading = false;
            })


          } else {
            alert("error in updating date ");
              this.isLoading = false;
            return false;

          }

        })


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
