﻿CKEDITOR.plugins.add("imageresize",{init:function(a){if(this.support()){this.getConfig();var b=this;a.on("instanceReady",function(){a.document.on("paste",function(d){var c=d.data.getTarget();c||(c=a.document);window.setTimeout(function(){b.resizeAll(a,c)},500);window.setTimeout(function(){b.resizeAll(a,c)},1E3);window.setTimeout(function(){b.resizeAll(a,c)},1500)});a.document.on("drop",function(d){var c=d.data.getTarget();c||(c=a.document);window.setTimeout(function(){b.resizeAll(a,c)},500);window.setTimeout(function(){b.resizeAll(a,
c)},1E3);window.setTimeout(function(){b.resizeAll(a,c)},1500)})})}},resizeAll:function(a,b,d,c){if(this.support()&&(b||(b=a.document),b&&(d||(d=this.config.maxWidth),c||(c=this.config.maxHeight),console.log(d+"x"+c),"find"in b&&"function"==typeof b.find||(b=new CKEDITOR.dom.node(b)),b&&"find"in b&&"function"==typeof b.find))){b=b.find("img");var e,g,h,f,k,l=b.count();for(k=0;k<l;k++){f=b.getItem(k);g=e=0;h="";try{e=f.$.width,g=f.$.height,h=f.getAttribute("src")}catch(m){g=e=0,h=""}h&&(e>d||g>c)&&
this.resize(a,f,d,c)}}},resize:function(a,b,d,c){if(this.support()&&b){d||(d=this.config.maxWidth);c||(c=this.config.maxHeight);console.log(d+"x"+c);var e=new Image;e.ckeditorimageresize={n:b,w:d,h:c};e.onerror=function(){this.ckeditorimageresize=null;delete this.ckeditorimageresize};e.onabort=function(){this.ckeditorimageresize=null;delete this.ckeditorimageresize};e.onload=function(){if(!(this.width<=this.ckeditorimageresize.w&&this.height<=this.ckeditorimageresize.h)){this.ckeditorimageresize.w/
this.ckeditorimageresize.h>this.width/this.height?this.ckeditorimageresize.w=this.width/this.height*this.ckeditorimageresize.h:this.ckeditorimageresize.h=Math.round(this.ckeditorimageresize.w/(this.width/this.height));var b=document.createElement("canvas");b.width=this.ckeditorimageresize.w;b.height=this.ckeditorimageresize.h;b.style.width=this.ckeditorimageresize.w+"px";b.style.height=this.ckeditorimageresize.h+"px";b.getContext("2d").drawImage(this,0,0,this.ckeditorimageresize.w,this.ckeditorimageresize.h);
if(this.ckeditorimageresize.n){/^data:image\/jpeg/i.test(this.src)||/\.(jpg|jpeg)$/i.test(this.src)?this.ckeditorimageresize.n.setAttribute("src",b.toDataURL("image/jpeg",.8)):this.ckeditorimageresize.n.setAttribute("src",b.toDataURL("image/png"));this.ckeditorimageresize.n.setAttribute("width",this.ckeditorimageresize.w);this.ckeditorimageresize.n.setAttribute("height",this.ckeditorimageresize.h);try{this.ckeditorimageresize.n.$.style.width=this.ckeditorimageresize.w+"px",this.ckeditorimageresize.n.$.style.height=
this.ckeditorimageresize.h+"px"}catch(c){}try{a.focus(),a.getSelection().scrollIntoView()}catch(d){}}this.ckeditorimageresize=null;delete this.ckeditorimageresize}};e.src=b.getAttribute("src")}},supportResult:null,support:function(){if(null===this.supportResult){this.supportResult=!1;var a=document.createElement("canvas");a&&a.getContext&&a.toDataURL&&a.getContext("2d")&&(a=a.getContext("2d"))&&a.getImageData&&a.putImageData&&(this.supportResult=!0)}return this.supportResult},config:{maxWidth:800,
maxHeight:800},getConfig:function(){if(CKEDITOR.config.imageResize)for(var a in this.config)CKEDITOR.config.imageResize[a]&&(this.config[a]=parseInt(CKEDITOR.config.imageResize[a],10),isNaN(this.config[a])||1>this.config[a])&&(this.config[a]=800)}});