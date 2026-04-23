var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var TxSchema = new Schema({
  txid: { type: String, lowercase: true, unique: true, index: true},
  vin: { type: Array, default: [] },
  vout: { type: Array, default: [] },
  total: { type: Number, default: 0, index: true },
  timestamp: { type: Number, default: 0, index: true },
  blockhash: { type: String, index: true },
  blockindex: {type: Number, default: 0, index: true},
  tx_type: { type: String, default: null },
  op_return: { type: String, default: null },   //vin or vout
  algo: { type: String, default: null },
  ntype: { type: Number, default: null }  //Transaction Type
}, {id: false});

// Compound indexes for get_last_txs_ajax (and related queries): the previous
// definition repeated keys (total/blockindex), so only one direction survived.
TxSchema.index({ total: 1, blockindex: -1 });
TxSchema.index({ ntype: 1, blockindex: -1 });
TxSchema.index({ ntype: 1, total: 1 });

module.exports = mongoose.model('Tx', TxSchema);