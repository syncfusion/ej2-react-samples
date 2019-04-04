import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { compile, detach } from '@syncfusion/ej2-base';
import { cardBook } from './data-source';
import { MultiSelect, SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import './card.component.css';

// tslint:disable:max-line-length
interface FilterKey {
    Code: string;
}

interface cardData {
    header_title: string;
    header_subtitle: string;
    cardImage: any;
    isHorizontal: string;
    cardTitle: string;
    header_img: any;
    cardContent: string;
    card_action_btn: any;

}

interface cardInterface {
    data: cardData;
}


let card: NodeList; let cardEle: HTMLElement; let cardObj: JSON[] = cardBook as JSON[]; let data: Object[] = []; let multiSelectData: Object[] = []; let searchData: Object[] = [];
let searchValCount: number = 0; let filterCategory: { [key: string]: Object; }[] = [{ Name: 'Client-Side', Code: 'client' }, { Name: 'Server-Side', Code: 'server' }, { Name: 'Front-End', Code: 'ui' }];
let emptyData: boolean = true;

/*  Initialize MultiSelect component */
let multiselectComp: MultiSelect;
function cardRendering(cardObj: Object[]): void {
    let errorContent: HTMLElement = document.querySelector('.tile_layout .row.error') as HTMLElement;
    if (cardObj.length > 0) {
        errorContent.style.display = 'none';
        cardObj.forEach((data: cardData, index) => {
            cardEle = document.getElementById('card_sample_' + (++index));
            if (cardEle) {
                ReactDOM.render(<CardRender data={data} />, cardEle  );
            }
        });
    } else {
        errorContent.style.display = 'flex';
    }
}
/* Funtion for Destroying Cards */
function destroyAllCard() {
    let cards = document.querySelectorAll('.card-control-section .e-card');
    [].slice.call(cards).forEach((el) => {
        ReactDOM.unmountComponentAtNode(el.parentElement);
    });
}

export class Tile extends SampleBase<{}, {}> {

    public rendereComplete(): void {
        multiselectComp = new MultiSelect({
            // set the local data to dataSource property
            dataSource: filterCategory,
            // map the appropriate columns to fields property
            fields: { text: 'Name', value: 'Code' },
            // set the placeholder to MultiSelect input element
            placeholder: 'Search by categories',
            select: this.multiSelectFun,
            removed: this.multiSelectRemove,
        });
        multiselectComp.appendTo('#local');
        cardRendering(cardObj);
        document.getElementById('search_Card').onkeyup = (e: KeyboardEvent) => {
            if (e.code === 'Tab' || e.code === 'Escape' || e.code === 'ShiftLeft' || (e.code === 'Backspace' && emptyData)) {
                return;
            }
            let inputVal: string = (e.target as HTMLInputElement).value;
            inputVal.length === 0 ? emptyData = true : emptyData = false;
            this.searchFilter(inputVal);
        };
    }

    /* Remove event function for multiSelect component */
    public multiSelectRemove(e: RemoveEventArgs): void {
        let cardDa: Object[] = searchData.length > 0 ? searchData : (multiSelectData.length > 0 ? multiSelectData : cardObj);
        if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
            multiSelectData = cardDa; destroyAllCard(); cardRendering(cardObj);
        } else if (multiselectComp.value.length === 0 && searchValCount > 0) {
            this.searchFilter((document.getElementById('search_Card') as HTMLInputElement).value);
        } else if (multiselectComp.value.length === 0) {
            destroyAllCard();
            multiSelectData = cardDa;
            cardRendering(cardDa);
        } else {
            let keywords: string[] = (e.itemData as FilterKey).Code.split(',');
            let dublicate: Object[];
            keywords.forEach((key: string): void => {
                dublicate = new DataManager(cardObj as JSON[]).executeLocal(new Query().where('cardImage.tag', 'Contains', key, true));
                dublicate.forEach((da: Object): void => {
                    if (cardDa.indexOf(da) !== -1) {
                        cardDa.splice(cardDa.indexOf(da), 1);
                    }
                });
                multiSelectData = cardDa;
            });
            destroyAllCard(); cardRendering(multiSelectData);
        }
    }

    public multiSelectFun(e: SelectEventArgs): void {
        let keywords: string[] = (e.itemData as FilterKey).Code.split(','); let dublicate: Object[];
        let cardDa: Object[] = searchData.length > 0 ? searchData : cardObj;
        if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
            multiSelectData = [];
        }
        keywords.forEach((key: string): void => {
            dublicate = new DataManager(cardDa as JSON[]).executeLocal(new Query().where('cardImage.tag', 'Contains', key, true));
            if (dublicate.length === 0) {
                multiSelectData = [];
                destroyAllCard();
                return;
            }
            dublicate.forEach((da: Object): void => {
                if (multiSelectData.indexOf(da) === -1) {
                    multiSelectData.push(da);
                }
            });
        });
        destroyAllCard();
        cardRendering(multiSelectData);
    }
    /* Function for Filtering Cards */
    public searchFilter(key: string): void {
        searchValCount = key.length;
        let predicate: Predicate = new Predicate('cardContent', 'Contains', key, true);
        predicate = predicate.or('cardImage.title', 'Contains', key, true).or('header_title', 'Contains', key, true).or('header_subtitle', 'Contains', key, true);
        let cardDa: Object[] = (multiSelectData.length > 0 && multiselectComp.value.length > 0) ? multiSelectData : cardObj;
        searchData = data = new DataManager(cardDa as JSON[]).executeLocal(new Query().where(predicate));
        destroyAllCard(); cardRendering(data);
    }
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section card-control-section tile_layout">
                    <div className="row filter">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <div className="e-float-input">
                                <input type="text" required id="search_Card" />
                                <span className="e-float-line"></span>
                                <label className="e-float-text" style={{ fontSize: '14px' }}>Enter text to search</label>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 tile_search">
                            <input type="text" id="local" />
                        </div>
                    </div>
                    <div className='row e-card-layout' style={{textAlign: 'center'}}>
                        <div className="row">
                            <div className="row error" style={{ display: 'none', minHeight: '150px' }}>
                                <div className="e-error-content" style={{ margin: 'auto', height: 'inherit', fontSize: '18px', fontWeight: 500, color: 'inherit' }} >No results found. Please try a different search.</div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_1' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_2' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_3' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_4' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_5' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_6' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_7' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_8' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_9' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_10' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_11' className='card_sample'></div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <div id='card_sample_12' className='card_sample'></div>
                            </div>
                        </div>
                    </div>
                    <div id='source_link'>Source: &nbsp;
                        <a href="https://www.syncfusion.com/ebooks/" target='_blank'>https://www.syncfusion.com/ebooks</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates filter and search of the <code>card</code> based on categories, and text containing the card. You can use search
                    box to search cards, and you can filter choosing categories in multi-select component.
                </p>
                </div>
                <div id="description">
                    <p>
                        Card is a small container in which user can show defined content in specific structure and it is flexible and extensible.
                    This sample demonstrates to render the
                    <code>Card</code> Using
                    <a target="_blank" href="https://ej2.syncfusion.com/documentation/common/template-engine/"> Template Engine</a> and it can be filtered based on
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/data/getting-started/">
                            data Manager</a>.
                    <p> More information about Card can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/card/getting-started/">
                                documentation</a> section. </p>
                    </p>
                </div>
            </div>
        );
    }
}

class CardRender extends React.Component {
    props: cardInterface;
    headerTitleSubCheck = this.props.data.header_title.length >0 || this.props.data.header_subtitle.length >0;
    headerCheck = this.props.data.header_title.length >0 || this.props.data.header_subtitle.length >0 || this.props.data.header_img.length >0;
    bgimageUrl  = "url(" + this.props.data.cardImage.url + ")";
   render() {
       return( 
       <div className= { this.props.data.isHorizontal ? 'e-card e-card-horizontal' : 'e-card' }>
       { this.props.data.cardImage && <div  className='e-card-image' style={{ backgroundImage: this.bgimageUrl }} > { this.props.data.cardImage.title && <div  className='e-card-title'>{this.props.data.cardImage.title}</div> } </div> }
       { this.props.data.cardTitle && <div  className='e-card-title'>{this.props.data.cardTitle}</div> }
       { this.headerCheck && 
         <div className='e-card-header'>
           { this.props.data.header_img && <div  className= { this.props.data.header_img.isRounded ? 'e-card-header-image e-card-corner' : 'e-card-header-image e-card-corner'} ></div> }
           { this.headerTitleSubCheck &&    
             <div className='e-card-header-caption'>
                {this.props.data.header_title &&  <div className='e-card-header-title'>{this.props.data.header_title}</div> }
                {this.props.data.header_subtitle &&  <div className='e-card-sub-title'>{this.props.data.header_subtitle}</div> }
             </div>
           }
         </div>
       }
       {this.props.data.cardContent && <div  className='e-card-content'>{this.props.data.cardContent}</div> }
       {this.props.data.card_action_btn && 
          <div  className={this.props.data.card_action_btn.isVertical ?'e-card-actions e-card-vertical' : 'e-card-actions' } >
               {this.props.data.card_action_btn.action_btns.map(function(actBtn){
                   return actBtn.tag === "a" ? <a key={actBtn.text} href= {actBtn.href} target = { actBtn.target } className='e-btn e-outline e-primary'> { actBtn.text }</a> : <button key={actBtn.text} className='e-card-btn'>{ actBtn.text }</button> ;
               })}
          </div> }
       </div>
       );
   }
}