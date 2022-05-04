(() => {

    const httpStatus = require("http-status");
    const axios = require("axios");
  
    const getRandomJokes = async () => {
      let { data } = await axios.get("https://api.kanye.rest/", {
        headers: {
          accept: "application/json"
      
        }
       
      });
      console.log(data.quote);
      return data.quote;
    }
    module.exports = async (call, callback) => {
   let response = {}
       let joke = await getRandomJokes()
       response.joke=joke
       return callback (null,response) ;
       
      
  

  
       
    };
  })();
  