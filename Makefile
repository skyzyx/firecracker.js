#-------------------------------------------------------------------------------
# Running `make` will show the list of subcommands that will run.

mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
current_dir := $(dir $(mkfile_path))

#-------------------------------------------------------------------------------
# Global stuff.

# Determine which version of `echo` to use. Use version from coreutils if available.
ECHOCHECK := $(shell command -v /usr/local/opt/coreutils/libexec/gnubin/echo 2> /dev/null)
ifdef ECHOCHECK
    ECHO=/usr/local/opt/coreutils/libexec/gnubin/echo
else
    ECHO=echo
endif

#-------------------------------------------------------------------------------
# Running `make` will show the list of subcommands that will run.

all: help

.PHONY: help
## help: [help]* Prints this help message.
help:
	@ $(ECHO) "Usage:"
	@ $(ECHO) ""
	@ sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' | sed -e 's/^/ /' | \
		while IFS= read -r line; do \
			if [[ "$$line" == *"]*"* ]]; then \
				$(ECHO) -e "\033[1;33m$$line\033[0m"; \
			else \
				$(ECHO) "$$line"; \
			fi; \
		done

#-------------------------------------------------------------------------------
# Clean

.PHONY: clean-dist
## clean-dist: [clean] Removes the `dist` directory.
clean-dist:
	@ echo " "
	@ echo "=====> Cleaning the dist directory..."
	- rm -Rf ./dist

.PHONY: clean
## clean: [clean]* Runs ALL cleaning tasks.
clean: clean-dist

#-------------------------------------------------------------------------------
# Documentation

.PHONY: readme
## readme: [docs] Replaces `@@` markers in the README with consistently-formatted output.
readme:
	@ echo " "
	@ echo "=====> Updating the README..."
	cat README.md.tmpl \
	| awk -v raw="$$(stat -c %s dist/firecracker.js)" '{ gsub(/@@RAW@@/, raw); print }' \
	| awk -v gzip="$$(stat -c %s dist/firecracker.js.gz)" '{ gsub(/@@GZIP@@/, gzip); print }' \
	| awk -v brotli="$$(stat -c %s dist/firecracker.js.br)" '{ gsub(/@@BROTLI@@/, brotli); print }' \
	> README.md

.PHONY: docs
## docs: [docs]* Runs ALL documentation tasks.
docs: readme

#-------------------------------------------------------------------------------
# Linting

.PHONY: markdownlint
## markdownlint: [lint] Runs `markdownlint` (formatting, spelling) against all Markdown.
markdownlint:
	@ echo " "
	@ echo "=====> Running Markdownlint..."
	- npm run markdownlint

.PHONY: eslint
## eslint: [lint] Runs `eslint` (formatting, static analysis) against all JavaScript.
eslint:
	@ echo " "
	@ echo "=====> Running eslint..."
	- npm run lint

.PHONY: lint
## lint: [lint]* Runs ALL linting/validation tasks.
lint: markdownlint eslint

#-------------------------------------------------------------------------------
# Testing

.PHONY: test
## test: [test]* Runs ALL testing tasks.
test:
	@ echo " "
	@ echo "=====> Running tests and code coverage..."
	- npm run tests

#-------------------------------------------------------------------------------
# Git Tasks

.PHONY: tag
## tag: [release]* tags (and GPG-signs) the release
tag:
	@ if [ $$(git status -s -uall | wc -l) != 1 ]; then echo 'ERROR: Git workspace must be clean.'; exit 1; fi;

	@echo "This release will be tagged as: $$(cat ./VERSION)"
	@echo "This version should match your release. If it doesn't, re-run 'make version'."
	@echo "---------------------------------------------------------------------"
	@read -p "Press any key to continue, or press Control+C to cancel. " x;

	@echo " "
	@chag update $$(cat ./VERSION)
	@echo " "

	@echo "These are the contents of the CHANGELOG for this release. Are these correct?"
	@echo "---------------------------------------------------------------------"
	@chag contents
	@echo "---------------------------------------------------------------------"
	@echo "Are these release notes correct? If not, cancel and update CHANGELOG.md."
	@read -p "Press any key to continue, or press Control+C to cancel. " x;

	@echo " "

	git add .
	git commit -a -m "Preparing the $$(cat ./VERSION) release."
	chag tag --sign

.PHONY: version
## version: [release]* sets the version for the next release; pre-req for a release tag
version:
	@echo "Current version: $$(cat ./VERSION)"
	@read -p "Enter new version number: " nv; \
	printf "$$nv" > ./VERSION
