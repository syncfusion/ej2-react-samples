import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective, Inject, ResourcesDirective, ResourceDirective, TimelineMonth, Month
} from '@syncfusion/ej2-react-schedule';
import './virtual-scrolling.css';
import { SampleBase } from '../common/sample-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { generateResourceData } from './helper';

/**
 * schedule virtual scrolling sample
 */

export class DataVirtualization extends SampleBase<{}, {}> {

    private dataManager: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/react/development/api/VirtualEventData',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });

    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent width='100%'
                            height='650px' selectedDate={new Date(2023, 3, 1)} readonly={true} group={{ resources: ['Resources'] }}
                            eventSettings={{ dataSource: this.dataManager }}>
                            <ResourcesDirective>
                                <ResourceDirective field='ResourceId' title='Resource' name='Resources'
                                    dataSource={generateResourceData(1, 1000, 'Resource')} textField='Text' idField='Id' colorField='Color'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            < ViewsDirective >
                                <ViewDirective option='TimelineMonth' isSelected={true} enableLazyLoading={true} />
                                <ViewDirective option='Month' enableLazyLoading={true} />
                            </ViewsDirective>
                            < Inject services={[TimelineMonth, Month]} />
                        </ScheduleComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This example demonstrates the dynamic retrieval of events on each scroll within the Scheduler.
                        As the content is scrolled, a data-loading request is dispatched to a remote data server.
                        This request specifically aims to load appointments only for the resources currently being displayed.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, the lazy loading option is enabled in timeline month and month views to load 1000 resources, and data from remote service is bound to the Scheduler
                        using the instance of <code><a target="_blank" className='code' href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html">DataManager</a></code>.
                        To enable the on-demand loading of events in the Scheduler, set the <code>enableLazyLoading</code> property to <code>true</code> within the view-specific settings.
                    </p>
                </div>
            </div>
        );
    }
}
