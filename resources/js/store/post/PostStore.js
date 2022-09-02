import { defineStore } from 'pinia'
import axios from 'axios'

export const PostStore = defineStore("post",{
    state : () => ({
        posts:[],
        edit_id : null,
        title: null,
        description: null,
        image : null,

        loading:false,
        url: 'api/posts/'

    }),

    getters: {

    },

    actions: {
        async fetchPosts(){
            this.posts = [];
            this.loading = true
            try{
                let posts = await axios.get(this.url);
                this.posts = posts.data;
            }catch(error){
                console.log(error)
            }finally{
                // loader
                this.loading = false
            }
        },
        addItem(){
            if(this.title != '' && this.description != ''){
                let form_data = new FormData();

                form_data.append('title', this.title);
                form_data.append('description', this.description);
                form_data.append('image', this.image);

                let config  = {
                    header:{
                        'Content-Type' : 'image/png'
                    }
                }

                if(this.edit_id> 0){
                    // update post
                    form_data.append('_method','put');

                    axios.post(this.url+this.edit_id,form_data,config).then(res=>{
                        console.log(res);
                        this.formReset()
                        this.fetchPosts()
                    })
                }else{
                    // add post
                    axios.post(this.url,form_data,config).then(res=>{
                        console.log(res);
                        this.formReset()
                        this.fetchPosts()
                    })
                }
            }
        },
        editItem(id){
            let post = this.posts.find(post=>post.id == id)
            if(post){
                this.title = post.title
                this.description = post.description
                this.edit_id = post.id
            }
        },
        deleteItem(id){
            axios.delete(this.url+id).then(res=>{
                // this.fetchPosts()
                let index = this.posts.findIndex(post=>post.id == id);
                this.posts.splice(index,1)
            })
        },

        changeImage(event){
            this.image = event.target.files[0]
        },

        formReset(){
            this.edit_id = null
            this.title = null
            this.description = null
        }
    }

})
