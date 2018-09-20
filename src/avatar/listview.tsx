import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './listview.css';

// tslint:disable:max-line-length

// *  Sample for CSS avatar component

export class Listview extends SampleBase<{}, {}> {

    //Define an array of JSON data
    public data: { [key: string]: Object }[] = [
        { id: 's_01', text: 'Robert', avatar: '', pic: 'pic04' },
        { id: 's_02', text: 'Nancy', avatar: 'N', pic: '' },
        { id: 's_05', text: 'John', pic: 'pic01', avatar: '' },
        { id: 's_03', text: 'Andrew', avatar: 'A', pic: '' },
        { id: 's_06', text: 'Michael', pic: 'pic02', avatar: '' },
        { id: 's_07', text: 'Steven', pic: 'pic03', avatar: '' },
        { id: 's_08', text: 'Margaret', avatar: 'M', pic: '' }
    ];

    public listTemplate(data: any): JSX.Element {
        let letterAvatar = <span className='e-avatar e-avatar-small e-avatar-circle'>{data.avatar}</span>
        let imageAvatar = <span className={`${data.pic} e-avatar e-avatar-small e-avatar-circle`}></span>

        return (
            <div className='listWrapper'>
                {data.avatar !== "" ? (letterAvatar) : (imageAvatar)}
                <span className='list-text'>{data.text}</span>
            </div>
        );
    }

    render() {
        return (
            <div className='control-pane'>
                <div className="sample_container listview">
                    {/* ListView element */}
                    <ListViewComponent id='letterAvatarList' dataSource={this.data} headerTitle='Contacts' showHeader={true}
                        sortOrder="Ascending" template={this.listTemplate as any}></ListViewComponent>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the integration of avatar component into listview to create contacts applications.</p>
                </div>

                <div id="description">
                    <p>The avatar can be used with other components to create various applications. Here, the avatar is used to display images
        or their initials from the persons contact lists.</p>
                    <p>Here, the xsmall avatar is used in circle type. To change the size of the avatar to xsmall and circle style, add
        <code>.e-avatar-xsmall</code> and
        <code>.e-avatar-circle</code>.</p>
                </div>
            </div>

        );
    }
}