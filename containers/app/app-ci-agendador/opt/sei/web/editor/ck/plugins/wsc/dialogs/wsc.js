﻿/*
 Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function(){function u(a){return a&&a.domId&&a.getInputElement().$?a.getInputElement():a&&a.$?a:!1}function D(a){if(!a)throw"Languages-by-groups list are required for construct selectbox";var c=[],d="",e;for(e in a)for(var g in a[e]){var f=a[e][g];"en_US"==f?d=f:c.push(f)}c.sort();d&&c.unshift(d);return{getCurrentLangGroup:function(c){a:{for(var d in a)for(var e in a[d])if(e.toUpperCase()===c.toUpperCase()){c=d;break a}c=""}return c},setLangList:function(){var c={},d;for(d in a)for(var e in a[d])c[a[d][e]]=
e;return c}()}}var f=function(){var a=function(a,b,e){e=e||{};var g=e.expires;if("number"==typeof g&&g){var f=new Date;f.setTime(f.getTime()+1E3*g);g=e.expires=f}g&&g.toUTCString&&(e.expires=g.toUTCString());b=encodeURIComponent(b);a=a+"\x3d"+b;for(var h in e)b=e[h],a+="; "+h,!0!==b&&(a+="\x3d"+b);document.cookie=a};return{postMessage:{init:function(a){window.addEventListener?window.addEventListener("message",a,!1):window.attachEvent("onmessage",a)},send:function(a){var b=Object.prototype.toString,
e=a.fn||null,g=a.id||"",f=a.target||window,h=a.message||{id:g};a.message&&"[object Object]"==b.call(a.message)&&(a.message.id?a.message.id:a.message.id=g,h=a.message);a=window.JSON.stringify(h,e);f.postMessage(a,"*")},unbindHandler:function(a){window.removeEventListener?window.removeEventListener("message",a,!1):window.detachEvent("onmessage",a)}},hash:{create:function(){},parse:function(){}},cookie:{set:a,get:function(a){return(a=document.cookie.match(new RegExp("(?:^|; )"+a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,
"\\$1")+"\x3d([^;]*)")))?decodeURIComponent(a[1]):void 0},remove:function(c){a(c,"",{expires:-1})}},misc:{findFocusable:function(a){var b=null;a&&(b=a.find("a[href], area[href], input, select, textarea, button, *[tabindex], *[contenteditable]"));return b},isVisible:function(a){var b;(b=0===a.offsetWidth||0==a.offsetHeight)||(b="none"===(document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(a,null).display:a.currentStyle?a.currentStyle.display:a.style.display));
return!b},hasClass:function(a,b){return!(!a.className||!a.className.match(new RegExp("(\\s|^)"+b+"(\\s|$)")))}}}}(),a=a||{};a.TextAreaNumber=null;a.load=!0;a.cmd={SpellTab:"spell",Thesaurus:"thes",GrammTab:"grammar"};a.dialog=null;a.optionNode=null;a.selectNode=null;a.grammerSuggest=null;a.textNode={};a.iframeMain=null;a.dataTemp="";a.div_overlay=null;a.textNodeInfo={};a.selectNode={};a.selectNodeResponce={};a.langList=null;a.langSelectbox=null;a.banner="";a.show_grammar=null;a.div_overlay_no_check=
null;a.targetFromFrame={};a.onLoadOverlay=null;a.LocalizationComing={};a.OverlayPlace=null;a.LocalizationButton={ChangeTo:{instance:null,text:"Change to"},ChangeAll:{instance:null,text:"Change All"},IgnoreWord:{instance:null,text:"Ignore word"},IgnoreAllWords:{instance:null,text:"Ignore all words"},Options:{instance:null,text:"Options",optionsDialog:{instance:null}},AddWord:{instance:null,text:"Add word"},FinishChecking:{instance:null,text:"Finish Checking"}};a.LocalizationLabel={ChangeTo:{instance:null,
text:"Change to"},Suggestions:{instance:null,text:"Suggestions"}};var E=function(b){var c,d;for(d in b)c=b[d].instance.getElement().getFirst()||b[d].instance.getElement(),c.setText(a.LocalizationComing[d])},F=function(b){for(var c in b){if(!b[c].instance.setLabel)break;b[c].instance.setLabel(a.LocalizationComing[c])}},l,v;a.framesetHtml=function(b){return"\x3ciframe id\x3d"+a.iframeNumber+"_"+b+' frameborder\x3d"0" allowtransparency\x3d"1" style\x3d"width:100%;border: 1px solid #AEB3B9;overflow: auto;background:#fff; border-radius: 3px;"\x3e\x3c/iframe\x3e'};
a.setIframe=function(b,c){var d;d=a.framesetHtml(c);var e=a.iframeNumber+"_"+c;b.getElement().setHtml(d);d=document.getElementById(e);d=d.contentWindow?d.contentWindow:d.contentDocument.document?d.contentDocument.document:d.contentDocument;d.document.open();d.document.write('\x3c!DOCTYPE html\x3e\x3chtml\x3e\x3chead\x3e\x3cmeta charset\x3d"UTF-8"\x3e\x3ctitle\x3eiframe\x3c/title\x3e\x3cstyle\x3ehtml,body{margin: 0;height: 100%;font: 13px/1.555 "Trebuchet MS", sans-serif;}a{color: #888;font-weight: bold;text-decoration: none;border-bottom: 1px solid #888;}.main-box {color:#252525;padding: 3px 5px;text-align: justify;}.main-box p{margin: 0 0 14px;}.main-box .cerr{color: #f00000;border-bottom-color: #f00000;}\x3c/style\x3e\x3c/head\x3e\x3cbody\x3e\x3cdiv id\x3d"content" class\x3d"main-box"\x3e\x3c/div\x3e\x3ciframe src\x3d"" frameborder\x3d"0" id\x3d"spelltext" name\x3d"spelltext" style\x3d"display:none; width: 100%" \x3e\x3c/iframe\x3e\x3ciframe src\x3d"" frameborder\x3d"0" id\x3d"loadsuggestfirst" name\x3d"loadsuggestfirst" style\x3d"display:none; width: 100%" \x3e\x3c/iframe\x3e\x3ciframe src\x3d"" frameborder\x3d"0" id\x3d"loadspellsuggestall" name\x3d"loadspellsuggestall" style\x3d"display:none; width: 100%" \x3e\x3c/iframe\x3e\x3ciframe src\x3d"" frameborder\x3d"0" id\x3d"loadOptionsForm" name\x3d"loadOptionsForm" style\x3d"display:none; width: 100%" \x3e\x3c/iframe\x3e\x3cscript\x3e(function(window) {var ManagerPostMessage \x3d function() {var _init \x3d function(handler) {if (document.addEventListener) {window.addEventListener("message", handler, false);} else {window.attachEvent("onmessage", handler);};};var _sendCmd \x3d function(o) {var str,type \x3d Object.prototype.toString,fn \x3d o.fn || null,id \x3d o.id || "",target \x3d o.target || window,message \x3d o.message || { "id": id };if (o.message \x26\x26 type.call(o.message) \x3d\x3d "[object Object]") {(o.message["id"]) ? o.message["id"] : o.message["id"] \x3d id;message \x3d o.message;};str \x3d JSON.stringify(message, fn);target.postMessage(str, "*");};return {init: _init,send: _sendCmd};};var manageMessageTmp \x3d new ManagerPostMessage;var appString \x3d (function(){var spell \x3d parent.CKEDITOR.config.wsc.DefaultParams.scriptPath;var serverUrl \x3d parent.CKEDITOR.config.wsc.DefaultParams.serviceHost;return serverUrl + spell;})();function loadScript(src, callback) {var scriptTag \x3d document.createElement("script");scriptTag.type \x3d "text/javascript";callback ? callback : callback \x3d function() {};if(scriptTag.readyState) {scriptTag.onreadystatechange \x3d function() {if (scriptTag.readyState \x3d\x3d "loaded" ||scriptTag.readyState \x3d\x3d "complete") {scriptTag.onreadystatechange \x3d null;setTimeout(function(){scriptTag.parentNode.removeChild(scriptTag)},1);callback();}};}else{scriptTag.onload \x3d function() {setTimeout(function(){scriptTag.parentNode.removeChild(scriptTag)},1);callback();};};scriptTag.src \x3d src;document.getElementsByTagName("head")[0].appendChild(scriptTag);};window.onload \x3d function(){loadScript(appString, function(){manageMessageTmp.send({"id": "iframeOnload","target": window.parent});});}})(this);\x3c/script\x3e\x3c/body\x3e\x3c/html\x3e');
d.document.close()};a.setCurrentIframe=function(b){a.setIframe(a.dialog._.contents[b].Content,b)};a.setHeightBannerFrame=function(){var b=a.dialog.getContentElement("SpellTab","banner").getElement(),c=a.dialog.getContentElement("GrammTab","banner").getElement(),d=a.dialog.getContentElement("Thesaurus","banner").getElement();b.setStyle("height","90px");c.setStyle("height","90px");d.setStyle("height","90px")};a.setHeightFrame=function(){document.getElementById(a.iframeNumber+"_"+a.dialog._.currentTabId).style.height=
"240px"};a.sendData=function(b){var c=b._.currentTabId,d=b._.contents[c].Content,e,g;a.setIframe(d,c);var f=function(f){f=f||window.event;f.data.getTarget().is("a")&&c!=b._.currentTabId&&(c=b._.currentTabId,d=b._.contents[c].Content,e=a.iframeNumber+"_"+c,a.div_overlay.setEnable(),d.getElement().getChildCount()?z(a.targetFromFrame[e],a.cmd[c]):(a.setIframe(d,c),g=document.getElementById(e),a.targetFromFrame[e]=g.contentWindow))};b.parts.tabs.removeListener("click",f);b.parts.tabs.on("click",f)};a.buildSelectLang=
function(a){var c=new CKEDITOR.dom.element("div"),d=new CKEDITOR.dom.element("select");a="wscLang"+a;c.addClass("cke_dialog_ui_input_select");c.setAttribute("role","presentation");c.setStyles({height:"auto",position:"absolute",right:"0",top:"-1px",width:"160px","white-space":"normal"});d.setAttribute("id",a);d.addClass("cke_dialog_ui_input_select");d.setStyles({width:"160px"});c.append(d);return c};a.buildOptionLang=function(b,c){var d=document.getElementById("wscLang"+c),e=document.createDocumentFragment(),
f,k,h=[];if(0===d.options.length){for(f in b)h.push([f,b[f]]);h.sort();for(var m=0;m<h.length;m++)f=document.createElement("option"),f.setAttribute("value",h[m][1]),k=document.createTextNode(h[m][0]),f.appendChild(k),h[m][1]==a.selectingLang&&f.setAttribute("selected","selected"),e.appendChild(f);d.appendChild(e)}};a.buildOptionSynonyms=function(b){b=a.selectNodeResponce[b];var c=u(a.selectNode.synonyms);a.selectNode.synonyms.clear();for(var d=0;d<b.length;d++){var e=document.createElement("option");
e.text=b[d];e.value=b[d];c.$.add(e,d)}a.selectNode.synonyms.getInputElement().$.firstChild.selected=!0;a.textNode.Thesaurus.setValue(a.selectNode.synonyms.getInputElement().getValue())};var w=function(a){var c=document,d=a.target||c.body,e=a.id||"overlayBlock",f=a.opacity||"0.9";a=a.background||"#f1f1f1";var k=c.getElementById(e),h=k||c.createElement("div");h.style.cssText="position: absolute;top:30px;bottom:41px;left:1px;right:1px;z-index: 10020;padding:0;margin:0;background:"+a+";opacity: "+f+";filter: alpha(opacity\x3d"+
100*f+");display: none;";h.id=e;k||d.appendChild(h);return{setDisable:function(){h.style.display="none"},setEnable:function(){h.style.display="block"}}},G=function(b,c,d){var e=new CKEDITOR.dom.element("div"),f=new CKEDITOR.dom.element("input"),k=new CKEDITOR.dom.element("label"),h="wscGrammerSuggest"+b+"_"+c;e.addClass("cke_dialog_ui_input_radio");e.setAttribute("role","presentation");e.setStyles({width:"97%",padding:"5px","white-space":"normal"});f.setAttributes({type:"radio",value:c,name:"wscGrammerSuggest",
id:h});f.setStyles({"float":"left"});f.on("click",function(b){a.textNode.GrammTab.setValue(b.sender.getValue())});d?f.setAttribute("checked",!0):!1;f.addClass("cke_dialog_ui_radio_input");k.appendText(b);k.setAttribute("for",h);k.setStyles({display:"block","line-height":"16px","margin-left":"18px","white-space":"normal"});e.append(f);e.append(k);return e},A=function(a){a=a||"true";null!==a&&"false"==a&&p()},q=function(b){var c=new D(b);b="wscLang"+a.dialog.getParentEditor().name;b=document.getElementById(b);
var d=a.iframeNumber+"_"+a.dialog._.currentTabId;a.buildOptionLang(c.setLangList,a.dialog.getParentEditor().name);B[c.getCurrentLangGroup(a.selectingLang)]();A(a.show_grammar);b.onchange=function(b){B[c.getCurrentLangGroup(this.value)]();A(a.show_grammar);a.div_overlay.setEnable();a.selectingLang=this.value;f.postMessage.send({message:{changeLang:a.selectingLang,text:a.dataTemp},target:a.targetFromFrame[d],id:"selectionLang_outer__page"})}},H=function(b){if("no_any_suggestions"==b){b="No suggestions";
a.LocalizationButton.ChangeTo.instance.disable();a.LocalizationButton.ChangeAll.instance.disable();var c=function(b){b=a.LocalizationButton[b].instance;b.getElement().hasClass("cke_disabled")?b.getElement().setStyle("color","#a0a0a0"):b.disable()};c("ChangeTo");c("ChangeAll")}else a.LocalizationButton.ChangeTo.instance.enable(),a.LocalizationButton.ChangeAll.instance.enable(),a.LocalizationButton.ChangeTo.instance.getElement().setStyle("color","#333"),a.LocalizationButton.ChangeAll.instance.getElement().setStyle("color",
"#333");return b},J={iframeOnload:function(b){a.div_overlay.setEnable();b=a.dialog._.currentTabId;z(a.targetFromFrame[a.iframeNumber+"_"+b],a.cmd[b])},suggestlist:function(b){delete b.id;a.div_overlay_no_check.setDisable();x();q(a.langList);var c=H(b.word),d="";c instanceof Array&&(c=b.word[0]);d=c=c.split(",");a.textNode.SpellTab.setValue(d[0]);b=u(v);v.clear();for(c=0;c<d.length;c++){var e=document.createElement("option");e.text=d[c];e.value=d[c];b.$.add(e,c)}n();a.div_overlay.setDisable()},grammerSuggest:function(b){delete b.id;
delete b.mocklangs;x();q(a.langList);var c=b.grammSuggest[0];a.grammerSuggest.getElement().setHtml("");a.textNode.GrammTab.reset();a.textNode.GrammTab.setValue(c);a.textNodeInfo.GrammTab.getElement().setHtml("");a.textNodeInfo.GrammTab.getElement().setText(b.info);b=b.grammSuggest;for(var c=b.length,d=!0,e=0;e<c;e++)a.grammerSuggest.getElement().append(G(b[e],b[e],d)),d=!1;n();a.div_overlay.setDisable()},thesaurusSuggest:function(b){delete b.id;delete b.mocklangs;x();q(a.langList);a.selectNodeResponce=
b;a.textNode.Thesaurus.reset();var c=u(a.selectNode.categories),d=0;a.selectNode.categories.clear();for(var e in b)b=document.createElement("option"),b.text=e,b.value=e,c.$.add(b,d),d++;c=a.selectNode.categories.getInputElement().getChildren().$[0].value;a.selectNode.categories.getInputElement().getChildren().$[0].selected=!0;a.buildOptionSynonyms(c);n();a.div_overlay.setDisable()},finish:function(b){delete b.id;I();b=a.dialog.getContentElement(a.dialog._.currentTabId,"BlockFinishChecking").getElement();
b.removeStyle("display");b.removeStyle("position");b.removeStyle("left");b.show();a.div_overlay.setDisable()},settext:function(b){delete b.id;a.dialog.getParentEditor().getCommand("checkspell");var c=a.dialog.getParentEditor();try{c.focus()}catch(d){}c.setData(b.text,function(){a.dataTemp="";c.unlockSelection();c.fire("saveSnapshot");a.dialog.hide()})},ReplaceText:function(b){delete b.id;a.div_overlay.setEnable();a.dataTemp=b.text;a.selectingLang=b.currentLang;window.setTimeout(function(){try{a.div_overlay.setDisable()}catch(b){}},
500);E(a.LocalizationButton);F(a.LocalizationLabel)},options_checkbox_send:function(b){delete b.id;b={osp:f.cookie.get("osp"),udn:f.cookie.get("udn"),cust_dic_ids:a.cust_dic_ids};f.postMessage.send({message:b,target:a.targetFromFrame[a.iframeNumber+"_"+a.dialog._.currentTabId],id:"options_outer__page"})},getOptions:function(b){var c=b.DefOptions.udn;a.LocalizationComing=b.DefOptions.localizationButtonsAndText;a.show_grammar=b.show_grammar;a.langList=b.lang;if(a.bnr=b.bannerId){a.setHeightBannerFrame();
var d=b.banner;a.dialog.getContentElement(a.dialog._.currentTabId,"banner").getElement().setHtml(d)}else a.setHeightFrame();"undefined"==c&&(a.userDictionaryName?(c=a.userDictionaryName,d={osp:f.cookie.get("osp"),udn:a.userDictionaryName,cust_dic_ids:a.cust_dic_ids,id:"options_dic_send",udnCmd:"create"},f.postMessage.send({message:d,target:a.targetFromFrame[void 0]})):c="");f.cookie.set("osp",b.DefOptions.osp);f.cookie.set("udn",c);f.cookie.set("cust_dic_ids",b.DefOptions.cust_dic_ids);f.postMessage.send({id:"giveOptions"})},
options_dic_send:function(b){b={osp:f.cookie.get("osp"),udn:f.cookie.get("udn"),cust_dic_ids:a.cust_dic_ids,id:"options_dic_send",udnCmd:f.cookie.get("udnCmd")};f.postMessage.send({message:b,target:a.targetFromFrame[a.iframeNumber+"_"+a.dialog._.currentTabId]})},data:function(a){delete a.id},giveOptions:function(){},setOptionsConfirmF:function(){},setOptionsConfirmT:function(){l.setValue("")},clickBusy:function(){a.div_overlay.setEnable()},suggestAllCame:function(){a.div_overlay.setDisable();a.div_overlay_no_check.setDisable()},
TextCorrect:function(){q(a.langList)}},C=function(a){a=a||window.event;if((a=window.JSON.parse(a.data))&&a.id)J[a.id](a)},z=function(b,c,d,e){c=c||CKEDITOR.config.wsc_cmd;d=d||a.dataTemp;f.postMessage.send({message:{customerId:a.wsc_customerId,text:d,txt_ctrl:a.TextAreaNumber,cmd:c,cust_dic_ids:a.cust_dic_ids,udn:a.userDictionaryName,slang:a.selectingLang,reset_suggest:e||!1},target:b,id:"data_outer__page"});a.div_overlay.setEnable()},B={superset:function(){a.dialog.showPage("Thesaurus");a.dialog.showPage("GrammTab");
r()},usual:function(){y();p();r()},rtl:function(){y();p();r()}},K=function(b){var c=new function(a){var b={};return{getCmdByTab:function(c){for(var f in a)b[a[f]]=f;return b[c]}}}(a.cmd);b.selectPage(c.getCmdByTab(CKEDITOR.config.wsc_cmd));a.sendData(b)},y=function(){a.dialog.hidePage("Thesaurus")},p=function(){a.dialog.hidePage("GrammTab")},r=function(){a.dialog.showPage("SpellTab")},n=function(){var b=a.dialog.getContentElement(a.dialog._.currentTabId,"bottomGroup").getElement();b.removeStyle("display");
b.removeStyle("position");b.removeStyle("left");b.show()},I=function(){var b=a.dialog.getContentElement(a.dialog._.currentTabId,"bottomGroup").getElement(),c=document.activeElement,d;b.setStyles({display:"block",position:"absolute",left:"-9999px"});setTimeout(function(){b.removeStyle("display");b.removeStyle("position");b.removeStyle("left");b.hide();a.dialog._.editor.focusManager.currentActive.focusNext();d=f.misc.findFocusable(a.dialog.parts.contents);if(f.misc.hasClass(c,"cke_dialog_tab")||f.misc.hasClass(c,
"cke_dialog_contents_body")||!f.misc.isVisible(c))for(var e=0,g;e<d.count();e++){if(g=d.getItem(e),f.misc.isVisible(g.$)){try{g.$.focus()}catch(k){}break}}else try{c.focus()}catch(h){}},0)},x=function(){var b=a.dialog.getContentElement(a.dialog._.currentTabId,"BlockFinishChecking").getElement(),c=document.activeElement,d;b.setStyles({display:"block",position:"absolute",left:"-9999px"});setTimeout(function(){b.removeStyle("display");b.removeStyle("position");b.removeStyle("left");b.hide();a.dialog._.editor.focusManager.currentActive.focusNext();
d=f.misc.findFocusable(a.dialog.parts.contents);if(f.misc.hasClass(c,"cke_dialog_tab")||f.misc.hasClass(c,"cke_dialog_contents_body")||!f.misc.isVisible(c))for(var e=0,g;e<d.count();e++){if(g=d.getItem(e),f.misc.isVisible(g.$)){try{g.$.focus()}catch(k){}break}}else try{c.focus()}catch(h){}},0)};CKEDITOR.dialog.add("checkspell",function(b){var c=function(d){this.getElement().focus();a.div_overlay.setEnable();d=a.dialog._.currentTabId;var c=a.iframeNumber+"_"+d,g=a.textNode[d].getValue(),k=this.getElement().getAttribute("title-cmd");
f.postMessage.send({message:{cmd:k,tabId:d,new_word:g},target:a.targetFromFrame[c],id:"cmd_outer__page"});"ChangeTo"!=k&&"ChangeAll"!=k||b.fire("saveSnapshot");"FinishChecking"==k&&b.config.wsc_onFinish.call(CKEDITOR.document.getWindow().getFrame())};return{title:b.config.wsc_dialogTitle||b.lang.wsc.title,minWidth:560,minHeight:444,buttons:[CKEDITOR.dialog.cancelButton],onLoad:function(){a.dialog=this;y();p();r()},onShow:function(){b.lockSelection(b.getSelection());a.TextAreaNumber="cke_textarea_"+
CKEDITOR.currentInstance.name;f.postMessage.init(C);a.dataTemp=CKEDITOR.currentInstance.getData();a.OverlayPlace=a.dialog.parts.tabs.getParent().$;if(CKEDITOR&&CKEDITOR.config){a.wsc_customerId=b.config.wsc_customerId;a.cust_dic_ids=b.config.wsc_customDictionaryIds;a.userDictionaryName=b.config.wsc_userDictionaryName;a.defaultLanguage=CKEDITOR.config.defaultLanguage;var c="file:"==document.location.protocol?"http:":document.location.protocol;CKEDITOR.scriptLoader.load(b.config.wsc_customLoaderScript||
c+"//loader.webspellchecker.net/sproxy_fck/sproxy.php?plugin\x3dfck2\x26customerid\x3d"+a.wsc_customerId+"\x26cmd\x3dscript\x26doc\x3dwsc\x26schema\x3d22",function(c){CKEDITOR.config&&CKEDITOR.config.wsc&&CKEDITOR.config.wsc.DefaultParams?(a.serverLocationHash=CKEDITOR.config.wsc.DefaultParams.serviceHost,a.logotype=CKEDITOR.config.wsc.DefaultParams.logoPath,a.loadIcon=CKEDITOR.config.wsc.DefaultParams.iconPath,a.loadIconEmptyEditor=CKEDITOR.config.wsc.DefaultParams.iconPathEmptyEditor,a.LangComparer=
new CKEDITOR.config.wsc.DefaultParams._SP_FCK_LangCompare):(a.serverLocationHash=DefaultParams.serviceHost,a.logotype=DefaultParams.logoPath,a.loadIcon=DefaultParams.iconPath,a.loadIconEmptyEditor=DefaultParams.iconPathEmptyEditor,a.LangComparer=new _SP_FCK_LangCompare);a.pluginPath=CKEDITOR.getUrl(b.plugins.wsc.path);a.iframeNumber=a.TextAreaNumber;a.templatePath=a.pluginPath+"dialogs/tmp.html";a.LangComparer.setDefaulLangCode(a.defaultLanguage);a.currentLang=b.config.wsc_lang||a.LangComparer.getSPLangCode(b.langCode);
a.selectingLang=a.currentLang;a.div_overlay=new w({opacity:"1",background:"#fff url("+a.loadIcon+") no-repeat 50% 50%",target:a.OverlayPlace});var d=a.dialog.parts.tabs.getId(),d=CKEDITOR.document.getById(d);d.setStyle("width","97%");d.getElementsByTag("DIV").count()||d.append(a.buildSelectLang(a.dialog.getParentEditor().name));a.div_overlay_no_check=new w({opacity:"1",id:"no_check_over",background:"#fff url("+a.loadIconEmptyEditor+") no-repeat 50% 50%",target:a.OverlayPlace});c&&(K(a.dialog),a.dialog.setupContent(a.dialog))})}else a.dialog.hide()},
onHide:function(){var c=CKEDITOR.plugins.scayt,e=b.scayt;b.unlockSelection();c&&e&&c.state[b.name]&&e.setMarkupPaused&&e.setMarkupPaused(!1);a.dataTemp="";f.postMessage.unbindHandler(C)},contents:[{id:"SpellTab",label:"SpellChecker",accessKey:"S",elements:[{type:"html",id:"banner",label:"banner",style:"",html:"\x3cdiv\x3e\x3c/div\x3e"},{type:"html",id:"Content",label:"spellContent",html:"",setup:function(b){b=a.iframeNumber+"_"+b._.currentTabId;var c=document.getElementById(b);a.targetFromFrame[b]=
c.contentWindow}},{type:"hbox",id:"bottomGroup",style:"width:560px; margin: 0 auto;",widths:["50%","50%"],children:[{type:"hbox",id:"leftCol",align:"left",width:"50%",children:[{type:"vbox",id:"rightCol1",widths:["50%","50%"],children:[{type:"text",id:"text",label:a.LocalizationLabel.ChangeTo.text+":",labelLayout:"horizontal",labelStyle:"font: 12px/25px arial, sans-serif;",width:"140px","default":"",onShow:function(){a.textNode.SpellTab=this;a.LocalizationLabel.ChangeTo.instance=this},onHide:function(){this.reset()}},
{type:"hbox",id:"rightCol",align:"right",width:"30%",children:[{type:"vbox",id:"rightCol_col__left",children:[{type:"text",id:"labelSuggestions",label:a.LocalizationLabel.Suggestions.text+":",onShow:function(){a.LocalizationLabel.Suggestions.instance=this;this.getInputElement().setStyles({display:"none"})}},{type:"html",id:"logo",html:'\x3cimg width\x3d"99" height\x3d"68" border\x3d"0" src\x3d"" title\x3d"WebSpellChecker.net" alt\x3d"WebSpellChecker.net" style\x3d"display: inline-block;"\x3e',setup:function(b){this.getElement().$.src=
a.logotype;this.getElement().getParent().setStyles({"text-align":"left"})}}]},{type:"select",id:"list_of_suggestions",labelStyle:"font: 12px/25px arial, sans-serif;",size:"6",inputStyle:"width: 140px; height: auto;",items:[["loading..."]],onShow:function(){v=this},onChange:function(){a.textNode.SpellTab.setValue(this.getValue())}}]}]}]},{type:"hbox",id:"rightCol",align:"right",width:"50%",children:[{type:"vbox",id:"rightCol_col__left",widths:["50%","50%","50%","50%"],children:[{type:"button",id:"ChangeTo",
label:a.LocalizationButton.ChangeTo.text,title:"Change to",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id);a.LocalizationButton.ChangeTo.instance=this},onClick:c},{type:"button",id:"ChangeAll",label:a.LocalizationButton.ChangeAll.text,title:"Change All",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id);a.LocalizationButton.ChangeAll.instance=this},onClick:c},{type:"button",id:"AddWord",label:a.LocalizationButton.AddWord.text,
title:"Add word",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id);a.LocalizationButton.AddWord.instance=this},onClick:c},{type:"button",id:"FinishChecking",label:a.LocalizationButton.FinishChecking.text,title:"Finish Checking",style:"width: 100%;margin-top: 9px;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id);a.LocalizationButton.FinishChecking.instance=this},onClick:c}]},{type:"vbox",id:"rightCol_col__right",widths:["50%","50%","50%"],
children:[{type:"button",id:"IgnoreWord",label:a.LocalizationButton.IgnoreWord.text,title:"Ignore word",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id);a.LocalizationButton.IgnoreWord.instance=this},onClick:c},{type:"button",id:"IgnoreAllWords",label:a.LocalizationButton.IgnoreAllWords.text,title:"Ignore all words",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id);a.LocalizationButton.IgnoreAllWords.instance=this},
onClick:c},{type:"button",id:"option",label:a.LocalizationButton.Options.text,title:"Option",style:"width: 100%;",onLoad:function(){a.LocalizationButton.Options.instance=this;"file:"==document.location.protocol&&this.disable()},onClick:function(){this.getElement().focus();"file:"==document.location.protocol?alert("WSC: Options functionality is disabled when runing from file system"):(t=document.activeElement,b.openDialog("options"))}}]}]}]},{type:"hbox",id:"BlockFinishChecking",style:"width:560px; margin: 0 auto;",
widths:["70%","30%"],onShow:function(){this.getElement().setStyles({display:"block",position:"absolute",left:"-9999px"})},onHide:n,children:[{type:"hbox",id:"leftCol",align:"left",width:"70%",children:[{type:"vbox",id:"rightCol1",setup:function(){this.getChild()[0].getElement().$.src=a.logotype;this.getChild()[0].getElement().getParent().setStyles({"text-align":"center"})},children:[{type:"html",id:"logo",html:'\x3cimg width\x3d"99" height\x3d"68" border\x3d"0" src\x3d"" title\x3d"WebSpellChecker.net" alt\x3d"WebSpellChecker.net" style\x3d"display: inline-block;"\x3e'}]}]},
{type:"hbox",id:"rightCol",align:"right",width:"30%",children:[{type:"vbox",id:"rightCol_col__left",children:[{type:"button",id:"Option_button",label:a.LocalizationButton.Options.text,title:"Option",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id);"file:"==document.location.protocol&&this.disable()},onClick:function(){this.getElement().focus();"file:"==document.location.protocol?alert("WSC: Options functionality is disabled when runing from file system"):
(t=document.activeElement,b.openDialog("options"))}},{type:"button",id:"FinishChecking",label:a.LocalizationButton.FinishChecking.text,title:"Finish Checking",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onClick:c}]}]}]}]},{id:"GrammTab",label:"Grammar",accessKey:"G",elements:[{type:"html",id:"banner",label:"banner",style:"",html:"\x3cdiv\x3e\x3c/div\x3e"},{type:"html",id:"Content",label:"GrammarContent",html:"",setup:function(){var b=a.iframeNumber+
"_"+a.dialog._.currentTabId,c=document.getElementById(b);a.targetFromFrame[b]=c.contentWindow}},{type:"vbox",id:"bottomGroup",style:"width:560px; margin: 0 auto;",children:[{type:"hbox",id:"leftCol",widths:["66%","34%"],children:[{type:"vbox",children:[{type:"text",id:"text",label:"Change to:",labelLayout:"horizontal",labelStyle:"font: 12px/25px arial, sans-serif;",inputStyle:"float: right; width: 200px;","default":"",onShow:function(){a.textNode.GrammTab=this},onHide:function(){this.reset()}},{type:"html",
id:"html_text",html:"\x3cdiv style\x3d'min-height: 17px; line-height: 17px; padding: 5px; text-align: left;background: #F1F1F1;color: #595959; white-space: normal!important;'\x3e\x3c/div\x3e",onShow:function(b){a.textNodeInfo.GrammTab=this}},{type:"html",id:"radio",html:"",onShow:function(){a.grammerSuggest=this}}]},{type:"vbox",children:[{type:"button",id:"ChangeTo",label:"Change to",title:"Change to",style:"width: 133px; float: right;",onLoad:function(){this.getElement().setAttribute("title-cmd",
this.id)},onClick:c},{type:"button",id:"IgnoreWord",label:"Ignore word",title:"Ignore word",style:"width: 133px; float: right;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onClick:c},{type:"button",id:"IgnoreAllWords",label:"Ignore Problem",title:"Ignore Problem",style:"width: 133px; float: right;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onClick:c},{type:"button",id:"FinishChecking",label:"Finish Checking",title:"Finish Checking",style:"width: 133px; float: right; margin-top: 9px;",
onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onClick:c}]}]}]},{type:"hbox",id:"BlockFinishChecking",style:"width:560px; margin: 0 auto;",widths:["70%","30%"],onShow:function(){this.getElement().setStyles({display:"block",position:"absolute",left:"-9999px"})},onHide:n,children:[{type:"hbox",id:"leftCol",align:"left",width:"70%",children:[{type:"vbox",id:"rightCol1",children:[{type:"html",id:"logo",html:'\x3cimg width\x3d"99" height\x3d"68" border\x3d"0" src\x3d"" title\x3d"WebSpellChecker.net" alt\x3d"WebSpellChecker.net" style\x3d"display: inline-block;"\x3e',
setup:function(){this.getElement().$.src=a.logotype;this.getElement().getParent().setStyles({"text-align":"center"})}}]}]},{type:"hbox",id:"rightCol",align:"right",width:"30%",children:[{type:"vbox",id:"rightCol_col__left",children:[{type:"button",id:"FinishChecking",label:"Finish Checking",title:"Finish Checking",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onClick:c}]}]}]}]},{id:"Thesaurus",label:"Thesaurus",accessKey:"T",elements:[{type:"html",id:"banner",
label:"banner",style:"",html:"\x3cdiv\x3e\x3c/div\x3e"},{type:"html",id:"Content",label:"spellContent",html:"",setup:function(){var b=a.iframeNumber+"_"+a.dialog._.currentTabId,c=document.getElementById(b);a.targetFromFrame[b]=c.contentWindow}},{type:"vbox",id:"bottomGroup",style:"width:560px; margin: -10px auto; overflow: hidden;",children:[{type:"hbox",widths:["75%","25%"],children:[{type:"vbox",children:[{type:"hbox",widths:["65%","35%"],children:[{type:"text",id:"ChangeTo",label:"Change to:",
labelLayout:"horizontal",inputStyle:"width: 160px;",labelStyle:"font: 12px/25px arial, sans-serif;","default":"",onShow:function(b){a.textNode.Thesaurus=this},onHide:function(){this.reset()}},{type:"button",id:"ChangeTo",label:"Change to",title:"Change to",style:"width: 121px; margin-top: 1px;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onClick:c}]},{type:"hbox",children:[{type:"select",id:"categories",label:"Categories:",labelStyle:"font: 12px/25px arial, sans-serif;",
size:"5",inputStyle:"width: 180px; height: auto;",items:[],onShow:function(){a.selectNode.categories=this},onChange:function(){a.buildOptionSynonyms(this.getValue())}},{type:"select",id:"synonyms",label:"Synonyms:",labelStyle:"font: 12px/25px arial, sans-serif;",size:"5",inputStyle:"width: 180px; height: auto;",items:[],onShow:function(){a.selectNode.synonyms=this;a.textNode.Thesaurus.setValue(this.getValue())},onChange:function(b){a.textNode.Thesaurus.setValue(this.getValue())}}]}]},{type:"vbox",
width:"120px",style:"margin-top:46px;",children:[{type:"html",id:"logotype",label:"WebSpellChecker.net",html:'\x3cimg width\x3d"99" height\x3d"68" border\x3d"0" src\x3d"" title\x3d"WebSpellChecker.net" alt\x3d"WebSpellChecker.net" style\x3d"display: inline-block;"\x3e',setup:function(){this.getElement().$.src=a.logotype;this.getElement().getParent().setStyles({"text-align":"center"})}},{type:"button",id:"FinishChecking",label:"Finish Checking",title:"Finish Checking",style:"width: 121px; float: right; margin-top: 9px;",
onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onClick:c}]}]}]},{type:"hbox",id:"BlockFinishChecking",style:"width:560px; margin: 0 auto;",widths:["70%","30%"],onShow:function(){this.getElement().setStyles({display:"block",position:"absolute",left:"-9999px"})},children:[{type:"hbox",id:"leftCol",align:"left",width:"70%",children:[{type:"vbox",id:"rightCol1",children:[{type:"html",id:"logo",html:'\x3cimg width\x3d"99" height\x3d"68" border\x3d"0" src\x3d"" title\x3d"WebSpellChecker.net" alt\x3d"WebSpellChecker.net" style\x3d"display: inline-block;"\x3e',
setup:function(){this.getElement().$.src=a.logotype;this.getElement().getParent().setStyles({"text-align":"center"})}}]}]},{type:"hbox",id:"rightCol",align:"right",width:"30%",children:[{type:"vbox",id:"rightCol_col__left",children:[{type:"button",id:"FinishChecking",label:"Finish Checking",title:"Finish Checking",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onClick:c}]}]}]}]}]}});var t=null;CKEDITOR.dialog.add("options",function(b){var c=null,d={},e=
{},g=null,k=null;f.cookie.get("udn");f.cookie.get("osp");b=function(a){k=this.getElement().getAttribute("title-cmd");a=[];a[0]=e.IgnoreAllCapsWords;a[1]=e.IgnoreWordsNumbers;a[2]=e.IgnoreMixedCaseWords;a[3]=e.IgnoreDomainNames;a=a.toString().replace(/,/g,"");f.cookie.set("osp",a);f.cookie.set("udnCmd",k?k:"ignore");"delete"!=k&&(a="",""!==l.getValue()&&(a=l.getValue()),f.cookie.set("udn",a));f.postMessage.send({id:"options_dic_send"})};var h=function(){g.getElement().setHtml(a.LocalizationComing.error);
g.getElement().show()};return{title:a.LocalizationComing.Options,minWidth:430,minHeight:130,resizable:CKEDITOR.DIALOG_RESIZE_NONE,contents:[{id:"OptionsTab",label:"Options",accessKey:"O",elements:[{type:"hbox",id:"options_error",children:[{type:"html",style:"display: block;text-align: center;white-space: normal!important; font-size: 12px;color:red",html:"\x3cdiv\x3e\x3c/div\x3e",onShow:function(){g=this}}]},{type:"vbox",id:"Options_content",children:[{type:"hbox",id:"Options_manager",widths:["52%",
"48%"],children:[{type:"fieldset",label:"Spell Checking Options",style:"border: none;margin-top: 13px;padding: 10px 0 10px 10px",onShow:function(){this.getInputElement().$.children[0].innerHTML=a.LocalizationComing.SpellCheckingOptions},children:[{type:"vbox",id:"Options_checkbox",children:[{type:"checkbox",id:"IgnoreAllCapsWords",label:"Ignore All-Caps Words",labelStyle:"margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",style:"float:left; min-height: 16px;",
"default":"",onClick:function(){e[this.id]=this.getValue()?1:0}},{type:"checkbox",id:"IgnoreWordsNumbers",label:"Ignore Words with Numbers",labelStyle:"margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",style:"float:left; min-height: 16px;","default":"",onClick:function(){e[this.id]=this.getValue()?1:0}},{type:"checkbox",id:"IgnoreMixedCaseWords",label:"Ignore Mixed-Case Words",labelStyle:"margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",
style:"float:left; min-height: 16px;","default":"",onClick:function(){e[this.id]=this.getValue()?1:0}},{type:"checkbox",id:"IgnoreDomainNames",label:"Ignore Domain Names",labelStyle:"margin-left: 5px; font: 12px/16px arial, sans-serif;display: inline-block;white-space: normal;",style:"float:left; min-height: 16px;","default":"",onClick:function(){e[this.id]=this.getValue()?1:0}}]}]},{type:"vbox",id:"Options_DictionaryName",children:[{type:"text",id:"DictionaryName",style:"margin-bottom: 10px",label:"Dictionary Name:",
labelLayout:"vertical",labelStyle:"font: 12px/25px arial, sans-serif;","default":"",onLoad:function(){l=this;var b=a.userDictionaryName?a.userDictionaryName:(f.cookie.get("udn"),this.getValue());this.setValue(b)},onShow:function(){l=this;var b=f.cookie.get("udn")?f.cookie.get("udn"):this.getValue();this.setValue(b);this.setLabel(a.LocalizationComing.DictionaryName)},onHide:function(){this.reset()}},{type:"hbox",id:"Options_buttons",children:[{type:"vbox",id:"Options_leftCol_col",widths:["50%","50%"],
children:[{type:"button",id:"create",label:"Create",title:"Create",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onShow:function(){(this.getElement().getFirst()||this.getElement()).setText(a.LocalizationComing.Create)},onClick:b},{type:"button",id:"restore",label:"Restore",title:"Restore",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onShow:function(){(this.getElement().getFirst()||this.getElement()).setText(a.LocalizationComing.Restore)},
onClick:b}]},{type:"vbox",id:"Options_rightCol_col",widths:["50%","50%"],children:[{type:"button",id:"rename",label:"Rename",title:"Rename",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onShow:function(){(this.getElement().getFirst()||this.getElement()).setText(a.LocalizationComing.Rename)},onClick:b},{type:"button",id:"delete",label:"Remove",title:"Remove",style:"width: 100%;",onLoad:function(){this.getElement().setAttribute("title-cmd",this.id)},onShow:function(){(this.getElement().getFirst()||
this.getElement()).setText(a.LocalizationComing.Remove)},onClick:b}]}]}]}]},{type:"hbox",id:"Options_text",children:[{type:"html",style:"text-align: justify;margin-top: 15px;white-space: normal!important; font-size: 12px;color:#777;",html:"\x3cdiv\x3e"+a.LocalizationComing.OptionsTextIntro+"\x3c/div\x3e",onShow:function(){this.getElement().setText(a.LocalizationComing.OptionsTextIntro)}}]}]}]}],buttons:[CKEDITOR.dialog.okButton,CKEDITOR.dialog.cancelButton],onOk:function(){var a=[];a[0]=e.IgnoreAllCapsWords;
a[1]=e.IgnoreWordsNumbers;a[2]=e.IgnoreMixedCaseWords;a[3]=e.IgnoreDomainNames;a=a.toString().replace(/,/g,"");f.cookie.set("osp",a);f.cookie.set("udn",l.getValue());f.postMessage.send({id:"options_checkbox_send"});g.getElement().hide();g.getElement().setHtml(" ")},onLoad:function(){c=this;d.IgnoreAllCapsWords=c.getContentElement("OptionsTab","IgnoreAllCapsWords");d.IgnoreWordsNumbers=c.getContentElement("OptionsTab","IgnoreWordsNumbers");d.IgnoreMixedCaseWords=c.getContentElement("OptionsTab","IgnoreMixedCaseWords");
d.IgnoreDomainNames=c.getContentElement("OptionsTab","IgnoreDomainNames")},onShow:function(){f.postMessage.init(h);var b=f.cookie.get("osp").split("");e.IgnoreAllCapsWords=b[0];e.IgnoreWordsNumbers=b[1];e.IgnoreMixedCaseWords=b[2];e.IgnoreDomainNames=b[3];parseInt(e.IgnoreAllCapsWords,10)?d.IgnoreAllCapsWords.setValue("checked",!1):d.IgnoreAllCapsWords.setValue("",!1);parseInt(e.IgnoreWordsNumbers,10)?d.IgnoreWordsNumbers.setValue("checked",!1):d.IgnoreWordsNumbers.setValue("",!1);parseInt(e.IgnoreMixedCaseWords,
10)?d.IgnoreMixedCaseWords.setValue("checked",!1):d.IgnoreMixedCaseWords.setValue("",!1);parseInt(e.IgnoreDomainNames,10)?d.IgnoreDomainNames.setValue("checked",!1):d.IgnoreDomainNames.setValue("",!1);e.IgnoreAllCapsWords=d.IgnoreAllCapsWords.getValue()?1:0;e.IgnoreWordsNumbers=d.IgnoreWordsNumbers.getValue()?1:0;e.IgnoreMixedCaseWords=d.IgnoreMixedCaseWords.getValue()?1:0;e.IgnoreDomainNames=d.IgnoreDomainNames.getValue()?1:0;d.IgnoreAllCapsWords.getElement().$.lastChild.innerHTML=a.LocalizationComing.IgnoreAllCapsWords;
d.IgnoreWordsNumbers.getElement().$.lastChild.innerHTML=a.LocalizationComing.IgnoreWordsWithNumbers;d.IgnoreMixedCaseWords.getElement().$.lastChild.innerHTML=a.LocalizationComing.IgnoreMixedCaseWords;d.IgnoreDomainNames.getElement().$.lastChild.innerHTML=a.LocalizationComing.IgnoreDomainNames},onHide:function(){f.postMessage.unbindHandler(h);if(t)try{t.focus()}catch(a){}}}});CKEDITOR.dialog.on("resize",function(b){b=b.data;var c=b.dialog,d=CKEDITOR.document.getById(a.iframeNumber+"_"+c._.currentTabId);
"checkspell"==c._.name&&(a.bnr?d&&d.setSize("height",b.height-310):d&&d.setSize("height",b.height-220))});CKEDITOR.on("dialogDefinition",function(b){if("checkspell"===b.data.name){var c=b.data.definition;a.onLoadOverlay=new w({opacity:"1",background:"#fff",target:c.dialog.parts.tabs.getParent().$});a.onLoadOverlay.setEnable();c.dialog.on("cancel",function(b){c.dialog.getParentEditor().config.wsc_onClose.call(this.document.getWindow().getFrame());a.div_overlay.setDisable();a.onLoadOverlay.setDisable();
return!1},this,null,-1)}})})();