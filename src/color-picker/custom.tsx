import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ColorPickerComponent, ColorPickerEventArgs, PaletteTileEventArgs } from '@syncfusion/ej2-react-inputs';
import { createElement, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './custom.css';

export class CustomPalette extends SampleBase<{}, {}> {
  private defaultObj: ColorPickerComponent;

  public circlePaletteColors: { [key: string]: string[] } = {
    'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
  };

  public squarePaletteColors: { [key: string]: string[] } = {
    'custom1': ['#b80000', '#db3e00', '#fccb00', '#008b02',
      '#006b76', '#1273de', '#004dcf', '#5300eb',
      '#eb9694', '#fad0c3', '#fef3bd', '#c1e1c5',
      '#bedadc', '#c4def6', '#bed3f3', '#d4c4fb']
  };

  public roundedPaletteColors: { [key: string]: string[] } = {
    'custom1': ['#ff6900', '#fcb900', '#7bdcb5', '#00d084',
      '#8ed1fc', '#0693e3', '#abb8c3', '#eb144c',
      '#f78da7', '#9900ef']
  };

  public scrollPaletteColors: { [key: string]: string[] } = {
    'custom1': ['#ef9a9a', '#e57373', '#ef5350', '#f44336', '#f48fb1', '#f06292',
      '#ec407a', '#e91e63', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#b39ddb',
      '#9575cd', '#7e57c2', '#673AB7'],
    'custom2': ['#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#90CAF9', '#64B5F6',
      '#42A5F5', '#2196F3', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4',
      '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4'],
    'custom3': ['#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#A5D6A7', '#81C784',
      '#66BB6A', '#4CAF50', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#E6EE9C',
      '#DCE775', '#D4E157', '#CDDC39'],
    'custom4': ['#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FFE082', '#FFD54F',
      '#FFCA28', '#FFC107', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FFAB91',
      '#FF8A65', '#FF7043', '#FF5722']
  };

  public beforeCircleTileRender(args: PaletteTileEventArgs): void {
    args.element.classList.add('e-circle-palette');
    args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
  }

  public beforeSquareTileRender(args: PaletteTileEventArgs): void {
    args.element.classList.add('e-square-palette');
  }

  public beforeRoundedTileRender(args: PaletteTileEventArgs): void {
    args.element.classList.add('e-rounded-palette');
  }

  public beforeScrollTileRender(args: PaletteTileEventArgs): void {
    args.element.classList.add('e-icons');
    args.element.classList.add('e-scroll-palette');
  }

  // function to handle the ColorPicker change event
  public change(args: ColorPickerEventArgs): void {
    document.getElementById('e-shirt-preview').style.backgroundColor = args.currentValue.hex;
  }

  public roundedPaletteChange(args: ColorPickerEventArgs): void {
    (this.defaultObj.element.nextElementSibling.querySelector('.e-selected') as HTMLElement).style.boxShadow
        = args.currentValue.hex + ' 0 0 7px';
    document.getElementById('e-shirt-preview').style.backgroundColor = args.currentValue.hex;
}


  public rendereComplete(): void {
    if (Browser.isDevice) {
      document.getElementById('custom-control').classList.add('e-mobile-control');
    }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div id='custom-control'>
            <div className='row'>
              <div id="e-shirt-preview"></div>
            </div>
            <div id='custom-content' className='row'>
              <div className='col-xs-12 col-sm-12 col-lg-6 col-md-6 e-circle-wrap'>
                <ColorPickerComponent id='circle-palette' mode='Palette' modeSwitcher={false} inline={true} showButtons={false} columns={4} presetColors={this.circlePaletteColors} beforeTileRender={this.beforeCircleTileRender.bind(this)} change={this.change.bind(this)}></ColorPickerComponent>
              </div>
              <div className='col-xs-12 col-sm-12 col-lg-6 col-md-6 e-rounded-wrap'>
                <ColorPickerComponent id='rounded-palette' mode='Palette' ref={(scope) => { this.defaultObj = scope; }} modeSwitcher={false} inline={true} showButtons={false} columns={5} presetColors={this.roundedPaletteColors} beforeTileRender={this.beforeRoundedTileRender.bind(this)} change={this.roundedPaletteChange.bind(this)}></ColorPickerComponent>
              </div>
              <div className='col-xs-12 col-sm-12 col-lg-6 col-md-6 e-square-wrap'>
                <ColorPickerComponent id='square-palette' mode='Palette' modeSwitcher={false} inline={true} showButtons={false} columns={8} presetColors={this.squarePaletteColors} beforeTileRender={this.beforeSquareTileRender.bind(this)} change={this.change.bind(this)}></ColorPickerComponent>
              </div>
              <div className='col-xs-12 col-sm-12 col-lg-6 col-md-6 e-scroll-wrap'>
                <ColorPickerComponent id='scroll-palette' mode='Palette' modeSwitcher={false} inline={true} showButtons={false} columns={4} presetColors={this.scrollPaletteColors} beforeTileRender={this.beforeScrollTileRender.bind(this)} change={this.change.bind(this)}></ColorPickerComponent>
              </div>
            </div>
          </div>
        </div>

        <div id='action-description'>
          <p>This sample demonstrates how to customize the color palettes with different types and styles.</p>
        </div>
        <div id="description">
          <p>
            The ColorPicker component is a user interface to select and adjust color values. This supports various color specifications
            like RGB (Red Green Blue), HSV (Hue Saturation Value), and Hex codes.</p>
          <p>
            In this sample,</p>
          <ul>
            <li>
              Select the shirt color from different customized palettes. It contains circle, square, rounded edge, and multiple scroll
              palettes.</li>
            <li>Using the
            <code>
                <a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/color-picker/#presetcolors">presetColors
                </a>
              </code> property, you can specify the custom colors to be loaded.</li>
          </ul>
          <p>
            More information about ColorPicker can be found in this
        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/color-picker/how-to/customize-colorpicker/">
              documentation section</a>.</p>
        </div>
      </div >
    )
  }
}
