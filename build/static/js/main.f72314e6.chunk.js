(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(3),l=t(2),i=t.n(l),m="http://localhost:3001/api/persons",d=function(){return i.a.get(m).then(function(e){return e.data})},f=function(e){return i.a.post(m,e).then(function(e){return e.data})},s=function(e){return i.a.delete(m+"/"+e).then(function(e){return e.data})},b=function(e){var n=e.addName,t=e.newName,a=e.handleNameChange,u=e.newNumber,c=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},h=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"notif"},n)},v=function(e){var n=e.persons,t=e.removePerson;return n.map(function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(n){return t(e.id)}},"delete"))})},E=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),l=Object(o.a)(c,2),i=l[0],m=l[1],E=Object(a.useState)(""),p=Object(o.a)(E,2),g=p[0],w=p[1],N=Object(a.useState)(null),j=Object(o.a)(N,2),O=j[0],C=j[1];Object(a.useEffect)(function(){d().then(function(e){u(e)})},[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(h,{message:O}),r.a.createElement(b,{addName:function(e){e.preventDefault(),function(){var e=!1;return t.forEach(function(n){n.name===i&&(e=!0)}),e}()?(alert("".concat(i," is already added to phonebook")),m(""),w("")):f({name:i,number:g,id:i}).then(function(e){u(t.concat(e)),C("Added "+e.name),setTimeout(function(){C(null)},3e3),m(""),w("")})},newName:i,handleNameChange:function(e){m(e.target.value)},newNumber:g,handleNumberChange:function(e){w(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement("div",null,r.a.createElement(v,{persons:t,removePerson:function(e){var n=t.find(function(n){return n.id===e});window.confirm("Remove ".concat(n.name,"?"))&&(s(e),u(t.filter(function(n){return n.id!==e})),C("Removed ".concat(n.name)),setTimeout(function(){C(null)},3e3))}})))};t(37);c.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.f72314e6.chunk.js.map