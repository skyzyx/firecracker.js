var h=(o,n)=>()=>(n||o((n={exports:{}}).exports,n),n.exports);var f=h((u,d)=>{class i{constructor(n){this.node=n}get(){return this.node}ancestor(n){return n=n||"",n===""?this.parent():new i(this.node.closest(n))}parent(){return this.node.parentNode?new i(this.node.parentNode):null}descendants(n){return n=n||"",n===""?this.children():new DOMQuery(n,this.node)}children(n){return n=n||"",Array.from(this.node.childNodes).filter(e=>e.nodeType===Node.ELEMENT_NODE).filter(e=>n!==""&&e.matches(n)||n==="").map(e=>new i(e))}siblings(n){if(n=n||"",!this.node.parentNode)return[];let e=this.node.parentNode.firstChild;const t=[];for(;e;)e!==this.node&&e.nodeType===Node.ELEMENT_NODE&&(n!==""&&e.matches(n)||n==="")&&t.push(new i(e)),e=e.nextSibling;return t}next(n){n=n||"";let e=this.node.nextSibling;for(;e;){if(e.nodeType===Node.ELEMENT_NODE&&(n!==""&&e.matches(n)||n===""))return new i(e);e=e.nextSibling}return null}prev(n){n=n||"";let e=this.node.previousSibling;for(;e;){if(e.nodeType===Node.ELEMENT_NODE&&(n!==""&&e.matches(n)||n===""))return new i(e);e=e.previousSibling}return null}prepend(n){return typeof n.dom!="undefined"?this.node.insertAdjacentElement("afterbegin",n.dom()):this.node.insertAdjacentElement("afterbegin",n),new i(this.node.childNodes[0])}append(n){return typeof n.dom!="undefined"?this.node.insertAdjacentElement("beforeend",n.dom()):this.node.insertAdjacentElement("beforeend",n),new i(this.node.childNodes[this.node.childNodes.length-1])}before(n){return typeof n.dom!="undefined"?this.node.before(n.dom()):this.node.before(n),this.prev()}after(n){return typeof n.dom!="undefined"?this.node.after(n.dom()):this.node.after(n),this.next()}on(n,e){const t=this.node;return t.addEventListener(n,e,{once:!1}),{remove:function(){t.removeEventListener(n,e,{once:!1})}}}}d.exports=DOMQuery=function(o,n){if(o instanceof Element)return new i(o);const e=[];return n=n||document,n===document?(document.querySelectorAll(o).forEach(t=>{e.push(new i(t))}),e):(o=[":scope",o].join(" "),typeof n[Symbol.iterator]!="function"&&(n=[n]),n.forEach(t=>{t.querySelectorAll(o).forEach(r=>{e.push(new i(r))})}),e)}});export default f();

//# sourceMappingURL=query.js.map