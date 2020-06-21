cat ../xtexts.json | jq '[.[].fontName]|flatten|unique|map([.,.[7:]])' > ../fontNameList.json
