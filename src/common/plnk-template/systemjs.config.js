System.config({
    transpiler: "ts",
    typescriptOptions: {
            target: "es5",
            module: "commonjs",
            moduleResolution: "node",
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            "jsx": "react"
    },
     meta: {
      'typescript': {
        "exports": "ts"
      },
      '*.json': { loader: 'plugin-json' }
    },
    paths: {
        "syncfusion:": "{{:CDN_LINK}}"},
    map: {
        app: 'app',
        ts: "https://unpkg.com/plugin-typescript@4.0.10/lib/plugin.js",
        typescript: "https://unpkg.com/typescript@2.2.2/lib/typescript.js",
        "plugin-json":"https://cdnjs.cloudflare.com/ajax/libs/systemjs-plugin-json/0.3.0/json.min.js",
        "@syncfusion/ej2-base": "syncfusion:ej2-base/dist/ej2-base.umd.min.js",
        "@syncfusion/ej2-buttons": "syncfusion:ej2-buttons/dist/ej2-buttons.umd.min.js",
        "@syncfusion/ej2-charts": "syncfusion:ej2-charts/dist/ej2-charts.umd.min.js",
        "@syncfusion/ej2-circulargauge": "syncfusion:ej2-circulargauge/dist/ej2-circulargauge.umd.min.js",
        "@syncfusion/ej2-lineargauge": "syncfusion:ej2-lineargauge/dist/ej2-lineargauge.umd.min.js",
        "@syncfusion/ej2-calendars": "syncfusion:ej2-calendars/dist/ej2-calendars.umd.min.js",
        "@syncfusion/ej2-data": "syncfusion:ej2-data/dist/ej2-data.umd.min.js",
        "@syncfusion/ej2-dropdowns": "syncfusion:ej2-dropdowns/dist/ej2-dropdowns.umd.min.js",
        "@syncfusion/ej2-grids": "syncfusion:ej2-grids/dist/ej2-grids.umd.min.js",
        "@syncfusion/ej2-lists": "syncfusion:ej2-lists/dist/ej2-lists.umd.min.js",
        "@syncfusion/ej2-inputs": "syncfusion:ej2-inputs/dist/ej2-inputs.umd.min.js",
        "@syncfusion/ej2-navigations": "syncfusion:ej2-navigations/dist/ej2-navigations.umd.min.js",
        "@syncfusion/ej2-popups": "syncfusion:ej2-popups/dist/ej2-popups.umd.min.js",
        "@syncfusion/ej2-pdf-export": "syncfusion:ej2-pdf-export/dist/ej2-pdf-export.umd.min.js",        
        "@syncfusion/ej2-compression": "syncfusion:ej2-compression/dist/ej2-compression.umd.min.js",
        "@syncfusion/ej2-excel-export": "syncfusion:ej2-excel-export/dist/ej2-excel-export.umd.min.js",        
        "@syncfusion/ej2-file-utils": "syncfusion:ej2-file-utils/dist/ej2-file-utils.umd.min.js",

        "@syncfusion/ej2-react-base": "syncfusion:ej2-react-base/dist/ej2-react-base.umd.min.js",
        "@syncfusion/ej2-react-buttons": "syncfusion:ej2-react-buttons/dist/ej2-react-buttons.umd.min.js",
        "@syncfusion/ej2-react-charts": "syncfusion:ej2-react-charts/dist/ej2-react-charts.umd.min.js",
        "@syncfusion/ej2-react-circulargauge": "syncfusion:ej2-react-circulargauge/dist/ej2-react-circulargauge.umd.min.js",
        "@syncfusion/ej2-react-lineargauge": "syncfusion:ej2-react-lineargauge/dist/ej2-react-lineargauge.umd.min.js",
        "@syncfusion/ej2-react-calendars": "syncfusion:ej2-react-calendars/dist/ej2-react-calendars.umd.min.js",
        "@syncfusion/ej2-react-dropdowns": "syncfusion:ej2-react-dropdowns/dist/ej2-react-dropdowns.umd.min.js",
        "@syncfusion/ej2-react-grids": "syncfusion:ej2-react-grids/dist/ej2-react-grids.umd.min.js",
        "@syncfusion/ej2-react-inputs": "syncfusion:ej2-react-inputs/dist/ej2-react-inputs.umd.min.js",
        "@syncfusion/ej2-react-lists": "syncfusion:ej2-react-lists/dist/ej2-react-lists.umd.min.js",
        "@syncfusion/ej2-react-navigations": "syncfusion:ej2-react-navigations/dist/ej2-react-navigations.umd.min.js",
        "@syncfusion/ej2-react-popups": "syncfusion:ej2-react-popups/dist/ej2-react-popups.umd.min.js",
        "react-dom":"https://unpkg.com/react-dom@15.5.4/dist/react-dom.min.js",
        "react":"https://unpkg.com/react@15.5.4/dist/react.min.js",
    },
    packages: {
        'app': { main: 'index', defaultExtension: 'tsx' },
    }
});

System.import('app');