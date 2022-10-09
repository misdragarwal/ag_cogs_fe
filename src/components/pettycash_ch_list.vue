<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-toolbar-title>Petty Cash Details</v-toolbar-title>
          <v-divider class="mx-2 black" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-autocomplete v-model="selbranch" :items="branch" label="Branch" item-text="shortCode" item-value="TEXT"></v-autocomplete>
          <v-spacer></v-spacer>
          <v-select :items="status" v-model="Selstatus" label="Status:" item-text="shortCode" item-value="text"></v-select>
          <v-spacer></v-spacer>
          <v-menu absolute ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="200px">
            <v-text-field slot="activator" v-model="date" placeholder="Select Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="date" no-title scrollable :min="minDate" :max="maxDate" type=month backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date);" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn rounded color="primary" dark @click="apiGetPettyCashDetails(date,selbranch,Selstatus)">Generate</v-btn>
          <!--<download-excel
              :data="json_data"
              :fields="json_fields"
              type="csv"
              :name="fileName"
              :fetch="downloadExcelSuper"
            >
              <v-btn
                fab
                flat
                medium
                color="black"
              >
                <v-tooltip bottom>
                  <v-icon
                    slot="activator"
                    color="green darken-4"
                  >fas fa-file-excel</v-icon>
                  <span>Export</span>
                </v-tooltip>
              </v-btn>
            </download-excel>-->
        </v-toolbar>
        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>
        <br><br><br>

        <v-card-title>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn rounded color="primary" dark @click="newBill()">New Bill</v-btn>
          </td>


          <v-spacer></v-spacer>
          <v-text-field v-model="search" v-if="billdata" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>





        <!-- Vuetify Data table -->
        <v-data-table :headers="headers" :items="billdata" v-model="selected" :search="search" class="elevation-1">
          <template slot="items" slot-scope="props">
            <tr @click="rowClick(props.item)">
              <td>{{ props.item.branch }}</td>
              <td class="text-xs-left">{{ props.item.voucher_no }}</td>
              <td class="text-xs-left">{{ props.item.category_name }}</td>
              <td class="text-xs-left">{{ props.item.bill_date }}</td>
              <td class="text-xs-left">{{ props.item.bill_submission }}</td>
              <td class="text-xs-left">{{ props.item.debit }}</td>
              <!-- <td class="text-xs-left">{{props.item.status | statusVal}}</td> -->
                <td class="text-xs-left">{{props.item.sat}}</td>
              <td class="text-xs-left">
                <v-btn slot="activator" small fab color="primary" @click="downloadvouchher(props.item.voucher_attach)">
                  <v-icon>cloud_download</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-left" v-if="!(props.item.bill_attch==='NA')">

                <v-btn slot="activator" small fab color="primary" @click="downloadbill(props.item.bill_attch)">
                  <v-icon>cloud_download</v-icon>
                </v-btn>
              </td>
              <td class="text-xs-left" v-else="(props.item.bill_attch==='NA')">
                NA
              </td>


              <td class="text-xs-right" v-if="(props.item.status===0 )">
                <v-btn slot="activator" small fab @click.stop="$set(dialogcancel, props.item.voucher_no, true)" color="red">
                  <v-icon>fas fa-times</v-icon>
                </v-btn>


                <v-dialog v-model="dialogcancel[props.item.voucher_no]" persistent max-width="800px" lazy absolute :key="props.item.voucher_no">
                  <v-card>
                    <v-card-title>
                      <span>{{'branch : '}}{{ props.item.branch }}{{" -- Bill no : "}}{{props.item.bill_no}} </span><br>
                      <span>{{" -- Vendor no : "}}{{props.item.voucher_no}} {{'-- Vendorname : '}}{{props.item.vendorname}} </span><br />
                    </v-card-title>
                    <v-card-title>
                      <span>{{' -- Amount : '}}{{props.item.debit}} </span>
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

                      <v-btn color="primary" flat @click.stop="$set(dialogcancel, props.item.voucher_no, false)">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click="rowDecline(props.item,schcomments)" @click.stop="$set(dialogcancel, props.item.voucher_no, false)">Decline</v-btn>

                    </v-card-actions>
                  </v-card>
                </v-dialog>


              </td>




            </tr>
          </template>
        </v-data-table>


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
    schcomments: '',
    selected:'',
    branch: [],
    minDate:'2020-04-01',
    status: [{
        shortCode: 'Select All',
        text: ''
      },
      {
        shortCode: 'SCHPending',
        text: 'SCHPending'
      },
      {
        shortCode: 'SCHApproved',
        text: 'SCHApproved'
      },
      {
        shortCode: 'SCHReject',
        text: 'SCHReject'
      },
      {
        shortCode: 'FinancePending',
        text: 'FinancePending'
      },
      {
        shortCode: 'FinanceApproved',
        text: 'FinanceApproved'
      },
      {
        shortCode: 'FinanceReject',
        text: 'FinanceReject'
      }

    ],
    headers: [{
        text: 'Branch',
        align: 'left',
        //sortable: false,
        value: 'branch'

      },
      {
        text: 'Voucher No',
        value: 'voucher_no'
      },
      {
        text: 'Category',
        value: 'category_name'
      },
      {
        text: 'Bill/ Expense Date',
        value: 'bill_date'
      },
      {
        text: 'Submission Date',
        value: 'bill_submission'
      },
      {
        text: 'Amount',
        value: 'debit'
      },
      {
        text: 'Status',
        value: 'sat'
      },
      {
        text: 'voucher',
        value: ''
      },
      {
        text: 'Bill',
        value: ''
      },
      {
        text: 'Cancel',
        value: ''
      }
    ],
    search: '',
    billdata: null,
    userName: null,
    isLoading: false,
    fullPage: true,
    dialog: false,
    dialogdata: null,
    title: null,
    show: false,
    loading: false,
    menu: false,
    today: "",
    fileName: null,
    maxDate: curday('-'),
  }),
  created() {
    this.getToday();
    this.loadbranch();
  },
  computed: {

  },
  methods: {
    getToday() {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },
    loadbranch() {
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      var arr1 = [{
        TEXT: '',
        shortCode: 'Select All',
      }];
      this.axios
        //.get(`https://mis.dragarwal.com/api-chbranch/${userid.userName}`).then(response => {
        .get(`https://mis.dragarwal.com/api-chbranch/${userid.userName}`).then(response => {
          console.log(response.data);
          this.branch = arr1.concat(response.data);
          //alert(JSON.stringify(this.branch));
          console.log(this.branch);
        })
    },
    apiGetPettyCashDetails(date, selbranch, Selstatus) {
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      if (!this.date) {
        alert("Please Select Date");
        return false;
      }
      var statusvalue = '';
      var branchvalue = '';
      if (this.Selstatus == '') {
        statusvalue = 'undefined';
      } else {
        statusvalue = this.Selstatus;
      }
      if (this.selbranch == '') {
        branchvalue = 'undefined';
      } else {

        branchvalue = this.selbranch;
      }



      this.$http
        .get(`https://mis.dragarwal.com/api-petty-cash-details/${userid.name}/${branchvalue}/${statusvalue}/${date}`)
        .then(response => {
          console.log(response)
          this.isLoading = false;
          this.billdata = response.data.ResponseMsg;
        });
    },
    downloadvouchher(filename) {
      this.axios({
        //url: `https://mis.dragarwal.com/api-voucher-download/${filename}`,
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
        //url: `https://mis.dragarwal.com/api-bill-download/${filename}`,
        url: `https://mis.dragarwal.com/api-bill-download/${filename}`,
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

    rowDecline(item, comments) {
      console.log(item);

      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      let id = item.sno;
      let voucherno = item.voucher_no;
      let branch = item.branch;
      let amt = item.debit;
      let cat = item.category_id;
      let bill_no = item.bill_no;
      let vendor_name = item.vendorname;
      let voucher_attach = item.voucher_attach;
      let bill_attach = item.bill_attch;

      this.isLoading = true;
      this.$http.post(`https://mis.dragarwal.com/api-chpettycashcancel`, {
        ch_id: userid.name,
        billno: id,
        comment: comments,
        voucher: voucherno,
        branch: branch,
        debit: amt,
        cat: cat,
        bill_num: bill_no,
        vendor_name: vendor_name,
        voucher_attach: voucher_attach,
        bill_attach: bill_attach
      }).then(response => {
        console.log(response);

        if (response.data.dataupdated == true) {
          alert("cancelled")
          var statusvalue = '';
          var branchvalue = '';
          this.schcomments = '';
          if (this.Selstatus == '') {
            statusvalue = 'undefined';
          } else {
            statusvalue = this.Selstatus;
          }
          if (this.selbranch == '') {
            branchvalue = 'undefined';
          } else {

            branchvalue = this.selbranch;
          }



          this.$http
          .get(`https://mis.dragarwal.com/api-petty-cash-details/${userid.name}/${branchvalue}/${statusvalue}/${this.date}`)
            .then(response => {
              console.log(response)
              this.isLoading = false;
              this.billdata = response.data.ResponseMsg;
            });

          this.isLoading = false;

        } else {
          alert("error in saving data");

          var statusvalue = '';
          var branchvalue = '';
          this.schcomments = '';
          if (this.Selstatus == '') {
            statusvalue = 'undefined';
          } else {
            statusvalue = this.Selstatus;
          }
          if (this.selbranch == '') {
            branchvalue = 'undefined';
          } else {

            branchvalue = this.selbranch;
          }



          this.$http
            .get(`https://mis.dragarwal.com/api-petty-cash-details/${userid.name}/${branchvalue}/${statusvalue}/${this.date}`)
            .then(response => {
              console.log(response)
              this.isLoading = false;
              this.billdata = response.data.ResponseMsg;
            });
          this.isLoading = false;
        }


      })


    },
    newBill() {
      serverBus.$emit('changeComponent', 'perrycashform')
    }
  },
  filters: {
    statusVal(num) {
      if (num == 1) {
        return 'SchPending';
      } else if (num == 2) {
        return 'SchApproved / FinPending';
      } else if (num == 3) {
        return 'SchReject';
      } else if (num == 4) {
        return 'Finance Approved';
      } else if (num == 5) {
        return 'Finance Reject';
      } else if (num == 0) {
        return 'Bill created'
      }
      else if (num == -1) {
        return 'Bill cancelled'
      }
    }
  }

};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.inputPrice input[type='number'] {
  -moz-appearance: textfield;
}

.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

</style>
