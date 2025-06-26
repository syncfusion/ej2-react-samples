import { createRequire as _createRequire } from "module";
import { useEffect, useRef, useState } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { ChipListComponent } from '@syncfusion/ej2-react-buttons';
import { foodMenu } from './data';
import './restaurant-menu.css';
import * as React from 'react';
import { ItemModel } from "@syncfusion/ej2-react-navigations";

const RestaurantMenu = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const treegridRef = useRef(null);
  const dialogRef = useRef(null);
  const foodOrderDetailsRef = useRef([]);
  const cartCountRef = useRef(0);
  const [treeData, setTreeData] = useState(foodMenu);
  const foodCountChangeFn = (args, rowData) => {
    if (args.event == undefined || null == args.event.srcElement) {
      return;
    }
    const count = args.value;
    const price = parseFloat(rowData.newPrice);
    const foodName = rowData.FoodName;
    const updatedCart: any = [...foodOrderDetailsRef.current];
    const index = updatedCart.findIndex((item) => item.foodName === foodName);
    let newCartCount = cartCountRef.current;
    if (args.previousValue < count) {
      newCartCount += (count - args.previousValue);
    }
    else if (args.previousValue > count) {
      newCartCount -= (args.previousValue - count);
    }
    if (count > 0) {
      if (index >= 0) {
        updatedCart[index] = { ...updatedCart[index], count };
      }
      else {
        updatedCart.push({ foodName, count, price });
      }
    }
    else if (index >= 0) {
      updatedCart.splice(index, 1);
    }
    cartCountRef.current = newCartCount;
    foodOrderDetailsRef.current = updatedCart;
    document.getElementsByClassName('e-cart-badge')[0].textContent = cartCountRef.current.toString();
  };
  const clearCart = () => {
    foodOrderDetailsRef.current = [];
    cartCountRef.current = 0;
    var numericBoxes = document.querySelectorAll('.resmenu-count .e-numerictextbox');
    numericBoxes.forEach(function (box) {
      var instance = (box as any).ej2_instances && (box as any).ej2_instances[0];
      if (instance) instance.value = 0;
    });
    document.getElementsByClassName('e-cart-badge')[0].textContent = '0';
    if (dialogRef.current) {
      (dialogRef.current as any).hide();
    }
  };
  const getFoodCount = (foodName) => {
    const item = (foodOrderDetailsRef.current as any).find(order => order.foodName === foodName);
    return item ? item.count : 0;
  };
  const onSearchChange = (args) => {
    let value = args.value ? args.value.toLowerCase() : '';
    let searchedData = (foodMenu as any).filter(item => item.FoodName.toLowerCase().includes(value) ||
      item.FoodCategory.toLowerCase().includes(value) ||
      !item.CategoryId);
    searchedData.forEach(parent => {
      if (!parent.CategoryId) {
        const children = searchedData.filter(item => item.CategoryId === parent.FoodId);
        parent.vegCount = children.filter(i => i.FoodType === 'Veg').length;
        parent.nonvegCount = children.filter(i => i.FoodType === 'Non-veg').length;
      }
    });
    searchedData = searchedData.filter(function (item) {
      var foodcount = item.vegCount + item.nonvegCount;
      return (foodcount === 0 && item.CategoryId) || (foodcount > 0 && !item.CategoryId);
    });
    setTreeData(searchedData);
  };
  const rowTemplate = (props) => {
    if (props.FoodName === props.FoodCategory || props.CategoryId == null) {
      return (<tr>
        <td className='resmenu-cell resmenu-parentfoodname' colSpan={3}>
          <span className="resmenu-title">{props.FoodName}&nbsp;({props.vegCount + props.nonvegCount})</span>
        </td>
      </tr>);
    }
    return (<tr>
      <td className='resmenu-cell'>
        <div className='resmenu-card'>
          <div className="foodname-row">
            {props.FoodType === 'Veg' ? (<span className='resmenu-FoodCategory_icon_veg'><span className="resmenu-veg-icon"></span></span>) : (<span className='resmenu-FoodCategory_icon_nonveg'><span className="resmenu-nonveg-icon"></span></span>)}
            <span className='resmenu-foodname'>{props.FoodName}</span>
          </div>
          <div className="resmenu-rating">
            <span>
              <span className="resmenu-rating-thumbsup">👍</span>
              <span className="resmenu-rating-value">{props.Rating}</span>
              <span className="resmenu-rating-count">({props.TotalReviews})</span>
            </span>
          </div>
          <div className='resmenu-fooddesc'>{props.FoodDescription}</div>
          <div className="resmenu-info-separator">
            <ChipListComponent chips={props.ingredients} cssClass="e-outline" id="ingredientsList" />
          </div>
        </div>
      </td>
      <td className='resmenu-cell'>
        <div className="resmenu-price-section">
          {props.originalPrice > props.newPrice ? (<>
            <span className="resmenu-price">${props.newPrice} &nbsp;&nbsp;</span>
            <span className='price-direction'>  &lt;--- </span>
            <span className="resmenu-old-price">${props.originalPrice}</span>
          </>) : <span className="resmenu-price">${props.newPrice}</span>}
        </div>
      </td>
      <td className='resmenu-cell'>
        <div className="menu-right">
          <div className="resmenu-image-wrap">
            <img className="resmenu-image" src={props.Image} alt={props.FoodName} />
            <div className="resmenu-count">
              <NumericTextBoxComponent
                min={0}
                max={10}
                step={1}
                format="N0"
                width="110px"
                value={getFoodCount(props.FoodName)}
                change={(args) => {
                  foodCountChangeFn(args, props);
                }}
              />
            </div>
          </div>
        </div>
      </td>
    </tr>);
  };
  const printCartDialogContent = () => {
    var treeGridElement = document.getElementById('RestaurantTreeGrid');
    var rect = treeGridElement.getBoundingClientRect();
    var rect = treeGridElement.getBoundingClientRect();
    var windowWidth = 400;
    var windowHeight = 600;
    var leftPosition = rect.left + window.scrollX + (rect.width / 2) - (windowWidth / 2);
    var topPosition = rect.top + window.scrollY + (rect.height / 2) - (windowHeight / 2);
    var printContents = document.querySelector('#cartDialog .e-dlg-content').innerHTML;
    var printWindow = window.open('', '', `height=${windowHeight},width=${windowWidth},left=${leftPosition},top=${topPosition}`);
    printWindow.document.write(printContents);
    printWindow.focus();
    printWindow.addEventListener('afterprint', function (args) {
      printWindow.close();
      clearCart();
    });
    printWindow.print();
  };
  const onCartClick = () => {
    const cartItems = (foodOrderDetailsRef.current as any).filter(item => item.count > 0);
    if (dialogRef.current) {
      (dialogRef.current as any).content = getCartTableHtml(cartItems);
      (dialogRef.current as any).show();
    }
  };
  const toolbarOptions: ItemModel[] = [
    {
      template: `
                    <div style="display:flex;align-items:center;cursor:auto;">
                        <img src="src/treegrid/images/male.png" alt="avatar" style="width:40px;height:40px;border-radius:50%;margin-right:14px;">
                        <div>
                            <div style="font-size:20px;font-weight:600;line-height:1.2;">Hi, <span style="color:#ff9800;font-weight:700;">Susan</span></div>
                            <div style="font-size:13px;color:#888;line-height:1.2;">Morrisville, USA</div>
                        </div>
                    </div>
                    `,
      align: 'Left',
      id: 'customerDetails'
    },
    {
      id: 'CartUpdate',
      align: 'Right',
      template: '<div class="e-btn-group e-custom-button badge-block"><button id="CartUpdate" class="e-btn">VIEW CART<span id="cartbadge" class="e-cart-badge e-badge e-badge-primary e-badge-notification e-badge-overlap">0</span></button></div>'
    }
  ];
  const toolbarClick = (args) => {
    if (args.item.id === 'CartUpdate') {
      onCartClick();
    }
  };
  const getCartTableHtml = (items) => {
    if (!items.length) {
      return '<div class="cart-empty">No items in cart.</div>';
    }
    const rows = items.map((item) => `
      <tr>
        <td>${item.foodName}</td>
        <td>$${item.price}</td>
        <td style="text-align:center;">${item.count}</td>
        <td style="text-align:right;">$${(item.price * item.count).toFixed(2)}</td>
      </tr>
    `).join('');
    const total = Math.round(items.reduce((sum, item) => sum + item.price * item.count, 0));
    const delivery = 3.6;
    const gst = Math.round(total * 0.12 * 100) / 100;
    const toPay = Math.round((total + delivery + gst) * 100) / 100;
    return `
      <div class="sample-order">
            <div  class="resmenu-order-no"><span > Order No: </span>${Math.floor(Math.random() * (99 - 10 + 1)) + 100}</div>
            <div  ><span class="resmenu-order-date">Date: </span>${new Date().toLocaleDateString()}</div>
        </div>
        <div id="dialog-container">
            <div style="max-height:220px;overflow-y:auto;margin-bottom:12px;">
            <table style="width:100%;border-collapse:collapse;">
                <thead>
                    <tr style="border-bottom: 2px solid #e0e0e0;">
                        <th style="text-align:left;">Dish</th>
                        <th style="text-align:left;">Price</th>
                        <th style="text-align:center;">Qty</th>
                        <th style="text-align:right;">Total</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            </div>
            <div style="border-top:2px solid #eee;padding-top:12px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <span>Item Total</span><span>$${total}</span>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <span>Delivery Fee</span><span>$${delivery}</span>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <span>TAX & Other Charges</span><span>$${gst}</span>
                </div>
                <div style="border-top:2px solid #beb5b5;display:flex;justify-content:space-between;font-weight:bold;font-size:18px;margin-top:10px;">
                    <span>TO PAY</span><span>$${toPay}</span>
                </div>
            </div>
             <div class="resmenu-thank-note">
              <div >Thank you for your order!</div>
            </div>
        </div>
    `;
  };

  const databound = () => {
    (treegridRef as any).current.grid.emptyRecordTemplate = `<div className='emptyRecordTemplate'>        
        <span className="resmenu-emptyRecord">Hmm... we could not find that dish. Want to try something else?</span>
    </div>`;
  }
  const beforeOpen = (args: any) => {
    const itemsInCart = (foodOrderDetailsRef.current as any).filter(item => item.count > 0);
    if (itemsInCart.length < 4) {
      args.maxHeight = '500px';
    }
    else {
      args.maxHeight = '600px';
    }
    if (itemsInCart.length === 0) {
      dialogRef.current.buttons[1].buttonModel.disabled = true;
    } else {
      dialogRef.current.buttons[1].buttonModel.disabled = false;
    }
    dialogRef.current.refresh();
  };
  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="content-wrapper">
          <div className="treegrid-center-container">
            <div className="resmenu-toolbar-search">
              <AutoCompleteComponent dataSource={Array.from(new Set(foodMenu.map(i => (i as any).FoodName)))} placeholder="Search for dishes" width='800px' highlight={true} filterType='Contains' change={onSearchChange} id='search-autocomplete' />
            </div>

            <div id="res-menu">
              <DialogComponent id="cartDialog" ref={dialogRef} header='Bill Summary' width='400px' showCloseIcon={true} isModal={true} visible={false} animationSettings={{ effect: 'Zoom' }} buttons={[
                { click: () => clearCart(), buttonModel: { content: 'Cancel' } },
                { click: () => printCartDialogContent(), buttonModel: { content: 'Print', isPrimary: true } },
              ]} target='#RestaurantTreeGrid' beforeOpen={beforeOpen}></DialogComponent>

              <TreeGridComponent id='RestaurantTreeGrid' ref={treegridRef} allowKeyboard={false} dataSource={treeData} dataBound={databound} idMapping='FoodId' parentIdMapping='CategoryId' treeColumnIndex={0} rowTemplate={rowTemplate} toolbar={toolbarOptions} toolbarClick={toolbarClick}

                height={400} width={800}>
                <ColumnsDirective>
                  <ColumnDirective field='FoodName' headerText='Explore Our Menu' width='150' />
                </ColumnsDirective>
                <Inject services={[Toolbar]} />
              </TreeGridComponent>
            </div>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>
          This demo shows how the Tree Grid can be used to create a visually rich and interactive food menu. The demo meets
          different viewer preferences, such as vegetarian and bestseller dishes. It uses a food dataset that includes
          details for categories like salads, pizza, burgers, hot-dogs, chowmein, and desserts, with descriptions, prices and
          ratings.
        </p>
      </div>
      <div id="description">
        <p>
          The sample shows how dynamic, customizable row templates and custom cell rendering make the menu more informative
          and attractive. The Tree Grid row template adds visual elements like images, ratings, and price comparisons
          right in the cells. With its flexibility and easy customization, the Tree Grid is a great tool for creating
          interesting and engaging food menu presentations.
        </p>
        <p>
          More information about TreeGrid can be found in the
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/getting-started">documentation section</a>.
        </p>
      </div>
    </div>
  );
};
export default RestaurantMenu;
