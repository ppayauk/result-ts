all: clean setup format lint test build coverage

.PHONY: setup
setup:
	mkdir -p out
	npm ci
	
.PHONY: dev
dev: 
	npm run dev

.PHONY: build
build:
	CI=true npm run build

.PHONY: lint
lint:
	npm run lint
	npm run ts

.PHONY: lint.fix
lint.fix:
	npm run lint.fix

.PHONY: format
format:
	npm run format

.PHONY: format.fix
format.fix:
	npm run format.fix

.PHONY: clean
clean:
	rm -rf out/*
	rm -rf build/*
	rm -rf node_modules/*
	rm -rf node_modules/.[a-zA-Z_-]*

.PHONY: release
release:
	npx semantic-release

.PHONY: test
test:
	npm test

.PHONY: test.watch
test.watch:
	npm run test.watch

.PHONY: coverage
coverage:
	rm -rf ./coverage
	npm run test.cov

.PHONY: debug-actions
debug-actions:
	npx act -P ubuntu-20.04=ghcr.io/catthehacker/ubuntu:act-20.04