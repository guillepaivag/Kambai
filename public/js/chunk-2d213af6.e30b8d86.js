(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d213af6"],{ae73:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[e.datosCliente.uid?n("formulario-cliente",{attrs:{operacion:"actualizar",datosCliente:e.datosCliente},on:{datosActualizados:function(t){return e.actualizarCliente(t)}}}):e._e()],1)},r=[],i=n("1da1"),o=(n("96cf"),n("d450")),c=n("4ee7"),u={name:"",data:function(){return{uidCliente:this.$route.params.uid,datosCliente:{uid:"",ci:"",nombre:"",correo:"",telefono:"",telefonoCelular:"",ciudad:"",direccion:""}}},components:{"formulario-cliente":o["a"]},methods:{actualizarCliente:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var a,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a={uidCliente:t.uidCliente,datosCliente:e},n.next=3,t.$store.dispatch("actualizarCliente",a);case 3:r=n.sent,t.$router.push("/clientes/cliente/".concat(r.uidCliente));case 5:case"end":return n.stop()}}),n)})))()}},created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=c["a"].collection("Usuarios").doc(e.$store.state.usuarios.usuario.uid).collection("Clientes").doc(e.uidCliente),t.next=3,n.get();case 3:a=t.sent,r=a.data(),e.datosCliente=r;case 6:case"end":return t.stop()}}),t)})))()}},s=u,l=n("2877"),d=Object(l["a"])(s,a,r,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d213af6.e30b8d86.js.map