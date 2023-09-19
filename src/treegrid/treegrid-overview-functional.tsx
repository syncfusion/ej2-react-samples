import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Filter, Sort, Reorder, Inject, ITreeData } from '@syncfusion/ej2-react-treegrid';
import { countries } from './data';
import { IFilter } from '@syncfusion/ej2-react-grids';
import { QueryCellInfoEventArgs, ActionEventArgs, getObject } from '@syncfusion/ej2-grids';
import { addClass, isNullOrUndefined } from '@syncfusion/ej2-base';
import './treegrid-overview.css';
import { updateSampleSection } from '../common/sample-base';

const Overview = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const gridTemplate = (props): any => {
    var flagIconLocation = props.parentItem
      ? props.parentItem.name
      : props.name;
    return (
      <div style={{ display: "inline" }}>
        <div style={{ display: "inline-block" }}>
          <img
            className="e-image"
            src={"src/treegrid/images/" + flagIconLocation + ".png"}
          ></img>
        </div>
        <div style={{ display: "inline-block", paddingLeft: "6px" }}>
          {props.name}
        </div>
      </div>
    );
  };

  const treegridTemplate = (props): any => {
    return (
      <div className="statustemp">
        <span className="statustxt">{props.gdp} %</span>
      </div>
    );
  };

  const treeratingTemplate = (props): any => {
    if (props.rating) {
      return (
        <div className="rating">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </div>
      );
    } else {
      return <span></span>;
    }
  };

  const treeunemployTemplate = (props): any => {
    return (
      <div id="myProgress" className="pbar">
        <div id="myBar" className="bar">
          <div id="treegridlabel" className="barlabel"></div>
        </div>
      </div>
    );
  };

  const treelocationTemplate = (props): any => {
    var locationsrc = "src/treegrid/images/Map.png";
    return (
      <div id="coordinates">
        <img src={locationsrc} className="e-image" alt={props.coordinates} />
        <a target="_blank" href="https://www.google.com/maps/place/">
          {props.coordinates}
        </a>
      </div>
    );
  };

  const treeareaTemplate = (props): any => {
    return (
      <span>
        {props.area} km<sup>2</sup>
      </span>
    );
  };

  const treezoneTemplate = (props): any => {
    let classValue = "";
    if (props.timezone.indexOf("-") !== -1) {
      classValue = "negativeTimeZone";
    }
    return (
      <div>
        <img
          src="src/treegrid/images/__Normal.png"
          style={{ filter: "brightness(150%)" }}
          className={classValue}
        ></img>
        <span style={{ paddingLeft: "7px" }}>{props.timezone}</span>)
      </div>
    );
  };

  const populationValue = (field: string, data: Object) => {
    return data[field] / 1000000;
  };
  const queryCellinfo = (args: QueryCellInfoEventArgs): void => {
    if (args.column.field === "gdp") {
      if (args.data[args.column.field] < 2) {
        args.cell.querySelector(".statustxt").classList.add("e-lowgdp");
        args.cell.querySelector(".statustemp").classList.add("e-lowgdp");
      }
    }
    if (args.column.field === "rating") {
      if (args.column.field === "rating") {
        for (let i: number = 0; i < args.data[args.column.field]; i++) {
          args.cell.querySelectorAll("span")[i].classList.add("checked");
        }
      }
    }
    if (args.column.field === "unemployment") {
      if (args.data[args.column.field] <= 4) {
        addClass([args.cell.querySelector(".bar")], ["progressdisable"]);
      }
      (args.cell.querySelector(".bar") as HTMLElement).style.width =
        args.data[args.column.field] * 10 + "%";
      args.cell.querySelector(".barlabel").textContent =
        args.data[args.column.field] + "%";
    }

    if (args.column.field === "name") {
      let parentItem: ITreeData = getObject("parentItem", args.data);
      let imageElement = (args.cell as Element).querySelector(
        ".e-image"
      ) as HTMLImageElement;
      if (isNullOrUndefined(parentItem)) {
        let name: string = getObject("name", args.data);
        imageElement.src = "src/treegrid/images/" + name + ".png";
      } else {
        let name: string = getObject("name", parentItem);
        imageElement.src = "src/treegrid/images/" + name + ".png";
      }
    }
  };
  let flagtemplate: any = gridTemplate;
  let gdptemplate: any = treegridTemplate;
  let ratingtemplate: any = treeratingTemplate;
  let unemploymentTemplate: any = treeunemployTemplate;
  let locationtemplate: any = treelocationTemplate;
  let areatemplate: any = treeareaTemplate;
  let timezonetemplate: any = treezoneTemplate;

  const provinceFilter: IFilter = {
    type: "Excel",
    itemTemplate: flagtemplate,
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <TreeGridComponent
          dataSource={countries}
          childMapping="states"
          height="400"
          allowReordering={true}
          allowFiltering={true}
          allowSorting={true}
          filterSettings={{ type: "Menu", hierarchyMode: "Parent" }}
          queryCellInfo={queryCellinfo.bind(this)}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="name"
              headerText="Province"
              width="195"
              template={flagtemplate}
              filter={provinceFilter}
            ></ColumnDirective>
            <ColumnDirective
              field="population"
              headerText="Population (Million)"
              allowFiltering={false}
              valueAccessor={populationValue}
              textAlign="Right"
              width="200"
            ></ColumnDirective>
            <ColumnDirective
              field="gdp"
              headerText="GDP Rate %"
              width="155"
              template={gdptemplate}
            />
            <ColumnDirective
              field="rating"
              headerText="Credit Rating"
              width="190"
              template={ratingtemplate}
            />
            <ColumnDirective
              field="unemployment"
              headerText="Unemployment Rate"
              width="200"
              allowFiltering={false}
              template={unemploymentTemplate}
            />
            <ColumnDirective
              field="coordinates"
              headerText="Coordinates"
              allowSorting={false}
              width="220"
              template={locationtemplate}
            />
            <ColumnDirective
              field="area"
              headerText="Area"
              width="140"
              template={areatemplate}
            />
            <ColumnDirective
              field="timezone"
              headerText="Time Zone"
              width="150"
              template={timezonetemplate}
            />
          </ColumnsDirective>
          <Inject services={[Filter, Sort, Reorder]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>
          This{" "}
          <a
            target="_blank"
            href="https://www.syncfusion.com/react-ui-components/react-tree-grid"
          >
            {" "}
            React Tree Grid
          </a>{" "}
          example demonstrates the overview of basic Tree Grid features such as
          sorting, filtering, conditional formatting, column template and
          scrolling.
        </p>
      </div>
      <div id="description">
        <p>
          The Tree Grid is used to represent the hierarchical data in a tabular
          format, combining the visual representation of Grid and TreeView
          controls. It represents the data from datasource such as an array of
          JSON objects, OData web services, or DataManager binding data fields
          to columns or self-referential datasource.
        </p>
        <p>
          In this demo, Tree Grid features such as{" "}
          <code>
            sorting, filtering, conditional formatting, column template and
            scrolling
          </code>{" "}
          are used.
        </p>
        <p>
          More information on the Tree Grid instantiation can be found in this
          <a
            target="_blank"
            href="https://ej2.syncfusion.com/react/documentation/treegrid/getting-started/"
          >
            {" "}
            documentation section.
          </a>
        </p>
      </div>
    </div>
  );
}
export default Overview;