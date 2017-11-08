import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);
export class SampleBase<P, S> extends React.PureComponent<RouteComponentProps<any> & P, S>{
    public rendereComplete(): void {
        /**custom render complete function */
    }
    componentDidMount(): void {
        this.rendereComplete();
    }
}