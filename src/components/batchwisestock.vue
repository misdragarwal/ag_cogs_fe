<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-toolbar-title>Batch Wise Stock with MRP </v-toolbar-title> <v-spacer></v-spacer>
          <v-divider class="mx-2 black" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-select :items=entities v-model="SetEntity" label="Entity:" id="SelEntity" item-text="shortCode" item-value="text" v-on:change='getBranches'></v-select>


          <v-spacer></v-spacer>
		  
		  
		
		  
		  
          <th width="20%">
            <v-select :items=branch v-model="SetBranch" label="Branch:" item-text="shortCode" item-value="text" id="SelBranch"></v-select>
          </th>
          <v-spacer></v-spacer>
		  
		 
           <v-spacer></v-spacer>
          <!--<v-select :items="department" v-model="Setdepartment" label="Department type" item-text="shortCode" item-value="text"></v-select>-->

          <v-spacer></v-spacer>
          <v-menu absolute ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" :return-value.sync="fromdate" lazy transition="scale-transition" offset-y full-width min-width="150px">
            <v-text-field slot="activator" v-model="fromdate" placeholder="Select From Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="fromdate" type="month" no-title scrollable :min="minDate" :max="maxDate" backgroundRevenue-color="red" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu1 = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu1.save(fromdate)" style="outline:none">Ok</v-btn>
            </v-date-picker>
          </v-menu>
		   <v-spacer></v-spacer>
		
		  


          <v-btn rounded color="primary" dark @click="apiRequestCogsdata(fromdate,SetEntity,SetBranch)">Generate</v-btn>



          <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelCogsdata">
            <v-btn fab flat medium color="black">
              <v-tooltip bottom>
                <v-icon slot="activator" color="green darken-4">fas fa-file-excel</v-icon>
                <span>Export</span>
              </v-tooltip>
            </v-btn>
          </download-excel>
        </v-toolbar>
        <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>
        <!-- Vuetify Data table -->
		<br>
		
<table  width="100%" id="tblDeparnment">
    <tr>        
		 <td width="15%"><label><input id="depart1" type="checkbox" value="PHARMACY"/> PHARMACY </label></td>
		 <td width="15%"><label><input id="depart2" type="checkbox" value="OPTICALS"/> OPTICALS </label></td>
		
		  <td width="15%"><label><input id="depart5" type="checkbox" value="CONTACT LENS"/> CONTACT LENS </label></td>
		  	 	
    </tr>
    
</table>
       

        <back-to-top bottom="90px" right="90px">
          <v-btn class="red darken-4" dark absolute fab small>
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

var curday = function(sp) {
  var today = new Date();
  var dd = today.getDate() - 1;
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return (yyyy + sp + mm + sp + dd);
};

export default{
  data:()=>({
    minDate: "2020-04-01",
    maxDate: curday('-'),
    entities: [{
        shortCode: 'Select All',
        text: 'All'
      },
	  {
        shortCode: 'All India',
        text: 'All India'
      },
      {
        shortCode: 'AEH',
        text: 'AEH'
      },
      {
        shortCode: 'AHC',
        text: 'AHC'
      },
	  {
        shortCode: 'AJE',
        text: 'AJE'
      },
      {
        shortCode: 'OHC',
        text: 'OHC'
      },
    ],

    branch: [{
        shortCode: 'Select All',
        text: 'All'
      }],
      
      SetBranch: [],
      SetEntity: [],
	  
      userName: null,
      isLoading: false,
      fullPage: true,

      title: null,
      user_role: null,

      rowColor: null,
      isActive: false,
      save: "save",
      show: false,
      fileDate: null,

      fromdate: null,
      todate: null,
      menu: false,
      menu1: false,

      Cogs: null,
      Cogslist: null,

      json_data: null,
      json_meta: [{
        key: "charset",
        value: "utf-8"
      }],

      json_fields: {
        "ENTITY":"DESCRIPTION",
		"BRANCH":"ORGANIZATIONNAME",
		"DATE":"PREVDATE",
    "DEPARTMENT":"DEPARTMENT",
		"DEPARTMENT_NAME":"DEPARTMENT_NAME",
"ITEMCODE":"ITEMCODE",
"ADITMNAME":"ADITMNAME",
"CURRENT_STOCK":"CURRENT_STOCK",
"UNIT_PRICE":"UNIT_PRICE",
"COST_PRICE":"COST_PRICE",
"MRP":"MRP",
"ADITMDEPT":"ADITMDEPT",
"ITMCGCATEGNAME":"ITMCGCATEGNAME",
"SUBCATEGORY":"SUBCATEGORY",
"MANUFACTURER":"MANUFACTURER",
"BATCH_NO":"BATCH_NO",
"EXPIRYDATE":"EXPIRYDATE",
"TAX":"TAX",




      },
      fileName: null

  }),
  created() {
    this.getToday();
  },
  methods:{
    getBranches(selectObj) {
      this.SetBranch = [];
      this.branch = [];
      var arr1 = [{
        shortCode: 'Select All',
        text: 'All'
      }];
	  
	  
	  if(selectObj=='All India'){
		this.show=true;
	  }else{
	  this.show=false;
	  }
	  
	  
      //if(this.SetEntity!='' && selectObj!='')
	  if(selectObj!='AHI'){
		  this.axios
			.get(`https://mis.dragarwal.com/api-branch/${selectObj}`).then(response => {
			  this.branch = arr1.concat(response.data);
			  console.log(arr1);

			  console.log(this.branch);

			})
	   }else{
		this.branch=[
		{
        shortCode: 'Select All',
        text: 'All',
		
      },
		
		{
        shortCode: 'VSH',
        text: 'VSH',		
		}
		
		]
	   }

    },
	


    getToday() {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },
apiRequestCogsdata(fromdate,SetEntity,SetBranch,Setdepartment){
  let entity = '';
  let branch = '';
    let type = '';

if((fromdate==null)||fromdate==''){
  alert("please select date")
  return false;
}
else if((SetEntity==null)||(SetEntity=='')){
  alert("please select any entity")
  return false;
}
else if((SetBranch==null)||(SetBranch=='')){
  alert("Please select any branch")
  return false;
}

else {

  
 
  
var selected = new Array();
 
//Reference the Table.
var tblDeparnment = document.getElementById("tblDeparnment");

//Reference all the CheckBoxes in Table.
var chks = tblDeparnment.getElementsByTagName("INPUT");

// Loop and push the checked CheckBox value in Array.
var departvales='';
for (var i = 0; i < chks.length; i++) {
	if (chks[i].checked) {
	    departvales+="'"+chks[i].value+"',";
		//selected.push(chks[i].value);
		
	}
}



var departnment = '';  
if(departvales==''){
   departnment='All';
} else{
	departnment=departvales.replace(/(^,)|(,$)/g, "");
}
  


        var formData = new FormData()
        formData.append("date", this.fromdate);
		formData.append("entity", this.SetEntity);

		formData.append("branch", this.SetBranch);
		formData.append("departnment", departnment);

	this.isLoading = true;
  
	
	this.$http.post('https://mis.dragarwal.com/api-batchwisestock', formData, {}).then(response => {

      console.log(response.data);
      this.processDatacogs(response.data);
    this.isLoading = false;
      if(response.data!=''){
        alert("Data loaded... please download in excel");
        branch=this.SetBranch;
        entity=this.SetEntity;

          var str="_"
          this.fileDate = this.fromdate.concat(str);
          this.file=entity.concat(str,branch,str,this.fileDate)
          console.log(this.fileDate);

          this.fileName = `Stockledger_MRP_Report${this.file}.csv`;

      }
    })


}


},
downloadExcelCogsdata(){
  let tempDataArr = [];
  if (this.fileDate !== null) {
  tempDataArr =this.Cogslist

  return tempDataArr;
  } else {
  return null;
  }
},
processDatacogs(data){

  console.log("hit");
  console.log(data);
 this.Cogslist=data.result['batchwisestock'];
}

},



}
</script>
