import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { ChatUIComponent, UserModel, MessageToolbarSettingsModel, MessageToolbarItemClickedEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import './api.css';
import * as data from './messageData.json';
import { PropertyPane } from '../common/property-pane';

const API = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const chatUiInst = useRef(null);

    const handleSwitchChange = (property, checked) => {
        chatUiInst.current[property] = checked;
    };

    const handleDropDownChange = (property, value) => {
        chatUiInst.current[property] = value;
    };

    const handleMultiSelectChange = (args, action) => {
        const user: UserModel = { user: args.itemData, avatarBgColor: '#87cefa' };
        if (['Laura', 'Charlie'].includes(args.itemData)) {
            user.avatarBgColor = args.itemData === 'Charlie' ? '#e6cdde' : '#dec287';
            user.avatarUrl = `./src/chat-ui/images/${args.itemData.toLowerCase()}.png`;
        }
        if (action === 'select') {
            chatUiInst.current.typingUsers = [...chatUiInst.current.typingUsers, user];
        } else {
            chatUiInst.current.typingUsers = chatUiInst.current.typingUsers.filter(user => user.user !== args.itemData);
        }
    };

    // Parse the date strings in the JSON data to Date objects
    const messages = data["communityMessagedata"].map(message => ({
        ...message,
        timeStamp: (message.timeStamp ? new Date(message.timeStamp) : new Date())
    }));
    const messageToolbarSettings: MessageToolbarSettingsModel = {
        items: [
            { type: 'Button', iconCss: 'e-icons e-chat-forward', tooltip: 'Forward' },
            { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
            { type: 'Button', iconCss: 'e-icons e-chat-reply', tooltip: 'Reply' },
            { type: 'Button', iconCss: 'e-icons e-chat-pin', tooltip: 'Pin' },
            { type: 'Button', iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }
        ],
        itemClicked: (args: MessageToolbarItemClickedEventArgs) => {
            if (args.item.prefixIcon === 'e-icons e-chat-forward') {
                const newMessageObj = args.message;
                newMessageObj.isForwarded = true;
                newMessageObj.id = 'chat-message-' + (chatUiInst?.current.messages.length + 1).toString();
                chatUiInst?.current.addMessage(newMessageObj);
            }
        }
    };

    return (
        <div className='control-pane'>
            <div className="col-lg-8 control-section">
                <div className="api-chatui">
                    <ChatUIComponent
                        ref={chatUiInst}
                        messages={messages}
                        user={{ user: 'Alice', id: 'admin' }}
                        headerIconCss="chat_header_icon"
                        headerText="Design Community"
                        showTimeBreak={true}
                        timeStampFormat="MM/dd hh:mm a"
                        messageToolbarSettings={messageToolbarSettings}
                    />
                </div>
            </div>
            <div className="col-lg-4 property-section chat-property-section">
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties">
                        <tbody>
                            <tr>
                                <td><div>Timestamp format</div></td>
                                <td style={{paddingRight: "10px"}}>
                                    <DropDownListComponent
                                        id="chat_dateformats"
                                        value="MM/dd hh:mm a"
                                        dataSource={['MM/dd hh:mm a', 'dd/MM/yy hh:mm a', 'hh:mm a', 'MMMM hh:mm a']}
                                        placeholder="Format"
                                        width="180px"
                                        change={(e) => handleDropDownChange('timeStampFormat', e.itemData.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><div>Show timestamp</div></td>
                                <td style={{paddingRight: "10px"}}>
                                    <SwitchComponent
                                        id="chatTimestamp"
                                        checked={true}
                                        change={(e) => handleSwitchChange('showTimeStamp', e.checked)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><div>Show timebreak</div></td>
                                <td style={{paddingRight: "10px"}}>
                                    <SwitchComponent
                                        id="chatTimebreak"
                                        checked={true}
                                        change={(e) => handleSwitchChange('showTimeBreak', e.checked)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><div>Show header</div></td>
                                <td style={{paddingRight: "10px"}}>
                                    <SwitchComponent
                                        id="chatHeader"
                                        checked={true}
                                        change={(e) => handleSwitchChange('showHeader', e.checked)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><div>Show footer</div></td>
                                <td style={{paddingRight: "10px"}}>
                                    <SwitchComponent
                                        id="chatFooter"
                                        checked={true}
                                        change={(e) => handleSwitchChange('showFooter', e.checked)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <div>Compact mode</div>
                                </td>
                                <td style={{paddingRight: "10px"}}>
                                    <SwitchComponent
                                        id="compactmode"
                                        checked={false}
                                        change={(e) => handleSwitchChange('enableCompactMode', e.checked)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><div>Typing users</div></td>
                                <td style={{paddingRight: "10px"}}>
                                    <MultiSelectComponent
                                        id="chat_typingUsers"
                                        dataSource={['Michale', 'Laura', 'Charlie', 'Jordan']}
                                        placeholder="Typing users..."
                                        select={(e) => handleMultiSelectChange(e, 'select')}
                                        removed={(e) => handleMultiSelectChange(e, 'removed')}
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
                    <li><code>enableCompactMode</code>: Reduces spacing and left-aligns all messages to display more content within the visible chat area. </li>
                    <li><code>typingUsers</code>: Allows users to manage the list of users who are typing, updated through the multi-select options in the property pane.</li>
                    <li><code>statusIconCss</code>: Defines a CSS class for the status bar icon, with built-in styles for Online, Offline, Away, and Busy statuses, while allowing further customization.</li>
                    <li><code>messageToolbarSettings</code>: Configures the toolbar that appears on individual messages, allowing customization such as copy, forward, reply, pin and delete. Supports adding, removing, or reordering toolbar items based on application needs.</li>
                </ul>
                <p>
                    These properties can be adjusted via the property pane for a highly flexible and customizable chat experience.
                </p>
            </div>
        </div>
    );
};

export default API;