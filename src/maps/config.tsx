export const MapSampleOrder: Object = [
    {
        'path': 'maps/default', 'component': 'DefaultMaps', 'name': 'Default Functionalities', 'sourceFiles': [
            { 'displayName': 'default.tsx', 'path': './src/maps/default.tsx' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' },
            { 'displayName': 'default-datasource.json', 'path': './src/maps/map-data/default-datasource.json' }
        ], 'description': 'This demo for Essential JS2 Maps control visualizes the continents in the world by rendering those in a map layer.', 'order': '01', 'category': 'Maps'
    },
    {
        'path': 'maps/projection', 'component': 'ProjectionMaps', 'name': 'Projection', 'sourceFiles': [
            { 'displayName': 'projection.tsx', 'path': './src/maps/projection.tsx' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' },
            { 'displayName': 'projection-datasource.json', 'path': './src/maps/map-data/projection-datasource.json' }
        ], 'description': 'This demo for Essential JS2 Maps control shows the details of permanent and non-permanent countries in the UN Security Council, in 2017.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/multilayer', 'component': 'MultilayerMaps', 'name': 'Multi-layers', 'sourceFiles': [
            { 'displayName': 'multilayer.tsx', 'path': './src/maps/multilayer.tsx' },
            { 'displayName': 'california.json', 'path': './src/maps/map-data/california.json' },
            { 'displayName': 'usa.json', 'path': './src/maps/map-data/usa.json' },
            { 'displayName': 'texas.json', 'path': './src/maps/map-data/texas.json' }
        ], 'description': 'This demo for Essential JS2 Maps control depicts the layer along with sublayers for California and Texas.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/marker', 'component': 'MarkerMaps', 'name': 'Marker', 'sourceFiles': [
            { 'displayName': 'marker.tsx', 'path': './src/maps/marker.tsx' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' },
            { 'displayName': 'top-population.json', 'path': './src/maps/map-data/top-population.json' }
        ], 'description': 'This demo for Essential JS2 Maps control shows the top 25 populated cities in the world by displaying the markers in their locations.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/marker-template', 'component': 'MarkerTemplateMaps', 'name': 'Marker template', 'sourceFiles': [
            { 'displayName': 'marker-template.tsx', 'path': './src/maps/marker-template.tsx' },
            { 'displayName': 'australia.json', 'path': './src/maps/map-data/australia.json' }
        ], 'description': 'This demo for Essential JS2 Maps control indicates the temperature of various cities of Australia in marker templates.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/marker-cluster', 'component': 'MarkerCluster', 'name': 'Marker Clustering', 'sourceFiles': [
            { 'displayName': 'marker-cluster.tsx', 'path': './src/maps/marker-cluster.tsx' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' },
            { 'displayName': 'marker-cluster.json', 'path': './src/maps/map-data/marker-cluster.json' }
        ], 'description': 'This demo for Essential JS2 Maps control indicates the create the marker cluster in more than one marker intersect.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/label', 'component': 'LabelMaps', 'name': 'Labels', 'sourceFiles': [
            { 'displayName': 'label.tsx', 'path': './src/maps/default.tsx' },
            { 'displayName': 'usa.json', 'path': './src/maps/map-data/usa.json' }
        ], 'description': 'This demo for Essential JS2 Maps control shows the names of all the states in USA in data label. Intersect action and smart labels mode can be changed.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/bubble', 'component': 'BubbleMaps', 'name': 'Bubble', 'sourceFiles': [
            { 'displayName': 'bubble.tsx', 'path': './src/maps/bubble.tsx' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' },
            { 'displayName': 'bubble-datasource.json', 'path': './src/maps/map-data/bubble-datasource.json' }
        ], 'description': 'This demo for Essential JS2 Maps control illustrates the top 30 countries which has highest Internet users in bubbles of the year 2016.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/navigation-line', 'component': 'NavigationLineMaps', 'name': 'Navigation Lines', 'sourceFiles': [
            { 'displayName': 'navigation-line.tsx', 'path': './src/maps/navigation-line.tsx' },
            { 'displayName': 'penisular-marker.json', 'path': './src/maps/map-data/penisular-marker.json' },
            { 'displayName': 'penisular-location.json', 'path': './src/maps/map-data/penisular-location.json' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' }
        ], 'description': 'This demo for Essential JS2 Maps control illustrates the sea routes between various cities for shipping.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/legend', 'component': 'LegendMaps', 'name': 'Legend', 'type': 'update', 'sourceFiles': [
            { 'displayName': 'legend.tsx', 'path': './src/maps/legend.tsx' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' },
            { 'displayName': 'legend-datasource.json', 'path': './src/maps/map-data/legend-datasource.json' }
        ], 'description': 'This demo for Essential JS2 Maps control visualizes grouping of countries in the legend based on its population density.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/color-mapping', 'component': 'ColorMap', 'name': 'Color Mapping', 'sourceFiles': [
            { 'displayName': 'color-mapping.tsx', 'path': './src/maps/color-mapping.tsx' },
            { 'displayName': 'usa.json', 'path': './src/maps/map-data/usa.json' },
            { 'displayName': 'color-mappig.json', 'path': './src/maps/map-data/color-mapping.json' }
        ], 'description': 'This demo for Essential JS2 Maps control illustrates the average amount of rainfall and snowfall in spring season of all the states in US.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/annotation', 'component': 'AnnotationMaps', 'name': 'Annotations', 'sourceFiles': [
            { 'displayName': 'annotation.tsx', 'path': './src/maps/annotation.tsx' },
            { 'displayName': 'africa-continent.json', 'path': './src/maps/map-data/africa-continent.json' }
        ], 'description': 'This demo for Essential JS2 Maps control depicts the facts about Africa continent and a direction compass in an annotation.', 'order': '02', 'category': 'Features'
    },
    {
        'path': 'maps/osm', 'component': 'OSMMaps', 'name': 'OpenStreetMap', 'sourceFiles': [
            { 'displayName': 'osm.tsx', 'path': './src/maps/osm.tsx' }
        ], 'description': 'This demo for Essential JS2 Maps control illustrates the location of United Nations Headquarters in the OpenStreetMap with marker.',
        'order': '03', 'category': 'Map Providers'
    },
    {
        'path': 'maps/osm-with-navigation-lines', 'component': 'OSMNavigation', 'name': 'OSM with Navigation Lines', 'sourceFiles': [
            { 'displayName': 'osm-with-navigation-lines.tsx', 'path': './src/maps/osm-with-navigation-lines.tsx' }
        ], 'description': 'This demo for Essential JS2 Maps control illustrates the flight route from Los Angeles to Mexico City using Navigation lines.', 'order': '03', 'category': 'Map Providers'
    },
    {
        'path': 'maps/osm-with-sublayers', 'component': 'OSMSubLayer', 'name': 'OSM with Sublayer', 'sourceFiles': [
            { 'displayName': 'osm-with-sublayers.tsx', 'path': './src/maps/osm-with-sublayers.tsx' },
            { 'displayName': 'africa.json', 'path': './src/maps/map-data/africa.json' }
        ], 'description': 'This demo for Essential JS2 Maps control illustrates the Africa continent location in the World map.', 'order': '03', 'category': 'Map Providers'
    },
    {
        'path': 'maps/tooltip', 'component': 'TooltipMaps', 'name': 'Tooltip', 'sourceFiles': [
            { 'displayName': 'tooltip.tsx.tsx', 'path': './src/maps/tooltip.tsx' },
            { 'displayName': 'tooltip-datasource.json', 'path': './src/maps/map-data/tooltip-datasource.json' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' }
        ], 'description': 'This demo for Essential JS2 Maps control depicts the countries that were appeared in the finals of Cricket World Cup and their counts.', 'order': '04', 'category': 'User Interaction'
    },
    {
        'path': 'maps/selection', 'component': 'SelectionMaps', 'name': 'Selection & Highlight', 'sourceFiles': [
            { 'displayName': 'selection.tsx', 'path': './src/maps/selection.tsx' },
            { 'displayName': 'selection-datasource.json', 'path': './src/maps/map-data/selection-datasource.json' },
            { 'displayName': 'usa.json', 'path': './src/maps/map-data/usa.json' }
        ], 'description': 'This demo for Essential JS2 Maps control visualizes USA president election results in the year 2016. Default and interactive are the two types of legend.', 'order': '04', 'category': 'User Interaction'
    },
    {
        'path': 'maps/zooming', 'component': 'ZoomingMaps', 'name': 'Zooming & Panning', 'sourceFiles': [
            { 'displayName': 'zooming.tsx', 'path': './src/maps/zooming.tsx' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' },
            { 'displayName': 'zooming-datasource.json', 'path': './src/maps/map-data/zooming-datasource.json' }
        ], 'description': 'This demo for Essential JS2 Maps control depicts the properties required to zoom and pan the rendered map.', 'order': '04', 'category': 'User Interaction'
    },
    {
        'path': 'maps/drilldown', 'component': 'DrilldownMaps', 'name': 'Drill down', 'sourceFiles': [
            { 'displayName': 'drilldown.tsx', 'path': './src/maps/drilldown.tsx' },
            { 'displayName': 'default-datasource.json', 'path': './src/maps/map-data/default-datasource.json' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' },
            { 'displayName': 'africa.json', 'path': './src/maps/map-data/africa.json' },
            { 'displayName': 'europe.json', 'path': './src/maps/map-data/europe.json' },
            { 'displayName': 'asia.json', 'path': './src/maps/map-data/asia.json' },
            { 'displayName': 'north-america.json', 'path': './src/maps/map-data/north-america.json' },
            { 'displayName': 'south-america.json', 'path': './src/maps/map-data/south-america.json' },
            { 'displayName': 'oceania.json', 'path': './src/maps/map-data/oceania.json' }
        ], 'description': 'This demo for Essential JS2 Maps control demonstrates drill down with all the continents in the initial view and countries on drill.', 'order': '04', 'category': 'User Interaction'
    },
    {
        'path': 'maps/print', 'component': 'PrintMaps', 'name': 'Print', 'sourceFiles': [
            { 'displayName': 'print.tsx', 'path': './src/maps/print.tsx' },
            { 'displayName': 'usa.json', 'path': './src/maps/map-data/usa.json ' },
            { 'displayName': 'print-datasource.json', 'path': './src/maps/map-data/print-datasource.json ' }
        ], 'description': 'This demo for Essential JS2 Maps control illustrates the printing functionality in the maps control.', 'order': '05', 'category': 'Print and Export'
    },
    {
        'path': 'maps/export', 'component': 'ExportMaps', 'name': 'Export', 'sourceFiles': [
            { 'displayName': 'export.tsx', 'path': './src/maps/export.tsx' },
            { 'displayName': 'world-map.tsx', 'path': './src/maps/map-data/world-map.json' }
        ], 'description': 'This demo for Essential JS2 Maps control illustrates the exporting functionality in the maps control.', 'order': '05', 'category': 'Print and Export'
    },
    {
        'path': 'maps/heatmap', 'component': 'HeatMaps', 'name': 'Heat Map', 'sourceFiles': [
            { 'displayName': 'heatmap.tsx', 'path': './src/maps/heatmap.tsx' },
            { 'displayName': 'india.json', 'path': './src/maps/map-data/india.json ' },
            { 'displayName': 'heatmap-datasource.json', 'path': './src/maps/map-data/heatmap-datasource.json ' }
        ], 'description': 'This demo for Essential JS2 Maps control visualizes the state wise population of India in the year 2011. Color for states will be applied based on its value.', 'order': '06', 'category': 'Use Cases'
    },
    {
        'path': 'maps/curved', 'component': 'CurvedMaps', 'name': 'Flight routes', 'sourceFiles': [
            { 'displayName': 'curved.tsx', 'path': './src/maps/curved.tsx' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' },
            { 'displayName': 'curved-datasource.json', 'path': './src/maps/map-data/curved-datasource.json' },
            { 'displayName': 'navigation-datasource.json', 'path': './src/maps/map-data/navigation-datasource.json' }
        ], 'description': 'This demo for Essential JS2 Maps control demonstrates the flight routes from India to China using navigation lines feature.', 'order': '06', 'category': 'Use Cases'
    },
    {
        'path': 'maps/earthquake', 'component': 'EarthquakeMaps', 'name': 'Earthquake indication', 'sourceFiles': [
            { 'displayName': 'earthquake.tsx', 'path': './src/maps/earthquake.tsx' },
            { 'displayName': 'asia.json', 'path': './src/maps/map-data/asia.json ' }
        ], 'description': 'This demo for Essential JS2 Maps control demonstrates the earth quack occurred in Sumatra, Indonesia in the year 2009.', 'order': '06', 'category': 'Use Cases'
    },
    {
        'path': 'maps/highlight', 'component': 'HighlightMaps', 'name': 'Highlighted region', 'sourceFiles': [
            { 'displayName': 'highlight.tsx', 'path': './src/maps/highlight.tsx' },
            { 'displayName': 'okalahoma.json', 'path': './src/maps/map-data/okalahoma.json ' }
        ], 'description': 'This demo for Essential JS2 Maps control depicts the ATM populated areas in Oklahoma by highlighting the regions.', 'order': '06', 'category': 'Use Cases'
    },
    {
        'path': 'maps/cyber-attack-map', 'component': 'CyberAttackMaps', 'name': 'Cyber Attack Map', 'sourceFiles': [
            { 'displayName': 'cyber-attack-map.tsx', 'path': './src/maps/cyber-attack-map.tsx' }
        ], 'description': 'This demo for Essential JS2 Maps control depicts to display the cyber attacks and threats from various countries to USA.', 'order': '06', 'category': 'Use Cases'
    },
    {
        'path': 'maps/dynamic-marker', 'component': 'DynamicMarker', 'name': 'Dynamic Markers', 'sourceFiles': [
            { 'displayName': 'dynamic-marker.tsx', 'path': './src/maps/dynamic-marker.tsx' },
            { 'displayName': 'world-map.json', 'path': './src/maps/map-data/world-map.json' }
        ], 'description': 'This demo for Essential JS2 Maps control visualizes the dynamically added the marker and navigation line.', 'order': '06', 'category': 'Use Cases'
    },
    {
        'path': 'maps/map-pie', 'component': 'PieMaps', 'name': 'Map with Pie chart', 'sourceFiles': [
            { 'displayName': 'map-pie.tsx', 'path': './src/maps/map-pie.tsx' },
            { 'displayName': 'continent.json', 'path': './src/maps/map-data/continent.json' }
        ], 'description': 'This demo for Essential JS2 Maps control visualizes the placing of pie charts on the maps using marker templates.', 'order': '06', 'category': 'Use Cases'
    },
    {
        'path': 'maps/map-with-slider', 'component': 'MapSlider', 'name': 'Map with Slider', 'sourceFiles': [
            { 'displayName': 'map-with-slider.tsx', 'path': './src/maps/map-with-slider.tsx' },
            { 'displayName': 'north-america.json', 'path': './src/maps/map-data/north-america.json ' },
            { 'displayName': 'population-growth.json', 'path': './src/maps/map-data/population-growth.json' }
        ], 'description': 'This demo for Essential JS2 Maps control demonstrates the average annual population growth of the countries in the North America continent.', 'order': '06', 'category': 'Use Cases'
    },
    {
        'path': 'maps/seat-booking', 'component': 'SeatBookingMaps', 'name': 'Bus seat booking', 'sourceFiles': [
            { 'displayName': 'seat-booking.tsx', 'path': './src/maps/seat-booking.tsx' },
            { 'displayName': 'seat-selection.json', 'path': './src/maps/map-data/seat-selection.json' }
        ], 'description': 'This demo for Essential JS2 Maps control demonstrates the rendering of normal geometry type shapes on the map.', 'order': '06', 'category': 'Use Cases'
    }
];
