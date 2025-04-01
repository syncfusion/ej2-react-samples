import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DialogComponent, ButtonPropsModel, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import { TabComponent, TabItemDirective, TabItemsDirective, SelectEventArgs } from '@syncfusion/ej2-react-navigations';
import { GridComponent, RowSelectEventArgs, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import {
    ScheduleComponent, ViewsDirective, ViewDirective,
    Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, DragEventArgs
  } from '@syncfusion/ej2-react-schedule';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective,
    LineSeries, DateTime, Legend, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { RichTextEditorComponent, HtmlEditor, Toolbar, Image, Link, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { extend, Browser } from '@syncfusion/ej2-base';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { SampleBase } from '../common/sample-base';
import './components-dialog.css';
import { scheduleData, gridData } from './data';

export class ComponentsDialog extends SampleBase<{}, { hideDialog: boolean; }> {
    private buttons: ButtonPropsModel[];
    private animationSettings: AnimationSettingsModel;
    private dialogInstance: DialogComponent;
    private alertDialogObj: DialogComponent;
    private tabObj: TabComponent;
    public formObject: FormValidator;
    private rteObj: RichTextEditorComponent;
    private buttonEle: HTMLButtonElement;
    private buttonRef: React.Ref<HTMLButtonElement>;
    private scheduleObj: ScheduleComponent;

  constructor(props: {}) {
    super(props);
    this.state = {
      hideDialog: true
    };
    this.buttonRef = element => {
      this.buttonEle = element;
    };
    this.buttons = [{
      click: () => {
        this.dialogInstance.hide();
      },
      buttonModel: {
        content: 'OK',
        isPrimary: true
      }
    },
    {
      click: () => {
        this.dialogInstance.hide();
      },
      buttonModel: {
        content: 'CANCEL',
      }
    }];
    this.animationSettings = { effect: 'None' };


  }

  public floatFocus(args: any): void {
    args.target.parentElement.classList.add('e-input-focus');
  }
  public floatBlur(args: any): void {
    args.target.parentElement.classList.remove('e-input-focus');
  }
  public onSubmitClick(): void {
    if(this.formObject.validate()) {
      this.formObject.element.reset();
    }
  }
    public data1: any[] = [
        { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
        { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
        { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
        { x: new Date(2011, 0, 1), y: 70 }
    ];
    public data2: any[] = [
        { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 44 },
        { x: new Date(2007, 0, 1), y: 48 }, { x: new Date(2008, 0, 1), y: 50 },
        { x: new Date(2009, 0, 1), y: 66 }, { x: new Date(2010, 0, 1), y: 78 }, { x: new Date(2011, 0, 1), y: 84 }
    ];
  private onDragStart(args: DragEventArgs): void {
    args.navigation.enable = true;
  }
    public headerText: any = [
      { "text": "Grid" },
      { "text": "Scheduler" },
      { "text": "Chart" },
      { "text": "Rich Text Editor" },
      { "text": "Form" }
      ];
    
  public content0() {
    return (
      <GridComponent dataSource={gridData} allowPaging={true} pageSettings={{ pageSize: 5, pageSizes: true }}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
              <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' />
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' />
              <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page]} />
          </GridComponent>
  );
  }
  public content1() {
    return (
    <ScheduleComponent height='300px' ref={schedule => this.scheduleObj = schedule}
              selectedDate={new Date(2019, 0, 10)} eventSettings={{ dataSource: scheduleData }}
              dragStart={(this.onDragStart.bind(this))}>
              <ViewsDirective>
                <ViewDirective option='Day' />
                <ViewDirective option='Week' />
                <ViewDirective option='WorkWeek' />
                <ViewDirective option='Month' />
                <ViewDirective option='Agenda' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
  );
  }
  public content2() {
    return (
           <ChartComponent id='DialogChart'
                        primaryXAxis={{
                            valueType: 'DateTime',
                            labelFormat: 'y',
                            intervalType: 'Years',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            labelFormat: '{value}%',
                            rangePadding: 'None',
                            minimum: 0,
                            maximum: 100,
                            interval: 20,
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true }}
                        width="100%" height="300px"
                        title='Inflation - Consumer Price' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={this.data1} xName='x' yName='y' name='Germany'
                                width={2} marker={{ visible: true, width: 10, height: 10 }} type='Line'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={this.data2} xName='x' yName='y' name='England'
                                width={2} marker={{ visible: true, width: 10, height: 10 }} type='Line'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
  );
}
  public content3() {
    return (
        <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { this.rteObj = richtexteditor }} >
              <p>The rich text editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content.
  Users can format their content using standard toolbar commands.</p>
              <p><b>Key features:</b></p>
              <ul>
                <li>
                  <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
                </li>
                <li>
                  <p>Capable of handling markdown editing.</p>
                </li>
                <li>
                  <p>Contains a modular library to load the necessary functionality on demand.</p>
                </li>
                <li>
                  <p>Provides a fully customizable toolbar.</p>
                </li>
                <li>
                  <p>Provides HTML view to edit the source directly for developers.</p>
                </li>
                <li>
                  <p>Supports third-party library integration.</p>
                </li>
                <li>
                  <p>Allows preview of modified content before saving it.</p>
                </li>
                <li>
                  <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
                </li>
                <li>
                  <p>Contains undo/redo manager.</p>
                </li>
                <li>
                  <p>Creates bulleted and numbered lists.</p>
                </li>
              </ul>
              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
    );
}
public content4() {
    return (<div id="formComponents">
      <h4 className="form-title">Add Customer details</h4>
      <div className='validation_wrapper'>
          <form id="formId" className="form-horizontal">
            <div className="form-group" >
              <div className="e-float-input">
                <input type="text" id="user" name="user" data-msg-containerid="userError" />
                <span className="e-float-line"/>
                <label className="e-float-text e-label-top" htmlFor="name">User Name</label>
              </div>
              <div id="userError"/>
            </div>
            <div className="form-group">
              <div className="e-float-input">
              <DatePickerComponent
            placeholder="Date of Birth" id="dob" name="dob" data-msg-containerid="dobError"/>
                <span className="e-float-line"/>
              </div>
              <div id="dobError"/>
            </div>
            <div className="form-group" >
              <div className="e-float-input">
                <textarea id="Address" name="Address"></textarea>
                <span className="e-float-line"/>
                <label className="e-float-text e-label-top"  htmlFor="mobile">Address</label>
              </div>
              <div id="noError"/>
            </div>
            <div className="form-group" >
              <div className="e-float-input">
                <input type="text" id="city" name="city" data-msg-containerid="cityError" />
                <span className="e-float-line"/>
                <label className="e-float-text e-label-top"  htmlFor="city">City</label>
              </div>
              <div id="cityError"/>
            </div>
            <div className="form-group" >
              <div className="e-float-input">
                <input type="text" id="state" name="state" data-msg-containerid="stateError" />
                <span className="e-float-line"/>
                <label className="e-float-text e-label-top"  htmlFor="state">State</label>
              </div>
              <div id="stateError"/>
            </div>
          <div className="row">
                <div className="submitRow">
                    <div  style={{display: 'inline-block'}}>
                        <button id="submit-btn" className="samplebtn e-control e-btn e-primary e-submit-btn" onClick={this.onSubmitClick = this.onSubmitClick.bind(this)} type="submit" data-ripple="true">Add Customer</button>
                    </div>
                    <div style={{float: 'right'}}>
                        <button id="resetbtn" className="samplebtn e-control e-btn e-reset-btn" type="reset" data-ripple="true">Clear</button>
                    </div>
                </div>
            </div>
          </form>
          <br/>
          <br/>
         
    </div>
  </div>);
}
public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
};

public onChartLoad(args: ILoadedEventArgs): void {
    let  chart:  Element  =  document.getElementById('DialogChart');
    chart.setAttribute('title',  '');
};
    private buttonClick(): void {
    this.dialogInstance.show();
    }
    private dialogClose(): void {
    this.buttonEle.style.display = "block";
    }
    private dialogOpen(): void {
    this.buttonEle.style.display = "none";
    }

    public rendereComplete(): void {
      const options: FormValidatorModel = {
        // add the rules for validation
       rules: {
        'user': {
          required: [true, '* Enter your name']
        },
        'dob': {
          required: [true, '* Enter your date of birth']
        },
        'city': {
            required: [true, '* Enter your city']
        },
        'state': {
          required: [true, '* Enter your state']
      },
      }
    };
      // initialize the form validator
      this.formObject = new FormValidator('#formId', options);
    }

    public render(): JSX.Element {
        return (
            <div className='control-pane'>
                <div id='targetElement' className='control-section col-lg-12 defaultDialogComponent dialog-target'>
                    <button className="e-control e-btn dlgbtn" ref={this.buttonRef} onClick={this.buttonClick.bind(this)} id="dialogBtn"> Open</button>
          <DialogComponent id="defaultDialog" showCloseIcon={true} animationSettings={this.animationSettings} visible={true} width={'700px'} ref={dialog => this.dialogInstance = dialog}
                target={'#targetElement'} header='Syncfusion Components inside Dialog' buttons={this.buttons} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}>
                <TabComponent id="tab-wizard" ref={(tab) => { this.tabObj = tab }}>
                  <TabItemsDirective>
                    <TabItemDirective header={this.headerText[0]} content={this.content0.bind(this)} />
                    <TabItemDirective header={this.headerText[1]} content={this.content1.bind(this)} />
                    <TabItemDirective header={this.headerText[2]} content={this.content2.bind(this)} />
                    <TabItemDirective header={this.headerText[3]} content={this.content3.bind(this)} />
                    <TabItemDirective header={this.headerText[4]} content={this.content4.bind(this)} />
                  </TabItemsDirective>
                </TabComponent>
              </DialogComponent>
                </div>
                <div id="action-description">
                    <p>
                        This example demonstrates the default rendering of the dialog component with minimum configuration. Click close or press EThis example demonstrates how to integrate other React UI components within the dialog control. In the below example, The dialog component renders with the Grid, Schedule, Chart, Rich Text Editor, Tabs and Form components.
                    </p>
                </div>
                <div id="description">
                    <p>
                    Since the dialog is container component, you can integrate other React UI components within the dialog. The dialog can be renders with simple plain-text, HTML string, or React UI components. In the above sample, used major components such as Grid, Schedule, Chart, and Rich Text Editor inside dialog.
                    </p>
                </div>
            </div>
        );
    }
}
