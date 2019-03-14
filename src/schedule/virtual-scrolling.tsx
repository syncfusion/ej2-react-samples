import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective, Inject, ResourcesDirective,
    ResourceDirective, Resize, DragAndDrop, TimelineMonth
} from '@syncfusion/ej2-react-schedule';
import './virtual-scrolling.css';
import { SampleBase } from '../common/sample-base';

/**
 * schedule virtual scrolling sample
 */

export class VirtualScrolling extends SampleBase<{}, {}> {
    private scheduleObj: ScheduleComponent;
    private timelineEventTemplate(props): JSX.Element {
        return (<div className="template-wrap" style={{ background: props.PrimaryColor }}>
            <div className="subject" style={{ background: props.SecondaryColor }}>{props.Subject}</div>
        </div>
        );
    }
    //custom code start
    private generateStaticEvents(start: Date, resCount: number, overlapCount: number): Object[] {
        let data: Object[] = [];
        let id: number = 1;
        for (let i: number = 0; i < resCount; i++) {
            let randomCollection: number[] = [];
            let random: number = 0;
            for (let j: number = 0; j < overlapCount; j++) {
                random = Math.floor(Math.random() * (30));
                random = (random === 0) ? 1 : random;
                if (randomCollection.indexOf(random) !== -1 || randomCollection.indexOf(random + 2) !== -1 ||
                    randomCollection.indexOf(random - 2) !== -1) {
                    random += (Math.max.apply(null, randomCollection) + 10);
                }
                for (let k: number = 1; k <= 2; k++) {
                    randomCollection.push(random + k);
                }
                let startDate: Date = new Date(start.getFullYear(), start.getMonth(), random);
                startDate = new Date(startDate.getTime() + (((random % 10) * 10) * (1000 * 60)));
                let endDate: Date = new Date(startDate.getTime() + ((1440 + 30) * (1000 * 60)));
                data.push({
                    Id: id,
                    Subject: 'Event #' + id,
                    StartTime: startDate,
                    EndTime: endDate,
                    IsAllDay: (id % 10) ? false : true,
                    ResourceId: i + 1
                });
                id++;
            }
        }
        return data;
    }
    //custom code end
    private generateResourceData(startId: number, endId: number, text: string): Object[] {
        let data: { [key: string]: Object }[] = [];
        let colors: string[] = [
            '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
            '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
            '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        for (let a: number = startId; a <= endId; a++) {
            let n: number = Math.floor(Math.random() * colors.length);
            data.push({
                Id: a,
                Text: text + ' ' + a,
                Color: colors[n]
            });
        }
        return data;
    }
    render() {
        return (
            <div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <ScheduleComponent cssClass='virtual-scrolling' ref={schedule => this.scheduleObj = schedule} width='100%'
                            height='650px' selectedDate={new Date(2018, 4, 1)}
                            eventSettings={{
                                dataSource: this.generateStaticEvents(new Date(2018, 4, 1), 300, 12),
                            }}
                            group={{ resources: ['Resources'] }} >
                            <ResourcesDirective>
                                <ResourceDirective field='ResourceId' title='Resource' name='Resources' allowMultiple={true}
                                    dataSource={this.generateResourceData(1, 300, 'Resource')}
                                    textField='Text' idField='Id' colorField='Color'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            < ViewsDirective >
                                <ViewDirective option='TimelineMonth' eventTemplate={this.timelineEventTemplate.bind(this)}
                                    allowVirtualScrolling={true} />
                            </ViewsDirective>
                            < Inject services={[TimelineMonth, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This example illustrates how to dynamically load the resources and events as you scroll through the scheduler.
                        All the events in this example are loaded at the initial rendering of scheduler, but the events in the visible
                        area alone will be rendered. Here, the scheduler is made to dynamically load 300 resources along with the
                        events count of 3600 (300 resources * 12 events).</p>
                </div>
                <div id="description">
                    <p>In this example, the virtual scrolling option is enabled on timeline month view to load the large number of
                        resources and its associated events. To enable the dynamic loading of events and resources in timeline view of
                        Scheduler, set the <code>allowVirtualScrolling</code> property to <code>true</code> within the
                        view-specific settings.</p>
                </div>
            </div>
        );
    }
}
