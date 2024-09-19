export let projectData = [
    { 'CategoryId': 1, 'CategoryName': 'Electronics', 'Status': 'Available', 'OrderDate': new Date('2021/07/12'), 'ParentId': null },
    { 'CategoryId': 2, 'CategoryName': 'Cell phone', 'Status': 'out of Stock', 'OrderDate': new Date('2021/06/17'), 'ParentId': 1 },
    { 'CategoryId': 3, 'CategoryName': 'Tablet', 'Status': 'Available', 'OrderDate': new Date('2021/07/12'), 'ParentId': 7 },
    { 'CategoryId': 4, 'CategoryName': 'Cloth', 'Status': 'Available', 'OrderDate': new Date('2021/10/05'), 'ParentId': null },
    { 'CategoryId': 5, 'CategoryName': 'Silk', 'Status': 'Out of Stock', 'OrderDate': new Date('2021/09/02'), 'ParentId': 7 },
    { 'CategoryId': 6, 'CategoryName': 'Chair', 'Status': 'Available', 'OrderDate': new Date('2021/03/03'), 'ParentId': 1 },
    { 'CategoryId': 7, 'CategoryName': 'Furniture', 'Status': 'Available', 'OrderDate': new Date('2021/03/05'), 'ParentId': null },
    { 'CategoryId': 8, 'CategoryName': 'Bed', 'Status': 'Available', 'OrderDate': new Date('2021/03/05'), 'ParentId': 7 },
    { 'CategoryId': 9, 'CategoryName': 'Fabrics', 'Status': 'Available', 'OrderDate': new Date('2021/10/05'), 'ParentId': 4 }
];