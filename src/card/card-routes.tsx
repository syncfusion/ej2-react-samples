import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Basic } from './basic';
import { Vertical } from './vertical';
import { Horizontal } from './horizontal';
import { Swipeable } from './swipeable';
import { Flip } from './flip';
import { Reveal } from './reveal';
import { Tile } from './tile';


export const cardRoutes = (
    <div>
         <Route  path='/:theme/card/basic' component={ Basic }/>
         <Route  path='/:theme/card/vertical' component={ Vertical }/>
         <Route  path='/:theme/card/horizontal' component={ Horizontal }/>
         <Route  path='/:theme/card/swipeable' component={ Swipeable }/>
         <Route  path='/:theme/card/flip' component={ Flip }/>
         <Route  path='/:theme/card/reveal' component={ Reveal }/>
         <Route  path='/:theme/card/tile' component={ Tile }/>

    </div>
)

export const cardCategory = {"basic":{"name":"Basic Card","category":"Cards"},"vertical":{"name":"Vertical Card","category":"Cards"},"horizontal":{"name":"Horizontal Card","category":"Cards"},"swipeable":{"name":"Swipeable Card","category":"Cards"},"flip":{"name":"Flip Card","category":"Cards"},"reveal":{"name":"Reveal Card","category":"Cards"},"tile":{"name":"Tile View","category":"Cards"},"defaultSample":"card/basic"}