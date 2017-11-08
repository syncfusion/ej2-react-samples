import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TooltipComponent, TooltipEventArgs } from '@syncfusion/ej2-react-popups';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { Ajax } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';


export class AjaxContentTooltip extends SampleBase<{}, {}> {
    private tooltipInstance: TooltipComponent;
    public listViewData: { [key: string]: Object }[] = [
        { id: '1', text: 'Australia' },
        { id: '2', text: 'Bhutan' },
        { id: '3', text: 'China' },
        { id: '4', text: 'Cuba' },
        { id: '5', text: 'India' },
        { id: '6', text: 'Switzerland' },
        { id: '7', text: 'United States' }
    ];
    public fields: Object = { text: 'text', tooltip: 'id' };
    public onBeforeRender(args: TooltipEventArgs): void {
        this.tooltipInstance.content = 'Loading...';
        this.tooltipInstance.dataBind();
        let ajax: Ajax = new Ajax('./src/tooltip/tooltipdata.json', 'GET', true);
        ajax.send().then(
            (result: any) => {
                result = JSON.parse(result);
                for (let i: number = 0; i < result.length; i++) {
                    if (result[i].Id === args.target.getAttribute('data-content')) {
                        this.tooltipInstance.content = "<div class='contentWrap'><span class=" + result[i].Class + "></span><div class='def'>" + result[i].Sports + "</div></div>";
                    }
                }
                this.tooltipInstance.dataBind();
            },
            (reason: any) => {
                this.tooltipInstance.content = reason.message;
                this.tooltipInstance.dataBind();
            });
    }
    render() {
        return (
            <div className='control-pane'>               
                <div className='control-section'>
                    <h4 className="list-header">National Sports</h4>
                    <TooltipComponent ref={t => this.tooltipInstance = t} className="e-prevent-select" content='Loading...' target="#countrylist [title]" position='right center' beforeRender={this.onBeforeRender.bind(this)}>
                        <ListViewComponent id="countrylist" dataSource={this.listViewData} fields={this.fields}></ListViewComponent>
                    </TooltipComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<AjaxContentTooltip />, document.getElementById('sample'));