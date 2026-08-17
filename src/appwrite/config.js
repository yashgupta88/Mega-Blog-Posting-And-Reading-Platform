import conf from "../config/conf.js";

import { Client, Account, ID , Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
         this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId) ; 

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
        
    }

    async createPost({title,slug , content , featuredImage , status , userId }){

        try {
            return await this.databases.createDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
        data: {
        title,
        content , 
        featuredImage,
        status,
        slug,
        userId
    },
    
})
        } catch (error) {
            console.log("Appwrite service :: createPost :: error" , error )
        }
    }
// slug is taken from frontend to get document id , which we want to update 

    async updatePost(slug ,{title, content , featuredImage , status  }){
        
try {
    return  await this.databases.updateDocument({
         databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
        data: {
        title,
        content , 
        featuredImage,
        status,
       
        },
    });
} catch (error) {
    console.log("Appwrite service :: updatePost :: error" , error )
}
    }

    async deletePost(slug){

        try {
          await this.databases.deleteDocument({
             databaseId: conf.appwriteDatabaseId,
             collectionId: conf.appwriteCollectionId,
             documentId: slug,
   
           })
           return true
        } catch (error) {
            throw error;
            
        }

    }
    // slug is just document id 

    async getPost(slug){

        try {
            return await this.databases.getDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
               
            })
            
        } catch (error) {
            throw error
        }
    }

    // jin chizo pe index nhi laga hai hum unpe query nhi laga sakte hai , apqrite me 
    async getPosts(){
        
try {
    return await this.databases.listDocuments({

               databaseId: conf.appwriteDatabaseId,
               collectionId: conf.appwriteCollectionId,
               queries: [Query.equal("status" , "active"),Query.limit(25)], // optional
         
        
           });
} catch (error) {
    throw error
}
    }

    /// file uploads services 
    
    async uploadFile(file){

        try {
            
         return await this.bucket.createFile({
               bucketId: conf.appwriteBucketId,
               fileId: ID.unique(),
               file: file,
            
           });

        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId){
        
    try {
        await this.bucket.deleteFile({
            bucketId: conf.appwriteBucketId,
            fileId: fileId
        });
        return true
    } catch (error) {
        throw error
    }

    }

    getFilePreview(fileId){
       
        return  this.bucket.getFilePreview({
          bucketId: conf.appwriteBucketId,
          fileId: String(fileId),
   
      })
     
    }

    getFileView(fileId){
        return this.bucket.getFileView({
              bucketId:  conf.appwriteBucketId,
              fileId: String(fileId)
        })
    }
}

const service = new Service();

export default service;
