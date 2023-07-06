import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { closest, Touch, SwipeEventArgs, isNullOrUndefined } from '@syncfusion/ej2-base';
import './card.component.css';

const swipeable = (): void => {
    let fanStructuteCard: NodeList = document.querySelectorAll('#horizontal_product .e-card');
    let len: number = fanStructuteCard.length;
    [].slice.call(fanStructuteCard).forEach((ele: HTMLElement): void => {
        ele.style.removeProperty('transform');
    });
    let transformRatio: number = 2;
    let temp: number;
    let divide: number = (parseInt((len / 2).toString(), 10));
    temp = transformRatio;
    for (let i: number = divide - 1; i >= 0; i--) {
        (fanStructuteCard[i] as HTMLElement).style.transform = 'rotate(' + (temp) + 'deg)';
        temp += transformRatio;
    }
    transformRatio = 2;
    temp = transformRatio;
    for (let i: number = divide + 1; i < len; i++) {
        (fanStructuteCard[i] as HTMLElement).style.transform = 'rotate(' + (-temp) + 'deg)';
        temp += transformRatio;
    }
}

const Swipeable = () => { 
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])

    const rendereComplete = () => {
        let ele: HTMLElement = document.getElementById('horizontal_product');
        swipeable();
        new Touch(ele, { swipe: touchSwipeHandler });
        let cards: NodeList = document.querySelectorAll('#horizontal_product .e-card');
        [].slice.call(cards).forEach((ele: HTMLElement): void => {
            ele.querySelector('img').onmousedown = () => { return false; };
        });
    }

    const touchSwipeHandler = (e: SwipeEventArgs): void => {
        let ele: HTMLElement = closest((e.originalEvent.target as Element), '.e-card') as HTMLElement;
        if (isNullOrUndefined(ele)) {
            return;
        }
        if (ele.parentElement.querySelector('.card-out')) {
            ele.parentElement.querySelector('.card-out').classList.remove('card-out');
        }
        if (ele.parentElement.querySelector('.card-out-left')) {
            ele.parentElement.querySelector('.card-out-left').classList.remove('card-out-left');
        }
        if (e.swipeDirection === 'Right') {
            ele.classList.add('card-out');
        } else if (e.swipeDirection === 'Left') {
            ele.classList.add('card-out-left');
        } else {
            return;
        }
        ele.parentElement.insertBefore(ele, ele.parentElement.children[0]);
        swipeable();
        ele.style.removeProperty('left');
    }


    return (
        <div className='control-pane'>
            <div className='control-section card-control-section swipe_card_layout'>
                <div className="e-card-resize-container">
                    <div className='row'>
                        <div className="row card-layout">
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6" id="horizontal_product">
                                <div className="e-card e-card-horizontal">
                                    <img src='./src/card/images/newyork.png' alt="newyork"/>
                                    <div className='e-card-stacked'>
                                        <div className="e-card-content" style={{ height: '175px' }}>New York City has been described as the cultural, financial, and media capital of the world, and exerts a significant impact upon commerce and etc...</div>
                                        <div className="e-card-actions">
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-fav-icon cb-icons "></span>
                                            </button>
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-like-icon cb-icons "></span>
                                            </button>
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-share-icon cb-icons "></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="e-card e-card-horizontal">
                                    <img src='./src/card/images/malaysia.png' alt="malaysia"/>
                                    <div className='e-card-stacked'>
                                        <div className="e-card-content" style={{ height: '175px' }}>Malaysia is one of the Southeast Asian countries, on a peninsula of the Asian continent, to a certain extent; it can be recognized as part of the Asian continent.</div>
                                        <div className="e-card-actions">
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-fav-icon cb-icons "></span>
                                            </button>
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-like-icon cb-icons "></span>
                                            </button>
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-share-icon cb-icons "></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="e-card e-card-horizontal">
                                    <img src='./src/card/images/eiffeltower.png' alt="eiffeltower"/>
                                    <div className='e-card-stacked'>
                                        <div className="e-card-content" style={{ height: '175px' }}>The Eiffel Tower is acknowledged as the universal symbol of Paris and France. It was originally designed by Émile Nouguier and Maurice Koechlin.</div>
                                        <div className="e-card-actions">
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-fav-icon cb-icons "></span>
                                            </button>
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-like-icon cb-icons "></span>
                                            </button>
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-share-icon cb-icons "></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="e-card e-card-horizontal">
                                    <img src='./src/card/images/sydney.png' alt="sydney"/>
                                    <div className='e-card-stacked'>
                                        <div className="e-card-content" style={{ height: '175px' }}>Sydney is a city on the east coast of Australia. Sydney is the capital city of New South Wales. About four million people live in Sydney which makes it the biggest city in Oceania.</div>
                                        <div className="e-card-actions">
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-fav-icon cb-icons "></span>
                                            </button>
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-like-icon cb-icons "></span>
                                            </button>
                                            <button style={{ padding: '0px', border: '0px', height: '24px', width: '24px' }}>
                                                <span className="e-share-icon cb-icons "></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='source_link'>Source: &nbsp;
                    <table>
                        <tr>
                            <td>
                                <a href="https://wikitravel.org/en/Malaysia" target='_blank'>https://wikitravel.org/en/Malaysia</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="https://wikitravel.org/en/Sydney" target='_blank'>https://wikitravel.org/en/Sydney</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="https://en.wikipedia.org/wiki/Eiffel_Tower" target='_blank'>https://en.wikipedia.org/wiki/Eiffel_Tower</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="https://wikitravel.org/en/New_York_City" target='_blank'>https://wikitravel.org/en/New_York_City</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates <code>card</code> rendering with stacked layout. You can swipe the card in left or right direction to move the first card to last position.</p>
            </div>
            <div id="description">
                <p>
                    The sample illustrates stacked collection of card overlapping each other, which can be bound to swipe actions to move cards
                    one after the other. CSS animation is used to achieve swiping on every left or right swipe.
                    <p>More information about Card can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/card/getting-started/"> documentation</a> section.</p>
                </p>
            </div>
        </div>
    );
}
export default Swipeable;