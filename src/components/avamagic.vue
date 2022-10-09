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
            <v-toolbar-title>AVA-Magic50 </v-toolbar-title>
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
                  @click="$refs.menu.save(date);apiRequestUsageTracker(date)"
                  style="outline:none"
                >Generate</v-btn>
              </v-date-picker>
			  
			  
			  
			  
			  
            </v-menu>
            <download-excel
              :data="json_data"
              :fields="json_fields"
              type="csv"
              :name="fileName"
			  :title="xlTitle"
              :fetch="downloadExcelUsageTraker"
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
			
			  
			
			
			   <tr class="grey lighten-2">
                  <td
                    class="text-xs-left"
                    width="10%"
                    scope="col"                  
                  ></td>
                  <td
				    width="10%"
                    class="text-xs-center"
                    scope="col"
                   
                  ></td>
                  <td
				    width="10%"
                    class="text-xs-center"
                    scope="col"
                    
                  ></td>
				  <td
				    width="14%"
                    class="text-xs-center"
                    scope="col"
					colspan="2"
                    
                  >New OPD</td>
				 
				   <td
				    width="35%"
                    class="text-xs-center"
                    scope="col"
                    colspan="6"
                  >Perimeter (Count)</td>
				   
				  <td
				    width="14%"
                    class="text-xs-center"
                    scope="col"
                     colspan="3"
                  >Perimeter (Revenue)	</td> 
				 
                </tr>
			    
            
                <tr class="grey lighten-2">
                  <td
                    class="text-xs-center"
                    width="10%"
                    scope="col"                  
                  >Entity</td>
                  <td
				    width="10%"
                    class="text-xs-center"
                    scope="col"
                   
                  >Region</td>
                  <td
				    width="10%"
                    class="text-xs-center"
                    scope="col"
                    
                  >Branch</td>
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >FTD</td>
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >MTD</td>
				  
				   <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >Advised</td>
				   <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >FTD</td>
				   <td
				     width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >MTD</td> 
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >YTD</td>
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >Target</td>
				   <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >Tar Ach%</td> 
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >FTD</td> 
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >MTD</td>
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  >YTD</td>
                </tr>
               
             
              <tbody >  
			  
                
                <tr
                  scope="row"
				  
                  v-for="(item,index) in aeh_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
				  <td
				    width="10%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.entity}}</td>
				   <td
				   width="10%"
                    scope="row"
					class="text-xs-center"
                  >Chennai</td>
                  <td
				    width="10%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.branch}}</td>
                  <td
				     width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
				     width="7%"
                    scope="row"
                    class="text-xs-center"
                  >0</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceftd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.devicemtd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceytd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuetargetachived}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueftdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuemtdamount}}</td>
				   <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueytdamount}}</td>
                  
                </tr>          
                
                <tr
                  scope="row"
                  v-for="(item,index) in ahc_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                 <td
				    width="10%"
                    scope="row"             
                    class="text-xs-center"
                
                  >{{item.entity}}</td>
				   <td
				    width="10%"
                    scope="row"               
                    class="text-xs-center"
                    
                  >Chennai</td>
                  <td
				    width="10%"
                    scope="row"                 
                    class="text-xs-center"
                   
                  >{{item.branch}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
				     width="7%"
                    scope="row"
                    class="text-xs-center"
                  >0</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceftd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.devicemtd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceytd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuetargetachived}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueftdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuemtdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueytdamount}}</td>
                  
                </tr>
				
				
				
				
				<tr
                  scope="row"
                  v-for="(item,index) in aeh_rotn_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                 <td
				    width="10%"
                    scope="row"             
                    class="text-xs-center"
                
                  >{{item.entity}}</td>
				   <td
				    width="10%"
                    scope="row"               
                    class="text-xs-center"
                    
                  >ROTN</td>
                  <td
				    width="10%"
                    scope="row"                 
                    class="text-xs-center"
                   
                  >{{item.branch}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
				     width="7%"
                    scope="row"
                    class="text-xs-center"
                  >0</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceftd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.devicemtd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceytd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuetargetachived}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueftdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuemtdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueytdamount}}</td>
                  
                </tr>
				
				
				<tr
                  scope="row"
                  v-for="(item,index) in ahc_rotn_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                 <td
				    width="10%"
                    scope="row"             
                    class="text-xs-center"
                
                  >{{item.entity}}</td>
				   <td
				    width="10%"
                    scope="row"               
                    class="text-xs-center"
                    
                  >ROTN</td>
                  <td
				    width="10%"
                    scope="row"                 
                    class="text-xs-center"
                   
                  >{{item.branch}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
				     width="7%"
                    scope="row"
                    class="text-xs-center"
                  >0</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceftd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.devicemtd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceytd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuetargetachived}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueftdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuemtdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueytdamount}}</td>
                  
                </tr>
                  
                  
               
                <tr
                  scope="row"
                  v-for="(item,index) in banglore_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                 <td
				    width="10%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.entity}}</td>
				   <td
				    width="10%"
                    scope="row"
                    class="text-xs-center"
                  >Banglore</td>
                  <td
				     width="10%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.branch}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
				     width="7%"
                    scope="row"
                    class="text-xs-center"
                  >0</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceftd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.devicemtd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceytd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuetargetachived}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueftdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuemtdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueytdamount}}</td>
                 
                </tr>
                
                <tr
                  scope="row"
                  v-for="(item,index) in hyderabad_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                 <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.entity}}</td>
				   <td
				   width="10%"
                    scope="row"
                    class="text-xs-center"
                  >Hyderabad</td>
                  <td
				    width="10%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.branch}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				  <td
				     width="7%"
                    scope="row"
                    class="text-xs-center"
                  >0</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceftd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.devicemtd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceytd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuetargetachived}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueftdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuemtdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueytdamount}}</td>
                  
                </tr>
                
                <tr
                  scope="row"
                  v-for="(item,index) in kerla_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
				    width="10%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.entity}}</td>
				   <td
				    width="10%"
                    scope="row"
                    class="text-xs-center"
                  >Kerla</td>
                  <td
				   width="10%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.branch}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
				     width="7%"
                    scope="row"
                    class="text-xs-center"
                  >0</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceftd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.devicemtd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceytd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuetargetachived}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueftdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuemtdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueytdamount}}</td>
                  
                </tr>
               
                

<tr
                  scope="row"
                  v-for="(item,index) in maharashtra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                 <td
				    width="10%"
                    scope="row"               
                    class="text-xs-center"
                   
                  >{{item.entity}}</td>
				   <td
				   width="10%"
                    scope="row"
                    class="text-xs-center"                
                   
                  >Maharashtra</td>
                  <td
				    width="10%"
                    scope="row"
                    class="text-xs-center"        
                   
                  >{{item.branch}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
				     width="7%"
                    scope="row"
                    class="text-xs-center"
                  >0</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceftd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.devicemtd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.deviceytd}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.target}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuetargetachived}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueftdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenuemtdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center"
                  >{{item.revenueytdamount}}</td>
                  
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
	group: null,
    cmh: null,
    aeh_chennai: null,
    aeh_chennai_branches: null,
	aeh_rotn_branches:null,
	ahc_rotn_branches:null,
    aeh: null,
    ahc: null,
	ohc : null,
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
	coimbatore: null,
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
	pondycherry :null,
	tiruppur : null,
	madagascar: null,
	mozambique: null,
    mozambique_branches: null,
	nigeria: null,
	rwanda: null,
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
      "Entity": "entity",
      "Branch": "branch",
	  "New OPD FTD": "ftdopdrev",
	  "New OPD MTD": "mtdopdrev",
	  "Advised":"devicemtd",
	  "Perimeter (Count) FTD":"deviceftd",
	  "Perimeter (Count) MTD": "devicemtd",
	  "Target":"target",
	  "Tar Ach%":"revenuetargetachived",
	  "Perimeter (Revenue) FTD":"revenueftdamount",
	  "Perimeter (Revenue) MTD":"revenuemtdamount"
      
    },
    fileName: null,
	xlTitle:null
  }),
  created () {
    this.getToday();
  },
  methods: {
    getToday () {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },
    apiRequestUsageTracker (date) {
      if (date !== null) {
        this.fileDate = date;
        this.fileName = `AVA-Magic50_${this.fileDate}.csv`;
		this.xlTitle = `AVA-Magic50 ${this.fileDate}`;
        this.loading = true;
        this.isLoading = true;
        this.$http
          .get(`https://mis.dragarwal.com/api-usage-tracker/${date}`)
         //.get(`http://localhost:8888/api-usage-tracker/${date}`)
                    .then(response => {
            this.processDataUsageTracker(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processDataUsageTracker (data) {  
	  this.group = [data.group];
      this.alin = [data.alin];
      this.aeh = [data.aeh];
      this.ahc = [data.ahc];
	  this.ohc = [data.ohc];  
      
      //this.cmh = data.branchwise["Chennai Main Hospital"];
      this.aeh_chennai = [data.aehgroup["chennai"]];
      this.aeh_chennai_branches = data.branchwise["chennai"];     
      this.ahc_chennai = [data.ahcgroup["Chennai"]];
      this.ahc_chennai_branches = data.branchwise["Chennai"]; 

     
      this.aeh_rotn_branches = data.branchwise["rotn"];  
	  this.ahc_rotn_branches = data.branchwise["ROTN"];  

	  
      this.banglore = [data.ahcgroup["Banglore"]];
      this.banglore_branches = data.branchwise["Banglore"];     
      this.hyderabad = [data.ahcgroup["Hyderabad"]];
      this.hyderabad_branches = data.branchwise["Hyderabad"];     
      this.kerla = [data.ahcgroup["Kerala"]];
      this.kerla_branches = data.branchwise["Kerala"];      
	  this.madhyapradesh = [data.ahcgroup["Madhya Pradesh"]];
      this.madhyapradesh_branches = data.branchwise["Madhya Pradesh"];
      this.maharashtra_branches = data.branchwise["Maharashtra"];	  
	  this.madagascar = data.branchwise["Madagascar"];
	  this.mozambique = [data.ohcgroup["Mozambique"]];
      this.mozambique_branches = data.branchwise["Mozambique"];
	  this.nigeria = data.branchwise["Nigeria"];
	  this.rwanda = data.branchwise["Rwanda"];
	  this.mauritius = [data.ohcgroup["Mauritius"]];
      this.mauritius_branches = data.branchwise["Mauritius"];
	  this.zambia = data.branchwise["Zambia"];
	  this.ghana = data.branchwise["Ghana"];
	  this.nairobi = data.branchwise["Nairobi"];
	  this.uganda = data.branchwise["Uganda"];
	  this.tanzania = data.branchwise["Tanzania"];
	   
	  
	  
	  
	  
      // this.amb = [data.ahcgroup["Ambattur"]];
      this.show = true;
    },
    downloadExcelUsageTraker () {	
		  let tempDataArr = [];
		  if (this.fileDate !== null) {
			tempDataArr = this.aeh_chennai_branches.concat(
			this.ahc_chennai_branches,
			this.aeh_rotn_branches,
			this.ahc_rotn_branches,			
			this.banglore_branches,  			
			this.hyderabad_branches,			
			this.kerla_branches,
            this.maharashtra_branches			
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


</style>
