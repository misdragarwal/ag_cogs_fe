<template>
  <v-app>
    <v-navigation-drawer
      fixed
      clipped
      app
      v-model="drawer"
      temporary
      v-if="show"
      mini-variant
      mini-variant-width=150
      class="mt-5"
    >
      <v-list dense style="height:1000!important">
        <v-list-tile
          v-for="item in tabItems"
          :key="item"
          @click="changeCategory(item)"
          @click.stop="drawer = !drawer"
        >
          <v-list-tile-action
            class="subheading text-xs-center font-weight-bold"
            style="text-decoration: none"
          >
            {{ item }}
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      dense
      color="indigo darken-4"
    >
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
        class="white--text"
        v-if="show"
      ></v-toolbar-side-icon>
      <v-toolbar-title
        v-text="title"
        class="white--text cursor"
        style="{ cursor: pointer;cursor: hand;}"
      >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        bottom
        offset-y
        v-if="show"
        class="ml-2"
      >
        <!-- <v-toolbar-title slot="activator">
          <span class="white--text">Settings</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title> -->
        <template slot="activator">
          <span class="white--text body-2 mr-2">{{userName }}</span>
          <v-icon dark>fa fa-user-circle</v-icon>
        </template>
        <v-list >
          <v-list-tile
            v-for="(item,index) in items"
            :key="index"
            @click="changeCategory(item.title)"
          >
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="dynamicComponent"></component>
      </transition>
    </v-content>
  </v-app>
</template>

<script>

import login from "./components/login";
import group from "./components/group";
import normalrevenue from "./components/normalrevenue";
import domesticrevenue from "./components/domesticrevenue";
import changepassword from "./components/changepassword";
import emailsent from "./components/emailsent";
import datafetch from "./components/datafetch";
import emailrecipi from "./components/emailrecipi";
import revenuelist from "./components/revenuelist";
import exchangerates from "./components/exchangerates";

import cogsSuper from './components/cogs-content-tabs';
import cogs from "./components/cogs-with-tabs";
import revenueSuper from "./components/revenue-content";
import revenue from "./components/revenue";
import chart from "./components/chart";
import ot from "./components/ot-content";
import revenuereport from "./components/revenuereport";
import newpod from "./components/newpod";
import newopdnormal from "./components/newopdnormal";
import Optical from "./components/optical";
import Discount from "./components/discount";
import Collection from "./components/collection";
import avamagic from "./components/avamagic";
import Newconsultation from "./components/consultation";
import avamagicdemo from "./components/avamagicdemo";
import DRT from "./components/chdrt";
import DRTApproval from "./components/schdrt";
import AdminApproval from "./components/admindrt.vue";
import DRTreport from "./components/admindrtreports.vue";
import chicdoctorlist from "./components/chicdoctor.vue";
import admindoctorapproval from "./components/admindoctorapproval.vue"
import subbill from "./components/subbills.vue"
import revenuevscogs from "./components/revenuevscogs";
import perrycashform from "./components/perrycashform";
import pettycash_ch_list from "./components/pettycash_ch_list";
import pettycashApproval from "./components/schpettycash.vue";
import Cashapproval from "./components/adminpettycash.vue";
import Cogsdata from "./components/cogsdata.vue"
import Tpa from "./components/tpabillch.vue"
import Tpa_Approve from "./components/tpabillapprove.vue"
import stock_ledger from "./components/stock-ledger.vue"
import batch_wisestock from "./components/batchwisestock.vue"
import changecategory from "./components/changecategory.vue"
import iwsr from "./components/iwsr.vue"
import dob from './components/dob.vue'
import snapshotrevenue from "./components/snapshotrevenue.vue"
import snapshotrevenueebita from "./components/snapshotrevenueebita.vue"
import coll_recon from "./components/collection_recon.vue"
import coll_recon_admin from "./components/collection_recon_admin.vue"
import coll_recon_sch from "./components/collection_recon_sch.vue"
import coll_recon_fin_view from "./components/collection_recon_fin_view.vue"
import stockexpiry from "./components/stockexpiry.vue"
import pettcashsummary from "./components/pettcashsummary.vue"

//praveen
import competitors from "./components/competitor";
import competitorform from "./components/competitor_form";
import compApproval from './components/schcompetitor'
import competitor from './components/fincompetitors'

import { serverBus } from "./main";
import away from "away";
const timer = away(1.8e6);

export default {
  data () {
    return {
      title: "MIS",
      dynamicComponent: "login",
      items: [{title:"Change Password"},{ title: "Logout" }],
      show: false,
      greet: "",
      drawer: false,
      tabItems: null,
      userName: null,
	  userId: null,
	  userType : null,
    };
  },
  name: "App",
  components: {  
    login,    
	group,
	normalrevenue,
	domesticrevenue,
	changepassword,
	emailsent,
	datafetch,
	emailrecipi,
	revenuelist,
	exchangerates,	
	chart,
    cogs,
    cogsSuper,
    revenueSuper,
    revenue,
	ot,
	revenuereport,
	newpod,
	newopdnormal,
	Optical,
	Discount,
	Collection,
	avamagic,
	Newconsultation,
	avamagicdemo,
	DRT,
    DRTApproval,
    AdminApproval,
    DRTreport,
	chicdoctorlist,
    admindoctorapproval,
    subbill,
	revenuevscogs,
	perrycashform,
	pettycash_ch_list,
	pettycashApproval,
    Cashapproval,
	Cogsdata,
	Tpa,
	Tpa_Approve,
	stock_ledger,
	changecategory,
	iwsr,
	dob,
	snapshotrevenue,
	snapshotrevenueebita,
	coll_recon,
    coll_recon_admin,
	coll_recon_sch,
	coll_recon_fin_view,
	stockexpiry,
	pettcashsummary,
	batch_wisestock,
	competitors,
		competitorform,
		compApproval,
		competitor
  },
  created () {
    serverBus.$on("changeComponent", component => {
      this.dynamicComponent = component;
      this.show = true;
      if (sessionStorage.getItem('domestic_user')) {
        let normSess = JSON.parse(sessionStorage.getItem('domestic_user'))
        this.userName = normSess.userName
		this.userId = normSess.name
		this.userType = 'domestic'
      }else if(sessionStorage.getItem('group_user')){
		 let superSess = JSON.parse(sessionStorage.getItem('group_user'))
        this.userName = superSess.userName
		this.userId = superSess.name
		this.userType = 'group'
	  }else if(sessionStorage.getItem('overseas_user')){
		 let superSess = JSON.parse(sessionStorage.getItem('overseas_user'))
        this.userName = superSess.userName
		this.userId = superSess.name
		this.userType = 'overcease'
	  }else if(sessionStorage.getItem('indian_user')) {
			let superSess = JSON.parse(sessionStorage.getItem('indian_user'))
			this.userName = superSess.userName
			this.userId = superSess.name
			this.userType = 'domestic'
	  }else if(sessionStorage.getItem('admin_user')) {
			let superSess = JSON.parse(sessionStorage.getItem('admin_user'))
			this.userName = superSess.userName
			this.userId = superSess.name
			this.userType = 'admin'
	  }else if(sessionStorage.getItem('optical_user')){
			let superSess = JSON.parse(sessionStorage.getItem('optical_user'))
			this.userName = superSess.userName
			this.userId = superSess.name
			this.userType = 'optical'
	 }else if(sessionStorage.getItem('tpa_user')){
			let superSess = JSON.parse(sessionStorage.getItem('tpa_user'))
			this.userName = superSess.userName
			this.userId = superSess.name
			this.userType = 'tpa'
	 }else if(sessionStorage.getItem('coll_user')){
			let superSess = JSON.parse(sessionStorage.getItem('coll_user'))
			this.userName = superSess.userName
			this.userId = superSess.name
			this.userType = 'collection'
	}else if (sessionStorage.getItem('normal_user')) {

        let normSess = JSON.parse(sessionStorage.getItem('normal_user'))
        console.log(normSess.role);
        if (normSess.role == 'ch_user') {
          this.userName = normSess.userName
          this.userId = normSess.name
          this.userType = 'centerhead'
        } else if (normSess.role == 'sch_user') {
          this.userName = normSess.userName
          this.userId = normSess.name
          this.userType = 'strcenterhead'
        }  else {
          this.userName = normSess.userName
          this.userId = normSess.name
          this.userType = 'normal'

        }
    } else if (sessionStorage.getItem('fin_user')) {
        let superSess = JSON.parse(sessionStorage.getItem('fin_user'))
        this.userName = superSess.userName
        console.log(this.userName);
        this.userId = superSess.name
        console.log(this.userId);
        this.userType = 'financeuser'
    }else {
			let superSess = JSON.parse(sessionStorage.getItem('normal_user'))
			this.userName = superSess.userName
			this.userId = superSess.name
			this.userType = 'normal'
	 }	  
	if(this.userType=='group'){
		if(this.userId==103390){
			this.tabItems = ['NewOPD']
		}else if(this.userId==106138){
			this.tabItems = ['Domestic','Group', 'SnapshotRevenue','SnapshotEBITDA']
		}else if(this.userId==100019){
			this.tabItems = ['Domestic','Group','Cogs Vs Revn','NewOPD']
		}else if(this.userId==106929){
			this.tabItems = ['Domestic','Group','Cogs Vs Revn','NewOPD','Collection']
		}else if(this.userId=='scmteam'){
			this.tabItems = ['Cogsdata','StockLedger','IWSR','StockExpiry','BatchwiseStock']
		}else if(this.userId==102055){
			this.tabItems = ['AVA-Magic50','NewOPD','SnapshotRevenue']
		}else if(this.userId==104860){
			this.tabItems = ['Domestic','Group', 'Cogs Vs Revn','Dashboard','NewOPD','Collection','Newconsultation']
		}else if(this.userId==101019){
			this.tabItems = ['Domestic','Group', 'Cogs Vs Revn','NewOPD','AVA-Magic50']
		}else if(this.userType=='group' && (this.userId==102170 || this.userId==103108)) {
 		  this.tabItems = ['Domestic','Group','Cogs Vs Revn','Dashboard','NewOPD','Optical','Discount','Collection','AVA-Magic50','Newconsultation']
		}else if(this.userId==104038) {
 		  this.tabItems = ['Domestic','Group','Cogs Vs Revn','Dashboard','NewOPD','Optical','Discount','Collection','AVA-Magic50','Newconsultation','CogsVariance','Cogsdata','IWSR','SnapshotRevenue']
		}else if(this.userId==106391) {
 		  this.tabItems = ['Domestic','Group', 'Cogs Vs Revn','Dashboard','NewOPD','Optical','Collection','AVA-Magic50','Newconsultation','AVA-Demo','Cogsdata','StockLedger','IWSR','SnapshotRevenue','SnapshotEBITDA'];
		}
		else if(this.userId=='anosh') {
 		  this.tabItems = ['Domestic','Group','Cogs Vs Revn','Dashboard','NewOPD','Optical','Discount','Collection','AVA-Magic50','Newconsultation','AVA-Demo']
		}else if(this.userId=='Csight'){
			this.tabItems = ['Cogsdata','StockLedger','IWSR','NewOPD']
		}
		else{
			this.tabItems = ['Domestic','Group', 'Cogs Vs Revn','Dashboard','NewOPD','Optical','Collection','Newconsultation']
		}
	}else if(this.userType=='admin'){
		//this.tabItems = ['Domestic','Group','Trigger Email','Fetch Data','E-Recipients','FTD List','Exchange Rates', 'Cogs Vs Revn','Dashboard','Surgery','NewOPD','Optical','Discount','Collection','AVA-Magic50','Newconsultation','AVA-Demo','CogsVariance','Cogsdata'];
		this.tabItems = ['Domestic','Group','Trigger Email','Fetch Data','E-Recipients','FTD List','Exchange Rates', 'Cogs Vs Revn','Dashboard','NewOPD','Optical','Discount','Collection','AVA-Magic50','Newconsultation','AVA-Demo','CogsVariance','Cogsdata','StockLedger','IWSR','DOB','SnapshotRevenue','SnapshotEBITDA'];
	}else if(this.userType=='domestic'){
		this.tabItems = ['Domestic', 'Cogs Vs Revn','Dashboard','NewOPD','Optical','Collection','Newconsultation'];
	}else if(this.userType=='overcease'){
		this.tabItems = ['Group','Cogs Vs Revn'];
	}else if(this.userType=='optical'){
        this.tabItems = ['Optical']
    }else if(this.userType=='collection'){
		 this.tabItems = ['Collection']
	}else if(this.userType=='tpa'){
		 this.tabItems = ['TPAApproval']
	}
		// user type center head  
		else if (this.userType == "centerhead") {
				if (this.userId == "itteamch") {
					this.tabItems = [
						"Domestic",
						"Cogs Vs Revn",
						"NewOPD",
						"DRT",
						"Petty Cash",
						"TPA",
						"Coll_Deposit"
					];
				} else if (this.userId == "103741") {
					this.tabItems = [
						"Domestic",
						"Cogs Vs Revn",
						"NewOPD",
						"DRT",
						"Petty Cash",
						"TPA",
						"FTD List",
						"Coll_Deposit"
					];
				} else if (this.userId == "102301" || this.userId == "102548") {
					this.tabItems = ["TPA"];
				} else if (this.userId == "103572") {
					this.tabItems = ["Petty Cash"];
				} 
				//ch user Menu addition
				else {
					this.tabItems = [
						"Domestic",
						"Cogs Vs Revn",
						"NewOPD",
						"DRT",
						"Petty Cash",
						"TPA",
						"Coll_Deposit",
						//praveen
						"Competitors",
					];
				}
			}
			//sch Menu addition 
			else if (this.userType == "strcenterhead") {
				if (
					this.userId == "itteamsch" ||
					this.userId == "101506" ||
					this.userId == "100552" ||
					this.userId == "100078" ||
					this.userId == "100405"
				) {
					this.tabItems = [
						"Domestic",
						"Cogs Vs Revn",
						"NewOPD",
						"DRTApproval",
						"pettycashApproval",
						"Coll_Deposit_View",
						//praveen
						'compApproval'
					];
				} else if (this.userId == "103260") {
					this.tabItems = ["pettycashApproval", "Coll_Deposit_View"];
				}
				else {
					this.tabItems = [
						"Domestic",
						"Cogs Vs Revn",
						"NewOPD",
						"DRTApproval",
						"pettycashApproval",
						"Coll_Deposit_View"
					];
				}
			}
			//finance Menu addition
			else if (this.userType == "financeuser") {
				if (
					this.userId == "finpc" ||
					this.userId == "orbfinpc1" ||
					this.userId == "orbfinpc2"
				) {
					this.tabItems = ["Cashapproval"];
				} else if (this.userId == "reconadmin") {
					this.tabItems = ["Coll_Deposits"];
				} else if(this.userId==='108477'){
					this.tabItems = ['competitor'];
				} else {
					this.tabItems = ["AdminApproval"];
				}
			} 
			//specific Menu for user
			else {
				if (this.userId == 103390) {
					this.tabItems = ["Domestic", "Cogs Vs Revn", "NewOPD"];
				} else if (this.userId == "300025") {
					this.tabItems = ["Domestic", "Cogs Vs Revn", "NewOPD", "DOB"];
				} else {
					this.tabItems = ["Domestic", "Cogs Vs Revn", "NewOPD", "AVA-Demo"];
				}
			}
	  
	
	  
    });
    timer.on("idle", () => {
      this.logout();
    });
  },
  methods: {
    logout () {
		this.$http.get(`https://mis.dragarwal.com/mis-logout`).then(response => {
		//this.$http.get(`http://localhost:7777/mis-logout`).then(response => {
        this.errors = [];
        this.dynamicComponent = "login";
        this.show = false;
        sessionStorage.clear();
      });
    },
    changeCategory (item) {    
	  if(item==='Domestic'){
	    if((this.userType=='domestic') || (this.userType=='group') || (this.userType=='overcease') || (this.userType=='admin')){
			serverBus.$emit('changeComponent', 'domesticrevenue')
		}
		if(this.userType=='normal' || this.userType == 'centerhead' || this.userType == 'strcenterhead'){
			serverBus.$emit('changeComponent', 'normalrevenue')
		}
	  }
	  if(item==='Group'){
			serverBus.$emit('changeComponent', 'group')
	  }
	  if(item==='Trigger Email'){
			serverBus.$emit('changeComponent', 'emailsent')
	  }
	  if(item==='Fetch Data'){
			serverBus.$emit('changeComponent', 'datafetch')
	  }
	  if(item==='E-Recipients'){
			serverBus.$emit('changeComponent', 'emailrecipi')
	  }
	  if(item==='FTD List'){
			serverBus.$emit('changeComponent', 'revenuelist')
	  }
	   if(item==='Exchange Rates'){
			serverBus.$emit('changeComponent', 'exchangerates')
	  }
	  if((this.userType=='domestic') || (this.userType=='group') || (this.userType=='overcease') || (this.userType=='admin')){
	  
	    if (item === 'Revenue') serverBus.$emit('changeComponent', 'revenueSuper')
        if (item === 'Cogs Vs Revn') serverBus.$emit('changeComponent', 'cogsSuper')
        
      }else {
        if (item === 'Revenue') serverBus.$emit('changeComponent', 'revenue')
        if (item === 'Cogs Vs Revn') serverBus.$emit('changeComponent', 'cogs')
      }
	  if((this.userType=='domestic') || (this.userType=='group') || (this.userType=='overcease') || (this.userType=='admin')){
       if (item === 'NewOPD') serverBus.$emit('changeComponent', 'newpod')
        
      }
      else {
	   if (item === 'NewOPD') serverBus.$emit('changeComponent', 'newopdnormal')   
       
      }
	  if(item==='Dashboard'){
			serverBus.$emit('changeComponent', 'chart')
	  }
	  if(item==='Surgery'){
			serverBus.$emit('changeComponent', 'ot')
	  }
	  if(item==='RevenueReport'){
			serverBus.$emit('changeComponent', 'revenuereport')
	  }
	  if(item==='Discount'){
			serverBus.$emit('changeComponent', 'Discount')
	  }
	  if ((sessionStorage.getItem('admin_user')) || (sessionStorage.getItem('group_user')) || (sessionStorage.getItem('optical_user')) || (sessionStorage.getItem('domestic_user')) || (sessionStorage.getItem('collection'))) {
       if (item === 'Optical') serverBus.$emit('changeComponent', 'Optical')
	   if (item === 'Collection') serverBus.$emit('changeComponent', 'Collection')

     }
	  if(item==='AVA-Magic50'){
	  serverBus.$emit('changeComponent', 'avamagic')
	  }if(item==='Newconsultation'){
	  serverBus.$emit('changeComponent', 'Newconsultation')
	 }
	 if(item==='CogsVariance'){
		serverBus.$emit('changeComponent', 'revenuevscogs')
	  }
	  
	  
	 
	 if(item==='Petty Cash'){
		serverBus.$emit('changeComponent', 'pettycash_ch_list')
	 }
	 
	 
	 if(item==='AVA-Demo'){
	  serverBus.$emit('changeComponent', 'avamagicdemo')
	  }
	  
	  
	  if (item === 'DRT') {
        serverBus.$emit('changeComponent', 'DRT')
      }

      if (item === 'DRTApproval') {
        serverBus.$emit('changeComponent', 'DRTApproval')
      }
      if (item === 'AdminApproval') {
        serverBus.$emit('changeComponent', 'AdminApproval')
      }
      if (item === 'DRTreport') {
        serverBus.$emit('changeComponent', 'DRTreport')
      }if (item === 'chicdoctorlist') {
        serverBus.$emit('changeComponent', 'chicdoctorlist')
      }
      if (item === 'admindoctorapproval') {
        serverBus.$emit('changeComponent', 'admindoctorapproval')
      }
      if (item === 'subbill') {
        serverBus.$emit('changeComponent', 'subbill')
      }
      if (item === 'changecategory') {
        serverBus.$emit('changeComponent', 'changecategory')
      }
	  if(item === 'pettycashApproval'){
        serverBus.$emit('changeComponent','pettycashApproval')
      }
      if(item==='Cashapproval'){
        serverBus.$emit('changeComponent','Cashapproval')
      }
	  
	  if(item==='TPA'){
		serverBus.$emit('changeComponent', 'Tpa')
	 }
	 if(item==='TPAApproval'){
		serverBus.$emit('changeComponent', 'Tpa_Approve')
	 }
	 if(item==='StockLedger'){
		serverBus.$emit('changeComponent', 'stock_ledger')
	 }
	  if(item==='BatchwiseStock'){
		serverBus.$emit('changeComponent', 'batch_wisestock')
	 }
	 
	 
	  
	  if(item==='Logout'){
		this.logout();
	  }
	  if(item==='Change Password'){
		serverBus.$emit('changeComponent', 'changepassword')
	  }
	  
      if (item === 'Cogsdata') {
        serverBus.$emit('changeComponent', 'Cogsdata')
      }
      if (item === 'IWSR') {
        serverBus.$emit('changeComponent', 'iwsr')
      }
	  if (item === 'DOB') {
        serverBus.$emit('changeComponent', 'dob')
      }if (item === 'SnapshotRevenue') {
        serverBus.$emit('changeComponent', 'snapshotrevenue')
      }
	  if (item === 'SnapshotEBITDA') {
        serverBus.$emit('changeComponent', 'snapshotrevenueebita')
      }
	  if (item === 'Coll_Deposits') {
        serverBus.$emit('changeComponent', 'coll_recon_admin')
      }if (item === 'Coll_Deposit') {
        serverBus.$emit('changeComponent', 'coll_recon')
      }if (item === 'Coll_Deposit_View') {
        serverBus.$emit('changeComponent', 'coll_recon_sch')
      }if (item === 'StockExpiry') {
        serverBus.$emit('changeComponent', 'stockexpiry')
      }
	  
	  			//praveen
				  if (item === "Competitors") {
				serverBus.$emit("changeComponent", "competitors");
			}
			if (item === 'compApproval') {
				serverBus.$emit('changeComponent', 'compApproval')
			}
			if (item === 'competitor') {
				serverBus.$emit('changeComponent', 'competitor')
			}

    }
    // ,
    // home () {
    //   serverBus.$emit('changeComponent', 'chart')
    // }
  },
  filters:{
    nameFilter(name){
      return name.split(' ')[0]
    }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 0;
}
v-list-tile-action:hover {
  text-decoration: none;
}
.cursor {
  cursor: pointer;
  cursor: hand;
  /* touch-action: none */
}
</style>