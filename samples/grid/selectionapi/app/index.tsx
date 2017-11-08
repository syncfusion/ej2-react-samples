import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, SelectionSettings } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class SelectionAPI extends SampleBase<{}, {}> {

    public selectionsettings: Object = { type: 'multiple' };
    private ToolbarInstance: ToolbarComponent;
    private gridInstance: GridComponent;
    public click(e: MouseEvent): void {
        let element: HTMLElement = e.target as HTMLElement;
        debugger;
        let options: {
            type?: { class: string, val: (mode: string) => string },
            mode?: { class: string, val: (mode: string) => string }
        } = {
                type: { class: '.e-gtype', val: (mode: string) => mode === 'single' ? 'Multiple' : 'Single' },
                mode: { class: '.e-gmode', val: (mode: string) => mode === 'row' ? 'Cell' : 'Row' },
            };

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element) as HTMLElement;
        let isType: boolean = element.parentElement.parentElement.classList.contains('e-gtype');
        let opt: { class: string, val: (mode: string) => string } = options[isType ? 'type' : 'mode'];
        let parent: Element = document.querySelector('.e-gridlist');
        let typeEle: Element = parent.querySelector(opt.class + ' .e-tbar-btn-text');
        let type: string = typeEle.innerHTML.toLowerCase();
        let val: string = opt.val(type);
        typeEle.innerHTML = val;
        val = val.toLowerCase();
        this.gridInstance.selectionSettings = isType ? { type: val } as SelectionSettings : { mode: val } as SelectionSettings;
        this.gridInstance.refresh();
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='e-statustext'>Selection Type / Selection Mode</div>
                    <ToolbarComponent className="e-gridlist" ref={toolbar => this.ToolbarInstance = toolbar} onClick={this.click.bind(this)} >
                        <ItemsDirective>
                            <ItemDirective text="Multiple" cssClass='e-gtype' />
                            <ItemDirective text="Row" cssClass='e-gmode' />
                        </ItemsDirective>
                    </ToolbarComponent>
                    <br />
                    <GridComponent dataSource={data} ref={grid => this.gridInstance = grid} enableHover={false} allowPaging={true} selectionSettings={this.selectionsettings}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign="right"></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="right"></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Selection]} />
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<SelectionAPI />, document.getElementById('sample'));