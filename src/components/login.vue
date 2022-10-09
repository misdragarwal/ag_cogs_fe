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
            <v-toolbar-title>Sign In</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
                @keydown.enter="submit"
                autofocus="autofocus"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passRules"
                label="Password"
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
              >Login</v-btn>
              <span
                class="red--text font-weight-regular"
                :v-if="errors.length"
              >{{errors.toString()}}</span>
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
    name: "",
    nameRules: [v => !!v || "Name is required"],
    password: "",
    passRules: [v => !!v || "Password is required"],
    errors: [],
    userName: null
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log("11111111111");
        this.loading = true;
        this.axios
          .post(`https://mis.dragarwal.com/mis-login`, {
            //.post(`http://localhost:7777/mis-login`, {
            user: this.name.trim(),
            pass: this.password.trim()
          })
          .then(response => {
            sessionStorage.clear();
            this.loading = false;
            if (
              response.data.isAuthenticated === true &&
              response.data.role === "domestic_user"
            ) {
              sessionStorage.setItem(
                "domestic_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role
                })
              );
              serverBus.$emit("changeComponent", "domesticrevenue");
            } else if (
              response.data.isAuthenticated === true &&
              response.data.role === "group_user"
            ) {
              sessionStorage.setItem(
                "group_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role
                })
              );

              if (this.name == "103390" || this.name == "100019") {
                serverBus.$emit("changeComponent", "newpod");
              } else if (this.name == "scmteam" || this.name == "Csight") {
                serverBus.$emit("changeComponent", "Cogsdata");
              } else if (this.name == "102055") {
                serverBus.$emit("changeComponent", "avamagic");
              } else {
                serverBus.$emit("changeComponent", "domesticrevenue");
              }
            } else if (
              response.data.isAuthenticated === true &&
              response.data.role === "overseas_user"
            ) {
              sessionStorage.setItem(
                "overseas_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role
                })
              );
              serverBus.$emit("changeComponent", "group");
            } else if (
              response.data.isAuthenticated === true &&
              response.data.role === "normal_user"
            ) {
              sessionStorage.setItem(
                "normal_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role
                })
              );
              serverBus.$emit("changeComponent", "normalrevenue");
            } else if (
              response.data.isAuthenticated === true &&
              response.data.role === "admin_user"
            ) {
              sessionStorage.setItem(
                "admin_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role
                })
              );
              serverBus.$emit("changeComponent", "domesticrevenue");
            } else if (
              response.data.isAuthenticated === true &&
              response.data.role === "optical_user"
            ) {
              sessionStorage.setItem(
                "optical_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role
                })
              );
              serverBus.$emit("changeComponent", "Optical");
              // serverBus.$emit("changeComponent", "chart");
            } else if (
              response.data.isAuthenticated === true &&
              response.data.role === "tpa_user"
            ) {
              sessionStorage.setItem(
                "tpa_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role
                })
              );
              serverBus.$emit("changeComponent", "Tpa_Approve");
              // serverBus.$emit("changeComponent", "Tpa_Approve");
            } else if (
              response.data.isAuthenticated === true &&
              response.data.role === "coll_user"
            ) {
              sessionStorage.setItem(
                "coll_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role
                })
              );
              serverBus.$emit("changeComponent", "Collection");
              // serverBus.$emit("changeComponent", "chart");
            }

            // drt ch approval
            else if (
              response.data.isAuthenticated === true &&
              response.data.role === "ch_user" &&
              response.data.role1 === "normal_user"
            ) {
              sessionStorage.setItem(
                "normal_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role,
                  role1: response.data.role1
                })
              );
              if (this.name == "103572") {
                serverBus.$emit("changeComponent", "pettycash_ch_list");
              } else {
                serverBus.$emit("changeComponent", "normalrevenue");
              }
            } else if (
              response.data.isAuthenticated === true &&
              response.data.role === "ch_user"
            ) {
              sessionStorage.setItem(
                "normal_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role,
                  role1: response.data.role1
                })
              );
              if (this.name == "102301" || this.name == "102548") {
                serverBus.$emit("changeComponent", "Tpa");
              } else if (this.name == "103572") {
                serverBus.$emit("changeComponent", "pettycash_ch_list");
              } else {
                serverBus.$emit("changeComponent", "normalrevenue");
              }
            }

            //drt sch apporval

            // drt approval
            else if (
              response.data.isAuthenticated === true &&
              response.data.role === "sch_user" &&
              response.data.role1 === "normal_user"
            ) {
              sessionStorage.setItem(
                "normal_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role,
                  role1: response.data.role1
                })
              );
              if (this.name == "103260") {
                serverBus.$emit("changeComponent", "pettycashApproval");
              } else {
                serverBus.$emit("changeComponent", "normalrevenue");
              }
            } else if (
              response.data.isAuthenticated === true &&
              response.data.role === "sch_user"
            ) {
              sessionStorage.setItem(
                "normal_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role,
                  role1: response.data.role1
                })
              );

              if (this.name == "103260") {
                serverBus.$emit("changeComponent", "pettycashApproval");
              } else {
                serverBus.$emit("changeComponent", "normalrevenue");
              }
            } 
            else if (
              response.data.isAuthenticated === true &&
              response.data.role === "fin_user" &&
              response.data.role1 === "super_user"
            ) {
              console.log("1");
              sessionStorage.setItem(
                "fin_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role,
                  role1: response.data.role1
                })
              );

              serverBus.$emit("changeComponent", "revenue");
            } 
            else if (
              response.data.isAuthenticated === true &&
              response.data.role === "fin_user"
            ) {
              sessionStorage.setItem(
                "fin_user",
                JSON.stringify({
                  name: this.name,
                  userName: response.data.userName,
                  role: response.data.role
                })
              );

              if (this.name == "findrt" || this.name == "finadmin") {
                serverBus.$emit("changeComponent", "AdminApproval");
              } else if (this.name == "reconadmin") {
                serverBus.$emit("changeComponent", "coll_recon_admin");
              } else if (this.name=='108477'){
                serverBus.$emit("changeComponent", "competitor");
              }else {
                serverBus.$emit("changeComponent", "Cashapproval");
              }
            } else {
              this.errors = ["Invalid Creds"];
            }
          });
      }
    }
  }
};
</script>

<style>
</style>
