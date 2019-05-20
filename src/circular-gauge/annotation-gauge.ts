/**
 * Annotations
 */
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { Annotations } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);

export function gauge2(): CircularGauge {
    let gauge2: CircularGauge = new CircularGauge({
        background :'transparent',
        axes: [
            {
                startAngle: 0, endAngle: 0,
                lineStyle: { width: 0 },
                ranges: [
                    {
                        start: 0, end: 3,
                        startWidth: 4, endWidth: 4,
                        color: 'rgba(128,128,128)'
                    }, {
                        start: 3, end: 12,
                        startWidth: 4, endWidth: 4,
                        color: 'rgba(192,192,192)'
                    }
                ],
                annotations: [{
                    angle: 270,
                    radius: '40%',
                    content: null
                }, {
                    angle: 180,
                    radius: '40%',
                    content: null
                }, {
                    angle: 90,
                    radius: '50%',
                    content: null
                }, {
                    angle: 360, zIndex: '1',
                    radius: '35%',
                    content: '<div id="tm" style="font-size:10px;">21-06-17</div>'
                }],
                labelStyle: {
                    hiddenLabel: 'First',
                    font: {
                        size: '0px'
                    },
                    autoAngle: false
                }, majorTicks: {
                    width: 1,
                    height: 5,
                    interval: 1
                }, minorTicks: {
                    height: 3,
                    width: 0.5,
                    interval: 0.2
                },
                minimum: 0,
                maximum: 12,
                pointers: [{
                    radius: '70%',
                    pointerWidth: 2,
                    cap: {
                        radius: 2,
                        border: {
                            width: 0.2
                        }
                    },
                    needleTail: {
                        length: '10%'
                    }, animation: {
                        enable: false,
                        duration: 500
                    }
                }]
            }
        ]
    });
    return gauge2;
}