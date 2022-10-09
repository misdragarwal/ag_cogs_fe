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
			style="width:118%!important;margin-left: -90px!important;"
          >
            <v-toolbar-title>Snapshot Revenue </v-toolbar-title>
            <v-divider
              class="mx-2 black"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
			
			
			<v-select :items=branch v-model="SetBranch" label="Branch:" item-text="TEXT" item-value="shortCode" id="SelBranch"></v-select>
			<v-spacer></v-spacer>
			<v-btn rounded color="primary" dark @click="apiRequestCogsdata(SetBranch)">GET</v-btn>
			
			<v-btn rounded color="primary" dark @click="exportToExcel('opr_table','OPR_data')">Download XL</v-btn>
		    
            <!--<v-menu
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
                  @click="$refs.menu.save(date);apiRequestOPDSuper(date)"
                  style="outline:none"
                >Generate</v-btn>
              </v-date-picker>
			  
			  
			  
			  
			  
            </v-menu>-->
            <!--<download-excel
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
            </download-excel>-->
          </v-toolbar>
          <loading
            :active.sync="isLoading"
            :is-full-page="fullPage"
            color="#7f0000"
            loader="bars"
          ></loading>
          <!-- Vuetify Data table -->
		  <div class="table-responsive" style="width:117%!important;margin-left: -90px!important;" column >
		   <table border="1" width="100%"  ><tr><th class="text-xs-center" style="width:4.9%"><b>Desc</b></th> <th class="text-xs-center" style="width:4.9%"><b>Year</b></th> <th class="text-xs-center" style="width:3%"><b>Unit</b></th> <th class="text-xs-center" style="width:4.9%"><b>Apr</b></th> <th class="text-xs-center" style="width:4.9%"><b>May</b></th> <th class="text-xs-center" style="width:4.9%"><b>Jun</b></th> <th class="text-xs-center" style="width:4.9%"><b>Jul</b></th> <th class="text-xs-center" style="width:4.9%"><b>Aug</b></th> <th class="text-xs-center" style="width:4.9%"><b>Sep</b></th> <th class="text-xs-center" style="width:4.9%"><b>Oct</b></th> <th class="text-xs-center" style="width:4.8%"><b>Nov</b></th> <th class="text-xs-center" style="width:4.8%"><b>Dec</b></th> <th class="text-xs-center" style="width:4.8%"><b>Jan</b></th> <th class="text-xs-center" style="width:4.8%"><b>Feb</b></th> <th class="text-xs-center" style="width:4.8%"><b>Mar</b></th> <th class="text-xs-center" style="width:5.8%"><b>YTD</b></th> <th class="text-xs-center" style="width:5.8%"><b>Q1</b></th> <th class="text-xs-center" style="width:5.8%"><b>Q2</b></th> <th class="text-xs-center" style="width:5.8%"><b>Q3</b></th> <th class="text-xs-center" ><b>Q4</b></th></tr></table>
		   </div>
		 
          <div class="table-responsive"  column style="height: 90vh;width:118%!important;margin-left: -90px!important;">
            <table
              border="1"
              v-if="show"
			  width="100%"
			  class="opr"
			  style="table-layout: fixed"
			  id="opr_table"
            >
              
              <tbody>
			  
			  <tr  id="tabHead" style="display:none;"><th class="text-xs-center" style="width:4.9%"><b>Desc</b></th> <th class="text-xs-center" style="width:4.9%"><b>Year</b></th> <th class="text-xs-center" style="width:3%"><b>Unit</b></th> <th class="text-xs-center" style="width:4.9%"><b>Apr</b></th> <th class="text-xs-center" style="width:4.9%"><b>May</b></th> <th class="text-xs-center" style="width:4.9%"><b>Jun</b></th> <th class="text-xs-center" style="width:4.9%"><b>Jul</b></th> <th class="text-xs-center" style="width:4.9%"><b>Aug</b></th> <th class="text-xs-center" style="width:4.9%"><b>Sep</b></th> <th class="text-xs-center" style="width:4.9%"><b>Oct</b></th> <th class="text-xs-center" style="width:4.8%"><b>Nov</b></th> <th class="text-xs-center" style="width:4.8%"><b>Dec</b></th> <th class="text-xs-center" style="width:4.8%"><b>Jan</b></th> <th class="text-xs-center" style="width:4.8%"><b>Feb</b></th> <th class="text-xs-center" style="width:4.8%"><b>Mar</b></th> <th class="text-xs-center" style="width:5.8%"><b>YTD</b></th> <th class="text-xs-center" style="width:5.8%"><b>Q1</b></th> <th class="text-xs-center" style="width:5.8%"><b>Q2</b></th> <th class="text-xs-center" style="width:5.8%"><b>Q3</b></th> <th class="text-xs-center" ><b>Q4</b></th></tr>
			  
			  
			  
			  <tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Sales / TO (with Tax)</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdrevtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totaltarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdrevtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdrevtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdrevtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdrevtarget)}}</td>
                </tr>
				
				
				
				
				<tr class="branchesgrp1">
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdrev)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalrev)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdrev)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdrev)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdrev)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdrev)}}</td>
                </tr>
			  
			  
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdrevtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totaltarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdrevtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdrevtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdrevtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdrevtarget)}}</td>
                </tr>
				
				
				
				
				<tr class="branchesgrp1">
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdrev)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalrev)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdrev)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdrev)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdrev)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdrev)}}</td>
                </tr>
				<tr >
                  <td
                    class="text-xs-center"
                    scope="col"
                     width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdrevtarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totaltarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdrevtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdrevtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdrevtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdrevtarget)}}</td>
				  
                </tr>
				<tr class="branchesgrp1">
                 <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdrev)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalrev)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdrev)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdrev)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdrev)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdrev)}}</td>
                </tr>
				
				
				<tr >
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdrevperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdrevperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrevperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrevperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrevperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrevperthird)}}</td>
				  
                </tr>
				
				<tr >
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdrevper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdrevper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrevper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrevper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrevper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrevper)}}</td>
				  
                </tr>
				
				
				
				<br><br>
				
				<tr  >
                  <td rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >OP New</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdopdtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalopdtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdopdtarget)}}</td>
                </tr>
				
				<tr  class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdopd)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalopd)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdopd)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdopd)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdopd)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdopd)}}</td>
                </tr>
				
				
				
				<tr  >
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdopdtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalopdtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdopdtarget)}}</td>
                </tr>
				
				<tr  class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdopd)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalopd)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdopd)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdopd)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdopd)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdopd)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdopdtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalopdtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdopdtarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdopd)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalopd)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdopd)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdopd)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdopd)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdopd)}}</td>
                </tr>
				
				
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdopdperthird)}}
				  </td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdopdperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdopdperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdopdperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdopdperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdopdperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdopdper)}}
				  </td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdopdper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdopdper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdopdper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdopdper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdopdper)}}</td>
				  
                </tr>
				
				<br><br>
				
				<tr>
				<td rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >OP Review Paid</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdpopdtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalpopdtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdpopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdpopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdpopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdpopdtarget)}}</td>
                </tr>
				
				<tr  class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdpopdcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalpopdcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdpopdcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdpopdcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdpopdcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdpopdcount)}}</td>
                </tr>
				
				
				<tr  >
				
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdpopdtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalpopdtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdpopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdpopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdpopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdpopdtarget)}}</td>
                </tr>
				
				<tr  class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdpopdcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalpopdcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdpopdcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdpopdcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdpopdcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdpopdcount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdpopdtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalpopdtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdpopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdpopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdpopdtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdpopdtarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdpopdcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalpopdcount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdpopdcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdpopdcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdpopdcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdpopdcount)}}</td>
                </tr>
				
				
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdpopdperthird)}}
				  </td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.popdperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdpopdperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdpopdperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdpopdperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdpopdperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdpopdper)}}
				  </td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.popdper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdpopdper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdpopdper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdpopdper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdpopdper)}}</td>
				  
                </tr>



				<br><br>
				
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Total Consultation</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{item.mtdtconsutarget}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueTotal.totaltconsutarget}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ1[0].mtdtconsutarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ2[0].mtdtconsutarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ3[0].mtdtconsutarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ4[0].mtdtconsutarget}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{item.mtdtconsu}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueTotal.totaltconsu}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ1[0].mtdtconsu}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ2[0].mtdtconsu}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ3[0].mtdtconsu}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ4[0].mtdtconsu}}</td>
                </tr>
				
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{item.mtdtconsutarget}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueTotal.totaltconsutarget}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ1[0].mtdtconsutarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ2[0].mtdtconsutarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ3[0].mtdtconsutarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ4[0].mtdtconsutarget}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{item.mtdtconsu}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueTotal.totaltconsu}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ1[0].mtdtconsu}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ2[0].mtdtconsu}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ3[0].mtdtconsu}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ4[0].mtdtconsu}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{item.mtdtconsutarget}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueTotal.totaltconsutarget}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ1[0].mtdtconsutarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ2[0].mtdtconsutarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ3[0].mtdtconsutarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ4[0].mtdtconsutarget}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{item.mtdtconsu}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueTotal.totaltconsu}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ1[0].mtdtconsu}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ1[0].mtdtconsu}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ3[0].mtdtconsu}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ4[0].mtdtconsu}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdtconsuperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.tconsuperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdtconsuperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdtconsuperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdtconsuperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdtconsuperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdtconsuper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.tconsuper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdtconsuper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdtconsuper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdtconsuper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdtconsuper)}}</td>
				  
                </tr>

				
				<br><br>
				
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >YPP (New OP)</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdopdypptarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalopdypptarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdopdypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdopdypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdopdypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdopdypptarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdopdypp)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalopdypp)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdopdypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdopdypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdopdypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdopdypp)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdopdypptarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalopdypptarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdopdypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdopdypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdopdypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdopdypptarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdopdypp)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalopdypp)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdopdypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdopdypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdopdypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdopdypp)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdopdypptarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalopdypptarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdopdypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdopdypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdopdypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdopdypptarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdopdypp)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalopdypp)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdopdypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdopdypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdopdypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdopdypp)}}</td>
                </tr>
				
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdopdyppperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.opdyppperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdopdyppperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdopdyppperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdopdyppperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdopdyppperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdopdyppper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.opdyppper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdopdyppper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdopdyppper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdopdyppper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdopdyppper)}}</td>
				  
                </tr>
								
				<br><br>
				
				
				<tr >
                  <td rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Cataract Surgery Nos</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  > {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdallcatcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalallcatcounttarget)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdallcatcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdallcatcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdallcatcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdallcatcounttarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdallcatcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalallcatcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdallcatcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdallcatcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdallcatcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdallcatcount)}}</td>
                </tr>
				
				
				<tr >
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  > {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdallcatcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalallcatcounttarget)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdallcatcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdallcatcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdallcatcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdallcatcounttarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdallcatcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalallcatcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdallcatcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdallcatcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdallcatcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdallcatcount)}}</td>
                </tr>
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  > {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdallcatcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalallcatcounttarget)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdallcatcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdallcatcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdallcatcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdallcatcounttarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdallcatcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalallcatcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdallcatcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdallcatcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdallcatcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdallcatcount)}}</td>
                </tr>
				
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdallcatcountperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctallcountperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdallcatcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdallcatcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdallcatcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdallcatcountperthird)}}</td>
				  
                </tr>	

				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdallcatcountper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctallcountper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdallcatcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdallcatcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdallcatcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdallcatcountper)}}</td>
				  
                </tr>	

				<br><br>
				
				
				<tr >
                  <td rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Cataract Surgery Value</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  > FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdallcattarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalallcattarget)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdallcattarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdallcattarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdallcattarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdallcattarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdallcat)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalallcat)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdallcat)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdallcat)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdallcat)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdallcat)}}</td>
                </tr>
				
				<tr >
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  > FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdallcattarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalallcattarget)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdallcattarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdallcattarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdallcattarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdallcattarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdallcat)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalallcat)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdallcat)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdallcat)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdallcat)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdallcat)}}</td>
                </tr>
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  > {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdallcattarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalallcattarget)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdallcattarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdallcattarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdallcattarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdallcattarget)}}</td>
                </tr>
				
				
				
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdallcat)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalallcat)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdallcat)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdallcat)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdallcat)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdallcat)}}</td>
                </tr>
				
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdallcatperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctallperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdallcatperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdallcatperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdallcatperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdallcatperthird)}}</td>
				  
                </tr>	
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdallcatper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctallper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdallcatper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdallcatper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdallcatper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdallcatper)}}</td>
				  
                </tr>	
				
				
				<br><br>
				
				
				<tr  >
                  <td rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Cataract SX Low End Nos</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdctlowendcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalctlowendcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdctlowendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdctlowendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdctlowendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdctlowendcounttarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdctlowendcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalctlowendcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdctlowendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdctlowendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdctlowendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdctlowendcount)}}</td>
                </tr>
				
                <tr  >
                
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdctlowendcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalctlowendcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdctlowendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdctlowendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdctlowendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdctlowendcounttarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdctlowendcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalctlowendcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdctlowendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdctlowendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdctlowendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdctlowendcount)}}</td>
                </tr>
				
				
				 <tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdctlowendcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalctlowendcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdctlowendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdctlowendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdctlowendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdctlowendcounttarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdctlowendcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalctlowendcount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdctlowendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdctlowendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdctlowendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdctlowendcount)}}</td>
                </tr>
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                     width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdctlowendcountperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctlowendcountperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdctlowendcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdctlowendcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdctlowendcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdctlowendcountperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                     width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdctlowendcountper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctlowendcountper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdctlowendcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdctlowendcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdctlowendcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdctlowendcountper)}}</td>
				  
                </tr>
				<br><br>
				
				<tr  >
                  <td rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Cataract SX Low End Value</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdctlowendtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalctlowendtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdctlowendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdctlowendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdctlowendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdctlowendtarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdctlowend)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalctlowend)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdctlowend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdctlowend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdctlowend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdctlowend)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdctlowendtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalctlowendtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdctlowendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdctlowendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdctlowendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdctlowendtarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdctlowend)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalctlowend)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdctlowend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdctlowend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdctlowend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdctlowend)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdctlowendtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalctlowendtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdctlowendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdctlowendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdctlowendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdctlowendtarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdctlowend)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalctlowend)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdctlowend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdctlowend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdctlowend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdctlowend)}}</td>
                </tr>
				
				
				
				
				<tr >
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdctlowendperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctlowendperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdctlowendperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdctlowendperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdctlowendperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdctlowendperthird)}}</td>
				  
                </tr>
				
				<tr >
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdctlowendper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctlowendper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdctlowendper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdctlowendper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdctlowendper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdctlowendper)}}</td>
				  
                </tr>
				
				
				
				<br><br>
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Cataract SX Mid End Nos</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdctmidendcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalctmidendcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdctmidendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdctmidendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdctmidendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdctmidendcounttarget)}}</td>
                </tr>
				
				
				
				<tr class="branchesgrp1">
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdctmidendcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalctmidendcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdctmidendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdctmidendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdctmidendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdctmidendcount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdctmidendcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalctmidendcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdctmidendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdctmidendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdctmidendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdctmidendcounttarget)}}</td>
                </tr>
				
				
				
				<tr class="branchesgrp1">
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdctmidendcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalctmidendcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdctmidendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdctmidendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdctmidendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdctmidendcount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdctmidendcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalctmidendcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdctmidendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdctmidendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdctmidendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdctmidendcounttarget)}}</td>
                </tr>
				
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdctmidendcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalctmidendcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdctmidendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdctmidendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdctmidendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdctmidendcount)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdctmidendcountperthird)}}
				  </td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctmidendperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdctmidendcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdctmidendcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdctmidendcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdctmidendcountperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdctmidendcountper)}}
				  </td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctmidendper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdctmidendcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdctmidendcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdctmidendcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdctmidendcountper)}}</td>
				  
                </tr>
				
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Cataract SX Mid End Value</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdctmidendtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalctmidendtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdctmidendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdctmidendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdctmidendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdctmidendtarget)}}</td>
                </tr>
				
				
				<tr class="branchesgrp1">
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdctmidend)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalctmidend)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdctmidend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdctmidend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdctmidend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdctmidend)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdctmidendtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalctmidendtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdctmidendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdctmidendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdctmidendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdctmidendtarget)}}</td>
                </tr>
				
				
				<tr class="branchesgrp1">
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdctmidend)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalctmidend)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdctmidend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdctmidend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdctmidend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdctmidend)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdctmidendtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalctmidendtarget)}}</td>
				 
				  
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdctmidendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdctmidendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdctmidendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdctmidendtarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdctmidend)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalctmidend)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdctmidend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdctmidend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdctmidend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdctmidend)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdctmidendperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctmidendperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdctmidendperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdctmidendperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdctmidendperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdctmidendperthird)}}</td>
				  
                </tr>
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdctmidendper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.ctmidendper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdctmidendper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdctmidendper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdctmidendper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdctmidendper)}}</td>
				  
                </tr>
				
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Cataract SX High End Nos</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdcthighendcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalcthighendcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdcthighendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdcthighendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdcthighendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdcthighendcounttarget)}}</td>
                </tr>
			
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdcthighendcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalcthighendcount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdcthighendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdcthighendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdcthighendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdcthighendcount)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdcthighendcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalcthighendcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdcthighendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdcthighendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdcthighendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdcthighendcounttarget)}}</td>
                </tr>
			
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdcthighendcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalcthighendcount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdcthighendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdcthighendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdcthighendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdcthighendcount)}}</td>
                </tr>
				
				
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdcthighendcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalcthighendcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdcthighendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdcthighendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdcthighendcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdcthighendcounttarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdcthighendcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalcthighendcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdcthighendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdcthighendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdcthighendcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdcthighendcount)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdcthighendcountperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.cthighendcountperthird)}}</td>
				
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdcthighendcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdcthighendcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdcthighendcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdcthighendcountperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdcthighendcountper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.cthighendcountper)}}</td>
				
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdcthighendcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdcthighendcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdcthighendcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdcthighendcountper)}}</td>
				  
                </tr>
				
				<br><br>
				
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Cataract SX High End Value</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdcthighendtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalcthighendtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdcthighendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdcthighendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdcthighendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdcthighendtarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdcthighend)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalcthighend)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdcthighend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdcthighend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdcthighend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdcthighend)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdcthighendtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalcthighendtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdcthighendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdcthighendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdcthighendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdcthighendtarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdcthighend)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalcthighend)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdcthighend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdcthighend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdcthighend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdcthighend)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdcthighendtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalcthighendtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdcthighendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdcthighendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdcthighendtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdcthighendtarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdcthighend)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalcthighend)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdcthighend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdcthighend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdcthighend)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdcthighend)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdcthighendperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.cthighendperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdcthighendperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdcthighendperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdcthighendperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdcthighendperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdcthighendper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.cthighendper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdcthighendper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdcthighendper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdcthighendper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdcthighendper)}}</td>
				  
                </tr>
				
				
				
				<br><br>
				
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Corneal  Nos</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdcorcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalcorcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdcorcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdcorcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdcorcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdcorcounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdcorcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalcorcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdcorcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdcorcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdcorcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdcorcount)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdcorcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalcorcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdcorcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdcorcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdcorcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdcorcounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdcorcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalcorcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdcorcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdcorcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdcorcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdcorcount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdcorcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalcorcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdcorcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdcorcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdcorcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdcorcounttarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdcorcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalcorcount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdcorcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdcorcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdcorcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdcorcount)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdcorcountperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.corcountperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdcorcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdcorcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdcorcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdcorcountperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdcorcountper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.corcountper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdcorcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdcorcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdcorcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdcorcountper)}}</td>
				  
                </tr>
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Corneal  Value</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdcortarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalcortarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdcortarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdcortarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdcortarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdcortarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdcor)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalcor)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdcor)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdcor)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdcor)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdcor)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdcortarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalcortarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdcortarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdcortarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdcortarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdcortarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdcor)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalcor)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdcor)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdcor)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdcor)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdcor)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdcortarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalcortarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdcortarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdcortarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdcortarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdcortarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdcor)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalcor)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdcor)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdcor)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdcor)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdcor)}}</td>
                </tr>
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdcorperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.corperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdcorperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdcorperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdcorperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdcorperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdcorper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.corper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdcorper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdcorper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdcorper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdcorper)}}</td>
				  
                </tr>
				
				
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Refractive Nos</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdrefcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalrefcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdrefcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdrefcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdrefcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdrefcounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdrefcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalrefcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdrefcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdrefcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdrefcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdrefcount)}}</td>
                </tr>
				
				<tr  >
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdrefcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalrefcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdrefcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdrefcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdrefcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdrefcounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdrefcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalrefcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdrefcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdrefcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdrefcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdrefcount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdrefcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalrefcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdrefcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdrefcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdrefcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdrefcounttarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdrefcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalrefcount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdrefcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdrefcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdrefcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdrefcount)}}</td>
                </tr>			
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdrefcountperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.refcountperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrefcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrefcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrefcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrefcountperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdrefcountper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.refcountper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrefcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrefcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrefcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrefcountper)}}</td>
				  
                </tr>
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Refractive Value</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdreftarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalreftarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdreftarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdreftarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdreftarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdreftarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdref)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalref)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdref)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdref)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdref)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdref)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdreftarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalreftarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdreftarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdreftarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdreftarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdreftarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdref)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalref)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdref)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdref)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdref)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdref)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdreftarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalreftarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdreftarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdreftarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdreftarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdreftarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdref)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalref)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdref)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdref)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdref)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdref)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdrefperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.refperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrefperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrefperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrefperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrefperthird)}}</td>
				  
                </tr>
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdrefper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.refper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrefper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrefper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrefper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrefper)}}</td>
				  
                </tr>
				<br><br>
				
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >VR Surgery Nos</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdvrsugcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalvrsugcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdvrsugcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdvrsugcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdvrsugcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdvrsugcounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdvrsugcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalvrsugcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdvrsugcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdvrsugcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdvrsugcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdvrsugcount)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdvrsugcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalvrsugcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdvrsugcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdvrsugcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdvrsugcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdvrsugcounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdvrsugcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalvrsugcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdvrsugcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdvrsugcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdvrsugcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdvrsugcount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdvrsugcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalvrsugcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdvrsugcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdvrsugcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdvrsugcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdvrsugcounttarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdvrsugcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalvrsugcount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdvrsugcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdvrsugcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdvrsugcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdvrsugcount)}}</td>
                </tr>
				
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdvrsugcountperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.vrsugcountperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdvrsugcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdvrsugcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdvrsugcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdvrsugcountperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdvrsugcountper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.vrsugcountper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdvrsugcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdvrsugcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdvrsugcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdvrsugcountper)}}</td>
				  
                </tr>
				
				<br><br>
				
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >VR Surgery Value</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdvrsugtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalvrsugtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdvrsugtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdvrsugtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdvrsugtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdvrsugtarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdvrsug)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalvrsug)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdvrsug)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdvrsug)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdvrsug)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdvrsug)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdvrsugtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalvrsugtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdvrsugtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdvrsugtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdvrsugtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdvrsugtarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdvrsug)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalvrsug)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdvrsug)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdvrsug)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdvrsug)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdvrsug)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdvrsugtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalvrsugtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdvrsugtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdvrsugtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdvrsugtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdvrsugtarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdvrsug)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalvrsug)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdvrsug)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdvrsug)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdvrsug)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdvrsug)}}</td>
                </tr>
				
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdvrsugperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.vrsugperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdvrsugperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdvrsugperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdvrsugperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdvrsugperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdvrsugper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.vrsugper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdvrsugper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdvrsugper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdvrsugper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdvrsugper)}}</td>
				  
                </tr>
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >VR Injections Nos</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdvrincounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalvrincounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdvrincounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdvrincounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdvrincounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdvrincounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdvrincount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalvrincount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdvrincount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdvrincount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdvrincount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdvrincount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdvrincounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalvrincounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdvrincounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdvrincounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdvrincounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdvrincounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdvrincount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalvrincount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdvrincount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdvrincount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdvrincount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdvrincount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdvrincounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalvrincounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdvrincounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdvrincounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdvrincounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdvrincounttarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdvrincount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalvrincount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdvrincount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdvrincount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdvrincount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdvrincount)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdvrincountperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.vrincountperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdvrincountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdvrincountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdvrincountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdvrincountperthird)}}</td>
				  
                </tr>
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdvrincountper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.vrincountper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdvrincountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdvrincountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdvrincountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdvrincountper)}}</td>
				  
                </tr>
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >VR Injections Value</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdvrintarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalvrintarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdvrintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdvrintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdvrintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdvrintarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdvrin)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalvrin)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdvrin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdvrin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdvrin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdvrin)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdvrintarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalvrintarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdvrintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdvrintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdvrintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdvrintarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdvrin)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalvrin)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdvrin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdvrin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdvrin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdvrin)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdvrintarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalvrintarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdvrintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdvrintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdvrintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdvrintarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdvrin)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalvrin)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdvrin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdvrin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdvrin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdvrin)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdvrinperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.vrinperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdvrinperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdvrinperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdvrinperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdvrinperthird)}}</td>
				  
                </tr>
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdvrinper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.vrinper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdvrinper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdvrinper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdvrinper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdvrinper)}}</td>
				  
                </tr>
				
				
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Opticals No. of Orders </td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdoptcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totaloptcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdoptcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdoptcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdoptcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdoptcounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdoptcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totaloptcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdoptcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdoptcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdoptcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdoptcount)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdoptcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totaloptcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdoptcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdoptcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdoptcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdoptcounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdoptcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totaloptcount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdoptcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdoptcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdoptcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdoptcount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdoptcounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totaloptcounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdoptcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdoptcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdoptcounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdoptcounttarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdoptcount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totaloptcount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdoptcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdoptcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdoptcount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdoptcount)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdoptcountperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.optcountperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdoptcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdoptcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdoptcountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdoptcountperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdoptcountper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.optcountper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdoptcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdoptcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdoptcountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdoptcountper)}}</td>
				  
                </tr>
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Opticals Value (Delivered)</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdopttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalopttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdopttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdopttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdopttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdopttarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdopt)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalopt)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdopt)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdopt)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdopt)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdopt)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdopttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalopttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdopttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdopttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdopttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdopttarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdopt)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalopt)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdopt)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdopt)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdopt)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdopt)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdopttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalopttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdopttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdopttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdopttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdopttarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdopt)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalopt)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdopt)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdopt)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdopt)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdopt)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdoptperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.optperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdoptperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdoptperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdoptperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdoptperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdoptper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.optper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdoptper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdoptper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdoptper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdoptper)}}</td>
				  
                </tr>
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Opticals YPP</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdoptypptarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totaloptypptarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdoptypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdoptypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdoptypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdoptypptarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdoptypp)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totaloptypp)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdoptypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdoptypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdoptypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdoptypp)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdoptypptarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totaloptypptarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdoptypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdoptypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdoptypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdoptypptarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdoptypp)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totaloptypp)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdoptypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdoptypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdoptypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdoptypp)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdoptypptarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totaloptypptarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdoptypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdoptypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdoptypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdoptypptarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdoptypp)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totaloptypp)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdoptypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdoptypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdoptypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdoptypp)}}</td>
                </tr>
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdoptyppperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.optperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdoptyppperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdoptyppperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdoptyppperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdoptyppperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdoptyppper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.optper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdoptyppper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdoptyppper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdoptyppper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdoptyppper)}}</td>
				  
                </tr>
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Pharmacy No. of Bills </td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdphacounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalphacounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdphacounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdphacounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdphacounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdphacounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdphacount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalphacount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdphacount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdphacount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdphacount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdphacount)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdphacounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalphacounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdphacounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdphacounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdphacounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdphacounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdphacount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalphacount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdphacount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdphacount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdphacount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdphacount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdphacounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalphacounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdphacounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdphacounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdphacounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdphacounttarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdphacount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalphacount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdphacount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdphacount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdphacount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdphacount)}}</td>
                </tr>
				
				
				
				
				<tr>
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdphacountperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.phacountperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdphacountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdphacountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdphacountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdphacountperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdphacountper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.phacountper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdphacountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdphacountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdphacountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdphacountper)}}</td>
				  
                </tr>
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Pharmacy Value </td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdphatarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalphatarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdphatarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdphatarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdphatarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdphatarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdpha)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalpha)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdpha)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdpha)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdpha)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdpha)}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdphatarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalphatarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdphatarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdphatarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdphatarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdphatarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdpha)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalpha)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdpha)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdpha)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdpha)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdpha)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdphatarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalphatarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdphatarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdphatarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdphatarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdphatarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdpha)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalpha)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdpha)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdpha)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdpha)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdpha)}}</td>
                </tr>
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdphaperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.phaperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdphaperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdphaperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdphaperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdphaperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdphaper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.phaper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdphaper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdphaper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdphaper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdphaper)}}</td>
				  
                </tr>
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Pharmacy YPP</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdphaypptarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalphaypptarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdphaypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdphaypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdphaypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdphaypptarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdphaypp)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalphaypp)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdphaypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdphaypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdphaypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdphaypp)}}</td>
                </tr>
				
				
				<tr  >
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdphaypptarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalphaypptarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdphaypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdphaypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdphaypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdphaypptarget)}}</td>
                </tr>
				
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdphaypp)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalphaypp)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdphaypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdphaypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdphaypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdphaypp)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdphaypptarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalphaypptarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdphaypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdphaypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdphaypptarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdphaypptarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Rs.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdphaypp)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalphaypp)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdphaypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdphaypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdphaypp)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdphaypp)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdphayppperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.phaperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdphayppperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdphayppperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdphayppperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdphayppperthird)}}</td>
				  
                </tr>
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdphayppper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.phaper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdphayppper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdphayppper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdphayppper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdphayppper)}}</td>
				  
                </tr>
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Contact Lens</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{item.mtdconlenstarget}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueTotal.totalconlenstarget}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ1[0].mtdconlenstarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ2[0].mtdconlenstarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ3[0].mtdconlenstarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ4[0].mtdconlenstarget}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{item.mtdconlens}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueTotal.totalconlens}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ1[0].mtdconlens}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ2[0].mtdconlens}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ3[0].mtdconlens}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{thirdYearRevenueQ4[0].mtdconlens}}</td>
                </tr>
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{item.mtdconlenstarget}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueTotal.totalconlenstarget}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ1[0].mtdconlenstarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ2[0].mtdconlenstarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ3[0].mtdconlenstarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ4[0].mtdconlenstarget}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{item.mtdconlens}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueTotal.totalconlens}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ1[0].mtdconlens}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ2[0].mtdconlens}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ3[0].mtdconlens}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{preYearRevenueQ4[0].mtdconlens}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{item.mtdconlenstarget}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueTotal.totalconlenstarget}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ1[0].mtdconlenstarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ2[0].mtdconlenstarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ3[0].mtdconlenstarget}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ4[0].mtdconlenstarget}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{item.mtdconlens}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueTotal.totalconlens}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ1[0].mtdconlens}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ1[0].mtdconlens}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ3[0].mtdconlens}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{currentYearRevenueQ4[0].mtdconlens}}</td>
                </tr>
				
				
							
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdconlensperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.conlensperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdconlensperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdconlensperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdconlensperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdconlensperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdconlensper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.conlensper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdconlensper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdconlensper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdconlensper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdconlensper)}}</td>
				  
                </tr>
				
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Other surgery Nos </td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdosucounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalosucounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdosucounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdosucounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdosucounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdosucounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdosucount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueTotal.totalosucount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ1[0].mtdosucount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ2[0].mtdosucount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ3[0].mtdosucount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(thirdYearRevenueQ4[0].mtdosucount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdosucounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalosucounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdosucounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdosucounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdosucounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdosucounttarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdosucount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueTotal.totalosucount)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ1[0].mtdosucount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ2[0].mtdosucount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ3[0].mtdosucount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(preYearRevenueQ4[0].mtdosucount)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat1(item.mtdosucounttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalosucounttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdosucounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdosucounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdosucounttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdosucounttarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >Nos.</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat1(item.mtdosucount)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueTotal.totalosucount)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ1[0].mtdosucount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ2[0].mtdosucount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ3[0].mtdosucount)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat1(currentYearRevenueQ4[0].mtdosucount)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdosucountperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.osucountperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdosucountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdosucountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdosucountperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdosucountperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdosucountper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.osucountper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdosucountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdosucountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdosucountper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdosucountper)}}</td>
				  
                </tr>
				
				
				
				<br><br>
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Other surgery Value </td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdosutarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalosutarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdosutarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdosutarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdosutarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdosutarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdosu)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalosu)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdosu)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdosu)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdosu)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdosu)}}</td>
                </tr>
				
				<tr  >
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdosutarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalosutarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdosutarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdosutarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdosutarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdosutarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdosu)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalosu)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdosu)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdosu)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdosu)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdosu)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdosutarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalosutarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdosutarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdosutarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdosutarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdosutarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdosu)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalosu)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdosu)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdosu)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdosu)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdosu)}}</td>
                </tr>
				
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdosuperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.osuperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdosuperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdosuperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdosuperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdosuperthird)}}</td>
				  
                </tr>
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdosuper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.osuper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdosuper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdosuper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdosuper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdosuper)}}</td>
				  
                </tr>
				
				
				<br><br>
				
				
				<tr  >
                  <td
				    rowspan="8"
                    class="text-xs-left"
                    style="transform: rotate(-90deg);white-space:nowrap!important;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Invs, Treat Value </td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdtreatinvtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totaltreatinvtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdtreatinvtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdtreatinvtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdtreatinvtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdtreatinvtarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.thirdYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdtreatinv)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totaltreatinv)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdtreatinv)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdtreatinv)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdtreatinv)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdtreatinv)}}</td>
                </tr>
				
				<tr  >
                 
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.preYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdtreatinvtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totaltreatinvtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdtreatinvtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdtreatinvtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdtreatinvtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdtreatinvtarget)}}</td>
                </tr>
				<tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.preYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdtreatinv)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totaltreatinv)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdtreatinv)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdtreatinv)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdtreatinv)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdtreatinv)}}</td>
                </tr>
				
				
				<tr  >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.curYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numFormat(item.mtdtreatinvtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totaltreatinvtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdtreatinvtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdtreatinvtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdtreatinvtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdtreatinvtarget)}}</td>
                </tr>
				
			    <tr class="branchesgrp1">
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >FY {{this.curYeartext}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >RIL</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numFormat(item.mtdtreatinv)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totaltreatinv)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdtreatinv)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdtreatinv)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdtreatinv)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdtreatinv)}}</td>
                </tr>
				
				
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText1}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdtreatinvperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.treatinvperthird)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdtreatinvperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdtreatinvperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdtreatinvperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdtreatinvperthird)}}</td>
				  
                </tr>
				
				<tr >
                  
                  <td
                    class="text-xs-center"
                    scope="col"
                   width="5%"
                  >{{goalText}}</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in revPer" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdtreatinvper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.treatinvper)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdtreatinvper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdtreatinvper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdtreatinvper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdtreatinvper)}}</td>
				  
                </tr>
				
				

              </tbody>
				
				

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
    branch: [],
	  SetBranch: [],
	  currentYearRevenue :null,
	  currentYearRevenueTar :null,
	  currentYearRevenueTotal :null,
	  currentYearRevenueTarTotal :null,
	  currentYearRevenueQ1 :null,
	  currentYearRevenueQ2 :null,
	  currentYearRevenueQ3 :null,
	  currentYearRevenueQ4 :null,
	  revenuePerQ1 :null,
	  revenuePerQ2 :null,
	  revenuePerQ3 :null,
	  revenuePerQ4 :null,
	  preYearRevenueQ1 :null,
	  preYearRevenueQ2 :null,
	  preYearRevenueQ3 :null,
	  preYearRevenueQ4 :null,
	  thirdYearRevenueQ1 : null,
	  thirdYearRevenueQ2 : null,
	  thirdYearRevenueQ3 : null,
	  thirdYearRevenueQ4 : null,
	  preYearRevenueTotal :null,
	  thirdYearRevenueTotal :null,
	  preYearRevenueTarTotal :null,
	  preYearRevenue :null,
	  thirdYearRevenue :null,
	  preYearRevenueTar :null,
	  preYearRevenueQ :null,
	  revPer :null,
	  totalrevper:null,
	  curYeartext:null,
	  preYeartext:null,
	  thirdYeartext:null,
	  goalText:null,
	  goalText1:null,
	  
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
	group: null,
	state: null,
    branchwise: null,
    json_data: null,
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
    json_fields: {
      "Group/Branch": "branch",
      "FTD": "ftdopdrev",
      "MTD": "mtdopdrev",
	  "LMTD": "mtdopdrevlastyear",
	  "MTD%": "mtdopdpercentage",
	  
      
    },
    fileName: null
  }),
  created () {
    this.getToday();
	this.loadbranch();
	
  },
  methods: {
    getToday () {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },
    apiRequestCogsdata(SetBranch){

  //alert(this.SetBranch);

	this.isLoading = true;
    
	
	this.$http.get(`https://mis.dragarwal.com/api-snapshotrevenue/${this.SetBranch}`).then(response => {

      //console.log(response.data);
      this.processDatacogs(response.data);
		this.isLoading = false;
		this.show = true;
     
    })




},
    processDatacogs (data) {

        this.curYeartext = data.curYear;
		this.preYeartext = data.preYear;
		
		this.thirdYeartext=data.ThirdYearBefore;
		this.goalText = data.goalText;
		this.goalText1 = data.goalText1;
	    this.currentYearRevenue = data.monthWiseRevenue['currentyearmonth'];
		
		
	   
	    this.currentYearRevenueQ1 = data.QWiseRevenue['currentyearQ']['Q1'];	
		this.currentYearRevenueQ2 = data.QWiseRevenue['currentyearQ']['Q2'];
		this.currentYearRevenueQ3 = data.QWiseRevenue['currentyearQ']['Q3'];
		this.currentYearRevenueQ4 = data.QWiseRevenue['currentyearQ']['Q4'];
		
		
		this.preYearRevenueQ1 = data.QWiseRevenue['lastyearQ']['Q1'];	
		this.preYearRevenueQ2 = data.QWiseRevenue['lastyearQ']['Q2'];
		this.preYearRevenueQ3 = data.QWiseRevenue['lastyearQ']['Q3'];
		this.preYearRevenueQ4 = data.QWiseRevenue['lastyearQ']['Q4'];
		
		
		this.thirdYearRevenueQ1 = data.QWiseRevenue['thirdyearQ']['Q1'];	
		this.thirdYearRevenueQ2 = data.QWiseRevenue['thirdyearQ']['Q2'];
		this.thirdYearRevenueQ3 = data.QWiseRevenue['thirdyearQ']['Q3'];
		this.thirdYearRevenueQ4 = data.QWiseRevenue['thirdyearQ']['Q4'];
		
		
		this.revenuePerQ1 =data.QWiseRevenue['revenueQper']['Q1'];	
		this.revenuePerQ2 =data.QWiseRevenue['revenueQper']['Q2'];
		this.revenuePerQ3 =data.QWiseRevenue['revenueQper']['Q3'];
		this.revenuePerQ4 =data.QWiseRevenue['revenueQper']['Q4'];
		this.totalrevper = data.monthWiseRevenue['totalper']
		
	    this.preYearRevenue =data.monthWiseRevenue['lastyearmonth'];
		this.revPer =data.monthWiseRevenue['monthper'];
		
	    
	    this.preYearRevenueQ =null;
		this.currentYearRevenueTotal = data.monthWiseRevenue['currentyeartotal'];
		this.preYearRevenueTotal =data.monthWiseRevenue['lastyeartotal'];
		this.thirdYearRevenueTotal =data.monthWiseRevenue['thirdyeartotal'];
	    //this.preYearRevenueTarTotal =data.lastyeartotal.totalrev;
		
		
		this.thirdYearRevenue =data.monthWiseRevenue['thirdyearmonth'];
    },
	numFormat(num){
	    if( num != "Infinity" && num!='NaN'){
			let numObj=new Intl.NumberFormat("en-IN");
			
			return Number(num).toLocaleString('en', {minimumFractionDigits: 1});
			//return numObj.format(number);
		}else{
		    
				return "-";
		}
	},
	numFormat1(num){
	    if(num != "Infinity" && num!='NaN'){
			let numObj=new Intl.NumberFormat("en-IN");
			return numObj.format(num);
		}else{
		   return "-";
		}
	},
	numPosNeg(num){
		if(num>=0 && ( num != "Infinity" && num!='NaN' && num!='-')){
		    return num;
			
			
		}else{
			if(num<0 && ( num != "Infinity" && num!='NaN' && num!='-')){
				return "("+Math.abs(num)+")";
				
			}else{
			
			    
				return "-";
			}
		}
	},
	
	loadbranch() {
	
	        
	       
			let admin = JSON.parse(sessionStorage.getItem("admin_user"));
			let normal = JSON.parse(sessionStorage.getItem("normal_user"));
			let group = JSON.parse(sessionStorage.getItem("group_user"));
			
			
			
			if(normal == null){
			this.SetBranch='ADY';
			
			var arr2 = [{TEXT: 'Select',shortCode: '' },{TEXT: 'All India',shortCode: 'All India' },{TEXT: 'AEH',shortCode: 'AEH' },{TEXT: 'AHC',shortCode: 'AHC' },{TEXT: 'AHI',shortCode: 'AHI' },{TEXT: 'Chennai',shortCode: 'Chennai' },{TEXT: 'Tamil Nadu',shortCode: 'Tamil Nadu' },{TEXT: 'ROTN',shortCode: 'ROTN' },{TEXT: 'Karnataka',shortCode: 'Karnataka' },{TEXT: 'Andhra Pradesh',shortCode: 'Andhra Pradesh' },{TEXT: 'Telangana',shortCode: 'Telangana' },{TEXT: 'Maharashtra',shortCode: 'Maharashtra' },{TEXT: 'Madhya Pradesh',shortCode: 'Madhya Pradesh' },{TEXT: 'Odisha',shortCode: 'Odisha' },{TEXT: 'ROI',shortCode: 'ROI' },{TEXT: 'Kerala',shortCode: 'Kerala' },{TEXT: 'Kolkata',shortCode: 'Kolkata' }];		
			this.$http.get(`https://mis.dragarwal.com/api-opr-branches`).then(response => {
			         //console.log(response.data);
					 
					 this.branch = arr2.concat(response.data);
					  this.apiRequestCogsdata(this.SetBranch);
					 
					 
					
     
			})}
			else{
				var arr2 = [{TEXT: 'Select',shortCode: '' }];

				if(normal.role=='ch_user'){			
					this.$http.get(`https://mis.dragarwal.com/api-chbranch/${normal.userName}`).then(response => {
							 //console.log(response.data);
							 this.branch = arr2.concat(response.data);							 
							 this.SetBranch=response.data[0].shortCode;	
							 this.apiRequestCogsdata(this.SetBranch);					 
			 
					})
				}else{
					this.$http.get(`https://mis.dragarwal.com/api-schbranch/${normal.userName}`).then(response => {
							 //console.log(response.data);
							 this.branch = arr2.concat(response.data);	
							 this.SetBranch=response.data[0].shortCode;	
							 this.apiRequestCogsdata(this.SetBranch);					 
			 
					})
				}
			}
			
			
			
			
			
	},
	exportToExcel(tableID, filename = ''){
    var downloadurl;
    var dataFileType = 'application/vnd.ms-excel';
	document.getElementById("tabHead").style.display = "block";
    var tableSelect = document.getElementById(tableID);
    var tableHTMLData = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+this.SetBranch+'.xls':'export_excel_data.xls';
    
    // Create download link element
    downloadurl = document.createElement("a");
    
    document.body.appendChild(downloadurl);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTMLData], {
            type: dataFileType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadurl.href = 'data:' + dataFileType + ', ' + tableHTMLData;
    
        // Setting the file name
        downloadurl.download = filename;
        
        //triggering the function
        downloadurl.click();
    }
	document.getElementById("tabHead").style.display = "none";
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

.branchesgrp1{
background-color : #d0dff7!important
}



.opr  tbody > tr > td:nth-last-child(5) {background-color: #fcd6ec!important;width:6%!important}
.opr  tbody > tr > td:nth-last-child(1) {background-color: #a8f3f7!important;width:6%!important}
.opr  tbody > tr > td:nth-last-child(2) {background-color: #a8f3f7!important;width:6%!important}
.opr  tbody > tr > td:nth-last-child(3) {background-color: #a8f3f7!important;width:6%!important}
.opr  tbody > tr > td:nth-last-child(4) {background-color: #a8f3f7!important;width:6%!important}


.opr   tbody > tr > td  {position:relative!important; }
.opr   tbody > tr > td:first-child {width:5%!important;}
</style>
