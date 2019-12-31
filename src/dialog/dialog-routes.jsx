import { Route } from 'react-router-dom';
import * as React from 'react';
import { DefaultFunctionalities } from './default';
import { Basic } from './custom-dialog';
import { Modal } from './modal-dialog';
import { Template } from './template';
import { AjaxContent } from './dialog-contents-via-ajax';
import { Draggable } from './draggable';
import { Resizable } from './resizable';
import { Positioning } from './position';
import { Animation } from './animation';
import { MultipleDialogs } from './multiple-dialogs';
import { ComponentsDialog } from './components-dialog';
export const dialogRoutes = (<div>
         <Route path='/:theme/dialog/default' component={DefaultFunctionalities}/>
         <Route path='/:theme/dialog/custom-dialog' component={Basic}/>
         <Route path='/:theme/dialog/modal-dialog' component={Modal}/>
         <Route path='/:theme/dialog/template' component={Template}/>
         <Route path='/:theme/dialog/dialog-contents-via-ajax' component={AjaxContent}/>
         <Route path='/:theme/dialog/draggable' component={Draggable}/>
         <Route path='/:theme/dialog/resizable' component={Resizable}/>
         <Route path='/:theme/dialog/position' component={Positioning}/>
         <Route path='/:theme/dialog/animation' component={Animation}/>
         <Route path='/:theme/dialog/multiple-dialogs' component={MultipleDialogs}/>
         <Route path='/:theme/dialog/components-dialog' component={ComponentsDialog}/>

    </div>);
export const dialogCategory = { "default": { "name": "Default Functionalities", "category": "Dialog" }, "custom-dialog": { "name": "Custom Dialogs", "category": "Dialog" }, "modal-dialog": { "name": "Modal", "category": "Dialog" }, "template": { "name": "Template", "category": "Dialog" }, "dialog-contents-via-ajax": { "name": "Ajax Content", "category": "Dialog" }, "draggable": { "name": "Draggable", "category": "Dialog" }, "resizable": { "name": "Resizable", "category": "Dialog" }, "position": { "name": "Positioning", "category": "Dialog" }, "animation": { "name": "Animation", "category": "Dialog" }, "multiple-dialogs": { "name": "Multiple Dialogs", "category": "Dialog" }, "components-dialog": { "name": "Components inside Dialog", "category": "Dialog" }, "defaultSample": "dialog/default" };
