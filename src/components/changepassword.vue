<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md5
      >
        <v-card
          class="elevation-12"
          tile
          hover
        >
          <v-toolbar
            dark
            color="grey darken-2"
          >
            <v-toolbar-title>Change Password <br><span style="font-size:15px">(min 5,max8 character)</span></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="newpassword"
                :rules="newpasswordRules"
                label="New Password"
                required
                @keydown.enter="submit"
                autofocus="autofocus"
              ></v-text-field>
              <v-text-field
                v-model="confirmpassword"
                :rules="confirmpasswordRules"
                label="Confirm Password"
                required
                @keydown.enter="submit"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                @click:append="show1 = !show1"
                :type="show1 ? 'text' : 'password'"
              ></v-text-field>
              <!-- <v-btn color=primary :disabled="!valid" @click="submit">
                                Login
              </v-btn>-->
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!valid"
                color="grey darken-2"
                class="white--text"
                @click="submit"
                :loading="loading"
              >Change</v-btn>
              <span
                class="red--text font-weight-regular"
                :v-if="errors.length"
              >{{errors.toString()}}</span>
			  
			  <span
                class="green--text font-weight-regular"
                :v-if="success.length"
              >{{success.toString()}}</span>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { serverBus } from "../main";


export default {
  data: () => ({
    loading: false,
    valid: true,
    show1: false,
	show: false,
    newpassword: "",
    newpasswordRules: [v => !!v || "New Password is required"],
    confirmpassword: "",
    confirmpasswordRules: [v => !!v || "Confirm Password is required"],
	userId:null,
    errors: [],
	success:[]
  }),
  created () {  
	 if (sessionStorage.getItem('normal_user')) {
        let normSess = JSON.parse(sessionStorage.getItem('normal_user'))        
		this.userId = normSess.name		
      }else if(sessionStorage.getItem('domestic_user')){
		 let superSess = JSON.parse(sessionStorage.getItem('domestic_user'))      
		this.userId = superSess.name		
	  }else if(sessionStorage.getItem('group_user')){
		 let superSess = JSON.parse(sessionStorage.getItem('group_user'))        
		this.userId = superSess.name		
	  }else if(sessionStorage.getItem('overseas_user')){
		 let superSess = JSON.parse(sessionStorage.getItem('overseas_user'))        
		this.userId = superSess.name		
	  }else if(sessionStorage.getItem('indian_user')){
		 let superSess = JSON.parse(sessionStorage.getItem('indian_user'))        
		this.userId = superSess.name		
	  }else if(sessionStorage.getItem('optical_user')){
		 let superSess = JSON.parse(sessionStorage.getItem('optical_user'))        
		this.userId = superSess.name		
	  }else if(sessionStorage.getItem('tpa_user')){
		 let superSess = JSON.parse(sessionStorage.getItem(tpa_user))        
		this.userId = superSess.name		
	  }else if(sessionStorage.getItem('coll_user')){
		 let superSess = JSON.parse(sessionStorage.getItem(coll_user))        
		this.userId = superSess.name		
	  }else if(sessionStorage.getItem('fin_user')){
		 let superSess = JSON.parse(sessionStorage.getItem(fin_user))        
		this.userId = superSess.name		
	  }else {
        let superSess = JSON.parse(sessionStorage.getItem('admin_user'))        
		this.userId = superSess.name		
      }
   },
  methods: { 
	submit () {
		if (this.$refs.form.validate()) {
			if(this.newpassword.length<5){
				this.errors = ["new password must have 5 character"];
			}else if(this.newpassword.length>8){
				this.errors = ["new password doesn't allow more than 8 character"];
			}else if(this.newpassword==this.confirmpassword){
				this.loading = true;
				this.axios
				  .post(`https://mis.dragarwal.com/mis-changepassword`, {
					//.post(`http://localhost:8888/mis-changepassword`, {
					user: this.userId,
					confirmpassword: this.confirmpassword.trim()
				  })
				  .then(response => {			  
					console.log(response);
					this.loading = false;
					if (response.data.isAuthenticated === true) {
					   sessionStorage.clear();
					  this.success = ["Password change successfully"];					  
                      setTimeout(function(){ 
							serverBus.$emit("changeComponent", "login");	
							this.loading = true;
							location.reload();	
					  
					  }, 500);				
					  				  
					}else {
					  this.errors = ["Password not change"];
					}
				  });
			  
			}else{
				this.errors = ["New and Confirm Password not match"];
			}
		}
	}
  }
};
</script>

<style>
</style>
