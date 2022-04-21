export default {
    post:async ()=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                reject({username:"mamush"})
            },1000)
        });
     }
}