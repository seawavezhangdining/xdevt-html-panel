import React from 'react';
import { PanelOptionsEditorBuilder } from '@grafana/data';
import Editor from '@monaco-editor/react';
import { config } from '@grafana/runtime';
import { XdevtHtmlOptions } from './types';
import { props_defaults } from 'examples';

interface MonacoEditorProps {
    value: string;
    theme: string;
    language: string;
    onChange: (value?: string | undefined) => void;
  }

  class MonacoEditor extends React.PureComponent<MonacoEditorProps> {
    getEditorValue: any | undefined;
    editorInstance: any | undefined;
  
    onSourceChange = () => {
      this.props.onChange(this.getEditorValue());
    };
    onEditorDidMount = (getEditorValue: any, editorInstance: any) => {
      this.getEditorValue = getEditorValue;
      this.editorInstance = editorInstance;
    };
    updateDimensions() {
      this.editorInstance.layout();
    }
    render() {
      const source = this.props.value;
      if (this.editorInstance) {
        this.editorInstance.layout();
      }
      return (
        <div onBlur={this.onSourceChange}>
          <Editor
            height={'33vh'}
            language={this.props.language}
            theme={this.props.theme}
            value={source}
            editorDidMount={this.onEditorDidMount}
          />
        </div>
      );
    }
  }



  export const optionsBuilder = (builder: PanelOptionsEditorBuilder<XdevtHtmlOptions>) => {
    return builder
      .addCustomEditor({
        category: ['User CSS'],
        path: 'initCSS',
        name: 'User CSS',
        description: `The CSS ,this component used .`,
        id: 'initCSS',
        defaultValue: props_defaults.initCSS,
        editor: props => {
          const grafanaTheme = config.theme.name;
          return (
            <MonacoEditor
              language="CSS"
              theme={grafanaTheme === 'Grafana Light' ? 'vs-light' : 'vs-dark'}
              value={props.value}
              onChange={props.onChange}
            />
          );
        },
      })
      .addCustomEditor({
        category: ['User HTML '],
        path: 'initHTML',
        name: 'User HTML',
        description: `You want to display html `,
        id: 'initHTML',
        defaultValue: props_defaults.initHTML,
        editor: props => {
          const grafanaTheme = config.theme.name;
          return (
            <MonacoEditor
              language="HTML"
              theme={grafanaTheme === 'Grafana Light' ? 'vs-light' : 'vs-dark'}
              value={props.value}
              onChange={props.onChange}
            />
          );
        },
      })
      .addCustomEditor({
        category: ['User JS Inital'],
        path: 'initJS',
        name: 'User JS Inital',
        description: `Js inital  code is executed once when the panel loads `,
        id: 'initJS',
        defaultValue: props_defaults.initJS,
        editor: props => {
          const grafanaTheme = config.theme.name;
          return (
            <MonacoEditor
              language="javascript"
              theme={grafanaTheme === 'Grafana Light' ? 'vs-light' : 'vs-dark'}
              value={props.value}
              onChange={props.onChange}
            />
          );
        },
      })
      .addCustomEditor({
        category: ['User JS DataChage'],
        path: 'dataChageJS',
        name: 'User JS Change Code',
        description: `This will invoke when get new data`,
        id: 'dataChageJS',
        defaultValue: props_defaults.dataChageJS,
        editor: props => {
          const grafanaTheme = config.theme.name;
          return (
            <MonacoEditor
              language="javascript"
              theme={grafanaTheme === 'Grafana Light' ? 'vs-light' : 'vs-dark'}
              value={props.value}
              onChange={props.onChange}
            />
          );
        },
      })
      .addBooleanSwitch({
        path: 'isdebug',
        name: 'whether display debug information',
        defaultValue: false,
      })
      ;
  };

