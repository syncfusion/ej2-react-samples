/**
 * Default PDF Viewer sample
 */
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, Inject, HighlightSettings, UnderlineSettings, StrikethroughSettings, LineSettings, ArrowSettings, RectangleSettings, CircleSettings, PolygonSettings, DistanceSettings, PerimeterSettings, AreaSettings, RadiusSettings, VolumeSettings, FreeTextSettings, StampSettings, DynamicStampItem, SignStampItem, StandardBusinessStampItem, CustomStampSettings, InkAnnotationSettings, StickyNotesSettings, AnnotationMoveEventArgs,
    AnnotationSelectEventArgs,
    LoadEventArgs,
    AnnotationResizeEventArgs,
    DecoratorShapes
} from '@syncfusion/ej2-react-pdfviewer';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent, CheckBoxComponent, SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
import { ColorPickerComponent, NumericTextBoxComponent, RemovingEventArgs, SuccessEventArgs, TextBoxComponent, UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { ChangeEventArgs, DropDownListComponent, DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-react-grids';
import { NumberFormat } from '@syncfusion/ej2-base/src/intl/number-formatter';
import { ContextMenuComponent, MenuEventArgs } from '@syncfusion/ej2-react-navigations';

interface VertexPoint {
    x: number;
    y: number;
    id: string;
}

class Comment {
    id: string;
    author: string;
    note: string;
    modifiedDate: string;
    state: string;
}

type PropertyType = 
    'stampType' |
    'stampComment' |
    'pageNumber' | 
    'x' | 
    'y' | 
    'width' | 
    'height' | 
    'vertexX1' | 
    'vertexY1' | 
    'vertexX2' | 
    'vertexY2' | 
    'opacity' | 
    'thickness' | 
    'lineHeadStartStyle' | 
    'lineHeadEndStyle' | 
    'leaderLength' | 
    'inkAnnotationType' | 
    'defaultText' | 
    'fontFamily' | 
    'alignment' | 
    'fontStyle' | 
    'fontSize' | 
    'author' | 
    'comment' | 
    'setState' | 
    'replyAuthor' | 
    'replyComment' | 
    'replyState' | 
    'strokeColor' | 
    'fillColor' | 
    'fontColor' | 
    'color' | 
    ''

export class AnnotationBase {
    annotationType: string = "Rectangle";
    pageNumber: number = 1;
    x: number = 100;
    y: number = 100;
    width: number = 100;
    height: number = 100;
    opacity: number = 100;
    thickness: number = 1;
    fillColor: string = "#FFFFFF00";
    strokeColor: string = "#FF0000FF";
    isLocked: boolean = false;
    author: string = "Guest";
    setState: string = "None";
    comment: string = "";
    replyAuthor: string = "Guest";
    replyState: string = "";
    replyComment: string = "";
    replies: Comment[];
    replyMenuItems = [
        {
            text: "Edit",
        },
        {
            text: "Delete",
        },
    ];
    modifiedDate: string = new Date().toDateString();
    replyModifiedDate: string = new Date().toDateString();
    vertexPoints: VertexPoint[] = [];
    allowedInteractions: any[] = ["None"];
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
    stampComment: string = "Approved";
    inkAnnotationType: string = "Syncfusion"
    color: string = '#FFDF56'
    path: string;
    customStampImageSource: string;
    customStampName: string = "Image";
    borderColor: string;
    annotationSelected: boolean = false;
    bounds: any[] = [];
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
    ];
    standardBusinessStamps: StandardBusinessStampItem[] = [
        StandardBusinessStampItem.Approved,
        StandardBusinessStampItem.Completed,
        StandardBusinessStampItem.Confidential,
        StandardBusinessStampItem.Draft,
        StandardBusinessStampItem.Final,
        StandardBusinessStampItem.ForComment,
        StandardBusinessStampItem.InformationOnly,
        StandardBusinessStampItem.NotApproved,
        StandardBusinessStampItem.PreliminaryResults,
        StandardBusinessStampItem.Void,
    ];
    isPrint: boolean = true;
    showStampType: boolean = false;
    showInkAnnotationType: boolean = false;
    disableInkAnnotField: boolean = true;
    showFileUploader: boolean = false;
}

function ProgrammaticOperations() {
    let syncfusionLogo: string = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADJCAMAAABYMS1zAAAAllBMVEX///8rNXz2kh7b3OXQ0d8jLnlMU4wfK3hYXpH5+fvz8/bv7/SRlbYAAGyLj7GMkLBGToqdoLt4fKS1t8vIydoAGHEXJXUMHnP1hAD1jAD9483+9u7707L4sXSDh6s0PoL3oE76xpr4qV/97d/5vov96NYADW/2m0b7zaX2mTv4t3v5uYT83cL4rms+R4YAAGX2kjBubpsmc7m7AAAEKUlEQVR4nO3c6VbiQBAF4Dai7AiikCbIjuyK7/9ykziTCJLuVLUcu5O5938d8x2kUr0chEAQBEEQpBgJbD/A9RLMVnPbz3C1LHw5Gdh+iCtl7Xue3AxtP8ZVMpReGOlNC/DF2Xt/I+U295rlRHoxZ5ZzzXyWWELNZGn7eX6SYHdiidrA3vYT/SBT3zuPXNt+JOOsv1tCzSKnX5y9vLB4nr/N5TQw8NIwnjzksA3MV6mWqKnlrg0EM4UlmgbyNtu8KC2fs43tx2NlobFEnDzNNmst5bMN5EYzzLKEmlVOmtpgo/8n+/fFyUVTW6ob2ZlG5qCpBbpGdhbf/QXbjmoJNTvHZ5sp3ZI521S7oxY93biqwSga3Wr+/ppjyZptaq3XMjm9Rox569Or3p/Ufz51UtZqdPs2tYf+DTl3CaZdplc11Zj5kWnxtAs2q5hANSlr4+9UTc0mRjMp6zWqfRubmK2ZJdRs0lu0RQyrKX/TTBzDEKZLVeQxfWPdGoY0XSosqpnTFka55KdgVK8aSxizpvzPolxEW8LMLvf7qPHVS2hrn4ypRreAttYADF8y2qMBe615aoTRHgxYfGkOjwYfjnbpbHOc2U/YCwD9EYfVqZm4lZHE32ktttczW05T818yNjTsYkRwcVim+R+bZG1nWMakHpcpLJvMPU3rGLGXtC+OzL6CYh8jlqT5mbKf6QDm/PRfFcq5swsYEewyLaRTZycwYVPLOGyiHc+4gYkW0bpzwMym7BZG7DUaSdwvdwYTzjaqN45PvRfoDkbMD+kan3zI5BBGBIs0jU8/N3cJk3rqLDMmZXcxlws21pm5Y5jvCzY54xz8uYYRy8PpzcbsSdlpjAhO9m2OvLN/9zDRbBNzmLcaHcQks41cMOucxIh91NTkjFvmJkYMVlJKdpWjmOi8k3+3xFWMCAxuljiLMUmxMKP3Z3JeWzFm3KRX6a6bXDfVpw4jyWNxihq6i0BX1rBiVPVrFgRBkIKkVmekZlSV9OaAEwNLtfvxSE9ye7bFKPpIXpovjBxMBs1Ws0dOPxln3p7pVV/jjGSEvCd7ivnNQZNzUA4MMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwPzvmOcCYVoFwlRLXUZKcRmnqJtcBBoysnb+lxkRBEEQSuq3jNTjKk6RYVUt/Xl1qXbuK/R04qpHRlE7mQAYRZV2SfHEmtQajN+e7T/GmArnt2fjC8TipnedX6xVYxhTc3mUYIxms/GdSRUHwxg0gQEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAaaImELdA3i9I6f3henTq5pfNzTK9CqjGxqdt3ty2g8x5qNNrxonmAq96H5sgBH1EiPJPdhbTlVyq4lTVDK41YQgCIIgCIIgSFr+AKg+KPUzaG6DAAAAAElFTkSuQmCC";
    let vertexTableNumberFormat = NumberFormat.numberFormatter(undefined, {maximumFractionDigits: 0}, undefined); 
    let toolbarSettings: object = { 
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
    let selectedAnnotation: React.MutableRefObject<AnnotationBase> = React.useRef(null);
    if (selectedAnnotation.current === null) {
        selectedAnnotation.current = new AnnotationBase();
    }
    let currentEditCommentId = React.useRef("");
    let [isDeleteBoundsDisabled, setIsDeleteBoundsDisabled] = React.useState(true as boolean);
    let [isDeleteVertexDisabled, setIsDeleteVertexDisabled] = React.useState(true as boolean);
    let [annotationType, setAnnotationType] = React.useState(selectedAnnotation.current.annotationType as string);
    let [stampType, setStampType] = React.useState(selectedAnnotation.current.stampType as string);
    let [stampComment, setStampComment] = React.useState(selectedAnnotation.current.stampComment as string);
    let [pageNumber, setPageNumber] = React.useState(1);
    let [x, setX] = React.useState(selectedAnnotation.current.x as number);
    let [y, setY] = React.useState(selectedAnnotation.current.y as number);
    let [width, setWidth] = React.useState(selectedAnnotation.current.width as number);
    let [height, setHeight] = React.useState(selectedAnnotation.current.height as number);
    let [x1, setX1] = React.useState(selectedAnnotation.current.vertexX1 as number);
    let [y1, setY1] = React.useState(selectedAnnotation.current.vertexY1 as number);
    let [x2, setX2] = React.useState(selectedAnnotation.current.vertexX2 as number);
    let [y2, setY2] = React.useState(selectedAnnotation.current.vertexY2 as number);
    let [vertexPoints, setVertexPoints] = React.useState([] as VertexPoint[]);
    let [bounds, setBounds] = React.useState([] as any[]);
    let [strokeThickness, setStrokeThickness] = React.useState(selectedAnnotation.current.thickness as number);
    let [opacity, setOpacity] = React.useState(selectedAnnotation.current.opacity as number);
    let [fillColor, setFillColor] = React.useState(selectedAnnotation.current.fillColor as string);
    let [strokeColor, setStrokeColor] = React.useState(selectedAnnotation.current.strokeColor as string);
    let [lineHeadStartStyle, setLineHeadStartStyle] = React.useState(selectedAnnotation.current.lineHeadStartStyle as string);
    let [lineHeadEndStyle, setLineHeadEndStyle] = React.useState(selectedAnnotation.current.lineHeadEndStyle as string);
    let [leaderLength, setLeaderLength] = React.useState(selectedAnnotation.current.leaderLength as number);
    let [inkAnnotationType, setInkAnnotationType] = React.useState(selectedAnnotation.current.inkAnnotationType as string);
    let [defaultText, setDefaultText] = React.useState(selectedAnnotation.current.defaultText as string);
    let [fontFamily, setFontFamily] = React.useState(selectedAnnotation.current.fontFamily as string);
    let [alignment, setAlignment] = React.useState(selectedAnnotation.current.alignment as string);
    let [fontStyle, setFontStyle] = React.useState(selectedAnnotation.current.fontStyle as string);
    let [fontSize, setFontSize] = React.useState(selectedAnnotation.current.fontSize as number);
    let [fontColor, setFontColor] = React.useState(selectedAnnotation.current.fontColor as string);
    let [allowedInteractions, setAllowedInteractions] = React.useState(selectedAnnotation.current.allowedInteractions as any[]);
    let [author, setAuthor] = React.useState(selectedAnnotation.current.author as string);
    let [comment, setComment] = React.useState(selectedAnnotation.current.comment as string);
    let [commentState, setCommentState] = React.useState(selectedAnnotation.current.setState as string);
    let [replyAuthor, setReplyAuthor] = React.useState(selectedAnnotation.current.replyAuthor as string);
    let [replyComment, setReplyComment] = React.useState(selectedAnnotation.current.replyComment as any);
    let [replyState, setReplyState] = React.useState(selectedAnnotation.current.replyState as string);
    let [replies, setReplies] = React.useState([] as Comment[]);
    let [showStampType, setStampTypeVisibility] = React.useState(false);
    let [showAnnotationListField, setAnnotationFieldVisibility] = React.useState(true);
    let [showPageNumberField, setPageNumberVisibility] = React.useState(true);
    let [showAddAnnotButton, setAddAnnotVisibility] = React.useState(true);
    let [showUpdateAnnotButton, setUpdateAnnotVisibility] = React.useState(false);
    let [showStrokeProperties, setStrokePropsVisibility] = React.useState(true);
    let [showBoundsButtons, setBoundsButtonsVisibility] = React.useState(false);
    let [showFillColor, setFillColorVisibility] = React.useState(true);
    let [showXYRow, setXYRowVisibility] = React.useState(true);
    let [showX1Y1Row, setX1Y1RowVisibility] = React.useState(false);
    let [showX2Y2Row, setX2Y2RowVisibility] = React.useState(false);
    let [showHeightWidthRow, setHeightWidthRowVisibility] = React.useState(true);
    let [showLineProps, setLinePropsVisibility] = React.useState(false);
    let [showVertexButtons, setVertexButtonsVisibility] = React.useState(false);
    let [showInkAnnotationType, setInkAnnotationTypeVisibility] = React.useState(false);
    let [showFreeTextProps, setFreeTextPropsVisibility] = React.useState(false);
    let [showFileUploader, setFileUploaderVisibility] = React.useState(false);
    let [showLeaderLength, setLeaderLengthVisibility] = React.useState(false);
    let [isReplyBoxChecked, setReplyBoxChecked] = React.useState(false);
    let [lockAnnotations, setLockAnnotations] = React.useState(false);
    let [printAnnotation, setPrintAnnotation] = React.useState(true);
    let [isEditing, setIsEditing] = React.useState(false);
    let [pageCount, setPageCount] = React.useState(1);
    let [disableInkAnnotField, setDisableInkAnnotField] = React.useState(false);
    React.useEffect(() => {
        updateSampleSection();
        setUpdateAnnotVisibility(false);
    }, [])
    let pdfviewerApiPath: Object = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };
    let viewer: PdfViewerComponent;
    let uploaderObj: UploaderComponent;
    let contextMenu: ContextMenuComponent;
    let previewImage: HTMLImageElement;
    let annotationListFields: Object = { text: 'Text', value: 'ID' };
    const uploaderTemplate = (data): React.ReactElement => {
        return (
        <div>
            <span className='wrapper'>
                <img className='upload-image' ref={(scope) => {previewImage = scope}} alt='image' src={syncfusionLogo} />
                <span className='name file-name'>{data.name}</span>
                <span className='e-icons e-file-remove-btn' onClick={() => {uploaderObj.remove()}} title='Remove'/>
            </span>
        </div>);
    } 
    const annotationSettings = () => ({
        offset: { x: selectedAnnotation.current.x, y: selectedAnnotation.current.y },
        isLock: selectedAnnotation.current.isLocked,
        isPrint: selectedAnnotation.current.isPrint,
        pageNumber: selectedAnnotation.current.pageNumber,
        width: selectedAnnotation.current.width,
        height: selectedAnnotation.current.height,
        opacity: selectedAnnotation.current.opacity / 100,
        thickness: selectedAnnotation.current.thickness,
        strokeColor: selectedAnnotation.current.strokeColor,
        fillColor: selectedAnnotation.current.fillColor,
        bounds: (selectedAnnotation.current.bounds && selectedAnnotation.current.bounds.length > 0) ? selectedAnnotation.current.bounds.map((item) => ({x: item.X, y: item.Y, width: item.Width, height: item.Height})) : 
            [{
                x: selectedAnnotation.current.x,
                y: selectedAnnotation.current.y,
                height: selectedAnnotation.current.height,
                width: selectedAnnotation.current.width
            }],
        vertexPoints: selectedAnnotation.current.vertexPoints,
        fontFamily: selectedAnnotation.current.fontFamily,
        fontStyle: selectedAnnotation.current.fontStyle,
        fontSize: selectedAnnotation.current.fontSize,
        defaultText: selectedAnnotation.current.defaultText,
        textAlignment: selectedAnnotation.current.alignment,
        author: selectedAnnotation.current.author,
        setState: selectedAnnotation.current.setState,
        note: selectedAnnotation.current.comment,
        notes: selectedAnnotation.current.comment,
        comments: selectedAnnotation.current.replies,
        replyAuthor: selectedAnnotation.current.replyAuthor,
        replyState: selectedAnnotation.current.replyState,
        replyComment: selectedAnnotation.current.replyComment,
        modifiedDate: selectedAnnotation.current.modifiedDate,
        replyModifiedDate: selectedAnnotation.current.replyModifiedDate,
        lineHeadEndStyle: viewer.annotation.getArrowString(selectedAnnotation.current.lineHeadEndStyle as DecoratorShapes),
        lineHeadStartStyle: viewer.annotation.getArrowString(selectedAnnotation.current.lineHeadStartStyle as DecoratorShapes),
        leaderLength: selectedAnnotation.current.leaderLength,
        inkAnnotationType: selectedAnnotation.current.inkAnnotationType,
        color: selectedAnnotation.current.fillColor,
        allowedInteractions: selectedAnnotation.current.allowedInteractions,
        dynamicStamps: selectedAnnotation.current.dynamicStamps,
        signStamps: selectedAnnotation.current.signStamps,
        standardBusinessStamps: selectedAnnotation.current.standardBusinessStamps,
        path: selectedAnnotation.current.path,
        fontColor: selectedAnnotation.current.fontColor,
        borderColor: selectedAnnotation.current.strokeColor,
        customStamps: [{
            customStampImageSource: selectedAnnotation.current.customStampImageSource,
            customStampName: selectedAnnotation.current.customStampName,
        }]
    });
    let annotationsList: { ID: string, Text: string }[] = [
        { ID: 'Highlight', Text: 'Highlight' },
        { ID: 'Underline', Text: 'Underline' },
        { ID: 'Strikethrough', Text: 'Strikethrough' },
        { ID: 'Line', Text: 'Line' },
        { ID: 'Arrow', Text: 'Arrow' },
        { ID: 'Rectangle', Text: 'Rectangle' },
        { ID: 'Circle', Text: 'Circle' },
        { ID: 'Polygon', Text: 'Polygon' },
        { ID: 'Distance', Text: 'Distance' },
        { ID: 'Perimeter', Text: 'Perimeter' },
        { ID: 'Area', Text: 'Area' },
        { ID: 'Radius', Text: 'Radius' },
        { ID: 'Volume', Text: 'Volume' },
        { ID: 'StickyNotes', Text: 'Sticky Notes' },
        { ID: 'Ink', Text: 'Ink' },
        { ID: 'Stamp', Text: 'Stamp' },
        { ID: 'CustomStamp', Text: 'Custom Stamp' },
        { ID: 'FreeText', Text: 'Free Text' },
    ];
    let commentStatusList: { Status: string }[] = [
        { Status: 'None' },
        { Status: 'Accepted' },
        { Status: 'Cancelled' },
        { Status: 'Completed' },
        { Status: 'Rejected' }
    ];
    let commentStatusListfields: { text: string } = { text: 'Status' };
    let lineHeadstatusList: { Type: string, Value: string }[] = [
        { Type: 'None', Value: "None" },
        { Type: 'Closed Arrow', Value: "Arrow" },
        { Type: 'Open Arrow', Value: "OpenArrow" },
        { Type: 'Square', Value: "Square" },
        { Type: 'Diamond', Value: "Diamond" },
        { Type: 'Round', Value: "Circle" }
    ];
    let lineHeadstatusfield: { text: string, value: string } = { text: 'Type', value: 'Value' };
    let inkAnnotationDataList: { Type: string }[] =
        [
            { Type: 'Syncfusion' },
            { Type: 'PdfViewer' },
            { Type: 'Star' }
        ];
    let inkAnnotationfield: object = { text: 'Type' }
    let stampTypeDataList: { Type: string }[] =
        [
            { Type: 'Dynamic' },
            { Type: 'Sign Here' },
            { Type: 'Standard Business' },
        ];
    let stampTypeDatafields: object = { text: 'Type' }
    let dynamicstampCommentsList: { Type: string, Value: string }[] =
        [
            { Type: 'Approved', Value: "Approved" },
            { Type: 'Confidential', Value: "Confidential" },
            { Type: 'Not Approved', Value: "NotApproved" },
            { Type: 'Received', Value: "Received" },
            { Type: 'Reviewed', Value: "Reviewed" },
            { Type: 'Revised', Value: "Revised" },
        ];
    let sighhereCommentsList: { Type: string, Value: string }[] =
        [
            { Type: 'Accepted', Value: "Accepted" },
            { Type: 'Initial Here', Value: "InitialHere" },
            { Type: 'Rejected', Value: "Rejected" },
            { Type: 'Sign Here', Value: "SignHere" },
            { Type: 'Witness', Value: "Witness" },
        ];
    let StandardBusinessStampsList: { Type: string, Value: string }[] =
        [
            { Type: 'Approved', Value: "Approved" },
            { Type: 'Not Approved', Value: 'NotApproved' },
            { Type: 'Completed', Value: "Completed" },
            { Type: 'Confidential', Value: "Confidential" },
            { Type: 'Draft', Value: "Draft" },
            { Type: 'Final', Value: "Final" },
            { Type: 'For let Release', Value: "ForletRelease" },
            { Type: 'Information Only', Value: "InformationOnly" },
            { Type: 'Not For let Release', Value: "NotForletRelease" },
            { Type: 'Preliminary Results', Value: "PreliminaryResults" },
            { Type: 'Void', Value: "Void" },
            { Type: 'For Comment', Value: "ForComment" }
        ];
    let stampCommentsTypeDatafields: object = { text: 'Type', value: 'Value' }
    let [currentCommentsList, setCurrentCommentsList] = React.useState(dynamicstampCommentsList);
    let freeTextFontFamilyList: { Type: string, Value: string }[] =
        [
            { Type: 'Helvetica', Value: 'Helvetica' },
            { Type: 'Courier', Value: 'Courier' },
            { Type: 'Symbol', Value: 'Symbol' },
            { Type: 'Times New Roman', Value: 'TimesNewRoman' }
        ];
    let freetextFontFamilyFields: object = { text: 'Type', value: 'Value' }
    let freeTextAlignmentList: { Type: string, Value: string }[] =
        [
            { Type: 'Center', Value: 'Center' },
            { Type: 'Right', Value: 'Right' },
            { Type: 'Left', Value: 'Left' },
            { Type: 'Justify', Value: 'Justify' }
        ];
    let freeTextAlignmentField: object = { text: 'Type', value: 'Value' }
    let freeTextFontStyleList: { Type: string, Value: string }[] =
        [
            { Type: 'None', Value: 'None' },
            { Type: 'Bold', Value: 'Bold' },
            { Type: 'Underline', Value: 'Underline' },
            { Type: 'Italic', Value: 'Italic' },
            { Type: 'Strike through', Value: 'Strikethrough' }
        ];
    let freeTextFontStyleFields: object = { text: 'Type', value: 'Value' }
    let intractionsList: object[] =
        [
            { Type: 'None', Value: "None" },
            { Type: 'Delete', Value: "Delete" },
            { Type: 'Property Change', Value: "PropertyChange" },
            { Type: 'Move', Value: "Move" },
            { Type: 'Select', Value: "Select" },
            { Type: 'Resize', Value: "Resize" },
        ];
    let intractionsListfield: Object = { dataSource: intractionsList, value: 'Value', text: 'Type' };
    let dropImageElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    let currentUpdateAnnotIdRef = React.useRef("");
    function annotationSelectedEvent(annotationSelectEventArgs: AnnotationSelectEventArgs) {
        viewer.enableCommentPanel = true;
        selectedAnnotation.current.annotationSelected = true;
        currentUpdateAnnotIdRef.current = annotationSelectEventArgs.annotationId;
        let currentAnnotation = getAnnotationByID(currentUpdateAnnotIdRef.current);
        if (currentAnnotation) {
            setAddAnnotVisibility(false);
            setUpdateAnnotVisibility(false);
            updateProperties(currentAnnotation);
        }
    }
    const annotationUnSelectedEvent = () => {
        viewer.enableCommentPanel = false;
        selectedAnnotation.current.annotationSelected = false;
        currentUpdateAnnotIdRef.current = "";
        setAddAnnotVisibility(true);
        setUpdateAnnotVisibility(false);
        setAnnotationFieldVisibility(true);
        setPageNumberVisibility(true);
        resetAnnotationProperties();
    };
    function Reset() {
        resetAnnotationProperties();
        if (selectedAnnotation.current.annotationSelected) {
            selectedAnnotation.current.showFileUploader = false;
            selectedAnnotation.current.disableInkAnnotField = true;
            selectedAnnotation.current.showStampType = false;
            updatePropertiesInUI();
        }
    }

    return (
        <div>
            <div className='col-lg-9 e-pv-control-section e-pv-pdfviewer-control-section'>
                <div className="e-pv-flex-container">
                    <label htmlFor="checked" className="e-pv-switchLabel" > Standalone PDF Viewer </label>
                    <div className="e-message render-mode-info">
                        <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
                    </div>
                    <div>
                        <SwitchComponent cssClass="e-pv-buttonSwitch" id="checked" change={change} checked={true}></SwitchComponent>
                    </div>
                </div>

                {/* Render the PDF Viewer */}
                <PdfViewerComponent ref={(scope) => { viewer = scope; }} id="container" documentPath="https://cdn.syncfusion.com/content/pdf/annotations.pdf" resourceUrl="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" toolbarSettings={toolbarSettings} enableAnnotationToolbar={false} documentLoad={documentLoaded} annotationSelect={annotationSelectedEvent} annotationUnSelect={annotationUnSelectedEvent} annotationMove={onAnnotationMoved} annotationRemove={annotationUnSelectedEvent} annotationResize={onAnnotationResized} style={{ 'height': '640px' }}>
                    <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]} />
                </PdfViewerComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the creation of various types of annotations in the PDF viewer, including text markup, shapes, measurements, free text, stamps, handwritten signatures, ink, and sticky notes. Additionally, we can customize existing annotations or add new annotations programmatically in the PDF viewer using the provided options.</p>
            </div>

            <div className="col-lg-3 e-pv-property-section-pdfviewer e-pv-main-panel">
                <div className="property-panel-header e-pv-header-panel">
                    Properties
                    <button id="e-pv-refresh-button-icon" className="e-btn e-bigger e-lib e-flat e-icon-btn" onClick={Reset}>
                        <span className="e-icons e-refresh e-btn-icon"></span>
                    </button>
                </div>
                <div className="e-pv-property-panel-content">
                    <div className="e-pv-pdfviewer-text-content"><span>Annotation Type</span></div>
                    <div className="e-pv-input-item">
                        <DropDownListComponent
                            dataSource={annotationsList}
                            value={annotationType}
                            change={(e) => onAnnotationChange(e as unknown as ChangeEventArgs)}
                            fields={annotationListFields}
                            enabled={showAnnotationListField}
                        />
                    </div>
                    <div className="e-pv-annot-inner-container" id='e-pv-stampAnnotation' hidden={!showStampType}>
                        <div className="e-pv-pdfviewer-input-title"><span>Stamp Type</span></div>
                        <div className="e-pv-input-item">
                            <DropDownListComponent
                                dataSource={stampTypeDataList}
                                fields={stampTypeDatafields}
                                value={stampType}
                                change={(e) => {onStampTypeChange(e); onPropertiesValueChanges('stampType', e)}}
                            />
                        </div>
                        <div className="e-pv-pdfviewer-input-title"><span>Comments</span></div>
                        <div className="e-pv-input-item">
                            <DropDownListComponent
                                dataSource={currentCommentsList}
                                fields={stampCommentsTypeDatafields}
                                value={stampComment}
                                change={(e) => {onPropertiesValueChanges('stampComment', e)}}
                            />
                        </div>
                    </div>
                    <div className="e-pv-pdfviewer-input-title" id='e-pv-customStamp' hidden={!showFileUploader}>
                        <UploaderComponent ref={(scope) => { dropImageElement; uploaderObj = scope; }}
                            className='pdfViewer-ejs-uploader'
                            asyncSettings={pdfviewerApiPath}
                            dropArea={dropImageElement}
                            removing={onFileRemove}
                            success={onFileSuccess}
                            template={uploaderTemplate}
                            multiple={false}
                        />
                    </div>
                    <div className="e-pv-pdfviewer-input-title"><span>Page Number</span></div>
                    <div className="e-pv-input-item">
                        <NumericTextBoxComponent
                            format="n0"
                            value={pageNumber}
                            change={(e) => onPropertiesValueChanges('pageNumber', e)}
                            min={1}
                            max={pageCount}
                            enabled={showPageNumberField}
                        />
                    </div>
                    <div className="e-pv-pdfviewer-input-title"><span>Settings:</span></div>
                    <div className="e-pv-annot-inner-container" style={{ padding: '0 0 12px 0' }}>
                        <table className="e-pv-annot-inner-table">
                            <tbody>
                                <tr hidden={!showXYRow}>
                                    <td>
                                        <div>
                                            <div className="e-pv-pdfviewer-text-content">
                                                <span>X Position</span>
                                                <div className="e-pv-input-item">
                                                    <NumericTextBoxComponent
                                                        value={x}
                                                        min={0}
                                                        format='###.##'
                                                        showSpinButton={false}
                                                        change={(e) => {onPropertiesValueChanges('x', e)}}
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
                                                        value={y}
                                                        min={0}
                                                        format='###.##'
                                                        showSpinButton={false}
                                                        change={(e) => onPropertiesValueChanges('y', e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr hidden={!showHeightWidthRow}>
                                    <td>
                                        <div>
                                            <div className="e-pv-pdfviewer-text-content">
                                                <span>Width</span>
                                                <div className="e-pv-input-item">
                                                    <NumericTextBoxComponent
                                                        value={width}
                                                        min={0}
                                                        format='###.##'
                                                        showSpinButton={false}
                                                        change={(e) => onPropertiesValueChanges('width', e)}
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
                                                        value={height}
                                                        min={0}
                                                        format='###.##'
                                                        showSpinButton={false}
                                                        change={(e) => onPropertiesValueChanges('height', e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr hidden={!showX1Y1Row}>
                                    <td>
                                        <div>
                                            <div className="e-pv-pdfviewer-text-content">
                                                <span>X1 Position</span>
                                                <div className="e-pv-input-item">
                                                    <NumericTextBoxComponent
                                                        value={x1}
                                                        min={0}
                                                        format='###.##'
                                                        showSpinButton={false}
                                                        change={(e) => onPropertiesValueChanges('vertexX1', e)}
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
                                                        value={y1}
                                                        min={0}
                                                        format='###.##'
                                                        showSpinButton={false}
                                                        change={(e) => onPropertiesValueChanges('vertexY1', e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr hidden={!showX2Y2Row}>
                                    <td>
                                        <div>
                                            <div className="e-pv-pdfviewer-text-content">
                                                <span>X2 Position</span>
                                                <div className="e-pv-input-item">
                                                    <NumericTextBoxComponent
                                                        value={x2}
                                                        min={0}
                                                        format='###.##'
                                                        showSpinButton={false}
                                                        change={(e) => onPropertiesValueChanges('vertexX2', e)}
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
                                                        value={y2}
                                                        min={0}
                                                        format='###.##'
                                                        showSpinButton={false}
                                                        change={(e) => onPropertiesValueChanges('vertexY2', e)}
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
                                                        value={opacity}
                                                        format='n0'
                                                        showSpinButton={false}
                                                        min={0}
                                                        max={100}
                                                        change={(e) => onPropertiesValueChanges('opacity', e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td hidden={!showFillColor}>
                                        <div>
                                            <div className="e-pv-pdfviewer-text-content">
                                                <span>Fill Color</span>
                                                <div className="e-pv-input-item">
                                                    <ColorPickerComponent
                                                        value={fillColor ?? "#FFFFFF00"}
                                                        change={(e) => onPropertiesValueChanges('fillColor', e)}
                                                        mode="Palette"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr hidden={!showStrokeProperties}>
                                    <td>
                                        <div>
                                            <div className="e-pv-pdfviewer-text-content">
                                                <span>Stroke Thickness</span>
                                                <div className="e-pv-input-item">
                                                    <NumericTextBoxComponent
                                                        value={strokeThickness}
                                                        format='n0'
                                                        showSpinButton={false}
                                                        min={0}
                                                        max={12}
                                                        change={(e) => onPropertiesValueChanges('thickness', e)}
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
                                                        value={strokeColor}
                                                        change={(e) => onPropertiesValueChanges('strokeColor', e)}
                                                        mode="Palette"
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
                                    {(selectedAnnotation.current.annotationType === "Highlight" || selectedAnnotation.current.annotationType === "Underline" || selectedAnnotation.current.annotationType === "Strikethrough") &&
                                        (bounds && bounds.length > 0) && (bounds.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="e-pv-table-items">
                                                            <div>X{index + 1} = {vertexTableNumberFormat(item.X)}</div>
                                                            <div>Y{index + 1} = {vertexTableNumberFormat(item.Y)}</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="e-pv-table-items">
                                                            <div>W{index + 1} = {vertexTableNumberFormat(item.Width)}</div>
                                                            <div>H{index + 1} = {vertexTableNumberFormat(item.Height)}</div>
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
                                    {(annotationType !== "Line" && annotationType !== "Distance" && vertexPoints && vertexPoints.length > 0) &&
                                    (vertexPoints.map((item: VertexPoint, index) => {
                                        return (
                                            <tr key={item.id}>
                                                {index % 2 === 0 ? (
                                                    <>
                                                        <td>
                                                            <div className="e-pv-table-items">
                                                                <div>X{index + 1} = {vertexTableNumberFormat(item.x)}</div>
                                                                <div>Y{index + 1} = {vertexTableNumberFormat(item.y)}</div>
                                                            </div> 
                                                        </td>
                                                        {index + 1 < vertexPoints.length ? (
                                                            <td>
                                                                <div className="e-pv-table-items">
                                                                    <div>X{index + 2} = {vertexTableNumberFormat(vertexPoints[index + 1].x)}</div>
                                                                    <div>Y{index + 2} = {vertexTableNumberFormat(vertexPoints[index + 1].y)}</div>
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
                        <div id='e-pv-bounds' hidden={!showBoundsButtons}>
                            <div className="e-pv-annot-button-section" style={{ padding: '12px 12px 0 0', border: 0 }}>
                                <ButtonComponent
                                    isPrimary={true}
                                    style={{ textTransform: 'capitalize' }}
                                    disabled={isDeleteBoundsDisabled}
                                    onClick={OnBoundsDelete}
                                >
                                    Delete
                                </ButtonComponent>
                                <ButtonComponent
                                    isPrimary={true}
                                    style={{ textTransform: 'capitalize' }}
                                    onClick={() => {addBounds(); onPropertiesValueChanges("", {isInteracted: true})}}
                                >
                                    Add Bounds
                                </ButtonComponent>
                            </div>
                        </div>
                        <div hidden={!showLineProps} style={{ padding: '0px 12px 12px 12px' }}>
                            <div className="e-pv-pdfviewer-input-title"><span>Line Head Start</span></div>
                            <div className="e-pv-input-item">
                                <DropDownListComponent
                                    dataSource={lineHeadstatusList}
                                    fields={lineHeadstatusfield}
                                    value={lineHeadStartStyle}
                                    change={(e) => onPropertiesValueChanges('lineHeadStartStyle', e)}
                                />
                            </div>
                            <div className="e-pv-pdfviewer-input-title"><span>Line Head End</span></div>
                            <div className="e-pv-input-item">
                                <DropDownListComponent
                                    dataSource={lineHeadstatusList}
                                    fields={lineHeadstatusfield}
                                    value={lineHeadEndStyle}
                                    change={(e) => onPropertiesValueChanges('lineHeadEndStyle', e)}
                                />
                            </div>
                            <div hidden={!showLeaderLength}>
                                <div className="e-pv-pdfviewer-input-title"><span>Leader Length</span></div>
                                <div className="e-pv-input-item">
                                    <NumericTextBoxComponent
                                        value={leaderLength}
                                        format='###.##'
                                        showSpinButton={false}
                                        change={(e) => onPropertiesValueChanges('leaderLength', e)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div id='e-pv-vertex' hidden={!showVertexButtons}>
                            <div className="e-pv-annot-button-section" style={{ padding: '12px 12px 0 0', border: 0 }}>
                                <ButtonComponent
                                    isPrimary={true}
                                    style={{ textTransform: 'capitalize' }}
                                    disabled={isDeleteVertexDisabled}
                                    onClick={onDeleteVertex}
                                >
                                    Delete
                                </ButtonComponent>
                                <ButtonComponent
                                    isPrimary={true}
                                    style={{ textTransform: 'capitalize' }}
                                    onClick={() => {addVertex(); onPropertiesValueChanges("", {isInteracted: true})}}
                                >
                                    Add Vertex
                                </ButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div hidden={!showInkAnnotationType}>
                    <div style={{ padding: '0 0 12px 0' }}>
                        <div className="e-pv-pdfviewer-input-title"><span>Ink Annotation</span></div>
                        <div className="e-pv-input-item">
                            <DropDownListComponent
                                dataSource={inkAnnotationDataList}
                                fields={inkAnnotationfield}
                                value={inkAnnotationType}
                                change={(e) => onPropertiesValueChanges('inkAnnotationType', e)}
                                enabled={!disableInkAnnotField}
                            />
                        </div>
                    </div>
                </div>

                <div hidden={!showFreeTextProps}>
                    <div className="e-pv-pdfviewer-input-title"><span>Text Properties:</span></div>
                    <div className="e-pv-annot-inner-container">
                        <div className="e-pv-pdfviewer-text-content" style={{ marginTop: '0%' }}><span>Default Text</span></div>
                        <div className="e-pv-input-item">
                            <TextBoxComponent
                                value={defaultText}
                                change={(e) => onPropertiesValueChanges('defaultText', e)}
                            />
                        </div>
                        <div className="e-pv-pdfviewer-input-title"><span>Font Family</span></div>
                        <div className="e-pv-input-item">
                            <DropDownListComponent
                                dataSource={freeTextFontFamilyList}
                                fields={freetextFontFamilyFields}
                                value={fontFamily}
                                change={(e) => onPropertiesValueChanges('fontFamily', e)}
                            />
                        </div>
                        <div className="e-pv-pdfviewer-input-title"><span>Alignment</span></div>
                        <div className="e-pv-input-item">
                            <DropDownListComponent
                                dataSource={freeTextAlignmentList}
                                fields={freeTextAlignmentField}
                                value={alignment}
                                change={(e) => onPropertiesValueChanges('alignment', e)}
                            />
                        </div>
                        <div className="e-pv-pdfviewer-input-title"><span>Font Style</span></div>
                        <div className="e-pv-input-item">
                            <DropDownListComponent
                                dataSource={freeTextFontStyleList}
                                fields={freeTextFontStyleFields}
                                value={fontStyle}
                                change={(e) => onPropertiesValueChanges('fontStyle', e)}
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
                                                    value={fontSize}
                                                    format='n0'
                                                    showSpinButton={false}
                                                    change={(e) => onPropertiesValueChanges('fontSize', e)}
                                                />
                                            </div>
                                        </td>
                                        <td style={{ padding: '0' }}>
                                            <div style={{ marginLeft: '12px' }} className="e-pv-text-content">
                                                <span>Font Color</span>
                                                <div className="e-pv-input-item">
                                                    <ColorPickerComponent
                                                        value={fontColor}
                                                        mode="Palette"
                                                        change={(e) => onPropertiesValueChanges('fontColor', e)}
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
                                        checked={printAnnotation} 
                                        change={(e) => {onPrintCheckBoxChange(e as unknown as CheckBoxChangeEventArgs); onPropertiesValueChanges("", {isInteracted: true});}}
                                    />
                                </td>
                                <td className="e-pv-check-box-row"><span>Print Annotation</span></td>
                            </tr>
                            <tr>
                                <td className="e-pv-check-box-row">
                                    <CheckBoxComponent
                                        checked={lockAnnotations}
                                        change={(e) => {onCheckboxChangeIntractionBox(e as unknown as CheckBoxChangeEventArgs); onPropertiesValueChanges("", {isInteracted: true});}}
                                    />
                                </td>
                                <td className="e-pv-check-box-row"><span>Lock Annotation</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div hidden={!lockAnnotations}>
                    <div className="e-pv-pdfviewer-input-title e-pv-pdfviewer-text-content"><span>Allow Interactions</span></div>
                    <div className="e-pv-input-item">
                        <DropDownTreeComponent
                            fields={intractionsListfield}
                            showCheckBox={true}
                            value={allowedInteractions}
                            change={(e) => {onInteractionValueChange(e as unknown as ChangeEventArgs); onPropertiesValueChanges("", {isInteracted: true})}}
                        />
                    </div>
                </div>

                <div className="e-pv-pdfviewer-input-title"><span>Add Comments</span></div>
                <div className="e-pv-pdfviewer-input-title"><span>Author</span></div>
                <div className="e-pv-input-item">
                    <TextBoxComponent
                        placeholder="Enter text"
                        value={author}
                        change={(e) => onPropertiesValueChanges('author', e)}
                    />
                </div>
                <div className="e-pv-pdfviewer-input-title"><span>Content</span></div>
                <div className="e-pv-input-item">
                    <TextBoxComponent
                        value={comment}
                        change={(e) => onPropertiesValueChanges('comment', e)}
                        placeholder='New Comment'
                    />
                </div>
                <div className="e-pv-pdfviewer-input-title"><span>Status</span></div>
                <div className="e-pv-input-item">
                    <DropDownListComponent
                        dataSource={commentStatusList}
                        fields={commentStatusListfields}
                        value={commentState}
                        change={(e) => onPropertiesValueChanges('setState', e)}
                    />
                </div>
                <div className="e-pv-pdfviewer-input-title">
                    <table>
                        <tbody>
                            <tr>
                                <td className="e-pv-check-box-row">
                                    <CheckBoxComponent
                                        checked={isReplyBoxChecked}
                                        change={(e) => {onCheckboxChangeReplyBox(e as unknown as CheckBoxChangeEventArgs); onPropertiesValueChanges("", {isInteracted: true})}}
                                    />
                                </td>
                                <td className="e-pv-check-box-row"><span>Reply</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div hidden={!isReplyBoxChecked}>
                    <div className="pdfviewer-input-title" hidden={replies.length <= 0}>Replies:</div>
                    <div className="e-pv-inner-container e-pv-replies" id="repliesContainer">
                        {replies.map((comment) => (
                            <div className="e-pv-reply-container" id={comment.id} key={comment.id}>
                                <div className="reply-icon e-pv-comment-icon e-pv-icon"></div>
                                <div className="e-pv-reply-main-container">
                                    <div className="reply-text">{`${comment.author ?? "Guest"} - ${comment.modifiedDate}`}</div>
                                    <div className="reply-text">{`${comment.note ?? ""} ${(comment.state && comment.state !== "None") ? comment.state: ""}`}</div>
                                </div>
                                <div className="more-container" style={{width: "min-content"}}>
                                    <button
                                        className="e-control e-btn e-lib e-flat e-icon-btn context-menu-btn"
                                        data-id={comment.id}
                                        onClick={(event) => {
                                            openContextMenu(event as unknown as MouseEvent);
                                        }}
                                        onMouseDown={() => {getCommentID(comment.id)}}
                                        style={{ padding: "5px 4px" }}
                                    >
                                        <span className="e-icons e-more-vertical-1 e-btn-icon"></span>
                                    </button>
                                </div>
                            </div>))
                        }
                    </div>
                    <ContextMenuComponent ref={(scope) => {contextMenu = scope}} items={selectedAnnotation.current.replyMenuItems} select={(event) => {contextMenuItemSelected(event as unknown as MenuEventArgs)}}></ContextMenuComponent>
                </div>

                <div className="e-pv-annot-inner-container" style={{ padding: '10px' }} id='e-pv-replyBox' hidden={!isReplyBoxChecked}>
                    <div className="e-pv-pdfviewer-input-title"><span>Author</span></div>
                    <div className="e-pv-input-item">
                        <TextBoxComponent
                            placeholder="Enter text"
                            value={replyAuthor}
                            change={(e) => onPropertiesValueChanges('replyAuthor', e)}
                        />
                    </div>
                    <div className="e-pv-pdfviewer-input-title"><span>Content</span></div>
                    <div className="e-pv-input-item">
                        <TextBoxComponent
                            value={replyComment}
                            change={(e) => onPropertiesValueChanges('replyComment', e)}
                            placeholder='Reply Comment'
                        />
                    </div>
                    <div className="e-pv-pdfviewer-input-title"><span>Status</span></div>
                    <div className="e-pv-input-item">
                        <DropDownListComponent
                            dataSource={commentStatusList}
                            fields={commentStatusListfields}
                            value={replyState}
                            change={(e) => onPropertiesValueChanges('replyState', e)}
                        />
                    </div>
                    <div className="e-pv-annot-button-section" style={{ padding: '12px 0 0 0', border: 0 }}>
                        <div hidden={isEditing}>
                            <ButtonComponent isPrimary={true} style={{ textTransform: 'capitalize' }} onClick={() => {updateReply(); onPropertiesValueChanges('', {isInteracted: true})}}>Add Reply</ButtonComponent>
                        </div>
                        <div hidden={!isEditing}>
                            <ButtonComponent isPrimary={true} style={{ textTransform: "capitalize" }} onClick={updateEditReply}>Update Reply</ButtonComponent>
                        </div>
                    </div>
                </div>
                <div className="e-pv-property-panel-footer">
                    <div className="e-pv-annot-button-section">
                        <ButtonComponent isPrimary={true} style={{ textTransform: 'capitalize' }} onClick={updateChangesAnnotation} disabled={!showUpdateAnnotButton}>Update</ButtonComponent>
                        <ButtonComponent isPrimary={true} style={{ textTransform: 'capitalize' }} onClick={addNewAnnotation} disabled={!showAddAnnotButton}>Add Annotation</ButtonComponent>
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

    function onFileRemove(args: RemovingEventArgs) {
        args.postRawFile = false;
        previewImage.src = syncfusionLogo;
    }
    async function onFileSuccess(args: SuccessEventArgs) {
        const fileData = args.file.rawFile;
        if (fileData instanceof Blob) {
            selectedAnnotation.current.customStampImageSource = await convertBlobToBase64(fileData);
            previewImage.src = selectedAnnotation.current.customStampImageSource;
        } else {
            console.error('Unexpected file data type:', typeof fileData);
        }
    }
    function convertBlobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
    function contextMenuItemSelected(event: MenuEventArgs) {
        switch (event.item.text) {
            case "Edit":
                onEditButtonClick(currentEditCommentId.current);
                break;
            case "Delete":
                onreplycommentdelete(currentEditCommentId.current);
                break;
        }
    }
    function onAnnotationChange(event: ChangeEventArgs): void {
        selectedAnnotation.current.annotationType = event.value as string;
        setStrokePropsVisibility(false);
        setBoundsButtonsVisibility(false);
        setFillColorVisibility(false);
        setXYRowVisibility(false);
        setX1Y1RowVisibility(false);
        setX2Y2RowVisibility(false);
        setHeightWidthRowVisibility(false);
        setLinePropsVisibility(false);
        setVertexButtonsVisibility(false);
        setFreeTextPropsVisibility(false);
        setLeaderLengthVisibility(false);
        switch (selectedAnnotation.current.annotationType) {
            case 'Highlight':
            case 'Underline':
            case 'Strikethrough':
                {
                    setBoundsButtonsVisibility(true);
                    setFillColorVisibility(true);
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
            case 'Line':
            case 'Arrow':
                {
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    setX1Y1RowVisibility(true);
                    setX2Y2RowVisibility(true);
                    setLinePropsVisibility(true);
                    break;
                }
            case 'Square':
            case 'Rectangle':
            case 'Circle':
            case 'Radius':
                {
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
            case 'Polygon':
            case 'Perimeter':
            case 'Area':
            case 'Volume':
                {
                    setVertexButtonsVisibility(true);
                    setXYRowVisibility(true);
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    break;
                }
            case 'Distance':
                {
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    setX1Y1RowVisibility(true);
                    setX2Y2RowVisibility(true);
                    setLinePropsVisibility(true);
                    setLeaderLengthVisibility(true);
                    break;
                }
            case 'StickyNotes':
                {
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
            case 'Ink':
                {
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
            case 'Stamp':
            case 'stamp':
                {
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
            case 'FreeText':
                {
                    setStrokePropsVisibility(true);
                    setFillColorVisibility(true);
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    setFreeTextPropsVisibility(true);
                    break;
                }
            case 'CustomStamp':
                {
                    setXYRowVisibility(true);
                    setHeightWidthRowVisibility(true);
                    break;
                }
        }
        if (!isNullOrUndefined(event) && event.isInteracted) {
            resetAnnotationProperties();
        }
    }
    function addBounds() {
        setBoundsButtonsVisibility(true);
        let newBound : any = {
            id: generateUniqueId(),
            X: selectedAnnotation.current.x,
            Y: selectedAnnotation.current.y,
            Width: selectedAnnotation.current.width,
            Height: selectedAnnotation.current.height
        };
        if (isNullOrUndefined(selectedAnnotation.current.bounds)) {
            selectedAnnotation.current.bounds = [];
        }
        selectedAnnotation.current.bounds.push(newBound);
        setBounds((prevList) => [...prevList, newBound]);
        if (selectedAnnotation.current.bounds.length > 1) {
            setIsDeleteBoundsDisabled(false);
        }
    }
    function OnBoundsDelete() {
        if (isNullOrUndefined(selectedAnnotation.current.bounds)) {
            selectedAnnotation.current.bounds = [];
        }
        if (selectedAnnotation.current.bounds.length > 1) {
            selectedAnnotation.current.bounds = selectedAnnotation.current.bounds.slice(0, selectedAnnotation.current.bounds.length - 1);
            setUpdateAnnotVisibility(true);
        }
        if (selectedAnnotation.current.bounds.length <= 1) {
            setIsDeleteBoundsDisabled(true);
        }
        if (selectedAnnotation.current.bounds.length < 1) {
            setUpdateAnnotVisibility(false);
        }
        setBounds([...selectedAnnotation.current.bounds]);
    }
    function addVertex() {
        const newVertex = { x: selectedAnnotation.current.x, y: selectedAnnotation.current.y, id: generateUniqueId() };
        if (isNullOrUndefined(selectedAnnotation.current.vertexPoints)) {
            selectedAnnotation.current.vertexPoints = [] as VertexPoint[];
        }
        selectedAnnotation.current.vertexPoints.push(newVertex);
        if (selectedAnnotation.current.vertexPoints.length > 1) {
            setIsDeleteVertexDisabled(false);
        }
        setVertexPoints((prevList) => [...prevList, newVertex] as VertexPoint[]);
    };
    function onInteractionValueChange(event: ChangeEventArgs) {
        if (isNullOrUndefined(selectedAnnotation.current.allowedInteractions) || selectedAnnotation.current.allowedInteractions.length === 0) {
            selectedAnnotation.current.allowedInteractions = ["None"]
            setAllowedInteractions(["None"]);
        }
        else {
            selectedAnnotation.current.allowedInteractions = event.value as any[];
            if (event.value && (event.value as any[]).length === 0) {
                setAllowedInteractions(["None"]);
            }
            else {
                setAllowedInteractions([...event.value as any[]]);
            }
        }
    }
    function onDeleteVertex() {
        if (isNullOrUndefined(selectedAnnotation.current.vertexPoints)) {
            selectedAnnotation.current.vertexPoints = [];
        }
        if (selectedAnnotation.current.vertexPoints.length > 1) {
            selectedAnnotation.current.vertexPoints = selectedAnnotation.current.vertexPoints.slice(0, selectedAnnotation.current.vertexPoints.length - 1);
            setUpdateAnnotVisibility(true);
        }
        if (selectedAnnotation.current.vertexPoints.length <= 1) {
            setIsDeleteVertexDisabled(true);
            setUpdateAnnotVisibility(false);
        }
        setVertexPoints([...selectedAnnotation.current.vertexPoints]);
    }
    function onStampTypeChange(event: ChangeEventArgs) {
        const selectedValue = event.value as string;
        switch (selectedValue) {
            case 'Dynamic': {
                setCurrentCommentsList(dynamicstampCommentsList);
                setStampType("Dynamic");
                setStampComment("Approved");
                onPropertiesValueChanges("stampComment", {isInteracted: true, value: "Approved"});
                break;
            }
            case 'Sign Here': {
                setCurrentCommentsList(sighhereCommentsList);
                setStampType("Sign Here");
                setStampComment("Accepted");
                onPropertiesValueChanges("stampComment", {isInteracted: true, value: "Accepted"});
                break;
            }
            case 'Standard Business': {
                setCurrentCommentsList(StandardBusinessStampsList);
                setStampType("Standard Business");
                setStampComment("Approved");
                onPropertiesValueChanges("stampComment", {isInteracted: true, value: "Approved"});
                break;
            }
            default: {
                setCurrentCommentsList(dynamicstampCommentsList);
                setStampType("Dynamic");
                setStampComment("Approved");
                onPropertiesValueChanges("stampComment", {isInteracted: true, value: "Approved"});
                break;
            }
        }
    }
    function onCheckboxChangeReplyBox(event: CheckBoxChangeEventArgs) {
        setReplyBoxChecked(event.checked);
        if (!(event.checked as boolean)) {
            if (isEditing) {
                setIsEditing(false);
                currentEditCommentId.current = "";
            }
        }
    }
    function onPrintCheckBoxChange(event: CheckBoxChangeEventArgs) {
        setPrintAnnotation(event.checked);
        selectedAnnotation.current.isPrint = event.checked;
    }
    function onCheckboxChangeIntractionBox(event: CheckBoxChangeEventArgs) {
        setLockAnnotations(event.checked);
        selectedAnnotation.current.isLocked = event.checked;
    }
    function onPropertiesValueChanges(property: PropertyType, event: any) {
        if (selectedAnnotation.current.annotationSelected && !showUpdateAnnotButton ) {
            if (!isNullOrUndefined(event.isInteracted) && event.isInteracted) {
                setUpdateAnnotVisibility(true);
            }
            // color picker change event
            else if(!isNullOrUndefined(event.event)) {
                setUpdateAnnotVisibility(true);
            }
            else {
                setUpdateAnnotVisibility(false);
            }
            let shapeAnnotation = selectedAnnotation.current.annotationType;
            if (((property === "x") || (property === "y") || (property === "height") || (property === "width")) && ((shapeAnnotation === "Underline") || (shapeAnnotation === "Strikethrough") || (shapeAnnotation === "Highlight"))) {
                setUpdateAnnotVisibility(false);
            }
            if (((property === "x") || (property === "y")) && ((shapeAnnotation === "Polygon") || (shapeAnnotation === "Area") || (shapeAnnotation === "Perimeter") || (shapeAnnotation === "Volume"))) {
                setUpdateAnnotVisibility(false);
            }
        }
        if(!isNullOrUndefined(event.value)) {
            selectedAnnotation.current[property] = event.value;
        }
        // color picker change event
        else if(!isNullOrUndefined(event.name)) { 
            selectedAnnotation.current[property] = event.name;
        }
        if (event && event.isInteracted && (property === "stampComment" || property === "stampType")) {
            resetAnnotationProperties();
        }
    }
    function addNewAnnotation(): void {
        let currentAnnotationSettings: any;
        currentAnnotationSettings = annotationSettings();
        if (selectedAnnotation.current.annotationType === "Highlight") {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Underline') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Strikethrough') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Line') {
            currentAnnotationSettings.vertexPoints = [{ x: selectedAnnotation.current.vertexX1, y: selectedAnnotation.current.vertexY1 },
                { x: selectedAnnotation.current.vertexX2, y: selectedAnnotation.current.vertexY2 }];
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
            selectedAnnotation.current.vertexPoints = [];
        }
        else if (selectedAnnotation.current.annotationType === 'Arrow') {
            currentAnnotationSettings.vertexPoints= [{ x: selectedAnnotation.current.vertexX1, y: selectedAnnotation.current.vertexY1 },
                { x: selectedAnnotation.current.vertexX2, y: selectedAnnotation.current.vertexY2 }];
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
            selectedAnnotation.current.vertexPoints = [];
        }
        else if (selectedAnnotation.current.annotationType === 'Rectangle') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings)
        }
        else if (selectedAnnotation.current.annotationType === 'Circle') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings)
        }
        else if (selectedAnnotation.current.annotationType === 'Polygon') {
            if (selectedAnnotation.current.vertexPoints.length === 0) {
                selectedAnnotation.current.vertexPoints = addUniqueId([{ x: 100, y: 39 }, { x: 142, y: 10 }, { x: 189, y: 38 }, { x: 178, y: 81 }, { x: 111, y: 81 }, { x: 100, y: 39 }]) as VertexPoint[];
                currentAnnotationSettings = annotationSettings();
            }
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Distance') {
            currentAnnotationSettings.vertexPoints = [{ x: selectedAnnotation.current.vertexX1, y: selectedAnnotation.current.vertexY1 },
                { x: selectedAnnotation.current.vertexX2, y: selectedAnnotation.current.vertexY2 }];
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
            selectedAnnotation.current.vertexPoints = [] as VertexPoint[];
        }
        else if (selectedAnnotation.current.annotationType === 'Perimeter') {
            if (selectedAnnotation.current.vertexPoints.length === 0) {
                selectedAnnotation.current.vertexPoints = addUniqueId([{ x: 100, y: 100 }, { x: 185, y: 100 }, { x: 186, y: 162 }]) as VertexPoint[];
                currentAnnotationSettings = annotationSettings();
            }
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Area') {
            if (selectedAnnotation.current.vertexPoints.length === 0) {
                selectedAnnotation.current.vertexPoints = addUniqueId([{ x: 100, y: 100 }, { x: 188, y: 99 }, { x: 189, y: 153 }, { x: 100, y: 100 }]) as VertexPoint[];
                currentAnnotationSettings = annotationSettings();
            }
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'Radius') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings)
        }
        else if (selectedAnnotation.current.annotationType === 'Volume') {
            if (selectedAnnotation.current.vertexPoints.length === 0) {
                selectedAnnotation.current.vertexPoints = addUniqueId([{ x: 100, y: 100 }, { x: 100, y: 209 }, { x: 220, y: 209 }, { x: 220, y: 99 }, { x: 100, y: 100 }]) as VertexPoint[];
                currentAnnotationSettings = annotationSettings();
            }
            currentAnnotationSettings.offset = currentAnnotationSettings.vertexPoints[0];
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings);
        }
        else if (selectedAnnotation.current.annotationType === 'FreeText') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings)
        }
        else if (selectedAnnotation.current.annotationType === 'Stamp') {
            currentAnnotationSettings.customStamps = null;
            if (selectedAnnotation.current.stampType === 'Dynamic') {
                if (selectedAnnotation.current.dynamicStamps) {
                    const selectedStampItem = selectedAnnotation.current.dynamicStamps.find((stamp: DynamicStampItem) => stamp === selectedAnnotation.current.stampComment);
                    if (selectedStampItem) {
                        viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings, selectedStampItem);
                    }
                }
            }
            else if (selectedAnnotation.current.stampType === "Sign Here") {
                if (selectedAnnotation.current.signStamps) {
                    const selectedStampItem = selectedAnnotation.current.signStamps.find(
                        (stamp: SignStampItem) => stamp === selectedAnnotation.current.stampComment);
                    if (selectedStampItem) {
                        viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings, null, selectedStampItem);
                    }
                }
            }
            else if (selectedAnnotation.current.stampType === "Standard Business") {
                if (selectedAnnotation.current.signStamps) {
                    const selectedStampItem = selectedAnnotation.current.standardBusinessStamps.find((stamp: StandardBusinessStampItem) => stamp === selectedAnnotation.current.stampComment);
                    if (selectedStampItem) {
                        viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings, null, null, selectedStampItem);
                    }
                }
            }
        }
        else if (selectedAnnotation.current.annotationType === 'Ink') {
            if (selectedAnnotation.current.inkAnnotationType === "Syncfusion") {
                selectedAnnotation.current.path = '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]'

            }
            else if (selectedAnnotation.current.inkAnnotationType === "PdfViewer") {
                selectedAnnotation.current.path = `M10,50 L10,65 M10,50 L25,50 L25,57.5 L10,57.5
                M40,50 L40,65 M40,50 L43,50 L55,55 L55,60 L43,65 L40,65
                M80,50 L80,65 M80,50 L95,50 M80,57.5 L95,57.5
                M110,50 L125,65 L140,50
                M160,50 L160,65 M155,50 L165,50 M155,65 L165,65
                M182,50 L182,65 M182,50 L197,50 M182,57.5 L197,57.5 M182,65 L197,65 
                M205,50 L215,65 L225,50 L235,65 L245,50
                M255,50 L255,65 M255,50 L270,50 M255,57.5 L270,57.5 M255,65 L270,65
                M295,50 L295,65 M295,50 L305,50 L305,57.5 L295,57.5 M295,57.5 L305,65`;
            }
            else if (selectedAnnotation.current.inkAnnotationType === "Star") {
                selectedAnnotation.current.path = '[{\"command\":\"M\",\"x\":72,\"y\":200},{\"command\":\"L\",\"x\":79,\"y\":65},{\"command\":\"L\",\"x\":92,\"y\":200},{\"command\":\"L\",\"x\":65,\"y\":110},{\"command\":\"L\",\"x\":95,\"y\":110},{\"command\":\"L\",\"x\":72,\"y\":200}]';
            }
            currentAnnotationSettings = annotationSettings();
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings)
        }
        else if (selectedAnnotation.current.annotationType === 'StickyNotes') {
            viewer.annotation.addAnnotation(selectedAnnotation.current.annotationType, currentAnnotationSettings)
        }
        else if (selectedAnnotation.current.annotationType === 'CustomStamp') {
            viewer.annotation.addAnnotation("Stamp", currentAnnotationSettings);
        }
        let newlyAddedAnnotation = viewer.annotationCollection[viewer.annotationCollection?.length - 1];
        if (newlyAddedAnnotation) {
            updateAnnotationComments(newlyAddedAnnotation);
            viewer.annotation.editAnnotation(newlyAddedAnnotation);           
        }
        selectedAnnotation.current.annotationSelected = false;
        setReplyBoxChecked(false);
        setReplies([]);
    }

    function updateProperties(currentAnnotation: any): void {
        selectedAnnotation.current.pageNumber = currentAnnotation.pageNumber + 1;
        selectedAnnotation.current.fillColor = currentAnnotation.fillColor;
        selectedAnnotation.current.strokeColor = currentAnnotation.strokeColor;
        if (IsRGBAColor(selectedAnnotation.current.fillColor)) {
            selectedAnnotation.current.fillColor = RGBAtoHex(selectedAnnotation.current.fillColor, "fill");
        }
        if (IsRGBAColor(selectedAnnotation.current.strokeColor)) {
            selectedAnnotation.current.strokeColor = RGBAtoHex(selectedAnnotation.current.strokeColor, "stroke");
        }
        if (currentAnnotation.textMarkupAnnotationType === "Highlight" || currentAnnotation.textMarkupAnnotationType === "Underline" || currentAnnotation.textMarkupAnnotationType === "Strikethrough") {
            selectedAnnotation.current.annotationType = currentAnnotation.textMarkupAnnotationType;
        }
        else if (currentAnnotation.shapeAnnotationType === "Square" && currentAnnotation.subject === "Rectangle") {
            selectedAnnotation.current.annotationType = "Rectangle";
        }
        else if (currentAnnotation.shapeAnnotationType === "Line" && currentAnnotation.subject === "Arrow") {
            selectedAnnotation.current.annotationType = "Arrow";
        }
        else if (currentAnnotation.shapeAnnotationType === "sticky") {
            selectedAnnotation.current.annotationType = "StickyNotes";
        }
        else if (currentAnnotation.shapeAnnotationType === "stamp" || currentAnnotation.shapeAnnotationType === "Stamp") {
            if (currentAnnotation.stampAnnotationType) {
                if (currentAnnotation.stampAnnotationType === 'image') {
                    selectedAnnotation.current.annotationType = "CustomStamp";
                }
                else if(currentAnnotation.stampAnnotationType === 'path') {
                    selectedAnnotation.current.annotationType = 'Stamp';
                }
            }
            else {
                selectedAnnotation.current.annotationType = 'Stamp';
            }
        }
        else if (currentAnnotation.shapeAnnotationType === "Ink") {
            selectedAnnotation.current.annotationType = "Ink";
        }
        else if (currentAnnotation.shapeAnnotationType === "Line" || currentAnnotation.shapeAnnotationType === "Polyline" || currentAnnotation.shapeAnnotationType === "Square" || currentAnnotation.shapeAnnotationType === "Circle" || currentAnnotation.shapeAnnotationType === "Polygon" && currentAnnotation.indent) {
            if (currentAnnotation.vertexPoints) {
                selectedAnnotation.current.vertexPoints = addUniqueId([...currentAnnotation.vertexPoints]) as VertexPoint[];
            }
            if (currentAnnotation.indent === "LineDimension") {
                selectedAnnotation.current.annotationType = "Distance";
            }
            else if (currentAnnotation.indent === "PolyLineDimension") {
                selectedAnnotation.current.annotationType = "Perimeter";
            }
            else if (currentAnnotation.indent === "PolyLineDimension" && currentAnnotation.subject === "Arrow") {
                selectedAnnotation.current.annotationType = "Arrow";
            }
            else if (currentAnnotation.indent === "PolygonDimension") {
                selectedAnnotation.current.annotationType = "Area";
            }
            else if (currentAnnotation.indent === "PolygonRadius") {
                selectedAnnotation.current.annotationType = "Radius";
            }
            else if (currentAnnotation.indent === "PolygonVolume") {
                selectedAnnotation.current.annotationType = "Volume";
            }
            else if (currentAnnotation.shapeAnnotationType === "Line" && currentAnnotation.shapeAnnotationType === currentAnnotation.subject) {
                selectedAnnotation.current.annotationType = "Line";
            }
            else if (currentAnnotation.shapeAnnotationType === "Circle" && currentAnnotation.shapeAnnotationType === currentAnnotation.subject){
                selectedAnnotation.current.annotationType = "Circle";
            }
        }
        else {
            selectedAnnotation.current.annotationType = currentAnnotation.shapeAnnotationType;
            if (currentAnnotation.shapeAnnotationType === "Polygon") {
                selectedAnnotation.current.vertexPoints = addUniqueId([...currentAnnotation.vertexPoints]) as VertexPoint[];
            }
        }

        if (currentAnnotation.fillColor) {
            selectedAnnotation.current.fillColor = currentAnnotation.fillColor;
        }
        selectedAnnotation.current.showInkAnnotationType = false;

        if (selectedAnnotation.current.annotationType === "Highlight" || selectedAnnotation.current.annotationType === "Underline" || selectedAnnotation.current.annotationType === "Strikethrough") {
            if (currentAnnotation.bounds[0] && currentAnnotation.bounds[0].X && currentAnnotation.bounds[0].Y && currentAnnotation.bounds[0].Width && currentAnnotation.bounds[0].Height) {
                selectedAnnotation.current.bounds = addUniqueId(currentAnnotation.bounds);
                selectedAnnotation.current.width = currentAnnotation.bounds[0].Width;
                selectedAnnotation.current.height = currentAnnotation.bounds[0].Height;
                selectedAnnotation.current.x = currentAnnotation.bounds[0].X;
                selectedAnnotation.current.y = currentAnnotation.bounds[0].Y;
            }
            else if (currentAnnotation.annotationAddMode && currentAnnotation.annotationAddMode === "UI Drawn Annotation") {
                selectedAnnotation.current.fillColor = currentAnnotation.color;
                let annotBounds = currentAnnotation.bounds;
                selectedAnnotation.current.bounds = [];
                let totalWidth = 0, startX = 0, startY = 0;
                if (annotBounds?.length > 1) {
                    selectedAnnotation.current.x = annotBounds[0].left;
                    selectedAnnotation.current.y = annotBounds[0].top;
                    selectedAnnotation.current.height = annotBounds[0].height;
                    let isFirstBound = true;
                    let left = annotBounds[0].left, top = annotBounds[0].top;
                    startX = annotBounds[0].left, startY = annotBounds[0].top;
                    let width = annotBounds[0].width, height = annotBounds[0].height;
                    annotBounds.forEach((element, index, array) => {
                        left = element.left;
                        width = element.width;
                        height = element.height;
                        if (top !== element.top) {
                            if (isFirstBound) {
                                selectedAnnotation.current.width = totalWidth;
                                isFirstBound = false;
                            }
                            selectedAnnotation.current.bounds.push({
                                id: generateUniqueId(),
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
                        selectedAnnotation.current.bounds.push({
                            id: generateUniqueId(),
                            X: startX,
                            Y: startY,
                            Width: totalWidth,
                            Height: annotBounds[annotBounds.length - 1].height
                        });
                        if (isFirstBound) {
                            selectedAnnotation.current.width = totalWidth;
                            isFirstBound = false;
                        }
                    }
                }
                else {
                    selectedAnnotation.current.bounds = {
                        id: generateUniqueId(),
                        X: currentAnnotation.bounds[0].left,
                        Y: currentAnnotation.bounds[0].top,
                        Height: currentAnnotation.bounds[0].height,
                        Width: currentAnnotation.bounds[0].width
                    } as any;
                    selectedAnnotation.current.width = currentAnnotation.bounds[0].width;
                    selectedAnnotation.current.height = currentAnnotation.bounds[0].height;
                    selectedAnnotation.current.x = currentAnnotation.bounds[0].left;
                    selectedAnnotation.current.y = currentAnnotation.bounds[0].top;
                }
            }
            else {
                selectedAnnotation.current.bounds = addUniqueId(currentAnnotation.bounds);
                selectedAnnotation.current.width = currentAnnotation.bounds[0].Width;
                selectedAnnotation.current.height = currentAnnotation.bounds[0].Height;
                selectedAnnotation.current.x = currentAnnotation.bounds[0].X;
                selectedAnnotation.current.y = currentAnnotation.bounds[0].Y;
            }
            selectedAnnotation.current.fillColor = currentAnnotation.color;
        }
        else if (selectedAnnotation.current.annotationType === "Line" || selectedAnnotation.current.annotationType === "Arrow" || selectedAnnotation.current.annotationType === "Distance") {
            selectedAnnotation.current.vertexX1 = currentAnnotation.vertexPoints[0].x;
            selectedAnnotation.current.vertexY1 = currentAnnotation.vertexPoints[0].y;
            selectedAnnotation.current.vertexX2 = currentAnnotation.vertexPoints[1].x;
            selectedAnnotation.current.vertexY2 = currentAnnotation.vertexPoints[1].y;
            selectedAnnotation.current.vertexPoints = [] as VertexPoint[];
            if (selectedAnnotation.current.annotationType === "Distance") {
                selectedAnnotation.current.leaderLength = currentAnnotation.leaderLength as number;
            }
        }
        else if (selectedAnnotation.current.annotationType === "Ink") {
            selectedAnnotation.current.width = currentAnnotation.bounds.width;
            selectedAnnotation.current.height = currentAnnotation.bounds.height;
            selectedAnnotation.current.x = currentAnnotation.bounds.x;
            selectedAnnotation.current.y = currentAnnotation.bounds.y;
            selectedAnnotation.current.showInkAnnotationType = true;
        }
        else if (selectedAnnotation.current.annotationType === "FreeText") {
            selectedAnnotation.current.width = currentAnnotation.bounds.width;
            selectedAnnotation.current.height = currentAnnotation.bounds.height;
            selectedAnnotation.current.x = currentAnnotation.bounds.left;
            selectedAnnotation.current.y = currentAnnotation.bounds.top;
            selectedAnnotation.current.defaultText = currentAnnotation.dynamicText;
            selectedAnnotation.current.fontFamily = currentAnnotation.fontFamily;
            selectedAnnotation.current.alignment = currentAnnotation.textAlign;
            selectedAnnotation.current.fontSize = currentAnnotation.fontSize;
            selectedAnnotation.current.fontColor = currentAnnotation.fontColor;
            if (currentAnnotation.font) {
                if (currentAnnotation.font.isBold) {
                    selectedAnnotation.current.fontStyle = "Bold";
                }
                else if (currentAnnotation.font.isItalic) {
                    selectedAnnotation.current.fontStyle = "Italic";    
                }
                else if (currentAnnotation.font.isUnderline) {
                    selectedAnnotation.current.fontStyle = "Underline";
                }
                else if (currentAnnotation.font.isStrikeout) {
                    selectedAnnotation.current.fontStyle = "Strikethrough";
                }
                else {
                    selectedAnnotation.current.fontStyle = "None";
                }
            }
            else {
                selectedAnnotation.current.fontStyle = "None";
            }
        }
        else {
            selectedAnnotation.current.width = currentAnnotation.bounds.width;
            selectedAnnotation.current.height = currentAnnotation.bounds.height;
            selectedAnnotation.current.x = currentAnnotation.bounds.left;
            selectedAnnotation.current.y = currentAnnotation.bounds.top;
        }
        if (selectedAnnotation.current.annotationType === "Polygon" || selectedAnnotation.current.annotationType === "Perimeter" ||
            selectedAnnotation.current.annotationType === "Area" || selectedAnnotation.current.annotationType === "Volume") {
            selectedAnnotation.current.vertexPoints = addUniqueId([...currentAnnotation.vertexPoints]) as VertexPoint[];
        }
        if (currentAnnotation.lineHeadStartStyle && currentAnnotation.lineHeadEndStyle) {
            selectedAnnotation.current.lineHeadStartStyle = currentAnnotation.lineHeadStartStyle;
            selectedAnnotation.current.lineHeadEndStyle = currentAnnotation.lineHeadEndStyle;
        }
        else if (currentAnnotation.lineHeadStart && currentAnnotation.lineHeadEnd) {
            selectedAnnotation.current.lineHeadStartStyle = viewer.annotation.getArrowType(currentAnnotation.lineHeadStart) as string;
            selectedAnnotation.current.lineHeadEndStyle = viewer.annotation.getArrowType(currentAnnotation.lineHeadEnd) as string;
        }
        else {
            if (selectedAnnotation.current.annotationType === "Line") {
                selectedAnnotation.current.lineHeadStartStyle = "None";
                selectedAnnotation.current.lineHeadEndStyle = "None";
            }
            else {
                selectedAnnotation.current.lineHeadStartStyle = "Arrow";
                selectedAnnotation.current.lineHeadEndStyle = "Arrow";
            }
        }
        if (currentAnnotation.isPrint) {
            selectedAnnotation.current.isPrint = true;
        }
        else {
            selectedAnnotation.current.isPrint = false;
        }
        selectedAnnotation.current.isLocked = currentAnnotation.isLocked as boolean;
        if (selectedAnnotation.current.isLocked) {
            selectedAnnotation.current.allowedInteractions = currentAnnotation.allowedInteractions;
        }
        else {
            selectedAnnotation.current.allowedInteractions = ["None"];
        }
        selectedAnnotation.current.opacity = ( (currentAnnotation.opacity as number) >= 100 ) ? 100 : ((currentAnnotation.opacity as number) * 100);
        selectedAnnotation.current.thickness = currentAnnotation.thickness;
        selectedAnnotation.current.strokeColor = currentAnnotation.strokeColor;
        if (currentAnnotation.note) {
            selectedAnnotation.current.comment = currentAnnotation.note;
        }
        else if (currentAnnotation.notes) {
            selectedAnnotation.current.comment = currentAnnotation.notes;
        }
        else {
            selectedAnnotation.current.comment = "";
        }
        selectedAnnotation.current.author = currentAnnotation.author;
        selectedAnnotation.current.modifiedDate = currentAnnotation.modifiedDate;
        selectedAnnotation.current.setState = currentAnnotation.state;
        selectedAnnotation.current.showStampType = false;
        selectedAnnotation.current.disableInkAnnotField = true;
        selectedAnnotation.current.showFileUploader = false;

        selectedAnnotation.current.replies = [] as Comment[];
        if (selectedAnnotation.current.replies.length === 0 && currentAnnotation.comments) {
            if (currentAnnotation.comments.length > 0) {
                currentAnnotation.comments.forEach(element => {
                    let reply = new Comment();
                    reply.id = element.annotName;
                    reply.author = element.author;
                    reply.note = element.note;
                    reply.modifiedDate = element.modifiedDate;
                    reply.state = element.state;
                    selectedAnnotation.current.replies.push(reply);
                });
            }
        }
        if (selectedAnnotation.current.replies.length === 0 && currentAnnotation.replyComment) {
            if (currentAnnotation.replyComment.length > 0) {
                currentAnnotation.replyComment.forEach(element => {
                    let reply = new Comment();
                    reply.id = generateUniqueId();
                    reply.author = selectedAnnotation.current.replyAuthor;
                    reply.note = element;
                    reply.modifiedDate = new Date().toDateString();
                    reply.state = 'None';
                    selectedAnnotation.current.replies.push(reply);
                });
            }
        }

        setAnnotationFieldVisibility(false);
        setPageNumberVisibility(false);
        updatePropertiesInUI();
    }
    function addUniqueId(array: unknown[]) : any[] {
        if (array) {
            array.forEach((value: any) => {
                value.id = generateUniqueId();
            });
        }
        else {
            array = [];
        }
        return array;
    }
    function getAnnotationByID(annotationID: string) : any {
        if (viewer && viewer.annotationCollection) {
            for (let index = 0; index < viewer.annotationCollection.length; index++) {
                if (viewer.annotationCollection[index].annotationId === annotationID) {
                    return viewer.annotationCollection[index];
                }
            }
        }
        return null;
    }
    function onAnnotationMoved(annotationMoveEventArgs: AnnotationMoveEventArgs) : void {
        selectedAnnotation.current.annotationSelected = true;
        currentUpdateAnnotIdRef.current = annotationMoveEventArgs.annotationId;
        let currentAnnotation : any = getAnnotationByID(currentUpdateAnnotIdRef.current);
        if (!isNullOrUndefined(currentAnnotation)) {
            currentAnnotation.bounds = annotationMoveEventArgs.currentPosition;
            updateProperties(currentAnnotation);
        }
    }
    function onAnnotationResized(annotationResizeEventArgs: AnnotationResizeEventArgs) : void {
        selectedAnnotation.current.annotationSelected = true;
        currentUpdateAnnotIdRef.current = annotationResizeEventArgs.annotationId;
        let currentAnnotation : any = getAnnotationByID(currentUpdateAnnotIdRef.current);
        if (!isNullOrUndefined(currentAnnotation)) {
            currentAnnotation.bounds = annotationResizeEventArgs.annotationBound;
            updateProperties(currentAnnotation);
        }
    }
    function updatePropertiesInUI() {
        setAnnotationType(selectedAnnotation.current.annotationType);
        setPageNumber((selectedAnnotation.current.pageNumber) as number);
        setWidth(selectedAnnotation.current.width);
        setHeight(selectedAnnotation.current.height);
        setX(selectedAnnotation.current.x);
        setY(selectedAnnotation.current.y);
        setX1(selectedAnnotation.current.vertexX1);
        setY1(selectedAnnotation.current.vertexY1);
        setX2(selectedAnnotation.current.vertexX2);
        setY2(selectedAnnotation.current.vertexY2);
        setOpacity(selectedAnnotation.current.opacity);
        if (IsRGBAColor(selectedAnnotation.current.fillColor)) {
            selectedAnnotation.current.fillColor = RGBAtoHex(selectedAnnotation.current.fillColor, "fill");
        }
        setFillColor(selectedAnnotation.current.fillColor);
        if (IsRGBAColor(selectedAnnotation.current.strokeColor)) {
            selectedAnnotation.current.strokeColor = RGBAtoHex(selectedAnnotation.current.strokeColor, "stroke");
        }
        setStrokeColor(selectedAnnotation.current.strokeColor);
        setStrokeThickness(selectedAnnotation.current.thickness);
        setLineHeadStartStyle(selectedAnnotation.current.lineHeadStartStyle);
        setLineHeadEndStyle(selectedAnnotation.current.lineHeadEndStyle);
        setLeaderLength(selectedAnnotation.current.leaderLength);
        setInkAnnotationType(selectedAnnotation.current.inkAnnotationType);
        setInkAnnotationTypeVisibility(selectedAnnotation.current.showInkAnnotationType);
        setDisableInkAnnotField(selectedAnnotation.current.disableInkAnnotField);
        setDefaultText(selectedAnnotation.current.defaultText);
        setFontFamily(selectedAnnotation.current.fontFamily);
        setAlignment(selectedAnnotation.current.alignment);
        setFontSize(selectedAnnotation.current.fontSize);
        setFontColor(selectedAnnotation.current.fontColor);
        setFontStyle(selectedAnnotation.current.fontStyle);
        setAuthor(selectedAnnotation.current.author);
        setComment(selectedAnnotation.current.comment);
        setCommentState(selectedAnnotation.current.setState);
        setReplyAuthor(selectedAnnotation.current.replyAuthor);
        setReplyComment(selectedAnnotation.current.replyComment);
        setReplyState(selectedAnnotation.current.replyState);
        setPrintAnnotation(selectedAnnotation.current.isPrint);
        setStampTypeVisibility(selectedAnnotation.current.showStampType);
        setFileUploaderVisibility(selectedAnnotation.current.showFileUploader);
        if (!isNullOrUndefined(selectedAnnotation.current.vertexPoints)) {
            setVertexPoints([...selectedAnnotation.current.vertexPoints] as VertexPoint[]);
        }
        else {
            setVertexPoints([] as VertexPoint[]);
        }
        if (!isNullOrUndefined(selectedAnnotation.current.bounds)) {
            setBounds([...selectedAnnotation.current.bounds]);
        }
        else {
            setBounds([] as any[]);
        }
        if (!isNullOrUndefined(selectedAnnotation.current.bounds) && selectedAnnotation.current.bounds.length > 1) {
            setIsDeleteBoundsDisabled(false);
        }
        if (!isNullOrUndefined(selectedAnnotation.current.vertexPoints) && selectedAnnotation.current.vertexPoints.length > 1) {
            setIsDeleteVertexDisabled(false);
        }
        if (selectedAnnotation.current.isLocked) {
            setLockAnnotations(true);
            if (isNullOrUndefined(selectedAnnotation.current.allowedInteractions) || (selectedAnnotation.current.allowedInteractions.length === 0)) {
                setAllowedInteractions(["None"]);
            }
            else {
                setAllowedInteractions([...selectedAnnotation.current.allowedInteractions as string[]]);
            }
        }
        else {
            setLockAnnotations(false);
            setAllowedInteractions(["None"]);
        }
        if (!isNullOrUndefined(selectedAnnotation.current.replies) && (selectedAnnotation.current.replies.length > 0)) {
            setReplyBoxChecked(true);
            setReplies([...selectedAnnotation.current.replies] as Comment[]);
        }
        else {
            setReplyBoxChecked(false);
            setReplies([] as Comment[]);
        }
    }
    function resetAnnotationProperties() {
        let shapeAnnotation: string = selectedAnnotation.current.annotationType;
        selectedAnnotation.current.x = 100;
        selectedAnnotation.current.y = 100;
        selectedAnnotation.current.fillColor = "#FFFFFF00";
        selectedAnnotation.current.strokeColor = "#FF0000FF";
        selectedAnnotation.current.showStampType = false;
        selectedAnnotation.current.showInkAnnotationType = false;
        selectedAnnotation.current.showFileUploader = false;
        // reset arrow head styles
        if (shapeAnnotation == "Arrow" || shapeAnnotation == "Distance") {
            selectedAnnotation.current.lineHeadStartStyle = "Arrow";
            selectedAnnotation.current.lineHeadEndStyle = "Arrow";
        }
        else if (shapeAnnotation == "Perimeter") {
            selectedAnnotation.current.lineHeadStartStyle = "OpenArrow";
            selectedAnnotation.current.lineHeadEndStyle = "OpenArrow";
        }
        else {
            selectedAnnotation.current.lineHeadEndStyle = "None";
            selectedAnnotation.current.lineHeadStartStyle = "None";
        }
        // reset height and width
        if (shapeAnnotation == "Rectangle" || shapeAnnotation == "Square" || shapeAnnotation == "Circle" || shapeAnnotation == "Radius") {
            selectedAnnotation.current.width = 100;
            selectedAnnotation.current.height = 100;
        }
        else if (shapeAnnotation == "Ink") {
            selectedAnnotation.current.width = 150;
            selectedAnnotation.current.height = 60;
            selectedAnnotation.current.showInkAnnotationType = true;
            selectedAnnotation.current.disableInkAnnotField = selectedAnnotation.current.annotationSelected;
        }
        else if (shapeAnnotation == "FreeText") {
            selectedAnnotation.current.width = 150;
            selectedAnnotation.current.height = 26.5;
            selectedAnnotation.current.fontFamily = "Helvetica";
            selectedAnnotation.current.fontStyle = "None";
            selectedAnnotation.current.alignment = "Left";
            selectedAnnotation.current.defaultText = "Free Text";
            selectedAnnotation.current.fontSize = 16;
            selectedAnnotation.current.fontColor = "#000000FF";
        }
        else if (shapeAnnotation == "StickyNotes") {
            selectedAnnotation.current.width = 30;
            selectedAnnotation.current.height = 30;
        }
        else if (shapeAnnotation == "Stamp") {
            if (selectedAnnotation.current.stampType === "Dynamic") {
                selectedAnnotation.current.width = 140;
                selectedAnnotation.current.height = 55;
            }
            else if (selectedAnnotation.current.stampType === "Sign Here") {
                switch (selectedAnnotation.current.stampComment) {
                    case "SignHere" : {
                        selectedAnnotation.current.width = 110;
                        selectedAnnotation.current.height = 30;
                        break;
                    }
                    case "Witness" : {
                        selectedAnnotation.current.width = 130;
                        selectedAnnotation.current.height = 30;
                        break;
                    }
                    case "InitialHere" : {
                        selectedAnnotation.current.width = 90;
                        selectedAnnotation.current.height = 30;
                        break;
                    }
                    case "Accepted" :
                    case "Rejected" : {
                        selectedAnnotation.current.width = 35;
                        selectedAnnotation.current.height = 35;
                        break;
                    }
                }
            }
            else if (selectedAnnotation.current.stampType === "Standard Business") {
                selectedAnnotation.current.height = 30;
                switch (selectedAnnotation.current.stampComment) {
                    case "Final" :
                    case "Draft" : {
                        selectedAnnotation.current.width = 110;
                        break;
                    }
                    case "Void" : {
                        selectedAnnotation.current.width = 100;
                        break;
                    }
                    default : {
                        selectedAnnotation.current.width = 130;
                        break;
                    }
                } 
            }
            selectedAnnotation.current.showStampType = !selectedAnnotation.current.annotationSelected;
        }
        else if (shapeAnnotation == "CustomStamp") {
            selectedAnnotation.current.width = 100;
            selectedAnnotation.current.height = 100;
            selectedAnnotation.current.showFileUploader = !selectedAnnotation.current.annotationSelected;
        }
        else if ((shapeAnnotation == "Highlight") || (shapeAnnotation == "Underline") || (shapeAnnotation == "Strikethrough")) {
            selectedAnnotation.current.width = 100;
            selectedAnnotation.current.height = 14;
        }
        else {
            selectedAnnotation.current.width = 0;
            selectedAnnotation.current.height = 0;
        }
        if (shapeAnnotation === "Distance") {
            selectedAnnotation.current.leaderLength = 0;
        }
        
        if ((shapeAnnotation == "Highlight") || (shapeAnnotation == "Underline") || (shapeAnnotation == "Strikethrough") || shapeAnnotation == "FreeText") {
            selectedAnnotation.current.x = 10;
            selectedAnnotation.current.y = 10;
            if (selectedAnnotation.current.annotationType === 'Highlight') {
                selectedAnnotation.current.fillColor = "#FFDF56FF";
            }
            else if (selectedAnnotation.current.annotationType === 'Underline') {
                selectedAnnotation.current.fillColor = "#00FF00FF";
            }
            else if (selectedAnnotation.current.annotationType === 'Strikethrough') {
                selectedAnnotation.current.fillColor = "#FF0000FF";
            }
            else {
                selectedAnnotation.current.fillColor = "#FFFFFF00";
            }
            selectedAnnotation.current.strokeColor = "#FFFFFF00";
        }
        if ((shapeAnnotation === "Polygon") || (shapeAnnotation === "Perimeter") || (shapeAnnotation === "Area") || (shapeAnnotation === "Volume") ) {
            selectedAnnotation.current.x = 10;
            selectedAnnotation.current.y = 10;
        }
        selectedAnnotation.current.opacity = 100;
        selectedAnnotation.current.thickness = 1;
        selectedAnnotation.current.author = "Guest";
        selectedAnnotation.current.comment = "";
        selectedAnnotation.current.setState = "None";
        selectedAnnotation.current.replyAuthor = "Guest";
        selectedAnnotation.current.replyComment = "";
        selectedAnnotation.current.replyState = "None";
        selectedAnnotation.current.vertexX1 = 100;
        selectedAnnotation.current.vertexX2 = 200;
        selectedAnnotation.current.vertexY1 = 100;
        selectedAnnotation.current.vertexY2 = 100;
        selectedAnnotation.current.vertexPoints = [] as VertexPoint[];
        selectedAnnotation.current.bounds = [];
        selectedAnnotation.current.replies = [] as Comment[];
        selectedAnnotation.current.isLocked = false;
        selectedAnnotation.current.isPrint = true;
        selectedAnnotation.current.allowedInteractions = ["None"];
        uploaderObj.clearAll();
        updatePropertiesInUI();
    }
    function updateChangesAnnotation(): void {
        setUpdateAnnotVisibility(false);
        let annotationToUpdate = getAnnotationByID(currentUpdateAnnotIdRef.current);
        if (annotationToUpdate) {
            let updatedValues = annotationUpdate(annotationToUpdate);
            viewer.annotation.editAnnotation(updatedValues);
        }
    }
    function RGBAtoHex(rgba: string, type: "stroke" | "fill"): string {
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
    function IsRGBAColor(input: string | null): boolean {
        const rgbaPattern = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)$/;
        if (input !== null) {
            return rgbaPattern.test(input);
        }
        return false;
    };
    function updateReply() {
        let currentReplyComment = new Comment();
        currentReplyComment.id = generateUniqueId();
        currentReplyComment.author = selectedAnnotation.current.replyAuthor;
        currentReplyComment.note = selectedAnnotation.current.replyComment;
        currentReplyComment.modifiedDate = new Date().toDateString();
        currentReplyComment.state = selectedAnnotation.current.replyState;
        if (isNullOrUndefined(selectedAnnotation.current.replies)) {
            selectedAnnotation.current.replies = [] as Comment[];
        }
        selectedAnnotation.current.replies.push(currentReplyComment);
        setReplies((prevList) => [...prevList, currentReplyComment] as Comment[]);
        selectedAnnotation.current.replyAuthor = "Guest";
        setReplyAuthor("Guest");
        selectedAnnotation.current.replyComment = "";
        setReplyComment("");
        selectedAnnotation.current.replyState = "None";
        setReplyState("None");
    }
    function generateUniqueId() : string {
        return uuidv4();
    }
    function getCommentID(commentId: string) {
        currentEditCommentId.current = commentId;
    }
    function onEditButtonClick(commentId: string) {
        setIsEditing(true);
        const comment = selectedAnnotation.current.replies.find(
            (comment: Comment) => comment.id === commentId
        );
        if (comment) {
            selectedAnnotation.current.replyAuthor = comment.author;
            selectedAnnotation.current.replyComment = comment.note;
            selectedAnnotation.current.replyState = comment.state;
        }
        setReplyAuthor(selectedAnnotation.current.replyAuthor);
        setReplyComment(selectedAnnotation.current.replyComment);
        setReplyState(selectedAnnotation.current.replyState);
    }
    function onreplycommentdelete(commentId: string) {
        const commentIndex = selectedAnnotation.current.replies.findIndex(
            (comment) => comment.id === commentId
        );
        if (commentIndex !== -1) {
            selectedAnnotation.current.replies.splice(commentIndex, 1);
        }
        setReplies([...selectedAnnotation.current.replies]);
    }
    function updateEditReply() {
        let currentReplyComment: Comment;
        if (isEditing && currentEditCommentId.current) {
            let replyIndex: number;
            replyIndex = selectedAnnotation.current.replies.findIndex(
                (comment) => comment.id === currentEditCommentId.current
            );
            if (replyIndex !== -1) {
                currentReplyComment = selectedAnnotation.current.replies[replyIndex] as Comment;
            }
            if (currentReplyComment) {
                currentReplyComment.author = selectedAnnotation.current.replyAuthor;
                currentReplyComment.note = selectedAnnotation.current.replyComment;
                currentReplyComment.state = selectedAnnotation.current.replyState;
                currentReplyComment.modifiedDate = new Date().toDateString();
            } else {
                console.error(
                    `Comment with ID ${currentEditCommentId.current} not found.`
                );
            }
            setIsEditing(false);
            setReplies([...selectedAnnotation.current.replies]);
            currentEditCommentId.current = "";
        }
    }
    function openContextMenu(event: MouseEvent) {
        contextMenu.open(event.clientY, event.clientX);
    };
    function annotationUpdate(annotation : any) : any {
        let currentAnnotation : any = annotation;
        currentAnnotation.opacity = selectedAnnotation.current.opacity / 100;
        currentAnnotation.fillColor = selectedAnnotation.current.fillColor;
        currentAnnotation.thickness = selectedAnnotation.current.thickness;
        currentAnnotation.strokeColor = selectedAnnotation.current.strokeColor;
        currentAnnotation.color = "";
        if (selectedAnnotation.current.annotationType === "Highlight" || selectedAnnotation.current.annotationType === "Underline" || selectedAnnotation.current.annotationType === "Strikethrough") {
            currentAnnotation.bounds = [];
            currentAnnotation.color = selectedAnnotation.current.fillColor;
            if (selectedAnnotation.current.bounds?.length == 0) {
                currentAnnotation.bounds.push({
                    id: generateUniqueId(),
                    X: selectedAnnotation.current.x,
                    Y: selectedAnnotation.current.y,
                    Height: selectedAnnotation.current.height,
                    Width: selectedAnnotation.current.width,
                    Top: selectedAnnotation.current.y,
                    Left: selectedAnnotation.current.x
                });
            }
            else if (selectedAnnotation.current.bounds.length >= 1) {
                selectedAnnotation.current.bounds.forEach((value, index: number, array) => {
                    currentAnnotation.bounds.push({
                        id: generateUniqueId(),
                        X: selectedAnnotation.current.bounds[index].X,
                        Y: selectedAnnotation.current.bounds[index].Y,
                        Height: selectedAnnotation.current.bounds[index].Height,
                        Width: selectedAnnotation.current.bounds[index].Width,
                        Top: selectedAnnotation.current.bounds[index].Y,
                        Left: selectedAnnotation.current.bounds[index].X
                    });
                })
            }
        }
        else if (selectedAnnotation.current.annotationType === "Ink") {
            currentAnnotation.bounds.width = selectedAnnotation.current.width;
            currentAnnotation.bounds.height = selectedAnnotation.current.height;
            currentAnnotation.bounds.x = selectedAnnotation.current.x;
            currentAnnotation.bounds.y = selectedAnnotation.current.y;
        }
        else if (selectedAnnotation.current.annotationType === "Line" || selectedAnnotation.current.annotationType === "Arrow" || selectedAnnotation.current.annotationType === "Distance" ) {
            currentAnnotation.vertexPoints[0] = {x: selectedAnnotation.current.vertexX1, y: selectedAnnotation.current.vertexY1};
            currentAnnotation.vertexPoints[1] = {x: selectedAnnotation.current.vertexX2, y: selectedAnnotation.current.vertexY2};
            
            currentAnnotation.lineHeadStartStyle = selectedAnnotation.current.lineHeadStartStyle as DecoratorShapes;
            currentAnnotation.lineHeadEndStyle = selectedAnnotation.current.lineHeadEndStyle as DecoratorShapes;
            currentAnnotation.offset = { x: currentAnnotation.vertexPoints[0].x, y: currentAnnotation.vertexPoints[0].y };
            if (selectedAnnotation.current.annotationType === "Line") {
                currentAnnotation.subType = 'Line';
            }
            else if (selectedAnnotation.current.annotationType === "Arrow") {
                currentAnnotation.subType = 'Arrow';
            }
            else if (selectedAnnotation.current.annotationType === "Distance") {
                currentAnnotation.subType = "Distance";
            }
        }
        else if (selectedAnnotation.current.annotationType === "Polygon" || selectedAnnotation.current.annotationType === "Perimeter" || selectedAnnotation.current.annotationType === "Area" || selectedAnnotation.current.annotationType === "Volume") {
            currentAnnotation.vertexPoints = selectedAnnotation.current.vertexPoints;
            currentAnnotation.bounds.width = selectedAnnotation.current.width;
            currentAnnotation.bounds.height = selectedAnnotation.current.height;
            currentAnnotation.bounds.left = selectedAnnotation.current.x;
            currentAnnotation.bounds.top = selectedAnnotation.current.y;
        }
        else if (selectedAnnotation.current.annotationType === "FreeText") {
            currentAnnotation.bounds.width = selectedAnnotation.current.width;
            currentAnnotation.bounds.height = selectedAnnotation.current.height;
            currentAnnotation.bounds.left = selectedAnnotation.current.x;
            currentAnnotation.bounds.top = selectedAnnotation.current.y;
            currentAnnotation.bounds.x = selectedAnnotation.current.x;
            currentAnnotation.bounds.y = selectedAnnotation.current.y;
            currentAnnotation.dynamicText = selectedAnnotation.current.defaultText;
            currentAnnotation.fontFamily = selectedAnnotation.current.fontFamily;
            currentAnnotation.textAlign = selectedAnnotation.current.alignment;
            currentAnnotation.fontSize = selectedAnnotation.current.fontSize;
            currentAnnotation.fontColor = selectedAnnotation.current.fontColor;
            currentAnnotation.font.isBold = false;
            currentAnnotation.font.isUnderline = false;
            currentAnnotation.font.isItalic = false;
            currentAnnotation.font.isStrikeout = false;
            switch(selectedAnnotation.current.fontStyle) {
                case "Bold" : {
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
                case "Strikethrough" : {
                    currentAnnotation.font.isStrikeout = true;
                    break;
                }
            }
        }
        else {
            currentAnnotation.bounds.width = selectedAnnotation.current.width;
            currentAnnotation.bounds.height = selectedAnnotation.current.height;
            currentAnnotation.bounds.left = selectedAnnotation.current.x;
            currentAnnotation.bounds.top = selectedAnnotation.current.y;
            if (!isNullOrUndefined(currentAnnotation.bounds.x) && !isNullOrUndefined(currentAnnotation.bounds.y)) {
                currentAnnotation.bounds.x = selectedAnnotation.current.x;
                currentAnnotation.bounds.y = selectedAnnotation.current.y;
            }
        }
        if (selectedAnnotation.current.annotationType === "Distance") {
            currentAnnotation.leaderLength = selectedAnnotation.current.leaderLength;
        }
        else {
            currentAnnotation.leaderLength = 0;
        }
        if (selectedAnnotation.current.annotationType === "Polygon" || selectedAnnotation.current.annotationType === "Perimeter" ||
            selectedAnnotation.current.annotationType === "Area" || selectedAnnotation.current.annotationType === "Volume") {
            currentAnnotation.vertexPoints = selectedAnnotation.current.vertexPoints;
        }
        currentAnnotation.isPrint = selectedAnnotation.current.isPrint;
        if (selectedAnnotation.current.isLocked) {
            currentAnnotation.isLocked = true;
            currentAnnotation.annotationSettings.isLock = true;
            currentAnnotation.allowedInteractions = selectedAnnotation.current.allowedInteractions;
            if (currentAnnotation.allowedInteractions.length === 0) {
                currentAnnotation.allowedInteractions = ["None"];
            }
        }
        else {
            currentAnnotation.isLocked = false;
            currentAnnotation.annotationSettings.isLock = false;
            currentAnnotation.allowedInteractions = ["None"];
        }
        updateAnnotationComments(currentAnnotation)
        return currentAnnotation;
    }
    function updateAnnotationComments(currentAnnotation: any) {
        let isReplyChanged = false;
        currentAnnotation.commentType = 'add';
        if (((!isNullOrUndefined(currentAnnotation.note) && (currentAnnotation.note !== selectedAnnotation.current.comment)) || (!isNullOrUndefined(currentAnnotation.notes) && (currentAnnotation.notes !== selectedAnnotation.current.comment))) && (currentAnnotation.comments && (currentAnnotation.comments.length > 0) )) {
            currentAnnotation.commentType = 'edit';
        }
        let calibrationType = currentAnnotation.indent ?? "";
        if (calibrationType !== "LineDimension" && calibrationType !== "PolyLineDimension" && calibrationType !== "PolygonDimension" && calibrationType !== "PolygonRadius" && calibrationType !== "PolygonVolume") {
            if (!isNullOrUndefined(currentAnnotation.note) || (currentAnnotation.shapeAnnotationType === "Ink" && !currentAnnotation.note)) {
                currentAnnotation.note = selectedAnnotation.current.comment;
            }
            else if (!isNullOrUndefined(currentAnnotation.notes)) {
                currentAnnotation.notes = selectedAnnotation.current.comment;
            }
        }
        currentAnnotation.replyComment = [];
        if (!isNullOrUndefined(selectedAnnotation.current.replies) && (selectedAnnotation.current.replies.length > 0)) {
            if (selectedAnnotation.current.replies.length > (currentAnnotation.comments as any[]).length) {
                let diff: number = (selectedAnnotation.current.replies.length - currentAnnotation.comments.length) as number;
                currentAnnotation.commentType = 'add';
                for (let index = (selectedAnnotation.current.replies.length - diff); index < (selectedAnnotation.current.replies.length); index++) {
                    currentAnnotation.replyComment.push(selectedAnnotation.current.replies[index].note);
                }
            }
            else if (selectedAnnotation.current.replies.length === (currentAnnotation.comments as any[]).length) {
                selectedAnnotation.current.replies.forEach((value, index) => {
                    if (currentAnnotation.comments[index] && (value.note !== currentAnnotation.comments[index].note)) {
                        isReplyChanged = true;
                        currentAnnotation.commentType = 'edit';
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
    function documentLoaded(e: LoadEventArgs): void {
        if (viewer) {
            setPageCount(viewer.pageCount as number);
        }
        if (e.documentName === 'annotations.pdf') {
            viewer.annotation.addAnnotation("Highlight", {
                bounds: [{ x: 97, y: 610, width: 350, height: 14 }],
                pageNumber: 1
            } as HighlightSettings);
            viewer.annotation.addAnnotation("Underline", {
                bounds: [{ x: 97, y: 723, width: 353.5, height: 14 }],
                pageNumber: 1
            } as UnderlineSettings);
            viewer.annotation.addAnnotation("Strikethrough", {
                bounds: [{ x: 97, y: 836, width: 376.5, height: 14 }],
                pageNumber: 1
            } as StrikethroughSettings);
            viewer.annotation.addAnnotation("Line", {
                offset: { x: 200, y: 230 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
            } as LineSettings);
            viewer.annotation.addAnnotation("Arrow", {
                offset: { x: 200, y: 370 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 370 }, { x: 350, y: 370 }]
            } as ArrowSettings);
            viewer.annotation.addAnnotation("Rectangle", {
                offset: { x: 200, y: 480 },
                pageNumber: 2,
                width: 150,
                height: 75
            } as RectangleSettings);
            viewer.annotation.addAnnotation("Circle", {
                offset: { x: 200, y: 620 },
                pageNumber: 2,
                width: 90,
                height: 90
            } as CircleSettings);
            viewer.annotation.addAnnotation("Polygon", {
                offset: { x: 200, y: 800 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 800 }, { x: 242, y: 771 }, { x: 289, y: 799 }, { x: 278, y: 842 }, { x: 211, y: 842 }, { x: 200, y: 800 }]
            } as PolygonSettings);
            viewer.annotation.addAnnotation("Distance", {
                offset: { x: 200, y: 230 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
            } as DistanceSettings);
            viewer.annotation.addAnnotation("Perimeter", {
                offset: { x: 200, y: 350 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 350 }, { x: 285, y: 350 }, { x: 286, y: 412 }]
            } as PerimeterSettings);
            viewer.annotation.addAnnotation("Area", {
                offset: { x: 200, y: 500 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 500 }, { x: 288, y: 499 }, { x: 289, y: 553 }, { x: 200, y: 500 }]
            } as AreaSettings);
            viewer.annotation.addAnnotation("Radius", {
                offset: { x: 200, y: 630 },
                pageNumber: 3,
                width: 90,
                height: 90
            } as RadiusSettings);
            viewer.annotation.addAnnotation("Volume", {
                offset: { x: 200, y: 810 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 810 }, { x: 200, y: 919 }, { x: 320, y: 919 }, { x: 320, y: 809 }, { x: 200, y: 810 }]
            } as VolumeSettings);
            viewer.annotation.addAnnotation("FreeText", {
                offset: { x: 250, y: 150 },
                fontSize: 16,
                fontFamily: "Helvetica",
                pageNumber: 4,
                width: 200,
                height: 40,
                isLock: false,
                defaultText: "Syncfusion"
            } as FreeTextSettings);
            viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 240 },
                pageNumber: 4
            } as StampSettings, DynamicStampItem.Approved);
            viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 350 },
                pageNumber: 4
            } as StampSettings, null, SignStampItem.SignHere);
            viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 460 },
                pageNumber: 4
            } as StampSettings, null, null, StandardBusinessStampItem.Confidential);
            //The customStampImageSource property contains the stamp image as a base64 string
            viewer.annotation.addAnnotation("Stamp", {
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
            viewer.annotation.addAnnotation("Ink", {
                offset: { x: 250, y: 860 },
                pageNumber: 4,
                width: 200,
                height: 60,
                path: '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]'
            } as InkAnnotationSettings);
            viewer.annotation.addAnnotation("StickyNotes", {
                offset: { x: 300, y: 980 },
                pageNumber: 4,
                isLock: false
            } as StickyNotesSettings);
        }
        selectedAnnotation.current = new AnnotationBase();
        annotationUnSelectedEvent();
    }

    function change(args) {
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }
}
export default ProgrammaticOperations;