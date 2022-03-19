var D=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var P=D((F,u)=>{function c(t,e,n,d){Object.defineProperty(t,e,{get:n,set:d,enumerable:!0,configurable:!0})}function g(t){Object.defineProperty(t,"__esModule",{value:!0,configurable:!0})}c(u.exports,"VERSION",()=>j);c(u.exports,"DQuery",()=>T);c(u.exports,"Delegate",()=>$);c(u.exports,"VDOM",()=>A);var N={};g(N);c(N,"default",()=>T);class s{constructor(e){this.node=e}get(){return this.node}ancestor(e){return e=e||"",e===""?this.parent():new s(this.node.closest(e))}parent(){return this.node.parentNode?new s(this.node.parentNode):null}descendants(e){return e=e||"",e===""?this.children():new v(e,this.node)}children(e){return e=e||"",Array.from(this.node.childNodes).filter(n=>n.nodeType===Node.ELEMENT_NODE).filter(n=>e!==""&&n.matches(e)||e==="").map(n=>new s(n))}siblings(e){if(e=e||"",!this.node.parentNode)return[];let n=this.node.parentNode.firstChild;const d=[];for(;n;)n!==this.node&&n.nodeType===Node.ELEMENT_NODE&&(e!==""&&n.matches(e)||e==="")&&d.push(new s(n)),n=n.nextSibling;return d}next(e){e=e||"";let n=this.node.nextSibling;for(;n;){if(n.nodeType===Node.ELEMENT_NODE&&(e!==""&&n.matches(e)||e===""))return new s(n);n=n.nextSibling}return null}prev(e){e=e||"";let n=this.node.previousSibling;for(;n;){if(n.nodeType===Node.ELEMENT_NODE&&(e!==""&&n.matches(e)||e===""))return new s(n);n=n.previousSibling}return null}prepend(e){return typeof e.dom!="undefined"?this.node.insertAdjacentElement("afterbegin",e.dom()):this.node.insertAdjacentElement("afterbegin",e),new s(this.node.childNodes[0])}append(e){return typeof e.dom!="undefined"?this.node.insertAdjacentElement("beforeend",e.dom()):this.node.insertAdjacentElement("beforeend",e),new s(this.node.childNodes[this.node.childNodes.length-1])}before(e){return typeof e.dom!="undefined"?this.node.before(e.dom()):this.node.before(e),this.prev()}after(e){return typeof e.dom!="undefined"?this.node.after(e.dom()):this.node.after(e),this.next()}classes(){return this.node.classList}has(e){return this.node.classList.contains(e)}add(e){return this.node.classList.add(e)}remove(e){return this.node.classList.remove(e)}replace(e,n){return this.node.classList.replace(e,n)}toggle(e){return this.node.classList.toggle(e)}on(e,n){const d=this.node;return d.addEventListener(e,n,{once:!1}),{remove:function(){d.removeEventListener(e,n,{once:!1})}}}}function v(t,e){if(t instanceof Element)return new s(t);const n=[];return e=e||document,e===document?(document.querySelectorAll(t).forEach(d=>{n.push(new s(d))}),n):(t=[":scope",t].join(" "),typeof e[Symbol.iterator]!="function"&&(e=[e]),e.forEach(d=>{d.querySelectorAll(t).forEach(f=>{n.push(new s(f))})}),n)}var T=v,S={};g(S);c(S,"default",()=>$);const R=(t,e)=>function(d){const f=L(d.target,t,this);f!==null&&e.call(f,d)};var $=R;const L=(t,e,n)=>t===n?null:t.matches(e)?t:t.parentNode?L(t.parentNode,e,n):null;var O={};g(O);c(O,"default",()=>A);const m=function(t,e){const n=this,d=/[\.#]/u,f=/\[([^\]]+)\]/gu,C=1;let o,a,x;e=e||{};function M(){const i={class:[],id:""},r=[];if(!d.test(t)&&!f.test(t))return{};for(;(x=f.exec(t))!==null;)r.push(x[1].split("="));t=t.replace(f,"");const h=t.split(d),_=h.shift();r.forEach((b,l,p)=>{i[p[l][0]]=p[l][1]});let w=_.length;const y=i.class;return h.forEach((b,l,p)=>{t[w]==="#"?i.id=b:y.push(b),w+=p[l].length+C}),i.class=y,i.class.length||delete i.class,i.id===""&&delete i.id,i}if(e=Object.assign(e,M()),d.test(t)?n.e=document.createElement(t.split(d).shift()):n.e=document.createElement(t),e){for(o in e)if(Object.prototype.hasOwnProperty.call(e,o))if(typeof e[o]=="object"&&typeof e[o].length=="number"&&typeof e[o].splice=="function"&&(e[o]=e[o].join(" ")),o.toString()==="class")n.e.className=e[o];else if(o.toString()==="data")for(a in e[o])Object.prototype.hasOwnProperty.call(e[o],a)&&n.e.setAttribute(`data-${a}`,e[o][a]);else n.e.setAttribute(o,e[o])}return n._=i=>{Array.isArray(i)||(i=[i]);for(let r=0,h=i.length;r<h&&typeof i[r]!="undefined";r++)typeof i[r].dom!="undefined"?n.e.appendChild(i[r].dom()):n.e.appendChild(i[r]);return n},n.h=(i,r)=>(r=r||!1,r?n.e.innerHTML=i:n.e.innerHTML+=i,n),n.t=i=>{if(typeof i=="undefined")return n.__t();const r=document.createTextNode(i);return n.e.appendChild(r),n},n.dom=()=>n.e,n.toString=()=>{const i=document.createElement("div");return i.appendChild(n.e),i.innerHTML},n.__t=()=>{const i=document.createElement("div");return i.appendChild(n.e),i.textContent||i.innerText},n},E=(t,e)=>new m(t,e);E.DOM=(...t)=>{const e=document.createDocumentFragment(),n=new m("div")._(t).dom().childNodes;for(;n.length;)e.appendChild(n[0]);return e};E.t=t=>document.createTextNode(t);E.h=t=>{const e=document.createDocumentFragment(),n=new m("div").h(t).dom().childNodes;for(;n.length;)e.appendChild(n[0]);return e};var A=E;const j="1.0.0"});export default P();

//# sourceMappingURL=index.js.map
