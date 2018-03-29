.PHONY: all src/spec.json

all: src/spec.json

src/spec.json:
	wget -O src/spec.json -q https://raw.githubusercontent.com/frictionlessdata/data-quality-spec/master/spec.json
