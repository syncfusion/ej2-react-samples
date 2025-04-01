import { ChipDirective, ChipListComponent, ChipsDirective } from '@syncfusion/ej2-react-buttons';
import * as React from 'react';
import { useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './draganddrop.css';

const DragAndDrop = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    return (
        <div>
            <div className="control-section">
                <div id="chip-draganddrop-wrapper">
                    <div id="chips" className="chips-headers">Customize your order with add-ons</div>

                    <div className="sample-padding">
                        <ChipListComponent id="choice-container" allowDragAndDrop={true} aria-labelledby="choice-chips">
                            <ChipsDirective>
                                <ChipDirective text="Extra cheese" cssClass="e-primary"></ChipDirective>
                                <ChipDirective text="Spicy Level: Medium" cssClass="e-info"></ChipDirective>
                                <ChipDirective text="Spicy Level: Low" cssClass="e-success"></ChipDirective>
                                <ChipDirective text="Fast Delivery" cssClass="e-warning"></ChipDirective>
                                <ChipDirective text="Gift Wrapping" cssClass="e-danger"></ChipDirective>
                                <ChipDirective text="Eco-Friendly Packaging" cssClass="e-primary"></ChipDirective>
                            </ChipsDirective>
                        </ChipListComponent>
                        <ChipListComponent id="selection-container" allowDragAndDrop={true} aria-labelledby="selection-chips"></ChipListComponent>
                    </div>
                </div>
            </div >
            <div id="action-description">
                    <p>This React Chips sample demonstrates the drag and drop functionality of Chips. To drag and drop a chip element, select and drag the desired chip and drop it at the target index within the required container.</p>
                </div>
                <div id="description">
                    <p>The <code>Chips</code> component allows users to drag any chip and drop it on any index in a container using <code>allowDragAndDrop</code> property. Additionally, it supports dropping a chip to an external chips container.</p>
                </div>
        </div>
    )
}
export default DragAndDrop;
