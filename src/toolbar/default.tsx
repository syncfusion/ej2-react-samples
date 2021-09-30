import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './toolbar.component.css'

export class Default extends SampleBase<{}, {}> {

  render () {
    return (
      <div className='control-pane'>
        <div className='control-section tbar-control-section'>
          <div className= 'control toolbar-sample tbar-sample'  style = {{margin: '25px 0' }}>
          {/* Render the Toolbar Component */}
          <ToolbarComponent>
             <ItemsDirective>
                <ItemDirective prefixIcon = 'e-icons e-cut'  tooltipText = 'Cut'/>
                <ItemDirective prefixIcon = 'e-icons e-copy'  tooltipText = 'Copy'/>
                <ItemDirective prefixIcon = 'e-icons e-paste'  tooltipText = 'Paste'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-icons e-bold'  tooltipText = 'Bold'/>
                <ItemDirective prefixIcon = 'e-icons e-underline'  tooltipText = 'Underline'/>
                <ItemDirective prefixIcon = 'e-icons e-italic'  tooltipText = 'Italic'/>
                <ItemDirective prefixIcon = 'e-icons e-paint-bucket'  tooltipText = 'Color-Picker'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-icons e-align-left'  tooltipText = 'Align_Left'/>
                <ItemDirective prefixIcon = 'e-icons e-align-right'  tooltipText = 'Align_Right'/>
                <ItemDirective prefixIcon = 'e-icons e-align-center'  tooltipText = 'Align_Center'/>
                <ItemDirective prefixIcon = 'e-icons e-justify'  tooltipText = 'Align_Justify'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-icons e-list-unordered'  tooltipText = 'Bullets'/>
                <ItemDirective prefixIcon = 'e-icons e-list-ordered'  tooltipText = 'Numbering'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-icons e-undo'  tooltipText = 'Undo'/>
                <ItemDirective prefixIcon = 'e-icons e-redo'  tooltipText = 'Redo'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-icons e-upload-1'  tooltipText = 'Upload'/>
                <ItemDirective prefixIcon = 'e-icons e-download'  tooltipText = 'Download'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-icons e-increase-indent'  tooltipText = 'Text Indent'/>
                <ItemDirective prefixIcon = 'e-icons e-decrease-indent'  tooltipText = 'Text Outdent'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-icons e-erase'  tooltipText = 'Clear'/>
                <ItemDirective prefixIcon = 'e-icons e-refresh'  tooltipText = 'Reload'/>
                <ItemDirective prefixIcon = 'e-icons e-export'  tooltipText = 'Export'/>
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
    <br/>
    <p>
        You can use left / right navigation icon or touch swipe to see the hidden commands of the toolbar.
    </p>
    <ul>
        <li>
            Initially toolbar rendered with the <code> left and right navigation</code> icon and you can see hidden commands by <code>moving in right or left</code>            direction.
        </li>
        <li>
            When you reach <code>right / left end of toolbar</code>, corresponding  navigation direction will be disabled.
        </li>
        <li>
            You can continuously scroll the toolbar content by holding on the navigation icon.
        </li>
        <li>
            In <code>devices</code> navigation icons are not available. you can touch swipe to see the hidden commands of the toolbar.
        </li>
    </ul>
        </div>

      </div>

    );
  }
}