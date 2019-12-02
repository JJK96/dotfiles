static ?= no

all: chrome firefox

chrome: fetch

firefox: fetch
	scripts/build-firefox

fetch:
	cd packages; ../fetch

update:
	cd extensions/krabby; git pull --force; make static="$(static)"

.PHONY: build fetch
