var xt = require('./xtexts');
var fnl = new Map(require('./fontNameList'));
fs = require('fs');
fs.writeFileSync('xtplist.htmlfrag', [[]].concat(xt).reduce(xt2plist).map(pGen).join('\n\n'));

function xt2plist(accumulator, currentValue, index, array) {
	var item = {
		str: currentValue.str,
		fontName: fnl.get(currentValue.fontName) || "@@@",
		pageNum: currentValue.pageNum,
		transform: currentValue.transform
	};
	if(
		accumulator.length==0 ||
		maybeNewP(currentValue, array[index-1])
	){
		accumulator.push([item]);
	}else{
		accumulator[accumulator.length-1].push(item);
	}
	return accumulator;
}

function pGen(pItems) {
	if(maybeEmptyLine(pItems)){return `<p maybe-empty-line></p>`}
	var content = pItems.map(pItem=>`<span font-name="${pItem.fontName}" page-num="${pItem.pageNum}"${maybePageNum(pItem)?' maybe-page-num':''}>${pItem.str}</span>`);
	return `<p>${content.join('')}</p>`;
}

function maybeNewP(currentItem, prevItem) {
	var str = currentItem.str;
	var t5 = Math.round(currentItem.transform[5]);
	var pn = currentItem.pageNum;
	var t5prev = Math.round(prevItem.transform[5]);
	var pnprev = prevItem.pageNum;
	var regexs = [/^\s\s/, /^[「\"]/, /^\s*$/] //indent, quote, space

	return (regexs.some(re=>re.test(str))) && (Math.abs(t5prev-t5)>10||pn!=pnprev) && !maybePageNum(currentItem);
}
function maybePageNum(item) {
	return item.transform[5] < 30;
}
function maybeEmptyLine(items) {
	return items.map(v=>v.str).join('').match(/^\s*$/) != null;
}
