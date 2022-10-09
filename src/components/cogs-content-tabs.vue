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
            <v-toolbar-title>Cogs Vs Revn (without Referral)</v-toolbar-title>
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
                background-color="grey"
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
                  @click="$refs.menu.save(date);apiRequestSuper(date)"
                  style="outline:none"
                >Generate</v-btn>
              </v-date-picker>
            </v-menu>
            <download-excel
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
                    colspan="7"
                  >FTD (₹ lacs)</th>
                  <th
                    class="text-xs-center"
                    scope="col"
                    colspan="7"
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
                  >Revenue</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Cogs%</th>
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
                  >Revenue</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Cogs%</th>
                </tr>
              </thead>
              <tbody>
			  
			  
			   <tr v-if="user_role=='group_user'"
                  scope="row"
                  v-for="(item,index) in group"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}} <!--[All Currency]--></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in alin"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in aeh"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				<tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in ahc"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in ohc"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}} <!--[All Currency]--></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
				
				<tr v-if="user_role!='overseas_user'"
                  scope="row"                 
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"
                    
                  >AEH:</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  
                </tr>
				
				
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in cmh"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,cmh)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <!-- <td scope="row" :class="[{'red darken-4 white--text':isless(item.branch,item.ftd_cogs_percent)},'text-xs-center']">{{item.ftd_cogs_percent.toFixed(2)}} %</td> -->
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                  <!-- <td scope="row" class="text-xs-center">{{item.mtd_cogs_percent.toFixed(2)}} %</td> -->
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in aeh_chennai"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <!-- <td scope="row" :class="[{'red darken-4 white--text':isless(item.branch,item.ftd_cogs_percent)},'text-xs-center']">{{item.ftd_cogs_percent.toFixed(2)}} %</td> -->
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                  <!-- <td scope="row" class="text-xs-center">{{item.mtd_cogs_percent.toFixed(2)}} %</td> -->
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in aeh_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,aeh_chennai_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in kanchi_vel"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in kanchi_vel_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,kanchi_vel_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in kum_ney_vil"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in kum_ney_vil_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,kum_ney_vil_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in dha_salem_krish"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in dha_salem_krish_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,dha_salem_krish_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in erod_hosure"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in erod_hosure_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,erod_hosure_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in jaipur"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,jaipur)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <!-- <tr scope="row" v-for="(item,index) in madurai" :key="index+item.branch" class="font-weight-black indigo lighten-2">
                  <td scope="row" class="text-xs-left">{{item.branch}}</td>
                  <td scope="row" class="text-xs-center">{{item.ftdpha| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.ftdopt| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.ftdot| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.ftdlab| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.ftd| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.ftdrev| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td scope="row" class="text-xs-center">{{item.mtdpha| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.mtdopt| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.mtdot| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.mtdlab| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.mtd| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.mtdrev| lakhFormatSuper}}</td>
                  <td scope="row" class="text-xs-center">{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>-->
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
               
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row" 
                    class="text-xs-left"					
                    style="cursor:pointer"
                  >AHC:</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in ahc_chennai"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in ahc_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,ahc_chennai_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				<tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in pondycherry"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,pondycherry)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in tirunelveli"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,tirunelveli)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				 <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in coimbatore"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,coimbatore)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in tuti_madurai"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in tuti_madurai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,tuti_madurai_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in trichy"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,trichy)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in thanjavur"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,thanjavur)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				<tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in tiruppur"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,tiruppur)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
				
				
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in andaman"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in karnataka"
                  :key="index+item.branch"
                  class="font-weight-black indigo darken-1"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in banglore"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in banglore_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,banglore_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in hub_mys"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in hub_mys_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,hub_mys_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
				<tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in maharashtra"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <!-- <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in maharashtra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,maharashtra_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>-->
				
				
				
				<tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in mumbai"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in mumbai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,mumbai_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				<tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in rest_of_maharashtra"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in rest_of_maharashtra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,rest_of_maharashtra_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in telangana"
                  :key="index+item.branch"
                  class="font-weight-black indigo darken-1"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in hyderabad"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in hyderabad_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,hyderabad_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in andhra"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in andhra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,andhra_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in roi"
                  :key="index+item.branch"
                  class="font-weight-black indigo darken-1"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in kerla"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in kerla_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,kerla_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in kolk"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in kolk_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,kolk_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>

               
				
				
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in ahmedabad"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,ahmedabad)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in madhyapradesh"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in madhyapradesh_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,madhyapradesh_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in odisha"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
                <tr v-if="user_role!='overseas_user'"
                  scope="row"
                  v-for="(item,index) in odisha_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,odisha_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				<tr v-if="user_role=='group_user'"
                  scope="row"
                  
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"
                   
                  >OHC:</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                </tr>
				
				
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in madagascar"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,madagascar)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in mozambique"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
				 <tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in mozambique_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,mozambique_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in nigeria"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,nigeria)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in rwanda"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,rwanda)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in rwanda_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,rwanda_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in mauritius"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				 <tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in mauritius_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,mauritius_branches)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center grey lighten-1"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in zambia"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,zambia)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in ghana"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,ghana)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in nairobi"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,nairobi)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in uganda"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,uganda)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				<tr v-if="user_role=='group_user' || user_role=='overseas_user'"
                  scope="row"
                  v-for="(item,index) in tanzania"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    @click="processDialogSuper(item,tanzania)"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
                </tr>
				
				
				
                <!-- <tr
                  scope="row"
                  v-for="(item,index) in amb"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialogSuper(item,amb)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormatSuper}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
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
                            :key="index+item.branch+'qweqweytqw'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left font-weight-black"
                            >Cogs</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftd | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center body-1"
                            >
                              {{item.ftdot | lakhFormatSuper}}
                              <!-- <span class="font-weight-black"></span> -->
                            </td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdopt | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdpha | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdlab | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00 | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00 | lakhFormatSuper}}</td>
                          </tr>
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
                            >{{item.ftdrev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center body-1"
                            >{{item.ftdotrev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdoptrev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdpharev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdlabrev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdconsultrev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdothersrev | lakhFormatSuper}}</td>
                          </tr>
                          <!-- <tr
                      scope="row"
                      v-for="(item,index) in dialogdata"
                      :key="index+item.branch+'lkjlj'"
                      class="grey lighten-3"
                    >
                      <td scope="row" class="text-xs-left font-weight-black">Cogs/Revenue</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.ftd,item.ftdrev)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.ftdot,item.ftdotrev)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.ftdopt,item.ftdoptrev)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.ftdpha,item.ftdpharev)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.ftdlab,item.ftdlabrev)}}</td>
                      <td scope="row" class="text-xs-center">{{0.00}}</td>
                      <td scope="row" class="text-xs-center">{{0.00}}</td>
                    </tr>-->
                          <tr
                            scope="row"
                            v-for="(item,index) in dialogdata"
                            :key="index+item.branch+'mcmvblds'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left font-weight-black"
                            >Cogs/Revenue(%)</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.ftd,item.ftdrev)}}</td>
                            <td
                              scope="row"
                              :class="thresholdSuper(item.ftdot,item.ftdotrev,'surgery')? 'text-xs-center body-2 font-weight-black red--text':'text-xs-center'"
                            >{{cogsPercentSuper(item.ftdot,item.ftdotrev)}}</td>
                            <td
                              scope="row"
                              :class="thresholdSuper(item.ftdopt,item.ftdoptrev,'opticals')? 'text-xs-center body-2 font-weight-black red--text':'text-xs-center'"
                            >{{cogsPercentSuper(item.ftdopt,item.ftdoptrev)}}</td>
                            <td
                              scope="row"
                              :class="thresholdSuper(item.ftdpha,item.ftdpharev,'pharmacy')? 'text-xs-center body-2 font-weight-black red--text':'text-xs-center'"
                            >{{cogsPercentSuper(item.ftdpha,item.ftdpharev)}}</td>
                            <td
                              scope="row"
                              :class="thresholdSuper(item.ftdlab,item.ftdlabrev,'laboratory')? 'text-xs-center body-2 font-weight-black red--text':'text-xs-center'"
                            >{{cogsPercentSuper(item.ftdlab,item.ftdlabrev)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00}}</td>
                          </tr>
                          <tr
                            scope="row"
                            v-for="(item,index) in dialogdata"
                            :key="index+item.branch+'asdasd'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left font-weight-black"
                            >VOB</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdvob | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdvobot | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdvobopt | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdvobpha | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdvoblab | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdvobcons | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.ftdvobothers | lakhFormatSuper}}</td>
                          </tr>

                          <!-- <tr
                      scope="row"
                      v-for="(item,index) in dialogdata"
                      :key="index+item.branch+'oeakjjadk'"
                      class="grey lighten-3"
                    >
                      <td
                        scope="row"
                        class="text-xs-left font-weight-black"
                      >Cogs/Value of Orders Booked</td>
                      <td scope="row" class="text-xs-center">{{cogsbyrevSuper(item.ftd,item.ftdvob)}}</td>
                      <td scope="row" class="text-xs-center">{{cogsbyrevSuper(item.ftdot,item.ftdvobot)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.ftdopt,item.ftdvobopt)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.ftdpha,item.ftdvobpha)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.ftdlab,item.ftdvoblab)}}</td>
                      <td scope="row" class="text-xs-center">{{0.00}}</td>
                      <td scope="row" class="text-xs-center">{{0.00}}</td>
                    </tr>-->
                          <tr
                            scope="row"
                            v-for="(item,index) in dialogdata"
                            :key="index+item.branch+'oewoeir9n'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left font-weight-black"
                            >Cogs/VOB(%)</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.ftd,item.ftdvob)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.ftdot,item.ftdvobot)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.ftdopt,item.ftdvobopt)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.ftdpha,item.ftdvobpha)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.ftdlab,item.ftdvoblab)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="table-responsive"
                      v-if="item === 'General'"
                    >
                      <table
                        class="table table-hover table-bordered"
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
                            >MTD (₹ lacs)</th>
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
                            :key="index+item.branch+'qweqwekjjsdqui'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left font-weight-black"
                            >Cogs</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtd | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >
                              {{item.mtdot | lakhFormatSuper}}
                              <!-- <span class="font-weight-black">({{cogsmtdotcount}})</span> -->
                            </td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdopt | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdpha | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdlab | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00 | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00 | lakhFormatSuper}}</td>
                          </tr>
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
                            >{{item.mtdrev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdotrev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdoptrev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdpharev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdlabrev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdconsultrev | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdothersrev | lakhFormatSuper}}</td>
                          </tr>
                          <!-- <tr
                      scope="row"
                      v-for="(item,index) in dialogdata"
                      :key="index+item.branch+'lkjlj'"
                      class="grey lighten-3"
                    >
                      <td scope="row" class="text-xs-left font-weight-black">Cogs/Revenue</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.mtd,item.mtdrev)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.mtdot,item.mtdotrev)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.mtdopt,item.mtdoptrev)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.mtdpha,item.mtdpharev)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.mtdlab,item.mtdlabrev)}}</td>
                      <td scope="row" class="text-xs-center">{{0.00}}</td>
                      <td scope="row" class="text-xs-center">{{0.00}}</td>
                    </tr>-->
                          <tr
                            scope="row"
                            v-for="(item,index) in dialogdata"
                            :key="index+item.branch+'mcmvblds'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left font-weight-black"
                            >Cogs/Revenue(%)</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.mtd,item.mtdrev)}}</td>
                            <td
                              scope="row"
                              :class="thresholdSuper(item.mtdot,item.mtdotrev,'surgery')? 'text-xs-center body-2 font-weight-black red--text':'text-xs-center'"
                            >{{cogsPercentSuper(item.mtdot,item.mtdotrev)}}</td>
                            <td
                              scope="row"
                              :class="thresholdSuper(item.mtdopt,item.mtdoptrev,'opticals')? 'text-xs-center body-2 font-weight-black red--text':'text-xs-center'"
                            >{{cogsPercentSuper(item.mtdopt,item.mtdoptrev)}}</td>
                            <td
                              scope="row"
                              :class="thresholdSuper(item.mtdpha,item.mtdpharev,'pharmacy')? 'text-xs-center body-2 font-weight-black red--text':'text-xs-center'"
                            >{{cogsPercentSuper(item.mtdpha,item.mtdpharev)}}</td>
                            <td
                              scope="row"
                              :class="thresholdSuper(item.mtdlab,item.mtdlabrev,'laboratory')? 'text-xs-center body-2 font-weight-black red--text':'text-xs-center'"
                            >{{cogsPercentSuper(item.mtdlab,item.mtdlabrev)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00}}</td>
                          </tr>
                          <tr
                            scope="row"
                            v-for="(item,index) in dialogdata"
                            :key="index+item.branch+'asdasd'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left font-weight-black"
                            >VOB</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdvob | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdvobot | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdvobopt | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdvobpha | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdvoblab | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdvobcons | lakhFormatSuper}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{item.mtdvobothers | lakhFormatSuper}}</td>
                          </tr>
                          <!-- <tr
                      scope="row"
                      v-for="(item,index) in dialogdata"
                      :key="index+item.branch+'oeakjjadk'"
                      class="grey lighten-3"
                    >
                      <td
                        scope="row"
                        class="text-xs-left font-weight-black"
                      >Cogs/Value of Orders Booked</td>
                      <td scope="row" class="text-xs-center">{{cogsbyrevSuper(item.mtd,item.mtdvob)}}</td>
                      <td scope="row" class="text-xs-center">{{cogsbyrevSuper(item.mtdot,item.mtdvobot)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.mtdopt,item.mtdvobopt)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.mtdpha,item.mtdvobpha)}}</td>
                      <td
                        scope="row"
                        class="text-xs-center"
                      >{{cogsbyrevSuper(item.mtdlab,item.mtdvoblab)}}</td>
                      <td scope="row" class="text-xs-center">{{0.00}}</td>
                      <td scope="row" class="text-xs-center">{{0.00}}</td>
                    </tr>-->
                          <tr
                            scope="row"
                            v-for="(item,index) in dialogdata"
                            :key="index+item.branch+'oewoeir9n'"
                            class="grey lighten-3"
                          >
                            <td
                              scope="row"
                              class="text-xs-left font-weight-black"
                            >Cogs/VOB(%)</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.mtd,item.mtdvob)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.mtdot,item.mtdvobot)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.mtdopt,item.mtdvobopt)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.mtdpha,item.mtdvobpha)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{cogsPercentSuper(item.mtdlab,item.mtdvoblab)}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00}}</td>
                            <td
                              scope="row"
                              class="text-xs-center"
                            >{{0.00}}</td>
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
                            >FTD (local currency)</th>
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
                            >{{item.ftd | round}}</td>
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
                            >MTD (local currency)</th>
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
                            >{{item.mtd | round}}</td>
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
                            >FTD (local currency)</th>
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
                            >{{item.ftd | round}}</td>
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
                            >MTD (local currency)</th>
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
                            >{{item.mtd | round}}</td>
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
                            >FTD (local currency)</th>
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
                            >{{item.ftd | round}}</td>
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
                            >MTD (local currency)</th>
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
                            >{{item.mtd | round}}</td>
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
                            >FTD (local currency)</th>
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
                            >{{item.ftd | round}}</td>
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
                            >MTD (local currency)</th>
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
                            >{{item.mtd | round}}</td>
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
                            >FTD (local currency)</th>
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
                            >{{item.ftd | round}}</td>
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
                            >MTD (local currency)</th>
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
                            >{{item.mtd | round}}</td>
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
                            >FTD (local currency)</th>
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
                            >{{item.ftd | round}}</td>
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
                            >MTD (local currency)</th>
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
                            >{{item.mtd | round}}</td>
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
	  user_role : null,
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
	Coimbatore: null,
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
	mumbai:null,
	mumbai_branches:null,
	rest_of_maharashtra:null,
	rest_of_maharashtra_branches:null,
	pondycherry :null,
	tiruppur : null,
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
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
    json_fields: {
      "Group/Branch": "branch",
      "FTD Pharmacy": "ftdpha",
      "FTD Opticals": "ftdopt",
      "FTD Operation Theatre": "ftdot",
      "FTD Laboratory": "ftdlab",
      "FTD Cogs": "ftd",
      "FTD Revenue": "ftdrev",
      "FTD COGS%": "ftd_cogs_percent",
      "MTD Pharmacy": "mtdpha",
      "MTD Opticals": "mtdopt",
      "MTD Operation Theatre": "mtdot",
      "MTD Laboratory": "mtdlab",
      "MTD Cogs": "mtd",
      "MTD Revenue": "mtdrev",
      "MTD Cogs%": "mtd_cogs_percent"
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
      'General', 'Surgery', 'Opticals', 'Pharmacy', 'Laboratory', 'Consultation', 'Others'
    ],
  }),
  created () {
    this.getToday();
  },
  computed: {
    text (val) {
      if (this.text === 'Cogs Vs Revenue') {
        serverBus.$emit("changeComponent", "cogsSuper")
      }
      else {
        serverBus.$emit("changeComponent", "test2")
      }
    }
  },
  methods: {
    getToday () {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },
    apiRequestSuper (date) {
      // let superUserName = sessionStorage.getItem("group_user");
      if (date !== null) {
        this.fileDate = date;
        this.fileName = `Cogs_Report_${this.fileDate}.csv`;
        this.loading = true;
        this.isLoading = true;
        this.$http
          //.get(`http://localhost:8888/api-super/${date}`) // https need for server
          .get(`https://mis.dragarwal.com/api-super/${date}`)
          .then(response => {
            this.processDataSuper(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processDataSuper (data) {
	   if ((sessionStorage.getItem('group_user')) || (sessionStorage.getItem('admin_user'))){
	     this.user_role = 'group_user';
	  }else if(sessionStorage.getItem('overseas_user')){		
	    this.user_role = 'overseas_user';
	  }else if(sessionStorage.getItem('domestic_user')){	  
		this.user_role = 'domestic_user';
	  }
	
	
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
	  this.kerla = [data.ahcgroup["Kerala"]];
      this.kerla_branches = data.branchwise["Kerala"];	
      this.triv = data.branchwise["Trivandrum"];
      this.kolk = [data.ahcgroup["Kolkata"]];
      this.kolk_branches = data.branchwise["Kolkata"];      
      this.ahmedabad = data.branchwise["Ahmedabad"];
      this.madhyapradesh = [data.ahcgroup["Madhya Pradesh"]];
      this.madhyapradesh_branches = data.branchwise["Madhya Pradesh"];
      this.odisha = [data.ahcgroup["Odisha"]];
      this.odisha_branches = data.branchwise["Odisha"];	  
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
	  this.nigeria = data.branchwise["Nigeria"];
	  this.rwanda = [data.ohcgroup["Rwanda"]]; 
	  this.rwanda_branches = data.branchwise["Rwanda"];
	  this.mauritius = [data.ohcgroup["Mauritius"]];
      this.mauritius_branches = data.branchwise["Mauritius"];
	  this.zambia = data.branchwise["Zambia"];
	  this.ghana = data.branchwise["Ghana"];
	  this.nairobi = data.branchwise["Nairobi"];
	  this.uganda = data.branchwise["Uganda"];
	  this.tanzania = data.branchwise["Tanzania"];
      this.show = true;
    },
    downloadExcelSuper () {
	  if(this.user_role=='group_user'){
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
			  this.tiruppur,
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
			  this.indore,
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
			);
			return tempDataArr;
		  } else {
			return null;
		  }
		}else if(this.user_role=='overseas_user'){
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
			);
			return tempDataArr;
		  } else {
			return null;
		  }
		}else{
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
			  this.tiruppur,
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
				
			);
			return tempDataArr;
		  } else {
			return null;
		  }
		}
    },
    processDialogSuper (item, group) {
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
    cogsPercentSuper (cogs, revenue) {
      if ((cogs !== 0 && revenue !== 0) || (cogs === 0 && revenue !== 0)) {
        return ((cogs / revenue) * 100).toFixed(2);
      } else if (revenue === 0 || (cogs === 0 && revenue === 0)) {
        return 0.0;
      }
    },
    cogsbyrevSuper (cogs, revenue) {
      if ((cogs !== 0 && revenue !== 0) || (cogs === 0 && revenue !== 0)) {
        return (cogs / revenue).toFixed(2);
      } else if (revenue === 0 || (cogs === 0 && revenue === 0)) {
        return 0.0;
      }
    },
    changeColorSuper (data) {
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
    thresholdSuper (cogs, rev, unit) {
      if (unit === "surgery") {
        if (
          this.cogsPercentSuper(cogs, rev) <=
          this.threshold_percentage.surgeryMax &&
          this.cogsPercentSuper(cogs, rev) >=
          this.threshold_percentage.surgeryMin
        ) {
          this.chip1 = false;
          return false;
        } else {
          return true;
        }
      } else if (unit === "opticals") {
        if (
          this.cogsPercentSuper(cogs, rev) <=
          this.threshold_percentage.opticalsMax &&
          this.cogsPercentSuper(cogs, rev) >=
          this.threshold_percentage.opticalsMin
        ) {
          this.chip2 = false;
          return false;
        } else {
          return true;
        }
      } else if (unit === "laboratory") {
        if (
          this.cogsPercentSuper(cogs, rev) <=
          this.threshold_percentage.laboratoryMax &&
          this.cogsPercentSuper(cogs, rev) >=
          this.threshold_percentage.laboratoryMin
        ) {
          this.chip3 = false;
          return false;
        } else {
          return true;
        }
      } else if (unit === "pharmacy") {
        if (
          this.cogsPercentSuper(cogs, rev) <=
          this.threshold_percentage.pharmacyMax &&
          this.cogsPercentSuper(cogs, rev) >=
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
    lakhFormatSuper (num) {
      return (Number(num) / 100000).toFixed(2);
    },
    round (dat) {
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
}
table#stickyHeader thead {
  border-top: none;
  border-bottom: none;
  background-color: #000;
}
.table-striped > tbody > tr:nth-child(2n + 2) > td,
.table-striped > tbody > tr:nth-child(2n + 2) > th {
  background-color: #e5e5f2;
}
.allindiagroup {
background-color : #f0ae19!important
}
.branchesgrp{
background-color : #7083a9!important
}
.rotgrp{
background-color : #264e99!important
}
.whitefont{
font-weight: 900!important;
color : #ffffff!important
}
.ochfont{
background-color : #f9e699!important;
font-weight: 900!important;
color : #1d1d1d!important
}
</style>
