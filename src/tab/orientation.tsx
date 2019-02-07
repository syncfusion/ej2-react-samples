import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { SampleBase } from '../common/sample-base';
import './tab.component.css';

export class Orientation extends SampleBase<{}, {}> {
    private tabObj: TabComponent;
    public list1: ListViewComponent;
    public list2: ListViewComponent;
    public list3: ListViewComponent;
  
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
        this.tabObj.headerPlacement = placement as any;
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
        {'value':'top', 'text': 'Top'}, {'value':'bottom', 'text': 'Bottom'},
        {'value':'left', 'text': 'Left'}, {'value':'right', 'text': 'Right'}
    ];

    // Mapping DropDownList fields property
    private fields: object = { text: 'text', value: 'value' };

    //Map the appropriate columns to fields property
  public listfields: Object = {  text: 'name', id: 'id' };

    // Mapping DropDownList value property
    private orientVal: string = 'top';

    // Mapping DropDownList dataSource property
    private hData: { [key: string]: Object }[] = [
        {'value':'default', 'text': 'Default'}, {'value':'fill', 'text': 'Fill'}, {'value':'accent', 'text': 'Accent'}
    ];

    // Mapping DropDownList value property
    private hdrVal: string = 'default';
     
    templateString(data: any): JSX.Element {
        return(
            <div className="template-container">
                <div className="left"><img className='empImg' src={`src/tab/Employees/${data.id}.png`} alt='${data.id}'/>
                 <div className="left info-div">
                  <div className="name"> {data.name}</div>
                  <div className="role"> {data.role}</div>                   
                 </div>
                </div>
            </div>
      );
      }

    render() {

        function template1() {
            return(              
                <ListViewComponent id="rome"  dataSource={this.romeEmployees} template= { this.templateString as any } >
                </ListViewComponent>        
          );
          }
          function template2() {
            return(
                <ListViewComponent id="paris"  dataSource={this.parisEmployees} template= { this.templateString as any}>
                </ListViewComponent>             
          );
          }
          function template3() {
            return(
                <ListViewComponent id="london"  dataSource={this.londonEmployees} template= { this.templateString as any}>
                </ListViewComponent>
          );
          }
        // Mapping Tab items Header property
        let headertext: any;
        headertext = [{ text: "Rome" }, { text: "Paris" }, { text: "London" }];
        return (
            <div className='control-pane'>
                <div className='control-section tab-control-section row'>
                    <div className='col-lg-8'>
                        {/* Render the Tab Component */}               
                        <TabComponent ref={(tab) => { this.tabObj = tab }} showCloseButton={ true } heightAdjustMode='None' height={320}>
                        <TabItemsDirective>
                        <TabItemDirective header={headertext[0]} content={ template1.bind(this) } />
                        <TabItemDirective header={headertext[1]} content={ template2.bind(this) }/>
                        <TabItemDirective header={headertext[2]} content={ template3.bind(this) }/>
                        </TabItemsDirective>
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
                <div id="action-description">
                <p>
                    This sample demonstrates the <code>header</code> orientation of the <code>Tab</code>. Select option from drop-downs to switch header placement and changing the header style in properties panel.
                </p>
                 </div>
                <div id="description">
                    <p>
                        The <code>Tab</code> allows to place the header section inside the Tab component either at
                        <code>top / bottom / left / right</code> position by using <code>headerPlacement</code> property.
                    </p>
                    <p>
                        This sample illustrates the use of header placement and <code>showCloseButton</code> property.
                        Users can change the header position by changing the drop-down value options and can close the Tab item
                        by clicking close icon in header.<br/><br/>

                        The User can also view different header styles of Tab component by selecting options from `Header Styles`
                        drop-down. Header styles changed by adding predefined classes in Tab root element and it class names listed below
                        <br/>
                        <ul>
                            <li>Material and Fabric theme differentiates all the available tab header styles such as <code>e-fill</code>, <code>e-background e-accent</code>.</li>
                            <li>In bootstrap theme, all the styles such as <code>e-fill</code> & <code>e-background e-accent</code> will have the same look with no difference.</li>
                        </ul>
                        If above classes not included in root element default style will applied in Tab component.
                    </p>
                    <p>
                        More information about Tab can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/tab/getting-started/">
                        documentation</a> section.
                    </p>
                </div>
            </div>
        );
    }
}