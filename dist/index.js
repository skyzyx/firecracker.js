const a=function(i,e){const n=this,s=/[\.#]/u,u=/\[([^\]]*)\]/gu,w=1;let d,h,E;e=e||{};function y(){const t={class:[],id:""},r=[];if(!s.test(i)&&!u.test(i))return{};for(;(E=u.exec(i))!==null;)r.push(E[1].split("="));i=i.replace(u,"");const f=i.split(s),T=f.shift();r.forEach((c,l,p)=>{t[p[l][0]]=p[l][1]});let g=T.length;const m=t.class;return f.forEach((c,l,p)=>{i[g]==="#"?t.id=c:m.push(c),g+=p[l].length+w}),t.class=m,t.class.length||delete t.class,t.id===""&&delete t.id,t}if(e=Object.assign(e,y()),s.test(i)?n.e=document.createElement(i.split(s).shift()):n.e=document.createElement(i),e){for(d in e)if(Object.prototype.hasOwnProperty.call(e,d))if(typeof e[d]=="object"&&typeof e[d].length=="number"&&typeof e[d].splice=="function"&&(e[d]=e[d].join(" ")),d.toString()==="class")n.e.className=e[d];else if(d.toString()==="data")for(h in e[d])Object.prototype.hasOwnProperty.call(e[d],h)&&n.e.setAttribute(`data-${h}`,e[d][h]);else n.e.setAttribute(d,e[d])}return n._=t=>{Array.isArray(t)||(t=[t]);for(let r=0,f=t.length;r<f&&typeof t[r]!="undefined";r++)typeof t[r].dom!="undefined"?n.e.appendChild(t[r].dom()):n.e.appendChild(t[r]);return n},n.h=(t,r)=>arguments.length===0?n.__h():(r=r||!1,r?n.e.innerHTML=t:n.e.innerHTML+=t,n),n.t=t=>{if(arguments.length===0)return n.__t();if(n.e.textContent)n.e.textContent=t;else{const r=document.createTextNode(t);n.e.appendChild(r)}return n},n.dom=()=>n.e,n.__h=()=>{const t=document.createElement("div");return t.appendChild(n.e),t.innerHTML},n.__t=()=>{const t=document.createElement("div");return t.appendChild(n.e),t.innerText?t.innerText:t.textContent},n};var N=DOMBuilder=(i,e)=>new a(i,e);DOMBuilder.DOM=(...i)=>{const e=document.createDocumentFragment(),n=new a("div")._(i).dom().childNodes;for(;n.length;)e.appendChild(n[0]);return e};DOMBuilder.t=i=>document.createTextNode(i);DOMBuilder.h=i=>{const e=document.createDocumentFragment(),n=new a("div").h(i).dom().childNodes;for(;n.length;)e.appendChild(n[0]);return e};class o{constructor(e){this.node=e}get(){return this.node}ancestor(e){return e=e||"",e===""?this.parent():new o(this.node.closest(e))}parent(){return this.node.parentNode?new o(this.node.parentNode):null}descendants(e){return e=e||"",e===""?this.children():new DOMQuery(e,this.node)}children(e){return e=e||"",Array.from(this.node.childNodes).filter(n=>n.nodeType===Node.ELEMENT_NODE).filter(n=>e!==""&&n.matches(e)||e==="").map(n=>new o(n))}siblings(e){if(e=e||"",!this.node.parentNode)return[];let n=this.node.parentNode.firstChild;const s=[];for(;n;)n!==this.node&&n.nodeType===Node.ELEMENT_NODE&&(e!==""&&n.matches(e)||e==="")&&s.push(new o(n)),n=n.nextSibling;return s}next(e){e=e||"";let n=this.node.nextSibling;for(;n;){if(n.nodeType===Node.ELEMENT_NODE&&(e!==""&&n.matches(e)||e===""))return new o(n);n=n.nextSibling}return null}prev(e){e=e||"";let n=this.node.previousSibling;for(;n;){if(n.nodeType===Node.ELEMENT_NODE&&(e!==""&&n.matches(e)||e===""))return new o(n);n=n.previousSibling}return null}}var x=DOMQuery=function(i,e){const n=[];return e=e||document,e===document?(document.querySelectorAll(i).forEach(s=>{n.push(new o(s))}),n):(i=[":scope",i].join(" "),typeof e[Symbol.iterator]!="function"&&(e=[e]),e.forEach(s=>{s.querySelectorAll(i).forEach(u=>{n.push(new o(u))})}),n)};

//# sourceMappingURL=index.js.map
