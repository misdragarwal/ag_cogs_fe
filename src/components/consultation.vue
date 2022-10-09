<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-toolbar-title>NewConsultation </v-toolbar-title>
          <v-divider class="mx-2 black" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-menu absolute ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="200px">
            <v-text-field slot="activator" v-model="date" placeholder="Select Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="date" no-title scrollable min="2018-04-01" :max="today" backgroundRevenue-color="grey" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date);apiRequestOPDConsultSuper(date)" style="outline:none">Generate</v-btn>
            </v-date-picker>





          </v-menu>
          <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelconsultationSuper">
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
                <th class="text-xs-left" width="15%" scope="col" rowspan="2">Branch</th>
                <th class="text-xs-center" scope="col" colspan="2">New OPD</th>
                <th class="text-xs-center" scope="col" colspan="2">Bill Count</th>
              </tr>
              <tr class="grey lighten-2">
                <th scope="col" class="text-xs-center">FTD</th>
                <th scope="col" class="text-xs-center">MTD</th>
                <th scope="col" class="text-xs-center">FTD</th>
                <th scope="col" class="text-xs-center">MTD</th>
              </tr>
            </thead>
            <tbody v-if="user_role=='super_user'">

              <tr scope="row" v-for="(item,index) in group" :key="index+item.branch" class="font-weight-black allindiagroup">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>

                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in alin" :key="index+item.branch" class="font-weight-black allindiagroup">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>

                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in aeh" :key="index+item.branch" class="font-weight-black allindiagroup">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in ahc" :key="index+item.branch" class="font-weight-black allindiagroup">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>


              <tr scope="row" v-for="(item,index) in ohc" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="text-xs-left" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" class="font-weight-black branchesgrp">
                <td scope="row" :class="text-xs-left">AEH</td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>

              </tr>
              <tr scope="row" v-for="(item,index) in cmh" :key="index+item.branch" class="font-weight-black">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in aeh_chennai" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in aeh_chennai_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kanchi_vel" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kanchi_vel_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kum_ney_vil" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kum_ney_vil_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in dha_salem_krish" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in dha_salem_krish_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in erod_hosure" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in erod_hosure_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in jaipur" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" class="font-weight-black allindiagroup">
                <td scope="row" :class="text-xs-left" style="cursor:pointer">AHC </td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>

              </tr>
              <tr scope="row" v-for="(item,index) in ahc_chennai" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in ahc_chennai_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <!-- <tr
                  scope="row"
                  v-for="(item,index) in amb"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdcount}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdcount}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdconsultcount}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdconsultcount}}</td>

                </tr> -->


              <tr scope="row" v-for="(item,index) in pondycherry" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="'text-xs-left'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>


              <tr scope="row" v-for="(item,index) in tirunelveli" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in coimbatore" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="'text-xs-left'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>




              <tr scope="row" v-for="(item,index) in tuti_madurai" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in tuti_madurai_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in trichy" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in thanjavur" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in andaman" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>


              <tr scope="row" v-for="(item,index) in tiruppur" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="'text-xs-left'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in karnataka" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in banglore" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in banglore_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in hub_mys" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in hub_mys_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in maharashtra" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <!--<tr scope="row" v-for="(item,index) in maharashtra_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>-->
			  
			  <tr scope="row" v-for="(item,index) in mumbai" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in mumbai_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
			  
			  <tr scope="row" v-for="(item,index) in rest_of_maharashtra" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in rest_of_maharashtra_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>









              <tr scope="row" v-for="(item,index) in telangana" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in hyderabad" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in hyderabad_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in andhra" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in andhra_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in roi" :key="index+item.branch" class="rotgrp" style="font-weight: 900!important;">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer;color : #ffffff!important;font-weight: 900!important;">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kerla" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kerla_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kolk" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kolk_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>




              <tr scope="row" v-for="(item,index) in ahmedabad" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in madhyapradesh" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in madhyapradesh_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in odisha" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in odisha_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <!-- <tr
                  scope="row"
                  v-for="(item,index) in amb"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdcount}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdcount}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdconsultcount}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdconsultcount}}</td>

                </tr> -->



              <tr scope="row" class="font-weight-black ochfont">
                <td scope="row" :class="text-xs-left" style="cursor:pointer">OHC:</td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>

              </tr>


              <tr scope="row" v-for="(item,index) in madagascar" :key="index+item.branch" class="ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in mozambique" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in mozambique_branches" :key="index+item.branch" class="grey lighten-4 ">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>
              </tr>

              <tr scope="row" v-for="(item,index) in rwanda" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in rwanda_branches" :key="index+item.branch" class="grey lighten-4 ">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>
              </tr>

              <tr scope="row" v-for="(item,index) in nigeria" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>


              <tr scope="row" v-for="(item,index) in mauritius" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in mauritius_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>
              </tr>
              <tr scope="row" v-for="(item,index) in zambia" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in ghana" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in nairobi" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in uganda" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in tanzania" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>


            </tbody>

            <tbody v-if="user_role=='indian_user'">


              <tr scope="row" v-for="(item,index) in alin" :key="index+item.branch" class="font-weight-black allindiagroup">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>

                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in aeh" :key="index+item.branch" class="font-weight-black allindiagroup">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in ahc" :key="index+item.branch" class="font-weight-black allindiagroup">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" class="font-weight-black branchesgrp">
                <td scope="row" :class="text-xs-left">AEH:</td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>

              </tr>
              <tr scope="row" v-for="(item,index) in cmh" :key="index+item.branch" class="font-weight-black">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in aeh_chennai" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in aeh_chennai_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kanchi_vel" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kanchi_vel_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kum_ney_vil" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kum_ney_vil_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in dha_salem_krish" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in dha_salem_krish_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in erod_hosure" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in erod_hosure_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in jaipur" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" class="font-weight-black allindiagroup">
                <td scope="row" :class="text-xs-left" style="cursor:pointer">AHC:</td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>
                <td scope="row" class="text-xs-center"></td>

              </tr>
              <tr scope="row" v-for="(item,index) in ahc_chennai" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in ahc_chennai_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <!-- <tr
                  scope="row"
                  v-for="(item,index) in amb"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdcount}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdcount}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdconsultcount}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdconsultcount}}</td>

                </tr> -->

              <tr scope="row" v-for="(item,index) in pondycherry" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="'text-xs-left'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in tirunelveli" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in coimbatore" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="'text-xs-left'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in tuti_madurai" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in tuti_madurai_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in trichy" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in thanjavur" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in andaman" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>



              <tr scope="row" v-for="(item,index) in tiruppur" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="'text-xs-left'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in karnataka" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in banglore" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in banglore_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in hub_mys" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in hub_mys_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in maharashtra" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in maharashtra_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>










              <tr scope="row" v-for="(item,index) in telangana" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in hyderabad" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in hyderabad_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in andhra" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in andhra_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in roi" :key="index+item.branch" class="rotgrp" style="font-weight: 900!important;">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer;color : #ffffff!important;font-weight: 900!important;">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in triv" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kolk" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in kolk_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>


              <tr scope="row" v-for="(item,index) in ahmedabad" :key="index+item.branch" class="font-weight-black branchesgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in indore" :key="index+item.branch" class="font-weight-black">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in odisha" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in odisha_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
            </tbody>


            <tbody v-if="user_role=='overseas_user'">


              <tr scope="row" v-for="(item,index) in ohc" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="text-xs-left" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in madagascar" :key="index+item.branch" class="ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in mozambique" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in mozambique_branches" :key="index+item.branch" class="grey lighten-4 ">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>
              </tr>



              <!-- <tr
                  scope="row"
                  v-for="(item,index) in rwanda"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdcount}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdcount}}</td>
           <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdconsultcount}}</td>
          <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdconsultcount}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in rwanda_branches"
                  :key="index+item.branch"
                  class="grey lighten-4 "
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdcount}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdcount}}</td>
           <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdconsultcount}}</td>
          <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdconsultcount}}</td>
        </tr>
 -->

              <!-- <tr
                  scope="row"
                  v-for="(item,index) in rwanda"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
           <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
          <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
              <tr scope="row" v-for="(item,index) in mauritius" :key="index+item.branch" class="font-weight-black rotgrp">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdrev}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdrev}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdrevlastyear}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdpercentage}}</td>

              </tr>
              <tr scope="row" v-for="(item,index) in mauritius_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdrev}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdrev}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdrevlastyear}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdpercentage}}</td>
              </tr>

              <tr scope="row" v-for="(item,index) in mauritius_branches" :key="index+item.branch" class="grey lighten-4">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>
              </tr>
              <tr scope="row" v-for="(item,index) in zambia" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in ghana" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in nairobi" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in uganda" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

              </tr>

              <tr scope="row" v-for="(item,index) in tanzania" :key="index+item.branch" class="font-weight-black ochfont">
                <td scope="row" :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'" style="cursor:pointer">{{item.branch}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdopdcount}}</td>
                <td scope="row" class="text-xs-center">{{item.ftdconsultcount}}</td>
                <td scope="row" class="text-xs-center">{{item.mtdconsultcount}}</td>

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
import {
  serverBus
} from "../main";
export default {
  data: () => ({


    // ftdotcount: null,
    // mtdotcount: null,
    // cogsftdotcount: null,
    // cogsmtdotcount: null,
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
    date: null,
    menu: false,
    modal: false,
    menu2: false,
    today: "",
    alin: null,
    group: null,
    cmh: null,
    aeh_chennai: null,
    aeh_chennai_branches: null,
    aeh: null,
    ahc: null,
    ohc: null,
    kanchi_vel: null,
    kanchi_vel_branches: null,
    kum_ney_vil: null,
    kum_ney_vil_branches: null,
    dha_salem_krish: null,
    dha_salem_krish_branches: null,
    erod_hosure: null,
    erod_hosure_branches: null,
    jaipur: null,
    madurai: null,
    ahc_chennai: null,
    ahc_chennai_branches: null,
    tirunelveli: null,
    coimbatore: null,
    tuti_madurai: null,
    tuti_madurai_branches: null,
    trichy: null,
    thanjavur: null,
    andaman: null,
    karnataka: null,
    banglore: null,
    banglore_branches: null,
    hub_mys: null,
    hub_mys_branches: null,
    telangana: null,
    hyderabad: null,
    hyderabad_branches: null,
    andhra: null,
    andhra_branches: null,
    roi: null,
    kerla: null,
    kerla_branches: null,
    kolk: null,
    kolk_branches: null,
    ahmedabad: null,
    madhyapradesh: null,
    madhyapradesh_branches: null,
    odisha: null,
    odisha_branches: null,
    maharashtra: null,
    maharashtra_branches: null,
	mumbai:null,
	mumbai_branches:null,
	rest_of_maharashtra:null,
	rest_of_maharashtra_branches:null,
	
    pondycherry: null,
    tiruppur: null,
    madagascar: null,
    mozambique: null,
    mozambique_branches: null,
    nigeria: null,
    rwanda: null,
    rwanda_branches: null,
    mauritius: null,
    mauritius_branches: null,
    zambia: null,
    ghana: null,
    nairobi: null,
    uganda: null,
    tanzania: null,
    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {
      "Group/Branch": "branch",
      "FTD": "ftdopdcount",
      "MTD": "mtdopdcount",
      "FTDConsultation": "ftdconsultcount",
      "MTDConsultation": "mtdconsultcount",


    },
    fileName: null
  }),
  created() {
    this.getToday();
  },
  methods: {
    getToday() {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },
    apiRequestOPDConsultSuper(date) {
      // let superUserName = sessionStorage.getItem("super_user");
      if (date !== null) {
        this.fileDate = date;
        this.fileName = `NewOPDConsultation_Report_${this.fileDate}.csv`;
        this.loading = true;
        this.isLoading = true;
        this.$http
          .get(`https://mis.dragarwal.com/api-consultation-super/${date}`)
          //.get(`http://localhost:8888/api-consultation-super/${date}`)
          .then(response => {
            this.processDataOPDCONSULTSuper(response.data);
            console.log(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processDataOPDCONSULTSuper(data) {
      if ((sessionStorage.getItem('group_user')) || (sessionStorage.getItem('admin_user'))) {
        this.user_role = 'super_user';
      } else if (sessionStorage.getItem('overseas_user')) {
        this.user_role = 'overseas_user';
      } else if (sessionStorage.getItem('domestic_user')) {
        this.user_role = 'indian_user';
      }

        console.log(data);
      this.group = [data.group];
      this.alin = [data.alin];
      this.aeh = [data.aeh];
      this.ahc = [data.ahc];
      this.ohc = [data.ohc];
      // this.cmh = [data.aehgroup["Chennai Main Hospital"]];
      this.cmh = data.branchwise["Chennai Main Hospital"];
      this.aeh_chennai = [data.aehgroup["Chennai Branches"]];
      this.aeh_chennai_branches = data.branchwise["Chennai Branches"];
      this.kanchi_vel = [data.aehgroup["Kanchi + Vellore"]];
      this.kanchi_vel_branches = data.branchwise["Kanchi + Vellore"];
      this.kum_ney_vil = [data.aehgroup["Kum + Ney + Vil"]];
      this.kum_ney_vil_branches = data.branchwise["Kum + Ney + Vil"];
      this.dha_salem_krish = [data.aehgroup["Dha + Salem + Krish"]];
      this.dha_salem_krish_branches = data.branchwise["Dha + Salem + Krish"];
      this.erod_hosure = [data.aehgroup["Erode + Hosur"]];
      this.erod_hosure_branches = data.branchwise["Erode + Hosur"];
      // this.jaipur = [data.aehgroup["Jaipur"]];
      this.jaipur = data.branchwise["Jaipur"];
      this.madurai = [data.aehgroup["Madurai KK Nagar"]];
      this.ahc_chennai = [data.ahcgroup["Chennai branches"]];
      this.ahc_chennai_branches = data.branchwise["Chennai branches"];
      // this.tirunelveli = [data.ahcgroup["Tirunelveli"]];
      this.tirunelveli = data.branchwise["Tirunelveli"];
      this.coimbatore = data.branchwise["Coimbatore"];

      this.tuti_madurai = [data.ahcgroup["Tuticorin + Madurai"]];
      this.tuti_madurai_branches = data.branchwise[
        "Tuticorin + Madurai"
      ].concat(data.branchwise["Madurai KK Nagar"]);
      // this.trichy = [data.ahcgroup["Trichy"]];
      this.trichy = data.branchwise["Trichy"];
      // this.thanjavur = [data.ahcgroup["Thanjavur"]];
      this.thanjavur = data.branchwise["Thanjavur"];
      this.andaman = [data.ahcgroup["Port Blair"]];
      this.karnataka = [data.ahcgroup["Karnataka"]];
      this.banglore = [data.ahcgroup["Banglore"]];
      this.banglore_branches = data.branchwise["Banglore"];
      this.hub_mys = [data.ahcgroup["Hubli + Mysore"]];
      this.hub_mys_branches = data.branchwise["Hubli + Mysore"];
      this.telangana = [data.ahcgroup["Telangana"]];
      this.hyderabad = [data.ahcgroup["Hyderabad"]];
      this.hyderabad_branches = data.branchwise["Hyderabad"];
      this.andhra = [data.ahcgroup["Andhra Pradesh"]];
      this.andhra_branches = data.branchwise["Andhra Pradesh"];
      this.roi = [data.ahcgroup["Rest of India(incl. Jaipur)"]];
      // this.triv = [data.ahcgroup["Trivandrum"]];
      this.kerla = [data.ahcgroup["Kerala"]];
      this.kerla_branches = data.branchwise["Kerala"];
      this.kolk = [data.ahcgroup["Kolkata"]];
      this.kolk_branches = data.branchwise["Kolkata"];
      this.ahmedabad = data.branchwise["Ahmedabad"];
      this.madhyapradesh = [data.ahcgroup["Madhya Pradesh"]];
      this.madhyapradesh_branches = data.branchwise["Madhya Pradesh"];
      this.odisha = [data.ahcgroup["Odisha"]];
      this.odisha_branches = data.branchwise["Odisha"];
      this.maharashtra = [data.ahcgroup["Maharashtra"]];
      this.maharashtra_branches = data.branchwise["Maharashtra"];
	  this.maharashtra = [data.ahcgroup["Maharashtra"]];
      this.maharashtra_branches = data.branchwise["Maharashtra"];
	  this.mumbai = [data.ahcgroup["Mumbai"]];
      this.mumbai_branches = data.branchwise["Mumbai"];
	   this.rest_of_maharashtra = [data.ahcgroup["Rest of Maharashtra"]];
      this.rest_of_maharashtra_branches = data.branchwise["Rest of Maharashtra"];
      this.pondycherry = data.branchwise["Pondycherry"];
      this.tiruppur = data.branchwise["Tiruppur"];

      this.madagascar = data.branchwise["Madagascar"];

      this.mozambique = [data.ohcgroup["Mozambique"]];
      this.mozambique_branches = data.branchwise["Mozambique"];

      this.rwanda = [data.ohcgroup["Rwanda"]];
      this.rwanda_branches = data.branchwise["Rwanda"];


      this.nigeria = data.branchwise["Nigeria"];


      this.mauritius = [data.ohcgroup["Mauritius"]];
      this.mauritius_branches = data.branchwise["Mauritius"];
      this.zambia = data.branchwise["Zambia"];
      this.ghana = data.branchwise["Ghana"];
      this.nairobi = data.branchwise["Nairobi"];
      this.uganda = data.branchwise["Uganda"];
      this.tanzania = data.branchwise["Tanzania"];





      // this.amb = [data.ahcgroup["Ambattur"]];
      this.show = true;
    },
    downloadExcelconsultationSuper() {

      if (this.user_role == 'super_user') {
        let tempDataArr = [];
        if (this.fileDate !== null) {
          tempDataArr = this.group.concat(
            this.alin,
            this.aeh,
            this.ahc,
            this.cmh,
            this.aeh_chennai,
            this.aeh_chennai_branches,
            this.kanchi_vel,
            this.kanchi_vel_branches,
            this.kum_ney_vil,
            this.kum_ney_vil_branches,
            this.dha_salem_krish,
            this.dha_salem_krish_branches,
            this.erod_hosure,
            this.erod_hosure_branches,
            this.jaipur,
            this.ahc_chennai,
            this.ahc_chennai_branches,
            this.pondycherry,
            this.tirunelveli,
            this.coimbatore,
            this.tuti_madurai,
            this.tuti_madurai_branches,
            this.trichy,
            this.thanjavur,
            this.andaman,
            this.karnataka,
            this.banglore,
            this.banglore_branches,
            this.hub_mys,
            this.hub_mys_branches,
            this.maharashtra,
            //this.maharashtra_branches,
			this.mumbai,
			this.mumbai_branches,
			this.rest_of_maharashtra,
			this.rest_of_maharashtra_branches,
            this.telangana,
            this.hyderabad,
            this.hyderabad_branches,
            this.andhra,
            this.andhra_branches,
            this.roi,
            this.kerla,
            this.kerla_branches,
            this.kolk,
            this.kolk_branches,
            this.ahmedabad,
            this.madhyapradesh,
            this.madhyapradesh_branches,
            this.odisha,
            this.odisha_branches,
            this.madagascar,
            this.mozambique,
            this.mozambique_branches,
            this.rwanda,
            this.rwanda_branches,
            this.mauritius,
            this.mauritius_branches,
            this.zambia,
            this.ghana,
            this.nairobi,
            this.uganda,
            this.tanzania
            // this.amb
          );
          return tempDataArr;
        } else {
          return null;
        }
      } else if (this.user_role == 'overseas_user') {

        let tempDataArr = [];
        if (this.fileDate !== null) {
          tempDataArr = this.ohc.concat(
            this.madagascar,
            this.mozambique,
            this.mozambique_branches,
            this.rwanda,
            this.rwanda_branches,
            this.mauritius,
            this.mauritius_branches,
            this.zambia,
            this.ghana,
            this.nairobi,
            this.uganda,
            this.tanzania
            // this.amb
          );
          return tempDataArr;
        } else {
          return null;
        }
      } else {

        let tempDataArr = [];
        if (this.fileDate !== null) {
          tempDataArr = this.alin.concat(
            this.aeh,
            this.ahc,
            this.cmh,
            this.aeh_chennai,
            this.aeh_chennai_branches,
            this.kanchi_vel,
            this.kanchi_vel_branches,
            this.kum_ney_vil,
            this.kum_ney_vil_branches,
            this.dha_salem_krish,
            this.dha_salem_krish_branches,
            this.erod_hosure,
            this.erod_hosure_branches,
            this.jaipur,
            this.ahc_chennai,
            this.ahc_chennai_branches,
            this.pondycherry,
            this.tirunelveli,
            this.coimbatore,
            this.tuti_madurai,
            this.tuti_madurai_branches,
            this.trichy,
            this.thanjavur,
            this.andaman,
            this.karnataka,
            this.banglore,
            this.banglore_branches,
            this.hub_mys,
            this.hub_mys_branches,
            this.maharashtra,
            this.maharashtra_branches,
            this.telangana,
            this.hyderabad,
            this.hyderabad_branches,
            this.andhra,
            this.andhra_branches,
            this.roi,
            this.triv,
            this.kolk,
            this.kolk_branches,
            this.ahmedabad,
            this.madhyapradesh,
            this.madhyapradesh_branches,
            this.odisha,
            this.odisha_branches
            // this.amb
          );
          return tempDataArr;
        } else {
          return null;
        }
      }
    },

    changeColorOPDSuper(data) {
      if (data.code === undefined) {
        this.rowColor = "text-xs-center";
        return true;
      } else {
        if (
          [
            "CMH",
            "JPR",
            "TVL",
            "TRI",
            "TNJ",
            "PUN",
            "AHM"
          ].includes(data.code)
        ) {
          this.rowColor = "text-xs-center";
          return true;
        } else {
          this.rowColor = "text-xs-center grey lighten-1";
          return false;
        }
      }
    }
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
</style>
