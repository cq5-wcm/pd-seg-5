CQ.dam={};
CQ.dam.endorsed={};
CQ.dam.form={};
CQ.dam.themes={};
CQ.dam.Util=function(){var A=null;
return{alertNoSelection:function(){CQ.Ext.Msg.show({title:CQ.I18n.getMessage("No Assets Selected"),msg:CQ.I18n.getMessage("Please select one or multiple assets to perform this action."),buttons:CQ.Ext.Msg.OK,icon:CQ.Ext.MessageBox.INFO})
},setAssetEditorPath:function(B){A=B
},resultDblClick:function(B){CQ.dam.Util.openAsset()
},openAsset:function(D,C){if(!D){D=A
}var E=CQ.search.Util.getSelectedPaths();
if(!C){C=E[0]
}if(!A||!C){return 
}try{var B=CQ.HTTP.externalize(CQ.HTTP.encodePath(C)+".form.html"+D+".html",true);
CQ.shared.Util.open(B,null,"AssetEditorWindow")
}catch(F){}},downloadAsset:function(D,F){try{if(!D){D=[]
}else{if(!F){F=D[0]["jcr:path"]
}}var B=CQ.HTTP.externalize(CQ.HTTP.encodePath(F)+".assetdownload.zip",true);
if(D.length>1){for(var C=0;
C<D.length;
C++){B=CQ.HTTP.addParameter(B,"path",CQ.HTTP.encodePath(D[C]["jcr:path"]))
}}B=CQ.HTTP.addParameter(B,"_charset_","utf-8");
CQ.shared.Util.open(B,null,"AssetDownloadWindow")
}catch(E){}}}
}();
CQ.dam.endorsed.SWFUpload=function(A){this.initSWFUpload(A)
};
CQ.dam.endorsed.SWFUpload.prototype.initSWFUpload=function(A){try{document.execCommand("BackgroundImageCache",false,true)
}catch(C){}try{this.customSettings={};
this.settings={};
this.eventQueue=[];
this.movieName="CQ_dam_endorsed_SWFUpload_"+CQ.dam.endorsed.SWFUpload.movieCount++;
this.movieElement=null;
CQ.dam.endorsed.SWFUpload.instances[this.movieName]=this;
this.initSettings(A);
this.loadFlash();
this.displayDebugInfo()
}catch(B){this.debug(B)
}};
CQ.dam.endorsed.SWFUpload.instances={};
CQ.dam.endorsed.SWFUpload.movieCount=0;
CQ.dam.endorsed.SWFUpload.QUEUE_ERROR={QUEUE_LIMIT_EXCEEDED:-100,FILE_EXCEEDS_SIZE_LIMIT:-110,ZERO_BYTE_FILE:-120,INVALID_FILETYPE:-130};
CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR={HTTP_ERROR:-200,MISSING_UPLOAD_URL:-210,IO_ERROR:-220,SECURITY_ERROR:-230,UPLOAD_LIMIT_EXCEEDED:-240,UPLOAD_FAILED:-250,SPECIFIED_FILE_ID_NOT_FOUND:-260,FILE_VALIDATION_FAILED:-270,FILE_CANCELLED:-280,UPLOAD_STOPPED:-290};
CQ.dam.endorsed.SWFUpload.FILE_STATUS={QUEUED:-1,IN_PROGRESS:-2,ERROR:-3,COMPLETE:-4,CANCELLED:-5};
CQ.dam.endorsed.SWFUpload.prototype.initSettings=function(A){this.addSetting("upload_url",A.upload_url,"");
this.addSetting("file_post_name",A.file_post_name,"Filedata");
this.addSetting("post_params",A.post_params,{});
this.addSetting("file_types",A.file_types,"*.*");
this.addSetting("file_types_description",A.file_types_description,"All Files");
this.addSetting("file_size_limit",A.file_size_limit,"1024");
this.addSetting("file_upload_limit",A.file_upload_limit,"0");
this.addSetting("file_queue_limit",A.file_queue_limit,"0");
this.addSetting("flash_url",A.flash_url,"swfupload.swf");
this.addSetting("flash_width",A.flash_width,"1px");
this.addSetting("flash_height",A.flash_height,"1px");
this.addSetting("flash_color",A.flash_color,"#FFFFFF");
this.addSetting("debug_enabled",A.debug,false);
this.flashReady_handler=CQ.dam.endorsed.SWFUpload.flashReady;
this.swfUploadLoaded_handler=this.retrieveSetting(A.swfupload_loaded_handler,CQ.dam.endorsed.SWFUpload.swfUploadLoaded);
this.fileDialogStart_handler=this.retrieveSetting(A.file_dialog_start_handler,CQ.dam.endorsed.SWFUpload.fileDialogStart);
this.fileQueued_handler=this.retrieveSetting(A.file_queued_handler,CQ.dam.endorsed.SWFUpload.fileQueued);
this.fileQueueError_handler=this.retrieveSetting(A.file_queue_error_handler,CQ.dam.endorsed.SWFUpload.fileQueueError);
this.fileDialogComplete_handler=this.retrieveSetting(A.file_dialog_complete_handler,CQ.dam.endorsed.SWFUpload.fileDialogComplete);
this.uploadStart_handler=this.retrieveSetting(A.upload_start_handler,CQ.dam.endorsed.SWFUpload.uploadStart);
this.uploadProgress_handler=this.retrieveSetting(A.upload_progress_handler,CQ.dam.endorsed.SWFUpload.uploadProgress);
this.uploadError_handler=this.retrieveSetting(A.upload_error_handler,CQ.dam.endorsed.SWFUpload.uploadError);
this.uploadSuccess_handler=this.retrieveSetting(A.upload_success_handler,CQ.dam.endorsed.SWFUpload.uploadSuccess);
this.uploadComplete_handler=this.retrieveSetting(A.upload_complete_handler,CQ.dam.endorsed.SWFUpload.uploadComplete);
this.debug_handler=this.retrieveSetting(A.debug_handler,CQ.dam.endorsed.SWFUpload.debug);
this.customSettings=this.retrieveSetting(A.custom_settings,{})
};
CQ.dam.endorsed.SWFUpload.prototype.loadFlash=function(){var C,D,A;
if(document.getElementById(this.movieName)!==null){return false
}try{D=document.getElementsByTagName("body")[0];
if(typeof (D)==="undefined"||D===null){this.debug("Could not find the BODY element. SWFUpload failed to load.");
return false
}}catch(B){return false
}A=document.createElement("div");
A.style.width=this.getSetting("flash_width");
A.style.height=this.getSetting("flash_height");
D.appendChild(A);
A.innerHTML=this.getFlashHTML()
};
CQ.dam.endorsed.SWFUpload.prototype.getFlashHTML=function(){var A="";
if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){A='<embed type="application/x-shockwave-flash" src="'+this.getSetting("flash_url")+'" width="'+this.getSetting("flash_width")+'" height="'+this.getSetting("flash_height")+'"';
A+=' id="'+this.movieName+'" name="'+this.movieName+'" ';
A+='bgcolor="'+this.getSetting("flash_color")+'" quality="high" menu="false" flashvars="';
A+=this.getFlashVars();
A+='" />'
}else{A='<object id="'+this.movieName+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getSetting("flash_width")+'" height="'+this.getSetting("flash_height")+'">';
A+='<param name="movie" value="'+this.getSetting("flash_url")+'">';
A+='<param name="bgcolor" value="'+this.getSetting("flash_color")+'" />';
A+='<param name="quality" value="high" />';
A+='<param name="menu" value="false" />';
A+='<param name="flashvars" value="'+this.getFlashVars()+'" />';
A+="</object>"
}return A
};
CQ.dam.endorsed.SWFUpload.prototype.getFlashVars=function(){var B=this.buildParamString();
var A="";
A+="movieName="+encodeURIComponent(this.movieName);
A+="&uploadURL="+encodeURIComponent(this.getSetting("upload_url"));
A+="&params="+encodeURIComponent(B);
A+="&filePostName="+encodeURIComponent(this.getSetting("file_post_name"));
A+="&fileTypes="+encodeURIComponent(this.getSetting("file_types"));
A+="&fileTypesDescription="+encodeURIComponent(this.getSetting("file_types_description"));
A+="&fileSizeLimit="+encodeURIComponent(this.getSetting("file_size_limit"));
A+="&fileUploadLimit="+encodeURIComponent(this.getSetting("file_upload_limit"));
A+="&fileQueueLimit="+encodeURIComponent(this.getSetting("file_queue_limit"));
A+="&debugEnabled="+encodeURIComponent(this.getSetting("debug_enabled"));
return A
};
CQ.dam.endorsed.SWFUpload.prototype.getMovieElement=function(){if(typeof (this.movieElement)==="undefined"||this.movieElement===null){this.movieElement=document.getElementById(this.movieName)
}return this.movieElement
};
CQ.dam.endorsed.SWFUpload.prototype.buildParamString=function(){var B=this.getSetting("post_params");
var E=[];
var C,D,A;
if(typeof (B)==="object"){for(A in B){if(B.hasOwnProperty(A)){if(typeof (B[A])==="string"){E.push(encodeURIComponent(A)+"="+encodeURIComponent(B[A]))
}}}}return E.join("&")
};
CQ.dam.endorsed.SWFUpload.prototype.addSetting=function(B,C,A){if(typeof (C)==="undefined"||C===null){this.settings[B]=A
}else{this.settings[B]=C
}return this.settings[B]
};
CQ.dam.endorsed.SWFUpload.prototype.getSetting=function(A){if(typeof (this.settings[A])==="undefined"){return""
}else{return this.settings[A]
}};
CQ.dam.endorsed.SWFUpload.prototype.retrieveSetting=function(B,A){if(typeof (B)==="undefined"||B===null){return A
}else{return B
}};
CQ.dam.endorsed.SWFUpload.prototype.displayDebugInfo=function(){var B,A="";
A+="----- SWFUPLOAD SETTINGS     ----\nID: "+this.moveName+"\n";
A+=this.outputObject(this.settings);
A+="----- SWFUPLOAD SETTINGS END ----\n";
A+="\n";
this.debug(A)
};
CQ.dam.endorsed.SWFUpload.prototype.outputObject=function(B,D){var A="",C;
if(typeof (D)!=="string"){D=""
}if(typeof (B)!=="object"){return""
}for(C in B){if(B.hasOwnProperty(C)){if(typeof (B[C])==="object"){A+=(D+C+": { \n"+this.outputObject(B[C],"\t"+D)+D+"}\n")
}else{A+=(D+C+": "+B[C]+"\n")
}}}return A
};
CQ.dam.endorsed.SWFUpload.prototype.selectFile=function(){var B=this.getMovieElement();
if(B!==null&&typeof (B.SelectFile)==="function"){try{B.SelectFile()
}catch(A){this.debug("Could not call SelectFile: "+A)
}}else{this.debug("Could not find Flash element")
}};
CQ.dam.endorsed.SWFUpload.prototype.selectFiles=function(){var B=this.getMovieElement();
if(B!==null&&typeof (B.SelectFiles)==="function"){try{B.SelectFiles()
}catch(A){this.debug("Could not call SelectFiles: "+A)
}}else{this.debug("Could not find Flash element")
}};
CQ.dam.endorsed.SWFUpload.prototype.startUpload=function(C){var A=this;
var B=this.getMovieElement();
if(B!==null&&typeof (B.StartUpload)==="function"){setTimeout(function(){try{B.StartUpload(C)
}catch(D){A.debug("Could not call StartUpload: "+D)
}},0)
}else{this.debug("Could not find Flash element")
}};
CQ.dam.endorsed.SWFUpload.prototype.cancelUpload=function(C){var B=this.getMovieElement();
if(B!==null&&typeof (B.CancelUpload)==="function"){try{B.CancelUpload(C)
}catch(A){this.debug("Could not call CancelUpload: "+A)
}}else{this.debug("Could not find Flash element")
}};
CQ.dam.endorsed.SWFUpload.prototype.stopUpload=function(){var B=this.getMovieElement();
if(B!==null&&typeof (B.StopUpload)==="function"){try{B.StopUpload()
}catch(A){this.debug("Could not call StopUpload: "+A)
}}else{this.debug("Could not find Flash element")
}};
CQ.dam.endorsed.SWFUpload.prototype.getStats=function(){var B=this.getMovieElement();
if(B!==null&&typeof (B.GetStats)==="function"){try{return B.GetStats()
}catch(A){this.debug("Could not call GetStats")
}}else{this.debug("Could not find Flash element")
}};
CQ.dam.endorsed.SWFUpload.prototype.setStats=function(C){var B=this.getMovieElement();
if(B!==null&&typeof (B.SetStats)==="function"){try{B.SetStats(C)
}catch(A){this.debug("Could not call SetStats")
}}else{this.debug("Could not find Flash element")
}};
CQ.dam.endorsed.SWFUpload.prototype.setCredentials=function(B,A){var D=this.getMovieElement();
if(D!==null&&typeof (D.SetCredentials)==="function"){try{return D.SetCredentials(B,A)
}catch(C){this.debug("Could not call SetCredentials")
}}else{this.debug("Could not find Flash element")
}};
CQ.dam.endorsed.SWFUpload.prototype.getFile=function(C){var B=this.getMovieElement();
if(typeof (C)==="number"){if(B!==null&&typeof (B.GetFileByIndex)==="function"){try{return B.GetFileByIndex(C)
}catch(A){this.debug("Could not call GetFileByIndex")
}}else{this.debug("Could not find Flash element")
}}else{if(B!==null&&typeof (B.GetFile)==="function"){try{return B.GetFile(C)
}catch(A){this.debug("Could not call GetFile")
}}else{this.debug("Could not find Flash element")
}}};
CQ.dam.endorsed.SWFUpload.prototype.addFileParam=function(D,A,E){var C=this.getMovieElement();
if(C!==null&&typeof (C.AddFileParam)==="function"){try{return C.AddFileParam(D,A,E)
}catch(B){this.debug("Could not call AddFileParam")
}}else{this.debug("Could not find Flash element")
}};
CQ.dam.endorsed.SWFUpload.prototype.removeFileParam=function(D,A){var C=this.getMovieElement();
if(C!==null&&typeof (C.RemoveFileParam)==="function"){try{return C.RemoveFileParam(D,A)
}catch(B){this.debug("Could not call AddFileParam")
}}else{this.debug("Could not find Flash element")
}};
CQ.dam.endorsed.SWFUpload.prototype.setUploadURL=function(A){var C=this.getMovieElement();
if(C!==null&&typeof (C.SetUploadURL)==="function"){try{this.addSetting("upload_url",A);
C.SetUploadURL(this.getSetting("upload_url"))
}catch(B){this.debug("Could not call SetUploadURL")
}}else{this.debug("Could not find Flash element in setUploadURL")
}};
CQ.dam.endorsed.SWFUpload.prototype.setPostParams=function(C){var B=this.getMovieElement();
if(B!==null&&typeof (B.SetPostParams)==="function"){try{this.addSetting("post_params",C);
B.SetPostParams(this.getSetting("post_params"))
}catch(A){this.debug("Could not call SetPostParams")
}}else{this.debug("Could not find Flash element in SetPostParams")
}};
CQ.dam.endorsed.SWFUpload.prototype.setFileTypes=function(B,D){var C=this.getMovieElement();
if(C!==null&&typeof (C.SetFileTypes)==="function"){try{this.addSetting("file_types",B);
this.addSetting("file_types_description",D);
C.SetFileTypes(this.getSetting("file_types"),this.getSetting("file_types_description"))
}catch(A){this.debug("Could not call SetFileTypes")
}}else{this.debug("Could not find Flash element in SetFileTypes")
}};
CQ.dam.endorsed.SWFUpload.prototype.setFileSizeLimit=function(A){var C=this.getMovieElement();
if(C!==null&&typeof (C.SetFileSizeLimit)==="function"){try{this.addSetting("file_size_limit",A);
C.SetFileSizeLimit(this.getSetting("file_size_limit"))
}catch(B){this.debug("Could not call SetFileSizeLimit")
}}else{this.debug("Could not find Flash element in SetFileSizeLimit")
}};
CQ.dam.endorsed.SWFUpload.prototype.setFileUploadLimit=function(A){var C=this.getMovieElement();
if(C!==null&&typeof (C.SetFileUploadLimit)==="function"){try{this.addSetting("file_upload_limit",A);
C.SetFileUploadLimit(this.getSetting("file_upload_limit"))
}catch(B){this.debug("Could not call SetFileUploadLimit")
}}else{this.debug("Could not find Flash element in SetFileUploadLimit")
}};
CQ.dam.endorsed.SWFUpload.prototype.setFileQueueLimit=function(C){var B=this.getMovieElement();
if(B!==null&&typeof (B.SetFileQueueLimit)==="function"){try{this.addSetting("file_queue_limit",C);
B.SetFileQueueLimit(this.getSetting("file_queue_limit"))
}catch(A){this.debug("Could not call SetFileQueueLimit")
}}else{this.debug("Could not find Flash element in SetFileQueueLimit")
}};
CQ.dam.endorsed.SWFUpload.prototype.setFilePostName=function(B){var C=this.getMovieElement();
if(C!==null&&typeof (C.SetFilePostName)==="function"){try{this.addSetting("file_post_name",B);
C.SetFilePostName(this.getSetting("file_post_name"))
}catch(A){this.debug("Could not call SetFilePostName")
}}else{this.debug("Could not find Flash element in SetFilePostName")
}};
CQ.dam.endorsed.SWFUpload.prototype.setDebugEnabled=function(C){var B=this.getMovieElement();
if(B!==null&&typeof (B.SetDebugEnabled)==="function"){try{this.addSetting("debug_enabled",C);
B.SetDebugEnabled(this.getSetting("debug_enabled"))
}catch(A){this.debug("Could not call SetDebugEnabled")
}}else{this.debug("Could not find Flash element in SetDebugEnabled")
}};
CQ.dam.endorsed.SWFUpload.prototype.flashReady=function(){var B=this.getMovieElement();
if(B===null||typeof (B.StartUpload)!=="function"){this.debug("ExternalInterface methods failed to initialize.");
return 
}var A=this;
if(typeof (A.flashReady_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.flashReady_handler()
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.debug("flashReady_handler event not defined")
}};
CQ.dam.endorsed.SWFUpload.prototype.executeNextEvent=function(){var A=this.eventQueue.shift();
if(typeof (A)==="function"){A()
}};
CQ.dam.endorsed.SWFUpload.prototype.fileDialogStart=function(){var A=this;
if(typeof (A.fileDialogStart_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.fileDialogStart_handler()
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.debug("fileDialogStart event not defined")
}};
CQ.dam.endorsed.SWFUpload.prototype.fileQueued=function(B){var A=this;
if(typeof (A.fileQueued_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.fileQueued_handler(B)
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.debug("fileQueued event not defined")
}};
CQ.dam.endorsed.SWFUpload.prototype.fileQueueError=function(C,B,D){var A=this;
if(typeof (A.fileQueueError_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.fileQueueError_handler(C,B,D)
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.debug("fileQueueError event not defined")
}};
CQ.dam.endorsed.SWFUpload.prototype.fileDialogComplete=function(B){var A=this;
if(typeof (A.fileDialogComplete_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.fileDialogComplete_handler(B)
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.debug("fileDialogComplete event not defined")
}};
CQ.dam.endorsed.SWFUpload.prototype.uploadStart=function(B){var A=this;
if(typeof (A.fileDialogComplete_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.returnUploadStart(A.uploadStart_handler(B))
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.debug("uploadStart event not defined")
}};
CQ.dam.endorsed.SWFUpload.prototype.returnUploadStart=function(A){var C=this.getMovieElement();
if(C!==null&&typeof (C.ReturnUploadStart)==="function"){try{C.ReturnUploadStart(A)
}catch(B){this.debug("Could not call ReturnUploadStart")
}}else{this.debug("Could not find Flash element in returnUploadStart")
}};
CQ.dam.endorsed.SWFUpload.prototype.uploadProgress=function(B,D,C){var A=this;
if(typeof (A.uploadProgress_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.uploadProgress_handler(B,D,C)
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.debug("uploadProgress event not defined")
}};
CQ.dam.endorsed.SWFUpload.prototype.uploadError=function(C,B,D){var A=this;
if(typeof (this.uploadError_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.uploadError_handler(C,B,D)
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.debug("uploadError event not defined")
}};
CQ.dam.endorsed.SWFUpload.prototype.uploadSuccess=function(C,B){var A=this;
if(typeof (A.uploadSuccess_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.uploadSuccess_handler(C,B)
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.debug("uploadSuccess event not defined")
}};
CQ.dam.endorsed.SWFUpload.prototype.uploadComplete=function(B){var A=this;
if(typeof (A.uploadComplete_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.uploadComplete_handler(B)
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.debug("uploadComplete event not defined")
}};
CQ.dam.endorsed.SWFUpload.prototype.debug=function(B){var A=this;
if(typeof (A.debug_handler)==="function"){this.eventQueue[this.eventQueue.length]=function(){A.debug_handler(B)
};
setTimeout(function(){A.executeNextEvent()
},0)
}else{this.eventQueue[this.eventQueue.length]=function(){A.debugMessage(B)
};
setTimeout(function(){A.executeNextEvent()
},0)
}};
CQ.dam.endorsed.SWFUpload.flashReady=function(){try{this.debug("Flash called back and is ready.");
if(typeof (this.swfUploadLoaded_handler)==="function"){this.swfUploadLoaded_handler()
}}catch(A){this.debug(A)
}};
CQ.dam.endorsed.SWFUpload.swfUploadLoaded=function(){};
CQ.dam.endorsed.SWFUpload.fileDialogStart=function(){};
CQ.dam.endorsed.SWFUpload.fileQueued=function(A){};
CQ.dam.endorsed.SWFUpload.fileQueueError=function(C,A,D){try{switch(A){case CQ.dam.endorsed.SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:this.debug("Error Code: File too big, File name: "+C.name+", File size: "+C.size+", Message: "+D);
break;
case CQ.dam.endorsed.SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:this.debug("Error Code: Zero Byte File, File name: "+C.name+", File size: "+C.size+", Message: "+D);
break;
case CQ.dam.endorsed.SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:this.debug("Error Code: Upload limit reached, File name: "+C.name+", File size: "+C.size+", Message: "+D);
break;
case CQ.dam.endorsed.SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:this.debug("Error Code: File extension is not allowed, Message: "+D);
break;
default:this.debug("Error Code: Unhandled error occured. Errorcode: "+A)
}}catch(B){this.debug(B)
}};
CQ.dam.endorsed.SWFUpload.fileDialogComplete=function(A){};
CQ.dam.endorsed.SWFUpload.uploadStart=function(A){return true
};
CQ.dam.endorsed.SWFUpload.uploadProgress=function(A,C,B){this.debug("File Progress: "+A.id+", Bytes: "+C+". Total: "+B)
};
CQ.dam.endorsed.SWFUpload.uploadSuccess=function(B,A){};
CQ.dam.endorsed.SWFUpload.uploadComplete=function(A){};
CQ.dam.endorsed.SWFUpload.debug=function(A){if(this.getSetting("debug_enabled")){this.debugMessage(A)
}};
CQ.dam.endorsed.SWFUpload.uploadError=function(C,A,D){try{switch(errcode){case CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:this.debug("Error Code: File ID specified for upload was not found, Message: "+msg);
break;
case CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR.HTTP_ERROR:this.debug("Error Code: HTTP Error, File name: "+C.name+", Message: "+msg);
break;
case CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:this.debug("Error Code: No backend file, File name: "+C.name+", Message: "+msg);
break;
case CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR.IO_ERROR:this.debug("Error Code: IO Error, File name: "+C.name+", Message: "+msg);
break;
case CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:this.debug("Error Code: Security Error, File name: "+C.name+", Message: "+msg);
break;
case CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:this.debug("Error Code: Upload limit reached, File name: "+C.name+", File size: "+C.size+", Message: "+msg);
break;
case CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:this.debug("Error Code: Upload Initialization exception, File name: "+C.name+", File size: "+C.size+", Message: "+msg);
break;
case CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:this.debug("Error Code: uploadStart callback returned false, File name: "+C.name+", File size: "+C.size+", Message: "+msg);
break;
case CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:this.debug("Error Code: The file upload was cancelled, File name: "+C.name+", File size: "+C.size+", Message: "+msg);
break;
case CQ.dam.endorsed.SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:this.debug("Error Code: The file upload was stopped, File name: "+C.name+", File size: "+C.size+", Message: "+msg);
break;
default:this.debug("Error Code: Unhandled error occured. Errorcode: "+errcode)
}}catch(B){this.debug(B)
}};
CQ.dam.endorsed.SWFUpload.prototype.debugMessage=function(C){var D,B;
if(typeof (C)==="object"&&typeof (C.name)==="string"&&typeof (C.message)==="string"){D="";
B=[];
for(var A in C){B.push(A+": "+C[A])
}D=B.join("\n");
B=D.split("\n");
D="EXCEPTION: "+B.join("\nEXCEPTION: ");
CQ.dam.endorsed.SWFUpload.Console.writeLine(D)
}else{CQ.dam.endorsed.SWFUpload.Console.writeLine(C)
}};
CQ.dam.endorsed.SWFUpload.Console={};
CQ.dam.endorsed.SWFUpload.Console.writeLine=function(D){var B,A;
try{B=document.getElementById("CQ_dam_endorsed_SWFUpload_Console");
if(!B){A=document.createElement("form");
document.getElementsByTagName("body")[0].appendChild(A);
B=document.createElement("textarea");
B.id="CQ_dam_endorsed_SWFUpload_Console";
B.style.fontFamily="monospace";
B.setAttribute("wrap","off");
B.wrap="off";
B.style.overflow="auto";
B.style.width="700px";
B.style.height="350px";
B.style.margin="5px";
A.appendChild(B)
}B.value+=D+"\n";
B.scrollTop=B.scrollHeight-B.clientHeight
}catch(C){}};
CQ.dam.SwfUploadPanel=CQ.Ext.extend(CQ.Ext.grid.EditorGridPanel,{strings:{text_add:CQ.I18n.getMessage("Add File(s)"),text_upload:CQ.I18n.getMessage("Upload File(s)"),text_cancel:CQ.I18n.getMessage("Cancel Upload"),text_clear:CQ.I18n.getMessage("Clear Queue"),text_progressbar:CQ.I18n.getMessage("Tip: Click on a filename to change it"),text_remove:CQ.I18n.getMessage("Remove File"),text_remove_sure:CQ.I18n.getMessage("Are you sure you want to remove this file from the queue?"),text_error:CQ.I18n.getMessage("Error"),text_uploading:CQ.I18n.getMessage("Uploading file: {0} ({1} of {2})"),header_filename:CQ.I18n.getMessage("Filename"),header_size:CQ.I18n.getMessage("Size"),header_status:CQ.I18n.getMessage("Status"),status:{0:CQ.I18n.getMessage("Queued"),1:CQ.I18n.getMessage("Uploading..."),2:CQ.I18n.getMessage("Completed"),3:CQ.I18n.getMessage("Error"),4:CQ.I18n.getMessage("Canceled")},error_queue_exceeded:CQ.I18n.getMessage("The selected file(s) exceed(s) the maximum number of {0} queued files."),error_queue_slots_0:CQ.I18n.getMessage("There is no slot left"),error_queue_slots_1:CQ.I18n.getMessage("There is only one slot left"),error_queue_slots_2:CQ.I18n.getMessage("There are only {0} slots left"),error_size_exceeded:CQ.I18n.getMessage("The size of the selected file(s) exceeds the allowed limit of {0}."),error_zero_byte_file:CQ.I18n.getMessage("Zero byte file selected."),error_invalid_filetype:CQ.I18n.getMessage("Invalid filetype selected."),error_file_not_found:CQ.I18n.getMessage("File not found 404."),error_security_error:CQ.I18n.getMessage("Security Error. Not allowed to post to different URL.")},single_select:false,confirm_delete:true,file_types:"*.*",file_types_description:"All Files",file_size_limit:"1048576",file_upload_limit:"0",file_queue_limit:"0",file_post_name:"Filedata",flash_url:"swfupload_f9.swf",debug:false,autoExpandColumn:"name",enableColumnResize:false,enableColumnMove:false,upload_cancelled:false,initComponent:function(){SWFUpload=CQ.dam.endorsed.SWFUpload;
this.addEvents("swfUploadLoaded","fileQueued","fileUploadError","fileUploadSuccess","fileUploadComplete","allUploadsComplete","removeFiles","removeAllFiles");
this.rec=CQ.Ext.data.Record.create([{name:"name"},{name:"size"},{name:"id"},{name:"type"},{name:"creationdate",type:"date",dateFormat:"m/d/Y"},{name:"status"}]);
this.store=new CQ.Ext.data.Store({reader:new CQ.Ext.data.JsonReader({id:"id"},this.rec)});
this.clicksToEdit=1;
this.columns=[{id:"name",header:this.strings.header_filename,dataIndex:"name",editor:new CQ.Ext.form.TextField({allowBlank:false,vtype:"name"})},{id:"size",header:this.strings.header_size,width:80,dataIndex:"size",renderer:this.formatBytes},{id:"status",header:this.strings.header_status,width:80,dataIndex:"status",renderer:this.formatStatus.createDelegate(this)}];
this.sm=new CQ.Ext.grid.RowSelectionModel({singleSelect:this.single_select});
this.suo=new SWFUpload({upload_url:this.upload_url,post_params:this.post_params,file_post_name:this.file_post_name,file_size_limit:this.file_size_limit,file_queue_limit:this.file_queue_limit,file_types:this.file_types,file_types_description:this.file_types_description,file_upload_limit:this.file_upload_limit,flash_url:this.flash_url,swfupload_loaded_handler:this.swfUploadLoaded.createDelegate(this),file_dialog_start_handler:this.fileDialogStart.createDelegate(this),file_queued_handler:this.fileQueue.createDelegate(this),file_queue_error_handler:this.fileQueueError.createDelegate(this),file_dialog_complete_handler:this.fileDialogComplete.createDelegate(this),upload_progress_handler:this.uploadProgress.createDelegate(this),upload_error_handler:this.uploadError.createDelegate(this),upload_success_handler:this.uploadSuccess.createDelegate(this),upload_complete_handler:this.uploadComplete.createDelegate(this),debug:this.debug,debug_handler:this.debugHandler});
this.progress_bar=new CQ.Ext.ProgressBar({text:this.strings.text_progressbar});
this.tbar=[{text:this.strings.text_add,iconCls:"SwfUploadPanel_iconAdd",handler:function(){if(this.single_select){this.suo.selectFile()
}else{this.suo.selectFiles()
}},scope:this},"->",{text:this.strings.text_cancel,id:"cancel",iconCls:"SwfUploadPanel_iconCancel",handler:this.stopUpload,scope:this,hidden:true},{text:this.strings.text_upload,iconCls:"SwfUploadPanel_iconUpload",handler:this.startUpload,scope:this,hidden:true},{text:this.strings.text_clear,iconCls:"SwfUploadPanel_iconClear",handler:this.removeAllFiles,scope:this,hidden:true}];
this.bbar=[this.progress_bar];
this.addListener({keypress:{fn:function(A){if(this.confirm_delete){if(A.getKey()==A.DELETE){CQ.Ext.MessageBox.confirm(this.strings.text_remove,this.strings.text_remove_sure,function(B){if(B=="yes"){this.removeFiles()
}},this)
}}else{this.removeFiles(this)
}},scope:this},contextmenu:function(A){A.stopEvent()
},render:{fn:function(){this.resizeProgressBar();
this.cancelBtn=this.getTopToolbar().items.items[2];
this.uploadBtn=this.getTopToolbar().items.items[3];
this.clearBtn=this.getTopToolbar().items.items[4];
this.on("resize",this.resizeProgressBar,this)
},scope:this}});
CQ.dam.SwfUploadPanel.superclass.initComponent.call(this)
},resizeProgressBar:function(){this.progress_bar.setWidth(this.getBottomToolbar().el.getWidth()-5);
CQ.Ext.fly(this.progress_bar.el.dom.firstChild.firstChild).applyStyles("height: 16px")
},debugHandler:function(A){},logState:function(A){},formatStatus:function(A){return this.strings.status[A]
},formatBytes:function(C){if(!C){C=0
}var E=["B","KB","MB","GB"];
var A=C;
var C=parseInt(C,10);
A=C+" "+E[0];
var B=0;
while(C/1024>1){C=C/1024;
B++
}A=Math.round(C)+" "+E[B];
return A;
if(isNaN(bytes)){return("")
}var D,F;
if(bytes<999){D="B";
F=(!bytes&&this.progressRequestCount>=1)?"~":bytes
}else{if(bytes<999999){D="kB";
F=Math.round(bytes/1000)
}else{if(bytes<999999999){D="MB";
F=Math.round(bytes/100000)/10
}else{if(bytes<999999999999){D="GB";
F=Math.round(bytes/100000000)/10
}else{D="TB";
F=Math.round(bytes/100000000000)/10
}}}}return(F+" "+D)
},swfUploadLoaded:function(){this.logState("SWFUPLOAD LOADED");
this.fireEvent("swfUploadLoaded",this)
},fileDialogStart:function(){this.logState("FILE DIALOG START")
},fileQueue:function(A){this.logState("FILE QUEUE");
A.status=0;
r=new this.rec(A);
r.id=A.id;
r.data.name=CQ.Ext.form.VTypes.makeName(r.data.name);
this.store.add(r);
this.fireEvent("fileQueued",this,A)
},fileQueueError:function(A,D,C){this.logState("FILE QUEUE ERROR");
switch(D){case -100:var B;
switch(C){case"0":B=this.strings.error_queue_slots_0;
break;
case"1":B=this.strings.error_queue_slots_1;
break;
default:B=String.format(this.strings.error_queue_slots_2,C)
}CQ.Ext.MessageBox.alert(this.strings.text_error,String.format(this.strings.error_queue_exceeded+" "+B,this.file_queue_limit));
break;
case -110:CQ.Ext.MessageBox.alert(this.strings.text_error,String.format(this.strings.error_size_exceeded,this.formatBytes(this.file_size_limit*1024)));
break;
case -120:CQ.Ext.MessageBox.alert(this.strings.text_error,this.strings.error_zero_byte_file);
break;
case -130:CQ.Ext.MessageBox.alert(this.strings.text_error,this.strings.error_invalid_filetype);
break
}},fileDialogComplete:function(A){this.logState("FILE DIALOG COMPLETE");
if(A>0){this.uploadBtn.show();
this.clearBtn.show()
}},uploadStart:function(A){this.logState("UPLOAD START")
},uploadProgress:function(A,C,B){this.logState("UPLOAD PROGRESS");
this.store.getById(A.id).set("status",1);
this.store.getById(A.id).commit();
this.progress_bar.updateProgress(C/B,String.format(this.strings.text_uploading,A.name,this.formatBytes(C),this.formatBytes(B)))
},uploadError:function(B,A,C){this.logState("UPLOAD ERROR");
switch(A){case -200:CQ.Ext.MessageBox.alert(this.strings.text_error,this.strings.error_file_not_found);
break;
case -230:CQ.Ext.MessageBox.alert(this.strings.text_error,this.strings.error_security_error);
break;
case -290:this.store.getById(B.id).set("status",4);
this.store.getById(B.id).commit();
break
}this.fireEvent("fileUploadError",this,B,A,C)
},uploadSuccess:function(F,C){this.logState("UPLOAD SUCCESS");
this.logState("Copying file from :"+this.upload_url+this.file_post_name.substring(1)+" to :"+this.post_params.damPath+"/"+F.name);
var E=this.getStore().getAt(F.index).data.name;
if(!E){E=F.name
}this.checkFolder(this.post_params.damPath);
var D=this.upload_url+this.file_post_name.substring(1);
D=CQ.HTTP.addParameter(D,CQ.Sling.OPERATION,"move");
D=CQ.HTTP.addParameter(D,"_charset_","utf-8");
D=CQ.HTTP.addParameter(D,":dest",this.post_params.damPath+"/"+E);
var B=CQ.HTTP.post(D);
var A=CQ.utils.HTTP.buildPostResponseFromHTML(C);
this.logState("isOk(cResponse):"+CQ.utils.HTTP.isOk(B)+"; isOk(upResponse):"+CQ.utils.HTTP.isOk(A));
var G={};
if(CQ.utils.HTTP.isOk(B)&&CQ.utils.HTTP.isOk(A)){this.store.getById(F.id).set("status",2)
}else{this.store.getById(F.id).set("status",3);
this.store.getById(F.id).commit();
if(G.msg){CQ.Ext.MessageBox.alert(this.strings.text_error,G.msg)
}}this.fireEvent("fileUploadSuccess",this,F,G)
},uploadComplete:function(A){this.logState("UPLOAD COMPLETE");
this.progress_bar.reset();
this.progress_bar.updateText(this.strings.text_progressbar);
if(this.suo.getStats().files_queued&&!this.upload_cancelled){this.suo.startUpload()
}else{this.fireEvent("fileUploadComplete",this,A);
this.allUploadsComplete()
}},allUploadsComplete:function(){this.cancelBtn.hide();
this.fireEvent("allUploadsComplete",this)
},addPostParam:function(A,B){this.suo.settings.post_params[A]=B;
this.suo.setPostParams(this.suo.settings.post_params)
},startUpload:function(a,b,noCheck){if(!noCheck){var node=CQ.HTTP.eval(this.path+".1.json");
var conflictNames=[];
this.getStore().each(function(){if(this.data.status===0){if(node[this.data.name]){conflictNames.push(this.data.name)
}}});
if(conflictNames.length>0){var path=this.damPath;
CQ.Ext.Msg.confirm(CQ.I18n.getMessage("Name Conflict"),CQ.I18n.getMessage("Older assets of the same name already exist in this location.")+"<br>"+CQ.I18n.getMessage("Do you want to replace the assets?")+"<br><br>"+conflictNames.join("<br>"),function(btnId){if(btnId=="yes"){for(var i=0;
i<conflictNames.length;
i++){var n=conflictNames[i];
var contentPath=path.replace("/var/dam","/content/dam");
CQ.HTTP.post(path+"/"+n,null,{":operation":"delete"});
CQ.HTTP.post(contentPath+"/"+n+"/jcr:content",null,{":operation":"delete"})
}this.startUpload("x","x",true)
}},this);
return 
}}this.logState("START UPLOAD");
this.cancelBtn.show();
this.uploadBtn.hide();
this.clearBtn.hide();
this.upload_cancelled=false;
this.suo.startUpload()
},stopUpload:function(A){this.logState("STOP UPLOAD");
this.suo.stopUpload();
this.upload_cancelled=true;
this.getStore().each(function(){if(this.data.status==1){this.set("status",0);
this.commit()
}});
this.cancelBtn.hide();
if(this.suo.getStats().files_queued>0){this.uploadBtn.show();
this.clearBtn.show()
}this.progress_bar.reset();
this.progress_bar.updateText(this.strings.text_progressbar)
},removeFiles:function(){this.logState("REMOVE FILES");
var B=this.getSelections();
for(var A=0;
A<B.length;
A++){if(B[A].data.status!=1){this.suo.cancelUpload(B[A].id);
this.store.remove(B[A])
}}if(this.suo.getStats().files_queued==0){this.uploadBtn.hide();
this.clearBtn.hide()
}this.fireEvent("removeFiles",this)
},removeAllFiles:function(){this.logState("REMOVE ALL");
var A=this.suo.getStats().files_queued;
while(A>0){this.suo.cancelUpload();
A=this.suo.getStats().files_queued
}this.store.removeAll();
this.cancelBtn.hide();
this.uploadBtn.hide();
this.clearBtn.hide();
this.fireEvent("removeAllFiles",this)
},getParentPath:function(A){return A.substring(0,A.lastIndexOf("/"))
},checkFolder:function(B){var A=CQ.HTTP.get(B).status;
if(A=="404"){var C=this.getParentPath(B);
this.checkFolder(C);
var D={"./jcr:primaryType":"nt:folder"};
CQ.HTTP.post(B,undefined,D)
}}});
CQ.dam.AssetEditor=CQ.Ext.extend(CQ.Ext.Panel,{tabs:[],renditionsInitialTimeout:20000,renditionsTimeout:10000,denyRenditionModifications:false,denyThumbnailUpload:false,scene7:false,loadContent:function(C){var A;
if(!C){C=this.pathEncoded+this.contentPath
}if(typeof (C)=="string"){var B=CQ.HTTP.externalize(C);
A=new CQ.data.SlingStore({url:B+CQ.Sling.SELECTOR_INFINITY+CQ.HTTP.EXTENSION_JSON})
}else{if(C instanceof CQ.Ext.data.Store){A=C
}}if(A){A.load({callback:this.processRecords,scope:this})
}else{this.hideLoadMask()
}},processRecords:function(E,D,H){var G;
if(H){G=E[0]
}else{CQ.Log.warn("CQ.dam.AssetEditor#processRecords: retrieval of records unsuccessful");
G=new CQ.data.SlingRecord();
G.data={}
}CQ.Log.debug("CQ.dam.AssetEditor#processRecords: processing records for fields");
var A=CQ.Util.findFormFields(this.formPanel);
for(var B in A){for(var C=0;
C<A[B].length;
C++){try{if(A[B][C].processPath){CQ.Log.debug("CQ.dam.AssetEditor#processRecords: calling processPath of field '{0}'",[B]);
A[B][C].processPath(this.path)
}if(!A[B][C].initialConfig.ignoreData){CQ.Log.debug("CQ.dam.AssetEditor#processRecords: calling processRecord of field '{0}'",[B]);
A[B][C].processRecord(G,this.path)
}}catch(F){CQ.Log.debug("CQ.dam.AssetEditor#processRecords: {0}",F.message)
}}}this.hideLoadMask();
this.fireEvent("loadcontent",this,E,D,H)
},addHidden:function(C){for(var A in C){var B=CQ.Util.build({xtype:"hidden",name:A,value:C[A],ignoreData:true});
this.formPanel.add(B)
}this.formPanel.doLayout()
},ok:function(){var B=this;
var A={success:function(){window.setTimeout(function(){B.refreshGrid();
delete B.info;
B.refreshInfo();
B.loadContent()
},600)
},failure:function(D,E){B.hideLoadMask();
B.notify(E.result?E.result.Message:"")
}};
if(this.form.isValid()){if(this.fireEvent("beforesubmit",this)===false){return false
}this.showSaveMask();
this.form.items.each(function(D){if(D.emptyText&&D.el.dom.value==D.emptyText){D.setRawValue("")
}});
var C=new CQ.form.SlingSubmitAction(this.form,A);
this.form.doAction(C)
}else{CQ.Ext.Msg.show({title:CQ.I18n.getMessage("Validation Failed"),msg:CQ.I18n.getMessage("Verify the values of the marked fields."),buttons:CQ.Ext.Msg.OK,icon:CQ.Ext.Msg.ERROR})
}},getButtonsConfig:function(buttons){var b=[];
if(typeof buttons=="string"){buttons=[buttons]
}for(var i=0;
i<buttons.length;
i++){if(typeof buttons[i]=="string"){if(buttons[i]==CQ.dam.AssetEditor.SAVE){var saveButton=new CQ.Ext.Button({text:CQ.I18n.getMessage("Save"),disabled:this.readOnly,cls:"cq-btn-save",scope:this,minWidth:CQ.dam.themes.AssetEditor.MIN_BUTTON_WIDTH,handler:function(button){this.ok()
}});
b.push(saveButton)
}else{if(buttons[i]==CQ.dam.AssetEditor.RESET){var resetButton=new CQ.Ext.Button({text:CQ.I18n.getMessage("Reset"),disabled:this.readOnly,cls:"cq-btn-reset",scope:this,minWidth:CQ.dam.themes.AssetEditor.MIN_BUTTON_WIDTH,handler:function(button){this.loadMask=new CQ.Ext.LoadMask(this.formPanel.body);
this.loadMask.show();
this.loadContent()
}});
b.push(resetButton)
}else{if(buttons[i]==CQ.dam.AssetEditor.REFRESH_INFO){var refreshButton=new CQ.Ext.Button({tooltip:CQ.I18n.getMessage("Refresh"),tooltipType:"title",iconCls:"cq-siteadmin-refresh",scope:this,handler:function(button){var now=new Date().getTime();
var m=new CQ.Ext.LoadMask(this.infoPanel.body);
m.show();
delete this.info;
this.refreshInfo();
this.refreshThumbnail();
window.setTimeout(function(){m.hide()
},this.getTimeoutTime(now))
}});
b.push(refreshButton)
}else{if(buttons[i]==CQ.dam.AssetEditor.EDIT_IMAGE){if(this.isImage()){var editButton=new CQ.Ext.Button({text:CQ.I18n.getMessage("Edit..."),disabled:this.readOnly,cls:"cq-btn-edit",scope:this,minWidth:CQ.dam.themes.AssetEditor.MIN_BUTTON_WIDTH,handler:function(){var config=CQ.WCM.getDialogConfig({name:"./original",xtype:"html5smartimage",cropParameter:"./crop",rotateParameter:"./rotate",disableFlush:true});
var ae=this;
config=CQ.Util.applyDefaults(config,{title:CQ.I18n.getMessage("Image Editor"),y:50,width:480,formUrl:this.pathEncoded+".assetimage.html",responseScope:this,success:function(){this.refreshOriginal()
},failure:function(form,action){this.notifyFromAction(action)
}});
var dialog=CQ.Util.build(config,true);
dialog.on("beforesubmit",function(){ae.showSaveMask()
});
dialog.loadContent(this.pathEncoded+"/jcr:content/renditions");
dialog.show()
}});
b.push(editButton)
}}else{b.push(buttons[i])
}}}}}else{if(buttons[i]){if(typeof buttons[i].handler=="string"){buttons[i].handler=eval(buttons[i].handler)
}b.push(CQ.Util.applyDefaults(buttons[i],{minWidth:CQ.dam.themes.AssetEditor.MIN_BUTTON_WIDTH,scope:this}))
}}}return b
},getThumbnailHtml:function(F,D){var H=D?D:this;
var E=this.getInfo("renditions");
var B;
try{B=E["cq5dam.thumbnail."+H.thumbnailHeight+"."+H.thumbnailWidth+".png"].ck
}catch(G){B=new Date().getTime()
}var C=CQ.HTTP.externalize(this.pathEncoded)+"."+H.thumbnailServlet+"."+H.thumbnailHeight+"."+H.thumbnailWidth+"."+B+"."+H.thumbnailExtension;
var A=CQ.HTTP.externalize(CQ.shared.XSS.getXSSValue(CQ.HTTP.encodePath(H.path)));
return'<a href="'+A+'" target="_blank" title="'+A+'"><img src="'+CQ.shared.XSS.getXSSValue(C)+'"></a>'
},isImage:function(A){A=A?A.toLowerCase():this.fileName.toLowerCase();
var D=false;
var C=["jpg","gif","png","jpeg"];
for(var B=0;
B<C.length;
B++){if(A.lastIndexOf("."+C[B])==A.length-C[B].length-1){D=true;
break
}}return D
},getInfo:function(name,force){if(force||!this.info){var url=this.pathEncoded+".4.json";
url=CQ.HTTP.noCaching(url);
var info=CQ.HTTP.eval(url);
var meta=info["jcr:content"]["metadata"];
var mod="";
try{mod=new Date(info["jcr:content"]["jcr:lastModified"]);
mod=CQ.wcm.SiteAdmin.formatDate(mod)
}catch(e){}var dim="";
if(meta["tiff:ImageWidth"]&&meta["tiff:ImageLength"]){dim=meta["tiff:ImageWidth"]+" &times; "+meta["tiff:ImageLength"]
}var renditions=info["jcr:content"]["renditions"];
for(var rName in renditions){try{var m=renditions[rName]["jcr:content"]["jcr:lastModified"];
renditions[rName].ck=new Date(m).getTime()
}catch(e){renditions[rName].ck=new Date().getTime()
}}this.info={title:meta["dc:title"]?meta["dc:title"]:"",lastModified:mod,dimensions:dim,metadata:meta,subassets:info.subassets,renditions:renditions}
}return this.info[name]
},getTabsConfig:function(I){var J=[];
if(typeof I=="string"){I=[I]
}for(var H=0;
H<I.length;
H++){if(typeof I[H]=="string"){if(I[H]==CQ.dam.AssetEditor.SUBASSETS){var A=new CQ.Ext.Panel({autoScroll:true,title:CQ.I18n.getMessage("Sub Assets"),cls:"cq-asseteditor-subassets",footer:true,bbar:[]});
var E=this.getInfo("subassets");
if(!E){continue
}var F=[];
for(var C in E){if(C.indexOf("jcr:")<0){E[C].name=C;
F.push(E[C])
}}F.sort(function(L,K){if(L.name.length==K.name.length){return L.name<K.name?-1:1
}else{return L.name.length-K.name.length
}});
for(var G=0;
G<F.length;
G++){var D=CQ.HTTP.externalize(this.path+"/subassets/"+F[G].name);
A.add({xtype:"static",html:'<div class="cq-asseteditor-substab-item" onclick="CQ.wcm.DamAdmin.openAsset(\''+D+'\');"><div class="cq-asseteditor-substab-thumbnail"><img src="'+CQ.HTTP.encodePath(D)+'.thumb.100.140.png"><br></div>&ndash; '+(G+1)+" &ndash;</div>"})
}J.push(A)
}else{if(I[H]==CQ.dam.AssetEditor.RENDITIONS){this.renditionsStore=new CQ.Ext.data.SimpleStore({autoLoad:false,idProperty:"name",fields:["name","path","imgUrl"]});
this.renditionsDataView=new CQ.Ext.DataView({multiSelect:false,singleSelect:true,emptyText:CQ.I18n.getMessage("No Renditions Available"),store:this.renditionsStore,overClass:"x-view-over",itemSelector:".cq-asseteditor-renditions-item",assetEditor:this,tpl:new CQ.Ext.XTemplate('<tpl for="."><div class="cq-asseteditor-renditions-item"><div class="cq-asseteditor-renditionstab-thumbnail" style="background-image:url({imgUrl});"></div>{name}</div></tpl>'),listeners:{dblclick:function(L,K){CQ.shared.Util.open(L.getStore().getAt(K).data.path)
},selectionchange:function(){if(!this.readOnly&&this.assetEditor.deleteRenditionButton){var K=this.getSelectedRecords();
if(K.length>0){this.assetEditor.deleteRenditionButton.enable()
}else{this.assetEditor.deleteRenditionButton.disable()
}}}}});
this.renditionsPanel=new CQ.Ext.Panel({autoScroll:true,title:CQ.I18n.getMessage("Renditions"),cls:"cq-asseteditor-renditions",bbar:[{xtype:"button",tooltip:CQ.I18n.getMessage("Refresh Renditions"),tooltipType:"title",iconCls:"cq-siteadmin-refresh",scope:this,handler:function(){var L=new Date().getTime();
var K=new CQ.Ext.LoadMask(this.renditionsPanel.body);
K.show();
delete this.info;
this.refreshRenditions();
window.setTimeout(function(){K.hide()
},this.getTimeoutTime(L))
}},"->"],items:this.renditionsDataView});
if(!this.denyThumbnailUpload){this.renditionsPanel.getBottomToolbar().add({xtype:"button",text:CQ.I18n.getMessage("Thumbnail..."),disabled:this.readOnly,tooltip:CQ.I18n.getMessage("Overwrite the existing thumbnails"),tooltipType:"title",scope:this,handler:function(){var K=CQ.WCM.getDialogConfig({xtype:"panel",items:{name:"image",xtype:"fileuploadfield",fieldLabel:CQ.I18n.getMessage("Image File"),fieldDescription:CQ.I18n.getMessage("Upload an image file to create new thumbnails. Existing thumbnails will be overwritten.")}});
var M=this;
K=CQ.Util.applyDefaults(K,{title:CQ.I18n.getMessage("Overwrite Thumbnails"),formUrl:this.pathEncoded+".assetthumbnails.html",success:function(){M.refresh();
M.hideLoadMask()
},failure:function(N,O){M.notifyFromAction(O)
},height:200,fileUpload:true,params:{dimensions:"140,100/48,48/319,319"}});
var L=CQ.Util.build(K,true);
L.on("beforesubmit",function(){M.showSaveMask()
});
L.show()
}})
}if(!this.denyRenditionModifications){this.renditionsPanel.getBottomToolbar().add({xtype:"button",text:CQ.I18n.getMessage("Upload..."),disabled:this.readOnly,tooltip:CQ.I18n.getMessage("Add or overwrite a rendition"),tooltipType:"title",scope:this,handler:function(){var N=this.renditionsDataView.getSelectedRecords();
var K=CQ.WCM.getDialogConfig({xtype:"panel",items:[{name:"./*",xtype:"fileuploadfield",fieldLabel:CQ.I18n.getMessage("File")},{name:"name",xtype:"textfield",value:N[0]?N[0].get("name"):"",fieldLabel:CQ.I18n.getMessage("Rendition Name"),fieldDescription:CQ.I18n.getMessage("Leave emtpy to use the file name.")}]});
var M=this;
K=CQ.Util.applyDefaults(K,{title:CQ.I18n.getMessage("Add Or Overwrite a Rendition"),formUrl:this.pathEncoded+"/jcr:content/renditions",success:function(P){var O=P.findField("name").getValue();
if(O=="original"){M.refreshOriginal()
}else{if(O=="cq5dam.thumbnail."+M.thumbnailHeight+"."+M.thumbnailWidth+".png"){delete M.info;
M.refreshThumbnail();
M.refreshRenditions();
M.hideLoadMask()
}else{delete M.info;
M.refreshRenditions();
M.hideLoadMask()
}}if(O=="cq5dam.thumbnail.48.48.png"){M.refreshGrid()
}},failure:function(O,P){M.notifyFromAction(P)
},height:200,fileUpload:true});
var L=CQ.Util.build(K,true);
L.on("beforesubmit",function(){M.showSaveMask();
var O=L.getField("name");
var P=O.getValue();
if(P=="original"){CQ.HTTP.post(M.pathEncoded+".version.html",null,{cmd:"createVersion",label:"Before overwriting original, "+new Date().format("d-M-Y H.i")})
}if(P){L.getField("./*").setName("./"+P)
}O.disable()
});
L.show()
}},this.deleteRenditionButton=new CQ.Ext.Button({text:CQ.I18n.getMessage("Delete"),disabled:true,tooltip:CQ.I18n.getMessage("Delete the selected rendition"),tooltipType:"title",scope:this,handler:function(){var K=this.renditionsDataView.getSelectedRecords();
if(K[0]&&K[0].get("name")=="original"){CQ.Ext.Msg.alert("",CQ.I18n.getMessage("It is not possible to delete the selected rendition."));
return 
}CQ.Ext.Msg.show({title:CQ.I18n.getMessage("Delete Rendition"),msg:CQ.I18n.getMessage("Are you sure to delete the selected rendition?"),buttons:CQ.Ext.Msg.YESNO,icon:CQ.Ext.MessageBox.QUESTION,fn:function(N){if(N=="yes"){var L=new CQ.Ext.LoadMask(this.renditionsPanel.body);
window.setTimeout(function(){L.show()
},1);
var M=this.renditionsDataView.getSelectedRecords();
CQ.HTTP.post(M[0].get("path"),null,{_charset_:"utf-8",":operation":"delete"});
delete this.info;
this.refreshRenditions();
window.setTimeout(function(){L.hide()
},100)
}},scope:this})
}}))
}this.refreshRenditions();
J.push(this.renditionsPanel)
}else{if(I[H]==CQ.dam.AssetEditor.VERSIONS){this.versionsStore=new CQ.Ext.data.Store({isLoaded:false,proxy:new CQ.Ext.data.HttpProxy({url:this.pathEncoded+".version.json",method:"GET"}),reader:new CQ.Ext.data.JsonReader({totalProperty:"results",root:"versions",id:"id"},["version","id","label","comment","name","title","created","deleted","renditionsPath"]),baseParams:{_charset_:"utf-8"}});
this.versionsDataView=new CQ.Ext.DataView({multiSelect:false,singleSelect:true,emptyText:CQ.I18n.getMessage("No Versions Available"),store:this.versionsStore,overClass:"x-view-over",itemSelector:".cq-asseteditor-versions-item",assetEditor:this,tpl:new CQ.Ext.XTemplate('<tpl for=".">','<div class="cq-asseteditor-versions-item">',"<table><tr>",'<tpl if="renditionsPath">','<td><img class="cq-asseteditor-versions-thumbnail" src="{thumbnail}"></td>',"</tpl>","<td>",'<span class="cq-asseteditor-versions-label">{label}</span><br>','{[CQ.I18n.getMessage("Version")]} {version}<br>',"{created}<br>","</td></tr></table>",'<tpl if="comment">','<div class="cq-asseteditor-versions-comment">{comment}</div>',"</tpl>","</div>","</tpl>"),prepareData:function(K){K.created=CQ.wcm.SiteAdmin.formatDate(K.created);
K.thumbnail=CQ.HTTP.externalize(K.renditionsPath)+"/cq5dam.thumbnail.48.48.png";
return K
},scope:this,listeners:{selectionchange:function(){if(!this.assetEditor.readOnly){this.assetEditor.restoreVersionButton.enable()
}}}});
this.restoreVersionButton=new CQ.Ext.Button({disabled:true,tooltip:CQ.I18n.getMessage("Restore the selected version"),tooltipType:"title",text:CQ.I18n.getMessage("Restore"),scope:this,handler:function(){var M;
try{M=this.versionsDataView.getSelectedRecords()[0].data.id
}catch(L){return 
}var K=this;
CQ.Ext.MessageBox.confirm(CQ.I18n.getMessage("Restore Version"),CQ.I18n.getMessage("Are you sure to restore the selected version?"),function(N,O){if(N=="yes"){K.showLoadMask(CQ.I18n.getMessage("Restoring version..."));
CQ.HTTP.post(K.pathEncoded+".version.html",function(Q,P){if(P){K.loadContent();
K.refresh()
}K.hideLoadMask()
},{cmd:"restoreVersion",id:M})
}})
}});
this.versionsPanel=new CQ.Ext.Panel({title:CQ.I18n.getMessage("Versions"),cls:"cq-asseteditor-versions",autoScroll:true,items:[this.versionsDataView],bbar:[{xtype:"button",tooltip:CQ.I18n.getMessage("Refresh Versions"),tooltipType:"title",iconCls:"cq-siteadmin-refresh",scope:this,handler:function(){var L=new Date().getTime();
var K=new CQ.Ext.LoadMask(this.versionsPanel.body);
K.show();
this.versionsStore.load();
window.setTimeout(function(){K.hide()
},this.getTimeoutTime(L))
}},"->",{xtype:"button",tooltip:CQ.I18n.getMessage("Create a new version"),tooltipType:"title",text:CQ.I18n.getMessage("Create..."),disabled:this.readOnly,scope:this,handler:function(){var K=CQ.WCM.getDialogConfig({xtype:"panel",items:[{name:"label",xtype:"textfield",vtype:"name",fieldLabel:CQ.I18n.getMessage("Version Label")},{name:"comment",xtype:"textarea",fieldLabel:CQ.I18n.getMessage("Comment")}]});
var M=this;
K=CQ.Util.applyDefaults(K,{title:CQ.I18n.getMessage("Create Version"),height:250,formUrl:this.pathEncoded+".version.html",success:function(){M.versionsStore.reload();
M.hideLoadMask()
},failure:function(N,O){M.notifyFromAction(O)
},params:{cmd:"createVersion"}});
var L=CQ.Util.build(K,true);
L.on("beforesubmit",function(){M.showLoadMask(CQ.I18n.getMessage("Creating version..."))
});
L.show()
}},this.restoreVersionButton]});
J.push(this.versionsPanel)
}else{if(I[H]==CQ.dam.AssetEditor.REFERENCES){var B="/bin/wcm/references.json";
B+="?path="+encodeURIComponent(this.path);
B=CQ.HTTP.noCaching(B);
this.referencesStore=new CQ.Ext.data.Store({isLoaded:false,proxy:new CQ.Ext.data.HttpProxy({url:B,method:"GET"}),reader:new CQ.Ext.data.JsonReader({totalProperty:"results",root:"pages",id:"path"},["path","title","references"]),baseParams:{_charset_:"utf-8"}});
this.referencesDataView=new CQ.Ext.DataView({multiSelect:false,singleSelect:true,emptyText:CQ.I18n.getMessage("No References"),store:this.referencesStore,itemSelector:".cq-asseteditor-references-item",tpl:new CQ.Ext.XTemplate('<tpl for=".">','<div class="cq-asseteditor-references-item" onclick="CQ.wcm.SiteAdmin.openPage(\'{path}\');">','<span class="cq-asseteditor-references-title">{title} </span>','<span class="cq-asseteditor-references-quantity">({quantity})</span><br>','<span class="cq-asseteditor-references-path">{path}</span>',"</div>","</tpl>"),prepareData:function(K){K.quantity=K.references.length;
return K
}});
this.referencesPanel=new CQ.Ext.Panel({title:CQ.I18n.getMessage("References"),cls:"cq-asseteditor-references",items:[this.referencesDataView],bbar:[{xtype:"button",tooltip:CQ.I18n.getMessage("Refresh References"),tooltipType:"title",iconCls:"cq-siteadmin-refresh",scope:this,handler:function(){var L=new Date().getTime();
var K=new CQ.Ext.LoadMask(this.referencesPanel.body);
K.show();
this.referencesStore.load();
window.setTimeout(function(){K.hide()
},this.getTimeoutTime(L))
}}]});
J.push(this.referencesPanel)
}}}}}else{if(I[H]){J.push(CQ.Util.applyDefaults(J[H],{}))
}}}return J
},refresh:function(){delete this.info;
this.refreshInfo();
this.refreshThumbnail();
this.refreshRenditions();
this.refreshGrid()
},refreshInfo:function(){this.titleInfo.updateText(this.getInfo("title"));
this.lastModifiedInfo.updateText(this.getInfo("lastModified"));
if(this.dimensionsInfo){this.dimensionsInfo.updateHtml(this.getInfo("dimensions"))
}},refreshThumbnail:function(){this.thumbnail.updateHtml(this.getThumbnailHtml())
},refreshGrid:function(){var A=CQ.Ext.getCmp(window.CQ_SiteAdmin_id).getCurrentPath();
if(A==this.parentPath){CQ.Ext.getCmp(window.CQ_SiteAdmin_id+"-grid").getStore().reload()
}},refreshRenditions:function(){if(!this.renditionsPanel){return 
}var B=[];
var D=this.getInfo("renditions");
for(var A in D){if(A.indexOf("jcr:")<0){var E;
var C=CQ.HTTP.externalize(this.pathEncoded+"/jcr:content/renditions/"+CQ.HTTP.encodePath(A),true);
if(D[A]["jcr:content"][":jcr:data"]<this.renditionsMaxSize&&((A=="original"&&this.isImage()||this.isImage(A)))){C=CQ.HTTP.setParameter(C,CQ.utils.HTTP.PARAM_NO_CACHE,D[A].ck);
E=C
}else{E=CQ.HTTP.externalize("/libs/cq/ui/widgets/themes/default/icons/48x48/document.png.thumb.100.140.png");
if(this.isImage()){C=CQ.HTTP.setParameter(C,CQ.utils.HTTP.PARAM_NO_CACHE,D[A].ck)
}}B.push([A,C,CQ.shared.XSS.getXSSValue(E)])
}}this.renditionsStore.loadData(B)
},refreshOriginal:function(){var A=this;
window.setTimeout(function(){var F;
try{var C=A.getInfo("renditions")["cq5dam.thumbnail.48.48.png"]["jcr:content"]["jcr:lastModified"];
F=new Date(C).getTime()
}catch(E){F=new Date().getTime()
}delete A.info;
var D=A.getInfo("metadata");
var B=CQ.Util.findFormFields(A.formPanel);
if(D["tiff:ImageWidth"]&&B["./tiff:ImageWidth"]){B["./tiff:ImageWidth"][0].setValue(D["tiff:ImageWidth"])
}if(D["tiff:ImageLength"]&&B["./tiff:ImageLength"]){B["./tiff:ImageLength"][0].setValue(D["tiff:ImageLength"])
}A.refreshInfo();
A.versionsStore.reload();
A.hideLoadMask();
A.refreshGrid();
A.waitForRenditions(true,F)
},1000)
},waitForRenditions:function(initialCall,formerCk,loadMaskR,loadMaskT){var ae=this;
if(initialCall){loadMaskR=new CQ.Ext.LoadMask(this.renditionsPanel.body,{msg:CQ.I18n.getMessage("Processing renditions..."),removeMask:true});
loadMaskR.show();
loadMaskT=new CQ.Ext.LoadMask(this.thumbnail.getEl(),{msg:"&nbsp;",removeMask:true});
loadMaskT.show();
this.renditionsTimeoutId=window.setTimeout(function(){ae.waitForRenditions(false,formerCk,loadMaskR,loadMaskT)
},this.renditionsInitialTimeout)
}else{var url=this.pathEncoded+"/jcr:content/renditions/cq5dam.thumbnail.48.48.png/jcr:content.json";
url=CQ.HTTP.noCaching(url);
var tInfo=CQ.HTTP.eval(url);
var ck;
try{var m=tInfo["jcr:lastModified"];
ck=new Date(m).getTime()
}catch(e){ck=new Date().getTime()
}if(ck==formerCk){this.renditionsTimeoutId=window.setTimeout(function(){ae.waitForRenditions(false,formerCk,loadMaskR,loadMaskT)
},this.renditionsTimeout)
}else{delete this.info;
this.refreshRenditions();
loadMaskR.hide();
loadMaskT.hide();
this.refreshThumbnail();
this.refreshGrid()
}}},showSaveMask:function(A){this.showLoadMask(A||CQ.I18n.getMessage("Saving..."))
},showLoadMask:function(A){this.loadMask=new CQ.Ext.LoadMask(this.body,{msg:A||CQ.I18n.getMessage("Loading...")});
this.loadMask.show()
},hideLoadMask:function(){if(this.loadMask){this.loadMask.hide()
}},hideSaveMask:function(){this.hideLoadMask()
},getTimeoutTime:function(B){var C=new Date().getTime()-B;
var A=600;
if(C>A){return 1
}return A-C
},notify:function(A){this.hideLoadMask();
if(!A){A=CQ.I18n.getMessage("Unspecified error")
}CQ.Notification.notify(CQ.I18n.getMessage("Error"),A)
},notifyFromAction:function(B){var D;
try{var A=CQ.HTTP.buildPostResponseFromHTML(B.response.responseText);
D=A.headers[CQ.HTTP.HEADER_MESSAGE]
}catch(C){CQ.Log.warn("CQ.dam.AssetEditor#notifyFromAction: "+C.message)
}this.notify(D)
},applyReadOnly:function(A){for(var B=0;
B<A.length;
B++){try{if(A[B].items){this.applyReadOnly(A[B].item)
}A[B].readOnly=true
}catch(C){CQ.Log.warn("CQ.dam.AssetEditor#applyReadOnly: "+C.message)
}}},constructor:function(D){var F=this;
this.path=D.path;
this.pathEncoded=CQ.HTTP.encodePath(this.path);
if(D.path){this.fileName=D.path.substring(D.path.lastIndexOf("/")+1);
this.parentPath=D.path.substring(0,D.path.lastIndexOf("/"))
}this.readOnly=D.readOnly||!CQ.User.getCurrentUser().hasPermissionOn("modify",this.path);
D=CQ.Util.applyDefaults(D,{layout:"border",closable:true,header:false,border:false,cls:"cq-asseteditor",contentPath:"/jcr:content/metadata",title:CQ.shared.XSS.getXSSValue(CQ.shared.Util.ellipsis(this.fileName,30)),thumbnailWidth:319,thumbnailHeight:319,thumbnailServlet:"thumb",thumbnailExtension:"png",renditionsMaxSize:300000,bbar:["->",CQ.dam.AssetEditor.SAVE,CQ.dam.AssetEditor.RESET],bbarWest:[CQ.dam.AssetEditor.REFRESH_INFO,"->",CQ.dam.AssetEditor.EDIT_IMAGE],tabs:[CQ.dam.AssetEditor.SUBASSETS,CQ.dam.AssetEditor.RENDITIONS,CQ.dam.AssetEditor.VERSIONS,CQ.dam.AssetEditor.REFERENCES]});
var C=[];
this.thumbnail=new CQ.Static({cls:"cq-asseteditor-thumbnail",html:this.getThumbnailHtml(false,D),colspan:2});
C.push(this.thumbnail);
this.titleInfo=new CQ.Static({cls:"cq-asseteditor-title",text:this.getInfo("title"),colspan:2});
C.push(this.titleInfo);
C.push(new CQ.Static({cls:"infoLabel",small:true,text:CQ.I18n.getMessage("Name")}));
C.push(new CQ.Static({small:true,right:true,text:this.fileName}));
if(D.assetInfo.size){C.push(new CQ.Static({cls:"infoLabel",small:true,text:CQ.I18n.getMessage("Size")}));
this.sizeInfo=new CQ.Static({small:true,right:true,text:CQ.Util.formatFileSize(D.assetInfo.size)});
C.push(this.sizeInfo)
}C.push(new CQ.Static({cls:"infoLabel",small:true,text:CQ.I18n.getMessage("Modified")}));
this.lastModifiedInfo=new CQ.Static({small:true,right:true,text:D.assetInfo.lastModified?CQ.wcm.SiteAdmin.formatDate(new Date(D.assetInfo.lastModified)):""});
C.push(this.lastModifiedInfo);
if(D.assetInfo.mime){C.push(new CQ.Static({cls:"infoLabel",small:true,text:CQ.I18n.getMessage("Type")}));
this.typeInfo=new CQ.Static({small:true,right:true,text:D.assetInfo.mime});
C.push(this.typeInfo)
}if(D.assetInfo.width&&D.assetInfo.height){C.push(new CQ.Static({cls:"infoLabel",small:true,text:CQ.I18n.getMessage("Dimensions")}));
this.dimensionsInfo=new CQ.Static({small:true,right:true,html:D.assetInfo.width+" &times; "+D.assetInfo.height});
C.push(this.dimensionsInfo)
}C.push(new CQ.Static({colspan:2,small:true,right:true,cls:"cq-asseteditor-download",html:'<a href="'+CQ.HTTP.externalize(CQ.shared.XSS.getXSSValue(this.pathEncoded))+'" target="_blank" title="'+CQ.shared.XSS.getXSSValue(this.path)+'">'+CQ.I18n.getMessage("Download")+"</a>"}));
if(D.scene7){C.push(new CQ.Static({colspan:2,id:D.id+"-publishLink",small:true,right:true,cls:"cq-asseteditor-download",html:"<a onclick=\"CQ.scene7.triggerWorkflow('"+D.id+"', '"+CQ.HTTP.externalize(CQ.shared.XSS.getXSSValue(this.pathEncoded))+"', '"+D.scene7Type+"')\">"+(this.info.metadata["dam:scene7ID"]?CQ.I18n.getMessage("Re-publish to Scene7"):CQ.I18n.getMessage("Publish to Scene7"))+"</a>"}))
}var B=D.thumbnailWidth+CQ.dam.themes.AssetEditor.WEST_PANEL_PADDING_WIDTH;
var H=CQ.Util.applyDefaults(D.infoPanel,{xtype:"panel",region:"west",width:B<CQ.dam.themes.AssetEditor.WEST_PANEL_MIN_WIDTH?CQ.dam.themes.AssetEditor.WEST_PANEL_MIN_WIDTH:B,split:true,collapsible:true,collapseMode:"mini",hideCollapseTool:true,autoScroll:true,margins:"5 0 5 5",cls:"cq-asseteditor-west",footer:true,layout:"table",layoutConfig:{columns:2},items:C,bbar:this.getButtonsConfig(D.bbarWest)});
this.infoPanel=CQ.Util.build(H);
this.renditionsMaxSize=D.renditionsMaxSize;
this.denyThumbnailUpload=D.denyThumbnailUpload;
this.denyRenditionModifications=D.denyRenditionModifications;
var E=this.getTabsConfig(D.tabs);
if(E.length>0){var A=CQ.Util.applyDefaults(D.tabPanel,{xtype:"tabpanel",region:"east",width:CQ.dam.themes.AssetEditor.EAST_PANEL_WIDTH,split:true,collapsible:true,collapseMode:"mini",hideCollapseTool:true,margins:"5 5 5 0",enableTabScroll:true,cls:"cq-asseteditor-east",activeTab:0,plain:true,footer:false,items:E,listeners:{tabchange:function(J,I){I.doLayout();
if(I==F.versionsPanel){if(!F.versionsStore.isLoaded){F.versionsStore.reload();
F.versionsStore.isLoaded=true
}}else{if(I==F.referencesPanel){if(!F.referencesStore.isLoaded){F.referencesStore.reload();
F.referencesStore.isLoaded=true
}}}}}});
this.tabPanel=CQ.Util.build(A)
}if(this.readOnly){this.applyReadOnly(D.formItems)
}var G=CQ.Util.applyDefaults(D.formPanel,{region:"center",items:D.formItems,buttonAlign:"right",autoScroll:true,cls:"cq-asseteditor-center",margins:this.tabPanel?"5 0 5 0":"5 5 5 0",labelWidth:CQ.dam.themes.AssetEditor.LABEL_WIDTH,defaults:{anchor:CQ.Ext.isIE6?"92%":CQ.Ext.isIE7?"96%":"100%",stateful:false},bbar:this.getButtonsConfig(D.bbar),cleanUp:function(){F.hideLoadMask()
}});
delete D.bbar;
this.formPanel=new CQ.Ext.form.FormPanel(G);
this.form=this.formPanel.getForm();
this.form.url=this.pathEncoded+D.contentPath+CQ.HTTP.EXTENSION_HTML;
if(!D.params){D.params=new Object()
}if(D.params[CQ.Sling.CHARSET]==undefined){D.params[CQ.Sling.CHARSET]=CQ.Dialog.DEFAULT_ENCODING
}if(D.params[CQ.Sling.STATUS]==undefined){D.params[CQ.Sling.STATUS]=CQ.Sling.STATUS_BROWSER
}this.addHidden(D.params);
D.items=[];
D.items.push(this.infoPanel);
if(this.tabPanel){D.items.push(this.tabPanel)
}D.items.push(this.formPanel);
CQ.dam.AssetEditor.superclass.constructor.call(this,D)
},initComponent:function(){CQ.dam.AssetEditor.superclass.initComponent.call(this);
var A=this;
window.setTimeout(function(){A.infoPanel.doLayout();
A.formPanel.doLayout();
if(A.tabPanel){A.tabPanel.doLayout()
}try{A.loadMask=new CQ.Ext.LoadMask(A.formPanel.body);
A.loadMask.show()
}catch(B){}},1);
this.loadContent();
this.on("close",function(){window.clearTimeout(this.renditionsTimeoutId)
})
}});
CQ.Ext.reg("asseteditor",CQ.dam.AssetEditor);
CQ.dam.AssetEditor.SAVE="SAVE";
CQ.dam.AssetEditor.RESET="RESET";
CQ.dam.AssetEditor.EDIT_IMAGE="EDIT_IMAGE";
CQ.dam.AssetEditor.REFRESH_INFO="REFRESH_INFO";
CQ.dam.AssetEditor.SUBASSETS="SUBASSETS";
CQ.dam.AssetEditor.RENDITIONS="RENDITIONS";
CQ.dam.AssetEditor.VERSIONS="VERSIONS";
CQ.dam.AssetEditor.REFERENCES="REFERENCES";
CQ.dam.HealthChecker=CQ.Ext.extend(CQ.Ext.Viewport,{store:null,selModel:null,checkParam:"assets",constructor:function(B){var A=this;
var C=new CQ.Ext.grid.ColumnModel([new CQ.Ext.grid.RowNumberer(),{header:CQ.I18n.getMessage("Type"),dataIndex:"type",width:50,renderer:function(D){if(D=="asset"){return A.checkParam=="assets"?CQ.I18n.getMessage("Binary"):CQ.I18n.getMessage("Asset")
}else{return CQ.I18n.getMessage("Folder")
}}},{header:CQ.I18n.getMessage("Path"),dataIndex:"path",width:250},{header:CQ.I18n.getMessage("Status"),dataIndex:"status",width:150,renderer:function(G,E,D){var F=A.checkParam=="assets"?CQ.I18n.getMessage("Binary"):CQ.I18n.getMessage("Asset");
if(G=="missingInWorkflow"){return CQ.I18n.getMessage("Asset is missing, but processed by workflow already")
}else{if(D.get("type")=="asset"){if(A.checkParam=="assets"){return CQ.I18n.getMessage("Asset is missing")
}else{return CQ.I18n.getMessage("Binary is missing")
}}else{return CQ.I18n.getMessage("Folder is missing")
}}}}]);
this.selModel=new CQ.Ext.grid.RowSelectionModel();
this.store=new CQ.Ext.data.JsonStore({proxy:new CQ.Ext.data.HttpProxy({url:CQ.HTTP.externalize(CQ.dam.HealthChecker.HEALTH_CHECK_SERVLET),method:"GET"}),root:"assets",fields:[{name:"type"},{name:"path"},{name:"status"}],listeners:{load:function(E,D,F){if(E.getTotalCount()>0){CQ.Ext.getCmp("cq-dam-healthchecker-sync").enable();
CQ.Ext.getCmp("cq-dam-healthchecker-delete").enable()
}else{CQ.Ext.getCmp("cq-dam-healthchecker-sync").disable();
CQ.Ext.getCmp("cq-dam-healthchecker-delete").disable()
}}}});
CQ.dam.HealthChecker.superclass.constructor.call(this,{id:"cq-dam-healthchecker",layout:"border",items:[{id:"cq-dam-healthchecker-wrapper",xtype:"panel",region:"center",layout:"border",border:false,items:[{id:"cq-header",xtype:"container",cls:"cq-damadmin-header",autoEl:"div",region:"north"},{xtype:"grid",id:"cq-dam-healthchecker-grid",region:"center",margins:"5 5 5 5",border:true,loadMask:true,stripeRows:true,colModel:C,selModel:this.selModel,store:this.store,viewConfig:{forceFit:true},tbar:[{text:CQ.I18n.getMessage("Check Assets"),handler:this.performCheck.createDelegate(this,["assets"])},{text:CQ.I18n.getMessage("Check Binaries"),handler:this.performCheck.createDelegate(this,["binaries"])},{xtype:"tbseparator"},{id:"cq-dam-healthchecker-sync",text:CQ.I18n.getMessage("Synchronize"),handler:this.performAction.createDelegate(this,["sync"]),disabled:true},{id:"cq-dam-healthchecker-delete",text:CQ.I18n.getMessage("Delete"),handler:this.performAction.createDelegate(this,["delete"]),disabled:true},{xtype:"tbspacer",width:50}]}]}]})
},performCheck:function(A){this.store.load({params:{check:A}});
this.checkParam=A
},performAction:function(B){var A=CQ.Ext.getCmp("cq-dam-healthchecker-grid");
A.loadMask.show();
CQ.Ext.Ajax.request({url:CQ.HTTP.externalize(CQ.dam.HealthChecker.HEALTH_CHECK_SERVLET),params:{check:this.checkParam,action:B},method:"POST",success:function(C,D){this.store.load({params:{check:this.checkParam}})
},failure:function(C,D){A.loadMask.hide();
CQ.Notification.notifyFromResponse(result)
},scope:this})
}});
CQ.dam.HealthChecker.HEALTH_CHECK_SERVLET="/libs/dam/health_check.json";
CQ.Ext.reg("healthchecker",CQ.dam.HealthChecker);
CQ.dam.form.Metadata=CQ.Ext.extend(CQ.form.CompositeField,{labelParameter:"label",namespaceParameter:"namespace",localPartParameter:"localPart",qualifiedNameParameter:"qualifiedName",typeParameter:"type",multivalueParameter:"multivalue",defaultNamespace:"dc",defaultType:"String",addFieldsToParent:true,options:null,constraintFieldName:"./constraintType",constraintsMap:{Date:"foundation/components/form/constraints/date",Long:"foundation/components/form/constraints/numeric"},processRecord:function(A,C){if(this.fireEvent("beforeloadcontent",this,A,C)!==false){var B=A.get(this.getName());
if(B==undefined){if(this.defaultNamespace){this.namespaceField.setValue(this.defaultNamespace);
this.localPartField.setOptions(this.getLocalPartOptions(this.defaultNamespace));
this.setType(this.defaultType)
}}else{this.labelField.setValue(B.label);
this.namespaceField.setValue(B.namespace);
this.localPartField.setOptions(this.getLocalPartOptions(B.namespace));
this.localPartField.setValue(B.localPart);
this.setType(B.type);
this.multivalueField.setValue(B.multivalue);
this.setQualified()
}this.fireEvent("loadcontent",this,A,C)
}},initComponent:function(){CQ.dam.form.Metadata.superclass.initComponent.call(this);
this.localPartOptions={};
var nsOptions=[];
if(typeof this.options=="string"){try{this.options=CQ.HTTP.eval(this.options);
var regNs=CQ.HTTP.eval("/libs/dam/namespaces.json");
this.regNamespaces=regNs.namespaces;
for(var name in this.options){if(typeof this.options[name]=="object"){var title=this.options[name]["jcr:title"];
if(this.regNamespaces.indexOf(name)!=-1){nsOptions.push({value:name,qtip:title?title:""})
}}}}catch(e){CQ.Log.warn("CQ.WCM#getDialogConfig failed: "+e.message);
this.options={}
}}else{}var m=this;
this.labelField=new CQ.Ext.form.TextField({fieldLabel:"Field Label",name:this.name+"/"+this.labelParameter,ignoreData:true,fieldDescription:CQ.I18n.getMessage("Leave empty to use the local part",[],"sample: 'dc:title' - 'dc' is the namespace, 'title' the localpart")});
nsOptions.sort();
nsOptions.sort(function(a,b){var va=a.value.toLowerCase();
var vb=b.value.toLowerCase();
if(va<vb){return -1
}else{if(va==vb){return 0
}else{return 1
}}});
this.namespaceField=new CQ.form.Selection({fieldLabel:"Namespace",name:this.name+"/"+this.namespaceParameter,type:"select",ignoreData:true,options:nsOptions,listeners:{selectionchanged:{fn:m.changeNamespace,scope:m}}});
this.localPartField=new CQ.form.Selection({fieldLabel:"Local Part",name:this.name+"/"+this.localPartParameter,type:"combobox",fieldDescription:CQ.I18n.getMessage("Select a namespace first to receive the accordant local parts",[],"two select boxes; after selecting a namespace all possible local parts are loaded into the second select box"),ignoreData:true,allowBlank:false,vtype:this.vtype,listeners:{selectionchanged:{fn:m.changeLocalPart,scope:m}}});
this.qualifiedField=new CQ.Ext.form.TextField({fieldLabel:"Qualified Name",readOnly:true,fieldDescription:CQ.I18n.getMessage("Generated from namespace and local part",[],"sample: 'dc:title' - 'dc' is the namespace, 'title' the localpart"),ignoreData:true});
this.typeField=new CQ.form.Selection({fieldLabel:"Type",name:this.name+"/"+this.typeParameter,type:"select",ignoreData:true,options:[{value:"String",text:"String"},{value:"Long",text:"Number"},{value:"Date",text:"Date"},{value:"Boolean",text:"Boolean"}],listeners:{selectionchanged:function(){m.setConstraint(this.getValue())
}}});
this.multivalueField=new CQ.form.Selection({fieldLabel:"",name:this.name+"/"+this.multivalueParameter,type:"checkbox",ignoreData:true,inputValue:"true",boxLabel:CQ.I18n.getMessage("Property is multi value")})
},afterRender:function(){CQ.dam.form.Metadata.superclass.afterRender.call(this);
var A=this.addFieldsToParent?this.findParentByType("panel"):this;
if(!A){A=this
}A.add(this.labelField);
A.add(this.namespaceField);
A.add(this.localPartField);
A.add(this.qualifiedField);
A.add(this.typeField);
A.add(this.multivalueField)
},getNamespace:function(){return this.namespaceField.getValue()
},getLocalPart:function(){return this.localPartField.getValue()
},getLocalPartOptions:function(C){var E=[];
if(this.localPartOptions[C]){return this.localPartOptions[C]
}else{var B=this.options[C];
if(B){for(var A in B){if(typeof B[A]=="object"){var D=B[A]["jcr:title"];
E.push({value:A,qtip:D?D:""})
}}E.sort(function(G,F){var I=G.value.toLowerCase();
var H=F.value.toLowerCase();
if(I<H){return -1
}else{if(I==H){return 0
}else{return 1
}}});
this.localPartOptions[C]=E
}}return E
},changeNamespace:function(){var A=this.getLocalPartOptions(this.getNamespace());
this.localPartField.setOptions(A);
this.setQualified()
},changeLocalPart:function(){this.setQualified();
try{var A=this.options[this.getNamespace()][this.getLocalPart()];
this.setType(A.type);
this.multivalueField.setValue(A.multivalue)
}catch(B){}},setQualified:function(){var B=this.getNamespace();
var A=this.getLocalPart();
var C="";
if(A){if(B){C=B+":"+A
}else{C=A
}}this.qualifiedField.setValue(C)
},setType:function(A){this.typeField.setValue(A);
this.setConstraint(A)
},setConstraint:function(B){if(!this.constraintField){try{var A=this.findParentByType("dialog");
this.constraintField=A.getField(this.constraintFieldName)
}catch(C){this.constraintField={setValue:function(){}}
}}if(this.constraintsMap[B]){this.constraintField.setValue(this.constraintsMap[B])
}else{this.constraintField.setValue("")
}},constructor:function(A){this.hiddenField=new CQ.Ext.form.Hidden({name:A.name});
CQ.Ext.applyIf(A,{options:"/libs/dam/options/metadata.overlay.2.json",border:false,hideLabel:true});
CQ.dam.form.Metadata.superclass.constructor.call(this,A)
}});
CQ.Ext.reg("metadata",CQ.dam.form.Metadata);