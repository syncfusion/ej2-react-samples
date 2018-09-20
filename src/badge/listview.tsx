import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import './listview.css';

export class ListView extends SampleBase<{}, {}> {

    // Datasource for listview, badge field is the class data for Badges
    public dataSource: { [key: string]: Object }[] = [
        { id: 'p_01', text: 'Primary', messages: '3 New', badge: 'e-badge e-badge-primary', icons: 'primary', type: 'Primary' },
        { id: 'p_02', text: 'Social', messages: '27 New', badge: 'e-badge e-badge-secondary', icons: 'social', type: 'Primary' },
        { id: 'p_03', text: 'Promotions', messages: '7 New', badge: 'e-badge e-badge-success', icons: 'promotion', type: 'Primary' },
        { id: 'p_04', text: 'Updates', messages: '13 New', badge: 'e-badge e-badge-info', icons: 'updates', type: 'Primary' },
        { id: 'p_05', text: 'Starred', messages: '', badge: '', icons: 'starred', type: 'All Labels' },
        { id: 'p_06', text: 'Important', messages: '2 New', badge: 'e-badge e-badge-danger', icons: 'important', type: 'All Labels' },
        { id: 'p_07', text: 'Sent', messages: '', badge: '', icons: 'sent', type: 'All Labels' },
        { id: 'p_08', text: 'Outbox', messages: '', badge: '', icons: 'outbox', type: 'All Labels' },
        { id: 'p_09', text: 'Drafts', messages: '7 New', badge: 'e-badge e-badge-warning', icons: 'draft', type: 'All Labels' },
    ];

    // Map fields
    public fields: object = { groupBy: 'type' };

    public listTemplate(data: any): JSX.Element {
        return (
            <div className='listWrapper' style={{ width: 'inherit', height: 'inherit' }}>
                <span className={`${data.icons} list_svg`}>&nbsp;</span>
                <span className='list_text'>{data.text}</span>
                <span className={data.badge} style={{ float: 'right', marginTop: '16px', fontSize: '12px' }}>
                    {data.messages}</span>
            </div>
        );
    }
    public onActionComplete() {
        let list: HTMLElement = document.getElementById('lists').getElementsByClassName('e-list-group-item')[0] as HTMLElement;
        list.style.display = 'none';
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className="sample_container badge-list">
                        {/* Listview element */}
                        <ListViewComponent id="lists" dataSource={this.dataSource} fields={this.fields} headerTitle='Inbox' showHeader={true} template={this.listTemplate as any} actionComplete={this.onActionComplete.bind(this)} ></ListViewComponent>
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
            </div>
        )
    }
}
