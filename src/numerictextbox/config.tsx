export const NumericTextBoxOrder:Object = [
    { 'path': 'numerictextbox/default', 'component':'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'NumericTextBox' , 'api':'{"NumericTextBoxComponent":["value","format","min","max","step"] }'},
    { 'path': 'numerictextbox/range', 'component':'Range', 'name': 'Range Validation', 'order': '01', 'category': 'NumericTextBox', 'api':'{"NumericTextBoxComponent":["value","min","max","step"] }' },
    { 'path': 'numerictextbox/format', 'component':'Format', 'name': 'Custom Format', 'order': '01', 'category': 'NumericTextBox','api':'{"NumericTextBoxComponent":["value","format","min","max"] }'  },
    { 'path': 'numerictextbox/restrict', 'component':'Restrict', 'name': 'Restrict Decimals', 'order': '01', 'category': 'NumericTextBox','api':'{"NumericTextBoxComponent":["value","format","min","max","step","decimals","validateDecimalOnType"] }' }
]