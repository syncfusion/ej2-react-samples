import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from './property-pane';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from './sample-base';


export class Orientation extends SampleBase<{}, {}> {
    private tabObj: TabComponent;
    public list1: ListViewComponent;
    public list2: ListViewComponent;
    public list3: ListViewComponent;
    private templateString: string = '<div class="template-container"><div class="left"><img class="empImg" ' +
    'src="http://npmci.syncfusion.com/production/react/demos/src/dropdownlist/Employees/${id}.png" alt="${id}" /></div><div class="left info"><div class="name">' +
    '${name}</div> <div class="role">${role}</div></div></div>';

     // Mapping ListView component dataSource property
    public romeEmployees: { [key: string]: Object }[] = [
        { id: '1', name: 'Anne Dodsworth', role: 'Product Manager' },
        { id: '2', name: 'Laura Callahan', role: 'Team Lead' },
        { id: '3', name: 'Andrew Fuller', role: 'Developer' }
    ];

    // Mapping ListView component dataSource property
    public parisEmployees: { [key: string]: Object }[] = [
        { id: '4', name: 'Robert King', role: 'Team Lead' },
        { id: '5', name: 'Michael Suyama', role: 'Developer' },
        { id: '6', name: 'Margaret Peacock', role: 'Developer' }
    ];

    // Mapping ListView component dataSource property
    public londonEmployees: { [key: string]: Object }[] = [
        { id: '7', name: 'Janet Leverling', role: 'CEO' },
        { id: '8', name: 'Steven Buchanan', role: 'HR' },
        { id: '9', name: 'Nancy Davolio', role: 'Product Manager' }
    ];

    // Change event funtion for DropDownList component   
    public changeOrientationMode(e: ChangeEventArgs): void {
        let placement: string = (document.getElementById('orientation') as HTMLSelectElement).value;
        if (placement === 'Bottom') {
            this.tabObj.headerPlacement = 'Bottom';
        } else {
            this.tabObj.headerPlacement = 'Top';
        }
        this.tabObj.dataBind();
    }

    // Change event funtion for DropDownList component   
    public changeHeaderStyles(e: ChangeEventArgs): void {
        this.removeStyleClass();
        let name: string = (document.getElementById('headerStyles') as HTMLSelectElement).value;
        if (name === 'Fill') {
            this.tabObj.element.classList.add('e-fill');
        } else if (name === 'Accent') {
            this.tabObj.element.classList.add('e-background');
            this.tabObj.element.classList.add('e-accent');
        }
    }

    private removeStyleClass(): void {
        this.tabObj.element.classList.remove('e-fill');
        this.tabObj.element.classList.remove('e-background');
        this.tabObj.element.classList.remove('e-accent');
    }

    // Mapping DropDownList dataSource property
    private oData: { [key: string]: Object }[] = [
        {'value':'top', 'text': 'Top'}, {'value':'bottom', 'text': 'Bottom'}
    ];

    // Mapping DropDownList fields property
    private fields: object = { text: 'text', value: 'value' };

    // Mapping DropDownList value property
    private orientVal: string = 'top';

    // Mapping DropDownList dataSource property
    private hData: { [key: string]: Object }[] = [
        {'value':'default', 'text': 'Default'}, {'value':'fill', 'text': 'Fill'}, {'value':'accent', 'text': 'Accent'}
    ];

    // Mapping DropDownList value property
    private hdrVal: string = 'default';

    render() {
        // Mapping Tab items Header property
        let headertext: any;
        headertext = [{ text: "Rome" }, { text: "Paris" }, { text: "London" }];
        return (
            <div className='control-pane'>
                <div className='control-section tab-control-section row'>
                    <div className='col-lg-8'>
                        {/* Render the Tab Component */}
                        <TabComponent ref={(tab) => { this.tabObj = tab }} showCloseButton={ true } heightAdjustMode='None' height={320}>
                            <div className="e-header">
                                <div>Rome</div>
                                <div>Paris</div>
                                <div>London</div>
                            </div>
                            <div className="e-content">
                                <div>
                                    <div className="content-title"><div className="cnt-text">Employee Info</div></div>
                                    {/* Render the ListView Component */}
                                    <ListViewComponent id="rome" template= { this.templateString } dataSource={this.romeEmployees}>
                                    </ListViewComponent>
                                </div>
                                <div>
                                    <div className="content-title"><div className="cnt-text">Employee Info</div></div>
                                    {/* Render the ListView Component */}
                                    <ListViewComponent id="paris" template= { this.templateString } dataSource={this.parisEmployees}>
                                    </ListViewComponent>
                                </div>
                                <div>
                                    <div className="content-title"><div className="cnt-text">Employee Info</div></div>
                                    {/* Render the ListView Component */}
                                    <ListViewComponent id="london" template= { this.templateString } dataSource={this.londonEmployees}>
                                    </ListViewComponent>
                                </div>
                            </div>
                        </TabComponent>
                    </div>
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table'>
                                <tbody>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div>Header Placement</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <div>
                                                {/* Render the DropDownList Component */}
                                                <DropDownListComponent id='orientation' dataSource={this.oData} fields={this.fields} 
                                                value={this.orientVal} width={'90%'} change={this.changeOrientationMode.bind(this)}  />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '50%' }}>
                                            <div>Header Styles</div>
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            <div>
                                                {/* Render the DropDownList Component */}
                                                <DropDownListComponent id='headerStyles' dataSource={this.hData} fields={this.fields} 
                                                value={this.hdrVal} width={'90%'} change={this.changeHeaderStyles.bind(this)}/>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<Orientation />, document.getElementById('sample'));