import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { FormRendererComponent, Schema } from '@syncfusion/ej2-react-form-renderer';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { userRegistration, customerService, doctorsAppointment } from './datasource';

const SAMPLE_CSS = `
    #form-renderer-container.sb-property-border {
        position: relative !important;
        border-right-width: 1px !important;
    }
    
    #form-renderer-panel .property-panel-section {
        padding-left: 0px !important;
    }
    `;

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [formSchema, setFormSchema] = React.useState<Schema>(userRegistration);
    const [activeSchema, setActiveSchema] = React.useState<'userRegistration' | 'customerService' | 'doctorsAppointment'>('userRegistration');
    const schemaOptions = {
        userRegistration,
        customerService,
        doctorsAppointment
    };

    const changeSchema = (args: { value: 'userRegistration' | 'customerService' | 'doctorsAppointment' }) => {
        if (!args?.value) {
            return;
        }
        setActiveSchema(args.value);
        setFormSchema(schemaOptions[args.value]);
    }

    return (
        <><main>
            <style>{SAMPLE_CSS}</style>
            <div id="form-renderer-container" className="col-lg-9 control-section sb-property-border">
                <div id="form-control control-wrapper">
                    <FormRendererComponent key={activeSchema} schema={formSchema}></FormRendererComponent>
                </div>
            </div>
            <div id="form-renderer-panel" className="col-lg-3 property-section">
                <div className="property-panel-section">
                    <div className="property-panel-header" style={{ paddingBottom: "22px" }}>Select a ready-to-use form template</div>
                    <table id="property" className="property-panel-table" title="Properties"
                        style={{ width: '100%', tableLayout: "auto" }}>
                        <tbody>
                            <tr>
                                <td colSpan={2} style={{ paddingBottom: "2px" }}>
                                    <div>
                                        <RadioButtonComponent label="User Registration" name="formSchemaOption" value="userRegistration"
                                            checked={activeSchema === 'userRegistration'}
                                            change={changeSchema.bind(this)}></RadioButtonComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ paddingBottom: "2px" }}>
                                    <div>
                                        <RadioButtonComponent label="Customer Service" name="formSchemaOption" value="customerService"
                                            checked={activeSchema === 'customerService'}
                                            change={changeSchema.bind(this)}></RadioButtonComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div>
                                        <RadioButtonComponent label="Doctor Appointment" name="formSchemaOption" value="doctorsAppointment"
                                            checked={activeSchema === 'doctorsAppointment'}
                                            change={changeSchema.bind(this)}></RadioButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="action-description">
                <p>
                    The <code>FormRenderer</code> is a powerful, schema-driven component that enables you to build and render complex
                    forms with ease using a structured JSON schema definition.
                    <br />
                    This sample showcases the Form Renderer component with an intuitive property panel, allowing you to seamlessly switch
                    between predefined form schemas and explore its capabilities.</p>
            </div><div id="description">
                <p>
                    In this sample, multiple ready-to-use form templates—such as <b>User Registration</b>, <b>Customer
                        Service</b>, and <b>Doctor Appointment</b>—are displayed in the property panel using radio buttons.
                    Select any option to instantly apply the corresponding form definition to the Form Renderer component via the
                    <code>schema</code> property.
                </p>
                <p>
                    Each form can be filled out interactively and submitted for data collection, demonstrating how the component
                    streamlines form creation, customization, and data capture in real-world scenarios.
                </p>
            </div>
        </main ></>
    )
}
export default Default;