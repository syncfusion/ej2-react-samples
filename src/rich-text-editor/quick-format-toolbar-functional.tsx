/**
 * Rich Text Editor quick format toolbar sample
 */
import { HtmlEditor, Image, Inject, Link, QuickToolbar, FormatPainter, RichTextEditorComponent, Toolbar, ToolbarSettingsModel, ToolbarType, QuickToolbarSettingsModel, PasteCleanup, Table, Video, Audio} from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import './quick-format-toolbar.css';
function QuickFormatToolbar () {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let rteObj: RichTextEditorComponent;
    //Rich Text Editor ToolbarSettings
    const toolbarSettings: ToolbarSettingsModel = {
        type: ToolbarType.Expand,
        enableFloating: false
    };
    const quickToolbarSettings: QuickToolbarSettingsModel = {
        text: ['Formats', '|', 'Bold', 'Italic', 'Fontcolor', 'BackgroundColor', '|', 'CreateLink', 'Image', 'CreateTable', 'Blockquote', '|' , 'Unorderedlist', 'Orderedlist', 'Indent', 'Outdent'],
    };
    return (
        <div className='control-pane'>
            <div className='control-section' id="rte">
                <div className='rte-control-section'>
                    <RichTextEditorComponent id="quickRTE" ref={(richtexteditor) => { rteObj = richtexteditor }} toolbarSettings={toolbarSettings} quickToolbarSettings={quickToolbarSettings}>
                    <div>
                        <p>Solar energy is radiant light and heat from the sun that is harnessed and converted into usable forms of energy. It
                        is a clean, renewable, and abundant source of power that has a wide range of applications across various sectors.
                        Solar energy is typically harnessed through solar technologies, such as photovoltaic (PV) cells and solar thermal
                        systems.</p>
                        <p>Here's an overview of solar energy:</p>
                        <h3><strong>Photovoltaic (PV) solar energy:</strong></h3>
                        <p>Photovoltaic Cells: PV cells, commonly known as solar cells, convert sunlight directly into electricity. They are
                            made of semiconductor materials, often silicon, which absorb photons (particles of light) and release electrons,
                            generating an electric current.</p>
                        <p>Applications: PV solar energy is used for residential and commercial electricity generation, remote power systems,
                            and grid-connected utility-scale power plants.</p>
                        <h3><strong>Solar Thermal Energy:</strong></h3>
                        <ul>
                            <li>Concentrated Solar Power (CSP): CSP systems use mirrors or lenses to concentrate sunlight
                                onto a receiver. The collected heat is used to generate steam, which drives turbines and generates electricity.
                            </li>
                            <li>Solar Water Heating: Solar thermal systems can heat water for domestic or industrial use. They consist of solar
                                collectors that absorb sunlight and transfer heat to a fluid, which is then used for heating.</li>
                        </ul>
                        <h3><strong>Solar Energy Advantages:</strong></h3>
                        <p>Renewable and Abundant: Solar energy is virtually limitless, as the sun provides an immense and continuous supply of
                            energy.
                            Clean and Environmentally Friendly: Solar energy production does not emit greenhouse gases or other pollutants,
                            contributing to a reduced carbon footprint and improved air quality.
                            Reduced Energy Bills: Solar installations can significantly lower electricity bills for homes and businesses by
                            generating free electricity from the sun.
                            Low Operating and Maintenance Costs: Solar systems have minimal operating and maintenance costs once installed,
                            making them cost-effective over their lifespan.</p>
                        <h3><strong>Challenges and Considerations:</strong></h3>
                        <p>Intermittency: Solar energy is dependent on sunlight, which varies with weather conditions and the time of day.
                            Energy
                            storage solutions are important to ensure a continuous power supply.
                            Initial Costs: While solar energy has become more affordable, the upfront costs of solar panel installation can be a
                            barrier for some.
                            Space Requirements: Large solar installations require substantial land or roof space to achieve significant energy
                            output.
                            Efficiency and Technology: Solar panel efficiency continues to improve, but optimising energy conversion and storage
                            technologies remains a focus.</p>
                        <h3><strong>Solar Energy Applications:</strong></h3>
                        <p>Residential Energy: Homeowners can install solar panels on rooftops to generate electricity for personal use or even
                            sell excess power back to the grid.
                            Commercial and Industrial: Businesses and industries use solar energy to power their operations, reduce energy
                            costs, and meet sustainability goals.
                            Off-Grid Power: Solar power is invaluable in remote areas without access to traditional power grids, providing
                            electricity for lighting, communication, and basic needs.
                            Solar-Powered Transportation: Solar energy can be used to charge electric vehicles (EVs) and provide energy for
                            electric public transportation.
                        </p>
                        <img src="https://media.istockphoto.com/id/494417257/photo/photovoltaic-panels.jpg?s=612x612&w=0&amp;k=20&amp;c=USdqOh0Pjuyv-jOB-ny5JPV6VQ1U5PvPo-xgBuhKPxc=" width="300px" className="e-rte-image e-imginline"/>
                    </div>
                        <Inject services={[HtmlEditor, Toolbar, Image, Link, FormatPainter, QuickToolbar, PasteCleanup, Table, Video, Audio]} />
                    </RichTextEditorComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the "Quick Format Toolbar" option in Rich Text Editor content. To select the text content inside the Rich Text Editor and open the Quick Format toolbar for editing the Rich Text Editor value.</p>
            </div>
            <div id="description">
                <p>The Quick format toolbar is used to easily edit the value of the Rich Text Editor when there is a lot of content in it.
                This quick toolbar item provides any toolbar item in the Rich Text Editor. This will support all the items in the
                toolbars of the Rich Text Editor.</p>
                <p>In this demo, to enable this feature, configure the items in 
                <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/rich-text-editor/#quicktoolbarsettings'>
                quickToolbarSettings.text</a> property.</p>
                <p><b>Injecting Module</b></p>
                <p>The above features built as modules have to be included in your application. For example, to use image and link, 
                inject the specific module using <code>Toolbar, Link, Image, HtmlEditor, QuickToolbar, FormatPainter, PasteCleanup</code>.</p>
            </div>
        </div>
    );
}
export default QuickFormatToolbar;

