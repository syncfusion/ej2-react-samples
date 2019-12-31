import {  Route } from 'react-router-dom';
import * as React from 'react';
import { DefaultMaps } from './default';
import { ProjectionMaps } from './projection';
import { MultilayerMaps } from './multilayer';
import { MarkerMaps } from './marker';
import { MarkerTemplateMaps } from './marker-template';
import { MarkerCluster } from './marker-cluster';
import { LabelMaps } from './label';
import { BubbleMaps } from './bubble';
import { NavigationLineMaps } from './navigation-line';
import { LegendMaps } from './legend';
import { ColorMap } from './color-mapping';
import { AnnotationMaps } from './annotation';
import { OSMMaps } from './osm';
import { OSMNavigation } from './osm-with-navigation-lines';
import { OSMSubLayer } from './osm-with-sublayers';
import { TooltipMaps } from './tooltip';
import { SelectionMaps } from './selection';
import { ZoomingMaps } from './zooming';
import { ProgrammaticZoomMaps } from './programmatic-zoom';
import { DrilldownMaps } from './drilldown';
import { PrintMaps } from './print';
import { ExportMaps } from './export';
import { HeatMaps } from './heatmap';
import { CurvedMaps } from './curved';
import { EarthquakeMaps } from './earthquake';
import { HighlightMaps } from './highlight';
import { CyberAttackMaps } from './cyber-attack-map';
import { DynamicMarker } from './dynamic-marker';
import { PieMaps } from './map-pie';
import { MapSlider } from './map-with-slider';
import { SalesMaps } from './sales-maps';
import { SeatBookingMaps } from './seat-booking';


export const mapsRoutes = (
    <div>
         <Route  path='/:theme/maps/default' component={ DefaultMaps }/>
         <Route  path='/:theme/maps/projection' component={ ProjectionMaps }/>
         <Route  path='/:theme/maps/multilayer' component={ MultilayerMaps }/>
         <Route  path='/:theme/maps/marker' component={ MarkerMaps }/>
         <Route  path='/:theme/maps/marker-template' component={ MarkerTemplateMaps }/>
         <Route  path='/:theme/maps/marker-cluster' component={ MarkerCluster }/>
         <Route  path='/:theme/maps/label' component={ LabelMaps }/>
         <Route  path='/:theme/maps/bubble' component={ BubbleMaps }/>
         <Route  path='/:theme/maps/navigation-line' component={ NavigationLineMaps }/>
         <Route  path='/:theme/maps/legend' component={ LegendMaps }/>
         <Route  path='/:theme/maps/color-mapping' component={ ColorMap }/>
         <Route  path='/:theme/maps/annotation' component={ AnnotationMaps }/>
         <Route  path='/:theme/maps/osm' component={ OSMMaps }/>
         <Route  path='/:theme/maps/osm-with-navigation-lines' component={ OSMNavigation }/>
         <Route  path='/:theme/maps/osm-with-sublayers' component={ OSMSubLayer }/>
         <Route  path='/:theme/maps/tooltip' component={ TooltipMaps }/>
         <Route  path='/:theme/maps/selection' component={ SelectionMaps }/>
         <Route  path='/:theme/maps/zooming' component={ ZoomingMaps }/>
         <Route  path='/:theme/maps/programmatic-zoom' component={ ProgrammaticZoomMaps }/>
         <Route  path='/:theme/maps/drilldown' component={ DrilldownMaps }/>
         <Route  path='/:theme/maps/print' component={ PrintMaps }/>
         <Route  path='/:theme/maps/export' component={ ExportMaps }/>
         <Route  path='/:theme/maps/heatmap' component={ HeatMaps }/>
         <Route  path='/:theme/maps/curved' component={ CurvedMaps }/>
         <Route  path='/:theme/maps/earthquake' component={ EarthquakeMaps }/>
         <Route  path='/:theme/maps/highlight' component={ HighlightMaps }/>
         <Route  path='/:theme/maps/cyber-attack-map' component={ CyberAttackMaps }/>
         <Route  path='/:theme/maps/dynamic-marker' component={ DynamicMarker }/>
         <Route  path='/:theme/maps/map-pie' component={ PieMaps }/>
         <Route  path='/:theme/maps/map-with-slider' component={ MapSlider }/>
         <Route  path='/:theme/maps/sales-maps' component={ SalesMaps }/>
         <Route  path='/:theme/maps/seat-booking' component={ SeatBookingMaps }/>

    </div>
)

export const mapsCategory = {"default":{"name":"Default Functionalities","category":"Maps"},"projection":{"name":"Projection","category":"Features"},"multilayer":{"name":"Multi-layers","category":"Features"},"marker":{"name":"Marker","category":"Features"},"marker-template":{"name":"Marker template","category":"Features"},"marker-cluster":{"name":"Marker Clustering","category":"Features"},"label":{"name":"Labels","category":"Features"},"bubble":{"name":"Bubble","category":"Features"},"navigation-line":{"name":"Navigation Lines","category":"Features"},"legend":{"name":"Legend","category":"Features"},"color-mapping":{"name":"Color Mapping","category":"Features"},"annotation":{"name":"Annotations","category":"Features"},"osm":{"name":"OpenStreetMap","category":"Map Providers"},"osm-with-navigation-lines":{"name":"OSM with Navigation Lines","category":"Map Providers"},"osm-with-sublayers":{"name":"OSM with Sublayer","category":"Map Providers"},"tooltip":{"name":"Tooltip","category":"User Interaction"},"selection":{"name":"Selection & Highlight","category":"User Interaction"},"zooming":{"name":"Zooming & Panning","category":"User Interaction"},"programmatic-zoom":{"name":"Zoom to fit all markers","category":"User Interaction"},"drilldown":{"name":"Drill down","category":"User Interaction"},"print":{"name":"Print","category":"Print and Export"},"export":{"name":"Export","category":"Print and Export"},"heatmap":{"name":"Heat Map","category":"Use Cases"},"curved":{"name":"Flight routes","category":"Use Cases"},"earthquake":{"name":"Earthquake indication","category":"Use Cases"},"highlight":{"name":"Highlighted region","category":"Use Cases"},"cyber-attack-map":{"name":"Cyber Attack Map","category":"Use Cases"},"dynamic-marker":{"name":"Dynamic Markers","category":"Use Cases"},"map-pie":{"name":"Map with Pie chart","category":"Use Cases"},"map-with-slider":{"name":"Map with Slider","category":"Use Cases"},"sales-maps":{"name":"Sales map ","category":"Use Cases"},"seat-booking":{"name":"Bus seat booking","category":"Use Cases"},"defaultSample":"maps/default"}