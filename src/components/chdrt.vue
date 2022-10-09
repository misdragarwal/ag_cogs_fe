<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">

          <v-spacer></v-spacer>
          <th width="10%">
            <v-select :items="entities" v-model="SetVisit" label="Visit Type" id="SelEntity" item-text="shortCode" item-value="text"></v-select>
          </th>
          <v-spacer></v-spacer>
          <th width="10%">
            <v-select :items="branch" v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-select>
          </th>
          <v-spacer></v-spacer>
          <th width="20%">
            <v-select :items="drttype" v-model="Setdrttype" label="Drt Type" id="SelDrttype" item-text="shortCode" item-value="text"></v-select>
          </th>
          <v-spacer></v-spacer>


          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="fromdate" placeholder="Select From Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="fromdate" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>
          <v-menu absolute ref="menu2" :close-on-content-click="false" v-model="menu2" :nudge-right="40" :return-value.sync="todate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="todate" placeholder="Select To Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="todate" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu2 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu2.save(todate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>

          <v-btn rounded color="primary" dark @click="apiRequestdrtbill(fromdate,todate,SetVisit,SetBranch,Setdrttype)">Generate</v-btn>

        </v-toolbar>
        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>
        <!-- Vuetify Data table -->

        <template>
          <v-card-title>
            <v-toolbar-title>IC claim</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="billreference()">
              Submitted Bills
            </v-btn>

            <v-btn color="primary" dark @click="doctorreference()">
              View Doctor Reference
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" v-if="billdata" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="billdata" v-model="selected" :search="search" class="elevation-1">
            <template slot="items" slot-scope="props">
              <tr @click="rowClick(props.item)">
                <td>{{ props.item.BILLED }}</td>
                <td class="text-xs-left" style="white-space: nowrap;">{{ props.item.TRANSACTION_DATE }}</td>
                <td class="text-xs-left">{{ props.item.BILLNO }}</td>
                <td class="text-xs-left">{{ props.item.MRN }}</td>
                <td class="text-xs-left">{{ props.item.PATIENT_NAME }}</td>
                <td class="text-xs-left">{{ numberformat(props.item.Bill_TOTAL_AMOUNT) }}</td>
                <td class="text-xs-left">{{props.item.status}}</td>
                <td class="text-xs-right">

                  <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent max-width="800px" lazy absolute>
                      <v-btn slot="activator" small fab color="success" @click="rowClick1(props.item)">
                        <v-icon>edit</v-icon>
                      </v-btn>

                      <v-card>
                        <v-card-title>
                          <span class="headline">Information</span>

                        </v-card-title>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-flex xs12 sm6 md4>

                <td class="text-xs-left">Mrn : {{ Mrn }}</td>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <td class="text-xs-left">Name : {{ Name }}</td>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <td class="text-xs-left">Visited date : {{ vdate }}</td>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <td class="text-xs-left">Ref Type : {{ reftype }}</td>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <td class="text-xs-left">Ref Sub : {{ refsub }}</td>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <td class="text-xs-left">Ref By : {{ refby }}</td>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <td class="text-xs-left">Bill No : {{ Billno }}</td>

      </v-flex>
      <v-flex xs12 sm6>
        <td class="text-xs-left">Bill Date : {{ vdate }}</td>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <td class="text-xs-left">Bill Amount : {{ billamount}}</td>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <td class="text-xs-left">Discount Amount : {{ discount }}</td>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <td class="text-xs-left">Net Amount : {{ netamount }}</td>
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
      <v-flex xs12 sm6 md4>
        <v-autocomplete clearable autocomplete='off' default="" v-model="memberSelected" :items="drt" label="Select DRT" required item-text="Name" item-value="ID" v-on:change='getDRTdetail'></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-autocomplete clearable :items="category" label="Category" required item-text="shortCode" item-value="text" v-on:change='getDRTcategory'></v-autocomplete>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field v-model="infavourof" clearable label="Infavour of" disabled></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field v-model="drtcusname" v-if='drtcusid' clearable label="Selected DRT" disabled></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field v-if='drtcusid' disabled v-model="drtcat" label="Selected Category" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field v-model="paymenttype" clearable label="Payment type" disabled></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field v-model="panno" clearable label="Pan No" disabled></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field type='number' disabled v-model="aggcommission" label="Agreed %" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field type="text" clearable v-model="drtcommission" label="DRT %" @change="drtcommissionvalue" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field type="text" clearable v-model="drtamount" label="Amount" @change="drtamountvalue" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-textarea clearable clear-icon="cancel" label="Comments" v-model='drtcomments'></v-textarea>
      </v-flex>
      <v-flex xs12 sm6 >
        <v-text-field v-model="detail" clearable label="Bank detail"  disabled></v-text-field>
      </v-flex>
	   <v-flex xs12 sm6 md4>
		  <label>Referal slip
		  </label>
		  <input type="file" ref="referalslip" accept="image/x-png, image/gif, image/jpeg,application/pdf" v-on:change="handleFileUploadslip()" />

		</v-flex>

    </v-layout>
</v-container>
<small>*indicates required field</small>
</v-card-text>
<v-card-actions>
  <v-spacer></v-spacer>
  <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
  <v-btn color="blue darken-1" v-model='buttonstatus' v-if="approval" flat @click="apiinsertbill(billid,netamount,aggcommission,drtcommission,drtamount,drtid,drtcategory,drtcomments,buttonstatus)">Submit</v-btn>

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
import chicdoctorlist from "@/components/chicdoctor";
import subbill from "@/components/subbills.vue"
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

var lastmonth = function(sp) {
  var today = new Date();
  let dd = 1;
  var mm = today.getMonth(); //As January is 0.
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return (yyyy + sp + mm + sp + dd);
};



export default {

  components: {
    chicdoctorlist,
    subbill
  },
  data: () => ({
    refdocemail: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],

    fileagreementupload: '',
    filepanupload: '',
    filepassbookupload: '',
    newdoctor: false,
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
    drtbilldate: '',
    drttable: '',
    drtamount: '',
    drt: '',
    drtcusname: '',
    drtcusid: '',
    drtcat: '',
    buttonstatus: '',
    drtcategory: '',
    selected: [],
    gstin: [],
    panno: [],
    billedbranch: [],
    drtpertcent: [],
    aggcommission: [],
    commission: [],
    infavourof: [],
    paymenttype: [],
    total: [],
    dialog: false,
    test: true,
    GSTIN: '',
    headers: [{
        text: 'Branch',
        align: 'left',
        sortable: false,
        value: 'BILLED'

      },
      {
        text: 'Date',
        value: 'TRANSACTION_DATE'
      },
      {
        text: 'Bill No',
        value: 'BILLNO'
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
        text: 'Amount',
        value: 'NET_AMOUNT'
      },
      {
        text: 'Status',
        value: 'Status'
      },
      {
        text: 'Apply',
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
    minDate: '',
    maxDate: curday('-'),
    entities: [{
        shortCode: 'Select All',
        text: 'All'
      },
      {
        shortCode: 'OP',
        text: 'OP'
      },
      {
        shortCode: 'IP',
        text: 'IP'
      },

    ],
    drttype: [{
        shortCode: 'YPP',
        text: 'YPP'
      },
      {
        shortCode: 'DRT',
        text: 'DRT'
      },
      {
        shortCode: 'Others',
        text: 'other'
      }
    ],
    branch: [{
        shortCode: 'Select All',
        text: ''
      }

    ],
    paymententities: [{
        shortCode: 'Cash',
        text: 'Cash'
      },
      {
        shortCode: 'Card',
        text: 'Card'
      },
      {
        shortCode: 'Cheque',
        text: 'Cheque'
      },
      {
        shortCode: 'DD',
        text: 'DD'
      },
      {
        shortCode: 'Fund Transfer',
        text: 'Fund Transfer'
      },
      {
        shortCode: 'Paytm',
        text: 'paytm'
      },
    ],

    SetBranch: [],
    SetVisit: [],
    Setpayment: [],
    Setdrttype: {
      shortCode: 'YPP',
      text: 'YPP'
    },

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
    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {
      "PARENT BRANCH": "PARENT_BRANCH",
      "BRANCH": "BRANCH",
      "PATIENT MRN": "PATIENT_MRN",
      "PATIENT NAME": "PATIENT_NAME",
      "PAYMENT OR REFUND_DATE": "PAYMENT_OR_REFUND_DATE",
      "BILL NO": "BILL_NO",
      "RECEIPT NO": "RECEIPT_NO",
      "CASH AMOUNT": "CASH_AMOUNT",
      "CARD AMOUNT": "CARD_AMOUNT",
      "CARD SERVICE CHARGE_AMOUNT": "CARD_SERVICE_CHARGE_AMOUNT",
      "CHEQUE AMOUNT": "CHEQUE_AMOUNT",
      "FUND TRANSFER AMOUNT": "FUND_TRANSFER_AMOUNT",
      "PAYTM AMOUNT": "PAYTM_AMOUNT",
      "DD AMOUNT": "DD_AMOUNT",
      "REFUND CASH AMOUNT": "REFUND_CASH_AMOUNT",
      "REFUND CARD AMOUNT": "REFUND_CARD_AMOUNT",
      "REFUND CHEQUE AMOUNT": "REFUND_CHEQUE_AMOUNT",
      "CREDIT CHEQUEAMOUNT": "CREDIT_CHEQUE_AMOUNT",
      "CREDIT CASHAMOUNT": "CREDIT_CASH_AMOUNT",
      "PAYTM CASHAMOUNT": "PAYTM_CASH_AMOUNT",
      "PAYTM FUNDAMOUNT": "PAYTM_FUND_AMOUNT",
      "DEPARTMENT": "DEPARTMENT",
      "PAYMENT NATURE": "PAYMENT_NATURE",
      "PAYMENT MODE": "PAYMENT_MODE",
      "PAID AMOUNT": "PAID_AMOUNT",
      "CREATEDBY": "CREATEDBY",
      "PAYMENT REFERENCE": "PAYMENT_REFERENCE",
      "PAYMENT DETAIL": "PAYMENT_DETAIL"


    },
    fileName: null,
    refdoctor: '',
    refinfavourdoctor: '',
    refdocbranch: '',
    refdoccontact: '',
    refdocemail: '',
    refdocpan: '',
    refdocgstin: '',
    refdocagreed: "",
    refdocacc: '',
    refdocaccifsc: '',
    refdocaccbank: '',
    agreementupload: '',
    panupload: '',
    passbookupload: '',
    memberSelected: '',
    drtbilldetail: '',
    discount: '',
    Accountno: '',
    Bankifsc: '',
    Bankname: '',
    detail: '',
    fix_dte: '',
    ff_date: '',
	mobile:'',
	email:'',
	fileslipupload:null
  }),
  created() {
    this.getToday();

  },

  mounted() {
    this.loadbranch();
    this.loadfixdate();

  },
  watch: {
    dialog: function(val) {
      if (!val) {
        this.memberSelected = null;

      }
    }
  },
  methods: {
    billreference() {

      serverBus.$emit('changeComponent', 'subbill')
    },
    doctorreference() {

      serverBus.$emit('changeComponent', 'chicdoctorlist')
    },


    handleFileUploadslip() {
      this.fileslipupload = this.$refs.referalslip.files[0];
      if (this.fileslipupload.size > 500000) {
        alert("Referal slip is greater than 500KB");
        this.fileslipupload = '';
		this.$refs.referalslip.value=null;	  	  
        console.log(this.fileslipupload);
		return false;
      }
    },
    drtamountvalue(a) {
      this.drtamount = a;
      this.drtcommission = ((this.drtamount / this.netamount) * 100).toFixed(2);
      console.log("drtcommission : " + this.drtcommission);
    },
    drtcommissionvalue(b) {
      this.drtcommission = b;
      this.drtamount = Math.round((this.drtcommission * this.netamount) / 100);
      console.log("drt amount---- : " + this.drtamount);
    },


    rowClick1(b) {
      this.drt = [];
      this.billid = b.EXTERNAL_ID;
      console.log(this.billid);
      this.approval = true;
      this.isLoading = true;
      this.gstin = '';
      this.panno = '';
      // this.drt = null;
      // this.$nextTick(() => {
      //     this.drtid = null
      // })
      console.log("drt id : " + this.drtid);
      console.log("drt : " + this.drt);
      this.aggcommission = '',
        this.commission = '';
      this.drtdetail = '';
      this.drtid = '';
      this.drtcusid = '';
      this.drtcomments = '';
      this.aggcommission = '';
      this.drtamount = '';
      this.Billno = '';
      this.billedbranch = '';
      this.axios
        .get(`https://mis.dragarwal.com/api-billdrt/${this.billid}`).then(response => {

          this.drtbilldetail = response.data;
          this.axios
            .get(`https://mis.dragarwal.com/api-drt`).then(response => {
              this.drt = response.data;
              console.log(this.drt);
              // this.isLoading = true;
            });
          // this.isLoading = false;


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
          this.discount = this.drtbilldetail[0]["BILL_DISCOUNT_AMOUNT"];
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
          this.drtcusid = this.drtbilldetail[0]["DRT_Id"];
		      this.mobile = this.drtbilldetail[0]["MOBILE"];
          this.email = this.drtbilldetail[0]["EMAIL"];
          this.age = this.drtbilldetail[0]["AGE"];
          this.gender = this.drtbilldetail[0]["GENDER"];
          console.log(this.buttonstatus);
          if (this.drtcusid == null) {
            this.drtcusid = false;
          } else {
            this.drtcusid = true;
          }
          if ((this.buttonstatus == 'Submitted') || (this.buttonstatus == '0') || (this.buttonstatus == 'Sch Cancelled') || (this.buttonstatus == 'Admin Cancelled')) {
            this.approval = true;
          } else {
            this.approval = false;
          }
          this.isLoading = false;

        });

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
          console.log(this.drtdetail);
          console.log(this.drtdetail[0]["GSTIN"]);
          this.gstin = this.drtdetail[0]["GSTIN"]
          this.panno = this.drtdetail[0]["Pan_no"]
          this.aggcommission = this.drtdetail[0]["Percentage"]
          this.commission = this.drtdetail[0]["Percentage"]
          this.infavourof = this.drtdetail[0]["Infavour_of"]
          this.paymenttype = this.drtdetail[0]["Payment_type"]
          this.Accountno=this.drtdetail[0]["Account_no"]
          this.Bankifsc=this.drtdetail[0]["Bank_ifsc"]
          this.Bankname=this.drtdetail[0]["Bank_name"]
          // console.log(this.commissions = this.drtdetail[0]["Percentage"]);
          this.drtname = this.drtdetail[0]["Name"]
          console.log(this.Accountno +" "+this.Bankifsc+" "+this.Bankname);
        //  this.detail=this.Bankname.concat(" || ",this.Bankifsc," || ",this.Accountno)
          //concat(this.Bankname,"||",this.Bankifsc,"||",this.Accountno)
          this.detail=this.Accountno +" || "+this.Bankifsc+" || "+this.Bankname;
          console.log(this.detail);
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
        .get(`https://mis.dragarwal.com/api-chbranch/${userid.userName}`).then(response => {
          this.branch = arr1.concat(response.data);
          console.log(this.branch);
        })


    },
    loadfixdate() {
      //this.axios.get(`https://mis.dragarwal.com/api-getfixdate`).then(response => {
		this.axios.get(`https://mis.dragarwal.com/api-getfixdate`).then(response => {
        this.fix_dte = response.data.fixeddate[0].fix_date;
        console.log(this.fix_dte);
        this.minDate = this.fix_dte;
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
    previewFiles(event) {
      console.log(event.target.files);
    },

    apiinsertrefdoc(refdoctor, refinfavourdoctor, Setpayment, refdocbranch, refdoccontact, refdocemail, refdocpan, refdocgstin, refdocagreed, refdocacc, refdocaccifsc, refdocaccbank) {
      let ref_doctor = '';
      let ref_docbranch = '';
      let ref_doccontact = '';
      let ref_docemail = '';
      let ref_docpan = '';
      let ref_docgstin = '';
      let ref_docagreedperc = '';
      let ref_docacc = '';
      let ref_docaccifsc = '';
      let ref_docaccbank = '';
      let ref_agreementupload = '';
      let ref_panupload = '';
      let ref_passbookupload = '';
      let ref_infavourdoctor = '';
      let ref_payment = '';
      var formData = new FormData();

      let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));


      formData.append("doctorname", this.refdoctor);
      formData.append("docfavourname", this.refinfavourdoctor);
      formData.append("docpaymenttype", this.Setpayment);
      formData.append("doctorbranch", this.refdocbranch);
      formData.append("doctorcontact", this.refdoccontact);
      formData.append("doctoremail", this.refdocemail);
      formData.append("doctorpan", this.refdocpan);
      formData.append("doctorgstin", this.refdocgstin);
      formData.append("doctoragreed", this.refdocagreed);
      formData.append("doctoracc", this.refdocacc);
      formData.append("doctorIFSC", this.refdocaccifsc);
      formData.append("doctorbankbranch", this.refdocaccbank);
      formData.append("username", normalusername.name);


      formData.append("fileagreementupload", this.fileagreementupload);
      formData.append("filepanupload", this.filepanupload);
      formData.append("filepassbookupload", this.filepassbookupload);

      console.log(Array.from(formData));

      console.log("---------------------------------------------------");

      console.log("doctname : " + this.refdoctor);
      console.log("infavour : " + this.refinfavourdoctor);
      console.log("paymennt : " + this.Setpayment);
      console.log("doc branch : " + this.refdocbranch);
      console.log("doc contact : " + this.refdoccontact);
      console.log("doc email : " + this.refdocemail);
      console.log("doc pan: " + this.refdocpan);
      console.log("doc gstin : " + this.refdocgstin);
      console.log("doc agreedperc : " + this.refdocagreed);
      console.log("doc acc :" + this.refdocacc);
      console.log("doc acc ifsc :" + this.refdocaccifsc);
      console.log("doc acc bank :" + this.refdocaccbank);
      console.log("Created user :" + normalusername.name);
      console.log("---------------------------------------------------");


      console.log(this.fileagreementupload);
      console.log(this.filepanupload);
      console.log(this.filepassbookupload);

      if ((this.refdoctor == null) || (this.refdoctor == '')) {
        alert("please enter Doctor name")
        return false;
      }
      if ((this.refdocbranch == null) || (this.refdocbranch == '')) {
        alert("please enter Doctor branch")
        return false;
      }

      if ((this.refdocpan == null) || (this.refdocpan == '')) {
        alert("please enter Doctor Pan number")
        return false;
      }
      if ((this.refdocagreed == null) || (this.refdocagreed == '')) {
        alert("please enter Agreed Percentage")
        return false;
      }
      if ((this.refdoccontact.length > 10) || (this.refdoccontact.length < 10)) {
        alert("please enter 10 Digit mobile number ")
        return false;
      }
      if ((this.refdocpan.length > 10) || (this.refdocpan.length < 10)) {
        alert("please enter 10 Digit Pan number")
        return false;
      }
      if ((this.refdocagreed > 100) || (this.refdocagreed < 0)) {
        alert("please enter valid Percentage")
        return false;
      }
      if ((this.refdocagreed = null) || (this.refdocagreed = '')) {
        alert("please enter Agreed Percentage")
        return false;
      }

      this.loading = true;
      this.isLoading = true;

      this.$http.post('https://mis.dragarwal.com/api-uploaddoctor', formData, {}).then(res => {
        this.isLoading = false;


        if (res.data.doctordatainserted === true) {
          alert(" Doctor name addtion is sent for approval")
          this.refdoctor = null;
          this.refdocbranch = null;
          this.refdoccontact = null;
          this.refdocemail = null;
          this.refdocpan = null;
          this.refdocgstin = null;
          this.refdocagreed = null;
          this.refdocacc = null;
          this.refdocaccifsc = null;
          this.refdocaccbank = null;
          this.refinfavourdoctor = null
          this.Setpayment = null;
          formData = null;
          this.newdoctor = false;
          console.log(formData);
        } else if (res.data.doctordatainserted === 'Available') {
          alert("the mentioned Pan number is already Exist")
          return false;
        }

      })

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
      let drt_billed = ''
      let drt_billno = '';
      let drt_billdate = '';
      let drt_name = '';
      let drt_mrn = '';
      let drt_ref = "";
      console.log("billid : " + this.billid);
      console.log(" netamount : " + this.netamount);
      console.log("commission : " + this.drtcommission);
      console.log("drtamount : " + this.drtamount);
      console.log("drtid : " + this.drtid);
      console.log("drtcategory : " + this.drtcategory);
      console.log("comments : " + this.drtcomments);
      console.log("agg comments : " + this.aggcommission);
      console.log("status ; " + this.buttonstatus);
      console.log("billed branch : " + this.billedbranch);
      console.log("bill no : " + this.Billno);
      console.log("bill date : " + this.drtbilldate);
      console.log("Mrn : " + this.Mrn);
      console.log("name : " + this.Name);
      console.log("reference : " + this.reftype);

      if (this.billid == '') {
        alert("please select DRT name");
        return false;
      } else if ((this.drtid == "") || (this.drtid === undefined)) {
        alert("Please select Drt Name ")
        return false
      } else if (this.aggcommission === null) {
        alert("Aggreed percentage is null please select the DRT name");
        this.drtid = '';
        return false;
      } else if ((this.drtcategory == '') || (this.drtcategory === undefined)) {
        alert("please select Category")
        return false;
      } else if (this.drtcommission > 100) {
        alert("please enter valid drt percentage")
        return false;
      } else if (!(this.drtamount <= this.netamount)) {
        alert("Enter amount is greater than Net amount")
        return false;
      } 
        else if ((this.drtcommission=='')||(this.drtcommission==null)||(this.drtamount=='')||(this.drtamount==null)){
          alert("Please enter Drt Commission amount Or Drt Percentage")
          return false;
        }
		
	else if (!this.$refs.referalslip.files[0]) {
	    
        alert("Referal slip is required");          
        return false;
    }
	
      
		
		
	
      else {
        let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
		var formData = new FormData();
		formData.append("bill_id", billid);
		formData.append("net_amount", netamount);
		formData.append("drt_aggcommission", aggcommission);
		formData.append("drt_commission", drtcommission);
		formData.append("drt_amount", drtamount);
		formData.append("drt_id", drtid);
		formData.append("drt_category", drtcategory);
		formData.append("drt_user", normalusername.name);
		formData.append("drt_comments", drtcomments);
		formData.append("drt_billed", this.billedbranch);
		formData.append("drt_billno", this.Billno);
		formData.append("drt_billdate", this.drtbilldate);
		formData.append("drt_name", this.Name);
		formData.append("drt_mrn", this.Mrn);
		formData.append("drt_ref", this.reftype);
		formData.append("mobile", this.mobile);
		formData.append("email", this.email);
    formData.append("age", this.age);
    formData.append("gender",this.gender);

		formData.append("fileslipupload", this.fileslipupload);		
        this.buttonstatus=false;
        this.loading = true;
        this.isLoading = true;
        this.$http
          .post(`https://mis.dragarwal.com/api-drtbills`, formData, {}).then(response => {
            console.log("response : " + response);
            this.isLoading = false;
            if (response.data.Datainserted === true) {
              alert("Drt amount sent for approval")
              this.approval = false;
              this.drtid = '';
              this.drt = '';
                this.buttonstatus=false;
              console.log("this.SetVisit : " + this.SetVisit);
              console.log("this.SetBranch  ; " + this.SetBranch);
              console.log("this.fromdate : " + this.fromdate);
              console.log("ttodat : " + this.todate);

              let type = '';
              let visit = '';
              let branch = '';
              let fromdate = '';
              let todate = '';
              if (!this.Setdrttype.text == '') {
                type = this.Setdrttype.text
              } else {
                type = this.Setdrttype
              }
              console.log(this.Setdrttype);
              if ((this.SetVisit == '') && (this.SetBranch == '')) {
                // alert("if");
                visit = 'All';
                branch = 'All'
                let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
                // alert(normalusername.name);

                this.loading = true;
                this.isLoading = true;
                this.$http

                  //    .get(`https://scm.dragarwal.com/api-opticals-super/${date}`)
                  //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${visit}/${branch}`)
                  .get(`https://mis.dragarwal.com/api-chbills/${this.fromdate}/${this.todate}/${visit}/${branch}/${type}/${normalusername.name}`)
                  .then(response => {
                    this.processDatabill(response.data);
                    this.isLoading = false;

                  });

              } else if ((this.SetVisit == '') || (this.SetBranch == '')) {
                // alert('else if');

                if (this.SetVisit == '') {
                  this.SetVisit = 'All'
                } else if (this.SetBranch == '') {
                  this.SetBranch = 'All'
                }

                let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
                // alert(normalusername.name);
                branch = this.SetBranch;
                visit = this.SetVisit;
                this.loading = true;
                this.isLoading = true;
                this.$http
                  //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${visit}/${branch}`)
                  .get(`https://mis.dragarwal.com/api-chbills/${this.fromdate}/${this.todate}/${visit}/${branch}/${type}/${normalusername.name}`)
                  .then(response => {
                    this.processDatabill(response.data);
                    this.isLoading = false;


                  });


              } else {

                let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
                branch = this.SetBranch;
                visit = this.SetVisit;
                this.loading = true;
                this.isLoading = true;
                this.$http

                  //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${visit}/${branch}`)
                  .get(`https://mis.dragarwal.com/api-chbills/${this.fromdate}/${this.todate}/${visit}/${branch}/${type}/${normalusername.name}`)
                  .then(response => {
                    this.processDatabill(response.data);
                    this.isLoading = false;

                  });



              }

              return true
            } else if (response.data.Datainserted === "Updated") {
              alert("the bill is updated successfully")
              this.approval = false;

              let type = '';
              let visit = '';
              let branch = '';
              let fromdate = '';
              let todate = '';
              if (!this.Setdrttype.text == '') {
                type = this.Setdrttype.text
              } else {
                type = this.Setdrttype
              }
              console.log(this.Setdrttype);
              if ((this.SetVisit == '') && (this.SetBranch == '')) {
                // alert("if");
                visit = 'All';
                branch = 'All'
                let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
                // alert(normalusername.name);

                this.loading = true;
                this.isLoading = true;
                this.$http

                  //    .get(`https://scm.dragarwal.com/api-opticals-super/${date}`)
                  //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${visit}/${branch}`)
                  .get(`https://mis.dragarwal.com/api-chbills/${this.fromdate}/${this.todate}/${visit}/${branch}/${type}/${normalusername.name}`)
                  .then(response => {
                    this.processDatabill(response.data);
                    this.isLoading = false;

                  });

              } else if ((this.SetVisit == '') || (this.SetBranch == '')) {
                // alert('else if');

                if (this.SetVisit == '') {
                  this.SetVisit = 'All'
                } else if (this.SetBranch == '') {
                  this.SetBranch = 'All'
                }

                let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
                // alert(normalusername.name);
                branch = this.SetBranch;
                visit = this.SetVisit;
                this.loading = true;
                this.isLoading = true;
                this.$http
                  //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${visit}/${branch}`)
                  .get(`https://mis.dragarwal.com/api-chbills/${this.fromdate}/${this.todate}/${visit}/${branch}/${type}/${normalusername.name}`)
                  .then(response => {
                    this.processDatabill(response.data);
                    this.isLoading = false;


                  });


              } else {

                let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
                branch = this.SetBranch;
                visit = this.SetVisit;
                this.loading = true;
                this.isLoading = true;
                this.$http

                  //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${visit}/${branch}`)
                  .get(`https://mis.dragarwal.com/api-chbills/${this.fromdate}/${this.todate}/${visit}/${branch}/${type}/${normalusername.name}`)
                  .then(response => {
                    this.processDatabill(response.data);
                    this.isLoading = false;

                  });



              }

              return true;
            }else if (response.data.Datainserted === "File not move") {
              alert("File Not Uploaded")
              return false
            } else {
              alert("please verify the entered data")
              return false
            }
          })
      }

    },
    apiRequestdrtbill(fromdate, todate, SetVisit, SetBranch, Setdrttype) {
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
        let type = '';
        let visit = '';
        let branch = '';
        let fromdate = '';
        let todate = '';
        if (!this.Setdrttype.text == '') {
          type = this.Setdrttype.text
        } else {
          type = this.Setdrttype
        }
        console.log(this.Setdrttype);
        if ((this.SetVisit == '') && (this.SetBranch == '')) {
          // alert("if");
          visit = 'All';
          branch = 'All'
          let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
          // alert(normalusername.name);

          this.loading = true;
          this.isLoading = true;
          this.$http

            //    .get(`https://scm.dragarwal.com/api-opticals-super/${date}`)
            //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${visit}/${branch}`)
            .get(`https://mis.dragarwal.com/api-chbills/${this.fromdate}/${this.todate}/${visit}/${branch}/${type}/${normalusername.name}`)
            .then(response => {
              this.processDatabill(response.data);
              this.isLoading = false;

            });

        } else if ((this.SetVisit == '') || (this.SetBranch == '')) {
          // alert('else if');

          if (this.SetVisit == '') {
            this.SetVisit = 'All'
          } else if (this.SetBranch == '') {
            this.SetBranch = 'All'
          }

          let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
          // alert(normalusername.name);
          branch = this.SetBranch;
          visit = this.SetVisit;
          this.loading = true;
          this.isLoading = true;
          this.$http
            //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${visit}/${branch}`)
            .get(`https://mis.dragarwal.com/api-chbills/${this.fromdate}/${this.todate}/${visit}/${branch}/${type}/${normalusername.name}`)
            .then(response => {
              this.processDatabill(response.data);
              this.isLoading = false;


            });


        } else {

          let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
          branch = this.SetBranch;
          visit = this.SetVisit;
          this.loading = true;
          this.isLoading = true;
          this.$http

            //.get(`https://scm.dragarwal.com/api-collection-super/${this.fromdate}/${this.todate}/${visit}/${branch}`)
            .get(`https://mis.dragarwal.com/api-chbills/${this.fromdate}/${this.todate}/${visit}/${branch}/${type}/${normalusername.name}`)
            .then(response => {
              this.processDatabill(response.data);
              this.isLoading = false;

            });



        }



        branch = this.SetBranch;
        visit = this.SetVisit;
        var str = "_"
        this.fileDate = this.fromdate.concat(str, this.todate);
        this.file = visit.concat(str, branch, str, this.fileDate)
        console.log(this.fileDate);

        this.fileName = `Collection_Report_${this.file}.csv`;


      }

    },

    processDatabill(data) {
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

    downloadExcelCollectionSuper() {
      let tempDataArr = [];
      if (this.fileDate !== null) {
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
