import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { ChipListComponent } from '@syncfusion/ej2-react-buttons';
import { pizzaData } from './data';
import { SampleBase } from '../common/sample-base';
import './row-template.css';

export class RowTemplate extends SampleBase<{}, {}> {

    public chipTags = (tags: string[]) => {
        return (<ChipListComponent chips={tags} cssClass={'e-outline'} />);
    }

    public gridTemplate(props: any): any {
        var src = 'src/grid/images/pizza/' + props.ImageURL;
        return (
            <tr>
                <td className="details">
                    <div className="e-pizza-info-container">
                        <div className="e-pizza-image-layout">
                            <img className="e-pizza-image" src={src} alt={props.Title} />
                        </div>
                        <div className="e-pizza-info-layout">
                            <div className="e-info-text-separator"><span className="e-pizza-title">{props.Title}</span><span className="e-pizza-size">({props.Size} size)</span></div>
                            <div className="e-info-text-separator"><span>{props.Description}</span></div>
                            <div className="e-info-text-separator">{this.chipTags(props.Tags)}</div>
                            <div className="e-pizza-price-min-layout e-info-text-separator">
                                <span className="e-pizza-price-text">Buy at&nbsp;</span>
                                <span className="e-pizza-price">{props.Price}</span>
                                {props.OriginalPrice ?
                                    (<span className="e-pizza-original-price">{props.OriginalPrice}</span>)
                                    : ''}
                            </div>
                        </div>
                        <div className="e-flex-grow"></div>
                        <div className="e-pizza-price-layout">
                            <div className="e-info-text-separator"><span className="e-pizza-price-text">Buy at</span></div>
                            <div className="e-info-text-separator"><span className="e-pizza-price">{props.Price}</span></div>
                            {props.OriginalPrice ?
                                <div className="e-info-text-separator"><span className="e-pizza-original-price">{props.OriginalPrice}</span></div>
                                : ''}
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    public template: any = this.gridTemplate;

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={pizzaData} rowTemplate={this.template.bind(this)} width='auto' height='335'>
                        <ColumnsDirective>
                            <ColumnDirective headerText='PIZZA MENU' textAlign='Center' field='Title' customAttributes={{class: 'e-pizza-cell'}}/>
                        </ColumnsDirective>
                    </GridComponent>
                </div>
                <div id="action-description">
    <p>
    The Grid utilizes the row template feature to design a custom layout for its rows.
        The <code><a target="_blank"className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid#rowtemplate">rowTemplate</a></code> property can accept either a string or the ID of an HTML element, which is used as
        the template for each row.
    </p>
                </div>
                <div id='description'>
    <p>
        In this demo, various types of pizza are displayed along with their ingredients, additional toppings,
        prices, and discount offers, all presented within a custom layout in the Grid.
    </p>
    <p>
        For more details on the row template feature, refer to this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/row/row-template">
            documentation section</a>.
    </p>
                </div>
            </div>
        )
    }
}
