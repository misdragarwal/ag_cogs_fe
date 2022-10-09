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
            <v-divider
              class="mx-2 black"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
			<div class="table-responsive" width="100%">
			<table width="100%">
		 <thead width="100%">
		 <tr width="100%">
			<th width="20%">
				<v-select
				  :items=entities
				  v-model="SetEntity"    
				  label="Entity:"    
				  id="SelEntity"
				   item-text="shortCode"
				   item-value="text"
				  v-on:change='getRegion'
				  
				></v-select>
			</th>
			<th width="4%">
				
			</th>
			<th width="20%">
				  <v-select
				  :items=regions				  
				  v-model="SetRegion"    
				  label="Region:"    
				  id="SelRegion"
				   item-text="shortCode"
				   item-value="text"
				  v-on:change='getBranches'
				 
				></v-select>
			</th>
			<th width="4%">
				
			</th>
			<th width="20%">
				<v-select
				  :items=branch				  
				  v-model="SetBranch"    
				  label="Branch:"				   
				  item-text="shortCode"
				  item-value="text"	  
				  id="SelBranch"
				  
				></v-select>
			</th>
			<!--<th width="20%">
				<v-select
				  :items=types				  
				  v-model="SetMethod"    
				  label="Month:"				   
				  item-text="shortCode"
				  item-value="text"	  
				  id="SelBranch"
				  
				></v-select>
			</th>-->
			
			
			
			
			<th width="4%">
				
			</th>
			<th width="20%">
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
                
				type=month
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
                  @click="$refs.menu.save(date)"
                  style="outline:none"
                >Ok</v-btn>
              </v-date-picker>
            </v-menu>
            </th>
			<th width="4%">
			 <v-btn rounded color="primary" dark @click="apiRequestCogDashboard(date,SetEntity,SetRegion,SetBranch)">Generate</v-btn>
			</th>
			</tr>
			<br><br>			
		   </thead>
		   </table>
		   
            
          
          <loading
            :active.sync="isLoading"
            :is-full-page="fullPage"
            color="#7f0000"
            loader="bars"
          ></loading>
		  
		  <table
              class="table table-hover table-bordered"
              v-if="show"
            >
              <thead>
               
                  
                <tr class="grey lighten-2">
                  <th
                    scope="col"
                    class="text-xs-center"
                  ></th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Revenue</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Contribution_%</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >COGS</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >MC_%</th>
                 
                </tr>
              </thead>
              <tbody>
               
                <tr
                  scope="row"
                  v-for="(item,index) in services"
                 
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"                   
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.contribution|numberFormat}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdcogs| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mc|numberFormat}} %</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in services_list"
                 
                  class="grey lighten-4"
                >
                  <td
                    scope="row"                   
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.contribution|numberFormat}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdcogs| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mc|numberFormat}} %</td>                 
                </tr>
				
				
				<tr
                  scope="row"
                  v-for="(item,index) in opticals"
                 
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"                   
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.contribution|numberFormat}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdcogs| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mc|numberFormat}} %</td>
                  
                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in opticals_list"
                 
                  class="grey lighten-4"
                >
                  <td
                    scope="row"                   
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.contribution|numberFormat}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdcogs| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mc|numberFormat}} %</td>                 
                </tr>
					<tr
                  scope="row"
                  v-for="(item,index) in pharmacy"
                 
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"                   
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.contribution|numberFormat}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdcogs| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mc|numberFormat}}%</td>
                  
                </tr>
					<tr
                  scope="row"
                  v-for="(item,index) in contact_lens"
                 
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"                   
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.contribution|numberFormat}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdcogs| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mc|numberFormat}} %</td>
                  
                </tr>
				<tr
                  scope="row"              
                 
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"                   
                    style="cursor:pointer"
                  >{{billed.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{billed.mtdrev| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{billed.contribution |numberFormat}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{billed.mtdcogs| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{billed.mc|numberFormat}} %</td>
                  
                </tr>
				<tr
                  scope="row"              
                 
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"                   
                    style="cursor:pointer"
                  >{{referal.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{referal.mtdrev| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{referal.contribution |numberFormat}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{referal.mtdcogs| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{referal.mc|numberFormat}} %</td>
                  
                </tr>
                <tr
                  scope="row"              
                 
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"                   
                    style="cursor:pointer"
                  >{{witreferal.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{witreferal.mtdrev| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{witreferal.contribution |numberFormat}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{witreferal.mtdcogs| lakshFormatRevenueCogs}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{witreferal.mc|numberFormat}} %</td>
                  
                </tr>
              </tbody>
            </table>
		  
		  
		  
		  
		  
         </div>
        </v-flex>
        
        </v-dialog>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
import moment from "moment";
import { serverBus } from "../main";
export default {

  data: () => ({
     isLoading: false,
	 loading: false,
     date: null,
	 services:null,
	 services_list:null,
	 opticals:null,
	 optical_list:null,
	 pharmacy:null,
	 contact_lens:null,
	 billed:null,
referal:null,
witreferal:null,	 
	 entities: [
        { shortCode: 'Select All', text: ''},
		{  shortCode: 'AEH', text: 'AEH' },
        { shortCode: 'AHC', text: 'AHC' }
       
      ],
	  branch : [
        { shortCode: 'Select All', text: ''}		
       
      ],
	  regions : [
        { shortCode: 'Select All', text: ''},
		{ shortCode: 'Chennai', text: 'Chennai'},
		{ shortCode: 'ROTN', text: 'ROTN'},
		{ shortCode: 'ROI', text: 'ROI'},	
		{ shortCode: 'KA', text: 'KA'},	
		{ shortCode: 'TS', text: 'TS'},        
		{ shortCode: 'AP', text: 'AP'},	
		{ shortCode: 'WB', text: 'WB'},
        { shortCode: 'OD', text: 'OD'}
      ],
	  types: [
        /*{ shortCode: 'Select', text: ''},
		{ shortCode: 'Year', text: 'Year' },*/
		{  shortCode: 'Month', text: 'Month' }
        
       
      ],
	  revenue : null,
	  SetRegion : [],
	  SetBranch : [],
	  SetEntity : [],
	  SetMethod : null,
	  monthlyrevenue : null,
	  monthlycogs : null,
	  cogspercentage : null,
	  amountFormat : null,
	  fullPage: true,
	  show: false,
	  menu: false,
    
  }),
   methods: {
	getBranches(selectObj){	  
	 this.SetBranch = [];
	 this.branch =[];
	 var arr1 = [{shortCode: 'Select All', text: ''}];
    if(this.SetEntity!='' && selectObj!='')	 
	this.axios
        // .get(`http://localhost:8888/api-branches/${this.SetEntity}/${selectObj}`).then(response => {	
         .get(`https://mis.dragarwal.com/api-branches/${this.SetEntity}/${selectObj}`).then(response => {
				//console.log(response.data);	
                this.branch = arr1.concat(response.data);				
				
			});	
          
		
	},
	getRegion(selectObj){
	    
		if(!selectObj){
			this.regions=[
				{ shortCode: 'Select All', text: ''},
				{ shortCode: 'Chennai', text: 'Chennai'},
				{ shortCode: 'ROTN', text: 'ROTN'},
				{ shortCode: 'ROI', text: 'ROI'},	
				{ shortCode: 'KA', text: 'KA'},	
				{ shortCode: 'Kerala', text: 'Kerala'},	
				{ shortCode: 'Maharashtra', text: 'Maharashtra'},
				{ shortCode: 'Madhya Pradesh', text: 'Madhya Pradesh'},				
				{ shortCode: 'TS', text: 'TS'},					
				{ shortCode: 'AP', text: 'AP'},	
				{ shortCode: 'WB', text: 'WB'},
				{ shortCode: 'OD', text: 'OD'}
			  ];
		}
		this.SetRegion = [];
		this.SetBranch = [];
		this.branch=[];
		
		var arr2 = [{shortCode: 'Select All', text: ''}];
		if(selectObj){
			this.axios
			 // .get(`http://localhost:8888/api-region/${selectObj}`).then(response => {	
			 .get(`https://mis.dragarwal.com/api-region/${selectObj}`).then(response => {
					//console.log(response.data);
					console.log(response.data.url);
					console.log(response.data.explanation);
					this.regions = arr2.concat(response.data);					
					
				});
		}
	
	},	
	apiRequestCogDashboard(date,SetEntity,SetRegion,SetBranch){
		  
		  
		  this.SetMethod='Month';
		  if (!this.date) {
			alert("Please Select Date");
			return false;
		  }
		 
		  var entityvalue='';
		  var regionvalue='';
		  var branchvalue='';
		  if (this.SetEntity=='') {			
			entityvalue = 'undefined';
		  }else{
			entityvalue = this.SetEntity;
		  }		  
		  if (this.SetRegion=='') {			
			regionvalue = 'undefined';
		  }else{		   
			regionvalue = this.SetRegion;
		  }
		  if (this.SetBranch=='') {			
			branchvalue = 'undefined';
		  }else{
		   
			branchvalue = this.SetBranch;
		  }
		  
		this.loading = true;
		this.isLoading = true;		  
		  this.axios
          //.get(`http://localhost:8888/api-rev-vs-cogs/${date}/${entityvalue}/${regionvalue}/${branchvalue}/${this.SetMethod}`).then(response => {	
         .get(`https://mis.dragarwal.com/api-rev-vs-cogs/${date}/${entityvalue}/${regionvalue}/${branchvalue}/${this.SetMethod}`).then(response => {		
				
				this.processDataWise(response.data);
				this.isLoading = false;
				
			});
	
	},
	processDataWise (data) {	
	 this.services=data.servicesGrp["SERVICES"];
	 this.services_list=data.servicesWise["SERVICES"];
	 this.opticals=data.servicesGrp["OPTICALS"];
	 this.optical_list=data.servicesWise["OPTICALS"];
	 this.pharmacy=data.servicesGrp["PHARMACY"];
	 this.contact_lens=data.servicesGrp["CONTACT LENS"];
	 
	
	 
	 this.billed=data.BilledWise.BILLED;
     this.referal=data.Referal.REFERRAL;
     this.witreferal=data.witReferal['With REFERRAL'];	 
      this.show = true;
    }
	
  },
  filters: {
    lakshFormatRevenueCogs (num) {
      return (Number(num) / 100000).toFixed(2);
    },
	numberFormat (num) {
      return (Number(num)).toFixed(2);
    },
  }
  
 }
 </script>
 <style>
 .styled-input {
 
  width:200px;
}
<style>