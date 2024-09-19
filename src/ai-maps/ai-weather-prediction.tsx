import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { LayerDirective, LayersDirective, MapsComponent, Marker, MapsTooltip, Annotations, Zoom, Inject, AnnotationsDirective, AnnotationDirective } from '@syncfusion/ej2-react-maps';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

function WeatherPrediction() {
    let mapInstance: MapsComponent;
    let markerDataSource: MarkerData[] = [];
    interface MarkerData {
        latitude: number;
        longitude: number;
        name: string;
        temperature: number;
        weatherCondition: string;
    };
    let tomorrowButton: ButtonComponent;
    let secondDayButtonInstance: ButtonComponent;
    let thirdDayButtonInstance: ButtonComponent;
    let fourthDayButtonInstance: ButtonComponent;
    let fifthDayButtonInstance: ButtonComponent;

    const todayDate = new Date();
    const secondDayDate = new Date(todayDate);
    secondDayDate.setDate(todayDate.getDate() + 2);
    const thirdDayDate = new Date(todayDate);
    thirdDayDate.setDate(todayDate.getDate() + 3);
    const fourthDayDate = new Date(todayDate);
    fourthDayDate.setDate(todayDate.getDate() + 4);
    const fifthDayDate = new Date(todayDate);
    fifthDayDate.setDate(todayDate.getDate() + 5);

    const secondDayText = (secondDayDate).toLocaleDateString('en-US', { weekday: 'long' });
    const thirdDayText = thirdDayDate.toLocaleDateString('en-US', { weekday: 'long' });
    const fourthDayText = fourthDayDate.toLocaleDateString('en-US', { weekday: 'long' });
    const fifthDayText = fifthDayDate.toLocaleDateString('en-US', { weekday: 'long' });

    function onMapsLoaded(): void {
        if (markerDataSource.length === 0) {
            getWeatherData('Today');
        }
    }

    function getWeatherData(day: string): void {
        let weatherDataRequest;
        let offset: number = 0;
        let buttonInstance: ButtonComponent;
        if ((day === 'Tomorrow') || (day === 'Second Day') || (day === 'Third Day') || (day === 'Fourth Day') || (day === 'Fifth Day')) {
            if (day === 'Tomorrow') {
                offset = 1;
                buttonInstance = tomorrowButton;
            } else if (day === 'Second Day') {
                offset = 2;
                buttonInstance = secondDayButtonInstance;
            } else if (day === 'Third Day') {
                offset = 3;
                buttonInstance = thirdDayButtonInstance;
            } else if (day === 'Fourth Day') {
                offset = 4;
                buttonInstance = fourthDayButtonInstance;
            } else if (day === 'Fifth Day') {
                offset = 5;
                buttonInstance = fifthDayButtonInstance;
            }
            const dateTime = new Date();
            dateTime.setDate(dateTime.getDate() + offset);
            const dayValue = dateTime.getDate().toString();
            const month = (dateTime.getMonth() + 1).toString();
            const year = dateTime.getFullYear().toString();
            const date = `${dayValue}/${month}/${year}`;
            weatherDataRequest = generateWeatherRequest(date);
        } else {
            weatherDataRequest = generateWeatherRequest('today');
        }
        weatherDataRequest.then((data) => {
            if (data) {
                if (data.indexOf('```json') > -1) {
                    let cleanedResponseText = data.split('```json')[1].trim();
                    data = cleanedResponseText.split("```")[0].trim();
                }
                data = JSON.parse(data);
                markerDataSource = data.map((marker: any) => ({
                    ...marker,
                    weatherImage: getWeatherImage(marker.weather_condition)
                }));
                (mapInstance as any).layers[0].markerSettings[0].dataSource = markerDataSource;
                if (buttonInstance) {
                    (mapInstance as any).annotations[0].content = '<div style="display: flex">' +
                        '<div style="background-color: dodgerblue; color:white; font-size: 16px; padding:5px 10px 5px; width: max-content;">Weather Forecast</div>' +
                        '<div style="background-color: white; color:black; font-size: 16px; padding:5px 10px 5px">' + buttonInstance.content + '</div>' +
                        '</div>';
                }
            }
        });
    }

    function generateWeatherRequest(date: string): Promise<any> {
        const prompt = 'Generate ' + date + '\'s temperature in Celsius for 15 important cities in USA as a JSON object, with fields such as "city_name", "temperature", "latitude", "longitude" and "weather_condition". The weather conditions must be sunny day, rainy day, cloudy day, snowy day and foggy day based on the temperature of the state. Strictly provide flat JSON object list alone without nested objects.';
        return (window as any).getAzureChatAIRequest({ messages: [{ role: 'user', content: prompt }] });
    }

    function getWeatherImage(condition: string): string {
        switch (condition.toLowerCase()) {
            case 'sunny day': return 'https://ej2.syncfusion.com/demos/src/maps/images/weather-clear.png';
            case 'snowy day': return 'weather-snow.svg';
            case 'foggy day': return 'weather-foggy.svg';
            case 'cloudy day': return 'https://ej2.syncfusion.com/demos/src/maps/images/weather-clouds.png';
            case 'rainy day': return 'https://ej2.syncfusion.com/demos/src/maps/images/weather-rain.png';
            default: return 'weather-unknown';
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='container'>
                    <MapsComponent
                        ref={map => mapInstance = map as MapsComponent}
                        id='Maps'
                        height='630px'
                        centerPosition={{
                            latitude: 35.07653392014242,
                            longitude: -95.40586193773237
                        }}
                        margin={{
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        }}
                        zoomSettings={{
                            enable: false,
                            maxZoom: 19,
                            zoomFactor: 5,
                            toolbarSettings: {
                                buttonSettings: {
                                    toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'],
                                }
                            }
                        }}
                        annotations={[
                            {
                                content: '<div style="display: flex">' +
                                    '<div style="background-color: dodgerblue; color:white; font-size: 16px; padding:5px 10px 5px; width: max-content;">Weather Forecast</div>' +
                                    '<div style="background-color: white; color:black; font-size: 16px; padding:5px 10px 5px">Today</div>' +
                                    '</div>',
                                x: '80%',
                                y: '0%',
                                zIndex: '1'
                            }
                        ]}
                        loaded={onMapsLoaded}
                    >
                        <LayersDirective>
                            <LayerDirective
                                urlTemplate='https://a.tile.openstreetmap.org/level/tileX/tileY.png'
                                tooltipSettings={{
                                    visible: true,
                                    valuePath: 'name'
                                }}
                                markerSettings={[{
                                    visible: true,
                                    template: '<div style="display:flex; transform:translate(-50%, -50%)">' +
                                        '<div style="background-color:black; opacity:0.8; align-content:center; padding-left:5px;padding-right:5px">' +
                                        '<img class="markerTemplate" src="${weatherImage}" alt="Weather" height="35px" width="35px" />' +
                                        '</div>' +
                                        '<div style="background-color:#fff; opacity:0.8; padding-left:5px;padding-right:5px">' +
                                        '<span style="font-size:12px;font-weight:bold">${city_name}</span><br />' +
                                        '<span style="font-size:16px;font-weight:bold">${temperature} °C</span>' +
                                        '</div>' +
                                        '</div>',
                                    dataSource: markerDataSource,
                                    animationDuration: 0,
                                }]}
                            >
                            </LayerDirective>
                        </LayersDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective x='80%' y='0%' zIndex='1'
                                content={'<div style="display: flex">' +
                                    '<div style="background-color: dodgerblue; color:white; font-size: 16px; padding:5px 10px 5px; width: max-content;">Weather Forecast</div>' +
                                    '<div style="background-color: white; color:black; font-size: 16px; padding:5px 10px 5px">Today</div>' +
                                    '</div>'}
                            ></AnnotationDirective>
                        </AnnotationsDirective>
                        <Inject services={[Marker, MapsTooltip, Zoom, Annotations]} />
                    </MapsComponent>
                    <br></br>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ButtonComponent style={{ margin: "5px" }} id="tomorrowButton" onClick={() => getWeatherData('Tomorrow')} content='Tomorrow'></ButtonComponent>
                        <ButtonComponent style={{ margin: "5px" }} id="secondDayButton" onClick={() => getWeatherData('Second Day')} content={secondDayText}></ButtonComponent>
                        <ButtonComponent style={{ margin: "5px" }} id="thirdDayButton" onClick={() => getWeatherData('Third Day')} content={thirdDayText}></ButtonComponent>
                        <ButtonComponent style={{ margin: "5px" }} id="fourthDayButton" onClick={() => getWeatherData('Fourth Day')} content={fourthDayText}></ButtonComponent>
                        <ButtonComponent style={{ margin: "5px" }} id="fifthDayButton" onClick={() => getWeatherData('Fifth Day')} content={fifthDayText}></ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherPrediction