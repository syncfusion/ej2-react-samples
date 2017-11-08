import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { setResponsiveElement, selectedTheme, setSbLink, removeOverlay } from './index';
import { setSelectList } from './leftpane';
import { sampleNameElement, onComponentLoad, setNavButtonState, intialLoadScrollTop, renderDescriptions } from './component-content';
import { select } from '@syncfusion/ej2-base';

export class SampleBase<P, S> extends React.PureComponent<RouteComponentProps<any> & P, S>{

    /**
     * Custom Render Complete function
     */
    public rendereComplete(): void {
    }

    componentWillReceiveProps() {
        /**
         * Theme Change 
         */
        let hash: string[] = location.hash.split('/');
        if (hash[1] !== selectedTheme) {
            localStorage.setItem('ej2-switch', select('.active', setResponsiveElement).id);
            location.reload();
        }
        setSbLink();
    }

    componentDidMount(): void {
        renderDescriptions();
        setSbLink();
        onComponentLoad();
        setNavButtonState();
        intialLoadScrollTop();
        setSelectList();
        removeOverlay();

        this.rendereComplete();
    }

}    