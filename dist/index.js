var _=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var D=_((k,u)=>{function c(t,e,n,d){Object.defineProperty(t,e,{get:n,set:d,enumerable:!0,configurable:!0})}function b(t){Object.defineProperty(t,"__esModule",{value:!0,configurable:!0})}c(u.exports,"VERSION",()=>R);c(u.exports,"DQuery",()=>N);c(u.exports,"Delegate",()=>S);c(u.exports,"VDOM",()=>O);var x={};b(x);c(x,"default",()=>N);class s{constructor(e){this.node=e}get(){return this.node}ancestor(e){return e=e||"",e===""?this.parent():new s(this.node.closest(e))}parent(){return this.node.parentNode?new s(this.node.parentNode):null}descendants(e){return e=e||"",e===""?this.children():new T(e,this.node)}children(e){return e=e||"",Array.from(this.node.childNodes).filter(n=>n.nodeType===Node.ELEMENT_NODE).filter(n=>e!==""&&n.matches(e)||e==="").map(n=>new s(n))}siblings(e){if(e=e||"",!this.node.parentNode)return[];let n=this.node.parentNode.firstChild;const d=[];for(;n;)n!==this.node&&n.nodeType===Node.ELEMENT_NODE&&(e!==""&&n.matches(e)||e==="")&&d.push(new s(n)),n=n.nextSibling;return d}next(e){e=e||"";let n=this.node.nextSibling;for(;n;){if(n.nodeType===Node.ELEMENT_NODE&&(e!==""&&n.matches(e)||e===""))return new s(n);n=n.nextSibling}return null}prev(e){e=e||"";let n=this.node.previousSibling;for(;n;){if(n.nodeType===Node.ELEMENT_NODE&&(e!==""&&n.matches(e)||e===""))return new s(n);n=n.previousSibling}return null}prepend(e){return(typeof e).toLowerCase()==="string"?this.node.insertAdjacentHTML("afterbegin",e):typeof e.dom!="undefined"?this.node.insertAdjacentElement("afterbegin",e.dom()):this.node.insertAdjacentElement("afterbegin",e),new s(this.node.childNodes[0])}append(e){return(typeof e).toLowerCase()==="string"?this.node.insertAdjacentHTML("beforeend",e):typeof e.dom!="undefined"?this.node.insertAdjacentElement("beforeend",e.dom()):this.node.insertAdjacentElement("beforeend",e),new s(this.node.childNodes[this.node.childNodes.length-1])}before(e){return typeof e.dom!="undefined"?this.node.before(e.dom()):this.node.before(e),this.prev()}after(e){return typeof e.dom!="undefined"?this.node.after(e.dom()):this.node.after(e),this.next()}render(e){if((typeof e).toLowerCase()==="string")this.node.innerHTML=e;else if(typeof e.dom!="undefined"&&typeof e.toString!="undefined")this.node.innerHTML=e.toString();else{const n=document.createElement("div");n.appendChild(e),this.node.innerHTML=n.innerHTML}return new s(this.node)}classes(){return this.node.classList}has(e){return this.node.classList.contains(e)}add(e){return this.node.classList.add(e)}remove(e){return this.node.classList.remove(e)}replace(e,n){return this.node.classList.replace(e,n)}toggle(e){return this.node.classList.toggle(e)}on(e,n){const d=this.node;return d.addEventListener(e,n,{once:!1}),{remove:function(){d.removeEventListener(e,n,{once:!1})}}}}function T(t,e){if(t instanceof Element)return new s(t);const n=[];return e=e||document,e===document?(document.querySelectorAll(t).forEach(d=>{n.push(new s(d))}),n):(t=[":scope",t].join(" "),typeof e[Symbol.iterator]!="function"&&(e=[e]),e.forEach(d=>{d.querySelectorAll(t).forEach(f=>{n.push(new s(f))})}),n)}var N=T,v={};b(v);c(v,"default",()=>S);const j=(t,e)=>function(d){const f=M(d.target,t,this);f!==null&&e.call(f,d)};var S=j;const M=(t,e,n)=>t===n?null:t.matches(e)?t:t.parentNode&&t.parentNode!==document?M(t.parentNode,e,n):null;var A={};b(A);c(A,"default",()=>O);const m=function(t,e){const n=this,d=/[\.#]/u,f=/\[([^\]]+)\]/gu,C=1;let o,a,w;e=e||{};function $(){const i={class:[],id:""},r=[];if(!d.test(t)&&!f.test(t))return{};for(;(w=f.exec(t))!==null;)r.push(w[1].split("="));t=t.replace(f,"");const h=t.split(d),H=h.shift();r.forEach((E,p,l)=>{i[l[p][0]]=l[p][1]});let y=H.length;const L=i.class;return h.forEach((E,p,l)=>{t[y]==="#"?i.id=E:L.push(E),y+=l[p].length+C}),i.class=L,i.class.length||delete i.class,i.id===""&&delete i.id,i}if(e=Object.assign(e,$()),d.test(t)?n.e=document.createElement(t.split(d).shift()):n.e=document.createElement(t),e){for(o in e)if(Object.prototype.hasOwnProperty.call(e,o))if(typeof e[o]=="object"&&typeof e[o].length=="number"&&typeof e[o].splice=="function"&&(e[o]=e[o].join(" ")),o.toString()==="class")n.e.className=e[o];else if(o.toString()==="data")for(a in e[o])Object.prototype.hasOwnProperty.call(e[o],a)&&n.e.setAttribute(`data-${a}`,e[o][a]);else n.e.setAttribute(o,e[o])}return n._=i=>{Array.isArray(i)||(i=[i]);for(let r=0,h=i.length;r<h&&typeof i[r]!="undefined";r++)typeof i[r].dom!="undefined"?n.e.appendChild(i[r].dom()):n.e.appendChild(i[r]);return n},n.h=(i,r)=>(r=r||!1,r?n.e.innerHTML=i:n.e.innerHTML+=i,n),n.t=i=>{if(typeof i=="undefined")return n.__t();const r=document.createTextNode(i);return n.e.appendChild(r),n},n.dom=()=>n.e,n.toString=()=>{const i=document.createElement("div");return i.appendChild(n.e),i.innerHTML},n.__t=()=>{const i=document.createElement("div");return i.appendChild(n.e),i.textContent||i.innerText},n},g=(t,e)=>new m(t,e);g.DOM=(...t)=>{const e=document.createDocumentFragment(),n=new m("div")._(t).dom().childNodes;for(;n.length;)e.appendChild(n[0]);return e};g.t=t=>document.createTextNode(t);g.h=t=>{const e=document.createDocumentFragment(),n=new m("div").h(t).dom().childNodes;for(;n.length;)e.appendChild(n[0]);return e};var O=g;const R="1.0.5"});export default D();

//# sourceMappingURL=index.js.map
