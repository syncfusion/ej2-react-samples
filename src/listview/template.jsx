/**
 * ListView Template Sample
 */
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './template.css';
import { dataSource } from './listData';
export class Template extends SampleBase {
    // Set customized list template
    listTemplate(data) {
        return (<div className={data.category !== undefined ? "clearfix desc e-list-wrapper e-list-multi-line e-list-avatar'" : "clearfix e-list-wrapper e-list-multi-line e-list-avatar"}>
                {data.imgSrc !== "" ?
            <img className='e-avatar' src={`${data.imgSrc}`}/> : ""}
                <span className="e-list-item-header">{data.title} </span>
                <span className="e-list-content e-text-overflow" dangerouslySetInnerHTML={{ __html: data.description }}></span>
                {data.timeStamp !== "" ?
            <div>
                            <div id="list-logo">
                                <span className="bookmark"></span>
                                <span className="comments"></span>
                                <span className="share"></span>
                            </div>
                        <div className="timeStamp">{data.timeStamp}</div></div> : ""}
            </div>);
    }
    onComplete() {
        let instance = document.getElementById('listview_template');
        instance = instance.ej2_instances[0];
        let listHeader = instance.element.childNodes[0];
        let header = listHeader.childNodes[0];
        if (header.style.display === 'none' || listHeader.childNodes.length === 3) {
            if (listHeader.childNodes[2] != null) {
                let childHeader = listHeader.childNodes[2];
                childHeader.remove();
            }
        }
        else {
            let headerEle = instance.element.querySelector('.e-list-header');
            let headerElement = instance.element.querySelector('#list-logo');
            let clone = headerElement.cloneNode(true);
            headerEle.appendChild(clone);
        }
        //Customizing the elements to perform our own events
        this.share = document.getElementsByClassName('share');
        this.comments = document.getElementsByClassName('comments');
        this.bookmark = document.getElementsByClassName('bookmark');
        this.description = document.getElementsByClassName('e-list-content');
        this.timeStamp = document.getElementsByClassName('timeStamp');
        this.postActions();
    }
    // EventHnadler to Comments, BookMarks and Share Icons
    postActions() {
        for (let i = 0; i < this.comments.length; i++) {
            this.comments[i].setAttribute('title', 'We can customize this element to perform our own action');
            this.comments[i].addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
        for (let i = 0; i < this.bookmark.length; i++) {
            this.bookmark[i].setAttribute('title', 'We can customize this element to perform our own action');
            this.bookmark[i].addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
        for (let i = 0; i < this.share.length; i++) {
            this.share[i].setAttribute('title', 'We can customize this element to perform our own action');
            this.share[i].addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
        for (let i = 0; i < this.description.length; i++) {
            this.description[i].addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
        for (let i = 0; i < this.timeStamp.length; i++) {
            this.timeStamp[i].addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    
                    <ListViewComponent id='listview_template' dataSource={dataSource} headerTitle='Syncfusion Blog' showHeader={true} cssClass='e-list-template' actionComplete={this.onComplete.bind(this)} template={this.listTemplate}></ListViewComponent>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the Template functionalities of the ListView. Click any news header or thumbnail to open the
        complete article. To navigate back to the news list, click the back icon at the top left area.
    </p>
                </div>

                <div id="description">
                    <p>The above template represents the customizability of the ListView component. Here, data is loaded from JSON and its value
        is directly mapped to our ListView datasource to load the content.</p>

                    <p>This sample, also have the additional elements like bookmark, comments, and share that can be customized to perform the
        appropriate action by adding our own events.</p>
                </div>
            </div>);
    }
}
