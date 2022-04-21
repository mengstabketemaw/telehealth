export default {
    post:async ()=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve({username:"mamush"})
                // reject({message:"Unauthorized"})
            },1000)
        });
     }
}