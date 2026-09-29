import { useRef } from 'react';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { FormRendererComponent, type Schema } from '@syncfusion/ej2-react-form-renderer';
import { contactForm } from './datasource';
import { updateSampleSection } from '../common/sample-base';

type FieldData = {
	id: string;
	name: string;
	label?: string;
	placeholder?: string;
	textboxType?: string;
	minLength?: number;
	maxLength?: number;
	rows?: number;
	buttonType?: string;
	options?: Array<{ text: string; value: string }>;
};

type TemplateArgs = {
	fieldData: FieldData;
};

const SAMPLE_CSS = `
	.fr-dropdown {
		width: 100%;
		height: 32px;
		border-radius: 5px;
		background-color: inherit;
		color: inherit;
	}

	.bootstrap5\\.3 .fr-dropdown,
	.bootstrap5\\.3-dark .fr-dropdown,
	.fluent2 .fr-dropdown,
	.fluent2-dark .fr-dropdown,
	.fluent2-highcontrast .fr-dropdown,
	.tailwind3 .fr-dropdown,
	.tailwind3-dark .fr-dropdown {
		border-color: var(--color-sf-border);
	}

	.material3 .fr-dropdown,
	.material3-dark .fr-dropdown {
		border-color: rgba(var(--color-sf-outline));
	}

	.bootstrap5\\.3 .fr-dropdown option,
	.bootstrap5\\.3-dark .fr-dropdown option,
	.fluent2 .fr-dropdown option,
	.fluent2-dark .fr-dropdown option,
	.fluent2-highcontrast .fr-dropdown option {
		background-color: var(--color-sf-flyout-bg-color);
		color: var(--color-sf-content-text-color);
	}

	.material3 .fr-dropdown option {
		background-color: linear-gradient(0deg, rgba(var(--color-sf-surface), 1), rgba(var(--color-sf-surface), 1)), rgba(var(--color-sf-surface));
		color: rgba(var(--color-sf-on-surface));
	}

	.material3-dark .fr-dropdown option {
		background-color: #000;
		color: #fff;
	}

	.tailwind3 .fr-dropdown option,
	.tailwind3-dark .fr-dropdown option {
		background-color: var(--color-sf-flyout-bg-color);
		color: var(--color-sf-flyout-text-color);
	}

	.fluent2 #form-renderer-control-message,
	.fluent2-dark #form-renderer-control-message,
	.fluent2-highcontrast #form-renderer-control-message {
		height: auto;
	}

	#form-renderer-control .form-group {
		margin-bottom: 0px;
	}
`;

const CustomComponents = () => {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
	const formRendererRef = useRef<FormRendererComponent | null>(null);

	function setFieldValue(fieldData: FieldData, value: string | boolean) {
		formRendererRef.current?.setFieldValue(fieldData.id, value);
	}

	function textboxTemplate(args: TemplateArgs) {
		const { fieldData } = args;
		return (
			<input
				id={`form-renderer-control-${fieldData.id}`}
				className="e-input custom-input"
				name={fieldData.name}
				type="text"
				placeholder={fieldData.placeholder}
				minLength={fieldData.minLength}
				maxLength={fieldData.maxLength}
				onChange={(event) => setFieldValue(fieldData, event.target.value)}
				onBlur={(event) => setFieldValue(fieldData, event.target.value)}
			/>
		);
	}

	function emailTemplate(args: TemplateArgs) {
		const { fieldData } = args;
		return (
			<input
				id={`form-renderer-control-${fieldData.id}`}
				className="e-input custom-input"
				name={fieldData.name}
				type={fieldData.textboxType ?? 'email'}
				placeholder={fieldData.placeholder}
				onChange={(event) => setFieldValue(fieldData, event.target.value)}
				onBlur={(event) => setFieldValue(fieldData, event.target.value)}
			/>
		);
	}

	function dropdownTemplate(args: TemplateArgs) {
		const { fieldData } = args;
		return (
			<select
				className="fr-dropdown"
				id={`form-renderer-control-${fieldData.id}`}
				name={fieldData.name}
				defaultValue=""
				onChange={(event) => setFieldValue(fieldData, event.target.value)}
			>
				<option value="" disabled>{fieldData.placeholder}</option>
				{fieldData.options?.map((option) => (
					<option key={option.value} value={option.value}>{option.text}</option>
				))}
			</select>
		);
	}

	function textareaTemplate(args: TemplateArgs) {
		const { fieldData } = args;
		return (
			<textarea
				id={`form-renderer-control-${fieldData.id}`}
				className="e-input custom-input"
				name={fieldData.name}
				minLength={fieldData.minLength}
				maxLength={fieldData.maxLength}
				rows={fieldData.rows}
				placeholder={fieldData.placeholder}
				onChange={(event) => setFieldValue(fieldData, event.target.value)}
				onBlur={(event) => setFieldValue(fieldData, event.target.value)}
			/>
		);
	}

	function checkboxTemplate(args: TemplateArgs) {
		const { fieldData } = args;
		const controlId = `form-renderer-control-${fieldData.id}`;
		return (
			<label className="custom-checkbox" htmlFor={controlId}>
				<input
					id={controlId}
					name={fieldData.name}
					type="checkbox"
					onChange={(event) => setFieldValue(fieldData, event.target.checked)}
				/>
				<span>{fieldData.label}</span>
			</label>
		);
	}

	function submitButtonTemplate(args: TemplateArgs) {
		const { fieldData } = args;
		return (
			<button
				className="e-btn e-primary custom-submit"
				id={`form-renderer-control-${fieldData.id}`}
				name={fieldData.name}
				type={(fieldData.buttonType ?? 'submit') as 'button' | 'submit' | 'reset'}
			>
				{fieldData.label}
			</button>
		);
	}

	return (
		<main>
			<style>{SAMPLE_CSS}</style>
			<div>
				<div className="col-lg-12 control-section">
					<div id="form-control control-wrapper" style={{ paddingLeft: 100, paddingRight: 100 }}>
						<FormRendererComponent
							ref={formRendererRef}
							schema={contactForm as Schema}
							customWidgetSettings={[
								{ templateId: 'textboxTemplate', template: textboxTemplate },
								{ templateId: 'emailTemplate', template: emailTemplate },
								{ type: 'dropdown', template: dropdownTemplate },
								{ type: 'textarea', template: textareaTemplate },
								{ type: 'checkbox', template: checkboxTemplate },
								{ type: 'button', template: submitButtonTemplate }
							]}
						/>
					</div>
				</div>
			</div>
			<div id="action-description">
				<p>
					This sample demonstrates how to render custom components for individual form field components in the Form Renderer control.
					Templates allow you to replace the built-in form components with custom or third-party UI components, enabling greater flexibility and customization.
				</p>
			</div>
			<div id="description">
				<p>
					In this sample, a "Contact Us" form is rendered using the Form Renderer control. The text box, text area, drop-down list, checkbox, and button fields are customized using HTML templates.
				</p>
				<p>
					Users can interactively fill out the form, benefit from built-in validation, and submit their responses for data collection.
				</p>
				<p>
					Design custom forms visually and export their schema in seconds with our interactive{' '}
					<a href="https://ej2.syncfusion.com/react/demos/#/tailwind3/form-builder/default">Form Builder</a> — a powerful no-code tool for building responsive forms through an intuitive drag-and-drop interface.
				</p>
			</div>
		</main>
	);
}

export default CustomComponents;
