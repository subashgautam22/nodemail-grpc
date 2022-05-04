 (() => {
    
    const httpStatus = require("http-status");
    const axios = require("axios");
  
    const getRandomJokes = async () => {
      let { data } = await axios.get("https://reqres.in/api/users/2", {
        headers: {
          accept: "application/json"
      
        }
       
      });
      console.log(data);
      return data.data;
    }
    module.exports = async (call, callback) => {
        let userInfo = await getRandomJokes(call.data)
        return callback (null, {id: userInfo.id, email: userInfo.email, first_name: userInfo.first_name, last_name: userInfo.last_name, avatar: userInfo.avatar} ) ;
      
  

  
       
    };
  })();
  