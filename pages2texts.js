var x = require('./xionpdf_pdfjsdocpagedata/rfno.json/xion.pdf_1-280.json.rfno.json');
var xt = x.map(p=>
	p.data.textContent.items.map(i=>
		Object.defineProperty(i,'pageNum',{value:p.pageNum,
			writable:true,enumerable:true,configurable:true})
	)
).flat();
fs = require("fs");
fs.writeFileSync("xtexts.json",JSON.stringify(xt,null,2));
