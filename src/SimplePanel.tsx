import React, { useRef, useState, useEffect } from 'react';
import { PanelProps, GrafanaTheme } from '@grafana/data';
import { withTheme } from '@grafana/ui';
import { debounce } from 'lodash';
import { css, cx } from 'emotion';
//import { SimpleOptions, funcParams } from 'types';
import {XdevtHtmlOptions} from './types'
// just comment it if don't need it
import 'echarts-wordcloud';
import 'echarts-liquidfill';
import 'echarts-gl';

// auto register map
/*
const maps = (require as any).context('./map', false, /\.json/);
maps.keys().map((m: string) => {
  const matched = m.match(/\.\/([0-9a-zA-Z_]*)\.json/);
  if (matched) {
    echarts.registerMap(matched[1], maps(m));
  } else {
    console.warn(
      "Can't register map: JSON file Should be named according to the following rules: /([0-9a-zA-Z_]*).json/."
    );
  }
});
*/
const getStyles = () => ({
  tips: css`
    padding: 0 10%;
    height: 100%;
    background: rgba(128, 128, 128, 0.1);
    overflow: auto;
  `,
  tipsTitle: css`
    margin: 48px 0 32px;
    text-align: center;
  `,
  wrapper: css`
    position: relative;
  `,
});
interface Props extends PanelProps<XdevtHtmlOptions> {
  theme: GrafanaTheme;
}

//interface Props extends PanelProps<SimpleOptions> {
//  theme: GrafanaTheme;
//}

const PartialSimplePanel: React.FC<Props> = ({ options, data, width, height, theme }) => {
  const styles = getStyles();
  const htmlRef = useRef<HTMLDivElement>(null);
  const [tips, setTips] = useState<Error | undefined>();
  //const [isFirstInital, setIsFirstInital] = useState<boolean>(false);

  const dataInitial = debounce(
    () => {
      //if (!chart) {
      //  console.error('when dataInitial,chart not ready!');
      //  return;
      //}
      if (data.state && data.state !== 'Done') {
        if(options.isdebug)
          console.log('begin invoke dataChange,but state of data not done,so return ');
        return;
      }
      try {
        setTips(undefined);
        //chart.clear();
        if(options.isdebug)
          console.log('begin invoke dataChange');
        let getOption = new Function('data, theme, htmlRef', options.dataChageJS);
        getOption(data, theme, htmlRef);
        //const o = getOption(data, theme, chart, echarts);
        //o && chart.setOption(o);

      } catch (err) {
        console.error('Editor content error!', err);
        setTips(err);
      }
    },
    150,
    { leading: true }
  );
  const htmlInitial = debounce(
    () => {
      //if (!chart) {
      //  console.error('when chartInitial. chart not ready!');
      //  return;
      //}
      
      try {
        setTips(undefined);
        //chart.clear(); 
        //chart?.resize(); 
        if(options.isdebug)
          console.log('begin invoke htmlInitial');
        let initFunction = new Function('data, theme, htmlRef,strCss,strHtml,oOptions', options.initJS);
        initFunction(data, theme, htmlRef,options.initCSS,options.initHTML,options);
      } catch (err) {
        console.error('Editor content error!', err);
        setTips(err);
      }
    },
    150,
    { leading: true }
  );
  useEffect(() => {
    if(options.isdebug)
      console.log("htmlRef.current, options.initCSS,options.initHTML,options.initJS change invoke",options.initCSS,options.initHTML);
    if (htmlRef.current) {
      //chart?.clear();
      //chart?.dispose();
      //setChart(echarts.init(htmlRef.current, options.followTheme ? theme.type : undefined));
      //const myChart=chart;
      setTimeout(() => {
        
      }, 1000);
      
      htmlInitial();
    }
    else
    {
      if(options.isdebug)
        console.log("htmlRef.current, options.initCSS,options.initHTML,options.initJS change invoke ,but htmlRef.current is null");
    }
    return () => {
      //chart?.clear();
      //chart?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlRef.current, options.initCSS,options.initHTML,options.initJS]);

  useEffect(() => {
    //chart?.resize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  useEffect(() => {
    dataInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ options.dataChageJS, data]);

  return (
    <>
      {tips && (
        <div className={styles.tips}>
          <h5 className={styles.tipsTitle}>Editor content error!</h5>
          {(tips.stack || tips.message).split('\n').map(s => (
            <p>{s}</p>
          ))}
        </div>
      )}
      <div
        ref={htmlRef}
        className={cx(
          styles.wrapper,
          css`
            width: ${width}px;
            height: ${height}px;
          `
        )}
      />
    </>
  );
};

export const SimplePanel = withTheme(PartialSimplePanel);
