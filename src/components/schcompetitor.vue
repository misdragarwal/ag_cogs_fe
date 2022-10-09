<template>
    <v-container fluid fill-height class="grey lighten-3">
        <v-slide-y-transition mode="out-in">
            <v-layout row wrap>
                <v-flex xs12 sm10 offset-sm1 md10 offest-md1 lg10 offset-lg1>
                    <v-toolbar flat color="grey lighten-2">
                        <v-toolbar-title>Competitors</v-toolbar-title>
                        <v-divider class="mx-2 black" inset vertical></v-divider>
                        <v-spacer> </v-spacer>
                        <v-autocomplete v-model="selbranch" :items="branch" label="Branch" item-text="shortCode"
                            item-value="TEXT"></v-autocomplete>
                        <v-spacer></v-spacer>
                        <v-select :items="status" v-model="Selstatus" label="Status:" item-text="shortCode"
                            item-value="text"></v-select>
                        <v-spacer></v-spacer>
                        <v-menu absolute ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40"
                            :return-value.sync="date" lazy transition="scale-transition" offset-y full-width
                            min-width="200px">
                            <v-text-field slot="activator" v-model="date" placeholder="Target Date"
                                prepend-inner-icon="event" readonly></v-text-field>
                            <v-date-picker color="primary" v-model="date" no-title scrollable :min="minDate"
                                :max="maxDate" type=month backgroundRevenue-color="red" style="box-shadow:none">
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false" style="outline:none">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(date);" style="outline:none">Ok
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-btn rounded color="primary" dark @click="apiGetlist(date,selbranch,Selstatus)">Generate
                        </v-btn>
                        <download-excel :data="json_data" :fields="json_fields" type="csv" :name="fileName"
                            :fetch="downloadExcelCompetitor">
                            <v-btn fab flat medium color="black">
                                <v-tooltip bottom>
                                    <v-icon slot="activator" color="green darken-4">fas fa-file-excel</v-icon>
                                    <span>Export</span>
                                </v-tooltip>
                            </v-btn>
                        </download-excel>
                    </v-toolbar>
                    <loading :active.sync="isLoading" :is-full-page="fullPage" color="#7f0000" loader="bars"></loading>
                    <v-card-title>
                        <v-toolbar-title></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="search" v-if="getCompData" append-icon="mdi-magnify" label="Search"
                            single-line hide-details></v-text-field>
                    </v-card-title>
                    <!-- Vuetify Data table -->
                    <v-data-table :headers="headers" :items="getCompData" :search="search" :items-per-page="10"
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <tr>
                                <td class="text-xs-left"> {{ props.item.company_name }}</td>
                                <td>{{ props.item.approval_status | statusVal }}</td>
                                <td>{{ props.item.branch }}</td>
                                <td class="text-xs-left">{{ props.item.comp_type }}</td>
                                <td class="text-xs-left">{{ props.item.doctor_name }}</td>
                                <td class="text-xs-left">{{ props.item.services }}</td>
                                <td class="text-xs-left">{{ props.item.target_month }}</td>
                                <td class="text-xs-left">{{ props.item.marketing_activity }}</td>
                                <td class="text-xs-left">{{ props.item.opd }}</td>
                                <td class="text-xs-left">{{ props.item.cataract }}</td>
                                <td class="text-xs-left">{{ props.item.refractive }}</td>
                                <td class="text-xs-left">{{ props.item.vr }}</td>
                                <td class="text-xs-left">{{ props.item.vr_inj }}</td>
                                <td class="text-xs-left">{{ props.item.revenue }}</td>

                                <td class="text-xs-right" v-if="(props.item.approval_status==1)">
                                    <v-btn slot="activator" small fab @click="rowUpdate(props.item,'',2)"
                                        color="success">
                                        <v-icon>fa-check</v-icon>
                                    </v-btn>
                                </td>

                                <td class="text-xs-right" v-if="(props.item.approval_status==1)">
                                    <v-btn slot="activator" small fab
                                        @click.stop="$set(dialogEdit, props.item.cd_id, true)" color="error">
                                        <v-icon>fas fa-times</v-icon>
                                    </v-btn>
                                    <v-dialog v-model="dialogEdit[props.item.cd_id]" persistent max-width="800px" lazy
                                        absolute :key="props.item.cd_id">
                                        <v-card>
                                            <v-card-title>
                                                <span class="headline">Comments for rejection</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container grid-list-md>
                                                    <v-layout wrap>


                                                        <v-flex xs12 sm8 md4>
                                                            <v-textarea clearable clear-icon="cancel"
                                                                label="Sch comments" v-model='schcomments'>
                                                            </v-textarea>

                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" flat
                                                    @click="rowUpdate(props.item,schcomments,3)"
                                                    @click.stop="$set(dialogEdit, props.item.cd_id, false)">Reject
                                                </v-btn>

                                                <v-btn color="primary" flat
                                                    @click.stop="$set(dialogEdit, props.item.cd_id, false)">Close
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </td>

                            </tr>
                        </template>
                    </v-data-table>
                    <back-to-top bottom="90px" right="90px">
                        <v-btn class="red darken-4" dark absolute fab small>
                            <v-icon>expand_less</v-icon>
                        </v-btn>
                    </back-to-top>

                </v-flex>
                <v-snackbar v-model="snackbar" color="success" :timeout="timeout" top right>
                    {{ this.snackbartext }}
                </v-snackbar>
            </v-layout>
        </v-slide-y-transition>
    </v-container>

</template>

<script>
import moment from "moment";
var curday = function (sp) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return yyyy + sp + mm + sp + dd;
};
export default {
    data: () => ({
        branch: "",
        selbranch: null,
        status: [
            {
                shortCode: "Select All",
                text: 4
            },
            {
                shortCode: "Approved",
                text: 2
            },
            {
                shortCode: "Reject",
                text: 3
            },
            {
                shortCode: "CH Draft",
                text: 0
            },
            {
                shortCode: "CH Submitted",
                text: 1
            },

        ],
        Selstatus: null,
        menu: false,
        minDate: '2022-09-01',
        maxDate: curday('-'),
        isLoading: false,
        fullPage: true,
        date: null,
        search: '',
        getCompData: null,
        selected: [],
        headers: [

            {
                text: 'Competitor Name',
                value: 'company_name',
                class: 'text-xs-left',
                align: 'left',
                sortable: false
            }
            , {
                text: 'status',
                align: 'start',
                value: 'approval_status',
                sortable: false
            }, {
                text: 'branch',
                value: 'branch',

            },
            {
                text: 'Type',
                value: 'comp_type'
            },
            {
                text: 'Doctors',
                value: 'doctor_name'
            },
            {
                text: 'Service Available',
                align: 'left',
                value: 'services'
            },
            {
                text: 'Target Month',
                value: 'target_month'
            },
            {
                text: 'Key Marketing Activity',
                value: 'marketing_activity'
            },

            {
                text: 'Opd',
                value: 'opd'
            },
            {
                text: 'Cataract',
                value: 'cataract'
            },
            {
                text: 'Refractive',
                value: 'refractive'
            },
            {
                text: 'VR',
                value: 'vr'
            },
            {
                text: 'VR Inj',
                value: 'vr_inj'
            },
            {
                text: 'Revenue (In Lakhs)',
                value: 'revenue'
            },
            {
                text: 'Approve',
                value: 'Approve'
            },
            {
                text: 'Reject',
                value: 'Reject'
            }],
        compdetail: [],
        dialogEdit: {},
        json_data: null,
        json_meta: [{
            key: "charset",
            value: "utf-8"
        }],
        json_fields: {

            "BRANCH": "branch",
            "COMP NAME": "company_name",
            "KEY DOCTOR": "doctor_name",
            "SERVICE AVAILABLE": "services",
            "OPD": "opd",
            "CATARACT": "cataract",
            "REFRACTIVE": "refractive",
            "VR": "vr",
            "VR INJ": "vr_inj",
            "TOTAL REVN ( in Lakhs)": "revenue",
            "KEY MARKETING ACTIVITY": "marketing_activity",
            "CREATED AT": "inserted_at",
            "STATUS": "approvalstatus",
        },
        fileName: null,
        schcomments: '',
        snackbar: false,
        snackbartext: '',
        timeout: 3000,
    }),
    created() {
        this.getToday();
        this.loadbranch();
    },
    methods: {
        getToday() {
            this.today = moment()
                .subtract(1, "days")
                .format("YYYY-MM-DD");
        },
        loadbranch() {
            let userid = JSON.parse(sessionStorage.getItem("normal_user"));
            this.branch = [];
            var arr1 = [{
                shortCode: 'All',
                text: 'Select All'
            }];
            this.axios
                .get(`http://localhost:7777/api-schbranch/${userid.userName}`).then(response => {
                    this.branch = arr1.concat(response.data);
                })
        },
        apiGetlist(date, selbranch, Selstatus) {
            let userid = JSON.parse(sessionStorage.getItem("normal_user"));
            if (!date) {
                alert("Please Select Month");
                return false;
            }
            var statusvalue = '';
            var branchvalue = '';
            var datevalue = '';
            if ((Selstatus == null)) {
                alert("Please select status")
                return false;
            } else {
                statusvalue = this.Selstatus;
            }
            if ((selbranch == '') || (selbranch == null)) {
                alert("Please select branch")
                return false;
            } else {
                branchvalue = this.selbranch;
            }
            if ((date == '') || (date == null)) {
                alert("Please select date")
                return false;
            } else {
                datevalue = this.date;
            }
            this.isLoading = true;
            const requestOptions = {
                headers: {
                    "Content-Type": "application/json",
                    "token": "730d84a872b5987b66d7b3b91cd8b8ca7c3c4fdcfd00022fd4d32f1f142f072fa505235a06821746edcbe430fcd9d21ce78025c5ebe647bebd6cef207a7cae2b"
                },
            };
            this.$http.get(`http://localhost:7777/api-strcompetitors/${branchvalue}/${datevalue}/${statusvalue}/${userid.name}`, requestOptions)
                .then(response => {
                    console.log(response.data.code);
                    if (response.data.code == 200) {
                        this.processDatabill(response.data)
                        this.isLoading = false;
                    }
                    else {
                        this.isLoading = false;
                        alert("Error in generating data")
                    }
                })
            this.fileName = `report.csv`;

        },
        processDatabill(data) {
            if (sessionStorage.getItem('super_user')) {
                this.user_role = 'super_user';
            } else if (sessionStorage.getItem('overseas_user')) {
                this.user_role = 'overseas_user';
            } else if (sessionStorage.getItem('indian_user')) {
                this.user_role = 'indian_user';
            } else if (sessionStorage.getItem('optical_user')) {
                this.user_role = 'optical_user';
            } else if (sessionStorage.getItem('coll_user')) {
                this.user_role = 'coll_user';
            }
            this.getCompData = data['data']
            console.log(this.getCompData);
            this.show = true;
        },
        downloadExcelCompetitor() {
            let tempDataArr = [];
            if (this.fileDate !== null) {
                tempDataArr = this.getCompData
                return tempDataArr;
            } else {
                return null;
            }
        },
        clear() {
            this.schcomments = ''
        },
        rowUpdate(data, comments, status) {
            let userid = JSON.parse(sessionStorage.getItem("normal_user"));

            const requestOptions = {
                headers: {
                    "Content-Type": "application/json",
                    "token": "730d84a872b5987b66d7b3b91cd8b8ca7c3c4fdcfd00022fd4d32f1f142f072fa505235a06821746edcbe430fcd9d21ce78025c5ebe647bebd6cef207a7cae2b"
                },
            };
            this.axios.put(`http://localhost:7777/api-strcompetitors/${data.cd_id}`, {
                comments: comments,
                status: status,
                id: data.c_id,
                userId: userid.userName
            }, requestOptions).then(response => {
                if (response.data.code === 200) {
                    this.snackbartext = 'Data Updated Submitted successfully'
                    this.snackbar = true

                    this.isLoading = true
                    this.apiGetlist(this.date, this.selbranch, this.Selstatus)
                    this.clear()
                } else {
                    alert(response.data.data)
                    this.snackbartext = response.data.data
                    this.snackbar = true
                    this.isLoading = true
                    this.apiGetlist(this.date, this.selbranch, this.Selstatus)
                    this.clear()
                }
            })

        }
    },
    filters: {
        statusVal(num) {
            if (num == 0) {
                return 'Ch Draft';
            } else if (num == 1) {
                return 'Ch Submitted';
            } else if (num == 2) {
                return 'Approved';
            } else if (num == 3) {
                return 'Reject';
            }
        }
    }
}
</script>

<style>
table>tbody>tr>td:nth-child(1),
table>thead>tr>th:nth-child(1) {
    position: sticky !important;
    position: -webkit-sticky !important;
    left: 0;
    z-index: 9998;
    background: white;
}

table>thead>tr>th:nth-child(1) {
    z-index: 9999;
}
</style>