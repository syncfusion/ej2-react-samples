import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';

import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);

// tslint:disable:max-line-length
export class BulletsAndNumberingView extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://services.syncfusion.com/react/production/api/documenteditor/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;
    public rendereComplete(): void {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();
    }
    render() {
        return (<div className='control-pane'>
            <div className='control-section'>
                <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block' }}
                        height={'590px'} serviceUrl={this.hostUrl} enableToolbar={true} locale='en-US'  />
                </div>
            </div>
            <div id="action-description">
                <p>This example demonstrates bullets and numbering support in document editor. Both single list and multi-level lists are supported.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this example, you can use, add, or modify the list formatting in document editor.</p>
                    <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/list-format/">documentation section.</a>
                    </p>
                </div>
            </div>
        </div>);
    }
    onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object ={"sfdt":"UEsDBAoAAAAIADaJbVYotcFVFAYAAFQyAAAEAAAAc2ZkdO1a3W7bNhR+FUKDgQ1wDOuPsnPXZss6IC2KpXdFMFASZROhRJeS47hBb/ZSe6y9wg5JyZb/Ujmxa2WIbw5FUuR3zvl4RPL4wRKTgqXsK71O4sI6L+SUdq2cRtb55wcL5ERa5w/WZGadY9vpWpOxdR4MocBTKICUpSxKGZYyTibWeR+koKYwjq1zF3etpJQh09UhzGR9oLOPZEQtGH+U5VDxRpKQRfCcRYJDhd216JeZljwsIv2mafl88w0G0WgniYIaxjJXsoBpH6CNF0bKkZFh+Tw24k4JkCQ3sPIiU4CETAmH+TlLyg6RHj1RcH/yvMC58C4vLahneu6yNf8KGAegJDxa70UmivmEogshc3ZHYLi117vqDWUI8w7Z8VKSJXRX0/YWwFVwMID1CWpzJBL0JmOgUW59A3s901TGRFcsL9BHIslIEmBFZSoQsXYPZzwTUFraLqzoFSqVVXHNfFs7GD3ek/Qk8O0F/FWsC2ChiOcoEndU0hiFczQmTCIhUTKV7QM7IzI9C7kQMY3bh25M7igiKCTRbSgy2j6AEyniaURRyvht+9D9dk/SCac/fo0430P2iY2obB+st6R4qeHwTwpf7VP4eu94mEeklThh9xC/hsInA0wFjMPJHFkK2Dp4GZ/lY8q5Mu1G87ZX6GgEu5QMRszi18jaPIRdZ+SWtg/WFfsKHHipwfUtk/ELiKwJJcWYyvx1m/k/i60qrKqA+BoIm0ecj7DFFFn7cL2j2UsNg39kOY2KvKV7DyIpylPCOYID91koVTBk2QiRE91zfBc1Rpy2cU07YLKCZhlpYSR0kf7oKR4ykeXo5zElcRcVYyHJfReRMBYpzX5pc6CsbXXD20IPoib663fxFj5Am+32WnvrDs3ToqAy4fMWboYnLD7BPcOBwu2bL1NSsOhkF7XNwq7ePI0YbyPAREyzGDF1iryleRdJBntlkHCmRCKiJHvdUe2z0PmUoms4y7cwCF2yfKxQ3cA8Jj9zU1uCCSwfql8sSyYtY5dpmQvCWSgZzD7Vk+YmKofEpKlMcskkavrlzyoXbDVyuDK2TuDo0VWpNj6Jlt10cmfZVOV06jUrFaDrswzOWaYVkaVMSlkYNcNcC5X1GkBnlWLr9YOhjTH2+0Hg9IdeoOqL0i/VJ2qp+K0CUpVn2aI8i5aBLeHmtbiYmexambqjWWKMDWgt0D0vZZKa+SZGxOMi5QZ9YpKAkUgnpdPmRciroqbISt6uHOd5FlxJ/YHM7pdTqBWhZvyVJmTKa6xGlyIrDAK7erXq/EEUsNQPgk55Dpee23DU4x+ksG6obTptLNODWDMzFNg06yaeNQAVrnew+1N7fPuAkB5fIirlTcxS+d4aEdx4Yj1hrGMPXo096IqNxsUiH+xc+t4Q17LBeC1gLPuvho1a/ZbqddPyugnRBYT2Hf7f6FTjcgsU2rHk1tE7P4wl+5HE2UUSdz+bukcnidOEJM5ukpxSoYYkcVtKEncXSZxHbWpfugF2azZ1jk4StwlJ3N0kOaVCDUnitZQk3iZJWPXBb7LwWFjrflSSeE1I4m0jyekVakgSv6Uk8bdEkiZB+biE8JsQwt8aNX4o+IbOxy11Pt7L+ctge1zn4ybOx3s6/wjgdzn/RllVnznJ4uZCqL+idsubDNUDVFrtcce3XQQuD9ThMngtLxgOcg2g/12qCmeqtCREEikLlxcvE3P3rAzcsXtgGVker4m6xuo+bLtfqZ0t61cj5TnzAOfFYc8fwm/gBZ7t2MDvShHH7mF9NeMObA8PAydoqFjHqXSzN3TT7Lqep6HgCx7VHg2BahX154Poi+2eo7UKsDN0h56/UNdfa3AfVbdf6vvv3/+sOrJfzzc8H+8A9zyFyvYdfxAMhhVc11mt7+Pm3um4vY5X+chd99Fh1oNtr/DKXuDewrf9cHf8Crp3HOgu7g007/u+HfjBYmV7uBco6EPHDfq47/tPQN7BFXj/OOCxU8H1vafh6wQVRHwciIOgZysz4qE3cDxnAXjL0nwi/s6gUiE4igqOvm3RoAPnOSg7wwrooAKqr9yj1HzrpBHRvZEsHeV6pv8AUEsBAhQACgAAAAgANoltVii1wVUUBgAAVDIAAAQAAAAAAAAAAAAAAAAAAAAAAHNmZHRQSwUGAAAAAAEAAQAyAAAANgYAAAAA"};
        // tslint:enable
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Bullets and Numbering';
        this.titleBar.updateDocumentTitle();
        this.container.documentChange = (): void => {
        this.titleBar.updateDocumentTitle();
        this.container.documentEditor.focusIn();
        };
    }
}