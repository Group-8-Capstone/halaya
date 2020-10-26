<template>
 <div class="container">
     <form @submit="formSubmit" enctype="multipart/form-data" action>
                    <span class="errorColor" v-if="errorMessage !== null">{{errorMessage}}</span>
                    <div class="form-group">
                        <label >Profile Account</label>
                        <br>
                        <input type="text" class="form-control" v-model="productType" required>
                    </div>
                    <div class="form-group">
                        <center>
                            <img class="addOnsImage" :src="imageURL"><br>
                            <input type="file" class="fileStyle" v-on:change="onImageChange" required><br>
                        </center>
                    </div>
                    <div style="text-align: right">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
    <!-- <div class="post">
    <div class="postinfotop">
       <h2>Create New Account</h2>
        <p id="text" style="color:green; margin-left:100px;"></p>
    </div> -->
    <!-- <form action="#" class="form newtopic" @submit.prevent="register"> -->
        
        <!-- <div class="accsection">
            <div class="topwrap">
                <div class="userinfo pull-left">
                </div>
                <div class="posttext pull-left">
                    <div class="row">
                        
                        <div class="col-lg-6 col-md-6">
                         <input type="file" @change='upload_avatar' :class="{ 'is-invalid': form.errors.has('image') }" name="image">
                        <has-error :form="form" field="image"></has-error> 
                        <div class="avatar img-fluid img-circle" style="margin-top:10px">
                           <img :src="get_avatar()" v-bind:style="form.styleObject"/>
                        </div>
                         <button class="btn btn-success" @click="uploadImage">Upload Image</button>
                        </div>
                         
                    </div> -->
                    <!-- <div>
                        <input v-model="form.username" type="text" placeholder="Username" class="form-control" :class="{ 'is-invalid': form.errors.has('username') }" name="username">
                        <has-error :form="form" field="username"></has-error>
                    </div> -->
                <!-- </div>
                
            </div>  
        </div> -->

        <!-- <div class="postinfobot">
            <div class="pull-right postreply">
                <div class="pull-left smile"><a href="#"><i class="fa fa-smile-o"></i></a></div>
                <div class="pull-left"><button type="submit" class="btn btn-primary">Submit</button></div>

            </div>
        </div> -->
    <!-- </form> -->
    <!-- </div> -->
</div>
        <!-- <v-card
    class="mx-auto ma-15 "
    max-width="500"
  >
    <v-card-title>
      Account Setting
    </v-card-title>
    <v-divider></v-divider>
     <v-row class=" ma-5">
          <v-layout>
       <v-spacer></v-spacer>
        <v-btn  color="primary" v-bind:disabled="btnDisabled" outlined @click="editAmount()" class="ma-3" >Update</v-btn>
    </v-layout>
            <v-col cols="12">
                <v-text-field
      label="Username"
      :rules="rules"
      hide-details="auto"
     v-bind:disabled="disabled"
      v-model="text"
      value="good"
      outlined
    >
    </v-text-field>
   </v-col>
    <v-col cols="12">
    <v-text-field
      label="Password"
      :rules="rules"
      hide-details="auto"
       v-bind:disabled="disabled"
        outlined
    >
</v-text-field>
   </v-col>
    
             <v-layout align-center justify-center>
            <v-flex xs6>
                  <v-btn class=" ma-5" v-on:click="saveChanges"
                   v-if="!isHidden" color="green" outlined >Save changes</v-btn>
            </v-flex>
        </v-layout>
     </v-row>
  </v-card>  -->
</template>

<script>
import axios from "axios";
  export default {
    name: "BusinessSetting",
    data: () => ({
      rules: [
        value => !!value || 'Required.',
      ],
      alignments: [
        'start',
        'center',
        'end',
      ],
    
      imageURL:null,
      errorMessage:null,
      disabled: true,
      btnDisabled:false,
      isHidden: true

    }),

    mounted() {
    
    },

    methods: {
      editAmount(){
        console.log('good')
        this.disabled= false
        this.btnDisabled=true
        this.isHidden=false
      },

      saveChanges(){
        this.disabled= true
        this.btnDisabled=false
        this.isHidden = true

      },
        // register () {
        //         this.form.post('/register')
        //             .then(( response ) => { 

        //                 var attr = document.getElementById("text");
        //                 attr.innerHTML = response.data.message;  
                        
        //                 this.form.reset();

        //              })
        
            // },
        // uploadImage(){
        // axios.post('/image/store',{image: this.image}).then(response => {
        //            console.log(response);
        //         });
        //     },
    //    upload_avatar(e){
    //           let file = e.target.files[0];
    //             let reader = new FileReader();  

    //             if(file['size'] < 2111775)
    //             {
    //                 reader.onloadend = (file) => {
    //                  this.form.image = reader.result;
    //                 }              
    //                  reader.readAsDataURL(file);
    //             }else{
    //                 alert('File size can not be bigger than 2 MB')
    //             }
    //         },
    //         get_avatar(){
    //            let photo = (this.form.image.length > 100)
    //             ? this.form.image : "img/profile/"+ this.form.image;
    //            return photo;
    //         },
    onImageChange(e){
            this.image = e.target.files[0]
            console.log(this.image);
            this.imageURL = URL.createObjectURL(e.target.files[0])
        },

    
    }
  }
</script>

