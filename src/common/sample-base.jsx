import * as React from 'react';
import { setResponsiveElement, selectedTheme, setSbLink, removeOverlay } from './index';
import { setSelectList } from './leftpane';
import { onComponentLoad, setNavButtonState, intialLoadScrollTop, renderDescriptions, checkApiTableDataSource } from './component-content';
import { select } from '@syncfusion/ej2-base';
export class SampleBase extends React.PureComponent {
    /**
     * Custom Render Complete function
     */
    rendereComplete() {
    }
    componentWillReceiveProps() {
        /**
         * Theme Change
         */
        let hash = location.hash.split('/');
        if (hash[1] !== selectedTheme) {
            localStorage.setItem('ej2-switch', select('.active', setResponsiveElement).id);
            location.reload();
        }
        setSbLink();
    }
    componentDidMount() {
        renderDescriptions();
        setSbLink();
        onComponentLoad();
        setNavButtonState();
        intialLoadScrollTop();
        setTimeout(() => {
            setSelectList();
            removeOverlay();
            checkApiTableDataSource();
            this.rendereComplete();
        });
    }
}
