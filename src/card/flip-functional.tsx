import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState } from 'react';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import './card.component.css'

const Flip = () => {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    const [isFlipped1, setIsFlipped1] = useState(true);
    const [class1, setClass1] = useState("e-card e-business e-flip");
    const [isFlipped2, setIsFlipped2] = useState(true);
    const [class2, setClass2] = useState("e-card e-business e-flip");
    const flip1 = () => {
        setIsFlipped1(!isFlipped1);
        setClass1(isFlipped1?'e-card e-business e-flip e-flipped':'e-card e-business e-flip');        
    }
    const flip2 = () => {
        setIsFlipped2(!isFlipped2);
        setClass2(isFlipped2?'e-card e-business e-flip e-flipped':'e-card e-business e-flip');        
    } 

    return (
        <div className='control-pane'>
            <div className='control-section card-control-section flip_card_layout'>
                <div className="e-card-resize-container">
                    <div className='row'>
                        <div className="row card-layout">
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className={class1} id="card_flip" onClick={flip1} title="Click to flip the Card">
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
                                                P.O. Box 78934<br /> 
                                                New Orleans<br />
                                                Los Angeles<br /> 
                                                Postal Code: 70117<br /> 
                                                USA
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div className={class2} id="card_flip_profile" onClick={flip2} title="Click to flip the Card">
                                    <div className="e-card-header e-back">
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title">Address</div>
                                            <div className="e-card-sub-title">
                                                970 Drummond Street<br />
                                                New York<br />
                                                New Jersey<br />
                                                Postal Code: 07102<br /> 
                                                USA
                                            </div>
                                        </div>
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
                                                <tr>
                                                    <td>johndoe@mail.com</td>
                                                </tr>
                                                <tr>
                                                    <td>011-141-221</td>
                                                </tr>
                                                <tr>
                                                    <td>www.johndoe.com</td>
                                                </tr>
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
                <p>This sample demonstrates to flip(rotate) the <code>card</code> to show hidden information which is on back side of the card by clicking or focus-out of it.</p>
            </div>
            <div id="description">
                <p>
                    Cards in this sample have a hidden content within the DOM (Document Object Model), which is set behind the visible card.
                    On the click action handler of front card, the back-side content is shown with a flip animation.
                    <p> More information about Card can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/card/getting-started/">documentation</a> section.
                    </p>
                </p>
            </div>
        </div>
    );    
}
export default Flip;