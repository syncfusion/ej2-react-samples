import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { select } from '@syncfusion/ej2-base';

export class PropertyPane extends React.Component<{ title: string; children?: React.ReactNode }, {}>{

    render() {
        const mobilePropPane: Element = select('.sb-mobile-prop-pane');
        const isMobile = window.matchMedia('(max-width:550px)').matches;
        return isMobile && mobilePropPane ?
            ReactDOM.createPortal(
                <div className='property-panel-section'>
                    <div className="property-panel-header">
                        {this.props.title}
                    </div>
                    <div className="property-panel-content">
                        {this.props.children}
                    </div>
                </div>,
                mobilePropPane
            )
            :
            (
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
