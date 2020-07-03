cat ../xtexts.json \
| jq '[.[]|select(.str|test("\u2015"))]|map({str,pageNum,fontName})' \
| tee u2015.log.json \
| jq -r 'sort_by(.fontName,.pageNum)|[["fontName","pageNum","str"]]+map([.fontName,.pageNum,.str])|.[]|@tsv' \
> u2015.log.tsv

