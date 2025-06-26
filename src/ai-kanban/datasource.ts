export const kanbanStyles = `
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');

.tailwind-dark .e-kanban .e-kanban-header .e-header-cells .e-item-count,
.tailwind .e-kanban .e-kanban-header .e-header-cells .e-item-count,
.bootstrap5-dark .e-kanban .e-kanban-header .e-header-cells .e-item-count,
.bootstrap5 .e-kanban .e-kanban-header .e-header-cells .e-item-count {
margin-top: 3px;
}

.e-kanban .header-template-wrap {
display: inline-flex;
font-size: 15px;
font-weight: 500;
}

.e-kanban .header-template-wrap .header-icon {
font-family: 'Kanban priority icons';
margin-top: 3px;
width: 10%;
}

.e-kanban .header-template-wrap .header-text {
margin-left: 15px;
}

.e-kanban.e-rtl .header-template-wrap .header-text {
margin-right: 15px;
}

.e-kanban.e-rtl .e-card-avatar {
left: 12px;
right: auto;
}

.e-kanban .e-card-avatar {
width: 30px;
height: 30px;
text-align: center;
background: gainsboro;
color: #6b6b6b;
border-radius: 50%;
position: absolute;
right: 12px;
bottom: 10px;
font-size: 12px;
font-weight: 400;
padding: 7px 3px;
}

.bootstrap5 .e-kanban .e-card-avatar,
.bootstrap5-dark .e-kanban .e-card-avatar,
.tailwind .e-kanban .e-card-avatar,
.tailwind-dark .e-kanban .e-card-avatar {
padding: 8px 3px;
}

.e-kanban .Open::before {
content: '\e700';
color: #0251cc;
font-size: 16px;
}

.e-kanban .In.Progress::before {
content: '\e703';
color: #ea9713;
font-size: 16px;
}

.e-kanban .e-image img {
background: #ececec;
border: 1px solid #c8c8c8;
border-radius: 50%;
}

.e-kanban .Review::before {
content: '\e701';
color: #8e4399;
font-size: 16px;
}

.e-kanban .Close::before {
content: '\e702';
color: #63ba3c;
font-size: 16px;
}

.e-kanban .e-card .e-card-tag {
background: #ececec;
color: #6b6b6b;
margin-right: 5px;
line-height: 1.1;
font-size: 13px;
border-radius: 3px;
padding: 4px;
}

.e-kanban .e-card-footer {
display: flex;
padding: 0px 12px 12px;
line-height: 1;
height: 35px;
}

.bootstrap5 .e-kanban .e-card-footer,
.bootstrap5-dark .e-kanban .e-card-footer {
height: 51px;
}

.tailwind .e-kanban .e-card-footer,
.tailwind-dark .e-kanban .e-card-footer {
height: 41px;
}

.bootstrap5.e-bigger .e-kanban .e-card-footer,
.bootstrap5-dark.e-bigger .e-kanban .e-card-footer,
.tailwind.e-bigger .e-kanban .e-card-footer,
.tailwind-dark.e-bigger .e-kanban .e-card-footer {
height: 37px;
}

.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card.Low.e-selection:hover,
.card-template.Low {
border-left: 3px solid #ffd600
}

.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card.High.e-selection:hover,
.card-template.High {
border-left: 3px solid #990099
}

.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card.Normal.e-selection:hover,
.card-template.Normal {
border-left: 3px solid #66cc33
}

.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card.Critical.e-selection:hover,
.card-template.Critical {
border-left: 3px solid #cc0000
}

.e-kanban.e-rtl .card-template {
border-left: none
}

@font-face {
font-family: 'Kanban priority icons';
src: url(data:application/x-font-ttf;charset=utf-8;base64,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) format('truetype');
font-weight: normal;
font-style: normal;
}

[class^="sf-icon-"],
[class*=" sf-icon-"] {
font-family: 'Kanban priority icons' !important;
speak: none;
font-size: 55px;
font-style: normal;
font-weight: normal;
font-variant: normal;
text-transform: none;
line-height: 1;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}

.fluent .e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-tag,
.fluent .e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-container .e-card .e-card-tag,
.fluent-dark .e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-tag,
.fluent-dark .e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-container .e-card .e-card-tag {
padding: 0px 4px;
font-size: 12px;
}

.fluent .e-kanban .e-card-avatar {
padding: 7px 4px;
}

.container {
display: flex;
flex-direction: column;
height: 100vh;
padding: 20px;
width: 80%;
}

.rows {
background-color: #fff;
border: 1px solid #ccc;
border-radius: 10px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
margin: 20px;
padding: 20px;
}

.row-small {
flex: 0 1 auto;
display: flex;
justify-content: start;
align-items: start;
padding: 5px !important;
margin-bottom: 5px !important;
}

.row-large {
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 0;
}

.form-table {
width: 100%;
border-collapse: collapse;
}

.form-table th,
.form-table td {
padding: 10px;
text-align: left;
}

.form-table th {
font-weight: bold;
text-align: center;
}

.custom-dialog .e-dialog .e-dlg-header {
text-align: center;
}

.form-input {
width: 100%;
padding: 8px;
box-sizing: border-box;
border: 1px solid #ccc;
border-radius: 4px;
}

#Description {
height: 100px;
}

.custom-row-kanban-1 {
padding-left: 12px !important;
padding-right: 12px !important;
padding-top: 0px !important;
padding-bottom: 0px !important;
height: 100%;
}

.custom-row-kanban-1,
.custom-row-kanban-2 {
display: flex;
flex-wrap: wrap;
}

.cuscol-0,
.cuscol-1,
.cuscol-2,
.cuscol-01 {
padding: 0.5rem;
}

.no-results-found {
text-align: center;
margin-top: 2rem;
}

.no-results-found img {
display: block;
margin: 0 auto;
}

.cuscol-2 {
padding: 20px;
}

.h-100 {
height: 100%;
}

.w-100 {
width: 100%;
}

.cuscol-1 {
display: flex;
flex-direction: column !important;
}

.cuscol-2 {
display: flex;
flex-direction: column !important;
}

textarea {
resize: none !important;
}

textarea.e-input,
.e-input-group textarea.e-input,
.e-input-group.e-control-wrapper textarea.e-input {
height: 100px;
}

.e-left {
flex: 3;
}

.e-right {
flex: 7;
}

#projectDetailsDialog .custom-dialog .e-dialog .e-dlg-header {
text-align: center;
}

.text-center {
text-align: center !important;
}

.my-3 {
margin-top: 1rem !important;
margin-bottom: 1rem !important;
}

.col-12 {
flex: 0 0 auto;
width: 100%;
}
`;

export interface PizzaDataModel {
    Id: string;
    OrderID: string;
    Title: string;
    Type: string;
    Size: string;
    Category: string;
    Description: string;
    CardTags: string[];
    ImageURL: string;
    Price: string;
    Date: Date;
    Feedback?: string;
    SentimentScore?: number;
    Emoji?: string;
}

export let pizzaData: PizzaDataModel[] = [
    {
        Id: "1",
        OrderID: "Order ID - #16365",
        Title: "Mexican Green Wave",
        Type: "Vegetarian",
        Size: "Small",
        Category: "Order",
        Description: "Stromboli sandwich with chili sauce",
        CardTags: ["Onions", "Pepper", "Cheese"],
        ImageURL: "https://blazor.syncfusion.com/demos/_content/Blazor_Server_Common_NET9/images/kanban/menu-01.png",
        Price: "$4.79",
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        Feedback: "",
        SentimentScore: 0,
        Emoji: ""
    },
    {
        Id: "2",
        OrderID: "Order ID - #16367",
        Title: "Peppy Paneer",
        Type: "Vegetarian",
        Size: "Large",
        Category: "Ready to Serve",
        Description: "It's made using toppings of tomato, mozzarella cheese and fresh basil",
        CardTags: ["Onions", "Pepper", "Cheese"],
        ImageURL: "https://blazor.syncfusion.com/demos/_content/Blazor_Server_Common_NET9/images/kanban/menu-02.png",
        Price: "$14.99",
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        Feedback: "",
        SentimentScore: 0,
        Emoji: ""
    },
    {
        Id: "3",
        OrderID: "Order ID - #16372",
        Title: "Chicken Golden Delight",
        Type: "Non-Vegetarian",
        Size: "Large",
        Category: "Order",
        Description: "Barbeque chicken with a topping of golden corn loaded with extra cheese",
        CardTags: ["BBQ", "Prawn"],
        ImageURL: "https://blazor.syncfusion.com/demos/_content/Blazor_Server_Common_NET9/images/kanban/menu-07.png",
        Price: "$14.99",
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        Feedback: "",
        SentimentScore: 0,
        Emoji: ""
    },
    {
        Id: "4",
        OrderID: "Order ID - #16374",
        Title: "Chicken Fiesta",
        Type: "Non-Vegetarian",
        Size: "Small",
        Category: "Delivered",
        Feedback: "Good",
        Description: "Grilled Chicken Rashers with Peri-Peri chicken, Onion and Capsicum",
        CardTags: ["Chicken", "Capsicum"],
        ImageURL: "https://blazor.syncfusion.com/demos/_content/Blazor_Server_Common_NET9/images/kanban/menu-13.png",
        Price: "$4.79",
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        SentimentScore: 0,
        Emoji: ""
    },
    {
        Id: "5",
        OrderID: "Order ID - #16375",
        Title: "Double Cheese Margherita",
        Type: "Vegetarian",
        Size: "Medium",
        Category: "Delivered",
        Feedback: "Best",
        Description: "Margherita with chili sauce and double Cheese",
        CardTags: ["Onions", "Pepper"],
        ImageURL: "https://blazor.syncfusion.com/demos/_content/Blazor_Server_Common_NET9/images/kanban/menu-10.png",
        Price: "$11.99",
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        SentimentScore: 0,
        Emoji: ""
    },
    {
        Id: "6",
        OrderID: "Order ID - #16379",
        Title: "Chicken Dominator",
        Type: "Non-Vegetarian",
        Size: "Small",
        Category: "Menu",
        Description: "Double Pepper Barbecue Chicken with Peri-Peri Chicken, Chicken Tikka, Grilled and Rashers",
        CardTags: ["Pepper", "Chicken"],
        ImageURL: "https://blazor.syncfusion.com/demos/_content/Blazor_Server_Common_NET9/images/kanban/menu-15.png",
        Price: "$4.79",
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        Feedback: "",
        SentimentScore: 0,
        Emoji: ""
    },
    {
        Id: "9",
        OrderID: "Order ID - #16383",
        Title: "Margherita",
        Type: "Vegetarian",
        Size: "Large",
        Category: "Ready to Deliver",
        Description: "Lebanese Pizza topped with tomato sauce",
        CardTags: ["Pepper", "Cheese"],
        ImageURL: "https://blazor.syncfusion.com/demos/_content/Blazor_Server_Common_NET9/images/kanban/menu-18.png",
        Price: "$4.99",
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        Feedback: "",
        SentimentScore: 0,
        Emoji: ""
    },
    {
        Id: "10",
        OrderID: "Order ID - #16384",
        Title: "Pepper Barbecue and Onion",
        Type: "Non-Vegetarian",
        Size: "Medium",
        Category: "Ready to Deliver",
        Description: "Pepper Barbecue chicken with Onion",
        CardTags: ["Onions", "Chicken"],
        ImageURL: "https://blazor.syncfusion.com/demos/_content/Blazor_Server_Common_NET9/images/kanban/menu-20.png",
        Price: "$11.99",
        Date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        Feedback: "",
        SentimentScore: 0,
        Emoji: ""
    }
];