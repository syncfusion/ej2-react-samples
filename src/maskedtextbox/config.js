"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskedTextBoxOrder = [
    { 'path': 'maskedtextbox/default', 'component': 'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'Input Mask', 'description': 'The Masked Textbox allows users to enter only the valid input based on the provided mask format such as Phone number, Country ISO code, Date, Time and so on.', 'api': '{"MaskedTextBoxComponent":["mask"] }' },
    { 'path': 'maskedtextbox/custom-mask', 'component': 'CustomMask', 'name': 'Custom Mask', 'order': '01', 'category': 'Input Mask', 'description': 'The custom mask is done using custom characters as mask elements. Time format and IP address fields are achieved using the custom mask literals and regex.', 'api': '{"MaskedTextBoxComponent":["mask","customCharacters","floatLabelType"] }' },
    { 'path': 'maskedtextbox/formats', 'component': 'Formats', 'name': 'Formats', 'order': '01', 'category': 'Input Mask', 'description': 'This sample demonstrates the usage of different mask formats through the properties panel. You can also get the value and raw value of the masked textbox.', 'api': '{"MaskedTextBoxComponent":["mask","floatLabelType","change","promptChar","getMaskedValue","value"] }' }
];
