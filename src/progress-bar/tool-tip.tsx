/**
 * Sample for linear progress bar
 */
 import * as React from "react";
 import { ProgressBarComponent, ILoadedEventArgs, ProgressTheme, Inject } from '@syncfusion/ej2-react-progressbar';
 import { EmitType } from '@syncfusion/ej2-base';
 import { SampleBase } from '../common/sample-base';
 
 const SAMPLE_CSS = `
       #control-container {
          padding: 0px !important;
      }
  
      .linear-parent {
          text-align: center;
          width: 80%;
          margin: auto !important;
      }
  
      .progressbar-label {
          text-align: left;
          font-family: Roboto-Regular;
          font-size: 14px;
          color: #3D3E3C;
          margin-left: 10px;
          padding: 0px;
          top: 10px;
      }
  
      #reLoad {
          border-radius: 4px;
          text-transform: capitalize;
      }
      `;
 /**
  * Area sample
  */
  export class ProgressBarLinearTooltip extends SampleBase<{}, {}> {
    private linearOne: ProgressBarComponent;
    private linearTwo: ProgressBarComponent;
    private linearThree: ProgressBarComponent;
    private linearFour: ProgressBarComponent;
    private linearFive: ProgressBarComponent;
    private progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
         let div: HTMLCollection = document.getElementsByClassName('progressbar-label');
         let selectedTheme: string = location.hash.split('/')[1];
         selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
         args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
             selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
         if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
             || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'Tailwind3Dark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark') {
             for (let i = 0; i < div.length; i++) {
                 div[i].setAttribute('style', 'color:white');
             }
         }
     }
     private replayClick(): void {
         this.linearOne.refresh();
         this.linearTwo.refresh();
         this.linearThree.refresh();
         this.linearFour.refresh();
         this.linearFive.refresh();
     }
     render() {
     return (
         <div className='control-pane'>
         <style>
             {SAMPLE_CSS}
         </style>
         <div className='control-section'>
             <div className="row linear-parent" style={{ marginLeft: '10%' }}>
                 <div className="col-lg-12 col-md-12" style={{ marginTop: '0.5%' }}>
                     <div className="col-lg-12 col-md-12 progressbar-label" >HTML5</div>
                     <div className="linear-progress">
                         <ProgressBarComponent id="lineardeterminate"
                            ref={linear1 => this.linearOne = linear1}
                            type='Linear'
                            height='60'
                            value={75}
                            trackThickness={20}
                            progressThickness={20}
                            animation={{
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }}
                            tooltip={{
                                enable: true
                            }}
                            load={this.progressLoad.bind(this)}
                         >
                         </ProgressBarComponent>
                     </div>
                 </div>
                 <div className="col-lg-12 col-md-12" style={{ marginTop: '0.5%' }}>
                     <div className="col-lg-12 col-md-12 progressbar-label" >CSS3</div>
                     <div className="linear-progress">
                         <ProgressBarComponent id="linearindeterminate"
                             ref={linear2 => this.linearTwo = linear2}
                             type='Linear'
                             height='60'
                             value={65}
                             trackThickness={20}
                             progressThickness={20}
                             animation={{
                                 enable: true,
                                 duration: 2000,
                                 delay: 0,
                             }}
                             tooltip={{
                                 enable: true
                             }}
                             load={this.progressLoad.bind(this)}
                         >
                         </ProgressBarComponent>
                     </div>
                 </div>
                 <div className="col-lg-12 col-md-12" style={{ marginTop: '0.5%' }}>
                     <div className="col-lg-12 col-md-12 progressbar-label" >BOOTSTRAP</div>
                     <div className="linear-progress">
                         <ProgressBarComponent id="linearsegment"
                             ref={linear3 => this.linearThree = linear3}
                             type='Linear'
                             height='60'
                             value={55}
                             trackThickness={20}
                             progressThickness={20}
                             animation={{
                                 enable: true,
                                 duration: 2000,
                                 delay: 0,
                             }}
                             tooltip={{
                                 enable: true
                             }}
                             load={this.progressLoad.bind(this)}
                         >
                         </ProgressBarComponent>
                     </div>
                 </div>
                 <div className="col-lg-12 col-md-12" style={{ marginTop: '0.5%' }}>
                     <div className="col-lg-12 col-md-12 progressbar-label" >JQUERY</div>
                     <div className="linear-progress">
                         <ProgressBarComponent id="linearbuffer"
                            ref={linear4 => this.linearFour = linear4}
                            type='Linear'
                            height='60'
                            value={75}
                            trackThickness={20}
                            progressThickness={20}
                            animation={{
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }}
                            tooltip={{
                                enable: true
                            }}
                            load={this.progressLoad.bind(this)}
                         >
                         </ProgressBarComponent>
                     </div>
                 </div>
                 <div className="col-lg-12 col-md-12" style={{ marginTop: '0.5%' }}>
                     <div className="col-lg-12 col-md-12 progressbar-label" >MYSQL</div>
                     <div className="linear-progress">
                         <ProgressBarComponent id="linearactive"
                             ref={linear5 => this.linearFive = linear5}
                             type='Linear'
                             height='60'
                             value={75}
                             trackThickness={20}
                             progressThickness={20}
                             animation={{
                                 enable: true,
                                 duration: 2000,
                                 delay: 0,
                             }}
                             tooltip={{
                                 enable: true
                             }}
                             load={this.progressLoad.bind(this)}
                         >
                         </ProgressBarComponent>
                     </div>
                 </div>
             </div>
             <div id="replay-progressbar" style={{ marginTop: '2%', marginLeft: '45.5%' }}><button onClick={this.replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Reload</button></div>
         </div>
         <div id="action-description">
         <p>This Progress Bar control demo shows a linear progress bar with a tooltip.</p>
         </div>
         <div id="description">
         <p>This demo for the Progress Bar control shows the linear progress bar with a tooltip. The <code>format</code> property can be used to format the tooltip text, and the <code>textStyle</code> property can be used to customize the text style.</p>
         </div>
     </div>
     )
   }
}
