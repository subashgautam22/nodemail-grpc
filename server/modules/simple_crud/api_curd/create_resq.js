(() => {
  const axios = require("axios");
  const httpStatus = require("http-status");

  const postRandomJokes = async (data) => {
    const headers = {
      "Content-Type": "application/json",
    };
    let response;
    
    try {
      response = await axios.post("https://reqres.in/api/users", data, headers);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = async (call, callback) => {
   
    let response = {
      responses: {
        status: httpStatus.BAD_REQUEST,
        message: "Failed",
      },
    };

    let data = call.request;
    if (data.job == "" || data.names == "") {
      return callback(null, response);
    } else {
      let userInfo = await postRandomJokes(data);
      if (userInfo) {
        response = {
          data: userInfo,
          responses: {
            status: httpStatus.OK,
            message: "Found"  ,
          },
        };
      }
    }
    return callback(null, response);
  };
})();
