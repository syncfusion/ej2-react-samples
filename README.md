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
Refer the  [sample](https://github.com/syncfusion/ej2-react-samples/blob/master/src/grid/default.tsx) for example sample component.

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
Refer the [PropertyPanesample](https://github.com/syncfusion/ej2-react-samples/blob/master/src/grid/adaptive.tsx) for propertyPane example.

## Add Routing for your sample

Create the "config.tsx” file inside of your control folder.Configure your "config.tsx file" file as like below code snippet.

```
export const GridSampleOrder:Object = [
    { 'path': 'grid/default', 'component':'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'Grid' },
    { 'path': 'grid/gridlines', 'component':'GridLines', 'name': 'GridLines', 'order': '01', 'category': 'Grid', hideOnDevice: true }
]

```

**Fields Description:**

 * _path :_ Specifies the sample router path. Path must be same as "sampleFolderName/sampleFileName".
  
 * _component :_ Specifies the name of the sample component.
  
 * _name :_ Specifies the sample name to be displayed.
  
 * _order :_ Specifies the order in which sample to be displayed.
  
 * _category :_ Specifies the sample category.

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
# Using the samples

## Installing

Before installation check `@syncfusion:registry=http://nexus.syncfusion.com/repository/ej2-production/` is available in npmrc file. Then use the below command to install all dependent packages.

```
npm install
```

## Build

Use `npm run build` command to compile the source files. It calls the following tasks synchronously,

1. SEO changes
2. Build
3. Styles ship
4. Site-map generate.

### SEO changes

It will set meta data and description for the h1 tag to show our components first in search engine. Use the below command to run it individual. 

```
gulp SEO-changes
```

### Build

Use the below command to generate scripts, styles, locale and sample lists.

```
gulp build
```
It runs the following tasks synchronously,

1. Scripts
2. Styles

#### **Scripts**

 It compiles the Typescript files and use the below command to run this task.

```
gulp scripts
```

#### **Styles**

`gulp styles` command is used to compile default themes. It calls the following two tasks synchronously.

1. Default theme
2. Compile styles

#### Default theme

Use the below command to generate default theme files.

```
gulp default-theme
```

#### Compile Styles
It compiles the scss file to css file. To run this task use the below command,

```
gulp compile-styles
```

### Styles Shipping

It copies css files for themes from node_modules. Use the below command to run it individual.

```
gulp styles-ship
```

### Site map generation

The below command combines sample of all components and store it in sitemap-demos.xml file to index our components, samples, documents in search engine.

```
gulp sitemap-generate
```

## Running the Sample Browser

To run your sample browser you can use any of the following command.

```
gulp serve
```
