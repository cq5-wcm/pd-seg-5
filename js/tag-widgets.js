CQ.Ext.ns("CQ.tagging");
CQ.tagging.TAG_JSON_SUFFIX=".tag.json";
CQ.tagging.TAG_TREE_JSON_SUFFIX=".tagtree.json";
CQ.tagging.TAG_LIST_JSON_SUFFIX=".tags.json";
CQ.tagging.DEFAULT_NAMESPACE="default";
CQ.tagging.LANGUAGES_URL="/etc/tags.json";
CQ.tagging.parseTag=function(A,D){var C={namespace:null,local:A,getTagID:function(){return this.namespace+":"+this.local
}};
var B=A.indexOf(D?"/":":");
if(B>0){C.namespace=A.substring(0,B).trim();
C.local=A.substring(B+1).trim()
}return C
};
CQ.tagging.parseTagID=function(A){var B=CQ.tagging.parseTag(A);
if(B.namespace===null){B.namespace=CQ.tagging.DEFAULT_NAMESPACE
}return B
};
CQ.tagging.getLocalizedTitle=function(C,B,A,D){if(B&&B.code){return C[A+"."+B.code.toLowerCase()]||C[A+"."+B.language]||C[A]||D
}else{return C[A]||D
}};
CQ.tagging.getLocaleSelectCombo=function(B,A){B=B||CQ.Ext.emptyFn;
A=A?A.toLowerCase():null;
return{ref:"../localeSelect",xtype:"combo",width:150,listClass:"x-menu",forceSelection:true,selectOnFocus:true,triggerAction:"all",mode:"local",valueField:"locale",displayField:"title",store:new CQ.Ext.data.Store({proxy:new CQ.Ext.data.HttpProxy({url:CQ.tagging.LANGUAGES_URL,method:"GET"}),reader:new CQ.Ext.data.ArrayReader({root:"languages",fields:[{name:"locale",mapping:0,convert:function(C,D){return D
}},{name:"title",mapping:0,convert:function(D,E){var C=CQ.I18n.getLanguages()[E];
return(C&&C.title)?CQ.I18n.getVarMessage(C.title):E
}}]})}),listeners:{select:function(C){B(C.getValue().toLowerCase())
},render:function(C){if(A){C.loadAndSetValue(A)
}}},loadAndSetValue:function(C){this.getStore().on("load",function(){this.setLocale(C)
},this);
this.getStore().on("exception",function(){this.setLocale(C)
},this);
this.getStore().load()
},setLocale:function(C){var D=this.getStore();
var G=D.findExact("locale",C);
if(G>=0){this.setValue(C)
}else{var F=CQ.I18n.getLanguages();
if(F[C]){var E={};
E.locale=C;
E.title=CQ.I18n.getVarMessage(F[C].title);
D.add([new D.recordType(E)]);
this.setValue(C)
}}}}
};
CQ.tagging.TagLabel=CQ.Ext.extend(CQ.Ext.BoxComponent,{constructor:function(A){CQ.Util.applyDefaults(A,{cls:"taglabel",showPath:true,tag:{},type:"set",displayTitles:true,readOnly:false,locale:null});
CQ.tagging.TagLabel.superclass.constructor.call(this,A);
this.calculateText()
},initComponent:function(){CQ.tagging.TagLabel.superclass.initComponent.call(this);
this.addEvents("remove")
},calculateText:function(){var A=this.tag;
if(typeof A==="string"){this.text=A
}else{if(!this.displayTitles){this.text=A.tagID
}else{this.text=CQ.tagging.getLocalizedTitle(A,this.locale,"titlePath")
}}},setLocale:function(A){this.locale=A;
this.calculateText();
this.el.update(CQ.tagging.TagLabel.createLabelHtml(this.text,this.showPath));
this.createToolTip()
},onRender:function(C,A){if(!this.el){var B=CQ.tagging.TagLabel.createLabelHtml(this.text,this.showPath);
this.el=C.createChild({tag:"div",id:this.getId(),html:B},A);
this.setType(this.type);
if(!this.readOnly){this.removeBtn=this.getEl().child(".taglabel-tool-remove");
this.removeBtn.on("click",function(){this.fireEvent("remove",this)
},this);
this.removeBtn.addClassOnOver("taglabel-tool-remove_hover");
this.el.addClassOnOver("taglabel_hover")
}}CQ.tagging.TagLabel.superclass.onRender.call(this,C,A)
},setType:function(A){if(!this.el){this.type=A
}else{this.el.removeClass(this.type+"tag");
this.type=A;
this.el.addClass(this.type+"tag");
this.createToolTip()
}},createToolTip:function(){if(this.tip){this.tip.destroy()
}var A=this.tag.titlePath||this.text;
if(A){A=CQ.shared.XSS.getXSSValue(A)
}this.tip=new CQ.Ext.ToolTip({target:this.getEl().child(".taglabel-body"),title:A,html:CQ.tagging.TagLabel.createTooltipHtml(this.tag,this.type),dismissDelay:0,maxWidth:500,width:"auto"})
},highlight:function(){this.getEl().child(".parentpath").highlight("#ffff9c",{attr:"color",duration:1.5});
this.getEl().child(".tagname").highlight("#ffff9c",{attr:"color",duration:1.5})
}});
CQ.tagging.TagLabel.createLabelHtml=function(I,F){var G="<table><tr><td class='taglabel-tl'></td><td class='taglabel-tc' colspan='2'></td><td class='taglabel-tr'></td></tr><tr><td class='taglabel-ml'></td><td class='taglabel-mc'>";
var A="</td><td class='taglabel-tool-cell'><div class='taglabel-tool taglabel-tool-remove'></div></td><td class='taglabel-mr'></td></tr><tr><td class='taglabel-bl'></td><td class='taglabel-bc' colspan='2'></td><td class='taglabel-br'></td></tr></table>";
var H="";
var E=I;
var D;
if(E.indexOf("/")>0){D=E.lastIndexOf("/");
H=E.substring(0,D+1);
E=E.substring(D+1)
}else{if(E.indexOf(":")>0){D=E.lastIndexOf(":");
H=E.substring(0,D+1);
E=E.substring(D+1)
}}var C="tagname";
if(!F||!H||H===""){C+=" no-parentpath"
}if(!F){H=""
}var B=G+"<div class='taglabel-body'>";
B+="<div class='parentpath'>"+CQ.shared.XSS.getXSSValue(H)+"</div>";
B+="<div class='"+C+"'>"+CQ.shared.XSS.getXSSValue(E)+"</div>";
B+="</div>"+A;
return B
};
CQ.tagging.TagLabel.createTooltipHtml=function(B,E){if(E=="new"){return"<p class='taglabel-note top'>"+CQ.I18n.getMessage("You added this new tag. It will be created and saved when you submit the form.")+"</p>"
}else{if(E=="denied"){return"<p class='taglabel-note top'>"+CQ.I18n.getMessage("You added this new tag, but are not allowed to create it. Please remove it before submitting the form.")+"</p>"
}}var D=B.tagID?B.tagID+"<br><br>":"";
D+="<table class='taglabel-localizations'>";
var F=CQ.I18n.getLanguages(),A,C;
CQ.Ext.iterate(B,function(G,H){if(G.indexOf("titlePath.")==0){A=G.substring("titlePath.".length);
C=F[A]?F[A].title:A;
D+="<tr><td class='taglabel-label'>"+CQ.shared.XSS.getXSSValue(C)+": </td><td>"+CQ.shared.XSS.getXSSValue(H)+"</td></tr>"
}});
D+="</table>";
if(B.description){D+="<p>"+CQ.shared.XSS.getXSSValue(B.description)+"</p>"
}if(E=="added"){D+="<p class='taglabel-note'>"+CQ.I18n.getMessage("You added this existing tag. Submit the form to save.")+"</p>"
}return D
};
CQ.Ext.reg("taglabel",CQ.tagging.TagLabel);
CQ.tagging.TagInputField=CQ.Ext.extend(CQ.form.CompositeField,{namespaces:[],displayTitles:true,showPathInLabels:true,tagsBasePath:"/etc/tags",popupWidth:500,popupHeight:300,popupResizeHandles:"sw se",popupAlignTo:"tl-bl",suggestMinChars:3,tags:[],hiddenTagIDs:[],tagNamespaces:null,tagNamespacesLoaded:false,allNamespacesAllowed:false,allowedNamespaces:{},dummyInput:null,textField:null,popupMenu:null,namespacesTabPanel:null,menuIsVisible:false,hiddenFields:[],autoCompletionProxy:null,namespacesDefaultConfig:{maximum:-1,displayAs:"cloud",allowDisplayChange:true},constructor:function(C){CQ.Util.applyDefaults(C,{tagsBasePath:"/etc/tags",displayTitles:true,showPathInLabels:true,namespaces:[],popupWidth:500,popupHeight:300,popupResizeHandles:"sw se",popupAlignTo:"tl-bl",suggestMinChars:3,border:false,layout:"fit"});
if(C.readOnly){C.cls=(C.cls?C.cls+" ":"")+"x-form-disabled"
}var B=this;
this.autoCompletionProxy=new CQ.Ext.data.MemoryProxy(null);
var A=new CQ.Ext.form.ComboBox({wrapCls:"floating",cls:"invisible-input",hidden:C.readOnly,hideLabel:true,hideTrigger:true,resizable:true,autoCreate:{tag:"input",type:"text",size:"18",autocomplete:"off"},name:CQ.Sling.IGNORE_PARAM,displayField:C.displayTitles?"titlePath":"tagID",minChars:C.suggestMinChars,typeAhead:false,queryParam:C.displayTitles?"suggestByTitle":"suggestByName",lazyInit:false,store:new CQ.Ext.data.Store({proxy:new CQ.Ext.data.HttpProxy({url:C.tagsBasePath+CQ.tagging.TAG_LIST_JSON_SUFFIX,method:"GET"}),reader:new CQ.Ext.data.JsonReader({root:"tags",fields:["tagID",{name:"titlePath",mapping:function(D){return CQ.tagging.getLocalizedTitle(D,B.locale,"titlePath")
}}]}),baseParams:{count:"false",_charset_:"utf-8"}}),title:CQ.I18n.getMessage("Matching tags"),listEmptyText:CQ.I18n.getMessage("No matching tag found"),listWidth:500,tpl:new CQ.Ext.XTemplate('<tpl for="."><div class="x-combo-list-item">{[this.markText(values)]}</div></tpl>',{markText:function(D){var F=D[C.displayTitles?"titlePath":"tagID"];
var E=A.getRawValue().toLowerCase();
var G=F.toLowerCase().lastIndexOf(E);
if(G>=0){return F.substring(0,G)+"<b>"+F.substr(G,E.length)+"</b>"+F.substring(G+E.length)
}else{return F
}}})});
this.textField=A;
this.textField.comboBoxOnLoad=this.textField.onLoad;
this.textField.onLoad=function(){if(!B.allNamespacesAllowed&&!this.store.isFiltered()){this.store.filterBy(function(E,G){var F=B.getNamespaceDefinition(E.get("tagID"));
var D=B.getNamespaceConfig(F.name);
return D!==null&&D!==undefined
})
}this.comboBoxOnLoad()
};
this.textField.on("render",function(D){D.wrap.addClass(D.wrapCls);
CQ.Ext.EventManager.on(D.el.dom,"keydown",function(E){if(E.keyCode==CQ.Ext.EventObject.ENTER){if(E.preventDefault){E.preventDefault()
}else{E.returnValue=false
}}},this,{normalized:false})
});
this.inputDummy=new CQ.Ext.Panel({cls:"dummy-input",border:false});
C.items=[this.inputDummy];
this.namespacesTabPanel=new CQ.Ext.TabPanel({enableTabScroll:true,deferredRender:false,border:false,width:C.popupWidth,height:C.popupHeight,bbar:[{iconCls:"cq-siteadmin-refresh",handler:function(){this.loadTagNamespaces()
},scope:this},"->",CQ.tagging.getLocaleSelectCombo(function(D){B.setLocale(D)
})]});
CQ.tagging.TagInputField.superclass.constructor.call(this,C)
},initComponent:function(){CQ.tagging.TagInputField.superclass.initComponent.call(this);
this.addEvents("addtag","removetag");
var A=this;
this.initAllowedNamespaces();
this.inputDummy.add(this.textField);
this.menuIsVisible=false;
var C=function(){A.menuIsVisible=A.popupMenu.isVisible()
};
this.textField.on("keydown",C);
this.inputDummy.deferHeight=true;
this.inputDummy.getResizeEl=function(){return this.wrap
};
this.inputDummy.getPositionEl=function(){return this.wrap
};
this.inputDummy.on("render",function(D){D.wrap=D.el.wrap({cls:"x-form-field-wrap"});
D.trigger=D.wrap.createChild({tag:"img",cls:this.readOnly?" x-hidden":"arrow-trigger",src:CQ.Ext.BLANK_IMAGE_URL});
if(!D.width){D.wrap.setWidth(D.el.getWidth()+D.trigger.getWidth())
}D.trigger.on("click",function(){if(A.disabled){return 
}A.initLocale();
if(!A.tagNamespacesLoaded){A.loadTagNamespaces()
}if(A.menuIsVisible){A.popupMenu.hide()
}else{A.popupMenu.show(D.el,A.popupAlignTo)
}});
D.trigger.on("mousedown",C);
D.getEl().on("click",function(){this.textField.focus()
},this)
},this);
this.inputDummy.onResize=function(D,E){if(typeof D=="number"){D=D-this.trigger.getWidth()
}E="auto";
CQ.Ext.Panel.prototype.onResize.call(this,D,E);
this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth())
};
this.textField.onSelect=function(E,F){if(this.fireEvent("beforeselect",this,E,F)!==false){var D=A.getTagDefinition(E.data.tagID);
A.comingFromTextField=true;
if(A.addTag(D,true)){this.setValue("")
}this.collapse();
this.fireEvent("select",this,E,F)
}};
this.textField.on("focus",function(D){this.inputDummy.addClass("dummy-input-focus");
this.inputDummy.trigger.addClass("trigger-focus");
if(!this.tagNamespacesLoaded){this.loadTagNamespaces()
}},this);
this.textField.on("blur",function(D){this.inputDummy.removeClass("dummy-input-focus");
this.inputDummy.trigger.removeClass("trigger-focus")
},this);
this.textField.enableKeyEvents=true;
this.textField.on("keydown",function(D,E){if(E.getKey()==E.ENTER){if(!this.textField.isExpanded()){if(!this.readTextField()){this.textField.focus()
}}}else{if(E.getKey()==E.BACKSPACE){var F=this.textField.getValue();
if(F&&F.length==1){this.textField.collapse()
}}}},this);
if(CQ.Ext.menu.Adapter){this.popupMenu=new CQ.Ext.menu.Menu({cls:"x-tagging-menu"});
this.popupMenu.add(new CQ.Ext.menu.Adapter(this.namespacesTabPanel,{hideOnClick:false}));
if(this.popupResizeHandles){var B=new CQ.Ext.Resizable(this.popupMenu.getEl(),{pinned:true,handles:this.popupResizeHandles});
B.on("resize",function(F,E,D){this.namespacesTabPanel.setSize(E-4,D-4)
},this)
}}else{this.popupMenu=new CQ.Ext.menu.Menu({cls:"x-tagging-menu",enableScrolling:false});
this.popupMenu.add(this.namespacesTabPanel);
if(this.popupResizeHandles){this.popupMenu.on("render",function(){var D=new CQ.Ext.Resizable(this.popupMenu.getEl(),{pinned:true,handles:this.popupResizeHandles});
D.on("resize",function(G,F,E){this.namespacesTabPanel.setSize(F-4,E-4)
},this)
},this)
}}},onRender:function(D){CQ.tagging.TagInputField.superclass.onRender.apply(this,arguments);
this.formOwner=this.findParentByType("dialog");
if(this.formOwner){this.formOwner.on("beforesubmit",this.prepareSubmit,this)
}else{this.formOwner=this.findParentByType(CQ.Ext.form.FormPanel);
if(this.formOwner){var C=this.formOwner.getForm();
C.on("beforeaction",this.prepareSubmit,this)
}else{var A=this.getEl().dom.parentNode;
while(A&&A.tagName){if(A.tagName.toLowerCase()=="form"){break
}A=A.parentNode
}if(A){var B=this;
CQ.Ext.EventManager.on(A,"submit",function(E){if(B.prepareSubmit()){return 
}if(E.preventDefault){E.preventDefault()
}else{E.returnValue=false
}},this,{normalized:false})
}}}},addTag:function(A,B,E){if(!A){return false
}if(this.hasTag(A)){if(B){this.getTag(A).label.highlight()
}return false
}if(!this.checkMaximum(A)){return false
}var C;
if(typeof A==="string"){C="new";
var D=this.internalAddTag(A);
this.runCanCreateTagCheck(D,E)
}else{C="added";
this.internalAddTag(A)
}this.inputDummy.doLayout();
this.fireEvent("addtag",this,A);
return true
},removeTag:function(A){if(!A){return 
}var B=this.getTag(A);
if(B!==null){this.internalRemoveTag(B);
this.inputDummy.doLayout();
this.fireEvent("removetag",this,A)
}},processInit:function(A){this.processPath(A)
},processPath:function(A){this.contentPath=A
},setValue:function(G){this.clear();
this.initLocale();
if(G&&G.length>0){var C=null;
if(this.contentPath&&(this.name==="cq:tags"||this.name==="./cq:tags")){var F=this.loadJson(this.contentPath+CQ.tagging.TAG_LIST_JSON_SUFFIX+"?count=false");
if(F&&F.tags){C=F.tags
}this.contentPath=null
}if(!C||C.length===0){C=[];
for(var E=0,B=G.length;
E<B;
E++){var D=G[E];
var H=CQ.tagging.parseTagID(D);
var A=this.loadJson(this.tagsBasePath+"/"+H.namespace+"/"+H.local+CQ.tagging.TAG_JSON_SUFFIX);
C.push(A||D)
}}this.value=[];
CQ.Ext.each(C,function(I){var J=CQ.tagging.parseTagID(I.tagID||I).namespace;
if(typeof I==="string"||!this.isAllowedNamespace(J)){this.hiddenTagIDs.push(I.tagID||I)
}else{this.internalAddTag(I,"set")
}this.value.push(I.tagID||I)
},this)
}this.inputDummy.doLayout()
},getValue:function(){this.value=[];
for(var B=0;
B<this.tags.length;
B++){var A=this.tags[B].tag;
if(A.tagID){this.value.push(A.tagID)
}}this.value=this.value.concat(this.hiddenTagIDs);
return this.value
},getRawValue:function(){return this.getValue()
},getDefaultLocale:function(){return CQ.WCM.getPageLocale(CQ.WCM.getPagePath())||CQ.I18n.parseLocale("en")
},initLocale:function(){if(!this.locale){this.locale=this.getDefaultLocale();
this.textField.getStore().baseParams.locale=this.locale.code;
this.namespacesTabPanel.localeSelect.loadAndSetValue(this.locale.code.toLowerCase())
}},setLocale:function(A){A=typeof A==="object"?A:CQ.I18n.parseLocale(A);
if(A&&(!this.locale||this.locale.code!=A.code)){this.locale=A;
CQ.Ext.each(this.tags,function(B){if(B.label){B.label.setLocale(this.locale)
}},this);
this.textField.getStore().baseParams.locale=this.locale.code;
this.loadTagNamespaces()
}},hasTag:function(A){return this.getTag(A)!==null
},getTag:function(A){for(var B=0;
B<this.tags.length;
B++){if(this.tags[B].equals(A)){return this.tags[B]
}}return null
},internalAddTag:function(A,B){B=B||(typeof A==="string"?"new":"added");
var C=new CQ.tagging.TagLabel({tag:A,namespace:null,type:B,showPath:this.showPathInLabels,displayTitles:this.displayTitles,readOnly:this.readOnly,locale:this.locale});
C.on("remove",function(){this.removeTag(A);
this.textField.focus()
},this);
this.inputDummy.insert(this.inputDummy.items.getCount()-1,C);
var D={label:C,tag:A,type:B,equals:function(E){if(typeof this.tag==="string"){return this.tag==E
}else{return this.tag.tagID==E.tagID
}}};
this.tags.push(D);
return D
},internalRemoveTag:function(B){this.inputDummy.remove(B.label);
for(var A=0;
A<this.tags.length;
A++){if(this.tags[A].equals(B.tag)){this.tags.splice(A,1);
break
}}},clear:function(){for(var A=0;
A<this.tags.length;
A++){this.inputDummy.remove(this.tags[A].label)
}this.tags=[];
this.hiddenTagIDs=[]
},toggleTag:function(A,B){if(this.hasTag(A)){this.removeTag(A)
}else{this.addTag(A,B)
}},checkMaximum:function(A){var C;
if(typeof A==="string"){if(this.displayTitles){C=this.getNamespaceDefinitionByTitlePath(A)
}else{C=this.getNamespaceDefinition(A)
}}else{C=this.getNamespaceDefinition(A.tagID)
}if(C===null){return true
}var B=this.getNamespaceConfig(C.name);
if(!B){CQ.Ext.Msg.show({cls:"x-above-menu",title:CQ.I18n.getMessage("Cannot add tag"),msg:CQ.I18n.getMessage("Namespace '{0}' not allowed.",[this.displayTitles?C.title:C.name]),buttons:CQ.Ext.Msg.OK,fn:this.focusBackAfterMsgBox,scope:this});
return false
}if(B.maximum===-1){return true
}var D=this.countTagsOfNamespace(C.name);
if(D>=B.maximum){CQ.Ext.Msg.show({cls:"x-above-menu",title:CQ.I18n.getMessage("Cannot add tag"),msg:CQ.I18n.getMessage("You can have only a maximum of '{0}' tags for the namespace '{1}'.",[B.maximum,this.displayTitles?C.title:C.name]),buttons:CQ.Ext.Msg.OK,fn:this.focusBackAfterMsgBox,scope:this});
return false
}return true
},focusBackAfterMsgBox:function(){if(this.comingFromTextField){this.textField.focus();
try{this.formOwner.cleanUp()
}catch(A){}}else{this.popupMenu.show(this.inputDummy.getEl(),this.popupAlignTo)
}},countTagsOfNamespace:function(E){var D=0;
for(var C=0;
C<this.tags.length;
C++){var A=this.tags[C].tag;
var B=CQ.tagging.parseTagID(A.tagID||A).namespace;
if(B==E){D++
}}return D
},readTextField:function(E){var D=this.textField.getRawValue().trim();
if(D===""){return true
}var A;
try{if(this.displayTitles){A=this.getTagDefinitionByTitlePath(D)
}else{A=this.getTagDefinition(D)
}}catch(B){CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),typeof B==="string"?B:B.message,function(){this.textField.focus()
},this);
return false
}this.comingFromTextField=true;
var C=this.addTag(A||D,true,E);
if(C){this.textField.setValue("")
}return C
},prepareSubmit:function(){if(!this.readTextField(true)){return false
}var E=[];
var B=[];
var C=[];
for(var D=0;
D<this.tags.length;
D++){var F=this.tags[D];
if(F.type=="set"||F.type=="added"){E.push(F.tag.tagID)
}else{if(F.type=="new"){B.push(F.tag)
}else{if(F.type=="denied"){C.push(F.tag)
}}}}if(C.length>0){CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),CQ.I18n.getMessage("You are not allowed to create these new tag(s):<br><br>{0}<br><br>Please remove before submitting the form.",[C.join("<br>")]));
return false
}if(B.length>0){var A=this.createTags(B);
if(A.failed.length>0){CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error from Server"),CQ.I18n.getMessage("Could not create tag(s):<br><br>{0}<br><br>The form was not saved.",[A.failed.join("<br>")]));
return false
}E=E.concat(A.created);
this.tagNamespacesLoaded=false
}E=E.concat(this.hiddenTagIDs);
this.updateHiddenFields(E);
return true
},createTags:function(B){var A={created:[],failed:[]};
CQ.Ext.each(B,function(C){var D=CQ.HTTP.post("/bin/tagcommand",undefined,{cmd:this.displayTitles?"createTagByTitle":"createTag",locale:this.locale.code,tag:C,_charset_:"utf-8"});
if(!CQ.HTTP.isOk(D)){A.failed.push("'"+C+"': "+D.headers[CQ.HTTP.HEADER_MESSAGE])
}else{var E=D.headers[CQ.HTTP.HEADER_PATH];
A.created.push(E)
}},this);
return A
},runCanCreateTagCheck:function(D,C){function B(E,G,F){if(!G){D.type="denied";
D.label.setType("denied")
}}var A=CQ.HTTP.post("/bin/tagcommand",C?undefined:B,{cmd:this.displayTitles?"canCreateTagByTitle":"canCreateTag",locale:this.locale.code,tag:D.tag,_charset_:"utf-8"});
if(C){B(null,CQ.utils.HTTP.isOk(A),null)
}},getTagDefinition:function(A){var B=CQ.tagging.parseTagID(A);
return this.loadJson(this.tagsBasePath+"/"+B.namespace+"/"+B.local+CQ.tagging.TAG_JSON_SUFFIX)
},getTagDefinitionByTitlePath:function(A){return this.loadJson(this.tagsBasePath+CQ.tagging.TAG_JSON_SUFFIX+"?title="+A)
},getNamespaceDefinition:function(A){var B=CQ.tagging.parseTagID(A).namespace;
return this.tagNamespaces[B]
},getNamespaceDefinitionByTitlePath:function(B){var A=CQ.tagging.parseTag(B).namespace;
if(A===null){return this.tagNamespaces[CQ.tagging.DEFAULT_NAMESPACE]
}for(var C in this.tagNamespaces){if(this.tagNamespaces.hasOwnProperty(C)){if(A==this.tagNamespaces[C].title){return this.tagNamespaces[C]
}}}return null
},initAllowedNamespaces:function(){this.allowedNamespaces={};
if(this.namespaces.length===0){this.allNamespacesAllowed=true;
return 
}for(var B=0,A=this.namespaces.length;
B<A;
B++){var C=this.namespaces[B];
if(typeof C=="string"){C={name:C}
}CQ.Util.applyDefaults(C,this.namespacesDefaultConfig);
this.allowedNamespaces[C.name]=C
}},isAllowedNamespace:function(A){return this.allNamespacesAllowed||this.allowedNamespaces[A]
},getNamespaceConfig:function(A){if(this.allNamespacesAllowed){return this.namespacesDefaultConfig
}else{return this.allowedNamespaces[A]
}},loadJson:function(url){try{if(url){var response=CQ.HTTP.get(url);
if(CQ.HTTP.isOk(response)){return CQ.Util.eval(response)
}else{CQ.Log.debug("CQ.tagging.TagInputField#loadTags: no response for {0}, empty data}",url);
return null
}}}catch(e){CQ.Log.warn("CQ.tagging.TagInputField#loadTags: {0}",e.message);
return null
}},loadTagNamespaces:function(){this.tagNamespaces={};
var A=this.loadJson(this.tagsBasePath+CQ.tagging.TAG_LIST_JSON_SUFFIX+"?count=false");
if(A&&A.tags){CQ.Ext.each(A.tags,function(B){this.tagNamespaces[B.name]=B
},this)
}this.setupPopupMenu();
this.tagNamespacesLoaded=true
},setupPopupMenu:function(){var H=function(M,L,N){return false
};
var A=this;
var C=0;
if(this.namespacesTabPanel&&this.namespacesTabPanel.items.getCount()>0){C=this.namespacesTabPanel.items.indexOf(this.namespacesTabPanel.getActiveTab());
this.namespacesTabPanel.removeAll(true)
}for(var B in this.tagNamespaces){if(!this.tagNamespaces.hasOwnProperty(B)){continue
}var J=this.tagNamespaces[B];
var G=this.getNamespaceConfig(J.name);
if(!G){continue
}var I=new CQ.tree.SlingTreeLoader({path:this.tagsBasePath,typeIncludes:["cq:Tag"],getTitle:function(L,M){return CQ.tagging.getLocalizedTitle(M,A.locale,"jcr:title",L)
},baseAttrs:{singleClickExpand:true,uiProvider:CQ.tagging.TagLabel.TreeNodeUI}});
var D=new CQ.Ext.tree.AsyncTreeNode({name:this.tagsBasePath.substring(1)+"/"+J.name,text:J.title?J.title:J.name,listeners:{load:function(L){var M=L.treePanel;
if(M.loadMask){M.loadMask.hide();
M.loadMask=null
}}}});
var F=new CQ.Ext.tree.TreePanel({root:D,rootVisible:false,loader:I,autoScroll:true,containerScroll:true});
D.treePanel=F;
if(CQ.Ext.menu.Adapter){F.on("render",function(M){M.loadMask=new CQ.Ext.LoadMask(M.body,{msg:CQ.I18n.getMessage("Loading..."),removeMask:true});
function L(){if(M.loadMask){M.loadMask.show()
}}L.defer(100)
})
}else{F.on("render",function(L){L.loadMask=new CQ.Ext.LoadMask(L.body,{msg:CQ.I18n.getMessage("Loading..."),removeMask:true})
});
F.on("afterlayout",function(L){if(L.loadMask){L.loadMask.show()
}})
}F.on("click",this.onTagNodeClicked,this);
F.getSelectionModel().on("beforeselect",H);
var K=(this.displayTitles&&J.title)?CQ.tagging.getLocalizedTitle(J,this.locale,"title"):J.name;
if(K){K=CQ.shared.XSS.getXSSValue(K)
}var E=CQ.I18n.getMessage("Namespace",[],"Tag Namespace")+": "+(!this.displayTitles&&J.title?J.title:J.name);
if(E){E=CQ.shared.XSS.getXSSValue(E)
}this.namespacesTabPanel.add({title:K,tabTip:E,xtype:"panel",layout:"fit",border:false,items:F})
}this.namespacesTabPanel.setActiveTab(C)
},onTagNodeClicked:function(C,B){this.comingFromTextField=false;
var D=C.getPath();
D=D.substring(this.tagsBasePath.length+1);
var E=CQ.tagging.parseTag(D,true);
var A=this.getTagDefinition(E.getTagID());
this.toggleTag(A,true);
this.popupMenu.show(this.inputDummy.getEl(),this.popupAlignTo)
},updateHiddenFields:function(C){for(var D=0;
D<this.hiddenFields.length;
D++){this.remove(this.hiddenFields[D])
}this.hiddenFields=[];
var B=new CQ.Ext.form.Hidden({name:this.getName()+CQ.Sling.DELETE_SUFFIX});
this.add(B);
this.hiddenFields.push(B);
var E=new CQ.Ext.form.Hidden({name:this.getName()+"@TypeHint",value:"String[]"});
this.add(E);
this.hiddenFields.push(E);
for(D=0;
D<C.length;
D++){var A=new CQ.Ext.form.Hidden({name:this.getName(),value:C[D]});
this.add(A);
this.hiddenFields.push(A)
}this.doLayout()
}});
CQ.Ext.reg("tags",CQ.tagging.TagInputField);
CQ.tagging.TagLabel.TreeNodeUI=CQ.Ext.extend(CQ.Ext.tree.TreeNodeUI,{constructor:function(A){CQ.tagging.TagLabel.TreeNodeUI.superclass.constructor.call(this,A)
},render:function(B){var A=this.node.attributes;
if(A.qtip){A.qtip=CQ.shared.XSS.getXSSValue(A.qtip)
}if(A.qtipTitle){A.qtipTitle=CQ.shared.XSS.getXSSValue(A.qtipTitle)
}CQ.tagging.TagLabel.TreeNodeUI.superclass.render.call(this,B)
},renderElements:function(D,B,C,A){D.text=CQ.shared.XSS.getXSSValue(D.text);
CQ.tagging.TagLabel.TreeNodeUI.superclass.renderElements.call(this,D,B,C,A)
}});
CQ.tagging.TagAdmin=CQ.Ext.extend(CQ.Ext.Viewport,{tagsBasePath:"/etc/tags",constructor:function(B){this.debug=B.debug;
var L=this;
CQ.Util.applyDefaults(B,{tagsBasePath:"/etc/tags"});
var E=[];
var I=[];
var A=[];
E.push({id:"cq-tagadmin-grid-refresh",iconCls:"cq-siteadmin-refresh",handler:this.reloadAll,scope:this,tooltip:{text:CQ.I18n.getMessage("Refresh the list of tags"),autoHide:true}});
E.push("-");
if(B.actions){E=E.concat(this.formatActions(B.actions,I,A))
}E.push("-");
E.push({xtype:"button",enableToggle:true,text:CQ.I18n.getMessage("Count usage"),handler:function(M){this.mask();
var O=M.pressed;
var N=CQ.Ext.getCmp("cq-tagadmin-grid");
N.getColumnModel().setHidden(5,!O);
N.getStore().reload({params:{count:O?"true":"false"},callback:function(){this.unmask()
},scope:this})
},scope:this});
E.push("->");
var F=CQ.User.getCurrentUser().getLanguage();
this.setLocale(F);
E.push(CQ.tagging.getLocaleSelectCombo(function(M){L.setLocale(M,true)
},F.toLowerCase()));
var G=new CQ.tree.SlingTreeLoader({path:B.tagsBasePath,typeIncludes:["cq:Tag"],getTitle:function(M,N){return CQ.tagging.getLocalizedTitle(N,L.locale,"jcr:title",M)
},baseAttrs:{singleClickExpand:true,allowDrop:true,uiProvider:CQ.tagging.TagAdmin.TreeNodeUI}});
var D=new CQ.Ext.tree.AsyncTreeNode({name:B.tagsBasePath.substring(1),text:CQ.I18n.getMessage("Tags"),draggable:false,expanded:true});
var K=new CQ.Ext.grid.ColumnModel([new CQ.Ext.grid.RowNumberer(),{header:CQ.I18n.getMessage("Title"),dataIndex:"title",renderer:function(O,N,M){return CQ.shared.XSS.getXSSValue(O)
}},{header:CQ.I18n.getMessage("Name"),dataIndex:"name"},{header:CQ.I18n.getMessage("Description"),dataIndex:"description",renderer:function(O,N,M){return CQ.shared.XSS.getXSSRecordPropertyValue(M,"description")
}},{header:CQ.I18n.getMessage("TagID"),dataIndex:"tagID"},{header:CQ.I18n.getMessage("Count"),dataIndex:"count",hidden:true},{header:CQ.I18n.getMessage("Publication Date"),dataIndex:"pubDate"},{header:CQ.I18n.getMessage("Publisher"),dataIndex:"publisher"}]);
K.defaultSortable=true;
var C=new CQ.Ext.grid.RowSelectionModel({singleSelect:true,listeners:{selectionchange:function(N){for(var M=0;
M<I.length;
M++){I[M].setDisabled(!N.hasSelection())
}}}});
var H=new CQ.Ext.data.JsonReader({totalProperty:"results",root:"tags",id:"path",fields:["name",{name:"title",mapping:function(M){return CQ.tagging.getLocalizedTitle(M,L.locale,"title")
}},"description","description"+CQ.shared.XSS.KEY_SUFFIX,"tagID","count","lastModified","lastModifiedBy","pubDate","publisher"]});
var J=new CQ.Ext.data.GroupingStore({autoLoad:false,proxy:new CQ.Ext.data.HttpProxy({url:D.getPath()+CQ.tagging.TAG_LIST_JSON_SUFFIX,method:"GET"}),reader:H,baseParams:{count:"false"}});
CQ.tagging.TagAdmin.superclass.constructor.call(this,{id:"cq-tagadmin",layout:"border",renderTo:"CQ",stateful:true,stateEvents:["pathselected"],items:[{id:"cq-tagadmin-wrapper",xtype:"panel",layout:"border",region:"center",border:false,items:[{id:"cq-header",xtype:"container",autoEl:"div",region:"north",items:[{xtype:"panel",border:false,layout:"column",cls:"cq-header-toolbar",items:[new CQ.Switcher({}),new CQ.UserInfo({})]},new CQ.HomeLink({})]},{xtype:"treepanel",id:"cq-tagadmin-tree",region:"west",margins:"5 0 5 5",width:CQ.themes.TagAdmin.TREE_WIDTH,autoScroll:true,containerScroll:true,collapsible:true,collapseMode:"mini",hideCollapseTool:true,animate:true,split:true,enableDD:true,ddScroll:true,ddAppendOnly:true,ddGroup:CQ.tagging.TagAdmin.DD_GROUP,dropConfig:{ddGroup:CQ.tagging.TagAdmin.DD_GROUP,appendOnly:true,completeDrop:function(T){var P=T.dropNode,R=T.point,O=T.target;
if(!CQ.Ext.isArray(P)){P=[P]
}var S;
for(var N=0,M=P.length;
N<M;
N++){S=P[N];
if(R=="above"){O.parentNode.insertBefore(S,O)
}else{if(R=="below"){O.parentNode.insertBefore(S,O.nextSibling)
}else{if(L.mergeNode){var Q=S;
S=O;
if(this.tree.fireEvent("beforemergenode",this.tree,Q,O)){Q.remove()
}}else{O.appendChild(S)
}}}}S.ui.focus();
if(CQ.Ext.enableFx&&this.tree.hlDrop){S.ui.highlight()
}O.ui.endDrop();
this.tree.fireEvent("nodedrop",T)
}},loader:G,root:D,rootVisible:true,tbar:[{id:"cq-tagadmin-tree-refresh",iconCls:"cq-siteadmin-refresh",handler:function(){L.reloadTree()
},tooltip:{text:CQ.I18n.getMessage("Refresh the tree"),autoHide:true}}],listeners:{click:function(N,M){L.loadPath(N.getPath())
},nodedragover:function(N){var M=N.source.getProxy().getEl();
if(N.rawEvent.browserEvent.ctrlKey){M.addClass("x-tree-drop-ok-append");
M.removeClass("x-dd-drop-ok")
}else{M.removeClass("x-tree-drop-ok-append");
M.addClass("x-dd-drop-ok")
}},beforenodedrop:function(M){L.mergeNode=M.rawEvent.browserEvent.ctrlKey
},beforemovenode:function(M,Q,O,P,N){return L.performMoveOrMerge(Q,P)
},beforemergenode:function(M,N,O){return L.performMoveOrMerge(N,O,true)
},append:function(M,O,P,N){if(P.getDepth()>1){P.attributes.cls="tag"
}else{P.attributes.cls="namespace"
}P.ui.render()
}}},{xtype:"grid",id:"cq-tagadmin-grid",region:"center",margins:"5 5 5 0",stripeRows:true,cm:K,sm:C,viewConfig:new CQ.Ext.grid.GroupingView({forceFit:true,groupTextTpl:'{text} ({[values.rs.length]} {[values.rs.length > 1 ? "'+CQ.I18n.getMessage("Tags")+'" : "'+CQ.I18n.getMessage("Tag")+'"]})'}),store:J,tbar:E,listeners:{rowcontextmenu:function(N,M,P){if(!this.contextMenu&&(A.length>0)){this.contextMenu=new CQ.Ext.menu.Menu({items:A})
}var O=P.getXY();
this.contextMenu.showAt(O);
P.stopEvent()
},rowdblclick:function(){CQ.tagging.TagAdmin.editTag.call(L)
}}}]}]});
this.loadPath()
},initComponent:function(){CQ.tagging.TagAdmin.superclass.initComponent.call(this);
this.addEvents("pathselected")
},performMoveOrMerge:function(E,D,B){this.mask();
var A=D.getPath();
var G={cmd:B?"mergeTag":"moveTag",path:E.getPath(),dest:B?A:A+"/"+E.attributes.name};
var C=CQ.HTTP.post("/bin/tagcommand",null,G);
this.unmask();
var F=(C.headers.Status||"500")=="200";
if(F){this.reloadGrid()
}return F
},loadPath:function(B){this.mask();
this.treePath=B=B?B:this.tagsBasePath;
CQ.Ext.getCmp("cq-tagadmin-tree").selectPath(B==this.tagsBasePath?this.tagsBasePath.substring(1):B,"name");
var A=CQ.Ext.getCmp("cq-tagadmin-grid").getStore();
A.proxy.api.read.url=B+CQ.tagging.TAG_LIST_JSON_SUFFIX;
A.reload({callback:function(){this.unmask()
},scope:this});
this.fireEvent("pathselected",this,B)
},getState:function(){return{treePath:this.treePath}
},getCurrentTreePath:function(){var A=CQ.Ext.getCmp("cq-tagadmin-tree");
var B=A.getSelectionModel().getSelectedNode();
if(B!=null){return B.getPath()
}},getSelectedTags:function(){var A=CQ.Ext.getCmp("cq-tagadmin-grid");
return A.getSelectionModel().getSelections()
},getSelectedTag:function(){var A=this.getSelectedTags();
if(A.length>0){return A[0].id
}return null
},setLocale:function(A,C){this.locale=typeof A==="object"?A:CQ.I18n.parseLocale(A);
if(C){var B=CQ.Ext.getCmp("cq-tagadmin-grid").getStore();
this.reloadAll()
}},reloadTree:function(){CQ.Ext.getCmp("cq-tagadmin-tree").getRootNode().reload()
},reloadGrid:function(){this.loadPath(this.treePath)
},reloadAll:function(){this.reloadTree();
this.reloadGrid()
},mask:function(){if(!this.loadMask){this.loadMask=new CQ.Ext.LoadMask(this.id+"-wrapper",{msg:CQ.I18n.getMessage("Loading...")})
}this.loadMask.show()
},unmask:function(A){if(!this.loadMask){return 
}this.loadMask.hide()
},formatActions:function(G,B,E){var F=[];
for(var A in G){if(typeof (G[A])!="object"){continue
}if(G[A].xtype=="separator"){F.push(G[A].value);
E.push(G[A].value)
}else{if(G[A].menu){G[A].menu=new CQ.Ext.menu.Menu({items:this.formatActions(G[A].menu,B,E)})
}var C=this.formatActionConfig(G[A]);
var D=new CQ.Ext.Action(C);
F.push(D);
if(C.disabled){B.push(D)
}E.push(D)
}}return F
},formatActionConfig:function(config){if(!config.scope){config.scope=this
}if(typeof (config.handler)=="string"){config.handler=eval(config.handler)
}if(config.text){config.text=CQ.I18n.getVarMessage(config.text)
}if(config.tooltip&&config.tooltip.text){config.tooltip.text=CQ.I18n.getVarMessage(config.tooltip.text)
}if(config.tooltip&&config.tooltip.title){config.tooltip.title=CQ.I18n.getVarMessage(config.tooltip.title)
}return config
},postTagCommand:function(B,A,C){this.mask();
C=CQ.Util.applyDefaults(C||{},{cmd:B,path:A,_charset_:"utf-8"});
CQ.HTTP.post(CQ.tagging.TagAdmin.TAG_COMMAND_URL,function(E,F,D){if(F){this.reloadAll()
}else{this.unmask()
}},C,this)
},createDialog:function(A,C){var B=CQ.WCM.getDialog(A);
B.on("beforesubmit",function(){this.mask()
},this);
B.responseScope=this;
B.success=this.reloadAll;
B.failure=function(D,E){this.unmask();
CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),C)
};
return B
}});
CQ.Ext.reg("tagadmin",CQ.tagging.TagAdmin);
CQ.tagging.TagAdmin.TAG_COMMAND_URL="/bin/tagcommand";
CQ.tagging.TagAdmin.DD_GROUP="cq.tagadmin.tree";
CQ.tagging.TagAdmin.TreeNodeUI=CQ.Ext.extend(CQ.Ext.tree.TreeNodeUI,{constructor:function(A){CQ.tagging.TagAdmin.TreeNodeUI.superclass.constructor.call(this,A)
},render:function(B){var A=this.node.attributes;
if(A.qtip){A.qtip=CQ.shared.XSS.getXSSValue(A.qtip)
}if(A.qtipTitle){A.qtipTitle=CQ.shared.XSS.getXSSValue(A.qtipTitle)
}CQ.tagging.TagAdmin.TreeNodeUI.superclass.render.call(this,B)
},renderElements:function(D,B,C,A){D.text=CQ.shared.XSS.getXSSValue(D.text);
CQ.tagging.TagAdmin.TreeNodeUI.superclass.renderElements.call(this,D,B,C,A)
}});
CQ.tagging.TagAdmin.baseDialogConfig={xtype:"dialog",params:{_charset_:"utf-8"},buttons:CQ.Dialog.OKCANCEL};
CQ.tagging.TagAdmin.createTag=function(){var C=CQ.Util.applyDefaults({title:CQ.I18n.getMessage("Create Tag"),formUrl:CQ.tagging.TagAdmin.TAG_COMMAND_URL,params:{cmd:"createTag"},okText:CQ.I18n.getMessage("Create"),items:{xtype:"panel",items:[{name:"jcr:title",fieldLabel:CQ.I18n.getMessage("Title"),allowBlank:false},{name:"tag",fieldLabel:CQ.I18n.getMessage("Name"),allowBlank:false},{name:"jcr:description",fieldLabel:CQ.I18n.getMessage("Description"),xtype:"textarea"}]}},CQ.tagging.TagAdmin.baseDialogConfig);
var D=this.getCurrentTreePath();
if(D==this.tagsBasePath){C.title=CQ.I18n.getMessage("Create Namespace");
C.items.items[0].fieldLabel=CQ.I18n.getMessage("Namespace Title");
C.items.items[1].fieldLabel=CQ.I18n.getMessage("Namespace Name")
}else{var B=D.substring(this.tagsBasePath.length+1);
if(B.indexOf("/")>0){B=B.replace("/",":")+"/"
}else{B=B+":"
}C.params.parentTagID=B
}var A=this.createDialog(C,CQ.I18n.getMessage("Could not create tag."));
A.show()
};
(function(){var languages=null;
CQ.tagging.TagAdmin.editTag=function(){var tag=this.getSelectedTag();
if(tag==null){return 
}if(!languages){languages=CQ.HTTP.eval(CQ.tagging.LANGUAGES_URL).languages
}var allLangs=CQ.I18n.getLanguages();
var localizedTitles=[];
CQ.Ext.each(languages,function(lang){var title=allLangs[lang]?CQ.I18n.getVarMessage(allLangs[lang].title):lang;
localizedTitles.push({name:"jcr:title."+lang,fieldLabel:title,xtype:"textfield"})
});
var dialogConfig=CQ.Util.applyDefaults({title:CQ.I18n.getMessage("Edit Tag"),okText:CQ.I18n.getMessage("Save"),items:{xtype:"panel",items:[{name:"jcr:title",fieldLabel:CQ.I18n.getMessage("Title"),allowBlank:false},{name:"jcr:description",fieldLabel:CQ.I18n.getMessage("Description"),xtype:"textarea"},{name:"jcr:lastModified",xtype:"hidden",ignoreData:true},{title:"Localization",xtype:"dialogfieldset",collapsible:true,items:localizedTitles}]}},CQ.tagging.TagAdmin.baseDialogConfig);
var dialog=this.createDialog(dialogConfig,CQ.I18n.getMessage("Could not save tag."));
dialog.loadContent(tag,".0.json");
dialog.show()
}
})();
CQ.tagging.TagAdmin.deleteTag=function(){var A=this.getSelectedTag();
if(A==null){return 
}CQ.Ext.Msg.confirm(this.getCurrentTreePath()==this.tagsBasePath?CQ.I18n.getMessage("Delete Namespace?"):CQ.I18n.getMessage("Delete Tag?"),CQ.I18n.getMessage("You are going to delete: {0}<br/><br/>Are you sure?",[A]),function(B){if(B=="yes"){this.postTagCommand("deleteTag",A)
}},this)
};
CQ.tagging.TagAdmin.getParent=function(C){var D=C.split("/");
var A="";
for(var B=0;
B<D.length-1;
B++){if(B>0){A+="/"
}A+=D[B]
}return A
};
CQ.tagging.TagAdmin.getName=function(A){var B=A.split("/");
return B[B.length-1]
};
(function(){CQ.Ext.apply(CQ.Ext.form.VTypes,{tagPath:function(B,A){return(/^\/etc\/tags(\/|$)/.test(B))
},tagPathText:CQ.I18n.getMessage("Not a valid tag path. Must start with /etc/tags.")})
})();
CQ.tagging.TagAdmin.moveTag=function(){var B=this.getSelectedTag();
if(B==null){return 
}var A=this;
var C=new CQ.Dialog({title:CQ.I18n.getMessage("Move Tag"),okText:CQ.I18n.getMessage("Move"),buttons:CQ.Dialog.OKCANCEL,items:{xtype:"panel",items:[{name:"tag",fieldLabel:CQ.I18n.getMessage("Move"),disabled:true,value:B},{xtype:"pathfield",name:"destParent",fieldLabel:CQ.I18n.getMessage("to"),rootPath:this.tagsBasePath,predicate:"tag",allowBlank:false,vtype:"tagPath",value:CQ.tagging.TagAdmin.getParent(B)},{name:"destName",fieldLabel:CQ.I18n.getMessage("Rename to"),allowBlank:false,value:CQ.tagging.TagAdmin.getName(B)}]},ok:function(){var E=this.getField("destParent").getValue();
var D=this.getField("destName").getValue();
if(E.match(/\/$/)){E+=D
}else{E+="/"+D
}A.postTagCommand("moveTag",B,{dest:E});
this.hide()
}});
C.show()
};
CQ.tagging.TagAdmin.mergeTag=function(){var B=this.getSelectedTag();
if(B==null){return 
}var A=this;
var C=new CQ.Dialog({title:CQ.I18n.getMessage("Merge Tag"),okText:CQ.I18n.getMessage("Merge"),buttons:CQ.Dialog.OKCANCEL,items:{xtype:"panel",items:[{name:"tag",fieldLabel:CQ.I18n.getMessage("Merge"),disabled:true,value:B},{xtype:"pathfield",name:"dest",fieldLabel:CQ.I18n.getMessage("into"),fieldDescription:CQ.I18n.getMessage("After the merge, this will be the only tag left of the two."),rootPath:this.tagsBasePath,predicate:"tag",allowBlank:false,vtype:"tagPath",value:B}]},ok:function(){var D=this.getField("dest").getValue();
A.postTagCommand("mergeTag",B,{dest:D});
this.hide()
}});
C.show()
};
CQ.tagging.TagAdmin.activateTag=function(){var A=this.getSelectedTag();
if(A==null){return 
}this.postTagCommand("activateTag",A)
};
CQ.tagging.TagAdmin.deactivateTag=function(){var A=this.getSelectedTag();
if(A==null){return 
}this.postTagCommand("deactivateTag",A)
};
CQ.tagging.TagAdmin.listTaggedItems=function(){var A=this.getSelectedTag();
if(A==null){return 
}var C=function(G,H,E){var F=CQ.HTTP.externalize(E.json.path);
if(F.indexOf(".")==-1){F+=".html"
}return String.format('<a href="{0}" target="_blank">{1}</a>',F,G)
};
var B=new CQ.Ext.grid.GridPanel({store:new CQ.Ext.data.GroupingStore({proxy:new CQ.Ext.data.HttpProxy({url:CQ.tagging.TagAdmin.TAG_COMMAND_URL,method:"GET"}),baseParams:{cmd:"list",path:A},autoLoad:true,reader:new CQ.Ext.data.JsonReader({root:"taggedItems",totalProperty:"results",id:"item",fields:["title","itemPath"]})}),cm:new CQ.Ext.grid.ColumnModel([new CQ.Ext.grid.RowNumberer(),{header:CQ.I18n.getMessage("Title"),dataIndex:"title",renderer:C},{header:CQ.I18n.getMessage("Path"),dataIndex:"itemPath"}]),viewConfig:{forceFit:true,groupTextTpl:'{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'},sm:new CQ.Ext.grid.RowSelectionModel({singleSelect:true})});
var D=new CQ.Ext.Window({title:CQ.I18n.getMessage("Items tagged with")+A,width:800,height:400,autoScroll:true,items:B,layout:"fit",maximizable:true,minimizable:true,y:200}).show()
};