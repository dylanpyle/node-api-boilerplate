SHELL := /bin/bash
.PHONY: install serve test lint preflight

# Install dependencies
install: preflight
	npm install

# Run a local development server
serve: preflight
	node index.js

# Run the test suite
test: preflight
	NODE_ENV=test $$(npm bin)/tape **/*/spec.js | $$(npm bin)/tap-spec

# Static analysis
lint: preflight
	$$(npm bin)/eslint . --ignore-path .gitignore

preflight:
	@(which npm > /dev/null) || (echo 'missing dependency: npm'; exit 1)
	@(which node > /dev/null) || (echo 'missing dependency: node'; exit 1)
