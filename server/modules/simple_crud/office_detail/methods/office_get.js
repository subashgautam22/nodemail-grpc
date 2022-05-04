(() => {
  const sql = require("../sql");
  const httpStatus = require("http-status");
  const axios = require("axios");

  // const getRandomJokes = async () => {
  //   let { data } = await axios.get("https://quotes.rest/qod", {
  //     headers: {
  //       accept: "application/json"
        
  //     }
  //   });
    // console.log(data.contents.quotes[0].quote);
  // };
  module.exports = async (call, callback) => {
    try {
    
    //  await getRandomJokes()
      let response = {
        response: { status: httpStatus.BAD_REQUEST, message: "read  Failed" },
      };

      const dbResponse = await sql.get(call.request);
      dbResponse.sort((a, b) => (a.dep_name > b.dep_name ? 1 : -1));

      if (dbResponse && dbResponse.length > 0) {
        response.dataList = dbResponse;
        response.response.status = httpStatus.OK;
        response.response.message = "sucessfully fetched";
      }

      return callback(null, response);
    } catch (error) {
      return callback(error);
    }
  };
})();
