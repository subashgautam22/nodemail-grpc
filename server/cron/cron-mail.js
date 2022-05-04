// const cron = require('node-cron');
// const fs = require('fs');

// const nodemailer = require('nodemailer');
// const path = require('path');
// const sql =  require('../modules/simple_crud/office_detail')

// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     auth: {
//       user: 'subashgautam213@gmail.com',
//       pass: 'subash@123#'
//     }
//   });

//   // JSON to CSV Converter
//   function ConvertToCSV(objArray) {
//     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
//     var str = '';

//     for (var i = 0; i < array.length; i++) {
//         var line = '';
//         for (var index in array[i]) {
//             if (line != '') line += ','

//             line += array[i][index];
//         }

//         str += line + '\r\n';
//     }

//     return str;
// }

//   // cron.schedule('* * * * *', () => {

//   //   console.log(csvEmployees);

//   //   //parse csvEmployees to base64 = csvEmployeesInFile in base64

//   //   //send mail with attachment tyo csvEmployeesInFile

//   //   fs.writeFile("employ.csv", csvContent, (err) => {
//   //     if (err)
//   //       console.log(err);
//   //     else {
//   //       console.log("File written successfully\n");
//   //     }
//   //   });

//   // });
//   cron.schedule('* * * * * ', async () => {
//   console.log('----------xxx-----------');
//   console.log('Running Cron Job');

//   let employees =  await sql.get(call.request);
//   console.log(JSON.stringify(employees));
//   //todo parse employees to csv (csvEmployees)

//   // let csvContent = "data:text/csv;charset=utf-8,"
//   // + employees.map(e => e.join(",")).join("\n");

//   let csvEmployees = ConvertToCSV(employees.dataList);
//   console.log(csvEmployees);

//   fs.writeFile("employ.csv", csvEmployees, (err) => {
//     if (err)
//       console.log(err);
//     else {
//       console.log("File written successfully\n");

//     }
//   });

//   let messageOptions = {
//     from: 'subashgautam213@gmail.com ',
//     to: 'gautamsudip513@gmail.com',
//     subject: 'Scheduled Email',
//     text: 'Hi there. This email was automatically sent by us.',
//     attachments:
//       {
//           filename: 'employ.csv',
//           contentType: 'csv'
//       }
//   };

//   transporter.sendMail(messageOptions, () => {
//     console.log('Email successfully sent!');
//     console.log(new Date().toLocaleString());
//     }
//   );
// });

const cron = require("node-cron");
const nodemailer = require("nodemailer");
const sql = require('../modules/simple_crud/office_detail/sql')

var base64_encode = require('Base64');

// Create mail transporter.
let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'subashgautam213@gmail.com',
        pass: 'subash@123#'
      }
    });

//  JSON to CSV Converter
  function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}


// Sending emails every Wednesday.
cron.schedule('* * * * * ', async () =>  {
  console.log('---------------------');
  console.log('Running Cron Job');

  // let employees = await sql.get({},null);
  // console.log(JSON.stringify(employees));
//   //todo parse employees to csv (csvEmployees)

      const data = await sql.get({}, {});
      //  console.log(data);

      const emplys = ConvertToCSV(data);
  // //  console.log(csvEmployees);
  //     const csvtobase = getBase64(emplys);

      // const encoded = btoa(emplys);

  //  fs.writeFile("employs.csv", emplys, (err) => {
  //   if (err)
  //     console.log(err);
  //   else {
  //     console.log("File written successfully\n");

  //   }
  // });

  let messageOptions = {
    from: 'subashgautam213@gmail.com ',
    to: 'gautamsudip513@gmail.com',
    subject: 'Scheduled Email',
    text: 'hy man what up.',
    attachments:
          {
              filename: "emplysss.csv",
              content: emplys
          }

  };

  transporter.sendMail(messageOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log('Email successfully sent!');
    }
  });
});

// const sql = require('../modules/simple_crud/office_detail/sql')

// cron.schedule("* * * * *", async () => {
//   console.log("From MAIL");
//   const data = await sql.get({}, {});
//   console.log(data);
// });
