function updateWalletFields(wallet) {
	$('#address').val(bundle.addressOf(wallet))
	$('#myAddress').val(bundle.addressOf(wallet))
	$('#privateKey').val(bundle.privateKeyOf(wallet))
}

function generate() {
	updateWalletFields(bundle.generateWallet())
}

function recover() {
	const privateKey = $('#myPrivateKey').val()
	updateWalletFields(bundle.recoverWallet(privateKey))
}

function balance() {
	const address = $('#myAddress').val()
	$('#balance').val('loading...')
	bundle.balanceOf(address, (err, balance) => {
		if (err) {
			alert(err)
		$('#balance').val('error')
			return
		}
		$('#balance').val(balance)
	})
}