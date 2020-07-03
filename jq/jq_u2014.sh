cat ../xtexts.json \
| jq '[.[]|select(.str|test("\u2014"))]|map({str,pageNum,fontName})' \
| tee u2014.log.json \
| jq -r 'sort_by(.fontName,.pageNum)|[["fontName","pageNum","str"]]+map([.fontName,.pageNum,.str])|.[]|@tsv' \
> u2014.log.tsv

