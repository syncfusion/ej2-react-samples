import * as React from "react";
import { SampleBase } from "../common/sample-base";
import {
  DiagramComponent,
  NodeModel,
  DiagramTools,
  SnapConstraints,
  NodeConstraints,
  AnnotationConstraints,
  Diagram,
} from "@syncfusion/ej2-react-diagrams";
import { DialogComponent } from "@syncfusion/ej2-react-popups";

interface SeatInfo {
  seatNumber: string;
  row: string;
  column: number;
  price: number;
  tierCategory: string;
  booked: boolean;
}

interface SeatSelection {
  seatNumbers: string[];
  ticketCount: number;
  amount: number | null;
  category: string;
}

interface ShowTiming {
  id: number;
  time: string;
  type: string;
  status: string;
}

let diagramInstance: Diagram;
let diagramCreated: boolean = false;
let seatDialogRef: DialogComponent | null = null;
let selectedTimingId: number = 1;

let nodes: NodeModel[] = [];
let seatSelection: SeatSelection = {
  seatNumbers: [],
  ticketCount: 0,
  amount: 0.0,
  category: ""
};
let selectedSeatsArray: string[] = [];

const movieTitle = "F1: The Movie";
const theaterName = "Velvet Aurora Cinematheque";

const timingSpecificBookedSeats: { [key: number]: string[] } = {
  1: [
    "seatD9", "seatD10", "seatE9", "seatE10", "seatF8", "seatF9", "seatF10", "seatF11",
    "seatG7", "seatG8", "seatG9", "seatG10", "seatH6", "seatH7", "seatH8",
    "seatC9", "seatC10", "seatB9", "seatB10", "seatA9", "seatA10",
    "seatD8", "seatD11", "seatE8", "seatE11", "seatF7", "seatF12",
    "seatC8", "seatC11", "seatB8", "seatB11", "seatA8", "seatA11",
    "seatG6", "seatG11", "seatH5", "seatH9",

    "seatI8", "seatI9", "seatJ8", "seatJ9", "seatK7", "seatK8", "seatK9", "seatK10",
    "seatL6", "seatL7", "seatL8", "seatL9", "seatM5", "seatM6", "seatM7", "seatM8",
    "seatI7", "seatI10", "seatJ7", "seatJ10", "seatK6", "seatK11",
    "seatL5", "seatL10", "seatM4",

    "seatN8", "seatN9", "seatO8", "seatO9", "seatP8", "seatP9",
    "seatN7", "seatN10", "seatO7", "seatO10", "seatP7", "seatP10",
    "seatN6", "seatO6", "seatP6"
  ],

  2: [
    "seatA1", "seatA2", "seatA3", "seatA4", "seatA5", "seatA6", "seatA7", "seatA8", "seatA9", "seatA10", "seatA11", "seatA12", "seatA13", "seatA14", "seatA15", "seatA16", "seatA17", "seatA18",
    "seatB1", "seatB2", "seatB3", "seatB4", "seatB5", "seatB6", "seatB7", "seatB8", "seatB9", "seatB10", "seatB11", "seatB12", "seatB13", "seatB14", "seatB15", "seatB16", "seatB17", "seatB18",
    "seatC1", "seatC2", "seatC3", "seatC4", "seatC5", "seatC6", "seatC7", "seatC8", "seatC9", "seatC10", "seatC11", "seatC12", "seatC13", "seatC14", "seatC15", "seatC16", "seatC17", "seatC18",
    "seatD1", "seatD2", "seatD3", "seatD4", "seatD5", "seatD6", "seatD7", "seatD8", "seatD9", "seatD10", "seatD11", "seatD12", "seatD13", "seatD14", "seatD15", "seatD16", "seatD17", "seatD18",
    "seatE1", "seatE2", "seatE3", "seatE4", "seatE5", "seatE6", "seatE7", "seatE8", "seatE9", "seatE10", "seatE11", "seatE12", "seatE13", "seatE14", "seatE15", "seatE16", "seatE17", "seatE18",
    "seatF1", "seatF2", "seatF3", "seatF4", "seatF5", "seatF6", "seatF7", "seatF8", "seatF9", "seatF10", "seatF11", "seatF12", "seatF13", "seatF14", "seatF15", "seatF16", "seatF17", "seatF18",
    "seatG1", "seatG2", "seatG3", "seatG4", "seatG5", "seatG6", "seatG7", "seatG8", "seatG9", "seatG10", "seatG11", "seatG12", "seatG13", "seatG14", "seatG15", "seatG16",
    "seatH1", "seatH2", "seatH3", "seatH4", "seatH5", "seatH6", "seatH7", "seatH8", "seatH9", "seatH10", "seatH11", "seatH12", "seatH13", "seatH14",

    "seatI1", "seatI2", "seatI3", "seatI4", "seatI5", "seatI6", "seatI7", "seatI8", "seatI9", "seatI10", "seatI11", "seatI12", "seatI13", "seatI14", "seatI15", "seatI16",
    "seatJ1", "seatJ2", "seatJ3", "seatJ4", "seatJ5", "seatJ6", "seatJ7", "seatJ8", "seatJ9", "seatJ10", "seatJ11", "seatJ12", "seatJ13", "seatJ14", "seatJ15", "seatJ16",
    "seatK1", "seatK2", "seatK3", "seatK4", "seatK5", "seatK6", "seatK7", "seatK8", "seatK9", "seatK10", "seatK11", "seatK12", "seatK13", "seatK14", "seatK15", "seatK16",
    "seatL1", "seatL2", "seatL3", "seatL4", "seatL5", "seatL6", "seatL7", "seatL8", "seatL9", "seatL10", "seatL11", "seatL12", "seatL13", "seatL14",
    "seatM1", "seatM2", "seatM3", "seatM4", "seatM5", "seatM6", "seatM7", "seatM8", "seatM9", "seatM10", "seatM11", "seatM12",

    "seatN1", "seatN2", "seatN3", "seatN4", "seatN5", "seatN6", "seatN7", "seatN8", "seatN9", "seatN10", "seatN11", "seatN12", "seatN13", "seatN14", "seatN15", "seatN16",
    "seatO1", "seatO2", "seatO3", "seatO4", "seatO5", "seatO6", "seatO7", "seatO8", "seatO9", "seatO10", "seatO11", "seatO12", "seatO13", "seatO14", "seatO15", "seatO16",
    "seatP1", "seatP2", "seatP3", "seatP4", "seatP5", "seatP6", "seatP7", "seatP8", "seatP9", "seatP10", "seatP11", "seatP12", "seatP13", "seatP14", "seatP15", "seatP16"
  ],

  3: [
    "seatA1", "seatA2", "seatA3", "seatA4", "seatA5", "seatA6", "seatA7", "seatA8", "seatA9", "seatA10", "seatA11", "seatA12", "seatA13", "seatA14", "seatA15", "seatA16", "seatA17", "seatA18",
    "seatB1", "seatB2", "seatB3", "seatB4", "seatB5", "seatB6", "seatB7", "seatB8", "seatB9", "seatB10", "seatB11", "seatB12", "seatB13", "seatB14", "seatB15", "seatB16", "seatB17", "seatB18",
    "seatC1", "seatC2", "seatC3", "seatC4", "seatC5", "seatC6", "seatC7", "seatC8", "seatC9", "seatC10", "seatC11", "seatC12", "seatC13", "seatC14", "seatC15", "seatC16", "seatC17", "seatC18",
    "seatD1", "seatD2", "seatD3", "seatD4", "seatD5", "seatD6", "seatD7", "seatD8", "seatD9", "seatD10", "seatD11", "seatD12", "seatD13", "seatD14", "seatD15", "seatD16", "seatD17", "seatD18",
    "seatE1", "seatE2", "seatE3", "seatE4", "seatE5", "seatE6", "seatE7", "seatE8", "seatE9", "seatE10", "seatE11", "seatE12", "seatE13", "seatE14", "seatE15", "seatE16", "seatE17", "seatE18",
    "seatF1", "seatF2", "seatF3", "seatF4", "seatF5", "seatF6", "seatF7", "seatF8", "seatF9", "seatF10", "seatF11", "seatF12", "seatF13", "seatF14", "seatF15", "seatF16", "seatF17", "seatF18",
    "seatG1", "seatG2", "seatG3", "seatG4", "seatG5", "seatG6", "seatG7", "seatG8", "seatG9", "seatG10", "seatG11", "seatG12", "seatG13", "seatG14", "seatG15", "seatG16",
    "seatH1", "seatH2", "seatH3", "seatH4", "seatH5", "seatH6", "seatH7", "seatH8", "seatH9", "seatH10", "seatH11", "seatH12", "seatH13",

    "seatI1", "seatI2", "seatI3", "seatI4", "seatI5", "seatI6", "seatI7", "seatI8", "seatI9", "seatI10", "seatI11", "seatI12", "seatI13", "seatI14", "seatI15", "seatI16",
    "seatJ1", "seatJ2", "seatJ3", "seatJ4", "seatJ5", "seatJ6", "seatJ7", "seatJ8", "seatJ9", "seatJ10", "seatJ11", "seatJ12", "seatJ13", "seatJ14", "seatJ15", "seatJ16",
    "seatK1", "seatK2", "seatK3", "seatK4", "seatK5", "seatK6", "seatK7", "seatK8", "seatK9", "seatK10", "seatK11", "seatK12", "seatK13", "seatK14", "seatK15", "seatK16",
    "seatL1", "seatL2", "seatL3", "seatL4", "seatL5", "seatL6", "seatL7", "seatL8", "seatL9", "seatL10", "seatL11", "seatL12", "seatL13", "seatL14",
    "seatM1", "seatM2", "seatM3", "seatM4", "seatM5", "seatM6", "seatM7", "seatM8", "seatM9", "seatM10", "seatM11", "seatM12",

    "seatN1", "seatN2", "seatN3", "seatN4", "seatN5", "seatN6", "seatN7", "seatN8", "seatN9", "seatN10", "seatN11", "seatN12", "seatN13", "seatN14", "seatN15", "seatN16",
    "seatO1", "seatO2", "seatO3", "seatO4", "seatO5", "seatO6", "seatO7", "seatO8", "seatO9", "seatO10", "seatO11", "seatO12", "seatO13", "seatO14", "seatO15", "seatO16",
    "seatP1", "seatP2", "seatP3", "seatP4", "seatP5"
  ],

  4: [
    "seatA1", "seatA2", "seatA3", "seatA4", "seatA5", "seatA6", "seatA7", "seatA8", "seatA9", "seatA10", "seatA11", "seatA12", "seatA13", "seatA14", "seatA15", "seatA16", "seatA17", "seatA18",
    "seatB1", "seatB2", "seatB3", "seatB4", "seatB5", "seatB6", "seatB7", "seatB8", "seatB9", "seatB10", "seatB11", "seatB12", "seatB13", "seatB14", "seatB15", "seatB16", "seatB17", "seatB18",
    "seatC1", "seatC2", "seatC3", "seatC4", "seatC5", "seatC6", "seatC7", "seatC8", "seatC9", "seatC10", "seatC11", "seatC12", "seatC13", "seatC14", "seatC15", "seatC16", "seatC17", "seatC18",
    "seatD1", "seatD2", "seatD3", "seatD4", "seatD5", "seatD6", "seatD7", "seatD8", "seatD9", "seatD10", "seatD11", "seatD12", "seatD13", "seatD14", "seatD15", "seatD16", "seatD17", "seatD18",
    "seatE1", "seatE2", "seatE3", "seatE4", "seatE5", "seatE6", "seatE7", "seatE8", "seatE9", "seatE10", "seatE11", "seatE12", "seatE13", "seatE14", "seatE15", "seatE16", "seatE17", "seatE18",
    "seatF1", "seatF2", "seatF3", "seatF4", "seatF5", "seatF6", "seatF7", "seatF8", "seatF9", "seatF10", "seatF11", "seatF12", "seatF13", "seatF14", "seatF15", "seatF16", "seatF17", "seatF18",

    "seatI1", "seatI2", "seatI3", "seatI4", "seatI5", "seatI6", "seatI7", "seatI8", "seatI9", "seatI10", "seatI11", "seatI12", "seatI13", "seatI14", "seatI15", "seatI16",
    "seatJ1", "seatJ2", "seatJ3", "seatJ4", "seatJ5", "seatJ6", "seatJ7", "seatJ8", "seatJ9", "seatJ10", "seatJ11", "seatJ12", "seatJ13", "seatJ14", "seatJ15", "seatJ16",
    "seatK1", "seatK2", "seatK3", "seatK4", "seatK5", "seatK6", "seatK7", "seatK8", "seatK9", "seatK10", "seatK11", "seatK12", "seatK13", "seatK14", "seatK15", "seatK16",
    "seatL1", "seatL2", "seatL3", "seatL4", "seatL5", "seatL6", "seatL7", "seatL8", "seatL9", "seatL10",

    "seatN1", "seatN2", "seatN3", "seatN4", "seatN5", "seatN6", "seatN7", "seatN8", "seatN9", "seatN10", "seatN11", "seatN12", "seatN13", "seatN14", "seatN15", "seatN16",
    "seatO1", "seatO2", "seatO3", "seatO4", "seatO5", "seatO6", "seatO7", "seatO8", "seatO9", "seatO10", "seatO11", "seatO12", "seatO13", "seatO14", "seatO15", "seatO16",
    "seatP1", "seatP2", "seatP3", "seatP4", "seatP5"
  ]
};
const ticketCount = selectedSeatsArray.length;
function getBookedSeatsForTiming(timingId: number): string[] {
  return timingSpecificBookedSeats[timingId] || [];
}

function refreshSeatingLayout(): void {
  const bookedSet: Set<string> = new Set(getBookedSeatsForTiming(selectedTimingId));
  diagramInstance.nodes.forEach(function (node: NodeModel) {
    if (node.addInfo && (node.addInfo as SeatInfo).seatNumber) {
      const currentSeatInfo = node.addInfo as SeatInfo;
      (node.style as any).fill = 'transparent';
      (node.style as any).strokeColor = '#9CA3AF';
      if (node.annotations && node.annotations[0]) {
        node.annotations[0].style!.color = "#374151";
      }
      currentSeatInfo.booked = false;
      if (bookedSet.has(node.id!)) {
        (node.style as any).fill = '#E5E7EB';
        (node.style as any).strokeColor = '#E5E7EB';
        if (node.annotations && node.annotations[0]) {
          node.annotations[0].style!.color = "#9CA3AF";
        }
        currentSeatInfo.booked = true;
      }
      node.tooltip.content = seatTooltipTemplate(currentSeatInfo, node);
    }
  });
  diagramInstance.dataBind();
}
const showTimings: ShowTiming[] = [
  { id: 1, time: "11:50 AM", type: "4K DOLBY ATMOS", status: "available" },
  { id: 2, time: "02:15 PM", type: "4K DOLBY ATMOS", status: "sold-out" },
  { id: 3, time: "06:20 PM", type: "4K DOLBY ATMOS", status: "filling-fast" },
  { id: 4, time: "09:15 PM", type: "4K DOLBY ATMOS", status: "filling-fast" }
];


function createTierLabel(tierName: string, price: number, y: number): void {
  nodes.push({
    id: `tier-${tierName}`,
    width: 200,
    height: 25,
    offsetX: 585,
    offsetY: y,
    shape: { type: 'Text', content: `${tierName} - $${price}` },
    style: { fontSize: 16, bold: true },
    constraints: NodeConstraints.ReadOnly
  });
}

function createRowLabel(row: string, y: number): void {
  nodes.push({
    id: `row-${row}`,
    width: 30,
    height: 32,
    offsetX: 80,
    offsetY: y,
    shape: { type: 'Text', content: row },
    style: { fontSize: 14, bold: true },
    constraints: NodeConstraints.ReadOnly
  });
}

function createSeatNode(seatId: string, seatNumber: string, row: string, column: number, price: number, tier: string, x: number, y: number): void {
  let addInfoData: SeatInfo = {
    seatNumber: seatNumber,
    row: row,
    column: column,
    price: price,
    tierCategory: tier,
    booked: false
  };
  nodes.push({
    id: seatId,
    width: 32,
    height: 32,
    offsetX: x,
    offsetY: y,
    shape: { cornerRadius: 4 },
    style: { strokeColor: '#9CA3AF', strokeWidth: 2 },
    annotations: [{
      content: column.toString()
    }],
    addInfo: addInfoData,
    tooltip: {
      content: seatTooltipTemplate(addInfoData),
      relativeMode: 'Object'
    },
    constraints: (NodeConstraints.Default | NodeConstraints.Tooltip | NodeConstraints.ReadOnly) & ~NodeConstraints.Select
  });
}
function seatTooltipTemplate(addInfoData: SeatInfo, currentNode?: NodeModel): string {
  let addInfo: SeatInfo = addInfoData;
  let seatNumber: string = addInfo.seatNumber || "";
  let row: string = addInfo.row || "";
  let tier: string = addInfo.tierCategory || (addInfo as any).tier || "";
  let price: number | string = addInfo.price !== undefined ? addInfo.price : "";


  let isSelected: boolean = false;
  if (currentNode) {
    isSelected = (selectedSeatsArray && (selectedSeatsArray as any).includes(currentNode.id!));
  }
  let isBooked: boolean = !!addInfo.booked;
  let status: string = isSelected ? "Selected" : isBooked ? "Booked" : "Available";
  let statusBg: string = (isSelected ? "#28a745" : isBooked ? "#6c757d" : "#17a2b8");

  return `
      <div class="seat-tooltip" style="margin:0;padding:10px;font-family:Arial,sans-serif;min-width:150px;">
        <div style="font-weight:bold;margin-bottom:5px;font-size:14px;">
          Seat ${seatNumber}
        </div>
        <div style="font-size:12px;margin-bottom:3px;">
          <strong>Row:</strong> ${row}
        </div>
        <div style="font-size:12px;margin-bottom:3px;">
          <strong>Category:</strong> ${tier}
        </div>
        <div style="font-size:12px;margin-bottom:3px;">
          <strong>Price:</strong> $${price}
        </div>
        <div style="font-size:12px;margin-top:5px;">
          <span style="padding:2px 6px;border-radius:3px;font-weight:bold;background-color:${statusBg};color:white;font-size:11px;">
            ${status}
          </span>
        </div>
      </div>
    `;
}
function createSplitSeats(row: string, seatCount: number, price: number, tier: string, y: number): void {
  const center: number = 600;
  const seatWidth: number = 32;
  const spacing: number = 10;
  const aisle: number = 82;
  const leftSeats: number = Math.floor(seatCount / 2);
  const rightSeats: number = seatCount - leftSeats;
  const leftStartX: number = center - (aisle / 2) - (leftSeats * seatWidth + (leftSeats - 1) * spacing);
  const rightStartX: number = center + (aisle / 2);

  for (let i = 1; i <= leftSeats; i++) {
    const x: number = leftStartX + (i - 1) * (seatWidth + spacing);
    createSeatNode(`seat${row}${i}`, `${row}${i}`, row, i, price, tier, x, y);
  }
  for (let i = leftSeats + 1; i <= seatCount; i++) {
    const x: number = rightStartX + (i - leftSeats - 1) * (seatWidth + spacing);
    createSeatNode(`seat${row}${i}`, `${row}${i}`, row, i, price, tier, x, y);
  }
}

function createTierSeats(tier: string, price: number, startY: number, rows: { row: string, count: number }[]): number {
  let y: number = startY;
  createTierLabel(tier, price, y - 50);
  rows.forEach(({ row, count }) => {
    createRowLabel(row, y);
    createSplitSeats(row, count, price, tier, y);
    y += 48;
  });
  return y;
}

function createScreen(y: number): void {
  nodes.push({
    id: 'screen',
    width: 600,
    height: 80,
    offsetX: 580,
    offsetY: y,
    constraints: NodeConstraints.ReadOnly,
    shape: {
      type: 'Native', content: `<svg width="394" height="56" viewBox="0 0 394 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27.0321 1.62598L2 37.6661C124.157 52.0822 312.899 43.6728 392 37.6661L364.965 1.62598C276.852 11.8374 148.187 11.8374 27.0321 1.62598Z" stroke="#818CF8" stroke-width="2" stroke-linejoin="round" />
                                    <path d="M2 45.666C124.157 60.0821 312.899 51.6727 392 45.666" stroke="#818CF8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M27.0321 1.62598L2 37.6661C124.157 52.0822 312.899 43.6728 392 37.6661L364.965 1.62598C276.852 11.8374 148.187 11.8374 27.0321 1.62598Z" fill="#E0E7FF" />
                                </svg>` },
    annotations: [{
      content: 'Screen This Way',
      offset: { x: 0.5, y: 1.5 },
      constraints: AnnotationConstraints.ReadOnly,
      style: { fontSize: 14, color: '#818CF8' }
    }]
  });
}

function initializeLayout(): NodeModel[] {
  let y: number = 50;
  y = createTierSeats("Executive", 25, y, [
    { row: "A", count: 18 }, { row: "B", count: 18 }, { row: "C", count: 18 },
    { row: "D", count: 18 }, { row: "E", count: 18 }, { row: "F", count: 18 },
    { row: "G", count: 16 }, { row: "H", count: 14 }
  ]);
  y += 92;
  y = createTierSeats("Corporate", 16, y, [
    { row: "I", count: 16 }, { row: "J", count: 16 }, { row: "K", count: 16 },
    { row: "L", count: 14 }, { row: "M", count: 12 }
  ]);
  y += 92;
  y = createTierSeats("Budget", 8, y, [
    { row: "N", count: 16 }, { row: "O", count: 16 }, { row: "P", count: 16 }
  ]);
  y += 92;
  createScreen(y);
  return nodes;
}

function showNotification(message: string): void {
  let notif: HTMLElement | null = document.getElementById("notification");
  if (notif) {
    notif.textContent = message;
    notif.style.display = "block";
  }
}
function hideNotification(): void {
  let notif: HTMLElement | null = document.getElementById("notification");
  if (notif) {
    notif.style.display = "none";
  }
}

function unSelectSeat(seatNode: NodeModel): void{
    // Logic for DESELECTING a seat
    const idx: number = selectedSeatsArray.indexOf(seatNode.id!);
    if (idx !== -1) {
        selectedSeatsArray.splice(idx, 1);
    }
    // Reset styling for previously selected seats
    (seatNode.style as any).fill = "transparent";
    (seatNode.style as any).strokeColor = "#9CA3AF";
    if (seatNode.annotations && seatNode.annotations[0] && seatNode.annotations[0].style) {
        seatNode.annotations[0].style!.color = "#374151"; // Reset annotation color
    }
}

function seatClicked(args: any): void {
  if (args && args.element && args.element.addInfo) {
    let currentNode: NodeModel = args.element;
    if ((currentNode.addInfo as SeatInfo).booked) {
      currentNode.tooltip.content = seatTooltipTemplate(currentNode.addInfo as SeatInfo, currentNode);
      return;
    } else {
      if (!(selectedSeatsArray as any).includes(currentNode.id!)) {
        let newTier: string = ((currentNode.addInfo as SeatInfo).tierCategory || (currentNode.addInfo as any).tier || "").toString();

        let selectedSeats: NodeModel[] = selectedSeatsArray.map(function (seatId: string) {
          let node = diagramInstance.getObject(seatId);
          return node && (node as NodeModel).addInfo ? node : null;
        }).filter(Boolean) as NodeModel[];
        let currentTier: string | null = selectedSeats.length > 0
          ? ((selectedSeats[0].addInfo as SeatInfo).tierCategory || (selectedSeats[0].addInfo as any).tier || "").toString()
          : null;
        let differentTier: boolean = Boolean(currentTier && newTier !== currentTier);
        if (differentTier) {
          //Iterate backwards to avoid skipping elements after splicing
          for (let i: number = selectedSeatsArray.length - 1; i >= 0; i--) {
              const seatNode: NodeModel = diagramInstance.getObject(selectedSeatsArray[i]) as NodeModel;
              if (seatNode) {
                  unSelectSeat(seatNode);
                  // Update tooltip for these deselected original seats
                  seatNode.tooltip.content = seatTooltipTemplate(seatNode.addInfo as SeatInfo, seatNode);
              }
          }
          hideNotification();
        } else if (selectedSeatsArray.length >= 10) {
          showNotification("Maximum 10 tickets can be selected");
          return;
        }
        selectedSeatsArray.push(currentNode.id!);
        (currentNode.style as any).fill = "#15803D";
        (currentNode.style as any).strokeColor = "#15803D";
        if (currentNode.annotations && currentNode.annotations[0]) {
          currentNode.annotations[0].style!.color = "white";
        }
        diagramInstance.dataBind();
        if (selectedSeatsArray.length < 10) {
          hideNotification();
        }
      } else {
        unSelectSeat(currentNode);
        diagramInstance.dataBind();
        hideNotification();
      }
      currentNode.tooltip.content = seatTooltipTemplate(currentNode.addInfo as SeatInfo, currentNode);
      updateBookingSummary();
      updateBookingSummaryUI();
    }
  }
}
function updateBookingSummary(): void {
  if (selectedSeatsArray.length > 0) {
    let selectedSeats: { seatNumber: string; row: string; price: number; tier: string; }[] = selectedSeatsArray.map(function (seatId: string) {
      let node: any = diagramInstance.getObject(seatId);

      if (node && node.addInfo && (node.addInfo as SeatInfo).seatNumber !== undefined) {
        let price: number = parseFloat((node.addInfo as SeatInfo).price.toString());
        if (isNaN(price)) price = 0;
        return {
          seatNumber: (node.addInfo as SeatInfo).seatNumber || "",
          row: (node.addInfo as SeatInfo).row || "",
          price: price,
          tier: ((node.addInfo as SeatInfo).tierCategory || (node.addInfo as any).tier || "").toString()
        };
      }
      return null;
    }).filter(Boolean) as { seatNumber: string; row: string; price: number; tier: string; }[];

    seatSelection.seatNumbers = selectedSeats.map(s => s.seatNumber);
    seatSelection.ticketCount = selectedSeats.length;
    let totalAmount: number = selectedSeats.reduce((sum: number, s) => sum + (Number(s.price) || 0), 0);
    seatSelection.amount = selectedSeats.length ? totalAmount : null;
    seatSelection.category = selectedSeats.length > 0 ? selectedSeats[0].tier.toUpperCase() : "";
  } else {
    seatSelection.seatNumbers = [];
    seatSelection.ticketCount = 0;
    seatSelection.amount = null;
    seatSelection.category = "";
  }
}
function updateBookingSummaryUI(): void {
  const ticketCountElem: HTMLElement | null = document.getElementById('ticketCount');
  const totalAmountElem: HTMLElement | null = document.getElementById('totalAmount');
  const priceHintElem: HTMLElement | null = document.getElementById('priceHint');
  const ticketAmountElem: HTMLElement | null = document.getElementById('ticketAmount');
  const feesAmountElem: HTMLElement | null = document.getElementById('feesAmount');
  const proceedButton: HTMLButtonElement | null = document.getElementById('proceedButton') as HTMLButtonElement;

  if (seatSelection.ticketCount > 0) {
    if (ticketCountElem) ticketCountElem.innerText = seatSelection.ticketCount + " Tickets Selected";
    if (totalAmountElem) totalAmountElem.innerText = seatSelection.amount === null ? '$0' : "$" + (seatSelection.amount + 6);
    if (priceHintElem) priceHintElem.style.display = 'block';
    if (ticketAmountElem) ticketAmountElem.innerText = "Tickets: $" + (seatSelection.amount);
    if (feesAmountElem) feesAmountElem.innerText = "+ Fees: $" + 6;
  } else {
    if (ticketCountElem) ticketCountElem.innerText = "0 Tickets Selected";
    if (totalAmountElem) totalAmountElem.innerText = "$0";
    if (priceHintElem) priceHintElem.style.display = 'none';
    if (ticketAmountElem) ticketAmountElem.innerText = "";
    if (feesAmountElem) feesAmountElem.innerText = "";
  }
  if (proceedButton) proceedButton.disabled = seatSelection.ticketCount === 0;
}

function updateDateTime(id: number): void {
  const showtiming: ShowTiming = showTimings[id];
  const now: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'short'
  };
  const formatted: string = now.toLocaleString('en-IN', options);
  const movieTimingElem: HTMLElement | null = document.getElementById('movie-timing');
  if (movieTimingElem) movieTimingElem.textContent = `${formatted}` + `, ${showtiming.time}`;
  const day: string = now.toLocaleDateString('en-IN', { weekday: 'short' });
  const date: string = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  const dateLabelElem: HTMLElement | null = document.getElementById('date-label');
  if (dateLabelElem) dateLabelElem.innerHTML = `${day}<br>${date}`;
}
function bookSeatsForTiming(timingId: number, bookingSeatIds: string[]): void {
  if (!timingSpecificBookedSeats[timingId]) {
    timingSpecificBookedSeats[timingId] = [];
  }
  timingSpecificBookedSeats[timingId].push(...bookingSeatIds);
}
function buildBookingSuccessHtml(movieTitle: string, theater: string, showTime: string, seats: string, totalAmount: string, bookingId: string): string {
  return `
  <div class="notification-header">
    <div class="success-icon">&#10003;</div>
    <div class="success-title">Booking Confirmed!</div>
    <div class="success-message">
      Your tickets have been successfully booked.
    </div>
  </div>
  <div class="booking-details">
    <h4>Booking Details:</h4>
    <p><strong>Movie:</strong> ${movieTitle}</p>
    <p><strong>Theater:</strong> ${theater}</p>
    <p><strong>Show Time:</strong> ${showTime}</p>
    <p><strong>Seats:</strong> ${seats}</p>
    <p><strong>Total Amount:</strong> $${totalAmount}</p>
    <p><strong>Booking ID:</strong> ${bookingId}</p>
  </div>
  `;
}
function handleProceed() {
  if (selectedSeatsArray.length === 0) return;


  bookSeatsForTiming(selectedTimingId, selectedSeatsArray);

  let movieTitle: string = "F1: The Movie";
  let theater: string = "Velvet Aurora Cinematheque";
  let showTime: string = document.getElementById('movie-timing')?.textContent || '';
  let seats: string = seatSelection.seatNumbers.join(", ");
  let totalAmount: string = (seatSelection.amount !== null ? seatSelection.amount + 6 : 6).toFixed(2);
  let bookingId: string = 'VAC' + Date.now().toString().slice(-8);

  seatDialogRef.content = buildBookingSuccessHtml(movieTitle, theater, showTime, seats, totalAmount, bookingId);
  seatDialogRef.show();
  selectedSeatsArray.forEach(function (seatId: string) {
    let node: NodeModel | undefined = diagramInstance.getObject(seatId);
    if (node && node.addInfo) {
      (node.addInfo as SeatInfo).booked = true;
      (node.style as any).fill = '#E5E7EB';
      (node.style as any).strokeColor = '#E5E7EB';
      if (node.annotations && node.annotations[0]) {
        node.annotations[0].style!.color = '#9CA3AF';
      }
    }
  });

  selectedSeatsArray = [];
  updateBookingSummary();
  updateBookingSummaryUI();
  refreshSeatingLayout();
  hideNotification();
}

export class TicketBookingDiagram extends SampleBase<{}, {}> {
  rendereComplete() {
    if (diagramInstance) {
      diagramInstance.fitToPage();
    }
    updateDateTime(selectedTimingId - 1);
    refreshSeatingLayout();
    updateBookingSummary();
    updateBookingSummaryUI();
    const proButton = document.getElementById('proceedButton') as HTMLButtonElement;
    if (proButton) {
      proButton.addEventListener('click', handleProceed);
    }
  }

  onTimingClick(timing: ShowTiming): void {
    if (timing.status === "sold-out") return;

    // Remove selected class from all timing items
    const timingItems: NodeListOf<HTMLElement> = document.querySelectorAll('.timing-item');
    timingItems.forEach(item => item.classList.remove('selected'));

    // Add selected class to the clicked timing
    const clickedItem = document.querySelector(`.timing-item[data-timing="${timing.id}"]`);
    if (clickedItem) clickedItem.classList.add('selected');

    selectedTimingId = timing.id;
    selectedSeatsArray = [];
    refreshSeatingLayout();
    updateBookingSummary();
    updateBookingSummaryUI();
    hideNotification();
    updateDateTime(selectedTimingId - 1);
  }

  render() {
    return (
      <div className="control-pane diagram-seat-booking">
        <style>{STYLE_CSS}</style>
        <div className="control-section">
          <header className="header">
            <h2>
              <div>
                <span className="movie-name">
                  <p className="movie-name-lnk">
                    {movieTitle}
                  </p>
                </span>
              </div>
              <div>
                <span className="movie-timing" id="movie-timing">{showTimings.find(t => t.id === selectedTimingId)?.time}</span>
                <span className="theater-name"> | {theaterName}</span>
              </div>
            </h2>
          </header>
          <div className="show-timing-section" style={{ margin: "20px 0" }}>
            <ul className="timing-list" style={{ display: "flex", gap: 16, listStyle: "none", justifyContent: "center" }}>
              <li style={{pointerEvents: "none"}}>
                <span className="date-label" id="date-label"></span>
              </li>
              {showTimings.map((timing) => (
                <li
                  key={timing.id}
                  onClick={() => this.onTimingClick(timing)}
                  data-timing={timing.id}
                  className={`timing-item ${timing.status} ${selectedTimingId === timing.id ? "selected" : ""}`}
                  style={{ pointerEvents: timing.status === "sold-out" ? "none" : "auto", cursor: "pointer" }}
                >
                  <div className="time">{timing.time}</div>
                  <div className="screen-type">{timing.type}</div>
                </li>
              ))}
            </ul>
          </div>
          <div id="notification" className="notification" style={{ display: "none" }}></div>
          <div style={{ width: "100%", minHeight: 400, margin: "10px auto" }}>
            <DiagramComponent
              id="diagram"
              width={"100%"}
              height={"800px"}
              nodes={initializeLayout()}
              snapSettings={{ constraints: SnapConstraints.None }}
              tool={DiagramTools.ZoomPan | DiagramTools.SingleSelect}
              click={seatClicked}
              ref={diagram => (diagramInstance = diagram!)}
              created={() => {
                  if (diagramInstance){
                      diagramCreated = true;
                      // Fit the diagram to the page on creation.
                      diagramInstance.fitToPage();
                  }
              }}
              load={()=>{
                  if (diagramCreated && diagramInstance) {
                      diagramInstance.fitToPage();
                  }
              }}
            />
          </div>
          <div className="booking-summary-container">
            <div className="seat-legend">
              <div className="legend-items">
                <div className="legend-item">
                  <div className="legend-seat available"></div>
                  <span className="legend-text">Available</span>
                </div>
                <div className="legend-item">
                  <div className="legend-seat selected"></div>
                  <span className="legend-text">Selected</span>
                </div>
                <div className="legend-item">
                  <div className="legend-seat booked"></div>
                  <span className="legend-text">Booked</span>
                </div>
              </div>
            </div>

            <div className="booking-section">
              <div className="price-info">
                <div className="price" id="totalAmount">$0</div>
                <div className="ticket-count" id="ticketCount">0 Tickets Selected</div>
              </div>

              <div className="price-hint-inline" id="priceHint" style={{ display: "none" }}>
                <span id="ticketAmount"></span>
                <span id="feesAmount"></span>
              </div>

              <button className="btn-proceed"
                disabled={seatSelection.ticketCount === 0}
                onClick={handleProceed}
                id="proceedButton">Proceed</button>
            </div>
          </div>
          <DialogComponent
            id="seatBookingDialog"
            ref={d => (seatDialogRef = d!)}
            visible={false}
            width="400px"
            animationSettings={{ effect: "Zoom" }}
            isModal={true}
            target={'.control-section'}

            buttons={[
              { click: () => seatDialogRef?.hide(), buttonModel: { content: "Close", cssClass: 'btn2 btn2-proceed', isPrimary: true } }
            ]}
          />
        </div>
        <div id="action-description">
          <p>
            This sample implements a functional movie ticket booking interface using the Syncfusion<sup>®</sup> EJ2 React Diagram component, providing an intuitive visual representation of a cinema hall's seating arrangement with real-time price updates and a complete booking workflow.
          </p>
        </div>
        <div id="description">
          <p>
            This interactive cinema seat booking experience begins with users selecting a showtime, which dynamically updates the seating layout to reflect real-time availability. Users can highlight and select seats (up to 10 within a single tier), while the booking summary panel instantly updates prices and fees. Tooltip provide seat details, and a "Proceed" button leads to a confirmation screen with a unique booking ID.
          </p>
        </div>
      </div>
    );
  }
}

const STYLE_CSS = `
    .diagram-seat-booking .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 20px 24px;
        padding-top: 0px;
        border-bottom: 1px solid #e0e0e0;
    }

    .diagram-seat-booking .header h2 {
        margin: 0;
        font-weight: normal;
    }

    .diagram-seat-booking .movie-name-lnk {
        text-decoration: none;
        font-size: 20px;
        font-weight: 500;
        transition: color 0.2s ease;
        color: #337ab7 !important;
    }

    .diagram-seat-booking .theater-info {
        color: #374151;
        display: flex;
        flex-direction: column;
        align-content: center;
        font-size: 14px;
        font-weight: 400;
    }

    .diagram-seat-booking .separator {
        margin: 0 8px;
        color: #999999;
    }

    .diagram-seat-booking .show-timing-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: space-around;
        border-bottom: 1px solid #E5E7EB;
    }

    .diagram-seat-booking .date-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        width: 100%;
    }

    .diagram-seat-booking .date-label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: #666666;
        text-align: center;
        line-height: 1.3;
        min-width: 60px;
        padding-right: 2.5rem;
        border-right: 1px solid #9CA3AF;
    }

    .diagram-seat-booking .timing-list {
        display: flex;
        gap: 15px;
        list-style: none;
        padding: 0;
        margin: 0;
        flex-wrap: wrap;
    }

    .diagram-seat-booking .timing-item {
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
        min-width: 120px;
        border: 1px solid transparent;
    }

    .diagram-seat-booking .timing-item .time {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 4px;
    }

    .diagram-seat-booking .timing-item .screen-type {
        font-size: 10px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .diagram-seat-booking .timing-item.available {
        background-color: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #9CA3AF;
        color: #15803D;
    }

    .diagram-seat-booking .timing-item.available:hover {
        background-color: #f3f4f6;
        border-radius: 8px;
        border-color: #9ca3af;
    }

    .diagram-seat-booking .timing-item.filling-fast {
        background-color: #fef3c7;
        border-radius: 8px;
        border: 1px solid #f59e0b;
        color: #92400e;
    }

    .diagram-seat-booking .timing-item.filling-fast:hover {
        background-color: #fde68a;
        border-radius: 8px;
        border-color: #d97706;
    }

    .diagram-seat-booking .timing-item.selected {
        background-color: #4F46E5;
        border: 1px solid #4F46E5;
        border-radius: 8px;
        color: white;
    }

    .diagram-seat-booking .timing-item.sold-out {
        border-radius: 8px;
        background-color: #FFFFFF;
        border: 1px solid #D1D5DB;
        color: #9CA3AF;
        cursor: not-allowed;
        opacity: 0.6;
    }

    .diagram-seat-booking .main-container {
        min-height: calc(100vh - 100px);
        gap: 0;
    }

    .diagram-seat-booking .ticket-selection-section {
        background-color: #f8f9fa;
        margin-top: 2px;
        min-height: 500px;
    }

    .diagram-seat-booking .booking-summary-container {
        box-sizing: border-box;
        width: 100%;
        height: 154px;
        left: 0px;
        top: 1357px;
        background: rgba(255, 255, 255, 0.0001);
        border-top: 1px solid #E5E7EB;
        margin-top: 20px;
    }

    .diagram-seat-booking .booking-summary-section {
        position: relative;
        background: #fff;
        background-color: #ffffff;
        background-repeat: no-repeat;
        border: none;
        border-radius: 10px;
        font-family: Arial, sans-serif;
        margin-top: 2px;
        padding: 0px;
        height: 500px;
    }

    .diagram-seat-booking .booking-summary-section .header {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        font-size: 25px;
        color: #d9534f;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 0;
        background: none;
        padding: 12px 16px;
        display: block;
        text-align: left;
        flex-shrink: 0;
    }

    .diagram-seat-booking .booking-content {
        padding: 30px 30px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .diagram-seat-booking .left {
        flex: 1;
        text-align: left;
    }

    .diagram-seat-booking .right {
        text-align: right;
        white-space: nowrap;
    }

    .diagram-seat-booking .subtext {
        font-size: 16px;
        color: #777;
        margin-left: 10px;
    }

    .diagram-seat-booking .bold {
        font-weight: bold;
    }

    .diagram-seat-booking .divider {
        border-top: 1px solid #eee;
        margin: 8px 0;
    }

    .diagram-seat-booking .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 75px;
        background: #fff3cd;
        border-radius: 0 0 10px 10px;
        padding: 12px 16px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0
    }

    .diagram-seat-booking .__circle-left,
    .diagram-seat-booking .__circle-right {
        position: absolute;
        width: 20px;
        height: 20px;
        background: #f2f2f2;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
    }

    .diagram-seat-booking .__circle-left {
        left: -10px;
        border: 1px solid #f2f2f2;
        clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
    }

    .diagram-seat-booking .__circle-right {
        right: -10px;
        border: 1px solid #f2f2f2;
        border-right: none;
    }

    .diagram-seat-booking .action-buttons {
        display: flex;
        gap: 12px;
        margin-top: 20px;
        padding: 0 10px;
        height: auto;
    }

    .diagram-seat-booking .btn {
        flex: 1;
        padding: 12px 20px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        height: 50px;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .diagram-seat-booking .btn-clear {
        background-color: #f8f9fa;
        color: #666;
        border: 1px solid #e9ecef;
    }

    .diagram-seat-booking .btn-clear:hover {
        background-color: #e9ecef;
        color: #333;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .diagram-seat-booking .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
    }

    .diagram-seat-booking .btn-proceed[disabled] {
        background-color: #e3e3e3 !important;
        color: gray;
    }

    .diagram-seat-booking .seat-legend {
        padding: 20px;
    }

    .diagram-seat-booking .legend-items {
        display: flex;
        justify-content: center;
        gap: 30px;
        flex-wrap: wrap;
    }

    .diagram-seat-booking .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .diagram-seat-booking .legend-seat {
        width: 30px;
        height: 30px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 12px;
        position: relative;
    }

    .diagram-seat-booking .legend-seat.available {
        background-color: transparent;
        border: 2px solid #9CA3AF;
        color: #9CA3AF;
    }

    .diagram-seat-booking .legend-seat.selected {
        background-color: #15803D;
        border: 2px solid #15803D;
        color: #15803D;
    }

    .diagram-seat-booking .legend-seat.booked {
        background-color: #E5E7EB;
        border: 2px solid #E5E7EB;
        color: #E5E7EB;
    }

    .diagram-seat-booking .legend-text {
        font-size: 14px;
        font-weight: 500;
    }

    .diagram-seat-booking .success-modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    }

    .diagram-seat-booking .success-icon {
        font-size: 60px;
        color: #28a745;
        margin-bottom: 20px;
    }

    .diagram-seat-booking .success-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .diagram-seat-booking .success-message {
        margin-bottom: 20px;
        line-height: 1.5;
        text-wrap-mode: wrap;
    }

    .diagram-seat-booking .booking-details {
        padding: 15px;
        border-radius: 5px;
        text-align: left;
    }

    .diagram-seat-booking .booking-details h4 {
        margin-bottom: 10px;
    }

    .diagram-seat-booking .booking-details p {
        margin: 5px 0;
        font-size: 14px;
    }

    .diagram-seat-booking .notification {
        position: absolute;
        top: 20px;
        right: 20px;
        background: #d9534f;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideInMaxSeatError 0.3s ease-out;
    }

    @keyframes slideInMaxSeatError {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }

        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .diagram-seat-booking .theater-name,
    .diagram-seat-booking .movie-timing {
        font-size: 14px !important;
    }

    .diagram-seat-booking .timing-list {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .diagram-seat-booking .timing-list li {
        margin: 10px;
        padding: 10px;
        border-radius: 3px;
    }

    .diagram-seat-booking .timing-list li.selected {
        background-color: #4F46E5;
        color: white;
    }

    .diagram-seat-booking .timing-list li.available {
        border: 1px solid #9CA3AF;
        color: #15803D;
        background-color: transparent;
    }

    .diagram-seat-booking .timing-list li.available:hover {
        background-color: #DCFCE7;
        border: 1px solid #15803D;
        color: #15803D;
    }

    .diagram-seat-booking .timing-list li.filling-fast {
        border: 1px solid #9CA3AF;
        color: #C2410C;
        background-color: transparent;
    }

    .diagram-seat-booking .timing-list li.filling-fast:hover {
        background-color: #FFEDD5;
        border: 1px solid #C2410C;
        color: #C2410C;
    }

    .diagram-seat-booking .timing-list li.sold-out {
        border: 1px solid #D1D5DB;
        color: #9CA3AF;
        background-color: #FFFFFF;
        cursor: not-allowed;
        opacity: 0.7;
    }

    .diagram-seat-booking .timing-list li.sold-out:hover {
        border: 1px solid #D1D5DB;
        color: #9CA3AF;
        background-color: #FFFFFF;
        color: #6c757d;
    }

    .diagram-seat-booking .timing-list li.selected {
        background-color: #4F46E5;
        color: white;
        border: 1px solid #4F46E5;
    }

    .diagram-seat-booking .booking-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .diagram-seat-booking .price-info {
        display: flex;
        flex-direction: column;
        margin-left: 30%;
    }

    .diagram-seat-booking .price {
        font-size: 24px;
        font-weight: bold;
    }

    .diagram-seat-booking .ticket-count {
        font-size: 14px;
        margin-top: 5px;
    }

    .diagram-seat-booking .btn-proceed {
        background-color: rgb(103, 85, 238);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-right: 30%;
        transition: background-color 0.3s;
    }

    .diagram-seat-booking .btn-proceed:hover {
        background-color: #5a4fcf;
        transform: translateY(-1px);
    }

    .diagram-seat-booking .btn2 {
        flex: 1;
        padding: 12px 20px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .diagram-seat-booking .price-hint-inline {
        font-size: 12px;
        color: #888;
        margin: 4px 0 0 0;
        display: flex;
        gap: 12px;
    }

    .diagram-seat-booking .timing-list {
        display: flex;
        justify-content: center;
        gap: 12px;
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
    }

    @media screen and (max-width: 768px) {
        .diagram-seat-booking .main-container {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
        }

        .diagram-seat-booking .ticket-selection-section {
            grid-row: 1 !important;
            margin: 10px !important;
            padding: 15px !important;
        }

        .diagram-seat-booking .booking-summary-container {
            grid-row: 2 !important;
            padding: 0px 10px 20px 10px !important;
        }

        .diagram-seat-booking .booking-summary-section {
            height: auto !important;
            min-height: 400px !important;
        }

        .diagram-seat-booking .header {
            padding: 15px 10px !important;
        }

        .diagram-seat-booking .header h2 {
            font-size: 18px !important;
        }

        .diagram-seat-booking .movie-name-lnk {
            font-size: 20px !important;
        }

        .diagram-seat-booking .theater-name,
        .diagram-seat-booking .movie-timing {
            font-size: 12px !important;
        }
    }
`;