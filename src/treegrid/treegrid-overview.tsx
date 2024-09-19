import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Filter, Sort, Reorder, Inject, ITreeData } from '@syncfusion/ej2-react-treegrid';
import { countries } from './data';
import { IFilter } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
import { ActionEventArgs, getObject } from '@syncfusion/ej2-grids';
import { addClass, isNullOrUndefined } from '@syncfusion/ej2-base';
import './treegrid-overview.css';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';

export class Overview extends SampleBase<{}, {}> {
  
  public gridTemplate(props): any { 
    var flagIconLocation = (props.parentItem)? props.parentItem.name : props.name;
    return (<div style={{display: 'inline'}}><div style={{display: 'inline-block'}}>
    <img className='e-treeoverviewimage' src={"src/treegrid/images/"+flagIconLocation+".png"} alt = {flagIconLocation}></img>     
    </div><div style={{ display: 'inline-block', paddingLeft: '6px'}}>{props.name}</div></div>);
  }

  public treegridTemplate(props): any {
    if (props.gdp < 2) {
      return (
        <div className="statustemp e-lowgdp">
          <span className="statustxt e-lowgdp">{props.gdp} %</span>
        </div>
      );
      }
      else{
        return (
          <div className="statustemp">
            <span className="statustxt">{props.gdp} %</span>
          </div>
        );
      }
  }

  public treeratingTemplate(props): any {
    return (<div><RatingComponent value={props.rating} cssClass={'custom-rating'} readOnly={true}/></div>);
  }

  public treeunemployTemplate(props): any {
    return (<div id="myProgress" className="pbar">
    {props.unemployment <=4 ?
            <div id="myBar" className="bar progressdisable" style={{ width: props.unemployment * 10 + "%" }}>
      <div id="pbarlabel" className="barlabel">{props.unemployment + "%"}</div>
    </div> :
            <div id="myBar" className="bar" style={{ width: props.unemployment * 10 + "%" }}>
      <div id="pbarlabel" className="barlabel">{props.unemployment + "%"}</div>
    </div>}
    </div>);
  }

  public treelocationTemplate(props): any {
    var locationsrc = 'src/treegrid/images/Map.png';

    return (<div id="coordinates">
      <img src={locationsrc} className='e-treeoverviewimage' alt={props.coordinates} />
      <a target='_blank' href='https://www.google.com/maps/place/'>{props.coordinates}</a>
    </div>);
  }

  public treeareaTemplate(props): any {
    return (<span>{props.area} km<sup>2</sup></span>);
  }

  public treezoneTemplate(props): any {
    let classValue = '';
    if (props.timezone.indexOf('-') !== -1) {
      classValue = 'negativeTimeZone';
  }
    return (<div><img src='src/treegrid/images/__Normal.png' alt="Normal" style={{ filter: "brightness(150%)"}} className={classValue}></img><span style={{ paddingLeft: '7px'}}>{props.timezone}</span>)</div>);
  }

  public populationValue(field: string, data: Object) {
    return data[field] / 1000000;
  }
  public flagtemplate: any = this.gridTemplate;
  public gdptemplate: any = this.treegridTemplate;
  public ratingtemplate: any = this.treeratingTemplate;
  public unemploymentTemplate: any = this.treeunemployTemplate;
  public locationtemplate: any = this.treelocationTemplate;
  public areatemplate: any = this.treeareaTemplate;
  public timezonetemplate: any = this.treezoneTemplate;

  public Filter : IFilter = {
    type: 'Excel', 
    itemTemplate: this.flagtemplate
  }

  render() {
    return (
      <div className='control-pane' role="control" aria-label="Tree Grid Control">
        <div className='control-section'>
          <TreeGridComponent dataSource={countries} childMapping='states' height='400' allowReordering={true}
          allowFiltering={true} allowSorting={true} filterSettings={{ type:'Menu', hierarchyMode:'Parent'}}>
            <ColumnsDirective>
              <ColumnDirective field='name' headerText='Province' width='210' template={this.flagtemplate} filter={this.Filter}></ColumnDirective>
              <ColumnDirective field='population' headerText='Population (Million)' allowFiltering={false} valueAccessor={this.populationValue} textAlign='Right' width='200'></ColumnDirective>
              <ColumnDirective field='gdp' headerText='GDP Rate %' width='155' template={this.gdptemplate} />
              <ColumnDirective field='rating' headerText='Credit Rating' width='190' template={this.ratingtemplate}  />
              <ColumnDirective field='unemployment' headerText='Unemployment Rate' width='200' allowFiltering={false} template={this.unemploymentTemplate} />
              <ColumnDirective field='coordinates' headerText='Coordinates' allowSorting={false} width='220' template={this.locationtemplate} />
              <ColumnDirective field='area' headerText='Area' width='140' template={this.areatemplate} />
              <ColumnDirective field='timezone' headerText='Time Zone' width='150' template={this.timezonetemplate} />
            </ColumnsDirective>
            <Inject services={[Filter, Sort, Reorder]} />
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This <a target='_blank' href="https://www.syncfusion.com/react-ui-components/react-tree-grid"> React Tree Grid</a> example demonstrates the overview of basic Tree Grid features such as sorting, filtering, conditional formatting, column template and scrolling.</p>
        </div>
        <div id='description'>
          <p>
            The Tree Grid is used to represent the hierarchical data in a tabular format, combining the visual representation of Grid and TreeView controls. 
            It represents the data from datasource such as an array of JSON objects, OData web services, or DataManager binding data fields to columns or self-referential datasource.
          </p>
          <p>
            In this demo, Tree Grid features such as <code>sorting, filtering, conditional formatting, column template and scrolling</code> are used.
          </p>
          <p>
            More information on the Tree Grid instantiation can be found in this 
            <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/treegrid/getting-started/'> documentation section.</a>
          </p>
        </div>
      </div>
    )
  }
}
