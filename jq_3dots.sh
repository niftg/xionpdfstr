cat xtexts.json | jq '.[]|select(.str|test("\\.\\.\\."))|{str:.str,pageNum:.pageNum,fontName:.fontName}' | jq -s > 3dots.log.json

