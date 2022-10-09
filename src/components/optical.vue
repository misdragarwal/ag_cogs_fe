<template>
<v-container fluid fill-height class="grey lighten-3">
  <v-slide-y-transition mode="out-in">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
        <v-toolbar flat color="grey lighten-2">
          <v-toolbar-title>Optical </v-toolbar-title>
          <v-divider class="mx-2 black" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-menu absolute ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="200px">
            <v-text-field slot="activator" v-model="date" placeholder="Select Date" prepend-inner-icon="event" readonly></v-text-field>
            <v-date-picker color="primary" v-model="date" no-title scrollable min="2018-04-01" :max="today" backgroundRevenue-color="grey" style="box-shadow:none">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false" style="outline:none">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date);apiRequestOPDSuper(date)" style="outline:none">Generate</v-btn>
            </v-date-picker>


          </v-menu>
          <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName" :fetch="downloadExcelRevenueSuper">
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
        <div class="table-responsive">
          <table class="table table-hover table-bordered" v-if="show">
            <thead>
              <tr class="grey lighten-2">
                <th class="text-xs-left" width="15%" scope="col">Region</th>
                <th class="text-xs-center" scope="col">Code</th>
                <th class="text-xs-center" scope="col">Location</th>
                <th class="text-xs-center" scope="col">MTD (in lacs)</th>
                <th class="text-xs-center" scope="col">LYSMTD</th>
                <th class="text-xs-center" scope="col">MTD Gr.%</th>
                <th class="text-xs-center" scope="col">Target for the Month</th>
                <th class="text-xs-center" scope="col">MTD Ach.%</th>


              </tr>

            </thead>
            <tbody>
              <tr scope="row" v-for="(item,index) in Group" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>

                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>

                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>


              </tr>

              <tr scope="row" v-for="(item,index) in ohc" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in alin" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>

                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>

              </tr>


              <tr scope="row" v-for="(item,index) in Chennai" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>
              <tr scope="row" v-for="(item,index) in ROTN" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>
              <tr scope="row" v-for="(item,index) in Karnataka" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in Maharashtra" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in Hyderabad" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>
              <tr scope="row" v-for="(item,index) in AP" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>


              <tr scope="row" v-for="(item,index) in Kerala" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>


              <tr scope="row" v-for="(item,index) in Kolkata" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in ROI" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right font-weight-black ">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right font-weight-black ">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black  text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>


              <tr scope="row" v-for="(item,index) in Madhya_Pradesh" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right font-weight-black ">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right font-weight-black ">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black  text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in Odisha" :key="index+item.groupwise">
                <td></td>
                <td></td>
                <td scope="row" style="cursor:pointer" class="font-weight-black allindiagroup">{{item.groupwise}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptpercachieved !='Infinity')" class="text-xs-right">{{item.mtdoptpercachieved}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptpercachieved ==='Infinity')" class="text-xs-right">0%</td>
              </tr>


              <tr scope="row" v-for="(item,index) in Chennaibranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">Chennai</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in ROTNbranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">ROTN</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>


              <tr scope="row" v-for="(item,index) in Karnatakabranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  "> Karnataka</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in Maharashtrabranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">Maharashtra</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in Hyderabadbranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">Hyderabad</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>


              <tr scope="row" v-for="(item,index) in APbranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">AP</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>


              <tr scope="row" v-for="(item,index) in Keralabranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">Kerala</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in Kolkatabranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">Kolkata</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>




              <tr scope="row" v-for="(item,index) in ROIbranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">ROI</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in Madhya_Pradeshbranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">Madhya_Pradesh</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>


              <tr scope="row" v-for="(item,index) in Odishabranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">Odisha</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>

              <tr scope="row" v-for="(item,index) in ohcbranches" :key="index+item.branch">
                <td scope="row" style="cursor:pointer" class="font-weight-black  ">OHC</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branchcode}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black ">{{item.branch}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.mtdoptrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right">{{lakhFormat(item.lstoptrev)}}</td>
                <td scope="row" style="cursor:pointer" v-if="(item.mtdoptperc !='Infinity')" class="text-xs-right">{{item.mtdoptperc}}%</td>
                <td scope="row" style="cursor:pointer" v-else="(item.mtdoptperc ==='Infinity')" class="text-xs-right">0%</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetcolor">{{lakhFormat(item.targetmtdrev)}}</td>
                <td scope="row" style="cursor:pointer" class="font-weight-black text-xs-right targetachicolor">{{item.mtdoptpercachieved}}%</td>
              </tr>

            </tbody>

          </table>
        </div>

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
import {
  serverBus
} from "../main";
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
    user_role: null,

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
    Group: null,
    alin: null,
    OHC: null,
    AP: null,
    Chennai: null,
    ROTN: null,
    Karnataka: null,
    kerala: null,
    Hyderabad: null,
    Kolkata: null,
    Maharashtra: null,
    Odisha: null,
    ROI: null,
    Madhya_Pradesh: null,


    Chennaibranches: null,
    ROTNbranches: null,
    Karnatakabranches: null,
    Hyderabadbranches: null,
    Keralabranches: null,
    APbranches: null,
    Kolkatabranches: null,
    Maharashtrabranches: null,
    Odishabranches: null,
    ROIbranches: null,
    Madhya_Pradeshbranches: null,


    json_data: null,
    json_meta: [{
      key: "charset",
      value: "utf-8"
    }],
    json_fields: {
      "Region": "groupwise",
      "Code": "branchcode",
      "Location": "branch",
      "MTD": "mtdoptrev",
      "LMTD": "lstoptrev",
      "MTD%": "mtdoptperc",
      "Target Month": "targetmtdrev",
      "Target Achieved": "mtdoptpercachieved"
    },
    fileName: null
  }),
  created() {
    this.getToday();
  },
  methods: {
    getToday() {
      this.today = moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    },

    numberformat(number) {
      return number.toLocaleString('en');
    },
    lakhFormat(num) {
      return (Number(num) / 100000).toFixed(2);
    },

    apiRequestOPDSuper(date) {
      // let superUserName = sessionStorage.getItem("super_user");
      console.log("hit");
      if (date !== null) {
        this.fileDate = date;
        this.fileName = `Optical_Report_${this.fileDate}.csv`;
        this.loading = true;
        this.isLoading = true;
        console.log("h");
        this.$http
          .get(`https://mis.dragarwal.com/api-opticals-super/${date}`)
          //.get(`https://mis.dragarwal.com/api-opticals-super/${date}`)
          .then(response => {
            this.processDataOPDSuper(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processDataOPDSuper(data) {
      if (sessionStorage.getItem('super_user')) {
        this.user_role = 'super_user';
      } else if (sessionStorage.getItem('overseas_user')) {
        this.user_role = 'overseas_user';
      } else if (sessionStorage.getItem('indian_user')) {
        this.user_role = 'indian_user';
      } else if (sessionStorage.getItem('optical_user')) {
        this.user_role = 'optical_user';
      }

      console.log(data);
      this.ohc = [data.group['OHC']];

      this.Chennai = [data.group['Chennai']];
      this.AP = [data.group['AP']];
      this.ROTN = [data.group['ROTN']];
      this.Karnataka = [data.group['Karnataka']];
      this.Kerala = [data.group['Kerala']];
      this.Maharashtra = [data.group['Maharashtra']];
      this.Hyderabad = [data.group['Hyderabad']];
      this.Kolkata = [data.group['Kolkata']];
      this.Odisha = [data.group['Odisha']];
      this.ROI = [data.group['ROI']];
      this.Madhya_Pradesh = [data.group['Madhya_Pradesh']];

      this.Group = [data.Group];
      this.alin = [data.alin];
      this.Chennaibranches = data.branch['Chennai'];
      this.ROTNbranches = data.branch['ROTN'];
      this.Karnatakabranches = data.branch['Karnataka'];
      this.Keralabranches = data.branch['Kerala'];
      this.Maharashtrabranches = data.branch['Maharashtra'];
      this.Hyderabadbranches = data.branch['Hyderabad'];
      this.APbranches = data.branch['AP'];
      this.Kolkatabranches = data.branch['Kolkata'];
      this.Odishabranches = data.branch['Odisha'];
      this.ROIbranches = data.branch['ROI'];
      this.Madhya_Pradeshbranches = data.branch['Madhya_Pradesh'];
      this.ohcbranches = data.branch['OHC'];

      this.show = true;
    },
    downloadExcelRevenueSuper() {
      let tempDataArr = [];

      if (this.fileDate !== null) {
        tempDataArr = [this.Group].concat(
          this.Group,
          this.ohc,
          this.alin,
          this.Chennai,
          this.AP,
          this.ROTN,
          this.Karnataka,
          this.Kerala,
          this.Hyderabad,
          this.Kolkata,
          this.Odisha,
          this.ROI,
          this.Madhya_Pradesh,
          this.Maharashtra,
          this.Chennaibranches,
          this.ROTNbranches,
          this.Karnatakabranches,
          this.Keralabranches,
          this.Hyderabadbranches,
          this.APbranches,
          this.Kolkatabranches,
          this.Odishabranches,
          this.ROIbranches,
          this.Madhya_Pradeshbranches,
          this.Maharashtrabranches,
          this.ohcbranches,
        );
        return tempDataArr;
      } else {
        return null;
      }




    },

    changeColorOPDSuper(data) {
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
            "TVM",
            "PUN",
            "AHM",
            "IND"
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

.table-striped>tbody>tr:nth-child(2n + 2)>td,
.table-striped>tbody>tr:nth-child(2n + 2)>th {
  background-color: #e5e5f2;
  touch-action: none;
}

.allindiagroup {
  background-color: #f0ae19 !important
}

.targetcolor {
  background-color: #FCD12A !important
}

.targetachicolor {
  background-color: #87CEFA !important
}

.branchesgrp {
  background-color: #7083a9 !important
}

.rotgrp {
  background-color: #264e99 !important
}

.whitefont {
  font-weight: 900 !important;
  color: #ffffff !important
}

.ochfont {
  background-color: #f9e699 !important;
  font-weight: 900 !important;
  color: #1d1d1d !important
}
</style>
