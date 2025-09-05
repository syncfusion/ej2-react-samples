// Import necessary modules and components from Syncfusion and React libraries.
import * as React from "react";
import {
    DiagramComponent,
    SnapConstraints,
    DiagramTools,
    NodeModel,
    ConnectorModel,
    NodeConstraints,
    DiagramConstraints,
    ConnectorConstraints,
    SelectorConstraints,
    MouseEventArgs,
    BasicShapeModel,
    ShapeAnnotationModel,
    PointModel
} from '@syncfusion/ej2-react-diagrams';
import { updateSampleSection } from "../common/sample-base";

// Declare a variable to hold the instance of the DiagramComponent.
let diagramInstance: DiagramComponent;
let diagramCreated: boolean = false;

// Interface for element data
interface ChemicalElement  {
    atomicNumber?: number;
    atomicMass?: number;
    symbol: string;
    name: string;
    period: number;
    group: number;
    category: string;
    block?: string;
}

// Element categories and their corresponding colors
const categoryColors: { [key: string]: string } = {
    'alkali-metals': '#006AC7',
    'alkaline-earth-metals': '#08970E',
    'transition-metals': '#F08000',
    'other-metals': '#B75A09',
    'metalloids': '#95B506',
    'non-metals': '#DE2362',
    'halogens': '#DE2723',
    'noble-gases': '#0B98A9',
    'lanthanides': '#5C1FA8',
    'actinides': '#8C04A1',
};

// Periodic table data
const periodicTableData: ChemicalElement[] = [
    // Period 1
    { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', period: 1, group: 1, category: 'non-metals', atomicMass: 1.008 },
    { atomicNumber: 2, symbol: 'He', name: 'Helium', period: 1, group: 18, category: 'noble-gases', atomicMass: 4.0026 },

    // Period 2
    { atomicNumber: 3, symbol: 'Li', name: 'Lithium', period: 2, group: 1, category: 'alkali-metals', atomicMass: 6.94 },
    { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', period: 2, group: 2, category: 'alkaline-earth-metals', atomicMass: 9.0122 },
    { atomicNumber: 5, symbol: 'B', name: 'Boron', period: 2, group: 13, category: 'metalloids', atomicMass: 10.81 },
    { atomicNumber: 6, symbol: 'C', name: 'Carbon', period: 2, group: 14, category: 'non-metals', atomicMass: 12.011 },
    { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', period: 2, group: 15, category: 'non-metals', atomicMass: 14.007 },
    { atomicNumber: 8, symbol: 'O', name: 'Oxygen', period: 2, group: 16, category: 'non-metals', atomicMass: 15.999 },
    { atomicNumber: 9, symbol: 'F', name: 'Fluorine', period: 2, group: 17, category: 'halogens', atomicMass: 18.998 },
    { atomicNumber: 10, symbol: 'Ne', name: 'Neon', period: 2, group: 18, category: 'noble-gases', atomicMass: 20.18 },

    // Period 3
    { atomicNumber: 11, symbol: 'Na', name: 'Sodium', period: 3, group: 1, category: 'alkali-metals', atomicMass: 22.99 },
    { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', period: 3, group: 2, category: 'alkaline-earth-metals', atomicMass: 24.305 },
    { atomicNumber: 13, symbol: 'Al', name: 'Aluminum', period: 3, group: 13, category: 'other-metals', atomicMass: 26.982 },
    { atomicNumber: 14, symbol: 'Si', name: 'Silicon', period: 3, group: 14, category: 'metalloids', atomicMass: 28.085 },
    { atomicNumber: 15, symbol: 'P', name: 'Phosphorus', period: 3, group: 15, category: 'non-metals', atomicMass: 30.974 },
    { atomicNumber: 16, symbol: 'S', name: 'Sulfur', period: 3, group: 16, category: 'non-metals', atomicMass: 32.06 },
    { atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', period: 3, group: 17, category: 'halogens', atomicMass: 35.45 },
    { atomicNumber: 18, symbol: 'Ar', name: 'Argon', period: 3, group: 18, category: 'noble-gases', atomicMass: 39.948 },

    // Period 4
    { atomicNumber: 19, symbol: 'K', name: 'Potassium', period: 4, group: 1, category: 'alkali-metals', atomicMass: 39.098 },
    { atomicNumber: 20, symbol: 'Ca', name: 'Calcium', period: 4, group: 2, category: 'alkaline-earth-metals', atomicMass: 40.078 },
    { atomicNumber: 21, symbol: 'Sc', name: 'Scandium', period: 4, group: 3, category: 'transition-metals', atomicMass: 44.956 },
    { atomicNumber: 22, symbol: 'Ti', name: 'Titanium', period: 4, group: 4, category: 'transition-metals', atomicMass: 47.867 },
    { atomicNumber: 23, symbol: 'V', name: 'Vanadium', period: 4, group: 5, category: 'transition-metals', atomicMass: 50.942 },
    { atomicNumber: 24, symbol: 'Cr', name: 'Chromium', period: 4, group: 6, category: 'transition-metals', atomicMass: 51.996 },
    { atomicNumber: 25, symbol: 'Mn', name: 'Manganese', period: 4, group: 7, category: 'transition-metals', atomicMass: 54.938 },
    { atomicNumber: 26, symbol: 'Fe', name: 'Iron', period: 4, group: 8, category: 'transition-metals', atomicMass: 55.845 },
    { atomicNumber: 27, symbol: 'Co', name: 'Cobalt', period: 4, group: 9, category: 'transition-metals', atomicMass: 58.933 },
    { atomicNumber: 28, symbol: 'Ni', name: 'Nickel', period: 4, group: 10, category: 'transition-metals', atomicMass: 58.693 },
    { atomicNumber: 29, symbol: 'Cu', name: 'Copper', period: 4, group: 11, category: 'transition-metals', atomicMass: 63.546 },
    { atomicNumber: 30, symbol: 'Zn', name: 'Zinc', period: 4, group: 12, category: 'transition-metals', atomicMass: 65.38 },
    { atomicNumber: 31, symbol: 'Ga', name: 'Gallium', period: 4, group: 13, category: 'other-metals', atomicMass: 69.723 },
    { atomicNumber: 32, symbol: 'Ge', name: 'Germanium', period: 4, group: 14, category: 'metalloids', atomicMass: 72.63 },
    { atomicNumber: 33, symbol: 'As', name: 'Arsenic', period: 4, group: 15, category: 'metalloids', atomicMass: 74.922 },
    { atomicNumber: 34, symbol: 'Se', name: 'Selenium', period: 4, group: 16, category: 'non-metals', atomicMass: 78.971 },
    { atomicNumber: 35, symbol: 'Br', name: 'Bromine', period: 4, group: 17, category: 'halogens', atomicMass: 79.904 },
    { atomicNumber: 36, symbol: 'Kr', name: 'Krypton', period: 4, group: 18, category: 'noble-gases', atomicMass: 83.798 },

    // Period 5
    { atomicNumber: 37, symbol: 'Rb', name: 'Rubidium', period: 5, group: 1, category: 'alkali-metals', atomicMass: 85.468 },
    { atomicNumber: 38, symbol: 'Sr', name: 'Strontium', period: 5, group: 2, category: 'alkaline-earth-metals', atomicMass: 87.62 },
    { atomicNumber: 39, symbol: 'Y', name: 'Yttrium', period: 5, group: 3, category: 'transition-metals', atomicMass: 88.906 },
    { atomicNumber: 40, symbol: 'Zr', name: 'Zirconium', period: 5, group: 4, category: 'transition-metals', atomicMass: 91.224 },
    { atomicNumber: 41, symbol: 'Nb', name: 'Niobium', period: 5, group: 5, category: 'transition-metals', atomicMass: 92.906 },
    { atomicNumber: 42, symbol: 'Mo', name: 'Molybdenum', period: 5, group: 6, category: 'transition-metals', atomicMass: 95.95 },
    { atomicNumber: 43, symbol: 'Tc', name: 'Technetium', period: 5, group: 7, category: 'transition-metals', atomicMass: 98.0 },
    { atomicNumber: 44, symbol: 'Ru', name: 'Ruthenium', period: 5, group: 8, category: 'transition-metals', atomicMass: 101.07 },
    { atomicNumber: 45, symbol: 'Rh', name: 'Rhodium', period: 5, group: 9, category: 'transition-metals', atomicMass: 102.91 },
    { atomicNumber: 46, symbol: 'Pd', name: 'Palladium', period: 5, group: 10, category: 'transition-metals', atomicMass: 106.42 },
    { atomicNumber: 47, symbol: 'Ag', name: 'Silver', period: 5, group: 11, category: 'transition-metals', atomicMass: 107.87 },
    { atomicNumber: 48, symbol: 'Cd', name: 'Cadmium', period: 5, group: 12, category: 'transition-metals', atomicMass: 112.41 },
    { atomicNumber: 49, symbol: 'In', name: 'Indium', period: 5, group: 13, category: 'other-metals', atomicMass: 114.82 },
    { atomicNumber: 50, symbol: 'Sn', name: 'Tin', period: 5, group: 14, category: 'other-metals', atomicMass: 118.71 },
    { atomicNumber: 51, symbol: 'Sb', name: 'Antimony', period: 5, group: 15, category: 'metalloids', atomicMass: 121.76 },
    { atomicNumber: 52, symbol: 'Te', name: 'Tellurium', period: 5, group: 16, category: 'metalloids', atomicMass: 127.6 },
    { atomicNumber: 53, symbol: 'I', name: 'Iodine', period: 5, group: 17, category: 'halogens', atomicMass: 126.9 },
    { atomicNumber: 54, symbol: 'Xe', name: 'Xenon', period: 5, group: 18, category: 'noble-gases', atomicMass: 131.29 },

    // Period 6
    { atomicNumber: 55, symbol: 'Cs', name: 'Cesium', period: 6, group: 1, category: 'alkali-metals', atomicMass: 132.91 },
    { atomicNumber: 56, symbol: 'Ba', name: 'Barium', period: 6, group: 2, category: 'alkaline-earth-metals', atomicMass: 137.33 },
    { symbol: '57-71', name: 'Lanthanides', period: 6, group: 3, category: 'lanthanides' },
    { atomicNumber: 72, symbol: 'Hf', name: 'Hafnium', period: 6, group: 4, category: 'transition-metals', atomicMass: 178.49 },
    { atomicNumber: 73, symbol: 'Ta', name: 'Tantalum', period: 6, group: 5, category: 'transition-metals', atomicMass: 180.95 },
    { atomicNumber: 74, symbol: 'W', name: 'Tungsten', period: 6, group: 6, category: 'transition-metals', atomicMass: 183.84 },
    { atomicNumber: 75, symbol: 'Re', name: 'Rhenium', period: 6, group: 7, category: 'transition-metals', atomicMass: 186.21 },
    { atomicNumber: 76, symbol: 'Os', name: 'Osmium', period: 6, group: 8, category: 'transition-metals', atomicMass: 190.23 },
    { atomicNumber: 77, symbol: 'Ir', name: 'Iridium', period: 6, group: 9, category: 'transition-metals', atomicMass: 192.22 },
    { atomicNumber: 78, symbol: 'Pt', name: 'Platinum', period: 6, group: 10, category: 'transition-metals', atomicMass: 195.08 },
    { atomicNumber: 79, symbol: 'Au', name: 'Gold', period: 6, group: 11, category: 'transition-metals', atomicMass: 196.97 },
    { atomicNumber: 80, symbol: 'Hg', name: 'Mercury', period: 6, group: 12, category: 'transition-metals', atomicMass: 200.59 },
    { atomicNumber: 81, symbol: 'Tl', name: 'Thallium', period: 6, group: 13, category: 'other-metals', atomicMass: 204.38 },
    { atomicNumber: 82, symbol: 'Pb', name: 'Lead', period: 6, group: 14, category: 'other-metals', atomicMass: 207.2 },
    { atomicNumber: 83, symbol: 'Bi', name: 'Bismuth', period: 6, group: 15, category: 'other-metals', atomicMass: 208.98 },
    { atomicNumber: 84, symbol: 'Po', name: 'Polonium', period: 6, group: 16, category: 'metalloids', atomicMass: 209.0 },
    { atomicNumber: 85, symbol: 'At', name: 'Astatine', period: 6, group: 17, category: 'halogens', atomicMass: 210.0 },
    { atomicNumber: 86, symbol: 'Rn', name: 'Radon', period: 6, group: 18, category: 'noble-gases', atomicMass: 222.0 },

    // Period 7
    { atomicNumber: 87, symbol: 'Fr', name: 'Francium', period: 7, group: 1, category: 'alkali-metals', atomicMass: 223.0 },
    { atomicNumber: 88, symbol: 'Ra', name: 'Radium', period: 7, group: 2, category: 'alkaline-earth-metals', atomicMass: 226.0 },
    { symbol: '89-103', name: 'Actinides', period: 7, group: 3, category: 'actinides' },
    { atomicNumber: 104, symbol: 'Rf', name: 'Rutherfordium', period: 7, group: 4, category: 'transition-metals', atomicMass: 267.0 },
    { atomicNumber: 105, symbol: 'Db', name: 'Dubnium', period: 7, group: 5, category: 'transition-metals', atomicMass: 270.0 },
    { atomicNumber: 106, symbol: 'Sg', name: 'Seaborgium', period: 7, group: 6, category: 'transition-metals', atomicMass: 271.0 },
    { atomicNumber: 107, symbol: 'Bh', name: 'Bohrium', period: 7, group: 7, category: 'transition-metals', atomicMass: 270.0 },
    { atomicNumber: 108, symbol: 'Hs', name: 'Hassium', period: 7, group: 8, category: 'transition-metals', atomicMass: 277.0 },
    { atomicNumber: 109, symbol: 'Mt', name: 'Meitnerium', period: 7, group: 9, category: 'transition-metals', atomicMass: 276.0 },
    { atomicNumber: 110, symbol: 'Ds', name: 'Darmstadtium', period: 7, group: 10, category: 'transition-metals', atomicMass: 281.0 },
    { atomicNumber: 111, symbol: 'Rg', name: 'Roentgenium', period: 7, group: 11, category: 'transition-metals', atomicMass: 282.0 },
    { atomicNumber: 112, symbol: 'Cn', name: 'Copernicium', period: 7, group: 12, category: 'transition-metals', atomicMass: 285.0 },
    { atomicNumber: 113, symbol: 'Nh', name: 'Nihonium', period: 7, group: 13, category: 'other-metals', atomicMass: 286.0 },
    { atomicNumber: 114, symbol: 'Fl', name: 'Flerovium', period: 7, group: 14, category: 'other-metals', atomicMass: 289.0 },
    { atomicNumber: 115, symbol: 'Mc', name: 'Moscovium', period: 7, group: 15, category: 'other-metals', atomicMass: 290.0 },
    { atomicNumber: 116, symbol: 'Lv', name: 'Livermorium', period: 7, group: 16, category: 'other-metals', atomicMass: 293.0 },
    { atomicNumber: 117, symbol: 'Ts', name: 'Tennessine', period: 7, group: 17, category: 'halogens', atomicMass: 294.0 },
    { atomicNumber: 118, symbol: 'Og', name: 'Oganesson', period: 7, group: 18, category: 'noble-gases', atomicMass: 294.0 },

    // Lanthanides (Period 6, separate row)
    { atomicNumber: 57, symbol: 'La', name: 'Lanthanum', period: 6, group: 3, category: 'lanthanides', atomicMass: 138.91, block: 'f' },
    { atomicNumber: 58, symbol: 'Ce', name: 'Cerium', period: 6, group: 4, category: 'lanthanides', atomicMass: 140.12, block: 'f' },
    { atomicNumber: 59, symbol: 'Pr', name: 'Praseodymium', period: 6, group: 5, category: 'lanthanides', atomicMass: 140.91, block: 'f' },
    { atomicNumber: 60, symbol: 'Nd', name: 'Neodymium', period: 6, group: 6, category: 'lanthanides', atomicMass: 144.24, block: 'f' },
    { atomicNumber: 61, symbol: 'Pm', name: 'Promethium', period: 6, group: 7, category: 'lanthanides', atomicMass: 145.0, block: 'f' },
    { atomicNumber: 62, symbol: 'Sm', name: 'Samarium', period: 6, group: 8, category: 'lanthanides', atomicMass: 150.36, block: 'f' },
    { atomicNumber: 63, symbol: 'Eu', name: 'Europium', period: 6, group: 9, category: 'lanthanides', atomicMass: 151.96, block: 'f' },
    { atomicNumber: 64, symbol: 'Gd', name: 'Gadolinium', period: 6, group: 10, category: 'lanthanides', atomicMass: 157.25, block: 'f' },
    { atomicNumber: 65, symbol: 'Tb', name: 'Terbium', period: 6, group: 11, category: 'lanthanides', atomicMass: 158.93, block: 'f' },
    { atomicNumber: 66, symbol: 'Dy', name: 'Dysprosium', period: 6, group: 12, category: 'lanthanides', atomicMass: 162.5, block: 'f' },
    { atomicNumber: 67, symbol: 'Ho', name: 'Holmium', period: 6, group: 13, category: 'lanthanides', atomicMass: 164.93, block: 'f' },
    { atomicNumber: 68, symbol: 'Er', name: 'Erbium', period: 6, group: 14, category: 'lanthanides', atomicMass: 167.26, block: 'f' },
    { atomicNumber: 69, symbol: 'Tm', name: 'Thulium', period: 6, group: 15, category: 'lanthanides', atomicMass: 168.93, block: 'f' },
    { atomicNumber: 70, symbol: 'Yb', name: 'Ytterbium', period: 6, group: 16, category: 'lanthanides', atomicMass: 173.05, block: 'f' },
    { atomicNumber: 71, symbol: 'Lu', name: 'Lutetium', period: 6, group: 17, category: 'lanthanides', atomicMass: 174.97, block: 'f' },

    // Actinides (Period 7, separate row)
    { atomicNumber: 89, symbol: 'Ac', name: 'Actinium', period: 7, group: 3, category: 'actinides', atomicMass: 227.0, block: 'f' },
    { atomicNumber: 90, symbol: 'Th', name: 'Thorium', period: 7, group: 4, category: 'actinides', atomicMass: 232.04, block: 'f' },
    { atomicNumber: 91, symbol: 'Pa', name: 'Protactinium', period: 7, group: 5, category: 'actinides', atomicMass: 231.04, block: 'f' },
    { atomicNumber: 92, symbol: 'U', name: 'Uranium', period: 7, group: 6, category: 'actinides', atomicMass: 238.03, block: 'f' },
    { atomicNumber: 93, symbol: 'Np', name: 'Neptunium', period: 7, group: 7, category: 'actinides', atomicMass: 237.0, block: 'f' },
    { atomicNumber: 94, symbol: 'Pu', name: 'Plutonium', period: 7, group: 8, category: 'actinides', atomicMass: 244.0, block: 'f' },
    { atomicNumber: 95, symbol: 'Am', name: 'Americium', period: 7, group: 9, category: 'actinides', atomicMass: 243.0, block: 'f' },
    { atomicNumber: 96, symbol: 'Cm', name: 'Curium', period: 7, group: 10, category: 'actinides', atomicMass: 247.0, block: 'f' },
    { atomicNumber: 97, symbol: 'Bk', name: 'Berkelium', period: 7, group: 11, category: 'actinides', atomicMass: 247.0, block: 'f' },
    { atomicNumber: 98, symbol: 'Cf', name: 'Californium', period: 7, group: 12, category: 'actinides', atomicMass: 251.0, block: 'f' },
    { atomicNumber: 99, symbol: 'Es', name: 'Einsteinium', period: 7, group: 13, category: 'actinides', atomicMass: 252.0, block: 'f' },
    { atomicNumber: 100, symbol: 'Fm', name: 'Fermium', period: 7, group: 14, category: 'actinides', atomicMass: 257.0, block: 'f' },
    { atomicNumber: 101, symbol: 'Md', name: 'Mendelevium', period: 7, group: 15, category: 'actinides', atomicMass: 258.0, block: 'f' },
    { atomicNumber: 102, symbol: 'No', name: 'Nobelium', period: 7, group: 16, category: 'actinides', atomicMass: 259.0, block: 'f' },
    { atomicNumber: 103, symbol: 'Lr', name: 'Lawrencium', period: 7, group: 17, category: 'actinides', atomicMass: 262.0, block: 'f' }
];

// Configuration constants
const cellWidth: number = 60;
const cellHeight: number = 60;
const cellSpacing: number = 10;
const startX: number = 50;
const startY: number = 50;

// Function to calculate position based on period and group
function calculatePosition(period: number, group: number, fblock: boolean): PointModel {
    let x: number = startX + (group - 1) * (cellWidth + cellSpacing);
    let y: number = startY + (period - 1) * (cellHeight + cellSpacing);
    if (fblock) {
        y += (2 * (cellHeight + cellSpacing)) + cellHeight / 2;
    }
    return { x: x, y: y };
}

// Function to create an element node
function createElementNode(element: ChemicalElement): NodeModel {
    const position: PointModel = calculatePosition(element.period, element.group, element.block === 'f');
    const color: string = categoryColors[element.category];
    const id: string = element.atomicNumber ? element.atomicNumber.toString() : `element_${element.symbol}`;
    
    const annotations: ShapeAnnotationModel[] = [
        // Atomic number annotation (top-left)
        {
            content: element.atomicNumber ? element.atomicNumber.toString() : '',
            offset: { x: 0.15, y: 0.2 },
            style: {
                fontSize: 11,
                fontFamily: 'Roboto',
                color: '#FFFFFF',
            }
        },
        // Element symbol annotation (center)
        {
            content: element.symbol,
            offset: { x: 0.5, y: 0.5 },
            style: {
                fontSize: 16,
                fontFamily: 'Roboto',
                color: '#FFFFFF',
                bold: true
            }
        },
        // Element name annotation (bottom)
        {
            content: element.name,
            offset: { x: 0.5, y: 0.85 },
            style: {
                fontSize: 11,
                fontFamily: 'Roboto',
                color: '#FFFFFF',
                textOverflow: 'Ellipsis',
                textWrapping: 'NoWrap',
            }
        },
        // Atomic mass annotation (top-right, initially hidden)
        {
            content: element.atomicMass ? element.atomicMass.toString() : '',
            offset: { x: 0.75, y: 0.2 },
            style: {
                fontSize: 11,
                fontFamily: 'Roboto',
                color: '#FFFFFF',
            },
            visibility: false
        }
    ];

    const node: NodeModel = {
        id: `element_${id}`,
        offsetX: position.x! + cellWidth / 2,
        offsetY: position.y! + cellHeight / 2,
        width: cellWidth,
        height: cellHeight,
        shape: {
            type: 'Basic',
            shape: 'Rectangle',
            cornerRadius: 5
        } as BasicShapeModel,
        annotations: annotations,
        constraints: (NodeConstraints.Default | NodeConstraints.ReadOnly) & ~NodeConstraints.Select,
        style: { fill: color },
        addInfo: element
    };

    return node;
}

// Function to create legend nodes
function createLegendNodes(): NodeModel[] {
    const legendData: { category: string, label: string; }[] = [
        { category: 'alkali-metals', label: 'Alkali metals' },
        { category: 'alkaline-earth-metals', label: 'Alkaline earth metals' },
        { category: 'transition-metals', label: 'Transition metals' },
        { category: 'other-metals', label: 'Other metals' },
        { category: 'metalloids', label: 'Metalloids' },
        { category: 'non-metals', label: 'Non-metals' },
        { category: 'halogens', label: 'Halogens' },
        { category: 'noble-gases', label: 'Noble gases' },
        { category: 'lanthanides', label: 'Lanthanides' },
        { category: 'actinides', label: 'Actinides' },
    ];

    const legendNodes: NodeModel[] = [];
    const tableWidth = 19 * (cellWidth + cellSpacing);
    const tableCenterX = startX + tableWidth / 2;
    const legendItemWidth = 170;
    const legendItemHeight = 20;
    const legendSpacing = 10;
    const legendRowItems = 5;
    const totalLegendWidth = legendRowItems * legendItemWidth + (legendRowItems - 1) * legendSpacing;
    const legendStartY: number = startY + 10 * (cellHeight + cellSpacing) + 20;
    const legendStartX = tableCenterX - totalLegendWidth / 2;

    legendData.forEach((item, index) => {
        const row: number = Math.floor(index / 5);
        const col: number = index % 5;
        const x: number = legendStartX + col * (legendItemWidth + legendSpacing);
        const y: number = legendStartY + row * (legendItemHeight + legendSpacing);

        // Color indicator
        const colorNode: NodeModel = {
            id: `legend_color_${index}`,
            offsetX: x + 10,
            offsetY: y + legendItemHeight / 2,
            width: 20,
            height: 20,
            constraints: NodeConstraints.None,
            shape: {
                type: 'Basic',
                shape: 'Ellipse'
            } as BasicShapeModel,
            style: {
                fill: categoryColors[item.category],
                strokeColor: '#444444',
                strokeWidth: 1
            }
        };

        // Label
        const labelNode: NodeModel = {
            id: `legend_label_${index}`,
            offsetX: x + 90,
            offsetY: y + legendItemHeight / 2,
            width: 140,
            height: legendItemHeight,
            constraints: NodeConstraints.None,
            shape: {
                type: 'Text',
                content: item.label,
            },
            style: {
                fill: 'transparent',
                fontSize: 14,
                fontFamily: 'Roboto',
                color: '#212121'
            }
        };

        legendNodes.push(colorNode, labelNode);
    });

    return legendNodes;
}

// Function to create group & period numbers
function createRowsColumns(): NodeModel[] {
    const nodes: NodeModel[] = [];
    
    const period: NodeModel = {
        id: 'PERIOD',
        offsetX: startX - (cellWidth + cellSpacing) / 2 - 10,
        offsetY: startY + (cellHeight + cellSpacing) / 2 - 30,
        rotateAngle: 270,
        constraints: NodeConstraints.None,
        shape: {
            type: 'Text',
            content: 'PERIOD'
        },
        style: {
            fill: 'transparent',
            fontFamily: 'Roboto',
            bold: true
        },
    };
    nodes.push(period);
    
    const group: NodeModel = {
        id: 'GROUP',
        offsetX: startX,
        offsetY: startY - (cellHeight + cellSpacing) / 2 - 30,
        constraints: NodeConstraints.None,
        shape: {
            type: 'Text',
            content: 'GROUP'
        },
        style: {
            fill: 'transparent',
            fontFamily: 'Roboto',
            bold: true
        },
    };
    nodes.push(group);

    // Period numbers
    for (let period: number = 0; period < 7; period++) {
        const node: NodeModel = {
            id: 'PERIOD_' + period,
            offsetX: startX - (cellWidth + cellSpacing) / 3,
            offsetY: (startY + period * (cellHeight + cellSpacing)) + cellHeight / 2,
            width: cellWidth / 3,
            height: cellHeight,
            shape: {
                type: 'Text',
                content: (period + 1).toString()
            },
            style: {
                fontSize: 14,
                color: '#424242',
                fill: period % 2 ? '#fbfcff' : '#dfe6f3',
                fontFamily: 'Roboto',
            },
            borderWidth: 1,
            borderColor: '#d0d7e2',
            constraints: NodeConstraints.Select | NodeConstraints.PointerEvents | NodeConstraints.ReadOnly,
            addInfo: { label: 'PERIOD', cellValue: period + 1 }
        };
        nodes.push(node);
    }
    
    // Group numbers
    for (let group: number = 0; group < 18; group++) {
        const node: NodeModel = {
            id: 'GROUP_' + group,
            offsetX: startX + group * (cellWidth + cellSpacing) + cellWidth / 2,
            offsetY: startY - (cellHeight + cellSpacing) / 2 - 10,
            width: cellWidth,
            height: cellHeight / 3,
            shape: {
                type: 'Text',
                content: (group + 1).toString()
            },
            style: {
                fontSize: 14,
                color: '#424242',
                fill: group % 2 ? '#fbfcff' : '#dfe6f3',
                fontFamily: 'Roboto',
            },
            borderWidth: 1,
            borderColor: '#d0d7e2',
            constraints: NodeConstraints.Select | NodeConstraints.PointerEvents | NodeConstraints.ReadOnly,
            addInfo: { label: 'GROUP', cellValue: group + 1 }
        };
        nodes.push(node);
    }
    
    return nodes;
}

// Function to create block label nodes and connectors
function createBlock(): { nodes: NodeModel[], connectors: ConnectorModel[] } {
    const nodes: NodeModel[] = [
        {
            id: 'p_block',
            offsetX: startX + 15 * (cellWidth + cellSpacing) - 5,
            offsetY: startY - 19,
            width: 70, height: 15,
            constraints: NodeConstraints.None,
            shape: {
                type: 'Text',
                content: 'P Block'
            },
            style: {
                fill: 'transparent',
                color: '#555555',
                bold: true,
                fontSize: 16
            },
            ports: [
                { id: 'port1', offset: { x: 0, y: 0.5 } },
                { id: 'port2', offset: { x: 1, y: 0.5 } }
            ]
        },
        {
            id: 's_block',
            offsetX: startX + (cellWidth + cellSpacing) - 5,
            offsetY: startY - 19,
            width: 70, height: 15,
            constraints: NodeConstraints.None,
            shape: {
                type: 'Text',
                content: 'S Block'
            },
            style: {
                fill: 'transparent',
                bold: true,
                fontSize: 16,
                color: '#555555'
            },
            ports: [
                { id: 'port1', offset: { x: 0, y: 0.5 } },
                { id: 'port2', offset: { x: 1, y: 0.5 } }
            ]
        },
        {
            id: 'd_block',
            offsetX: startX + 7 * (cellWidth + cellSpacing) - 5,
            offsetY: startY + 3 * (cellHeight + cellSpacing) - 19,
            width: 70, height: 15,
            constraints: NodeConstraints.None,
            shape: {
                type: 'Text',
                content: 'D Block',
            },
            style: {
                fill: 'transparent',
                color: '#555555',
                bold: true,
                fontSize: 16
            },
            ports: [
                { id: 'port1', offset: { x: 0, y: 0.5 } },
                { id: 'port2', offset: { x: 1, y: 0.5 } }
            ]
        },
        {
            id: 'f_block',
            offsetX: startX + 2 * (cellWidth + cellSpacing) - 25,
            offsetY: startY + 8.5 * (cellHeight + cellSpacing) - 10,
            width: 70, height: 15,
            rotateAngle: 270,
            constraints: NodeConstraints.None,
            shape: {
                type: 'Text',
                content: 'F Block'
            },
            style: {
                fill: 'transparent',
                color: '#555555',
                bold: true,
                fontSize: 16
            },
            ports: [
                { id: 'port1', offset: { x: 0, y: 0.5 } },
                { id: 'port2', offset: { x: 1, y: 0.5 } }
            ]
        },
    ];

    const connectors: ConnectorModel[] = [
        {
            sourceID: 'p_block', sourcePortID: 'port1',
            targetPoint: { x: startX + 12 * (cellWidth + cellSpacing), y: startY - 9 },
            type: "Orthogonal",
            segments: [{ type: "Orthogonal", length: 170, direction: 'Left' }],
        },
        {
            sourceID: 'p_block', sourcePortID: 'port2',
            targetPoint: { x: startX + 17 * (cellWidth + cellSpacing) + cellWidth, y: startY - 9 },
            type: "Orthogonal",
            segments: [{ type: "Orthogonal", length: 170, direction: 'Right' }],
        },
        {
            sourceID: 's_block', sourcePortID: 'port1',
            targetPoint: { x: startX, y: startY - 9 },
            type: "Orthogonal",
            segments: [{ type: "Orthogonal", length: 30, direction: 'Left' }],
        },
        {
            sourceID: 's_block', sourcePortID: 'port2',
            targetPoint: { x: startX + 1 * (cellWidth + cellSpacing) + cellWidth, y: startY - 9 },
            type: "Orthogonal",
            segments: [{ type: "Orthogonal", length: 30, direction: 'Right' }],
        },
        {
            sourceID: 'd_block', sourcePortID: 'port1',
            targetPoint: { x: startX + 2 * (cellWidth + cellSpacing), y: startY + 3 * (cellHeight + cellSpacing) - 9 },
            type: "Orthogonal",
            segments: [{ type: "Orthogonal", length: 310, direction: 'Left' }],
        },
        {
            sourceID: 'd_block', sourcePortID: 'port2',
            targetPoint: { x: startX + 11 * (cellWidth + cellSpacing) + cellWidth, y: startY + 3 * (cellHeight + cellSpacing) - 9 },
            type: "Orthogonal",
            segments: [{ type: "Orthogonal", length: 310, direction: 'Right' }],
        },
        {
            sourceID: 'f_block', sourcePortID: 'port1',
            targetPoint: { x: startX + 2 * (cellWidth + cellSpacing) - 10, y: 700 },
            type: "Orthogonal",
            segments: [{ type: "Orthogonal", length: 30, direction: 'Bottom' }],
        },
        {
            sourceID: 'f_block', sourcePortID: 'port2',
            targetPoint: { x: startX + 2 * (cellWidth + cellSpacing) - 10, y: 570 },
            type: "Orthogonal",
            segments: [{ type: "Orthogonal", length: 30, direction: 'Top' }],
        }
    ];

    return { nodes, connectors };
}

// Main function to initialize the periodic table diagram
function initPeriodicTable(): { nodes: NodeModel[], connectors: ConnectorModel[] } {
    const nodes: NodeModel[] = [];

    // Create element nodes
    periodicTableData.forEach(element => {
        nodes.push(createElementNode(element));
    });

    // Add legend nodes
    nodes.push(...createLegendNodes());

    // Add row and column numbers
    nodes.push(...createRowsColumns());

    // Add block labels and get connectors
    const blockResult = createBlock();
    nodes.push(...blockResult.nodes);

    // Add title
    const titleNode: NodeModel = {
        id: 'title',
        offsetX: startX + 9 * (cellWidth + cellSpacing),
        offsetY: startY - 100,
        constraints: NodeConstraints.None,
        shape: {
            type: 'Text',
            content: 'Periodic Table of Elements',
        },
        style: {
            fontSize: 24,
            color: '#212121',
            fontFamily: 'Roboto',
            bold: true,
        }
    };
    nodes.push(titleNode);

    return { nodes, connectors: blockResult.connectors };
}

// PeriodicTable component renders the periodic table using Syncfusion's DiagramComponent.
function PeriodicTable() {
    const [showDiagram, setShowDiagram] = React.useState(false);
    React.useEffect(() => {
        updateSampleSection();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    const periodicTableModel = initPeriodicTable();

    // Handle mouse enter event
    const handleMouseEnter = (args: MouseEventArgs) => {
        const element: NodeModel = args.actualObject as NodeModel;
        if (element.shape?.type !== 'Text') {
            if (element.annotations && element.annotations.length > 0) {
                // Toggle atomic mass number visibility
                element.annotations[element.annotations.length - 1].visibility = true;
                // Scale up the node
                diagramInstance.scale(element, 1.25, 1.25, { x: 0.5, y: 0.5 });
                diagramInstance.dataBind();
            }
        }
    };

    // Handle mouse leave event
    const handleMouseLeave = (args: MouseEventArgs) => {
        const element: NodeModel = (args as any).element as NodeModel;
        if (element.shape?.type !== 'Text') {
            if (element.annotations && element.annotations.length > 0) {
                // Toggle atomic mass number visibility
                element.annotations[element.annotations.length - 1].visibility = false;
                // Scale down the node
                diagramInstance.scale(element, 1 / 1.25, 1 / 1.25, { x: 0.5, y: 0.5 });
                diagramInstance.dataBind();
            }
        }
    };

    // Handle selection change event
    const handleSelectionChange = (args: any) => {
        if (args.state === 'Changed') {
            const selectednode: NodeModel = args.newValue[0];
            if ((selectednode?.addInfo as any)?.label) {
                const label = (selectednode.addInfo as any).label;
                const cellValue = (selectednode.addInfo as any).cellValue;
                // Highlight Selected Group/Period Elements
                diagramInstance.nodes.forEach((node: NodeModel) => {
                    const element = node.addInfo as any;
                    if (element?.name) {
                        node.style.opacity =
                            ((label === 'PERIOD' && element.period === cellValue) ||
                                (label === 'GROUP' && element.group === cellValue && element.category !== 'lanthanides' && element.category !== 'actinides'))
                                ? 1 : 0.3;
                    }
                });
            } else {
                diagramInstance.nodes.forEach(node => node.style.opacity = 1);
            }
        }
    };

    const getConnectorDefaults = (connector: ConnectorModel): ConnectorModel => {
        connector.constraints= ConnectorConstraints.None;
        connector.type= 'Orthogonal';
        connector.style= { strokeColor: '#555555' };
        connector.targetDecorator= { shape: 'None' };
        return connector;
    };


    return (
        <div className="control-pane">
            <div className="control-section periodic-table" style={{ width: "100%", opacity: showDiagram ? 1 : 0 }}>
                {/* Initializes and renders diagram control */}
                <DiagramComponent
                    id="diagram"
                    ref={(diagram) => (diagramInstance = diagram)}
                    width={'100%'}
                    height={'700px'}
                    nodes={periodicTableModel.nodes}
                    connectors={periodicTableModel.connectors}
                    constraints={DiagramConstraints.Default & ~DiagramConstraints.UndoRedo}
                    snapSettings={{ constraints: SnapConstraints.None }}
                    tool={DiagramTools.SingleSelect}
                    getConnectorDefaults={getConnectorDefaults}
                    selectedItems={{ constraints: SelectorConstraints.None }}
                    mouseEnter={handleMouseEnter}
                    mouseLeave={handleMouseLeave}
                    selectionChange={handleSelectionChange}
                    created={() => {
                        if (diagramInstance){
                            diagramCreated = true;
                            // Fit the diagram to the page on creation.
                            diagramInstance.fitToPage();
                            // show diagram
                             setTimeout(()=>{
                                setShowDiagram(true);
                            }, 10)
                        }
                    }}
                    load={()=>{
                        if (diagramCreated && diagramInstance) {
                            diagramInstance.fitToPage();
                        }
                    }}
                >
                </DiagramComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates an interactive Periodic Table of Elements built using the Syncfusion<sup>®</sup> EJ2 React Diagram component, displaying all known elements with categorization by color, detailed hover information, and highlighting by period or group.
                </p>
            </div>
            <div id="description">
                <p>
                    Elements in this interactive Periodic Table are nodes showing atomic number, symbol, and name; atomic mass appears on hover. Elements are color-coded by category with a clear legend. Users can dynamically highlight elements by clicking period or group numbers, instantly revealing chemical trends and relationships.
                </p>
            </div>
        </div>
    );
}

export default PeriodicTable;