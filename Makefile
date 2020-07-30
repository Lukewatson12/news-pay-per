.PHONY: init_truffle

init_truffle:
	mkdir -p ./app/src/contracts
	mkdir -p ./api/contracts
	cp ./build/contracts/* ./app/src/contracts
	cp ./build/contracts/* ./api/contracts
