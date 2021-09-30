import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { L10n } from '@syncfusion/ej2-base';
import { PagerComponent } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

L10n.load({
  'de-DE': {
    'pager': {
      'currentPageInfo': '{0} von {1} Seiten ',
      'totalItemsInfo': '({0} Beiträge)',
      'firstPageTooltip': 'Zur ersten Seite',
      'lastPageTooltip': 'Zur letzten Seite',
      'nextPageTooltip': 'Zur nächsten Seite',
      'previousPageTooltip': 'Zurück zur letzten Seite',
      'nextPagerTooltip': 'Zurück zur letzten Seite',
      'previousPagerTooltip': 'Zum vorherigen Pager'
    }
  },
  'es-ES': {
    'pager': {
      'currentPageInfo': '{0} de {1} páginas ',
      'totalItemsInfo': '({0} artículos)',
      'firstPageTooltip': 'Ir a la primera página',
      'lastPageTooltip': 'Ir a la última página',
      'nextPageTooltip': 'Ir a la página siguiente',
      'previousPageTooltip': 'Ir a la página anterior',
      'nextPagerTooltip': 'Ir al siguiente Pager',
      'previousPagerTooltip': 'Ir a Pager anterior'
    }
  }
});

export class Localization extends SampleBase<{}, {}> {
  private pagerInstance: PagerComponent;
  public onChange(): void {
    let culture: string = (document.getElementById('ddl') as HTMLSelectElement).value;
    this.pagerInstance.locale = culture;
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <PagerComponent pageSize={1} totalRecordsCount={7} pageCount={3} ref={pager => this.pagerInstance = pager} >
            </PagerComponent>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' style={{ width: '100%', margin: '10px' }}>
                <tr>
                  <td>
                    <div>Select Culture</div>
                  </td>
                  <td>
                    <div style={{ padding: '10px 10px 10px 0px' }}>
                      <select id="ddl" name="ddl" className="form-control" style={{ padding: '6px' }} onChange={this.onChange.bind(this)}>
                        <option value="en-US">en-US</option>
                        <option value="de-DE">de-DE</option>
                        <option value="es-ES">es-ES</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="description">
          <p>
            The Pager control was rendered with <code>en-US</code> culture. Here the Pager contents are updated based on current
        culture. You can also change the control culture by selecting it from the culture options in the properties panel.
         </p>
        </div>
      </div>
    )
  }
}