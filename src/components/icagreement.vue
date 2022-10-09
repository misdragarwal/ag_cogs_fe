<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file"  accept="image/x-png, image/gif, image/jpeg,application/pdf"  v-on:change="handleFileUpload()"/>
      </label>
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
<!--
  <v-btn color="blue darken-1" flat @click="apiinsertrefdoc(refdoctor,refdocbranch,refdoccontact,refdocemail,refdocpan,refdocgstin,refdocagreed,refdocacc,refdocaccifsc,refdocaccbank,panupload,passbookupload)">Submit</v-btn> -->

  <!-- <v-text-field type='file' clearable  @change="processFile(a)" v-model="fileupload1" label="Bank Name" required></v-text-field>
   <v-btn color="blue darken-1" v-model='buttonstatus' flat @click="apiinsertbill(fileupload1)">Submit</v-btn> -->

</template>

<script>
  export default {
    /*
      Defines the data used by the component
    */
    data(){
      return {
        file: ''
      }
    },

    methods: {

 //      processFile(a) {
 //        console.log(a);
 //        console.log(this.fileupload1);
 //        // this.file = this.$refs.file.files[0];
 //        // console.log(this.file);
 // },
      /*
        Submits the file to the server
      */
      submitFile(){
        /*
                Initialize the form data
            */
            let formData = new FormData();

            console.log("----------------------");
console.log(this.file);
            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);
            //  formData.append('file1', this.file);

            console.log(Array.from(formData));
        /*
          Make the request to the POST /single-file URL
        */
            this.axios.post( 'https://mis.dragarwal.com/api-upi',
                formData,
                {
                  
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },

      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        this.file = this.$refs.file.files[0];

        console.log(this.file);
        console.log((this.file.size / 1024 / 1024) .toFixed(2));

        if((this.file.size / 1024 / 1024) .toFixed(2) > 2)
        {
          alert("greater than 2")

          this.file=null;
          console.log(this.file);
        }
      }
    }
  }
</script>
