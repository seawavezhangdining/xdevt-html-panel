
//this interface if for  transport to  property of display component 
export interface XdevtHtmlOptions {
  initCSS: string;
  initHTML: string;
  initJS: string; 
  dataChageJS: string ;  // when dataloaded then invoke is js 
    // when first load finish then invoke is js
  eventSource: string;
  isdebug:boolean;
}

/*
   this interface is for setting 
*/
export interface AXdevtHtmlDefaults {
  initCSS: string;
  initHTML:string;
  initJS: string; 
  dataChageJS:string ;  // when dataloaded then invoke is js 
    // when first load finish then invoke is js
  eventSource: string;
  isdebug:boolean;
}

