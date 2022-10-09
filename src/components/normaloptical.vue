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
            <v-toolbar-title>Optical </v-toolbar-title>
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
                  @click="$refs.menu.save(date);apiRequestOPDSuper(date)"
                  style="outline:none"
                >Generate</v-btn>
              </v-date-picker>





            </v-menu>
            <!-- <download-excel
              :data="json_data"
              :fields="json_fields"
              type="csv"
              :name="fileName"
              :fetch="downloadExcelRevenueSuper"
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
            </download-excel> -->
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
              <thead>
                <tr class="grey lighten-2">
                  <th
                    class="text-xs-left"
                    width="15%"
                    scope="col"
                  >Region</th>
          <th class="text-xs-center"
              scope="col">Code</th>
          <th class="text-xs-center"
              scope="col">Location</th>
				  <th class="text-xs-center"
              scope="col">MTD (in lacs)</th>
				  <th class="text-xs-center"
              scope="col">LYSMTD</th>
              <th class="text-xs-center"
                  scope="col">MTD Gr.%</th>
              <th class="text-xs-center"
                  scope="col">Target for the Month</th>
              <th class="text-xs-center"
                  scope="col">MTD Ach.%</th>


                </tr>

              </thead>
              <tbody v-if="user_role=='optical_user'">

                <tr
                          scope="row"
                          v-for="(item,index) in groupBranch"
                          :key="index+item.groupwise"

                        ><td></td><td></td>

                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black allindiagroup"
                          >{{item.groupwise}}</td>

                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="text-xs-right"
                          >{{numberformat(item.mtdoptrev)}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="text-xs-right"
                          >{{numberformat(item.lstoptrev)}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                              class="text-xs-right"
                          >{{item.mtdoptperc}}%</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="text-xs-right targetcolor"
                          >{{numberformat(item.targetmtdrev)}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                              class="text-xs-right targetachicolor"
                          >{{item.mtdoptpercachieved}}%</td>

                        </tr>
			   <tr
                  scope="row"
                  v-for="(item,index) in branchindivi"
                  :key="index+item.groupwise"

                ><td>{{item.region}}</td>
                  <td
                    scope="row"
                    style="cursor:pointer"
                    class="font-weight-black"
                  >{{item.code}}</td>
                  <td
                    scope="row"
                    style="cursor:pointer"
                    class="font-weight-black "
                  >{{item.branchName}}</td>
                  <td
                    scope="row"
                    style="cursor:pointer"
                    class="text-xs-right"
                  >{{numberformat(item.mtdoptrev)}}</td>
                  <td
                    scope="row"
                    style="cursor:pointer"
                      class="text-xs-right"
                  >{{numberformat(item.lstoptrev)}}</td>
                  <td
                    scope="row"
                    style="cursor:pointer"
                      class="text-xs-right"
                  >{{item.mtdoptperc}}%</td>
                  <td
                    scope="row"
                    style="cursor:pointer"
                      class="text-xs-right targetcolor"
                  >{{numberformat(item.targetmtdrev)}}</td>
                  <td
                    scope="row"
                    style="cursor:pointer"
                      class="text-xs-right targetachicolor"
                  >{{item.mtdoptpercachieved}}%</td>
                </tr>
              <!--  <tr
                          scope="row"
                          v-for="(item,index) in ROTN"
                          :key="index+item.groupwise"

                        ><td></td><td></td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black allindiagroup"
                          >{{item.groupwise}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="text-xs-right"
                          >{{numberformat(item.mtdoptrev)}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                              class="text-xs-right"
                          >{{numberformat(item.lstoptrev)}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                              class="text-xs-right"
                          >{{item.mtdoptperc}}%</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                              class="text-xs-right targetcolor"
                          >{{numberformat(item.targetmtdrev)}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                              class="text-xs-right targetachicolor"
                          >{{item.mtdoptpercachieved}}%</td>
                        </tr>
                        <tr
                                  scope="row"
                                  v-for="(item,index) in Karnataka"
                                  :key="index+item.groupwise"

                                ><td></td><td></td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                    class="font-weight-black allindiagroup"
                                  >{{item.groupwise}}</td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                    class="text-xs-right"
                                  >{{numberformat(item.mtdoptrev)}}</td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                      class="text-xs-right"
                                  >{{numberformat(item.lstoptrev)}}</td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                      class="text-xs-right"
                                  >{{item.mtdoptperc}}%</td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                      class="text-xs-right targetcolor"
                                  >{{numberformat(item.targetmtdrev)}}</td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                      class="text-xs-right targetachicolor"
                                  >{{item.mtdoptpercachieved}}%</td>
                                </tr>

                                <tr
                                          scope="row"
                                          v-for="(item,index) in Hyderabad"
                                          :key="index+item.groupwise"

                                        ><td></td><td></td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                            class="font-weight-black allindiagroup"
                                          >{{item.groupwise}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                            class="text-xs-right"
                                          >{{numberformat(item.mtdoptrev)}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="text-xs-right"
                                          >{{numberformat(item.lstoptrev)}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="text-xs-right"
                                          >{{item.mtdoptperc}}%</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="text-xs-right targetcolor"
                                          >{{numberformat(item.targetmtdrev)}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="text-xs-right targetachicolor"
                                          >{{item.mtdoptpercachieved}}%</td>
                                        </tr>
                <tr
                          scope="row"
                          v-for="(item,index) in AP"
                          :key="index+item.groupwise"

                        ><td></td><td></td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="font-weight-black allindiagroup"
                          >{{item.groupwise}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                            class="text-xs-right"
                          >{{numberformat(item.mtdoptrev)}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                              class="text-xs-right"
                          >{{numberformat(item.lstoptrev)}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                              class="text-xs-right"
                          >{{item.mtdoptperc}}%</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                              class="text-xs-right targetcolor"
                          >{{numberformat(item.targetmtdrev)}}</td>
                          <td
                            scope="row"
                            style="cursor:pointer"
                              class="text-xs-right targetachicolor"
                          >{{item.mtdoptpercachieved}}%</td>
                        </tr>
                        <tr
                                  scope="row"
                                  v-for="(item,index) in Kolkata"
                                  :key="index+item.groupwise"

                                ><td></td><td></td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                    class="font-weight-black allindiagroup"
                                  >{{item.groupwise}}</td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                    class="text-xs-right"
                                  >{{numberformat(item.mtdoptrev)}}</td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                      class="text-xs-right"
                                  >{{numberformat(item.lstoptrev)}}</td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                      class="text-xs-right"
                                  >{{item.mtdoptperc}}%</td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                      class="text-xs-right targetcolor"
                                  >{{numberformat(item.targetmtdrev)}}</td>
                                  <td
                                    scope="row"
                                    style="cursor:pointer"
                                      class="text-xs-right targetachicolor"
                                  >{{item.mtdoptpercachieved}}%</td>
                                </tr>
                                        <tr
                                          scope="row"
                                          v-for="(item,index) in Odisha"
                                          :key="index+item.groupwise"
                                          ><td></td><td></td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                            class="font-weight-black allindiagroup"
                                          >{{item.groupwise}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                            class="text-xs-right"
                                          >{{numberformat(item.mtdoptrev)}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="text-xs-right"
                                          >{{numberformat(item.lstoptrev)}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="text-xs-right"
                                          >{{item.mtdoptperc}}%</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="text-xs-right targetcolor"
                                          >{{numberformat(item.targetmtdrev)}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="text-xs-right targetachicolor"
                                          >{{item.mtdoptpercachieved}}%</td>
                                        </tr>

                                        <tr
                                          scope="row"
                                          v-for="(item,index) in ROI"
                                          :key="index+item.groupwise"
                                          ><td></td><td></td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                            class="font-weight-black allindiagroup"
                                          >{{item.groupwise}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                            class="text-xs-right font-weight-black "
                                          >{{numberformat(item.mtdoptrev)}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="text-xs-right font-weight-black "
                                          >{{numberformat(item.lstoptrev)}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="font-weight-black  text-xs-right"
                                          >{{item.mtdoptperc}}%</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="font-weight-black  text-xs-right targetcolor"
                                          >{{numberformat(item.targetmtdrev)}}</td>
                                          <td
                                            scope="row"
                                            style="cursor:pointer"
                                              class="font-weight-black  text-xs-right targetachicolor"
                                          >{{item.mtdoptpercachieved}}%</td>
                                    </tr> -->
<!-- <tr
    scope="row"
      v-for="(item,index) in Chennaibranches"
      :key="index+item.branch">
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black  "
      >Chennai</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branchcode}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branch}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.mtdoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.lstoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{item.mtdoptpercentage}}%</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetcolor"
      >{{numberformat(item.target)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetachicolor"
      >{{item.mtdtargetachieved}}%</td>
</tr> -->
<!--
<tr
    scope="row"
      v-for="(item,index) in ROTNbranches"
      :key="index+item.branch">
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black  "
      >ROTN</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branchcode}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branch}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.mtdoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.lstoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{item.mtdoptpercentage}}%</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetcolor"
      >{{numberformat(item.target)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetachicolor"
      >{{item.mtdtargetachieved}}%</td>
</tr> -->

<!--
<tr
    scope="row"
      v-for="(item,index) in Karnatakabranches"
      :key="index+item.branch">
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black  "
      >Karnataka</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branchcode}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branch}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.mtdoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.lstoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{item.mtdoptpercentage}}%</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetcolor"
      >{{numberformat(item.target)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetachicolor"
      >{{item.mtdtargetachieved}}%</td>
</tr> -->
<!--
<tr
    scope="row"
      v-for="(item,index) in Hyderabadbranches"
      :key="index+item.branch">
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black  "
      >Hyderabad</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branchcode}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branch}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.mtdoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.lstoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{item.mtdoptpercentage}}%</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetcolor"
      >{{numberformat(item.target)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetachicolor"
      >{{item.mtdtargetachieved}}%</td>
</tr> -->

<!--
<tr
    scope="row"
      v-for="(item,index) in APbranches"
      :key="index+item.branch">
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black  "
      >AP</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branchcode}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branch}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.mtdoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.lstoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{item.mtdoptpercentage}}%</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetcolor"
      >{{numberformat(item.target)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetachicolor"
      >{{item.mtdtargetachieved}}%</td>
</tr> -->
<!--
<tr
    scope="row"
      v-for="(item,index) in Kolkatabranches"
      :key="index+item.branch">
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black  "
      >Kolkata</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branchcode}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branch}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.mtdoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.lstoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{item.mtdoptpercentage}}%</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetcolor"
      >{{numberformat(item.target)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetachicolor"
      >{{item.mtdtargetachieved}}%</td>
</tr> -->

<!-- <tr
    scope="row"
      v-for="(item,index) in Odishabranches"
      :key="index+item.branch">
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black  "
      >Odisha</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branchcode}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branch}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.mtdoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.lstoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{item.mtdoptpercentage}}%</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetcolor"
      >{{numberformat(item.target)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetachicolor"
      >{{item.mtdtargetachieved}}%</td>
</tr> -->


<!-- <tr
    scope="row"
      v-for="(item,index) in ROIbranches"
      :key="index+item.branch">
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black  "
      >ROI</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branchcode}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black "
      >{{item.branch}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.mtdoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{numberformat(item.lstoptrev)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right"
      >{{item.mtdoptpercentage}}%</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetcolor"
      >{{numberformat(item.target)}}</td>
      <td
        scope="row"
        style="cursor:pointer"
        class="font-weight-black text-xs-right targetachicolor"
      >{{item.mtdtargetachieved}}%</td>
</tr> -->

                  <!-- <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>

                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td> -->



                <!-- <tr
                  scope="row"
                  v-for="(item,index) in alin"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>

                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
                <!-- <tr
                  scope="row"
                  v-for="(item,index) in aeh"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
				<!-- <tr
                  scope="row"
                  v-for="(item,index) in ahc"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->


				<!-- <tr
                  scope="row"
                  v-for="(item,index) in ohc"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="text-xs-left"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>

				<tr
                  scope="row"
                 class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="text-xs-left"

                  >AEH:</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in cmh"
                  :key="index+item.branch"
                  class="font-weight-black"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh_chennai"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
                <!-- <tr
                  scope="row"
                  v-for="(item,index) in kanchi_vel"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kanchi_vel_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kum_ney_vil"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kum_ney_vil_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in dha_salem_krish"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in dha_salem_krish_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in erod_hosure"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in erod_hosure_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in jaipur"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="text-xs-left"
                    style="cursor:pointer"
                  >AHC:</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in ahc_chennai"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in ahc_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
                  <!-- <tr
                  scope="row"
                  v-for="(item,index) in amb"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
                <!-- <tr
                  scope="row"
                  v-for="(item,index) in tirunelveli"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>

				<tr
                  scope="row"
                  v-for="(item,index) in coimbatore"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>




                <tr
                  scope="row"
                  v-for="(item,index) in tuti_madurai"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in tuti_madurai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in trichy"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in thanjavur"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>

                <tr
                  scope="row"
                  v-for="(item,index) in karnataka"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in banglore"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in banglore_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hub_mys"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hub_mys_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in telangana"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hyderabad"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hyderabad_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in andhra"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in andhra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
                <!-- <tr
                  scope="row"
                  v-for="(item,index) in roi"
                  :key="index+item.branch"
                  class="rotgrp"
				  style="font-weight: 900!important;"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer;color : #ffffff!important;font-weight: 900!important;"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in triv"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kolk"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kolk_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>

                <tr
                  scope="row"
                  v-for="(item,index) in pune"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in ahmedabad"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in indore"
                  :key="index+item.branch"
                  class="font-weight-black"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in odisha"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in odisha_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
                <!-- <tr
                  scope="row"
                  v-for="(item,index) in amb"
                  :key="index+item.branch"
                  class="font-weight-black indigo lighten-2"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->



				<!-- <tr
                  scope="row"
                  class="font-weight-black ochfont"

                >
                  <td
                    scope="row"
                    :class="text-xs-left"
                    style="cursor:pointer"
                  >OHC:</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>

                </tr>


				<tr
                  scope="row"
                  v-for="(item,index) in madagascar"
                  :key="index+item.branch"
                  class="ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>

				<tr
                  scope="row"
                  v-for="(item,index) in mozambique"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in mozambique_branches"
                  :key="index+item.branch"
                  class="grey lighten-4 "
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>
				</tr> -->
				<!--<tr
                  scope="row"
                  v-for="(item,index) in nigeria"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>-->

				<!-- <tr
                  scope="row"
                  v-for="(item,index) in rwanda"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
				 <tr
                  scope="row"
                  v-for="(item,index) in mauritius"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in mauritius_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>
				</tr> -->
				<!-- <tr
                  scope="row"
                  v-for="(item,index) in zambia"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->

				<!-- <tr
                  scope="row"
                  v-for="(item,index) in ghana"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->

				<!-- <tr
                  scope="row"
                  v-for="(item,index) in nairobi"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->

				<!-- <tr
                  scope="row"
                  v-for="(item,index) in uganda"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>

				<tr
                  scope="row"
                  v-for="(item,index) in tanzania"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->


              </tbody>

			   <!-- <tbody v-if="user_role=='indian_user'"> -->
<!--

                <tr
                  scope="row"
                  v-for="(item,index) in alin"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>

                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
				<!-- <tr
                  scope="row"
                  v-for="(item,index) in ahc"
                  :key="index+item.branch"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->

				<!-- <tr
                  scope="row"
                 class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="text-xs-left"

                  >AEH:</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in cmh"
                  :key="index+item.branch"
                  class="font-weight-black"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh_chennai"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in aeh_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kanchi_vel"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kanchi_vel_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kum_ney_vil"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kum_ney_vil_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in dha_salem_krish"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in dha_salem_krish_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in erod_hosure"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in erod_hosure_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in jaipur"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  class="font-weight-black allindiagroup"
                >
                  <td
                    scope="row"
                    :class="text-xs-left"
                    style="cursor:pointer"
                  >AHC:</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  ></td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  ></td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in ahc_chennai"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in ahc_chennai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
                  <!-- <tr
                  scope="row"
                  v-for="(item,index) in amb"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
                <!-- <tr
                  scope="row"
                  v-for="(item,index) in tirunelveli"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
				<tr
                  scope="row"
                  v-for="(item,index) in coimbatore"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="'text-xs-left'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in tuti_madurai"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in tuti_madurai_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in trichy"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in thanjavur"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>

                <tr
                  scope="row"
                  v-for="(item,index) in karnataka"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in banglore"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in banglore_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hub_mys"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hub_mys_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in telangana"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hyderabad"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in hyderabad_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in andhra"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in andhra_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in roi"
                  :key="index+item.branch"
                  class="rotgrp"
				  style="font-weight: 900!important;"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer;color : #ffffff!important;font-weight: 900!important;"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in triv"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kolk"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in kolk_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>

                <tr
                  scope="row"
                  v-for="(item,index) in pune"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in ahmedabad"
                  :key="index+item.branch"
                  class="font-weight-black branchesgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in indore"
                  :key="index+item.branch"
                  class="font-weight-black"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in odisha"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
                <!-- <tr
                  scope="row"
                  v-for="(item,index) in odisha_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->
              <!-- </tbody> -->


			   <!-- <tbody v-if="user_role=='overseas_user'"> -->
<!--

				<tr
                  scope="row"
                  v-for="(item,index) in ohc"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="text-xs-left"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
				<tr
                  scope="row"
                  v-for="(item,index) in madagascar"
                  :key="index+item.branch"
                  class="ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>

				<tr
                  scope="row"
                  v-for="(item,index) in mozambique"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in mozambique_branches"
                  :key="index+item.branch"
                  class="grey lighten-4 "
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>
				</tr>
			<tr
                  scope="row"
                  v-for="(item,index) in nigeria"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>-->

				<!-- <tr
                  scope="row"
                  v-for="(item,index) in rwanda"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
				 <tr
                  scope="row"
                  v-for="(item,index) in mauritius"
                  :key="index+item.branch"
                  class="font-weight-black rotgrp"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>
                <tr
                  scope="row"
                  v-for="(item,index) in mauritius_branches"
                  :key="index+item.branch"
                  class="grey lighten-4"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"

                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>
				</tr> -->
				<!-- <tr
                  scope="row"
                  v-for="(item,index) in zambia"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->

				<!-- <tr
                  scope="row"
                  v-for="(item,index) in ghana"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->

				<!-- <tr
                  scope="row"
                  v-for="(item,index) in nairobi"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr> -->

				<!-- <tr
                  scope="row"
                  v-for="(item,index) in uganda"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>

				<tr
                  scope="row"
                  v-for="(item,index) in tanzania"
                  :key="index+item.branch"
                  class="font-weight-black ochfont"
                >
                  <td
                    scope="row"
                    :class="changeColorOPDSuper(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    style="cursor:pointer"

                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopdrev}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrev}}</td>
				   <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdrevlastyear}}</td>
				  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopdpercentage}}</td>

                </tr>


          </tbody>
-->

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
    groupBranch:null,
    branchindivi:null,
	 Ap: null,
   Chennai:null,
   ROTN:null,
   Karnataka:null,
   Hyderabad:null,
   Kolkata:null,
   Odisha:null,
   ROI:null,
Chennaibranches:null,
ROTNbranches:null,
Karnatakabranches:null,
Hyderabadbranches:null,
APbranches:null,
Kolkatabranches:null,
Odishabranches:null,
ROIbranches:null,

    json_data: null,
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
    json_fields: {
      "Branch code": "branchcode",
      "Branch":"branch",
      "FTD": "ftdoptrev",
      "MTD": "mtdoptrev",
	  "LMTD": "lstoptrev",
	  "MTD%": "mtdoptperc",
"Target Month":"targetmtdrev",
"Target Achieved":"mtdoptpercachieved"
    },
    fileName: null
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

    numberformat(number){
      return number.toLocaleString('en');
    },

    apiRequestOPDSuper (date) {
      // let superUserName = sessionStorage.getItem("super_user");
      let normalusername = JSON.parse(sessionStorage.getItem("optical_user"));

      if (date !== null) {
        this.fileDate = date;
        this.fileName = `NewOPD_Report_${this.fileDate}.csv`;
        this.loading = true;
        this.isLoading = true;

        this.$http
        //  .get(`https://scm.dragarwal.com/api-opticals-super/${date}`)
          .get(`http://localhost:7777/api-opticals-normal/${date}/${normalusername.name}`)
                    .then(response => {
            this.processDataOPDSuper(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processDataOPDSuper (data) {
	  if (sessionStorage.getItem('super_user')){
	     this.user_role = 'super_user';
	  }else if(sessionStorage.getItem('overseas_user')){
	    this.user_role = 'overseas_user';
	  }else if(sessionStorage.getItem('indian_user')){
		this.user_role = 'indian_user';
	  }
    else if(sessionStorage.getItem('optical_user')){
		this.user_role = 'optical_user';
	  }
    this.groupBranch=data.groupBranch['groupBranch'];
    this.branchindivi=data.branchindivi['branchindivi'];


//
// this.Chennai = [data.group['Chennai']];
// 	  this.AP = [data.group['AP']];
// this.ROTN=[data.group['ROTN']];
// this.Karnataka=[data.group['Karnataka']];
// this.Hyderabad=[data.group['Hyderabad']];
// this.Kolkata=[data.group['Kolkata']];
// this.Odisha=[data.group['Odisha']];
// this.ROI=[data.group['ROI']];
//    this.alin = [data.alin];
//    this.Chennaibranches=data.branch['Chennai'];
//    this.ROTNbranches=data.branch['ROTN'];
//    this.Karnatakabranches=data.branch['Karnataka'];
//    this.Hyderabadbranches=data.branch['Hyderabad'];
//    this.APbranches=data.branch['AP'];
//    this.Kolkatabranches=data.branch['Kolkata'];
//    this.Odishabranches=data.branch['Odisha'];
//    this.ROIbranches=data.branch['ROI'];
    //   this.aeh = [data.aeh];
    //   this.ahc = [data.ahc];
	  // this.ohc = [data.ohc];
    //   // this.cmh = [data.aehgroup["Chennai Main Hospital"]];
    //   this.cmh = data.branchwise["Chennai Main Hospital"];
    //   this.aeh_chennai = [data.aehgroup["Chennai Branches"]];
    //   this.aeh_chennai_branches = data.branchwise["Chennai Branches"];
    //   this.kanchi_vel = [data.aehgroup["Kanchi + Vellore"]];
    //   this.kanchi_vel_branches = data.branchwise["Kanchi + Vellore"];
    //   this.kum_ney_vil = [data.aehgroup["Kum + Ney + Vil"]];
    //   this.kum_ney_vil_branches = data.branchwise["Kum + Ney + Vil"];
    //   this.dha_salem_krish = [data.aehgroup["Dha + Salem + Krish"]];
    //   this.dha_salem_krish_branches = data.branchwise["Dha + Salem + Krish"];
    //   this.erod_hosure = [data.aehgroup["Erode + Hosur"]];
    //   this.erod_hosure_branches = data.branchwise["Erode + Hosur"];
    //   // this.jaipur = [data.aehgroup["Jaipur"]];
    //   this.jaipur = data.branchwise["Jaipur"];
    //   this.madurai = [data.aehgroup["Madurai KK Nagar"]];
    //   this.ahc_chennai = [data.ahcgroup["Chennai branches"]];
    //   this.ahc_chennai_branches = data.branchwise["Chennai branches"];
    //   // this.tirunelveli = [data.ahcgroup["Tirunelveli"]];
    //   this.tirunelveli = data.branchwise["Tirunelveli"];
	  // this.coimbatore = data.branchwise["Coimbatore"];
    //
    //   this.tuti_madurai = [data.ahcgroup["Tuticorin + Madurai"]];
    //   this.tuti_madurai_branches = data.branchwise[
    //     "Tuticorin + Madurai"
    //   ].concat(data.branchwise["Madurai KK Nagar"]);
    //   // this.trichy = [data.ahcgroup["Trichy"]];
    //   this.trichy = data.branchwise["Trichy"];
    //   // this.thanjavur = [data.ahcgroup["Thanjavur"]];
    //   this.thanjavur = data.branchwise["Thanjavur"];
    //   this.andaman = [data.ahcgroup["Andaman"]];
    //   this.karnataka = [data.ahcgroup["Karnataka"]];
    //   this.banglore = [data.ahcgroup["Banglore"]];
    //   this.banglore_branches = data.branchwise["Banglore"];
    //   this.hub_mys = [data.ahcgroup["Hubli + Mysore"]];
    //   this.hub_mys_branches = data.branchwise["Hubli + Mysore"];
    //   this.telangana = [data.ahcgroup["Telangana"]];
    //   this.hyderabad = [data.ahcgroup["Hyderabad"]];
    //   this.hyderabad_branches = data.branchwise["Hyderabad"];
    //   this.andhra = [data.ahcgroup["Andhra Pradesh"]];
    //   this.andhra_branches = data.branchwise["Andhra Pradesh"];
    //   this.roi = [data.ahcgroup["Rest of India(incl. Jaipur)"]];
    //   // this.triv = [data.ahcgroup["Trivandrum"]];
    //   this.triv = data.branchwise["Trivandrum"];
    //   this.kolk = [data.ahcgroup["Kolkata"]];
    //   this.kolk_branches = data.branchwise["Kolkata"];
    //   // this.pune = [data.ahcgroup["Pune"]];
    //   this.pune = data.branchwise["Pune"];
    //   this.ahmedabad = data.branchwise["Ahmedabad"];
    //   this.indore = data.branchwise["Indore"];
    //   this.odisha = [data.ahcgroup["Odisha"]];
    //   this.odisha_branches = data.branchwise["Odisha"];
    //
    //
	  // this.madagascar = data.branchwise["Madagascar"];
	  // this.mozambique = [data.ohcgroup["Mozambique"]];
    //   this.mozambique_branches = data.branchwise["Mozambique"];
	  // this.nigeria = data.branchwise["Nigeria"];
	  // this.rwanda = data.branchwise["Rwanda"];
	  // this.mauritius = [data.ohcgroup["Mauritius"]];
    //   this.mauritius_branches = data.branchwise["Mauritius"];
	  // this.zambia = data.branchwise["Zambia"];
	  // this.ghana = data.branchwise["Ghana"];
	  // this.nairobi = data.branchwise["Nairobi"];
	  // this.uganda = data.branchwise["Uganda"];
	  // this.tanzania = data.branchwise["Tanzania"];





      // this.amb = [data.ahcgroup["Ambattur"]];
      this.show = true;
    },
    downloadExcelRevenueSuper () {

		if(this.user_role=='super_user'){
		  let tempDataArr = [];
		  if (this.fileDate !== null) {
			tempDataArr = this.alin.concat(
        this.Chennai ,
        	  this.AP ,
        this.ROTN,
        this.Karnataka,
        this.Hyderabad,
        this.Kolkata,
        this.Odisha,
        this.ROI,
          // this.alin ,
           this.Chennaibranches,
           this.ROTNbranches,
           this.Karnatakabranches,
           this.Hyderabadbranches,
           this.APbranches,
           this.Kolkatabranches,
           this.Odishabranches,
           this.ROIbranches
			);
			return tempDataArr;
		  } else {
			return null;
		  }
		}
    else if(this.user_role=='overseas_user'){

			let tempDataArr = [];
		  if (this.fileDate !== null) {
			// tempDataArr = this.ohc.concat(
			//   this.madagascar,
			//   this.mozambique,
			//   this.mozambique_branches,
			//   this.rwanda,
			//   this.mauritius,
			//   this.mauritius_branches,
			//   this.zambia,
			//   this.ghana,
			//   this.nairobi,
			//   this.uganda,
			//   this.tanzania
			//   // this.amb
			// );
			return tempDataArr;
		  } else {
			return null;
		  }
		}else{

			let tempDataArr = [];
		  if (this.fileDate !== null) {
			// tempDataArr = this.alin.concat(
			//   this.aeh,
			//   this.ahc,
			//   this.cmh,
			//   this.aeh_chennai,
			//   this.aeh_chennai_branches,
			//   this.kanchi_vel,
			//   this.kanchi_vel_branches,
			//   this.kum_ney_vil,
			//   this.kum_ney_vil_branches,
			//   this.dha_salem_krish,
			//   this.dha_salem_krish_branches,
			//   this.erod_hosure,
			//   this.erod_hosure_branches,
			//   this.jaipur,
			//   this.ahc_chennai,
			//   this.ahc_chennai_branches,
			//   this.tirunelveli,
			//   this.coimbatore,
			//   this.tuti_madurai,
			//   this.tuti_madurai_branches,
			//   this.trichy,
			//   this.thanjavur,
			//   this.karnataka,
			//   this.banglore,
			//   this.banglore_branches,
			//   this.hub_mys,
			//   this.hub_mys_branches,
			//   this.telangana,
			//   this.hyderabad,
			//   this.hyderabad_branches,
			//   this.andhra,
			//   this.andhra_branches,
			//   this.roi,
			//   this.triv,
			//   this.kolk,
			//   this.kolk_branches,
			//   this.pune,
			//   this.ahmedabad,
			//   this.indore,
			//   this.odisha,
			//   this.odisha_branches
			//   // this.amb
			// );
			return tempDataArr;
		  }

      else {
			return null;
		  }
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
.table-striped > tbody > tr:nth-child(2n + 2) > td,
.table-striped > tbody > tr:nth-child(2n + 2) > th {
  background-color: #e5e5f2;
  touch-action: none;
}
.allindiagroup {
background-color : #f0ae19!important
}
.targetcolor {
  background-color : #FCD12A!important
}
.targetachicolor {
  background-color : #87CEFA!important
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
