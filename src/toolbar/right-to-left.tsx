import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective, OverflowMode } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './toolbar.component.css'

 const sample_CSS: string = `{ width: 100% }`;

export class RTL extends SampleBase<{}, {}> {
    private dropElement: HTMLSelectElement;
    private toolbarInstance: ToolbarComponent;

  // Mapping DropDownList dataSource property
  private mData: { [key: string]: Object }[] = [
    {'value':'scrollable', 'text': 'Scrollable'}, {'value':'popup', 'text': 'Popup'}
  ];

  // Mapping DropDownList fields property
  private fields: object = { text: 'text', value: 'value' };

  // Mapping DropDownList value property
  private mVal: string = 'scrollable';

  public changeOverflowMode(e: ChangeEventArgs): void {
    let placement: string = (document.getElementById('mode') as HTMLSelectElement).value;
    if (placement === 'Popup') {
      this.toolbarInstance.overflowMode = 'Popup';
    } else {
      this.toolbarInstance.overflowMode = 'Scrollable';
    }
    this.toolbarInstance.dataBind();
  }

  render () {
    return (
      <div className = 'control-pane'>
        <div className='control-section tbar-control-section tb-rtl-sample-section'>
          <div className= ' col-lg-8'>
            <div className = 'control tbar-sample' style = {{margin: '25px 0 ' }} >
            {/* Render the Toolbar Component with RTL mode */}
          <ToolbarComponent enableRtl = {true}  ref={toolbar => this.toolbarInstance = toolbar}>
             <ItemsDirective>
                <ItemDirective prefixIcon = 'e-cut-icon tb-icons'  tooltipText = 'Cut' overflow ='Show' />
                <ItemDirective prefixIcon = 'e-copy-icon tb-icons'  tooltipText = 'Copy'   overflow ='Show'/>
                <ItemDirective prefixIcon = 'e-paste-icon tb-icons'  tooltipText = 'Paste' overflow ='Show'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-bold-icon tb-icons'  tooltipText = 'Bold' text = 'Bold'
                 showTextOn = 'Overflow'   overflow ='Show'/>
                <ItemDirective prefixIcon = 'e-underline-icon tb-icons'  tooltipText = 'Underline' overflow ='Show'
                 text = 'أكد' showTextOn = 'Overflow'/>
                <ItemDirective prefixIcon = 'e-italic-icon tb-icons'  tooltipText = 'Italic' text = 'Italic'
                showTextOn = 'Overflow'  overflow ='Show'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-bullets-icon tb-icons'  tooltipText = 'Bullets' showTextOn = 'Overflow' text='Bullets'/>
                <ItemDirective prefixIcon = 'e-numbering-icon tb-icons'  tooltipText = 'Numbering'  showTextOn = 'Overflow' text='Numbering'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-alignleft-icon tb-icons'  tooltipText = 'Align-Left'
                 showTextOn = 'Overflow' text = 'Left'/>
                <ItemDirective prefixIcon = 'e-alignright-icon tb-icons'  tooltipText = 'Align-Right' 
                showTextOn = 'Overflow' text = 'Right'/>
                <ItemDirective prefixIcon = 'e-aligncenter-icon tb-icons'  tooltipText = 'Align-Center' 
                showTextOn = 'Overflow' text = 'Center'/>
                <ItemDirective prefixIcon = 'e-alignjustify-icon tb-icons'  tooltipText = 'Align-Justify' 
                showTextOn = 'Overflow' text = 'Justify'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-undo-icon tb-icons'  tooltipText = 'Undo'  text = 'Undo'/>
                <ItemDirective prefixIcon = 'e-redo-icon tb-icons'  tooltipText = 'Redo'  text = 'Redo'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-radar-icon tb-icons' text = 'Radar' tooltipText = 'Radar Chart'  showTextOn = 'Overflow'/>
                <ItemDirective prefixIcon = 'e-line-icon tb-icons' text = 'Line' tooltipText = 'Line Chart' showTextOn = 'Overflow'/>
                <ItemDirective type = 'Separator'/>
                <ItemDirective prefixIcon = 'e-table-icon tb-icons' text = 'Table' tooltipText = 'Table' showTextOn = 'Overflow'/>
                <ItemDirective prefixIcon = 'e-picture-icon tb-icons' text = 'Picture' tooltipText = 'Picture' showTextOn = 'Overflow'/>
                <ItemDirective prefixIcon = 'e-design-icon tb-icons' text = 'Design' tooltipText = 'Design' 
                showTextOn = 'Overflow' overflow = 'Hide'/>
             </ItemsDirective>
          </ToolbarComponent>
         </div></div>
         <div className='col-lg-4 property-section'>
 <PropertyPane title='Toolbar Mode Switch in RTL '>
      <table id="property" title="Toolbar Mode Switch in RTL " className = "property-panel-table">
        <tr>
          <td style = {{ width: '30%' }}>
            <div className='col-md-4' style={{ paddingTop: '8px' }}>Mode</div>
          </td>
          <td style={{ width: '70%', paddingRight: '10px' }}>
            <div>
              {/* DropDown for switching Toolbar overflowMode property */}
              <DropDownListComponent id='mode' width={'90%'} dataSource={this.mData} fields={this.fields} value={this.mVal}
              change={this.changeOverflowMode.bind(this)}  />
            </div>
          </td>
        </tr>
      </table>
    </PropertyPane>
    </div></div>
    <div id="action-description">
    <p>
        This sample demonstrates the RTL mode of the <code>Toolbar</code>. Select the option in property panel for switching mode in Toolbar with right to left direction.
    </p>
</div>
<div id="description">
    <p>
        The RTL sample illustrates the direction of the toolbar from <strong>right to left</strong>. You can switch between
        <strong> Popup</strong> and <strong>Scrollable</strong> mode using the options given in the drop down list.
    </p>
    <br></br>
</div>
         </div>

    );
  }
}