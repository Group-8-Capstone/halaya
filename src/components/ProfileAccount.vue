<template>
 <div class="container " >
   <center>
            <v-card width="400px" class="ml-10">
                 <v-card-title class=" deep-purple--text">Account</v-card-title>
                <v-card-subtitle>
                  Please fill in the required information 
                </v-card-subtitle>
                  <v-divider></v-divider>
                 <div class="modal-body">
                        <form @submit="formSubmit" enctype="multipart/form-data" action>
                          <v-container>
                                <v-col cols="12">
                                <v-text-field outlined
                                type="text" color="purple"
                                class="form-control"
                                v-model="ownersName"
                                label="Owner's Name"
                                required></v-text-field> 
                                  </v-col>
                                  <v-col cols=" 12" >
                                  <center>
                                    <img class="addOnsImage" :src="imageURL"><br>
                                    <input type="file" class="fileStyle" v-on:change="onImageChange">
                            </center>
                           </v-col>
                            </v-container>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn type="button" color="orange" text>Cancel</v-btn>
                      <v-btn type="submit"  color="primary" text>Update</v-btn>
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
    width: 200px;
    margin-top: 3%;
    margin-bottom: 3%;
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
      prodId:'1'

    }),

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
            if(this.image !== null && this.ownersName !== null){
                e.preventDefault();
                let currentObj = this;
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                this.addProductDialog=false
                let formData = new FormData();
                formData.append('id', this.prodId)
                formData.append('image', this.image)
                formData.append('ownersName', this.ownersName)
                axios.post('http://127.0.0.1:8000/api/post/account', formData, config).then(function (response) {
                  console.log(formData)
                    currentObj.success = response.data.success
                })
                .catch(function (error) {
                    currentObj.output = error;
                });
            }else{
                this.errorMessage = 'All fields are required!'
            }   
        },

         avatarRetrieve(){
            axios.get('http://127.0.0.1:8000/api/retrieveAccount').then(response => {
              let arr =[]
              arr = response.data.data
                arr.forEach(element => {
                  this.ownersName= element.owners_name,
                  this.imageURL='http://localhost:8000/'+ element.avatar,
                  console.log(element.avatar)
                });
            });
    
    }
    }
  }
</script>

