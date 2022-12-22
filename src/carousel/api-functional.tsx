import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselButtonVisibility, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent, ChangeEventArgs as DropdownChangeArgs } from '@syncfusion/ej2-react-dropdowns';
import { SwitchComponent, ChangeEventArgs as ButtonChangeArgs } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './api.css';

function API() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let carouselObj: CarouselComponent;

    function itemTemplate1(): JSX.Element {
        return (<figure className="img-container">
            <img src="src/carousel/images/bridge.jpg" alt="bridge" style={{ height: "100%", width: "100% " }} />
            <figcaption className="img-caption">Showing 1 of 5</figcaption>
        </figure>);
    }
    function itemTemplate2(): JSX.Element {
        return (<figure className="img-container">
            <img src="src/carousel/images/trees.jpg" alt="spring_trees" style={{ height: "100%", width: "100% " }} />
            <figcaption className="img-caption">Showing 2 of 5</figcaption>
        </figure>);
    }
    function itemTemplate3(): JSX.Element {
        return (<figure className="img-container">
            <img src="src/carousel/images/waterfall.jpg" alt="waterfall" style={{ height: "100%", width: "100% " }} />
            <figcaption className="img-caption">Showing 3 of 5</figcaption>
        </figure>);
    }
    function itemTemplate4(): JSX.Element {
        return (<figure className="img-container">
            <img src="src/carousel/images/sea.jpg" alt="sea" style={{ height: "100%", width: "100% " }} />
            <figcaption className="img-caption">Showing 4 of 5</figcaption>
        </figure>);
    }
    function itemTemplate5(): JSX.Element {
        return (<figure className="img-container">
            <img src="src/carousel/images/rocks.jpeg" alt="rocks" style={{ height: "100%", width: "100% " }} />
            <figcaption className="img-caption">Showing 5 of 5</figcaption>
        </figure>);
    }
    const showArrowsData: Record<string, any>[] = [
        { text: 'Hidden', value: 'Hidden' },
        { text: 'Visible', value: 'Visible' },
        { text: 'On Hover', value: 'VisibleOnHover' }
    ];
    const showArrowsField: Record<string, any> = { text: 'text', value: 'value' };
    function showArrowsStateChange(args: DropdownChangeArgs): void {
        carouselObj.buttonsVisibility = args.value as CarouselButtonVisibility;
        carouselObj.dataBind();
    }

    const intervalData: Record<string, any>[] = [
        { text: '3 Seconds', value: 3000 },
        { text: '5 Seconds', value: 5000 },
        { text: '7 Seconds', value: 7000 }
    ];
    const intervalField: Record<string, any> = { text: 'text', value: 'value' };
    function intervalStateChange(args: DropdownChangeArgs): void {
        carouselObj.interval = args.value as number;
        carouselObj.dataBind();
    }

    function autoPlayStateChange(args: ButtonChangeArgs): void {
        carouselObj.autoPlay = args.checked as boolean;
        carouselObj.dataBind();
    }

    function infiniteLoopStateChange(args: ButtonChangeArgs): void {
        carouselObj.loop = args.checked as boolean;
        carouselObj.dataBind();
    }

    function showIndicatorStateChange(args: ButtonChangeArgs): void {
        carouselObj.showIndicators = args.checked as boolean;
        carouselObj.dataBind();
    }

    function showPlayStateChange(args: ButtonChangeArgs): void {
        carouselObj.showPlayButton = args.checked as boolean;
        carouselObj.dataBind();
    }

    return (
        <div className='control-pane'>
            <div className='col-lg-8 control-section api-carousel-section'>
                <div className='control-wrapper carousel-sample'>
                    {/* Render the Carousel Component */}
                    <CarouselComponent ref={(carousel) => { carouselObj = carousel }} cssClass="api-carousel" interval={3000}>
                        <CarouselItemsDirective>
                            <CarouselItemDirective template={itemTemplate1.bind(this)} />
                            <CarouselItemDirective template={itemTemplate2.bind(this)} />
                            <CarouselItemDirective template={itemTemplate3.bind(this)} />
                            <CarouselItemDirective template={itemTemplate4.bind(this)} />
                            <CarouselItemDirective template={itemTemplate5.bind(this)} />
                        </CarouselItemsDirective>
                    </CarouselComponent>
                </div>
            </div>
            <div className='col-lg-4 property-section api-carousel-section'>
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table'>
                        <tbody>
                            <tr>
                                <td>Enable Autoplay</td>
                                <td>
                                    <div>
                                        <SwitchComponent id="autoPlay" checked={true} change={autoPlayStateChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Infinite Looping</td>
                                <td>
                                    <div>
                                        <SwitchComponent id="infiniteLoop" checked={true} change={infiniteLoopStateChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td >Show Indicators</td>
                                <td>
                                    <div>
                                        <SwitchComponent id="showIndicator" checked={true} change={showIndicatorStateChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Show Play Button</td>
                                <td>
                                    <div>
                                        <SwitchComponent id="showPlay" checked={false} change={showPlayStateChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Show Arrows</td>
                                <td>
                                    <div>
                                        <DropDownListComponent id='showArrows' dataSource={showArrowsData} fields={showArrowsField}
                                            value={'Visible'} change={showArrowsStateChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Slide Interval</td>
                                <td>
                                    <div>
                                        <DropDownListComponent id='interval' dataSource={intervalData} fields={intervalField}
                                            value={3000} change={intervalStateChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the properties available in the <a href="https://www.syncfusion.com/react-ui-components/react-carousel" target="_blank">React Carousel</a> component.
                </p>
            </div>
            <div id="description">
                <p>
                    In this demo,  you can manually change the properties of the <code>React Carousel</code> component like <code>autoPlay</code>, <code>buttonsVisibility</code>, <code>showIndicators</code>,
                    <code>interval</code>, <code>showPlayButton</code>, <code>loop</code> using the property panel.
                </p>
                <p>
                    More information about the properties available in the Carousel component can be found in this <a target='_blank'
                        href="https://ej2.syncfusion.com/documentation/api/carousel/">documentation section</a>.
                </p>
            </div>
        </div >
    );
}
export default API;
