import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import './listview.css';
import { dataSource } from './listData';
export class ListView extends SampleBase {
    constructor() {
        super(...arguments);
        // Map fields
        this.fields = { groupBy: 'type' };
    }
    listTemplate(data) {
        return (<div className='listWrapper' style={{ width: 'inherit', height: 'inherit' }}>
                <span className={`${data.icons} list_svg`}>&nbsp;</span>
                <span className='list_text'>{data.text}</span>
                <span className={data.badge} style={{ float: 'right', marginTop: '16px', fontSize: '12px' }}>
                    {data.messages}</span>
            </div>);
    }
    onActionComplete() {
        let list = document.getElementById('lists').getElementsByClassName('e-list-group-item')[0];
        list.style.display = 'none';
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section badge-samples'>
                    <div className="sample_container badge-list">
                        
                        <ListViewComponent id="lists" dataSource={dataSource} fields={this.fields} headerTitle='Inbox' showHeader={true} template={this.listTemplate} actionComplete={this.onActionComplete.bind(this)}></ListViewComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the integration of badges into the listview component to display the new e-mails count.</p>
                </div>

                <div id="description">
                    <p>The badge can be integrated into the listview with the help of templates. The listview uses so many real-time use cases
        with badges to achieve different applications.</p>
                    <p>Here, default badges are used and there is no need to customize the badge size because the component will automatically
                        adjust the size based on the container element.
    </p>
                    <p>In this samples, different types of colors are used to indicate their priorities of the notification.</p>
                </div>
            </div>);
    }
}
