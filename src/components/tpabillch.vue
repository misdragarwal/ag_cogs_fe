<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-spacer></v-spacer>
          <v-autocomplete :items="branch" v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-autocomplete>

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
		  
		  
		   <!--<v-dialog v-model="dialog" width="900">
		   <span id="tpaBillPrevTemp" ref="tpaBillPrevTemp" style="width:800px"></span>
		    </v-dialog>-->
		  
	
              <v-dialog v-model="dialog" width="900">
                <v-card>
                  <v-card-title>
                   

                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>

                      <span id="tpaBillPrevTemp" ref="tpaBillPrevTemp" style="width:800px"></span>


                      </v-layout>
                    </v-container>
                   
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="tpaBillPrintScreen();">Print</v-btn>

                  </v-card-actions>
                </v-card>



              </v-dialog>
        
		
          <v-data-table :headers="headers" :items="tpabilldata" :search="search" class="elevation-4">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.BILLED }}</td>
              <td class="text-xs-left" style="white-space: nowrap;">{{ props.item.BILLEDDATE }}</td>
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
              <td class="text-xs-right" v-if="(props.item.SEND_DATE===null)">
                <v-btn v-if="user_id!=102301"  slot="activator" small fab color="success" @click="rowApprove(props.item)">
                  <v-icon>check</v-icon>
                </v-btn>

              </td>

              <td class="text-xs-right" v-else="props.item.SEND_DATE !=null">
                {{props.item.senddate}}

              </td>
              <td class="text-xs-right">
                <v-btn slot="activator" small fab color="primary" @click="tpaBillPrinPreview(props.item);">
                  <v-icon>fa fa-print</v-icon>
                </v-btn>

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
	tpaBillHtml:null,
	 dialog: false,
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
      {
        text:'Print',
        value:'Print'
      }
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
      "Bill no": "BILLNO",
      "Payor name": "AGENCY_NAME",
      "Claim id": "tpa_claim",
      "Total amount":"totalamount",
      "Discount amount":"discount",
      "Net amount": "netamount",
      "Patient amount": "patamount",
      "Payor amount": "tpaamount",
      "CH submitted": "SEND_DATE",
      "Ch Name":"SENT_ID",
      "Acknowledged date": "ACKNOWLEDGE_DATE",
      "Acknowledged Name":"ACKNOWLEDGE_ID",
      "Submitted date": "SUBMITTED_DATE",
      "Submitted Name":"SUBMITTED_ID",
    },
    fileName: null,
	user_id:null
  }),
  created() {
    this.getToday();
	let user_see = JSON.parse(sessionStorage.getItem("normal_user"));
	this.user_id = user_see.name;
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
        tpabillid:data.BILL_ID,
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
   
	tpaBillPrinPreview(item){       
						
			this.axios.get(`https://mis.dragarwal.com/api-tpabillprint/${item.BILL_ID}/${item.BILLED}/${item.AGENCY_NAME}`).then(
			//this.axios.get(`http://localhost:8888/api-tpabillprint/${item.BILL_ID}/${item.BILLED}/Reliance General Insurance Co.`).then(
			  response =>{			       
                   this.isLoading=true;
				   if(response.data.ResponseCode==200){
				    //alert(response.data.ResponseMsg);
				    this.isLoading=false;
					 this.dialog = true;
                    this.$refs.tpaBillPrevTemp.innerHTML='';
					this.tpaBillHtml = '';					
				    this.$refs.tpaBillPrevTemp.innerHTML = response.data.ResponseMsg;
					
					//document.getElementById("tpaBillPrevTemp").innerHTML = response.data.ResponseMsg;
					console.log("ddd");
					//this.$refs.tpaBillPrevTemp.innerHTML = "ddddd";
					this.tpaBillHtml  = response.data.ResponseMsg;
					
				   
				   }else{
				        this.dialog = false;
				        this.isLoading=false;
						this.$refs.tpaBillPrevTemp.innerHTML='';
					    this.tpaBillHtml = '';
						alert(response.data.ResponseMsg);
				   }
             

			  }
			)
	},
	tpaBillPrintScreen(){
	    
		var myWindow=window.open('','','width=600,height=300');
		myWindow.document.write(this.tpaBillHtml);
		myWindow.document.close(); //missing code
		myWindow.focus();
		myWindow.print(); 
	}
  }
}
</script>
