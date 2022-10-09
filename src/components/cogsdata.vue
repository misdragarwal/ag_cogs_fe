<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-toolbar-title>Cogs </v-toolbar-title>
          <v-divider class="mx-2 black" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-select :items=entities v-model="SetEntity" label="Entity:" id="SelEntity" item-text="shortCode" item-value="text" v-on:change='getBranches'></v-select>


          <v-spacer></v-spacer>
          <th width="20%">
            <v-select :items=branch v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-select>
          </th>
          <v-spacer></v-spacer>

          <v-select :items="department" v-model="Setdepartment" label="Department type" item-text="shortCode" item-value="text"></v-select>

          <v-spacer></v-spacer>
          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="fromdate" placeholder="Select From Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="fromdate"  no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <v-menu absolute ref="menu2" :close-on-content-click="false" v-model="menu2" :nudge-right="40" :return-value.sync="todate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="todate" placeholder="Select To Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="todate"  no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu2 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu2.save(todate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>

          <v-btn rounded color="primary" dark @click="apiRequestCogsdata(fromdate,todate,SetEntity,SetBranch,Setdepartment)">Generate</v-btn>



          <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelCogsdata">
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
        <div class="table-responsive">
          <table class="table table-hover table-bordered" v-if="show">
            <thead>
              <tr class="grey lighten-2">
                <th class="text-xs-left" width="15%" scope="col">PARENT_BRANCH</th>
                <th class="text-xs-center" scope="col">BRANCH</th>
                <th class="text-xs-center" scope="col">PATIENT_MRN</th>
                <th class="text-xs-center" scope="col">PATIENT_NAME</th>
                <th class="text-xs-center" scope="col">PAYMENT_OR_REFUND_DATE</th>
                <th class="text-xs-center" scope="col">BILL_NO</th>
                <th class="text-xs-center" scope="col">RECEIPT_NO</th>
                <th class="text-xs-center" scope="col">TOTAL_BILL_AMT</th>
                <th class="text-xs-center" scope="col">CASH_AMOUNT</th>
                <th class="text-xs-center" scope="col">CARD_AMOUNT</th>
                <th class="text-xs-center" scope="col">CARD_SERVICE_CHARGE_AMOUNT</th>
                <th class="text-xs-center" scope="col">CHEQUE_AMOUNT</th>
                <th class="text-xs-center" scope="col">FUND_TRANSFER_AMOUNT</th>
                <th class="text-xs-center" scope="col">PAYTM_AMOUNT</th>
                <th class="text-xs-center" scope="col">DD_AMOUNT</th>
                <th class="text-xs-center" scope="col">REFUND_CASH_AMOUNT</th>
                <th class="text-xs-center" scope="col">REFUND_CARD_AMOUNT</th>
                <th class="text-xs-center" scope="col">REFUND_CHEQUE_AMOUNT</th>
                <th class="text-xs-center" scope="col">CREDIT_CHEQUE_AMOUNT</th>
                <th class="text-xs-center" scope="col">CREDIT_CASH_AMOUNT</th>
                <th class="text-xs-center" scope="col">PAYTM_CASH_AMOUNT</th>
                <th class="text-xs-center" scope="col">PAYTM_FUND_AMOUNT</th>
                <th class="text-xs-center" scope="col">DEPARTMENT</th>
                <th class="text-xs-center" scope="col">PAYMENT_NATURE</th>
                <th class="text-xs-center" scope="col">CREDIT_CHEQUE_AMOUNT</th>

                <th class="text-xs-center" scope="col">PAID_AMOUNT</th>
                <th class="text-xs-center" scope="col">CREATEDBY</th>
                <th class="text-xs-center" scope="col">PAYMENT_REFERENCE</th>
                <th class="text-xs-center" scope="col">PAYMENT_DETAIL</th>

              </tr>


            </thead>
            <tbody>
              <tr scope="row" v-for="(item,index) in Collectionlist">
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PARENT_BRANCH}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.BRANCH}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PATIENT_MRN}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PATIENT_NAME}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PAYMENT_OR_REFUND_DATE}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.BILL_NO}}</td>

                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.RECEIPT_NO}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.TOTAL_BILL_AMT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.CASH_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.CARD_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.CARD_SERVICE_CHARGE_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.CHEQUE_AMOUNT}}</td>

                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.FUND_TRANSFER_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PAYTM_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.DD_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.REFUND_CASH_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.REFUND_CARD_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.REFUND_CHEQUE_AMOUNT}}</td>

                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.CREDIT_CHEQUE_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.CREDIT_CASH_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PAYTM_CASH_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PAYTM_FUND_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.DEPARTMENT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PAYMENT_NATURE}}</td>

                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PAYMENT_MODE}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PAID_AMOUNT}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.CREATEDBY}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PAYMENT_REFERENCE}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black">{{item.PAYMENT_DETAIL}}</td>
              </tr>

            </tbody>

          </table>
        </div>

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
import { serverBus } from "../main";

var curday = function(sp) {
  var today = new Date();
  var dd = today.getDate() - 1;
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return (yyyy + sp + mm + sp + dd);
};

export default{
  data:()=>({
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
        shortCode: 'OHC',
        text: 'OHC'
      },
    ],
    branch: [{
        shortCode: 'Select All',
        text: 'All'
      }],
      department: [{
          shortCode: "Select All",
          text: "All"
        },
        {
          shortCode: "Pharmacy",
          text: "PHARMACY",
        },
        {
          shortCode: "Optical",
          text: "OPTICALS",
        },
        {
          shortCode: "OT",
          text: "OPERATION THEATRE",
        },
        {
          shortCode: "Lab",
          text: "LABORATORY",
        },
      ],
      Setdepartment:{
        shortCode: 'All',
        text: 'All'
      },
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

      fromdate: null,
      todate: null,
      menu: false,
      menu1: false,
  menu2: false,
      Cogs: null,
      Cogslist: null,

      json_data: null,
      json_meta: [{
        key: "charset",
        value: "utf-8"
      }],
      json_fields: {
        "Item code": "item_code",
        "Item Name": "item_name",
        "Batch no":"batch_no",
        "uom": "uom",
        "Trans type": "trans_type",
        "Trans date": "trans_date",
        "Item type": "item_type",
        "Top": "top",
        "Second": "second",
        "Group": "group",
        "Sub group": "sub_group",
        "Bill No": "bill_no",
        "Sales No": "sales_no",
        "Quantity": "quantity",
        "Unit Price": "unit_price",
        "Cost Price": "cost_price",
        "Actual Price": "actual_value",
        "Tax": "tax",
        "Tax percentage": "tax_percent",
        "Branch": "branch",
        "Entity": "entity",
        "Region": "region",
        "Unit": "unit",
        "work order status": "wo_status",
        "Manufacturer": "MANUFACTURER",
        "mrp": "MRP",



      },
      fileName: null

  }),
  created() {
    this.getToday();
  },
  methods:{
    getBranches(selectObj) {
      this.SetBranch = [];
      this.branch = [];
      var arr1 = [{
        shortCode: 'Select All',
        text: 'All'
      }];
      //if(this.SetEntity!='' && selectObj!='')
      this.axios
        .get(`https://mis.dragarwal.com/api-branch/${selectObj}`).then(response => {
          this.branch = arr1.concat(response.data);
          console.log(arr1);

          console.log(this.branch);

        })

    },

    getToday() {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },
apiRequestCogsdata(fromdate,todate,SetEntity,SetBranch,Setdepartment){
  let entity = '';
  let branch = '';
    let type = '';

    var date3 = new Date();
    console.log(date3);
    var date4 = date3.getFullYear()+'-'+date3.getMonth()+'-'+date3.getDate();

    var currentDate = new Date(date4);
    console.log(currentDate);



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

if((fromdate==null)||fromdate==''){
  alert("please select date")
  return false;
}
if((todate==null)||todate==''){
  alert("please select date")
  return false;
}
else if((SetEntity==null)||(SetEntity=='')){
  alert("please select any entity")
  return false;
}
else if((SetBranch==null)||(SetBranch=='')){
  alert("Please select any branch")
  return false;
}



else {

  if (!this.Setdepartment.text == '') {
    type = this.Setdepartment.text
  } else {
    type = this.Setdepartment
  }

  console.log(fromdate+SetEntity+SetBranch+type+todate);
  this.isLoading = true;
  this.axios
  .get(`https://mis.dragarwal.com/api-cogsdetail/${this.fromdate}/${this.todate}/${this.SetEntity}/${this.SetBranch}/${type}`)
    .then(response =>{

      console.log(response.data);
      this.processDatacogs(response.data);
    this.isLoading = false;
      if(response.data!=''){
        alert("Data loaded... please download in excel");
        branch=this.SetBranch;
        entity=this.SetEntity;

          var str="_"
          this.fileDate = this.fromdate.concat(str);
          this.file=entity.concat(str,branch,str,this.fileDate)
          console.log(this.fileDate);

          this.fileName = `Cogs_Report_${this.file}.csv`;

      }
    })


}


},
downloadExcelCogsdata(){
  let tempDataArr = [];
  if (this.fileDate !== null) {
  tempDataArr =this.Cogslist

  return tempDataArr;
  } else {
  return null;
  }
},
processDatacogs(data){

  console.log("hit");
  console.log(data);
 this.Cogslist=data.result['cogs'];
}

},



}
</script>
