import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { updateSampleSection } from '../common/sample-base';
import { useRef, useState, useEffect } from 'react';
import './employee-shift-management.css';
import { ScheduleComponent, TimelineViews, Inject, ResourceDirective, ResourcesDirective, ViewsDirective, ViewDirective, Agenda, EventRenderedArgs, NavigatingEventArgs, ActionEventArgs, ToolbarItemsDirective, ToolbarItemDirective, CellClickEventArgs, PopupCloseEventArgs, EventClickArgs } from '@syncfusion/ej2-react-schedule';
import { closest, remove, Internationalization, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-react-popups';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ChipListComponent, ChipsDirective, ChipDirective, ClickEventArgs } from '@syncfusion/ej2-react-buttons';
import { Query } from '@syncfusion/ej2-data';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import * as dataSource from './datasource.json';

const imagePath = './src/schedule/images/';
const salamanImage = `${imagePath}salman@3x.png`;
const brianImage = `${imagePath}brian@3x.png`;
const jakeImage = `${imagePath}jake@3x.png`;
const jenniferImage = `${imagePath}Jennifer.png`;
const davidImage = `${imagePath}David.png`;
const williammImage = `${imagePath}William.png`;
const emmaImage = `${imagePath}Emma.png`;
const lilyImage = `${imagePath}Lily.png`;
const avaImage = `${imagePath}Ava.png`;
const graceImage = `${imagePath}Grace.png`;
const michaelImage = `${imagePath}Michael.png`;
const thomasImage = `${imagePath}Thomas.png`;
const rickyImage = `${imagePath}Ricky.png`;
const jamesImage = `${imagePath}James.png`;
const benjaminImage = `${imagePath}Benjamin.png`;
const oliviaImage = `${imagePath}Olivia.png`;
const chloeImage = `${imagePath}Chloe.png`;

type EmployeeName = 'mark' | 'brian' | 'kevin' | 'salman' | 'olivia' | 'zoe' | 'ricky' | 'jake';
type ImageMap = Record<EmployeeName, string>;

let isDraggedItemDropped: boolean = false;
let currentChipIndex: number = 0;
let previousChipIndex: number = 0;

const EmployeeShiftManagement = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const scheduleRef = useRef<ScheduleComponent>(null);
  const shiftDropdownListRef = useRef<DropDownListComponent>(null);
  const agendaToolbarRef = useRef<ReactDOM.Root | null>(null);
  const tooltipRootsMapRef = useRef(new Map());
  const dropdownListRef = useRef<DropDownListComponent>(null);
  const allStaffsTreeRef = useRef<TreeViewComponent>(null);
  const doctorsTreeRef = useRef<TreeViewComponent>(null);
  const nursesTreeRef = useRef<TreeViewComponent>(null);
  const staffsTreeRef = useRef<TreeViewComponent>(null);
  const externalChipsRef = useRef<ChipListComponent>(null);
  const toolbarChipsRef = useRef<ChipListComponent>(null);

  const intl = new Internationalization();
  const eventsData = extend([], (dataSource as Record<string, any>).employeeShiftData, null, true) as Record<string, any>[];
  const selectedDate = new Date(2025, 2, 5);
  const styleNone = { display: "none" };
  const animationSettings: AnimationSettingsModel = { effect: 'None' };
  const group = { resources: ['Roles', 'Designations'] };
  const workHours = { start: '00:00', end: '23:59' };
  const allowDragAndDrop = true;
  const filteredQuery = new Query();
  const rolesData = ['', 'Doctors', 'Nurses', 'Support Staffs'];

  const [employeeNamesList, setEmployeeNamesList] = useState<any[]>([]);
  const [shiftList, setShiftList] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [requestedShift, setRequestedShift] = useState<any>(null);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [shiftsData, setShiftsData] = useState<any[]>([]);
  const [draggedItemId, setDraggedItemId] = useState<string>('');

  // Static Data
  const imageMap: ImageMap = {
    mark: `${imagePath}will-smith.png`,
    brian: brianImage,
    kevin: `${imagePath}alice.png`,
    salman: salamanImage,
    olivia: `${imagePath}margaret.png`,
    zoe: `${imagePath}laura.png`,
    ricky: rickyImage,
    jake: jakeImage,
  };

  const employeeRole = [
    { role: 'Doctors', id: 1 },
    { role: 'Nurses', id: 2 },
    { role: 'Support Staffs', id: 3 }
  ];

  const designationsData = [
    { name: 'Attending Physician', id: 1, groupId: 1 },
    { name: 'Hospitalist', id: 2, groupId: 1 },
    { name: 'General Pediatrician', id: 3, groupId: 1 },
    { name: 'Resident Doctor', id: 4, groupId: 1 },
    { name: 'Senior Nurse', id: 5, groupId: 2 },
    { name: 'Nurse Practitioner', id: 6, groupId: 2 },
    { name: 'Medical Assistant', id: 7, groupId: 3 },
    { name: 'Receptionist', id: 8, groupId: 3 }
  ];

  const employeeImages = [
    { name: 'John', image: `${imagePath}robert.png` },
    { name: 'Nashil', image: `${imagePath}nancy.png` },
    { name: 'Jennifer', image: jenniferImage },
    { name: 'William', image: williammImage },
    { name: 'David', image: davidImage },
    { name: 'Michael', image: michaelImage },
    { name: 'Thomas', image: thomasImage },
    { name: 'Daniel', image: `${imagePath}robson.png` },
    { name: 'Mark', image: `${imagePath}will-smith.png` },
    { name: 'Brian', image: brianImage },
    { name: 'Kevin', image: `${imagePath}alice.png` },
    { name: 'Salman', image: salamanImage },
    { name: 'Emma', image: emmaImage },
    { name: 'Lily', image: lilyImage },
    { name: 'Ava', image: avaImage },
    { name: 'Grace', image: graceImage },
    { name: 'Olivia', image: `${imagePath}margaret.png` },
    { name: 'Zoe', image: `${imagePath}laura.png` },
    { name: 'James', image: jamesImage },
    { name: 'Benjamin', image: benjaminImage },
    { name: 'Olivia', image: oliviaImage },
    { name: 'Chloe', image: chloeImage },
    { name: 'Ricky', image: rickyImage },
    { name: 'Jake', image: jakeImage }
  ];

  const doctorsData = [
    { Id: 1, Name: "Mark", Description: 'Attending Physician', role: 'Doctors' },
    { Id: 2, Name: "Brian", Description: 'Hospitalist', role: 'Doctors' },
    { Id: 3, Name: "Kevin", Description: 'General Pediatrician', role: 'Doctors' },
    { Id: 4, Name: "Salman", Description: 'Resident Doctor', role: 'Doctors' }
  ];

  const nursesData = [
    { Id: 5, Name: "Olivia", Description: 'Senior Nurse', role: 'Nurses' },
    { Id: 6, Name: "Zoe", Description: 'Nurse Practitioner', role: 'Nurses' }
  ];

  const staffsData = [
    { Id: 7, Name: "Ricky", Description: 'Medical Assistant', role: 'Support Staffs' },
    { Id: 8, Name: "Jake", Description: 'Receptionist', role: 'Support Staffs' }
  ];

  const [allData, setAllData] = useState(() => doctorsData.concat(nursesData, staffsData));

  // Fields for TreeView
  const allStaffsTreeFields = { dataSource: allData, id: 'Id', text: 'Name' };
  const doctorsTreeFields = { dataSource: doctorsData, id: 'Id', text: 'Name' };
  const nursesTreeFields = { dataSource: nursesData, id: 'Id', text: 'Name' };
  const staffsTreeFields = { dataSource: staffsData, id: 'Id', text: 'Name' };

  // Time scale setup
  const majorSlotTemplate = (props: any): JSX.Element => {
    return (<div>{props.date.getHours() === 7 ? 'Morning Shift' : 'Evening Shift'}</div>);
  };

  const timeScale = {
    interval: 480,
    slotCount: 3,
    majorSlotTemplate: majorSlotTemplate
  };

  const getTimeString = (value: Date): string => {
    return intl.formatDate(value, { skeleton: 'h' });
  };

  const getShortTimeString = (value: Date): string => {
    return intl.formatDate(value, { type: 'time', skeleton: 'short' });
  };

  const getDayString = (value: Date): string => {
    return intl.formatDate(value, { skeleton: 'E' });
  };

  const filterData = (dataSource: any, value: string) => {
    return dataSource.filter((data: any) => data.role === value);
  };

  // Button actions for the Shift Swap dialog
  const getButtons = (): ButtonPropsModel[] => {
    return [
      {
        click: () => {
          setDialogVisible(false);
        },
        buttonModel: {
          content: 'Cancel',
        }
      },
      {
        click: () => {
          let dataSource: Record<string, any>[] = scheduleRef.current!.eventSettings.dataSource as Record<string, any>[];
          let requestingEventIndex: number = 0;
          let requestedShiftId: string | number = requestedShift!.id;
          let requestingEvent = dataSource.filter((item, index) => {
            if (item.Id === requestedShiftId) {
              requestingEventIndex = index;
              return true;
            }
            return false;
          });
          let approvedEventIndex: number = 0;
          let accShiftIds: number = selectedShift.eventId;
          let approvedEvent = dataSource.filter((item, index) => {
            if (item.Id === accShiftIds) {
              approvedEventIndex = index;
              return true;
            }
            return false;
          });
          requestingEvent[0].Description = requestingEvent[0].Description.replace(' - Swap-Request', '');
          requestingEvent[0].Subject = requestedShift.name + ' swapped the shift with ' + selectedEmployee.name + "'s shift scheduled from " + (intl.formatDate(new Date(approvedEvent[0].StartTime), { skeleton: 'MMMd' }) + ', ' + getTimeString(new Date(approvedEvent[0].StartTime)) + ' to ' + getTimeString(new Date(approvedEvent[0].EndTime)));
          dataSource[requestingEventIndex] = requestingEvent[0];
          approvedEvent[0].Description = approvedEvent[0].Description.replace(' - Swap-Request', '');
          approvedEvent[0].Subject = selectedEmployee.name + ' swapped the shift with ' + requestedShift.name + "'s shift scheduled from " + (intl.formatDate(new Date(requestingEvent[0].StartTime), { skeleton: 'MMMd' }) + ', ' + getTimeString(new Date(requestingEvent[0].StartTime)) + ' to ' + getTimeString(new Date(requestingEvent[0].EndTime)));
          dataSource[approvedEventIndex] = approvedEvent[0];
          scheduleRef.current!.eventSettings.dataSource = dataSource;
          scheduleRef.current!.refreshEvents();
          setEmployeeNamesList([]);
          setShiftList([]);
          setDialogVisible(false);
        },
        buttonModel: {
          content: 'Swap Shift',
          disabled: isNullOrUndefined((shiftDropdownListRef?.current as any)?.value) ? true : false
        },
      },
    ];
  };

  const dialogClose = (): void => {
    setEmployeeNamesList([]);
    setShiftList([]);
    setDialogVisible(false);
  }

  const dialogOpen = (): void => {
    setDialogVisible(true);
  }

  const requestShiftSwap = (args: { element: HTMLElement }): void => {
    const eventsData: Record<string, any>[] = scheduleRef.current!.eventSettings.dataSource as Record<string, any>[];
    const appointmnet: HTMLElement = (args.element && args.element.classList.contains('e-appointment') ?
      args.element : closest(args.element, '.e-appointment')) as HTMLElement;
    if (!eventsData || !appointmnet) {
      return;
    }
    const tooltipData = tooltipRootsMapRef.current.get(appointmnet);
    if (tooltipData) {
      tooltipData.root.unmount();
      tooltipData.container.remove();
      tooltipRootsMapRef.current.delete(appointmnet);
    }
    const eventDetails: Record<string, any> = scheduleRef.current!.getEventDetails(appointmnet);
    if (!eventDetails) {
      return;
    }
    const roleId: string = eventDetails.RoleId;
    const designationId: string = eventDetails.DesignationId;
    const employeeName: string = eventDetails.Subject;
    let employeesData: { id: string; name: string; employeeId: string }[] = [];
    let newShiftsData: { id: number; name: string; designationId: string; employeeId: string; eventId: string }[] = [];
    let filteredData: Record<string, any>[] = eventsData.filter((item) =>
      item.Description.toLowerCase().includes('swap-request') &&
      item.RoleId === roleId &&
      item.DesignationId === designationId &&
      item.Subject !== employeeName
    );
    filteredData.forEach((item) => {
      if (employeesData.length === 0 || !employeesData.some((EmpItem) => EmpItem.name === item.Subject)) {
        employeesData.push({ id: item.DesignationId, name: item.Subject, employeeId: item.EmployeeId });
      }
      newShiftsData.push({
        id: newShiftsData.length + 1,
        name: `${intl.formatDate(new Date(item.StartTime), { skeleton: 'MMMd' })} ${getDayString(new Date(item.StartTime))} ${getShortTimeString(new Date(item.StartTime))} - ${getShortTimeString(new Date(item.EndTime))}`,
        designationId: item.DesignationId,
        employeeId: item.EmployeeId,
        eventId: item.Id,
      });
    });
    setRequestedShift({ id: eventDetails.Id, name: employeeName });
    setShiftsData(newShiftsData);
    setEmployeeNamesList(employeesData);
    setDialogVisible(true);
  };

  const employeeNameChange = (args: ChangeEventArgs): void => {
    if (args.itemData) {
      let shiftColl = shiftsData.filter((item: any) =>
        item.designationId === (args.itemData as any).id &&
        item.employeeId === (args.itemData as any).employeeId
      );
      setShiftList(shiftColl);
      setSelectedEmployee(args.itemData);
    }
  };

  const shiftChange = (args: ChangeEventArgs): void => {
    setSelectedShift(args.itemData);
  };

  // Generating appointment element
  const getEventElement = (props: any, element: HTMLElement): HTMLElement => {
    const { Subject = '', Description = '', StartTime, EndTime } = props;
    const isSwappedEvent: boolean = Subject.includes('swapped');
    let isLeaveReplacedEvent: boolean = Subject.includes('covers for');
    const isLeave = Description.toLowerCase().includes('leave') && !isLeaveReplacedEvent;
    let employeeName: string = isLeaveReplacedEvent ? Subject.split('covers for')[0].trim() : (isSwappedEvent ? Subject.match(/with ([A-Za-z]+)'s shift/)[1] : Subject);
    let matchedEmployee: { name: string, image: string; }[] = employeeImages.filter(
      (item) => (item as any).name === employeeName
    ) as { name: string, image: string; }[];
    let imageUrl = matchedEmployee[0]?.image;
    // Create the main wrapper div
    const templateWrap = document.createElement('div');
    templateWrap.className = 'template-wrap';
    // Create the staff container div
    const staffWrap = document.createElement('div');
    staffWrap.className = 'e-staff';
    // Create the staff image div
    const staffImage = document.createElement('img');
    staffImage.className = 'staff-image';
    staffImage.src = imageUrl;
    // Create the staff info div
    const staffInfo = document.createElement('div');
    staffInfo.className = 'staff-info';
    // Create and append the staff name
    const name = document.createElement('div');
    name.className = 'e-name';
    name.innerHTML = isLeave ? Description.split('(')[0].trim() : employeeName;
    // Create and append the staff designation
    const designation = document.createElement('div');
    designation.className = 'e-designation';
    designation.textContent = getTimeString(props.StartTime) + ' - ' + getTimeString(props.EndTime);
    // Append name and designation to staffInfo
    staffInfo.appendChild(name);
    staffInfo.appendChild(designation);
    // Append staffImage and staffInfo to staffWrap
    staffWrap.appendChild(staffImage);
    staffWrap.appendChild(staffInfo);
    // Append staffWrap to templateWrap
    templateWrap.appendChild(staffWrap);
    // Return the full element
    return templateWrap;
  };

  const onEventRendered = (args: EventRenderedArgs): void => {
    const data: any = args.data;
    const element: HTMLElement = args.element;
    const startHour = data.StartTime.getHours();
    element.classList.add(startHour === 7 ? 'morning-shift' : 'evening-shift');
    const innerWrap: any = element.querySelector('.e-inner-wrap');
    if (innerWrap) {
      innerWrap.innerHTML = '';
      const elementToAppend = getEventElement(data, element);
      const appointmentWidth: number = parseInt(element.style.width.split('px')[0], 10) - 5;
      element.style.width = `${appointmentWidth}px`;
      innerWrap.appendChild(elementToAppend);
      if (!element.classList.contains('e-read-only')) {
        const groupIndex: number = parseInt(element.getAttribute('data-group-index') as string, 10);
        const classToAdd = groupIndex === 0 ? 'doctors-event' :
          groupIndex === 1 ? 'nurses-event' : 'staffs-event';
        element.classList.add(classToAdd);
      }
    }
    // Handling tooltips
    const appendTooltipIcon = (iconClass: string, tooltipText: string, onClick?: (e: Event) => void): void => {
      let reactContainer: HTMLElement | null = element.querySelector('.e-icon-element');
      if (!reactContainer) {
        reactContainer = document.createElement('span');
        reactContainer.className = 'e-icon-element';
        element.appendChild(reactContainer);
      }
      const IconWithTooltipRenderer: React.FC = () => {
        const iconRef = React.useRef<HTMLSpanElement>(null);
        React.useEffect(() => {
          const el = iconRef.current;
          if (el && onClick) {
            el.addEventListener('click', (e: Event) => {
              e.preventDefault();
              e.stopPropagation();
              onClick(e);
            });
            return () => el.removeEventListener('click', onClick);
          }
        }, []);
        return (
          <TooltipComponent cssClass='shift-management-tooltip' content={tooltipText} position='RightCenter'>
            <span
              ref={iconRef}
              className={`e-icons ${iconClass}`}
              style={{ cursor: 'pointer' }}
            ></span>
          </TooltipComponent>
        );
      };
      const root = ReactDOM.createRoot(reactContainer);
      root.render(<IconWithTooltipRenderer />);
      tooltipRootsMapRef.current.set(element, { root, container: reactContainer });
    };
    // Handling leave events
    if (data.Description?.toLowerCase().includes('leave')) {
      element.classList.add('event-leave');
      if (scheduleRef.current!.currentView !== 'Agenda') {
        appendTooltipIcon(
          'e-leave',
          `${data.Subject} is on leave. To cover this shift, drag a staff member with the same designation from the available list and drop them here.`
        );
      }
    }
    // Handling leave replaced events
    if (data.Subject?.includes('covers for')) {
      element.classList.add('e-covers');
      element.classList.remove('event-leave');
      if (scheduleRef.current!.currentView !== 'Agenda') {
        appendTooltipIcon(
          'e-replaced sf-employee-shift-icons-user-replace',
          'Leave covered by replacement'
        );
      }
    }
    // Handling swap request events
    if (data.Description?.toLowerCase().includes('swap-request') &&
      !data.Subject?.toLowerCase().includes('swapped') &&
      scheduleRef.current!.currentView !== 'Agenda') {
      element.classList.add('event-swap');
      appendTooltipIcon('e-swap sf-employee-shift-icons-replace-request', 'Click here to swap shift',
        (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          const target = event.target as HTMLElement;
          if (target.classList.contains('sf-employee-shift-icons-replace-request') ||
            target.classList.contains('e-swap') ||
            target.closest('.e-icons')) {
            requestShiftSwap(args as { element: HTMLElement });
          }
        }
      );
    }
    // Handling shift swapped events
    if (data.Subject?.toLowerCase().includes('swapped')) {
      element.classList.remove('event-swap');
      element.classList.add('event-swapped');
      if (scheduleRef.current!.currentView !== 'Agenda') {
        appendTooltipIcon('e-swapped sf-employee-shift-icons-replace-accepted', 'This shift has been swapped');
      }
    }
  };

  const treeTemplate = (props: any): JSX.Element => {
    return (
      <div id="waiting">
        <div id="waitdetails">
          <img className="employee-image" src={imageMap[props.Name.toLowerCase() as EmployeeName]} alt="Employee" />
          <div className="text-container">
            <div id="waitlist">{props.Name}</div>
            <div id="waitcategory">{props.Description}</div>
          </div>
        </div>
      </div>
    );
  };

  const onTreeDragStop = (event: any): void => {
    let classElement = scheduleRef.current!.element.querySelector('.e-device-hover');
    if (classElement) {
      classElement.classList.remove('e-device-hover');
    }
    event.cancel = true;
    let scheduleElement = closest(event.target, '.e-content-wrap');
    if (scheduleElement) {
      let treeviewData = allStaffsTreeRef.current!.fields.dataSource;
      let target = closest(event.target, '.e-appointment.event-leave');
      if (target) {
        const filteredData = (treeviewData as any).filter((item: { Id: number; }) =>
          item.Id === parseInt(event.draggedNodeData.id, 10)
        );
        let eventDetails = { ...scheduleRef.current!.getEventDetails(target) };
        const role = employeeRole.filter((item: any) =>
          item.id === parseInt(eventDetails.RoleId, 10)
        )[0].role;
        const designation = designationsData.filter((item) =>
          item.id === parseInt(eventDetails.DesignationId, 10)
        )[0].name;
        if (role === filteredData[0].role && designation === filteredData[0].Description) {
          eventDetails.Subject = filteredData[0].Name + ' covers for ' + eventDetails.Subject;
          eventDetails.Designation = filteredData[0].Description;
          isDraggedItemDropped = true;
          scheduleRef.current!.openEditor(eventDetails, 'EditOccurrence');
        }
      }
    }
    document.body.classList.remove('e-disble-not-allowed');
  };

  const onTreeDragStart = (args: any): void => {
    setDraggedItemId(args.draggedNodeData.id);
    document.body.classList.add('e-disble-not-allowed');
  };

  const createAgendaToolbar = (): void => {
    const scheduleToolbar = scheduleRef.current!.element.querySelector('.e-schedule-toolbar-container') as HTMLElement;
    if (!scheduleToolbar) return;
    let existingToolbar = scheduleToolbar.querySelector('.agenda-toolbar');
    if (existingToolbar) return;
    const toolbarElement = document.createElement('div');
    toolbarElement.id = 'agenda-toolbar-container';
    scheduleToolbar.appendChild(toolbarElement);
    const toolbarJSX = (
      <ToolbarComponent
        cssClass='agenda-toolbar'
        overflowMode="Scrollable"
        width="100%">
        <ItemsDirective>
          <ItemDirective cssClass='tooltip-chips' type="Input" template={getAgendaToolbarChips} overflow="Show" align="Left" />
          <ItemDirective cssClass='tooltip-ddl' type="Input" template={getAgendaToolbarDropDownList} overflow="Show" align="Right" />
        </ItemsDirective>
      </ToolbarComponent>
    );
    const root = ReactDOM.createRoot(toolbarElement);
    root.render(toolbarJSX);
    agendaToolbarRef.current = root;
  };

  const handleChipBeforeClick = (args: ClickEventArgs, isExternalChipClick?: boolean): void => {
    currentChipIndex = args.index;
    previousChipIndex = (isExternalChipClick ? (externalChipsRef.current?.selectedChips) : (toolbarChipsRef.current?.selectedChips)) as number;
    if (currentChipIndex === previousChipIndex) {
      args.cancel = true;
    }
  };

  const chipClick = (args: ClickEventArgs): void => {
    currentChipIndex = (externalChipsRef.current?.selectedChips ?? 0) as any;
    let treeRefs = [allStaffsTreeRef, doctorsTreeRef, nursesTreeRef, staffsTreeRef];
    const previousTree = treeRefs[previousChipIndex]?.current;
    const activeTree = treeRefs[currentChipIndex]?.current;
    if (previousTree?.element) {
      previousTree.element.style.display = 'none';
    }
    if (activeTree?.element) {
      activeTree.element.style.display = '';
      activeTree.fields.dataSource = currentChipIndex === 0 ?
        allData :
        filterData(allData, rolesData[currentChipIndex]);
    }
  };

  const onNavigating = (args: NavigatingEventArgs): void => {
    const scheduleToolbar = scheduleRef.current!.element.querySelector('.e-schedule-toolbar-container') as HTMLElement;
    if (!scheduleToolbar || args.action !== 'view') return;
    if (args.currentView === 'Agenda') {
      createAgendaToolbar();
    } else {
      const toolbarContainer = scheduleToolbar.querySelector('#agenda-toolbar-container');
      if (toolbarContainer) {
        if (agendaToolbarRef.current) {
          agendaToolbarRef.current.unmount();
        }
        toolbarContainer.remove();
      }
      if (scheduleRef.current!.eventSettings.query) {
        scheduleRef.current!.eventSettings.query.queries = [];
      }
    }
  };

  const onDropDownListChange = (args: ChangeEventArgs): void => {
    const employeeName = args.itemData?.value;
    const query = employeeName ? new Query().where('Subject', 'contains', employeeName as string, true) : new Query().where('RoleId', 'contains', toolbarChipsRef.current!.selectedChips as number || '', true);
    scheduleRef.current!.eventSettings.query = query;
    dropdownListRef.current!.focusIn();
  };

  const onDropDownListBeforeOpen = (): void => {
    const activeChipIndex = toolbarChipsRef.current?.selectedChips;
    const allEvents: Record<string, any>[] = scheduleRef.current!.eventSettings.dataSource as Record<string, any>[];
    const relevantEvents = activeChipIndex === 0
      ? allEvents
      : allEvents.filter((item) => item.RoleId === activeChipIndex);
    const uniqueSubjects = Array.from(
      new Set(
        relevantEvents
          .map((obj) => obj.Subject)
          .filter(subject =>
            !subject.toLowerCase().includes('covers') &&
            !subject.toLowerCase().includes('swapped')
          )
      )
    );
    dropdownListRef.current!.dataSource = uniqueSubjects;
  };

  const getAgendaToolbarChips = (): JSX.Element => {
    return (
      <div>
        <ChipListComponent
          ref={toolbarChipsRef}
          id="chip-avatar"
          selection="Single"
          cssClass="e-outline"
          selectedChips={[0]}
          aria-labelledby="choiceChips"
          beforeClick={(args) => handleChipBeforeClick(args)}
          click={agendaChipsClick}
        >
          <ChipsDirective>
            <ChipDirective text="All" />
            <ChipDirective text="Doctors" />
            <ChipDirective text="Nurses" />
            <ChipDirective text="Staffs" />
          </ChipsDirective>
        </ChipListComponent>
      </div>
    );
  };

  const getAgendaToolbarDropDownList = (): JSX.Element => {
    return (
      <div style={{ width: '230px' }}>
        <DropDownListComponent
          ref={dropdownListRef}
          dataSource={[]}
          value=''
          change={onDropDownListChange}
          placeholder="Select an employee"
          popupHeight="220px"
          showClearButton={true}
          beforeOpen={onDropDownListBeforeOpen}
        />
      </div>
    );
  };

  const agendaChipsClick = (args: ClickEventArgs): void => {
    dropdownListRef.current!.dataSource = [];
    dropdownListRef.current!.value = null;
    dropdownListRef.current!.dataBind();
    dropdownListRef.current!.focusOut();
    const query = new Query().where('RoleId', 'contains', args.index || '', true);
    scheduleRef.current!.eventSettings.query = query;
  };

  const editorHeaderTemplate = (props: any): JSX.Element => {
    return (
      <div id="event-header">Leave Replacement</div>
    );
  };

  const agendaTemplate = (props: any): JSX.Element => {
    const roleItem: any = employeeRole.find((item) => item.id === parseInt(props.RoleId, 10));
    const designationItem: any = designationsData.find((item) => item.id === parseInt(props.DesignationId, 10));
    const role: string = roleItem?.role;
    const designation: string = designationItem?.name;
    const isEmployeeLeave: boolean = props.Description.toLowerCase().includes('leave');
    return (
      <div className="agenda-event">
        <div className='e-staff'>
          <div className='staff-image'>
            {props.Subject.charAt(0)}
          </div>
          <div className='event-details'>
            <div className="staff-info">
              <span className='staff-name'>{props.Subject} </span>
              <span className='staff-role'>{role} </span>
              <span className="staff-designation">
                ({designation}){isEmployeeLeave ? ' - ' : ''}
              </span>
              {isEmployeeLeave && (
                <span className="staff-availability">On Leave</span>
              )}
            </div>
            <div className="event-time">Shift Time: {getTimeString(props.StartTime) + ' - ' + getTimeString(props.EndTime)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const onPopupOpen = (args: any): void => {
    const isEditorPopup = args.type === 'Editor';
    if (isEditorPopup) {
      if (!isDraggedItemDropped) {
        args.cancel = true;
        return;
      }
      args.element.classList.add('shift-management-editor-popup');
    }
  };

  const onPopupClose = (args: PopupCloseEventArgs): void => {
    if (args.type === 'Editor') {
      if ((args.event.target as HTMLElement).classList.contains('e-event-save')) {
        let treeRefs = [allStaffsTreeRef, doctorsTreeRef, nursesTreeRef, staffsTreeRef];
        const activeTreeRef = treeRefs[currentChipIndex];
        const treeObj = activeTreeRef?.current;
        if (treeObj && draggedItemId) {
          const draggedId = parseInt(draggedItemId, 10);
          // Remove dragged item from treeView dataSource
          const updatedTreeData = (treeObj.fields.dataSource as any[]).filter((item) => item.Id !== draggedId);
          treeObj.fields.dataSource = updatedTreeData;
          // Remove dragged DOM elements
          document.querySelectorAll('.e-drag-item.shift-management-treeview').forEach(el => remove(el));
          // Remove from allData
          setAllData(prevData => prevData.filter(item => item.Id !== draggedId));
          // Update Description
          if (args.data?.Description?.includes('Leave')) {
            args.data.Description.replace('Leave ', 'Available ');
          }
        }
      }
      isDraggedItemDropped = false;
    }
  };

  const onCellClick = (args: CellClickEventArgs): void => {
    args.cancel = true;
  }

  const onEventClick = (args: EventClickArgs): void => {
    if ((args.event as Record<string, any>).IsReadonly) {
      args.cancel = true;
    }
  }

  const setAgendaContentHeight = (): void => {
    const agendaContentElement: HTMLElement = scheduleRef.current!.element.querySelector('.e-table-wrap.e-agenda-view .e-schedule-table .e-content-wrap');
    if (agendaContentElement) {
      const agendaToolbarHeight: string = '72px';
      agendaContentElement.style.height = (parseFloat(agendaContentElement.style.height) - parseFloat(agendaToolbarHeight)) + 'px';
    }
  }

  const onActionComplete = (args: ActionEventArgs): void => {
    if (args.requestType === 'viewNavigate' || args.requestType === 'dateNavigate') {
      setAgendaContentHeight();
    } else if (args.requestType === "toolBarItemRendered" && scheduleRef.current!.currentView === 'Agenda') {
      createAgendaToolbar();
      setTimeout(() => {
        setAgendaContentHeight();
      });
    }
  }

  return (
    <div className='schedule-control-section shift-management-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper shift-management-sample-wrapper'>
          <ScheduleComponent
            id='schedule'
            ref={scheduleRef}
            currentView="TimelineWeek"
            selectedDate={selectedDate}
            cssClass='schedule-shift-management'
            width='100%'
            height='550px'
            group={group}
            startHour="07:00"
            endHour='23:00'
            eventSettings={{ dataSource: eventsData, query: filteredQuery }}
            timeScale={timeScale}
            workHours={workHours}
            showTimeIndicator={true}
            eventRendered={onEventRendered}
            navigating={onNavigating}
            editorHeaderTemplate={editorHeaderTemplate}
            popupOpen={onPopupOpen}
            popupClose={onPopupClose}
            cellClick={onCellClick}
            eventClick={onEventClick}
            actionComplete={onActionComplete}
          >
            <ViewsDirective>
              <ViewDirective option="TimelineWeek" />
              <ViewDirective option='Agenda' eventTemplate={agendaTemplate} />
            </ViewsDirective>
            <ResourcesDirective>
              <ResourceDirective field="RoleId" title="Roles" name="Roles" allowMultiple={false} dataSource={employeeRole} textField="role" idField="id" />
              <ResourceDirective field="DesignationId" title="Designations" name="Designations" allowMultiple={false} dataSource={designationsData} textField="name" idField="id" groupIDField="groupId" />
            </ResourcesDirective>
            <Inject services={[TimelineViews, Agenda]} />
            <ToolbarItemsDirective>
              <ToolbarItemDirective name='Previous' align='Left'></ToolbarItemDirective>
              <ToolbarItemDirective name='Next' align='Left'></ToolbarItemDirective>
              <ToolbarItemDirective name='DateRangeText' align='Left'></ToolbarItemDirective>
              <ToolbarItemDirective name='Views' align='Right'></ToolbarItemDirective>
            </ToolbarItemsDirective>
          </ScheduleComponent>
          <div className='treeview-container'>
            <div className="title-text"><span>Available List</span></div>
            <div className="role-tabs">
              <ChipListComponent
                ref={externalChipsRef}
                id="chip-avatar"
                selection="Single"
                cssClass="e-outline"
                selectedChips={[0]}
                aria-labelledby="choiceChips"
                beforeClick={(args) => handleChipBeforeClick(args, true)}
                click={chipClick}
              >
                <ChipsDirective>
                  <ChipDirective text="All" />
                  <ChipDirective text="Doctors" />
                  <ChipDirective text="Nurses" />
                  <ChipDirective text="Staffs" />
                </ChipsDirective>
              </ChipListComponent>
            </div>
            <TreeViewComponent
              ref={allStaffsTreeRef}
              id="allStaffsTreeview"
              cssClass='shift-management-treeview'
              style={{ display: 'block' }}
              dragArea=".shift-management-sample-wrapper"
              nodeTemplate={treeTemplate}
              fields={allStaffsTreeFields}
              nodeDragStop={onTreeDragStop}
              nodeDragStart={onTreeDragStart}
              allowDragAndDrop={allowDragAndDrop}
            />
            <TreeViewComponent
              ref={doctorsTreeRef}
              id="doctorsTreeview"
              cssClass='shift-management-treeview'
              style={styleNone}
              dragArea=".shift-management-sample-wrapper"
              nodeTemplate={treeTemplate}
              fields={doctorsTreeFields}
              nodeDragStop={onTreeDragStop}
              nodeDragStart={onTreeDragStart}
              allowDragAndDrop={allowDragAndDrop}
            />
            <TreeViewComponent
              ref={nursesTreeRef}
              id="nursesTreeview"
              cssClass='shift-management-treeview'
              style={styleNone}
              dragArea=".shift-management-sample-wrapper"
              nodeTemplate={treeTemplate}
              fields={nursesTreeFields}
              nodeDragStop={onTreeDragStop}
              nodeDragStart={onTreeDragStart}
              allowDragAndDrop={allowDragAndDrop}
            />
            <TreeViewComponent
              ref={staffsTreeRef}
              id="staffsTreeview"
              cssClass='shift-management-treeview'
              style={styleNone}
              dragArea=".shift-management-sample-wrapper"
              nodeTemplate={treeTemplate}
              fields={staffsTreeFields}
              nodeDragStop={onTreeDragStop}
              nodeDragStart={onTreeDragStart}
              allowDragAndDrop={allowDragAndDrop}
            />
          </div>
          <div id="target" style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            display: dialogVisible ? 'block' : 'none'
          }}>
            <DialogComponent
              id="modalDialog"
              cssClass='swap-dialog'
              height='240px'
              width='378px'
              isModal={true}
              buttons={getButtons()}
              header="Shift swap"
              visible={dialogVisible}
              showCloseIcon={true}
              animationSettings={animationSettings}
              open={dialogOpen}
              close={dialogClose}
            >
              <div className='e-shift-swap'>
                <div>
                  <label>Select an employee(Available for swapping)</label>
                  <DropDownListComponent
                    dataSource={employeeNamesList}
                    fields={{ text: 'name', value: 'id' }}
                    change={employeeNameChange}
                    placeholder="Select an employee"
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label>Select shift</label>
                  <DropDownListComponent
                    ref={shiftDropdownListRef}
                    dataSource={shiftList}
                    fields={{ text: 'name', value: 'id' }}
                    placeholder="Select shift"
                    change={shiftChange}
                  />
                </div>
              </div>
            </DialogComponent>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>This demo shows efficient employee shift management using the Scheduler, including shift scheduling, swapping, highlighting staff unavailability, and seamlessly assigning leave replacements using drag-and-drop.</p>
      </div>
      <div id="description">
        <p>In this demo, employees are categorized by roles (Doctors, nurses, and support staff) and designations, with two daily shifts: Morning (7 AM – 3 PM) and Evening (3 PM – 11 PM). Past shifts are disabled for clarity.</p>
        <p>
          <strong>Shift Swapping</strong>
        </p>
        <p>Shifts can be swapped between employees with the same designation using the swap request icon. The updated shift is highlighted with a swap icon, and details are available in the quick info popup.</p>
        <p>
          <strong>Leave Replacement</strong>
        </p>
        <p>To cover leave, drag and drop available staff from the same designation. The appointment updates with a replacement icon, and details appear in the quick info popup.</p>
        <p>
          <strong>Filtering</strong>
        </p>
        <p>Filter shifts by role or employee name in the agenda view to check staff availability and for shift management.</p>
      </div>
    </div>
  );
};

export default EmployeeShiftManagement;