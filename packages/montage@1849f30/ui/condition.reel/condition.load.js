montageDefine("1849f30","ui/condition.reel/condition",{dependencies:["ui/component","core/logger"],factory:function(e,t){var n=e("ui/component").Component;e("core/logger").logger("condition"),t.Condition=n.specialize({hasTemplate:{value:!1},_condition:{value:!0},_contents:{value:null},constructor:{value:function(){this.super()}},condition:{set:function(e){e!==this._condition&&(this._condition=e,this.needsDraw=!0,this.isDeserializing||this._updateDomContent(e))},get:function(){return this._condition}},_updateDomContent:{value:function(e){"remove"===this.removalStrategy&&(e?this.domContent=this._contents:(this._contents=this.domContent,this.domContent=null))}},deserializedFromTemplate:{value:function(){this._condition||this._updateDomContent(this._condition)}},_removalStrategy:{value:"remove"},removalStrategy:{get:function(){return this._removalStrategy},set:function(e){var t;this._removalStrategy!==e&&("hide"!==e||this.isDeserializing||(t=this.domContent,this.domContent=this._contents,this._contents=t),this._removalStrategy=e,this.needsDraw=!0)}},draw:{value:function(){this.condition?this.element.classList.remove("montage-invisible"):this.element.classList.add("montage-invisible")}}})}});