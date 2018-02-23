export const MaskedTextBoxOrder:Object = [
    { 'path': 'maskedtextbox/default', 'component':'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'MaskedTextBox', 'api':'{"MaskedTextBoxComponent":["mask"] }' },
    { 'path': 'maskedtextbox/custommask', 'component':'CustomMask', 'name': 'Custom Mask', 'order': '01', 'category': 'MaskedTextBox', 'api':'{"MaskedTextBoxComponent":["mask","customCharacters","floatLabelType"] }' },
    { 'path': 'maskedtextbox/formats', 'component':'Formats', 'name': 'Formats', 'order': '01', 'category': 'MaskedTextBox','api':'{"MaskedTextBoxComponent":["mask","floatLabelType","change","promptChar","getMaskedValue","value"] }' }
]