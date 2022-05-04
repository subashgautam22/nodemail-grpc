(() => {
  
    const axios = require("axios");
  
    const postRandomJokes = async (data) => {
        const headers = {
            'Content-Type': 'application/json'
          }
          let response;
          try{
            response = await axios.patch("https://reqres.in/api/users/2",data,headers );
            console.log(response.data);
          return response.data;
          } catch(error){
            console.log(error)
          }
    }
    module.exports = async (call, callback) => {
        
     let userInfo = await postRandomJokes(call.request)
     return callback (null, {names: userInfo.names, job: userInfo.job, updatedAt: userInfo.updatedAt} ) ;
       };
  })();
