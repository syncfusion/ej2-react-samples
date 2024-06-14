/**
 * Selection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { ShapeSettingsModel } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective, IShapeSelectedEventArgs, Selection, Highlight, MapsTooltip, Legend } from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import * as usa from './map-data/usa.json';
import * as data from './map-data/selection-datasource.json';
let datasource: any = data as any;
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #container{
        margin-top: -10px;        
    }
    .tip {
        border: 1px solid #4D4D4D;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        border-radius: 7px;
        margin-right: 25px;
        min-width: 110px;
        padding-top: 9px;
        padding-right: 10px;
        padding-left: 10px;
        width: auto;
        height: auto;
        background: #4D4D4D;
    }
    .popup {
        border: 0.5px groove #CCCCCC;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
        left: 70%;
        top: 65%;   
        margin-bottom: 2em;
        border-radius: 2px;
        display: none;
        max-width: 220px;
        position: absolute;
        padding: 1em;
        background: #F4F4F4;
    }
    .close-btn {
        border: 2px solid #5B5B5B;
        margin-left: -9px;
        position: absolute;
        opacity: 0.8;
        background-color: #605F61;
        border-radius: 50%/50%;
        width: 20px;
        height: 19px;
        display: none;
        z-index: 1000;
    }
    .close-btn a {
        margin-left: 2px;
        font-weight: bold;
        color: white;
        text-decoration: none;
    }
    #closebutton {
        float:right;
        font-size:16px; 
        display:inline-block; 
        padding:2px 5px; 
        cursor:pointer; 
    }
    .firstLine td{
        border-bottom: 2px solid black;
    }`;
interface PopulationData {
    State?: string;
    Candidate?: string;
    Trump?: string;
    Clinton?: string;
}
const SelectionMaps = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [popup, setPopup] = useState<string>('none');
    const [closebutton, setClosebutton] = useState({
        display: '',
        top: '',
        left: '',
        color: ''
    });
    const [winner, setWinner] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [trumpvote, setTrumpvote] = useState<string>('');
    const [clintonvote, setClintonvote] = useState<string>('');
    let shapeSetting: ShapeSettingsModel = {
        colorValuePath: 'Candidate',
        colorMapping: [
            { value: 'Trump', color: '#D84444' },
            { value: 'Clinton', color: '#316DB5' },
        ],
    };
    const onMapsLoad = (): void => {
        let maps: Element = document.getElementById('container');
        maps.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as MapsTheme;
        // custom code end
    };
    const shapeSelected = (args: IShapeSelectedEventArgs): void => {
        if (args.shapeData !== isNullOrUndefined) {
            setPopup('block');
            setClosebutton({
                display: 'block',
                top: '-15px',
                left: '206px',
                color: 'black',
            });
            setState((args.data as PopulationData).State);
            setWinner((args.data as PopulationData).Candidate);
            setTrumpvote((args.data as PopulationData).Trump);
            setClintonvote((args.data as PopulationData).Clinton);
        }
    }
    const closeButtonClick = () => {
        setPopup('none');
        setClosebutton({ ...closebutton, display: 'none' });
    };
    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-12'>
                    <MapsComponent id="container" loaded={onMapsLoad} load={load} zoomSettings={{ enable: false }} titleSettings={{ text: 'USA Election Results - 2016', textStyle: { size: '16px' } }} legendSettings={{ visible: true, mode: 'Interactive', position: 'Top', width: '80%', textStyle: { fontWeight: '400', size: '14px' } }} shapeSelected={shapeSelected.bind(this)}>
                        <Inject services={[MapsTooltip, Selection, Highlight, Legend]} />
                        <LayersDirective>
                            <LayerDirective shapeData={usa} shapePropertyPath='name' shapeDataPath='State' dataSource={datasource} tooltipSettings={{ visible: false }} highlightSettings={{ enable: true, fill: '#A3B0D0' }} selectionSettings={{ enable: true, fill: '#4C515B', opacity: 1 }} shapeSettings={shapeSetting} />
                        </LayersDirective>
                    </MapsComponent>
                </div>
                <div className="popup" id="closepopu" style={{ display: popup }}>
                    <span id="closebutton" style={closebutton} onClick={closeButtonClick}>x</span>
                    <table role='none' style={{ marginTop: '5px', width: 'auto' }}>
                      <tbody>
                        <tr>
                            <td style={{ padding: '0.3px', float: 'left' }}>
                                <label id="winner" style={{ color: '#666666', fontSize: 12, fontFamily: 'Roboto', fontWeight: 700 }}>{winner}</label>
                            </td>
                        </tr>
                        <tr style={{ borderTop: '1px' }}>
                            <td style={{ padding: '0.3px', float: 'left' }}>
                                <label style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal' }}>State</label>
                            </td>
                            <td style={{ padding: '0.3px', float: 'left' }}>
                                <label style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' }}>:</label>
                            </td>
                            <td style={{ padding: '0.3px', float: 'left' }}>
                                <label id="state" style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' }}>{state}</label>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.3px', float: 'left' }}>
                                <label style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal' }}>Trump  </label>
                            </td>
                            <td style={{ padding: '0.3px', float: 'left' }}>
                                <label style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' }}>:</label>
                            </td>
                            <td style={{ padding: '0.3px', float: 'left' }}>
                                <label id="trumpvotes" style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' }}>{trumpvote}</label>
                            </td>
                            <td style={{ float: 'left', fontFamily: 'normal', color: "black" }}>
                                <label>%</label>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.3px', float: 'left' }}>
                                <label style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal' }}>Clinton  </label>
                            </td>
                            <td style={{ padding: '0.3px', float: 'left' }}>
                                <label style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' }}>:</label>
                            </td>
                            <td style={{ padding: '0.3px', float: 'left' }}>
                                <label id="clintonvotes" style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' }}>{clintonvote}</label>
                            </td>
                            <td style={{ padding: '0', float: 'left', fontFamily: 'normal', color: "black" }}>
                                <label>%</label>
                            </td>
                        </tr>
                       </tbody>
                    </table>
                </div>
            </div>
            {/* Source Link */}
            <div style={{ float: 'right', marginRight: '10px' }}>
                Source:<a href="https://en.wikipedia.org/wiki/United_States_presidential_election,_2016" target="_blank">en.wikipedia.org</a>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Maps sample">
                <p>This sample visualizes USA president election results in the year 2016. Vote details of a state will be displayed in a popup on clicking a state. Placed interactive legend at the top of the map.</p>
            </section>
            <section id="description" aria-label="Description of the Maps features demonstrated in this sample">
                <p>In this example, you can see how to apply various styles for a shape in the map, when it is clicked or mouse hovered.</p>
                <br />
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Maps component features are segregated into individual feature-wise modules. To use selection, inject the <code>Selection</code> module using the <code>Maps.Inject(Selection)</code> method, and use highlight by injecting the <code>Highlight</code> module.
                </p>
            </section>
        </main>
    )
}
export default SelectionMaps;