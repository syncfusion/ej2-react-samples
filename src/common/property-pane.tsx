import * as ReactDOM from 'react-dom';
import * as React from 'react';

export let PropertyPaneProps: { title: string; children?: React.ReactNode } = { title: '', children: null };
export class PropertyPane extends React.Component<{ title: string; children?: React.ReactNode }, {}>{

    render() {
        PropertyPaneProps.title = this.props.title;
        PropertyPaneProps.children = this.props.children;
        return (
            <div className='property-panel-section'>
                <div className="property-panel-header">
                    {this.props.title}
                </div>
                <div className="property-panel-content">
                    {this.props.children}
                </div>
            </div>

        )
    }
}
