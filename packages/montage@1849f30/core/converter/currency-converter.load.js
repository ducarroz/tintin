montageDefine("1849f30","core/converter/currency-converter",{dependencies:["montage","core/converter/converter","core/converter/number-converter"],factory:function(e,t){e("montage").Montage,e("core/converter/converter"),e("core/converter/number-converter").numericValueToString;var n=e("core/converter/number-converter").NumberConverter;t.CurrencyConverter=n.specialize({currency:{value:"$"},decimals:{value:2},useParensForNegative:{value:!1},showCurrencyBeforeNumber:{value:!1},forceDecimals:{value:!0},convert:{value:function(e){var t=this.super(e);return 0>e&&this.useParensForNegative&&(t="("+t.substring(1,t.length)+")"),t=this.showCurrencyBeforeNumber?this.currency+" "+t:t+" "+this.currency}}})}});