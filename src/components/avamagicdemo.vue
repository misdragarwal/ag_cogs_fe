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
                    
                  ><b>New OPD</b></td>
				 
				   <td
				    width="35%"
                    class="text-xs-center"
                    scope="col"
                    colspan="5"
                  ><b>Perimeter (Paid Count) <br>Individual Eye</b></td>
				   
				  <td
				    width="14%"
                    class="text-xs-center"
                    scope="col"
                     colspan="3"
                  ><b>Perimeter Revenue (INR)	</b></td> 
				 
                </tr>
			    
            
                <tr class="grey lighten-2">
                  <td
                    class="text-xs-center"
                    width="10%"
                    scope="col"                  
                  ><b>Entity</b></td>
                  <td
				    width="10%"
                    class="text-xs-center"
                    scope="col"
                   
                  ><b>Region</b></td>
                  <td
				    width="10%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>Branch</b></td>
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>FTD</b></td>
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>MTD</b></td>
				   
				   <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>FTD</b></td>
				   <td
				     width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>MTD</b></td> 
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>Target</b></td>
				   <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>Tar Ach%</b></td> 
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>FTD</b></td> 
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>MTD</b></td>
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>Target Amount</b></td>
				  <td
				    width="7%"
                    class="text-xs-center"
                    scope="col"
                    
                  ><b>Tar Ach%</b></td> 
                </tr>
               
			    
             
              <tbody >

				<tr
                  scope="row"
                  v-for="(item,index) in group"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
				    width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  >Total</td>
				   <td
				    width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  ></td>
                  <td
				   width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  ></td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center rotgrp1"
                  >{{item.ftdopdrev}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center rotgrp1"
                  >{{item.mtdopdrev}}</td>
				   
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  >{{item.revenueftdcount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  >{{item.revenuemtdcount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  >{{item.target}}</td>
				  <td
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  >{{item.revenuetargetachived}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  >{{item.revenueftdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  >{{item.revenuemtdamount}}</td>
				  <td
				     width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  >{{item.targetamount}}</td>
				   <td
				     width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  >{{item.targetamountach}}</td>
                  
                </tr>	

					<tr
                  scope="row"
                  
                  class="grey lighten-4"
                >
                  <td
				    width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  ></td>
				   <td
				    width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  ></td>
                  <td
				   width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  ></td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center rotgrp1"
                  ></td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center rotgrp1"
                  ></td>
				   
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  ></td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  ></td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  ></td>
				  <td
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  ></td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  ></td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  ></td>
				  <td
				     width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  ></td>
				  <td
				     width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  ></td>
                  
                </tr>	
				
				<tr
                  scope="row"
                  
                  class="grey lighten-4"
                >
                  <td
				    width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  ></td>
				   <td
				    width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  ></td>
                  <td
				   width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  ></td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center rotgrp1"
                  ></td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center rotgrp1"
                  ></td>
				   
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  ></td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  ></td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  ></td>
				  <td
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  ></td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  ></td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  ></td>
				  <td
				     width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  ></td>
				  <td
				     width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  ></td>
                  
                </tr>	
			   
                
                <tr
                  scope="row"				  
                  v-for="(item,index) in sortbranches"                 
                  class="grey lighten-4"
                >
				  <td
				    width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  >{{item.entity}}</td>
				   <td
				   width="10%"
                    scope="row"
					class="text-xs-center branchesgrp1"
                  >{{item.region}}</td>
                  <td
				    width="10%"
                    scope="row"
                    class="text-xs-center branchesgrp1"
                  >{{item.branch}}</td>
                  <td
				     width="7%"
                    scope="row"
                    class="text-xs-center rotgrp1"
                  >{{item.ftdopdrev}}</td>
                  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center rotgrp1"
                  >{{item.mtdopdrev}}</td>
				  
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  >{{item.revenueftdcount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  >{{item.revenuemtdcount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  >{{item.target}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center allindiagroup1"
                  >{{item.revenuetargetachived}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  >{{item.revenueftdamount}}</td>
				  <td
				    width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  >{{item.revenuemtdamount}}</td>
				   <td
				     width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  >{{item.targetamount}}</td>
				  <td
				     width="7%"
                    scope="row"
                    class="text-xs-center ochfont1"
                  >{{item.targetamountach}}</td>
                  
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
    sortbranches : null,
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
	  "Region": "region",
	  "New OPD FTD": "ftdopdrev",
	  "New OPD MTD": "mtdopdrev",
	  "Advised":"revenuemtdcount",
	  "Perimeter (Count) FTD":"revenueftdcount",
	  "Perimeter (Count) MTD": "revenuemtdcount",
	  "Target":"target",
	  "Tar Ach%":"revenuetargetachived",
	  "Perimeter (Revenue) FTD":"revenueftdamount",
	  "Perimeter (Revenue) MTD":"revenuemtdamount",
	  "TargetAmount":"targetamount",
	  "Tar Ach%":"targetamountach",
      
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
          .get(`https://mis.dragarwal.com/api-usage-tracker-new/${date}`)
         //.get(`http://localhost:8888/api-usage-tracker-new/${date}`)
                    .then(response => {
            this.processDataUsageTracker(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processDataUsageTracker (data) {  
	  this.group = [data.total];
      this.alin = [data.alin];
      this.aeh = [data.aeh];
      this.ahc = [data.ahc];
	  this.ohc = [data.ohc];  
	  
	  let branchlist =data.branchwise;
	  
	 this.sortbranches = branchlist.slice().sort((a, b) => b.revenuemtdamount - a.revenuemtdamount);
        console.log(this.sortbranches);
	  
	  
	    
	  //let sortedInput = branchlist.sort((a, b) => (b[revenuemtdamount] > a[revenuemtdamount]) ? 1 : ((b[revenuemtdamount] < a[revenuemtdamount]) ? -1 : 0));
     // console.log(arr);
      
      /*let branchlist = branchlist.concat(data.branchwise["chennai"], data.branchwise["Chennai"],data.branchwise["rotn"],data.branchwise["ROTN"],data.branchwise["Banglore"],data.branchwise["Hyderabad"],data.branchwise["Kerala"],data.branchwise["Madhya Pradesh"]);
	  
	 
	  
	  console.log(branchlist);*/
	  
	  
	  
	  
	  
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
			tempDataArr = this.sortbranches;
			
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
.allindiagroup1 {
background-color : #f0ae19!important;
font-weight: 900!important;
}
.branchesgrp1{
background-color : #a8afba!important;
font-weight: 900!important;
}
.rotgrp1{
background-color : #f2f5fa!important;
font-weight: 900!important;
}
.whitefont{
font-weight: 900!important;
color : #ffffff!important
}
.ochfont1{
background-color : #f9e699!important;
font-weight: 900!important;
}


</style>
