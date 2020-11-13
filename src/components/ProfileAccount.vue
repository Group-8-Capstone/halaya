<template>
 <div class="container " >
   <center>
      <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
            <v-card width="400px" class="ml-10">
                 <v-card-title >ACCOUNT PROFILE</v-card-title>
                  <v-divider></v-divider>
                 <div class="modal-body mt-5">
                        <form @submit="formSubmit" enctype="multipart/form-data" action>
                          <v-container>
                                  <center>
                                    <img class="addOnsImage" :src="imageURL"><br>
                                     <h4 class=" gray--text">{{username}}</h4>
                                    <input type="file" class="fileStyle deep-purple--text" v-on:change="onImageChange">
                            </center>
                            </v-container>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn type="submit" class="ma-3" color="primary" outlined>Update</v-btn>
                      </v-card-actions>
                        </form>
                  </div>
            </v-card>
        </center>
 </div>
</template>
<style>
.addOnsImage{
    width: 150px !important; 
    height: 150px !important; 
  
}
.fileStyle{
    font-size: 17px !important;
    width: 50%;
    margin-top: 3%;
    margin-bottom: 3%;
    
}

.v-card{
  margin-top: 10%
}
</style>


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
    
      ownersName:null,
      imageURL: null,
      errorMessage:null,
      disabled: true,
      btnDisabled:false,
      isHidden: true,
      username:null

    }),
    beforeCreate() {
    let config = {};
    config.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      'Access-Control-Allow-Origin':'*'
    };
    this.config = config;
    console.log("this.config", this.config);
  },

    mounted() {
        this.avatarRetrieve()
    
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
      onImageChange(e){
            this.image = e.target.files[0]
            this.imageURL = URL.createObjectURL(e.target.files[0])
        },
     formSubmit(e) {
            if(this.image !== null ){
                e.preventDefault();
                let currentObj = this;
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                this.addProductDialog=false
                let formData = new FormData();
                let id=localStorage.getItem('id')
                formData.append('image', this.image)
                axios.post(this.url+'/api/ProfilePicUpdate/'+id, formData, this.config).then(function (response) {
                  console.log(formData)
                    currentObj.success = response.data.success
                    window.location.reload()
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            }else{
                this.errorMessage = 'All fields are required!'
            }
               
        },
      avatarRetrieve() {
      let id=localStorage.getItem('id')
      axios.get(this.url+"/api/fetchProfile/"+ id, this.config).then(response => {
        this.username=response.data.account[0].username
        if(response.data.account[0].profile_url==null){
          this.imageURL=this.url+'/images/avatar.png'
        }else{
          this.imageURL=this.url+"/"+response.data.account[0].profile_url
        }
        console.log(response.data.account[0].username)
      });
    },
    }
    
  }
</script>

