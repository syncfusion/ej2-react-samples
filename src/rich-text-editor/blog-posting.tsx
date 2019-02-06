/**
 * RichTextEditor usecase sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { RichTextEditorComponent, HtmlEditor, Inject, Toolbar, Image, Link, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { SampleBase } from '../common/sample-base';
import './blog-posting.css';
export class Forums extends SampleBase<{}, {}> {

    private rteObj: RichTextEditorComponent;

    public rendereComplete(): void {
        let buttonEle: HTMLElement = document.getElementById('rteSubmit');
        let cancelEle: HTMLElement = document.getElementById('rteCancel');
        cancelEle.addEventListener('click', (e: any) => {
            this.resetMessage();
        });
        let empCount: number = 0;
        buttonEle.addEventListener('click', (e: any) => {
            this.postMessage();
        });
    }

    private resetMessage(): void {
        let answerElement: Element = this.rteObj.contentModule.getEditPanel();
        answerElement.innerHTML = '';
        this.rteObj.value = '';
        this.rteObj.dataBind();
        this.rteObj.refresh();
    }

    private postMessage(): void {
        let empCount: number = 0;
        let answerElement: HTMLElement = this.rteObj.contentModule.getEditPanel() as HTMLElement;
        let comment: string = answerElement.innerHTML;
        let empList: string[] = ['emp1', 'emp2', 'emp3'];
        let nameListList: string[] = ['Anne Dodsworth', 'Janet Leverling', 'Laura Callahan'];
        if (comment !== null && comment.trim() !== '' && answerElement.innerText.trim() !== '') {
            let answer: HTMLElement = document.querySelector('.answer');
            let cloneAnswer: HTMLElement = answer.cloneNode(true) as HTMLElement;
            let authorName: HTMLElement = cloneAnswer.querySelector('.authorname');
            let logo: HTMLElement = cloneAnswer.querySelector('.logos');
            logo.classList.remove('logos');
            if (empCount < 3) {
                logo.classList.add(empList[empCount]);
                authorName.innerHTML = nameListList[empCount];
                empCount++;
            } else {
                logo.classList.add('logo');
                authorName.innerHTML = 'User';
            }
            let timeZone: HTMLElement = cloneAnswer.querySelector('.detailsAnswer');
            let day: string = this.getMonthName(new Date().getMonth()) + ' ' + new Date().getDate();
            let hr: string = new Date().getHours() + ':' + new Date().getMinutes();
            if (new Date().getHours() > 12) {
                hr = hr + ' PM';
            } else {
                hr = hr + ' AM';
            }
            timeZone.innerHTML = 'Answered on ' + day + ', ' + new Date().getFullYear() + ' ' + hr;
            let postContent: HTMLElement = cloneAnswer.querySelector('.posting');
            postContent.innerHTML = comment;
            let postElement: HTMLElement = document.querySelector('.answerSection');
            postElement.appendChild(cloneAnswer);
            let countEle: HTMLElement = document.querySelector('.answerCount');
            let count: number = parseInt(countEle.innerHTML, null);
            count = count + 1;
            countEle.innerHTML = count.toString() + ' Answers';
            answerElement.innerHTML = '';
            this.rteObj.value = '';
            this.rteObj.dataBind();
            this.rteObj.refresh();
        }
    }

    private getMonthName(index: number): string {
        let month: string[] = [];
        month[0] = 'January';
        month[1] = 'February';
        month[2] = 'March';
        month[3] = 'April';
        month[4] = 'May';
        month[5] = 'June';
        month[6] = 'July';
        month[7] = 'August';
        month[8] = 'September';
        month[9] = 'October';
        month[10] = 'November';
        month[11] = 'December';
        return month[index];
    }

    render() {
        return (
            <div className='control-pane'>
                <div className="control-section" id="rteUseCase">
                    <div className="control-wrapper">
                        <div className='forum'>
                            <div className='questionSection'>
                                <div className='raiser'>
                                    <table>
                                        <tr>
                                            <td>
                                            <div className='questionar'> </div>
                                            </td>
                                            <td>
                                            <div className='Questionarname'>Kimberly</div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className='questionHeader'>
                                    <div className='header'>
                                        How to add a custom item to the toolbar of RichTextEditor
                                    </div>
                                    <div className='detailsQuestion'>Posted on May 7, 2018 6.10 PM</div>
                                    <div className='explain'>
                                        I want to add a custom icon, “code-mirror” to the toolbar of RichTextEditor and display the RichTextEditor content in code-mirror format.
                                    </div>
                                    <div className='tags'>
                                        <div className='tagSection'>
                                            <table>
                                            <tr>
                                                <td>
                                                    <div className='tag'> HTML </div>
                                                </td>
                                                <td>
                                                    <div className='tag'> JavaScript </div>
                                                </td>
                                            </tr>
                                            </table>
                                        </div>
                                        <div className='questionLikes'>
                                            <table>
                                            <tr>
                                                <td>
                                                    <span className='e-icon e-like questionSide'>
                                                        <img className='e-icon' src='./src/rich-text-editor/images/like.svg'/>
                                                        <span>Like</span>
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className='e-icon e-dislike'>
                                                        <img className='e-icon' src='./src/rich-text-editor/images/dislike.svg'/>
                                                        <span>Dislike</span>
                                                    </span>
                                                </td>
                                            </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='answerSection'>
                                <div className='answerCount'>1 Answer</div>
                                <div className='answer'>
                                    <table>
                                        <tr>
                                            <td rowSpan={2}>
                                                <div className='logos'> </div>
                                            </td>
                                            <td>
                                                <div className='authorname'>Mabel Weber</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className='detailsAnswer'>Answered on May 7, 2018 6.30 PM</div>
                                            </td>
                                        </tr>
                                    </table>
                                    <div className='posting'>
                                        To add a custom icon <b>code-mirror</b> to the toolbar, you have to use template option of the <b>toolbarSettings</b>. To know more about adding custom icons, refer to <a href='https://ej2.syncfusion.com/home/' target='_blank'>custom tool</a> sample of RichTextEditor.
                                    </div>
                                    <div className='likeAnswer'>
                                        <table>
                                            <tr>
                                            <td>
                                                <span className='e-icon e-like'>
                                                    <img className='e-icon' src='./src/rich-text-editor/images/like.svg'/>
                                                    <span>Like</span>
                                                </span>
                                            </td>
                                            <td>
                                                <span className='e-icon e-dislike'>
                                                    <img className='e-icon' src='./src/rich-text-editor/images/dislike.svg'/>
                                                    <span>Dislike</span>
                                                </span>
                                            </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div id="createpostholder">
                                <form>
                                    <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }}>
                                        <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                                        </RichTextEditorComponent>
                                    <div id='buttonSection'>
                                        <ButtonComponent id="rteCancel" type='button'>Cancel</ButtonComponent>
                                        <ButtonComponent id="rteSubmit" cssClass='e-primary' type='button'>Reply</ButtonComponent>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to design forum application using rich text editor. You can type the content and click reply
                        button to post it. </p>
                </div>

                <div id="description">
                    <p>RichTextEditor is a WYSIWYG editing control which will reduce the effort for users while trying to express their formatting
                        word content as HTML or Markdown format. So, RichTextEditor can easily customized to use for blog posting, forums
                        as an editor for response.</p>
                    <p><b>Injecting Module</b></p>
                    <p>RichTextEditor component features are segregated into individual feature-wise modules. To use richtexteditor feature, we need to inject <code>Toolbar, Link, Image, HtmlEditor</code> modules into the services.</p>
                </div>
            </div >);
        }
    }
