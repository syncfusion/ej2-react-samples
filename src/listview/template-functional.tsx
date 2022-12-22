/**
 * ListView Template Sample
 */

 import * as ReactDOM from 'react-dom';
 import * as React from 'react';
 import { ListViewComponent } from '@syncfusion/ej2-react-lists';
 import { updateSampleSection } from '../common/sample-base';
 import './template.css';
 import { dataSource } from './listData';
 
 function Template() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    //Customizing the elements to perform our own events
    let share: any;
    let comments: any;
    let bookmark: any;
    let description: any;
    let timeStamp: any;
    // Set customized list template
    function listTemplate(data: any): JSX.Element {
        return (

            <div className={data.category !== undefined ? "clearfix desc e-list-wrapper e-list-multi-line e-list-avatar'" : "clearfix e-list-wrapper e-list-multi-line e-list-avatar"} >
                {
                    data.imgSrc !== "" ?
                        <img className='e-avatar' src={`${data.imgSrc}`} /> : ""
                }
                <span className="e-list-item-header">{data.title} </span>
                <span className="e-list-content e-text-overflow" dangerouslySetInnerHTML={{ __html: data.description }} ></span>
                {
                    data.timeStamp !== "" ?
                        <div>
                            <div id="list-logo">
                                <span className="bookmark"></span>
                                <span className="comments"></span>
                                <span className="share"></span>
                            </div>
                        <div className="timeStamp">{data.timeStamp}</div></div> : ""
                }
            </div>);
    }

    function onComplete(): void {
        let instance: any = document.getElementById('listview_template');
        instance = instance.ej2_instances[0];
        let listHeader: HTMLElement = instance.element.childNodes[0] as HTMLElement;
        let header: HTMLElement = listHeader.childNodes[0] as HTMLElement;
        if (header.style.display === 'none' || listHeader.childNodes.length === 3) {
            if (listHeader.childNodes[2] != null) {
                let childHeader: HTMLElement = listHeader.childNodes[2] as HTMLElement;
                childHeader.remove();
            }
        } else {
            let headerEle: HTMLElement = instance.element.querySelector('.e-list-header') as HTMLElement;
            let headerElement: HTMLElement = instance.element.querySelector('#list-logo') as HTMLElement;
            let clone: HTMLElement = headerElement.cloneNode(true) as HTMLElement;
            headerEle.appendChild(clone);
        }
        //Customizing the elements to perform our own events
        share = document.getElementsByClassName('share');
        comments = document.getElementsByClassName('comments');
        bookmark = document.getElementsByClassName('bookmark');
        timeStamp = document.getElementsByClassName('timeStamp');
        postActions();
    }
    // EventHnadler to Comments, BookMarks and Share Icons
    function postActions(): void {
        for (let i: number = 0; i < comments.length; i++) {
            comments[i].setAttribute('title', 'We can customize this element to perform our own action');
            comments[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < bookmark.length; i++) {
            bookmark[i].setAttribute('title', 'We can customize this element to perform our own action');
            bookmark[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < share.length; i++) {
            share[i].setAttribute('title', 'We can customize this element to perform our own action');
            share[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < timeStamp.length; i++) {
            timeStamp[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                {/* ListView element */}
                <ListViewComponent id='listview_template' dataSource={dataSource} headerTitle='Syncfusion Blog' showHeader={true} cssClass = 'e-list-template'
                    actionComplete={onComplete.bind(this)} template={listTemplate as any}></ListViewComponent>
            </div>

            <div id="action-description">
                <p>This sample demonstrates the template functionalities of the ListView. Click any news header or thumbnail to open
                the complete article. To navigate back to the news list, click the back icon at the top left area.
                </p>
            </div>

            <div id="description">
                <p>The above template represents the customizability of the ListView component. Here, list data is loaded and its value is directly mapped to your ListView datasource to load the content.</p>

                <p>This sample also have the additional elements such as bookmark, comments, and share that can be customized to perform the appropriate action by adding your own events.</p>
            </div>
        </div>
    )
 }
 export default Template;