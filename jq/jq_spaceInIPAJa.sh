cat ../xtexts.json \
| jq '[.[]|select(.fontName|test("IPA"))|select(.str|test("^[^\\s]+\\s[^\\s].*[^\\s]$"))]|map({str,pageNum,fontName})' \
| tee spaceInIPAJa.log.json \
| jq -r 'sort_by(.fontName,.pageNum)|[["fontName","pageNum","str"]]+map([.fontName,.pageNum,.str])|.[]|@tsv' \
> spaceInIPAJa.log.tsv

