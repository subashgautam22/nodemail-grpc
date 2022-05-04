"use strict";

const get_office_pos = require("./sql/get_office_pos");

(() => {
  module.exports = {
    create: require("./methods/office_create"),
  
    get: require("./methods/office_get"),
    get_id: require("./methods/office_get_id"),
    get_officedetails:require("./methods/employ_get_officedetail"),
    get_office_pos:require("./methods/office_search_pos"),
    // get_joke:require("./methods/jokeof_day"),
    // create_res:require("./methods/create_resq"),
    // patch_res:require("./methods/patch_resq"),
    // delete_res:require("./methods/delete_resq"),
  
   
   
  };
})();
