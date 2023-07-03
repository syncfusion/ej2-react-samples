import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScheduleComponent, TreeViewArgs, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, ResourceDetails, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth, ActionEventArgs, CellClickEventArgs } from '@syncfusion/ej2-react-schedule';
import './external-drag-drop.css';
import { extend, closest, remove, addClass } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import * as dataSource from './datasource.json';

/**
 * schedule resources group-editing sample
 */

const ExternalDragDrop = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let scheduleObj = useRef<ScheduleComponent>(null);
  let treeObj = useRef<TreeViewComponent>(null);
  let isTreeItemDropped: boolean = false;
  let draggedItemId: string = '';
  const allowDragAndDrops: boolean = true;
  const fields: Record<string, any> = { dataSource: (dataSource as Record<string, any>).waitingList, id: 'Id', text: 'Name' };
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).hospitalData, null, true) as Record<string, any>[];
  const departmentData: Record<string, any>[] = [
    { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
    { Text: 'DENTAL', Id: 2, Color: '#9e5fff' }
  ];
  const consultantData: Record<string, any>[] = [
    { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Cardiologist' },
    { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Orthodontist' },
    { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Optometrist' },
    { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Periodontist' },
    { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Orthopedic' },
    { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Endodontist' }
  ];

  const getConsultantName = (value: ResourceDetails | TreeViewArgs): string => {
    return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
  }

  const getConsultantImage = (value: ResourceDetails): string => {
    return getConsultantName(value).toLowerCase();
  }

  const getConsultantDesignation = (value: ResourceDetails): string => {
    return (value as ResourceDetails).resourceData.Designation as string;
  }

  const resourceHeaderTemplate = (props: any)  => {
    return (
      <div className="template-wrap">
        <div className="specialist-category">
          <div className={"specialist-image " + getConsultantImage(props)}></div>
          <div className="specialist-name"> {getConsultantName(props)}</div>
          <div className="specialist-designation">{getConsultantDesignation(props)}</div>
        </div>
      </div>
    );
  }

  const treeTemplate = (props: any) => {
    return (
      <div id="waiting">
        <div id="waitdetails">
          <div id="waitlist">{props.Name}</div>
          <div id="waitcategory">{props.DepartmentName} - {props.Description}</div>
        </div>
      </div>
    );
  }

  const onItemSelecting = (args: any): void => {
    args.cancel = true;
  }

  const onTreeDrag = (event: any): void => {
    if (scheduleObj.current.isAdaptive) {
      let classElement: HTMLElement = scheduleObj.current.element.querySelector('.e-device-hover');
      if (classElement) {
        classElement.classList.remove('e-device-hover');
      }
      if (event.target.classList.contains('e-work-cells')) {
        addClass([event.target], 'e-device-hover');
      }
    }
  }

  const onActionBegin = (event: ActionEventArgs): void => {
    if (event.requestType === 'eventCreate' && isTreeItemDropped) {
      let treeViewData: Record<string, any>[] = treeObj.current.fields.dataSource as Record<string, any>[];
      const filteredPeople: Record<string, any>[] = treeViewData.filter((item: any) => item.Id !== parseInt(draggedItemId, 10));
      treeObj.current.fields.dataSource = filteredPeople;
      let elements: NodeListOf<HTMLElement> = document.querySelectorAll('.e-drag-item.treeview-external-drag');
      for (let i: number = 0; i < elements.length; i++) {
        remove(elements[i]);
      }
    }
  }

  const onTreeDragStop = (event: DragAndDropEventArgs): void => {
    let treeElement: Element = closest(event.target, '.e-treeview');
    let classElement: HTMLElement = scheduleObj.current.element.querySelector('.e-device-hover');
    if (classElement) {
      classElement.classList.remove('e-device-hover');
    }
    if (!treeElement) {
      event.cancel = true;
      let scheduleElement: Element = closest(event.target, '.e-content-wrap');
      if (scheduleElement) {
        let treeviewData: Record<string, any>[] = treeObj.current.fields.dataSource as Record<string, any>[];
        if (event.target.classList.contains('e-work-cells')) {
          const filteredData: Record<string, any>[] = treeviewData.filter((item: any) => item.Id === parseInt(event.draggedNodeData.id as string, 10));
          let cellData: CellClickEventArgs = scheduleObj.current.getCellDetails(event.target);
          let resourceDetails: ResourceDetails = scheduleObj.current.getResourcesByIndex(cellData.groupIndex);
          let eventData: Record<string, any> = {
            Name: filteredData[0].Name,
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            IsAllDay: cellData.isAllDay,
            Description: filteredData[0].Description,
            DepartmentID: resourceDetails.resourceData.GroupId,
            ConsultantID: resourceDetails.resourceData.Id
          };
          scheduleObj.current.openEditor(eventData, 'Add', true);
          isTreeItemDropped = true;
          draggedItemId = event.draggedNodeData.id as string;
        }
      }
    }
    document.body.classList.remove('e-disble-not-allowed');
  }

  const onTreeDragStart = () => {
    document.body.classList.add('e-disble-not-allowed');
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper drag-sample-wrapper'>
          <div className="schedule-container">
            <div className="title-container">
              <h1 className="title-text">Doctor's Appointments</h1>
            </div>
            <ScheduleComponent ref={scheduleObj} cssClass='schedule-drag-drop' width='100%' height='650px' selectedDate={new Date(2021, 7, 2)} currentView='TimelineDay' resourceHeaderTemplate={resourceHeaderTemplate} eventSettings={{ dataSource: data, fields: { subject: { title: 'Patient Name', name: 'Name' }, startTime: { title: "From", name: "StartTime" }, endTime: { title: "To", name: "EndTime" }, description: { title: 'Reason', name: 'Description' } } }} group={{ enableCompactView: false, resources: ['Departments', 'Consultants'] }} actionBegin={onActionBegin} >
              <ResourcesDirective>
                <ResourceDirective field='DepartmentID' title='Department' name='Departments' allowMultiple={false} dataSource={departmentData} textField='Text' idField='Id' colorField='Color' />
                <ResourceDirective field='ConsultantID' title='Consultant' name='Consultants' allowMultiple={false} dataSource={consultantData} textField='Text' idField='Id' groupIDField="GroupId" colorField='Color' />
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='TimelineDay' />
                <ViewDirective option='TimelineMonth' />
              </ViewsDirective>
              <Inject services={[TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
          <div className="treeview-container">
            <div className="title-container">
              <h1 className="title-text">Waiting List</h1>
            </div>
            <TreeViewComponent ref={treeObj} cssClass='treeview-external-drag' dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>This example illustrates how to drag and drop the events from an external source into scheduler. Here, you can drag and drop the items from TreeView control into scheduler.</p>
      </div>
      <div id="description">
        <p>
          In this example, <code>resourceHeaderTemplate</code> is used to change the default appearance of the resource header
          column. Within the <code>actionBegin</code> event of scheduler, the dragged item from the TreeView control is removed,
          when it is being dragged and dropped onto the scheduler. When the item is being dropped onto the scheduler, the event editor is
          explicitly made to open with the target details by invoking the <code>openEditor</code> method of scheduler within the <code>nodeDragStop</code> event of TreeView.
        </p>
      </div>
    </div>
  );
}
export default ExternalDragDrop;