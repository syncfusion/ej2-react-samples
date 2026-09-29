import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { FormRendererComponent, Schema, SubmitEventArgs } from '@syncfusion/ej2-react-form-renderer';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { userRegistration, customerService } from './datasource';

type SchemaKey = 'userRegistration' | 'customerService';

const schemaOptions: Record<SchemaKey, Schema> = {
    userRegistration,
    customerService
};

const radioOptions: Array<{ key: SchemaKey; label: string }> = [
    { key: 'userRegistration',   label: 'User Registration' },
    { key: 'customerService',    label: 'Customer Service' }
];

export class Default extends SampleBase<{}, {}> {
    private selectedSchema: SchemaKey = 'userRegistration';
    private formSchema: Schema = userRegistration;

    constructor(props: {}) {
        super(props);
        this.changeSchema = this.changeSchema.bind(this);
    }

    private changeSchema(args: { value: SchemaKey }): void {
        if (!args?.value || !(args.value in schemaOptions)) {
            return;
        }
        this.selectedSchema = args.value;
        this.formSchema = schemaOptions[args.value];
        this.forceUpdate();
    }

    public render(): JSX.Element {
        return (
            <main>
                <div className="col-lg-3 property-section">
                    <div className="property-panel-section">
                        <div className="property-panel-header">Forms example</div>
                        <div id="property" className="property-panel-table" style={{ width: '100%' }}>
                            {radioOptions.map(({ key, label }) => (
                                <div key={key} style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                    <RadioButtonComponent
                                        label={label}
                                        name="formSchemaOption"
                                        value={key}
                                        checked={this.selectedSchema === key}
                                        change={this.changeSchema}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="form-content">
                    <FormRendererComponent schema={this.formSchema} />
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
                    <p>
                        Design custom forms visually and export their schema in seconds with our interactive <a href="https://ej2.syncfusion.com/react/demos/#/tailwind3/form-builder/default">Form Builder</a> — a 
                        powerful no-code tool for building responsive forms through an intuitive drag-and-drop interface.
                   </p>
                </div>
            </main>
        );
    }
}