const bitcoin = require("bitcoinjs-lib")
const explorers = require("bitcore-explorers")
const insight = new explorers.Insight()

function generateWallet() {
	return bitcoin.ECPair.makeRandom()
}

function recoverWallet(privateKey) {
	return bitcoin.ECPair.fromWIF(privateKey)
}

function addressOf(wallet) {
	return bitcoin.payments.p2pkh({
  		pubkey: wallet.publicKey
	}).address
}

function privateKeyOf(wallet) {
	return wallet.toWIF()
}

function balanceOf(address, callback) {
	// bitcoin 残高を取得
	insight.getUnspentUtxos(address, (err, utxos) => {
		if (err) {
			callback(err, null)
			return
		}

		if (utxos.length == 0) {
			callback(null, 0)
			return
		}

		// 単位を satoshi から btc に返還
		const balance = utxos[0].satoshis * 1e-8
		callback(null, balance)
	})
}

module.exports = {
	generateWallet,
	recoverWallet,
	addressOf,
	privateKeyOf,
	balanceOf
}
