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
			
			<th width="4%">
				
			</th>
			
			
			<th width="20%">
			<v-select
				  :items=datatype
				  v-model="SetDatatype"    
				  label="Type:"    
				  id="SelDatatype"
				  item-text="shortCode"
				  item-value="text"	 
				  
				></v-select>
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
                :min="twodaysback"   
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
			 <v-btn rounded color="primary" dark @click="apiDataFetch(SetDatatype,date)">Fetch</v-btn>
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
	 datatype: [
        { shortCode: 'Select All', text: ''},
		{ shortCode: 'Domestic', text: 'Domestic' },
        { shortCode: 'Overseas', text: 'Overseas' }
       
      ],	  
	  fullPage: true,
	  show: false,
	  menu: false,
	  beforemonnth:null
  }),
  created () {
    this.getToday();
	this.getTwodayback();
  },
   methods: {
        getToday () {
			this.today = moment()
           .format("YYYY-MM-DD");
		},
		getTwodayback(){
		   var twodaysbefore = new Date();
			twodaysbefore.setDate(twodaysbefore.getDate() - 2);
			var dd1 = twodaysbefore.getDate();
			this.beforemonnth = twodaysbefore.getMonth()+1; //January is 0!
			var yyyy1 = twodaysbefore.getFullYear();
			if(dd1<10){dd1='0'+dd1} if(this.beforemonnth<10){this.beforemonnth='0'+this.beforemonnth} 
			twodaysbefore = yyyy1+'-'+this.beforemonnth+'-'+dd1;			
			this.twodaysback=twodaysbefore;
		},
		apiDataFetch(selectObj,date){	

         	
		  if (!this.date) {
			alert("Please Select Date");
			return false;
		  }
		   		   
			this.loading = true;
			this.isLoading = true;		

            if(selectObj=='Domestic'){
			
				this.axios
				//.get(`http://localhost:8888/mis-data-fetch-local/${date}`).then(response => {	
				.get(`https://mis.dragarwal.com/mis-data-fetch-local/${date}`).then(response => {

				this.isLoading = false;
				if(response.data.ResponseCode=200){				
					alert("Success");
				}else{
					alert("Failure");
				}
				});
			}else{
				this.axios
				//.get(`http://localhost:8888/mis-data-fetch-overseas/${date}`).then(response => {	
				.get(`https://mis.dragarwal.com/mis-data-fetch-overseas/${date}`).then(response => {

				this.isLoading = false;
				if(response.data.ResponseCode=200){				
					alert("Success");
				}else{
					alert("Failure");
				}
				});
			}
		}
		
		
  }
  
  
 }
 </script>
 <style>
 .styled-input {
 
  width:200px;
}
<style>