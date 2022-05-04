(() => {
    
    const httpStatus = require("http-status");
    const axios = require("axios");
  
    const getRandomJokes = async () => {
      let {data} = await axios.delete("https://reqres.in/api/users/2", {
        headers: {
          accept: "application/json"
      
        }
       
      });
      console.log(data);
      return data;
    }
    module.exports = async (call, callback) => {
   let response = {}
        await getRandomJokes()
        response.status = httpStatus.NO_CONTENT;
        
       return callback (null,response) ;

       
      
  

  
       
    };
  })();
  