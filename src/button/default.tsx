import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './button.css';

export class Default extends SampleBase<{}, {}> {
    public btnobj: ButtonComponent;
    
    //Toggle button click event handler
    btnClick(): void {
        let proxy: any = this;
        if (proxy.btnobj.element.classList.contains('e-active')) {
            proxy.btnobj.content = 'Pause';
            proxy.btnobj.iconCss = 'e-icons e-pause-icon';
        }else {
            proxy.btnobj.content = 'Play';
            proxy.btnobj.iconCss = 'e-icons e-play-icon';
        }
    }

  render() {
    return (
      <div className = 'control-pane'>
        <div className='control-section'>
          <div className='button-section'>
            <div id='button-control'>
                <div className='row'>
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-primary'>Primary</ButtonComponent>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent>Normal</ButtonComponent>
                        </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-outline' isPrimary>Outline</ButtonComponent>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-flat e-primary'>Flat</ButtonComponent>
                        </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-success'>Success</ButtonComponent>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-warning'>Warning</ButtonComponent>
                        </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-danger'>Danger</ButtonComponent>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-info'>Info</ButtonComponent>
                        </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-small e-round' iconCss='e-icons e-add-icon' isPrimary></ButtonComponent>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-flat e-primary' ref={(scope) => { this.btnobj = scope; }} iconCss='e-icons e-play-icon' 
                            isToggle onClick={ this.btnClick.bind(this) }>Play</ButtonComponent>
                        </div>
                    </div>

                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-flat e-primary' iconCss='e-icons e-open-icon' iconPosition='Right'>Open</ButtonComponent>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
                            <ButtonComponent cssClass='e-small'>Small</ButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div id="action-description">
            <p>This sample demonstrates the default functionalities of the Button with different types and predefined styles.</p>
        </div>
        <div id="description">
            <p>
                Button is a graphical user interface element that triggers an event on click action. It contains the text, an image, or both.
            </p>
            <p>
                In this sample, Play button is a toggle button and it can be enabled by using the <a target="_blank"
                href="http://ej2.syncfusion.com/react/documentation/button/api-buttonComponent.html#istoggle-boolean"><code>isToggle
                </code></a> property. To change the text and icon you should handle click event.
            </p>
            <p> 
                More information about Button can be found in this <a target='_blank'
                href='http://ej2.syncfusion.com/react/documentation/button/getting-started.html'>documentation section</a>.
            </p>
        </div>
      </div>
    )
  }
}