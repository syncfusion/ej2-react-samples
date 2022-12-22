import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './default.css';

export class Default extends SampleBase<{}, {}> {
  render() {
    return (
      <div className='control-pane'>
            <div id="default-rating-control">
                <div className="rating-content">
                    <label>Basic</label><br/>
                    <RatingComponent id='rating1'/>
                </div>
                <div className="rating-content">
                    <label>Reset</label><br/>
                    <RatingComponent id='rating2' allowReset = {true} value={3.0}></RatingComponent>
                </div>
                <div className="rating-content">
                    <label>ReadOnly</label><br/>
                    <RatingComponent id='rating3' readOnly={true} value={3.0}></RatingComponent>
                </div>
                <div className="rating-content">
                    <label>Disabled</label><br/>
                    <RatingComponent id='rating4' disabled={true} value={3.0}></RatingComponent>
                </div>
                <div className="rating-content">
                    <label>Single selection</label><br/>
                    <RatingComponent id='rating5' enableSingleSelection={true} value={3.0}></RatingComponent>
                </div>
                <div className="rating-content">
                    <label>Item count</label><br/>
                    <RatingComponent id='rating6' itemsCount={8} value={3.0}></RatingComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the default functionalities of the Rating component. The component lets a user provide a star rating or view other people's ratings on a numeric scale for any service provided, such as for movies, applications, or products. 
                </p>
            </div>
            <div id="description">
                <p>
                    This example showcases the usage of the <code>allowReset</code>, <code>readOnly</code>, <code>enableSingleSelection</code>, <code>itemsCount</code>, and <code>disabled</code> properties in the Angular Rating component.
                </p>
            </div>
      </div>
    )
  }
}
