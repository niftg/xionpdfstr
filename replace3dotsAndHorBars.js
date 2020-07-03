const fs = require('fs');
const parser = require('node-html-parser');

const xp = parser.parse(fs.readFileSync('x.test.html').toString());
const reD3 = /\s*\.\.\.\s*/g;
//const mid3ten = '\u22ef';
const threeDots = '\u2026';
const reHorBar = /\u2015/g;
const emDash = '\u2014';

let new_xp = xp.childNodes.map(e=>{
	let matchInP = e.tagName == 'p' ? e.text.match(reD3) : false; 
	if(!matchInP||maybeDotsAreSplit(matchInP,reD3,e)){
		//if(matchInP){console.log(e)}
		return e;
	}else{
		let newElm = parser.parse(e.toString());
		newElm.childNodes[0].childNodes.forEach(cn=>{ // contained as first/only child of null-tagName root element
			let fn = cn.getAttribute('font-name');
			if(fn=='IPAm'){
				cn.set_content(cn.text.replace(reD3, threeDots));
			}
		});
		return newElm;
	}
});
new_xp.forEach(e=>{
	if(e.tagName=='p'){e.childNodes.forEach(cn=>{
		if(cn.text.match(reHorBar)){cn.set_content(cn.text.replace(reHorBar, emDash));}
	});}
});
fs.writeFileSync('x.test.replace3dotsAndHorBars.html', new_xp.map(e=>e.toString()).join(''));

function maybeDotsAreSplit(match,re,elm) {
	return match.length != elm.querySelectorAll('span').map(se=>se.text.match(re)||[]).reduce((a,c)=>a+=c.length,0)
}
