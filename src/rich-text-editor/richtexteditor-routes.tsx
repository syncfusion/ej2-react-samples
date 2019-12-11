import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Overview } from './tools';
import { Default } from './rich-text-editor';
import { ImageSample } from './image';
import { Inline } from './inline';
import { PasteCleanupRTE } from './paste-cleanup';
import { IFrame } from './iframe';
import { Print } from './print';
import { AjaxContent } from './ajax-load';
import { ResizableEditor } from './resize-editor';
import { RTEApi } from './api';
import { RTEEvents } from './client-side-events';
import { Forums } from './blog-posting';
import { AutoSave } from './auto-save';
import { Type } from './types';
import { InsertEmoticons } from './insert-emoticons';
import { InsertSpecialCharacters } from './insert-special-characters';
import { MarkDown } from './markdown-editor';
import { Preview } from './markdown-editor-preview';
import { CustomFormat } from './markdown-editor-custom-format';
import { TributeJs } from './tribute';


export const richtexteditorRoutes = (
    <div>
         <Route  path='/:theme/rich-text-editor/tools' component={ Overview }/>
         <Route  path='/:theme/rich-text-editor/rich-text-editor' component={ Default }/>
         <Route  path='/:theme/rich-text-editor/image' component={ ImageSample }/>
         <Route  path='/:theme/rich-text-editor/inline' component={ Inline }/>
         <Route  path='/:theme/rich-text-editor/paste-cleanup' component={ PasteCleanupRTE }/>
         <Route  path='/:theme/rich-text-editor/iframe' component={ IFrame }/>
         <Route  path='/:theme/rich-text-editor/print' component={ Print }/>
         <Route  path='/:theme/rich-text-editor/ajax-load' component={ AjaxContent }/>
         <Route  path='/:theme/rich-text-editor/resize-editor' component={ ResizableEditor }/>
         <Route  path='/:theme/rich-text-editor/api' component={ RTEApi }/>
         <Route  path='/:theme/rich-text-editor/client-side-events' component={ RTEEvents }/>
         <Route  path='/:theme/rich-text-editor/blog-posting' component={ Forums }/>
         <Route  path='/:theme/rich-text-editor/auto-save' component={ AutoSave }/>
         <Route  path='/:theme/rich-text-editor/types' component={ Type }/>
         <Route  path='/:theme/rich-text-editor/insert-emoticons' component={ InsertEmoticons }/>
         <Route  path='/:theme/rich-text-editor/insert-special-characters' component={ InsertSpecialCharacters }/>
         <Route  path='/:theme/rich-text-editor/markdown-editor' component={ MarkDown }/>
         <Route  path='/:theme/rich-text-editor/markdown-editor-preview' component={ Preview }/>
         <Route  path='/:theme/rich-text-editor/markdown-editor-custom-format' component={ CustomFormat }/>
         <Route  path='/:theme/rich-text-editor/tribute' component={ TributeJs }/>

    </div>
)

export const richtexteditorCategory = {"tools":{"name":"Overview","category":"Rich Text Editor"},"rich-text-editor":{"name":"Default Functionalities","category":"Rich Text Editor"},"image":{"name":"Image","category":"Rich Text Editor"},"inline":{"name":"Inline","category":"Rich Text Editor"},"paste-cleanup":{"name":"Paste from MS Word","category":"Rich Text Editor"},"iframe":{"name":"IFrame","category":"Rich Text Editor"},"print":{"name":"Print","category":"Rich Text Editor"},"ajax-load":{"name":"Ajax Content","category":"Rich Text Editor"},"resize-editor":{"name":"Resizable Editor","category":"Rich Text Editor"},"api":{"name":"API","category":"Rich Text Editor"},"client-side-events":{"name":"Events","category":"Rich Text Editor"},"blog-posting":{"name":"Use Case","category":"Rich Text Editor"},"auto-save":{"name":"Auto Save","category":"Rich Text Editor"},"types":{"name":"Type","category":"Toolbar"},"insert-emoticons":{"name":"Insert Emoticons","category":"Custom Tool"},"insert-special-characters":{"name":"Insert Special Characters","category":"Custom Tool"},"markdown-editor":{"name":"Overview","category":"Markdown Editor"},"markdown-editor-preview":{"name":"Preview","category":"Markdown Editor"},"markdown-editor-custom-format":{"name":"Custom Format","category":"Markdown Editor"},"tribute":{"name":"Tribute JS","category":"Third-parties Integration"},"defaultSample":"rich-text-editor/tools"}