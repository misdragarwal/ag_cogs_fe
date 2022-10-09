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
		   <table width="100%" v-if="show">
			   <thead width="100%">
			   <tr width="100%">
					
					<th width="12%"><v-btn rounded color="primary" dark >{{monthlyrevenue| amountFormat}}</v-btn>(₹ Lacs)  	</th>
					<th width="12%"><v-btn rounded color="primary" dark >{{monthlycogs| amountFormat}}</v-btn> (₹ Lacs)    </span></th>
					
					<th width="12%" colsspan="8"><v-btn rounded color="primary" dark >{{cogsPercentageResult(monthlyrevenue| amountFormat,monthlycogs| amountFormat)}}%</v-btn>  </th>
					
				</tr>
				</thead>
			</table><br><br>
            <table v-if="show">
			<tr width="100%">
							
							<td width="50%"><highcharts :options="chartOptions"></highcharts>  </td>
							<td width="50%" colsspan="8"><highcharts :options="chartOptions1"></highcharts> 	</td>
							
						</tr>
			</table>  
          
          <loading
            :active.sync="isLoading"
            :is-full-page="fullPage"
            color="#7f0000"
            loader="bars"
          ></loading>
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
	  revenue : null,
	  SetRegion : [],
	  SetBranch : [],
	  SetEntity : [],
	  monthlyrevenue : null,
	  monthlycogs : null,
	  cogspercentage : null,
	  amountFormat : null,
	  fullPage: true,
	  show: false,
	  menu: false,
	   chartOptions: {
      chart: {
        type: 'column',
        backgroundColor: '#FAFAFA',
        height: 250,
        // width: 400,
        animation: {
          duration: 1000,
          reflow: true
        }
      },
      tooltip: {
        formatter: function () {
          return this.x + ':' + parseFloat(this.y).toLocaleString('en');
        }
      },
      title: {
        text: '',
        style: {
          color: '#000000',
          font: 'bold 20px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      loading: {
        hideDuration: 1000,
        showDuration: 1000
      },
      xAxis: {
        categories: null,
        labels: {
          style: {
            color: '#424242',
            fontSize: '13px'
          }
        }
      },
      yAxis: {
		 min: 0,
         max: 100,
        tickInterval: 10,
        title: {
          text: '% contrib',
          enabled: false
        },
        gridLineWidth: 0.5,
        minorGridLineWidth: 0
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
          pointPadding: 0.3,
          borderWidth: 1,
          groupPadding: 0,
          // pointWidth: 35,
          dataLabels: {
            enabled: true,
		 //formatter: function () {
						//return (Number(this.y) / 100000).toFixed(2);
						//return parseFloat(this.y).toLocaleString('en');
			//},
                        
          }
        }
      },
      series: [{
        showInLegend: false,
        data: null,
        // pointWidth: 30,
        animation: false
      }]
    },
    chartOptions1: {
      chart: {
        type: 'column',
        backgroundColor: '#FAFAFA',
        height: 250,
        // width: 400,
        animation: {
          duration: 1000,
          reflow: true
        }
      },
      tooltip: {
        formatter: function () {
          return this.x + ':' + parseFloat(this.y).toLocaleString('en');
        }
      },
      title: {
        text: '',
        style: {
          color: '#000000',
          font: 'bold 20px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: null,
        labels: {
          style: {
            color: '#424242',
            fontSize: '13px'
          }
        }
      },
      yAxis: {
	   min: 0,
         max: 100,
        tickInterval: 10,
        title: {
          text: '% contrib',
          enabled: false
        },
        gridLineWidth: 0.5,
        minorGridLineWidth: 0
      },
      plotOptions: {
        column: {
          pointPadding: 0.3,
          borderWidth: 1,
          groupPadding: 0,
          // pointWidth: 35,
          dataLabels: {
            enabled: true,
			//formatter: function () {
						//return (Number(this.y) / 100000).toFixed(2);
			
						 //parseFloat(this.y).toLocaleString('en');
			//},
                        
          }
        }
      },
      series: [{
        showInLegend: false,
        data: null,
        // pointWidth: 30,
        animation: false
      }]
    },
	  
	  
    
  }),
   methods: {
	getBranches(selectObj){	  
	 this.SetBranch = [];
	 this.branch =[];
	 var arr1 = [{shortCode: 'Select All', text: ''}];
    if(this.SetEntity!='' && selectObj!='')	 
	this.axios
         //.get(`http://localhost:8888/api-branches/${this.SetEntity}/${selectObj}`).then(response => {	
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
			  //.get(`http://localhost:8888/api-region/${selectObj}`).then(response => {	
			 .get(`https://mis.dragarwal.com/api-region/${selectObj}`).then(response => {
					//console.log(response.data);
					console.log(response.data.url);
					console.log(response.data.explanation);
					this.regions = arr2.concat(response.data);					
					
				});
		}
	
	},	
	maxCogsCenter(maxCogs){	
		var maxSortable = [];
		var maxSector = [];
		var maxSectorValue=[];
		for (var max in maxCogs) {
			maxSortable.push([max, maxCogs[max]]);
		}
		maxSortable.sort(function(a, b) { 
			return b[1] - a[1];
		});	
		for (var i=0;i<maxSortable.length;i++){			
			maxSector.push(maxSortable[i][0]);
			maxSectorValue.push(maxSortable[i][1]);
		}
		this.chartOptions.xAxis.categories = maxSector;
		this.chartOptions.series[0].data = maxSectorValue;
		
		
	
	},	
	minCogsCenter(minCogs){	
		var minSortable = [];
		var minSector = [];
		var minSectorValue=[];
		for (var min in minCogs) {
			minSortable.push([min, minCogs[min]]);
		}
		minSortable.sort(function(a, b) { 
			return a[1] - b[1];
		});	
		for (var j=0;j<minSortable.length;j++){			
			minSector.push(minSortable[j][0]);
			minSectorValue.push(minSortable[j][1]);
		}
		this.chartOptions1.xAxis.categories = minSector;
		this.chartOptions1.series[0].data = minSectorValue;
		
	
	},
	maxCogsPercenCenter(maxCogs){	
		var maxSortable = [];
		var maxSector = [];
		var maxSectorValue=[];
		for (var max in maxCogs) {
			maxSortable.push([max, maxCogs[max]]);
		}
		maxSortable.sort(function(a, b) { 
			return b[1] - a[1];
		});	
		for (var i=0;i<maxSortable.length;i++){			
			maxSector.push(maxSortable[i][0]);
			maxSectorValue.push(Number(maxSortable[i][1]));
		}
		this.chartOptions.xAxis.categories = maxSector.slice(0,5);
		this.chartOptions.series[0].data = maxSectorValue.slice(0,5);
		
		
	
	},
	minCogsPercenCenter(minCogs){	
		var minSortable = [];
		var minSector = [];
		var minSectorValue=[];
		for (var min in minCogs) {
			minSortable.push([min, minCogs[min]]);
		}
		minSortable.sort(function(a, b) { 
			return a[1] - b[1];
		});	
		for (var j=0;j<minSortable.length;j++){			
			minSector.push(minSortable[j][0]);
			minSectorValue.push(Number(minSortable[j][1]));
		}		
		this.chartOptions1.xAxis.categories = minSector.slice(0,5);
		this.chartOptions1.series[0].data = minSectorValue.slice(0,5);
		
	
	},
	monthlyRevenue(revenueDetails){
		this.monthlyrevenue = null;
		for (var key in revenueDetails) {		
			this.monthlyrevenue+=parseFloat(revenueDetails[key]['ftd'].toFixed(2));		
		}
		
	}, 
	monthlyCogs(cogDetails){
	    this.monthlycogs = null;
		for (var key in cogDetails) {		
			this.monthlycogs+=parseFloat(cogDetails[key]['ftd'].toFixed(2));		
		}
	
	},
	
	GrapgData(data){
			var cogsGraph = {};
			var revenueGraph = {};
				if(this.SetEntity!='' && this.SetRegion!='' && this.SetBranch!=''){
					if(data.monthlycogs[0].pharmacy==null && data.monthlycogs[0].opticals==null && data.monthlycogs[0].laboratory==null && data.monthlycogs[0].operation_theatre==null){
						alert("No data availalble for selected branch on date : "+this.date);
					}else{
						var pharmacyCogs = data.monthlycogs[0].pharmacy;
						var opticalcyCogs = data.monthlycogs[0].opticals;
						var labCogs = data.monthlycogs[0].laboratory;
						var surgeryCogs = data.monthlycogs[0].operation_theatre;
						
						pharmacyCogs = Number(pharmacyCogs) / 100000;
						opticalcyCogs = Number(opticalcyCogs) / 100000;
						labCogs = Number(labCogs) / 100000;
						surgeryCogs = Number(surgeryCogs) / 100000;
						
						cogsGraph = {"Pharmacy":parseFloat(pharmacyCogs.toFixed(2)),"Opticals":parseFloat(opticalcyCogs.toFixed(2)),"Lab":parseFloat(labCogs.toFixed(2)),"Surgery":parseFloat(surgeryCogs.toFixed(2))};
						this.maxCogsCenter(cogsGraph);
						this.minCogsCenter(cogsGraph);
						this.chartOptions.title.text = 'High Cogs Center (₹ Lacs)';
						this.chartOptions.yAxis.min = 10;
						this.chartOptions.yAxis.max = 200;
						this.chartOptions.yAxis.tickInterval = 20;

						this.chartOptions1.title.text = 'Low Cogs Center (₹ Lacs)';
						this.chartOptions1.yAxis.min = 10;
						this.chartOptions1.yAxis.max = 200;
						this.chartOptions1.yAxis.tickInterval = 20;
						
						this.monthlyRevenue(data.montlyrevenue);
						this.monthlyCogs(data.monthlycogs);
						this.show = true;
					}
				}				
				if(this.SetRegion!='' && this.SetBranch==''){
					cogsGraph = data.monthlycogs;
					if(cogsGraph==''){
						alert("No data availalble for selected branch");
					}else{						
						this.cogsPercentageCalculation(data.montlyrevenue,data.monthlycogs);
						this.monthlyRevenue(data.montlyrevenue);
						this.monthlyCogs(data.monthlycogs);
						this.chartOptions.title.text = 'High Cogs Center (%)';
						this.chartOptions.yAxis.min = 0;
						this.chartOptions.yAxis.max = 100;
						this.chartOptions.yAxis.tickInterval = 10;
						
						
						this.chartOptions1.title.text = 'Low Cogs Center (%)';
						this.chartOptions1.yAxis.min = 0;
						this.chartOptions1.yAxis.max = 100;
						this.chartOptions1.yAxis.tickInterval = 10;
						this.show = true;
					}
				}if(this.SetRegion=='' && this.SetBranch=='' ){
				     cogsGraph = data.monthlycogs;
				     if(cogsGraph==''){
						alert("No data availalble for selected entity");
					}else{					
												
						this.cogsPercentageCalculation(data.montlyrevenue,data.monthlycogs);						
						this.monthlyRevenue(data.montlyrevenue);
						this.monthlyCogs(data.monthlycogs);
						this.chartOptions.title.text = 'High Cogs Center (%)';
						this.chartOptions.yAxis.min = 0;
						this.chartOptions.yAxis.max = 100;
						this.chartOptions.yAxis.tickInterval = 10;
						this.chartOptions1.title.text = 'Low Cogs Center (%)';
						this.chartOptions1.yAxis.min = 0;
						this.chartOptions1.yAxis.max = 100;
						this.chartOptions1.yAxis.tickInterval = 10;
						this.show = true;
					}
				}
				
	
	},
	
	apiRequestCogDashboard(date,SetEntity,SetRegion,SetBranch){
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
		  
		  this.axios
          //.get(`http://localhost:8888/api-cogs-dashboard/${date}/${entityvalue}/${regionvalue}/${branchvalue}`).then(response => {	
         .get(`https://mis.dragarwal.com/api-cogs-dashboard/${date}/${entityvalue}/${regionvalue}/${branchvalue}`).then(response => {	
				this.GrapgData(response.data);
				
				
			});
	
	},
	cogsPercentageResult(revenueAmt,cogsAmt){
	       return ((parseFloat(cogsAmt)/(revenueAmt))*100).toFixed(2);
	},
	
	cogsPercentageCalculation(argrevenueDetails,argcogDetails){
	    var objectCogsPer = {};
		var cogsPerVal = '';
		var cogsBranch = '';
		var revenuePerVal = '';
		var revenueBranch = '';
		var objectCogsBranch = {};
		var objectRevenueBranch = {};		
		var revenueBranches = argrevenueDetails;
		var cogsBranches = argcogDetails;
		for (var key in cogsBranches) {				
			cogsPerVal = cogsBranches[key]['ftd'] 
			cogsBranch = cogsBranches[key]['branch'];
			objectCogsBranch[cogsBranch] = Number(cogsPerVal);				
		}		
		for (var key1 in revenueBranches) {				
			revenuePerVal = revenueBranches[key1]['ftd'] 
			revenueBranch = revenueBranches[key1]['branch'];
			objectRevenueBranch[revenueBranch] = Number(revenuePerVal);
			
		}
		for (var key2 in objectCogsBranch) {
		    if(objectRevenueBranch.hasOwnProperty(key2)){			
			   objectCogsPer[key2] = this.cogsPercentageResult(objectRevenueBranch[key2],objectCogsBranch[key2]);				
			}
		}
		this.maxCogsPercenCenter(objectCogsPer);		
		this.minCogsPercenCenter(objectCogsPer);
		
		
	}
	
  },
  filters: {
    amountFormat (num) {
       return (Number(num) / 100000).toFixed(2);
    }
  }
  
 }
 </script>
 <style>
 .styled-input {
 
  width:200px;
}
<style>