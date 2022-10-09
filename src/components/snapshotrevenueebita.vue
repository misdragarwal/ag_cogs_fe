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
            <v-toolbar-title>Snapshot EBITDA </v-toolbar-title>
            <v-divider
              class="mx-2 black"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
			
			
			<v-select :items=branch v-model="SetBranch" label="Branch:" item-text="TEXT" item-value="shortCode" id="SelBranch"></v-select>
			<v-spacer></v-spacer>
			<v-btn rounded color="primary" dark @click="apiRequestCogsdata(SetBranch)">GET</v-btn>
			
			<v-btn rounded color="primary" dark @click="exportToExcel('opr_table','OPR_EBITDA')">Download XL</v-btn>
		    
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
                  >Revenue (with Tax)</td>
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
				
				
								<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Revenue (without Tax)</td>
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
				  {{numFormat(item.mtdrevwotaxtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalrevwotaxtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdrevwotaxtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdrevwotaxtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdrevwotaxtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdrevwotaxtarget)}}</td>
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
				  {{numFormat(item.mtdrevwotax)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalrevwotax)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdrevwotax)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdrevwotax)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdrevwotax)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdrevwotax)}}</td>
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
				  {{numFormat(item.mtdrevwotaxtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalrevwotaxtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdrevwotaxtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdrevwotaxtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdrevwotaxtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdrevwotaxtarget)}}</td>
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
				  {{numFormat(item.mtdrevwotax)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalrevwotax)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdrevwotax)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdrevwotax)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdrevwotax)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdrevwotax)}}</td>
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
				  {{numFormat(item.mtdrevwotaxtarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalrevwotaxtarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdrevwotaxtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdrevwotaxtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdrevwotaxtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdrevwotaxtarget)}}</td>
				  
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
				  {{numFormat(item.mtdrevwotax)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalrevwotax)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdrevwotax)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdrevwotax)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdrevwotax)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdrevwotax)}}</td>
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
				  {{numPosNeg(item.mtdrevwotaxperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdrevwotaxperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrevwotaxperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrevwotaxperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrevwotaxperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrevwotaxperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdrevwotaxper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdrevwotaxper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrevwotaxper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrevwotaxper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrevwotaxper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrevwotaxper)}}</td>
				  
                </tr>
				
				
				
				
				
				
				
				
								<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Material Consumption</td>
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
				  {{numFormat(item.mtdmctarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalmctarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdmctarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdmctarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdmctarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdmctarget)}}</td>
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
				  {{numFormat(item.mtdmc)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalmc)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdmc)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdmc)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdmc)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdmc)}}</td>
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
				  {{numFormat(item.mtdmctarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalmctarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdmctarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdmctarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdmctarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdmctarget)}}</td>
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
				  {{numFormat(item.mtdmc)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalmc)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdmc)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdmc)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdmc)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdmc)}}</td>
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
				  {{numFormat(item.mtdmctarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalmctarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdmctarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdmctarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdmctarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdmctarget)}}</td>
				  
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
				  {{numFormat(item.mtdmc)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalmc)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdmc)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdmc)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdmc)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdmc)}}</td>
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
				  {{numPosNeg(item.mtdmcperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdmcperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdmcperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdmcperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdmcperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdmcperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdmcper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdmcper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdmcper)}}</td>
				  
                </tr>
				
				<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Material Cost %</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >FY {{this.thirdYeartext}} Target</td>
                  <td
                    class="text-xs-center"
                    scope="col"
                    width="3%"
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numPosNeg(item.mtdmcpertarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(thirdYearRevenueTotal.totalmcpertarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(thirdYearRevenueQ1[0].mtdmcpertarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(thirdYearRevenueQ2[0].mtdmcpertarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(thirdYearRevenueQ3[0].mtdmcpertarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(thirdYearRevenueQ4[0].mtdmcpertarget)}}</td>
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
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in thirdYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdmcper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(thirdYearRevenueTotal.totalmcper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numPosNeg(thirdYearRevenueQ1[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(thirdYearRevenueQ2[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(thirdYearRevenueQ3[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(thirdYearRevenueQ4[0].mtdmcper)}}</td>
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
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center"
                    scope="col"
					width="5%">
				  {{numPosNeg(item.mtdmcpertarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(preYearRevenueTotal.totalmcpertarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(preYearRevenueQ1[0].mtdmcpertarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(preYearRevenueQ2[0].mtdmcpertarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(preYearRevenueQ3[0].mtdmcpertarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(preYearRevenueQ4[0].mtdmcpertarget)}}</td>
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
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in preYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdmcper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(preYearRevenueTotal.totalmcper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numPosNeg(preYearRevenueQ1[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(preYearRevenueQ2[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(preYearRevenueQ3[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(preYearRevenueQ4[0].mtdmcper)}}</td>
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
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdmcpertarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(currentYearRevenueTotal.totalmcpertarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(currentYearRevenueQ1[0].mtdmcpertarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(currentYearRevenueQ2[0].mtdmcpertarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(currentYearRevenueQ3[0].mtdmcpertarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(currentYearRevenueQ4[0].mtdmcpertarget)}}</td>
				  
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
                  >%</td>
				
				  
				  <td v-for="(item,indexs) in currentYearRevenue" 
				  class="text-xs-center" width="5%"
                    scope="col">
				  {{numPosNeg(item.mtdmcper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(currentYearRevenueTotal.totalmcper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(currentYearRevenueQ1[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(currentYearRevenueQ2[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(currentYearRevenueQ3[0].mtdmcper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(currentYearRevenueQ4[0].mtdmcper)}}</td>
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
				  {{numPosNeg(item.mtdmcper1third)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdmcper1third)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdmcper1third)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdmcper1third)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdmcper1third)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdmcper1third)}}</td>
				  
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
				  {{numPosNeg(item.mtdmcper1)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdmcper1)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdmcper1)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdmcper1)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdmcper1)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdmcper1)}}</td>
				  
                </tr>
				
				<br><br>
				
				<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Gross Margin</td>
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
				  {{numFormat(item.mtdgrmargintarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalgrmargintarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdgrmargintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdgrmargintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdgrmargintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdgrmargintarget)}}</td>
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
				  {{numFormat(item.mtdgrmargin)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalgrmargin)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdgrmargin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdgrmargin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdgrmargin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdgrmargin)}}</td>
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
				  {{numFormat(item.mtdgrmargintarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalgrmargintarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdgrmargintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdgrmargintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdgrmargintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdgrmargintarget)}}</td>
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
				  {{numFormat(item.mtdgrmargin)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalgrmargin)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdgrmargin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdgrmargin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdgrmargin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdgrmargin)}}</td>
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
				  {{numFormat(item.mtdgrmargintarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalgrmargintarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdgrmargintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdgrmargintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdgrmargintarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdgrmargintarget)}}</td>
				  
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
				  {{numFormat(item.mtdgrmargin)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalgrmargin)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdgrmargin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdgrmargin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdgrmargin)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdgrmargin)}}</td>
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
				  {{numPosNeg(item.mtdgrmarginperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdgrmarginperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdgrmarginperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdgrmarginperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdgrmarginperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdgrmarginperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdgrmarginper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdgrmarginper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdgrmarginper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdgrmarginper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdgrmarginper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdgrmarginper)}}</td>
				  
                </tr>
				
				<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Doctor Cost</td>
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
				  {{numFormat(item.mtddrcosttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totaldrcost)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtddrcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtddrcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtddrcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtddrcosttarget)}}</td>
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
				  {{numFormat(item.mtddrcost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totaldrcost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtddrcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtddrcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtddrcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtddrcost)}}</td>
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
				  {{numFormat(item.mtddrcosttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totaldrcosttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtddrcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtddrcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtddrcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtddrcosttarget)}}</td>
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
				  {{numFormat(item.mtddrcost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totaldrcost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtddrcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtddrcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtddrcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtddrcost)}}</td>
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
				  {{numFormat(item.mtddrcosttarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totaldrcosttarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtddrcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtddrcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtddrcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtddrcosttarget)}}</td>
				  
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
				  {{numFormat(item.mtddrcost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totaldrcost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtddrcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtddrcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtddrcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtddrcost)}}</td>
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
				  {{numPosNeg(item.mtddrcostperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtddrcostperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtddrcostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtddrcostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtddrcostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtddrcostperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtddrcostper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtddrcostper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtddrcostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtddrcostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtddrcostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtddrcostper)}}</td>
				  
                </tr>
				
				
				<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Staff Cost</td>
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
				  {{numFormat(item.mtdstaffcosttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalstaffcosttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdstaffcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdstaffcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdstaffcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdstaffcosttarget)}}</td>
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
				  {{numFormat(item.mtdstaffcost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalstaffcost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdstaffcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdstaffcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdstaffcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdstaffcost)}}</td>
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
				  {{numFormat(item.mtdstaffcosttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalstaffcosttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdstaffcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdstaffcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdstaffcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdstaffcosttarget)}}</td>
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
				  {{numFormat(item.mtdstaffcost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalstaffcost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdstaffcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdstaffcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdstaffcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdstaffcost)}}</td>
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
				  {{numFormat(item.mtdstaffcosttarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalstaffcosttarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdstaffcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdstaffcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdstaffcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdstaffcosttarget)}}</td>
				  
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
				  {{numFormat(item.mtdstaffcost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalstaffcost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdstaffcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdstaffcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdstaffcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdstaffcost)}}</td>
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
				  {{numPosNeg(item.mtdstaffcostperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdstaffcostperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdstaffcostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdstaffcostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdstaffcostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdstaffcostperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdstaffcostper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdstaffcostper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdstaffcostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdstaffcostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdstaffcostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdstaffcostper)}}</td>
				  
                </tr>
				
				<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Admin Cost</td>
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
				  {{numFormat(item.mtdadmincosttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totaladmincosttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdadmincosttarget)}}</td>
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
				  {{numFormat(item.mtdadmincost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totaladmincost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdadmincost)}}</td>
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
				  {{numFormat(item.mtdadmincosttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totaladmincosttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdadmincosttarget)}}</td>
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
				  {{numFormat(item.mtdadmincost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totaladmincost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdadmincost)}}</td>
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
				  {{numFormat(item.mtdadmincosttarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totaladmincosttarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdadmincosttarget)}}</td>
				  
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
				  {{numFormat(item.mtdadmincost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totaladmincost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdadmincost)}}</td>
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
				  {{numPosNeg(item.mtdadmincostperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdadmincostperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdadmincostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdadmincostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdadmincostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdadmincostperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdadmincostper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdadmincostper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdadmincostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdadmincostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdadmincostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdadmincostper)}}</td>
				  
                </tr>
				<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Marketing</td>
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
				  {{numFormat(item.mtdmarkettarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalmarkettarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdmarkettarget)}}</td>
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
				  {{numFormat(item.mtdmarket)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalmarket)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdmarket)}}</td>
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
				  {{numFormat(item.mtdmarkettarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalmarkettarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdmarkettarget)}}</td>
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
				  {{numFormat(item.mtdmarket)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalmarket)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdmarket)}}</td>
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
				  {{numFormat(item.mtdmarkettarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalmarkettarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdmarkettarget)}}</td>
				  
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
				  {{numFormat(item.mtdmarket)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalmarket)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdmarket)}}</td>
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
				  {{numPosNeg(item.mtdmarketperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdmarketperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdmarketperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdmarketperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdmarketperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdmarketperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdmarketper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdmarketper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdmarketper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdmarketper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdmarketper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdmarketper)}}</td>
				  
                </tr>
				
				<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Rent </td>
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
				  {{numFormat(item.mtdrenttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalrenttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdrenttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdrenttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdrenttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdrenttarget)}}</td>
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
				  {{numFormat(item.mtdrent)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalrent)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdrent)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdrent)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdrent)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdrent)}}</td>
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
				  {{numFormat(item.mtdrenttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalrenttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdrenttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdrenttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdrenttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdrenttarget)}}</td>
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
				  {{numFormat(item.mtdrent)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalrent)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdrent)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdrent)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdrent)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdrent)}}</td>
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
				  {{numFormat(item.mtdrenttarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalrenttarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdrenttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdrenttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdrenttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdrenttarget)}}</td>
				  
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
				  {{numFormat(item.mtdrent)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalrent)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdrent)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdrent)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdrent)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdrent)}}</td>
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
				  {{numPosNeg(item.mtdrentperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdrentperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrentperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrentperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrentperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrentperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdrentper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdrentper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrentper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrentper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrentper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrentper)}}</td>
				  
                </tr>
				
				<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Rent Equalization</td>
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
				  {{numFormat(item.mtdrenteqtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalrenteqtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdrenteqtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdrenteqtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdrenteqtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdrenteqtarget)}}</td>
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
				  {{numFormat(item.mtdrenteq)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalrenteq)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdrenteq)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdrenteq)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdrenteq)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdrenteq)}}</td>
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
				  {{numFormat(item.mtdrenteqtarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalrenteqtarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdrenteqtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdrenteqtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdrenteqtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdrenteqtarget)}}</td>
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
				  {{numFormat(item.mtdrenteq)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalrenteq)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdrenteq)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdrenteq)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdrenteq)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdrenteq)}}</td>
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
				  {{numFormat(item.mtdrenteqtarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalrenteqtarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdrenteqtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdrenteqtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdrenteqtarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdrenteqtarget)}}</td>
				  
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
				  {{numFormat(item.mtdrenteq)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalrenteq)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdrenteq)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdrenteq)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdrenteq)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdrenteq)}}</td>
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
				  {{numPosNeg(item.mtdrenteqperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdrenteqperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrenteqperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrenteqperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrenteqperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrenteqperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdrenteqper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdrenteqper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdrenteqper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdrenteqper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdrenteqper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdrenteqper)}}</td>
				  
                </tr>
				
				
								<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Branch Level EBITDA</td>
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
				  {{numFormat(item.mtdbrnlelebittarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalbrnlelebittarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdbrnlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdbrnlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdbrnlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdbrnlelebittarget)}}</td>
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
				  {{numFormat(item.mtdbrnlelebit)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalbrnlelebit)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdbrnlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdbrnlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdbrnlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdbrnlelebit)}}</td>
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
				  {{numFormat(item.mtdbrnlelebittarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalbrnlelebittarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdbrnlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdbrnlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdbrnlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdbrnlelebittarget)}}</td>
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
				  {{numFormat(item.mtdbrnlelebit)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalbrnlelebit)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdbrnlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdbrnlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdbrnlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdbrnlelebit)}}</td>
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
				  {{numFormat(item.mtdbrnlelebittarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalbrnlelebittarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdbrnlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdbrnlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdbrnlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdbrnlelebittarget)}}</td>
				  
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
				  {{numFormat(item.mtdbrnlelebit)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalbrnlelebit)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdbrnlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdbrnlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdbrnlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdbrnlelebit)}}</td>
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
				  {{numPosNeg(item.mtdbrnlelebitperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdbrnlelebitperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdbrnlelebitperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdbrnlelebitperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdbrnlelebitperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdbrnlelebitperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdbrnlelebitper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdbrnlelebitper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdbrnlelebitper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdbrnlelebitper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdbrnlelebitper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdbrnlelebitper)}}</td>
				  
                </tr>
				
								<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Regional Salary Cost</td>
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
				  {{numFormat(item.mtdregsalcosttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalregsalcosttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdregsalcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdregsalcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdregsalcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdregsalcosttarget)}}</td>
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
				  {{numFormat(item.mtdregsalcost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalregsalcost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdregsalcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdregsalcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdregsalcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdregsalcost)}}</td>
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
				  {{numFormat(item.mtdregsalcosttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalregsalcosttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdregsalcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdregsalcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdregsalcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdregsalcosttarget)}}</td>
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
				  {{numFormat(item.mtdregsalcost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalregsalcost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdregsalcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdregsalcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdregsalcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdregsalcost)}}</td>
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
				  {{numFormat(item.mtdregsalcosttarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalregsalcosttarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdregsalcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdregsalcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdregsalcosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdregsalcosttarget)}}</td>
				  
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
				  {{numFormat(item.mtdregsalcost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalregsalcost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdregsalcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdregsalcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdregsalcost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdregsalcost)}}</td>
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
				  {{numPosNeg(item.mtdregsalcostperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdregsalcostperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdregsalcostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdregsalcostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdregsalcostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdregsalcostperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdregsalcostper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdregsalcostper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdregsalcostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdregsalcostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdregsalcostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdregsalcostper)}}</td>
				  
                </tr>
								<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Regional Admin cost</td>
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
				  {{numFormat(item.mtdregadmincosttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalregadmincosttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdregadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdregadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdregadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdregadmincosttarget)}}</td>
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
				  {{numFormat(item.mtdregadmincost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalregadmincost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdregadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdregadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdregadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdregadmincost)}}</td>
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
				  {{numFormat(item.mtdregadmincosttarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalregadmincosttarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdregadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdregadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdregadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdregadmincosttarget)}}</td>
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
				  {{numFormat(item.mtdregadmincost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalregadmincost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdregadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdregadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdregadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdregadmincost)}}</td>
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
				  {{numFormat(item.mtdregadmincosttarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalregadmincosttarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdregadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdregadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdregadmincosttarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdregadmincosttarget)}}</td>
				  
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
				  {{numFormat(item.mtdregadmincost)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalregadmincost)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdregadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdregadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdregadmincost)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdregadmincost)}}</td>
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
				  {{numPosNeg(item.mtdregadmincostperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdregadmincostperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdregadmincostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdregadmincostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdregadmincostperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdregadmincostperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdregadmincostper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdregadmincostper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdregadmincostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdregadmincostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdregadmincostper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdregadmincostper)}}</td>
				  
                </tr>
								<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Regional Marketing cost</td>
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
				  {{numFormat(item.mtdregmarkettarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalregmarkettarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdregmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdregmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdregmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdregmarkettarget)}}</td>
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
				  {{numFormat(item.mtdregmarket)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalregmarket)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdregmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdregmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdregmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdregmarket)}}</td>
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
				  {{numFormat(item.mtdregmarkettarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalregmarkettarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdregmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdregmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdregmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdregmarkettarget)}}</td>
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
				  {{numFormat(item.mtdregmarket)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalregmarket)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdregmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdregmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdregmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdregmarket)}}</td>
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
				  {{numFormat(item.mtdregmarkettarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalregmarkettarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdregmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdregmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdregmarkettarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdregmarkettarget)}}</td>
				  
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
				  {{numFormat(item.mtdregmarket)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalregmarket)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdregmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdregmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdregmarket)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdregmarket)}}</td>
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
				  {{numPosNeg(item.mtdregmarketperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdregmarketperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdregmarketperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdregmarketperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdregmarketperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdregmarketperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdregmarketper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdregmarketper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdregmarketper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdregmarketper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdregmarketper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdregmarketper)}}</td>
				  
                </tr>
				
				
				<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Regional Level EBITDA</td>
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
				  {{numFormat(item.mtdreglelebittarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalreglelebittarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdreglelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdreglelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdreglelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdreglelebittarget)}}</td>
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
				  {{numFormat(item.mtdreglelebit)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalreglelebit)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdreglelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdreglelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdreglelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdreglelebit)}}</td>
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
				  {{numFormat(item.mtdreglelebittarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalreglelebittarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdreglelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdreglelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdreglelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdreglelebittarget)}}</td>
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
				  {{numFormat(item.mtdreglelebit)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalreglelebit)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdreglelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdreglelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdreglelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdreglelebit)}}</td>
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
				  {{numFormat(item.mtdreglelebittarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalreglelebittarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdreglelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdreglelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdreglelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdreglelebittarget)}}</td>
				  
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
				  {{numFormat(item.mtdreglelebit)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalreglelebit)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdreglelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdreglelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdreglelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdreglelebit)}}</td>
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
				  {{numPosNeg(item.mtdreglelebitperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdreglelebitperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdreglelebitperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdreglelebitperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdreglelebitperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdreglelebitperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdreglelebitper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdreglelebitper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdreglelebitper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdreglelebitper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdreglelebitper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdreglelebitper)}}</td>
				  
                </tr>
				
				<br><br><br>
<tr>
                  <td rowspan="8"
                    style="transform: rotate(-90deg);white-space:nowrap!important;valign:bottom;transform-origin: 79% 61%;"
                    scope="col"                  
                  >Corporate Level EBITDA</td>
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
				  {{numFormat(item.mtdcorlelebittarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalcorlelebittarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdcorlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdcorlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdcorlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdcorlelebittarget)}}</td>
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
				  {{numFormat(item.mtdcorlelebit)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueTotal.totalcorlelebit)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ1[0].mtdcorlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ2[0].mtdcorlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ3[0].mtdcorlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(thirdYearRevenueQ4[0].mtdcorlelebit)}}</td>
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
				  {{numFormat(item.mtdcorlelebittarget)}}
				  </td>
				 <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalcorlelebittarget)}}</td>
				 
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdcorlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdcorlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdcorlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdcorlelebittarget)}}</td>
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
				  {{numFormat(item.mtdcorlelebit)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueTotal.totalcorlelebit)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col" 
                    width="5%"
                  >{{numFormat(preYearRevenueQ1[0].mtdcorlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ2[0].mtdcorlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ3[0].mtdcorlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(preYearRevenueQ4[0].mtdcorlelebit)}}</td>
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
				  {{numFormat(item.mtdcorlelebittarget)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalcorlelebittarget)}}</td>
				 
				   <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdcorlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdcorlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdcorlelebittarget)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdcorlelebittarget)}}</td>
				  
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
				  {{numFormat(item.mtdcorlelebit)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueTotal.totalcorlelebit)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ1[0].mtdcorlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ2[0].mtdcorlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ3[0].mtdcorlelebit)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numFormat(currentYearRevenueQ4[0].mtdcorlelebit)}}</td>
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
				  {{numPosNeg(item.mtdcorlelebitperthird)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdcorlelebitperthird)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdcorlelebitperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdcorlelebitperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdcorlelebitperthird)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdcorlelebitperthird)}}</td>
				  
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
				  {{numPosNeg(item.mtdcorlelebitper)}}
				  </td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(totalrevper.mtdcorlelebitper)}}</td>
				  
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ1[0].mtdcorlelebitper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ2[0].mtdcorlelebitper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ3[0].mtdcorlelebitper)}}</td>
				  <td
                    class="text-xs-center"
                    scope="col"
                    width="5%"
                  >{{numPosNeg(revenuePerQ4[0].mtdcorlelebitper)}}</td>
				  
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
    
	
	this.$http.get(`https://mis.dragarwal.com/api-snapshotrevenue-ebita/${this.SetBranch}`).then(response => {

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
