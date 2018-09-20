/**
 * Projection sample
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapAjax } from '@syncfusion/ej2-maps';
import {
    MapsComponent, Inject, ILoadedEventArgs, MapsTheme, LayersDirective, LayerDirective,
    ProjectionType, Selection, ISelectionEventArgs
} from '@syncfusion/ej2-react-maps';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
const SAMPLE_CSS = `
#control-container {
    padding: 0px !important;
}
#seat-parent {
    text-align: center;
    cursor: pointer
}
#selectedseats {
    padding: 10px;
}
#selectedseats, #seat-info {             
    font-size: 14px;
}
#clear-btn {
    padding: 10px;
    border: 2px solid rgb(241, 235, 247);
    border-radius: 8px;
    background: rgb(246, 245, 248);
    color: black;
    font-size: 14px;
}
#sampletitle {
    padding-left:30px;
    font-size:20px;
    font-weight:400;
}
.seats {
    padding-top: 15px;
    font-weight: bold;
}`;
interface SeatInfo {
    seatno?: number;
    fill?: string;
}
let seatInfo: HTMLDivElement;
export class SeatBookingMaps extends SampleBase<{}, {}> {
    private mapInstance: MapsComponent;
    private shapeSelected(args: ISelectionEventArgs): void {
        seatInfo = document.getElementById('selectedseats') as HTMLDivElement;
        if ((args.shapeData as SeatInfo).fill === 'Orange') {
            args.fill = 'Orange !important';
            document.getElementById(args.target).setAttribute('class', 'ShapeselectionMapStyle');
            return;
        }
        args.fill = 'green';
        let seat: number = (args.shapeData as SeatInfo).seatno;
        let connector: string = ' ';
        if (seatInfo.innerHTML === '') {
            seatInfo.innerHTML = '<span id="seat-info">Seats Selected -</span>';
        } else {
            connector = ', ';
        }
        let seatString: string = '<span class="seats">' + connector + seat + '</span>';
        let seatString1: string = ' ' + seat + '</span><span class="seats">,'; // 15</span><span class="seats">,
        let lastString: string = '<span id="seat-info">Seats Selected -</span><span class="seats"> ' + seat + '</span>';
        if (seatInfo.innerHTML.indexOf(seatString) === -1 && seatInfo.innerHTML.indexOf(seatString1) === -1 &&
            seatInfo.innerHTML.indexOf(lastString) === -1) {
            seatInfo.innerHTML += '<span class="seats">' + connector + seat + '</span>';
        } else {
            seatInfo.innerHTML = seatInfo.innerHTML.replace(seatString, '');
            seatInfo.innerHTML = seatInfo.innerHTML.replace(seatString1, '');
            if (seatInfo.innerHTML === lastString) {
                seatInfo.innerHTML = '';
            }
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                    <div style={{width:200,margin:'auto',paddingBottom:20}}>
                          <img src="src/maps/images/bus-icon.png" style={{width:25,height:25,float:'left'}}>
                          </img>
                          <div id="sampletitle">Bus seat selection</div>
                    </div>
                    <div style={{border:'3px solid darkgray',width:200,display:'block',margin:'auto'}}>
                    <img src="src/maps/images/wheel.png" style={{width:30,height:30,marginLeft:'18%',marginTop:10}}></img>
                        <MapsComponent id="maps" loaded={this.onMapsLoad.bind(this)} load={this.load} ref={m => this.mapInstance = m} 
                         zoomSettings={{
                                enable: false
                            }}
                           height = "400"
                            itemSelection={this.shapeSelected.bind(this)}
                        >
                            <Inject services={[Selection]} />
                            <LayersDirective>
                                <LayerDirective shapeData={new MapAjax(location.origin + location.pathname + 'src/maps/map-data/seat-selection.json')} geometryType='Normal'
                                    shapeSettings={{
                                        colorValuePath: 'fill'
                                    }}
                                    selectionSettings={{
                                        enable: true,
                                        opacity: 1,
                                        enableMultiSelect: true
                                    }}
                                >
                                </LayerDirective>
                            </LayersDirective>
                        </MapsComponent>
                    </div>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Seat Selection'>
                            <table id='property' className='property-panel-table' style={{ width: '100%' }}>
                                <tbody>
                                    <tr style={{ height: '30px' }}>
                                        <td>
                                            <div style={{ height: '0', width: '15px', paddingBottom: '5px', backgroundColor: 'gray', borderRadius: '25%' }}></div>

                                            <div id='available' style={{ marginTop: '-25px', marginLeft: '15px' }}>Available</div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '30px' }}>
                                        <td>
                                            <div style={{ height: '0', width: '15px', paddingBottom: '5px', backgroundColor: 'Green', borderRadius: '25%' }}></div>

                                            <div id='selected' style={{ marginTop: '-25px', marginLeft: '15px' }}>Selected</div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '30px' }}>
                                        <td>
                                            <div style={{ height: '0', width: '15px', paddingBottom: '5px', backgroundColor: 'Orange', borderRadius: '25%' }}></div>

                                            <div id='booked' style={{ marginTop: '-25px', marginLeft: '15px' }}>Booked</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br></br>
                            <div id="seat-parent">
                                <span id='clear-btn' onClick={this.clearseats.bind(this)}>Clear Selection</span><br /><br />
                                <div id="selectedseats"></div>
                            </div>
                        </PropertyPane>
                </div >
            </div >
            <div id="action-description">
                <p>
                    This sample demonstrates the rendering of normal geometry type shapes on the map. We have rendered normal geometry type shapes to represent the bus seat selection layout. Available, booked, and selected seats will be displayed in different colors.
                </p>	
                </div>
                <div id="description">
            <p>
              In this example, you can see how to render the normal geometry type shapes on the map. Selection is enabled in this sample. You can use the <code>fill</code>, <code>width</code>, and <code>color</code> properties in the <code>selectionSettings</code> to customize the appearance of the shapes after selection.
            </p>
        <br/>
            <p style={{fontweight: 500}}>Injecting Module</p>
            <p>
             Maps component features are segregated into individual feature-wise modules. To use the selection, inject the <code>Selection</code> module using the <code>Maps.Inject(Selection)</code> method.
            </p>
        </div>
            </div >
        )
    }
    public onMapsLoad(args: ILoadedEventArgs): void {
        let maps: Element = document.getElementById('maps');
        maps.setAttribute('title', '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as MapsTheme;
    };
    private clearseats(): void {
        seatInfo.innerHTML = '';
        let selected: HTMLCollection = document.getElementsByClassName('ShapeselectionMapStyle');
        for (let i: number = 0, length: number = selected.length; i < length; i++) {
            selected[0].setAttribute('class', '');
        }
    }
}