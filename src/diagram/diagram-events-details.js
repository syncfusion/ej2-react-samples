"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEventDetails(args) {
    var listView = document.getElementById('listview-def');
    var listViewComponent = listView.ej2_instances[0];
    var selectedItems = listViewComponent.getSelectedItems();
    if (selectedItems.data.length > 0) {
        var elementName = getName(selectedItems, args);
        if (elementName) {
            eventInformation(args);
        }
    }
    else {
        eventInformation(args);
    }
}
exports.getEventDetails = getEventDetails;
function getName(selectedItems, args) {
    for (var i = 0; i < selectedItems.data.length; i++) {
        var eventName = selectedItems.data[i].id;
        if (eventName === args.name) {
            return true;
        }
    }
    return false;
}
// tslint:disable-next-line:max-func-body-length
function eventInformation(args) {
    var span = document.createElement('span');
    span.innerHTML = 'Diagram ' + args.name.bold() + ' event called' + '<hr>';
    var log = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
}
