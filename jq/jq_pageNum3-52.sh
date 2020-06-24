cat ../xtexts.json | jq '[.[]|select(2<.pageNum and .pageNum<53)]' > pageNum_3-52.json
