 <template>
   <v-container fluid fill-height class="grey lighten-3">
     <v-slide-y-transition mode="out-in">
       <v-layout row wrap>
         <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
           <v-toolbar flat color="grey lighten-2">
             <th width="20%">
               <v-autocomplete :items="branch" v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-autocomplete>
             </th>
             <v-spacer></v-spacer>
             <th width="10%">
               <v-select v-model="category" :items="items" label="Category" item-text="shortCode" item-value="text"></v-select>
             </th>

                          <v-spacer></v-spacer>
                          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="150px">
                            <v-text-field slot="activator" v-model="fromdate" placeholder="Select From Date" prepend-inner-icon="event" readonly></v-text-field>
                            <v-date-picker color="primary" v-model="fromdate" type="month" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
                              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
                            </v-date-picker>
                          </v-menu>

  <v-spacer></v-spacer>
  <v-btn rounded color="primary" dark @click="apiRequestreportpc(SetBranch,category,fromdate)">Generate</v-btn>

  <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelPc">
    <v-btn fab flat medium color="black">
      <v-tooltip bottom>
        <v-icon slot="activator" color="green darken-4">fas fa-file-excel</v-icon>
        <span>Export</span>
      </v-tooltip>
    </v-btn>
  </download-excel>

  <v-spacer></v-spacer>



          </v-toolbar>
          <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>


                  <template>
                    <v-card-title>
                      <v-toolbar-title>PC reports</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-text-field v-model="search" v-if="reportdata" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                    </v-card-title>

                    <v-data-table :headers="headers" :items="reportdata" v-model="selected" :search="search" class="elevation-4">
                      <template slot="items" slot-scope="props">
                        <tr>

                          <td class="text-xs-left">{{ props.item.STATUS }}</td>
                          <td class="text-xs-left">{{ props.item.entity }}</td>
                          <td class="text-xs-left">{{ props.item.branch }}</td>
                          <td class="text-xs-left">{{ props.item.category_name }}</td>
                          <td class="text-xs-left">{{ props.item.voucher_no}}</td>
                          <td class="text-xs-left">{{props.item.vendorname }}</td>
                          <td class="text-xs-left">{{props.item.bill_no}}</td>
                          <td class="text-xs-left">{{props.item.bill_date}}</td>
                          <td class="text-xs-left">{{props.item.remarks}}</td>
                          <td class="text-xs-left">{{props.item.credit}}</td>
                          <td class="text-xs-left">{{props.item.debit}}</td>
                          <td class="text-xs-right" v-if="((props.item.status ==='Need sch approval') ||(props.item.status ==='Sch Approved')||(props.item.status ==='Bill raised') )">
                            <v-btn slot="activator" small fab @click.stop="$set(dialogcategory, props.item.vendormatch, true)" color="pink">
                              <v-icon>fas fa-exchange-alt</v-icon>
                            </v-btn>



                            <v-dialog v-model="dialogcategory[props.item.vendormatch]" persistent max-width="800px" lazy absolute :key="props.item">
                              <v-card>
                                <v-card-title>
                                  <span>{{'branch : '}}{{ props.item.branch }}{{" -- Bill no : "}}{{props.item.bill_no}} </span><br>
                                  <span>{{" -- Vendor no : "}}{{props.item.voucher_no}} {{'-- Vendorname : '}}{{props.item.vendorname}} </span><br />
                                </v-card-title>
                                <v-card-title>
                                  <span>{{' Amount : '}}{{props.item.debit}} </span>
                                </v-card-title>
                                <v-card-title>
                                  <span>{{' Category : '}}{{props.item.category_name}} </span>
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
                                        <v-select v-model="category1" :items="items" label="Category" item-text="shortCode" item-value="text"></v-select>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>


                                <v-card-actions>

                                  <v-btn color="primary" flat @click.stop="$set(dialogcategory, props.item.vendormatch, false)">Close</v-btn>
                                  <v-btn color="blue darken-1" flat @click="rowChange(props.item,category1)" @click.stop="$set(dialogcategory, props.item.vendormatch, false)">Change</v-btn>

                                </v-card-actions>
                              </v-card>
                            </v-dialog>


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

  </v-flex>
</v-layout>
</v-slide-y-transition>
</v-container>

 </template>

 <script>

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



   export default {
     data:()=>({
SetBranch: [],
    items: [],
    dialogcategory: {},
branch: [{
    shortCode: 'Select All',
    text: 'All'
  }],
    category: [],
    category1: [],
    items: [],
      menu1: false,
        fromdate: null,
      minDate: "2020-04-01",
        maxDate: curday('-'),
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
        isLoading: false,
        fullPage: true,
        reportdata:null,

        headers: [{
            text: 'Status',
            align: 'left',
            sortable: false,
            value: 'STATUS'

          },
          {
            text: 'Entity',
            align: 'left',
            sortable: false,
            value: 'entity'
          },

          {
            text: 'Branch',

            align: 'left',
            sortable: false,
            value: 'branch'
          },

          {
            text: 'Category Name',
            align: 'left',
            sortable: false,
            value: 'category_name'
          },

          {
            text: 'Voucher no',
            align: 'left',
            sortable: false,
            value: 'voucher_no'
          },
          {
            text: 'Vendor name',
            align: 'left',
            sortable: false,
            value: 'vendorname'
          },
          {
            text: 'Bill no',
            align: 'left',
            sortable: false,
            value: 'bill_no'
          },
          {
            text: 'Bill date',
            align: 'left',
            sortable: false,
            value: 'bill_date'
          },
          {
            text: 'MEMO',
            align: 'left',
            sortable: false,
            value: 'status'
          },
          {
            text: 'Credit',
            align: 'left',
            sortable: false,
            value: 'credit'
          },
          {
            text: 'Debit',
            align: 'left',
            sortable: false,
            value: 'debit'
          },

          {
            text: 'Change',
            align: 'left',
            sortable: false,
            value: 'change'
          }
        ],
  search: '',
  selected: '',
  json_data: null,
  json_meta: [{
    key: "charset",
    value: "utf-8"
  }],
  json_fields: {
    "Bill Status": "STATUS",
    "Entity": "entity",
    "Branch": "branch",
    "NS code":"CODE",
    "NS Category Name": "category_name",
    "NS Ledger Name": "ledger_head",
    "Voucher No":"voucher_no",
    "Vendor name": "vendorname",
    "Bill no": "bill_no",
    "Bill date": "bill_date",
    "MEMO": "remarks",
    "Opening Balance": "OPENING",
    "Credit": "credit",
    "Debit": "debit",
    "Balance":"CLOSING",
    "Refilled date": "refilled_date",
    "Ch id": "ch_id",
    "Created date": "created_date",
    "SCH id": "sch_id",
    "SCH date": "sch_approved_date",
    "FIN id": "fin_id",
    "Fin Date": "fin_approved_date",
    "Bill submission": "bill_submission",
    "Cancel By":"cancel_by",
    "Cancel date":"cancel_date",
  },
  fileName: null,
}),
mounted() {
  this.loadbranch();
this.loadcategoty();

},
methods:{


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
  loadcategoty() {
    var arr2 = [{
      text: 'All',
      shortCode: 'Select All',

    }];
    this.axios
      .get(`https://mis.dragarwal.com/api-pettycashcategory`).then(response => {
        this.items = arr2.concat(response.data);
      })
  },
apiRequestreportpc(SetBranch,category,fromdate){
  console.log(SetBranch+category+fromdate);

     if(this.SetBranch==''){
      alert("Please select Branch");
      return false;
    }
    else if(this.category==''){
      alert("Please select category");
      return false;
    }
    else if(this.fromdate==''){
      alert("Please select Date");
      return false;
    }
    else {
          this.isLoading = true;
          this.axios.get(`https://mis.dragarwal.com/api-getpcreports/${this.SetBranch}/${this.category}/${this.fromdate}`)
            .then(response =>{

            this.processDatalistreport(response.data);
            this.isLoading = false;

            })
    }

            var str = "_"
            this.fileDate = this.fromdate.concat(str);

            console.log(this.fileDate);

            this.fileName = `Pc_Report_${this.fileDate}.csv`;


}
,
processDatalistreport(data)
{

  this.reportdata=data.result["pc"][1]

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


      this.isLoading = true;
      this.axios.get(`https://mis.dragarwal.com/api-getpcreports/${this.SetBranch}/${this.category}/${this.fromdate}`)
        .then(response =>{
  console.log(response.data);
        this.processDatalistreport(response.data);

this.isLoading = false;

        })



    } else {
      alert("Error in saving data")
      this.isLoading = true;


      this.isLoading = true;
      this.axios.get(`https://mis.dragarwal.com/api-getpcreports/${this.SetBranch}/${this.category}/${this.fromdate}`)
        .then(response =>{

        this.processDatalistreport(response.data);
this.isLoading = false;

        })



    }
  })


},
downloadExcelPc(){
  let tempDataArr = [];
  if (this.fileDate !== null) {
    tempDataArr = this.reportdata

    return tempDataArr;
  } else {
    return null;
  }

}
}

   }
 </script>

 <style>
 </style>
