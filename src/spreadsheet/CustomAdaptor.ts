import { ODataAdaptor } from "@syncfusion/ej2-data";

export class CustomAdaptor extends ODataAdaptor {
    public processResponse(): Object {
        let result: Object[] = [];
        let original: { result: Object[], count: number } = super.processResponse.apply(this, arguments);
        original.result.forEach((item: { SNo: number }, idx: number) => {
            result[idx] = {};
            Object.keys(item).forEach((key: string) => {
                if (['OrderID', 'CustomerID', 'ShipName', 'ShipCity', 'ShipCountry'].indexOf(key) > -1) {
                    result[idx][key] = item[key];
                }
            });
        });
        return { result: result, count: original.count };
    }
}