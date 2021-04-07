# React Sample Configuration

## Adding your sample folder
Create  new folder in 'src' location and name the folder as control name for example "grid” it is control name.

_Note: Do not use whitespace at any cause in folder’s name. Use “-” instead of space._

## Adding the sample

Add the sample component tsx file in the sample folder.Below steps are need to be considered on sample creation

 * Sample component must extend the "SampleBase" component class from the path "src/common/sample-base" file.
 * Sample tag  must be enclosed between the "control-section" div.
 * In all samples description is need to be added. Add sample description  within the div tag with id as **description**.

```javascript
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
export class Default extends SampleBase<{}, {}> {
  
  render() {
    return (       
      <div className = 'control-pane'>
        <div className='control-section'>
          //sample component tags
        </div>
        <div id="description">
          // sample description
        </div>
      </div>
    )
  }
}

```
Refer the  [sample](https://gitlab.syncfusion.com/essential-studio/development/src/grid/default.tsx ) for example sample component.

Note: Do not use whitespace at any cause in file’s name. Use “-” instead of space.

## Adding property section
To add  the "propertypane”  in the sample use tag `PropertyPane` from "common/property-pane" .Configure your sample properties as like below code snippet.

```
<PropertyPane title='Properties'>
                <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
                    <tr>
                        <td style={{ width: '30%' }}>
                            <div className="col-md-4" style={{ paddingTop: "8px" }}>
                                GridLines
                    </div>
                        </td>
                        <td style={{ width: '70%', paddingRight: '10px' }}>
                            <div>
                                <select id="ddl" name="ddl" onChange={this.change.bind(this)} className="form-control" style={{ padding: "6px" }} ref={d => this.dropElement = d}>
                                    <option value="default">Default</option>
                                    <option value="both">Both</option>
                                    <option value="none">None</option>
                                    <option value="horizontal">Horizontal</option>
                                    <option value="vertical">Vertical</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                </table>
            </PropertyPane>

```
Refer the  [PropertyPanesample](https://gitlab.syncfusion.com/essential-studio/development/src/grid/gridlines.tsx ) for propertyPane example.

## Add Routing for your sample

Create the "config.tsx” file inside of your control folder.Configure your "config.tsx file" file as like below code snippet.

```
export const GridSampleOrder:Object = [
    { 'path': 'grid/default', 'component':'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'Grid' },
    { 'path': 'grid/gridlines', 'component':'GridLines', 'name': 'GridLines', 'order': '01', 'category': 'Grid', hideOnDevice: true }
]

```

**Fields Description:**

 path : Specifies the sample router path. Path must be same as "sampleFolderName/sampleFileName".
 component: Specifies the name of the sample component.
 name: Specifies the sample name to be displayed.
 order: Specifies the order in which sample to be displayed.
 category: Specifies the sample category.

*Note: set **hideOnDevice** as true if you want to hide a sample in devices.*

## Configure Sample List

Add your samples in “samplelist.tsx” located in “/src/common” folder
1.	Import your sampleOrder  array from the component config file.
2.	Add your samples in samplesList as Like below

```
import * as React from 'react';
import { GridSampleOrder } from '../grid/config';

export let samplesList: any = [

    {
        'name': 'Grid', 'category': 'Grids', 'order': '02', 'path': 'grid', 'samples': GridSampleOrder
    }
];
```

## Adding your control dependency

Add your dependency in “package.json” file inside the dependencies.

Note: Here, '\*' Specifies that install the latest published package form the online. '\*' is recommended for Syncfusion packages.

```
"dependencies": {
        "@syncfusion/ej2-react-grids": "*"
},
```
## Run your Sample Browser

To run your sample browser you can use any of the following command.

```
gulp serve
```
