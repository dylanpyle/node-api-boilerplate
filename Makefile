SHELL := /bin/bash
.PHONY: install serve test lint preflight

# Install dependencies
install:
	@make preflight
	npm install

# Run a local development server
serve:
	@make preflight
	node index.js

# Run the test suite
test:
	@make preflight
	$$(npm bin)/tape **/*/spec.js | $$(npm bin)/tap-spec

# Static analysis
lint:
	@make preflight
	$$(npm bin)/eslint . --ignore-path .gitignore

preflight:
	@(which npm > /dev/null) || (echo 'missing dependency: npm'; exit 1)
	@(which node > /dev/null) || (echo 'missing dependency: node'; exit 1)
