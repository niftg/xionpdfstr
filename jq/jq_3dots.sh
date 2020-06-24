cat ../xtexts.json \
| jq '[.[]|select(.str|test("\\.\\.\\."))]|map({str,pageNum,fontName})' \
| tee 3dots.log.json \
| jq -r 'sort_by(.fontName,.pageNum)|[["fontName","pageNum","str"]]+map([.fontName,.pageNum,.str])|.[]|@tsv' \
| sed -r 's/\"/\\\"/g' \
> 3dots.log.tsv

