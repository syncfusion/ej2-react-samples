import * as React from 'react';
import {
  DiagramComponent,
  NodeModel,
  NodeConstraints,
  ConnectorModel,
  ConnectorConstraints,
  SnapConstraints,
  SelectorConstraints,
  IRotationEventArgs,
} from '@syncfusion/ej2-react-diagrams';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Annotations, CircularGauge } from '@syncfusion/ej2-circulargauge';
import { Message } from '@syncfusion/ej2-notifications';
import { NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { updateSampleSection } from '../common/sample-base';

CircularGauge.Inject(Annotations);

// References
let diagram: DiagramComponent;
let locationDropdown: DropDownList;
let efficiencyGauge: CircularGauge;
let performanceMessage: Message;
let angleNumeric: NumericTextBox;

// Guards
let suppressAngleChange = false;
let lastValidRelativeAngle = 0;

// Model
let solarData: SolarCalculationData;

// Location data
const locationData: LocationData[] = [
  { name: 'New York', latitude: 40.7128, longitude: -74.006, angle: 0 },
  { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437, angle: 25 },
  { name: 'Chicago', latitude: 41.8781, longitude: -87.6298, angle: 50 },
  { name: 'Houston', latitude: 29.7604, longitude: -95.3698, angle: 75 },
  { name: 'Phoenix', latitude: 33.4484, longitude: -112.074, angle: 100 },
];

// SVGs
const centerSunSvg: string = "<svg width=\"76\" height=\"76\" viewBox=\"0 0 76 76\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">            <g filter=\"url(#filter0_d_1423_96)\">                <circle cx=\"37.9998\" cy=\"38\" r=\"17.2727\" fill=\"url(#paint0_radial_1423_96)\" />            </g>            <g filter=\"url(#filter1_d_1423_96)\">                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M38.0001 6.33331C36.4102 6.33331 35.1213 7.62219 35.1213 9.2121V14.9697C35.1213 16.5596 36.4102 17.8485 38.0001 17.8485C39.59 17.8485 40.8788 16.5596 40.8788 14.9697V9.2121C40.8788 7.62219 39.59 6.33331 38.0001 6.33331ZM60.3915 15.6082C59.2672 14.484 57.4445 14.484 56.3202 15.6082L52.249 19.6794C51.1248 20.8037 51.1248 22.6264 52.249 23.7507C53.3733 24.8749 55.196 24.8749 56.3203 23.7507L60.3915 19.6794C61.5157 18.5552 61.5157 16.7325 60.3915 15.6082ZM66.7877 35.1212C68.3776 35.1212 69.6665 36.41 69.6665 38C69.6665 39.5899 68.3776 40.8787 66.7877 40.8787H61.0301C59.4402 40.8787 58.1513 39.5899 58.1513 38C58.1513 36.41 59.4402 35.1212 61.0301 35.1212H66.7877ZM15.6077 15.6083C14.4834 16.7326 14.4834 18.5553 15.6077 19.6796L19.6789 23.7508C20.8031 24.875 22.6259 24.875 23.7501 23.7508C24.8744 22.6265 24.8744 20.8038 23.7501 19.6796L19.6789 15.6083C18.5547 14.4841 16.7319 14.4841 15.6077 15.6083ZM35.1213 61.0302C35.1213 59.4403 36.4102 58.1514 38.0001 58.1514C39.59 58.1514 40.8788 59.4403 40.8788 61.0302V66.7878C40.8788 68.3777 39.59 69.6666 38.0001 69.6666C36.4102 69.6666 35.1213 68.3777 35.1213 66.7878V61.0302ZM23.7511 52.2492C22.6269 51.125 20.8041 51.125 19.6799 52.2492L15.6087 56.3204C14.4844 57.4447 14.4844 59.2674 15.6087 60.3917C16.7329 61.5159 18.5557 61.5159 19.6799 60.3917L23.7511 56.3204C24.8754 55.1962 24.8754 53.3735 23.7511 52.2492ZM14.9696 35.1212C16.5595 35.1212 17.8484 36.41 17.8484 38C17.8484 39.5899 16.5595 40.8787 14.9696 40.8787H9.21204C7.62213 40.8787 6.33325 39.5899 6.33325 38C6.33325 36.41 7.62213 35.1212 9.21204 35.1212H14.9696ZM52.2491 52.2492C51.1248 53.3734 51.1248 55.1962 52.2491 56.3204L56.3203 60.3916C57.4445 61.5159 59.2673 61.5159 60.3915 60.3916C61.5157 59.2674 61.5157 57.4447 60.3915 56.3204L56.3203 52.2492C55.196 51.125 53.3733 51.125 52.2491 52.2492Z\" fill=\"url(#paint1_linear_1423_96)\" />            </g>            <defs>                <filter id=\"filter0_d_1423_96\" x=\"16.9271\" y=\"16.9272\" width=\"42.9899\" height=\"42.9899\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">                    <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />                    <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\" />                    <feOffset dx=\"0.422222\" dy=\"0.422222\" />                    <feGaussianBlur stdDeviation=\"2.11111\" />                    <feComposite in2=\"hardAlpha\" operator=\"out\" />                    <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0\" />                    <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_1423_96\" />                    <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_1423_96\" result=\"shape\" />                </filter>                <filter id=\"filter1_d_1423_96\" x=\"2.53325\" y=\"2.53331\" width=\"71.7777\" height=\"71.7777\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">                    <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />                    <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\" />                    <feOffset dx=\"0.422222\" dy=\"0.422222\" />                    <feGaussianBlur stdDeviation=\"2.11111\" />                    <feComposite in2=\"hardAlpha\" operator=\"out\" />                    <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0\" />                    <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_1423_96\" />                    <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_1423_96\" result=\"shape\" />                </filter>                <radialGradient id=\"paint0_radial_1423_96\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(41.9506 27.1674) rotate(180) scale(32.7949)\">                    <stop stop-color=\"#FFF4C3\" />                    <stop offset=\"0.16\" stop-color=\"#FFE036\" />                    <stop offset=\"1\" stop-color=\"#FA761C\" />                </radialGradient>                <linearGradient id=\"paint1_linear_1423_96\" x1=\"66.8754\" y1=\"5.38557\" x2=\"10.5535\" y2=\"67.6553\" gradientUnits=\"userSpaceOnUse\">                    <stop stop-color=\"#FFBA24\" />                    <stop offset=\"1\" stop-color=\"#FF5500\" />                </linearGradient>            </defs>        </svg>";
const eastSunSvg: string = "<svg width=\"76\" height=\"76\" viewBox=\"0 0 76 76\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">            <g clip-path=\"url(#clip0_7964_371)\">                <g filter=\"url(#filter0_d_7964_371)\">                    <path d=\"M14.9707 35.1214C16.5606 35.1214 17.8496 36.4104 17.8496 38.0003C17.8494 39.59 16.5605 40.8792 14.9707 40.8792H9.21289C7.62318 40.8791 6.33416 39.59 6.33398 38.0003C6.33398 36.4105 7.62307 35.1215 9.21289 35.1214H14.9707ZM66.7881 35.1214C68.3778 35.1216 69.666 36.4105 69.666 38.0003C69.6658 39.5899 68.3777 40.879 66.7881 40.8792H61.0303C59.4405 40.8792 58.1515 39.5901 58.1514 38.0003C58.1514 36.4104 59.4404 35.1214 61.0303 35.1214H66.7881ZM15.6074 15.6087C16.7317 14.4845 18.5545 14.4845 19.6787 15.6087L23.75 19.68C24.8737 20.8041 24.8737 22.6262 23.75 23.7503C22.6259 24.8744 20.803 24.8751 19.6787 23.7513L15.6074 19.68C14.4832 18.5558 14.4832 16.7329 15.6074 15.6087ZM56.3203 15.6087C57.4445 14.4845 59.2674 14.4845 60.3916 15.6087C61.5158 16.7329 61.5158 18.5558 60.3916 19.68L56.3203 23.7513C55.1962 24.8749 53.3741 24.8749 52.25 23.7513C51.1258 22.627 51.1258 20.8042 52.25 19.68L56.3203 15.6087ZM38.001 6.33331C39.5907 6.33352 40.8789 7.62244 40.8789 9.21222V14.97C40.8787 16.5597 39.5906 17.8487 38.001 17.8489C36.4112 17.8489 35.1222 16.5598 35.1221 14.97V9.21222C35.1221 7.62231 36.4111 6.33331 38.001 6.33331Z\" fill=\"url(#paint0_linear_7964_371)\" />                </g>                <g filter=\"url(#filter1_d_7964_371)\">                    <path d=\"M56.9995 63.3337C58.1653 63.3337 59.1106 64.2783 59.1108 65.444C59.1108 66.61 58.1654 67.5554 56.9995 67.5554H23.2222C22.0562 67.5554 21.1108 66.61 21.1108 65.444C21.1111 64.2783 22.0564 63.3337 23.2222 63.3337H56.9995ZM37.9995 50.6667C39.1654 50.6667 40.1108 51.6121 40.1108 52.778C40.1107 53.9438 39.1654 54.8893 37.9995 54.8893H4.22217C3.05631 54.8893 2.11097 53.9438 2.11084 52.778C2.11084 51.6121 3.05623 50.6667 4.22217 50.6667H37.9995ZM71.7778 50.6667C72.9437 50.6668 73.8892 51.6122 73.8892 52.778C73.889 53.9438 72.9436 54.8892 71.7778 54.8893H46.4438C45.2782 54.8891 44.3336 53.9437 44.3335 52.778C44.3335 51.6122 45.2781 50.6669 46.4438 50.6667H71.7778Z\" fill=\"url(#paint1_radial_7964_371)\" />                </g>                <g filter=\"url(#filter2_d_7964_371)\">                    <path d=\"M38 20.7271C47.5394 20.7271 55.2733 28.4602 55.2734 37.9996C55.2734 39.4562 55.0924 40.8709 54.7529 42.2222H21.248C20.9085 40.8709 20.7275 39.4562 20.7275 37.9996C20.7277 28.4603 28.4607 20.7273 38 20.7271Z\" fill=\"url(#paint2_radial_7964_371)\" />                </g>            </g>            <defs>                <filter id=\"filter0_d_7964_371\" x=\"2.53398\" y=\"2.53331\" width=\"71.7765\" height=\"42.9903\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">                    <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />                    <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\" />                    <feOffset dx=\"0.422222\" dy=\"0.422222\" />                    <feGaussianBlur stdDeviation=\"2.11111\" />                    <feComposite in2=\"hardAlpha\" operator=\"out\" />                    <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0\" />                    <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_7964_371\" />                    <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_7964_371\" result=\"shape\" />                </filter>                <filter id=\"filter1_d_7964_371\" x=\"-1.68916\" y=\"46.8667\" width=\"80.2228\" height=\"25.3331\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">                    <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />                    <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\" />                    <feOffset dx=\"0.422222\" dy=\"0.422222\" />                    <feGaussianBlur stdDeviation=\"2.11111\" />                    <feComposite in2=\"hardAlpha\" operator=\"out\" />                    <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0\" />                    <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_7964_371\" />                    <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_7964_371\" result=\"shape\" />                </filter>                <filter id=\"filter2_d_7964_371\" x=\"16.9275\" y=\"16.9271\" width=\"42.9903\" height=\"29.9396\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">                    <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />                    <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\" />                    <feOffset dx=\"0.422222\" dy=\"0.422222\" />                    <feGaussianBlur stdDeviation=\"2.11111\" />                    <feComposite in2=\"hardAlpha\" operator=\"out\" />                    <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0\" />                    <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_7964_371\" />                    <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_7964_371\" result=\"shape\" />                </filter>                <linearGradient id=\"paint0_linear_7964_371\" x1=\"66.875\" y1=\"5.81636\" x2=\"42.3723\" y2=\"55.4803\" gradientUnits=\"userSpaceOnUse\">                    <stop stop-color=\"#FFBA24\" />                    <stop offset=\"1\" stop-color=\"#FF5500\" />                </linearGradient>                <radialGradient id=\"paint1_radial_7964_371\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(49.6112 64.3887) rotate(-168.69) scale(48.441 24.199)\">                    <stop stop-color=\"#FFBA24\" />                    <stop offset=\"1\" stop-color=\"#FF5500\" />                </radialGradient>                <radialGradient id=\"paint2_radial_7964_371\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(41.9513 27.1673) rotate(180) scale(32.7953 32.7951)\">                    <stop stop-color=\"#FFF4C3\" />                    <stop offset=\"0.16\" stop-color=\"#FFE036\" />                    <stop offset=\"1\" stop-color=\"#FA761C\" />                </radialGradient>                <clipPath id=\"clip0_7964_371\">                    <rect width=\"76\" height=\"76\" fill=\"white\" />                </clipPath>            </defs>        </svg>";
const westSunSvg: string = "<svg width=\"76\" height=\"76\" viewBox=\"0 0 76 76\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">            <g clip-path=\"url(#clip0_7964_385)\">                <g filter=\"url(#filter0_d_7964_385)\">                    <path d=\"M56.9998 61.2225C58.1655 61.2225 59.1108 62.1672 59.1111 63.3329C59.1111 64.4988 58.1657 65.4442 56.9998 65.4442H23.2224C22.0565 65.4442 21.1111 64.4988 21.1111 63.3329C21.1113 62.1672 22.0566 61.2225 23.2224 61.2225H56.9998ZM37.9998 48.5555C39.1657 48.5555 40.1111 49.5009 40.1111 50.6669C40.111 51.8327 39.1656 52.7782 37.9998 52.7782H4.22241C3.05655 52.7782 2.11119 51.8327 2.11108 50.6669C2.11108 49.5009 3.05648 48.5555 4.22241 48.5555H37.9998ZM71.7781 48.5555C72.9438 48.5557 73.8884 49.5011 73.8884 50.6669C73.8883 51.8326 72.9438 52.778 71.7781 52.7782H48.5554C47.3896 52.7782 46.4442 51.8327 46.4441 50.6669C46.4441 49.501 47.3895 48.5556 48.5554 48.5555H71.7781Z\" fill=\"url(#paint0_radial_7964_385)\" />                </g>                <g filter=\"url(#filter1_d_7964_385)\">                    <path d=\"M37.7803 8.17151C51.8926 8.17156 63.333 19.6119 63.333 33.7242C63.333 35.8791 63.0648 37.9713 62.5625 39.9703H12.998C12.4958 37.9713 12.2275 35.8791 12.2275 33.7242C12.2275 19.6119 23.6679 8.17151 37.7803 8.17151Z\" fill=\"url(#paint1_radial_7964_385)\" />                </g>            </g>            <defs>                <filter id=\"filter0_d_7964_385\" x=\"-1.68892\" y=\"44.7555\" width=\"80.2218\" height=\"25.3331\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">                    <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />                    <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\" />                    <feOffset dx=\"0.422222\" dy=\"0.422222\" />                    <feGaussianBlur stdDeviation=\"2.11111\" />                    <feComposite in2=\"hardAlpha\" operator=\"out\" />                    <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0\" />                    <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_7964_385\" />                    <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_7964_385\" result=\"shape\" />                </filter>                <filter id=\"filter1_d_7964_385\" x=\"8.42754\" y=\"4.37151\" width=\"59.5499\" height=\"40.2433\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">                    <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\" />                    <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\" />                    <feOffset dx=\"0.422222\" dy=\"0.422222\" />                    <feGaussianBlur stdDeviation=\"2.11111\" />                    <feComposite in2=\"hardAlpha\" operator=\"out\" />                    <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0.156863 0 0 0 0 0.305882 0 0 0 0.25 0\" />                    <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_7964_385\" />                    <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_7964_385\" result=\"shape\" />                </filter>                <radialGradient id=\"paint0_radial_7964_385\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(39.8314 62.2776) rotate(-165.864) scale(38.8982 23.931)\">                    <stop stop-color=\"#FFBA24\" />                    <stop offset=\"1\" stop-color=\"#FF5500\" />                </radialGradient>                <radialGradient id=\"paint1_radial_7964_385\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(46.0737 36.9531) rotate(-153.435) scale(41.1658 41.1657)\">                    <stop stop-color=\"#FFF4C3\" />                    <stop offset=\"0.28125\" stop-color=\"#FFE036\" />                    <stop offset=\"0.598958\" stop-color=\"#FA761C\" />                </radialGradient>                <clipPath id=\"clip0_7964_385\">                    <rect width=\"76\" height=\"76\" fill=\"white\" />                </clipPath>            </defs>        </svg>";

function initializeDiagram(): { nodes: NodeModel[]; connectors: ConnectorModel[] } {
  const nodes: NodeModel[] = [
    { id: 'title', width: 450, height: 80, offsetX: 485, offsetY: 135, constraints: NodeConstraints.None,
      shape: { type: 'Text', content: 'SMART SOLAR PANEL TILT SYSTEM' },
      style: { color: '#2c3e50', fill: 'transparent', fontFamily: 'Segoe UI', fontSize: 26, bold: true } },
    { id: 'eastSun', width: 60, height: 60, offsetX: 221, offsetY: 422, constraints: NodeConstraints.None,
      shape: { type: 'Native', content: eastSunSvg } },
    { id: 'centerSun', width: 60, height: 60, offsetX: 483, offsetY: 293, constraints: NodeConstraints.None,
      shape: { type: 'Native', content: centerSunSvg } },
    { id: 'westSun', width: 60, height: 45, offsetX: 731, offsetY: 422, constraints: NodeConstraints.None,
      shape: { type: 'Native', content: westSunSvg } },
    { id: 'eastLabel', width: 60, height: 30, offsetX: 238, offsetY: 365, constraints: NodeConstraints.None,
      shape: { type: 'Text', content: 'EAST' },
      style: { color: '#34495e', fill: 'transparent', fontFamily: 'Segoe UI', fontSize: 14, bold: true } },
    { id: 'westLabel', width: 60, height: 30, offsetX: 725, offsetY: 365, constraints: NodeConstraints.None,
      shape: { type: 'Text', content: 'WEST' },
      style: { color: '#34495e', fill: 'transparent', fontFamily: 'Segoe UI', fontSize: 14, bold: true } },
    { id: 'groundLine', width: 500, height: 5, offsetX: 489, offsetY: 657, constraints: NodeConstraints.None,
      style: { fill: '#2E485F', strokeColor: '#2E485F', strokeWidth: 2 } },
    { id: 'supportPost', width: 215, height: 185, offsetX: 465, offsetY: 565, constraints: NodeConstraints.None,
      shape: { type: 'Image', source: './src/diagram/Images/angle/panelSupport.png' },
      style: { fill: 'transparent', strokeColor: 'transparent' } },
    { id: 'solarPanelFrame', width: 260, height: 50, offsetX: 478.25, offsetY: 485,
      rotateAngle: solarData.currentAngle, constraints: (NodeConstraints.Default | NodeConstraints.ReadOnly) & ~NodeConstraints.Drag,
      pivot: { x: 0.5, y: 0.8 }, shape: { type: 'Image', source: './src/diagram/Images/angle/solarPanel.png' },
      style: { fill: 'transparent', strokeColor: 'transparent' } },
    { id: 'pivotPoint', width: 16, height: 16, offsetX: 478.5, offsetY: 488, constraints: NodeConstraints.None,
      shape: { type: 'Basic', shape: 'Ellipse' }, style: { fill: '#FF5F1F', strokeColor: '#2E485F', strokeWidth: 1 } },
    { id: 'location', offsetX: 1130, offsetY: 100, width: 300, height: 150, constraints: NodeConstraints.None,
      shape: { type: 'HTML', content: `
        <div class="angle-control-section" style="height:150px; width:300px">
          <div class="angle-control-label" style="font-size:18px; font-weight:600">Select location</div>
          <div id="locationDropdown"></div>
        </div>` } },
    { id: 'efficiency', offsetX: 1130, offsetY: 383, width: 300, height: 350, constraints: NodeConstraints.None,
      shape: { type: 'HTML', content: `
        <div class="efficiency-section" style="width:300px; height:345px;">
          <h3 class="angle-control-label" style="font-size:18px; font-weight:600">System Efficiency</h3>
          <div style="width: 210px; height:180px; margin:auto;"><div id="efficiencyGauge"></div></div>
          <div style="width:250px;"><div id="performanceMessage"></div></div>
        </div>` } },
    { id: 'angle', offsetX: 1130, offsetY: 680, width: 300, height: 185, constraints: NodeConstraints.None,
      shape: { type: 'HTML', content: `
        <div class="angle-control-section" style="width: 300px; height: 185px;">
          <div class="angle-control-label" style="font-size:18px; font-weight:600">Tilt Angle</div>
          <div><input id="angleValue" style="height:40px !important;font-size:large" /></div>
          <div class="angle-description" id="angleDescription">${getAngleDescription()}</div>
        </div>` } },
  ];

  const connectors: ConnectorModel[] = [
    {
      id: 'sunPath',
      zIndex: 1,
      type: 'Bezier',
      constraints: ConnectorConstraints.None,
      sourcePoint: { x: 221, y: 422 },
      targetPoint: { x: 731, y: 422 },
      segments: [{ type: 'Bezier', point1: { x: 350, y: 260 }, point2: { x: 610, y: 260 } }],
      style: { strokeColor: '#3498db', strokeWidth: 3, strokeDashArray: '10,5', opacity: 0.8 },
      sourceDecorator: { shape: 'None' },
      targetDecorator: { shape: 'None' },
    },
  ];

  return { nodes, connectors };
}

// Rotation
function onRotationChange(args: IRotationEventArgs): void {
  if (args.state === 'Completed') {
    if (args.source?.nodes?.[0]?.id === 'solarPanelFrame') {
      solarData.currentAngle = parseInt(args.newValue.rotateAngle.toString());
      angleCalculation();
      calculateSolarPosition();
      calculateEfficiency();
      updateUI();
    }
  } else if (args.state === 'Progress') {
    if (args.source?.nodes?.[0]?.id === 'solarPanelFrame') {
      const proposedAngle = args.newValue.rotateAngle;
      let normalizedAngle = proposedAngle % 360;
      if (normalizedAngle < 0) normalizedAngle += 360;
      if (!((normalizedAngle >= 303 && normalizedAngle <= 360) || (normalizedAngle >= 0 && normalizedAngle <= 44))) {
        args.cancel = true;
      }
    }
  }
}

// Location dropdown
function initializeLocationDropdown(): void {
  const locationOptions = locationData.map((location) => ({ text: location.name, value: location.name }));
  if (locationDropdown) locationDropdown.destroy();

  locationDropdown = new DropDownList({
    dataSource: locationOptions,
    fields: { text: 'text', value: 'value' },
    value: solarData.selectedLocation,
    placeholder: 'Select a location',
    change: onLocationChanged,
  });
  locationDropdown.appendTo('#locationDropdown');
}

function onLocationChanged(args: any): void {
  solarData.selectedLocation = args.value;
  const loc = getLocationData(solarData.selectedLocation);
  if (!loc) return;

  const locationAngle = Math.min(100, loc.angle);
  if (locationAngle <= 57) {
    solarData.currentAngle = 303 + locationAngle;
  } else {
    solarData.currentAngle = locationAngle - 57;
  }
  angleCalculation();
  calculateSolarPosition();
  calculateEfficiency();
  updateDiagram();
  updateUI();
}

// Gauge
function initializeEfficiencyGauge(): void {
  if (efficiencyGauge) efficiencyGauge.destroy();
  efficiencyGauge = new CircularGauge({
    width: '200px',
    height: '200px',
    background: 'transparent',
    axes: [
      {
        startAngle: 225,
        endAngle: 45,
        minimum: 0,
        maximum: 100,
        radius: '95%',
        lineStyle: { width: 15, color: '#F2F4F6' },
        majorTicks: { height: 0 },
        minorTicks: { height: 0 },
        labelStyle: { font: { size: '0px' } },
        ranges: [
          { start: 0, end: 40, color: '#EF5B2E', startWidth: 18, endWidth: 18 },
          { start: 40, end: 60, color: '#FEA714', startWidth: 18, endWidth: 18 },
          { start: 60, end: 90, color: '#3ABA47', startWidth: 18, endWidth: 18 },
        ],
        pointers: [
          { type: 'Marker', value: solarData.efficiency, markerShape: 'Triangle', markerHeight: 25, markerWidth: 6, radius: '85%', color: '#111', animation: { enable: false } },
        ],
        annotations: [
          {
            angle: 90,
            radius: '0%',
            zIndex: '1',
            content: `
              <div style="text-align: center;">
                <div style="font-size: 20px; font-weight: bold; color: #1A2A3B;" id="gaugeEfficiencyValue">
                  ${Math.round(solarData.efficiency)}<span style="font-size:20px; font-weight:500;">%</span>
                </div>
                <div style="font-size: 14px; font-weight: 500; color: #888; margin-top: 5px; text-align: right; padding-left: 10px; text-transform: uppercase;">
                  EFFICIENCY
                </div>
              </div>`,
          },
        ],
      },
    ],
  });
  efficiencyGauge.appendTo('#efficiencyGauge');
}

// Message
function initializePerformanceMessage(): void {
  const efficiencyMsg = getPerformanceMessage();
  if (performanceMessage) performanceMessage.destroy();
  performanceMessage = new Message({
    content: efficiencyMsg.message,
    severity: efficiencyMsg.severity,
    showIcon: true,
    cssClass: 'performance-message',
    visible: true,
    showCloseIcon: false,
  });
  performanceMessage.appendTo('#performanceMessage');
}

// Angle controls
function initializeAngleControls(): void {
  if (angleNumeric) angleNumeric.destroy();

  const relativeAngle = solarData.intPanelAngleDeg - 57;
  lastValidRelativeAngle = relativeAngle;

  angleNumeric = new NumericTextBox({
    min: -57,
    max: 43,
    strictMode: true,
    step: 1,
    decimals: 0,
    format: 'n0',
    value: relativeAngle,
    showSpinButton: true,
    change: (args: ChangeEventArgs) => {
      if (suppressAngleChange) return;
      const val = typeof args.value === 'number' ? args.value : angleNumeric.value;
      if (typeof val === 'number') applyRelativeAngle(val);
    },
  });
  angleNumeric.appendTo('#angleValue');

  const inputEl = document.getElementById('angleValue');
  if (inputEl) {
    ['pointerdown', 'mousedown', 'touchstart', 'click'].forEach((evt) =>
      inputEl.addEventListener(evt, (e: Event) => e.stopPropagation())
    );
    inputEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        (inputEl as HTMLElement).blur();
        setTimeout(() => (inputEl as HTMLElement).focus(), 0);
      }
      e.stopPropagation();
    });
  }

  document.addEventListener(
    'keydown',
    function onDocKeydown(e: KeyboardEvent) {
      const input = document.getElementById('angleValue');
      const active = document.activeElement as HTMLElement | null;
      if (active && (active === input || active?.closest('.e-input-group') === input?.closest('.e-input-group')))
        return;
      const key = e.key;
      const isEditKey = (key >= '0' && key <= '9') || key === '+' || key === '-' || key === 'Backspace' || key === 'Delete';
      if (isEditKey) {
        e.stopPropagation();
        e.preventDefault();
        if (input) {
          (input as HTMLElement).focus();
          setTimeout(() => {
            try {
              (input as HTMLInputElement).select();
            } catch {}
          }, 0);
        }
      }
    },
    { capture: true }
  );
}

// Mapping
function applyRelativeAngle(val: number | null | undefined) {
  if (typeof val !== 'number') return;
  let r = Math.round(val);
  if (r < -57) r = -57;
  if (r > 43) r = 43;
  lastValidRelativeAngle = r;

  const rotateAngle = r < 0 ? r + 360 : r;
  solarData.currentAngle = rotateAngle % 360;

  updateDiagram();
  angleCalculation();
  calculateSolarPosition();
  calculateEfficiency();
  updateUI();
}

// Calculations
function angleCalculation(): void {
  const normalizedAngle = solarData.currentAngle;
  if (normalizedAngle >= 303 && normalizedAngle <= 360) {
    solarData.intPanelAngleDeg = normalizedAngle - 303;
  } else if (normalizedAngle >= 0 && normalizedAngle <= 43) {
    solarData.intPanelAngleDeg = 57 + normalizedAngle;
  } else {
    solarData.intPanelAngleDeg = Math.max(0, Math.min(100, solarData.intPanelAngleDeg));
  }
}

function calculateSolarPosition() {
  const location = getLocationData(solarData.selectedLocation);
  if (!location) return;
  const lat = (location.latitude * Math.PI) / 180.0;
  const selectedDateForCalculation = new Date(solarData.selectedDateTime);
  const startOfYearForCalculation = new Date(selectedDateForCalculation.getFullYear(), 0, 1);
  const dayOfYear =
    Math.ceil((selectedDateForCalculation.getTime() - startOfYearForCalculation.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const declination = (23.45 * Math.PI) / 180.0 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365.0);
  const hourAngle = 0;
  const elevation = Math.asin(Math.sin(declination) * Math.sin(lat) + Math.cos(declination) * Math.cos(lat) * Math.cos(hourAngle));
  solarData.sunElevation = Math.max(0, (elevation * 180.0) / Math.PI);
  solarData.sunAzimuth = 180.0;
  solarData.optimalTilt = Math.max(0, Math.min(60, Math.abs(location.latitude)));
  if (solarData.sunElevation > 0) {
    const elevationRad = elevation;
    let airMass = 1.0 / Math.sin(elevationRad);
    airMass = Math.max(1.0, Math.min(40.0, airMass));
    solarData.solarIrradiance = 1353 * Math.pow(0.7, Math.pow(airMass, 0.678)) * Math.sin(elevationRad);
    solarData.solarIrradiance = Math.max(0, solarData.solarIrradiance);
  } else {
    solarData.solarIrradiance = 0;
  }
}

function calculateEfficiency() {
  if (solarData.sunElevation <= 0) {
    solarData.efficiency = 0;
    solarData.incidenceAngle = 90;
    return;
  }
  const panelTiltRad = (solarData.intPanelAngleDeg * Math.PI) / 180.0;
  const sunElevRad = (solarData.sunElevation * Math.PI) / 180.0;
  const azimuthDiff = 0;

  let cosIncidence = Math.sin(sunElevRad) * Math.cos(panelTiltRad) + Math.cos(sunElevRad) * Math.sin(panelTiltRad) * Math.cos(azimuthDiff);
  cosIncidence = Math.max(0, Math.min(1, cosIncidence));
  solarData.incidenceAngle = (Math.acos(cosIncidence) * 180.0) / Math.PI;

  const irradianceFactor = Math.min(1.0, solarData.solarIrradiance / 900.0);
  const temperatureFactor = 0.95;
  const systemLossFactor = 0.95;
  const optimalAngleDiff = Math.abs(solarData.intPanelAngleDeg - solarData.optimalTilt);
  const optimalAngleFactor = Math.max(0.9, 1.0 - (optimalAngleDiff / 90.0) * 0.2);

  let eff = 100.0 * cosIncidence * irradianceFactor * temperatureFactor * systemLossFactor * optimalAngleFactor;
  if (optimalAngleDiff < 5) eff = Math.min(100, eff * 1.08);
  solarData.efficiency = Math.max(0, Math.min(100, eff));
}

// UI
function updateDiagram(): void {
  if (!diagram) return;
  const solarPanelNode = diagram.getObject('solarPanelFrame') as NodeModel;
  if (solarPanelNode) {
    solarPanelNode.rotateAngle = solarData.currentAngle;
    diagram.dataBind();
  }
}

function syncAngleInputFromModel(): void {
  if (!angleNumeric) return;
  const relativeAngle = solarData.intPanelAngleDeg - 57;
  suppressAngleChange = true;
  angleNumeric.value = relativeAngle;
  angleNumeric.dataBind();
  suppressAngleChange = false;
  lastValidRelativeAngle = relativeAngle;
}

function updateUI(): void {
  syncAngleInputFromModel();

  const angleDescElement = document.getElementById('angleDescription');
  if (angleDescElement) angleDescElement.textContent = getAngleDescription();

  if (efficiencyGauge) {
    efficiencyGauge.axes[0].pointers[0].value = solarData.efficiency;
    efficiencyGauge.axes[0].annotations[0].content = `
      <div style="text-align: center;">
        <div style="font-size: 20px; font-weight: bold; color: #1A2A3B;" id="gaugeEfficiencyValue">
          ${Math.round(solarData.efficiency)}<span style="font-size:20px; font-weight:500;">%</span>
        </div>
        <div style="font-size: 14px; font-weight: 500; color: #888; margin-top: 5px; text-align: right; padding-left: 10px; text-transform: uppercase;">
          EFFICIENCY
        </div>
      </div>`;
    efficiencyGauge.dataBind();
  }

  if (performanceMessage) {
    const messageData = getPerformanceMessage();
    performanceMessage.content = messageData.message;
    performanceMessage.severity = messageData.severity;
    performanceMessage.dataBind();
  }
  setTimeout(() => {
    diagram.select([diagram.getObject('solarPanelFrame')]);
  }, 10);
}

// Utils
function getAngleDescription(): string {
  const relative = Math.abs(solarData.intPanelAngleDeg - 57);
  if (relative <= 5) return 'Horizontal';
  if (relative < 15) return 'Low Tilt';
  if (relative < 25) return 'Medium Tilt';
  if (relative < 40) return 'High Tilt';
  return 'Steep Tilt';
}
function getPerformanceMessage(): { message: string; severity: 'Success' | 'Warning' | 'Error' } {
  if (solarData.efficiency > 60) return { message: 'Excellent Performance', severity: 'Success' };
  if (solarData.efficiency > 40) return { message: 'Fair Performance', severity: 'Warning' };
  return { message: 'Poor Performance', severity: 'Error' };
}
function getLocationData(locationName: string): LocationData | undefined {
  return locationData.find((loc) => loc.name.toLowerCase() === locationName.toLowerCase());
}

function AngleDiagram() {
  const [diagramCreated, setDiagramCreated] = React.useState(false);

  // Initialize model
  solarData = {
    currentAngle: 303,
    efficiency: 78,
    selectedLocation: 'New York',
    selectedDateTime: new Date(),
    sunElevation: 0,
    sunAzimuth: 0,
    optimalTilt: 0,
    solarIrradiance: 0,
    incidenceAngle: 0,
    intPanelAngleDeg: 0,
  };

  const { nodes, connectors } = initializeDiagram();

  React.useEffect(() => {
    updateSampleSection();
  }, []);

  return (
    <div className="control-pane diagram-control-pane" style={{ opacity: diagramCreated ? 1 : 0 }}>
      <style>{sampleCss}</style>
      <div className="control-section angle-diagram-container" style={{ width: '100%' }}>
        <DiagramComponent
          id="diagram"
          ref={(diagramref: any) => (diagram = diagramref)}
          width={'100%'}
          height={'750px'}
          snapSettings={{ constraints: SnapConstraints.None }}
          selectedItems={{ constraints: SelectorConstraints.Rotate }}
          nodes={nodes}
          connectors={connectors}
          scrollChange={() => {
            if ((locationDropdown as any)?.isPopupOpen) locationDropdown.hidePopup();
          }}
          pageSettings={{
            width: 1300,
            height: 820,
            background: { source: './src/diagram/Images/angle/background.png', scale: 'Meet' },
          }}
          rotateChange={onRotationChange}
          created={() => {
            setDiagramCreated(true);
            initializeLocationDropdown();
            initializeEfficiencyGauge();
            initializePerformanceMessage();
            initializeAngleControls();

            calculateSolarPosition();
            angleCalculation();
            calculateEfficiency();
            updateUI();
            diagram.fitToPage();
          }}
          load={() => {
            if (diagramCreated && diagram) {
              setTimeout(() => {
                initializeLocationDropdown();
                initializeEfficiencyGauge();
                initializePerformanceMessage();
                initializeAngleControls();

                calculateSolarPosition();
                angleCalculation();
                calculateEfficiency();
                updateUI();
                diagram.fitToPage();
              });
            }
          }}
        />
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates an interactive solar panel tilt system built with the Syncfusion® EJ2 React Diagram component. Adjust the
          panel angle to see real-time changes in system efficiency based on the sun&apos;s position and location.
        </p>
      </div>
      <div id="description">
        <p>
          This interactive diagram visualizes a solar panel system. The sun&apos;s path is represented by a curved connector, and users can
          adjust the panel&apos;s tilt angle using a numeric input. The system provides immediate feedback through a dynamic efficiency gauge
          and performance messages. Users can also select different locations to observe how regional variations impact overall solar
          efficiency.
        </p>
      </div>
    </div>
  );
}

export default AngleDiagram;

const sampleCss = `
.angle-diagram-container .e-ddl.e-input-group .e-input-group-icon, .e-ddl.e-input-group.e-control-wrapper .e-input-group-icon:hover { color: #9CA3AF; }
.angle-diagram-container .e-ddl.e-input-group.e-control-wrapper .e-input { color: #9CA3AF; font-size: 16px; font-weight : 500; }
.angle-diagram-container .angle-control-section { margin-bottom: 25px; background: linear-gradient(145deg, #ffffff, #f8f9fa); border-radius: 15px; padding: 25px; box-shadow: 0 5px 20px rgba(0,0,0,0.06); transition: transform 0.2s ease, box-shadow 0.2s ease; }
.angle-diagram-container .angle-control-label { display: flex; align-items: center; font-weight: 600; font-size: 18px; color: #2c3e50; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
.angle-diagram-container .angle-description { font-size: 14px; color: #7f8c8d; font-weight: 500; margin-top: 10px; }
.angle-diagram-container .efficiency-section { text-align: center; margin-bottom: 30px; background: linear-gradient(145deg, #ffffff, #f1f3f4); border-radius: 20px; padding: 25px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); }
.angle-diagram-container .e-diagram-selector { stroke-width: 0; }
`;

interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
  angle: number;
}
interface SolarCalculationData {
  currentAngle: number;
  efficiency: number;
  selectedLocation: string;
  selectedDateTime: Date;
  sunElevation: number;
  sunAzimuth: number;
  optimalTilt: number;
  solarIrradiance: number;
  incidenceAngle: number;
  intPanelAngleDeg: number;
}