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
            <v-toolbar-title>Cogs Vs Revn (without Referral)</v-toolbar-title>
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
                background-color="grey"
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
                  @click="$refs.menu.save(date);apiRequest(date)"
                  style="outline:none"
                >Generate</v-btn>
              </v-date-picker>
            </v-menu>
            <download-excel
              :data="json_data"
              :fields="json_fields"
              type="csv"
              :name="fileName"
              :fetch="downloadExcel"
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
              <thead>
                <tr class="grey lighten-2">
                  <th
                    class="text-xs-left"
                    width="15%"
                    scope="col"
                    rowspan="2"
                  >Branch</th>
                  <th
                    class="text-xs-center"
                    scope="col"
                    colspan="7"
                  >FTD (₹ lacs)</th>
                  <th
                    class="text-xs-center"
                    scope="col"
                    colspan="7"
                  >MTD (₹ lacs)</th>
                </tr>
                <tr class="grey lighten-2">
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Pha</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Opt</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Ot</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Lab</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Total</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Revenue</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Cogs%</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Pha</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Opt</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Ot</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Lab</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Total</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Revenue</th>
                  <th
                    scope="col"
                    class="text-xs-center"
                  >Cogs%</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  scope="row"
                  v-for="(item,index) in tabledata"
                  :key="index+item.branch"
                  :class="changeColor(item) ? 'font-weight-black indigo lighten-2':'grey lighten-4'"
                >
                  <td
                    scope="row"
                    :class="changeColor(item)?'text-xs-left':'text-xs-left indigo--text font-weight-medium'"
                    @click="processDialog(item)"
                    style="cursor:pointer"
                  >{{item.branch}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdpha| lakhFormat}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdopt| lakhFormat}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdot| lakhFormat}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdlab| lakhFormat}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftd| lakhFormat}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.ftdrev| lakhFormat}}</td>
                  <td
                    scope="row"
                    :class="changeColor(item)?'text-xs-center':'text-xs-center grey lighten-1'"
                  >{{item.ftd_cogs_percent.toFixed(2)}} %</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdpha| lakhFormat}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdopt| lakhFormat}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdot| lakhFormat}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdlab| lakhFormat}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtd| lakhFormat}}</td>
                  <td
                    scope="row"
                    class="text-xs-center"
                  >{{item.mtdrev| lakhFormat}}</td>
                  <td
                    scope="row"
                    :class="changeColor(item)?'text-xs-center':'text-xs-center grey lighten-1'"
                  >{{item.mtd_cogs_percent.toFixed(2)}} %</td>
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
        <v-dialog
          v-model="dialog"
          width="850"
          height="850"
        >
          <!-- style="overflow:auto;-webkit-overflow-scrolling:touch" -->
          <v-card class="grey lighten-2">
            <v-flex
              xs12
              class="text-xs-center subheading font-weight-black"
            >{{title}} - {{formatteddate}}</v-flex>
            <v-tabs
              show-arrows
              dark
              centered
              color="indigo darken-4"
            >
              <v-tabs-slider color="white"></v-tabs-slider>
              <v-card-title class="title indigo darken-4 white--text primary-title">
                <v-tab
                  v-for="item in items"
                  :key="item"
                >
                  {{item}}
                </v-tab>
              </v-card-title>
              <v-tabs-items>
                <v-tab-item
                  v-for="item in items"
                  :key="item"
                >
                  <div
                    class="table-responsive"
                    v-if="item === 'General'"
                  >
                    <table
                      class="table table-hover table-bordered table-condensed"
                      v-if="show"
                    >
                      <thead>
                        <tr class>
                          <th
                            width="15%"
                            scope="col"
                            rowspan="2"
                          ></th>
                          <th
                            class="text-xs-center"
                            scope="col"
                            colspan="8"
                          >FTD (₹ lacs)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Total</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Surgery</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Opticals</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Pharmacy</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Lab</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Consultation</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Others</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in dialogdata"
                          :key="index+item.branch+'qweqwelkaska'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left font-weight-black"
                          >Cogs</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftd | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >
                            {{item.ftdot | lakhFormat}}
                            <!-- <span class="font-weight-black">({{cogsftdotcount}})</span> -->
                          </td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdopt | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdpha | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdlab | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                        </tr>
                        <tr
                          scope="row"
                          v-for="(item,index) in dialogdata"
                          :key="index+item.branch+'qweqwe'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left font-weight-black"
                          >Revenue</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdrev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdotrev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdoptrev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdpharev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdlabrev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdconsultrev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdotherrev | lakhFormat}}</td>
                        </tr>
                        <!-- <tr
                    scope="row"
                    v-for="(item,index) in dialogdata"
                    :key="index+item.branch+'lkjlj'"
                    class="grey lighten-3"
                  >
                    <td scope="row" class="text-xs-left font-weight-black">Cogs/Revenue</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.ftd,item.ftdrev)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.ftdot,item.ftdotrev)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.ftdopt,item.ftdoptrev)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.ftdpha,item.ftdpharev)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.ftdlab,item.ftdlabrev)}}</td>
                    <td scope="row" class="text-xs-center">{{0.00}}</td>
                    <td scope="row" class="text-xs-center">{{0.00}}</td>
                  </tr>-->
                        <tr
                          scope="row"
                          v-for="(item,index) in dialogdata"
                          :key="index+item.branch+'mcmvblds'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left font-weight-black"
                          >Cogs/Revenue(%)</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.ftd,item.ftdrev)}}</td>
                          <td
                            scope="row"
                            :class="threshold(item.ftdot,item.ftdotrev,'surgery')? 'text-xs-center font-weight-black body-2 red--text':'text-xs-center'"
                          >{{cogsPercent(item.ftdot,item.ftdotrev)}}</td>
                          <td
                            scope="row"
                            :class="threshold(item.ftdopt,item.ftdoptrev,'opticals')? 'text-xs-center font-weight-black body-2 red--text':'text-xs-center'"
                          >{{cogsPercent(item.ftdopt,item.ftdoptrev)}}</td>
                          <td
                            scope="row"
                            :class="threshold(item.ftdpha,item.ftdpharev,'pharmacy')? 'text-xs-center font-weight-black body-2 red--text':'text-xs-center'"
                          >{{cogsPercent(item.ftdpha,item.ftdpharev)}}</td>
                          <td
                            scope="row"
                            :class="threshold(item.ftdlab,item.ftdlabrev,'laboratory')? 'text-xs-center font-weight-black body-2 red--text':'text-xs-center'"
                          >{{cogsPercent(item.ftdlab,item.ftdlabrev)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                        </tr>
                        <tr
                          scope="row"
                          v-for="(item,index) in dialogdata"
                          :key="index+item.branch+'asdasd'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left font-weight-black"
                          >VOB</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdvob | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdvobot | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdvobopt | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdvobpha | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdvoblab | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdvobcons | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.ftdvobothers | lakhFormat}}</td>
                        </tr>

                        <!-- <tr
                    scope="row"
                    v-for="(item,index) in dialogdata"
                    :key="index+item.branch+'oeakjjadk'"
                    class="grey lighten-3"
                  >
                    <td
                      scope="row"
                      class="text-xs-left font-weight-black"
                    >Cogs/Value of Orders Booked</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.ftd,item.ftdvob)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.ftdot,item.ftdvobot)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.ftdopt,item.ftdvobopt)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.ftdpha,item.ftdvobpha)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.ftdlab,item.ftdvoblab)}}</td>
                    <td scope="row" class="text-xs-center">{{0.00}}</td>
                    <td scope="row" class="text-xs-center">{{0.00}}</td>
                  </tr>-->
                        <tr
                          scope="row"
                          v-for="(item,index) in dialogdata"
                          :key="index+item.branch+'oewoeir9n'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left font-weight-black"
                          >Cogs/VOB(%)</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.ftd,item.ftdvob)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.ftdot,item.ftdvobot)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.ftdopt,item.ftdvobopt)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.ftdpha,item.ftdvobpha)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.ftdlab,item.ftdvoblab)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="table-responsive"
                    v-if="item === 'General'"
                  >
                    <table
                      class="table table-hover table-bordered table-condensed"
                      v-if="show"
                    >
                      <thead>
                        <tr class>
                          <th
                            class="text-xs-left"
                            width="15%"
                            scope="col"
                            rowspan="2"
                          ></th>
                          <th
                            class="text-xs-center"
                            scope="col"
                            colspan="8"
                          >MTD (₹ lacs)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Total</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Surgery</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Opticals</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Pharmacy</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Lab</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Consultation</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                          >Others</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in dialogdata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left font-weight-black"
                          >Cogs</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtd | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >
                            {{item.mtdot | lakhFormat}}
                            <!-- <span class="font-weight-black">({{cogsmtdotcount}})</span> -->
                          </td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdopt | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdpha | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdlab | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                        </tr>
                        <tr
                          scope="row"
                          v-for="(item,index) in dialogdata"
                          :key="index+item.branch+'qweqwe'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left font-weight-black"
                          >Revenue</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdrev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdotrev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdoptrev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdpharev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdlabrev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdconsultrev | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdothersrev | lakhFormat}}</td>
                        </tr>
                        <!-- <tr
                    scope="row"
                    v-for="(item,index) in dialogdata"
                    :key="index+item.branch+'lkjlj'"
                    class="grey lighten-3"
                  >
                    <td scope="row" class="text-xs-left font-weight-black">Cogs/Revenue</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.mtd,item.mtdrev)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.mtdot,item.mtdotrev)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.mtdopt,item.mtdoptrev)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.mtdpha,item.mtdpharev)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.mtdlab,item.mtdlabrev)}}</td>
                    <td scope="row" class="text-xs-center">{{0.00}}</td>
                    <td scope="row" class="text-xs-center">{{0.00}}</td>
                  </tr>-->
                        <tr
                          scope="row"
                          v-for="(item,index) in dialogdata"
                          :key="index+item.branch+'mcmvblds'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left font-weight-black"
                          >Cogs/Revenue(%)</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.mtd,item.mtdrev)}}</td>
                          <td
                            scope="row"
                            :class="threshold(item.mtdot,item.mtdotrev,'surgery')? 'text-xs-center font-weight-black body-2 red--text':'text-xs-center'"
                          >{{cogsPercent(item.mtdot,item.mtdotrev)}}</td>
                          <td
                            scope="row"
                            :class="threshold(item.mtdopt,item.mtdoptrev,'opticals')? 'text-xs-center font-weight-black body-2 red--text':'text-xs-center'"
                          >{{cogsPercent(item.mtdopt,item.mtdoptrev)}}</td>
                          <td
                            scope="row"
                            :class="threshold(item.mtdpha,item.mtdpharev,'pharmacy')? 'text-xs-center font-weight-black body-2 red--text':'text-xs-center'"
                          >{{cogsPercent(item.mtdpha,item.mtdpharev)}}</td>
                          <td
                            scope="row"
                            :class="threshold(item.mtdlab,item.mtdlabrev,'laboratory')? 'text-xs-center font-weight-black body-2 red--text':'text-xs-center'"
                          >{{cogsPercent(item.mtdlab,item.mtdlabrev)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                        </tr>
                        <tr
                          scope="row"
                          v-for="(item,index) in dialogdata"
                          :key="index+item.branch+'asdasd'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left font-weight-black"
                          >VOB</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdvob | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdvobot | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdvobopt | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdvobpha | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdvoblab | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdvobcons | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{item.mtdvobothers | lakhFormat}}</td>
                        </tr>
                        <!-- <tr
                    scope="row"
                    v-for="(item,index) in dialogdata"
                    :key="index+item.branch+'oeakjjadk'"
                    class="grey lighten-3"
                  >
                    <td
                      scope="row"
                      class="text-xs-left font-weight-black"
                    >Cogs/Value of Orders Booked</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.mtd,item.mtdvob)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.mtdot,item.mtdvobot)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.mtdopt,item.mtdvobopt)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.mtdpha,item.mtdvobpha)}}</td>
                    <td scope="row" class="text-xs-center">{{cogsbyrev(item.mtdlab,item.mtdvoblab)}}</td>
                    <td scope="row" class="text-xs-center">{{0.00}}</td>
                    <td scope="row" class="text-xs-center">{{0.00}}</td>
                  </tr>-->
                        <tr
                          scope="row"
                          v-for="(item,index) in dialogdata"
                          :key="index+item.branch+'oewoeir9n'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left font-weight-black"
                          >Cogs/VOB(%)</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.mtd,item.mtdvob)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.mtdot,item.mtdvobot)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.mtdopt,item.mtdvobopt)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.mtdpha,item.mtdvobpha)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{cogsPercent(item.mtdlab,item.mtdvoblab)}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >{{0.00 | lakhFormat}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                          >
                            <!-- <span
                        style="width:100%;height:100%;border:1px solid #780a0a; border-radius:15px ;padding:4px;"
                        v-if="chip1"
                      >-->
                            {{0.00 | lakhFormat}}
                            <!-- </span> -->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="table-responsive"
                    v-if="item === 'Surgery'"
                  >
                    <table class="table table-striped table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >FTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in surgerydata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            width="33.33%"
                            class="text-xs-left"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.ftd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-striped table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >MTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in mtdsurgerydata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            width="33.33%"
                            class="text-xs-left"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.mtd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="table-responsive"
                    v-if="item === 'Opticals'"
                  >
                    <table class="table table-striped table-hover table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >FTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in opticalsdata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="33.33%"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.ftd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-striped table-hover table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >MTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in mtdopticalsdata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="33.33%"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.mtd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="table-responsive"
                    v-if="item === 'Pharmacy'"
                  >
                    <table class="table table-striped table-hover table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >FTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in pharmacydata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="33.33%"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.ftd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-striped table-hover table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >MTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in mtdpharmacydata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="33.33%"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.mtd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="table-responsive"
                    v-if="item === 'Laboratory'"
                  >
                    <table class="table table-striped table-hover table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >FTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in laboratorydata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="33.33%"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.ftd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-striped table-hover table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >MTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in mtdlaboratorydata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="33.33%"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.mtd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="table-responsive"
                    v-if="item === 'Consultation'"
                  >
                    <table class="table table-striped table-hover table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >FTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in consultdata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="33.33%"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.ftd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-striped table-hover table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >MTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in mtdconsultdata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="33.33%"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.mtd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="table-responsive"
                    v-if="item === 'Others'"
                  >
                    <table class="table table-striped table-hover table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >FTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in otherdata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="33.33%"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.ftd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table table-striped table-hover table-bordered table-condensed">
                      <thead>
                        <tr>
                          <th
                            colspan="3"
                            scope="col"
                            class="text-xs-center"
                          >MTD (₹)</th>
                        </tr>
                        <tr class>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="33.33%"
                          >Group</th>
                          <th
                            scope="col"
                            class="text-xs-left"
                            width="40%"
                          >Sub Group</th>
                          <th
                            scope="col"
                            class="text-xs-center"
                            width="26.67%"
                          >Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          scope="row"
                          v-for="(item,index) in mtdotherdata"
                          :key="index+item.branch+'qweqwekkjaskj'"
                          class="grey lighten-3"
                        >
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="33.33%"
                          >
                            {{item.group}}
                          </td>
                          <td
                            scope="row"
                            class="text-xs-left"
                            width="40%"
                          >{{item.subgroup}}</td>
                          <td
                            scope="row"
                            class="text-xs-center"
                            width="26.67%"
                          >{{item.mtd | round}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
            <!-- <v-spacer></v-spacer>
              <h5>VOB = Value of Orders Booked</h5> -->

            <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black--text" flat @click="dialog = false">
                  Close
                </v-btn>
            </v-card-actions>-->
          </v-card>
        </v-dialog>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
import moment from "moment";
import { serverBus } from "../main";
export default {
  // components: {
  //   loading
  // },
  data: () => ({
    threshold_percentage: {
      surgeryMin: 11,
      surgeryMax: 13,
      opticalsMin: 35,
      opticalsMax: 40,
      laboratoryMin: 11,
      laboratoryMax: 13,
      pharmacyMin: 65,
      pharmacyMax: 70
    },
    mappings: null,
    globalStore: null,
    // ftdotcount: null,
    // mtdotcount: null,
    // cogsftdotcount: null,
    // cogsmtdotcount: null,
    userName: null,
    isLoading: false,
    fullPage: true,
    dialog: false,
    title: null,
    isActive: false,
    save: "save",
    show: false,
    fileDate: null,
    loading: false,
    date: null,
    formatteddate: null,
    menu: false,
    menu2: false,
    today: "",
    rowdata: null,
    rowColor: null,
    headingdata: null,
    tabledata: null,
    dialogdata: null,
    json_data: null,
    json_meta: [
      {
        key: "charset",
        value: "utf-8"
      }
    ],
    json_fields: {
      "Group/Branch": "branch",
      "FTD Pharmacy": "ftdpha",
      "FTD Opticals": "ftdopt",
      "FTD Operation Theatre": "ftdot",
      "FTD Laboratory": "ftdlab",
      "FTD Cogs": "ftd",
      "FTD Revenue": "ftdrev",
      "FTD COGS%": "ftd_cogs_percent",
      "MTD Pharmacy": "mtdpha",
      "MTD Opticals": "mtdopt",
      "MTD Operation Theatre": "mtdot",
      "MTD Laboratory": "mtdlab",
      "MTD Cogs": "mtd",
      "MTD Revenue": "mtdrev",
      "MTD Cogs%": "mtd_cogs_percent"
    },
    fileName: null,
    surgerydata: null,
    pharmacydata: null,
    opticalsdata: null,
    laboratorydata: null,
    consultdata: null,
    otherdata: null,
    mtdsurgerydata: null,
    mtdpharmacydata: null,
    mtdopticalsdata: null,
    mtdlaboratorydata: null,
    mtdconsultdata: null,
    mtdotherdata: null,
    tab: null,
    items: [
      'General', 'Surgery', 'Opticals', 'Pharmacy', 'Laboratory', 'Consultation', 'Others'
    ],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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
    changeColor (data) {
      if (data.code === undefined) {
        return true;
      } else {
        return false;
      }
    },
    apiRequest (date) {
      let normalusername = JSON.parse(sessionStorage.getItem("normal_user"));
      if (date !== null) {
        this.fileDate = date;
        this.fileName = `Cogs_Report_${this.fileDate}.csv`;
        this.loading = true;
        this.isLoading = true;
        this.$http
          .get(`https://mis.dragarwal.com/api-normal/${date}/${normalusername.name}`)
          //.get(`http://localhost:8888/api-normal/${date}/${normalusername.name}`)
          .then(response => {
            this.processData(response.data);
            this.isLoading = false;
          });
      } else {
        return null;
      }
    },
    processData (data) {
      let tempdata = [];
      let defCount = data.branch.length;
      let count = 0;
      this.globalStore = data.specialBranch;
      if (data.mappings.length === 0) {
        this.tabledata = data.branch;
        count = defCount;
      } else {
        data.mappings.forEach(element => {
          // if (element.heading === "Karnataka") {
          //   tempdata.push(_.filter(data.group, { branch: element.heading })[0]);
          // } else {
          if (element.branches.length === 3) {
            tempdata.push(_.filter(data.group, { branch: element.heading })[0]);
          } else {
            if (element.heading === "Karnataka") {
              let splitbranches = element.branches.split("+");
              tempdata.push(
                _.filter(data.group, { branch: element.heading })[0]
              );
              splitbranches.forEach(branchele => {
                if (!["HUB", "MCC", "MYS","DWD"].includes(branchele)) {
                  tempdata.push(_.filter(data.branch, { code: branchele })[0]);
                  count++;
                }
              });
            } else {
              let splitbranches = element.branches.split("+");
              tempdata.push(
                _.filter(data.group, { branch: element.heading })[0]
              );
              splitbranches.forEach(branchele => {
                tempdata.push(_.filter(data.branch, { code: branchele })[0]);
                count++;
              });
            }
          }

          // }
        });
        data.branch.forEach(record => {
          if (!_.includes(tempdata, record)) {
            tempdata.push(record);
          }
        });
        this.tabledata = tempdata;
      }
      this.show = true;
    },
    downloadExcel () {
      let tempDataArr = [];
      if (this.fileDate !== null) {
        tempDataArr = this.tabledata;
        return tempDataArr;
      } else {
        return null;
      }
    },
    processDialog (item) {
      if (item.code === undefined) {
        let tempDialogData = _.filter(this.globalStore, {
          branch: item.branch
        });
        if (tempDialogData.length !== 0) {
          this.dialogdata = tempDialogData;
          let tempsurg = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'SURGERY' }), 'group')
          let temppha = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'PHARMACY' }), 'group')
          let tempopt = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'OPTICALS' }), 'group')
          let templab = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'LABORATORY' }), 'group')
          let tempconsult = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, { unit: 'CONSULTATION' }), 'group')
          let tempothers = _.sortBy(_.filter(this.dialogdata[0].ftdbreakup, (collection) => {
            return !_.includes(['SURGERY', 'PHARMACY', 'OPTICALS', 'LABORATORY', 'CONSULTATION'], collection.unit)
          }), 'group')
          if (tempsurg.length !== 0) {
            this.surgerydata = tempsurg
          }
          else {
            this.surgerydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
          }
          if (temppha.length !== 0) {
            this.pharmacydata = temppha
          }
          else {
            this.pharmacydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
          }
          if (tempopt.length !== 0) {
            this.opticalsdata = tempopt
          }
          else {
            this.opticalsdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
          }
          if (templab.length !== 0) {
            this.laboratorydata = templab
          }
          else {
            this.laboratorydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
          }
          if (tempconsult.length !== 0) {
            this.consultdata = tempconsult
          }
          else {
            this.consultdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
          }
          if (tempothers.length !== 0) {
            this.otherdata = tempothers
          }
          else {
            this.otherdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
          }
          let tempmtdsurg = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'SURGERY' }), 'group')
          let tempmtdpha = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'PHARMACY' }), 'group')
          let tempmtdopt = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'OPTICALS' }), 'group')
          let tempmtdlab = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'LABORATORY' }), 'group')
          let tempmtdconsult = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, { unit: 'CONSULTATION' }), 'group')
          let tempmtdothers = _.sortBy(_.filter(this.dialogdata[0].mtdbreakup, (collection) => {
            return !_.includes(['SURGERY', 'PHARMACY', 'OPTICALS', 'LABORATORY', 'CONSULTATION'], collection.unit)
          }), 'group')
          if (tempmtdsurg.length !== 0) {
            this.mtdsurgerydata = tempmtdsurg
          }
          else {
            this.mtdsurgerydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
          }
          if (tempmtdpha.length !== 0) {
            this.mtdpharmacydata = tempmtdpha
          }
          else {
            this.mtdpharmacydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
          }
          if (tempmtdopt.length !== 0) {
            this.mtdopticalsdata = tempmtdopt
          }
          else {
            this.mtdopticalsdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
          }
          if (tempmtdlab.length !== 0) {
            this.mtdlaboratorydata = tempmtdlab
          }
          else {
            this.mtdlaboratorydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
          }
          if (tempmtdconsult.length !== 0) {
            this.mtdconsultdata = tempmtdconsult
          }
          else {
            this.mtdconsultdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
          }
          if (tempmtdothers.length !== 0) {
            this.mtdotherdata = tempmtdothers
          }
          else {
            this.mtdotherdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
          }
          // this.ftdotcount = this.dialogdata[0].ftdotcount;
          // this.mtdotcount = this.dialogdata[0].mtdotcount;
          // this.cogsftdotcount = this.dialogdata[0].cogsftdotcount;
          // this.cogsmtdotcount = this.dialogdata[0].cogsmtdotcount;
          this.dialog = true;
          this.title = item.branch;
          this.formatteddate = moment(this.date).format("MMMM Do YYYY");
        }
      } else {
        this.dialogdata = _.filter(this.tabledata, { branch: item.branch });
        let tempsurg = _.filter(this.dialogdata[0].ftdbreakup, { unit: 'SURGERY' })
        let temppha = _.filter(this.dialogdata[0].ftdbreakup, { unit: 'PHARMACY' })
        let tempopt = _.filter(this.dialogdata[0].ftdbreakup, { unit: 'OPTICALS' })
        let templab = _.filter(this.dialogdata[0].ftdbreakup, { unit: 'LABORATORY' })
        let tempconsult = _.filter(this.dialogdata[0].ftdbreakup, { unit: 'CONSULTATION' })
        let tempothers = _.filter(this.dialogdata[0].ftdbreakup, (collection) => {
          return !_.includes(['SURGERY', 'PHARMACY', 'OPTICALS', 'LABORATORY', 'CONSULTATION'], collection.unit)
        })
        if (tempsurg.length !== 0) {
          this.surgerydata = tempsurg
        }
        else {
          this.surgerydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (temppha.length !== 0) {
          this.pharmacydata = temppha
        }
        else {
          this.pharmacydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (tempopt.length !== 0) {
          this.opticalsdata = tempopt
        }
        else {
          this.opticalsdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (templab.length !== 0) {
          this.laboratorydata = templab
        }
        else {
          this.laboratorydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (tempconsult.length !== 0) {
          this.consultdata = tempconsult
        }
        else {
          this.consultdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        if (tempothers.length !== 0) {
          this.otherdata = tempothers
        }
        else {
          this.otherdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'ftd': 'NIL' }]
        }
        let tempmtdsurg = _.filter(this.dialogdata[0].mtdbreakup, { unit: 'SURGERY' })
        let tempmtdpha = _.filter(this.dialogdata[0].mtdbreakup, { unit: 'PHARMACY' })
        let tempmtdopt = _.filter(this.dialogdata[0].mtdbreakup, { unit: 'OPTICALS' })
        let tempmtdlab = _.filter(this.dialogdata[0].mtdbreakup, { unit: 'LABORATORY' })
        let tempmtdconsult = _.filter(this.dialogdata[0].mtdbreakup, { unit: 'CONSULTATION' })
        let tempmtdothers = _.filter(this.dialogdata[0].mtdbreakup, (collection) => {
          return !_.includes(['SURGERY', 'PHARMACY', 'OPTICALS', 'LABORATORY', 'CONSULTATION'], collection.unit)
        })
        if (tempmtdsurg.length !== 0) {
          this.mtdsurgerydata = tempmtdsurg
        }
        else {
          this.mtdsurgerydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdpha.length !== 0) {
          this.mtdpharmacydata = tempmtdpha
        }
        else {
          this.mtdpharmacydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdopt.length !== 0) {
          this.mtdopticalsdata = tempmtdopt
        }
        else {
          this.mtdopticalsdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdlab.length !== 0) {
          this.mtdlaboratorydata = tempmtdlab
        }
        else {
          this.mtdlaboratorydata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdconsult.length !== 0) {
          this.mtdconsultdata = tempmtdconsult
        }
        else {
          this.mtdconsultdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        if (tempmtdothers.length !== 0) {
          this.mtdotherdata = tempmtdothers
        }
        else {
          this.mtdotherdata = [{ 'group': 'NIL', 'subgroup': 'NIL', 'mtd': 'NIL' }]
        }
        // this.ftdotcount = this.dialogdata[0].ftdotcount;
        // this.mtdotcount = this.dialogdata[0].mtdotcount;
        // this.cogsftdotcount = this.dialogdata[0].cogsftdotcount;
        // this.cogsmtdotcount = this.dialogdata[0].cogsmtdotcount;
        this.dialog = true;
        this.title = item.branch;
        this.formatteddate = moment(this.date).format("MMMM Do YYYY");
      }
    },
    cogsPercent (cogs, revenue) {
      if ((cogs !== 0 && revenue !== 0) || (cogs === 0 && revenue !== 0)) {
        return ((cogs / revenue) * 100).toFixed(2);
      } else if (revenue === 0 || (cogs === 0 && revenue === 0)) {
        return 0.0;
      }
    },
    cogsbyrev (cogs, revenue) {
      if ((cogs !== 0 && revenue !== 0) || (cogs === 0 && revenue !== 0)) {
        return (cogs / revenue).toFixed(2);
      } else if (revenue === 0 || (cogs === 0 && revenue === 0)) {
        return 0.0;
      }
    },
    threshold (cogs, rev, unit) {
      if (unit === "surgery") {
        if (
          // this.cogsPercent(cogs, rev) !== 0 &&
          this.cogsPercent(cogs, rev) <= this.threshold_percentage.surgeryMax &&
          this.cogsPercent(cogs, rev) >= this.threshold_percentage.surgeryMin
        ) {
          return false;
        } else {
          return true;
        }
      } else if (unit === "opticals") {
        if (
          // this.cogsPercent(cogs, rev) !== 0 &&
          this.cogsPercent(cogs, rev) <=
          this.threshold_percentage.opticalsMax &&
          this.cogsPercent(cogs, rev) >= this.threshold_percentage.opticalsMin
        ) {
          return false;
        } else {
          return true;
        }
      } else if (unit === "laboratory") {
        if (
          // this.cogsPercent(cogs, rev) !== 0 &&
          this.cogsPercent(cogs, rev) <=
          this.threshold_percentage.laboratoryMax &&
          this.cogsPercent(cogs, rev) >= this.threshold_percentage.laboratoryMin
        ) {
          return false;
        } else {
          return true;
        }
      } else if (unit === "pharmacy") {
        if (
          // this.cogsPercent(cogs, rev) !== 0 &&
          this.cogsPercent(cogs, rev) <=
          this.threshold_percentage.pharmacyMax &&
          this.cogsPercent(cogs, rev) >= this.threshold_percentage.pharmacyMin
        ) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  filters: {
    lakhFormat (num) {
      return (Number(num) / 100000).toFixed(2);
    },
    round (dat) {
      if (typeof (dat) === 'string') return dat
      else return Math.round(dat).toLocaleString()
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
}
table#stickyHeader thead {
  border-top: none;
  border-bottom: none;
  background-color: #000;
}
.table-striped > tbody > tr:nth-child(2n + 2) > td,
.table-striped > tbody > tr:nth-child(2n + 2) > th {
  background-color: #e5e5f2;
}
</style>
