import * as React from 'react';
import { Day, Week, WorkWeek, Month, Agenda, ScheduleComponent, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import './resource.css';
import { SampleBase } from '../common/sample-base';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import * as dataSource from './datasource.json';
export class Resource extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], dataSource.resourceSampleData, null, true);
        this.resourceData = [
            { Text: 'Margaret', Id: 1, Color: '#ea7a57' },
            { Text: 'Robert', Id: 2, Color: '#df5286' },
            { Text: 'Laura', Id: 3, Color: '#865fcf' }
        ];
    }
    onChange() {
        let predicate;
        let proxy = this;
        let checkBoxes = [this.ownerOneObj, this.ownerTwoObj, this.ownerThreeObj];
        checkBoxes.forEach((checkBoxObj) => {
            if (checkBoxObj.checked) {
                if (predicate) {
                    predicate = predicate.or('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                }
                else {
                    predicate = new Predicate('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                }
            }
        });
        proxy.scheduleObj.eventSettings.query = new Query().where(predicate);
    }
    render() {
        return (<div className='schedule-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent cssClass='resource' width='100%' height='650px' selectedDate={new Date(2018, 5, 5)} ref={schedule => this.scheduleObj = schedule} eventSettings={{
            dataSource: this.data,
        }}>
                            <ResourcesDirective>
                                <ResourceDirective field='OwnerId' title='Owners' name='Owners' allowMultiple={true} dataSource={this.resourceData} textField='Text' idField='Id' colorField='Color'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
                        </ScheduleComponent>
                    </div>
                </div>
                <div className='col-lg-3 property-section'>
                    <table id="property" title="Resources" className='property-panel-table' style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <CheckBoxComponent ref={checkboxObj => this.ownerOneObj = checkboxObj} value='1' id='margaret' cssClass='margaret' checked={true} label='Margaret' change={this.onChange.bind(this)}></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <CheckBoxComponent ref={checkboxObj => this.ownerTwoObj = checkboxObj} value='2' id='robert' cssClass='robert' checked={true} label='Robert' change={this.onChange.bind(this)}></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <CheckBoxComponent ref={checkboxObj => this.ownerThreeObj = checkboxObj} value='3' id='laura' cssClass='laura' checked={true} label='Laura' change={this.onChange.bind(this)}></CheckBoxComponent>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="action-description">
                    <p>This example demonstrates how to dynamically show or hide the appointments of resources on Scheduler based on
                    the resource selection.</p>
                </div>
                <div id="description">
                    <p>In this example, the resource appointments are dynamically shown or hidden on the Scheduler, by passing the
                    filtered event data of selected resources to the <code>Query</code> option of the <code>Eventsettings</code>.</p>
                </div>
            </div>);
    }
}
