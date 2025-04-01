import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './card.component.css'

// tslint:disable:max-line-length

// *  Sample for CSS Basic Layout Cards.

export class Flip extends SampleBase<{}, {}> {

    rendereComplete() {
        /* On click event for flip the card*/
        document.getElementById('card_flip').onclick = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget) as HTMLElement;
            if (cardEle.classList.contains('e-flipped')) {
                cardEle.classList.remove('e-flipped');
            } else {
                cardEle.classList.add('e-flipped');
            }
        };

        /* On blur event for flip the card*/
        document.getElementById('card_flip').onblur = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget) as HTMLElement;
            cardEle.classList.remove('e-flipped');
        };

        /* On click event for flip the card*/
        document.getElementById('card_flip_profile').onclick = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget) as HTMLElement;
            if (cardEle.classList.contains('e-flipped')) {
                cardEle.classList.remove('e-flipped');
            } else {
                cardEle.classList.add('e-flipped');
            }
        };

        /* On blur event for flip the card*/
        document.getElementById('card_flip_profile').onblur = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget) as HTMLElement;
            cardEle.classList.remove('e-flipped');
        };


    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section card-control-section flip_card_layout'>
                    <div className="e-card-resize-container">
                        <div className='row'>
                            <div className="row card-layout">
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="e-card e-business e-flip" id="card_flip" title="Click to flip the Card">
                                        <div className="e-card-header e-front">
                                            <div className="e-card-header-caption">
                                                <div className="e-card-header-title">Mayumi Ohno</div>
                                                <div className="e-card-sub-title">Marketing Representative</div>
                                            </div>
                                        </div>
                                        <div className="e-card-actions e-front">
                                            <button className="e-card-btn">
                                                <div className="e-email e-card-btn-txt">mayum@mail.com</div>
                                            </button>
                                            <button className="e-card-btn">
                                                <div className="e-email e-card-btn-txt">011-232-221</div>
                                            </button>
                                            <button className="e-card-btn">
                                                <div className="e-email e-card-btn-txt">www.mayum.com</div>
                                            </button>
                                        </div>
                                        <div className="e-card-header e-back">
                                            <div className="e-card-header-caption">
                                                <div className="e-card-header-title">Address</div>
                                                <div className="e-card-sub-title">
                                                    P.O. Box 78934
                                            <br /> New Orleans
                                            <br />Los Angeles
                                            <br /> Postal Code: 70117
                                            <br /> USA
                                            </div></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="e-card e-business e-flip" id="card_flip_profile" title="Click to flip the Card">
                                        <div className="e-card-header e-back">
                                            <div className="e-card-header-caption">
                                                <div className="e-card-header-title">Address</div>
                                                <div className="e-card-sub-title">
                                                    970 Drummond Street
                                            <br /> New York
                                            <br />New Jersey
                                            <br /> Postal Code: 07102
                                            <br /> USA
                                        </div> </div>
                                        </div>
                                        <div className="e-card-front e-front">
                                            <div className="e-card-header e-card-right" style={{ justifyContent: 'flex-end' }}>
                                                <div className="e-card-header-image"></div>
                                            </div>
                                            <div className="e-card-header e-card-right" style={{ textAlign: 'right' }}>
                                                <div className="e-card-header-caption">
                                                    <div className="e-card-header-title">Creative One</div>
                                                </div>
                                            </div>
                                            <div className="e-card-header e-card-left" style={{ textAlign: 'left' }}>
                                                <div className="e-card-header-caption">
                                                    <div className="e-card-header-title">John Doe</div>
                                                    <div className="e-card-sub-title">Architecture</div>
                                                </div>
                                            </div>
                                            <div className="e-card-separator e-card-left"></div>
                                            <div className="e-card-content e-card-left" style={{ textAlign: 'left' }}>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>johndoe@mail.com</td>
                                                    </tr>
                                                    <tr>
                                                        <td>011-141-221</td>
                                                    </tr>
                                                    <tr>
                                                        <td>www.johndoe.com</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates to flip(rotate) the <code>card</code> to show hidden information which is on back side of the card by clicking
                    or focus-out of it.
                </p>
                </div>
                <div id="description">
                    <p>
                        Cards in this sample have a hidden content within the DOM (Document Object Model), which is set behind the visible card.
                        On the click action handler of front card, the back-side content is shown with a flip animation.
                    </p>
                    <p>
                        More information about Card can be found in this 
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/card/getting-started/">documentation</a> section.
                    </p>
                </div>
            </div>
        );
    }
}