import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import './card.component.css'
import { LoadingIndicator } from '@syncfusion/ej2-grids';

// tslint:disable:max-line-length

// *  Sample for CSS Basic Layout Cards.

function Reveal(){
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    function rendereComplete() {

        /* On click event for Revealing hidden card elements*/
        document.getElementById('showcarddata').onclick = () => {
            let cEle: HTMLElement = document.getElementById('card_revealed');
            let cardEle: HTMLElement = cEle.parentNode.parentNode as HTMLElement;
            let revealEle: HTMLElement = cardEle.querySelector('#card_reveal') as HTMLElement;
            revealEle.classList.add('e-reveal-show');
            revealEle.classList.remove('e-reveal-hide');
            let revealedEle: HTMLElement = cardEle.querySelector('#card_revealed') as HTMLElement;
            revealedEle.classList.add('e-reveal-hide');
            revealedEle.classList.remove('e-reveal-show');
        };

        document.getElementById('showcarddata_icon').onclick = () => {
            let cEle: HTMLElement = document.getElementById('card_revealed') as HTMLElement;
            let cardEle: HTMLElement = cEle.parentNode.parentNode as HTMLElement;
            let revealEle: HTMLElement = cardEle.querySelector('#card_reveal') as HTMLElement;
            revealEle.classList.add('e-reveal-show');
            revealEle.classList.remove('e-reveal-hide');
            let revealedEle: HTMLElement = cardEle.querySelector('#card_revealed') as HTMLElement;
            revealedEle.classList.add('e-reveal-hide');
            revealedEle.classList.remove('e-reveal-show');
        };

        /* On click event for hidden Revealled card elements*/
        document.getElementById('card-reveal_collapse').onclick = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget as HTMLElement).parentNode.parentNode.parentElement as HTMLElement;
            let revealEle: HTMLElement = cardEle.querySelector('#card_reveal') as HTMLElement;
            revealEle.classList.add('e-reveal-hide');
            revealEle.classList.remove('e-reveal-show');
            let revealedEle: HTMLElement = cardEle.querySelector('#card_revealed') as HTMLElement;
            revealedEle.classList.add('e-reveal-show');
            revealedEle.classList.remove('e-reveal-hide');
        };
    }


        return (
            <div className='control-pane'>
                <div className='control-section card-control-section reveal_card_layout'>
                    <div className="e-card-resize-container">
                        <div className='row'>
                            <div className="row card-layout">
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <div className="e-card" style={{ textAlign: 'center' }}>
                                        <img className="img-responsive" src="./src/card/images/Tile_4.png" alt="Force.com Succinctly" />
                                        <div id="card_revealed" style={{ minHeight: '177px' }} >
                                            <div className="e-card-content" style={{ lineHeight: '2.75em' }}>
                                                <table style={{ width: '100%', tableLayout: 'fixed' }}>
                                                    <tr>
                                                        <td>
                                                            <div style={{ textAlign: 'left', fontWeight: 500 }}> Author </div>
                                                        </td>
                                                        <td>
                                                            <div style={{ textAlign: 'left', width: '80px', whiteSpace: 'nowrap' }}>Steve Fenton</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style={{ textAlign: 'left', fontWeight: 500 }}>Published on</div>
                                                        </td>
                                                        <td>
                                                            <div style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>July 7, 2014</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style={{ textAlign: 'left', fontWeight: 500 }}>Pages</div>
                                                        </td>
                                                        <td>
                                                            <div style={{ textAlign: 'left' }}>82</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="e-card-actions">
                                                                <button id="showcarddata" className="e-btn e-outline e-primary">
                                                                    Know More
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td style={{ textAlign: 'right' }}>
                                                            <div className="e-card-actions">
                                                                <button className="e-card-btn" id="showcarddata_icon" title="Click to see more...">
                                                                    <span className="e-btn-icon e-icons e-reveal-icon e-icon-right" style={{ margin: '0px' }}></span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <div id="card_reveal" style={{ minHeight: '154px' }}>
                                            <div className="e-card-header">
                                                <div className="e-card-header-caption">
                                                    <div className="e-card-header-title">TypeScript</div>
                                                </div>
                                                <div id="card-reveal_collapse" title="Click to see back...">
                                                    <span className="e-icons e-collapse" style={{ height: '5px' }}></span>
                                                </div>
                                            </div>
                                            <div className="e-card-content" style={{ lineHeight: '1.4em' }}>
                                                Microsoft has done extensive work to make JavaScript easier to use. Microsoft TypeScript extends many familiar features of .NET programming to JavaScript.
                                            </div>
                                            <div className="e-card-actions e-card-vertical">
                                                <a href="https://www.syncfusion.com/ebooks/typescript" target="_blank"> Go to Download </a>
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
                        This sample demonstrates rendering the <code>card</code> with reveal layouts. Hidden information of card can be revealed to see while
        clicking “Know more”.
    </p>
                </div>
                <div id="description">
                    <p>
                        Cards in this sample have a hidden content within the DOM which is available behind the visible element.
        <p> More information about Card can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/card/getting-started/">
                                documentation</a> section. </p>
                    </p>
                </div>
            </div>
        );

}
export default Reveal;