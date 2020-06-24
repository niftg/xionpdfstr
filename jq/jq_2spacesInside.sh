cat ../xtexts.json \
| jq '[.[]|select(.str|test("^[^\\s]+\\s\\s+.*[^\\s]$"))]|map({str,pageNum,fontName})' \
| tee 2spacesInside.log.json \
| jq -r 'sort_by(.fontName,.pageNum)|[["fontName","pageNum","str"]]+map([.fontName,.pageNum,.str])|.[]|@tsv' \
> 2spacesInside.log.tsv

