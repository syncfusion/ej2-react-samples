import type { GridComponent } from "@syncfusion/ej2-react-grids";

export interface UniversalAIDelta {
  componentType: GridComponent;
  properties: Record<string, any>;      // Any valid Syncfusion prop/value
  ignoreProps?: string[];               // Props AI must NEVER touch
  explanation: string;                  // Human friendly "I did X, Y, Z"
  confidence?: number;                  // 0-1 (optional, for UI feedback)
}

export const generateSchema = (componentType: string) => ({
  title: "Syncfusion Universal AI Response",
  type: "object",
  properties: {
    componentType: { type: " string", const: componentType },
    props: {
      type: "object",
      description: "Only the props you want to change. Can be any valid Syncfusion prop.",
      properties: {
        filterSettings: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["Menu", "Excel", "CheckBox"] },
            columns: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: { type: "string" },
                  operator: {
                    type: "string",
                    enum: [
                      "equal", "notequal", "greaterthan", "greaterthanorequal",
                      "lessthan", "lessthanorequal", "contains", "startswith", "endswith"
                    ]
                  },
                  value: { type: ["string", "number", "boolean", "object"] },
                  predicate: { type: "string", enum: ["and", "or"] },
                  ignoreCase: { type: "boolean" }
                },
                required: ["field", "operator", "value"]
              }
            }
          },
          required: ["type"]
        },
        pageSettings: {
          type: "object",
          properties: {
            pageSize: { type: "integer", minimum: 1 },
            pageCount: { type: "integer", minimum: 1 },
            currentPage: { type: "integer", minimum: 1 },
            pageSizes: {
              type: "array",
              items: { type: "integer" }
            },
            enableQueryString: { type: "boolean" }
          },
          required: ["pageSize"]
        },
        groupSettings: {
          type: "object",
          properties: {
            columns: {
              type: "array",
              items: { type: "string" }
            },
            showGroupedColumn: { type: "boolean" },
            showUngroupButton: { type: "boolean" },
            showDropArea: { type: "boolean" },
            disablePageWiseAggregates: { type: "boolean" },
            captionTemplate: { type: "string" }
          }
        },
        searchSettings: {
          type: "object",
          properties: {
            key: { type: "string" },
            fields: {
              type: "array",
              items: { type: "string" }
            },
            operator: { type: "string", enum: ["contains", "startswith", "endswith", "equal"] },
            ignoreCase: { type: "boolean" },
            ignoreAccent: { type: "boolean" }
          }
        },
        sortSettings: {
          type: "object",
          properties: {
            columns: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: { type: "string" },
                  direction: { type: "string", enum: ["Ascending", "Descending"] }
                },
                required: ["field", "direction"]
              }
            }
          },
          required: ["columns"]
        }
      },
      additionalProperties: true
    },
    ignoreProps: {
      type: "array",
      items: { type: "string" },
      default: ["dataSource", "height", "width", "locale", "enableRtl", "cssClass", "created", "destroyed", 'hide'],
      description: "The action is not handled by this schema"
    },
    explanation: {
      type: "string",
      description: "User actions for included or ignored props"
    },
    confidence: {
      type: "number",
      minimum: 0,
      maximum: 1
    }
  },
  required: ["componentType", "props", "explanation", "ignoreProps", "includedProps", "description"],
  additionalProperties: false
});