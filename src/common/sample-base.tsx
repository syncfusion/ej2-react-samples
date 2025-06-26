import * as React from 'react';
import { setResponsiveElement, selectedTheme, setSbLink, removeOverlay } from './index';
import { setSelectList } from './leftpane';
import { sampleNameElement, onComponentLoad, setNavButtonState, intialLoadScrollTop, renderDescriptions, checkApiTableDataSource, showHooks, isRendered, setIsFinalize } from './component-content';

export class SampleBase<P, S> extends React.PureComponent<P, S>{

    /**
     * Custom Render Complete function
     */
    public rendereComplete(): void {
    }

    componentDidUpdate() {
    }

    componentDidMount(): void {
        showHooks(false); 
        finalizeContent();
        setTimeout(() => {
            finalizeTab();
            this.rendereComplete();
        });

    }

}

function finalizeContent(): void {
    renderDescriptions();
    setSbLink();
    onComponentLoad();
    setNavButtonState();
    intialLoadScrollTop();
}

function finalizeTab(): void {
    setSelectList();
    removeOverlay();
    checkApiTableDataSource();
}

export function updateSampleSection(): void {
    if (isRendered) {
        return;
    }
    showHooks(true);
    finalizeContent();
    setTimeout(() => {
        finalizeTab();
        setIsFinalize();
    });
}

export function updateAISampleSection(): void {
    if (isRendered) {
        return;
    }
    showHooks(false);
    finalizeContent();
    setTimeout(() => {
        finalizeTab();
        setIsFinalize();
    });
}