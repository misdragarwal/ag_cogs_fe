<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">

          <v-spacer></v-spacer>

          <v-select :items="currentstatus" v-model="Setstatus" label="Status Type" item-text="shortCode" item-value="text"></v-select>
          <v-btn rounded color="primary" dark @click="apiRequesticdoctorlist(fromdate,todate,SetVisit,SetBranch,Setdrttype)">Generate</v-btn>


        </v-toolbar>
        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>
        <!-- Vuetify Data table -->

        <template>
          <v-card-title>
            <v-toolbar-title>IC Doctor list</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click.stop="newdoctor = true">
              New Doctor Reference
            </v-btn>

            <v-layout row justify-center>
              <v-dialog v-model="newdoctor" persistent max-width="800px" lazy absolute>
                <v-card>
                  <v-card-title>
                    <span class="headline">Information</span>

                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>

                        <v-flex xs12 sm6 md4>
                          <v-text-field type='text' clearable v-model="refdoctor" label="Ref Doctor" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-select :items="paymententities" v-model="Setpayment" label="Payment type" id="SelEntity" item-text="shortCode" item-value="text"></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field type='text' clearable v-model="refinfavourdoctor" label="In favour of" required></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6 md4>
                          <v-select :items="branch" v-model="refdocbranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch" />
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field type="text" clearable v-model="refdoccontact" label="Contact No" @change='' required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="refdocemail" :rules="emailRules" label="E-mail" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field type='text' clearable v-model="refdocpan" @change="Panrules(b)" label="Pan No" required></v-text-field>
                          <small>*If no Pan please enter NA</small>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field type='text' clearable v-model="refdocgstin" label="GSTIN No" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field type='text' clearable v-model="refdocagreed" label="Agreed %" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field type='text' clearable v-model="refdocacc" label="Bank Account No" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field type='text' clearable v-model="refdocaccifsc" label="Bank IFSC" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field type='text' clearable v-model="refdocaccbank" label="Bank Name" required></v-text-field>
                        </v-flex>


                        <v-flex xs12 sm6 md4>
                          <label>Agreement file
                          </label>
                          <input type="file" ref="agreementupload" accept="image/x-png, image/gif, image/jpeg,application/pdf" v-on:change="handleFileUploadagreement()" />

                        </v-flex>

                        <v-flex xs12 sm6 md4>
                          <label>Pan Upload
                          </label>
                          <input type="file" ref="panupload" accept="image/x-png, image/gif, image/jpeg,application/pdf" v-on:change="handleFileUploadpan()" />

                        </v-flex>

                        <v-flex xs12 sm6 md4>
                          <label>Passbook Upload
                          </label>
                          <input type="file" ref="passbookupload" accept="image/x-png, image/gif, image/jpeg,application/pdf" v-on:change="handleFileUploadpassbook()" />

                        </v-flex>


                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="newdoctor = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="apiinsertrefdoc(refdoctor,refinfavourdoctor,refdocbranch,refdoccontact,refdocemail,refdocpan,refdocgstin,refdocagreed,refdocacc,refdocaccifsc,refdocaccbank)">Submit</v-btn>

                  </v-card-actions>
                </v-card>



              </v-dialog>
            </v-layout>


            <v-spacer></v-spacer>
            <v-text-field v-model="search" v-if="doctorlist" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
          </v-card-title>

          <v-data-table :headers="headers" :items="doctorlist" v-model="selected" :search="search" class="elevation-1">
            <template slot="items" slot-scope="props">
              <tr @click="rowClick(props.item)">
                <td>{{ props.item.Active_status}}</td>
                <td class="text-xs-left">{{ props.item.Comments }}</td>
                <td class="text-xs-left">{{ props.item.Branch }}</td>
                <td class="text-xs-left">{{ props.item.Name }}</td>
                <td class="text-xs-left">{{ props.item.Infavour_of }}</td>
                <td class="text-xs-left">{{ props.item.Percentage }}</td>
                <td class="text-xs-left">{{ props.item.Pan_no }}</td>
                <td class="text-xs-left">{{ props.item.Bank_name }}</td>
                <td class="text-xs-left">{{ props.item.Account_no }}</td>
                <td class="text-xs-left">{{ props.item.Bank_ifsc }}</td>
                <td class="text-xs-left">{{ props.item.Payment_type }}</td>
                <!-- <td class="text-xs-left">{{props.item.Agreement}}</td> -->

                <td class="text-xs-right" v-if="!(props.item.Agreement_d==='NA')">
                  <v-btn slot="activator" small fab color="primary" @click="downloadagreement(props.item.Agreement_d)">
                    <v-icon>cloud_download</v-icon>
                  </v-btn>

                </td>
                <td class="text-xs-right" v-if="!(props.item.Pan_d==='NA')">
                  <v-btn slot="activator" small fab color="primary" @click="downloadpan(props.item.Pan_d)">
                    <v-icon>cloud_download</v-icon>
                  </v-btn>

                </td>
                <td class="text-xs-right" v-if="!(props.item.Passbook_d==='NA')">
                  <v-btn slot="activator" small fab color="primary" @click="downloadpassbook(props.item.Passbook_d)">
                    <v-icon>cloud_download</v-icon>
                  </v-btn>

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
import DRT from "@/components/chdrt";
import {
  serverBus
} from "@/main";
export default {
  data: () => ({
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
    headers: [{
        text: 'Status',
        align: 'left',
        sortable: false,
        value: 'Status'

      },
      {
        text: 'Finance Comments',
        align: 'left',
        sortable: true,
        value: 'Comments'
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
    isLoading: false,
    fullPage: true,
    doctorlist: null,
    Agreementfile: null,
    search: '',
    selected: [],
    newdoctor: false,
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
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],


  }),
  components: {
    DRT
  },
  mounted() {
    this.loadbranch();
  },
  methods: {
    apiRequesticdoctorlist(Setstatus) {
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      let statustype = ''

      if ((this.Setstatus == null) || (this.Setstatus == '')) {
        alert("Please select the status type")
        return false;
      }
      statustype = this.Setstatus
      console.log("statustype : :" + statustype);
      this.isLoading = true;
      this.$http.get(`https://mis.dragarwal.com/api-chdoctorlist/${statustype}/${userid.name}`).then(response => {
        console.log(response.data);
        this.processdatalist(response.data)
        this.isLoading = false;
      })

    },
    processdatalist(data) {
      this.doctorlist = data.result["doctordata"];
      console.log(this.doctorlist);
      this.show = true;
    },
    downloadagreement(Agreement_d) {
      //alert("hit : " + Agreement_d);
      this.axios({
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
      //alert("hit : " + Pan_d);
      this.axios({
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
      //alert("hit : " + Passbook_d);
      this.axios({
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
    handleFileUploadagreement() {
      this.fileagreementupload = this.$refs.agreementupload.files[0];
      console.log(this.fileagreementupload);
      console.log((this.fileagreementupload.size / 1024 / 1024).toFixed(2));
      if ((this.fileagreementupload.size / 1024 / 1024).toFixed(2) > 1.5) {
        alert("Agreement file is greater than 1MB")


        this.fileagreementupload = '';
        console.log(this.$refs.agreementupload.files = null);
        // this.$refs.agreementupload.files[0]='';

        console.log(this.fileagreementupload);
      }
    },
    handleFileUploadpan() {
      this.filepanupload = this.$refs.panupload.files[0];
      console.log(this.filepanupload);
      console.log((this.filepanupload.size / 1024 / 1024).toFixed(2));
      if ((this.filepanupload.size / 1024 / 1024).toFixed(2) > 1.5) {
        alert("Pan file is greater than 1MB")

        this.filepanupload = '';
        console.log(this.filepanupload);
      }
    },
    handleFileUploadpassbook() {
      this.filepassbookupload = this.$refs.passbookupload.files[0];
      console.log(this.filepassbookupload);
      console.log((this.filepassbookupload.size / 1024 / 1024).toFixed(2));
      if ((this.filepassbookupload.size / 1024 / 1024).toFixed(2) > 1.5) {
        alert("Passbook file is greater than 1MB")

        this.filepassbookupload = null;
        console.log(this.filepassbookupload);
      }
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
        if (this.refdocpan == "No Pan") {
          console.log(this.refdocpan);
        } else {
          alert("please enter 10 Digit Pan number")
          return false;
        }

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
          this.$refs.agreementupload.files[0]=null;
          this.$refs.agreementupload.files[0]='';
          console.log(formData);
        } else {

          alert(res.data.doctordatainserted);
          this.isLoading = false;
          return false;
        }

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

        .get(`https://mis.dragarwal.com/api-chbranch/${userid.userName}`).then(response => {
          this.branch = arr1.concat(response.data);
          console.log(this.branch);
        })


    },
    Panrules(b) {

      if ((this.refdocpan.length == 2) || (this.refdocpan == 'NA')) {
        this.refdocpan = 'No Pan'
        return true
      }


    }
  }
}
</script>
