"use strict";

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
console.log(path.resolve(process.cwd(), ".env"));
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const { dbHelper } = require("./helpers");
const packageDefinition = protoLoader.loadSync("./proto/empl_curd.rpc.proto", {
  keepCase: true,
  longs: "string",
  defaults: true,
  oneofs: true,
});
const server = new grpc.Server();
const simpleProto = grpc.loadPackageDefinition(packageDefinition);
// Grpc Methods
const simpleServiceCtl = require("./modules/simple_crud/employ_detail");
server.addService(simpleProto.example.empl_curd.rpc.SimpleCrudService.service, {
  create: simpleServiceCtl.create,
  get: simpleServiceCtl.get,
  // get_all:simpleServiceCtl.get_all,
});

const packageDefinition2 = protoLoader.loadSync(
  "./proto/office_curd.rpc.proto",
  {
    keepCase: true,
    longs: "string",
    defaults: true,
    oneofs: true,
  }
);

const simpleProto2 = grpc.loadPackageDefinition(packageDefinition2);
// Grpc Methods
const simpleServiceCt2 = require("./modules/simple_crud/office_detail");
server.addService(
  simpleProto2.example.office_curd.rpc.SimpleCrudService2.service,
  {
    create: simpleServiceCt2.create,
    get: simpleServiceCt2.get,
    get_officedetails: simpleServiceCt2.get_officedetails,
    get_id: simpleServiceCt2.get_id,
    get_pos: simpleServiceCt2.get_office_pos,
  }
);

const packageDefinition3 = protoLoader.loadSync("./proto/api_curd.rpc.proto", {
  keepCase: true,
  longs: "string",
  defaults: true,
  oneofs: true,
});

const simpleProto3 = grpc.loadPackageDefinition(packageDefinition3);
// Grpc Methods
const simpleServiceCt3 = require("./modules/simple_crud/api_curd");
server.addService(
  simpleProto3.example.api_curd.rpc.SimpleCrudService3.service,
  {
    get_joke: simpleServiceCt3.get_joke,
    create_res: simpleServiceCt3.create_res,
    patch_res: simpleServiceCt3.patch_res,
    delete_res: simpleServiceCt3.delete_res,
  }
);
require('./cron')
server.bind(
  `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
  grpc.ServerCredentials.createInsecure()
);
server.start();

if (server.started) {
  dbHelper.init();
  console.log(
    `listening to port ${process.env.GRPC_PORT}, host ${
      process.env.GRPC_HOST
    }, date: ${new Date()}`
  );
}
