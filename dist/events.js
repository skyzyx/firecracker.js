var s=(n,r)=>()=>(r||n((r={exports:{}}).exports,r),r.exports);var t=s((d,e)=>{e.exports=DOMListen=(n,r)=>function(i){const l=u(i.target,n,this);l!==null&&r.call(l,i)};const u=(n,r,c)=>n===c?null:n.matches(r)?n:n.parentNode?u(n.parentNode,r,c):null});export default t();

//# sourceMappingURL=events.js.map
