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
		 <v-toolbar-title>Data Fetch </v-toolbar-title>
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
				  v-model="SetEmail"    
				  label="Email:"    
				  id="SelEmail"
				  item-text="shortCode"
				  item-value="text"
				 
				  
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
                  @click="$refs.menu.save(date)"
                  style="outline:none"
                >Ok</v-btn>
              </v-date-picker>
            </v-menu>
            </th>
			<th width="4%">
			 <v-btn rounded color="primary" dark @click="apiSendEmail(date,SetEmail)">Send</v-btn>
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
		{ shortCode: 'Domestic', text: 'Domestic' },
        { shortCode: 'Group', text: 'Group' }
       
      ],	  
	  fullPage: true,
	  show: false,
	  menu: false,
  }),
  created () {
    this.getToday();
  },
   methods: {
        getToday () {
			this.today = moment()
           .format("YYYY-MM-DD");
		},
   
      
		apiSendEmail(date,SetEmail){
		
		  if (SetEmail===undefined) {			
			alert("Please Select Email Type");
			return false;
		  }	 
		  if (!this.date) {
			alert("Please Select Date");
			return false;
		  }
		 
		  if(SetEmail=='Domestic'){

               this.loading = true;
               this.isLoading = true;		  
			  this.axios
			.get(`http://localhost:7777/mis-domestic-email-sent/${date}`).then(response => {	
			// .get(`https://mis.dragarwal.com/mis-domestic-email-sent/${date}`).then(response => {
			 
			        this.isLoading = false;
                    if(response.data.ResponseCode=200){
					    
						alert(response.data.Message);
					}else{
						alert(response.data.Message);
					}			 
					
				});
		  }else{
		       this.loading = true;
               this.isLoading = true;
		     this.axios
			 .get(`http://localhost:7777/mis-group-email-sent/${date}`).then(response => {	
			 // .get(`https://mis.dragarwal.com/mis-group-email-sent/${date}`).then(response => {	
			 this.isLoading = false;
					if(response.data.ResponseCode==200){
						alert(response.data.Message);
					}else{
						alert(response.data.Message);
					}	
				});
		  }		 
		   
		  
		   
		  
	
		}
		
		
  },
  
  
 }
 </script>
 <style>
 .styled-input {
 
  width:200px;
}
<style>