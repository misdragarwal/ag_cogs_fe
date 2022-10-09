<template>
  <v-container
    fluid
    fill-height
    class="grey lighten-3"
  >
    <v-slide-y-transition mode="out-in">
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm10
          offset-sm1
          md10
          offest-md1
          lg10
          offset-lg1
        >
          <v-toolbar
            flat
            color="grey lighten-2"
          >
            <v-toolbar-title>Revenue (with Referral)</v-toolbar-title>
            <v-divider
              class="mx-2 black"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-menu
              absolute
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="200px"
            >
              <v-text-field
                slot="activator"
                v-model="date"
                placeholder="Select Date"
                prepend-inner-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker
                color="primary"
                v-model="date"
                no-title
                scrollable
                min="2018-04-01"
                :max="today"
                backgroundRevenueSuper-color="grey"
                style="box-shadow:none"
              >
                <v-spacer></v-spacer>
                <v-btn
                  flat
                  color="primary"
                  @click="menu = false"
                  style="outline:none"
                >Cancel</v-btn>
                <v-btn
                  flat
                  color="primary"
                  @click="$refs.menu.save(date);apiRequestRevenueSuper(date)"
                  style="outline:none"
                >Generate</v-btn>
              </v-date-picker>
            </v-menu>
            <download-excel
              :data="json_data"
              :fields="json_fields"
              type="csv"
              :name="fileName"
              :fetch="downloadExcelRevenueSuper"
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
            </download-excel>
          </v-toolbar>
          <loading
            :active.sync="isLoading"
            :is-full-page="fullPage"
            color="#7f0000"
            loader="bars"
          ></loading>
          <!-- Vuetify Data table -->
          <div class="table-responsive">
            <table
              class="table table-hover table-bordered"
              v-if="show"
            >
              <thead>
                <tr class="grey lighten-2">
                  <th
                    class="text-xs-left"
                    width="15%"
                    scope="col"
                    rowspan="2"
                  >Branch</th>
                  <th
                    class="text-xs-center"
                    scope="col"
                    colspan="5"
                  >FTD (₹ lacs)</th>
                  <th
                    class="text-xs-center"
                    scope="col"
                    colspan="5"
                  >MTD (₹ lacs)</th>
                </tr>
                <tr class="grey lighten-2">
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Pha</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Opt</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Ot</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Lab</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Total</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Pha</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Opt</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Ot</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Lab</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  scope="row"
                  v-for="(item,index) in alin"
                  :key="index+item.branch"
                  class="font-weight-black amber darken-1"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh"
                  :key="index+item.branch"
                  class="font-weight-black amber lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in cmh"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogRevenueSuper(item,cmh)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh_chennai"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                  <!-- <td scope="row" class="text-xs-center">{{item.mtd_cogs_percent.toFixed(2)}} %</td> -->
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,aeh_chennai_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kanchi_vel"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kanchi_vel_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,kanchi_vel_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kum_ney_vil"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kum_ney_vil_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,kum_ney_vil_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in dha_salem_krish"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in dha_salem_krish_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,dha_salem_krish_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in erod_hosure"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in erod_hosure_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,erod_hosure_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in jaipur"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogRevenueSuper(item,jaipur)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in ahc"
                  :key="index+item.branch"
                  class="font-weight-black amber lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in ahc_chennai"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in ahc_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,ahc_chennai_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                  <!-- <tr
                  scope="row"
                  v-for="(item,index) in amb"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,amb)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr> -->
				
				
				<tr
                  scope="row"
                  v-for="(item,index) in pondycherry"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"
                    @click="processDialogRevenueSuper(item,pondycherry)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
				
				
				
				
				
				
				
				
				
				
				
				
				
                <tr
                  scope="row"
                  v-for="(item,index) in tirunelveli"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogRevenueSuper(item,tirunelveli)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
				
				<tr
                  scope="row"
                  v-for="(item,index) in coimbatore"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"
                    @click="processDialogRevenueSuper(item,coimbatore)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
				
				
				
				
                <tr
                  scope="row"
                  v-for="(item,index) in tuti_madurai"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in tuti_madurai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,tuti_madurai_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in trichy"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogRevenueSuper(item,trichy)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in thanjavur"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogRevenueSuper(item,thanjavur)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
				
				
				<tr
                  scope="row"
                  v-for="(item,index) in tiruppur"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"
                    @click="processDialogRevenueSuper(item,tiruppur)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
				
				
				
				
                <tr
                  scope="row"
                  v-for="(item,index) in andaman"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in karnataka"
                  :key="index+item.branch"
                  class="font-weight-black indigo darken-1"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in banglore"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in banglore_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,banglore_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hub_mys"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hub_mys_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,hub_mys_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
				
				<tr
                  scope="row"
                  v-for="(item,index) in maharashtra"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in maharashtra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,maharashtra_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
				
				
				
				
                <tr
                  scope="row"
                  v-for="(item,index) in telangana"
                  :key="index+item.branch"
                  class="font-weight-black indigo darken-1"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hyderabad"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hyderabad_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,hyderabad_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in andhra"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in andhra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,andhra_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in roi"
                  :key="index+item.branch"
                  class="font-weight-black indigo darken-1"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                  <tr
                  scope="row"
                  v-for="(item,index) in kerla"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kerla_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,kerla_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kolk"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kolk_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,kolk_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
				
                <tr
                  scope="row"
                  v-for="(item,index) in ahmedabad"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogRevenueSuper(item,ahmedabad)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in madhyapradesh"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in madhyapradesh_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,madhyapradesh_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in odisha"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in odisha_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,odisha_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr>
                <!-- <tr
                  scope="row"
                  v-for="(item,index) in amb"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorRevenueSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogRevenueSuper(item,amb)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpharev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdoptrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdotrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlabrev| lakshFormatRevenueSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueSuper}}</td>
                </tr> -->
              </tbody>
            </table>
          </div>
          <v-dialog
            v-model="dialog"
            width="900"
          >
            <!-- style="overflow:auto;-webkit-overflow-scrolling:touch" -->
            <v-card class="grey lighten-2">
              <v-flex
                xs12
                class="text-xs-center subheading font-weight-black"
              >{{title}} - {{formatteddate}}</v-flex>
              <v-tabs
                show-arrows
                dark
                centered
                color="indigo darken-4"
              >
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-card-title class="title indigo darken-4 white--text primary-title">
                  <v-tab
                    v-for="item in items"
                    :key="item"
                  >
                    {{item}}
                  </v-tab>
                </v-card-title>
                <v-tabs-items>
                  <v-tab-item
                    v-for="item in items"
                    :key="item"
                  >
                    <div
                      class="table-responsive"
                      v-if="item === 'General'"
                    >
                      <table
                        class="table table-hover table-bordered table-condensed"
                        v-if="show"
                      >
                        <thead>
                          <tr class>
                            <th
                              class="text-xs-left"
                              width="15%"
                              scope="col"
                              rowspan="2"
                            ></th>
                            <th
                              class="text-xs-center"
                              scope="col"
                              colspan="8"
                            >FTD (₹ lacs)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-center"
                            >Total</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                            >Surgery</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                            >Opticals</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                            >Pharmacy</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                            >Lab</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                            >Consultation</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                            >Others</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in dialogdata"
                            :key="index+item.branch+'qweqwe'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left font-weight-black"
                            >Revenue</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdrev | lakshFormatRevenueSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center body-1"
                            >{{item.ftdotrev | lakshFormatRevenueSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdoptrev | lakshFormatRevenueSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdpharev | lakshFormatRevenueSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdlabrev | lakshFormatRevenueSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdconsultrev | lakshFormatRevenueSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdothersrev | lakshFormatRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="table-responsive"
                      v-if="item === 'Surgery'"
                    >
                      <table class="table table-striped table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >FTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in surgerydata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              width="33.33%"
                              class="text-xs-left"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.ftd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="table table-striped table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >MTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in mtdsurgerydata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              width="33.33%"
                              class="text-xs-left"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.mtd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="table-responsive"
                      v-if="item === 'Opticals'"
                    >
                      <table class="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >FTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in opticalsdata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="33.33%"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.ftd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >MTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in mtdopticalsdata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="33.33%"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.mtd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="table-responsive"
                      v-if="item === 'Pharmacy'"
                    >
                      <table class="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >FTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in pharmacydata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="33.33%"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.ftd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >MTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in mtdpharmacydata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="33.33%"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.mtd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="table-responsive"
                      v-if="item === 'Laboratory'"
                    >
                      <table class="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >FTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in laboratorydata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="33.33%"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.ftd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >MTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in mtdlaboratorydata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="33.33%"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.mtd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="table-responsive"
                      v-if="item === 'Consultation'"
                    >
                      <table class="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >FTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in consultdata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="33.33%"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.ftd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >MTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in mtdconsultdata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="33.33%"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.mtd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="table-responsive"
                      v-if="item === 'Others'"
                    >
                      <table class="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >FTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in otherdata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="33.33%"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.ftd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="table table-striped table-hover table-bordered table-condensed">
                        <thead>
                          <tr>
                            <th
                              colspan="3"
                              scope="col"
                              class="text-xs-center"
                            >MTD (₹)</th>
                          </tr>
                          <tr class>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="33.33%"
                            >Group</th>
                            <th
                              scope="col"
                              class="text-xs-left"
                              width="40%"
                            >Sub Group</th>
                            <th
                              scope="col"
                              class="text-xs-center"
                              width="26.67%"
                            >Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            scope="row"
                            v-for="(item,index) in mtdotherdata"
                            :key="index+item.branch+'qweqwekkjaskj'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="33.33%"
                            >
                              {{item.group}}
                            </td>
                            <td
                              scope="row"
                              class="text-xs-left"
                              width="40%"
                            >{{item.subgroup}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                              width="26.67%"
                            >{{item.mtd | roundRevenueSuper}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black--text" flat @click="dialog = false">
                  Close
                </v-btn>
              </v-card-actions>-->
            </v-card>
          </v-dialog>
          <back-to-top
            bottom="90px"
            right="90px"
          >
            <v-btn
              class="red darken-4"
              dark
              absolute
              fab
              small
            >
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
export default {
  data: () => ({
    threshold_percentage: {
      surgeryMin: 11,
      surgeryMax: 13,
      opticalsMin: 35,
      opticalsMax: 40,
      laboratoryMin: 11,
      laboratoryMax: 13,
      pharmacyMin: 65,
      pharmacyMax: 70
    },
    superMappings: null,
    superGlobalstore: null,
    // ftdotcount: null,
    // mtdotcount: null,
    // cogsftdotcount: null,
    // cogsmtdotcount: null,
    userName: null,
    isLoading: false,
    fullPage: true,
    dialog: false,
    dialogdata: null,
    title: null,
    formatteddate: null,
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
    cmh: null,
    aeh_chennai: null,
    aeh_chennai_branches: null,
    aeh: null,
    ahc: null,
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
    madhyapradesh :null,
	madhyapradesh_branches :null,
    odisha: null,
    odisha_branches: null,
	maharashtra :null,
	maharashtra_branches :null,
	pondycherry :null,
	tiruppur : null,
    json_data: null,
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
    json_fields: {
      "Group/Branch": "branch",
      "FTD Pharmacy": "ftdpharev",
      "FTD Opticals": "ftdoptrev",
      "FTD Operation Theatre": "ftdotrev",
      "FTD Laboratory": "ftdlabrev",
      "FTD Revenue": "ftdrev",
      "MTD Pharmacy": "mtdpharev",
      "MTD Opticals": "mtdoptrev",
      "MTD Operation Theatre": "mtdotrev",
      "MTD Laboratory": "mtdlabrev",
      "MTD Revenue": "mtdrev"
    },
    fileName: null,
    surgerydata: null,
    pharmacydata: null,
    opticalsdata: null,
    laboratorydata: null,
    consultdata: null,
    otherdata: null,
    mtdsurgerydata: null,
    mtdpharmacydata: null,
    mtdopticalsdata: null,
    mtdlaboratorydata: null,
    mtdconsultdata: null,
    mtdotherdata: null,
    tab: null,
    items: [
      'Surgery', 'Opticals', 'Pharmacy', 'Laboratory', 'Consultation', 'Others'
    ],
  }),
  created () {
    this.getToday();
  },
  methods: {
    getToday () {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },
    apiRequestRevenueSuper (date) {
      // let superUserName = sessionStorage.getItem("super_user");
      if (date !== null) {
        this.fileDate = date;
        this.fileName = `Revenue_Report_${this.fileDate}.csv`;
        this.loading = true;
        this.isLoading = true;
        this.$http
          .get(`https://mis.dragarwal.com/api-revenue-super/${date}`)
         //.get(`http://localhost:8888/api-revenue-super/${date}`)
                    .then(response => {
            this.processDataRevenueSuper(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processDataRevenueSuper (data) {
      this.alin = [data.alin];
      this.aeh = [data.aeh];
      this.ahc = [data.ahc];
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
      this.kerla = [data.ahcgroup["Kerala"]];
      this.kerla_branches = data.branchwise["Kerala"];	
      this.kolk = [data.ahcgroup["Kolkata"]];
      this.kolk_branches = data.branchwise["Kolkata"];
      this.ahmedabad = data.branchwise["Ahmedabad"];
      this.madhyapradesh = [data.ahcgroup["Madhya Pradesh"]];
      this.madhyapradesh_branches = data.branchwise["Madhya Pradesh"];
      this.odisha = [data.ahcgroup["Odisha"]];
      this.odisha_branches = data.branchwise["Odisha"];
	  this.pondycherry = data.branchwise["Pondycherry"];
	  this.tiruppur = data.branchwise["Tiruppur"];	  
	  this.maharashtra = [data.ahcgroup["Maharashtra"]];
      this.maharashtra_branches = data.branchwise["Maharashtra"];	  
      // this.amb = [data.ahcgroup["Ambattur"]];
      this.show = true;
    },
    downloadExcelRevenueSuper () {
      let tempDataArr = [];
      if (this.fileDate !== null) {
        tempDataArr = this.alin.concat(
          this.aeh,
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
          this.ahc,
          this.ahc_chennai,
          this.ahc_chennai_branches,
		  this.pondycherry,
          this.tirunelveli,
		  this.coimbatore,		  
          this.tuti_madurai,
          this.tuti_madurai_branches,
          this.trichy,
          this.thanjavur,
		  this.tiruppur,
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
          this.kerla,
		  this.kerla_branches,
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
    },
    processDialogRevenueSuper (item, group) {
      if (item.code === undefined) {
        this.dialog = false;
        this.dialogdata = _.filter(group, { branch: item.branch });
        // this.ftdotcount = this.dialogdata[0].ftdotcount;
        // this.mtdotcount = this.dialogdata[0].mtdotcount;
        // this.cogsftdotcount = this.dialogdata[0].cogsftdotcount;
        // this.cogsmtdotcount = this.dialogdata[0].cogsmtdotcount;
        let tempsurg = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'SURGERY' }), 'group')
        let temppha = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'PHARMACY' }), 'group')
        let tempopt = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'OPTICALS' }), 'group')
        let templab = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'LABORATORY' }), 'group')
        let tempconsult = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'CONSULTATION' }), 'group')
        let tempothers = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, (collection) => {
          return !_.includes(['SURGERY', 'PHARMACY', 'OPTICALS', 'LABORATORY', 'CONSULTATION'], collection.unit)
        }), 'group')
        if (tempsurg.length !== 0) {
          this.surgerydata = tempsurg
        }
        else {
          this.surgerydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (temppha.length !== 0) {
          this.pharmacydata = temppha
        }
        else {
          this.pharmacydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (tempopt.length !== 0) {
          this.opticalsdata = tempopt
        }
        else {
          this.opticalsdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (templab.length !== 0) {
          this.laboratorydata = templab
        }
        else {
          this.laboratorydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (tempconsult.length !== 0) {
          this.consultdata = tempconsult
        }
        else {
          this.consultdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (tempothers.length !== 0) {
          this.otherdata = tempothers
        }
        else {
          this.otherdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        let tempmtdsurg = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'SURGERY' }), 'group')
        let tempmtdpha = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'PHARMACY' }), 'group')
        let tempmtdopt = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'OPTICALS' }), 'group')
        let tempmtdlab = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'LABORATORY' }), 'group')
        let tempmtdconsult = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'CONSULTATION' }), 'group')
        let tempmtdothers = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, (collection) => {
          return !_.includes(['SURGERY', 'PHARMACY', 'OPTICALS', 'LABORATORY', 'CONSULTATION'], collection.unit)
        }), 'group')
        if (tempmtdsurg.length !== 0) {
          this.mtdsurgerydata = tempmtdsurg
        }
        else {
          this.mtdsurgerydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdpha.length !== 0) {
          this.mtdpharmacydata = tempmtdpha
        }
        else {
          this.mtdpharmacydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdopt.length !== 0) {
          this.mtdopticalsdata = tempmtdopt
        }
        else {
          this.mtdopticalsdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdlab.length !== 0) {
          this.mtdlaboratorydata = tempmtdlab
        }
        else {
          this.mtdlaboratorydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdconsult.length !== 0) {
          this.mtdconsultdata = tempmtdconsult
        }
        else {
          this.mtdconsultdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdothers.length !== 0) {
          this.mtdotherdata = tempmtdothers
        }
        else {
          this.mtdotherdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        this.dialog = true;
        this.title = item.branch;
        this.formatteddate = moment(this.date).format("MMMM Do YYYY");
      } else {
        this.dialogdata = _.filter(group, { branch: item.branch });
        // this.ftdotcount = this.dialogdata[0].ftdotcount;
        // this.mtdotcount = this.dialogdata[0].mtdotcount;
        // this.cogsftdotcount = this.dialogdata[0].cogsftdotcount;
        // this.cogsmtdotcount = this.dialogdata[0].cogsmtdotcount;
        let tempsurg = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'SURGERY' }), 'group')
        let temppha = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'PHARMACY' }), 'group')
        let tempopt = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'OPTICALS' }), 'group')
        let templab = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'LABORATORY' }), 'group')
        let tempconsult = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'CONSULTATION' }), 'group')
        let tempothers = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, (collection) => {
          return !_.includes(['SURGERY', 'PHARMACY', 'OPTICALS', 'LABORATORY', 'CONSULTATION'], collection.unit)
        }), 'group')
        if (tempsurg.length !== 0) {
          this.surgerydata = tempsurg
        }
        else {
          this.surgerydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (temppha.length !== 0) {
          this.pharmacydata = temppha
        }
        else {
          this.pharmacydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (tempopt.length !== 0) {
          this.opticalsdata = tempopt
        }
        else {
          this.opticalsdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (templab.length !== 0) {
          this.laboratorydata = templab
        }
        else {
          this.laboratorydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (tempconsult.length !== 0) {
          this.consultdata = tempconsult
        }
        else {
          this.consultdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (tempothers.length !== 0) {
          this.otherdata = tempothers
        }
        else {
          this.otherdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        let tempmtdsurg = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'SURGERY' }), 'group')
        let tempmtdpha = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'PHARMACY' }), 'group')
        let tempmtdopt = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'OPTICALS' }), 'group')
        let tempmtdlab = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'LABORATORY' }), 'group')
        let tempmtdconsult = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'CONSULTATION' }), 'group')
        let tempmtdothers = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, (collection) => {
          return !_.includes(['SURGERY', 'PHARMACY', 'OPTICALS', 'LABORATORY', 'CONSULTATION'], collection.unit)
        }), 'group')
        if (tempmtdsurg.length !== 0) {
          this.mtdsurgerydata = tempmtdsurg
        }
        else {
          this.mtdsurgerydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdpha.length !== 0) {
          this.mtdpharmacydata = tempmtdpha
        }
        else {
          this.mtdpharmacydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdopt.length !== 0) {
          this.mtdopticalsdata = tempmtdopt
        }
        else {
          this.mtdopticalsdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdlab.length !== 0) {
          this.mtdlaboratorydata = tempmtdlab
        }
        else {
          this.mtdlaboratorydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdconsult.length !== 0) {
          this.mtdconsultdata = tempmtdconsult
        }
        else {
          this.mtdconsultdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdothers.length !== 0) {
          this.mtdotherdata = tempmtdothers
        }
        else {
          this.mtdotherdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        this.dialog = true;
        this.title = item.branch;
        this.formatteddate = moment(this.date).format("MMMM Do YYYY");
      }
    },
    cogsPercentRevenueSuper (cogs, revenue) {
      if ((cogs !== 0 && revenue !== 0) || (cogs === 0 && revenue !== 0)) {
        return ((cogs / revenue) * 100).toFixed(2);
      } else if (revenue === 0 || (cogs === 0 && revenue === 0)) {
        return 0.0;
      }
    },
    cogsByRevenueSuper (cogs, revenue) {
      if ((cogs !== 0 && revenue !== 0) || (cogs === 0 && revenue !== 0)) {
        return (cogs / revenue).toFixed(2);
      } else if (revenue === 0 || (cogs === 0 && revenue === 0)) {
        return 0.0;
      }
    },
    changeColorRevenueSuper (data) {
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
    },
    thresholdRevenueSuper (cogs, rev, unit) {
      if (unit === "surgery") {
        if (
          this.cogsPercentRevenueSuper(cogs, rev) <=
          this.threshold_percentage.surgeryMax &&
          this.cogsPercentRevenueSuper(cogs, rev) >=
          this.threshold_percentage.surgeryMin
        ) {
          this.chip1 = false;
          return false;
        } else {
          return true;
        }
      } else if (unit === "opticals") {
        if (
          this.cogsPercentRevenueSuper(cogs, rev) <=
          this.threshold_percentage.opticalsMax &&
          this.cogsPercentRevenueSuper(cogs, rev) >=
          this.threshold_percentage.opticalsMin
        ) {
          this.chip2 = false;
          return false;
        } else {
          return true;
        }
      } else if (unit === "laboratory") {
        if (
          this.cogsPercentRevenueSuper(cogs, rev) <=
          this.threshold_percentage.laboratoryMax &&
          this.cogsPercentRevenueSuper(cogs, rev) >=
          this.threshold_percentage.laboratoryMin
        ) {
          this.chip3 = false;
          return false;
        } else {
          return true;
        }
      } else if (unit === "pharmacy") {
        if (
          this.cogsPercentRevenueSuper(cogs, rev) <=
          this.threshold_percentage.pharmacyMax &&
          this.cogsPercentRevenueSuper(cogs, rev) >=
          this.threshold_percentage.pharmacyMin
        ) {
          this.chip4 = false;
          return false;
        } else {
          return true;
        }
      }
    }
  },
  filters: {
    lakshFormatRevenueSuper (num) {
      return (Number(num) / 100000).toFixed(2);
    },
    roundRevenueSuper (dat) {
      if (typeof (dat) === 'string') return dat
      else return Math.round(dat).toLocaleString()
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
.table-striped > tbody > tr:nth-child(2n + 2) > td,
.table-striped > tbody > tr:nth-child(2n + 2) > th {
  background-color: #e5e5f2;
  touch-action: none;
}
</style>
