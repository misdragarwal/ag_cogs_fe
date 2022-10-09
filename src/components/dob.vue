<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-toolbar-title>Patient Birthday</v-toolbar-title>
          <v-divider class="mx-2 black" inset vertical></v-divider>

          <v-spacer></v-spacer>
          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="200px">
            <v-text-field slot="activator" v-model="fromdate" placeholder="Select Birth Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="fromdate" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>

          <v-btn rounded color="primary" dark @click="apiRequestdob(fromdate)">Generate</v-btn>



        </v-toolbar>
        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>

        <table align="center" class="table table-hover table-bordered" v-if="show">
          <thead>
            <tr>
              <th class="text-left">MRN</th>
              <th class="text-left">Patient Name</th>
              <th class="text-left">Gender</th>
              <th class="text-left">Mobile</th>
              <th class="text-left">Register date</th>
              <th class="text-left">Age</th>
              <th class="text-left">Date of Birth</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dobdetail" :key="item.name">
              <td>{{ item.PATIENTID }}</td>
              <td>{{ item.PATNAME }}</td>
              <td>{{ item.GENDER }}</td>
              <td>{{ item.MOBILENO }}</td>
              <td>{{ item.REGISTEREDDATE }}</td>
              <td>{{ item.AGE }}</td>
              <td>{{ item.DOB }}</td>

            </tr>
          </tbody>
        </table>



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
    minDate: "2020-04-01",
      today: "",
    isLoading: false,
    fullPage: true,
    fromdate: null,
    menu1: false,
    dobdetail: '',
    show: false,
  }),
  methods: {
    apiRequestdob(date) {
      console.log(date);
      if (date == null) {
        alert("please select date")
        return false;
      }
      this.isLoading = true;
      this.$http.get(`https://mis.dragarwal.com/api-getdob/${date}`).then(response => {
        this.dobdetail = response.data;
        console.log(this.dobdetail);
        this.show = true;
        this.isLoading = false;
      })
    }

  }
}
</script>
