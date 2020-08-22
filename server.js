const grpc = require('grpc');
const CommandService_v1Client = require("iroha-helpers/lib/proto/endpoint_grpc_pb"); 
const QueryService_v1Client = require('iroha-helpers/lib/proto/endpoint_grpc_pb');
//const CommandService_v1Client = require('iroha-helpers/lib/proto/endpoint_grpc_pb');
const commands = require('iroha-helpers');
const queries = require('iroha-helpers');

const IROHA_ADDRESS = '0.0.0.0:8080'
const adminPriv =
  'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70'

const commandService = new CommandService_v1Client.CommandService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

const queryService = new QueryService_v1Client.QueryService_v1Client(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
)

Promise.all([
  commands.commands.setAccountDetail({
    privateKeys: [adminPriv],
    creatorAccountId: 'admin@test',
    quorum: 1,
    commandService
  }, {
    accountId: 'admin@test',
    key: 'jason',
    value: 'statham'
  }),
  queries.queries.getAccountDetail({
    privateKey: adminPriv,
    creatorAccountId: 'admin@test',
    queryService
  }, {
    accountId: 'admin@test'
  })
])
  .then(a => {console.log("RESPONSE::");console.log(a);console.log(a[0].transactionsList)})
  .catch(e => {console.error("ERROR::");console.error(e)})
