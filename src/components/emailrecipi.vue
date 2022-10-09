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
		 <v-toolbar-title>Email Recipients</v-toolbar-title>
            <v-divider
              class="mx-2 black"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
			<div class="table-responsive" width="100%">
			<table width="100%">
		
		 <tr>
			<td >
				<v-select
				  :items=emailty
				  v-model="SetEmailType"    
				  label="Email:"    
				  id="SelEmail"
				  item-text="shortCode"
				  item-value="text"
				  v-on:change='apiDataFetch'
				 
				 
				  
				></v-select>
			</td>
			<td></td>
		</tr><br><br>
		<tr>
			<td width="3%"><b>To</b></td>
			<td><textarea v-model="to" rows="3" max-rows="8" style="background-color:white!important;overflow:hidden;padding:10px;width:250px;"></textarea></td>
		</tr>
		<tr>
			<td width="3%"><b>Cc</b></td>
			<td><textarea v-model="cc"  rows="3"  max-rows="8" style="background-color:white!important;overflow:hidden;padding:10px;width:250px;"></textarea>
			</td>
		</tr>
		<tr>
			<td><v-btn rounded color="primary" dark @click="apiAddEmailRecipients(SetEmailType)">Add</v-btn></td>
			<td></td>
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
	 emailty: [
        { shortCode: 'Select', text: ''},
		{ shortCode: 'Domestic', text: 'domesticemail' },
        { shortCode: 'Group', text: 'groupemail' }
       
      ],	  
	  fullPage: true,
	  show: false, 
	  to :null,
	  cc: null,
	  type:null
  }),
  created () {
    this.getToday();
	
	
  },
   methods: {
        getToday () {
			this.today = moment()
           .format("YYYY-MM-DD");
		},   
        apiDataFetch(selectObj){  
		
		    if(selectObj==''){
				 this.to= "";
				this.cc= "";	
			}
		      
			this.type=selectObj;			    
			this.axios
			//.get('http://localhost:8888/mis-email-recipients/'+this.type).then(response => {	
			.get('https://mis.dragarwal.com/mis-email-recipients/'+this.type).then(response => {		
			if(response.data.ResponseCode=200){
				
			    this.to= response.data.ResponseMsg[0]['toid'];
				this.cc= response.data.ResponseMsg[0]['ccid'];				
				
				
			}else{
				
			}			 

			});
		},
		apiAddEmailRecipients(SetEmailType){
			 if (!SetEmailType) {
				alert("Please Select Email Type");
				return false;
			 }if (!this.to) {
				alert("Please Enter to address");
				return false;
			 }if (!this.cc) {
				alert("Please Enter cc address");
				return false;
			 }
		
		
		    this.axios
			        //.post(`http://localhost:8888/mis-email-recipients`, {
					.post(`https://mis.dragarwal.com/mis-email-recipients`, {
					to: this.to,
					cc: this.cc,
					type: this.type,					
				  }).then(response => {		
			if(response.data.ResponseCode=200){ 				
				alert("Added successfully");
				
				
			}else{
				alert("Added failure");
			}			 

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