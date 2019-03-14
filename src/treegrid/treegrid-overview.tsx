import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Filter, Sort, Reorder, Inject, ITreeData } from '@syncfusion/ej2-react-treegrid';
import { countries } from './data';
import { IFilter } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
import { QueryCellInfoEventArgs, ActionEventArgs, getObject } from '@syncfusion/ej2-grids';
import { addClass, isNullOrUndefined } from '@syncfusion/ej2-base';
import './treegrid-overview.css';

export class Overview extends SampleBase<{}, {}> {
  
  public gridTemplate(props): any { 
    return (<div><div style={{display: 'inline-block'}}>
    <img className='e-image'></img>     
    </div><div style={{ display: 'inline-block', paddingLeft: '6px'}}>{props.name}</div></div>);
  }

  public treegridTemplate(props): any {
    return (<div className='statustemp'>
        <span className='statustxt'>{props.gdp}</span>
    </div>);
  }

  public treeratingTemplate(props): any {
    if (props.rating) {
      return (<div className='rating'>
      <span className="star"></span>
      <span className="star"></span>
      <span className="star"></span>
      <span className="star"></span>
      <span className="star"></span>
    </div>);
    }
    else {
      return(<span></span>);
    }
  }

  public treeunemployTemplate(props): any {
    return (<div id='myProgress' className='pbar'>
      <div id='myBar' className='bar'>
        <div id='label' className='barlabel'></div>
      </div>
    </div>);
  }

  public treelocationTemplate(props): any {
    var locationsrc = 'src/treegrid/images/Map.png';

    return (<div>
      <img src={locationsrc} className='e-image' alt={props.coordinates} />
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
    return (<div><img src='src/treegrid/images/__Normal.png' className={classValue}></img><span style={{ paddingLeft: '7px'}}>{props.timezone}</span>)</div>);
  }


  public Filter : IFilter = {
    type: 'Excel', 
    itemTemplate: '#flagtemplate'
  }

  public populationValue(field: string, data: Object) {
    return data[field] / 1000000;
  }
  private queryCellinfo(args: QueryCellInfoEventArgs): void {
    if (args.column.field === 'gdp') {
      if (args.data[args.column.field] < 2) {
          args.cell.querySelector('.statustxt').classList.add('e-lowgdp');
          args.cell.querySelector('.statustemp').classList.add('e-lowgdp');
      }
    }
    if (args.column.field === 'rating') {
      if (args.column.field === 'rating') {
          for (let i: number = 0; i < args.data[args.column.field]; i++) {
              args.cell.querySelectorAll('span')[i].classList.add('checked');
          }
      }
    }
    if (args.column.field === 'unemployment') {
      if (args.data[args.column.field] <= 4) {
          addClass([args.cell.querySelector('.bar')], ['progressdisable']);
      }
      (args.cell.querySelector('.bar')as HTMLElement).style.width = args.data[args.column.field] * 10 + '%';
      args.cell.querySelector('.barlabel').textContent = args.data[args.column.field] + '%';
    }
     
    if (args.column.field === 'name') {
      let parentItem: ITreeData = getObject('parentItem', args.data);
      let imageElement = (args.cell as Element).querySelector('.e-image') as HTMLImageElement;
      if (isNullOrUndefined(parentItem)) {
        let name: string = getObject('name', args.data);
        imageElement.src = "src/treegrid/images/" + name + ".png";
      } else {
        let name: string = getObject('name', parentItem);
        imageElement.src = "src/treegrid/images/" + name + ".png";
      }
    }
  }
  public flagtemplate: any = this.gridTemplate;
  public gdptemplate: any = this.treegridTemplate;
  public ratingtemplate: any = this.treeratingTemplate;
  public unemploymentTemplate: any = this.treeunemployTemplate;
  public locationtemplate: any = this.treelocationTemplate;
  public areatemplate: any = this.treeareaTemplate;
  public timezonetemplate: any = this.treezoneTemplate;

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={countries} childMapping='states' height='400' allowReordering='true'
          allowFiltering='true' allowSorting='true' filterSettings={{ type:'Menu', hierarchyMode:'Parent'}}
          queryCellInfo={this.queryCellinfo.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='name' headerText='Province' width='170' template={this.flagtemplate} filter={this.Filter}></ColumnDirective>
              <ColumnDirective field='population' headerText='Populationf (Million)' allowFiltering={false} valueAccessor={this.populationValue} textAlign='Right' width='200'></ColumnDirective>
              <ColumnDirective field='gdp' headerText='GDP Rate %' width='145' template={this.gdptemplate} />
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
          <p>This sample demonstrates the overview of basic treegrid features such as sorting, filtering, conditional formatting, column template and scrolling.</p>
        </div>
        <div id='description'>
          <p>
            The TreeGrid is used to represent the hierarchical data in a tabular format, combining the visual representation of Grid and TreeView controls. 
            It represents the data from datasource such as an array of JSON objects, OData web services, or DataManager binding data fields to columns or self-referential datasource.
          </p>
          <p>
            In this demo, TreeGrid features such as <code>sorting, filtering, conditional formatting, column template and scrolling</code> are used.
          </p>
          <p>
            More information on the TreeGrid instantiation can be found in this <a target='_blank' href='#'> documentation section.</a>
          </p>
        </div>
      </div>
    )
  }
}