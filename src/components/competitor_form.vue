<template>
    <v-container>
        <v-slide-y-transition mode="out-in">
            <v-layout row wrap>
                <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
                    <!-- <v-toolbar flat color="grey lighten-2">
                        <v-toolbar-title>Competitors </v-toolbar-title>
                    </v-toolbar> -->
                    <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>
                    <!-- <v-alert type="success" :value="alert">
                        I'm a success alert.
                    </v-alert> -->
                    <v-alert :value="alert" color="primary" dark shaped border="top" icon="mdi-home"
                        transition="slide-y-transition">
                        {{this.message}}
                    </v-alert>

                    <v-toolbar flat color="grey lighten-2">
                        <v-toolbar-title>Competitors Details</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout row wrap>
                              <space></space>
                                <v-flex xs12 sm4 md2 >
                                    <v-autocomplete v-model="selbranch" :items="branch" label="Branch"  v-on:change = "selcitystate"
                                        item-text="shortCode" item-value="TEXT">
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select :items="comp_type" v-on:change = "changeCompType" v-model="Selcomptype" label="Type"
                                        item-text="shortCode" item-value="text"></v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <!-- <v-text-field v-model="compName" label="Competitor Name">
                                    </v-text-field> -->
                                    <v-autocomplete v-if="competName==false" v-model="comp_Name" v-bind:items="compName"
                                        v-on:change="changeNewText" label="Competitor Name" item-text="shortCode"
                                        item-value="TEXT">
                                    </v-autocomplete>
                                    <v-text-field v-else="!(comp_Name ===null||comp_Name==='')" v-model="comp_Name"
                                        label="Competitor Name">
                                    </v-text-field>
                                </v-flex>


                                <v-flex xs12 sm6 md4>
                                    <v-textarea clearable clear-icon="cancel" label="Doctors Name"
                                        v-model='compDoctors'></v-textarea>
                                </v-flex>
                           
                                <v-flex xs12 sm6 md4>
                                    <v-textarea clearable clear-icon="cancel" label="Form of marketing"
                                        v-model='compMarketing'>
                                    </v-textarea>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select :items="comp_service" v-model="compService" multiple label="Select Services"
                                        item-text="shortCode" item-value="TEXT"></v-select>
                           
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-if="(geo==true)" v-model="comp_State" label="Competitor State">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-if="(geo==true)" v-model="comp_City" label="Competitor City">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md3>
                                    <v-text-field v-if="(geo==true)" v-model="comp_Area" label="Competitor Area">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md2>
                                    <v-text-field v-if="(geo==true)" v-model="comp_branch" label="Competitor Branch">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md1>
                                    <v-text-field v-if="(geo==true)" class="inputNumber" type='number'
                                        v-model="priority" clearable label="priority">
                                    </v-text-field>
                                </v-flex>

                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-toolbar flat color="grey lighten-2">
                        <v-toolbar-title>Competitor Revenue Details</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs12 sm3>
                                    <v-menu absolute ref="menu" :close-on-content-click="false" v-model="menu"
                                        :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition"
                                        offset-y full-width min-width="200px">
                                        <v-text-field slot="activator" v-model="date" placeholder="Target Month"
                                            prepend-inner-icon="event" readonly></v-text-field>
                                        <v-date-picker color="primary" v-model="date" no-title scrollable :min="minDate"
                                            :max="maxDate" type=month backgroundRevenue-color="red"
                                            style="box-shadow:none">
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="menu = false" style="outline:none">
                                                Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.menu.save(date);"
                                                style="outline:none">Ok</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <v-text-field class="inputNumber" type='number' v-model="opdNo" clearable
                                        label="OPD"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <v-text-field class="inputNumber" type='number' v-model="catNo" clearable
                                        label="Cataract"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm9 md3>
                                    <v-text-field class="inputNumber" type='number' v-model="refractiveNo" clearable
                                        label="Refractive"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <v-text-field class="inputNumber" type='number' v-model="vrNo" clearable label="VR">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm9 md3>
                                    <v-text-field class="inputNumber" type='number' v-model="vrInjNo" clearable
                                        label="VR Inj"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm9 md3>
                                    <v-text-field class="inputNumber" type='number' v-model="revenueNo" clearable
                                        label="Total Revenue"></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <center>
                                        <v-btn color="info" v-if=(Draftstatus) @click="saveDraft"
                                            :disabled="!submitDraftvalid">Save Draft
                                        </v-btn>
                                        <v-btn color="info" v-if=!(Draftstatus) @click="updateDraft"
                                            :disabled="!submitDraftvalid">Update Draft
                                        </v-btn>
                                        <v-btn @click="clear">clear</v-btn>
                                        <v-btn @click="back()">back</v-btn>
                                        <v-btn color="success" @click="submit" :disabled="!submitDraftvalid">Submit
                                        </v-btn>

                                    </center>

                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-toolbar v-if="show" flat color="grey lighten-2">
                        <v-toolbar-title>Drafted data</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <!-- <v-container grid-list-md> -->
                            <!-- <v-layout  row wrap> -->
                                <table align="center"  class="inlineTable table-hover table-bordered" border="1" v-if="show">
                                        <tr>
                                            <th  class="text-xs-center" >EDIT</th>
                                           
                                            <th  class="text-xs-center" >BRANCH</th>
                                            <th  class="text-xs-center" >TYPE</th>
                                          
                                           <th  class="text-xs-center">NAME</th>
                                               <th  class="text-xs-center" >TARGET MONTH</th>
                                            <th  class="text-xs-center">DOCTORS NAME</th>
                                            <th class="text-xs-center">SERVICES</th>
                                            <!-- <th  class="text-xs-center">MARKETING ACTIVITY</th> -->
                                            <th  class="text-xs-center">DRAFTED AT</th>
                                        </tr>
                                        <tr  v-for="item in draftdetail"
                                            :key="item.company_name">
                                            <td>
                                                <v-btn slot="activator" small fab color="success"
                                                    @click="rowEdit(item)">
                                                    <v-icon>check</v-icon>
                                                </v-btn>
                                            </td>
                                  
                                            <td class="text-xs-center">{{item.branch}}</td>
                                            <td class="text-xs-center">{{item.comp_type}}</td>
                                          <td class="text-xs-center">{{item.company_name}}</td>
                                              <td class="text-xs-center">{{item.target_month}}</td>
                                            <td class="text-xs-center">{{item.doctor_name}}</td>
                                            <td class="text-xs-center">{{item.services}}</td>
                                            <!-- <td class="text-xs-center">{{item.marketing_activity}}</td> -->
                                            <td class="text-xs-center">{{item.inserted_at}}</td>
      </tr>

                                </table>

  
                            <!-- </v-layout>

                        </v-container> -->
                    </v-card-text>

                </v-flex>
                <v-snackbar v-model="snackbar" color="success" :timeout="timeout" top right>
                    {{ this.snackbartext }}
                </v-snackbar>
            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
import moment from "moment";
import { serverBus } from "../main";
var curday = function(sp) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return yyyy + sp + mm + sp + dd;
};

export default {
  data: () => ({
    submitDraftvalid: true,
    selbranch: null,
    Selcomptype: null,
    branch: null,
    comp_type: [
      {
        shortCode: "Group",
        text: "group"
      },
      {
        shortCode: "Individual",
        text: "individual"
      }
    ],
    compName: [
      // {
      //     shortCode: 'New',
      //     text: 'New Competitor'
      // },
    ],
    competName: false,
    comp_Name: null,
    compDoctors: "",
    compService: [],
    comp_service: [],
    compMarketing: "",
    comp_State: "",
    comp_City: "",
    comp_Area: "",
    comp_branch: "",
    opdNo: 0,
    catNo: 0,
    refractiveNo: 0,
    vrNo: 0,
    vrInjNo: 0,
    revenueNo: 0,
    minDate: "2022-09-01",
    menu: false,
    maxDate: curday("-"),
    date: null,
    isLoading: false,
    fullPage: true,
    show: false,
    draftdetail: null,
    //alert: true,
    alert: false,
    message: null,
    Draftstatus: true,
    cd_id: "",
    priority: 0,
    geo: false,
    snackbar: false,
    snackbartext: "",
    timeout: 3000,
    snackbarcolor: "success"
  }),
  mounted() {
    this.loadbranch();
    this.getToday();
    this.loadCompetitor();
    this.draftrecord();
    this.loadservice();
    if (alert) {
      this.hide_alert();
    }
  },
  methods: {
    getToday() {
      this.today = moment().format("YYYY-MM-DD");
    },
    loadbranch() {
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      this.isLoading = true;
      this.loading = true;
      this.axios
        .get(`${process.env.API_URL}/api-chbranch/${userid.userName}`)
        .then(response => {
          this.branch = response.data;
          this.isLoading = false;
        });
    },
    back() {
      serverBus.$emit("changeComponent", "competitors");
    },
    clear() {
      this.compDoctors = "";
      this.compService = "";
      this.compMarketing = "";
      this.opdNo = 0;
      this.catNo = 0;
      this.refractiveNo = 0;
      this.vrNo = 0;
      this.vrInjNo = 0;
      this.revenueNo = 0;
      this.compName = "";
      this.date = null;
      this.competName = false;
      this.comp_Name = "";
      this.comp_State = "";
      this.comp_City = "";
      this.comp_Area = "";
      this.priority = 0;
      this.comp_branch = "";
      this.changeCompType(this.Selcomptype);
      this.geo = false;
      this.cd_id = "";
      this.Draftstatus = true;
      this.submitDraftvalid = true;
    },
    saveDraft() {
      this.submitDraftvalid = false;
      if (this.selbranch === null || this.selbranch === "") {
        alert("Branch is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.Selcomptype == null || this.Selcomptype == "") {
        alert("Competitor type is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compName == null || this.compName == "") {
        alert("Competitor Name is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.date == null || this.date == "") {
        alert("Month is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compDoctors == null || this.compDoctors === "") {
        alert("Doctor name is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compService == null || this.compService === "") {
        alert("Service is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compMarketing == null || this.compMarketing === "") {
        alert("Marketing activity is required");
        this.submitDraftvalid = true;
        return false;
      }
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      this.isLoading = true;
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          token: `${process.env.API_KEY}`
        }
      };
      this.$http
        .post(
          `${process.env.API_URL}/api-competitors`,
          {
            branch: this.selbranch,
            doctorName: this.compDoctors,
            createdBy: userid.name,
            marketing: this.compMarketing,
            month: this.date,
            companyName: this.comp_Name,
            compType: this.Selcomptype,
            serviceAvail: this.compService,
            state: this.comp_State,
            area: this.comp_Area,
            cbranch: this.comp_branch,
            city: this.comp_City,
            priority: this.priority,
            saveType: 0,
            type: 0,
            services: {
              opd: this.opdNo,
              cataract: this.catNo,
              refractive: this.refractiveNo,
              vr: this.vrNo,
              vr_inj: this.vrInjNo,
              total: this.revenueNo
            }
          },
          requestOptions
        )
        .then(response => {
          console.log(response);
          if (response.data.code == 200) {
            // alert("Data Drafted successfully");
            this.isLoading = false;
            this.clear();
            this.draftrecord();
            this.changeCompType(this.Selcomptype);
            this.submitDraftvalid = true;
            this.snackbartext = "Data Drafted successfully";
            this.snackbar = true;
          } else {
            this.isLoading = false;
            this.changeCompType(this.Selcomptype);
            this.snackbartext = `Error in saving data ${
              response.data.error.message
            }`;
            this.snackbar = true;
          }
        });
    },
    updateDraft() {
      this.submitDraftvalid = false;
      if (this.selbranch === null || this.selbranch === "") {
        alert("Branch is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.Selcomptype == null || this.Selcomptype == "") {
        alert("Competitor type is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compName == null || this.compName == "") {
        alert("Competitor Name is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.date == null || this.date == "") {
        alert("Month is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compDoctors == null || this.compDoctors === "") {
        alert("Doctor name is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compService == null || this.compService === "") {
        alert("Service is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compMarketing == null || this.compMarketing === "") {
        alert("Marketing activity is required");
        this.submitDraftvalid = true;
        return false;
      }

      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      // this.isLoading = true;
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          token: `${process.env.API_KEY}`
        }
      };
      this.axios
        .put(
          `${process.env.API_URL}/api-competitors/${this.cd_id}`,
          {
            branch: this.selbranch,
            doctorName: this.compDoctors,
            createdBy: userid.name,
            marketing: this.compMarketing,
            month: this.date,
            companyName: this.comp_Name,
            compType: this.Selcomptype,
            serviceAvail: this.compService,
            priority: this.priority,
            saveType: 0,
            type: 1,
            services: {
              opd: this.opdNo,
              cataract: this.catNo,
              refractive: this.refractiveNo,
              vr: this.vrNo,
              vr_inj: this.vrInjNo,
              total: this.revenueNo
            }
          },
          requestOptions
        )
        .then(response => {
          if (response.data.code == 200) {
            this.isLoading = false;
            this.clear();
            this.draftrecord();
            this.changeCompType(this.Selcomptype);
            this.submitDraftvalid = true;
            // this.alert = true
            // this.message = 'Data Drafted successfully'
            // this.alert()
            this.snackbartext = "Data Drafted successfully";
            this.snackbar = true;
          } else {
            // this.message = 'Error in saving data'
            // this.alert()
            this.isLoading = false;
            this.changeCompType(this.Selcomptype);
            this.snackbartext = "Error in saving data";
            this.snackbar = true;
          }
        });
    },
    submit() {
      this.submitDraftvalid = false;
      if (this.selbranch === null || this.selbranch === "") {
        alert("Branch is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.Selcomptype == null || this.Selcomptype == "") {
        alert("Competitor type is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compName == null || this.compName == "") {
        alert("Competitor Name is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.date == null || this.date == "") {
        alert("Month is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compDoctors == null || this.compDoctors === "") {
        alert("Doctor name is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compService == null || this.compService === "") {
        alert("Service is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compMarketing == null || this.compMarketing === "") {
        alert("Marketing activity is required");
        this.submitDraftvalid = true;
        return false;
      }

      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      this.isLoading = true;
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          token: `${process.env.API_KEY}`
        }
      };
      if (this.cd_id !== "") {
        this.updateDraftData();
      } else {
        this.$http
          .post(
            `${process.env.API_URL}/api-competitors`,
            {
              id: this.cd_id,
              branch: this.selbranch,
              doctorName: this.compDoctors,
              createdBy: userid.name,
              marketing: this.compMarketing,
              month: this.date,
              companyName: this.comp_Name,
              compType: this.Selcomptype,
              serviceAvail: this.compService,
              saveType: 1,
              state: this.comp_State,
              area: this.comp_Area,
              cbranch: this.comp_branch,
              city: this.comp_City,
              priority: this.priority,
              type: 2,
              services: {
                opd: this.opdNo,
                cataract: this.catNo,
                refractive: this.refractiveNo,
                vr: this.vrNo,
                vr_inj: this.vrInjNo,
                total: this.revenueNo
              }
            },
            requestOptions
          )
          .then(response => {
            console.log(response.data);
            if (response.data.code == 200) {
              this.isLoading = true;
              this.clear();
              this.changeCompType(this.Selcomptype);
              this.submitDraftvalid = true;
              this.snackbartext = "Data Submitted successfully";
              this.snackbar = true;
              this.draftrecord();
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.changeCompType(this.Selcomptype);
              this.snackbartext = response.data.error.message;
              this.snackbar = true;
              this.submitDraftvalid = true;
            }
          });
      }
    },
    updateDraftData() {
      this.submitDraftvalid = false;
      if (this.selbranch === null || this.selbranch === "") {
        alert("Branch is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.Selcomptype == null || this.Selcomptype == "") {
        alert("Competitor type is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compName == null || this.compName == "") {
        alert("Competitor Name is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.date == null || this.date == "") {
        alert("Month is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compDoctors == null || this.compDoctors === "") {
        alert("Doctor name is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compService == null || this.compService === "") {
        alert("Service is required");
        this.submitDraftvalid = true;
        return false;
      }
      if (this.compMarketing == null || this.compMarketing === "") {
        alert("Marketing activity is required");
        this.submitDraftvalid = true;
        return false;
      }

      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      // this.isLoading = true;
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          token: `${process.env.API_KEY}`
        }
      };
      this.axios
        .put(
          `${process.env.API_URL}/api-competitors/${this.cd_id}`,
          {
            branch: this.selbranch,
            doctorName: this.compDoctors,
            createdBy: userid.name,
            marketing: this.compMarketing,
            month: this.date,
            companyName: this.comp_Name,
            compType: this.Selcomptype,
            serviceAvail: this.compService,
            priority: this.priority,
            saveType: 1,
            services: {
              opd: this.opdNo,
              cataract: this.catNo,
              refractive: this.refractiveNo,
              vr: this.vrNo,
              vr_inj: this.vrInjNo,
              total: this.revenueNo
            }
          },
          requestOptions
        )
        .then(response => {
          if (response.data.code == 200) {
            this.isLoading = false;
            this.clear();
            this.draftrecord();
            this.changeCompType(this.Selcomptype);
            this.submitDraftvalid = true;
            // this.alert = true
            // this.message = 'Data Drafted successfully'
            // this.alert()
            this.snackbartext = "Data Submitted Successfully";
            this.snackbar = true;
          } else {
            // this.message = 'Error in saving data'
            // this.alert()
            this.isLoading = false;
            this.changeCompType(this.Selcomptype);
            this.snackbartext = "Error in saving data";
            this.snackbar = true;
          }
        });
    },
    loadCompetitor() {
       if (this.Selcomptype !== null && this.Selcomptype !== "") {
        this.compName = [];
        var arr1 = [
          {
            shortCode: "New",
            text: "New Competitor"
          }
        ];
        let userid = JSON.parse(sessionStorage.getItem("normal_user"));
        const requestOptions = {
          headers: {
            "Content-Type": "application/json",
            token: `${process.env.API_KEY}`
          }
        };
        this.axios
          .get(
            `${process.env.API_URL}/api-listcompetitors/${userid.name}`,
            requestOptions
          )
          .then(response => {
            if (this.Selcomptype === "individual") {
              this.compName = arr1.concat(response.data.data);
            } else if (this.Selcomptype === "group") {
              this.compName = response.data.data;
            }
          });
      }
    },
    draftrecord() {
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          token: `${process.env.API_KEY}`
        }
      };
      this.axios
        .get(
          `${process.env.API_URL}/api-draftcompetitors/${userid.name}`,
          requestOptions
        )
        .then(response => {
          if (response.data.data.length > 0) {
            this.draftdetail = response.data.data;
            this.show = true;
          } else {
            this.show = false;
          }
        });
    },
    rowEdit(a) {
      this.isLoading = true;
      this.Draftstatus = false;
      this.selbranch = a.branch;
      this.Selcomptype = a.comp_type;
      this.comp_Name = a.company_name;
      this.compName = a.company_name;
      this.compDoctors = a.doctor_name;
      if (a.services == "" || a.services == null) {
        this.compService = a.services;
      } else {
        this.compService = a.services.split(",");
      }
      this.compMarketing = a.marketing_activity;
      this.date = a.target_month;
      this.opdNo = a.opd;
      this.catNo = a.cataract;
      this.refractiveNo = a.refractive;
      this.vrNo = a.vr;
      this.vrInjNo = a.vr_inj;
      this.revenueNo = a.revenue;
      this.cd_id = a.cd_id;
      this.comp_State = a.state;
      this.comp_Area = a.area;
      this.comp_branch = a.c_branch;
      this.comp_City = a.city;
      this.priority = a.priority;
      this.isLoading = false;
    },
    changeCompType(data) {
      let userid = JSON.parse(sessionStorage.getItem("normal_user"));
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          token: `${process.env.API_KEY}`
        }
      };
      this.compName = [];
      var arr1 = [
        {
          shortCode: "New",
          text: "New Competitor"
        }
      ];

      this.axios
        .get(
          `${process.env.API_URL}/api-listcompetitors/${userid.name}/${data}`,
          requestOptions
        )
        .then(response => {
          if (data === "individual") {
            this.compName = arr1.concat(response.data.data);
          } else if (data === "group") {
            console.log("...............", response.data.data);
            this.compName = response.data.data;
          }
        });
    },
    changeNewText(a) {
      if (a == "New") {
        this.competName = true;
        this.geo = true;
      } else {
        this.loadCompetitorDetail(a, this.selbranch);
      }
    },
    hide_alert() {
      window.setInterval(() => {
        this.alert = false;
      }, 3000);
    },
    loadservice() {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          token: `${process.env.API_KEY}`
        }
      };
      this.axios
        .get(`${process.env.API_URL}/api-competitorservices`, requestOptions)
        .then(response => {
          this.comp_service = response.data.data;
          this.isLoading = false;
        });
    },
    loadCompetitorDetail(data, branch) {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          token: `${process.env.API_KEY}`
        }
      };
      this.axios
        .get(
          `${process.env.API_URL}/api-loadCompetitorDetail/${data}/${branch}`,
          requestOptions
        )
        .then(response => {
          this.compMarketing = response.data.data[0].marketing_activity;
          this.compName = response.data.data[0].company_name;
          this.compDoctors = response.data.data[0].doctor_name;
          if (
            response.data.data[0].services == "" ||
            response.data.data[0].services == null
          ) {
            this.compService = response.data.data[0].services;
          } else {
            this.compService = response.data.data[0].services.split(",");
          }
        });
    },
    selcitystate(data) {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          token: process.env.API_KEY
        }
      };
      this.axios
        .get(`${process.env.API_URL}/api-loadstatecity/${data}`, requestOptions)
        .then(response => {
          this.comp_State = response.data.data[0].state;
          this.comp_City = response.data.data[0].city;
        });
    },
    loadsurgical() {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          token: process.env.API_KEY
        }
      };
      this.axios
        .get(`${process.env.API_URL}/api-loadcompetitorsurgery`, requestOptions)
        .then(response => {
console.log(reponse.data);
        });
    }
  }
};
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
