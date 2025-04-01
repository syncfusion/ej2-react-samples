/**
 * Default PDF Viewer sample
 */
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
  ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, Inject, HighlightSettings, UnderlineSettings, StrikethroughSettings, LineSettings, ArrowSettings, RectangleSettings, CircleSettings, PolygonSettings, DistanceSettings, PerimeterSettings, AreaSettings, RadiusSettings, VolumeSettings, FreeTextSettings, StampSettings, DynamicStampItem, SignStampItem, StandardBusinessStampItem, CustomStampSettings, InkAnnotationSettings, StickyNotesSettings, AnnotationMoveEventArgs,
  LoadEventArgs,
  AnnotationSelectEventArgs,
  AllowedInteraction,
  AnnotationResizeEventArgs,
  DecoratorShapes
} from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent, CheckBoxComponent, SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
import { ChangeEventArgs, DropDownListComponent, DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { ColorPickerComponent, NumericTextBoxComponent, RemovingEventArgs, SuccessEventArgs, TextBoxComponent, UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-react-grids';
import { ContextMenuComponent, MenuEventArgs } from '@syncfusion/ej2-react-navigations';
import { NumberFormat } from '@syncfusion/ej2-base/src/intl/number-formatter';


interface VertexPoint {
  x: number;
  y: number;
  id: string;
}

interface StateType {
  annotationType: string,
  stampType: string,
  stampComment: string,
  pageNumber: number,
  x: number,
  y: number,
  width: number,
  height: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  vertexPoints: VertexPoint[],
  bounds: any[],
  strokeThickness: number,
  opacity: number,
  fillColor: string,
  strokeColor: string,
  lineHeadStartStyle: string,
  lineHeadEndStyle: string,
  leaderLength: number,
  inkAnnotationType: string,
  defaultText: string,
  fontFamily: string,
  alignment: string,
  fontStyle: string,
  fontSize: number,
  fontColor: string,
  allowedInteractions: any[],
  author: string,
  comment: string,
  commentState: string,
  replyAuthor: string,
  replyComment: string,
  replyState: string,
  replies: Comment[],
  showStampType: boolean,
  showAnnotationList: boolean,
  showPageNumber: boolean,
  showAddAnnotation: boolean,
  showUpdateAnnotation: boolean,
  showStrokeProps: boolean,
  showBoundsButtons: boolean,
  showFillColor: boolean,
  showXYRow: boolean,
  showX1Y1Row: boolean,
  showX2Y2Row: boolean,
  showHeightWidthRow: boolean,
  showLineProps: boolean,
  showVertexButtons: boolean,
  showInkAnnotationType: boolean,
  showFreeTextProps: boolean,
  showFileUploader: boolean,
  showLeaderLength: boolean,
  isReplyBoxChecked: boolean,
  lockAnnotation: boolean,
  printAnnotation: boolean,
  isEditing: boolean,
  pageCount: number,
  disableInkAnnotField: boolean,
  isDeleteBoundsDisabled: boolean,
  isDeleteVertexDisabled: boolean,
  currentCommentsList: { Type: string, Value: string }[]
}

class ProgrammaticOperations extends SampleBase<{}, StateType> {
  
  constructor(props) {
    super(props);
    if (this.selectedAnnotation === null) {
      this.selectedAnnotation = new AnnotationBase();
    }
    this.state = {
      annotationType: this.selectedAnnotation.annotationType,
      stampType: this.selectedAnnotation.stampType,
      stampComment: this.selectedAnnotation.stampComment,
      pageNumber: this.selectedAnnotation.pageNumber,
      x: this.selectedAnnotation.x,
      y: this.selectedAnnotation.y,
      width: this.selectedAnnotation.width,
      height: this.selectedAnnotation.height,
      x1: this.selectedAnnotation.vertexX1,
      y1: this.selectedAnnotation.vertexY1,
      x2: this.selectedAnnotation.vertexX2,
      y2: this.selectedAnnotation.vertexY2,
      vertexPoints: this.selectedAnnotation.vertexPoints,
      bounds: this.selectedAnnotation.bounds,
      strokeThickness: this.selectedAnnotation.thickness,
      opacity: this.selectedAnnotation.opacity,
      fillColor: this.selectedAnnotation.fillColor,
      strokeColor: this.selectedAnnotation.strokeColor,
      lineHeadStartStyle: this.selectedAnnotation.lineHeadStartStyle,
      lineHeadEndStyle: this.selectedAnnotation.lineHeadEndStyle,
      leaderLength: this.selectedAnnotation.leaderLength,
      inkAnnotationType: this.selectedAnnotation.inkAnnotationType,
      defaultText: this.selectedAnnotation.defaultText,
      fontFamily: this.selectedAnnotation.fontFamily,
      alignment: this.selectedAnnotation.alignment,
      fontStyle: this.selectedAnnotation.fontStyle,
      fontSize: this.selectedAnnotation.fontSize,
      fontColor: this.selectedAnnotation.fontColor,
      allowedInteractions: this.selectedAnnotation.allowedInteractions,
      author: this.selectedAnnotation.author,
      comment: this.selectedAnnotation.comment,
      commentState: this.selectedAnnotation.setState,
      replyAuthor: this.selectedAnnotation.replyAuthor,
      replyComment: this.selectedAnnotation.replyComment,
      replyState: this.selectedAnnotation.replyState,
      replies: this.selectedAnnotation.replies,
      showStampType: false,
      showAnnotationList: true,
      showPageNumber: true,
      showAddAnnotation: true,
      showUpdateAnnotation: false,
      showStrokeProps: true,
      showBoundsButtons: false,
      showFillColor: true,
      showXYRow: true,
      showX1Y1Row: false,
      showX2Y2Row: false,
      showHeightWidthRow: true,
      showLineProps: false,
      showVertexButtons: false,
      showInkAnnotationType: false,
      showFreeTextProps: false,
      showFileUploader: false,
      showLeaderLength: false,
      isReplyBoxChecked: false,
      lockAnnotation: false,
      printAnnotation: true,
      isEditing: false,
      pageCount: 1,
      disableInkAnnotField: false,
      isDeleteBoundsDisabled: true,
      isDeleteVertexDisabled: true,
      currentCommentsList: this.dynamicstampCommentsList
    };
  }
  public toolbarSettings: object = { 
    showTooltip: true,
    toolbarItems: [
      "OpenOption",
      "UndoRedoTool",
      "PageNavigationTool",
      "MagnificationTool",
      "PanTool",
      "SelectionTool",
      "CommentTool",
      "SubmitForm",
      "FormDesignerEditTool",
      "FreeTextAnnotationOption",
      "InkAnnotationOption",
      "ShapeAnnotationOption",
      "StampAnnotation",
      "SignatureOption",
      "SearchOption",
      "PrintOption",
      "DownloadOption"
    ],
    formDesignerToolbarItems: [
      "TextboxTool",
      "PasswordTool",
      "CheckBoxTool",
      "RadioButtonTool",
      "DropdownTool",
      "ListboxTool",
      "DrawSignatureTool",
      "DeleteTool"
    ]
  }
  public vertexTableNumberFormat = NumberFormat.numberFormatter(undefined, {maximumFractionDigits: 0}, undefined); 
  public selectedAnnotation: AnnotationBase = null;
  public viewer: PdfViewerComponent;
  public uploaderObj: UploaderComponent;
  public contextMenu: ContextMenuComponent;
  public currentEditCommentId: string;
  public currentUpdateAnnotationID: string;
  public commentStatusList: { Status: string }[] = [
    { Status: 'None' },
    { Status: 'Accepted' },
    { Status: 'Cancelled' },
    { Status: 'Completed' },
    { Status: 'Rejected' }
  ];
  public commentStatusListfields: object = { text: 'Status' };
  public currentCommentStatus: string = 'None';
  public lineHeadstatusList: { Type: string, Value: string }[] = [
    { Type: 'None', Value: "None" },
    { Type: 'Closed Arrow', Value: "Arrow" },
    { Type: 'Open Arrow', Value: "OpenArrow" },
    { Type: 'Sqaure', Value: "Square" },
    { Type: 'Diamond', Value: "Diamond" },
    { Type: 'Round', Value: "Circle" }
  ];
  public lineHeadstatusfield: object = { text: 'Type', value: 'Value' };
  public inkAnnotationDataList: { Type: string }[] =
    [
      { Type: 'Syncfusion' },
      { Type: 'PdfViewer' },
      { Type: 'Star' }
    ];
  public inkAnnotationfield: object = { text: 'Type' }
  public stampTypeDataList: { Type: string }[] =
    [
      { Type: 'Dynamic' },
      { Type: 'Sign Here' },
      { Type: 'Standard Business' },
    ];
  public stampTypeDatafields: object = { text: 'Type' }
  public dynamicstampCommentsList: { Type: string, Value: string }[] =
    [
      { Type: 'Approved', Value: "Approved" },
      { Type: 'Confidential', Value: "Confidential" },
      { Type: 'Not Approved', Value: "NotApproved" },
      { Type: 'Received', Value: "Received" },
      { Type: 'Reviewed', Value: "Reviewed" },
      { Type: 'Revised', Value: "Revised" },
    ];

  public sighhereCommentsList: { Type: string, Value: string }[] =
    [
      { Type: 'Accepted', Value: "Accepted" },
      { Type: 'Initial Here', Value: "InitialHere" },
      { Type: 'Rejected', Value: "Rejected" },
      { Type: 'Sign Here', Value: "SignHere" },
      { Type: 'Witness', Value: "Witness" },
    ];
  public StandardBusinessStampsList: { Type: string, Value: string }[] =
    [
      { Type: 'Approved', Value: "Approved" },
      { Type: 'Not Approved', Value: 'NotApproved' },
      { Type: 'Completed', Value: "Completed" },
      { Type: 'Confidential', Value: "Confidential" },
      { Type: 'Draft', Value: "Draft" },
      { Type: 'Final', Value: "Final" },
      { Type: 'For Public Release', Value: "ForPublicRelease" },
      { Type: 'Information Only', Value: "InformationOnly" },
      { Type: 'Not For Public Release', Value: "NotForPublicRelease" },
      { Type: 'Preliminary Results', Value: "PreliminaryResults" },
      { Type: 'Void', Value: "Void" },
      { Type: 'For Comment', Value: "ForComment" }
    ];
  public stampCommentsTypeDatafields: object = { text: 'Type', value: 'Value' }
  public currentCommentsList: { Type: string, Value: string }[] = this.dynamicstampCommentsList;
  public freeTextFontFamilyList: { Type: string, Value: string }[] =
    [
      { Type: 'Helvetica', Value: 'Helvetica' },
      { Type: 'Courier', Value: 'Courier' },
      { Type: 'Symbol', Value: 'Symbol' },
      { Type: 'Times New Roman', Value: 'TimesNewRoman' }
    ];
  public freetextFontFamilyFields: object = { text: 'Type', value: 'Value' }
  public freeTextAlignmentList: { Type: string, Value: string }[] =
    [
      { Type: 'Center', Value: 'Center' },
      { Type: 'Right', Value: 'Right' },
      { Type: 'Left', Value: 'Left' },
      { Type: 'Justify', Value: 'Justify' }
    ];
  public freeTextAlignmentField: object = { text: 'Type', value: 'Value' }
  public freeTextFontStyleList: { Type: string, Value: string }[] =
    [
      { Type: 'None', Value: 'None' },
      { Type: 'Bold', Value: 'Bold' },
      { Type: 'Underline', Value: 'Underline' },
      { Type: 'Italic', Value: 'Italic' },
      { Type: 'Strike through', Value: 'Strikethrough' }
    ];
  public freeTextFontStyleFields: object = { text: 'Type', value: 'Value' };
  public intractionsList: object[] =
    [
      { Type: 'None', Value: "None" },
      { Type: 'Delete', Value: "Delete" },
      { Type: 'Property Change', Value: "PropertyChange" },
      { Type: 'Move', Value: "Move" },
      { Type: 'Select', Value: "Select" },
      { Type: 'Resize', Value: "Resize" },
    ];

  public intractionsListfield: Object = { dataSource: this.intractionsList, value: 'Value', text: 'Type' };
  public annotationsList: { className: string, Text: string }[] = [
    { className: 'Highlight', Text: 'Highlight' },
    { className: 'Underline', Text: 'Underline' },
    { className: 'Strikethrough', Text: 'Strikethrough' },
    { className: 'Line', Text: 'Line' },
    { className: 'Arrow', Text: 'Arrow' },
    { className: 'Rectangle', Text: 'Rectangle' },
    { className: 'Circle', Text: 'Circle' },
    { className: 'Polygon', Text: 'Polygon' },
    { className: 'Distance', Text: 'Distance' },
    { className: 'Perimeter', Text: 'Perimeter' },
    { className: 'Area', Text: 'Area' },
    { className: 'Radius', Text: 'Radius' },
    { className: 'Volume', Text: 'Volume' },
    { className: 'StickyNotes', Text: 'StickyNotes' },
    { className: 'Ink', Text: 'Ink' },
    { className: 'Stamp', Text: 'Stamp' },
    { className: 'CustomStamp', Text: 'CustomStamp' },
    { className: 'FreeText', Text: 'FreeText' },
  ];
  public annotationListFields: Object = { text: 'Text', value: 'className' };

  public annotationSelectedEvent(annotationSelectEventArgs: AnnotationSelectEventArgs) {
    this.viewer.enableCommentPanel = true;
    this.selectedAnnotation.annotationSelected = true;
    this.currentUpdateAnnotationID = annotationSelectEventArgs.annotationId;
    let currentAnnotation : any = this.getAnnotationById(this.currentUpdateAnnotationID);
    if (currentAnnotation) {
      this.updateProperties(currentAnnotation);
      this.setState({
        showAddAnnotation: false,
        showUpdateAnnotation: true,
        showAnnotationList: false,
        showPageNumber: false
      });
    }
  }
  public annotationUnSelectedEvent() {
    this.viewer.enableCommentPanel = false;
    this.selectedAnnotation.annotationSelected = false;
    this.currentUpdateAnnotationID = "";
    this.resetAnnotationProperties();
    this.setState({
      showAnnotationList: true,
      showUpdateAnnotation: false,
      showAddAnnotation: true,
      showPageNumber: true
    });
  };
  public Reset() {
    this.resetAnnotationProperties();
    if (this.selectedAnnotation.annotationSelected) {
      this.selectedAnnotation.showFileUploader = false;
      this.selectedAnnotation.disableInkAnnotField = true;
      this.selectedAnnotation.showStampType = false;
      this.updatePropertiesInUI();
    }
  }
  render() {
    return (<div>
      <div className='col-lg-9 e-pv-control-section e-pv-pdfviewer-control-section'>
        <div className="e-pv-flex-container">
          <label htmlFor="checked" className="e-pv-switchLabel" > Standalone PDF Viewer </label>
          <div className="e-message render-mode-info">
            <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
          </div>
          <div>
            <SwitchComponent cssClass="e-pv-buttonSwitch" id="checked" change={this.change} checked={true}></SwitchComponent>
          </div>
        </div>

        {/* Render the PDF Viewer */}
        <PdfViewerComponent ref={(scope) => { this.viewer = scope; }} id="container" documentPath="https://cdn.syncfusion.com/content/pdf/annotations.pdf" resourceUrl="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" toolbarSettings={this.toolbarSettings} documentLoad={this.documentLoaded} annotationSelect={this.annotationSelectedEvent} annotationUnSelect={this.annotationUnSelectedEvent} annotationMove={this.onAnnotationMoved} annotationResize={this.onAnnotationResized} annotationRemove={this.annotationUnSelectedEvent} style={{ 'height': '640px' }}>
          <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]} />
        </PdfViewerComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the creation of various types of annotations in the PDF viewer, including text markup, shapes, measurements, free text, stamps, handwritten signatures, ink, and sticky notes. Additionally, we can customize existing annotations or add new annotations programmatically in the PDF viewer using the provided options.</p>
      </div>

      <div className="col-lg-3 e-pv-property-section-pdfviewer e-pv-main-panel">
        <div className="property-panel-header header-panel">
          Properties
          <button id="e-pv-refresh-button-icon" className="e-btn e-bigger e-lib e-flat e-icon-btn"
            value=''
            onClick={this.Reset}>
            <span className="e-icons e-refresh e-btn-icon"></span>
          </button>
        </div>
        <div className="e-pv-property-panel-content">
          <div className="e-pv-pdfviewer-text-content"><span>Annotation Type</span></div>
          <div className="e-pv-input-item">
            <DropDownListComponent
              dataSource={this.annotationsList}
              value={this.state.annotationType}
              change={(e) => this.onAnnotationChange(e as unknown as ChangeEventArgs)}
              fields={this.annotationListFields}
              enabled={this.state.showAnnotationList}
            />
          </div>
          <div className="e-pv-annot-inner-container" hidden={!this.state.showStampType}>
            <div className="e-pv-pdfviewer-input-title"><span>Stamp Type</span></div>
            <div className="e-pv-input-item">
              <DropDownListComponent
                dataSource={this.stampTypeDataList}
                fields={this.stampTypeDatafields}
                value={this.state.stampType}
                change={(e) => {this.onStampTypeChange(e); this.onpropertiesvaluechanges("stampType", e)}}
              />
            </div>
            <div className="e-pv-pdfviewer-input-title"><span>Comments</span></div>
            <div className="e-pv-input-item">
              <DropDownListComponent
                dataSource={this.currentCommentsList}
                fields={this.stampCommentsTypeDatafields}
                value={this.state.stampComment}
                change={(e) => this.onpropertiesvaluechanges('stampComment', e)}
              />
            </div>
          </div>
          <div className="e-pv-pdfviewer-input-title" id='e-pv-customStamp' hidden={this.state.showFileUploader}>
            <UploaderComponent ref={(scope) => { this.dropImageElement; this.uploaderObj = scope }}
              asyncSettings={this.pdfviewerApiPath}
              dropArea={this.dropImageElement}
              removing={this.onFileRemove}
              success={this.onFileSuccess}
            />
          </div>
          <div className="e-pv-pdfviewer-input-title"><span>Page Number</span></div>
          <div className="e-pv-input-item">
            <NumericTextBoxComponent
              id="e-pv-pdfViewer-pagenumber-annotation"
              format="n0"
              value={this.state.pageNumber}
              change={(e) => this.onpropertiesvaluechanges('pageNumber', e)}
              min={1}
              max={this.state.pageCount}
              enabled={this.state.showPageNumber}
            />
          </div>
          <div className="e-pv-pdfviewer-input-title"><span>Settings:</span></div>
          <div className="e-pv-annot-inner-container" style={{ padding: '0 0 12px 0' }}>
            <table className="e-pv-annot-inner-table">
              <tbody>
                <tr hidden={!this.state.showXYRow}>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>X Position</span>
                        <div className="e-pv-input-item">
                          <NumericTextBoxComponent
                            value={this.state.x}
                            min={0}
                            format='###.##'
                            showSpinButton={false}
                            change={(e) => this.onpropertiesvaluechanges('x', e)}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>Y Position</span>
                        <div className="e-pv-input-item">
                          <NumericTextBoxComponent
                            value={this.state.y}
                            min={0}
                            format='###.##'
                            showSpinButton={false}
                            change={(e) => this.onpropertiesvaluechanges('y', e)}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr hidden={!this.state.showHeightWidthRow}>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>Width</span>
                        <div className="e-pv-input-item">
                          <NumericTextBoxComponent
                            value={this.state.width}
                            min={0}
                            format='###.##'
                            showSpinButton={false}
                            change={(e) => this.onpropertiesvaluechanges('width', e)}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>Height</span>
                        <div className="e-pv-input-item">
                          <NumericTextBoxComponent
                            value={this.state.height}
                            min={0}
                            format='###.##'
                            showSpinButton={false}
                            change={(e) => this.onpropertiesvaluechanges('height', e)}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr hidden={!this.state.showX1Y1Row}>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>X1 Position</span>
                        <div className="e-pv-input-item">
                          <NumericTextBoxComponent
                            value={this.state.x1}
                            min={0}
                            format='###.##'
                            showSpinButton={false}
                            change={(e) => this.onpropertiesvaluechanges('vertexX1', e)}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>Y1 Position</span>
                        <div className="e-pv-input-item">
                          <NumericTextBoxComponent
                            value={this.state.y1}
                            min={0}
                            format='###.##'
                            showSpinButton={false}
                            change={(e) => this.onpropertiesvaluechanges('vertexY1', e)}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr hidden={!this.state.showX2Y2Row}>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>X2 Position</span>
                        <div className="e-pv-input-item">
                          <NumericTextBoxComponent
                            value={this.state.x2}
                            min={0}
                            format='###.##'
                            showSpinButton={false}
                            change={(e) => this.onpropertiesvaluechanges('vertexX2', e)}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>Y2 Position</span>
                        <div className="e-pv-input-item">
                          <NumericTextBoxComponent
                            value={this.state.y2}
                            min={0}
                            format='###.##'
                            showSpinButton={false}
                            change={(e) => this.onpropertiesvaluechanges('vertexY2', e)}
                          /></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>Shape Opacity</span>
                        <div className="e-pv-input-item">
                          <NumericTextBoxComponent
                            value={this.state.opacity}
                            format='n0'
                            showSpinButton={false}
                            min={0}
                            max={100}
                            change={(e) => this.onpropertiesvaluechanges('opacity', e)}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td hidden={!this.state.showFillColor}>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>Fill Color</span>
                        <div className="e-pv-input-item">
                          <ColorPickerComponent
                            value={this.state.fillColor ?? "#FFFFFF00"}
                            change={(e) => this.onpropertiesvaluechanges('fillColor', e)}
                            mode='Palette'
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr hidden={!this.state.showStrokeProps}>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>Stroke Thickness</span>
                        <div className="e-pv-input-item">
                          <NumericTextBoxComponent
                            value={this.state.strokeThickness}
                            min={0}
                            max={12}
                            format='n0'
                            showSpinButton={false}
                            change={(e) => this.onpropertiesvaluechanges('thickness', e)}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="e-pv-pdfviewer-text-content">
                        <span>Stroke Color</span>
                        <div className="e-pv-input-item">
                          <ColorPickerComponent
                            value={this.state.strokeColor}
                            change={(e) => this.onpropertiesvaluechanges('strokeColor', e)}
                            mode='Palette'
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ padding: '12px 12px 0 12px' }}>
            <table className="e-pv-annot-inner-table e-pv-annot-bounds-list" style={{borderCollapse: "collapse"}}>
              <tbody>
                {(this.state.annotationType === "Highlight" || this.state.annotationType === "Underline" || this.state.annotationType === "Strikethrough") &&
                  (this.state.bounds && this.state.bounds.length > 0) && (this.state.bounds.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="e-pv-table-items">
                            <div>X{index + 1} = {this.vertexTableNumberFormat(item.X)}</div>
                            <div>Y{index + 1} = {this.vertexTableNumberFormat(item.Y)}</div>
                          </div>
                        </td>
                        <td>
                          <div className="e-pv-table-items">
                            <div>W{index + 1} = {this.vertexTableNumberFormat(item.Width)}</div>
                            <div>H{index + 1} = {this.vertexTableNumberFormat(item.Height)}</div>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
              </table>
              <table className="e-pv-annot-inner-table e-pv-pdfViewer-coordinate-table" style={{borderCollapse: "collapse"}}>
                <tbody>
                  {(this.state.annotationType !== "Line" && this.state.annotationType !== "Distance" && this.state.vertexPoints && this.state.vertexPoints.length > 0) &&
                  (this.state.vertexPoints.map((item: VertexPoint, index) => {
                    return (
                      <tr key={item.id}>
                        {index % 2 === 0 ? (
                          <>
                            <td>
                              <div className="e-pv-table-items">
                                <div>X{index + 1} = {this.vertexTableNumberFormat(item.x)}</div>
                                <div>Y{index + 1} = {this.vertexTableNumberFormat(item.y)}</div>
                              </div> 
                            </td>
                            {index + 1 < this.state.vertexPoints.length ? (
                              <td>
                                <div className="e-pv-table-items">
                                  <div>X{index + 2} = {this.vertexTableNumberFormat(this.state.vertexPoints[index + 1].x)}</div>
                                  <div>Y{index + 2} = {this.vertexTableNumberFormat(this.state.vertexPoints[index + 1].y)}</div>
                                </div>
                              </td>
                            ) : <td style={{border: "none"}}></td>}
                          </>
                        ) : null}
                      </tr>
                    )
                  }
                  ))}
                </tbody>
              </table>
            </div>
            <div hidden={!this.state.showBoundsButtons}>
              <div className="e-pv-annot-button-section" style={{ padding: '12px 12px 0 0', border: 0 }}>
                <ButtonComponent
                  isPrimary={true}
                  style={{ textTransform: 'capitalize' }}
                  onClick={this.OnBoundsDelete}
                  disabled={this.state.isDeleteBoundsDisabled}
                >
                  Delete
                </ButtonComponent>
                <ButtonComponent
                  isPrimary={true}
                  style={{ textTransform: 'capitalize' }}
                  onClick={() => {this.addBounds(); this.onpropertiesvaluechanges("", {isInteracted: true})}}
                >
                  Add Bounds
                </ButtonComponent>
              </div>
            </div>
            <div id='e-pv-lineistrue' hidden={!this.state.showLineProps} style={{ padding: '0px 12px 12px 12px' }}>
              <div className="e-pv-pdfviewer-input-title"><span>Line Head Start</span></div>
              <div className="e-pv-input-item">
                <DropDownListComponent
                  dataSource={this.lineHeadstatusList}
                  fields={this.lineHeadstatusfield}
                  value={this.state.lineHeadStartStyle}
                  change={(e) => this.onpropertiesvaluechanges('lineHeadStartStyle', e)}
                />
              </div>
              <div className="e-pv-pdfviewer-input-title"><span>Line Head End</span></div>
              <div className="e-pv-input-item">
                <DropDownListComponent
                  dataSource={this.lineHeadstatusList}
                  fields={this.lineHeadstatusfield}
                  value={this.state.lineHeadEndStyle}
                  change={(e) => this.onpropertiesvaluechanges('lineHeadEndStyle', e)}
                />
              </div>
              <div id='e-pv-distanceistrue' hidden={!this.state.showLeaderLength}>
                <div className="e-pv-pdfviewer-input-title"><span>Leader Length</span></div>
                <div className="e-pv-input-item">
                  <NumericTextBoxComponent
                    value={this.state.leaderLength}
                    format='###.##'
                    showSpinButton={false}
                    change={(e) => this.onpropertiesvaluechanges('leaderLength', e)}
                  />
                </div>
              </div>
              <div hidden={!this.state.showVertexButtons}>
                <div className="e-pv-annot-button-section" style={{ padding: '12px 12px 0 0', border: 0 }}>
                  <ButtonComponent
                    isPrimary={true}
                    style={{ textTransform: 'capitalize' }}
                    onClick={this.onDeleteVertex}
                    disabled={this.state.isDeleteVertexDisabled}
                  >
                    Delete
                  </ButtonComponent>
                  <ButtonComponent
                    isPrimary={true}
                    style={{ textTransform: 'capitalize' }}
                    onClick={() => {this.addVertex(); this.onpropertiesvaluechanges("", {isInteracted: true})}}
                  >
                    Add Vertex
                  </ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div hidden={!this.state.showInkAnnotationType}>
          <div style={{ padding: '0 0 12px 0' }}>
            <div className="e-pv-pdfviewer-input-title"><span>Ink Annotation</span></div>
            <div className="e-pv-input-item">
              <DropDownListComponent
                dataSource={this.inkAnnotationDataList}
                fields={this.inkAnnotationfield}
                value={this.state.inkAnnotationType}
                change={(e) => this.onpropertiesvaluechanges('inkAnnotationType', e)}
                enabled={!this.state.disableInkAnnotField}
              />
            </div>
          </div>
        </div>

        <div id='e-pv-textistrue' className="e-pv-annot-inner-container" hidden={!this.state.showFreeTextProps}>
          <div className="e-pv-pdfviewer-input-title"><span>Text Properties:</span></div>
          <div className="e-pv-annot-inner-container">
            <div className="e-pv-pdfviewer-text-content" style={{ marginTop: '0%' }}><span>Default Text</span></div>
            <div className="e-pv-input-item">
              <TextBoxComponent
                value={this.state.defaultText}
                change={(e) => this.onpropertiesvaluechanges('defaultText', e)}
              />
            </div>
            <div className="e-pv-pdfviewer-input-title"><span>Font Family</span></div>
            <div className="e-pv-input-item">
              <DropDownListComponent
                dataSource={this.freeTextFontFamilyList}
                fields={this.freetextFontFamilyFields}
                value={this.state.fontFamily}
                change={(e) => this.onpropertiesvaluechanges('fontFamily', e)}
              />
            </div>
            <div className="e-pv-pdfviewer-input-title"><span>Alignment</span></div>
            <div className="e-pv-input-item">
              <DropDownListComponent
                dataSource={this.freeTextAlignmentList}
                fields={this.freeTextAlignmentField}
                value={this.state.alignment}
                change={(e) => this.onpropertiesvaluechanges('alignment', e)}
              />
            </div>
            <div className="e-pv-pdfviewer-input-title"><span>Font Style</span></div>
            <div className="e-pv-input-item">
              <DropDownListComponent
                dataSource={this.freeTextFontStyleList}
                fields={this.freeTextFontStyleFields}
                value={this.state.fontStyle}
                change={(e) => this.onpropertiesvaluechanges('fontStyle', e)}
              />
            </div>
            <div className="e-pv-pdfviewer-input-title">
              <table className="e-pv-annot-inner-table">
                <tbody>
                  <tr>
                    <td style={{ width: '50%', padding: '0' }}>
                      <span>Font Size</span>
                      <div className="e-pv-input-item">
                        <NumericTextBoxComponent
                          value={this.state.fontSize}
                          format='n0'
                          showSpinButton={false}
                          change={(e) => this.onpropertiesvaluechanges('fontSize', e)}
                        />
                      </div>
                    </td>
                    <td style={{ padding: '0' }}>
                      <div style={{ marginLeft: '12px' }} className="e-pv-text-content">
                        <span>Font Color</span>
                        <div className="e-pv-input-item">
                          <ColorPickerComponent
                            value={this.state.fontColor}
                            mode="Palette"
                            change={(e) => this.onpropertiesvaluechanges('fontColor', e)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="e-pv-pdfviewer-input-title">
          <table>
            <tbody>
              <tr>
                <td className="e-pv-check-box-row">
                  <CheckBoxComponent 
                    checked={this.state.printAnnotation}
                    change={(e) => {this.onPrintCheckBoxChange(e as unknown as CheckBoxChangeEventArgs); this.onpropertiesvaluechanges("", {isInteracted: true});}} 
                  />
                </td>
                <td className="e-pv-check-box-row"><span>Print Annotation</span></td>
              </tr>
              <tr>
                <td className="e-pv-check-box-row">
                  <CheckBoxComponent
                    checked={this.state.lockAnnotation}
                    change={(e) => {this.onCheckboxChangeIntractionBox(e as unknown as CheckBoxChangeEventArgs); this.onpropertiesvaluechanges("", {isInteracted: true});}}
                  />
                </td>
                <td className="e-pv-check-box-row"><span>Lock Annotation</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id='e-pv-allowInteraction' hidden={!this.state.lockAnnotation}>
          <div className="e-pv-pdfviewer-input-title e-pv-pdfviewer-text-content"><span>Allow Interactions</span></div>
          <div className="e-pv-input-item">
            <DropDownTreeComponent
              fields={this.intractionsListfield}
              showCheckBox={true}
              value={this.state.allowedInteractions}
              change={(e) => {this.onInteractionValueChange(e as unknown as ChangeEventArgs); this.onpropertiesvaluechanges("", {isInteracted: true});}}
            />
          </div>
        </div>

        <div className="e-pv-pdfviewer-input-title"><span>Add Comments</span></div>
        <div className="e-pv-pdfviewer-input-title"><span>Author</span></div>
        <div className="e-pv-input-item">
          <TextBoxComponent
            placeholder="Enter text"
            value={this.state.author}
            change={(e) => this.onpropertiesvaluechanges('author', e)}
          />
        </div>
        <div className="e-pv-pdfviewer-input-title"><span>Content</span></div>
        <div className="e-pv-input-item">
          <TextBoxComponent
            value={this.state.comment}
            change={(e) => this.onpropertiesvaluechanges('comment', e)}
            placeholder='New Comment'
          />
        </div>
        <div className="e-pv-pdfviewer-input-title"><span>Status</span></div>
        <div className="e-pv-input-item">
          <DropDownListComponent
            dataSource={this.commentStatusList}
            fields={this.commentStatusListfields}
            value={this.state.commentState}
            change={(e) => this.onpropertiesvaluechanges('setState', e)}
          />
        </div>
        <div className="e-pv-pdfviewer-input-title">
          <table>
            <tbody>
              <tr>
                <td className="e-pv-check-box-row">
                  <CheckBoxComponent
                    checked={this.state.isReplyBoxChecked}
                    change={(e) => {this.onCheckboxChangeReplyBox(e as unknown as CheckBoxChangeEventArgs); this.onpropertiesvaluechanges("", {isInteracted: true});}}
                  />
                </td>
                <td className="e-pv-check-box-row"><span>Reply</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div hidden={!this.state.isReplyBoxChecked}>
          <div className="pdfviewer-input-title" hidden={this.state.replies.length <= 0}>Replies:</div>
          <div className="e-pv-annot-inner-container replies">
            {this.state.replies.map((comment) => (
              <div className="e-pv-reply-container" id={comment.id} key={comment.id}>
                <div className="reply-icon e-pv-comment-icon e-pv-icon"></div>
                <div className="e-pv-reply-main-container">
                  <div className="reply-text">{`${comment.author} - ${comment.modifiedDate}`}</div>
                  <div className="reply-text">{`${comment.note} ${comment.state !== "None" ? comment.state : ""}`}</div>
                </div>
                <div className="more-container" style={{width: "min-content"}}>
                  <button
                    className="e-control e-btn e-lib e-flat e-icon-btn context-menu-btn"
                    data-id={comment.id}
                    onClick={(event) => {
                        this.OpenContextMenu(event as unknown as MouseEvent);
                    }}
                    onMouseDown={() => {this.getCommentID(comment.id)}}
                    style={{ padding: "5px 4px" }}
                  >
                    <span className="e-icons e-more-vertical-1 e-btn-icon"></span>
                  </button>
                </div>
              </div>))
            }
          </div>
          <ContextMenuComponent ref={(scope) => {this.contextMenu = scope}} items={this.selectedAnnotation.replyMenuItems} select={(event) => {this.contextMenuItemSelected(event as unknown as MenuEventArgs)}}></ContextMenuComponent>
        </div>

        <div className="e-pv-annot-inner-container e-pv-pdfViewer-checked-Content" id='e-pv-replyBox' style={{ padding: '10px' }} hidden={!this.state.isReplyBoxChecked}>
          <div className="e-pv-pdfviewer-input-title"><span>Author</span></div>
          <div className="e-pv-input-item">
            <TextBoxComponent
              placeholder="Enter text"
              value={this.state.replyAuthor}
              change={(e) => this.onpropertiesvaluechanges('replyAuthor', e)}
            />
          </div>
          <div className="e-pv-pdfviewer-input-title"><span>Content</span></div>
          <div className="e-pv-input-item">
            <TextBoxComponent
              value={this.state.replyComment}
              change={(e) => this.onpropertiesvaluechanges('replyComment', e)}
              placeholder='Reply Comment'
            />
          </div>
          <div className="e-pv-pdfviewer-input-title"><span>Status</span></div>
          <div className="e-pv-input-item">
            <DropDownListComponent
              id=''
              dataSource={this.commentStatusList}
              fields={this.commentStatusListfields}
              value={this.state.replyState}
              change={(e) => this.onpropertiesvaluechanges('replyState', e)}
            />
          </div>
          <div className="e-pv-annot-button-section" style={{ padding: '12px 0 0 0', border: 0 }}>
            <div hidden={this.state.isEditing}>
              <ButtonComponent isPrimary={true} style={{ textTransform: 'capitalize' }} onClick={() => {this.updateReply(); this.onpropertiesvaluechanges("", {isInteracted: true});}}>Add Reply</ButtonComponent>
            </div>
            <div hidden={!this.state.isEditing}>
              <ButtonComponent isPrimary={true} style={{ textTransform: "capitalize" }} onClick={this.updateEditReply}>Update Reply</ButtonComponent>
            </div>
          </div>
        </div>
        <div className="e-pv-property-panel-footer">
          <div className="e-pv-annot-button-section">
            <ButtonComponent id='e-pv-updateButton' isPrimary={true} style={{ textTransform: 'capitalize' }} onClick={this.updateChangesAnnotation}>Update</ButtonComponent>
            <ButtonComponent id='e-pv-addAnnotationButton' isPrimary={true} style={{ textTransform: 'capitalize' }} onClick={this.addNewAnnotation}>Add Annotation</ButtonComponent>
          </div>
        </div>
      </div>

      <div id="description">
        <p>The PDF Viewer component allows the process of programmatically adding or modifying annotations within a PDF document. With the ability to programmatically add any type of annotation using the <a target='_blank' href='https://helpej2.syncfusion.com/react/documentation/api/pdfviewer/annotation/#addannotation' aria-label="Navigate to the documentation for Add Annotation API in PdfViewercomponent" >addAnnotation</a> API and edit existing annotations using the editAnnotation API, users can seamlessly enhance their PDF Viewing experience.</p>
        <br />
        <p>The creation of an annotation when clicking the ‘Add annotation’ button depends on the selected properties from the Property panel. To update an existing annotation, users can select the desired annotation, modify its properties, and then click the ‘Update’ button.</p>
        <br />
        <p>We can programmatically add or update the following types of annotations in the PDF viewer:</p>
        <ul>
          <li><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/text-markup-annotation' aria-label="Navigate to the documentation for Text markup annotations in PdfViewercomponent"> Text markup annotations </a></li>
          <li><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/shape-annotation ' aria-label="Navigate to the documentation for Shape annotations in PdfViewercomponent"> Shape annotations </a></li>
          <li><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/measurement-annotation' aria-label="Navigate to the documentation for Measurements annotation in PdfViewercomponent"> Measurements annotation </a></li>
          <li><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/free-text-annotation' aria-label="Navigate to the documentation for Free text annotation in PdfViewercomponent"> Free text annotation </a></li>
          <li><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/stamp-annotation' aria-label="Navigate to the documentation Stamp annotation in PdfViewercomponent"> Stamp annotation </a></li>
          <li><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/ink-annotation' aria-label="Navigate to the documentation for Ink annotation in PdfViewercomponent"> Ink annotation </a></li>
          <li><a target='_blank' href='https://ej2.syncfusion.com/react/documentation/pdfviewer/annotation/sticky-notes-annotation' aria-label="Navigate to the documentation for Sticky notes annotation in PdfViewercomponent"> Sticky notes annotation </a></li>
        </ul>
        <p>
          More information on adding annotation programmatically can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
            documentation section
          </a>.
        </p>
      </div>
    </div >
    );
  }
  public pdfviewerApiPath: Object = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };
  public dropImageElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
  public onFileRemove(args: RemovingEventArgs): void {
    args.postRawFile = false;
  }
  public async onFileSuccess(args: SuccessEventArgs): Promise<void> {
    const fileData = args.file.rawFile;
    if (fileData instanceof Blob) {
      this.selectedAnnotation.customStampImageSource = await this.convertBlobToBase64(fileData);
    } else {
      console.error('Unexpected file data type:', typeof fileData);
    }
  }
  private convertPixelToPoint(number: number) {
    return (number * (72 / 96));
  }; 
  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  public contextMenuItemSelected(event: MenuEventArgs) {
    switch (event.item.text) {
      case "Edit": {
        this.onEditButtonClick(this.currentEditCommentId);
        break;
      }
      case "Delete": {
        this.onreplycommentdelete(this.currentEditCommentId);
        break;
      }
    }
  }
  public onAnnotationChange(event: ChangeEventArgs): void {
    this.selectedAnnotation.annotationType = event.value as string;
    this.setState({
      showStrokeProps: false,
      showBoundsButtons: false,
      showFillColor: false,
      showXYRow: false,
      showX1Y1Row: false,
      showX2Y2Row: false,
      showHeightWidthRow: false,
      showLineProps: false,
      showVertexButtons: false,
      showFreeTextProps: false,
      showLeaderLength: false
    });
    switch (this.selectedAnnotation.annotationType) {
      case 'Highlight':
      case 'Underline':
      case 'Strikethrough':
        {
          this.setState({
            showBoundsButtons: true,
            showFillColor: true,
            showXYRow: true,
            showHeightWidthRow: true
          });
          break;
        }
      case 'Line':
      case 'Arrow':
        {
          this.setState({
            showStrokeProps: true,
            showFillColor: true,
            showX1Y1Row: true,
            showX2Y2Row: true,
            showLineProps: true
          });
          break;
        }
      case 'Square':
      case 'Rectangle':
      case 'Circle':
      case 'Radius':
        {
          this.setState({
            showStrokeProps: true,
            showFillColor: true,
            showXYRow: true,
            showHeightWidthRow: true
          });
          break;
        }
      case 'Polygon':
      case 'Perimeter':
      case 'Area':
      case 'Volume':
        {
          this.setState({
            showVertexButtons: true,
            showXYRow: true,
            showStrokeProps: true,
            showFillColor: true
          });
          break;
        }
      case 'Distance':
        {
          this.setState({
            showStrokeProps: true,
            showFillColor: true,
            showX1Y1Row: true,
            showX2Y2Row: true,
            showLineProps: true,
            showLeaderLength: true
          });
          break;
        }
      case 'StickyNotes':
        {
          this.setState({
            showXYRow: true,
            showHeightWidthRow: true
          });
          break;
        }
      case 'Ink':
        {
          this.setState({
            showStrokeProps: true,
            showFillColor: true,
            showXYRow: true,
            showHeightWidthRow: true
          });
          break;
        }
      case 'stamp':
      case 'Stamp':
        {
          this.setState({
            showXYRow: true,
            showHeightWidthRow: true
          });
          break;
        }
      case 'FreeText':
        {
          this.setState({
            showStrokeProps: true,
            showFillColor: true,
            showXYRow: true,
            showHeightWidthRow: true,
            showFreeTextProps: true
          });
          break;
        }
      case 'CustomStamp':
        {
          this.setState({
            showXYRow: true,
            showHeightWidthRow: true
          });
          break;
        }
    }
    if (!isNullOrUndefined(event) && event.isInteracted) {
      this.resetAnnotationProperties();
    }
  }

  public addBounds() {
    this.setState({
      showUpdateAnnotation: true,
      showBoundsButtons: true
    });
    let newBound: any = {
      id: this.generateUniqueId(),
      X: this.selectedAnnotation.x,
      Y: this.selectedAnnotation.y,
      Width: this.selectedAnnotation.width,
      Height: this.selectedAnnotation.height
    };
    if (isNullOrUndefined(this.selectedAnnotation.bounds)) {
      this.selectedAnnotation.bounds = [];
    }
    this.selectedAnnotation.bounds.push(newBound);
    this.setState((prevState) => {
      return {
        bounds: [...prevState.bounds, newBound]
      }
    });
    if (this.selectedAnnotation.bounds.length > 1) {
      this.setState({
        isDeleteBoundsDisabled: false
      })
    }
  }
  public OnBoundsDelete() {
    if (isNullOrUndefined(this.selectedAnnotation.bounds)) {
      this.selectedAnnotation.bounds = [];
    }
    if (this.selectedAnnotation.bounds.length > 1) {
      this.selectedAnnotation.bounds = this.selectedAnnotation.bounds.slice(0, this.selectedAnnotation.bounds.length - 1);
      this.setState({
        showUpdateAnnotation: true
      });
    }
    if (this.selectedAnnotation.bounds.length <= 1) {
      this.setState({
        isDeleteBoundsDisabled: true
      });
    }
    if (this.selectedAnnotation.bounds.length < 1) {
      this.setState({
        showUpdateAnnotation: false
      });
    }
    this.setState((prevState) => {
      return {
        bounds: [...prevState.bounds]
      }
    });
  }
  public addVertex() {
    let newVertex : VertexPoint = { x: this.selectedAnnotation.x, y: this.selectedAnnotation.y, id: this.generateUniqueId() };
    if (isNullOrUndefined(this.selectedAnnotation.vertexPoints)) {
      this.selectedAnnotation.vertexPoints = [] as VertexPoint[];
    }
    this.selectedAnnotation.vertexPoints.push(newVertex);
    if (this.selectedAnnotation.vertexPoints.length > 1) {
      this.setState({
        isDeleteVertexDisabled: false
      })
    }
    this.setState((prevState) => {
      return {
        showUpdateAnnotation: true,
        vertexPoints: [...prevState.vertexPoints, newVertex]
      }
    });
  };

  public onInteractionValueChange(event: ChangeEventArgs) {
    if (isNullOrUndefined(this.selectedAnnotation.allowedInteractions) || (this.selectedAnnotation.allowedInteractions.length === 0)) {
      this.selectedAnnotation.allowedInteractions = [AllowedInteraction.Select, AllowedInteraction.Resize];
    }
    else {
      this.selectedAnnotation.allowedInteractions = (event.value ?? [AllowedInteraction.Select, AllowedInteraction.Resize]) as AllowedInteraction[];
    }
    this.setState({
      allowedInteractions: [...this.selectedAnnotation.allowedInteractions as string[]]
    });
  }
  public onDeleteVertex() {
    if (isNullOrUndefined(this.selectedAnnotation.vertexPoints)) {
      this.selectedAnnotation.vertexPoints = [];
    }
    if (this.selectedAnnotation.vertexPoints.length > 1) {
      this.selectedAnnotation.vertexPoints = this.selectedAnnotation.vertexPoints.slice(0, this.selectedAnnotation.vertexPoints.length - 1);
      this.setState({
        showUpdateAnnotation: true
      });
    }
    if (this.selectedAnnotation.vertexPoints.length <= 1) {
      this.setState({
        isDeleteVertexDisabled: true,
        showUpdateAnnotation: false
      });
    }
    this.setState((prevState) => {
      return {
        vertexPoints: [...prevState.vertexPoints]
      }
    });
  }
  public onStampTypeChange(event: ChangeEventArgs) {
    const selectedValue = event.value as string;
    switch (selectedValue) {
      case 'Dynamic': {
        this.setState({
          currentCommentsList: this.dynamicstampCommentsList,
          stampType: "Dynamic",
          stampComment: "Approved"
        });
        this.onpropertiesvaluechanges("stampComment", {isInteracted: true, value: "Approved"});
        break;
      }
      case 'Sign Here': {
        this.setState({
          currentCommentsList: this.sighhereCommentsList,
          stampType: "Sign Here",
          stampComment: "Accepted"
        });
        this.onpropertiesvaluechanges("stampComment", {isInteracted: true, value: "Accepted"});
        break;
      }
      case 'Standard Business': {
        this.setState({
          currentCommentsList: this.StandardBusinessStampsList,
          stampType: "Standard Business",
          stampComment: "Approved"
        });
        this.onpropertiesvaluechanges("stampComment", {isInteracted: true, value: "Approved"});
        break;
      }
      default:
        this.currentCommentsList = [];
    }
  }
  public onCheckboxChangeReplyBox(event: CheckBoxChangeEventArgs) {
    this.setState({
      isReplyBoxChecked: event.checked as boolean
    });
    if(!(event.checked as boolean)) {
      if (this.state.isEditing) {
        this.setState({
          isEditing: false
        });
        this.currentEditCommentId = "";
      }
    }
  }
  public onPrintCheckBoxChange(event: CheckBoxChangeEventArgs) {
    this.setState({
      printAnnotation: event.checked as boolean
    });
    this.selectedAnnotation.isPrint = event.checked;
  }
  public onCheckboxChangeIntractionBox(event: CheckBoxChangeEventArgs) {
    this.setState({
      lockAnnotation: event.checked as boolean
    });
    this.selectedAnnotation.isLocked = event.checked;
  }
  public onpropertiesvaluechanges
    (property: 'stampType' | 'stampComment' | 'pageNumber' | 'x' | 'y' | 'width' | 'height' | 'vertexX1' | 'vertexY1' | 'vertexX2' | 'vertexY2' | 'opacity' | 'thickness' | 'lineHeadStartStyle' | 'lineHeadEndStyle' | 'leaderLength' | 'inkAnnotationType' |
      'defaultText' | 'fontFamily' | 'alignment' | 'fontStyle' | 'fontSize' | 'author' | 'comment' | 'setState' | 'replyAuthor' | 'replyComment' | 'replyState' | 'strokeColor' | 'fillColor' | 'fontColor' | 'color' | '', event: any) {
    if (this.selectedAnnotation.annotationSelected && !this.state.showUpdateAnnotation) {
      if (!isNullOrUndefined(event.isInteracted) && event.isInteracted) {
        this.setState({
          showUpdateAnnotation: true
        });
      }
      else if(!isNullOrUndefined(event.event)) {
        this.setState({
          showUpdateAnnotation: true
        });
      }
      else {
        this.setState({
          showUpdateAnnotation: false
        });
      }
      let shapeAnnotation = this.selectedAnnotation.annotationType;
      if (((property === "x") || (property === "y") || (property === "height") || (property === "width")) && ((shapeAnnotation === "Underline") || (shapeAnnotation === "Strikethrough") || (shapeAnnotation === "Highlight"))) {
        this.setState({
          showUpdateAnnotation: false
        });
      }
      if (((property === "x") || (property === "y")) && ((shapeAnnotation === "Polygon") || (shapeAnnotation === "Area") || (shapeAnnotation === "Perimeter") || (shapeAnnotation === "Volume"))) {
        this.setState({
          showUpdateAnnotation: false
        });
      }
    }
    if (!isNullOrUndefined(event.value)) {
      this.selectedAnnotation[property] = event.value;
    }
    else if(!isNullOrUndefined(event.name)) {
      this.selectedAnnotation[property] = event.name;
    }
    if (event && event.isInteracted && (property === "stampComment" || property === "stampType")) {
      this.resetAnnotationProperties();
    }
  }
  public annotationSettings = () => ({
    offset: { x: this.selectedAnnotation.x, y: this.selectedAnnotation.y },
    isLock: this.selectedAnnotation.isLocked,
    isPrint: this.selectedAnnotation.isPrint,
    pageNumber: this.selectedAnnotation.pageNumber,
    width: this.selectedAnnotation.width,
    height: this.selectedAnnotation.height,
    opacity: this.selectedAnnotation.opacity / 100,
    thickness: this.selectedAnnotation.thickness,
    strokeColor: this.selectedAnnotation.strokeColor,
    fillColor: this.selectedAnnotation.fillColor,
    bounds: (this.selectedAnnotation.bounds && this.selectedAnnotation.bounds.length > 0) ? this.selectedAnnotation.bounds.map((item) => ({x: item.X, y: item.Y, width: item.Width, height: item.Height})) : 
      [{ 
        x: this.selectedAnnotation.x, 
        y: this.selectedAnnotation.y, 
        width: this.selectedAnnotation.width, 
        height: this.selectedAnnotation.height 
      }],
    vertexPoints: this.selectedAnnotation.vertexPoints,
    fontFamily: this.selectedAnnotation.fontFamily,
    fontStyle: this.selectedAnnotation.fontStyle,
    fontSize: this.selectedAnnotation.fontSize,
    defaultText: this.selectedAnnotation.defaultText,
    textAlignment: this.selectedAnnotation.alignment,
    author: this.selectedAnnotation.author,
    setState: this.selectedAnnotation.setState,
    note: this.selectedAnnotation.comment,
    notes: this.selectedAnnotation.comment,
    replyAuthor: this.selectedAnnotation.replyAuthor,
    replyState: this.selectedAnnotation.replyState,
    replyComment: this.selectedAnnotation.replyComment,
    modifiedDate: this.selectedAnnotation.modifiedDate,
    replyModifiedDate: this.selectedAnnotation.replyModifiedDate,
    lineHeadEndStyle: this.viewer.annotation.getArrowString(this.selectedAnnotation.lineHeadEndStyle as DecoratorShapes),
    lineHeadStartStyle: this.viewer.annotation.getArrowString(this.selectedAnnotation.lineHeadStartStyle as DecoratorShapes),
    leaderLength: this.selectedAnnotation.leaderLength,
    inkAnnotationType: this.selectedAnnotation.inkAnnotationType,
    color: this.selectedAnnotation.fillColor,
    allowedInteractions: this.selectedAnnotation.allowedInteractions,
    dynamicStamps: this.selectedAnnotation.dynamicStamps,
    signStamps: this.selectedAnnotation.signStamps,
    standardBusinessStamps: this.selectedAnnotation.standardBusinessStamps,
    path: this.selectedAnnotation.path,
    fontColor: this.selectedAnnotation.fontColor,
    borderColor: this.selectedAnnotation.strokeColor,
    customStamps: [{
      customStampImageSource: this.selectedAnnotation.customStampImageSource,
      customStampName: this.selectedAnnotation.customStampName,
    }],
  });
  public addNewAnnotation(): void {
    let currentannotationSettings: any;
    currentannotationSettings = this.annotationSettings();
    if (this.selectedAnnotation.annotationType === "Highlight") {
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
    }
    else if (this.selectedAnnotation.annotationType === 'Underline') {
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
    }
    else if (this.selectedAnnotation.annotationType === 'Strikethrough') {
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
    }
    else if (this.selectedAnnotation.annotationType === 'Line') {
      currentannotationSettings.vertexPoints = [{ x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 },
        { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 }];
      currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
      this.selectedAnnotation.vertexPoints = [];
    }
    else if (this.selectedAnnotation.annotationType === 'Arrow') {
      currentannotationSettings.vertexPoints = [{ x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 },
        { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 }];
      currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
      this.selectedAnnotation.vertexPoints = [];
    }
    else if (this.selectedAnnotation.annotationType === 'Rectangle') {
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings)
    }
    else if (this.selectedAnnotation.annotationType === 'Circle') {
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings)
    }
    else if (this.selectedAnnotation.annotationType === 'Polygon') {
      if (this.selectedAnnotation.vertexPoints.length === 0) {
        this.selectedAnnotation.vertexPoints = this.addUniqueId([{ x: 100, y: 39 }, { x: 142, y: 10 }, { x: 189, y: 38 }, { x: 178, y: 81 }, { x: 111, y: 81 }, { x: 100, y: 39 }]) as VertexPoint[];
        currentannotationSettings = this.annotationSettings();
      }
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
    }
    else if (this.selectedAnnotation.annotationType === 'Distance') {
      currentannotationSettings.vertexPoints = [{ x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 },
        { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 }];
      currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
      this.selectedAnnotation.vertexPoints = [] as VertexPoint[];
    }
    else if (this.selectedAnnotation.annotationType === 'Perimeter') {
      if (this.selectedAnnotation.vertexPoints.length === 0) {
        this.selectedAnnotation.vertexPoints = this.addUniqueId([{ x: 100, y: 100 }, { x: 185, y: 100 }, { x: 186, y: 162 }]);
        currentannotationSettings = this.annotationSettings();
      }
      currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
    }
    else if (this.selectedAnnotation.annotationType === 'Area') {
      if (this.selectedAnnotation.vertexPoints.length === 0) {
        this.selectedAnnotation.vertexPoints = this.addUniqueId([{ x: 100, y: 100 }, { x: 188, y: 99 }, { x: 189, y: 153 }, { x: 100, y: 100 }]);
        currentannotationSettings = this.annotationSettings();
      }
      currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
    }
    else if (this.selectedAnnotation.annotationType === 'Radius') {
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
    }
    else if (this.selectedAnnotation.annotationType === 'Volume') {
      if (this.selectedAnnotation.vertexPoints.length === 0) {
        this.selectedAnnotation.vertexPoints = this.addUniqueId([{ x: 100, y: 100 }, { x: 100, y: 209 }, { x: 220, y: 209 }, { x: 220, y: 99 }, { x: 100, y: 100 }]);
        currentannotationSettings = this.annotationSettings();
      }
      currentannotationSettings.offset = currentannotationSettings.vertexPoints[0];
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings);
    }
    else if (this.selectedAnnotation.annotationType === 'FreeText') {
      this.selectedAnnotation.strokeColor = "#FFFFFF00";
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings)
    }
    else if (this.selectedAnnotation.annotationType === 'Stamp') {
      currentannotationSettings.customStamps = null;
      currentannotationSettings.offset = { x: this.convertPixelToPoint(currentannotationSettings.offset.x), y: this.convertPixelToPoint(currentannotationSettings.offset.y)}
      currentannotationSettings.width = this.convertPixelToPoint(currentannotationSettings.width);
      currentannotationSettings.height = this.convertPixelToPoint(currentannotationSettings.height);
      if (this.selectedAnnotation.stampType === 'Dynamic') {
        if (this.selectedAnnotation.dynamicStamps) {
          const selectedStampItem = this.selectedAnnotation.dynamicStamps.find((stamp: DynamicStampItem) => stamp === this.selectedAnnotation.stampComment);
          if (selectedStampItem) {
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings, selectedStampItem);
          }
        }
      }
      else if (this.selectedAnnotation.stampType === "Sign Here") {
        if (this.selectedAnnotation.signStamps) {
          const selectedStampItem = this.selectedAnnotation.signStamps.find(
            (stamp: SignStampItem) => stamp === this.selectedAnnotation.stampComment);
          if (selectedStampItem) {
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings, null, selectedStampItem);
          }
        }
      }
      else if (this.selectedAnnotation.stampType === "Standard Business") {
        if (this.selectedAnnotation.signStamps) {
          const selectedStampItem = this.selectedAnnotation.standardBusinessStamps.find((stamp: StandardBusinessStampItem) => stamp === this.selectedAnnotation.stampComment);
          if (selectedStampItem) {
            this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings, null, null, selectedStampItem);
          }
        }
      }
    }
    else if (this.selectedAnnotation.annotationType === 'Ink') {
      if (this.selectedAnnotation.inkAnnotationType === "Syncfusion") {
        this.selectedAnnotation.path = '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]'

      }
      else if (this.selectedAnnotation.inkAnnotationType === "PdfViewer") {
        this.selectedAnnotation.path = "M10,50 L10,65 M10,50 L25,50 L25,57.5 L10,57.5 M40,50 L40,65 M40,50 L43,50 L55,55 L55,60 L43,65 L40,65 M80,50 L80,65 M80,50 L95,50 M80,57.5 L95,57.5 M110,50 L125,65 L140,50 M160,50 L160,65 M155,50 L165,50 M155,65 L165,65 M182,50 L192,65 L202,50 L212,65 L222,50 M230,50 L230,65 M230,50 L240,50 M230,57.5 L240,57.5 M230,65 L240,65 M255,50 L270,65 L285,50 M295,50 L295,65 M290,50 L300,50 M290,65 L300,65 M310,50 L310,65 M310,50 L325,50 M310,57.5 L325,57.5 M310,65 L325,65 M340,50 L340,65 M340,50 L355,50 L355,57.5 L340,57.5 M340,57.5 L355,65";
      }
      else if (this.selectedAnnotation.inkAnnotationType === "Star") {
        this.selectedAnnotation.path = "[{\"command\":\"M\",\"x\":72,\"y\":200},{\"command\":\"L\",\"x\":79,\"y\":65},{\"command\":\"L\",\"x\":92,\"y\":200},{\"command\":\"L\",\"x\":65,\"y\":110},{\"command\":\"L\",\"x\":95,\"y\":110},{\"command\":\"L\",\"x\":72,\"y\":200}]";
      }
      currentannotationSettings = this.annotationSettings();
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings)
    }
    else if (this.selectedAnnotation.annotationType === 'StickyNotes') {
      this.viewer.annotation.addAnnotation(this.selectedAnnotation.annotationType, currentannotationSettings)
    }
    else if (this.selectedAnnotation.annotationType === 'CustomStamp') {
      currentannotationSettings.offset = { x: this.convertPixelToPoint(currentannotationSettings.offset.x), y: this.convertPixelToPoint(currentannotationSettings.offset.y)}
      currentannotationSettings.width = this.convertPixelToPoint(currentannotationSettings.width);
      currentannotationSettings.height = this.convertPixelToPoint(currentannotationSettings.height);
      this.viewer.annotation.addAnnotation("Stamp", currentannotationSettings)
    }
    let newlyAddedAnnotation = this.viewer.annotationCollection[this.viewer.annotationCollection?.length - 1];
    if (newlyAddedAnnotation) {
      this.updateAnnotationComments(newlyAddedAnnotation);
      this.viewer.annotation.editAnnotation(newlyAddedAnnotation);
    }
    this.selectedAnnotation.annotationSelected = false;
    this.setState({
      isReplyBoxChecked: false,
      replies: []
    })
  }
  private updateProperties(currentannotation: any): void {
    this.selectedAnnotation.pageNumber = (currentannotation.pageNumber as number) + 1;
    this.selectedAnnotation.fillColor = currentannotation.fillColor;
    this.selectedAnnotation.strokeColor = currentannotation.strokeColor;
    if (this.IsRGBAColor(this.selectedAnnotation.fillColor)) {
      this.selectedAnnotation.fillColor = this.RGBAtoHex(this.selectedAnnotation.fillColor, "fill");
    }
    if (this.IsRGBAColor(this.selectedAnnotation.strokeColor)) {
      this.selectedAnnotation.strokeColor = this.RGBAtoHex(this.selectedAnnotation.strokeColor, "stroke");
    }
    if (currentannotation.textMarkupAnnotationType === "Highlight" || currentannotation.textMarkupAnnotationType === "Underline" || currentannotation.textMarkupAnnotationType === "Strikethrough") {
      this.selectedAnnotation.annotationType = currentannotation.textMarkupAnnotationType;
    }
    else if (currentannotation.shapeAnnotationType === "Square" && currentannotation.subject === "Rectangle") {
      this.selectedAnnotation.annotationType = "Rectangle";
    }
    else if (currentannotation.shapeAnnotationType === "Line" && currentannotation.subject === "Arrow") {
      this.selectedAnnotation.annotationType = "Arrow";
    }
    else if (currentannotation.shapeAnnotationType === "sticky") {
      this.selectedAnnotation.annotationType = "StickyNotes";
    }
    else if ((currentannotation.shapeAnnotationType as string).toLowerCase() === "stamp") {
      if (currentannotation.stampAnnotationType) {
        if (currentannotation.stampAnnotationType === "image") {
          this.selectedAnnotation.annotationType = "CustomStamp";
        }
        else if (currentannotation.stampAnnotationType === "path") {
          this.selectedAnnotation.annotationType = "Stamp";
        }
      }
      else {
        this.selectedAnnotation.annotationType = "Stamp";
      }
    }
    else if (currentannotation.shapeAnnotationType === "Ink") {
      this.selectedAnnotation.annotationType = "Ink";
    }
    else if (currentannotation.shapeAnnotationType === "Line" || currentannotation.shapeAnnotationType === "Polyline" || currentannotation.shapeAnnotationType === "Square" || currentannotation.shapeAnnotationType === "Circle" || currentannotation.shapeAnnotationType === "Polygon" && currentannotation.indent) {
      if (currentannotation.vertexPoints) {
        this.selectedAnnotation.vertexPoints = this.addUniqueId([...currentannotation.vertexPoints] as VertexPoint[]);
      }
      if (currentannotation.indent === "LineDimension") {
        this.selectedAnnotation.annotationType = "Distance";
      }
      else if (currentannotation.indent === "PolyLineDimension") {
        this.selectedAnnotation.annotationType = "Perimeter";
      }
      else if (currentannotation.indent === "PolyLineDimension" && currentannotation.subject === "Arrow") {
        this.selectedAnnotation.annotationType = "Arrow";
      }
      else if (currentannotation.indent === "PolygonDimension") {
        this.selectedAnnotation.annotationType = "Area";
      }
      else if (currentannotation.indent === "PolygonRadius") {
        this.selectedAnnotation.annotationType = "Radius";
      }
      else if (currentannotation.indent === "PolygonVolume") {
        this.selectedAnnotation.annotationType = "Volume";
      }
      else if (currentannotation.shapeAnnotationType === "Line" && currentannotation.shapeAnnotationType === currentannotation.subject) {
        this.selectedAnnotation.annotationType = "Line";
      }
      else if (currentannotation.shapeAnnotationType === "Circle" && currentannotation.shapeAnnotationType === currentannotation.subject) {
        this.selectedAnnotation.annotationType = "Circle";
      }
    }
    else {
      this.selectedAnnotation.annotationType = currentannotation.shapeAnnotationType;
      if (currentannotation.shapeAnnotationType === "Polygon") {
        this.selectedAnnotation.vertexPoints = this.addUniqueId([...currentannotation.vertexPoints]) as VertexPoint[];
      }
    }
    if (currentannotation.fillColor) {
      this.selectedAnnotation.fillColor = currentannotation.fillColor;
    }
    this.selectedAnnotation.showInkAnnotationType = false;
    if (this.selectedAnnotation.annotationType === "Highlight" || this.selectedAnnotation.annotationType === "Underline" || this.selectedAnnotation.annotationType === "Strikethrough") {
      if (currentannotation.bounds[0] && currentannotation.bounds[0].X && currentannotation.bounds[0].Y && currentannotation.bounds[0].Width && currentannotation.bounds[0].Height) {
        this.selectedAnnotation.bounds = this.addUniqueId(currentannotation.bounds);
        this.selectedAnnotation.width = currentannotation.bounds[0].Width;
        this.selectedAnnotation.height = currentannotation.bounds[0].Height;
        this.selectedAnnotation.x = currentannotation.bounds[0].X;
        this.selectedAnnotation.y = currentannotation.bounds[0].Y;
      }
      else if (currentannotation.annotationAddMode && currentannotation.annotationAddMode === "UI Drawn Annotation") {
        this.selectedAnnotation.fillColor = currentannotation.color;
        let annotBounds = currentannotation.bounds;
        this.selectedAnnotation.bounds = [];
        let totalWidth = 0, startX = 0, startY = 0;
        if (annotBounds?.length > 1) {
          this.selectedAnnotation.x = annotBounds[0].left;
          this.selectedAnnotation.y = annotBounds[0].top;
          this.selectedAnnotation.height = annotBounds[0].height;
          let isFirstBound = true;
          let left = annotBounds[0].left
          let top = annotBounds[0].top;
          startX = annotBounds[0].left;
          startY = annotBounds[0].top;
          let width = annotBounds[0].width;
          let height = annotBounds[0].height;
          annotBounds.forEach((element, index, array) => {
            left = element.left;
            width = element.width;
            height = element.height;
            if (top !== element.top) {
                if (isFirstBound) {
                    this.selectedAnnotation.width = totalWidth;
                    isFirstBound = false;
                }
                this.selectedAnnotation.bounds.push({
                    id: this.generateUniqueId(),
                    X: startX,
                    Y: startY,
                    Width: totalWidth,
                    Height: height
                });
                totalWidth = 0;
                top = element.top;
                startX = element.left;
                startY = element.top;
            }
            totalWidth += element.width;
          });
          if (totalWidth > 0) {
            this.selectedAnnotation.bounds.push({
              id: this.generateUniqueId(),
              X: startX,
              Y: startY,
              Width: totalWidth,
              Height: annotBounds[annotBounds.length - 1].height
            });
            if (isFirstBound) {
              this.selectedAnnotation.width = totalWidth;
              isFirstBound = false;
            }
          }
        }
        else {
          this.selectedAnnotation.bounds = {
            id: this.generateUniqueId(),
            X: currentannotation.bounds[0].left,
            Y: currentannotation.bounds[0].top,
            Height: currentannotation.bounds[0].height,
            Width: currentannotation.bounds[0].width
          } as any;
        }
        this.selectedAnnotation.width = currentannotation.bounds[0].width;
        this.selectedAnnotation.height = currentannotation.bounds[0].height;
        this.selectedAnnotation.x = currentannotation.bounds[0].left;
        this.selectedAnnotation.y = currentannotation.bounds[0].top;
      }
      else {
        this.selectedAnnotation.bounds = this.addUniqueId(currentannotation.bounds);
        this.selectedAnnotation.width = currentannotation.bounds[0].Width;
        this.selectedAnnotation.height = currentannotation.bounds[0].Height;
        this.selectedAnnotation.x = currentannotation.bounds[0].X;
        this.selectedAnnotation.y = currentannotation.bounds[0].Y;
      }
      this.selectedAnnotation.fillColor = currentannotation.color;
    }
    else if (this.selectedAnnotation.annotationType === "Line" || this.selectedAnnotation.annotationType === "Arrow" || this.selectedAnnotation.annotationType === "Distance") {
      this.selectedAnnotation.vertexX1 = currentannotation.vertexPoints[0].x;
      this.selectedAnnotation.vertexY1 = currentannotation.vertexPoints[0].y;
      this.selectedAnnotation.vertexX2 = currentannotation.vertexPoints[1].x;
      this.selectedAnnotation.vertexY2 = currentannotation.vertexPoints[1].y;
      this.selectedAnnotation.vertexPoints = [] as VertexPoint[];
      if (this.selectedAnnotation.annotationType === "Distance") {
        this.selectedAnnotation.leaderLength = currentannotation.leaderLength as number;
      }
    }
    else if (this.selectedAnnotation.annotationType === "Ink") {
      this.selectedAnnotation.width = currentannotation.bounds.width;
      this.selectedAnnotation.height = currentannotation.bounds.height;
      this.selectedAnnotation.x = currentannotation.bounds.x;
      this.selectedAnnotation.y = currentannotation.bounds.y;
      this.selectedAnnotation.showInkAnnotationType = true;
    }
    else if (this.selectedAnnotation.annotationType === "FreeText") {
      this.selectedAnnotation.width = currentannotation.bounds.width;
      this.selectedAnnotation.height = currentannotation.bounds.height;
      this.selectedAnnotation.x = currentannotation.bounds.left;
      this.selectedAnnotation.y = currentannotation.bounds.top;
      this.selectedAnnotation.defaultText = currentannotation.dynamicText;
      this.selectedAnnotation.fontFamily = currentannotation.fontFamily;
      this.selectedAnnotation.alignment = currentannotation.textAlign;
      this.selectedAnnotation.fontSize = currentannotation.fontSize;
      this.selectedAnnotation.fontColor = currentannotation.fontColor;
      if (currentannotation.font) {
        if (currentannotation.font.isBold) {
          this.selectedAnnotation.fontStyle = "Bold";
        }
        else if (currentannotation.font.isItalic) {
          this.selectedAnnotation.fontStyle = "Italic";
        }
        else if (currentannotation.font.isUnderline) {
          this.selectedAnnotation.fontStyle = "Underline";
        }
        else if (currentannotation.font.isStrikeout) {
          this.selectedAnnotation.fontStyle = "Strikethrough";
        }
        else {
          this.selectedAnnotation.fontStyle = "None";          
        }
      }
      else {
        this.selectedAnnotation.fontStyle = "None";
      }
    }
    else {
      this.selectedAnnotation.width = currentannotation.bounds.width;
      this.selectedAnnotation.height = currentannotation.bounds.height;
      this.selectedAnnotation.x = currentannotation.bounds.left;
      this.selectedAnnotation.y = currentannotation.bounds.top;
    }
    if (this.selectedAnnotation.annotationType === "Polygon" || this.selectedAnnotation.annotationType === "Perimeter" ||
      this.selectedAnnotation.annotationType === "Area" || this.selectedAnnotation.annotationType === "Volume") {
      this.selectedAnnotation.vertexPoints = this.addUniqueId([...currentannotation.vertexPoints]) as VertexPoint[];
    }
    if (currentannotation.lineHeadStartStyle && currentannotation.lineHeadEndStyle) {
      this.selectedAnnotation.lineHeadStartStyle = currentannotation.lineHeadStartStyle;
      this.selectedAnnotation.lineHeadEndStyle = currentannotation.lineHeadEndStyle;
    }
    else if (currentannotation.lineHeadStart && currentannotation.lineHeadEnd) {
      this.selectedAnnotation.lineHeadStartStyle = this.viewer.annotation.getArrowType(currentannotation.lineHeadStart) as string;
      this.selectedAnnotation.lineHeadEndStyle = this.viewer.annotation.getArrowType(currentannotation.lineHeadEnd) as string;
    }
    else {
      if (this.selectedAnnotation.annotationType === "Line") {
        this.selectedAnnotation.lineHeadStartStyle = "None";
        this.selectedAnnotation.lineHeadEndStyle = "None";
      }
      else {
        this.selectedAnnotation.lineHeadStartStyle = "Arrow";
        this.selectedAnnotation.lineHeadEndStyle = "Arrow";
      }
    }
    if (currentannotation.isPrint) {
      this.selectedAnnotation.isPrint = true;
    }
    else {
      this.selectedAnnotation.isPrint = false;
    }
    this.selectedAnnotation.isLocked = currentannotation.annotationSettings.isLock as boolean;
    if (this.selectedAnnotation.isLocked) {
      this.selectedAnnotation.allowedInteractions = currentannotation.allowedInteractions as AllowedInteraction[];
    }
    else {
      this.selectedAnnotation.allowedInteractions = [AllowedInteraction.Select, AllowedInteraction.Resize];
    }
    this.selectedAnnotation.opacity = currentannotation.opacity >= 100 ? currentannotation.opacity : currentannotation.opacity * 100;
    this.selectedAnnotation.thickness = currentannotation.thickness;
    this.selectedAnnotation.strokeColor = currentannotation.strokeColor;
    if (currentannotation.note) {
      this.selectedAnnotation.comment = currentannotation.note;
    }
    else if (currentannotation.notes) {
      this.selectedAnnotation.comment = currentannotation.notes;
    }
    else {
      this.selectedAnnotation.comment = "";
    }
    this.selectedAnnotation.author = currentannotation.author;
    this.selectedAnnotation.modifiedDate = currentannotation.modifiedDate;
    this.selectedAnnotation.setState = currentannotation.state;
    this.selectedAnnotation.showStampType = false;
    this.selectedAnnotation.disableInkAnnotField = true;
    this.selectedAnnotation.showFileUploader = false;

    this.selectedAnnotation.replies = [] as Comment[];
    if (this.selectedAnnotation.replies.length === 0 && currentannotation.comments) {
      if (currentannotation.comments.length > 0) {
        currentannotation.comments.forEach(element => {
          let reply = new Comment();
          reply.id = element.annotName;
          reply.author = element.author;
          reply.note = element.note;
          reply.modifiedDate = element.modifiedDate;
          reply.state = element.state;
          this.selectedAnnotation.replies.push(reply);
        });
      }
    }
    if (this.selectedAnnotation.replies.length === 0 && currentannotation.replyComment) {
      if (currentannotation.replyComment.length > 0) {
        currentannotation.replyComment.forEach(element => {
          let reply = new Comment();
          reply.id = this.generateUniqueId();
          reply.author = this.selectedAnnotation.replyAuthor;
          reply.note = element;
          reply.modifiedDate = new Date().toDateString();
          reply.state = 'None';
          this.selectedAnnotation.replies.push(reply);
        });
      }
    }
    this.updatePropertiesInUI();
    this.setState({
      showAnnotationList: false,
      showPageNumber: false
    });
  }
  public addUniqueId(array: unknown[]) : any[] {
    if (array) {
      array.forEach((value: any) => {
        value.id = this.generateUniqueId();
      });
    }
    else {
      array = [];
    }
    return array;
  }
  public onAnnotationMoved(annotationMoveEventArgs: AnnotationMoveEventArgs): void {
    this.selectedAnnotation.annotationSelected = true;
    this.currentUpdateAnnotationID = annotationMoveEventArgs.annotationId;
    let currentAnnotation = this.getAnnotationById(this.currentUpdateAnnotationID);
    if (currentAnnotation) {
      currentAnnotation.bounds = annotationMoveEventArgs.currentPosition;
      this.updateProperties(currentAnnotation);
    }
  }
  public onAnnotationResized(annotationResizeEventArgs: AnnotationResizeEventArgs): void {
    this.selectedAnnotation.annotationSelected = true;
    this.currentUpdateAnnotationID = annotationResizeEventArgs.annotationId;
    let currentAnnotation = this.getAnnotationById(this.currentUpdateAnnotationID);
    if (currentAnnotation) {
      currentAnnotation.bounds = annotationResizeEventArgs.annotationBound;
      this.updateProperties(currentAnnotation);
    }
  }
  public updatePropertiesInUI() {
    if (this.IsRGBAColor(this.selectedAnnotation.fillColor)) {
      this.selectedAnnotation.fillColor = this.RGBAtoHex(this.selectedAnnotation.fillColor, "fill");
    }
    if (this.IsRGBAColor(this.selectedAnnotation.strokeColor)) {
      this.selectedAnnotation.strokeColor = this.RGBAtoHex(this.selectedAnnotation.strokeColor, "stroke");
    }
    if (this.selectedAnnotation.isLocked) {
      if (isNullOrUndefined(this.selectedAnnotation.allowedInteractions) || (this.selectedAnnotation.allowedInteractions.length === 0)) {
        this.selectedAnnotation.allowedInteractions = [AllowedInteraction.Select, AllowedInteraction.Resize];
      }
    }
    else {
      this.selectedAnnotation.allowedInteractions = [AllowedInteraction.Select, AllowedInteraction.Resize];
    }
    this.setState({
      annotationType: this.selectedAnnotation.annotationType,
      pageNumber: this.selectedAnnotation.pageNumber,
      width: this.selectedAnnotation.width,
      height: this.selectedAnnotation.height,
      x: this.selectedAnnotation.x,
      y: this.selectedAnnotation.y,
      x1: this.selectedAnnotation.vertexX1,
      y1: this.selectedAnnotation.vertexY1,
      x2: this.selectedAnnotation.vertexX2,
      y2: this.selectedAnnotation.vertexY2,
      opacity: this.selectedAnnotation.opacity,
      fillColor: this.selectedAnnotation.fillColor,
      strokeThickness: this.selectedAnnotation.thickness,
      strokeColor: this.selectedAnnotation.strokeColor,
      lineHeadStartStyle: this.selectedAnnotation.lineHeadStartStyle,
      lineHeadEndStyle: this.selectedAnnotation.lineHeadEndStyle,
      leaderLength: this.selectedAnnotation.leaderLength,
      inkAnnotationType: this.selectedAnnotation.inkAnnotationType,
      showInkAnnotationType: this.selectedAnnotation.showInkAnnotationType,
      disableInkAnnotField: this.selectedAnnotation.disableInkAnnotField,
      defaultText: this.selectedAnnotation.defaultText,
      fontFamily: this.selectedAnnotation.fontFamily,
      alignment: this.selectedAnnotation.alignment,
      fontSize: this.selectedAnnotation.fontSize,
      fontColor: this.selectedAnnotation.fontColor,
      fontStyle: this.selectedAnnotation.fontStyle,
      author: this.selectedAnnotation.author,
      comment: this.selectedAnnotation.comment,
      commentState: this.selectedAnnotation.setState,
      replyAuthor: this.selectedAnnotation.replyAuthor,
      replyComment: this.selectedAnnotation.replyComment,
      replyState: this.selectedAnnotation.replyState,
      printAnnotation: this.selectedAnnotation.isPrint,
      showStampType: this.selectedAnnotation.showStampType,
      vertexPoints: (this.selectedAnnotation.vertexPoints ? [...this.selectedAnnotation.vertexPoints] : []) as VertexPoint[],
      bounds: this.selectedAnnotation.bounds ? [...this.selectedAnnotation.bounds] : [],
      lockAnnotation: this.selectedAnnotation.isLocked,
      allowedInteractions: this.selectedAnnotation.allowedInteractions,
      isReplyBoxChecked: (this.selectedAnnotation.replies && (this.selectedAnnotation.replies.length > 0)) as boolean,
      replies: (this.selectedAnnotation.replies && (this.selectedAnnotation.replies.length > 0)) ? [...this.selectedAnnotation.replies] : [] as Comment[],
      isDeleteBoundsDisabled: isNullOrUndefined(this.selectedAnnotation.bounds) ? ((this.selectedAnnotation.bounds.length > 1) ? false : true) : true,
      isDeleteVertexDisabled: isNullOrUndefined(this.selectedAnnotation.vertexPoints) ? ((this.selectedAnnotation.vertexPoints.length > 1) ? false: true) : true
    });
  }
  public resetAnnotationProperties() {
    const selectedAnnotation = this.selectedAnnotation;
    let shapeAnnotation: string = selectedAnnotation.annotationType;
    selectedAnnotation.x = 100;
    selectedAnnotation.y = 100;
    selectedAnnotation.fillColor = "#FFFFFF00";
    selectedAnnotation.strokeColor = "#FF0000FF";
    selectedAnnotation.showStampType = false;
    selectedAnnotation.showInkAnnotationType = false;
    selectedAnnotation.showFileUploader = false;
    //reset the properties
    if (shapeAnnotation == "Arrow" || shapeAnnotation == "Distance") {
      selectedAnnotation.lineHeadStartStyle = "Arrow";
      selectedAnnotation.lineHeadEndStyle = "Arrow";
    }
    else if (shapeAnnotation == "Perimeter") {
      selectedAnnotation.lineHeadStartStyle = "OpenArrow";
      selectedAnnotation.lineHeadEndStyle = "OpenArrow";
    }
    else {
      selectedAnnotation.lineHeadEndStyle = "None";
      selectedAnnotation.lineHeadStartStyle = "None";
    }

    if (shapeAnnotation == "Distance") {
      selectedAnnotation.leaderLength = 0;
    }

    if (shapeAnnotation == "Rectangle" || shapeAnnotation == "Square" || shapeAnnotation == "Circle" || shapeAnnotation == "Radius") {
      selectedAnnotation.width = 100;
      selectedAnnotation.height = 100;
    }
    else if (shapeAnnotation == "Ink") {
      selectedAnnotation.width = 150;
      selectedAnnotation.height = 60;
      selectedAnnotation.showInkAnnotationType = true;
      selectedAnnotation.disableInkAnnotField = selectedAnnotation.annotationSelected;
    }
    else if (shapeAnnotation == "FreeText") {
      selectedAnnotation.width = 150;
      selectedAnnotation.height = 26.5;
      selectedAnnotation.fontFamily = "Helvetica";
      selectedAnnotation.fontStyle = "None";
      selectedAnnotation.alignment = "Left";
      selectedAnnotation.defaultText = "Free Text";
      selectedAnnotation.fontSize = 16;
      selectedAnnotation.fontColor = "#000000FF";
    }
    else if (shapeAnnotation == "StickyNotes") {
      selectedAnnotation.width = 30;
      selectedAnnotation.height = 30;
    }
    else if (shapeAnnotation == "Stamp") {
      if (selectedAnnotation.stampType == "Dynamic") {
        selectedAnnotation.width = 140;
        selectedAnnotation.height = 55;
      }
      else if (selectedAnnotation.stampType === "Sign Here") {
        switch (selectedAnnotation.stampComment) {
          case "SignHere" : {
            selectedAnnotation.width = 110;
            selectedAnnotation.height = 30;
            break;
          }
          case "Witness" : {
            selectedAnnotation.width = 130;
            selectedAnnotation.height = 30;
            break;
          }
          case "InitialHere" : {
            selectedAnnotation.width = 90;
            selectedAnnotation.height = 30;
            break;
          }
          case "Accepted" :
          case "Rejected" : {
            selectedAnnotation.width = 35;
            selectedAnnotation.height = 35;
            break;
          }
        }
      }
      else if (selectedAnnotation.stampType === "Standard Business") {
        selectedAnnotation.height = 30;
        switch (selectedAnnotation.stampComment) {
          case "Final" :
          case "Draft" : {
            selectedAnnotation.width = 110;
            break;
          }
          case "Void" : {
            selectedAnnotation.width = 100;
            break;
          }
          default : {
            selectedAnnotation.width = 130;
            break;
          }
        } 
      }
      selectedAnnotation.showStampType = !selectedAnnotation.annotationSelected;
    }
    else if (shapeAnnotation == "CustomStamp") {
      selectedAnnotation.width = 100;
      selectedAnnotation.height = 100;
      selectedAnnotation.showFileUploader = !selectedAnnotation.annotationSelected;
    }
    else if ((shapeAnnotation == "Highlight") || (shapeAnnotation == "Underline") || (shapeAnnotation == "Strikethrough")) {
      selectedAnnotation.width = 100;
      selectedAnnotation.height = 14;
    }
    else {
      selectedAnnotation.width = 0;
      selectedAnnotation.height = 0;
    }
    if ((shapeAnnotation == "Highlight") || (shapeAnnotation == "Underline") || (shapeAnnotation == "Strikethrough") || shapeAnnotation == "FreeText") {
      selectedAnnotation.x = 10;
      selectedAnnotation.y = 10;
      if (selectedAnnotation.annotationType === 'Highlight') {
        selectedAnnotation.fillColor = '#FFDF56FF';
      }
      else if (selectedAnnotation.annotationType === 'Underline') {
        selectedAnnotation.fillColor = '#00FF00FF';
      }
      else if (selectedAnnotation.annotationType === 'Strikethrough') {
        selectedAnnotation.fillColor = '#FF0000FF';
      }
      else {
        selectedAnnotation.fillColor = "#FFFFFF00"
      }
      selectedAnnotation.strokeColor = "#FFFFFF00";
    }
    if ((shapeAnnotation === "Polygon") || (shapeAnnotation === "Perimeter") || (shapeAnnotation === "Area") || (shapeAnnotation === "Volume") ) {
      selectedAnnotation.x = 10;
      selectedAnnotation.y = 10;
    }
    selectedAnnotation.opacity = 100;
    selectedAnnotation.thickness = 1;
    selectedAnnotation.author = "Guest";
    selectedAnnotation.comment = "";
    selectedAnnotation.setState = "None";
    selectedAnnotation.replyAuthor = "Guest";
    selectedAnnotation.replyComment = "";
    selectedAnnotation.replyState = "None";
    selectedAnnotation.vertexX1 = 100;
    selectedAnnotation.vertexX2 = 200;
    selectedAnnotation.vertexY1 = 100;
    selectedAnnotation.vertexY2 = 100;
    selectedAnnotation.vertexPoints = [] as VertexPoint[];
    selectedAnnotation.bounds = [];
    selectedAnnotation.replies = [] as Comment[];
    selectedAnnotation.isLocked = false;
    selectedAnnotation.isPrint = true;
    selectedAnnotation.allowedInteractions = [AllowedInteraction.Select, AllowedInteraction.Resize];
    this.uploaderObj.clearAll();
    this.updatePropertiesInUI();
  }
  public updateChangesAnnotation(): void {
    let currentAnnotation = this.getAnnotationById(this.currentUpdateAnnotationID);
    if (currentAnnotation) {
      let updatedValues = this.annotationUpdate(currentAnnotation);
      this.viewer.annotation.editAnnotation(updatedValues);
      this.setState({
        showUpdateAnnotation: false
      });
    }
  }
  public getAnnotationById(annotationId: string) : any {
    if (this.viewer && this.viewer.annotationCollection) {
      for (let index = 0; index < this.viewer.annotationCollection.length; index++) {
        if (this.viewer.annotationCollection[index].annotationId === annotationId) {
          return this.viewer.annotationCollection[index];
        }
      }
    }
    return null;
  }
  public updateReply() {
    let currentReplyComment = new Comment();
    currentReplyComment.id = this.generateUniqueId();
    currentReplyComment.author = this.selectedAnnotation.replyAuthor;
    currentReplyComment.note = this.selectedAnnotation.replyComment;
    currentReplyComment.modifiedDate = new Date().toDateString();
    currentReplyComment.state = this.selectedAnnotation.replyState;
    if (isNullOrUndefined(this.selectedAnnotation.replies)) {
      this.selectedAnnotation.replies = [] as Comment[];
    }
    this.selectedAnnotation.replies.push(currentReplyComment);
    this.selectedAnnotation.replyAuthor = "Guest";
    this.selectedAnnotation.replyComment = "";
    this.selectedAnnotation.replyState = "None";
    this.setState((prevState) => {
      return {
        replies: [...prevState.replies, currentReplyComment],
        replyAuthor: "Guest",
        replyComment: "",
        replyState: "None"
      }
    });
}
public generateUniqueId() {
    return uuidv4();
}
public getCommentID(commentId: string) {
    this.currentEditCommentId = commentId;
}
public onEditButtonClick(commentId: string) {
  const comment = this.selectedAnnotation.replies.find(
    (comment: Comment) => comment.id === commentId
  );
  if (comment) {
    this.selectedAnnotation.replyAuthor = comment.author;
    this.selectedAnnotation.replyComment = comment.note;
    this.selectedAnnotation.replyState = comment.state;
  }
  this.setState({
    isEditing: true,
    replyAuthor: this.selectedAnnotation.replyAuthor,
    replyComment: this.selectedAnnotation.replyComment,
    replyState: this.selectedAnnotation.replyState
  });
}
public onreplycommentdelete(commentId: string) {
  const commentIndex = this.selectedAnnotation.replies.findIndex(
    (comment) => comment.id === commentId
  );
  if (commentIndex !== -1) {
    this.selectedAnnotation.replies.splice(commentIndex, 1);
  }
  this.setState({
    replies: [...this.selectedAnnotation.replies]
  });
}
public updateEditReply() {
  let currentReplyComment: Comment;
  if (this.state.isEditing && this.currentEditCommentId) {
    let replyIndex: number;
    replyIndex = this.selectedAnnotation.replies.findIndex(
      (comment: Comment) => comment.id === this.currentEditCommentId
    );
    if (replyIndex !== -1) {
      currentReplyComment = this.selectedAnnotation.replies[replyIndex] as Comment;
    }
    if (currentReplyComment) {
      currentReplyComment.author = this.selectedAnnotation.replyAuthor;
      currentReplyComment.note = this.selectedAnnotation.replyComment;
      currentReplyComment.state = this.selectedAnnotation.replyState;
      currentReplyComment.modifiedDate = new Date().toDateString();
    } else {
      console.error(
        `Comment with ID ${this.currentEditCommentId} not found.`
      );
    }
    this.currentEditCommentId = "";
    this.setState({
      isEditing: false,
      replies: [...this.selectedAnnotation.replies]
    });
  }
}
public OpenContextMenu(event: MouseEvent) {
  this.contextMenu.open(event.clientY, event.clientX);
};
  public annotationUpdate(currentAnnotation: any): any {
    currentAnnotation.opacity = this.selectedAnnotation.opacity;
    currentAnnotation.fillColor = this.selectedAnnotation.fillColor;
    currentAnnotation.thickness = this.selectedAnnotation.thickness;
    currentAnnotation.strokeColor = this.selectedAnnotation.strokeColor;
    currentAnnotation.color = "";
    if (this.selectedAnnotation.annotationType === "Highlight" || this.selectedAnnotation.annotationType === "Underline" || this.selectedAnnotation.annotationType === "Strikethrough") {
      currentAnnotation.bounds = [];
      currentAnnotation.color = this.selectedAnnotation.fillColor;
      if (this.selectedAnnotation.bounds?.length === 0) {
        currentAnnotation.bounds.push({
          id: this.generateUniqueId(),
          X: this.selectedAnnotation.x,
          Y: this.selectedAnnotation.y,
          Height: this.selectedAnnotation.height,
          Width: this.selectedAnnotation.width,
          Top: this.selectedAnnotation.y,
          Left: this.selectedAnnotation.x
        });
      }
      else if(this.selectedAnnotation.bounds?.length >= 1) {
        this.selectedAnnotation.bounds.forEach((value, index: number) => {
          currentAnnotation.bounds.push({
            id: this.generateUniqueId(),
            X: this.selectedAnnotation.bounds[index].X,
            Y: this.selectedAnnotation.bounds[index].Y,
            Height: this.selectedAnnotation.bounds[index].Height,
            Width: this.selectedAnnotation.bounds[index].Width,
            Top: this.selectedAnnotation.bounds[index].Y,
            Left: this.selectedAnnotation.bounds[index].X
          });
        });
      }
    }
    else if (this.selectedAnnotation.annotationType === "Ink") {
      currentAnnotation.bounds.width = this.selectedAnnotation.width;
      currentAnnotation.bounds.height = this.selectedAnnotation.height;
      currentAnnotation.bounds.x = this.selectedAnnotation.x;
      currentAnnotation.bounds.y = this.selectedAnnotation.y;
    }
    else if (this.selectedAnnotation.annotationType === "Line" || this.selectedAnnotation.annotationType === "Arrow" || this.selectedAnnotation.annotationType === "Distance") {
      currentAnnotation.vertexPoints[0] = {x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1};
      currentAnnotation.vertexPoints[1] = {x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2};
      currentAnnotation.lineHeadStartStyle = this.selectedAnnotation.lineHeadStartStyle;
      currentAnnotation.lineHeadEndStyle = this.selectedAnnotation.lineHeadEndStyle;
      currentAnnotation.offset = { x: currentAnnotation.vertexPoints[0].x, y: currentAnnotation.vertexPoints[0].y };
      if (this.selectedAnnotation.annotationType === "Line") {
        currentAnnotation.subType = "Line";
      }
      else if (this.selectedAnnotation.annotationType === "Arrow") {
        currentAnnotation.subType = "Arrow";
      }
      else if (this.selectedAnnotation.annotationType === "Distance") {
        currentAnnotation.subType = "Distance";
      }
    }
    else if (this.selectedAnnotation.annotationType === "Polygon" || this.selectedAnnotation.annotationType === "Perimeter" || this.selectedAnnotation.annotationType === "Area" || this.selectedAnnotation.annotationType === "Volume") {
      currentAnnotation.vertexPoints = this.selectedAnnotation.vertexPoints;
      currentAnnotation.bounds.width = this.selectedAnnotation.width;
      currentAnnotation.bounds.height = this.selectedAnnotation.height;
      currentAnnotation.bounds.left = this.selectedAnnotation.x;
      currentAnnotation.bounds.top = this.selectedAnnotation.y;
    }
    else if (this.selectedAnnotation.annotationType === "FreeText") {
      currentAnnotation.bounds.width = this.selectedAnnotation.width;
      currentAnnotation.bounds.height = this.selectedAnnotation.height;
      currentAnnotation.bounds.left = this.selectedAnnotation.x;
      currentAnnotation.bounds.top = this.selectedAnnotation.y;
      currentAnnotation.bounds.x = this.selectedAnnotation.x;
      currentAnnotation.bounds.y = this.selectedAnnotation.y;
      currentAnnotation.dynamicText = this.selectedAnnotation.defaultText;
      currentAnnotation.fontFamily = this.selectedAnnotation.fontFamily;
      currentAnnotation.textAlign = this.selectedAnnotation.alignment;
      currentAnnotation.fontSize = this.selectedAnnotation.fontSize;
      currentAnnotation.fontColor = this.selectedAnnotation.fontColor;
      currentAnnotation.font.isBold = false;  
      currentAnnotation.font.isUnderline = false;  
      currentAnnotation.font.isItalic = false;
      currentAnnotation.font.isStrikeout = false;
      switch(this.selectedAnnotation.fontStyle) {
        case "Bold": {
          currentAnnotation.font.isBold = true;
          break;
        }
        case "Underline" : {
          currentAnnotation.font.isUnderline = true;
          break;
        }
        case "Italic" : {
          currentAnnotation.font.isItalic = true;
          break;
        }
        case "Strikethrough": {
          currentAnnotation.font.isStrikeout = true;
          break;
        }
      }  
    }
    else {
      currentAnnotation.bounds.width = this.selectedAnnotation.width;
      currentAnnotation.bounds.height = this.selectedAnnotation.height;
      currentAnnotation.bounds.left = this.selectedAnnotation.x;
      currentAnnotation.bounds.top = this.selectedAnnotation.y;
      if (!isNullOrUndefined(currentAnnotation.bounds.x) && !isNullOrUndefined(currentAnnotation.bounds.y)) {
        currentAnnotation.bounds.x = this.selectedAnnotation.x;
        currentAnnotation.bounds.y = this.selectedAnnotation.y;
      }
    }
    if (this.selectedAnnotation.annotationType === "Distance") {
      currentAnnotation.leaderLength = this.selectedAnnotation.leaderLength;
    }
    else {
      currentAnnotation.leaderLength = 0;
    }
    if (this.selectedAnnotation.annotationType === "Polygon" || this.selectedAnnotation.annotationType === "Perimeter" || this.selectedAnnotation.annotationType === "Area" || this.selectedAnnotation.annotationType === "Volume") {
      currentAnnotation.vertexPoints = this.selectedAnnotation.vertexPoints;
    }
    currentAnnotation.isPrint = this.selectedAnnotation.isPrint as boolean;
    currentAnnotation.isLocked = this.selectedAnnotation.isLocked as boolean;
    currentAnnotation.annotationSettings.isLock = this.selectedAnnotation.isLocked as boolean;
    if (this.selectedAnnotation.isLocked) {
      currentAnnotation.allowedInteractions = this.selectedAnnotation.allowedInteractions.map((value) => value.toString()) as string[];
      if (currentAnnotation.allowedInteractions.length === 0) {
        currentAnnotation.allowedInteractions = ["None"];
      }
    }
    else {
      currentAnnotation.allowedInteractions = ["None"];
    }
    this.updateAnnotationComments(currentAnnotation);
    return currentAnnotation;
  }
  public updateAnnotationComments(currentAnnotation: any) {
    let isReplyChanged = false;
    currentAnnotation.commentType = "add";
    if (((!isNullOrUndefined(currentAnnotation.note) && (currentAnnotation.note !== this.selectedAnnotation.comment)) || (!isNullOrUndefined(currentAnnotation.notes) && (currentAnnotation.notes !== this.selectedAnnotation.comment))) && (currentAnnotation.comments && (currentAnnotation.comments.length > 0))) {
      currentAnnotation.commentType = "edit";
    }
    let shapeType = currentAnnotation.indent ?? "";
    if (shapeType !== "LineDimension" && shapeType !== "PolyLineDimension" && shapeType !== "PolygonDimension" && shapeType !== "PolygonRadius" && shapeType !== "PolygonVolume") {
      if (!isNullOrUndefined(currentAnnotation.note) || (currentAnnotation.shapeAnnotationType === "Ink" && !currentAnnotation.note)) {
        currentAnnotation.note = this.selectedAnnotation.comment;
      }
      else if (!isNullOrUndefined(currentAnnotation.notes)) {
        currentAnnotation.notes = this.selectedAnnotation.comment;
      }
    }
    currentAnnotation.replyComment = [];
    if (this.selectedAnnotation.replies?.length > 0) {
      if (this.selectedAnnotation.replies.length > (currentAnnotation.comments as any[]).length) {
        let diff: number = (this.selectedAnnotation.replies.length - currentAnnotation.comments.length) as number;
        currentAnnotation.commentType = "add";
        for (let index = (this.selectedAnnotation.replies.length - diff); index < (this.selectedAnnotation.replies.length); index++) {
          currentAnnotation.replyComment.push(this.selectedAnnotation.replies[index].note);
        }
      }
      else if (this.selectedAnnotation.replies.length === (currentAnnotation.replies as any[]).length) {
        this.selectedAnnotation.replies.forEach((value, index) => {
          if (currentAnnotation.comments[index] && (value.note !== currentAnnotation.comments[index].note)) {
            isReplyChanged = true;
            currentAnnotation.commentType = "edit";
            currentAnnotation.commentId = currentAnnotation.comments[index].annotName;
            currentAnnotation.editComment = value.note;
          }
        });
      }
    }
    if (!isReplyChanged) {
      currentAnnotation.commentId = null;
      currentAnnotation.editComment = null;
    }
  }

  public RGBAtoHex = (rgba: string, type: "stroke" | "fill"): string => {
    const rgbaValues = rgba
      .replace("rgba", "")
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map(value => value.trim());

    const r = parseInt(rgbaValues[0], 10);
    const g = parseInt(rgbaValues[1], 10);
    const b = parseInt(rgbaValues[2], 10);
    const a = Math.round(parseFloat(rgbaValues[3]) * 255);

    if (type === "stroke") {
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    } else {
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`;
    }
  };

  public IsRGBAColor = (input: string | null): boolean => {
    const rgbaPattern = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)$/;
    if (input !== null) {
      return rgbaPattern.test(input);
    }
    return false;
  };

  public documentLoaded(e: LoadEventArgs): void {
    if (this.viewer) {
      this.setState({
        pageCount: this.viewer.pageCount
      });
    }
    if (e.documentName === 'annotations.pdf') {
      this.viewer.annotation.addAnnotation("Highlight", {
        bounds: [{ x: 97, y: 610, width: 350, height: 14 }],
        pageNumber: 1
      } as HighlightSettings);
      this.viewer.annotation.addAnnotation("Underline", {
        bounds: [{ x: 97, y: 723, width: 353.5, height: 14 }],
        pageNumber: 1
      } as UnderlineSettings);
      this.viewer.annotation.addAnnotation("Strikethrough", {
        bounds: [{ x: 97, y: 836, width: 376.5, height: 14 }],
        pageNumber: 1
      } as StrikethroughSettings);
      this.viewer.annotation.addAnnotation("Line", {
        offset: { x: 200, y: 230 },
        pageNumber: 2,
        vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
      } as LineSettings);
      this.viewer.annotation.addAnnotation("Arrow", {
        offset: { x: 200, y: 370 },
        pageNumber: 2,
        vertexPoints: [{ x: 200, y: 370 }, { x: 350, y: 370 }]
      } as ArrowSettings);
      this.viewer.annotation.addAnnotation("Rectangle", {
        offset: { x: 200, y: 480 },
        pageNumber: 2,
        width: 150,
        height: 75
      } as RectangleSettings);
      this.viewer.annotation.addAnnotation("Circle", {
        offset: { x: 200, y: 620 },
        pageNumber: 2,
        width: 90,
        height: 90
      } as CircleSettings);
      this.viewer.annotation.addAnnotation("Polygon", {
        offset: { x: 200, y: 800 },
        pageNumber: 2,
        vertexPoints: [{ x: 200, y: 800 }, { x: 242, y: 771 }, { x: 289, y: 799 }, { x: 278, y: 842 }, { x: 211, y: 842 }, { x: 200, y: 800 }]
      } as PolygonSettings);
      this.viewer.annotation.addAnnotation("Distance", {
        offset: { x: 200, y: 230 },
        pageNumber: 3,
        vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
      } as DistanceSettings);
      this.viewer.annotation.addAnnotation("Perimeter", {
        offset: { x: 200, y: 350 },
        pageNumber: 3,
        vertexPoints: [{ x: 200, y: 350 }, { x: 285, y: 350 }, { x: 286, y: 412 }]
      } as PerimeterSettings);
      this.viewer.annotation.addAnnotation("Area", {
        offset: { x: 200, y: 500 },
        pageNumber: 3,
        vertexPoints: [{ x: 200, y: 500 }, { x: 288, y: 499 }, { x: 289, y: 553 }, { x: 200, y: 500 }]
      } as AreaSettings);
      this.viewer.annotation.addAnnotation("Radius", {
        offset: { x: 200, y: 630 },
        pageNumber: 3,
        width: 90,
        height: 90
      } as RadiusSettings);
      this.viewer.annotation.addAnnotation("Volume", {
        offset: { x: 200, y: 810 },
        pageNumber: 3,
        vertexPoints: [{ x: 200, y: 810 }, { x: 200, y: 919 }, { x: 320, y: 919 }, { x: 320, y: 809 }, { x: 200, y: 810 }]
      } as VolumeSettings);
      this.viewer.annotation.addAnnotation("FreeText", {
        offset: { x: 250, y: 150 },
        fontSize: 16,
        fontFamily: "Helvetica",
        pageNumber: 4,
        width: 200,
        height: 40,
        isLock: false,
        defaultText: "Syncfusion"
      } as FreeTextSettings);
      this.viewer.annotation.addAnnotation("Stamp", {
        offset: { x: 200, y: 240 },
        pageNumber: 4
      } as StampSettings, DynamicStampItem.Approved);
      this.viewer.annotation.addAnnotation("Stamp", {
        offset: { x: 200, y: 350 },
        pageNumber: 4
      } as StampSettings, null, SignStampItem.SignHere);
      this.viewer.annotation.addAnnotation("Stamp", {
        offset: { x: 200, y: 460 },
        pageNumber: 4
      } as StampSettings, null, null, StandardBusinessStampItem.Confidential);
      //The customStampImageSource property contains the stamp image as a base64 string
      this.viewer.annotation.addAnnotation("Stamp", {
        offset: { x: 200, y: 530 },
        pageNumber: 4,
        customStamps: [
          {
            customStampName: "Image",
            customStampImageSource:
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIIAqwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQHAv/EAEEQAAEDAwIEAwYDBAYLAAAAAAECAwQABREGIRIxQVETYXEHFCIygZEVQmIjUnKCJCUzU6HRFhc1c5KisbKzwvD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APcaUpQKUpQKUpQKUpQKUpQKVzXGdFtsN2ZPfbYjNJ4nHHDgJFfEK5Q5ttbuUaQhcNxvxUPcklPfflQdlYJxURpe/salthuMNpxEYvuNtKc28VKVcPGB2JB577Vyz7pNuUxy26eWlCml8Mu4OI4kR/0oB2Wvp2T17EJK43qDbloakOqL7m6I7TanHVjOMhCQTjzxgVut89i4Mqdj8Y4VlC0OIKFIUOYKTuOn0INRZZtWkrVLuDpIIHHJlPK4nX1dOJR5kk4A5DYDArVoWbHuVgTPjvF5Ul5xx5zhIBc4jkJyBlI+UHqE0FjpSlApSlApSlApSlApSlApSlApSlArClAczgVmqr7QZLptkezxHi1KvD4ihxKsFprBU6v6IB+pFBTdUKf1uUuFa0WpyUIVoYBx706chchXdKEhZSPLNXXVTsOw6NdjNxkvJS0iLEidHnDhLaPME4z5ZzVHk6kTHu1vTpyE1Jf8L3Oww1ZDaGc4XJXjklXDhP6UlWd63ybrL1rq1mNa1hLcAKEeQgcTbbvyuScHnw5KGweZJPIVRYoDT6okfSlnfWhmCwlu43FGAUKxu2j9atyT+UHvirZBixLZBaiQ2kR4zCMIQnZKRWuz2yLZ7czBgo4GWh13KidypR6qJJJPevOvaFqCXqC4HSGmzxlxQbmvJJAPXwwe2M8R9R3FQc1xde9qOqEW+C44jTFuVxPvtnHvCvI+e4HYZPavV4sdmLGajxmktMtJCENpGAkDkBUbpixRNO2dm3Q0/Cj4lrPNazzUf/uWKlkkEZByKDNKUoFKUoFKUoFKUoFKwahZ2p7dFfMZhTs+ZnHu0FHirB/VjZHqogUE3WOIYzUApzUlwBKUxLOwQCFL/bv467DCEn6qr5i6btk5ht+ZOlXlCxlLkiTxtr8whGG8fy0HdK1FZorymHbjH8dPNlC+NY/lTk1XNTe0m12SCXBFnrkOpX7uh6ItkKUBzPGEnhzjcA1bokKLAZS1BjMx20jAQy2EjHoK85i6PuOovaFNv+pWPDt8J/ggMKUCXktq+BX8HNXmT2G9HLF1trSyW2GrUFgbluT3eCIRIS26tS/iSjwgCcDl35Z3qBlSb/edVcN58e4tojKafiW2MfDQpRBXF8X5UnZPGsq5ZAr0TV2j52oL9Anx7wqCxHYWypLbeXAFH4lNqz8KiNs8x0qy2e1QrNbmYFuZDUdkYSkHOT1JPUk7k0HhsG6u3SHPeisLFwnucE95hOPdmc8DUNhR/OrCR5Ak9NvX9F6cRp20IZIR706AX1I5DA2Qn9KRsPvzJqGmXG0N6pfk3KTEhW2ykBsLKUh2Y4nKlY6lKCAOuVmuafry5T5rFs0vaHQ5JSVIm3FBaQhvq7wfNwjurAPnQZ9pms1WtlVmtDqRcnxwrdK+ERknqT0Vj7DftUN7OA1BilywWx65TnU8PjOAtMsJJzlbhBypXMhPFgADbrF6B0sNSagkzrk+5cbTDeUQ5IHwy3T+bHbYE/y9yK9sabQ02lDSAhCRhKUjAAoIaFaZ8gh++zg8vIKYsUFphB+/Ev8AmONuVTYGBgcqzSoFKUoFKUoFKUoFcV4mOW+2yJbEN6Y40gqTHYGVuHsK7awRmg8rd/1gameJn2n8Ptv5YQn+78f+8cSFLI57AJ8/Oy2eyalhxkRo79htEVI2YgQ1uEH+JSgD68NW/FQ2r7yqxWCTNZR4knZqM1/ePLPChP3IoKRc4l91FqJ3TkfUst2Aygfiz7TDTaEA8mkEAnjPXfAH2NohaPehR2Y8bVF9QwygNttJMcJSkDAAAZru0hY02CyMxFK8SWv9rMfPN55W6lE9d9vQCpughmrLNZVxI1Fc19kupYUn/wAYP+NdQVMjD+khEhsfM40nhUPMp3z9D9K76xQRN/uNxjWj3qwW9F0krKfDa8YISUn83F25VVocf2kXdR/EJlrskZQxiM14ryR5ZJA9c/SrHo973m2SFjPhCfKSzn9wPLCceXbyxUpPmRrdDemTHUMx2UFbjizgJAoPGrbpyJBRPvEi53STfhc34MRCVMrckLSvCT8aFEEjBUQdhUlfbHcrcItuYvc+VqbUBDcpf7PgDSfnJPBxBCQcDBGcnlUn7Om4kly+aonhbPBPkeGiRsIqCEqUcHkSMZ9K5bRqqMbjJ1E5FkTrndFe72m2sAF1MVBI4iD8iVKyoqO2w7VRbrJpRdkt7MGDe56GGhgJ8Njn1P8AZ9fPNd5gXNKQEXt0q7uRmz/0AqFja29znGFq2EmxuqaLzDrkhK2XUj5gF7YUNvhqsX+66nvtqlarsrsmDa7aUvQIqQULuCUqHiLdGPk4c8I686g9BMK8/lu7IxyzCB/9q4bpJkWeP7xd9TQojGeHjdipRk9hlW5/yrF21raoEGM/HcM+TMSDEhwyFuv55YA5DfcnYVx2fTD9wm/jeskMS7goYYhY42IKeyQeajtlR68tqCUjtXWVHakQL/FejupC23PcwsLSeoKVgEVsLWomsFMm1yAM5C2HGir6hSsfY1B6ILViuV50utSWkRpHvNvQTgGO6OLCe/CviB7bVMXjVMC2vCG0VTrk4MtQIeHHleZHJCf1KwKDTcNSqskB2XqSCYjTQ3fYcDzSj0SOSgSdhlP1r50FqherbM5cVQVQwmQtkNlfFxBON8/XB8wa4JNsfUzJ1Jq/wXFQWnH4tvbPEzFCUk8RyPjd2+bkOQ7nHs0iSLRY7dBkKUoy4gnYV8yHFEFxPoCtOPU+VBdaUpQKUpQKqF4H4xry027YxrYyq4yB3cPwND/vV9BVvNVTRf8ATrhqC9KIUJU4x2T2aZHAB/xcZ+tBa6UpQKr+r7lIjRWrdaz/AFrcleBF2z4W3xOq8kDf1wOtSV5ukSz216fOc4GGhk4GSo9EpHVROwHU1DaWtst2S9qG+N8Nzlp4WWSc+6R85S0P1dVHqfSgm7Rb2bTbItvjcXhR2g2kqOVKx1J6k8zVbfP+leoSxkGx2h7LxztJlD8h6FCOZ/VjtXdq25ymWY9ptSv61uSi2yr+4Rj43T5JHLzIrRfHIujtCy/dthFiqQyD8zrqhgZ7qUo/40FJsbL2q7W/YYchUdqdMlXC5SEDJQhbq/CbHTKuEEj90edXfRWi4Gk4yvAUqTMdADsp35ikckj91I7Vn2e6bTpnTUaG5hUtweLJcHVw9PQch6VZ6Dhudot12aQ1dIEWa2hXEhEllLgSe4Cga7OBPBwYHDjGMbYr6pQRNp03ZrM669arVChuu/OphkJJ8tunlUt0pSgjLxYLVew2LtAYleEctqcT8SPRXMfevq0WO12VtTdpgRoiVHKy02AVnuo8z9akaUEBr2O9L0beI8dtx1xyMpIQ2kqUodQANycZrk07JVeLyq4R2HmrZCiiJFW62UF9SilS1AHfhHAgA7b8XlVqIzWMb0GaUpQKUpQc9wkCJAkyVcmWlOH6AmoL2bsqZ0LZi4SXHowfcUeZU58ZP3VUpqNlcjT1zYaGVuRHUJA6koIFcuiZDcnR9lea+RcFkgdvgG1BN1omS48GM7JluoZYaSVuOLOEpSOZJrXdLjEtUF2bcJLceM0MrccOAP8AP0qqR4czWk1qfd2HItgZWFxLe6MLlKHJ14dE9kH1NBttDEjVVzYvtxaUza4547ZCdThSz0kLHQ4+UdAc86tcmQzDjOyJLiW2WUFxxxWwSkDJJ+lbQAOVVPU6vx29xdLsqPgBKZdzIG3ghWEtE9CtX/Kk0GzSTDlwekamnNlL08BMNCs5ZijdAweRVniPqB0qsarce1XrezWlghVsiTCp3B/tFtDicPok8CP4lq7VedSzXYFr8OBwpmyVCPEyPhStQPxEfupAKj5JNVz2eW9t2RIvLJWqGlsQbetXN1pCsuPerjmVZ6gCqLyBis0pUClKUClKUClKUClKUClKUClKUGCMjFVNqw36yeOxpmbb/wAPdcU43GntLPuqlHJCFJO6ckkJI2zzq20oKtE0iZE5q46mnKu8to8TLSmwiMwe6G99/wBSiTVoGwrNcV4uUez2yTcJiiGY7ZWrAyT2AHUk7D1oMXq6R7PapNxlk+FHQVkAZKj0SB1JOAPWozRtqfhW5ybcf9qXJz3qZk54FEbNg9kDCfoT1qGi++alvEGJdGwlq2hE+e0FApTKVu0we4Qk8R7nhNXkcqCs6q0zK1DcIWbkqNbW23ESmWk4ceCsZAV+UEAgnngnvViix2okZqPHbS2y0kIbQkYCUjYAVtpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKouv7mwi7W2HJBdZiJNxXHSd5DoUER2gOpU4rI/gq9VxO2i3PXRu6OwmFz2m/DbkKQCtKck4B+p+9BxaTtblqtQEvhM+UtUqatO4U8vdW/YbJHkkVNVgDFZoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoP//Z"
          }
        ]
      } as CustomStampSettings);
      //The pathData property holds the value of the signature drawn using the ink annotation
      this.viewer.annotation.addAnnotation("Ink", {
        offset: { x: 250, y: 860 },
        pageNumber: 4,
        width: 200,
        height: 60,
        path: '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]'
      } as InkAnnotationSettings);
      this.viewer.annotation.addAnnotation("StickyNotes", {
        offset: { x: 300, y: 980 },
        pageNumber: 4,
        isLock: false
      } as StickyNotesSettings);
    }
    this.selectedAnnotation = new AnnotationBase();
    this.annotationUnSelectedEvent();
  }
  change = (args) => {
    if (args.checked) {
      this.viewer.serviceUrl = '';
    }
    else {
      this.viewer.serviceUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer';
    }
    this.viewer.dataBind();
    this.viewer.load(this.viewer.documentPath, null);
  }
}

export class AnnotationBase {
  annotationType: string = "Rectangle";
  pageNumber: number = 1;
  x: number = 100;
  y: number = 100;
  width: number = 100;
  height: number = 100;
  opacity: number = 100;
  thickness: number = 1;
  fillColor: string = "rgba(0, 0, 0, 0)";
  strokeColor: string = "#FF0000FF";
  author: string = "Guest";
  setState: string = "None";
  comment: string = "";
  replyAuthor: string = "Guest";
  replyState: string = "None";
  replyComment: string = "";
  replies: Comment[] = [];
  replyMenuItems = [
    {
      text: "Edit",
    },
    {
      text: "Delete",
    },
  ];
  modifiedDate: string = new Date().toString();
  replyModifiedDate: string = new Date().toString();
  vertexPoints: VertexPoint[] = [];
  bounds: any[] = [];
  allowedInteractions: AllowedInteraction[] = [];
  lineHeadStartStyle: string = "None";
  lineHeadEndStyle: string = "None";
  leaderLength: number = 0;
  fontFamily: string = "Helvetica";
  fontStyle: string;
  alignment: string = "Left";
  defaultText: string = "Free Text";
  fontSize: number = 16;
  fontColor: string = "#000000";
  vertexX1: number = 100;
  vertexY1: number = 100;
  vertexX2: number = 200;
  vertexY2: number = 100;
  stampType: string = "Dynamic";
  stampComment: any;
  inkAnnotationType: string = "Syncfusion"
  color: string = '#FFDF56'
  path: string;
  customStampImageSource: string;
  customStampName: string = "Image";
  borderColor: string;
  annotationSelected: boolean = false;
  dynamicStamps: DynamicStampItem[] = [
    DynamicStampItem.Approved,
    DynamicStampItem.Confidential,
    DynamicStampItem.NotApproved,
    DynamicStampItem.Received,
    DynamicStampItem.Reviewed,
    DynamicStampItem.Revised
  ];
  signStamps: SignStampItem[] = [
    SignStampItem.Accepted,
    SignStampItem.InitialHere,
    SignStampItem.Rejected,
    SignStampItem.SignHere,
    SignStampItem.Witness
  ]
  standardBusinessStamps: StandardBusinessStampItem[] = [
    StandardBusinessStampItem.Approved,
    StandardBusinessStampItem.Completed,
    StandardBusinessStampItem.Confidential,
    StandardBusinessStampItem.Draft,
    StandardBusinessStampItem.Final,
    StandardBusinessStampItem.ForComment,
    StandardBusinessStampItem.ForPublicRelease,
    StandardBusinessStampItem.InformationOnly,
    StandardBusinessStampItem.NotApproved,
    StandardBusinessStampItem.NotForPublicRelease,
    StandardBusinessStampItem.PreliminaryResults,
    StandardBusinessStampItem.Void,
  ];
  isLocked: boolean = false;
  showStampType: boolean = false;
  showInkAnnotationType: boolean = false;
  disableInkAnnotField: boolean = false;
  showFileUploader: boolean = false;
  isPrint: boolean = true;
}

class Comment {
  id: string;
  author: string;
  note: string;
  modifiedDate: string;
  state: string;
}

export default ProgrammaticOperations;