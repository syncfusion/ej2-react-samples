import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Formula } from './formula';
import { CellDataBinding } from './cell-data-binding';
import { RemoteDataBinding } from './remote-data-binding';
import { CellFormatting } from './cell-formatting';
import { NumberFormatting } from './number-formatting';


export const spreadsheetRoutes = (
    <div>
         <Route  path='/:theme/spreadsheet/default' component={ Default }/>
         <Route  path='/:theme/spreadsheet/formula' component={ Formula }/>
         <Route  path='/:theme/spreadsheet/cell-data-binding' component={ CellDataBinding }/>
         <Route  path='/:theme/spreadsheet/remote-data-binding' component={ RemoteDataBinding }/>
         <Route  path='/:theme/spreadsheet/cell-formatting' component={ CellFormatting }/>
         <Route  path='/:theme/spreadsheet/number-formatting' component={ NumberFormatting }/>

    </div>
)

export const spreadsheetCategory = {"default":{"name":"Default Functionalities","category":"Spreadsheet"},"formula":{"name":"Formula","category":"Spreadsheet"},"cell-data-binding":{"name":"Cell Data Binding","category":"Data Binding"},"remote-data-binding":{"name":"Remote Data Binding","category":"Data Binding"},"cell-formatting":{"name":"Cell Formatting","category":"Formatting"},"number-formatting":{"name":"Number Formatting","category":"Formatting"},"defaultSample":"spreadsheet/default"}