import * as React from 'react';
export class PropertyPane extends React.Component {
    render() {
        return (<div className='property-panel-section'>
                <div className="property-panel-header">
                    {this.props.title}
                </div>
                <div className="property-panel-content">
                    {this.props.children}
                </div>
            </div>);
    }
}
