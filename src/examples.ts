import { AXdevtHtmlDefaults } from './types';

export const props_defaults: AXdevtHtmlDefaults = {
  isdebug:false,
  initCSS: `
  <style type="text/css">
          .varOnlineWaterQualityFirstTDClass
          {
            font-size:24px;
            font-family:微软雅黑;
            border:0px solid #ccc;
            background:#fff0;
            line-height:30px;
            color:#08f7fe;
            text-align:center;
            
          }
          .varOnlineWaterQualityOtherTDClass
          {
            font-size:24px;
            font-family:微软雅黑;
            border:0px solid #ccc;
            background:#fff0;
            line-height:30px;
            color:#eeeeee;
            text-align:center;
            
          }
          .varOnlineWaterQualityFirstTDTitleClass
         {
            font-size:20px;
            font-family:微软雅黑;
            border:0px solid #ccc;
            background:#fff0;
            line-height:50px;
           color: #08f7fe;
           font-weight: 600;
            text-align:left;
            
          }
          </style>
      `,
      initHTML: `
      <table id="varTB01"  border="0" cellpadding="0" cellspacing="0"  ng-style="{height: ctrl.height;width: ctrl.width;}"  width="100%">
      <tr>
        <td  colspan="2" class="varOnlineWaterQualityFirstTDTitleClass" style=" text-align:left" > 在线水质</td>
        <td  colspan="4"  col  scope="col" class="varOnlineWaterQualityFirstTDTitleClass"  style=" text-align:right"  ><strong>[单位：mgl]</strong></td>
      </tr>
      <tr>
        <td width="20%"  class="varOnlineWaterQualityFirstTDClass" ></td>
        <td width="16%"  class="varOnlineWaterQualityFirstTDClass" >COD </td>
        <td width="16%"  class="varOnlineWaterQualityFirstTDClass" >NH3 </td>
        <td width="16%"  class="varOnlineWaterQualityFirstTDClass" >TN </td>
        <td width="16%"  class="varOnlineWaterQualityFirstTDClass" >TP</td>
       <td width="16%"  class="varOnlineWaterQualityFirstTDClass" >PH </td>
      </tr>
      <tr>
      <tr>
        <td width="20%"  class="varOnlineWaterQualityOtherTDClass" >进水</td>
        <td width="16%"  class="varOnlineWaterQualityOtherTDClass"  id="inCOD" >COD </td>
        <td width="16%"  class="varOnlineWaterQualityOtherTDClass"  id="inNH3 " >NH3 </td>
        <td width="16%"  class="varOnlineWaterQualityOtherTDClass"  id="inTN " >TN </td>
        <td width="16%"  class="varOnlineWaterQualityOtherTDClass"  id="inTP" >TP</td>
       <td width="16%"  class="varOnlineWaterQualityOtherTDClass"  id="inPH" >TP</td>
      </tr>
      <tr>
      <tr>
        <td width="20%"  class="varOnlineWaterQualityOtherTDClass" >出水</td>
        <td width="16%"  class="varOnlineWaterQualityOtherTDClass"  id="outCOD" >COD </td>
        <td width="16%"  class="varOnlineWaterQualityOtherTDClass"  id="outNH3 " >NH3 </td>
        <td width="16%"  class="varOnlineWaterQualityOtherTDClass"   id="outTN ">TN </td>
        <td width="16%"  class="varOnlineWaterQualityOtherTDClass"   id="outTP">TP</td>
       <td width="16%"  class="varOnlineWaterQualityOtherTDClass"   id="outPH">PH </td>
      </tr>
     
    </table>
      `,
      initJS: `
        console.log(data);
        console.log(theme);
        console.log(htmlRef);

        htmlRef.current.innerHTML="";
        htmlRef.current.innerHTML=strHtml;
        htmlRef.current.innerHTML=htmlRef.current.innerHTML+strCss;
        //document.getElementById("inCOD").innerText="aaaaaa";
      `,
    dataChageJS: `
      console.log(theme);
      console.log(data);
      if( typeof(data) == "undefined" ||  typeof(data.series) == "undefined" ||  data.series.length==0 || typeof(data.series[0].fields) == "undefined" ||  data.series[0].fields[0].values.buffer.length==0 )
      {
        document.getElementById("inCOD").innerText="no find data";
      }
      else
      {
        for (var tempi = 0;tempi < data.series[0].fields[0].values.buffer.length;tempi++)
        {
            if(data.series[0].fields[2].values.buffer[tempi]=="opczk.仪表.Plc1_AI8_1")
            {
              document.getElementById("inCOD").innerText=Number(data.series[0].fields[3].values.buffer[tempi]).toPrecision(3);
            }
        }
      }
      
    
    ;
    `,
    eventSource: `
    
        `,
    
  };