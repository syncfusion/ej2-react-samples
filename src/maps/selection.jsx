/**
 * Selection sample
 */
import * as React from "react";
import { MapAjax } from '@syncfusion/ej2-maps';
import { MapsComponent, Inject, LayersDirective, LayerDirective, Selection, Highlight, MapsTooltip, Legend } from '@syncfusion/ej2-react-maps';
import { SampleBase } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import * as data from './map-data/selection-datasource.json';
let datasource = data;
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
                  cursor:pointer; }
            .firstLine td{
                    border-bottom: 2px solid black;
                }
                  `;
export class SelectionMaps extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-12'>
                        <MapsComponent id="container" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m} zoomSettings={{
            enable: false
        }} titleSettings={{
            text: 'USA Election Results - 2016',
            textStyle: {
                size: '16px'
            }
        }} legendSettings={{
            visible: true,
            mode: 'Interactive',
            position: 'Top',
            width: '80%',
            textStyle: {
                fontWeight: '400',
                size: '14px'
            }
        }} shapeSelected={this.shapeSelected.bind(this)}>
                            <Inject services={[MapsTooltip, Selection, Highlight, Legend]}/>
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax('./src/maps/map-data/usa.json')} shapePropertyPath='name' shapeDataPath='State' dataSource={datasource} tooltipSettings={{
            visible: false
        }} highlightSettings={{
            enable: true,
            fill: '#A3B0D0'
        }} selectionSettings={{
            enable: true,
            fill: '#4C515B',
            opacity: 1
        }} shapeSettings={{
            colorValuePath: 'Candidate',
            colorMapping: [
                {
                    value: 'Trump', color: '#D84444'
                },
                {
                    value: 'Clinton', color: '#316DB5'
                }
            ]
        }}>
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    
                    <div className="popup" id="closepopup">
                    <span id="closebutton">x</span>
                        <table style={{ marginTop: '5px', width: 'auto' }}>
                            <tr>
                                <td style={{ padding: '0.3px', float: 'left' }}>
                                    <label id="winner" style={{ color: '#666666', fontsize: 12, fontfamily: 'Roboto', fontweight: 700 }}></label>
                                </td>
                            </tr>
                            
                            <tr style={{ bordertop: '1px', solid: 'black' }}>
                                <td style={{ padding: '0.3px', float: 'left' }}>
                                    <label style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal' }}>State</label>
                                </td>
                                <td style={{ padding: '0.3px', float: 'left' }}>
                                    <label style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' }}>:</label>
                                </td>
                                <td style={{ padding: '0.3px', float: 'left' }}>
                                    <label id="state" style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' }}></label>
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
                                    <label id="trumpvotes" style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' }}></label>
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
                                    <label id="clintonvotes" style={{ color: 'Black', fontSize: '12px', fontWeight: 'normal', marginLeft: '8px' }}>%</label>
                                </td>
                                <td style={{ padding: '0', float: 'left', fontFamily: 'normal', color: "black" }}>
                                    <label>%</label>
                                </td>
                            </tr>
                        </table>

                      

                    </div>
                </div>
                
                <div style={{ float: 'right', marginright: '10px' }}>Source: 
       <a href="https://en.wikipedia.org/wiki/United_States_presidential_election,_2016" target="_blank">en.wikipedia.org</a>
    </div>
                <div id="action-description">
                    <p>
                    This sample visualizes USA president election results in the year 2016. Vote details of a state will be displayed in a popup on clicking a state. Placed interactive legend at the top of the map.
                    </p>
                </div>
                <div id="description">
                <p>
                In this example, you can see how to apply various styles for a shape in the map, when it is clicked or mouse hovered.
                </p>
            <br />
                <p style={{ fontweight: 500 }}>Injecting Module</p>
                <p>
                   Maps component features are segregated into individual feature-wise modules. To use selection, inject the <code>Selection</code> module using the <code>Maps.Inject(Selection)</code> method, and use highlight by injecting the <code>Highlight</code> module.
                </p>
            </div>  
            </div>);
    }
    onMapsLoad(args) {
        let maps = document.getElementById('container');
        maps.setAttribute('title', '');
    }
    ;
    shapeSelected(args) {
        if (args.shapeData !== isNullOrUndefined) {
            let matched = navigator.userAgent;
            let browser = matched.toLowerCase();
            let isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
            if (isIE11) {
                browser = 'msie';
            }
            let object = args.data;
            let popup = document.getElementById('closepopup');
            let closebutton = document.getElementById('closebutton');
            let winner = document.getElementById('winner');
            let state = document.getElementById('state');
            let trumpvote = document.getElementById('trumpvotes');
            let clintonvote = document.getElementById('clintonvotes');
            popup.style.display = 'block';
            closebutton.style.display = 'block';
            closebutton.style.left = '206px';
            closebutton.style.top = '-15px';
            closebutton.style.color = "black";
            closebutton.onclick = () => {
                let popup = document.getElementById('closepopup');
                let closebutton = document.getElementById('closebutton');
                popup.style.display = 'none';
                closebutton.style.display = 'none';
            };
            if (browser !== 'mozilla') {
                state.innerText = args.data.State;
                winner.innerText = args.data.Candidate;
                trumpvote.innerText = args.data.Trump;
                clintonvote.innerText = args.data.Clinton;
            }
            else {
                state.textContent = args.data.State;
                winner.textContent = args.data.Candidate;
                trumpvote.textContent = args.data.Trump;
                clintonvote.textContent = args.data.Clinton;
            }
        }
    }
}
