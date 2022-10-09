<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">

          <v-spacer></v-spacer>

          <v-select :items="currentstatus" v-model="Setstatus" label="Status Type" item-text="shortCode" item-value="text"></v-select>
          <v-spacer></v-spacer>
          <v-autocomplete clearable v-bind:items="branch" v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-autocomplete>
          <v-spacer></v-spacer>


          <v-btn rounded color="primary" dark @click="apiapproveicdoctorlist(Setstatus,SetBranch)">Generate</v-btn>

          <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelDr">
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
            <v-toolbar-title>IC Doctor list</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" v-if="findoctorlist" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="findoctorlist" v-model="selected" :search="search" class="elevation-1">
            <template slot="items" slot-scope="props">
              <tr @click="rowClick(props.item)">
			    <td class="text-xs-left">{{ props.item.Created_date | dateformat }}</td>
                <td>{{ props.item.Active_status}}</td>               
				<td class="text-xs-left" v-if="(props.item.Active_status==='Approved')">{{ props.item.Approved_date | dateformat }}</td>
				<td class="text-xs-left" v-if="(props.item.Active_status==='Rejected')">{{ props.item.Cancelled_time | dateformat}}</td>
					<td class="text-xs-left" v-if="(props.item.Active_status==='Pending for approval')"></td>
				<td class="text-xs-left">{{ props.item.Branch }}</td>
                <td class="text-xs-left">{{ props.item.Name }}</td>
                <td class="text-xs-left">{{ props.item.Infavour_of }}</td>
                <td class="text-xs-left">{{ props.item.Percentage }}</td>
                <td class="text-xs-left">{{ props.item.Pan_no }}</td>
                <td class="text-xs-left">{{ props.item.Bank_name }}</td>
                <td class="text-xs-left">{{ props.item.Account_no }}</td>
                <td class="text-xs-left">{{ props.item.Bank_ifsc }}</td>
                <td class="text-xs-left">{{ props.item.Payment_type }}</td>
                <td class="text-xs-left">{{props.item.Agreement}}</td>

                <td class="text-xs-left" v-if="!(props.item.Agreement_d==='NA')">
                  <v-btn slot="activator" small fab color="primary" @click="downloadagreement(props.item.Agreement_d)">
                    <v-icon>cloud_download</v-icon>
                  </v-btn>

                </td>
                <td class="text-xs-left" v-else="(props.item.Agreement_d==='NA')">

                </td>
                <td class="text-xs-left" v-if="!(props.item.Pan_d==='NA')">
                  <v-btn slot="activator" small fab color="primary" @click="downloadpan(props.item.Pan_d)">
                    <v-icon>cloud_download</v-icon>
                  </v-btn>

                </td>
                <td class="text-xs-left" v-else="(props.item.Pan_d==='NA')">
                </td>
                <td class="text-xs-left" v-if="!(props.item.Passbook_d==='NA')">
                  <v-btn slot="activator" small fab color="primary" @click="downloadpassbook(props.item.Passbook_d)">
                    <v-icon>cloud_download</v-icon>
                  </v-btn>

                </td>
                <td class="text-xs-left" v-else="(props.item.Passbook_d==='NA')">

                </td>
                <td class="text-xs-left" v-if="props.item.Active_status==='Pending for approval'">
                  <v-btn slot="activator" small fab color="success" @click="rowApprove(props.item)">
                    <v-icon>check</v-icon>
                  </v-btn>

                </td>
                <td class="text-xs-left" v-if="props.item.Active_status==='Pending for approval'">
                  <v-btn slot="activator" small fab color="red" @click.stop="$set(dialogcancel, props.item.ID, true)">
                    <v-icon>fas fa-times</v-icon>
                  </v-btn>

                  <v-dialog v-model="dialogcancel[props.item.ID]" persistent max-width="800px" lazy absolute :key="props.item.ID">
                    <v-card>
                      <v-card-title>
                        <span>{{ props.item.Name }}{{ " -- "}}{{ props.item.Account_no  }} Cance Note</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>

                            <v-flex xs12 sm6>
                              <v-textarea clearable clear-icon="cancel" label="Comments" v-model='fincomments'></v-textarea>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-text>


                      <v-card-actions>


                        <v-btn color="primary" flat @click.stop="$set(dialogcancel, props.item.ID, false)">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click="rowDecline(props.item,fincomments)">Decline</v-btn>

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

export default {
  data: () => ({
    branch: [{
      shortCode: 'Select All',
      text: 'All'
    }],
    currentstatus: [{
        shortCode: "Select All",
        text: "All"
      },
      {
        shortCode: "Pending",
        text: "-1",
      },
      {
        shortCode: "Approved",
        text: "1",
      },
      {
        shortCode: "Cancelled",
        text: "-2",
      },
    ],
    headers: [
	  {
        text: 'Created Date',
        value: 'Created_date'
      },
	  {
        text: 'Status',
        align: 'left',
        sortable: false,
        value: 'Status'

      },
	  {
        text: 'Approve/Reject',
        value: 'Approved_date'
      },
      {
        text: 'Branch',
        value: 'Branch'
      },
      {
        text: 'Name',
        value: 'Name'
      },
      {
        text: 'Infavour of',
        value: 'Infavour_of'
      },
      {
        text: 'Agreed %',
        value: 'Percentage'
      },
      {
        text: 'Pan no',
        value: 'Pan_no'
      },
      {
        text: 'Bank Name',
        value: 'Bank_name'
      },
      {
        text: 'Account no',
        value: 'Account_no'
      },
      {
        text: 'Bank IFSC',
        value: 'Bank_ifsc'
      },
      {
        text: 'Payment type',
        value: 'Payment_type'
      },
      {
        text: 'Agreement Available',
        value: 'Payment_type'
      },
      {
        text: 'Agreement',
        value: 'Agreement_url'
      },
      {
        text: 'Pan',
        value: 'Pan_url'
      },
      {
        text: 'Passbook',
        value: 'Passbook_url'
      },
      {
        text: 'Approve',
        value: 'Approve'
      },
      {
        text: 'Reject',
        value: 'Reject'
      }
    ],
    isLoading: false,
    fullPage: true,
    findoctorlist: null,
    fromdate: null,
    todate: null,
    search: '',
    selected: [],
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
    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {
      "Branch": "Branch",
      "Name":"Name",
      "Infavour of":"Infavour_of",
      "Agreed %":"Percentage",
      "Pan no":"Pan_no",
      "Bank Name":"Bank_name",
      "Account no":"Accnt_no",
      "Bank IFSC":"Bank_ifsc",
      "Payment type":"Payment_type",

        },
    fileName: null,
        dialogcancel: {},
        fincomments:'',
  }),
  mounted() {
    this.loadbranch();
  },
  filters: {
	dateformat (date) {
	
	  console.log(date);
	  if(date!=null){
		return moment(date).format("YYYY-MM-DD");
	  }else{
		return '';
	  }
    }
 },

  methods: {
    loadbranch() {
      let userid = JSON.parse(sessionStorage.getItem("fin_user"));
      this.SetBranch = [];
      this.branch = [];
      var arr1 = [{
        shortCode: 'Select All',
        text: 'All'
      }];
      this.axios

        //.get(`https://mis.dragarwal.com/api-finbranch/${userid.userName}`).then(response => {
		.get(`https://mis.dragarwal.com/api-finbranch/${userid.userName}`).then(response => {
          this.branch = arr1.concat(response.data);
          console.log(this.branch);
        })
    },
    downloadagreement(Agreement_d) {

      this.axios({
        //url: `https://mis.dragarwal.com/api-download/${Agreement_d}`,
		url: `https://mis.dragarwal.com/api-download/${Agreement_d}`,
        method: 'GET',
        responseType: 'blob',
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', Agreement_d);
        document.body.appendChild(fileLink);

        fileLink.click();
      })

    },
    downloadpan(Pan_d) {

      this.axios({
        //url: `https://mis.dragarwal.com/api-download/${Pan_d}`,
		url: `https://mis.dragarwal.com/api-download/${Pan_d}`,
        method: 'GET',
        responseType: 'blob',
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', Pan_d);
        document.body.appendChild(fileLink);

        fileLink.click();
      })

    },
    downloadpassbook(Passbook_d) {

      this.axios({
        //url: `https://mis.dragarwal.com/api-download/${Passbook_d}`,
		url: `https://mis.dragarwal.com/api-download/${Passbook_d}`,

        method: 'GET',
        responseType: 'blob',
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', Passbook_d);
        document.body.appendChild(fileLink);

        fileLink.click();
      })

    },
    apiapproveicdoctorlist(Setstatus, SetBranch) {

      if ((this.Setstatus == null) || (this.Setstatus == '')) {
        alert("Please select the status type")
        return false;
      }
      if ((this.SetBranch == null) || (this.SetBranch == '')) {
        alert("Please select the Branch")
        return false;
      }
      this.isLoading = true;
      //this.$http.get(`https://mis.dragarwal.com/api-findoctorlist/${this.Setstatus}/${this.SetBranch}`)
	  this.$http.get(`https://mis.dragarwal.com/api-findoctorlist/${this.Setstatus}/${this.SetBranch}`)
        .then(response => {
          console.log(response.data);
          this.processdatalist(response.data)
          this.isLoading = false;
        })
        this.fileName=`Doctor_Report.csv`;
    },
    processdatalist(data) {
      this.findoctorlist = data.result["findata"];
      console.log(this.findoctorlist);
      this.show = true;
    },
    rowApprove(row) {
      let fin_id = '';

      this.isLoading = true;
      //this.$http.post(`https://mis.dragarwal.com/api-doctorapprove/`, {
	  this.$http.post(`https://mis.dragarwal.com/api-doctorapprove/`, {
        fin_id: row.ID,
		branch: row.Branch,
		docname: row.Name,
      }).then(response => {
        this.isLoading = false;
        alert("Approved");
        console.log("this.Setstatus : " + this.Setstatus);
        console.log("this.SetBranch :" + this.SetBranch);
        //this.$http.get(`https://mis.dragarwal.com/api-findoctorlist/${this.Setstatus}/${this.SetBranch}`)
		this.$http.get(`https://mis.dragarwal.com/api-findoctorlist/${this.Setstatus}/${this.SetBranch}`)
          .then(response => {
            console.log(response.data);
            this.processdatalist(response.data)
            this.isLoading = false;
          })


      })

    },
    rowDecline(row,fincomments) {
      let fin_id = '';
      this.isLoading = true;
      //this.$http.post(`https://mis.dragarwal.com/api-doctorreject/`, {
	  this.$http.post(` https://mis.dragarwal.com/api-doctorreject/`, {
        fin_id: row.ID,
        fin_comm:fincomments,
	branch: row.Branch,
	docname: row.Name,

      }).then(response => {
      
        alert("cancelled");
        console.log("this.Setstatus : " + this.Setstatus);
        console.log("this.SetBranch :" + this.SetBranch);
        this.fincomments='';
        //this.$http.get(`https://mis.dragarwal.com/api-findoctorlist/${this.Setstatus}/${this.SetBranch}`)
		      this.$http.get(`https://mis.dragarwal.com/api-findoctorlist/${this.Setstatus}/${this.SetBranch}`)
          .then(response => {
            console.log(response.data);
            this.processdatalist(response.data)
            this.isLoading = false;
          })
      })
    }
    ,downloadExcelDr() {
      let tempDataArr = [];
      if (this.fileDate !== null) {
        tempDataArr = this.findoctorlist

        return tempDataArr;
      } else {
        return null;
      }
    },
  }

}
</script>
