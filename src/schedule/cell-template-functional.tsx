import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './cell-template.css';
import { updateSampleSection } from '../common/sample-base';

/**
 * Schedule cell template sample
 */

const CellTemplate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const getCellContent = (date: Date) => {
    if (date.getMonth() === 10 && date.getDate() === 23) {
      return '<img src= "src/schedule/images/thanksgiving-day.svg" /><div className="caption">Thanksgiving day</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 9) {
      return '<img src="src/schedule/images/get-together.svg" /><div className="caption">Party time</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 13) {
      return '<img src="src/schedule/images/get-together.svg" /><div className="caption">Party time</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 22) {
      return '<img src="src/schedule/images/birthday.svg" /><div className="caption">Happy birthday</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 24) {
      return '<img src="src/schedule/images/christmas-eve.svg" /><div className="caption">Christmas Eve</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 25) {
      return '<img src="src/schedule/images/christmas.svg" /><div className="caption">Christmas Day</div>';
    } else if (date.getMonth() === 0 && date.getDate() === 1) {
      return '<img src="src/schedule/images/newyear.svg" /><div className="caption">New Year\'s Day</div>';
    } else if (date.getMonth() === 0 && date.getDate() === 14) {
      return '<img src="src/schedule/images/get-together.svg" /><div className="caption">Get together</div>';
    } else {
      return '';
    }
  }
  const cellTemplate = (props) => {
    if (props.type === "monthCells") {
      return (<div className="templatewrap" dangerouslySetInnerHTML={{ __html: getCellContent(props.date) }}></div>);
    }
    return;
  }
  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent cssClass='cell-template' width='100%' height='650px' selectedDate={new Date(2021, 11, 15)} cellTemplate={cellTemplate}>
            <ViewsDirective>
              <ViewDirective option='Month' />
            </ViewsDirective>
            <Inject services={[Month, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div id='action-description'>
        <p>This demo illustrates how to customize the background of the specific date cells by adding images and custom text to it by using the cell template option.</p>
      </div>
      <div id='description'>
        <p>
          In this demo, the <code>cellTemplate</code> option which accepts the template string is used to customize the cell
          background with specific images and appropriate text on the given date values.
        </p>
      </div>
    </div>
  );
}
export default CellTemplate;