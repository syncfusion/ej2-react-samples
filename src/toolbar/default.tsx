import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './toolbar.component.css'

export class Default extends SampleBase<{}, {}> {

  render () {
    return (
      <div className='control-pane'>
        <div className='control-section tbar-control-section' style={{ paddingBottom: '100px'}}>
          <div className='control toolbar-sample tbar-sample' style={{ width: '80%', maxWidth: "none"}}>
            {/* Render the Toolbar Component */}
            <h1 style={{ display: 'inline-block' }}>Simple Toolbar</h1>
            <ToolbarComponent>
              <ItemsDirective>
                <ItemDirective prefixIcon='e-icons e-cut' tooltipText='Cut' />
                <ItemDirective prefixIcon='e-icons e-copy' tooltipText='Copy' />
                <ItemDirective prefixIcon='e-icons e-paste' tooltipText='Paste' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-bold' tooltipText='Bold' />
                <ItemDirective prefixIcon='e-icons e-underline' tooltipText='Underline' />
                <ItemDirective prefixIcon='e-icons e-italic' tooltipText='Italic' />
                <ItemDirective prefixIcon='e-icons e-paint-bucket' tooltipText='Color-Picker' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-align-left' tooltipText='Align_Left' />
                <ItemDirective prefixIcon='e-icons e-align-right' tooltipText='Align_Right' />
                <ItemDirective prefixIcon='e-icons e-align-center' tooltipText='Align_Center' />
                <ItemDirective prefixIcon='e-icons e-justify' tooltipText='Align_Justify' />
              </ItemsDirective>
            </ToolbarComponent>
            <br></br>
            <br></br>
            <h1 style={{ display: 'inline-block' }}>Scrollable Toolbar</h1>
            <ToolbarComponent overflowMode='Scrollable' id="toolbar_scrollable" >
              <ItemsDirective>
                <ItemDirective prefixIcon='e-icons e-cut' tooltipText='Cut' text='Cut' />
                <ItemDirective prefixIcon='e-icons e-copy' tooltipText='Copy' text='Copy' />
                <ItemDirective prefixIcon='e-icons e-paste' tooltipText='Paste' text='Paste' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-bold' tooltipText='Bold' text='Bold' />
                <ItemDirective prefixIcon='e-icons e-underline' tooltipText='Underline' text='Underline' />
                <ItemDirective prefixIcon='e-icons e-italic' tooltipText='Italic' text='Italic' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-align-left' tooltipText='Align_Left' text='Align_Left' />
                <ItemDirective prefixIcon='e-icons e-align-right' tooltipText='Align_Right' text='Align_Right' />
                <ItemDirective prefixIcon='e-icons e-align-center' tooltipText='Align_Center' text='Align_Center' />
                <ItemDirective prefixIcon='e-icons e-justify' tooltipText='Align_Justify' text='Align_Justify' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-list-unordered' tooltipText='Bullets' text='Bullets' />
                <ItemDirective prefixIcon='e-icons e-list-ordered' tooltipText='Numbering' text='Numbering' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-undo' tooltipText='Undo' text='Undo' />
                <ItemDirective prefixIcon='e-icons e-redo' tooltipText='Redo' text='Redo' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-increase-indent' tooltipText='Text Indent' text='Text Indent' />
                <ItemDirective prefixIcon='e-icons e-decrease-indent' tooltipText='Text Outdent' text='Text Outdent' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-erase' tooltipText='Clear' text='Clear' />
              </ItemsDirective>
            </ToolbarComponent>
            <br></br>
            <br></br>
            <h1 style={{ display: 'inline-block' }}>Popup Toolbar</h1>
            <ToolbarComponent overflowMode='Popup' id="toolbar_popup">
              <ItemsDirective>
                <ItemDirective prefixIcon='e-icons e-cut' tooltipText='Cut' text='Cut' />
                <ItemDirective prefixIcon='e-icons e-copy' tooltipText='Copy' text='Copy' />
                <ItemDirective prefixIcon='e-icons e-paste' tooltipText='Paste' text='Paste' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-bold' tooltipText='Bold' text='Bold' />
                <ItemDirective prefixIcon='e-icons e-underline' tooltipText='Underline' text='Underline' />
                <ItemDirective prefixIcon='e-icons e-italic' tooltipText='Italic' text='Italic' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-align-left' tooltipText='Align_Left' text='Align_Left' />
                <ItemDirective prefixIcon='e-icons e-align-right' tooltipText='Align_Right' text='Align_Right' />
                <ItemDirective prefixIcon='e-icons e-align-center' tooltipText='Align_Center' text='Align_Center' />
                <ItemDirective prefixIcon='e-icons e-justify' tooltipText='Align_Justify' text='Align_Justify' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-list-unordered' tooltipText='Bullets' text='Bullets' />
                <ItemDirective prefixIcon='e-icons e-list-ordered' tooltipText='Numbering' text='Numbering' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-undo' tooltipText='Undo' text='Undo' />
                <ItemDirective prefixIcon='e-icons e-redo' tooltipText='Redo' text='Redo' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-increase-indent' tooltipText='Text Indent' text='Text Indent' />
                <ItemDirective prefixIcon='e-icons e-decrease-indent' tooltipText='Text Outdent' text='Text Outdent' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-erase' tooltipText='Clear' text='Clear' />
              </ItemsDirective>
            </ToolbarComponent>
            <br></br>
            <br></br>
            <h1 style={{ display: 'inline-block' }}>MultiRow Toolbar</h1>
            <ToolbarComponent overflowMode='MultiRow' id="toolbar_multirow">
              <ItemsDirective>
                <ItemDirective prefixIcon='e-icons e-cut' tooltipText='Cut' text='Cut' />
                <ItemDirective prefixIcon='e-icons e-copy' tooltipText='Copy' text='Copy' />
                <ItemDirective prefixIcon='e-icons e-paste' tooltipText='Paste' text='Paste' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-bold' tooltipText='Bold' text='Bold' />
                <ItemDirective prefixIcon='e-icons e-underline' tooltipText='Underline' text='Underline' />
                <ItemDirective prefixIcon='e-icons e-italic' tooltipText='Italic' text='Italic' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-align-left' tooltipText='Align_Left' text='Align_Left' />
                <ItemDirective prefixIcon='e-icons e-align-right' tooltipText='Align_Right' text='Align_Right' />
                <ItemDirective prefixIcon='e-icons e-align-center' tooltipText='Align_Center' text='Align_Center' />
                <ItemDirective prefixIcon='e-icons e-justify' tooltipText='Align_Justify' text='Align_Justify' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-list-unordered' tooltipText='Bullets' text='Bullets' />
                <ItemDirective prefixIcon='e-icons e-list-ordered' tooltipText='Numbering' text='Numbering' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-undo' tooltipText='Undo' text='Undo' />
                <ItemDirective prefixIcon='e-icons e-redo' tooltipText='Redo' text='Redo' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-increase-indent' tooltipText='Text Indent' text='Text Indent' />
                <ItemDirective prefixIcon='e-icons e-decrease-indent' tooltipText='Text Outdent' text='Text Outdent' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-erase' tooltipText='Clear' text='Clear' />
              </ItemsDirective>
            </ToolbarComponent>
            <br></br>
            <br></br>
            <h1 style={{ display: 'inline-block' }}>Extended Toolbar</h1>
            <ToolbarComponent overflowMode='Extended' id="toolbar_extended">
              <ItemsDirective>
                <ItemDirective prefixIcon='e-icons e-cut' tooltipText='Cut' text='Cut' />
                <ItemDirective prefixIcon='e-icons e-copy' tooltipText='Copy' text='Copy' />
                <ItemDirective prefixIcon='e-icons e-paste' tooltipText='Paste' text='Paste' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-bold' tooltipText='Bold' text='Bold' />
                <ItemDirective prefixIcon='e-icons e-underline' tooltipText='Underline' text='Underline' />
                <ItemDirective prefixIcon='e-icons e-italic' tooltipText='Italic' text='Italic' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-align-left' tooltipText='Align_Left' text='Align_Left' />
                <ItemDirective prefixIcon='e-icons e-align-right' tooltipText='Align_Right' text='Align_Right' />
                <ItemDirective prefixIcon='e-icons e-align-center' tooltipText='Align_Center' text='Align_Center' />
                <ItemDirective prefixIcon='e-icons e-justify' tooltipText='Align_Justify' text='Align_Justify' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-list-unordered' tooltipText='Bullets' text='Bullets' />
                <ItemDirective prefixIcon='e-icons e-list-ordered' tooltipText='Numbering' text='Numbering' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-undo' tooltipText='Undo' text='Undo' />
                <ItemDirective prefixIcon='e-icons e-redo' tooltipText='Redo' text='Redo' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-increase-indent' tooltipText='Text Indent' text='Text Indent' />
                <ItemDirective prefixIcon='e-icons e-decrease-indent' tooltipText='Text Outdent' text='Text Outdent' />
                <ItemDirective type='Separator' />
                <ItemDirective prefixIcon='e-icons e-erase' tooltipText='Clear' text='Clear' />
              </ItemsDirective>
            </ToolbarComponent>
          </div></div>
        <div id="action-description">
          <p>
            This sample demonstrates the default functionalities of the <code>Toolbar</code>. Select any command or click the left/right navigation icon or touch swipe to see the hidden commands of the Toolbar
          </p>
        </div>
        <div id="description">
          <p>
            <strong>Toolbar</strong> is a graphical control on which commands / buttons will be displayed in horizontal order.
            By default scrolling display mode enabled when content exceeds the available viewing area.
          </p>
          <p>
            You can use left / right navigation icon or touch swipe to see the hidden commands of the toolbar.
          </p>
          <p>
            Initially toolbar rendered with the <code> left and right navigation</code> icon and you can see hidden commands by <code>moving in right or left</code> direction.
          </p>
          <p>
            When you reach <code>right / left end of toolbar</code>, corresponding  navigation direction will be disabled.
          </p>
          <p>
            In this demo, available responsive mode of React Toolbar has been showcased. The modes can be set through <code>overflowMode</code> property and the possible modes are <code>Scrollable</code>, <code>Popup</code>Popup, <code>Extended</code> and <code>MultiRow</code>.
          </p>
          <ul>
            <li>
              <code>Scrollable</code> - The scrollable mode is the default mode. When you have excess toolbar items, it
              can be viewed by scrolling through left and right arrows.You can continuously scroll the toolbar content by holding on the navigation icon. In <code>devices</code> navigation icons are not available. you can touch swipe to see the hidden commands of the toolbar.
            </li>
            <li>
              <code>Popup</code> - The overflowing toolbar items which do not fit in viewing area moves to the popup
              container.
            </li>
            <li>
              <code>Extended</code> - The overflowing toolbar items which do not fit in the available space can be viewed
              in the next row of the toolbar on clicking the expand icon.
            </li>
            <li>
              <code>MultiRow</code> - The overflowing toolbar items which do not fit in viewing area will be displayed as
              an in-line of the toolbar.
            </li>
          </ul>
        </div>
      </div>
    );
  }
}