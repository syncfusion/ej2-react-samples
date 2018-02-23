import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import './card.component.css'

// tslint:disable:max-line-length

export class Default extends SampleBase<{}, {}> {

    private basicCardInlinestyle: Object = { 'text-align': 'left', 'min-height': '267px' };
    private deatiledCardTable: Object = { 'width': '100%', 'table-layout': 'fixed' };

    public rendereComplete() {
        /* On click event for flip the card*/
        document.getElementById('e-card-flip').onclick = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget as HTMLElement);
            if (cardEle.classList.contains('e-flipped')) {
                cardEle.classList.remove('e-flipped');
            } else {
                cardEle.classList.add('e-flipped');
            }
        };
        /* On blur event for flip the card*/
        document.getElementById('e-card-flip').onblur = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget as HTMLElement);
            cardEle.classList.remove('e-flipped');
        };

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

        /* On click event for hidden Revealled card elements*/
        document.getElementById('card-reveal_collapse').onclick = (e: Event) => {
            let cardEle: HTMLElement = (e.currentTarget as HTMLElement).parentNode.parentNode as HTMLElement;
            let revealEle: HTMLElement = cardEle.querySelector('#card_reveal') as HTMLElement;
            revealEle.classList.add('e-reveal-hide');
            revealEle.classList.remove('e-reveal-show');
            let revealedEle: HTMLElement = cardEle.querySelector('#card_revealed') as HTMLElement;
            revealedEle.classList.add('e-reveal-show');
            revealedEle.classList.remove('e-reveal-hide');
        };
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section card-control-section basic_layout'>
                    <div className="e-card-resize-container">
                        <div className='row'>
                            <div className="row card-layout" style={{ margin: 0 }}>
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <h5>Basic card</h5>
                                    <div className="e-card" id="basic" tabIndex={0} style={this.basicCardInlinestyle} >
                                        <div className="e-card-header">
                                            <div className="e-card-header-caption">
                                                <div className="e-card-title">Advanced UWP</div>
                                            </div>
                                        </div>
                                        <div className="e-card-separator"></div>
                                        <div className="e-card-content">
                                            Advanced UWP: Communicating with Windows 10 and Other Apps, the second in a five-part series written by Succinctly series
                            author Matteo Pagani. To download the complete white paper, and other papers in the series, visit
                            the White Paper section of Syncfusion’s Technology Resource Portal.
                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <h5>Business card (Flip)</h5>
                                    <div tabIndex={0} className="e-card e-business e-flip" id="e-card-flip" title="Click to flip the Card" style={{ minHeight: '267px' }}>
                                        <div className="e-card-header e-front">
                                            <div className="e-card-header-caption center">
                                                <div className="e-card-header-title">Mayumi Ohno</div>
                                                <div className="e-card-sub-title">Marketing Representative</div>
                                            </div>
                                        </div>
                                        <div className="e-card-actions e-front">
                                            <button className="e-card-btn">
                                                <div className="e-email">mayum@mail.com</div>
                                                <img src="./src/card/images/email.jpg" width="30px" title="Write to" style={{ height: 'auto' }} />
                                            </button>
                                            <button className="e-card-btn">
                                                <div className="e-email">011-232-221</div>
                                                <img src="./src/card/images/call_img.png" width="30px" title="Talk on" style={{ height: 'auto' }} />
                                            </button>
                                            <button className="e-card-btn">
                                                <div className="e-email">www.google.com</div>
                                                <img src="./src/card/images/www.jpg" width="30px" title="Check in" style={{ height: 'auto' }} />
                                            </button>
                                        </div>
                                        <div className="e-card-header e-back">
                                            <div className="e-card-header-caption">
                                                <div className="e-card-header-title">Address</div>
                                            </div>
                                        </div>
                                        <div className="e-card-content e-back">
                                            P.O. Box 78934
                            <br /> New Orleans<br />LosAngeles<br />
                                            PostalCode: 70117<br />
                                            USA
                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <h5>Product card</h5>
                                    <div tabIndex={0} className="e-card e-card-horizontal e-product" style={{ "text-align": "left", "height": "350px" }}>
                                        <div className="e-card-stacked">
                                            <div className="e-card-header">
                                                <div className="e-card-header-caption">
                                                    <div className="e-card-header-title"> iPhone X</div>
                                                    <div className="e-card-sub-title">Marketed by Apple Inc</div>
                                                </div>
                                            </div>
                                            <div className="e-card-content">
                                                The iPhone X has a 5.8-inch diagonal OLED color-accurate screen, has two cameras on the rear. One is a 12-megapixel with
                                support for face detection. It is capable of capturing 4K video at 24, 30 or 60 frames per
                                second. It supports Qi-standard wireless charging.
                            </div>
                                            <div className="e-card-separator"></div>
                                            <div className="e-card-actions">
                                                <button className="e-btn e-outline e-primary">
                                                    <div className="e-size">64GB
                                        <sup>2</sup>
                                                    </div>
                                                    <div>$999</div>
                                                </button>
                                                <button className="e-btn e-outline e-primary" style={{ "margin-left": "7px;" }}>
                                                    <div className="e-size">256GB
                                        <sup>2</sup>
                                                    </div>
                                                    <div>$1149</div>
                                                </button>
                                            </div>
                                        </div>
                                        <img src="./src/card/images/iphone.png" alt="iPhone X" height="350px" style={{ "width": "50%" }} />
                                    </div>
                                </div>

                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <h5>Detailed card (Reveal Card)</h5>
                                    <div className="e-card" style={{ textAlign: "center", height: '350px' }}>
                                        <img className="img-responsive" style={{ height: '196px' }} src="./src/card/images/book.png" alt="Force.com Succinctly" />
                                        <div id="card_revealed" style={{ minHeight: '154px' }}>
                                            <div className="e-card-content" style={{ lineHeight: '2em' }}>
                                                <table style={this.deatiledCardTable}>
                                                    <tr>
                                                        <td>
                                                            <div style={{ textAlign: "left", fontWeight: 500 }}> Author </div>
                                                        </td>
                                                        <td>
                                                            <div style={{ textAlign: "left", whiteSpace: "nowrap", width: '80px' }}>Joseph D. Booth</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style={{ textAlign: "left", fontWeight: 500 }}>Published on</div>
                                                        </td>
                                                        <td>
                                                            <div style={{ textAlign: "left", whiteSpace: "nowrap" }} >July 13, 2016</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div style={{ textAlign: "left", fontWeight: 500 }}>Pages</div>
                                                        </td>
                                                        <td>
                                                            <div style={{ textAlign: "left" }}>80</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2}>
                                                            <div className="e-card-actions">
                                                                <button id="showcarddata" className="e-btn e-outline e-primary">
                                                                    Know More
                                                    <span className="e-btn-icon e-icons e-forward-icon e-icon-right" style={{ margin: "0" }}></span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <div id="card_reveal" style={{ minHeight: "154px" }}>
                                            <div id="card-reveal_collapse" title="Click to see back...">
                                                <span className="e-icons e-collapse" style={{ height: "5px" }}></span>
                                            </div>
                                            <div className="e-card-content" style={{ lineHeight: "1.4em" }}>
                                                GitHub offers unparalleled access for developers to work on projects together,bridging geographical divides to bring teams
                                    together.
                            </div>

                                            <div className="e-card-actions e-card-vertical">
                                                <a href="https://www.syncfusion.com/ebooks/github_succinctly" target="_blank"> Go to Download </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <h5>Explore Card</h5>
                                    <div tabIndex={0} className="e-card e-city e-card-horizontal" id="card_vertical" style={{ height: '394px', width: '100%', textAlign: 'left' }} >
                                        <div className="e-card-stacked" style={{ width: 'calc(100% - 60px)' }}>
                                            <div className="e-card-header" style={{ width: '100%' }}>
                                                <img src="./src/card/images/city.jpg" alt="Washed Out" style={{ width: '60%', height: '360px' }} />
                                                <div className="e-card-content" style={{ width: '40%', paddingLeft: '10px', textAlign: 'inherit', maxHeight: '337px' }}>
                                                    New York City has been described as the cultural, financial, and media capital of the world, and exerts a significant impact
                                    upon commerce, entertainment, research, technology, education, politics, and sports.
                                    The city's fast pace defines the term New York minute.
                                </div>
                                            </div>
                                        </div>
                                        <div className="e-card-actions e-card-vertical" style={{ verticalAlign: 'middle' }}>
                                            <button style={{ padding: '0px', margin: '2px', border: '0px' }}>
                                                <img src="./src/card/images/like.jpg" style={{ height: '40px', width: '40px', margin: '0px' }} />
                                            </button>
                                            <button style={{ padding: '0px', margin: '2px', border: '0px' }}>
                                                <img src="./src/card/images/share.png" style={{ height: '20px', width: '20px', padding: '10px', backgroundColor: '#ffff', margin: '0px' }} /></button>
                                            <button style={{ padding: '0px', margin: '2px', border: '0px' }}>
                                                <img src="./src/card/images/flag_save.png" style={{ height: '20px', width: '20px', padding: '10px', backgroundColor: '#ffff', margin: '0px' }} /></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <h5>Profile card</h5>
                                    <div tabIndex={0} className="e-card profile" style={{ height: '394px' }}>
                                        <div className="e-card-image"></div>
                                        <button className="prof" style={{ border: '1px solid #fff' }}></button>
                                        <div className="e-card-header">
                                            <div className="e-card-header-caption center">
                                                <div className="e-card-header-title">Laura Callahan</div>
                                                <div className="e-card-sub-title">Sales Representative, Martketing</div>
                                            </div>
                                        </div>
                                        <div className="e-card-separator"></div>
                                        <div className="e-card-content">
                                            Follow me on Insta @LauraCallahan. Lives in Seattle, United States
                        </div>
                                        <div className="e-card-actions center">
                                            <button className="e-card-btn e-btn e-small e-round e-primary" title="Write">
                                                <img src="./src/card/images/email.png" width="30px" title="Write" style={{ height: 'auto' }} />
                                            </button>
                                            <button className="e-card-btn e-btn e-small e-round e-primary" title="Followers">
                                                <img src="./src/card/images/meeting.png" width="30px" title="Followers" style={{ height: 'auto' }} />
                                            </button>
                                            <button className="e-card-btn e-btn e-small e-round e-primary" title="Activity log">
                                                <img src="./src/card/images/categorize.png" title="Activity log" width="30px" style={{ height: 'auto' }} />
                                            </button>
                                            <button className="e-card-btn e-btn e-small e-round e-primary" title="Posts">
                                                <img src="./src/card/images/flag.png" title="Posts" width="30px" style={{ height: 'auto' }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                    <h5>Weather card</h5>
                                    <div id="weather-bg" className="weather-bg-overlay">
                                        <div className="e-card" style={{ textAlign: 'center' }}>
                                            <div className="e-card-horizontal">
                                                <div className="e-card-stacked e-header-weather">
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-image e-heading-weather"></div>
                                                    </div>
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-caption">
                                                            <div className="e-card-sub-title"> H: 24&#x2103; L: 70 &#x2103;</div>
                                                        </div>
                                                    </div>
                                                    <div className="e-card-title">Amsterdan</div>
                                                </div>
                                                <div className="e-card-stacked e-report" style={{ backgroundColor: 'rgba(0, 0, 0, 0.60)' }}>
                                                    <div className="e-card-title" style={{ fontSize: '40px' }}>25&#x2103;</div>
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-caption">
                                                            <div className="e-card-sub-title">Updated 10:35AM</div>
                                                        </div>
                                                    </div>
                                                    <div className="e-card-horizontal" style={{ backgroundColor: 'orange' }}>
                                                        <div className="e-card-content">15%</div>
                                                        <div className="e-card-content">10km/h</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="e-card-horizontal day-whether">
                                                <div className="e-card-stacked">
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-caption">
                                                            <div className="e-card-sub-title">MON</div>
                                                        </div>
                                                    </div>
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-image e-card-corner e-weather e-weekly-weather"></div>
                                                    </div>
                                                    <div className="e-card-title">19&#x2103;</div>
                                                </div>
                                                <div className="e-card-stacked">
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-caption">
                                                            <div className="e-card-sub-title">TUE</div>
                                                        </div>
                                                    </div>
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-image e-card-corner e-rainy e-weekly-weather"></div>
                                                    </div>
                                                    <div className="e-card-title">23&#x2103;</div>
                                                </div>
                                                <div className="e-card-stacked">
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-caption">
                                                            <div className="e-card-sub-title">WED</div>
                                                        </div>
                                                    </div>
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-image e-card-corner e-cloudy e-weekly-weather"></div>
                                                    </div>
                                                    <div className="e-card-title">21&#x2103;</div>
                                                </div>
                                                <div className="e-card-stacked">
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-caption">
                                                            <div className="e-card-sub-title">THU</div>
                                                        </div>
                                                    </div>
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-image e-card-corner e-slight-sunny e-weekly-weather"></div>
                                                    </div>
                                                    <div className="e-card-title">20&#x2103;</div>
                                                </div>
                                                <div className="e-card-stacked">
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-caption">
                                                            <div className="e-card-sub-title">FRI</div>
                                                        </div>
                                                    </div>
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-image e-card-corner e-summer_rainy e-weekly-weather"></div>
                                                    </div>
                                                    <div className="e-card-title">22&#x2103;</div>
                                                </div>
                                                <div className="e-card-stacked">
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-caption">
                                                            <div className="e-card-sub-title">SAT</div>
                                                        </div>
                                                    </div>
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-image e-card-corner e-sunny e-weekly-weather"></div>
                                                    </div>
                                                    <div className="e-card-title">23&#x2103;</div>
                                                </div>
                                                <div className="e-card-stacked">
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-caption">
                                                            <div className="e-card-sub-title">SUN</div>
                                                        </div>
                                                    </div>
                                                    <div className="e-card-header">
                                                        <div className="e-card-header-image e-card-corner e-hot e-weekly-weather"></div>
                                                    </div>
                                                    <div className="e-card-title">26&#x2103;</div>
                                                </div>
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
                        This sample demonstrates to rendering the
        <code>Card</code> with below different layouts. A business card can be flip(rotate) while clicking and focus-out, Detailed
        card hidden content can be revealed while clicking the forward icon.
    </p>
                </div>
                <div id="description">
                    <p>
                    Card is a small container in which user can show defined content in specific structure and it is a flexible and extensible. More information about Card can be found in this
        <a target="_blank" href="http://ej2.syncfusion.com/documentation/card/getting-started.html">
            documentation</a> section.
        Card can be customized based on the following sections.
    </p>
                    <br></br>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <th>Types</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td style={{ width: "145px" }}>Heading and Content</td>
                            <td>Create a <code>div</code> element and add an <b>e-card-header</b> class and for adding Heading and sub-heading section to header use <b>e-card-header-caption</b>. Further with this you can add images to the header using <b>e-card-header-image</b>.
            </td>
                        </tr>
                        <tr>
                            <td>Image and Title</td>
                            <td>
                                Images can be added to the card structure with <b>e-card-image</b> CSS class and you can also add title to the images using <b>e-card-title</b> class.
            </td>
                        </tr>
                        <tr>
                            <td>Action Buttons</td>
                            <td>
                                You can include buttons within the card and customize them by adding the <code>div</code> element with <b>e-card-actions</b> class followed by button tag or anchor tag with <b>e-card-btn</b> class.
            </td>
                        </tr>
                        <tr>
                            <td>Horizontal Card</td>
                            <td>By default, card elements are stacked one after another vertically as in the DOM. You can customize the card with specific direction by adding <b>e-card-horizontal</b>, to make elements align horizontally.
                <p>Using <b>e-card-stacked</b> class, you can split the horizontal layout with a stacked element on left/right of the card.</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}