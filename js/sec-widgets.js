CQ.security={};
CQ.security.utils={};
CQ.security.data={};
CQ.security.search={};
CQ.security.themes={};
CQ.security.search.Query=CQ.Ext.extend(CQ.Ext.util.Observable,{selector:null,category:null,offset:0,max:10,totalMax:2000,sortDir:null,sortBy:"@rep:principalName",term:"",propertiesToSearch:["profile","named"],constructor:function(A){A=A||{};
for(var B in A){this[B]=A[B]
}CQ.security.search.Query.superclass.constructor.call(this)
},getObject:function(){var D={};
if(this.scope){D.scope=this.scope
}else{if(this.group){this.totalMax=6000;
D.scope={groupName:this.group}
}}if(this.selector){D.selector=this.selector
}if(this.sort){D.sort=this.sort
}else{if(this.sortBy){D.sort={property:this.sortBy}
}if(this.sortDir){D.sort=D.sort||{};
D.sort.direction=this.sortDir
}}var F=[];
if(this.category){F.push([{eq:{property:"cq:authorizableCategory",value:"mcm"}}])
}if(this.term){var C=this.term.split(" ");
for(var B=0;
B<C.length;
B++){var E=[];
for(var A=0;
A<this.propertiesToSearch.length;
A++){if(this.propertiesToSearch[A]=="named"){E.push({named:"%"+C[B]+"%"})
}else{E.push({contains:{property:this.propertiesToSearch[A],expression:"*"+C[B]+"*"}})
}}F.push(E)
}}if(F.length>0){D.condition=F
}D.limit={offset:0,max:this.totalMax};
return D
},getString:function(){var B=this.getObject();
var A=CQ.Ext.util.JSON.encode(B);
return A
}});
CQ.security.SecurityAdmin=CQ.Ext.extend(CQ.Ext.Viewport,{createUserDialogPasswordLength:12,createUserDialogPath:"/libs/cq/security/content/tools/createuserdialog",createGroupDialogPath:"/libs/cq/security/content/tools/creategroupdialog",editUserDialogPath:"/libs/cq/security/content/tools/edituserdialog",editGroupDialogPath:"/libs/cq/security/content/tools/editgroupdialog",importCSVDialogPath:"/libs/cq/security/content/tools/importcsvdialog",membersDialogPath:"/libs/cq/security/content/tools/membersdialog",deck:null,usersGrid:null,groupsGrid:null,navButtons:[],reloadUsersGrid:function(){try{this.usersGrid.getStore().reload()
}catch(A){CQ.Log.debug("CQ.security.SecurityAdmin#reloadUsersGrid: "+A.message)
}},reloadGroupsGrid:function(){try{this.groupsGrid.getStore().reload()
}catch(A){CQ.Log.debug("CQ.security.SecurityAdmin#reloadGroupsGrid: "+A.message)
}},getMsg:function(B,A){switch(B){case this.ADD_TO_GROUP_TITLE:return CQ.I18n.getMessage("Add to Group");
case this.ADD_THE_FOLLOWING_USER:return CQ.I18n.getMessage("Add the following user ...");
case this.ADD_THE_FOLLOWING_X_USERS:return CQ.I18n.getMessage("Add the following {0} users ...",A);
case this.ADD_THE_FOLLOWING_GROUP:return CQ.I18n.getMessage("Add the following group ...");
case this.ADD_THE_FOLLOWING_X_GROUPS:return CQ.I18n.getMessage("Add the following {0} groups ...",A);
case this.TO_THE_FOLLOWING_GROUP:return CQ.I18n.getMessage("... to the following group:",[],"Add user X to the following groups");
case this.MERGE_THE_FOLLOWING_GROUP:return CQ.I18n.getMessage("Merge the following group ...",[],"marketing terminology");
case this.WITH_GROUP:return CQ.I18n.getMessage("... with group {0}",A,"Merge group X with group Y");
case this.X_NOT_MEMBER_OF_ANY:return CQ.I18n.getMessage("{0} is not member of any group.",A);
case this.X_IS_MEMBER_OF:return CQ.I18n.getMessage("{0} is member of the following group:",A);
case this.X_IS_MEMBER_OF_Y_GROUPS:return CQ.I18n.getMessage("{0} is member of the following {1} groups:",A);
case this.GROUP_X_NOT_MEMBER_OF_ANY:return CQ.I18n.getMessage("The group {0} is not member of any other group.",A);
case this.GROUP_X_IS_MEMBER_OF:return CQ.I18n.getMessage("The group {0} is member of the following group:",A);
case this.GROUP_X_IS_MEMBER_OF_Y_GROUPS:return CQ.I18n.getMessage("The group {0} is member of the following {1} groups:",A);
case this.REMOVE_MEMBERSHIP_TITLE:return CQ.I18n.getMessage("Remove Group Membership");
case this.REMOVE_USER_FROM_GROUP:return CQ.I18n.getMessage("Are you sure to remove user {0} from group {1}?",A);
case this.REMOVE_GROUP_FROM_GROUP:return CQ.I18n.getMessage("Are you sure to remove group {0} from group {1}?",A);
case this.DELETE_USERS_TITLE:return CQ.I18n.getMessage("Delete Users");
case this.DELETE_USER:return CQ.I18n.getMessage("You are going to delete the following user:");
case this.DELETE_USERS:return CQ.I18n.getMessage("You are going to delete the following users:");
case this.DELETE_GROUPS_TITLE:return CQ.I18n.getMessage("Delete Groups");
case this.DELETE_GROUP:return CQ.I18n.getMessage("You are going to delete the following group:");
case this.DELETE_GROUPS:return CQ.I18n.getMessage("You are going to delete the following groups:");
case this.ACTIVATE_USERS_TITLE:return CQ.I18n.getMessage("Activate Users");
case this.ACTIVATE_USER:return CQ.I18n.getMessage("You are going to activate the following user:");
case this.ACTIVATE_USERS:return CQ.I18n.getMessage("You are going to activate the following users:");
case this.ACTIVATE_GROUPS_TITLE:return CQ.I18n.getMessage("Activate Groups");
case this.ACTIVATE_GROUP:return CQ.I18n.getMessage("You are going to activate the following group:");
case this.ACTIVATE_GROUPS:return CQ.I18n.getMessage("You are going to activate the following groups:");
case this.DEACTIVATE_USERS_TITLE:return CQ.I18n.getMessage("Deactivate Users");
case this.DEACTIVATE_USER:return CQ.I18n.getMessage("You are going to deactivate the following user:");
case this.DEACTIVATE_USERS:return CQ.I18n.getMessage("You are going to deactivate the following users:");
case this.DEACTIVATE_GROUPS_TITLE:return CQ.I18n.getMessage("Deactivate Groups");
case this.DEACTIVATE_GROUP:return CQ.I18n.getMessage("You are going to deactivate the following group:");
case this.DEACTIVATE_GROUPS:return CQ.I18n.getMessage("You are going to deactivate the following groups:");
case this.MEMBERS_TITLE:return CQ.I18n.getMessage("Members of Group {0}",A);
case this.REMOVE_MEMBER:return CQ.I18n.getMessage("You are going to remove the following member from {0}",A);
case this.REMOVE_MEMBERS:return CQ.I18n.getMessage("You are going to remove the following members from {0}",A);
case this.FAILED_TO_CREATE_USER:return CQ.I18n.getMessage("Failed to create user");
case this.FAILED_TO_CREATE_GROUP:return CQ.I18n.getMessage("Failed to create group");
default:return""
}},constructor:function(B){var G=CQ.Ext.getBody();
G.setStyle("margin","0");
if(CQ.Ext.isIE){G.dom.scroll="no"
}else{G.setStyle("overflow","hidden")
}var K=this;
B=CQ.Util.applyDefaults(B,{id:"cq-security"});
this.id=B.id;
window.CQ_SecurityAdmin=this;
var I=[];
var C=[];
var A=0;
var D=B.deck.activeItem?B.deck.activeItem:0;
for(var E=0;
E<B.items.length;
E++){if(B.items[E].xtype=="static"){if(B.items[E].text=="-"){C.push(new CQ.Static({cls:"cq-security-nav-line",html:"&nbsp;"}))
}else{C.push(B.items[E])
}continue
}else{if(B.items[E].xtype=="textbutton"){C.push(B.items[E]);
continue
}}try{var J=B.items[E].title?B.items[E].title:"";
delete B.items[E].title;
var F=CQ.Util.build(B.items[E]);
I.push(F);
var L=new CQ.TextButton({text:J,pressed:A==D,toggleGroup:"cq-security-nav",scope:F,handler:function(){K.deck.layout.setActiveItem(this)
}});
if(B.items[E].id){this.navButtons[B.items[E].id]=L
}C.push(L);
A++
}catch(H){}}delete B.items;
this.deck=CQ.Util.build(CQ.Util.applyDefaults(B.deck,{xtype:"panel",layout:"card",id:this.id+"-deck",activeItem:0,region:"center",border:false,items:I}));
delete B.deck;
B=CQ.Util.applyDefaults(B,{id:this.id,layout:"border",renderTo:CQ.Util.ROOT_ID,items:[{id:"cq-header",xtype:"container",cls:this.id+"-header",autoEl:"div",region:"north",items:{xtype:"panel",border:false,layout:"column",cls:"cq-header-toolbar",items:[new CQ.Switcher({}),new CQ.UserInfo({}),new CQ.HomeLink({})]}},{id:this.id+"-nav",cls:"cq-security-nav",xtype:"panel",region:"west",width:CQ.security.themes.SecurityAdmin.NAV_WIDTH,layout:"border",border:false,items:{xtype:"panel",region:"center",margins:CQ.security.themes.SecurityAdmin.NAV_MARGINS,items:C}},this.deck]});
CQ.security.SecurityAdmin.superclass.constructor.call(this,B)
},initComponent:function(){this.usersGrid=CQ.Ext.getCmp("usersGrid");
this.usersPanel=CQ.Ext.getCmp("usersPanel");
this.groupsGrid=CQ.Ext.getCmp("groupsGrid");
this.groupsPanel=CQ.Ext.getCmp("groupsPanel");
this.dashboard=CQ.Ext.getCmp("dashboard");
CQ.security.SecurityAdmin.superclass.initComponent.call(this)
},mask:function(){if(!this.loadMask){this.loadMask=new CQ.Ext.LoadMask(this.id+"-deck",{msg:CQ.I18n.getMessage("Loading...")})
}this.loadMask.show()
},unmask:function(){if(!this.loadMask){return 
}this.loadMask.hide()
},showUserQuickView:function(){try{this.usersPanel.showQuickView()
}catch(A){}},refreshUserQuickView:function(){try{this.usersPanel.refreshQuickView()
}catch(A){}},showGroupQuickView:function(){try{this.groupsPanel.showQuickView()
}catch(A){}},refreshGroupQuickView:function(){try{this.groupsPanel.refreshQuickView()
}catch(A){}},ADD_TO_GROUP_TITLE:200,ADD_THE_FOLLOWING_USER:201,ADD_THE_FOLLOWING_X_USERS:202,ADD_THE_FOLLOWING_GROUP:203,ADD_THE_FOLLOWING_X_GROUPS:204,TO_THE_FOLLOWING_GROUP:205,MERGE_THE_FOLLOWING_GROUP:206,WITH_GROUP:207,X_NOT_MEMBER_OF_ANY:300,X_IS_MEMBER_OF:301,X_IS_MEMBER_OF_Y_GROUPS:302,GROUP_X_NOT_MEMBER_OF_ANY:320,GROUP_X_IS_MEMBER_OF:321,GROUP_X_IS_MEMBER_OF_Y_GROUPS:322,REMOVE_MEMBERSHIP_TITLE:330,REMOVE_USER_FROM_GROUP:331,REMOVE_GROUP_FROM_GROUP:332,DELETE_USERS_TITLE:1000,DELETE_USER:1001,DELETE_USERS:1002,DELETE_GROUPS_TITLE:1100,DELETE_GROUP:1001,DELETE_GROUPS:1002,ACTIVATE_USERS_TITLE:1200,ACTIVATE_USER:1201,ACTIVATE_USERS:1202,ACTIVATE_GROUPS_TITLE:1300,ACTIVATE_GROUP:1301,ACTIVATE_GROUPS:1302,DEACTIVATE_USERS_TITLE:1400,DEACTIVATE_USER:1401,DEACTIVATE_USERS:1402,DEACTIVATE_GROUPS_TITLE:1500,DEACTIVATE_GROUP:1501,DEACTIVATE_GROUPS:1502,MEMBERS_TITLE:1600,REMOVE_MEMBER:1601,REMOVE_MEMBERS:1602,FAILED_TO_CREATE_USER:1700,FAILED_TO_CREATE_GROUP:1701});
CQ.Ext.reg("securityadmin",CQ.security.SecurityAdmin);
CQ.security.SecurityAdmin.hasUsersSelection=function(){try{return window.CQ_SecurityAdmin.usersGrid.getSelectionModel().getSelections().length>0
}catch(A){return false
}};
CQ.security.SecurityAdmin.hasGroupsSelection=function(){try{return window.CQ_SecurityAdmin.groupsGrid.getSelectionModel().getSelections().length>0
}catch(A){return false
}};
CQ.security.SecurityAdmin.hasSingleUserSelection=function(){try{return window.CQ_SecurityAdmin.usersGrid.getSelectionModel().getSelections().length==1
}catch(A){return false
}};
CQ.security.SecurityAdmin.hasSingleGroupSelection=function(){try{return window.CQ_SecurityAdmin.groupsGrid.getSelectionModel().getSelections().length==1
}catch(A){return false
}};
CQ.security.SecurityAdmin.hasMembersSelection=function(){try{return window.CQ_SecurityAdmin.membersGrid.getSelectionModel().getSelections().length>0
}catch(A){return false
}};
CQ.security.SecurityAdmin.getUsersTarget=function(){try{var A=window.CQ_SecurityAdmin.usersGrid.getSelectionModel().getSelections();
if(A.length==0){return null
}return A[0].id
}catch(B){return null
}};
CQ.security.SecurityAdmin.getGroupsTarget=function(){try{var A=window.CQ_SecurityAdmin.groupsGrid.getSelectionModel().getSelections();
if(A.length==0){return null
}return A[0].id
}catch(B){return null
}};
CQ.security.SecurityAdmin.saveUser=function(E,D,G){var B=window.CQ_SecurityAdmin;
try{var C=E.getField("rep:userId");
var A=E.getField("email");
var H=CQ.Ext.form.VTypes.makeAuthorizableId(A.getValue());
if(!C){E.addHidden({"rep:userId":H},false)
}else{if(C.getValue()==""){C.setValue(H)
}}}catch(F){}E.ok(D,function(){B.reloadUsersGrid();
B.showUserQuickView();
B.unmask();
if(G){G()
}},function(L,K){var I=B.getMsg(B.FAILED_TO_CREATE_USER);
try{I+=":<br><br>"+CQ.HTTP.buildPostResponseFromHTML(K.response.responseText).headers[CQ.HTTP.HEADER_MESSAGE]
}catch(J){}CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),I);
B.unmask()
})
};
CQ.security.SecurityAdmin.saveAndCreateUser=function(B,A){CQ.security.SecurityAdmin.saveUser(B,A,CQ.security.SecurityAdmin.createUser)
};
CQ.security.SecurityAdmin.saveAndOpenUser=function(B,A){CQ.security.SecurityAdmin.saveUser(B,A)
};
CQ.security.SecurityAdmin.openUser=function(A){CQ.security.SecurityAdmin.editUser(A)
};
CQ.security.SecurityAdmin.createUser=function(C){var A=window.CQ_SecurityAdmin;
if(A){if(!C){C=A.createUserDialogPath
}}var G="/home/users/*";
var E=CQ.security.SecurityAdmin.getDialog(C,G);
var D=CQ.security.SecurityAdmin.getDialogContentStore(G);
E.processRecords([D.getAt(0)],{scope:E},true);
try{var B=E.getField("rep:password");
B.setValue(CQ.security.SecurityAdmin.buildPassword())
}catch(F){}E.show()
};
CQ.security.SecurityAdmin.buildPassword=function(C){var A=window.CQ_SecurityAdmin;
if(!C){C=A?A.createUserDialogPasswordLength:12
}var E="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
var D="";
for(var B=0;
B<C;
B++){D+=E.charAt(Math.round(Math.random()*E.length))
}return D
};
CQ.security.SecurityAdmin.editUser=function(B,A){CQ.security.SecurityAdmin.editAuthorizable(true,B,A)
};
CQ.security.SecurityAdmin.editAuthorizable=function(G,I,B){var F=window.CQ_SecurityAdmin;
var H=G?"rep:userId":"groupName";
if(F){var A=G?F.usersGrid:F.groupsGrid;
if(!I){I=A.getSelectionModel().getSelections()[0].id
}if(!B){B=G?F.editUserDialogPath:F.editGroupDialogPath
}}var D=CQ.security.SecurityAdmin.getDialog(B,I);
var E=CQ.security.SecurityAdmin.getDialogContentStore(I,H);
try{D.find("name",H)[0].disable()
}catch(C){}D.processRecords([E.getAt(0)],{scope:D},true);
D.show()
};
CQ.security.SecurityAdmin.getDialogContentStore=function(path,idFieldName){var fields=[];
var data=[[]];
if(path&&path.indexOf("/*")==-1){try{var resp=CQ.HTTP.eval(CQ.HTTP.noCaching(path+".preferences"+CQ.HTTP.EXTENSION_JSON));
for(var prop in resp.user){fields.push(prop=="userID"?idFieldName:prop);
data[0].push(resp.user[prop])
}}catch(e){}}return new CQ.Ext.data.SimpleStore({fields:fields,data:data})
};
CQ.security.SecurityAdmin.saveGroup=function(E,D,G){var A=window.CQ_SecurityAdmin;
try{var C=E.getField("groupName");
var B=E.getField("givenName");
var H=CQ.Ext.form.VTypes.makeAuthorizableId(B.getValue());
if(!C){E.addHidden({groupName:H},false)
}else{if(C.getValue()==""){C.setValue(H)
}}}catch(F){}E.ok(D,function(){A.reloadGroupsGrid();
A.showGroupQuickView();
A.unmask();
if(A.dashboard&&A.dashboard.listsDataView){A.dashboard.listsDataView.getStore().reload()
}if(G){G()
}},function(L,K){var I=A.getMsg(A.FAILED_TO_CREATE_GROUP);
try{I+=":<br><br>"+CQ.HTTP.buildPostResponseFromHTML(K.response.responseText).headers[CQ.HTTP.HEADER_MESSAGE]
}catch(J){}CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),I);
A.unmask()
})
};
CQ.security.SecurityAdmin.saveAndCreateGroup=function(B,A){CQ.security.SecurityAdmin.saveGroup(B,A,CQ.security.SecurityAdmin.createGroup)
};
CQ.security.SecurityAdmin.saveAndOpenGroup=function(B,A){CQ.security.SecurityAdmin.saveGroup(B,A)
};
CQ.security.SecurityAdmin.openGroup=function(A){CQ.security.SecurityAdmin.editGroup(A)
};
CQ.security.SecurityAdmin.createGroup=function(B){var A=window.CQ_SecurityAdmin;
if(A){if(!B){B=A.createGroupDialogPath
}}var E="/home/groups/*";
var D=CQ.security.SecurityAdmin.getDialog(B,E);
var C=CQ.security.SecurityAdmin.getDialogContentStore(E);
D.processRecords([C.getAt(0)],{scope:D},true);
D.show()
};
CQ.security.SecurityAdmin.editGroup=function(B,A){CQ.security.SecurityAdmin.editAuthorizable(false,B,A)
};
CQ.security.SecurityAdmin.getDialog=function(A,E,D){var C=CQ.WCM.getDialog(null,A,true);
if(!C){var B=CQ.WCM.getDialogConfig(A);
if(B.formUrl){B.formUrlFromContent=true
}else{B.formUrl=E&&E.indexOf("/*")==-1?E:D?D:"/libs/cq/security/authorizables/POST"
}B.path=E;
C=CQ.WCM.getDialog(B,A);
C.on("beforesubmit",function(){window.CQ_SecurityAdmin.mask()
})
}else{if(!C.initialConfig.formUrlFromContent){C.setFormUrl(E&&E.indexOf("/*")==-1?E:D?D:"/libs/cq/security/authorizables/POST")
}C.path=E
}return C
};
CQ.security.SecurityAdmin.createConfirmMessage=function(C,A,E){var D=(C.length>1)?E:A;
D+="<br/><br/>";
var B=CQ.security.SecurityAdmin.getSelectionList(C);
D+=B.items.join("<br/>")+"<br/>";
if(B.more){D+="<br/>"+B.more+"<br/>"
}D+="<br/>"+CQ.I18n.getMessage("Are you sure?");
return D
};
CQ.security.SecurityAdmin.getSelectionList=function(E,A){A=A||10;
var D={items:[],more:""};
A=E.length>A?4:A;
for(var B=0;
B<E.length;
B++){if(B==A){D.more=CQ.I18n.getMessage("and {0} more...",[E.length-B],"e.g. and 20 more users to delete");
break
}var C=CQ.shared.XSS.getXSSRecordPropertyValue(E[B],"name");
var F=E[B].get("id");
if(F&&C!=F){C=F+" / "+C+""
}D.items.push(C)
}return D
};
CQ.security.SecurityAdmin.deleteUsers=function(){var A=window.CQ_SecurityAdmin;
CQ.security.SecurityAdmin.deleteAuthorizables(window.CQ_SecurityAdmin.usersGrid,A.getMsg(A.DELETE_USERS_TITLE),A.getMsg(A.DELETE_USER),A.getMsg(A.DELETE_USERS))
};
CQ.security.SecurityAdmin.deleteGroups=function(){var A=window.CQ_SecurityAdmin;
CQ.security.SecurityAdmin.deleteAuthorizables(window.CQ_SecurityAdmin.groupsGrid,A.getMsg(A.DELETE_GROUPS_TITLE),A.getMsg(A.DELETE_GROUPS),A.getMsg(A.DELETE_GROUPS))
};
CQ.security.SecurityAdmin.deleteAuthorizables=function(A,E,B,F){E=E?E:CQ.I18n.getMessage("Delete Authorizables");
B=B?B:CQ.I18n.getMessage("You are going to delete the following authorizable:");
F=F?F:CQ.I18n.getMessage("You are going to delete the following authorizables:");
var C=A.getSelectionModel().getSelections();
var D=CQ.security.SecurityAdmin.createConfirmMessage(C,B,F);
CQ.Ext.Msg.show({title:E,msg:D,buttons:CQ.Ext.Msg.YESNO,icon:CQ.Ext.MessageBox.QUESTION,fn:function(I){if(I=="yes"){var G=window.CQ_SecurityAdmin;
G.mask();
for(var H=0;
H<C.length;
H++){CQ.HTTP.post(C[H].get("home"),null,{_charset_:"utf-8",deleteAuthorizable:1})
}A.getStore().reload();
A.quickView.collapse();
G.unmask()
}},scope:this})
};
CQ.security.SecurityAdmin.activateUsers=function(){var A=window.CQ_SecurityAdmin;
CQ.security.SecurityAdmin.replicateAuthorizables(window.CQ_SecurityAdmin.usersGrid,true,A.getMsg(A.ACTIVATE_USERS_TITLE),A.getMsg(A.ACTIVATE_USER),A.getMsg(A.ACTIVATE_USERS))
};
CQ.security.SecurityAdmin.activateGroups=function(){var A=window.CQ_SecurityAdmin;
CQ.security.SecurityAdmin.replicateAuthorizables(window.CQ_SecurityAdmin.groupsGrid,true,A.getMsg(A.ACTIVATE_GROUPS_TITLE),A.getMsg(A.ACTIVATE_GROUP),A.getMsg(A.ACTIVATE_GROUPS))
};
CQ.security.SecurityAdmin.deactivateUsers=function(){var A=window.CQ_SecurityAdmin;
CQ.security.SecurityAdmin.replicateAuthorizables(window.CQ_SecurityAdmin.usersGrid,false,A.getMsg(A.DEACTIVATE_USERS_TITLE),A.getMsg(A.DEACTIVATE_USER),A.getMsg(A.DEACTIVATE_USERS))
};
CQ.security.SecurityAdmin.deactivateGroups=function(){var A=window.CQ_SecurityAdmin;
CQ.security.SecurityAdmin.replicateAuthorizables(window.CQ_SecurityAdmin.groupsGrid,false,A.getMsg(A.DEACTIVATE_GROUPS_TITLE),A.getMsg(A.DEACTIVATE_GROUP),A.getMsg(A.DEACTIVATE_GROUPS))
};
CQ.security.SecurityAdmin.replicateAuthorizables=function(A,B,F,C,G){if(B){F=F?F:CQ.I18n.getMessage("Activate Authorizables");
C=C?C:CQ.I18n.getMessage("You are going to activate the following authorizable:");
G=G?G:CQ.I18n.getMessage("You are going to activate the following authorizables:")
}else{F=F?F:CQ.I18n.getMessage("Deactivate Authorizables");
C=C?C:CQ.I18n.getMessage("You are going to deactivate the following authorizable:");
G=G?G:CQ.I18n.getMessage("You are going to deactivate the following authorizables:")
}var D=A.getSelectionModel().getSelections();
var E=CQ.security.SecurityAdmin.createConfirmMessage(D,C,G);
CQ.Ext.Msg.show({title:F,msg:E,buttons:CQ.Ext.Msg.YESNO,icon:CQ.Ext.MessageBox.QUESTION,fn:function(K){if(K=="yes"){var H=window.CQ_SecurityAdmin;
H.mask();
var J=[];
for(var I=0;
I<D.length;
I++){J.push(D[I].get("home"))
}CQ.HTTP.post("/bin/replicate.json",null,{_charset_:"utf-8",cmd:B?"Activate":"Deactivate",path:J});
A.getStore().reload();
H.unmask()
}},scope:this})
};
CQ.security.SecurityAdmin.addUsers=function(){var A=window.CQ_SecurityAdmin;
var B=window.CQ_SecurityAdmin.usersGrid.getSelectionModel().getSelections();
CQ.security.SecurityAdmin.addMembers(B,A.getMsg(A.ADD_THE_FOLLOWING_USER),A.getMsg(A.ADD_THE_FOLLOWING_X_USERS,B.length))
};
CQ.security.SecurityAdmin.addGroups=function(){var A=window.CQ_SecurityAdmin;
var B=window.CQ_SecurityAdmin.groupsGrid.getSelectionModel().getSelections();
CQ.security.SecurityAdmin.addMembers(B,A.getMsg(A.ADD_THE_FOLLOWING_GROUP),A.getMsg(A.ADD_THE_FOLLOWING_X_GROUPS,B.length))
};
CQ.security.SecurityAdmin.addMembers=function(B,D,E){var I=window.CQ_SecurityAdmin;
var C=(B.length>1)?E:D;
C+="<br/><br/>";
var G=CQ.security.SecurityAdmin.getSelectionList(B,6);
C+=G.items.join("<br/>")+"<br/>";
if(G.more){C+=G.more+"<br/>"
}C+="<br/><br/>";
C+=I.getMsg(I.TO_THE_FOLLOWING_GROUP);
C+="<br/><br/>";
var A;
var F=new CQ.Dialog({title:I.getMsg(I.ADD_TO_GROUP_TITLE),params:{_charset_:"utf-8",memberAction:"addMembers"},items:{xtype:"panel",items:[new CQ.Static({html:C}),A=new CQ.security.AuthorizableSelection({hideLabel:true,filter:"groups",displayField:"home"})]},buttons:CQ.Dialog.OKCANCEL,listeners:{beforesubmit:function(){I.mask();
A.disable();
for(var J=0;
J<B.length;
J++){H.addHidden({memberEntry:B[J].data.id})
}H.setFormUrl(A.getValue()+".html")
}}});
var H=CQ.WCM.getDialog(F);
H.success=function(){I.reloadGroupsGrid();
I.showUserQuickView();
I.showGroupQuickView();
I.unmask()
};
H.failure=function(){I.unmask()
};
H.show()
};
CQ.security.SecurityAdmin.mergeGroup=function(){var A=window.CQ_SecurityAdmin;
var D=window.CQ_SecurityAdmin.groupsGrid.getSelectionModel().getSelections();
var B=new CQ.Dialog({title:A.getMsg(A.ADD_TO_GROUP_TITLE),formUrl:D[0].get("home"),height:250,params:{_charset_:"utf-8",memberAction:"addMembers"},items:{xtype:"panel",items:[new CQ.Static({html:A.getMsg(A.MERGE_THE_FOLLOWING_GROUP)+"<br><br>"}),new CQ.security.AuthorizableSelection({name:"memberEntry",hideLabel:true,filter:"groups",displayField:"id"}),new CQ.Static({html:"<br>"+A.getMsg(A.WITH_GROUP,"<b>"+CQ.Ext.util.Format.htmlEncode(D[0].get("name"))+"</b>")})]},buttons:CQ.Dialog.OKCANCEL,listeners:{beforesubmit:function(){A.mask()
}}});
var C=CQ.WCM.getDialog(B);
C.success=function(){A.reloadGroupsGrid();
A.showUserQuickView();
A.showGroupQuickView();
A.unmask()
};
C.failure=function(){A.unmask()
};
C.show()
};
CQ.security.SecurityAdmin.removeMembership=function(E,G,C,F,D){var B=window.CQ_SecurityAdmin;
var A=D?B.REMOVE_USER_FROM_GROUP:B.REMOVE_GROUP_FROM_GROUP;
CQ.Ext.Msg.show({title:B.getMsg(B.REMOVE_MEMBERSHIP_TITLE),msg:CQ.Ext.util.Format.htmlEncode(B.getMsg(A,[F,G])),buttons:CQ.Ext.Msg.YESNO,icon:CQ.Ext.MessageBox.QUESTION,fn:function(I){if(I=="yes"){var H=window.CQ_SecurityAdmin;
H.mask();
CQ.HTTP.post(E,null,{_charset_:"utf-8",memberAction:"removeMembers",memberEntry:C});
if(D){H.refreshUserQuickView()
}else{H.refreshGroupQuickView()
}H.unmask()
}},scope:this})
};
CQ.security.SecurityAdmin.removeMembers=function(){var A=window.CQ_SecurityAdmin;
var C=A.groupsGrid.getSelectionModel().getSelections()[0];
var B=A.membersGrid.getSelectionModel().getSelections();
var D=CQ.security.SecurityAdmin.createConfirmMessage(B,A.getMsg(A.REMOVE_MEMBER,CQ.shared.XSS.getXSSRecordPropertyValue(C,"name")),A.getMsg(A.REMOVE_MEMBERS,CQ.shared.XSS.getXSSRecordPropertyValue(C,"name")));
CQ.Ext.Msg.show({msg:D,buttons:CQ.Ext.Msg.YESNO,icon:CQ.Ext.MessageBox.QUESTION,fn:function(H){if(H=="yes"){var E=window.CQ_SecurityAdmin;
E.mask();
var F=[];
for(var G=0;
G<B.length;
G++){F.push(B[G].get("id"))
}CQ.HTTP.post(C.get("home"),null,{_charset_:"utf-8",memberAction:"removeMembers",memberEntry:F});
E.membersGrid.getStore().reload();
E.membersGrid.quickView.collapse();
E.groupsGrid.getStore().reload();
E.groupsPanel.refreshQuickView();
E.usersPanel.refreshQuickView();
E.unmask()
}},scope:this})
};
CQ.security.SecurityAdmin.showMembers=function(){try{var A=window.CQ_SecurityAdmin;
var D=A.groupsGrid.getSelectionModel().getSelections();
var C=CQ.WCM.getDialogConfig(A.membersDialogPath);
CQ.security.SecurityAdmin.injectGroup(C,D[0].get("id"));
C.buttons=CQ.Dialog.CANCEL;
C=CQ.Util.applyDefaults(C,{title:A.getMsg(A.MEMBERS_TITLE,[CQ.shared.XSS.getXSSRecordPropertyValue(D[0],"name")]),width:850,height:450,cancelText:CQ.I18n.getMessage("Close"),closeAction:"close"});
var B=CQ.WCM.getDialog(C);
B.show();
A.membersPanel=CQ.Ext.getCmp("membersPanel");
A.membersGrid=CQ.Ext.getCmp("membersGrid")
}catch(E){}};
CQ.security.SecurityAdmin.injectGroup=function(A,B){if(A.id=="membersGrid"){if(!A.queryCfg){A.queryCfg={}
}A.queryCfg.group=B;
return true
}if(typeof A=="object"&&!(A instanceof Array)){for(var C in A){var D=CQ.security.SecurityAdmin.injectGroup(A[C],B);
if(D){return true
}}}return false
},CQ.security.SecurityAdmin.importCSV=function(B){var A=window.CQ_SecurityAdmin;
if(!B){B=new CQ.mcm.ImportCsvWizard()
}B.on("beforesubmit",function(){A.mask()
});
B.success=function(){A.reloadUsersGrid();
A.reloadGroupsGrid();
if(A.dashboard&&A.dashboard.listsDataView){A.dashboard.listsDataView.getStore().reload()
}A.unmask()
};
B.failure=function(){A.unmask()
};
B.show()
};
CQ.security.SecurityAdmin.showGroupInGrid=function(D){try{var B=window.CQ_SecurityAdmin;
B.deck.layout.setActiveItem(B.groupsPanel);
var A=B.groupsGrid.getStore();
A.each(function(E){if(E.id==D){B.groupsGrid.getSelectionModel().selectRecords([E]);
B.showGroupQuickView();
return false
}});
B.navButtons.groupsPanel.toggle()
}catch(C){}};
CQ.security.SecurityAdmin.THOUSANDS=CQ.I18n.getMessage("Thousands");
CQ.security.SecurityAdmin.HUNDREDS=CQ.I18n.getMessage("Hundreds");
CQ.security.SecurityAdmin.formatMax=function(A){if(A>=2000){return CQ.security.SecurityAdmin.THOUSANDS
}else{if(A>=200){return CQ.security.SecurityAdmin.HUNDREDS
}else{return CQ.I18n.getMessage("More than {0}",A)
}}};
CQ.security.SecurityGridPanel=CQ.Ext.extend(CQ.Ext.grid.GridPanel,{queryCfg:{},constructor:function(D){D=D||{};
var A=this;
this.id=D.id;
this.query=new CQ.security.search.Query(CQ.Util.applyDefaults(D.queryCfg,{max:CQ.security.themes.SecurityGridPanel.PAGE_SIZE}));
this.actions=[];
this.checkedActions=[];
var J=[];
this.actions.push({id:this.id+"-refresh",iconCls:"cq-siteadmin-refresh",handler:function(){A.store.reload()
},tooltip:{text:"Refresh",autoHide:true}});
this.actions.push("-");
this.actions=this.actions.concat(this.formatActions(D.actions,J));
this.actions.push("->");
if(D.searchField){var N=CQ.Util.applyDefaults(D.searchField,{xtype:"trigger",triggerClass:"x-form-search-trigger "+this.id+"-search-trigger",enableKeyEvents:true,width:140,search:function(O){O.query.term=this.getValue();
O.getStore().load()
},onTriggerClick:function(){this.search(A)
},listeners:{specialkey:function(O,P){if(P.getKey()==P.ENTER){this.search(A)
}}}});
this.searchField=new CQ.Util.build(N);
this.actions.push(new CQ.Ext.Panel({border:false,width:N.width,items:this.searchField}))
}if(D.helpButton){var C=CQ.wcm.HelpBrowser.createHelpButton();
C.id=this.id+"-help";
this.actions.push(C)
}var H=CQ.Util.applyDefaults(D.pagingToolbarCfg,{xtype:"paging",hidden:true,pageSize:this.query.max,store:null,displayInfo:true,displayMsg:CQ.I18n.getMessage("{2} results",null,"paging display: {2} is the total, e.g. 29 results"),maxMsg:CQ.I18n.getMessage("Thousands of Results"),emptyMsg:"",beforePageText:CQ.I18n.getMessage("Page",null,"paging display: sample: Page 2 of 5"),afterPageText:CQ.I18n.getMessage("of {0}",null,"paging display: {0} is the total, e.g. Page 2 of 5"),firstText:CQ.I18n.getMessage("First Page"),prevText:CQ.I18n.getMessage("Previous Page"),nextText:CQ.I18n.getMessage("Next Page"),lastText:CQ.I18n.getMessage("Last Page"),refreshText:CQ.I18n.getMessage("Refresh")});
H.originalMsg=H.displayMsg;
this.pagingToolbar=CQ.Util.build(H,true);
if(!D.storeReaderFields){D.storeReaderFields=[]
}D.storeReaderFields.push("home","id");
var F=new CQ.Ext.grid.CheckboxSelectionModel();
D=CQ.Util.applyDefaults(D,{autoScroll:true,flex:1,border:false,cls:"cq-security-grid",storeProxyUrl:"/libs/cq/security/content/authorizableSearch.json",storeReaderTotalProperty:"results",storeReaderRoot:"authorizables",storeReaderId:"home",storeBaseParams:{props:D.storeReaderFields.join(","),ml:2000},columns:[],stateful:true,stripeRows:true,viewConfig:new CQ.Ext.grid.GridView({forceFit:true}),defaults:{sortable:true},tbar:this.actions,bbar:this.pagingToolbar,selModel:F,listeners:{rowcontextmenu:function(P,O,R){if(R.altKey){return 
}var Q=R.getXY();
R.stopEvent();
var S=P.getSelectionModel();
if(!S.hasSelection()){S.selectRow(O)
}else{if(!S.isSelected(O)){S.selectRow(O)
}}if(!P.contextMenu&&(J.length>0)){P.contextMenu=new CQ.Ext.menu.Menu({items:J,listeners:{beforeshow:function(){P.checkActions.call(P);
if(!this.hasDefaultAction){this.items.find(function(T){if(T.isDefaultAction===true){T.addClass("x-menu-item-default");
this.hasDefaultAction=true;
return true
}else{return false
}})
}}}})
}P.contextMenu.showAt(Q)
}}});
var K=[F];
for(var E=0;
E<D.columns.length;
E++){var I=D.columns[E];
var M=null;
if(typeof I=="string"){M=I
}else{if(typeof I=="object"){if(I.usePredefined){M=I.usePredefined
}}}if(M&&CQ.security.SecurityGridPanel.COLUMNS[M]){var L=CQ.Util.copyObject(CQ.security.SecurityGridPanel.COLUMNS[M]);
for(var B in I){if(B=="usePredefined"){continue
}L[B]=I[B]
}CQ.shared.XSS.updatePropertyName(L,"dataIndex");
K.push(L)
}else{K.push(I)
}}D.columns=K;
if(!D.store){var G={autoLoad:false,proxy:new CQ.Ext.data.HttpProxy({api:{read:{url:D.storeProxyUrl,method:"GET"}}}),baseParams:D.storeBaseParams,reader:new CQ.Ext.data.JsonReader({totalProperty:D.storeReaderTotalProperty,root:D.storeReaderRoot,id:D.storeReaderId,fields:D.storeReaderFields}),listeners:{beforeload:function(){try{A.mask()
}catch(O){}},load:function(){A.checkPagingToolbar(this.getTotalCount());
try{A.unmask()
}catch(O){}}},remoteSort:true,paramNames:{start:"offset",limit:"max"},load:function(O){O=O||{};
this.storeOptions(O);
if(this.sortInfo&&this.remoteSort){var Q=A.getColumnModel().getColumnsBy(function(R){return R.dataIndex==this.sortInfo.field
},this);
if(Q&&Q[0]){A.query.sortBy=Q[0].sortProp||Q[0].dataIndex
}A.query.sortDir=this.sortInfo.direction.toLowerCase()
}O.params=O.params||{};
O.params.query=A.query.getString();
O.params.max=A.pagingToolbar.pageSize;
try{return this.execute("read",null,O)
}catch(P){this.handleException(P);
return false
}}};
D.store=new CQ.Ext.data.Store(G)
}CQ.security.SecurityGridPanel.superclass.constructor.call(this,D)
},initComponent:function(){CQ.security.SecurityGridPanel.superclass.initComponent.call(this);
var A=this;
this.initState();
this.getSelectionModel().on("selectionchange",function(B){A.checkActions()
});
this.pagingToolbar.bindStore(this.getStore());
this.pagingToolbar.moveFirst()
},showPagingToolbar:function(){if(this.pagingToolbar.hidden){this.pagingToolbar.show();
if(this.pagingToolbar.ownerCt){this.pagingToolbar.ownerCt.doLayout()
}}},hidePagingToolbar:function(){if(!this.pagingToolbar.hidden){this.pagingToolbar.hide();
if(this.pagingToolbar.ownerCt){this.pagingToolbar.ownerCt.doLayout()
}}},checkPagingToolbar:function(A){if(A==this.query.totalMax){this.pagingToolbar.displayMsg=this.pagingToolbar.maxMsg
}else{this.pagingToolbar.displayMsg=this.pagingToolbar.originalMsg
}if(A<=this.pagingToolbar.pageSize){this.hidePagingToolbar()
}else{this.showPagingToolbar()
}},mask:function(){CQ.x=this;
if(!this.loadMask){this.loadMask=new CQ.Ext.LoadMask(this.body,{msg:CQ.I18n.getMessage("Loading...")})
}this.loadMask.show()
},unmask:function(){if(!this.loadMask){return 
}this.loadMask.hide()
}});
CQ.Ext.reg("securitygrid",CQ.security.SecurityGridPanel);
CQ.Ext.override(CQ.security.SecurityGridPanel,CQ.wcm.AdminBase);
CQ.security.SecurityGridPanel.createColumnLink=function(C,B,A){if(!A){A="cq-security-grid-link"
}return'<span class="'+A+'" onclick="'+B+'">'+C+"</span>"
};
CQ.security.SecurityGridPanel.COLUMNS={id:{header:CQ.I18n.getMessage("ID"),id:"id",dataIndex:"id",sortable:true,sortProp:"@rep:principalName",width:150,renderer:function(C,B,A){return CQ.security.SecurityGridPanel.createColumnLink(C,"CQ.security.SecurityAdmin.openUser('"+A.get("home")+"');")
}},plainId:{header:CQ.I18n.getMessage("ID"),id:"plainId",dataIndex:"id",sortable:true,sortProp:"@rep:principalName",width:150},groupName:{header:CQ.I18n.getMessage("Name"),id:"name",dataIndex:"name",sortable:true,sortProp:"profile/@givenName",renderer:function(C,B,A){return CQ.security.SecurityGridPanel.createColumnLink(C,"CQ.security.SecurityAdmin.openGroup('"+A.get("home")+"');")
},width:150},name:{header:CQ.I18n.getMessage("Name"),id:"name",dataIndex:"name",sortable:true,sortProp:"profile/@givenName"},membersTotal:{header:CQ.I18n.getMessage("Members"),id:"membersTotal",dataIndex:"membersTotal",sortable:false,width:80,fixed:true,renderer:function(E,C,B,F,A,D){if(E==D.baseParams.ml){return CQ.security.SecurityAdmin.formatMax(D.baseParams.ml)
}else{return E
}}},membershipsTotal:{header:CQ.I18n.getMessage("Memberships"),id:"memberOfTotal",dataIndex:"memberOfTotal",sortable:false,width:80,fixed:true,renderer:function(E,C,B,F,A,D){if(E==D.baseParams.ml){if(E>=2000){return CQ.I18n.getMessage("Thousands")
}else{return CQ.I18n.getMessage("Hundreds")
}}else{return E
}}},familyName:{header:CQ.I18n.getMessage("Family Name"),id:"familyName",dataIndex:"familyName",sortable:true,sortProp:"profile/@familyName"},givenName:{header:CQ.I18n.getMessage("Given Name"),id:"givenName",dataIndex:"givenName",sortable:true,sortProp:"profile/@givenName"},email:{header:CQ.I18n.getMessage("Email"),id:"email",dataIndex:"email",sortable:true,sortProp:"profile/@email"},aboutMe:{header:CQ.I18n.getMessage("Description"),id:"aboutMe",dataIndex:"aboutMe",sortable:true,sortProp:"profile/@aboutMe",width:300},picture:{dataIndex:"picturePath",header:'<span class="hidden">'+CQ.I18n.getMessage("Picture")+"</span>",id:"picture",width:52,menuDisabled:true,hideable:true,sortable:false,renderer:function(C,B,A){if(C){var F=A.get("pictureExt");
var E=A.get("pictureMod");
var D=CQ.HTTP.externalize(C)+"/image.prof.thumbnail.48."+F+"/"+E+"."+F;
return'<img src="'+D+'" height="48" width="48">'
}else{return"<div></div>"
}}},published:{header:CQ.I18n.getMessage("Published"),id:"published",dataIndex:"replication.published",renderer:function(G,A,C){var E="";
var H="";
var D=C.data.replication;
var B="";
var I=CQ.I18n.getMessage("N/A");
var F=CQ.I18n.getMessage("N/A");
if(D&&D.published){H=CQ.wcm.SiteAdmin.formatDate(new Date(D.published));
H+=" ("+CQ.shared.XSS.getXSSTablePropertyValue(D,"publishedBy")+")";
if(D.numQueued){B=' ext:qtip="<nobr>';
if(D.action=="ACTIVATE"){E="status-pending-activation";
B+=CQ.I18n.getMessage("Activation pending. #{0} in Queue.",D.numQueued)
}else{E="status-pending-deactivation";
B+=CQ.I18n.getMessage("Deactivation pending. #{0} in Queue.",D.numQueued)
}B+='</nobr>"'
}else{if(D.action=="ACTIVATE"){if(!C.data.timeUntilValid){if(!C.data.offTime){E="status-activated"
}else{E="status-offtime"
}}else{if(C.data.timeUntilValid){if(C.data.offTime){E="status-onofftime"
}else{E="status-ontime"
}}else{E="status-deactivated"
}}}else{E="status-deactivated"
}}if(C.data.timeUntilValid&&(C.data.onTime||C.data.offTime)){B='ext:qtip="<nobr>';
if(C.data.onTime){I=CQ.wcm.SiteAdmin.formatDate(new Date(C.data.onTime));
B+="<b>"+CQ.I18n.getMessage("On Time")+":</b> "+I+"<br/>"
}if(C.data.offTime){F=CQ.wcm.SiteAdmin.formatDate(new Date(C.data.offTime));
B+="<b>"+CQ.I18n.getMessage("Off Time")+":</b> "+F+"<br/>"
}B+='</nobr>"'
}}else{E="status-none"
}return'<div class="status double '+E+'" '+B+"><span>"+H+"</span></div>"
}}};
CQ.security.AuthorizablesPanel=CQ.Ext.extend(CQ.Ext.Panel,{constructor:function(B){var A=this;
this.rows=[];
B.quickViewCfg=B.quickViewCfg||{};
B.quickViewCfg.membersLimit=CQ.security.AuthorizablesPanel.QUICKVIEW_MEMBERSLIMIT;
this.quickView=CQ.Util.build(CQ.Util.applyDefaults(B.quickViewCfg,{xtype:"panel",cls:"cq-security-authorizables-qv",quickViewGrid:this,region:"east",border:true,autoScroll:true,props:"*,members",servletSelector:"userprops",width:CQ.security.themes.AuthorizablesPanel.QUICKVIEW_WIDTH,margins:CQ.security.themes.AuthorizablesPanel.QUICKVIEW_MARGINS,padding:CQ.security.themes.AuthorizablesPanel.QUICKVIEW_PADDING,collapsed:true,collapseMode:"mini",collapsible:true,hideCollapseTool:true,split:true,animate:true,collapsedByUser:false,collapsingByDeselection:true,listeners:{collapse:function(){this.collapsedByUser=!this.collapsingByDeselection;
this.collapsingByDeselection=false
},beforeexpand:function(){if(this.collapsedByUser){this.collapsedByUser=false;
A.showQuickView()
}this.collapsedByUser=false;
return true
}}}));
var C=CQ.Util.build(this.getQuickViewConfig(B.quickViewRows,this.rows));
this.quickView.add(C);
this.grid=CQ.Util.build(CQ.Util.applyDefaults(B.gridConfig,{xtype:"securitygrid",region:"center",margins:CQ.security.themes.AuthorizablesPanel.GRID_MARGINS,border:true,quickView:this.quickView,listeners:{rowclick:function(E,D){A.showQuickView()
}}}));
B=CQ.Util.applyDefaults(B,{layout:"border",border:false,cls:"cq-security-authorizables",items:[this.grid,this.quickView]});
CQ.security.AuthorizablesPanel.superclass.constructor.call(this,B)
},showQuickView:function(){var A=this.grid.getSelectionModel().getSelections();
if(A.length==0){this.quickView.collapsingByDeselection=true;
this.quickView.collapse();
this.clearQuickView();
this.quickView.doLayout();
return 
}else{if(this.quickView.collapsedByUser){return 
}}this.quickView.path=A[A.length-1].id;
this.quickView.expand();
this.refreshQuickView()
},refreshQuickView:function(){if(!this.quickView.path){return 
}var url=this.quickView.path+"."+this.quickView.servletSelector+".json";
url=CQ.HTTP.addParameter(url,"props",this.quickView.props);
url=CQ.HTTP.addParameter(url,"ml",this.quickView.membersLimit);
url=CQ.HTTP.noCaching(url);
var resp=CQ.HTTP.eval(url);
for(var i=0;
i<this.rows.length;
i++){var value=resp[this.rows[i].dataIndex];
if(this.rows[i].renderer){value=this.rows[i].renderer(value,resp)
}value=value||value==0?value:"";
if(!this.rows[i].labelItem){if(!value){this.rows[i].valueItem.hide()
}else{this.rows[i].valueItem.show()
}}this.rows[i].valueItem.updateHtml(value)
}this.quickView.doLayout()
},clearQuickView:function(){for(var A=0;
A<this.rows.length;
A++){if(!this.rows[A].labelItem&&A!=0){this.rows[A].valueItem.hide()
}this.rows[A].valueItem.updateHtml("&nbsp;")
}},getQuickViewConfig:function(C,E){var B=[];
var A=C;
if(!A){A=[]
}for(var D=0;
D<A.length;
D++){var G=this.getQuickViewRowConfig(A[D],CQ.security.AuthorizablesPanel.QUICKVIEW_ROWS);
CQ.shared.XSS.updatePropertyName(G,"dataIndex");
var F=this.createQuickViewRow(G);
E.push(F);
if(F.labelItem){B.push(F.labelItem)
}B.push(F.valueItem)
}return{xtype:"panel",layout:"table",border:false,bodyCfg:{cls:this.id+"-body-padding"},layoutConfig:{columns:2},items:B}
},getQuickViewRowConfig:function(B,C){var A=null;
if(typeof B=="string"){A=B
}else{if(typeof B=="object"){if(B.usePredefined){A=B.usePredefined
}}}if(A&&C[A]){var D=CQ.Util.copyObject(C[A]);
for(var E in B){if(E=="usePredefined"){continue
}D[E]=B[E]
}return D
}else{return B
}},createQuickViewRow:function(A){if(!A.id){A.id=A.dataIndex
}if(!A.dataIndex){A.dataIndex=A.id
}if(!A.labelItem&&A.label){A.labelItem=new CQ.Static({cls:A.labelCls?A.labelCls:"cq-security-quickview-topline",text:A.label,noWrap:A.noLabelWrap!==false})
}if(!A.valueItem){A.valueItem=new CQ.Static({cls:A.valueCls?A.valueCls:("cq-security-quickview-"+(A.labelItem?"topline":"2cols")),html:"",noWrap:A.noValueWrap!==false&&A.labelItem,colspan:A.labelItem?1:2})
}return A
}});
CQ.Ext.reg("securityauthorizablespanel",CQ.security.AuthorizablesPanel);
CQ.security.AuthorizablesPanel.QUICKVIEW_MEMBERSLIMIT=2000;
CQ.security.AuthorizablesPanel.QUICKVIEW_ROWS={name:{dataIndex:"name",valueCls:"cq-security-quickview-title"},picture:{dataIndex:"picturePath",valueCls:"cq-security-quickview-picture",renderer:function(A,E){if(A){var D=E.pictureExt;
var C=E.pictureMod;
var B=CQ.HTTP.externalize(A)+"/image.prof.thumbnail.96."+D+"/"+C+"."+D;
return'<img src="'+B+'" height="96" width="96">'
}else{return""
}}},email:{dataIndex:"email",renderer:function(A){return A?'<a href="mailto:'+A+'">'+A+"</a>":A
}},created:{dataIndex:"jcr:created",label:CQ.I18n.getMessage("Created"),renderer:function(A){try{return CQ.wcm.SiteAdmin.formatDate(new Date(A))
}catch(B){return""
}}},lastModified:{dataIndex:"cq:lastModified",label:CQ.I18n.getMessage("Last modified"),renderer:function(A){try{return CQ.wcm.SiteAdmin.formatDate(new Date(A))
}catch(B){return""
}}},createdBy:{dataIndex:"jcr:createdBy",label:CQ.I18n.getMessage("Created by")},lastModifiedBy:{dataIndex:"cq:lastModifiedBy",label:CQ.I18n.getMessage("Last modified by")},members:{id:"members",label:CQ.I18n.getMessage("Members"),renderer:function(A,C){try{if(C.membersTotal==CQ.security.AuthorizablesPanel.QUICKVIEW_MEMBERSLIMIT){return CQ.security.SecurityAdmin.formatMax(CQ.security.AuthorizablesPanel.QUICKVIEW_MEMBERSLIMIT)
}else{return C.membersTotal
}}catch(B){return 0
}}},description:{dataIndex:"aboutMe"},csv:{id:"csv",label:CQ.I18n.getMessage("Imported CSV")},memberships:{dataIndex:"memberOf",renderer:function(B,F){var E;
var A=window.CQ_SecurityAdmin;
var D=this.xssProtect?F[CQ.shared.XSS.getXSSPropertyName("name")]:F.name;
if(B.length==0){return A.getMsg(A.X_NOT_MEMBER_OF_ANY,[D])
}else{if(B.length==1){E=A.getMsg(A.X_IS_MEMBER_OF,[D])
}else{E=A.getMsg(A.X_IS_MEMBER_OF_Y_GROUPS,[D,B.length])+"</br>"
}}E+='<div class="cq-security-quickview-memberships">';
for(var C=0;
C<B.length;
C++){var G=CQ.shared.XSS.getXSSTablePropertyValue(B[C],"name",70);
E+='<span class="cq-security-quickview-remove" onclick="CQ.security.SecurityAdmin.removeMembership(\''+B[C].home+"','"+G+"','"+F.id+"','"+D+"',true);\"></span>";
E+='<span class="cq-security-grid-link cq-security-quickview-membership" onclick="CQ.security.SecurityAdmin.showGroupInGrid(\''+B[C].home+"');\">"+G+"</span>"
}E+="</div>";
return E
}},plainMemberships:{dataIndex:"memberOf",renderer:function(B,G){var F;
var A=window.CQ_SecurityAdmin;
var E=this.xssProtect?G[CQ.shared.XSS.getXSSPropertyName("name")]:G.name;
if(B.length==0){return A.getMsg(A.X_NOT_MEMBER_OF_ANY,[E])
}else{if(B.length==1){F=A.getMsg(A.X_IS_MEMBER_OF,[E])
}else{F=A.getMsg(A.X_IS_MEMBER_OF_Y_GROUPS,[E,B.length])+"</br>"
}}F+='<div class="cq-security-quickview-indented">';
for(var C=0;
C<B.length;
C++){var D=CQ.shared.XSS.getXSSTablePropertyValue(B[C],"name",70);
F+=D+"<br>"
}F+="</div>";
return F
}},membershipsForGroups:{dataIndex:"memberOf",renderer:function(B,G){var F;
var A=window.CQ_SecurityAdmin;
var C=this.xssProtect?G[CQ.shared.XSS.getXSSPropertyName("name")]:G.name;
if(B.length==0){return A.getMsg(A.GROUP_X_NOT_MEMBER_OF_ANY,[C])
}else{if(B.length==1){F=A.getMsg(A.GROUP_X_IS_MEMBER_OF,[C])
}else{F=A.getMsg(A.GROUP_X_IS_MEMBER_OF_Y_GROUPS,[C,B.length])+"</br>"
}}F+='<div class="cq-security-quickview-memberships">';
for(var D=0;
D<B.length;
D++){var E=CQ.shared.XSS.getXSSTablePropertyValue(B[D],"name",70);
F+='<span class="cq-security-quickview-remove" onclick="CQ.security.SecurityAdmin.removeMembership(\''+B[D].home+"','"+E+"','"+G.id+"','"+C+"',true);\"></span>";
F+='<span class="cq-security-grid-link cq-security-quickview-membership" onclick="CQ.security.SecurityAdmin.showGroupInGrid(\''+B[D].home+"');\">"+E+"</span>"
}F+="</div>";
return F
}},address:{dataIndex:"streetAddress",renderer:function(A,G){var C="";
var B=this.xssProtect?G[CQ.shared.XSS.getXSSPropertyName("email")]:G.email;
C+=B?'<a href="mailto:'+B+'">'+B+"</a><br><br>":"";
C+=A?A+"<br>":"";
var F=this.xssProtect?G[CQ.shared.XSS.getXSSPropertyName("city")]:G.city;
var E=this.xssProtect?G[CQ.shared.XSS.getXSSPropertyName("region")]:G.region;
var D=this.xssProtect?G[CQ.shared.XSS.getXSSPropertyName("postalCode")]:G.postalCode;
C+=F?F+"<br>":"";
C+=E?E+" ":"";
C+=D?D+"<br>":"";
C+=G.country?G.country+"<br>":"";
C+=C?"<br>":"";
return C
}}};
CQ.security.ImportCsvWizard=CQ.Ext.extend(CQ.Dialog,{dataView:null,progressStore:null,progressTemplate:null,progressPanel:null,firstPanel:null,lastPanel:null,loadMask:null,allData:null,constructor:function(C){var D=this;
this.activePage=0;
this.progressStore=[{idx:0,title:CQ.I18n.getMessage("Enter Data")},{idx:1,title:this.getMsg(this.PROGRESS_PREVIEW_USERS)},{idx:2,title:this.getMsg(this.PROGRESS_SELECT_GROUP)}];
this.progressTemplate=new CQ.Ext.XTemplate('<div class="x-toolbar x-small-editor">','<table cellspacing="0"><tr>','<tpl for=".">','<tpl if="values.idx != 0">','<td><span class="wiz-sep">&rarr;</span></td>',"</tpl>",'<td><span class="wiz-step {[this.isActive(values.idx) ? "wiz-step-active" : ""]}">{#}. {title}</span></td>',"</tpl>","</table>","</div>",{isActive:function(E){return E==D.activePage
}});
this.progressPanel=new CQ.Ext.Panel({cls:"cq-wizard-progress",border:false,html:this.progressTemplate.apply(this.progressStore)});
this.firstPanel=new CQ.Ext.Panel({layout:"form",autoScroll:true,header:false,bodyStyle:CQ.themes.Dialog.TAB_BODY_STYLE,labelWidth:CQ.themes.Dialog.LABEL_WIDTH,defaultType:"textfield",stateful:false,defaults:{msgTarget:CQ.themes.Dialog.MSG_TARGET,anchor:CQ.themes.Dialog.ANCHOR,stateful:false},items:[{xtype:"static",italic:true,text:CQ.I18n.getMessage("Enter or paste a comma or tab separated value ...")},this.textArea=new CQ.Ext.form.TextArea({xtype:"textarea",hideLabel:true,height:120,enableKeyEvents:true,listeners:{keyup:function(){D.nextButton.enable()
}}}),{xtype:"static",html:"<br>"},{xtype:"panel",layout:"table",cls:"cq-importcsv-hints",border:false,layoutConfig:{columns:2},items:[{xtype:"static",small:true,html:CQ.I18n.getMessage("Sample data:")+"<br>email,givenName,familyName<br>claude.johnson@pookmail.com,Claude,Johnson<br>barbara.smith@spambob.com,Barbara,Smith<br>henry.jones@dodgit.com,Henry,Jones<br>"},{xtype:"static",small:true,cellCls:"cq-importcsv-hints-padding",html:"- "+CQ.I18n.getMessage("Values must be separated by comma or tabs")+"<br>- "+CQ.I18n.getMessage("First row must be a header")+"<br>- "+this.getMsg(this.FIRST_COLUMN_IS_HEADER)}]},{name:"delimiter",xtype:"hidden",value:'"',ignoreData:true},{name:"separator",xtype:"hidden",value:",",ignoreData:true},{name:"category",xtype:"hidden",value:"mcm",ignoreData:true},this.valueField=new CQ.Ext.form.Hidden({name:"csv",ignoreData:true})]});
this.secondPanel=new CQ.Ext.Panel({layout:"fit",autoScroll:true,header:false,bodyStyle:"padding:0;",border:false,labelWidth:CQ.themes.Dialog.LABEL_WIDTH,stateful:false,defaults:{msgTarget:CQ.themes.Dialog.MSG_TARGET,anchor:CQ.themes.Dialog.ANCHOR,stateful:false}});
this.thirdPanel=new CQ.Ext.Panel({isLast:true,layout:"form",bodyStyle:CQ.themes.Dialog.TAB_BODY_STYLE,labelWidth:CQ.themes.Dialog.LABEL_WIDTH,defaultType:"textfield",stateful:false,defaults:{msgTarget:CQ.themes.Dialog.MSG_TARGET,hideLabel:true,stateful:false},items:[{xtype:"static",bottommargin:true,text:this.getMsg(this.ADD_USERS_TO_FOLLOWING)},this.groupIdField=new CQ.Ext.form.TextField({name:"groupId",width:300,value:""}),{xtype:"static",small:true,bottommargin:true,topmargin:true,text:this.getMsg(this.LEAVE_EMPTY)}],listeners:{beforeShow:function(){var E=CQ.I18n.getMessage("List",[],"marketing terminology")+" "+CQ.wcm.SiteAdmin.formatDate(new Date());
D.groupIdField.setValue(E)
}}});
var A=function(){D.navHandler.call(D,1)
};
var B=function(){D.navHandler.call(D,-1)
};
this.wizPanel=new CQ.Ext.Panel({layout:"card",deferredRender:false,plain:CQ.themes.Dialog.TABPANEL_PLAIN,border:false,stateful:false,activeItem:0,bbar:this.progressPanel,defaults:{border:false},items:[this.firstPanel,this.secondPanel,this.thirdPanel]});
this.prevButton=new CQ.Ext.Button({text:CQ.I18n.getMessage("Prev"),cls:"cq-btn-prev",handler:B,disabled:true,minWidth:CQ.themes.Dialog.MIN_BUTTON_WIDTH});
this.nextButton=new CQ.Ext.Button({text:CQ.I18n.getMessage("Next"),cls:"cq-btn-next",handler:A,disabled:true,minWidth:CQ.themes.Dialog.MIN_BUTTON_WIDTH});
C=CQ.Util.applyDefaults(C,{title:CQ.I18n.getMessage("Import Comma Separated Values"),formUrl:"/bin/security/csvimporter.json",width:780,height:376,params:{_charset_:"utf-8"},items:[this.wizPanel],buttons:[this.prevButton,this.nextButton,CQ.Dialog.CANCEL]});
CQ.security.ImportCsvWizard.superclass.constructor.call(this,C)
},mask:function(){if(!this.loadMask){this.loadMask=new CQ.Ext.LoadMask(this.body,{msg:CQ.I18n.getMessage("Loading...")})
}this.loadMask.show()
},unmask:function(){if(!this.loadMask){return 
}this.loadMask.hide()
},loadData:function(A){if(!A||A<0){A=0
}var B=this.textArea.getValue();
var C=B.indexOf("\t")!=-1?"\t":",";
B=B.split("\n");
var G=B.splice(0,1);
G=G[0].split(C);
for(var E=0;
E<G.length;
E++){G[E]=G[E].replace(/\W/g,"")
}if(!this.previewStore){this.previewStore=new CQ.Ext.data.ArrayStore({fields:G});
var D=[];
for(var E=0;
E<G.length;
E++){D.push({id:G[E],header:G[E],dataIndex:G[E],editor:new CQ.Ext.form.TextField(),renderer:CQ.shared.XSS.getXSSValue})
}this.previewColumnModel=new CQ.Ext.grid.ColumnModel({defaults:{sortable:true},columns:D})
}var F=[];
this.allData=[];
for(var E=0;
E<B.length;
E++){B[E]=B[E].split(C);
this.allData.push(B[E]);
if(E<A){F.push(B[E])
}}if(A==0){F=this.allData
}this.previewStore.loadData(F);
return B.length
},createGrid:function(){this.previewStore=null;
this.previewColumnModel=null;
var A=10;
var B=this.loadData(A);
var C;
if(B>A){C=[new CQ.Ext.Button({text:CQ.I18n.getMessage("Preview All ({0})",[B]),scope:this,handler:function(){this.mask();
var D=this;
window.setTimeout(function(){D.loadData();
D.resultsMessage.updateText(CQ.I18n.getMessage("{0} of {1}",[B,B]));
D.unmask()
},1)
}}),"->",this.resultsMessage=new CQ.Static({text:CQ.I18n.getMessage("{0} of {1}",[A,B])}),"&nbsp;"]
}this.grid=new CQ.Ext.grid.EditorGridPanel({store:this.previewStore,cm:this.previewColumnModel,stripeRows:true,stateful:false,stateId:"grid",clicksToEdit:1,tbar:C,viewConfig:new CQ.Ext.grid.GridView({forceFit:true})});
this.secondPanel.doLayout()
},ok:function(){var F=this.previewColumnModel.columns;
var E="";
for(var D=0;
D<F.length;
D++){E+='"'+F[D]["id"]+'"';
E+=(D==F.length-1)?"\n":","
}this.previewStore.each(function(H){for(var I=0;
I<F.length;
I++){E+='"'+H.get(F[I]["id"])+'"';
E+=(I==F.length-1)?"\n":","
}},this);
for(var D=this.previewStore.getTotalCount();
D<this.allData.length;
D++){for(var B=0;
B<F.length;
B++){var A=this.allData[D][B];
E+='"'+(A?A:"")+'"';
E+=(B==F.length-1)?"\n":","
}}this.valueField.setValue(E);
this.textArea.disable();
var G=this.groupIdField.getValue();
var C=CQ.Ext.form.VTypes.makeAuthorizableId(G);
if(G!=C){this.addParams({groupName:G});
this.groupIdField.setValue(C)
}CQ.security.ImportCsvWizard.superclass.ok.call(this)
},navHandler:function(D){var B=this.wizPanel.items.getCount();
var A=this.activePage+D;
if(A==B){this.ok()
}else{if(A>=0&&A<B){this.activePage=A;
this.wizPanel.layout.setActiveItem(A);
this.updateButtons();
if(A==1&&D>0){this.mask();
var C=this;
window.setTimeout(function(){C.secondPanel.removeAll();
C.createGrid();
C.secondPanel.add(C.grid);
C.unmask();
C.doLayout()
},1)
}}}},updateProgressBar:function(){var B=[];
var A=0;
this.wizPanel.items.each(function(){B.push({title:this.title,idx:A++})
});
this.progressStore=B
},updateButtons:function(){var A=this.wizPanel.items.getCount();
if(this.activePage<A){this.nextButton.enable();
if(this.activePage==A-1){this.nextButton.setText("Import")
}else{this.nextButton.setText("Next")
}}else{this.nextButton.disable();
this.nextButton.setText("Next")
}if(this.activePage>0){this.prevButton.enable()
}else{this.prevButton.disable()
}this.progressTemplate.overwrite(this.progressPanel.body,this.progressStore)
},getMsg:function(B,A){switch(B){case this.TITLE:return CQ.I18n.getMessage("Import Users");
case this.PROGRESS_PREVIEW_USERS:return CQ.I18n.getMessage("Preview Users");
case this.PROGRESS_SELECT_GROUP:return CQ.I18n.getMessage("Select Group");
case this.FIRST_COLUMN_IS_HEADER:return CQ.I18n.getMessage("First column will be used to create the user IDs");
case this.ADD_USERS_TO_FOLLOWING:return CQ.I18n.getMessage("Add the imported users to the following group:");
case this.LEAVE_EMPTY:return CQ.I18n.getMessage("If empty the imported users will not be added to any group.");
default:return""
}},TITLE:0,PROGRESS_PREVIEW_USERS:10,PROGRESS_SELECT_GROUP:11,FIRST_COLUMN_IS_HEADER:100,ADD_USERS_TO_FOLLOWING:300,LEAVE_EMPTY:301});
CQ.Ext.reg("importcsvwizard",CQ.security.ImportCsvWizard);
CQ.security.PermissionsDetailPanel=CQ.Ext.extend(CQ.Ext.Panel,{groupStore:null,authStore:null,overviewStore:null,path:null,constructor:function(A){this.path=A.path;
this.addEvents("memberUpdate");
this.overviewStore=new CQ.Ext.ux.maximgb.tg.AdjacencyListStore({autoLoad:false,sortInfo:{field:"name",direction:"ASC"},proxy:new CQ.Ext.data.HttpProxy({url:CQ.HTTP.externalize("/.cqactions.json"),method:"GET"}),baseParams:{authorizableId:A.authorizableId,predicate:"useradmin",depth:0},listeners:{beforeload:function(F,G){G.params.path=G.params.anode||"/"
},scope:this},reader:new CQ.Ext.data.PermissionReader({id:"_id",totalProperty:"total",root:"entries"},CQ.security.RightsPanel.RECORD)});
var E=new CQ.Ext.grid.EditorGridPanel({flex:1,disableSelection:true,master_column_id:"path",stripeRows:true,autoExpandColumn:"path",enableHdMenu:false,enableColumnMove:false,border:false,viewConfig:{enableRowBody:true,forceFit:true,sortClasses:[]},store:this.overviewStore,cm:new CQ.Ext.grid.ColumnModel({defaults:{sortable:false,menuDisabled:true,editable:false,fixed:true},columns:[{id:"path",header:CQ.I18n.getMessage("Path"),width:220,dataIndex:"name",renderer:CQ.security.RightsPanel.TreeGrid.renderFullPath},{id:"read",header:CQ.I18n.getMessage("Read"),dataIndex:"read",renderer:this.renderOverviewStatus},{id:"modify",header:CQ.I18n.getMessage("Modify"),dataIndex:"modify",renderer:this.renderOverviewStatus},{id:"create",header:CQ.I18n.getMessage("Create"),dataIndex:"create",renderer:this.renderOverviewStatus},{id:"delete",header:CQ.I18n.getMessage("Delete"),dataIndex:"delete",renderer:this.renderOverviewStatus},{id:"acl_read",header:CQ.I18n.getMessage("Read ACL"),dataIndex:"acl_read",renderer:this.renderOverviewStatus},{id:"acl_edit",header:CQ.I18n.getMessage("Edit ACL"),dataIndex:"acl_edit",renderer:this.renderOverviewStatus},{id:"replicate",header:CQ.I18n.getMessage("Replicate"),dataIndex:"replicate",renderer:this.renderOverviewStatus}],defaults:{width:65,sortable:false,menuDisabled:true,scope:this}})});
this.reloadOverView();
this.groupStore=new CQ.Ext.data.Store({autoLoad:true,remoteSort:true,sortInfo:{field:"authorizableId",direction:"ASC"},baseParams:{predicate:"useradmin",detailView:true},proxy:new CQ.Ext.data.HttpProxy({url:CQ.HTTP.externalize(A.path+".cqactions.json"),method:"GET"}),reader:new CQ.Ext.data.JsonReader({root:"entries",id:"_id",idProperty:"_id",totalProperty:"results"},CQ.security.PermissionsDetailPanel.RECORD),listeners:{beforeload:function(F,G){F.baseParams.authorizableId=A.authorizableId
},update:this.groupStoreChanged,scope:this}});
var D=new CQ.security.PermissionsDetailPanel.CheckColumn({id:"isMember",header:CQ.I18n.getMessage("Member"),dataIndex:"isMember",authorizableId:A.authorizableId});
var C=new CQ.Ext.grid.EditorGridPanel({flex:5,stripeRows:true,autoExpandColumn:"group",enableHdMenu:false,enableColumnMove:false,border:false,viewConfig:new CQ.Ext.grid.GridView({enableRowBody:true,forceFit:true,sortClasses:[]}),clicksToEdit:1,store:this.groupStore,cm:new CQ.Ext.grid.ColumnModel({columns:[{id:"group",header:CQ.I18n.getMessage("ID"),width:220,dataIndex:"authorizableId"},{id:"read",header:CQ.I18n.getMessage("Read"),dataIndex:"read",renderer:this.renderGroupStatus},{id:"modify",header:CQ.I18n.getMessage("Modify"),dataIndex:"modify",renderer:this.renderGroupStatus},{id:"create",header:CQ.I18n.getMessage("Create"),dataIndex:"create",renderer:this.renderGroupStatus},{id:"delete",header:CQ.I18n.getMessage("Delete"),dataIndex:"delete",renderer:this.renderGroupStatus},{id:"acl_read",header:CQ.I18n.getMessage("Read ACL"),dataIndex:"acl_read",renderer:this.renderGroupStatus},{id:"acl_edit",header:CQ.I18n.getMessage("Edit ACL"),dataIndex:"acl_edit",renderer:this.renderGroupStatus},D],defaults:{width:65,sortable:false,menuDisabled:true,scope:this}}),sm:new CQ.Ext.grid.RowSelectionModel({singleSelect:false}),plugins:D});
var B=CQ.Util.applyDefaults(A.store,{storeId:"cq-useradmin-permissions-authstore",autoLoad:true,proxy:new CQ.Ext.data.HttpProxy({url:"/bin/security/authorizables.json",method:"GET"}),baseParams:{_charset_:"utf-8"},reader:new CQ.security.data.AuthReader()});
this.authStore=new CQ.Ext.data.Store(B);
CQ.Util.applyDefaults(A,{layout:{type:"vbox",align:"stretch"},border:true,cls:"cq-security-permissionsdetail",items:[{html:'<span class="cq-static-bold">'+CQ.I18n.getMessage("Permissions for ")+A.authorizableId+"</span>",border:false,margins:"7 7 7 7"},E,{html:'<span class="cq-static-bold">'+CQ.I18n.getMessage("Permissions for path ")+this.path+"</span>",border:false,margins:"7 7 7 7"},C]});
CQ.security.PermissionsDetailPanel.superclass.constructor.call(this,A)
},initComponent:function(){CQ.security.PermissionsDetailPanel.superclass.initComponent.call(this)
},saveHandler:function(){var I=this.authStore.getById(this.groupStore.baseParams.authorizableId);
var A=I.get("home");
var B={};
var H=I.get("memberOf");
for(var G=0;
G<H.length;
G++){var F=encodeURIComponent(H[G].id);
B[F]=F
}var C=this.groupStore.getModifiedRecords();
for(var G=0;
G<C.length;
G++){var D=C[G];
var F=encodeURIComponent(D.get("authorizableId"));
if(D.get("isMember")==true){B[F]=F
}else{delete B[F]
}}var J=[];
for(group in B){J.push(B[group])
}var E={_charset_:"utf-8",memberAction:"memberOf",memberEntry:J};
CQ.HTTP.post(A,function(M,K){if(K){var L=CQ.Ext.getCmp("cq-useadmin-detailed-permissions-save");
L.disable();
this.authStore.removeAll();
this.authStore.reload({params:{},callback:function(N,O,Q){if(Q){this.groupStore.reload();
this.reloadOverView();
var P=this.authStore.getById(this.groupStore.baseParams.authorizableId);
this.fireEvent("memberUpdate",this,P,"memberOf",this.path)
}},scope:this})
}},E,this)
},groupStoreChanged:function(A,D,C){var B=CQ.Ext.getCmp("cq-useadmin-detailed-permissions-save");
if(B&&CQ.Ext.data.Record.COMMIT!=C){B.enable()
}},reloadOverView:function(){this.overviewStore.removeAll();
this.overviewStore.setActiveNode(null);
this.overviewStore.load({params:{anode:this.path,depth:0}})
},renderOverviewStatus:function(O,F,C,A,L,G,D){var H=C.get(F.id);
var J=C.get("authorizableId");
var N=C.get("declared")[F.id];
var E=N.effective;
var M=N["non-effective"];
var B=undefined;
if(E||M){var I=[];
if(E){I.push("<table class='cq-security-qtip-table'>");
I.push("<tr>");
I.push("<th class='status "+(H?"":"not-")+"allowed-permission'>&nbsp;</th>");
I.push("<th>"+(H?CQ.I18n.getMessage("Allowed for"):CQ.I18n.getMessage("Denied for"))+"</th>");
I.push("<th>&nbsp;</th>");
I.push("</tr>");
I.push(CQ.security.RightsPanel.TreeGrid.renderTemplate(E,function(Q){var P="<tr><td>&nbsp;</td><td>";
P+=Q;
P+="</td><td>";
P+="&nbsp;";
P+="</td></tr>";
return P
}));
I.push("</table>")
}if(M){if(E){I.push("<hr class='cq-security-qtip-separator'/>")
}I.push("<table class='cq-security-qtip-table'>");
I.push("<tr>");
I.push("<th>"+CQ.I18n.getMessage("Noneffective")+"</th>");
I.push("<th>&nbsp;</th>");
I.push("</tr>");
I.push(CQ.security.RightsPanel.TreeGrid.renderTemplate(M,function(Q){var P="<tr><td>";
P+=Q;
P+="</td></tr>";
return P
}));
I.push("</table>")
}B=I.join("\n");
B='ext:qwidth="auto" ext:qtip="'+B+'"'
}var K=["x-grid3"];
K.push(H?"check":"nocheck");
K.push((E||M)?"ov":"in");
K.push(M?"res":"nores");
return"<div "+(B?B:"")+'" class="x-grid3-check-col '+K.join("-")+'">&nbsp;<div/>'
},renderGroupStatus:function(N,G,C,A,M,H,E){var I=C.get(G.id);
var K=C.get("authorizableId");
var D=C.get("restrictions");
var B=undefined;
if(D){var J=[];
J.push("<table class='cq-security-qtip-table'>");
J.push("<tr>");
J.push("<th>"+CQ.I18n.getMessage("Restrictions")+"</th>");
J.push("<th>&nbsp;</th>");
J.push("</tr>");
for(var F in D){J.push("<tr><td>");
J.push(F);
J.push("</td><td>");
J.push(D[F]);
J.push("</td></tr>")
}J.push("</table>");
B=J.join("\n");
B='ext:qwidth="auto" ext:qtip="'+B+'"'
}var L=["x-grid3"];
if(I!==""){L.push((I===true?"":"no")+"check-in");
L.push((D?"":"no")+"res");
return"<div "+(B?B:"")+' class="x-grid3-check-col '+L.join("-")+'">&nbsp;<div/>'
}else{return""
}}});
CQ.security.PermissionsDetailPanel.DD_GROUP_GRID="cq-group-permissions-ddgroup";
CQ.security.PermissionsDetailPanel.RECORD=CQ.Ext.data.Record.create([{name:"_id"},{name:"authorizableId"},{name:"read"},{name:"modify"},{name:"create"},{name:"delete"},{name:"acl_read"},{name:"acl_edit"},{name:"isMember",type:"bool"},{name:"editMembership",type:"bool"},{name:"_id"},{name:"restrictions"}]);
CQ.security.PermissionsDetailPanel.CheckColumn=function(A){authorizableId:null,CQ.Ext.apply(this,A);
if(!this.id){this.id=CQ.Ext.id()
}this.authorizableId=A.authorizableId;
this.renderer=this.renderer.createDelegate(this)
};
CQ.security.PermissionsDetailPanel.CheckColumn.prototype={init:function(A){this.grid=A;
this.grid.on("render",function(){var B=this.grid.getView();
B.mainBody.on("mousedown",this.onMouseDown,this)
},this)
},onMouseDown:function(D,B){if(B.className&&B.className.indexOf("x-grid3-cc-"+this.id)!=-1){D.stopEvent();
var G=this.grid.getView().findRowIndex(B);
var C=this.grid.getView().findCellIndex(B);
var F=this.grid.getColumnModel().getDataIndex(C);
var A=this.grid.store.getAt(G);
var E=A.get("authorizableId");
if(!A.data[this.id].disabled&&A.data.editMembership){A.set(F,!A.data[F])
}}},renderer:function(B,C,A){var D=A.get("authorizableId");
if(A.data[this.id]!==""&&this.authorizableId!=D){C.css+=" x-grid3-check-col-td";
if(A.data[this.id].disabled||!A.data.editMembership){C.css+=" x-item-disabled"
}return'<div class="x-grid3-check-col'+(B?"-on":"")+" x-grid3-cc-"+this.id+'">&#160;</div>'
}else{return""
}}};
CQ.security.RightsPanel=CQ.Ext.extend(CQ.Ext.Panel,{tree:null,search:null,constructor:function(B){var A=this;
this.addEvents("authSaved");
this.tree=new CQ.security.RightsPanel.TreeGrid({listeners:{saveChange:function(D,C,E){A.fireEvent("authSaved",A,C,E)
}}});
this.search=new CQ.security.ClearableSearchField({disabled:true,id:"cq-useadmin-permissions-search",listeners:{select:function(E,C,D){this.tree.emptyStore();
this.tree.loadPath(C.id);
return true
},trigger1Click:function(){this.tree.resetRecords()
},scope:this}});
CQ.Util.applyDefaults(B,{id:"rights-panel",cls:"cq-security-rights",layout:"fit",border:false,bodyStyle:"padding:0px;",layoutConfig:{autoShow:true},title:CQ.I18n.getMessage("Permissions"),tbar:[{id:"cq-useadmin-permissions-save",text:CQ.I18n.getMessage("Save"),handler:this.saveHandler,disabled:true,title:CQ.I18n.getMessage("Save Changes"),tooltip:CQ.I18n.getMessage("Save changes to Permissions"),scope:this},{xtype:"tbfill"},this.search],items:this.tree});
CQ.security.RightsPanel.superclass.constructor.call(this,B)
},initComponent:function(){CQ.security.RightsPanel.superclass.initComponent.call(this)
},loadRecord:function(A){this.tree.loadRecord(A)
},onSelectionModfied:function(A){this.tree.loadRecord(A)
},saveHandler:function(){this.tree.saveHandler()
}});
CQ.security.RightsPanel.TreeGrid=CQ.Ext.extend(CQ.Ext.ux.maximgb.tg.EditorGridPanel,{store:null,reader:null,constructor:function(B){this.reader=new CQ.Ext.data.PermissionReader({id:"_id",totalProperty:"total",root:"entries"},CQ.security.RightsPanel.RECORD);
this.store=new CQ.Ext.ux.maximgb.tg.AdjacencyListStore({autoLoad:false,sortInfo:{field:"name",direction:"ASC"},proxy:new CQ.Ext.data.HttpProxy({url:CQ.HTTP.externalize("/.cqactions.json"),method:"GET"}),baseParams:{predicate:"useradmin",depth:1},listeners:{beforeload:function(C,D){D.params.path=D.params.anode||"/"
},update:this.storeChanged,scope:this},reader:this.reader});
var A=new CQ.Ext.grid.ColumnModel({defaults:{sortable:false,menuDisabled:true,scope:this},columns:[{id:"path",header:CQ.I18n.getMessage("Path"),width:160,dataIndex:"name",renderer:CQ.security.RightsPanel.TreeGrid.renderPath,editable:false},{id:"read",header:CQ.I18n.getMessage("Read"),width:75,dataIndex:"read",renderer:CQ.security.RightsPanel.TreeGrid.renderCheckbox},{id:"modify",header:CQ.I18n.getMessage("Modify"),width:75,dataIndex:"modify",renderer:CQ.security.RightsPanel.TreeGrid.renderCheckbox},{id:"create",header:CQ.I18n.getMessage("Create"),width:75,dataIndex:"create",renderer:CQ.security.RightsPanel.TreeGrid.renderCheckbox},{id:"delete",header:CQ.I18n.getMessage("Delete"),width:75,dataIndex:"delete",renderer:CQ.security.RightsPanel.TreeGrid.renderCheckbox},{id:"acl_read",header:CQ.I18n.getMessage("Read ACL"),width:75,dataIndex:"acl_read",renderer:CQ.security.RightsPanel.TreeGrid.renderCheckbox},{id:"acl_edit",header:CQ.I18n.getMessage("Edit ACL"),width:75,dataIndex:"acl_edit",renderer:CQ.security.RightsPanel.TreeGrid.renderCheckbox},{id:"replicate",header:CQ.I18n.getMessage("Replicate"),width:75,dataIndex:"replicate",renderer:CQ.security.RightsPanel.TreeGrid.renderCheckbox},{id:"details",width:47,renderer:CQ.security.RightsPanel.TreeGrid.renderDetails}]});
CQ.Util.applyDefaults(B,{cls:"cq-useradmin-grid",store:this.store,master_column_id:"path",clicksToEdit:"auto",cm:A,stripeRows:true,autoExpandColumn:"path",enableHdMenu:false,enableColumnResize:true,border:false,viewConfig:{enableRowBody:true,expanded_icon_class:"ux-maximgb-tg-nl-minus",last_expanded_icon_class:"ux-maximgb-tg-nl-minus",collapsed_icon_class:"ux-maximgb-tg-nl-plus",last_collapsed_icon_class:"ux-maximgb-tg-nl-plus",sortClasses:[]},listeners:{cellclick:{fn:function(C,L,J,I){var G=C.getStore().getAt(L);
var D=C.getColumnModel().getColumnId(J);
if(D=="details"){var H=C.getStore().baseParams.authorizableId;
var F=new CQ.security.PermissionsDetailPanel({id:"permissions-detail-panel",path:G.id,authorizableId:H,listeners:{memberUpdate:function(O,N,Q,P){this.updateNodesSequencially([P]);
this.fireEvent("saveChange",this,N,Q)
},scope:C}});
var K=new CQ.Dialog({height:500,width:800,modal:true,resizable:false,title:CQ.I18n.getMessage("Detailed permissions for ")+H+CQ.I18n.getMessage(" at path ")+G.id,items:[F],buttons:[{id:"cq-useadmin-detailed-permissions-save",text:CQ.I18n.getMessage("OK"),disabled:true,handler:function(){F.saveHandler()
}},CQ.Dialog.CANCEL]});
K.show()
}else{if(D!="path"){var M=C.getColumnModel().getDataIndex(J);
if(G.data[M]===""){}else{var E=!G.data[M];
G.set(M,E);
C.getView().refresh()
}}}},scope:this}}});
CQ.security.RightsPanel.TreeGrid.superclass.constructor.call(this,B)
},initComponent:function(){CQ.security.RightsPanel.TreeGrid.superclass.initComponent.call(this);
this.getSelectionModel().addListener("cellselect",this.onCellSelect,this);
this.getSelectionModel().addListener("beforecellselect",this.onBeforeCellSelect,this)
},storeChanged:function(A,D,C){var B=CQ.Ext.getCmp("cq-useadmin-permissions-save");
if(B&&CQ.Ext.data.Record.COMMIT!=C){B.enable()
}},onBeforeCellSelect:function(C,B,A){CQ.Ext.select(".x-grid3-row").removeClass("x-grid3-row-selected")
},onCellSelect:function(D,C,A){var B=this.getView().getRow(C);
CQ.Ext.fly(B).addClass("x-grid3-row-selected")
},loadRecord:function(A){if(A&&A.id){var B=CQ.Ext.getCmp("cq-useadmin-permissions-search");
if(B){B.enable()
}this.setAuthorizableId(A.id)
}this.resetRecords()
},setAuthorizableId:function(A){this.store.baseParams.authorizableId=A
},resetRecords:function(){this.emptyStore();
this.loadPath("",true)
},loadPath:function(E,C){var G=[];
var D=E.split("/");
for(var B=0;
B<D.length;
B++){if(D[B]==""){G.push("/")
}else{G.push(D.slice(0,B+1).join("/"))
}}this.updateNodesSequencially(G);
var A=C?G.length:G.length-1;
for(var B=0;
B<A;
B++){var F=this.store.getById(G[B]);
if(F){this.store.expandNode(F)
}}},emptyStore:function(){this.store.removeAll();
this.store.setActiveNode(null)
},disable:function(){this.suspendEvents(false)
},updateNodesSequencially:function(J){var E=[];
E.push("authorizableId="+this.store.baseParams.authorizableId);
E.push("predicate=useradmin");
E.push("depth=0");
for(var G=0;
G<J.length;
G++){E.push("path="+encodeURIComponent(J[G]))
}var B=CQ.HTTP.externalize("/.cqactions.json")+"?"+E.join("&");
B=CQ.HTTP.addParameter(B,"_charset_","utf-8");
B=CQ.HTTP.noCaching(B);
var A=CQ.HTTP.get(B);
var C=this.reader.read(A);
for(var G=0;
G<J.length;
G++){var K=J[G];
var H=-1;
for(var F=0;
F<C.records.length;
F++){if(C.records[F].id==K){H=F;
break
}}if(H!=-1){var D=C.records[H];
var I=this.store.indexOfId(K);
if(I!=-1){this.store.removeAt(I)
}this.store.addSorted(D)
}}},buildChangeLog:function(A){var C=A.data;
var B=["path:"+encodeURIComponent(A.id),"read:"+C.read,"modify:"+C.modify,"create:"+C.create,"delete:"+C["delete"],"acl_read:"+C.acl_read,"acl_edit:"+C.acl_edit,"replicate:"+C.replicate];
return"changelog="+B.join(",")
},saveHandler:function(){var A=this.store.getModifiedRecords().sort(function(H,G){return H.store.getNodeDepth(H)<G.store.getNodeDepth(G)
});
var E="";
for(var D=0;
D<A.length;
D++){modifiedRecord=A[D];
E+=this.buildChangeLog(modifiedRecord);
if(D!=A.length-1){E+="&"
}}var C="authorizableId="+this.store.baseParams.authorizableId;
var F=C+"&"+E;
CQ.Ext.getCmp("rights-panel").getEl().mask("Applying changes ...");
var B=CQ.Ext.getCmp("cq-useadmin-permissions-save");
CQ.HTTP.post("/.cqactions.html",function(H,L,K,G){if(L){this.store.commitChanges();
var J=[];
for(var I=0;
I<A.length;
I++){J.push(A[I].get("_id"))
}this.updateNodesSequencially(J)
}else{this.store.rejectChanges()
}CQ.Ext.getCmp("rights-panel").getEl().unmask();
B.disable()
},F,this)
}});
CQ.security.RightsPanel.TreeGrid.renderCheckbox=function(O,F,C,A,L,G,D){var H=C.get(F.id);
if(""===H){return""
}var J=C.get("authorizableId");
var N=C.get("declared")[F.id];
var E=N.effective;
var M=N["non-effective"];
var B=undefined;
if(E||M){var I=[];
if(E){I.push("<table class='cq-security-qtip-table'>");
I.push("<tr>");
I.push("<th class='status "+(H?"":"not-")+"allowed-permission'>&nbsp;</th>");
I.push("<th>"+(H?CQ.I18n.getMessage("Allowed for"):CQ.I18n.getMessage("Denied for"))+"</th>");
I.push("<th>&nbsp;</th>");
I.push("</tr>");
I.push(CQ.security.RightsPanel.TreeGrid.renderTemplate(E,function(Q){var P="<tr><td>&nbsp;</td><td>";
P+=Q;
P+="</td><td>";
P+="&nbsp;";
P+="</td></tr>";
return P
}));
I.push("</table>")
}if(M){if(E){I.push("<hr class='cq-security-qtip-separator'/>")
}I.push("<table class='cq-security-qtip-table'>");
I.push("<tr>");
I.push("<th>"+CQ.I18n.getMessage("Noneffective")+"</th>");
I.push("<th>&nbsp;</th>");
I.push("</tr>");
I.push(CQ.security.RightsPanel.TreeGrid.renderTemplate(M,function(Q){var P="<tr><td>";
P+=Q;
P+="</td></tr>";
return P
}));
I.push("</table>")
}B=I.join("\n");
B='ext:qwidth="auto" ext:qtip="'+B+'"'
}var K=["x-grid3"];
K.push(H?"checked":"unchecked");
K.push((E||M)?"overriden":"inherited");
K.push(M?"restriction":"norestriction");
return"<div "+(B?B:"")+' class="x-grid3-check-col '+K.join("-")+'">&nbsp;<div/>'
};
CQ.security.RightsPanel.TreeGrid.renderTemplate=function(A,D){var B="";
for(var C=0;
C<A.length;
C++){B+=D.call(D,A[C])
}return B
};
CQ.security.RightsPanel.TreeGrid.renderPath=function(I,F,B,A,H,G,D){var C=B.get("_is_leaf");
var E='<span class="'+(C?"x-tree-node-leaf":"x-tree-node-collapsed")+'">';
E+='<img unselectable="on" class="x-tree-node-icon '+(C?"file":"folder")+'" style="height:16px;" src="/libs/cq/ui/resources/0.gif"/> ';
E+=B.get(CQ.shared.XSS.getXSSPropertyName("name"));
E+="</span>";
return E
};
CQ.security.RightsPanel.TreeGrid.renderFullPath=function(I,F,B,A,H,G,D){var C=B.get("_is_leaf");
var E='<span class="'+(C?"x-tree-node-leaf":"x-tree-node-collapsed")+'">';
E+='<img unselectable="on" class="x-tree-node-icon '+(C?"file":"folder")+'" style="height:16px;" src="/libs/cq/ui/resources/0.gif"/> ';
E+=B.get("_id");
E+="</span>";
return E
};
CQ.security.RightsPanel.TreeGrid.renderDetails=function(B,E,F,C,G,A,D){if(""===F.get("acl_read")){return""
}return'<a href="#">'+CQ.I18n.getMessage("Details")+"</a>"
};
CQ.security.RightsPanel.RECORD=CQ.Ext.data.Record.create([{name:"name"},{name:CQ.shared.XSS.getXSSPropertyName("name")},{name:"read"},{name:"modify"},{name:"create"},{name:"delete"},{name:"acl_read"},{name:"acl_edit"},{name:"replicate"},{name:"declared"},{name:"_id"},{name:"_parent"},{name:"_is_leaf",type:"bool"},{name:"authorizableId"},{name:"children"}]);
CQ.Ext.data.PermissionReader=function(A,B){A=A||{};
CQ.Ext.data.PermissionReader.superclass.constructor.call(this,A,B||A.fields)
};
CQ.Ext.extend(CQ.Ext.data.PermissionReader,CQ.Ext.data.JsonReader,{readRecords:function(C){var A=C[this.meta.root];
var B=A[0];
if(B&&B[this.meta.root]){return this.readRecords(B)
}else{return CQ.Ext.data.PermissionReader.superclass.readRecords.call(this,C)
}}});
CQ.security.ClearableSearchField=CQ.Ext.extend(CQ.Ext.form.ComboBox,{minQueryLength:3,isTrigger1Enable:false,pathTemplate:new CQ.Ext.XTemplate('<tpl for=".">','<div class="search-item" qtip="{path}">','<div class="search-thumb"',' style="background-image:url({[CQ.HTTP.externalize(values.path,true)]}.thumb.48.48.png);"></div><div class="search-text-wrapper"><div class="search-title">{name}</div>',"</div>",'<div class="search-separator"></div>',"</div>","</tpl>"),freeTextTemplate:new CQ.Ext.XTemplate('<tpl for=".">','<div class="search-item" qtip="{path}">','<div class="search-thumb"',' style="background-image:url({[CQ.HTTP.externalize(values.path,true)]}.thumb.48.48.png);"></div><div class="search-text-wrapper"><div class="search-title">{title}</div>','<div class="search-excerpt">{excerpt}</div>',"</div>",'<div class="search-separator"></div>',"</div>","</tpl>"),constructor:function(A){CQ.Util.applyDefaults(A,{width:300,enableKeyEvents:true,hideTrigger1:true,validationEvent:false,trigger1Class:"x-form-clear-trigger",trigger2Class:"x-form-search-trigger",emptyText:CQ.I18n.getMessage("Enter search query"),pageSize:6,minChars:1,typeAhead:true,typeAheadDelay:100,loadingText:CQ.I18n.getMessage("Searching..."),itemSelector:"div.search-item",store:new CQ.Ext.data.Store({proxy:new CQ.Ext.data.HttpProxy({url:A.url?A.url:"/bin/querybuilder.json",method:"GET"}),paramNames:{start:"p.offset",limit:"p.limit"},baseParams:{_charset_:"utf-8","p.limit":"6","0_group.0_type":"nt:hierarchyNode","0_group.1_type":"nt:unstructured","0_group.2_type":"cq:Console","0_group.p.or":"true"},reader:new CQ.Ext.data.JsonReader({id:"path",root:"hits",totalProperty:"total",fields:["name","path","excerpt","title"]}),listeners:{load:function(C,B,D){if(D.params.stype=="path-search"){C.filterBy(function(E,F){return E.get("name")!="jcr:content"
})
}else{if(D.params.stype=="fulltext-search"){C.filterBy(function(E,F){return !/\/jcr:content\//.test(E.get("path"))
})
}}},scope:this}}),listeners:{keyup:function(C,H){var G=C.getRawValue();
var F=C.triggers;
if(G.length>0||C.isTrigger1Enable){C.triggers[0].show()
}else{C.triggers[0].hide()
}if(H.getKey()==H.RIGHT){var E=C.view.getSelectedIndexes()[0];
var D=C.store;
var B=D.getAt(E);
if(B){C.setRawValue(B.id);
C.onTrigger2Click()
}C.focus()
}},beforequery:function(B){var C=B.combo.store.baseParams;
if(B.query.charAt(0)=="/"){B.combo.view.tpl=B.combo.pathTemplate;
delete C.fulltext;
C["path.exact"]="false";
C.path=B.query;
C["path.flat"]=true;
C.stype="path-search"
}else{B.combo.view.tpl=B.combo.freeTextTemplate;
if(B.query.length>=B.combo.minQueryLength){C.fulltext=B.query+"*";
C["path.exact"]="false";
C.path="/content";
C["path.flat"]=false;
C.stype="fulltext-search"
}else{B.cancel=true
}}},scope:this},onSelect:function(B,C){this.isTrigger1Enable=true;
if(this.fireEvent("beforeselect",this,B,C)!==false){this.collapse();
this.fireEvent("select",this,B,C)
}},onTypeAhead:function(){}});
CQ.security.ClearableSearchField.superclass.constructor.call(this,A)
},initComponent:function(){this.triggerConfig={tag:"span",cls:"x-form-twin-triggers",cn:[{tag:"img",src:CQ.Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger1Class},{tag:"img",src:CQ.Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger2Class}]};
this.onTrigger2Click=this.onTrigger2Click.createInterceptor(function(){this.collapse()
});
this.addEvents("trigger1Click","trigger2Click");
CQ.security.ClearableSearchField.superclass.initComponent.call(this)
},getTrigger:CQ.Ext.form.TwinTriggerField.prototype.getTrigger,initTrigger:CQ.Ext.form.TwinTriggerField.prototype.initTrigger,onTrigger1Click:CQ.Ext.form.ComboBox.prototype.onTriggerClick,trigger1Class:CQ.Ext.form.ComboBox.prototype.triggerClass,onTrigger2Click:function(){this.focus();
var A=this.getRawValue();
if(A.length>0){this.doQuery(A);
if(!this.isExpanded()){this.expand()
}}this.fireEvent("trigger2Click",this)
},onTrigger1Click:function(){this.isTrigger1Enable=false;
this.clearValue();
this.collapse();
this.triggers[0].hide();
this.fireEvent("trigger1Click",this)
}});
CQ.Ext.reg("rightspanel",CQ.security.RightsPanel);
CQ.security.data.AclStore=function(A){var B={reader:new CQ.Ext.data.JsonReader({root:"acl",id:"principal",totalProperty:"aces"},CQ.security.data.AclRecord.create())};
if(!A.reader){A.reader=new CQ.Ext.data.JsonReader({root:"acl",id:A.recId?A.recId:"principal",totalProperty:"aces"},CQ.security.data.AclRecord.create())
}CQ.Ext.applyIf(A,B);
CQ.security.data.AclStore.superclass.constructor.call(this,A)
};
CQ.Ext.extend(CQ.security.data.AclStore,CQ.Ext.data.Store);
CQ.security.data.AclRecord=function(A,B){CQ.security.data.AclRecord.superclass.constructor.call(this,A,B)
};
CQ.security.data.AclRecord.create=function(){var C=CQ.Ext.extend(CQ.security.data.AclRecord,{});
var D=C.prototype;
D.fields=new CQ.Ext.util.MixedCollection(false,function(F){return F.name
});
var E=CQ.security.data.AclRecord.FIELDS;
for(var B=0,A=E.length;
B<A;
B++){D.fields.add(new CQ.Ext.data.Field(E[B]))
}C.getField=function(F){return D.fields.get(F)
};
return C
};
CQ.Ext.extend(CQ.security.data.AclRecord,CQ.Ext.data.Record,{get:function(A){if(A.indexOf("/")>-1){var B=this.data.privileges;
return B?B.get(A):null
}else{return this.data[A]
}},toParam:function(){var D="";
var A=CQ.security.data.AclRecord.FIELDS;
for(var C=0;
C<A.length;
C++){var E=A[C];
if(E.name=="update"){continue
}var F=this.get(E.name);
if(F){var B=E.mapping?E.mapping:E.name;
D+=encodeURIComponent(B)+":"+encodeURIComponent(F)+","
}}return D
}});
CQ.security.data.AclRecord.FIELDS=[{name:"type"},{name:"authorizable"},{name:"principal"},{name:"read"},{name:"create"},{name:"modify"},{name:"update",mapping:"modify"},{name:"delete"},{name:"acl_read"},{name:"acl_edit"},{name:"path"},{name:"privileges",convert:function(A){var B=new CQ.Ext.util.MixedCollection(false,function(C){return C.id
});
B.addAll(A);
return B
}}];
CQ.security.data.AuthReader=CQ.Ext.extend(CQ.Ext.data.JsonReader,{constructor:function(A){A=CQ.Util.applyDefaults(A,{totalProperty:"results",root:"authorizables",id:"id"});
CQ.security.data.AuthReader.superclass.constructor.call(this,A,CQ.security.data.AuthRecord.create(CQ.security.data.AuthRecord.FIELDS))
}});
CQ.security.data.AuthRecord=function(A,B){CQ.security.data.AuthRecord.superclass.constructor.call(this,A,B)
};
CQ.security.data.AuthRecord.create=function(){var C=CQ.Ext.extend(CQ.security.data.AuthRecord,{});
var D=C.prototype;
D.fields=new CQ.Ext.util.MixedCollection(false,function(F){return F.name
});
var E=CQ.security.data.AuthRecord.FIELDS;
for(var B=0,A=E.length;
B<A;
B++){D.fields.add(new CQ.Ext.data.Field(E[B]))
}C.getField=function(F){return D.fields.get(F)
};
return C
};
CQ.Ext.extend(CQ.security.data.AuthRecord,CQ.Ext.data.Record,{toParam:function(){var D="";
var A=CQ.security.data.AuthRecord.FIELDS;
for(var C=0;
C<A.length;
C++){var E=A[C];
var F=this.get(E.name);
if(F){var B=E.mapping?E.mapping:E.name;
D+=encodeURIComponent(B)+":"+encodeURIComponent(F)+","
}}return D
}});
CQ.security.data.AuthRecord.arrayConverter=function(F){if(CQ.Ext.isArray(F)){var D=new Array();
for(var C=0;
C<F.length;
C++){var A=F[C];
if(!A.id){continue
}var H=new CQ.security.data.AuthRecord({},A.id);
for(var B=0;
B<CQ.security.data.AuthRecord.FIELDS.length;
B++){var E=CQ.security.data.AuthRecord.FIELDS[B];
var G=A[E.name];
if(G){H.set(E.name,G)
}}D.push(H)
}return D
}};
CQ.security.data.AuthRecord.PRIVILEGE_FIELD="cq:privileges";
CQ.security.data.AuthRecord.FIELDS=[{name:"id"},{name:"type"},{name:"name"},{name:"name_xss"},{name:"email"},{name:"home"},{name:"givenName"},{name:"familyName"},{name:"aboutMe"},{name:"rep:userId"},{name:"replication"},{name:"modification"},{name:"memberOf",convert:CQ.security.data.AuthRecord.arrayConverter},{name:"members",convert:CQ.security.data.AuthRecord.arrayConverter},{name:"sudoers",convert:CQ.security.data.AuthRecord.arrayConverter},{name:"principal"},{name:CQ.security.data.AuthRecord.PRIVILEGE_FIELD}];
CQ.security.data.UserAclStore=CQ.Ext.extend(CQ.security.data.AclStore,{user:null,url:null,constructor:function(A){if(!A){A={}
}if(!A.reader){A.reader=new CQ.Ext.data.JsonReader({root:"acl",id:"path",totalProperty:"aces"},CQ.security.data.AclRecord.create())
}this.user=CQ.User.getUserID();
this.url=A.dataUrl?A.dataUrl:this.user.getHome()+".permissions"+CQ.HTTP.EXTENSION_JSON;
CQ.security.data.AclStore.superclass.constructor.call(this,A)
},getById:function(B){var C=this.data.key(B);
if(!C){var A=this.requestData(B);
if(A){this.loadData(A,true);
return this.data.key(B)
}}return C
},requestData:function(contentPath){var idx=contentPath.lastIndexOf("/");
if(idx<0){return 
}var parent;
if(idx==0){parent="/"
}else{parent=contentPath.substring(0,idx)
}var url=CQ.HTTP.addParameter(this.url,"path",parent);
url=CQ.HTTP.addParameter(url,"_charset_","utf-8");
url=CQ.HTTP.noCaching(url);
var res=CQ.HTTP.get(url);
if(CQ.HTTP.isOk(res)){return CQ.Util.eval(res)
}}});
CQ.security.FilterField=CQ.Ext.extend(CQ.Ext.form.TwinTriggerField,{width:200,hideTrigger1:true,validationEvent:false,validateOnBlur:false,trigger1Class:"x-form-clear-trigger",trigger2Class:"x-form-search-trigger",emptyText:CQ.I18n.getMessage("Enter filter query"),paramName:"filter",hasFilter:false,loadParams:{},constructor:function(A){A=CQ.Util.applyDefaults(A,{loadParams:{}});
this.loadParams=A.loadParams;
CQ.security.FilterField.superclass.constructor.call(this,A)
},initComponent:function(){CQ.security.FilterField.superclass.initComponent.call(this);
if(!this.store.baseParams){this.store.baseParams={}
}this.store.baseParams[this.paramName]="";
this.on("specialkey",function(A,B){if(B.getKey()==B.ENTER){this.onTrigger2Click()
}},this)
},onTrigger1Click:function(){if(this.hasFilter){this.loadParams[this.paramName]="";
this.store.reload({params:this.loadParams});
this.el.dom.value="";
this.triggers[0].hide();
this.hasFilter=false;
this.focus()
}},onTrigger2Click:function(){var A=this.getRawValue();
if(A.length<1){this.onTrigger1Click();
return 
}this.loadParams[this.paramName]=A;
this.store.reload({params:this.loadParams});
this.hasFilter=true;
this.triggers[0].show();
this.focus()
}});
CQ.security.UserAdminPanel={selectionStore:null,authType:null,constructor:function(A){this.authType=A.authType;
CQ.security.UserAdminPanel.constructor.superclass.constructor.call(this,A)
},getSelectionStore:function(){return this.selectionStore?this.selectionStore:this.initialConfig.selectionStore
},initComponent:function(){CQ.security.UserAdminPanel.constructor.superclass.initComponent.call(this);
this.addEvents("authChanged","authSaved");
this.on({activate:{fn:this.activationHandler}})
},onSelectionChanged:function(A,B){},onSelectionModfied:function(A){},onActivate:function(B,A){},activationHandler:function(A){this.onActivate(this.getSelectionStore(),A)
},selectionHandler:function(A,B){this.selectionStore=A;
this.onSelectionChanged(A,B)
}};
CQ.security.UserAdminPanel.TYPE_GROUP="group";
CQ.security.UserAdminPanel.TYPE_USER="user";
CQ.security.UserAdminGridPanel=CQ.Ext.extend(CQ.Ext.grid.GridPanel,CQ.security.UserAdminPanel);
CQ.security.AuthRelationPanel=CQ.Ext.extend(CQ.security.UserAdminGridPanel,{sm:null,cm:null,field:null,allowUserAdd:false,loaded:false,saveAction:null,removeAction:null,dirty:false,constructor:function(B){this.saveAction=new CQ.Ext.Action({text:CQ.I18n.getMessage("Save"),disabled:true,handler:this.saveHandler,scope:this,tooltip:{title:CQ.I18n.getMessage("Save Changes"),text:CQ.I18n.getMessage("Save changes of the profile"),autoHide:true}});
this.removeAction=new CQ.Ext.Action({text:CQ.I18n.getMessage("Remove"),handler:this.removeHandler,disabled:true,scope:this,tooltip:{title:CQ.I18n.getMessage("Remove"),text:CQ.I18n.getMessage("Removes selected items from the list"),autoHide:true}});
var A=CQ.Util.applyDefaults(B.sm,{singleSelect:false,listeners:{rowselect:{fn:function(){this.removeAction.enable()
},scope:this},rowdeselect:{fn:function(){this.removeAction.disable()
},scope:this}}});
B.cm=new CQ.Ext.grid.ColumnModel((B.cm)?B.cm:[{header:CQ.I18n.getMessage("Name"),dataIndex:"name",renderer:function(G,E,F){return CQ.shared.XSS.xssPropertyRenderer(G,E,F,this)
},sortable:true},{header:CQ.I18n.getMessage("ID"),dataIndex:"id",sortable:true,hidden:true}]);
var D={field:"memberOf",viewConfig:{forceFit:true},tbar:[this.saveAction,"-",this.removeAction]};
B=CQ.Util.applyDefaults(B,D);
var C=CQ.Util.applyDefaults(B.relationStore,{reader:new CQ.Ext.data.ArrayReader({id:"id"},CQ.security.data.AuthRecord.create()),autoload:false,listeners:{add:{fn:this.onStoreChanged,scope:this},remove:{fn:this.onStoreChanged,scope:this},update:{fn:this.onStoreChanged,scope:this}}});
B.store=new CQ.Ext.data.Store(C);
B.sm=new CQ.Ext.grid.RowSelectionModel(A);
CQ.security.AuthRelationPanel.superclass.constructor.call(this,B)
},initComponent:function(){this.on("render",function(A){new CQ.security.AuthRelationPanel.DropTarget(A.body,{store:this.getStore(),allowUser:this.initialConfig.allowUserAdd})
});
CQ.security.AuthRelationPanel.superclass.initComponent.call(this)
},onActivate:function(A){if(!this.loaded&&A.getCount()>0){this.reloadData(A)
}},getField:function(){return this.initialConfig.field
},onSelectionChanged:function(A,C){this.loaded=false;
var B=this.getStore();
B.suspendEvents();
B.removeAll();
B.resumeEvents();
if(!this.selectionStore){this.selectionStore=A
}},onSelectionModfied:function(A){if(this.body){this.getView().refresh()
}},onStoreChanged:function(A,B){if(A.getCount()==0){this.removeAction.disable()
}if(CQ.Ext.data.Record.COMMIT!=B){this.saveAction.enable();
this.dirty=true
}else{this.saveAction.disable();
this.dirty=false
}this.fireEvent("authChanged",this,this.getSelectionStore().getAt(0))
},saveHandler:function(){var J=this.getSelectionStore().getAt(0);
var A=J.get("home");
if(!A){var B=J.get("id");
if(!B){CQ.MessageBox.alert(CQ.I18n.getMessage("Error"),CQ.I18n.getMessage("No Authorizable selected"));
return 
}A=CQ.HTTP.externalize("/bin/security/authorizables/POST");
A=CQ.HTTP.addParameter(A,"Authorizable",B)
}else{A=CQ.HTTP.externalize(CQ.HTTP.encodePath(A))
}var I=new Array();
var G=new Array();
var E={_charset_:"utf-8",memberAction:this.getField(),memberEntry:I};
var K=this.getStore();
var C=K.getCount();
for(var F=0;
F<C;
F++){var D=K.getAt(F);
I.push(encodeURIComponent(D.id));
G.push(D)
}var H=this;
J.beginEdit();
J.data[this.getField()]=G;
CQ.HTTP.post(A,function(M,L){J.endEdit();
if(L){H.commit(J)
}},E,this)
},removeHandler:function(){var B=this.getSelectionModel().getSelections();
for(var A=0;
A<B.length;
A++){this.getStore().remove(B[A])
}},reloadData:function(B){var D=this.getStore();
for(var C=0;
C<B.getCount();
C++){var E=B.getAt(C);
var A=E.get(this.getField());
if(A&&CQ.Ext.isArray(A)){D.suspendEvents();
D.removeAll();
D.add(A);
D.resumeEvents()
}}this.onSelectionModfied();
this.loaded=true
},commit:function(B){this.getStore().commitChanges();
this.saveAction.disable();
this.dirty=false;
var A=this.getSelectionStore();
if(A.getCount()>1){A.reload()
}this.fireEvent("authSaved",this,B,this.getField())
}});
CQ.security.AuthRelationPanel.DropTarget=CQ.Ext.extend(CQ.Ext.dd.DropTarget,{store:null,ddGroup:"AuthorizableDD",dropAllowed:"x-dd-drop-ok",copy:false,allowUser:false,constructor:function(B,A){this.store=A.store;
this.allowUser=A.allowUser;
CQ.security.AuthRelationPanel.DropTarget.superclass.constructor.call(this,B,A)
},notifyDrop:function(A,F,E){if(!this.isAllowed(E)){return false
}var D=E.selections;
if(D.length){var C=[];
for(var B=0;
B<D.length;
B++){var G=D[B];
C.push(new CQ.security.data.AuthRecord({name_xss:G.get(CQ.shared.XSS.getXSSPropertyName("name")),id:G.id},G.id))
}this.store.add(C)
}return true
},notifyOver:function(A,C,B){return this.isAllowed(B)?this.dropAllowed:this.dropNotAllowed
},isAllowed:function(D){var E=true;
var C=D.selections;
for(var A=0;
A<C.length&&E;
A++){var B=C[A].get("type");
E=B=="group"||this.allowUser
}return E
}});
CQ.security.AuthorizableList=CQ.Ext.extend(CQ.Ext.grid.GridPanel,{authStore:null,constructor:function(D){var B=CQ.Util.applyDefaults(D.store,{storeId:"cq-useradmin-authstore",autoLoad:true,proxy:new CQ.Ext.data.HttpProxy({url:"/bin/security/authorizables.json",method:"GET"}),baseParams:{limit:25,_charset_:"utf-8"},reader:new CQ.security.data.AuthReader()});
var G=new CQ.Ext.data.Store(B);
this.authStore=G;
var H=[];
var K=[];
var C=[];
var F=new CQ.Ext.Action({cls:"cq-useradmin-hideUsers",text:CQ.I18n.getMessage("Hide Users"),enableToggle:true,toggleGroup:"hide",tooltip:{title:CQ.I18n.getMessage("Hide Users"),text:CQ.I18n.getMessage("Press to prevent users from being listed"),autoHide:true},toggleHandler:function(M,N){G.baseParams.hideUsers=N;
G.load()
}});
var I=new CQ.Ext.Action({cls:"cq-useradmin-hideGroups",text:CQ.I18n.getMessage("Hide Groups"),enableToggle:true,toggleGroup:"hide",tooltip:{title:CQ.I18n.getMessage("Hide Groups"),text:CQ.I18n.getMessage("Press to prevent groups from being listed"),autoHide:true},toggleHandler:function(M,N){G.baseParams.hideGroups=N;
G.load()
}});
var A=new CQ.security.FilterField({store:G,loadParams:{start:0}});
H.push(A);
if(!D.hideFilter){H.push(" ");
H.push(F);
H.push(" ");
H.push(I);
H.push("->");
H=H.concat(this.formatActions(D.actions,K,C))
}var L=D.columnModel?D.columnModel:new CQ.Ext.grid.ColumnModel([{header:CQ.I18n.getMessage("Type"),dataIndex:"type",width:30,fixed:true,resizable:false,hideable:false,renderer:CQ.security.AuthorizableList.renderIcon},{header:CQ.I18n.getMessage("ID"),width:150,dataIndex:"id"},{header:CQ.I18n.getMessage("Name"),dataIndex:"name",renderer:function(O,M,N){return CQ.shared.XSS.xssPropertyRenderer(O,M,N,this)
}},{header:CQ.I18n.getMessage("Pub.",null,"Abbreviation of the word published"),width:48,renderer:function(N,R,M){var O="";
var Q=' title="';
var P=M.get("replication");
if(P&&P.published){if(P.numQueued>0){O="status-pending";
if(P.action=="ACTIVATE"){Q+=CQ.I18n.getMessage("Activation pending. #{0} in Queue.",P.numQueued)
}else{Q+=CQ.I18n.getMessage("Deactivation pending. #{0} in Queue.",P.numQueued)
}}else{Q+=CQ.Ext.util.Format.date(new Date(P.published));
Q+=" ("+CQ.shared.XSS.getXSSTablePropertyValue(P,"publishedBy")+")";
if(P.action=="ACTIVATE"){O="status-activated"
}else{O="status-deactivated"
}}}Q+='"';
return"<div"+Q+' class="status '+O+'">&nbsp;</div>'
}},{header:CQ.I18n.getMessage("Mod.",null,"Abbreviation of the word modified"),width:48,renderer:function(O,S,N){var Q=N.get("replication");
var M=N.get("modification");
var R=' title="';
var P="";
if(M.lastModified){R+=CQ.Ext.util.Format.date(new Date(M.lastModified));
R+=" ("+CQ.shared.XSS.getXSSTablePropertyValue(M,"lastModifiedBy")+")";
P="status-localmodified"
}if(Q&&Q.published){if(Q.action=="ACTIVATE"){if(M.lastModified>Q.published){P="status-modified"
}}}R+='"';
return"<div "+R+' class="status '+P+'">&nbsp;</div>'
}}]);
L.defaultSortable=true;
var E=D.selectionModel?D.selectionModel:new CQ.Ext.grid.RowSelectionModel({singleSelect:false,listeners:{selectionchange:function(R){for(var P=0;
P<K.length;
P++){var Q=!R.hasSelection();
var N=K[P];
N.setDisabled(Q);
if(!Q&&N instanceof CQ.PrivilegedAction){var M=R.getSelections();
for(var O=0;
O<M.length;
O++){N.setPath(M[O].get("home"));
if(N.isDisabled()){break
}}}}}}});
var J=CQ.Util.applyDefaults(D.listeners,{rowcontextmenu:function(N,M,P){if(!this.contextMenu&&(C.length>0)){this.contextMenu=new CQ.Ext.menu.Menu({items:C})
}var O=P.getXY();
this.contextMenu.showAt(O);
P.stopEvent()
},keypress:function(M){if(M.getCharCode()==M.DELETE){if(this.getSelections()&&this.getSelections().length>0){this.removeHandler();
M.stopEvent()
}}}});
D=CQ.Ext.applyIf(D,{autoExpandColumn:"id",region:"west",margins:"5 0 5 5",collapsible:true,collapseMode:"mini",hideCollapseTool:true,width:400,minWidth:380,split:true,loadMask:true,enableDragDrop:true,ddGroup:"AuthorizableDD",ddText:"{0} selected Authorizable(s)",tbar:H,store:this.authStore,cm:L,sm:E,viewConfig:{forceFit:true},listeners:J,bbar:new CQ.Ext.PagingToolbar({store:G,pageSize:25,stateful:false,displayMsg:CQ.I18n.getMessage("Page {0} of {1}")})});
CQ.security.AuthorizableList.superclass.constructor.call(this,D)
},initComponent:function(){CQ.security.AuthorizableList.superclass.initComponent.call(this);
this.addEvents({authremoved:true});
this.authStore.on("remove",this.fireAuthRemoved,this)
},updateRelation:function(E,C){var B=E.get(C);
if(B&&CQ.Ext.isArray(B)){var D=this.getStore();
var A=(C=="members")?"memberOf":"members";
D.each(function(H){var J=false;
for(var G=0;
G<B.length;
G++){if(B[G].id==H.id){J=true;
break
}}var I=H.get(A);
if(I&&CQ.Ext.isArray(I)){for(var F=0;
F<I.length;
F++){if(I[F].id==E.id){if(!J){I.splice(F,1)
}return 
}}}if(J){if(!I){I=new Array();
H.set(A,I)
}I.push(E)
}})
}},formatActions:function(G,B,D){var F=[];
for(var A in G){if(typeof (G[A])!="object"){continue
}if(G[A].xtype=="separator"){F.push(G[A].value);
if(G[A].ctx){D.push(G[A].value)
}}else{if(G[A].menu){G[A].menu=new CQ.Ext.menu.Menu({items:this.formatActions(G[A].menu,B,D)})
}var C=this.formatActionConfig(G[A]);
var E;
if(C.privileges||C.conditions){E=new CQ.PrivilegedAction(C)
}else{E=new CQ.Ext.Action(C)
}F.push(E);
if(C.disabled){B.push(E)
}if(C.ctx){D.push(E)
}}}return F
},activationHandler:function(){var F=this.getSelectionModel();
var D=F.getSelections();
var A=this.getStore();
var E="<ul>";
for(var B=0;
B<D.length;
B++){E=E+"<li>"+D[B].get(CQ.shared.XSS.getXSSPropertyName("name"))
}E+="</ul>";
var C=function(H){if(H=="yes"){var J=new Array();
for(var I=0;
I<D.length;
I++){var L=D[I];
var K=L.get("home");
J.push(K)
}var G=function(){F.clearSelections();
CQ.Notification.notify(CQ.I18n.getMessage("Activated"),E);
A.reload.defer(1000,A)
};
this.requestReplication(J,"Activate",G)
}};
CQ.Ext.MessageBox.confirm(CQ.I18n.getMessage("Activate"),CQ.I18n.getMessage("Do you really want to activate these users/groups? {0}",E),C,this)
},deactivationHandler:function(){var F=this.getSelectionModel();
var D=F.getSelections();
var A=this.getStore();
var E="<ul>";
for(var B=0;
B<D.length;
B++){E=E+"<li>"+D[B].get(CQ.shared.XSS.getXSSPropertyName("name"))
}E+="</ul>";
var C=function(H){if(H=="yes"){var J=new Array();
for(var I=0;
I<D.length;
I++){var L=D[I];
var K=L.get("home");
J.push(K)
}var G=function(){F.clearSelections();
CQ.Notification.notify(CQ.I18n.getMessage("Deactivated"),E);
A.reload.defer(1000,A)
};
this.requestReplication(J,"DeActivate",G)
}};
CQ.Ext.MessageBox.confirm(CQ.I18n.getMessage("Deactivate"),CQ.I18n.getMessage("Do you really want to deactivate these users/groups? {0}",E),C,this)
},removeHandler:function(){var A=this.getStore();
var F=this.getSelectionModel();
var C=F.getSelections();
var E="<p>";
for(var B=0;
B<C.length;
B++){E=E+C[B].get(CQ.shared.XSS.getXSSPropertyName("name"))+"<br>"
}var D=function(G){if(G=="yes"){for(var H=0;
H<C.length;
H++){var J=C[H];
var I={_charset_:"utf-8",deleteAuthorizable:J.id};
CQ.HTTP.post(CQ.HTTP.encodePath(J.get("home")),function(L,N,M){var K=CQ.HTTP.buildPostResponseFromHTML(M.responseText);
if(CQ.utils.HTTP.isOk(K)){A.remove(J);
A.commitChanges();
CQ.Notification.notify(CQ.I18n.getMessage("Deleted"),J.get(CQ.shared.XSS.getXSSPropertyName("name")))
}},I,J)
}}};
CQ.Ext.MessageBox.confirm(CQ.I18n.getMessage("Delete"),CQ.I18n.getMessage("Do you really want to delete these users/groups? {0}",E),D,this)
},requestReplication:function(B,A,D){var C={_charset_:"utf-8",path:B,cmd:A};
CQ.HTTP.post("/bin/replicate.json",function(F,H,G){var E=CQ.HTTP.buildPostResponseFromHTML(G.responseText);
if(CQ.HTTP.isOk(E)&&D){D.call(this)
}},C,this)
},formatActionConfig:function(config){if(!config.scope){config.scope=this
}if(typeof (config.handler)=="string"){config.handler=eval(config.handler)
}if(config.text){config.text=CQ.I18n.getVarMessage(config.text)
}if(config.tooltip&&config.tooltip.text){config.tooltip.text=CQ.I18n.getVarMessage(config.tooltip.text)
}if(config.tooltip&&config.tooltip.title){config.tooltip.title=CQ.I18n.getVarMessage(config.tooltip.title)
}return config
},fireAuthRemoved:function(B,A,C){this.fireEvent("authremoved",this,A,C)
}});
CQ.security.AuthorizableList.renderIcon=function(A){if(A=="user"){return'<div class="userIcon">&nbsp;</div>'
}else{if(A=="group"){return'<div class="groupIcon">&nbsp;</div>'
}}};
CQ.Ext.reg("authorizablelist",CQ.security.AuthorizableList);
CQ.security.AuthorizableSelection=CQ.Ext.extend(CQ.Ext.form.ComboBox,{filterButtons:false,storeUrl:"/bin/security/authorizables.json",storeLimit:25,filter:null,constructor:function(A){CQ.Util.applyDefaults(A,{stateful:false,minChars:0,minListWidth:200,queryParam:"filter",triggerClass:"x-form-search-trigger",tpl:new CQ.Ext.XTemplate('<tpl for=".">','<div class="cq-auth-list">','<div class="cq-auth-list-entry {[values.type=="group"? "cq-group-icon": "cq-user-icon"]}">','{[CQ.shared.XSS.getXSSTablePropertyValue(values, "name") == "" ? values.id : CQ.shared.XSS.getXSSTablePropertyValue(values, "name", 100)]}',"</div>","</div>","</tpl>"),itemSelector:"div.cq-auth-list",storeConfig:{autoLoad:false,proxy:new CQ.Ext.data.HttpProxy({url:this.storeUrl,method:"GET"}),baseParams:{limit:this.storeLimit,_charset_:"utf-8"},reader:new CQ.security.data.AuthReader()}});
if(A.filter){if("groups"==A.filter){A.filter="hideUsers"
}else{if("users"==A.filter){A.filter="hideGroups"
}else{if("manual"==A.filter){this.filterButtons=true
}}}}this.authStore=new CQ.Ext.data.Store(A.storeConfig);
A.store=this.authStore;
CQ.security.AuthorizableSelection.superclass.constructor.call(this,A)
},initComponent:function(){CQ.security.AuthorizableSelection.superclass.initComponent.call(this);
if(this.filterButtons){var B=this;
var A=function(C,E){var F=B.authStore.baseParams;
var D=C.initialConfig.filter;
if(D){F[D]=E
}delete B.lastQuery
};
this.hideUsers=new CQ.Ext.Button({text:CQ.I18n.getMessage("Hide Users"),enableToggle:true,toggleGroup:"authExclude-"+this.getId(),pressed:true,filter:"hideUsers",tooltip:{title:CQ.I18n.getMessage("Hide Users"),text:CQ.I18n.getMessage("Press to hide users"),autoHide:true},toggleHandler:A});
this.hideGroups=new CQ.Ext.Button({text:CQ.I18n.getMessage("Hide Groups"),enableToggle:true,toggleGroup:"authExclude-"+this.getId(),filter:"hideGroups",tooltip:{title:CQ.I18n.getMessage("Hide Groups"),text:CQ.I18n.getMessage("Press to hide groups"),autoHide:true},toggleHandler:A})
}if(this.filter){this.authStore.baseParams[this.filter]="true"
}},onRender:function(E,F){CQ.security.AuthorizableSelection.superclass.onRender.call(this,E,F);
if(this.filterButtons){var B=new CQ.Ext.Toolbar({hidden:true,hideMode:"visibility"});
B.render(this.wrap);
var A=B.addButton([this.hideGroups,this.hideUsers]);
var C=0;
for(var D=0;
D<A.length;
D++){C+=A[D].getEl().getWidth()
}B.setWidth(C);
B.getEl().alignTo(B.getEl().prev(),"tr");
this.wrap.setHeight(this.el.getHeight());
B.show.defer(200,B);
this.authStore.baseParams[this.hideUsers.initialConfig.filter]=true
}}});
CQ.Ext.reg("authselection",CQ.security.AuthorizableSelection);
CQ.security.PrivilegeEditor=CQ.Ext.extend(CQ.Ext.Panel,{authorizableId:null,removed:new Array(),dirty:false,constructor:function(B){if(!B){B={}
}var A=CQ.Util.applyDefaults(B,{layout:"border",bodyStyle:"padding:0px;",labelWidth:75,anchor:"100% 100%",autoShow:true,privilege:"wcm/core/privileges/replicate",title:CQ.I18n.getMessage("Replication Privilege"),dataPath:CQ.HTTP.externalize("/bin/security/privileges"),treePath:"/bin/tree/ext",treeRoot:{name:"",text:"CQ",draggable:false,expanded:true,singleClickExpand:true}});
this.aclStore=new CQ.Ext.data.Store({reader:new CQ.Ext.data.JsonReader({root:"acl",id:"path",totalProperty:"aces"},CQ.security.PrivilegeEditor.RECORD),autoload:false,listeners:{add:{fn:this.storeChanged,scope:this},remove:{fn:this.storeChanged,scope:this},update:{fn:this.storeChanged,scope:this}},baseParams:{_charset_:"utf-8"},proxy:new CQ.Ext.data.HttpProxy({url:A.dataPath+CQ.HTTP.EXTENSION_JSON+"/"+A.privilege,method:"GET"})});
this.grid=new CQ.Ext.grid.EditorGridPanel({tbar:[{text:CQ.I18n.getMessage("Add"),tooltip:CQ.I18n.getMessage("Add Permission"),handler:this.addACE,scope:this},{id:"cq-useadmin-acleditor-remove",text:CQ.I18n.getMessage("Remove"),tooltip:CQ.I18n.getMessage("Remove Permission"),handler:this.removeACE,disabled:true,scope:this},"-",{id:"cq-useadmin-acleditor-save",text:CQ.I18n.getMessage("Save"),handler:this.saveHandler,disabled:true,title:CQ.I18n.getMessage("Save Changes"),tooltip:CQ.I18n.getMessage("Save changes of the profile"),scope:this}],autoExpandColumn:"Id",region:"center",store:this.aclStore,loadMask:true,cm:new CQ.Ext.grid.ColumnModel([{header:CQ.I18n.getMessage("Path"),dataIndex:"path"},{header:CQ.I18n.getMessage("Allowed"),dataIndex:"deny",editor:new CQ.Ext.form.ComboBox({allowBlank:false,mode:"local",triggerAction:"all",selectOnFocus:true,store:[["allow",CQ.I18n.getMessage("allow")],["deny",CQ.I18n.getMessage("deny")]]})},{header:CQ.I18n.getMessage("Authorizable"),dataIndex:"authorizable"}]),viewConfig:{forceFit:true},sm:new CQ.Ext.grid.RowSelectionModel({singleSelect:true,listeners:{rowselect:{fn:this.rowSelection,scope:this},rowdeselect:{fn:this.rowDeselection,scope:this}}}),frame:false,autoExpand:true,autoShow:true});
this.tree=new CQ.Ext.tree.TreePanel({region:"west",collapsible:true,collapseMode:"mini",collapsed:true,hideCollapseTool:true,split:true,autoScroll:true,width:200,stateful:false,listeners:{dblclick:{fn:this.selectionAction,scope:this}},root:new CQ.Ext.tree.AsyncTreeNode(A.treeRoot),loader:new CQ.Ext.tree.TreeLoader({baseParams:{predicate:"hierarchy"},requestMethod:"GET",dataUrl:CQ.HTTP.externalize(A.treePath)+CQ.HTTP.EXTENSION_JSON,baseAttrs:{singleClickExpand:true},listeners:{beforeload:function(C,D){this.baseParams.path=D.getPath()
}}})});
A.items=[this.tree,this.grid];
CQ.security.PrivilegeEditor.superclass.constructor.call(this,A)
},selectionAction:function(B){var C=B.getPath();
this.grid.stopEditing();
var D=this.aclStore.getById(C);
var A;
if(D){A=this.aclStore.indexOf(D)
}else{D=new CQ.security.PrivilegeEditor.RECORD({path:C,deny:"allow",authorizable:" "});
D.set("authorizable",this.authorizableId);
A=this.aclStore.getCount();
this.aclStore.insert(A,[D])
}this.grid.startEditing.defer(150,this.grid,[A,1]);
this.tree.collapse(false)
},saveHandler:function(){var L=new Array();
var E={_charset_:"utf-8",Authorizable:this.authorizableId,modifiedPath:[],deletedPath:[]};
var M=this.aclStore;
var D=M.getCount();
for(var H=0;
H<D;
H++){var F=M.getAt(H);
if(F.dirty){L.push(F);
var C=F.get("path")+":"+F.get("deny");
E.modifiedPath.push(encodeURIComponent(C))
}}for(var G=0;
G<this.removed.length;
G++){var A=this.removed[G];
var J=A.get("path")+":"+A.get("deny");
E.deletedPath.push(encodeURIComponent(J))
}var K=this;
var I=CQ.Ext.getCmp("cq-useadmin-acleditor-save");
var B=this.initialConfig.dataPath+CQ.HTTP.EXTENSION_JSON+"/"+this.initialConfig.privilege;
CQ.HTTP.post(B,function(){I.disable();
K.dirty=false;
for(var N=0;
N<L.length;
N++){L[N].commit()
}},E,this)
},loadRecord:function(A){if(A&&A.id){this.authorizableId=A.id;
this.aclStore.baseParams.Authorizable=A.id;
this.aclStore.reload()
}else{this.aclStore.removeAll()
}},unloadRecord:function(A){this.authorizableId=null;
this.loadRecord(null)
},rowSelection:function(){var A=CQ.Ext.getCmp("cq-useadmin-acleditor-remove");
if(A){A.enable()
}},rowDeselection:function(){var A=CQ.Ext.getCmp("cq-useadmin-acleditor-remove");
if(A){A.disable()
}},storeChanged:function(A,D,C){var B=CQ.Ext.getCmp("cq-useadmin-acleditor-save");
if(B&&CQ.Ext.data.Record.COMMIT!=C){this.dirty=true;
B.enable()
}},addACE:function(){this.tree.expand(true)
},removeACE:function(){var A=this.grid.getSelectionModel().getSelected();
this.aclStore.remove(A);
this.removed.push(A);
if(this.aclStore.getCount()==0){this.rowDeselection()
}}});
CQ.security.PrivilegeEditor.RECORD=CQ.Ext.data.Record.create([{name:"path"},{name:"deny"},{name:"authorizable"}]);
CQ.security.Privileges=CQ.Ext.extend(CQ.Ext.Panel,{userForm:null,record:null,dirty:false,constructor:function(B){this.userForm=new CQ.Ext.form.FormPanel({baseParams:{_charset_:"utf-8",privilege:CQ.security.Privileges.MODIFY_HIERARCHY},border:false,bodyStyle:"padding:5px;",labelWidth:180,anchor:"100% 80%",hidden:false,defaults:{enableKeyEvents:true,listeners:{change:{fn:this.enableSaveButton,scope:this},keyup:{fn:this.enableSaveButton,scope:this}}},items:[{fieldLabel:CQ.I18n.getMessage("Hierarchy Modification"),hiddenName:CQ.security.Privileges.MODIFY_HIERARCHY,xtype:"combo",editable:false,allowBlank:true,mode:"local",width:100,triggerAction:"all",selectOnFocus:true,store:[["allow",CQ.I18n.getMessage("Grant")],["deny",CQ.I18n.getMessage("Deny")]]}],tbar:[]});
var A=this.userForm.getTopToolbar();
A.add({id:"cq-useradmin-privileges-save",disabled:true,text:CQ.I18n.getMessage("Save"),tooltip:{title:CQ.I18n.getMessage("Save Changes"),text:CQ.I18n.getMessage("Save changes of the profile"),autoHide:true},handler:this.saveHandler,scope:this});
CQ.Util.applyDefaults(B,{layout:"form",bodyStyle:"padding:0px;",title:CQ.I18n.getMessage("Privileges"),items:[this.userForm]});
CQ.security.UserProperties.superclass.constructor.call(this,B)
},enableSaveButton:function(A){if(A!==false){A=true
}if(this.dirty!=A){this.dirty=A;
var B=CQ.Ext.getCmp("cq-useradmin-privileges-save");
if(B){if(A){B.enable()
}else{B.disable()
}}}},loadRecord:function(F){if(this.userForm.rendered){var D=F.get(CQ.security.data.AuthRecord.PRIVILEGE_FIELD);
var E="deny";
for(var B=0;
B<D.length;
B++){if(D[B]==CQ.security.Privileges.MODIFY_HIERARCHY){E="allow";
break
}}var C=this.userForm.getForm();
C.setValues([{id:CQ.security.Privileges.MODIFY_HIERARCHY,value:E}]);
C.baseParams.Authorizable=F.get("id");
this.record=F
}else{var A=this;
this.userForm.on("afterlayout",function(){A.loadRecord(F)
})
}},unloadRecord:function(B){var A=this.userForm.getForm();
A.reset();
A.baseParams.Authorizable=null
},saveHandler:function(){var C=this.userForm.getForm();
if(!C.baseParams.Authorizable){return 
}var A=CQ.HTTP.externalize("/libs/cq/security/privileges/simple");
var B=new CQ.form.SlingSubmitAction(C,{clientValidation:false,url:A,success:function(G){if(this.record){var D=G.getValues(false);
if(D){var E=new Array();
var H=this.record.get(CQ.security.data.AuthRecord.PRIVILEGE_FIELD);
for(var F=0;
F<H.length;
F++){if(H[F]!=CQ.security.Privileges.MODIFY_HIERARCHY){E.push(H[F])
}}if(D[CQ.security.Privileges.MODIFY_HIERARCHY]=="allow"){E.push(CQ.security.Privileges.MODIFY_HIERARCHY)
}this.record.set(CQ.security.data.AuthRecord.PRIVILEGE_FIELD,E)
}}this.enableSaveButton(false);
CQ.Notification.notify(CQ.I18n.getMessage("OK"),CQ.I18n.getMessage("changes saved"))
},failure:function(D,E){CQ.Notification.notify(CQ.I18n.getMessage("Failure"),E.response.statusText)
},scope:this});
C.doAction(B)
}});
CQ.security.Privileges.getUrl=function(C){var B=C.findField("home");
if(B){var A=B.getValue();
if(!A){A=CQ.HTTP.externalize("/bin/security/authorizables/POST");
A=CQ.HTTP.addParameter(A,"Authorizable",C.findField("id").getValue())
}else{A=CQ.HTTP.externalize(A)
}return A
}};
CQ.security.Privileges.MODIFY_HIERARCHY="wcm/core/privileges/modifyhierarchy";
CQ.security.PermissionEditor=CQ.Ext.extend(CQ.Ext.Panel,{authorizableId:null,dirty:false,constructor:function(B){if(!B){B={}
}var A=CQ.Util.applyDefaults(B,{layout:"border",border:false,bodyStyle:"padding:0px;",layoutConfig:{autoShow:true},title:CQ.I18n.getMessage("Page Permissions"),dataPath:CQ.HTTP.externalize("/bin/security/authorization/acltable"),treePath:"/bin/tree/ext",treeRoot:{name:"",text:"CQ",draggable:false,expanded:true,singleClickExpand:true},tbar:[{id:"cq-useadmin-permissioneditor-save",text:CQ.I18n.getMessage("Save"),handler:this.saveHandler,disabled:true,title:CQ.I18n.getMessage("Save Changes"),tooltip:CQ.I18n.getMessage("Save changes to Permissions"),scope:this}]});
this.aclStore=new CQ.security.data.AclStore({recId:"path",autoload:false,listeners:{add:{fn:this.storeChanged,scope:this},remove:{fn:this.storeChanged,scope:this},update:{fn:this.storeChanged,scope:this},loadexception:function(){this.removeAll()
}},proxy:new CQ.Ext.data.HttpProxy({url:A.dataPath+".effective"+CQ.HTTP.EXTENSION_JSON,method:"GET"})});
this.grid=new CQ.Ext.grid.EditorGridPanel({region:"center",store:this.aclStore,loadMask:true,cm:new CQ.Ext.grid.ColumnModel(CQ.security.PermissionEditor.COLUMNS),viewConfig:{forceFit:true},sm:new CQ.Ext.grid.RowSelectionModel({singleSelect:true,listeners:{rowdblclick:{fn:this.editACE,scope:this}}})});
this.tree=new CQ.Ext.tree.TreePanel({region:"west",autoScroll:true,width:200,stateful:false,listeners:{click:{fn:this.loadTable,scope:this}},root:new CQ.Ext.tree.AsyncTreeNode(A.treeRoot),loader:new CQ.Ext.tree.TreeLoader({baseParams:{predicate:"useradmin"},requestMethod:"GET",dataUrl:CQ.HTTP.externalize(A.treePath)+CQ.HTTP.EXTENSION_JSON,baseAttrs:{singleClickExpand:true},listeners:{beforeload:function(E,F){this.baseParams.path=F.getPath()
}}})});
var D=new Array();
D.push({header:CQ.I18n.getMessage("Path"),dataIndex:"path",menuDisabled:true});
for(var C=0;
C<CQ.security.PermissionEditor.COLUMNS.length;
C++){D.push(CQ.security.PermissionEditor.COLUMNS[C])
}A.items=[this.tree,this.grid];
CQ.security.PermissionEditor.superclass.constructor.call(this,A)
},loadRecord:function(A){this.aclStore.removeAll();
if(this.tree.root.isLoaded()){this.tree.collapseAll()
}if(A&&A.id){this.authorizableId=A.id;
this.aclStore.baseParams.Authorizable=A.id
}},unloadRecord:function(A){this.authorizableId=null;
this.aclStore.baseParams.Authorizable=null;
this.loadRecord(null)
},loadTable:function(A){var B=A.getPath();
this.grid.stopEditing();
this.aclStore.baseParams.path=B;
this.aclStore.reload()
},editACE:function(){if(this.aclStore.getCount()<1){var A=this.tree.getSelectionModel().getSelectionModel();
var B=A.getSelectedNode().getPath();
var C=new CQ.security.PrivilegeEditor.RECORD({path:B});
C.set("authorizable",this.authorizableId);
this.aclStore.insert(0,[C])
}this.grid.startEditing(0,0)
},saveHandler:function(){var H=new Array();
var C={_charset_:"utf-8",Authorizable:this.authorizableId,modified:new Array(),path:this.getSelectedPath()};
var I=this.aclStore;
var B=I.getCount();
for(var E=0;
E<B;
E++){var D=I.getAt(E);
if(D.dirty){D.set("path",this.getSelectedPath());
D.set("authorizable",this.authorizableId);
H.push(D);
C.modified.push(D.toParam())
}}var G=this;
var F=CQ.Ext.getCmp("cq-useadmin-permissioneditor-save");
var A=this.initialConfig.dataPath;
CQ.HTTP.post(A,function(){F.disable();
G.dirty=false;
for(var J=0;
J<H.length;
J++){H[J].commit()
}},C,this)
},storeChanged:function(A,D,C){var B=CQ.Ext.getCmp("cq-useadmin-permissioneditor-save");
if(B&&CQ.Ext.data.Record.COMMIT!=C){this.dirty=true;
B.enable()
}},getSelectedPath:function(){var B=this.tree.getSelectionModel();
var A=B.getSelectedNode();
if(A){return A.getPath()
}else{return null
}}});
CQ.security.PermissionEditor.COLUMN_EDITOR={allowBlank:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:[["allow",CQ.I18n.getMessage("allow")],["deny",CQ.I18n.getMessage("deny")]]};
CQ.security.PermissionEditor.COLUMNS_RENDERER=function(C){var B;
var A;
if(!C||C=="deny"){A=CQ.I18n.getMessage("deny");
B="red"
}else{A=CQ.I18n.getMessage("allow");
B="green"
}return'<font color="'+B+'">'+A+"</font>"
};
CQ.security.PermissionEditor.COLUMNS=[{header:CQ.I18n.getMessage("Read"),dataIndex:"read",editor:new CQ.Ext.form.ComboBox(CQ.security.PermissionEditor.COLUMN_EDITOR),menuDisabled:true,renderer:CQ.security.PermissionEditor.COLUMNS_RENDERER},{header:CQ.I18n.getMessage("Modify"),dataIndex:"modify",editor:new CQ.Ext.form.ComboBox(CQ.security.PermissionEditor.COLUMN_EDITOR),menuDisabled:true,renderer:CQ.security.PermissionEditor.COLUMNS_RENDERER},{header:CQ.I18n.getMessage("Create"),dataIndex:"create",editor:new CQ.Ext.form.ComboBox(CQ.security.PermissionEditor.COLUMN_EDITOR),menuDisabled:true,renderer:CQ.security.PermissionEditor.COLUMNS_RENDERER},{header:CQ.I18n.getMessage("Delete"),dataIndex:"delete",editor:new CQ.Ext.form.ComboBox(CQ.security.PermissionEditor.COLUMN_EDITOR),menuDisabled:true,renderer:CQ.security.PermissionEditor.COLUMNS_RENDERER},{header:CQ.I18n.getMessage("Read ACL"),dataIndex:"acl_read",editor:new CQ.Ext.form.ComboBox(CQ.security.PermissionEditor.COLUMN_EDITOR),menuDisabled:true,renderer:CQ.security.PermissionEditor.COLUMNS_RENDERER},{header:CQ.I18n.getMessage("Write ACL"),dataIndex:"acl_edit",editor:new CQ.Ext.form.ComboBox(CQ.security.PermissionEditor.COLUMN_EDITOR),menuDisabled:true,renderer:CQ.security.PermissionEditor.COLUMNS_RENDERER},{header:"",menuDisabled:true,dataIndex:"_read",renderer:function(A){return""
}}];
CQ.security.AclEditor=CQ.Ext.extend(CQ.Ext.Panel,{aclList:null,aclStore:null,authSelection:null,constructor:function(B){B=CQ.Util.applyDefaults(B,{id:"cq-useradmin-wrapper",layout:"border",stateful:false,title:CQ.I18n.getMessage("Permissions / ACL"),dataPath:"/bin/security/authorization/acltable"});
this.aclStore=new CQ.security.data.AclStore({proxy:new CQ.Ext.data.HttpProxy({url:B.dataPath+".effective"+CQ.HTTP.EXTENSION_JSON,method:"GET"})});
this.aclList=new CQ.Ext.grid.EditorGridPanel({autoExpandColumn:"Id",region:"center",store:this.aclStore,viewConfig:{forceFit:true},cm:new CQ.Ext.grid.ColumnModel(CQ.security.AclEditor.COLUMNS),sm:new CQ.Ext.grid.RowSelectionModel({singleSelect:true}),frame:false,autoExpand:true,autoShow:true});
var A={width:200,enableDragDrop:false,hideFilter:true,selectionModel:new CQ.Ext.grid.RowSelectionModel({singleSelect:true}),anchor:"30%",columnModel:new CQ.Ext.grid.ColumnModel([{header:CQ.I18n.getMessage("Type"),dataIndex:"type",width:30,fixed:true,resizable:false,hideable:false,renderer:CQ.security.AuthorizableList.renderIcon},{header:CQ.I18n.getMessage("Name"),dataIndex:"name",renderer:function(E,C,D){return CQ.shared.XSS.xssPropertyRenderer(E,C,D,this)
}}]),listeners:{rowdblclick:{fn:this.selectionAction,scope:this}}};
this.authSelection=new CQ.security.AuthorizableList(A);
B.items=[new CQ.Ext.Panel({id:"editor",region:"center",stateful:false,layout:"border",items:[this.aclList,this.authSelection]})];
CQ.security.AclEditor.superclass.constructor.call(this,B)
},initComponent:function(){CQ.security.AclEditor.superclass.initComponent.call(this);
this.addEvents("aclchanged","aclsaved");
var B=this;
var A=function(){B.fireEvent("aclchanged",B)
};
this.aclStore.on("add",A,this);
this.aclStore.on("update",A,this);
this.aclStore.on("remove",A,this)
},load:function(A){if(typeof (A)=="object"){this.aclStore.loadData(A)
}else{this.aclStore.baseParams.path=A;
this.aclStore.removeAll()
}},reload:function(){this.aclStore.removeAll()
},save:function(){var E={changelog:[],path:this.aclStore.baseParams.path};
var C=this.aclStore.getModifiedRecords();
for(var B=0;
B<C.length;
B++){var A=this.serializeRec(C[B]);
E.changelog.push(A)
}var D=this;
CQ.HTTP.post(E.path+".cqactions.html",function(G,H,F){D.aclStore.commitChanges();
D.fireEvent("aclsaved",D,H)
},E,this)
},selectionAction:function(A){var C=A.getSelectionModel().getSelected();
var B=C.get("type");
if(B){this.aclStore.load({params:{Authorizable:C.id,path:this.aclStore.baseParams.path},add:true})
}},serializeRec:function(C){var A=CQ.security.data.AclRecord.FIELDS;
var B="";
for(var E=0;
E<A.length;
E++){var F=A[E];
var D=F.name;
if(D=="update"){continue
}var G=C.get(D);
if(F.mapping){D=F.mapping
}B+=D+":"+encodeURIComponent(G)+","
}return B
}});
CQ.security.AclEditor.COLUMN_EDITOR={allowBlank:true,mode:"local",triggerAction:"all",selectOnFocus:true,store:[["allow",CQ.I18n.getMessage("allow")],["deny",CQ.I18n.getMessage("deny")]]};
CQ.security.AclEditor.COLUMNS_RENDERER=function(A){var B=CQ.I18n.getVarMessage(A);
if("allow"==A){return'<font color="green">'+B+"</font>"
}else{if("deny"==A){return'<font color="red">'+B+"</font>"
}}return A
};
CQ.security.AclEditor.COLUMNS=[{id:"Id",header:CQ.I18n.getMessage("Authorizable"),dataIndex:"authorizable",width:200,sortable:true,menuDisabled:true},{header:CQ.I18n.getMessage("Read"),dataIndex:"read",width:80,editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),resizable:false,menuDisabled:true,renderer:CQ.security.AclEditor.COLUMNS_RENDERER},{header:CQ.I18n.getMessage("Modify"),dataIndex:"modify",width:80,editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),resizable:false,menuDisabled:true,renderer:CQ.security.AclEditor.COLUMNS_RENDERER},{header:CQ.I18n.getMessage("Create"),dataIndex:"create",width:80,editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),resizable:false,menuDisabled:true,renderer:CQ.security.AclEditor.COLUMNS_RENDERER},{header:CQ.I18n.getMessage("Delete"),dataIndex:"delete",width:80,editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),resizable:false,menuDisabled:true,renderer:CQ.security.AclEditor.COLUMNS_RENDERER},{header:CQ.I18n.getMessage("Read ACL"),dataIndex:"acl_read",width:80,editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),resizable:false,menuDisabled:true,renderer:CQ.security.AclEditor.COLUMNS_RENDERER},{header:CQ.I18n.getMessage("Write ACL"),dataIndex:"acl_edit",width:80,editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),resizable:false,menuDisabled:true,renderer:CQ.security.AclEditor.COLUMNS_RENDERER}];
CQ.security.UserProperties=CQ.Ext.extend(CQ.Ext.Panel,{userForm:null,groupForm:null,currentRecord:null,activeForm:null,hiddenForm:null,dirty:false,dirtyUser:false,dirtyGroup:false,constructor:function(B){var D={show:function(){this.el.setVisible(true);
this.syncSize()
}};
this.userForm=new CQ.Ext.form.FormPanel({baseParams:{_charset_:"utf-8"},border:false,bodyStyle:"padding:5px;",anchor:"100% 80%",hidden:true,defaults:{enableKeyEvents:true,listeners:{change:{fn:this.enableUserSaveButton,scope:this},keyup:{fn:this.enableUserSaveButton,scope:this}}},items:[{xtype:"textfield",fieldLabel:CQ.I18n.getMessage("Login"),anchor:"100%",disabled:true,allowBlank:false,name:"rep:userId"},{xtype:"textfield",fieldLabel:CQ.I18n.getMessage("First Name"),anchor:"100%",name:"givenName"},{xtype:"textfield",fieldLabel:CQ.I18n.getMessage("Last Name"),anchor:"100%",name:"familyName",allowBlank:false},{xtype:"textfield",fieldLabel:CQ.I18n.getMessage("Mail"),anchor:"100%",vtype:"email",msgTarget:"under",name:"email"},{xtype:"textarea",fieldLabel:CQ.I18n.getMessage("About"),anchor:"100% -155",name:"aboutMe"},{xtype:"textfield",fieldLabel:CQ.I18n.getMessage("Path"),anchor:"100%",disabled:true,name:"home"}],tbar:[],listeners:D});
this.pwdButtons=new CQ.Ext.util.MixedCollection();
this.pwdButtons.addAll([new CQ.Ext.Toolbar.Button({text:CQ.I18n.getMessage("Set Password"),tooltip:CQ.I18n.getMessage("Set Password"),handler:this.setPassword,scope:this.userForm}),new CQ.Ext.Toolbar.Separator()]);
var A=this.userForm.getTopToolbar();
for(var C=0;
C<this.pwdButtons.length;
C++){A.add(this.pwdButtons.get(C))
}A.add({id:"cq-useradmin-userproperties-save",disabled:true,text:CQ.I18n.getMessage("Save"),tooltip:{title:CQ.I18n.getMessage("Save Changes"),text:CQ.I18n.getMessage("Save changes of the profile"),autoHide:true},handler:this.saveHandler,scope:this.userForm});
this.groupForm=new CQ.Ext.form.FormPanel({baseParams:{_charset_:"utf-8"},border:false,bodyStyle:"padding:5px;",anchor:"100% 80%",hidden:true,defaults:{enableKeyEvents:true,listeners:{change:{fn:this.enableGroupSaveButton,scope:this},keyup:{fn:this.enableGroupSaveButton,scope:this}}},items:[{xtype:"textfield",fieldLabel:CQ.I18n.getMessage("ID"),anchor:"100%",disabled:true,allowBlank:false,name:"id"},{xtype:"textfield",fieldLabel:CQ.I18n.getMessage("Name"),anchor:"100%",name:"givenName"},{xtype:"textfield",fieldLabel:CQ.I18n.getMessage("Mail"),anchor:"100%",vtype:"email",msgTarget:"under",name:"email"},{xtype:"textarea",fieldLabel:CQ.I18n.getMessage("About"),anchor:"100% -155",name:"aboutMe"},{xtype:"textfield",fieldLabel:CQ.I18n.getMessage("Path"),anchor:"100%",disabled:true,name:"home"}],tbar:[],listeners:D});
A=this.groupForm.getTopToolbar();
A.add({id:"cq-useradmin-groupproperties-save",disabled:true,text:CQ.I18n.getMessage("Save"),tooltip:{title:CQ.I18n.getMessage("Save Changes"),text:CQ.I18n.getMessage("Save changes of the profile"),autoHide:true},handler:this.saveHandler,scope:this.groupForm});
CQ.Util.applyDefaults(B,{layout:"form",bodyStyle:"padding:0px;",labelWidth:75,title:CQ.I18n.getMessage("Properties"),items:[this.userForm,this.groupForm],listeners:{show:function(){if(this.activeForm){this.activeForm.show()
}if(this.hiddenForm){this.hiddenForm.hide()
}}}});
CQ.security.UserProperties.superclass.constructor.call(this,B)
},enableUserSaveButton:function(A){if(A!==false){A=true
}if(this.dirtyUser!=A){this.dirtyUser=this.dirty=A;
var B=CQ.Ext.getCmp("cq-useradmin-userproperties-save");
if(B){if(A){B.enable()
}else{B.disable()
}}}},enableGroupSaveButton:function(A){if(A!==false){A=true
}if(this.dirtyGroup!=A){this.dirtyGroup=this.dirty=A;
var B=CQ.Ext.getCmp("cq-useradmin-groupproperties-save");
if(B){if(A){B.enable()
}else{B.disable()
}}}},loadRecord:function(B){this.enableUserSaveButton(false);
this.enableGroupSaveButton(false);
var A=B.get("type");
if(A=="user"){this.activeForm=this.userForm;
this.hiddenForm=this.groupForm;
if(B.id==CQ.security.UserProperties.ADMIN_ID){this.pwdButtons.each(function(C){C.hide();
return true
})
}else{this.pwdButtons.each(function(C){C.show();
return true
})
}}else{this.activeForm=this.groupForm;
this.hiddenForm=this.userForm
}this.activeForm.getForm().loadRecord(B);
this.activeForm.currentRecord=B
},unloadRecord:function(A){if(!this.groupForm.hidden){this.groupForm.hide();
this.groupForm.currentRecord=null
}else{this.userForm.hide();
this.userForm.currentRecord=null
}},saveHandler:function(){var C=this.getForm();
var A=CQ.security.UserProperties.getUrl(C);
var B=new CQ.form.SlingSubmitAction(C,{clientValidation:false,url:A,success:function(D){D.updateRecord(this.currentRecord);
this.ownerCt.enableUserSaveButton(false);
this.ownerCt.enableGroupSaveButton(false);
CQ.Notification.notify(CQ.I18n.getMessage("OK"),CQ.I18n.getMessage("changes saved"))
},failure:function(D,E){CQ.Notification.notify(CQ.I18n.getMessage("Failure"),E.response.statusText)
},scope:this});
C.doAction(B)
},setPassword:function(){var B={width:400,height:200,"jcr:primaryType":"cq:Dialog",title:CQ.I18n.getMessage("Set Password"),formUrl:CQ.security.UserProperties.getUrl(this.getForm()),params:{_charset_:"utf-8"},items:{"jcr:primaryType":"cq:Panel",items:{"jcr:primaryType":"cq:WidgetCollection",password:{inputType:"password",fieldLabel:CQ.I18n.getMessage("Password"),name:"rep:password",allowBlank:false,msgTarget:"under"},password2:{inputType:"password",fieldLabel:CQ.I18n.getMessage("Confirm Password"),name:"rep:password",allowBlank:false,msgTarget:"under",validator:function(D){var E=this.ownerCt.items.get(0).getRawValue();
if(E==D){return true
}return CQ.I18n.getMessage("Provided passwords do not match.")
}}}},okText:CQ.I18n.getMessage("Set"),buttons:CQ.Dialog.OKCANCEL};
var C=this.currentRecord;
var A=CQ.Util.build(B);
A.success=function(D){D.updateRecord(C);
CQ.Notification.notify(CQ.I18n.getMessage("OK"),CQ.I18n.getMessage("changes saved"))
};
A.failure=function(){CQ.Notification.notify(CQ.I18n.getMessage("Failure"),CQ.I18n.getMessage("Could not set Password"))
};
A.show()
}});
CQ.security.UserProperties.getUrl=function(C){var B=C.findField("home");
if(B){var A=B.getValue();
if(!A){A=CQ.HTTP.externalize("/bin/security/authorizables/POST");
A=CQ.HTTP.addParameter(A,"Authorizable",C.findField("id").getValue())
}else{A=CQ.HTTP.externalize(CQ.HTTP.encodePath(A))
}return A
}};
CQ.security.UserProperties.ADMIN_ID="admin";
CQ.security.Preferences=CQ.Ext.extend(CQ.Ext.Panel,{form:null,currentRecord:null,languageStore:null,winModeStore:null,fieldCfgs:{},dirty:false,enableSaveButton:function(){var A=CQ.Ext.getCmp("cq-useradmin-preferences-save");
if(A){A.enable();
this.dirty=true
}},constructor:function(A){this.fieldCfgs=[{id:"cq-useradmin-preferences-language",width:"350px",xtype:"selection",type:"select",listeners:{selectionchanged:{fn:this.enableSaveButton,scope:this}},options:[{value:"en",text:CQ.I18n.getMessage("English")},{value:"de",text:CQ.I18n.getMessage("German")},{value:"fr",text:CQ.I18n.getMessage("French")},{value:"es",text:CQ.I18n.getMessage("Spanish")},{value:"it",text:CQ.I18n.getMessage("Italian")},{value:"zh-cn",text:CQ.I18n.getMessage("Chinese")},{value:"ja",text:CQ.I18n.getMessage("Japanese")}],name:CQ.security.Preferences.PREFERENCE_LANGUAGE,fieldLabel:CQ.I18n.getMessage("Language")},{id:"cq-useradmin-preferences-winmode",width:"350px",xtype:"selection",type:"select",listeners:{selectionchanged:{fn:this.enableSaveButton,scope:this}},options:[{value:"single",text:CQ.I18n.getMessage("Single Window")},{value:"multi",text:CQ.I18n.getMessage("Multiple Windows")}],name:CQ.security.Preferences.PREFERENCE_WINMODE,fieldDescription:CQ.I18n.getMessage("Allow links to open in new windows or force reuse of the existing one"),fieldLabel:CQ.I18n.getMessage("Window Management")},{id:"cq-useradmin-preferences-toolbar",fieldDescription:"Show or hide the global editing toolbar",fieldLabel:"Editing Toolbar",width:"350px",name:CQ.security.Preferences.PREFERENCE_TOOLBAR,type:"select",xtype:"selection",listeners:{selectionchanged:{fn:this.enableSaveButton,scope:this}},options:[{text:"Show when needed (Default)",value:"ondemand"},{text:"Always show",value:"always"},{text:"Keep hidden",value:"never"}]},{xtype:"hidden",name:"home"}];
this.form=new CQ.Ext.form.FormPanel({baseParams:{_charset_:"utf-8"},border:false,bodyStyle:"padding:5px;",anchor:"100% 80%",items:this.fieldCfgs,listeners:{render:function(){var B=this;
setTimeout(function(){B.doLayout()
},1)
}},tbar:[{id:"cq-useradmin-preferences-save",disabled:true,text:CQ.I18n.getMessage("Save"),tooltip:CQ.I18n.getMessage("Save Changes"),handler:this.saveHandler,scope:this}]});
CQ.Util.applyDefaults(A,{layout:"form",bodyStyle:"padding:0px;",labelWidth:75,title:CQ.I18n.getMessage("Preferences"),items:[this.form]});
CQ.security.Preferences.superclass.constructor.call(this,A)
},loadRecord:function(rec){var path=CQ.HTTP.encodePath(rec.get("home"));
var url=path+".preferences"+CQ.HTTP.EXTENSION_JSON;
url=CQ.HTTP.noCaching(url);
var res=CQ.HTTP.get(url);
if(CQ.HTTP.isOk(res)){this.currentRecord=new CQ.data.SlingRecord(CQ.Util.eval(res));
this.loadForm(this.currentRecord)
}else{this.currentRecord=null
}},unloadRecord:function(A){this.currentRecord=null
},loadForm:function(E){if(!E){return 
}for(var A=0;
A<this.fieldCfgs.length;
A++){var D=this.fieldCfgs[A];
if(!D.id){continue
}var C=CQ.Ext.getCmp(D.id);
var B=E.get(D.name);
if(!B&&C.getName(CQ.security.Preferences.PREFERENCE_LANGUAGE)){B=E.get(CQ.security.Preferences.PREFERENCE_LANGUAGE_OLD)
}C.setValue(B)
}},saveHandler:function(){if(this.currentRecord){var B=this.currentRecord.get("path");
if(B){B=CQ.HTTP.externalize(CQ.HTTP.encodePath(B));
var A=this;
var D=this.form.getForm();
var C=new CQ.form.SlingSubmitAction(D,{clientValidation:false,url:B,success:function(E){var F=CQ.Ext.getCmp("cq-useradmin-preferences-save");
if(F){F.disable()
}A.dirty=false;
CQ.Notification.notify(CQ.I18n.getMessage("OK"),CQ.I18n.getMessage("Preferences saved"))
},failure:function(E,F){CQ.Notification.notify(CQ.I18n.getMessage("Failure"),F.response.statusText)
},scope:this});
D.doAction(C);
return 
}}CQ.Notification.notify(CQ.I18n.getMessage("Failure"),CQ.I18n.getMessage("No User selected"))
}});
CQ.security.Preferences.PREFERENCE_LANGUAGE="./language";
CQ.security.Preferences.PREFERENCE_LANGUAGE_OLD="./platform/language";
CQ.security.Preferences.PREFERENCE_WINMODE="./winMode";
CQ.security.Preferences.PREFERENCE_TOOLBAR="./toolbarDisplay";
CQ.security.UserAdmin=CQ.Ext.extend(CQ.Ext.Viewport,{tabs:[],constructor:function(B){var A=CQ.Util.applyDefaults(B,{proxy:new CQ.Ext.data.HttpProxy({url:"/bin/security/authorizables.json",method:"GET"}),baseParams:{hideGroups:false,hideUsers:false}});
this.selectionStore=new CQ.Ext.data.Store(A);
this.debug=B.debug;
this.selectionBar=new CQ.Ext.Toolbar({region:"north",minHeight:21,style:"height:21px",items:[new CQ.Ext.DataView({store:this.selectionStore,tpl:new CQ.Ext.XTemplate('<tpl for=".">','<div class="{[values.type=="user" ? "userIcon" : "groupIcon"]}">','{[values[CQ.shared.XSS.getXSSPropertyName("name")] == "" ? values.id : values[CQ.shared.XSS.getXSSPropertyName("name")]]}',"</div>","</tpl>"),id:"user-selection",autoHeight:true,multiSelect:true,itemSelector:":first-child"}),"->",CQ.wcm.HelpBrowser.createHelpButton()]});
this.userProperties=new CQ.security.UserProperties({hidden:true});
this.tabs.push(this.userProperties);
this.membership=new CQ.security.AuthRelationPanel({listeners:{authSaved:{fn:this.dispatchAuthSaved,scope:this}},disabled:true,field:"memberOf",title:CQ.I18n.getMessage("Groups")});
this.tabs.push(this.membership);
this.members=new CQ.security.AuthRelationPanel({authType:CQ.security.UserAdminPanel.TYPE_GROUP,listeners:{authSaved:{fn:this.dispatchAuthSaved,scope:this}},disabled:true,field:"members",allowUserAdd:true,title:CQ.I18n.getMessage("Members")});
this.tabs.push(this.members);
var D=CQ.Util.applyDefaults(B.authlist,{anchor:"30%",listeners:{rowdblclick:{fn:this.selectionHandler,scope:this},authremoved:{fn:this.removeHandler,scope:this}}});
this.list=new CQ.security.AuthorizableList(D);
var C=new CQ.security.RightsPanel({listeners:{authSaved:function(F,E,G){this.loadRecord(E);
this.dispatchAuthSaved(F,E,G)
},scope:this}});
this.tabs.push(C);
this.tabs.push(new CQ.security.AuthRelationPanel({authType:CQ.security.UserAdminPanel.TYPE_USER,disabled:true,allowUserAdd:true,field:"sudoers",title:CQ.I18n.getMessage("Impersonators")}));
this.tabs.push(new CQ.security.Preferences({}));
this.tabPanel=new CQ.Ext.TabPanel({region:"center",border:false,enableTabScroll:true,defaults:{autoScroll:true},items:this.tabs,activeTab:0});
CQ.security.UserAdmin.superclass.constructor.call(this,{id:"cq-useradmin",layout:"border",renderTo:"CQ",items:[{id:"cq-useradmin-wrapper",xtype:"panel",layout:"border",region:"center",border:false,items:[{id:"cq-header",xtype:"container",autoEl:"div",region:"north",items:[{xtype:"panel",border:false,layout:"column",cls:"cq-header-toolbar",items:[new CQ.Switcher({}),new CQ.UserInfo({}),new CQ.HomeLink({})]}]},{xtype:"panel",region:"center",layout:"border",id:"editor",items:[this.list,{xtype:"panel",layout:"border",region:"center",margins:"5 5 5 0",items:[this.selectionBar,this.tabPanel]}]}]}]});
window.onbeforeunload=CQ.security.UserAdmin.checkModifications;
CQ.Ext.EventManager.addListener(window,"unload",function(){window.onbeforeunload=null
})
},loadRecord:function(D){var A=this.selectionStore;
if(A){A.removeAll();
A.add(D);
A.baseParams.id=[D.id]
}for(var B=0;
B<this.tabs.length;
B++){var C=this.tabs[B];
if(!C.disabled&&C.loadRecord){C.loadRecord(D)
}else{if(C.onSelectionChanged){C.onSelectionChanged(A,D)
}}}},unloadRecord:function(D){var A=this.selectionStore;
for(var B=0;
B<this.tabs.length;
B++){var C=this.tabs[B];
if(!C.disabled&&C.unloadRecord){C.unloadRecord(D)
}else{if(C.onSelectionChanged){C.onSelectionChanged(A,D)
}}}},switchVisibilty:function(C){for(var A=0;
A<this.tabs.length;
A++){var B=this.tabs[A];
if(!B.authType||B.authType==C){B.enable()
}else{B.disable()
}}},selectionHandler:function(B){var C=B.getSelectionModel();
if(C.hasSelection()){var A=CQ.security.UserAdmin.checkModifications();
if(!A||confirm(A)){var D=C.getSelected();
this.tabPanel.activate(this.userProperties);
this.switchVisibilty(D.get("type"));
this.loadRecord(D);
this.tabPanel.getActiveTab().show();
C.clearSelections()
}}},removeHandler:function(B,G){var A=this.selectionStore;
if(A){var F=A.query("id",G.id);
if(F.length>0){for(var C=0;
C<F.length;
C++){var E=F.itemAt(C);
this.unloadRecord(E);
A.remove(E)
}}if(A.getCount()==0){this.tabPanel.activate(this.userProperties);
for(var D=1;
D<this.tabs.length;
D++){this.tabs[D].disable()
}}}},dispatchAuthSaved:function(C,E,D){for(var B=0;
B<this.tabs.length;
B++){var A=this.tabs[B];
if(A!=C&&A.onSelectionModfied){A.onSelectionModfied(E,D)
}}if(this.list){this.list.updateRelation(E,D)
}}});
CQ.security.UserAdmin.checkModifications=function(){var A=CQ.Ext.getCmp("cq-useradmin");
if(A){for(var B=0;
B<A.tabs.length;
B++){if(A.tabs[B].dirty){return CQ.I18n.getMessage("There are unsaved changes for the user or group currently being edited.")
}}}};
CQ.UserAdmin=CQ.security.UserAdmin;
CQ.Ext.reg("useradmin",CQ.security.UserAdmin);
CQ.security.UserAdmin.createUser=function(){var B={"jcr:primaryType":"cq:Dialog",title:CQ.I18n.getMessage("Create User"),formUrl:"/libs/cq/security/authorizables/POST",params:{_charset_:"utf-8"},items:{"jcr:primaryType":"cq:Panel",items:{"jcr:primaryType":"cq:WidgetCollection",login:{fieldLabel:CQ.I18n.getMessage("Login ID"),emptyText:CQ.I18n.getMessage("Enter login for the user"),allowBlank:false,name:"rep:userId",msgTarget:"under",vtype:"authorizableId"},fname:{fieldLabel:CQ.I18n.getMessage("First Name"),name:"givenName",msgTarget:"under"},name:{fieldLabel:CQ.I18n.getMessage("Last Name"),allowBlank:false,name:"familyName",msgTarget:"under"},mail:{fieldLabel:CQ.I18n.getMessage("Mail"),vtype:"email",name:"email",msgTarget:"under"},password:{inputType:"password",fieldLabel:CQ.I18n.getMessage("Password"),name:"rep:password",allowBlank:false,msgTarget:"under"},password2:{inputType:"password",fieldLabel:CQ.I18n.getMessage("Confirm Password"),name:"rep:password",allowBlank:false,msgTarget:"under",validator:function(C){var D=this.ownerCt.items.get(4).getRawValue();
if(D==C){return true
}return CQ.I18n.getMessage("Provided passwords do not match.")
}},intermediatepath:{fieldLabel:CQ.I18n.getMessage("Path"),xtype:"pathfield",rootPath:"/home/users",predicate:"authorizablefolder",showTitlesInTree:false,name:"intermediatePath",msgTarget:"under"}}},okText:CQ.I18n.getMessage("Create")};
var A=CQ.WCM.getDialog(B);
A.failure=function(G,F){var C;
try{var E=CQ.HTTP.buildPostResponseFromHTML(F.response.responseText);
C=E.headers[CQ.HTTP.HEADER_MESSAGE]
}catch(D){C=CQ.I18n.getMessage("Failed to create user")
}CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),C)
};
A.success=function(){var C=CQ.Ext.StoreMgr.lookup("cq-useradmin-authstore");
C.reload.defer(500,C)
};
A.show()
};
CQ.security.UserAdmin.createGroup=function(){var B={"jcr:primaryType":"cq:Dialog",title:CQ.I18n.getMessage("Create Group"),formUrl:"/libs/cq/security/authorizables/POST",params:{_charset_:"utf-8"},items:{"jcr:primaryType":"cq:Panel",items:{"jcr:primaryType":"cq:WidgetCollection",login:{fieldLabel:CQ.I18n.getMessage("ID"),emptyText:CQ.I18n.getMessage("Enter ID for the group"),allowBlank:false,name:"groupName",msgTarget:"under",vtype:"authorizableId"},fname:{fieldLabel:CQ.I18n.getMessage("Group Name"),name:"givenName",msgTarget:"under"},description:{fieldLabel:CQ.I18n.getMessage("Description"),name:"aboutMe",msgTarget:"under"},intermediatepath:{fieldLabel:CQ.I18n.getMessage("Path"),xtype:"pathfield",rootPath:"/home/groups",predicate:"authorizablefolder",showTitlesInTree:false,name:"intermediatePath",msgTarget:"under"}}},okText:CQ.I18n.getMessage("Create")};
var A=CQ.WCM.getDialog(B);
A.failure=function(G,F){var C;
try{var E=CQ.HTTP.buildPostResponseFromHTML(F.response.responseText);
C=E.headers[CQ.HTTP.HEADER_MESSAGE]
}catch(D){C=CQ.I18n.getMessage("Failed to create group")
}CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),C)
};
A.success=function(){var C=CQ.Ext.StoreMgr.lookup("cq-useradmin-authstore");
C.reload.defer(200,C)
};
A.show()
};
CQ.security.AclDialog=CQ.Ext.extend(CQ.Dialog,{aclEditor:null,saveButton:null,loadContent:function(A){this.aclEditor.load(A)
},constructor:function(A){A=CQ.Util.applyDefaults(A,{title:CQ.I18n.getMessage("Edit Permissions"),editor:{title:null,border:false}});
A.buttons=[{text:CQ.I18n.getMessage("Save"),handler:this.save,scope:this},CQ.Dialog.CANCEL];
this.aclEditor=new CQ.security.AclEditor(A.editor);
this.aclEditor.on("aclsaved",this.saveCallback,this);
A.items=this.aclEditor;
CQ.security.AclDialog.superclass.constructor.call(this,A);
this.saveButton=this.buttons[0]
},save:function(){this.aclEditor.save.call(this.aclEditor);
this.hide()
},saveCallback:function(A,B){if(!B){}}});
CQ.Ext.reg("acldialog",CQ.security.AclDialog);
CQ.security.utils.Permissions=new Object();
CQ.security.utils.Permissions.register=function(){var B=CQ.User.getCurrentUser();
var A=new CQ.security.data.UserAclStore({id:CQ.User.PRIVILEGES_STORE_ID,recId:"path",dataUrl:B.getHome()+".permissions"+CQ.HTTP.EXTENSION_JSON});
B.setPermissionStore(A)
};
CQ.security.utils.Permissions.register();