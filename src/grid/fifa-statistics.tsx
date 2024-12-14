import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, RowInfo, Column, QueryCellInfoEventArgs, LoadEventArgs } from '@syncfusion/ej2-react-grids';
import { fifaData, webpfiles, countryInfo, teamInfo, coachInfo, topScrorerInfo, bestPlayerInfo, FifaDetails } from './data';
import { TooltipComponent, TooltipEventArgs } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './fifa-statistics.css';

function ImageTemplate(props: any) {
  let value: string = '';
  const field: string = props.rowDetails.column.field;
  switch (field) {
    case 'Host':
      value = props.rowDetails['Host'];
      break;
    case 'Champions':
    case 'Coach':
      value = props.rowDetails['Champions'];
      break;
    case 'TopScorer':
      value = props.rowDetails['TopScorerCountry'];
      break;
    case 'BestPlayerAward':
      value = props.rowDetails['BestPlayerCountry'];
      break;
  }

  let className: string = (field === 'Coach' || field === 'TopScorer' || field === 'BestPlayerAward') ? 'infotooltip' : ''
  const src: string = '/src/grid/images/country/' + (webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');

  return (
    <img
      alt=''
      src={src}
      decoding='async'
      title={value}
      width='23'
      height='15'
      className={className}
      data-file-width='945'
      data-file-height='630'
    />
  )
}

export class FIFAStatistics extends SampleBase<{}, {}> {

  public fifaGridIns;
  public tooltipObj;
  public isverticalPopup: boolean;

  colTemplate(args: any) {
    let host: string[] = args[args.column.field].split(',');
    const newRowData: Object[] = [];
    host.forEach((item) => {
      const obj: any = Object.assign({}, args);
      obj[args.column.field] = item;
      newRowData.push(obj);
    });

    return (
      <div>
        {host.map((item, index) => (
          <div key={index}>
            <span>
              <ImageTemplate rowDetails={newRowData[index]} />
            </span>
            {' '}
            <a className='infotooltip' title={item} href='https://ej2.syncfusion.com/' onClick={(e) => e.preventDefault()}>
              {item}
            </a>
          </div>
        ))
        }
      </div>);
  };

  topScoreTemplate(args: any) {
    let players: string[] = args[args.column.field].split(',');
    let country: string[] = args['TopScorerCountry'].split(',');
    const newRowData: Object[] = [];
    players.forEach((item, index) => {
      const obj: { TopScorer: string; TopScorerCountry: string } = Object.assign({}, args);
      obj['TopScorer'] = item;
      obj['TopScorerCountry'] = country[index];
      newRowData.push(obj);
    });
    const renderScoreIcons = () => {
      const listItems: any = [];
      for (let i = 0; i < args['TotalGoal']; i++) {
        listItems.push(<svg key={i + 1} className='goal' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM9.45103 9.48743L11.9038 9.65149C12.3112 8.95696 12.5764 8.16672 12.6584 7.32454L10.5776 6.01477C10.46 5.93821 10.3698 5.82336 10.326 5.68938C10.2823 5.5554 10.2877 5.41047 10.3397 5.27922L11.253 2.99875C10.7088 2.38625 10.0334 1.89133 9.27329 1.55774L7.38384 3.13274C7.2772 3.22297 7.13774 3.27219 6.99829 3.27219C6.85884 3.27219 6.72212 3.22297 6.61274 3.13274L4.72329 1.55774C3.96313 1.89133 3.28774 2.38625 2.7436 2.99875L3.65415 5.27922C3.7061 5.41047 3.71157 5.5554 3.66782 5.68938C3.62407 5.82336 3.53657 5.93821 3.41626 6.01477L1.33813 7.32454C1.41743 8.16672 1.6854 8.95696 2.09282 9.65149L4.54556 9.48743C4.68774 9.47922 4.82993 9.51751 4.94204 9.60227C5.05415 9.68704 5.13618 9.80735 5.17173 9.94407L5.77329 12.3284C6.16978 12.4132 6.5772 12.4597 6.99829 12.4597C7.41938 12.4597 7.82954 12.4159 8.22329 12.3284L8.82485 9.94407C8.85767 9.80462 8.9397 9.68704 9.05454 9.60227C9.16938 9.51751 9.30884 9.47922 9.45103 9.48743ZM5.30298 5.81516L6.61274 4.86633C6.84243 4.69954 7.15415 4.69954 7.38384 4.86633V4.8636L8.6936 5.81516C8.92329 5.98196 9.01899 6.27727 8.93149 6.54797L8.4311 8.08743C8.3436 8.35813 8.09204 8.54133 7.80767 8.54133H6.18892C5.90454 8.54133 5.65298 8.35813 5.56548 8.08743L5.06509 6.54797C4.97759 6.27727 5.07329 5.98196 5.30298 5.81516Z" />
        </svg>);
      }
      return listItems;
    };

    return (
      <div>
        {players.map((item, index) => (
          <div key={index}>
            <span>
              {!(
                args.column.field === 'TopScorer' &&
                item.indexOf('Players') > -1
              ) && (
                  <ImageTemplate rowDetails={newRowData[index]} />
                )}{' '}
            </span>
            {args.column.field === 'TopScorer' &&
              (item.indexOf('Players') > -1 || item.indexOf('Ronaldo') > -1) ? (
              <span>{item}</span>
            ) : (
              <a className='infotooltip' title={item} href='https://ej2.syncfusion.com/' onClick={(e) => e.preventDefault()}>
                {item}
              </a>
            )}
          </div>
        ))}
        {renderScoreIcons()}
      </div>
    );
  };

  awardTemplate(args: any) {
    return (
      <span>
        <span>
          {!(
            args.column.field === 'BestPlayerAward' &&
            args[args.column.field] === 'Not awarded'
          ) && (
              <span>
                <span>
                  <ImageTemplate rowDetails={args} />
                </span>
              </span>
            )}{' '}
        </span>
        {args.column.field === 'BestPlayerAward' &&
          (args[args.column.field] === 'Not awarded' || args[args.column.field] === 'Mario Kempes' ||
            args[args.column.field] === 'Paolo Rossi' || args[args.column.field] === 'Salvatore Schillaci') ? (
          <span> {args[args.column.field]}</span>
        ) : (
          <a className='infotooltip' href='https://ej2.syncfusion.com/' onClick={(e) => e.preventDefault()}>
            {args[args.column.field]}
          </a>
        )}
      </span>
    );
  };

  beforeRender(args: any) {
    let rowInfo: RowInfo = this.fifaGridIns.getRowInfo(args.target.closest('td') as HTMLElement) as RowInfo;
    const field: string = (rowInfo.column as Column).field;
    let value: string = (rowInfo.rowData as any)[field];
    let imageSource: string = '';
    let cellInfo: string = '';
    let hideImage: boolean = false;
    if (value) {
      switch (field) {
        case 'Host':
          value = args.target.title;
          imageSource = '/src/grid/images/country/' + (webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');
          cellInfo = (countryInfo as any)[0][value.replace(/ /g, '_')];
          break;
        case 'Champions':
          imageSource = '/src/grid/images/team/' + value + '.png';
          cellInfo = (teamInfo as any)[0][value.replace(/ /g, '_')];
          break;
        case 'Coach':
          if (args.target.tagName === 'IMG') {
            value = (rowInfo.rowData as any)['Champions'];
            imageSource = '/src/grid/images/country/' + (webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');
            cellInfo = (countryInfo as any)[0][value.replace(/ /g, '_')];
          } else {
            if (value === 'Juan López') {
              hideImage = true;
            }
            imageSource = '/src/grid/images/coach/' + value + (value === 'Aymoré Moreira' ? '.png' : '.jpg');
            cellInfo = (coachInfo as any)[0][value.replace(/ /g, '_')];
          }
          break;
        case 'TopScorer':
          value = args.target.title;
          if (args.target.tagName === 'IMG') {
            if (value === 'Croatia') {
              hideImage = true;
            }
            imageSource = '/src/grid/images/team/' + value + '.png';
            cellInfo = (teamInfo as any)[0][value.replace(/ /g, '_')];
          } else {
            imageSource = '/src/grid/images/top_scorer/' + value + '.jpg';
            cellInfo = (topScrorerInfo as any)[0][value.replace(/ /g, '_')];
          }
          break;
        case 'BestPlayerAward':
          if (args.target.tagName === 'IMG') {
            value = (rowInfo.rowData as any)['BestPlayerCountry'];
            if (value === 'Croatia') {
              hideImage = true;
            }
            imageSource = '/src/grid/images/team/' + value + '.png';
            cellInfo = (teamInfo as any)[0][value.replace(/ /g, '_')];
          } else {
            imageSource = '/src/grid/images/best_player/' + value + '.jpg';
            cellInfo = (bestPlayerInfo as any)[0][value.replace(/ /g, '_')];
          }
          break;
      }

      if ((args.target.tagName === 'IMG' && field === 'Coach') || field === 'Host') {
        this.isverticalPopup = true;
        (this.tooltipObj as any).content = `
          <div>
            <div style='border-bottom: 1px solid #e0e0e0; '>
              <img
                alt=''
                src='${imageSource}'
                decoding='async'
                width='275'
                height='175'
                class='mw-file-element'
                data-file-width='945'
                data-file-height='630'
              />
            </div>
              <div style='padding: 12px'>
                ${cellInfo}
              </div>
          </div>`;
      }
      else {
        this.isverticalPopup = false;
        const display = hideImage ? 'none' : 'inline';
        (this.tooltipObj as any).content = `
          <div style='display: inline;'>
            <div style='display: ${display}; float: right; border-left: 1px solid #e0e0e0; margin: 0 0 0 12px;'>
              <img
                alt=''
                src='${imageSource}'
                decoding='async'
                width='190'
                height='245'
               class='mw-file-element'
               data-file-width='945'
               data-file-height='630'
             />
            </div>
            <div style='padding: 12px 0 12px 12px'>
              ${cellInfo}
            </div>
         </div>`;
      }
    }
  };

  beforeOpen(args: TooltipEventArgs) {
    args.element.style.maxWidth = this.isverticalPopup ? '275px' : '425px';
    args.element.style.width = this.isverticalPopup ? '275px' : '425px';
  }

  queryCellInfo(args: QueryCellInfoEventArgs) {
    if (args.column?.field === 'BestPlayerAward') {
      let rowIndex: number = parseInt(args.cell?.getAttribute('index') as string);
      if (rowIndex > 0) {
        if ((this.fifaGridIns.current?.currentViewData[rowIndex - 1] as FifaDetails)[args.column.field] !== (args.data as FifaDetails)[args.column.field]) {
          args.rowSpan = this.calculateRowspan(args, rowIndex);
        }
      } else {
        args.rowSpan = this.calculateRowspan(args, rowIndex);
      }
    }
  }

  calculateRowspan(args: QueryCellInfoEventArgs, rowIndex: number) {
    let rowspan = 1;
    for (let i: number = rowIndex + 1, j = 0; i < (this.fifaGridIns?.currentViewData.length as number); i++, j++) {
      if (!((args.data as any)[args.column?.field as string] === (this.fifaGridIns?.currentViewData[i] as any)[args.column?.field as string])) {
        rowspan = j + 1;
        break;
      }
      if (i === (this.fifaGridIns?.currentViewData.length as number) - 1) {
        rowspan = j + 2;
        break;
      }
    }
    return rowspan;
  }

  dataBound() {
    const tableEle = this.fifaGridIns?.element.querySelector('.e-gridcontent table') as HTMLElement;
    if (tableEle) {
      tableEle.classList.add('tournament');
    }
  }

  load(args: LoadEventArgs) {
    args.requireTemplateRef = false;
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TooltipComponent
            id='tooltip'
            cssClass='fifa_tooltip'
            target='.infotooltip'
            beforeRender={this.beforeRender.bind(this)}
            beforeOpen={this.beforeOpen.bind(this)}
            ref={(t) => this.tooltipObj = t}
            opensOn='Hover'
            width={275}
          >
            <GridComponent ref={(g) => this.fifaGridIns = g}
              id='fifa_grid'
              dataSource={fifaData}
              gridLines='Both'
              allowSorting={true}
              enableStickyHeader={true}
              allowTextWrap={true}
              textWrapSettings={{ wrapMode: 'Content' }}
              enableAltRow={true}
              enableHover={false}
              allowSelection={false}
              queryCellInfo={this.queryCellInfo.bind(this)}
              dataBound={this.dataBound.bind(this)}
              load={this.load.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective
                  field='Year'
                  headerText='Year'
                  width='100'
                  textAlign='Right'
                ></ColumnDirective>
                <ColumnDirective
                  field='Host'
                  headerText='Organizer'
                  template={this.colTemplate.bind(this)}
                  width='140'
                ></ColumnDirective>
                <ColumnDirective
                  field='Champions'
                  headerText='Champions'
                  template={this.colTemplate.bind(this)}
                  width='140'
                />
                <ColumnDirective
                  field='Coach'
                  headerText='Winning Coach'
                  template={this.colTemplate.bind(this)}
                  width='185'
                />
                <ColumnDirective
                  field='TopScorer'
                  headerText='Most Scorer(s)'
                  template={this.topScoreTemplate.bind(this)}
                  width='185'
                ></ColumnDirective>
                <ColumnDirective
                  field='BestPlayerAward'
                  headerText='Player of season'
                  template={this.awardTemplate.bind(this)}
                  width='170'
                ></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Sort]} />
            </GridComponent>
          </TooltipComponent>
        </div>
        <div id='action-description'>
          <p>In this demo, the Syncfusion<sup>®</sup> DataGrid displays comprehensive FIFA World Cup records and statistics, covering the entire history of the tournament from 1930 to 2022.
            The FIFA World Cup statistics and data utilized in this application are sourced from 
            <code><a target="_blank" className="code"
              href="https://en.wikipedia.org/wiki/FIFA_World_Cup_records_and_statistics">Wikipedia
            </a></code>. We sincerely thank Wikipedia for their invaluable resource, which has been instrumental in preparing this demonstration.</p>
        </div>
        <div id='description'>
          <p>
            This section provides detailed information about the FIFA World Cup, including the year, host country,
            champion team, top scorer, best player, and winning coach. The data is enhanced with flags, icons, and hyperlinks for easy
            access to more details. The Grid 
            <code><a target="_blank" className="code"
              href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#template">column template
            </a></code> 
            feature allows custom content in grid cells, creating a rich, interactive display.
          </p>
        </div>
      </div>
    )
  }
}