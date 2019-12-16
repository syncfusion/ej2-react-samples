import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { DropDowns } from './dropdowns';
import { Pickers } from './pickers';
import { UseCase } from './edit-post';


export const inplaceeditorRoutes = (
    <div>
         <Route  path='/:theme/inplace-editor/default' component={ Default }/>
         <Route  path='/:theme/inplace-editor/dropdowns' component={ DropDowns }/>
         <Route  path='/:theme/inplace-editor/pickers' component={ Pickers }/>
         <Route  path='/:theme/inplace-editor/edit-post' component={ UseCase }/>

    </div>
)

export const inplaceeditorCategory = {"default":{"name":"Overview","category":"In-place Editor"},"dropdowns":{"name":"DropDown Components","category":"In-place Editor"},"pickers":{"name":"Date Components","category":"In-place Editor"},"edit-post":{"name":"Edit Post","category":"Use Case"},"defaultSample":"inplace-editor/default"}