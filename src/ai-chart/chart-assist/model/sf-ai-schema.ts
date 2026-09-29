/**
 * Generates the AI schema for chart configurations.
 * @param chartType - The type of chart ('chart' for cartesian, 'accumulationchart' for circular)
 * @returns The schema object for the specified chart type
 */
export function generateChartSchema(chartType: 'chart' | 'accumulationchart' = 'chart'): any {
    if (chartType === 'accumulationchart') {
        return {
            type: 'object',
            properties: {
                blocks: {
                    type: 'array',
                    items: {
                        anyOf: [
                            {
                                type: 'object',
                                properties: {
                                    blockType: { const: 'text' },
                                    content: { type: 'string' }
                                },
                                required: ['blockType', 'content']
                            },
                            {
                                type: 'object',
                                properties: {
                                    blockType: { const: 'tool' },
                                    toolName: { const: 'chart-tool' },
                                    props: {
                                        type: 'object',
                                        properties: {
                                            chartType: { const: 'circular' },
                                            title: { type: 'string' },
                                            showLegend: { type: 'boolean' },
                                            legendSettings: {
                                                type: 'object',
                                                properties: {
                                                    visible: { type: 'boolean' },
                                                    position: { type: 'string' }
                                                }
                                            },
                                            tooltip: {
                                                type: 'object',
                                                properties: {
                                                    enable: { type: 'boolean' }
                                                }
                                            },
                                            selectionMode: { type: 'string' },
                                            highlightMode: { type: 'string' },
                                            palettes: {
                                                type: 'array',
                                                items: { type: 'string' }
                                            },
                                            series: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        type: { type: 'string' },
                                                        name: { type: 'string' },
                                                        dataSource: {
                                                            type: 'array',
                                                            items: {
                                                                type: 'object',
                                                                properties: {
                                                                    xvalue: { type: ['string', 'number'] },
                                                                    yvalue: { type: 'number' }
                                                                },
                                                                required: ['xvalue', 'yvalue']
                                                            }
                                                        },
                                                        tooltip: { type: 'boolean' },
                                                        innerRadius: { type: 'string' },
                                                        radius: { type: 'string' },
                                                        dataLabel: {
                                                            type: 'object',
                                                            properties: {
                                                                visible: { type: 'boolean' }
                                                            }
                                                        },
                                                        animation: {
                                                            type: 'object',
                                                            properties: {
                                                                enable: { type: 'boolean' }
                                                            }
                                                        }
                                                    },
                                                    required: ['type', 'name', 'dataSource']
                                                }
                                            }
                                        },
                                        required: ['chartType', 'title', 'series']
                                    }
                                },
                                required: ['blockType', 'toolName', 'props']
                            }
                        ]
                    }
                }
            },
            required: ['blocks']
        };
    }

    return {
        type: 'object',
        properties: {
            blocks: {
                type: 'array',
                items: {
                    anyOf: [
                        {
                            type: 'object',
                            properties: {
                                blockType: { const: 'text' },
                                content: { type: 'string' }
                            },
                            required: ['blockType', 'content']
                        },
                        {
                            type: 'object',
                            properties: {
                                blockType: { const: 'tool' },
                                toolName: { const: 'chart-tool' },
                                props: {
                                    type: 'object',
                                    properties: {
                                        chartType: { const: 'cartesian' },
                                        title: { type: 'string' },
                                        showLegend: { type: 'boolean' },
                                        sideBySidePlacement: { type: 'boolean' },
                                        legendSettings: {
                                            type: 'object',
                                            properties: {
                                                visible: { type: 'boolean' },
                                                position: { type: 'string' }
                                            }
                                        },
                                        chartArea: {
                                            type: 'object',
                                            properties: {
                                                border: {
                                                    type: 'object',
                                                    properties: {
                                                        width: { type: 'number' }
                                                    }
                                                }
                                            }
                                        },
                                        tooltip: {
                                            type: 'object',
                                            properties: {
                                                enable: { type: 'boolean' },
                                                shared: { type: 'boolean' },
                                                enableMarker: { type: 'boolean' }
                                            }
                                        },
                                        crosshair: {
                                            type: 'object',
                                            properties: {
                                                enable: { type: 'boolean' },
                                                lineType: { type: 'string' }
                                            }
                                        },
                                        zoomSettings: {
                                            type: 'object',
                                            properties: {
                                                enableSelectionZooming: { type: 'boolean' },
                                                enableMouseWheelZooming: { type: 'boolean' },
                                                enablePinchZooming: { type: 'boolean' },
                                                enablePan: { type: 'boolean' },
                                                enableScrollbar: { type: 'boolean' },
                                                mode: { type: 'string' }
                                            }
                                        },
                                        selectionMode: { type: 'string' },
                                        highlightMode: { type: 'string' },
                                        palettes: {
                                            type: 'array',
                                            items: { type: 'string' }
                                        },
                                        xAxis: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    type: { type: 'string' },
                                                    title: { type: 'string' },
                                                    labelRotation: { type: 'number' },
                                                    stripLines: {
                                                        type: 'array',
                                                        items: {
                                                            type: 'object',
                                                            properties: {
                                                                start: { type: 'number' },
                                                                size: { type: 'number' },
                                                                color: { type: 'string' },
                                                                opacity: { type: 'number' },
                                                                visible: { type: 'boolean' },
                                                                zIndex: { type: 'string' },
                                                                text: { type: 'string' }
                                                            }
                                                        }
                                                    }
                                                },
                                                required: ['type']
                                            }
                                        },
                                        yAxis: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    type: { type: 'string' },
                                                    title: { type: 'string' },
                                                    min: { type: 'number' },
                                                    stripLines: {
                                                        type: 'array',
                                                        items: {
                                                            type: 'object'
                                                        }
                                                    }
                                                },
                                                required: ['type']
                                            }
                                        },
                                        annotations: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    content: { type: 'string' },
                                                    coordinateUnits: { type: 'string' },
                                                    region: { type: 'string' },
                                                    x: { type: ['string', 'number'] },
                                                    y: { type: 'number' }
                                                }
                                            }
                                        },
                                        indicators: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    type: { type: 'string' },
                                                    seriesName: { type: 'string' },
                                                    xName: { type: 'string' },
                                                    close: { type: 'string' },
                                                    high: { type: 'string' },
                                                    low: { type: 'string' },
                                                    open: { type: 'string' },
                                                    volume: { type: 'string' },
                                                    period: { type: 'number' },
                                                    fill: { type: 'string' },
                                                    width: { type: 'number' }
                                                }
                                            }
                                        },
                                        series: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    type: { type: 'string' },
                                                    name: { type: 'string' },
                                                    dataSource: {
                                                        type: 'array',
                                                        items: {
                                                            type: 'object',
                                                            properties: {
                                                                xvalue: { type: ['string', 'number'] },
                                                                yvalue: { type: 'number' },
                                                                high: { type: 'number' },
                                                                low: { type: 'number' },
                                                                open: { type: 'number' },
                                                                close: { type: 'number' },
                                                                volume: { type: 'number' },
                                                                size: { type: 'number' },
                                                                minimum: { type: 'number' },
                                                                maximum: { type: 'number' }
                                                            },
                                                            required: ['xvalue']
                                                        }
                                                    },
                                                    tooltip: { type: 'boolean' },
                                                    fill: { type: 'string' },
                                                    width: { type: 'number' },
                                                    opacity: { type: 'number' },
                                                    dashArray: { type: 'string' },
                                                    marker: {
                                                        type: 'object',
                                                        properties: {
                                                            visible: { type: 'boolean' },
                                                            width: { type: 'number' },
                                                            height: { type: 'number' },
                                                            shape: { type: 'string' },
                                                            isFilled: { type: 'boolean' },
                                                            dataLabel: {
                                                                type: 'object',
                                                                properties: {
                                                                    visible: { type: 'boolean' }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    dataLabel: {
                                                        type: 'object',
                                                        properties: {
                                                            visible: { type: 'boolean' }
                                                        }
                                                    },
                                                    errorBar: {
                                                        type: 'object',
                                                        properties: {
                                                            visible: { type: 'boolean' }
                                                        }
                                                    },
                                                    trendlines: {
                                                        type: 'array',
                                                        items: {
                                                            type: 'object'
                                                        }
                                                    },
                                                    animation: {
                                                        type: 'object',
                                                        properties: {
                                                            enable: { type: 'boolean' }
                                                        }
                                                    }
                                                },
                                                required: ['type', 'name', 'dataSource']
                                            }
                                        }
                                    },
                                    required: ['chartType', 'title', 'series']
                                }
                            },
                            required: ['blockType', 'toolName', 'props']
                        }
                    ]
                }
            }
        },
        required: ['blocks']
    };
}