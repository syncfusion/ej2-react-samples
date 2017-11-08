/**
 * Dynamic source
 */

import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { Annotations, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);

export class DynamicDataSerive {
    GetSubGauge1(): any {
        let gauge1: CircularGauge = new CircularGauge({
            axes: [
                {
                    lineStyle: {
                        width: 0,
                        color: '#565656'
                    },
                    labelStyle: {
                        useRangeColor: true
                    },
                    minimum: 0,
                    maximum: 6,
                    ranges: [{
                        start: 0,
                        end: 5,
                        color: '#1d1d1d',
                        startWidth: 0, endWidth: 0
                    }, {
                        start: 5,
                        end: 6,
                        color: '#c20000',
                        startWidth: 0, endWidth: 0
                    }],
                    pointers: [{
                        color: '#FF7A00',
                        cap: { radius: 5, color: 'white', border: { color: '#FF7A00', width: 2 } },
                        radius: '60%',
                        pointerWidth: 5,
                        value: 1,
                        animation: { duration: 0 }
                    }]
                }, {
                    lineStyle: {
                        color: '#565656'
                    },
                    radius: '90%',
                    pointers: [],
                    labelStyle: { font: { size: '0px' } },
                    majorTicks: {
                        height: 0
                    }, minorTicks: {
                        height: 0
                    }, startAngle: 155, endAngle: 25
                }
            ]
        });
        let gauge2: CircularGauge = new CircularGauge({
            axes: [
                {
                    lineStyle: {
                        width: 0
                    },
                    labelStyle: {
                        useRangeColor: true
                    },
                    minimum: 70,
                    maximum: 110,
                    ranges: [{
                        start: 70,
                        end: 70,
                        color: '#1d1d1d',
                        startWidth: 0, endWidth: 0
                    }, {
                        start: 71,
                        end: 109,
                        color: '#ff7a00',
                        startWidth: 0, endWidth: 0
                    }, {
                        start: 110,
                        end: 110,
                        color: '#c20000',
                        startWidth: 0, endWidth: 0
                    }],
                    pointers: [{
                        color: '#757575',
                        type: 'Marker',
                        cap: { radius: 5, color: 'white', border: { color: '#ff7a00', width: 2 } },
                        markerShape: 'Triangle',
                        markerWidth: 10,
                        markerHeight: 10,
                        radius: '90%',
                        pointerWidth: 5,
                        value: 90,
                        animation: { duration: 500 }
                    }]
                }
            ],
            axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
                args.text = args.value === 70 ? 'F' : 'E';
            }
        });
        let gauge3: CircularGauge = new CircularGauge({
            axes: [
                {
                    lineStyle: {
                        width: 0
                    },

                    labelStyle: {
                        useRangeColor: true
                    },
                    minimum: 70,
                    maximum: 110,
                    ranges: [{
                        start: 70,
                        end: 70,
                        color: '#1d1d1d',
                        startWidth: 0, endWidth: 0
                    }, {
                        start: 71,
                        end: 109,
                        color: '#ff7a00',
                        startWidth: 0, endWidth: 0
                    }, {
                        start: 110,
                        end: 110,
                        color: '#c20000',
                        startWidth: 0, endWidth: 0
                    }],
                    pointers: [{
                        color: '#757575',
                        type: 'Marker',
                        cap: { radius: 5, color: 'white', border: { color: '#ff7a00', width: 2 } },
                        markerShape: 'Triangle',
                        markerWidth: 10,
                        markerHeight: 10,
                        radius: '90%',
                        pointerWidth: 5,
                        value: 90,
                        animation: { duration: 500 }
                    }]
                }, {
                    lineStyle: {
                        color: '#565656'
                    },
                    radius: '90%',
                    pointers: [],
                    labelStyle: { font: { size: '0px' } },
                    majorTicks: {
                        height: 0
                    }, minorTicks: {
                        height: 0
                    }, startAngle: 330, endAngle: 210

                }
            ]
        });
        return { 'gauge1': gauge1, 'gauge2': gauge2, 'gauge3': gauge3 };
    }
}