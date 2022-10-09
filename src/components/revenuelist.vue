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
				  :items=branches
				  v-model="SetBranch"    
				  label="Branch:"    
				  id="SelBranch"
				   item-text="shortCode"
				   item-value="text"
				 
				  
				></v-select>
			</th>
			<th width="4%">
				
			</th>
			<th width="20%">
				  <v-select
				  :items=years				  
				  v-model="SetYears"    
				  label="Years:"    
				  id="SelYears"
				   item-text="shortCode"
				   item-value="text"
			
				 
				></v-select>
			</th>
			<th width="4%">
				
			</th>
			<th width="20%">
				<v-select
				  :items=month				  
				  v-model="SetMonth"    
				  label="Month:"				   
				  item-text="shortCode"
				  item-value="text"	  
				  id="SelMonth"
				  
				></v-select>
			</th>
			<th width="4%">
				
			</th>
			
			<th width="4%">
			 <v-btn rounded color="primary" dark @click="apiGetData(SetBranch,SetYears,SetMonth)">Get Data</v-btn>
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
             v-if="show"
             width="100%" 
			 border="1"
            >
			<thead>
                <tr class="grey lighten-2">
                  <th
                    class="text-xs-left"
                   
                    scope="col"                  
                  >Bill Date</th>
                  <th
                    class="text-xs-center"
                    scope="col"
                   
                  >Amount</th>
                  <th
                    class="text-xs-center"
                    scope="col"
                    
                  >Entry Date</th>
			
				  	
                </tr>
			</thead>
			<tbody>
			  
                <tr
                  scope="row"
                  v-for="(item,index) in revenue_list"
                  :key="index+item.trans_date"
                 
                >
                  <td
                    scope="row"

                  >{{item.trans_date}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.add_date}}</td>
                  
                  
				  
                  
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
	 branches: [
        { shortCode: 'Select', text: ''},
		{  shortCode: 'AMN', text: 'AMN' }
       
      ],
	  years : [
        { shortCode: 'Select', text: ''},
		{ shortCode: '2018', text: '2018'},
		{ shortCode: '2019', text: '2019'},
		{ shortCode: '2020', text: '2020'},
		{ shortCode: '2021', text: '2021'}
      ],
      month : [
        { shortCode: 'Select', text: ''},
		{ shortCode: 'Jan', text: '01'},
		{ shortCode: 'Feb', text: '02'},
		{ shortCode: 'Mar', text: '03'},	
		{ shortCode: 'Apr', text: '04'},	
		{ shortCode: 'May', text: '05'},        
		{ shortCode: 'Jun', text: '06'},	
		{ shortCode: 'July', text: '07'},
        { shortCode: 'Aug', text: '08'},
		 { shortCode: 'Sep', text: '09'},
		  { shortCode: 'Oct', text: '10'},
		  { shortCode: 'Nov', text: '11'},
		  { shortCode: 'Dec', text: '12'}
      ],

	  fullPage: true,
	  show: false,
	  menu: false,
	  revenue_list:null
	  
	  
    
  }),
   methods: {
		
		apiGetData(SetBranch,SetYears,SetMonth){		
			if (SetBranch==undefined) {
				alert("Please Select Branch");
				return false;
		    }
			if (SetYears==undefined) {
				alert("Please Select Year");
				return false;
		    }
			if (SetMonth==undefined) {
				alert("Please Select Month");
				return false;
		    }
			
			this.axios
           //.get(`http://localhost:8888/mis-revenue-list/${SetBranch}/${SetYears}/${SetMonth}`).then(response => {	
          .get(`https://mis.dragarwal.com/mis-revenue-list/${SetBranch}/${SetYears}/${SetMonth}`).then(response => {	
				console.log(response.data.ResponseMsg);
				this.show = true;
				this.revenue_list=response.data.ResponseMsg;
				
			});
		}
	
	

	
	
	
  }
 
  
 }
 </script>
 <style>
 .styled-input {
 
  width:200px;
}
<style>