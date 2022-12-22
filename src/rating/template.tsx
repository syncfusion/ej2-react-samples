import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './template.css';

export class Template extends SampleBase<{}, {}> {
    render() {
        return (
          <div className='control-pane'>
                <div id="template-rating-control">
                    <div className="rating-content" >
                        <label>Font Icon</label><br/>
                        <RatingComponent id='rating1' emptyTemplate= {this.emptyFont} fullTemplate= {this.fullFont} value= {3.0}></RatingComponent>
                    </div>
                    <div className="rating-content custom-svg">
                        <label>SVG Icon</label><br/>
                        <RatingComponent id='rating2' emptyTemplate= {this.emptyTemplate} fullTemplate= {this.fullTemplate} enableAnimation= {false} value= {3.0}></RatingComponent>
                    </div>
                    <div className="rating-content">
                        <label>Emoji Icon</label><br/>
                        <RatingComponent id='rating3' emptyTemplate= {this.template} enableAnimation= {false} enableSingleSelection= {true} value= {3.0}></RatingComponent>
                    </div>
                    <div className="rating-content">
                        <label>Customization</label><br/>
                        <RatingComponent id='rating4' cssClass='custom-icon' enableAnimation= {false} value= {3.0}></RatingComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates customization of rating items using templates in the Angular Rating component.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, rating item stars are customized using <code>emptyTemplate</code>, which defines the unrated items appearance, and <code>fullTemplate</code>, which defines the rated items appearance. 
                    </p>
                </div>
            </div> 
        )
    }
    private emptyFont(): JSX.Element {
        return (
            <span className='custom-font rating-icon-heart'></span>
        );
    }
    private fullFont(): JSX.Element {
        return (
            <span className='custom-font rating-icon-heart'></span>
        );
    }
    private emptyTemplate(): JSX.Element {
        return (
            <svg width="35" height="25" className="e-rating-svg-icon">
                <rect width="35" height="25" fill="transparent"  stroke-width="2" stroke="rgb(173,181,189)"/>
            </svg>
        );
    }
    private fullTemplate(props: any): JSX.Element {
        return (
            <svg width="35" height="25" className="e-rating-svg-icon">
                <defs>
                    <linearGradient id={`grad${props.index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop className="start" offset="0%" />
                        <stop className="end" offset="100%" />
                    </linearGradient>
                </defs>
                <rect width="35" height="25" fill={`url(#grad${props.index})`} stroke-width="2" stroke="rgb(173,181,189)"/>
            </svg>
        );
    }
    private template(props: any): any {
        if(props.index==0){
            return (<span className='angry emoji'>&#128545;</span>);}
        else if(props.index==1){
             return (<span className='disagree emoji'>&#128577;</span>);}
        else if(props.index==2){
             return (<span className='neutral emoji'>&#128528;</span>);}
        else if(props.index==3){
                return (<span className='agree emoji'>&#128578;</span>);}
        else {
            return (<span className='happy emoji'>&#128512;</span>);}   
      }
}
