import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { SkeletonComponent } from '@syncfusion/ej2-react-notifications';
import { updateSampleSection } from '../common/sample-base';
import './default.css';
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className="control-section">
            <div className="row skeleton-row">
                <div className="col-sm-6 container">
                    <h5>Circle</h5>
                    <SkeletonComponent className='skeleton' id='skeletonCircleSmall' shape='Circle' width='3rem'></SkeletonComponent>
                    <SkeletonComponent className='skeleton' id='skeletonCircleMedium' shape='Circle' width='48px'></SkeletonComponent>
                    <SkeletonComponent className='skeleton' id='skeletonCircleLarge' shape='Circle' width='64px'></SkeletonComponent>
                    <SkeletonComponent className='skeleton' id='skeletonCircleLarger' shape='Circle' width='80px'></SkeletonComponent>
                </div>
                <div className="col-sm-6 container">
                    <h5>Square</h5>
                    <SkeletonComponent className='skeleton' id='skeletonSquareSmall' shape='Square' width='3rem'></SkeletonComponent>
                    <SkeletonComponent className='skeleton' id='skeletonSquareMedium' shape='Square' width='48px'></SkeletonComponent>
                    <SkeletonComponent className='skeleton' id='skeletonSquareLarge' shape='Square' width='64px'></SkeletonComponent>
                    <SkeletonComponent className='skeleton' id='skeletonSquareLarger' shape='Square' width='80px'></SkeletonComponent>
                </div>
            </div>
            <div className="row skeleton-row">
                <div className="col-sm-6 container">
                    <h5>Text</h5>
                    <SkeletonComponent id='skeletonText' shape='Text' width='100%' height='15px'></SkeletonComponent>
                    <SkeletonComponent id='skeletonTextMedium' width='30%' height='15px'></SkeletonComponent><br />
                    <SkeletonComponent id='skeletonTextSmall' width='15%' height='15px'></SkeletonComponent><br />
                    <SkeletonComponent id='skeletonTextMedium1' width='60%' height='15px'></SkeletonComponent><br />
                    <SkeletonComponent id='skeletonTextSmall1' width='15%' height='15px'></SkeletonComponent>
                </div>
                <div className="col-sm-6 container">
                    <h5>Rectangle</h5>
                    <SkeletonComponent id='skeletonRectangle' shape='Rectangle' width='100%' height='100px'></SkeletonComponent>
                    <SkeletonComponent id='skeletonRectangleMedium' shape='Rectangle' width='20%' height='35px'></SkeletonComponent>
                    <SkeletonComponent id='skeletonRectangleMediumRight' shape='Rectangle' width='20%' height='35px'></SkeletonComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the different shapes supported by the skeleton component. The skeleton is an animating placeholder which shows the expected layout before the actual content is loaded.
                </p>
            </div>
            <div id="description">
                <p>
                    The shape of skeleton can be changed using the <code>shape</code> property. It supports <b>Circle</b>, <b>Square</b>, <b>Text</b> and <b>Rectangle</b>. By default, the wave animation effect is applied.
                </p>
            </div>
        </div>
    )
}
export default Default;