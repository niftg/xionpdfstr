cat xtexts.json | jq '.[]|select(.str|test("^[^\\s]+\\ \\ +.*[^\\s]$"))|{str:.str,pageNum:.pageNum,fontName:.fontName}' | jq -s > 2spacesInside.log.json

