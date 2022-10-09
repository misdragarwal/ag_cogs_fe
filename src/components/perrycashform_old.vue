<template>
  <v-container
    
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
            <v-toolbar-title>Petty Cash</v-toolbar-title>
            
            
            
          </v-toolbar>
		  
          <loading
            :active.sync="isLoading"
            :is-full-page="fullPage"
            color="#7f0000"
            loader="bars"
          ></loading> 
		  
			
		  
		     <v-card-text>
			         <table  class="table table-hover table-bordered"
              v-if="show">
              <thead>
                <tr class="grey lighten-2">
                  <th
                    class="text-xs-left"                    
                    scope="col"                    
                  >Branch</th>
                  <th
                    class="text-xs-center"
                    scope="col"                    
                  >Credit</th>
                  <th
                    class="text-xs-center"
                    scope="col"                    
                  >Debit</th>
				  <th
                    class="text-xs-center"
                    scope="col"                    
                  >Balance</th>
                </tr>                
              </thead>
			  <tbody>
                <tr
                  scope="row"                 
                  :class="'font-weight-black indigo lighten-2'"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"                    
                  >{{pettycash_branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{pettycash_credit}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{pettycash_debit}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{pettycash_balance}}</td>
                  
                </tr>
              </tbody>
			  </table>
			 
                    <v-container grid-list-md>
                      <v-layout wrap>				  
					        <v-flex xs12 sm6 md4>
								<v-select
								v-model="selbranch"
								:items="branch"
								:error-messages="branchErrors"
								label="Branch"
								required
								 item-text="shortCode"
								item-value="TEXT"
								v-on:change="branchamount"
								@blur="$v.selbranch.$touch()"
								></v-select>
							</v-flex>
                       
							<v-flex xs12 sm6 md4>
								 <v-text-field
								  v-model="voucherno"
								  :error-messages="vouchernoErrors"
								  :counter="10"
								  label="Voucher No"
								  required
								  @input="$v.voucherno.$touch()"
								  @blur="$v.voucherno.$touch()"
								></v-text-field>
							</v-flex>
							
							<v-flex xs12 sm6 md4>
								<v-select
								v-model="category"
								:items="items"
								:error-messages="categoryErrors"
								label="Category"
								required
								item-text="shortCode"
								item-value="text"
								@change="$v.category.$touch()"
								@blur="$v.category.$touch()"
								
								></v-select>
							</v-flex>

							<v-flex xs12 sm6 md4>
								 <v-text-field
								  v-model="vendorname"								 						  
								  label="Vendor Name"
								  @input="$v.vendorname.$touch()"
								  @blur="$v.vendorname.$touch()"
								></v-text-field>
							</v-flex>
							
							<v-flex xs12 sm6 md4>
								 <v-text-field
								  v-model="billno"								 						  
								  label="Bill No"								 
								  @input="$v.billno.$touch()"
								  @blur="$v.billno.$touch()"
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>   
							
							
								 <v-text-field
								  v-model="expensedate"	
                                  :error-messages="expensedateErrors"								  
								  label="Bill/ Expense Date"
								  type="date"
								  min="2018-04-01"
								  :max="today"						 
								  required
								  @input="$v.expensedate.$touch()"
								  @blur="$v.expensedate.$touch()"
								></v-text-field>
							</v-flex>
							
							<v-flex xs12 sm6 md4>

								 <v-text-field
								  v-model="remarks"	                                  					  
								  label="Remarks"								 
								  @input="$v.remarks.$touch()"
								  @blur="$v.remarks.$touch()"
								></v-text-field>
							</v-flex>
							
							<v-flex xs12 sm6 md4>
								 <v-text-field
								  v-model="amount"	
								  :error-messages="amountErrors"								  
								  label="Amount"
								  required
								  @input="$v.amount.$touch()"
								  @blur="$v.amount.$touch()"
								></v-text-field>
							</v-flex>
							
							<v-flex xs12 sm6 md4>
								 <v-text-field
								  v-model="sumbissiondate"								  
								  label="Submission Date"								 
								  @input="$v.sumbissiondate.$touch()"
								  @blur="$v.sumbissiondate.$touch()"
								  readonly
								></v-text-field>
							</v-flex>
							<v-flex xs12 sm6 md4>
								 
							</v-flex>
							<v-flex xs12 sm6 md4>
								 <b>Attachment</b>
							</v-flex>
							<v-flex xs12 sm6 md4>
								 
							</v-flex>
							<v-flex xs12 sm6 md4>
								 <label>Voucher</label>
									<!--<v-file-input  label="File input"></v-file-input>-->								
								<input type="file" 	ref="voucherupload" id="voucherupload"	accept="image/x-png, image/gif, image/jpeg,application/pdf" v-on:change="handleFileUploadVoucher()" :error-messages="voucheruploadErrors" @input="$v.voucherupload.$touch()"
								  @blur="$v.voucherupload.$touch()"
								  /><span id="voucherUploaderr" ref="voucherUploaderr" style='color:red'></span>
							</v-flex>
							<v-flex xs12 sm6 md4>
								 <label>Bill</label>
								  <input type="file" ref="billupload" id="billupload" accept="image/x-png, image/gif, image/jpeg,application/pdf"   v-on:change="handleFileUploadBill()" /><span id="billUploaderr" ref="billUploaderr" style='color:red'></span>
								 
							</v-flex>
							<v-flex xs12 sm6 md4>
								 
							</v-flex>
							<v-flex xs12 sm6 md4>
								 
							</v-flex>
							
							 <v-btn class="mr-4" @click="submit">submit</v-btn>
							 <v-btn @click="clear">clear</v-btn>
						
                      </v-layout>
                    </v-container> 					
                  </v-card-text>
        </v-flex>
        
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
import moment from "moment";
import { serverBus } from "../main";
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
export default {
    mixins: [validationMixin],

    validations: {
	  selbranch: { required },
      voucherno: { required, maxLength: maxLength(10) },       	  
      category: { required },  
	  expensedate: { required },
	  amount: { required },
	  voucherupload: { required }
	  
      
    },

    data: () => ({
	  isLoading: false,
      fullPage: true,
	  selbranch:[],
      voucherno: '',      
      category: [],
      branch :[],	  
      items: [],
	  expensedate:'',
	  amount:'',
	  sumbissiondate:'',
	  remarks:'',
	  vendorname:'',
	  billno:'',
	  show: false,
	  pettycash_branch : null,
	  pettycash_credit : null,
	  pettycash_debit : null,
	  pettycash_balance : null,
	  fileVoucher:null,
	  fileBill:null,
      today: "",	  
    }),
	
	
	mounted() {
		this.loadbranch();
		this.loadcategoty();
		this.getToday();		
		this.sumbissiondate=this.today;
		
    },

    computed: {
	  
	  branchErrors () {
        const errors = []
        if (!this.$v.selbranch.$dirty) return errors
        !this.$v.selbranch.required && errors.push('Branch is required')
        return errors
      },
      categoryErrors () {
        const errors = []
        if (!this.$v.category.$dirty) return errors
        !this.$v.category.required && errors.push('Category is required')
        return errors
      },
      vouchernoErrors () {
        const errors = []
        if (!this.$v.voucherno.$dirty) return errors
        !this.$v.voucherno.maxLength && errors.push('Voucher No must be at most 10 characters long')
        !this.$v.voucherno.required && errors.push('Voucher No is required.')
        return errors
      },
	  expensedateErrors () {
        const errors = []
        if (!this.$v.expensedate.$dirty) return errors        
        !this.$v.expensedate.required && errors.push('Bill/ Expense Date is required.')
        return errors
      },
	  amountErrors () {
        const errors = []
        if (!this.$v.amount.$dirty) return errors        
        !this.$v.amount.required && errors.push('Amount is required.')
        return errors
      },
	  voucheruploadErrors () {
        const errors = []
        if (!this.$v.voucherupload) return errors        
        !this.$v.voucherupload.required && errors.push('Voucher is required.')
        return errors
      }
	  
    },

    methods: {
	  getToday () {
		this.today = moment().format("YYYY-MM-DD");
	  },
      submit () {
        
        
		this.$v.$touch();		
		/*if(!this.$refs.voucherupload.files[0]){
			this.$refs.voucherUploaderr.innerText = 'Voucher is required';			
			return false;
		}	
		else if ((this.fileVoucher.size  > 1000000)) {
		    this.$refs.voucherUploaderr.innerText = '';
			this.$refs.voucherUploaderr.innerText = 'Voucher file is greater than 500KB';
		    //alert("Voucher file is greater than 500KB");			
			return false;			
		}else if((this.fileVoucher.size  < 500000)){
			 this.$refs.voucherUploaderr.innerText = '';
			 return false;
		}else if ((this.fileBill.size  > 1000000)) {
		    this.$refs.billUploaderr.innerText = '';
			this.$refs.billUploaderr.innerText = 'Bill file is greater than 500KB';
		    //alert("Voucher file is greater than 500KB");			
			return false;			
		}else if((this.fileBill.size  < 500000)){
			 this.$refs.billUploaderr.innerText = '';
			 return false;
		}*/
		
		alert("222222222222");	
        /*var formData = new FormData()
		let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
				 
				
		formData.append("branch", this.selbranch);
		formData.append("voucherno", this.voucherno);
		formData.append("category", this.category);
		formData.append("remarks", this.remarks);
		formData.append("expensedate", this.expensedate);
		formData.append("amount", this.amount);
		formData.append("vendorname", this.vendorname);
		formData.append("billno", this.billno);
		formData.append("sumbissiondate", this.sumbissiondate);
		formData.append("fileVoucher", this.fileVoucher);
		formData.append("fileBill", this.fileBill);
		formData.append("chid", normalusername.name);
		
		this.$http.post('http://localhost:8888/api-petty-cash-bill-submit', formData, {}).then(res => {
				this.isLoading = true;
				alert(res.data.ResponseMsg);				
				this.isLoading = false;
				this.clear();
				this.show = false;
        })*/
		
		

      },
	  handleFileUploadVoucher(){
		this.fileVoucher = this.$refs.voucherupload.files[0];	
		if ((this.fileVoucher.size > 1000000)) {
		     this.$refs.voucherUploaderr.innerText = '';
			 this.$refs.voucherUploaderr.innerText = 'Voucher file is greater than 500KB';
			 //alert("Voucher file is greater than 500KB");
			 return false;
		
		}else if((this.fileVoucher.size  < 500000)){
			 this.$refs.voucherUploaderr.innerText = '';
		}
	  },
	  handleFileUploadBill(){
		this.fileBill = this.$refs.billupload.files[0];	
		if ((this.fileBill.size > 1000000)) {
		     this.$refs.billUploaderr.innerText = '';
			 this.$refs.billUploaderr.innerText = 'Bill file is greater than 500KB';
			 //alert("Voucher file is greater than 500KB");
			 return false;
		
		}else if((this.fileBill.size  < 500000)){
			 this.$refs.billUploaderr.innerText = '';
		}
	  },
      clear () {
        this.$v.$reset()
        this.voucherno = ''        
        this.selbranch = [];
		this.category = [];
		this.remarks='';
		this.expensedate='';
		this.amount='';
		this.vendorname='';
		this.billno='';
		//this.sumbissiondate='';
		this.$refs.voucherupload.value = null;
		this.$refs.billupload.value = null;
		this.$refs.voucherUploaderr.innerText = '';
		this.$refs.billUploaderr.innerText = '';
		this.fileVoucher = null;
		this.fileBill = null;
		//$("#voucherupload").replaceWith(input.val('').clone(true));
        
      },
	  loadbranch() {
		  let userid = JSON.parse(sessionStorage.getItem("normal_user"));
           
          var arr1 = [{TEXT: '',shortCode: 'Select All', }];		  
		  this.axios		   
			.get(`http://localhost:8888/api-chbranch/${userid.userName}`).then(response => {		
			  console.log(response.data);
			  this.branch = arr1.concat(response.data);
			  //alert(JSON.stringify(this.branch));
			  console.log(this.branch);
			})
	},
	
	branchamount(selectObj) {
		  this.axios		   
			.get(`http://localhost:8888/api-bramch-allocated-amount/${selectObj}`).then(response => {			
				alert(response.data[0]['credit']);
				this.show = true;
				this.pettycash_branch=response.data[0]['branch'];
				this.pettycash_credit=response.data[0]['credit'];
				this.pettycash_debit=response.data[0]['debit'];
				this.pettycash_balance=response.data[0]['balance'];
				
			})
	},
	
	loadcategoty() {           
          var arr2 = [{text: '',shortCode: 'Select All', }];		  
		  this.axios		   
			.get(`http://localhost:8888/api-pettycashcategory`).then(response => {			  
			  this.items = arr2.concat(response.data);		  
			 
			})
	},
	
    },
  }
</script>



