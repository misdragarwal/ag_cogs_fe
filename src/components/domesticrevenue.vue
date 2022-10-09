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
            <v-toolbar-title>Domestic Revenue </v-toolbar-title>
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
                min="2019-04-01"
                :max="today"
                backgroundRevenue-color="grey"
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
                  @click="$refs.menu.save(date);apiRequestRevenueDomestic(date)"
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
                  >Location</th>
                  <th
                    class="text-xs-center"
                    scope="col"
                   
                  >No. of Hospitals</th>
                  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >FTD (in lacs)	</th>
				  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >FY22 MTD (in lacs)	</th>
				  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >FY21 MTD</th>
				  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >FY22-v-FY21 MTD Gr.%</th>
				  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >FY20 MTD</th>
				  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >FY22-v-FY20 MTD Gr.%</th>
				 
				   <th
                    class="text-xs-center"
                    scope="col"
                    
                  >Target for the Month</th>
				  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >MTD Ach.%</th>
				  	
                </tr>
               
              </thead>
            
			    <tbody>
			  
                <tr
                  scope="row"
                  v-for="(item,index) in alin"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
				  
                  
                </tr>
				
				
				<tr
                  scope="row"
                  v-for="(item,index) in alinold"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
				
				<tr v-if="aehnewhcount!=0"
                  scope="row"
                  v-for="(item,index) in aehold"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
				  
                  
                </tr>
				<tr v-if="aehnewhcount!=0"
                  scope="row"
                  v-for="(item,index) in aehnew"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
				
				
				
				
				<tr
                  scope="row"
                  v-for="(item,index) in ahc"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
				<tr v-if="ahcnewhcount!=0"
                  scope="row"
                  v-for="(item,index) in ahcold"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
				  
                  
                </tr>
		
				<tr v-if="ahcnewhcount!=0"
                  scope="row"
                  v-for="(item,index) in ahcnew"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td> 
                  
                </tr>
				<tr
                  scope="row"
                  v-for="(item,index) in tn"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="text-xs-left"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
				
				
				
				<tr
                  scope="row"
                 class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="text-xs-left"
                   
                  >AEHL:</td>
				 
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
                <tr
                  scope="row"
                  v-for="(item,index) in cmh"
                  :key="index+item.branch"
                  class="font-weight-black"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                    
                  >{{item.branch}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                 
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh_chennai"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kanchi_vel"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kanchi_vel_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kum_ney_vil"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                 
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kum_ney_vil_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in dha_salem_krish"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in dha_salem_krish_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in erod_hosure"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in erod_hosure_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in jaipur"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                 
                </tr>
                <tr
                  scope="row"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="text-xs-left"
                    style="cursor:pointer"
                  >AHCL:</td>
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
                <tr
                  scope="row"
                  v-for="(item,index) in ahc_chennai"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in ahc_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in pondycherry"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"
                    
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in tirunelveli"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                 
                </tr>
								
				<tr
                  scope="row"
                  v-for="(item,index) in coim_trippur"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in coim_trippur_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in tuti_madurai"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                 
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in tuti_madurai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                   
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in trichy"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                 
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in thanjavur"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>	
				
				
               
				<tr
                  scope="row"
                  v-for="(item,index) in andaman"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
				
                <tr
                  scope="row"
                  v-for="(item,index) in karnataka"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in banglore"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in banglore_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                 
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hub_mys"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hub_mys_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
				
				
				 <tr
                  scope="row"
                  v-for="(item,index) in maharashtra"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <!--<tr
                  scope="row"
                  v-for="(item,index) in maharashtra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>-->
				
				 <tr
                  scope="row"
                  v-for="(item,index) in mumbai"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in mumbai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
				
				
				 <tr
                  scope="row"
                  v-for="(item,index) in rest_of_maharashtra"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in rest_of_maharashtra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
				
				<tr
                  scope="row"
                  v-for="(item,index) in Punjab"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in Punjab_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>





                <tr
                  scope="row"
                  v-for="(item,index) in Jammu"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in Jammu_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
				
				
				
				
				
				
				
				
				
				
				
                <tr
                  scope="row"
                  v-for="(item,index) in telangana"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hyderabad"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hyderabad_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in andhra"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in andhra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in roi"
                  :key="index+item.branch"
                  class="rotgrp"
				  style="font-weight: 900!important;"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer;color : #ffffff!important;font-weight: 900!important;"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kerla"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kerla_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kolk"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kolk_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
				
                <tr
                  scope="row"
                  v-for="(item,index) in ahmedabad"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                 <tr
                  scope="row"
                  v-for="(item,index) in madhyapradesh"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in madhyapradesh_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in odisha"
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
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in odisha_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    
                    style="cursor:pointer"
                  >{{item.branch}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.hcount}}</td>
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
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyearpre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentagepre}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdachived}}</td>
                  
                </tr>               
			     </tbody>
			  
            </table>
          </div>
		  
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
    
 
    // ftdotcount: null,
    // mtdotcount: null,
    // cogsftdotcount: null,
    // cogsmtdotcount: null,
    userName: null,
    isLoading: false,
    fullPage: true,
    
    title: null,
	user_role : null,    
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
	alinold: null,
	group: null,
    cmh: null,
    aeh_chennai: null,
    aeh_chennai_branches: null,
    aeh: null,
	aehold: null,
	aehnew: null,
	aehnewhcount: null,
    ahc: null,
	ahcold: null,
	ahcnew: null,
	tn:null,
    ahcnewhcount: null,	
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
	coim_trippur: null,
    coim_trippur_branches: null,	
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
	maharashtra:null,
	maharashtra_branches:null,
	mumbai:null,
	mumbai_branches:null,
	rest_of_maharashtra:null,
	rest_of_maharashtra_branches:null,
  Punjab: null,
    Punjab_branches: null,
    Jammu: null,
    Jammu_branches: null,
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
	pondycherry :null,
	
	
    json_data: null,
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
    json_fields: {
	  "Group/Branch": "branch",
      "No. of Hospitals	": "hcount",
	  "FTD (in lacs)": "ftdopdrev",
      "MTD (in lacs)": "mtdopdrev",
      "LYSMTD": "mtdopdrevlastyear",
	  "MTD Gr.%	": "mtdopdpercentage",
	  "Target for the Month	%": "target",
	  "MTD Ach.%" : "mtdachived"
      
    },
    fileName: null
  }),
  created () {
    this.getToday();
  },
  methods: {
    getToday () {
      this.today = moment()
           .format("YYYY-MM-DD");
    },
    apiRequestRevenueDomestic (date) {
      // let superUserName = sessionStorage.getItem("super_user");
      if (date !== null) {
        this.fileDate = date;
        this.fileName = `Domestic_Report_${this.fileDate}.csv`;
        this.loading = true;
        this.isLoading = true;
        this.$http
          .get(`https://mis.dragarwal.com/mis-revenue-domestic/${date}`)
          //.get(`http://localhost:7777/mis-revenue-domestic/${date}`)
                    .then(response => {
            this.processDataDomesticRevenue(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processDataDomesticRevenue (data) {	  
      this.alin = [data.alin];
	  this.alinold = [data.alinold];
      this.aeh = [data.aeh];
	  this.aehold = [data.aehold];
	  this.aehnew = [data.aehnew];	  
	  this.aehnewhcount = this.aehnew[0].hcount;	  
      this.ahc = [data.ahc];
	  this.ahcold = [data.ahcold];
	  this.ahcnew = [data.ahcnew];
	  this.tn = [data.tn];
	  this.ahcnewhcount = this.ahcnew[0].hcount;
      this.cmh = data.branchwise["Chennai Main Hospital"];
      this.aeh_chennai = [data.aehgroup["Chennai Branches"]];
      this.aeh_chennai_branches = data.branchwise["Chennai Branches"];
      this.kanchi_vel = [data.aehgroup["Kanchi + Vellore"]];
      this.kanchi_vel_branches = data.branchwise["Kanchi + Vellore"];
      this.kum_ney_vil = [data.aehgroup["Kum + Ney + Vil + Kal"]];
      this.kum_ney_vil_branches = data.branchwise["Kum + Ney + Vil + Kal"];
      this.dha_salem_krish = [data.aehgroup["Dha + Salem + Krish"]];
      this.dha_salem_krish_branches = data.branchwise["Dha + Salem + Krish"];
      this.erod_hosure = [data.aehgroup["Erode + Hosur"]];
      this.erod_hosure_branches = data.branchwise["Erode + Hosur"];
      this.jaipur = data.branchwise["Jaipur"];
      this.madurai = [data.aehgroup["Madurai KK Nagar"]];
      this.ahc_chennai = [data.ahcgroup["Chennai branches"]];
      this.ahc_chennai_branches = data.branchwise["Chennai branches"];
      this.tirunelveli = data.branchwise["Tirunelveli"];
      this.coim_trippur = [data.ahcgroup["Coimbatore + Tiruppur"]];
      this.coim_trippur_branches = data.branchwise["Coimbatore + Tiruppur"];	  
      this.tuti_madurai = [data.ahcgroup["Tuticorin + Madurai"]];
      this.tuti_madurai_branches = data.branchwise[
        "Tuticorin + Madurai"];
      this.trichy = data.branchwise["Trichy"];
      this.thanjavur = data.branchwise["Thanjavur"];
      this.andaman = [data.ahcgroup["Port Blair"]];
      this.karnataka = [data.ahcgroup["Karnataka"]];
      this.banglore = [data.ahcgroup["Banglore"]];
      this.banglore_branches = data.branchwise["Banglore"];
      this.hub_mys = [data.ahcgroup["Hubli + Mysore"]];
      this.hub_mys_branches = data.branchwise["Hubli + Mysore"];
	  this.maharashtra = [data.ahcgroup["Maharashtra"]];
      this.maharashtra_branches = data.branchwise["Maharashtra"];
	  this.mumbai = [data.ahcgroup["Mumbai"]];
      this.mumbai_branches = data.branchwise["Mumbai"];
	  this.rest_of_maharashtra = [data.ahcgroup["Rest of Maharashtra"]];
      this.rest_of_maharashtra_branches = data.branchwise["Rest of Maharashtra"];
      this.Punjab = [data.ahcgroup["Punjab"]];
      this.Punjab_branches = data.branchwise["Punjab"];
      this.Jammu = [data.ahcgroup["Jammu"]];
      this.Jammu_branches = data.branchwise["Jammu"];
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
	 
      // this.amb = [data.ahcgroup["Ambattur"]];
      this.show = true;
    },
    downloadExcelRevenueSuper () {	
		  let tempDataArr = [];
		  if (this.fileDate !== null) {
			tempDataArr = this.alin.concat(			  
			  this.alinold,
			  this.aeh,
			  this.aehold,
			  this.aehnew,
			  this.ahc,
			  this.ahcold,
			   this.ahcnew,
			    this.tn,
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
			  this.coim_trippur,
			  this.coim_trippur_branches,		  
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
        this.Punjab,
			  this.Punjab_branches,
        this.Jammu,
        this.Jammu_branches,
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
			);
			return tempDataArr;
		  } else {
			return null;
		  }
		
    },
    
    changeColorOPDSuper (data) {
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
.table-striped > tbody > tr:nth-child(2n + 2) > td,
.table-striped > tbody > tr:nth-child(2n + 2) > th {
  background-color: #e5e5f2;
  touch-action: none;
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
.rotnfont{
background-color : #3a75b5!important;
font-weight: 900!important;
color : #1d1d1d!important
}

</style>
