montageDefine("0863b1d","ui/select.reel/select",{dependencies:["montage/ui/base/abstract-select"],factory:function(e,t){var n=e("montage/ui/base/abstract-select").AbstractSelect;t.Select=n.specialize({constructor:{value:function(){this.super(),this.classList.add("digit-Select")}},enterDocument:{value:function(e){this.super(e),this.element.addEventListener("change",this,!1)}},handleChange:{value:function(){var e=this.contentController.organizedContent,t=this.element.selectedIndex;this.value=e[t]}},draw:{value:function(){var e,t=this.contentController.organizedContent;this._contentIsDirty&&(this.drawOptions(),this._contentIsDirty=!1),e=t.indexOf(this.value),-1==e&&(e=0),this.element.selectedIndex=e}},drawOptions:{value:function(){for(var e,t,n=this.contentController.organizedContent,i=document.createDocumentFragment(),r=0,a=n.length;a>r;r++)e=document.createElement("option"),t=n[r],e.textContent=t&&t[this.labelPropertyName],i.appendChild(e);this.element.innerHTML="",this.element.appendChild(i)}}})}});