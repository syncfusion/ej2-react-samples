/**
 * ListView scrolling Sample
 */

import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './template.css';
import { foodData, foodItems } from './listData';
import { Browser, getUniqueID } from '@syncfusion/ej2-base';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';

export class Scrolling extends SampleBase<{}, {}> {
    // Set customized list template
    listTemplate(data: any): JSX.Element {
        let typeValue = data.type === 'veg' ? '#006400' : '#FF0000';
        if (!Browser.isDevice) {
            return (
                <div className ="e-list-wrapper" style={{ borderBottom : "inset"}} >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", whiteSpace: "normal", padding: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center"}}>
                        <img className='e-avatar' src={data.src} alt={data.altText} style={{ background: "#BCBCBC", width: "100px", height: "100px", borderRadius: "4px" }} />
                        <div style={{ marginLeft: "20px", textAlign: "left", maxWidth: "600px", display: "flex", flexDirection: "column" }}>
                            <div style= {{ display: "flex", alignItems: "center" }}>
                                <span style={{ fontSize: "18px", fontWeight: 600, paddingBottom: "3px" }} className="e-headertext">{ data.text }</span>
                                <svg width="12" height="12" style={{ marginLeft: "15px", marginTop: "-2px" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2 1H10C10.5523 1 11 1.44771 11 2V10C11 10.5523 10.5523 11 10 11H2C1.44771 11 1 10.5523 1 10V2C1 1.44771 1.44771 1 2 1ZM0 2C0 0.895432 0.895432 0 2 0H10C11.1046 0 12 0.895432 12 2V10C12 11.1046 11.1046 12 10 12H2C0.895432 12 0 11.1046 0 10V2ZM4 3C3.44771 3 3 3.44771 3 4V8C3 8.55229 3.44771 9 4 9H8C8.55229 9 9 8.55229 9 8V4C9 3.44771 8.55229 3 8 3H4Z" fill={typeValue}/>
                                </svg>
                            </div>
                            <span style={{ fontSize: "16px", paddingBottom: "3px" }}>{ data.price }</span>
                            <div id="id-description" className="e-text-content" style={{ fontSize: "15px" }}>{ data.description }</div>
                            <div className='rating-content'>
                                <RatingComponent id={ getUniqueID('rating') } className='ratings' showTooltip={false} readOnly={true} value={data.rating}></RatingComponent>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="e-list-wrapper e-list-multi-line e-list-avatar" style={{ paddingLeft: "122px", paddingRight: "1.0666em", borderBottom: "inset"}}>
                    <img className="e-avatar" src={data.src} alt={data.altText}/>
                    <span className="e-list-item-header e-headertext" style={{ fontSize: "14px" }}>{ data.text }</span>
                    <svg width="12" height="12" style={{ right: "10px", marginTop: "-15px", position: "absolute" }} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 1H10C10.5523 1 11 1.44771 11 2V10C11 10.5523 10.5523 11 10 11H2C1.44771 11 1 10.5523 1 10V2C1 1.44771 1.44771 1 2 1ZM0 2C0 0.895432 0.895432 0 2 0H10C11.1046 0 12 0.895432 12 2V10C12 11.1046 11.1046 12 10 12H2C0.895432 12 0 11.1046 0 10V2ZM4 3C3.44771 3 3 3.44771 3 4V8C3 8.55229 3.44771 9 4 9H8C8.55229 9 9 8.55229 9 8V4C9 3.44771 8.55229 3 8 3H4Z" fill={typeValue}/>
                    </svg>
                    <div style={{ fontSize: "12px" }}>{ data.price }</div>
                    <span className="e-list-content e-text-overflow" style={{ fontSize: "11px" }} >{ data.description }</span>
                </div>
            );
        }
    }
    
    onListScroll(args: { scrollDirection: string; distanceY: number; }): void {
        let newData: any = [];
        let instance: any= document.getElementById('list-scrolling');
        if (args.scrollDirection === "Bottom") {
            if (args.distanceY < 100) {
                for (let i = 0; i <= foodItems.length - 1; i++) {
                    let newId = instance.ej2_instances[0].getUniqueID('list');
                    newData.push({ text: foodItems[i].text, id: newId, price: foodItems[i].price, src: foodItems[i].src, description: foodItems[i].description, type: foodItems[i].type, rating: foodItems[i].rating });
                }
                instance.ej2_instances[0].addItem(newData);
            }
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div id="listview-scrolling">
                        <p className="displayText">Food Items</p>
                        {/* ListView element */}
                        <ListViewComponent id='list-scrolling' height={500} dataSource={foodData} cssClass = 'e-list-template' scroll={this.onListScroll.bind(this)} template={this.listTemplate as any}></ListViewComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the functionalities of infinite scrolling. When user scrolls to the bottom, new data is fetched and added to the existing list through scroll event. This creates an infinite scrolling effect, enhancing the user experience by loading new data dynamically as needed.
                    </p>
                </div>
                <div id="description" className="descriptionLayout">
                    <p>
                        The Listview control scroll event allows users to load data using a load on demand concept, where buffered data is fetched only when the scrollbar reaches the end of the scroller. Scroll event provides the necessary details to dynamically add the new data to the ListView.
                    </p>
                </div>
            </div>
        )
    }
}