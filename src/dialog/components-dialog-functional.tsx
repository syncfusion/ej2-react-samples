import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Browser } from '@syncfusion/ej2-base';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { DialogComponent, ButtonPropsModel, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { ScheduleComponent, ViewsDirective, ViewDirective,Day,Week, WorkWeek, Month, Agenda, Resize, DragAndDrop,DragEventArgs } from '@syncfusion/ej2-react-schedule';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, LineSeries, DateTime, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-react-charts';
import { RichTextEditorComponent, HtmlEditor, Toolbar, Image, Link, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import './components-dialog.css';
import { scheduleData, gridData } from './data';
import { updateSampleSection } from '../common/sample-base';

const ComponentsDialog = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);
  let buttons: ButtonPropsModel[];
  let animationSettings: AnimationSettingsModel;
  let dialogInstance = useRef<DialogComponent>(null);
  let formObject = useRef<FormValidator>(null);
  let buttonEle: HTMLButtonElement;
  let buttonRef: React.Ref<HTMLButtonElement> = (element) => {
    buttonEle = element;
  };
  buttons = [
    {
      click: () => {
        dialogInstance.current.hide();
      },
      buttonModel: {
        content: 'OK',
        isPrimary: true,
      },
    },
    {
      click: () => {
        dialogInstance.current.hide();
      },
      buttonModel: {
        content: 'CANCEL',
      },
    },
  ];
  animationSettings = { effect: 'None' };

  const onSubmitClick = (): void => {
    if (formObject.current.validate()) {
      formObject.current.element.reset();
    }
  }
  const data1: any[] = [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ];
  const data2: any[] = [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ];
  const onDragStart = (args: DragEventArgs): void => {
    args.navigation.enable = true;
  }
  const headerText: any = [
    { text: 'Grid' },
    { text: 'Scheduler' },
    { text: 'Chart' },
    { text: 'Rich Text Editor' },
    { text: 'Form' },
  ];

  const content0 = () => {
    return (
      <GridComponent dataSource={gridData} allowPaging={true} pageSettings={{ pageSize: 5, pageSizes: true }}>
        <ColumnsDirective>
          <ColumnDirective field="OrderID" headerText="Order ID" width="120" textAlign="Right" />
          <ColumnDirective field="CustomerName" headerText="Customer Name" width="150" />
          <ColumnDirective field="OrderDate" headerText="Order Date"width="130" format="yMd" textAlign="Right" />
          <ColumnDirective field="Freight" headerText="Freight" width="120" format="C2" textAlign="Right" />
          <ColumnDirective field="ShippedDate" headerText="Shipped Date" width="130" format="yMd" textAlign="Right" />
          <ColumnDirective field="ShipCountry" headerText="Ship Country" width="150" />
        </ColumnsDirective>
        <Inject services={[Page]} />
      </GridComponent>
    );
  }
  const content1 = () => {
    return (
      <ScheduleComponent height="300px" selectedDate={new Date(2019, 0, 10)} eventSettings={{ dataSource: scheduleData }} dragStart={onDragStart}>
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
      </ScheduleComponent>
    );
  }
  const content2 = () => {
    return (
      <ChartComponent id="DialogChart" primaryXAxis={{valueType: 'DateTime',labelFormat: 'y',intervalType: 'Years',edgeLabelPlacement: 'Shift',majorGridLines: { width: 0 },}} load={load} primaryYAxis={{labelFormat: '{value}%',rangePadding: 'None',minimum: 0,maximum: 100,interval: 20,lineStyle: { width: 0 },majorTickLines: { width: 0 },minorTickLines: { width: 0 },}} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} width={Browser.isDevice ? '100%' : '60%'} title="Inflation - Consumer Price" loaded={onChartLoad}>
        <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={data1} xName="x" yName="y" name="Germany" width={2} marker={{ visible: true, width: 10, height: 10 }} type="Line"></SeriesDirective>
          <SeriesDirective dataSource={data2} xName="x" yName="y" name="England" width={2} marker={{ visible: true, width: 10, height: 10 }} type="Line"></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    );
  }
  const content3 = () => {
    return (
      <RichTextEditorComponent id="defaultRTE">
        <p>
          The rich text editor component is WYSIWYG ("what you see is what you
          get") editor that provides the best user experience to create and
          update the content. Users can format their content using standard
          toolbar commands.
        </p>
        <p>
          <b>Key features:</b>
        </p>
        <ul>
          <li>
            <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
          </li>
          <li>
            <p>Capable of handling markdown editing.</p>
          </li>
          <li>
            <p>Contains a modular library to load the necessary functionality ondemand.</p>
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
  const content4 = () => {
    return (
      <div id="formComponents">
        <h4 className="form-title">Add Customer details</h4>
        <div className="validation_wrapper">
          <form id="formId" className="form-horizontal">
            <div className="form-group">
              <div className="e-float-input">
                <input type="text" id="user" name="user" data-msg-containerid="userError"/>
                <span className="e-float-line" />
                <label className="e-float-text e-label-top" htmlFor="name">User Name</label>
              </div>
              <div id="userError" />
            </div>
            <div className="form-group">
              <div className="e-float-input">
                <DatePickerComponent placeholder="Date of Birth" id="dob" name="dob" data-msg-containerid="dobError"/>
                <span className="e-float-line" />
              </div>
              <div id="dobError" />
            </div>
            <div className="form-group">
              <div className="e-float-input">
                <textarea id="Address" name="Address"></textarea>
                <span className="e-float-line" />
                <label className="e-float-text e-label-top" htmlFor="mobile">Address</label>
              </div>
              <div id="noError" />
            </div>
            <div className="form-group">
              <div className="e-float-input">
                <input type="text" id="city" name="city" data-msg-containerid="cityError"/>
                <span className="e-float-line" />
                <label className="e-float-text e-label-top" htmlFor="city">City</label>
              </div>
              <div id="cityError" />
            </div>
            <div className="form-group">
              <div className="e-float-input">
                <input type="text" id="state" name="state" data-msg-containerid="stateError"/>
                <span className="e-float-line" />
                <label className="e-float-text e-label-top" htmlFor="state">State</label>
              </div>
              <div id="stateError" />
            </div>
            <div className="row">
              <div className="submitRow">
                <div style={{ display: 'inline-block' }}>
                  <button id="submit-btn" className="samplebtn e-control e-btn e-primary e-submit-btn" onClick={onSubmitClick} type="submit" data-ripple="true">Add Customer</button>
                </div>
                <div style={{ float: 'right' }}>
                  <button id="resetbtn" className="samplebtn e-control e-btn e-reset-btn" type="reset" data-ripple="true">Clear</button>
                </div>
              </div>
            </div>
          </form>
          <br />
          <br />
        </div>
      </div>
    );
  }
  const load = (args: ILoadedEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
  }

  const onChartLoad = (): void => {
    let chart: Element = document.getElementById('DialogChart');
    chart.setAttribute('title', '');
  }
  const buttonClick = (): void => {
    dialogInstance.current.show();
  }
  const dialogClose = (): void => {
    buttonEle.style.display = 'block';
  }
  const dialogOpen = (): void => {
    buttonEle.style.display = 'none';
  }

  return (
    <div className="control-pane">
      <div id="targetElement" className="control-section col-lg-12 defaultDialogComponent dialog-target">
        <button className="e-control e-btn dlgbtn" ref={buttonRef} onClick={buttonClick} id="dialogBtn">Open</button>
        <DialogComponent id="defaultDialog" showCloseIcon={true} animationSettings={animationSettings} visible={true} width={'700px'} target={'#targetElement'} header="Syncfusion Components inside Dialog" buttons={buttons} open={dialogOpen} close={dialogClose}>
          <TabComponent id="tab-wizard">
            <TabItemsDirective>
              <TabItemDirective header={headerText[0]} content={content0} />
              <TabItemDirective header={headerText[1]} content={content1} />
              <TabItemDirective header={headerText[2]} content={content2} />
              <TabItemDirective header={headerText[3]} content={content3} />
              <TabItemDirective header={headerText[4]} content={content4} />
            </TabItemsDirective>
          </TabComponent>
        </DialogComponent>
      </div>
      <div id="action-description">
        <p>
          This example demonstrates the default rendering of the dialog
          component with minimum configuration. Click close or press Esc This
          example demonstrates how to integrate other React UI components within
          the dialog control. In the below example, The dialog component renders
          with the Grid, Schedule, Chart, Rich Text Editor, Tabs and Form
          components.
        </p>
      </div>
      <div id="description">
        <p>
          Since the dialog is container component, you can integrate other React
          UI components within the dialog. The dialog can be renders with simple
          plain-text, HTML string, or React UI components. In the above sample,
          used major components such as Grid, Schedule, Chart, and Rich Text
          Editor inside dialog.
        </p>
      </div>
    </div>
  );
}
export default ComponentsDialog;