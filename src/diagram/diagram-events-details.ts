/**
 * Event Details
 */
import { ListView } from '@syncfusion/ej2-lists';

export function getEventDetails(args: any): void {
    let listView: any = document.getElementById('listview-def');
    let listViewComponent: ListView = listView.ej2_instances[0];
    let selectedItems: any = listViewComponent.getSelectedItems();
    if (selectedItems.data.length > 0) {
        let elementName: boolean = getName(selectedItems, args);
        if (elementName) {
            eventInformation(args);
        }
    } 
}

function getName(selectedItems: any, args: any): boolean {
    for (let i: number = 0; i < selectedItems.data.length; i++) {
        let eventName: string = selectedItems.data[i].id;
        if (eventName === args.name) {
            return true;
        }
    }
    return false;
}

// tslint:disable-next-line:max-func-body-length
function eventInformation(args: any): void {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = 'Diagram ' + args.name.bold() + ' event called' + '<hr>';
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
}