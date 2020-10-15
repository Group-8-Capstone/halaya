<template>
 <div class="container">
    <div class="post">
    <div class="postinfotop">
       <h2>Create New Account</h2>
        <p id="text" style="color:green; margin-left:100px;"></p>
    </div>
    <form action="#" class="form newtopic" @submit.prevent="register">
        
        <div class="accsection">
            <div class="topwrap">
                <div class="userinfo pull-left">
                </div>
                <div class="posttext pull-left">
                    <div class="row">
                        
                        <div class="col-lg-6 col-md-6">
                         <input type="file" @change='upload_avatar' :class="{ 'is-invalid': form.errors.has('avatar') }" name="avatar">
                        <has-error :form="form" field="avatar"></has-error> 
                        <div class="avatar img-fluid img-circle" style="margin-top:10px">
                           <img :src="get_avatar()" v-bind:style="form.styleObject"/>
                        </div>
                        </div>
                    </div>
                    <div>
                        <input v-model="form.username" type="text" placeholder="Username" class="form-control" :class="{ 'is-invalid': form.errors.has('username') }" name="username">
                        <has-error :form="form" field="username"></has-error>
                    </div>
                </div>
                
            </div>  
        </div>

        <div class="postinfobot">
            <div class="pull-right postreply">
                <div class="pull-left smile"><a href="#"><i class="fa fa-smile-o"></i></a></div>
                <div class="pull-left"><button type="submit" class="btn btn-primary">Submit</button></div>

            </div>
        </div>
    </form>
    </div>
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
      form: new Form({
               
              
                avatar: '',
            
                styleObject: {
                   width: '100px',
                   height: '100px'
                }

              }),
     
      text: "",
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
                  register () {
                this.form.post('/register')
                    .then(( response ) => { 

                        var attr = document.getElementById("text");
                        attr.innerHTML = response.data.message;  
                        
                        this.form.reset();

                     })
            },
       upload_avatar(e){
              let file = e.target.files[0];
                let reader = new FileReader();  

                if(file['size'] < 2111775)
                {
                    reader.onloadend = (file) => {
                    //console.log('RESULT', reader.result)
                     this.form.avatar = reader.result;
                    }              
                     reader.readAsDataURL(file);
                }else{
                    alert('File size can not be bigger than 2 MB')
                }
            },
             //For getting Instant Uploaded Photo
            get_avatar(){
               let photo = (this.form.avatar.length > 100) ? this.form.avatar : "img/profile/"+ this.form.avatar;
               return photo;
            },

    
    }
  }
</script>

