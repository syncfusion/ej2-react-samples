import { ChipDirective, ChipListComponent, ChipsDirective } from '@syncfusion/ej2-react-buttons';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import './default.css';

export class Default extends SampleBase<{}, {}> {

    render() {
        return (
            <div>
                <div className="control-section">
                    <div id="chip-default-wrapper">
                        <div id="chips" className="chips-headers">Chips</div>

                        <div className="sample-padding">
                            {/* initialize default chip component */}
                            <ChipListComponent id="chip-default" aria-labelledby="chips">
                                <ChipsDirective>
                                    <ChipDirective text="Apple" cssClass="e-primary"></ChipDirective>
                                    <ChipDirective text="Microsoft" cssClass="e-info"></ChipDirective>
                                    <ChipDirective text="Google" cssClass="e-success"></ChipDirective>
                                    <ChipDirective text="Tesla" cssClass="e-warning"></ChipDirective>
                                    <ChipDirective text="Intel" cssClass="e-danger"></ChipDirective>
                                </ChipsDirective>
                            </ChipListComponent>
                        </div>

                        <div className="separator"></div>

                        <div id="inputChips" className="chips-headers">Input Chips</div>

                        <div className="sample-padding">
                            {/* initialize avatar chip component */}
                            <ChipListComponent id="chip-avatar" enableDelete={true} aria-labelledby="inputChips">
                                <ChipsDirective>
                                    <ChipDirective text="Anne" leadingIconCss="anne"></ChipDirective>
                                    <ChipDirective text="Janet" leadingIconCss="janet"></ChipDirective>
                                    <ChipDirective text="Laura" leadingIconCss="laura"></ChipDirective>
                                    <ChipDirective text="Margaret" leadingIconCss="margaret"></ChipDirective>
                                </ChipsDirective>
                            </ChipListComponent>
                        </div>

                        <div className="separator"></div>

                        <div id="filterChips" className="chips-headers">Filter Chips</div>

                        <div className="sample-padding">
                            {/* initialize filter chip component */}
                            <ChipListComponent id="chip-filter" selectedChips={[1, 3]} selection="Multiple" aria-labelledby="filterChips">
                                <ChipsDirective>
                                    <ChipDirective text="Extra small" ></ChipDirective>
                                    <ChipDirective text="Small" ></ChipDirective>
                                    <ChipDirective text="Medium" ></ChipDirective>
                                    <ChipDirective text="Large" ></ChipDirective>
                                    <ChipDirective text="Extra large" ></ChipDirective>
                                </ChipsDirective>
                            </ChipListComponent>
                        </div>

                        <div className="separator"></div>

                        <div id="choiceChips" className="chips-headers">Choice Chips</div>

                        <div className="sample-padding">
                            {/* initialize choice chip component */}
                            <ChipListComponent id="chip-choice" selection="Single" cssClass="e-outline" selectedChips={[1]} aria-labelledby="choiceChips">
                                <ChipsDirective>
                                    <ChipDirective text="Send a text" leadingIconCss="text"></ChipDirective>
                                    <ChipDirective text="Set a reminder" leadingIconCss="alarm"></ChipDirective>
                                    <ChipDirective text="Read my emails" leadingIconCss="mail"></ChipDirective>
                                    <ChipDirective text="Play a game" leadingIconCss="game"></ChipDirective>
                                </ChipsDirective>
                            </ChipListComponent>
                        </div>
                    </div>
                </div >
                <div id="action-description">
                    <p>This sample demonstrates the default functionalities of Chips with different types and predefined styles. Click
        and interact the chip, to select single or multiple options from chips collection.</p>
                </div>
                <div id="description">
                    <p>
                        Chip is a small block of essential information that triggers an event on click action. It contains the text, an
                        image, or both, mostly used in contacts, mails or filter tags.
    </p>
                    <p>In this sample, default, input, filter and choice chips are demonstrated with their default functionalities.</p>
                    <ol>
                        <li><b>Input chip</b>– Basic chip with delete icon, enables to remove chips from the chip list collection.</li>
                        <li><b>Choice chip</b> – Used to choose a choice from available options.</li>
                        <li><b>Filter chip</b> – Used to select multiple choices from available options.</li>
                    </ol>
                </div>
            </div >
        )
    }
}
