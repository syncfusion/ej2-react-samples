/**
 * ListView Template Sample
 */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './template.css';
import { dataSource } from './newsData';

export class Template extends SampleBase<{}, {}> {

    private template: string = '<div id="postContainer" ${if(category!==null)} class = "clearfix desc"${else}'
        + 'class = "clearfix" ${/if}> ${if(imgSrc!=="")} <div id="postImg"> <img src=${imgSrc} /> </div>'
        + '${/if}  <div id="content"> <div id="heading">${title} </div>'
        + '<div class="description" >${description} </div> ${if(timeStamp!=="")}  <div id="info"><div id="logo"> <div id="share">'
        + '<span class="share"></span> </div> <div id="comments"> <span class="comments"></span> </div>'
        + '<div id="bookmark"> <span class="bookmark"></span> </div></div> <div class="timeStamp">'
        + '${timeStamp} </div> ${/if} </div> </div></div>';

    private listviewInstance: ListViewComponent;
    //Customizing the elements to perform our own events
    private share: any;
    private comments: any;
    private bookmark: any;
    private description: any;
    private timeStamp: any;

    onComplete(): void {
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
            let headerElement: HTMLElement = instance.element.querySelector('#info') as HTMLElement;
            let clone: HTMLElement = headerElement.cloneNode(true) as HTMLElement;
            headerEle.appendChild(clone);
        }
        //Customizing the elements to perform our own events
        this.share = document.getElementsByClassName('share');
        this.comments = document.getElementsByClassName('comments');
        this.bookmark = document.getElementsByClassName('bookmark');
        this.description = document.getElementsByClassName('description');
        this.timeStamp = document.getElementsByClassName('timeStamp');
        this.postActions();
    }

    postActions(): void {
        for (let i: number = 0; i < this.comments.length; i++) {
            this.comments[i].setAttribute('title', 'We can customize this element to perform our own action');
            this.comments[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < this.bookmark.length; i++) {
            this.bookmark[i].setAttribute('title', 'We can customize this element to perform our own action');
            this.bookmark[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < this.share.length; i++) {
            this.share[i].setAttribute('title', 'We can customize this element to perform our own action');
            this.share[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < this.description.length; i++) {
            this.description[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }

        for (let i: number = 0; i < this.timeStamp.length; i++) {
            this.timeStamp[i].addEventListener('click', (event: any) => {
                event.stopPropagation();
            });
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    {/* ListView element */}
                    <ListViewComponent id='listview_template' dataSource={dataSource} headerTitle='Syncfusion Blog' showHeader={true}
                        actionComplete={this.onComplete.bind(this)} template={this.template} ref={(listview) => { this.listviewInstance = listview }}></ListViewComponent>
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
            </div>
        )
    }
}