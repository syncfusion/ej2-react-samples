import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Local } from './local';
import { Remote } from './remote';
import { OlapSample } from './Olap';
import { ChartIntegration } from './pivot-chart';
import { Integration } from './external-binding';
import { FieldList } from './field-list';
import { GroupingBarSample } from './grouping-bar';
import { ConditionalFormattingClass } from './conditional-formatting';
import { Selection } from './selection';
import { SummaryCustomization } from './summary-customization';
import { Grouping } from './grouping';
import { PivotToolbar } from './tool-bar';
import { CalculatedFieldClass } from './calculated-field';
import { Aggregation } from './aggregation';
import { Sorting } from './sorting';
import { ValueSorting } from './value-sorting';
import { Filtering } from './filtering';
import { LabelFilter } from './label-filtering';
import { ValueFilter } from './value-filtering';
import { VirtualScrolling } from './virtual-scrolling';
import { CellTemplate } from './cell-template';
import { DrillThroughComponent } from './drill-through';
import { Editing } from './editing';
import { HyperLink } from './hyper-link';
import { DeferUpdate } from './defer-update';
import { Exporting } from './exporting';
export const pivottableRoutes = (<div>
         <Route path='/:theme/pivot-table/default' component={Default}/>
         <Route path='/:theme/pivot-table/local' component={Local}/>
         <Route path='/:theme/pivot-table/remote' component={Remote}/>
         <Route path='/:theme/pivot-table/Olap' component={OlapSample}/>
         <Route path='/:theme/pivot-table/pivot-chart' component={ChartIntegration}/>
         <Route path='/:theme/pivot-table/external-binding' component={Integration}/>
         <Route path='/:theme/pivot-table/field-list' component={FieldList}/>
         <Route path='/:theme/pivot-table/grouping-bar' component={GroupingBarSample}/>
         <Route path='/:theme/pivot-table/conditional-formatting' component={ConditionalFormattingClass}/>
         <Route path='/:theme/pivot-table/selection' component={Selection}/>
         <Route path='/:theme/pivot-table/summary-customization' component={SummaryCustomization}/>
         <Route path='/:theme/pivot-table/grouping' component={Grouping}/>
         <Route path='/:theme/pivot-table/tool-bar' component={PivotToolbar}/>
         <Route path='/:theme/pivot-table/calculated-field' component={CalculatedFieldClass}/>
         <Route path='/:theme/pivot-table/aggregation' component={Aggregation}/>
         <Route path='/:theme/pivot-table/sorting' component={Sorting}/>
         <Route path='/:theme/pivot-table/value-sorting' component={ValueSorting}/>
         <Route path='/:theme/pivot-table/filtering' component={Filtering}/>
         <Route path='/:theme/pivot-table/label-filtering' component={LabelFilter}/>
         <Route path='/:theme/pivot-table/value-filtering' component={ValueFilter}/>
         <Route path='/:theme/pivot-table/virtual-scrolling' component={VirtualScrolling}/>
         <Route path='/:theme/pivot-table/cell-template' component={CellTemplate}/>
         <Route path='/:theme/pivot-table/drill-through' component={DrillThroughComponent}/>
         <Route path='/:theme/pivot-table/editing' component={Editing}/>
         <Route path='/:theme/pivot-table/hyper-link' component={HyperLink}/>
         <Route path='/:theme/pivot-table/defer-update' component={DeferUpdate}/>
         <Route path='/:theme/pivot-table/exporting' component={Exporting}/>

    </div>);
export const pivottableCategory = { "default": { "name": "Default Functionalities", "category": "Pivot Table" }, "local": { "name": "Local Data", "category": "Data Binding" }, "remote": { "name": "Remote Data", "category": "Data Binding" }, "Olap": { "name": "OLAP", "category": "Data Binding" }, "pivot-chart": { "name": "Pivot Chart", "category": "Integration" }, "external-binding": { "name": "External Binding", "category": "Integration" }, "field-list": { "name": "Field List", "category": "User Interaction" }, "grouping-bar": { "name": "Grouping Bar", "category": "User Interaction" }, "conditional-formatting": { "name": "Conditional Formatting", "category": "User Interaction" }, "selection": { "name": "Selection", "category": "User Interaction" }, "summary-customization": { "name": "Show/Hide Totals", "category": "User Interaction" }, "grouping": { "name": "Grouping", "category": "User Interaction" }, "tool-bar": { "name": "Toolbar", "category": "User Interaction" }, "calculated-field": { "name": "Calculated Field", "category": "Formula" }, "aggregation": { "name": "Aggregation", "category": "Formula" }, "sorting": { "name": "Default Sorting", "category": "Sorting" }, "value-sorting": { "name": "Value Sorting", "category": "Sorting" }, "filtering": { "name": "Default Filtering", "category": "Filtering" }, "label-filtering": { "name": "Label Filtering", "category": "Filtering" }, "value-filtering": { "name": "Value Filtering", "category": "Filtering" }, "virtual-scrolling": { "name": "Virtual Scrolling", "category": "Scrolling" }, "cell-template": { "name": "Cell Template", "category": "Customization" }, "drill-through": { "name": "Drill Through", "category": "Miscellaneous" }, "editing": { "name": "Editing", "category": "Miscellaneous" }, "hyper-link": { "name": "Hyperlink", "category": "Miscellaneous" }, "defer-update": { "name": "Defer Layout Update", "category": "Miscellaneous" }, "exporting": { "name": "Export", "category": "Miscellaneous" }, "defaultSample": "pivot-table/default" };
