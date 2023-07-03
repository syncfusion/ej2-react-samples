import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import './style.css';

const CustomTag = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    // define the JSON of data
    const gameList: { [key: string]: Object }[] = [
        { Id: 'Game1', Game: 'American Football' },
        { Id: 'Game2', Game: 'Badminton' },
        { Id: 'Game3', Game: 'Basketball' },
        { Id: 'Game4', Game: 'Cricket' },
        { Id: 'Game5', Game: 'Football' },
        { Id: 'Game6', Game: 'Golf' },
        { Id: 'Game7', Game: 'Hockey' },
        { Id: 'Game8', Game: 'Rugby' },
        { Id: 'Game9', Game: 'Snooker' },
        { Id: 'Game10', Game: 'Tennis' },
    ];
    // maps the appropriate column to fields property
    const fields: object = { text: "Game", value: "Id" };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='multidefault' className="control-styles">
                    <h4>Custom Values</h4>
                    <MultiSelectComponent id="customelement" dataSource={gameList} fields={fields} mode="Box" placeholder="Favorite sports" allowCustomValue={true} />
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the custom tag functionalities of the MultiSelect. Type a character(s) in the MultiSelect element that are not present in the dataSource, you can select and
                    tag that custom typed characters as new item from the suggestion list.</p>
            </div>
            <div id="description">
                <p>The MultiSelect allows the user to add a non-present option to the component value when the <code>allowCustomValue</code> is enabled. While selecting new custom value the <code>customValueSelection</code> event will be triggered.</p>
                <p> More information on the custom value feature can be found in the
                    <a href="http://ej2.syncfusion.com/react/documentation/multi-select/custom-value.html" target="_blank"> documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default CustomTag;