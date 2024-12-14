import * as React from 'react';
import { ChatUIComponent, UserModel } from '@syncfusion/ej2-react-interactive-chat';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import './api.css';
import * as data from './messageData.json';
import { PropertyPane } from '../common/property-pane';

export class API extends SampleBase<{}, {}> {
    chatUiInst: ChatUIComponent;

    handleSwitchChange = (property, checked) => {
        this.chatUiInst[property] = checked;
    };

    handleDropDownChange = (property, value) => {
        this.chatUiInst[property] = value;
    };

    handleMultiSelectChange = (args, action) => {
        const user: UserModel = { user: args.itemData, avatarBgColor: '#bacbe4' };
        if (['Laura', 'Charlie'].includes(args.itemData)) {
            user.avatarBgColor = args.itemData === 'Charlie' ? '#e6cdde' : '#dec287';
            user.avatarUrl = `./src/chat-ui/images/${args.itemData.toLowerCase()}.png`;
        }
        if (action === 'select') {
            this.chatUiInst.typingUsers = [...this.chatUiInst.typingUsers, user];
        } else {
            this.chatUiInst.typingUsers = this.chatUiInst.typingUsers.filter(user => user.user !== args.itemData);
        }
    };

    render() {
        // Parse the date strings in the JSON data to Date objects
        const messages = data["communityMessagedata"].map(message => ({
            ...message,
            timeStamp: (message.timeStamp ? new Date(message.timeStamp) : new Date())
        }));
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section">
                    <div className="api-chatui">
                        <ChatUIComponent
                            messages={messages}
                            user={{ user: 'Alice', id: 'admin' }}
                            headerIconCss="chat_header_icon"
                            headerText="Design Community"
                            showTimeBreak={true}
                            timeStampFormat="MM/dd hh:mm a"
                        />
                    </div>
                </div>
                <div className="col-lg-4 property-section chat-property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties">
                            <tbody>
                                <tr>
                                    <td><div>Timestamp format</div></td>
                                    <td style={{ paddingRight: "10px" }}>
                                        <DropDownListComponent
                                            id="chat_dateformats"
                                            dataSource={['MM/dd hh:mm a', 'dd/MM/yy hh:mm a', 'hh:mm a', 'MMMM hh:mm a']}
                                            placeholder="Format"
                                            width="180px"
                                            change={(e) => this.handleDropDownChange('timeStampFormat', e.itemData.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><div>Show timestamp</div></td>
                                    <td style={{ paddingRight: "10px" }}>
                                        <SwitchComponent
                                            id="chatTimestamp"
                                            checked={true}
                                            change={(e) => this.handleSwitchChange('showTimeStamp', e.checked)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><div>Show timebreak</div></td>
                                    <td style={{ paddingRight: "10px" }}>
                                        <SwitchComponent
                                            id="chatTimebreak"
                                            checked={true}
                                            change={(e) => this.handleSwitchChange('showTimeBreak', e.checked)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><div>Show header</div></td>
                                    <td style={{ paddingRight: "10px" }}>
                                        <SwitchComponent
                                            id="chatHeader"
                                            checked={true}
                                            change={(e) => this.handleSwitchChange('showHeader', e.checked)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><div>Show footer</div></td>
                                    <td style={{ paddingRight: "10px" }}>
                                        <SwitchComponent
                                            id="chatFooter"
                                            checked={true}
                                            change={(e) => this.handleSwitchChange('showFooter', e.checked)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><div>Typing users</div></td>
                                    <td style={{ paddingRight: "10px" }}>
                                        <MultiSelectComponent
                                            id="chat_typingUsers"
                                            dataSource={['Michale', 'Laura', 'Charlie']}
                                            placeholder="Typing users..."
                                            select={(e) => this.handleMultiSelectChange(e, 'select')}
                                            removed={(e) => this.handleMultiSelectChange(e, 'removed')}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the properties available in the Chat UI component, showcasing how various features can be customized through the property pane. It highlights the flexibility of the component, allowing users to adjust timestamps, headers, footers, time breaks, and more.</p>
                </div>
                <div id="description">
                    <p>In this sample, the following APIs and properties are demonstrated for customization:</p>
                    <ul>
                        <li><code>timeStampFormat</code>: Allows users to change the timestamp format by selecting an option from the property pane.</li>
                        <li><code>showTimeStamp</code>: components whether the timestamp is displayed in the chat, toggled via the property pane.</li>
                        <li><code>showTimeBreak</code>: Enables or disables the display of time breaks in the chat interface.</li>
                        <li><code>showHeader</code>: Lets users toggle the visibility of the chat header.</li>
                        <li><code>showFooter</code>: Toggles the visibility of the chat footer.</li>
                        <li><code>typingUsers</code>: Allows users to manage the list of users who are typing, updated through the multi-select options in the property pane.</li>
                    </ul>
                    <p>
                        These properties can be adjusted via the property pane for a highly flexible and customizable chat experience.
                    </p>
                </div>
            </div>
        );
    }
}