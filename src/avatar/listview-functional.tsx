import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { updateSampleSection } from '../common/sample-base';
import './listview.css';
import { listData } from './datasource';

// *  Sample for CSS avatar component

const Listview = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    // Set customized list template
    const listTemplate = (data: any) => {
        let letterAvatar = <span className='e-avatar e-avatar-small e-avatar-circle'>{data.avatar}</span>
        let imageAvatar = <span className={`${data.pic} e-avatar e-avatar-small e-avatar-circle`}></span>

        return (
            <div className='listWrapper'>
                {data.avatar !== "" ? (letterAvatar) : (imageAvatar)}
                <span className='list-text'>{data.text}</span>
            </div>
        );
    }

    return (
        <div className='control-pane' style ={{marginTop: "10px"}}>
            <div className="sample_container listview">
                {/* ListView element */}
                <ListViewComponent id='letterAvatarList' dataSource={listData} headerTitle='Contacts' showHeader={true} sortOrder="Ascending" template={listTemplate as any}></ListViewComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the integration of avatar component into listview to create contacts applications.</p>
            </div>
            <div id="description">
                <p>
                    The avatar can be used with other components to create various applications.
                    Here, the avatar is used to display images or their initials from the
                    persons contact lists.
                </p>
                <p>
                    Here, the xsmall avatar is used in circle type. To change the size of the
                    avatar to xsmall and circle style, add
                    <code>.e-avatar-xsmall</code> and
                    <code>.e-avatar-circle</code>.
                </p>
            </div>
        </div>
    );    
}
export default Listview;