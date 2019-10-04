import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';

import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
export class DocumentProtection extends SampleBase<{}, {}> {
    private hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    public container: DocumentEditorContainerComponent;
    public titleBar: TitleBar;

    public userList: string[] = ['sample@gmail.com', 'sample1@gamil.com'];
    public rendereComplete(): void {
        this.container.serviceUrl = this.hostUrl + 'api/documenteditor/';
        // this.container.documentEditor.pageOutline = '#E0E0E0';
        // this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();
    }
    render() {
        return (<div className='control-pane'>
            <div className="col-lg-9 control-section">
                <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent id="container" ref={(scope) => { this.container = scope; }} style={{ 'display': 'block', 'height': '590px' }}
                        enableToolbar={true} locale='en-US' />
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <div className="property-panel-header">User Permission</div>
                <table id="property" title="User Permission" style={{ width: "100%", marginTop: "10px" }}>
                    <tr>
                        <td className="left-side">
                            <DropDownListComponent id="ddlelement" dataSource={this.userList} change={this.onChange.bind(this)} placeholder="Select a game" value={this.userList[0]} popupHeight="220px" />
                        </td>
                    </tr>
                </table>
            </div>
            <div id="action-description">
                <p>This example demonstrates document protection support in document editor to restrict the types of changes can be made to the document by a user/user group.</p>
            </div>
            <div id="description">
                <div>
                    <p>In this demo, the Document editor opens a protected document that includes permitted ranges for two users identified by email: each user is authorized to edit a separate text area.</p>
                    <p>You can switch between the current user to edit different parts by selecting dropdown list in User permissions pane.</p>
                    <p>User can add the user in dropdown who have editing permission in document by using addItem method.</p>
                    <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/">documentation section.</a>
                    </p>
                </div>
            </div>
            <script>{
                window.onbeforeunload = function () {
                    return 'Want to save your changes?';
                }
            }
            </script>
        </div>);
    }

    public onChange(event: ChangeEventArgs): void {
        this.container.documentEditor.currentUser = event.value as string;
    }
    onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = {
            "sections": [
                {
                    "blocks": [
                        {
                            "characterFormat": {
                                "bold": true,
                                "fontSize": 13.0
                            },
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": []
                        },
                        {
                            "rows": [
                                {
                                    "rowFormat": {
                                        "allowBreakAcrossPages": true,
                                        "isHeader": false,
                                        "height": 20.25,
                                        "heightType": "AtLeast",
                                        "borders": {
                                            "left": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "right": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "top": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "bottom": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "vertical": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "horizontal": {
                                                "lineStyle": "Single",
                                                "lineWidth": 0.5,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "diagonalDown": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            },
                                            "diagonalUp": {
                                                "lineStyle": "None",
                                                "lineWidth": 0.0,
                                                "shadow": false,
                                                "space": 0.0,
                                                "hasNoneStyle": false
                                            }
                                        }
                                    },
                                    "cells": [
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontSize": 13.0,
                                                        "fontColor": "#4472C4FF"
                                                    },
                                                    "paragraphFormat": {
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "text": "Northwind Traders",
                                                            "characterFormat": {
                                                                "bold": true,
                                                                "fontSize": 13.0,
                                                                "fontColor": "#4472C4FF"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 228.19999694824219,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Center",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone"
                                                }
                                            }
                                        },
                                        {
                                            "blocks": [
                                                {
                                                    "characterFormat": {
                                                        "bold": true,
                                                        "fontSize": 13.0,
                                                        "fontColor": "#000080FF"
                                                    },
                                                    "paragraphFormat": {
                                                        "textAlignment": "Center",
                                                        "styleName": "Normal"
                                                    },
                                                    "inlines": [
                                                        {
                                                            "hasFieldEnd": true,
                                                            "fieldType": 0
                                                        },
                                                        {
                                                            "text": " "
                                                        },
                                                        {
                                                            "text": "INCLUDEPICTURE \\d \"ooxWord://word/media/image1.jpeg\" \\* MERGEFORMATINET"
                                                        },
                                                        {
                                                            "text": " "
                                                        },
                                                        {
                                                            "fieldType": 2
                                                        },
                                                        {
                                                            "imageString": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBcRXhpZgAATU0AKgAAAAgABAMCAAIAAAAWAAAAPlEQAAEAAAABAQAAAFERAAQAAAABAAALE1ESAAQAAAABAAALEwAAAABQaG90b3Nob3AgSUNDIHByb2ZpbGUA/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAEAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///9sAQwACAQECAQECAgICAgICAgMFAwMDAwMGBAQDBQcGBwcHBgcHCAkLCQgICggHBwoNCgoLDAwMDAcJDg8NDA4LDAwM/9sAQwECAgIDAwMGAwMGDAgHCAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAMgCeAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/aT9rT9uL4W/sL+FNL1z4q+KP+ET0jWLs2Vrdtp13eRtMFLbWNvFJ5fAPL7QegOeKo/sj/8ABQv4M/t3f29/wqXx1p3jJvC7QrqiW9vcW72nnBzESs0aFlby3wVBGVIzmtz9s3R7TxB+yB8VLG/tobyzuvCGrRzQTKGjlU2cuQQe1fzP/sgfEj4m/wDBCz9oT4J/Ga+gbVPh/wDGDwvb6pcRWLEw61pUwQ3NodwAF5auY5AM4yY+dsjCgD+iT9qf/gq18Af2JviVb+Efil8QYfCGv3lkmowQXOk380csDM6hlmigeInKMCu7cMDIGRnsPgt+2/8ACn9oH9ny4+K3hfxpptx8ObMzifX76OXS7OAQHErs10kRVFP8ZG09ia+Mf+DiHXPCv7T3/BETUPG3h+6sPEGg32o+Hta0bUI1Dgx3F/bwCRCRlWMdw6kcEbmU45FeQ/8ABxR4tk8bftVfsf8A7MKtNp3wz8ceJrB/EGn2p8mLUIBf2tnbwELj5I0aYhOm5o2xlFIAPunwL/wWO/Zn+IvjnSfD2m/FjRFvvEErQaRNfWl3p9hrLq4QraXlxEltcHcQo8qRskgDJIr0X9pX9t74S/sdDST8UPH3h3wR/bvmf2f/AGpceV9s8vb5mzg5271z6bhXgv8AwXe/Zk8LfGj/AIJF/FbSbzS9Pt4/Avh9/EWgmO3Vf7Kn09PNj8kAYjBjR4Ttx+7lZehr8yf2xvjz4g/aY/4NP/hbrniq8m1PWtL8W2+iTXtw2+W6js5763hdmPLP5KxqzE5YhiTyaAP2Z/Z+/wCCjnwJ/ao8Yt4d+H3xU8G+KPECxGcaXa36reyRhdxdIX2u6heSyggDnpXDXH/BbD9lSynvI7r43eDbOTT7uawuBdPNB5M8TskkZ3oPmDK31AyMjmvzR+LniXw7/wAFO/8AgqB+xrpv7P8AcvceLvg9oVjq3xA8QLby6TLp2mwS2LeQTOiSyuimdQiqyn7coztLlfTf+Dnn4CeF/wBmL/gjV8MvAfg3TV0vw34d+IGnW9tDuLyOf7P1Rnlkc8vLI7M7u3LM7E8mgD7t0P8A4LHfsy+J7nUIdN+L/hvUH0nTn1i/+zR3Eq2NmjxI1xKVjIjjDTRDcxAO7IyASOw+C3/BRH4J/tG+G/FGseA/iJofi3S/Bdr9t1u50vzLiPT4trtliqcnajHauWwOnSqvxT+A3hfVvCE3xOm01f8AhMtG+G2p+G7e9ViM2NzHDcSROvR8SW0ZXOdu6TH3zX5b/wDBth+3rp/7Mv8AwTuuPDdx8J/j14ykm8W314dS8HeA7vW9O+eG2XYZ4flEi7BuU8gFexoA/Rqz/wCC0v7K+o2N1dW/xu8F3Nrp6LLdzQzSSR2aMwRWlYIRGpYhQXwCSB1rR1H/AIK8fs06P4D0zxTdfGLwjb+Gdaup7Kw1WSWRbO7nhCmWNJSmxmUOuQDnr6HH59f8G3PhvQ/2hPF37d2l6zot0vh3xx4t+zX2l6lbG3uVtbqTVg9vPGeUcJIVZD91twrxX9lX4CXXjv8AYf8A2zP2CfHl9Eviz4H3d14z8EXl8yx5ghfzlmQtxFDIwhdm7Jqz9KAP15f/AIKufs7p4nXRT8VPDv8AbD6b/bC2W2f7Q1l5H2j7SE8vJi8n59+MY71hS/8ABav9lO3sILqT45+BY7W6LCCd7p1inK4DBHK4baSAdpOCRnrX5p/sB/tH654z/wCCRPxK+MC+JI/E/wC0T8WLvSfgN4bZmMNxpBEUFhp8CMcnzAt3cajI68SNknlOOs/4OBv2f9B/Zc+AH7D/AMO/D9vGuj+CfGFpo1qzIN0qRR2ys7f7UjLvY92JNAH6Saj/AMFTP2e9F8c6D4Z1D4reF9M17xRHZy6TZX0klrLqCXe37M0YkVdyyb1APTJwcEGut/aX/bV+Ff7HFnpV18UPG2j+CbXW3kjsrjUy8cM7oFLKJApUNhgQCQTzjODj4a/4L2/sAR/8FJv2gfgp8OIdUbRfEH/CI+NNW0K74ELahbnRTBFOcFhA5ZlYr8y7gwB27T84+G/+Ck9/+2P/AMEofHvwP+M8P9n/AB6+D3inwrpGuafqWPtWtW0PifS7c3RUk7pkOY58ZBJWTOJQAAfqd8Uv+CnXwB+CPh3wtq3i74reE/Dlj42sP7U0KS/uDCdTteP30akbtnI5IHUV5/b/APBd39kK5vVtx8evA6SMcAySTRoD7u0YUfia8h/4Ok9BsdV/4JF+KLq5s7e4utN17R5rSWSMM9s7XiRsyE8qTG7qSOoYjvWh/wAG9nwk8KfEX/giD8K9L8QeGfD+uabrSayNRtNQ0+K6gvs6veofNR1KvlVVfmB4AHQUAfbXwf8Ajn4L/aD8IR+IPAnizw34y0ORigv9F1GK+t9w6qXjZgGHdTyO4rqq/nZ/br0TUf8Ag3G/4LCeH/GXwjkvrD4T/EC1h1e98MpMzWk9mJ2ivtP2s3zeXxNA7cxGZFBIVt39Dmh61a+JNFs9RsZluLPUIEubeVfuyRuoZWHsQQaAOL/ar2n9l34kbiFX/hFtTyScAD7JLXwd8Kv+Ce3h7/gp7/wbv/Br4f6i8NjrkPgrT9Q8Nau6fNpGpxQlY3PBPlPlo5ABzHI2MMFI+q/+Cnmv/EaD9j/xd4d+F3w11X4l+LPHGl3vh23t7XUrOwh0n7Tayx/bJ3uZUzGhI+SPczMVHyglh5Z/wQ/t/jN8I/2SfDHwg+MHwf1jwDffDfSUsrTXX1jT76x1yISv5aqlvM8kUqRlQwZSp25DZbaAD8HvA/7b3jf9nT9if4wfsYfE3R9Wt7iTxLph0WCZgX8M6hbazaT3ts55zbypE8iFCVDksNyzbh+23/Bd7/gmL43/AG1/Dvw3+Jnwfmsk+MXwR1X+1tFsruVYYdZi8yGYweYxCrKstvE8ZdlQ5kViu4MviH/BxH/wRb8RftTfEbwX8a/gz4ZOtePotRs9K8V6VatFDJq9qrL9nvdzsq+ZBtETkklomjOQIcH7P/bR179sbS/ivZx/s/6H8ANS8FNpcbXUvjafUo9RW+8yXzFUWzqnk+X5JGRu3F8nGKAPn/8AbU/aU+OX7f8A+xHrXwb8Cfs4fFTwZ8TPiNZJoXiC78VW1vYeHfDFtIyreyi/MpF2pj8xIxArOQ24qCAjeT/8FQ/+CZvjT4Zf8EXPhh+yz8IfA/ir4la7pN/BqV/qmnRQR2QmR5pruWVpZVZTLPcsY0UNhVwSNoz75/wl/wDwU2/6FP8AY3/8C9d/+OUf8Jf/AMFNs/8AIp/sb/8AgZrv/wAcoA+ff2o/2Mvjl4c+Pn7O/wC2F8D/AIX+IX8c+GNGtvDnxC8A6jdWljq2oW1uhtmk/wBa0UvmQeZHkSMyhLRwh2uF7H/g4V8A/FT/AIKF/sQ/D3wX8N/gj8TLzxBe63Z+Lr2G8t7OBdFijtr63a1uG+0kfad8yHbHvTbzv5APqX/CXf8ABTbP/Iqfsb/+Beu//HaU+Lv+Cmw/5lP9jf8A8C9d/wDjlAH0Nr3xY1zxF+wZqmtL8M/iFB4guNBl09PCMlrbf2007IbcKFE5h27jv3ebjZ83HSvkj/g3N+FfxM/Yl/YX8UfD/wCJ3wn8eeGte0XVb3xJblorWaHWYZIYVW3tik5JuN0LDZIEB3IQxydvX/8ACX/8FNs/8in+xx/4Ga7/APHKX/hLv+Cm3/Qqfsb/APgXrv8A8doA8v8A+CA/wS+K/wCzl+01+0dL8RPhD488G6Z8X/EbeJ9G1LUBaPbQRJcXj/Z7gxzsyzFbpCNqspKyZYYG6n/wV1/4JWePPjx/wVF+EXjn4ax61pvhz4sabN4F+LF/pY8tItHj2vMbhxyPtNn5lsGPG63gXILDPrf/AAl3/BTb/oVP2N//AAL13/47S/8ACXf8FNsf8ip+xv8A+Beu/wDx2gDx79ir/gjv4g/Zx/4Lc/EDVrfS7/TP2ddBZfHfhGyRsaW+u3du9oqJH93daJPqSqOqI1ue4xqf8HEPwN+Kn7VHjn4H6P8ADX4S+N/GkPw58Sp4n1bUrJbaOzaLMeLeJpJlZ5sIxI2hR8vzEk49M/4S7/gpv/0Kn7G//gXrv/x2j/hL/wDgpt/0Kf7G/wD4F67/APHaALnx3+LPxD8S/wDBSD9n3x1pPwI+MV14M8LeG9ZstduhaWKSWUusJp7RIYjdZYwNakT4Py5+TzCCD43/AMFxv+CNmqfHP9pf4Y/tA/CXQpr7xdY+JdIs/GulWSqkmr2SXUPl34yQDJAqBJM53RBDkCD5vWf+Ev8A+Cm3/Qp/scf+Beu//HaWLxf/AMFNBNHv8J/sctHvXftvNdB255x+8POPr9DQBT/4OhP+UPnjb/sM6L/6cIa6b/g28H/Gl/4M+66wf/K1f1zP/BwJ8H/jn+2F+zPJ8FfhH8Hrzxhb+IpbHVNQ8TSeItM0+z0/7PcmX7MsVxOk0kpMUZLbQgWThmbIHkP/AAS48Sftof8ABPH9jzTvg3qX7H914wuvDM13Lo2p23xC0axtpEuLiS4MdxulkxsklfDoTldo2gjcwB82/wDB4t4utvE37SPwM8H6fGbvxBY6DqF41vCu+Z1vLqCG3UKOSWe1lAHc5r9zPgL4LuPht8DPBfh28YyXegaFY6dOxbdueG3SNjnvyp5r84f2Qv8Agip8S/jV+35N+1R+1xrHhvUvGVvdxXvh7wXoUj3Om6K0K4tRJK4wRb4DJHHuDSDzXkZiwP6lUAFFFFABRRRQAV8E/wDBdrwL4i+G/wCx78XPjZ4d+JfxJ8L694X8KWFhoVhoPiS90mwsJxqWZruSKCVVuJpEuFjzKpCLEMDJJH3tXhP/AAUs/ZJ1X9uz9inxt8JdI1zT/DVx40hgtX1O8tHuktY0uIpmIjR0LMfLwPmABOTnGCAeE/Er4I6t8Cv+CXnxu8e6V8UPi5eaprnwoTxDYtqPjDULy58P6lY6VcXP2i0uZJmliE0pjaSNSEPl4xtbaPBv+CPX7RnjH4s/tgfDjTPBPxO8Z/EjwGfgppOs/FiHxHrt1rEeh+KLhAY/Iku2aWKaUq5aGI+SEBOM7cfdfxO/Zj8YfE3/AIJx638G59d8M2virXvBcvg641hLCc6fGktubSS4SAy+ZnyWZlQyHD4BYjr4V8BP+CT/AI8/Zr+MvwV+I3hf4h+GYfE/gjwJafDPxxZNosy6Z410izKrZ3CgTeZb3scSR5djIpKqAFQFWAOO/b8/4KH+JPgh/wAFdfgH4f07xZZ2fwx0rWrbwn400eLUY0uL3U9dtbn7C81vneYbdYYJfM+6GuAOtdR/wVUk1q+/4KCfse+F7Lxp8QvDfhz4g63rWl+ItO8PeKb/AEaHVYLezS4hD/ZZY2DLJn5lIYqxUkjGKf7Qf/BG3xJ+01+zB8VvD/iLxJ4Bt/ir8SPHsXjC28cWugzNc6FFC1qbe3i3S+bmGG1W2UiRVMZLFd5bPfftc/sLfGP9on4yfs8/EDS/HPw70zxJ8DVm1G6S80G7mtNf1K5t0t7rCpcK0FvtUlBudwX5J28gHI/sq/Fjxx+zr/wVx8dfsxa54y8R/ED4fax4Ei+IXhO88QXhvNZ8PA3f2Sewe8P724iL+Y6PKzSIqou5iWY/PX/BOL4it8T/AI/+NPB/iP4n/tIyeMtF/aG1bQvC12dd16/8PxaPpSG+/sy8llk+wyrNBa3cLRyM9wfOjcKVG4fcv7Lf7BmofDP9qfx18d/iL4ps/GXxW8cadb6DG+nae2n6T4b0iAh1sbOJ5JZDvkUSSSSSEu4BCoMg+P8A7NP/AATc/aA/ZosPiTpei/Fr4a2mnfFX4g3fjzUr6DwndnVNGkvZIvtcNk73bRAmGMxpJJGxQuzENwAAfM//AAVr/aOb4Gf8FDPjVZat8avil4A0yx+BY8T+ELDSvF2pWtp/wlZvGgtRFbRv5LCURojQyKYm3yMQCSw9u/4KAfFj9oj4X/8ABJf4I+L9c03xld+I9J1Hw/f/ABqs/CFx9j1yXR0gZ9SWGW2KtCWlEXmvbshQF8Mke9h337S//BJXUv2sf2xfiZ4y8WeJPDrfDv4l/Dc/Da60SHTZjqVpCsou4NQSdpDF9pivArqDEUCov8WSek+H/wCyv+0p8Hv2fPhTpGl/Frwd4k8ZfCyaTTLh9U027ttK8b6KbdYYo74LJJLFexlI5FuE3jchBUiR8gHYf8EtPiJ4H+Lf7J1p4m+G/wAQ/FXxG8F65q19e6ZceJLye81TREklLHTJpbhnmb7MxZFMrM2zZ8zrtdvoyvnr/gmp+wvH+wJ8B9Y8Nyalp2qa14t8U6l4w1l9MsjY6Zb3d7IGNvZwMzmK2ijSKNFLE4TPGcD6FoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9k=",
                                                            "length": 1,
                                                            "width": 138.60000610351563,
                                                            "height": 37.799999237060547,
                                                            "isInlineImage": true,
                                                            "isMetaFile": false
                                                        },
                                                        {
                                                            "fieldType": 1
                                                        }
                                                    ]
                                                }
                                            ],
                                            "cellFormat": {
                                                "columnSpan": 1,
                                                "rowSpan": 1,
                                                "preferredWidth": 228.30000305175781,
                                                "preferredWidthType": "Point",
                                                "verticalAlignment": "Top",
                                                "isSamePaddingAsTable": true,
                                                "borders": {
                                                    "left": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "right": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "top": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "bottom": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "vertical": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "horizontal": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalDown": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    },
                                                    "diagonalUp": {
                                                        "lineStyle": "None",
                                                        "lineWidth": 0.0,
                                                        "shadow": false,
                                                        "space": 0.0,
                                                        "hasNoneStyle": false
                                                    }
                                                },
                                                "shading": {
                                                    "texture": "TextureNone"
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            "title": null,
                            "description": null,
                            "tableFormat": {
                                "allowAutoFit": true,
                                "leftIndent": 0.0,
                                "tableAlignment": "Left",
                                "preferredWidthType": "Auto",
                                "borders": {
                                    "left": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "right": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "top": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "bottom": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "vertical": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "horizontal": {
                                        "lineStyle": "Single",
                                        "lineWidth": 0.5,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "diagonalDown": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    },
                                    "diagonalUp": {
                                        "lineStyle": "None",
                                        "lineWidth": 0.0,
                                        "shadow": false,
                                        "space": 0.0,
                                        "hasNoneStyle": false
                                    }
                                },
                                "bidi": false
                            }
                        },
                        {
                            "paragraphFormat": {
                                "lineSpacing": 1.5,
                                "lineSpacingType": "Multiple",
                                "styleName": "Normal (Web)"
                            },
                            "inlines": [
                                {
                                    "text": "The "
                                },
                                {
                                    "editRangeId": "1851466980",
                                    "group": "everyone"
                                },
                                {
                                    "text": "Northwind sample database (Northwind.mdb) is included with all versions of Access. It provides data you can experiment with and database objects that demonstrate features you might want to implement in your own databases"
                                },
                                {
                                    "editRangeId": "1851466980",
                                    "editableRangeStart": {
                                        "editRangeId": "1851466980",
                                        "group": "everyone"
                                    }
                                },
                                {
                                    "text": ". "
                                },
                                {
                                    "editRangeId": "1656906187",
                                    "user": "sample@gmail.com"
                                },
                                {
                                    "text": "Using Northwind, you can becom"
                                },
                                {
                                    "text": "e familiar with how a relational database is structured and how the database objects work together to help you enter, store, manipulate, and print your data"
                                },
                                {
                                    "editRangeId": "1656906187",
                                    "editableRangeStart": {
                                        "editRangeId": "1656906187",
                                        "user": "sample@gmail.com"
                                    }
                                },
                                {
                                    "text": "."
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "afterSpacing": 6.0,
                                "styleName": "Normal"
                            },
                            "inlines": [
                                {
                                    "text": "It contains the following detailed information :",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                },
                                {
                                    "name": "_GoBack",
                                    "bookmarkType": 0
                                },
                                {
                                    "name": "_GoBack",
                                    "bookmarkType": 1
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "leftIndent": 30.0,
                                "afterSpacing": 6.0,
                                "styleName": "Normal",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "editRangeId": "442986437",
                                    "group": "everyone"
                                },
                                {
                                    "text": "Suppliers/Vendors of Northwind – who supply to th",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                },
                                {
                                    "text": "e company.",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "leftIndent": 30.0,
                                "afterSpacing": 6.0,
                                "styleName": "Normal",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "text": "Customers of Northwind – who buy from Northwind",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "leftIndent": 30.0,
                                "afterSpacing": 6.0,
                                "styleName": "Normal",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "text": "Employee details of Northwind traders – who work for Northwind",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "leftIndent": 30.0,
                                "afterSpacing": 6.0,
                                "styleName": "Normal",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "editRangeId": "496268429",
                                    "user": "sample1@gmail.com"
                                },
                                {
                                    "editRangeId": "442986437",
                                    "editableRangeStart": {
                                        "editRangeId": "442986437",
                                        "group": "everyone"
                                    }
                                },
                                {
                                    "text": "The product information – the products that Northwind trades in",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "leftIndent": 30.0,
                                "afterSpacing": 6.0,
                                "styleName": "Normal",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "text": "The inventory details – the details of the inventory held by Northwind",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                },
                                {
                                    "text": " traders.",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "leftIndent": 30.0,
                                "afterSpacing": 6.0,
                                "styleName": "Normal",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "text": "The shippers – details of the shippers who ship the products from the traders to the end-customers",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "leftIndent": 30.0,
                                "afterSpacing": 6.0,
                                "styleName": "Normal",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "text": "PO transactions i.e Purchase Order transactions – details of the transactions taking place between vendors & the company.",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "leftIndent": 30.0,
                                "afterSpacing": 6.0,
                                "styleName": "Normal",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "editRangeId": "2060461898",
                                    "group": "everyone"
                                },
                                {
                                    "editRangeId": "496268429",
                                    "editableRangeStart": {
                                        "editRangeId": "496268429",
                                        "user": "sample1@gmail.com"
                                    }
                                },
                                {
                                    "text": "Sales Order transaction – details of the transactions taking place between the customers & the company.",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "leftIndent": 30.0,
                                "afterSpacing": 6.0,
                                "styleName": "Normal",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "text": "Inventory transactions – details of the transactions taking place in the inventory",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontColor": "#333333FF"
                            },
                            "paragraphFormat": {
                                "leftIndent": 30.0,
                                "afterSpacing": 6.0,
                                "styleName": "Normal",
                                "listFormat": {
                                    "listLevelNumber": 0,
                                    "listId": 0
                                }
                            },
                            "inlines": [
                                {
                                    "text": "Invoices – details of the invoice raised against the order.",
                                    "characterFormat": {
                                        "fontColor": "#333333FF"
                                    }
                                },
                                {
                                    "editRangeId": "2060461898",
                                    "editableRangeStart": {
                                        "editRangeId": "2060461898",
                                        "group": "everyone"
                                    }
                                }
                            ]
                        },
                        {
                            "characterFormat": {
                                "fontSize": 18.0,
                                "fontFamily": "Calibri",
                                "fontFamilyBidi": "Calibri"
                            },
                            "paragraphFormat": {
                                "styleName": "Normal"
                            },
                            "inlines": []
                        }
                    ],
                    "headersFooters": {
                        "firstPageHeader": {
                            "blocks": [
                                {
                                    "characterFormat": {
                                        "bold": true,
                                        "underline": "Single",
                                        "fontSize": 15.0,
                                        "boldBidi": true
                                    },
                                    "paragraphFormat": {
                                        "textAlignment": "Center",
                                        "styleName": "Normal"
                                    },
                                    "inlines": []
                                }
                            ]
                        }
                    },
                    "sectionFormat": {
                        "headerDistance": 59.549999237060547,
                        "footerDistance": 64.3499984741211,
                        "pageWidth": 595.29998779296875,
                        "pageHeight": 841.9000244140625,
                        "leftMargin": 70.9000015258789,
                        "rightMargin": 77.949996948242188,
                        "topMargin": 45.0,
                        "bottomMargin": 45.0,
                        "differentFirstPage": false,
                        "differentOddAndEvenPages": false,
                        "bidi": false
                    }
                }
            ],
            "characterFormat": {
                "fontFamily": "Times New Roman",
                "fontFamilyBidi": "Times New Roman"
            },
            "lists": [
                {
                    "listId": 0,
                    "abstractListId": 0
                }
            ],
            "abstractLists": [
                {
                    "abstractListId": 0,
                    "levels": [
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Symbol",
                                "fontFamilyBidi": "Symbol"
                            },
                            "paragraphFormat": {
                                "leftIndent": 48.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "o",
                            "characterFormat": {
                                "fontFamily": "Courier New",
                                "fontFamilyBidi": "Courier New"
                            },
                            "paragraphFormat": {
                                "leftIndent": 84.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Wingdings",
                                "fontFamilyBidi": "Wingdings"
                            },
                            "paragraphFormat": {
                                "leftIndent": 120.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Symbol",
                                "fontFamilyBidi": "Symbol"
                            },
                            "paragraphFormat": {
                                "leftIndent": 156.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "o",
                            "characterFormat": {
                                "fontFamily": "Courier New",
                                "fontFamilyBidi": "Courier New"
                            },
                            "paragraphFormat": {
                                "leftIndent": 192.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Wingdings",
                                "fontFamilyBidi": "Wingdings"
                            },
                            "paragraphFormat": {
                                "leftIndent": 228.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Symbol",
                                "fontFamilyBidi": "Symbol"
                            },
                            "paragraphFormat": {
                                "leftIndent": 264.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "o",
                            "characterFormat": {
                                "fontFamily": "Courier New",
                                "fontFamilyBidi": "Courier New"
                            },
                            "paragraphFormat": {
                                "leftIndent": 300.0,
                                "firstLineIndent": -18.0
                            }
                        },
                        {
                            "listLevelPattern": "Bullet",
                            "followCharacter": "Tab",
                            "numberFormat": "",
                            "characterFormat": {
                                "fontFamily": "Wingdings",
                                "fontFamilyBidi": "Wingdings"
                            },
                            "paragraphFormat": {
                                "leftIndent": 336.0,
                                "firstLineIndent": -18.0
                            }
                        }
                    ]
                }
            ],
            "background": {
                "color": "#FFFFFFFF"
            },
            "styles": [
                {
                    "type": "Paragraph",
                    "name": "Normal",
                    "next": "Normal",
                    "characterFormat": {
                        "fontSize": 12.0,
                        "fontSizeBidi": 12.0
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Heading 1",
                    "basedOn": "Normal",
                    "characterFormat": {
                        "bold": true,
                        "fontSize": 16.0,
                        "fontFamily": "Arial",
                        "boldBidi": true,
                        "fontSizeBidi": 16.0,
                        "fontFamilyBidi": "Arial"
                    },
                    "paragraphFormat": {
                        "beforeSpacing": 12.0,
                        "afterSpacing": 3.0,
                        "outlineLevel": "Level1"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Heading 3",
                    "basedOn": "Normal",
                    "characterFormat": {
                        "bold": true,
                        "fontSize": 13.0,
                        "fontFamily": "Arial",
                        "boldBidi": true,
                        "fontSizeBidi": 13.0,
                        "fontFamilyBidi": "Arial"
                    },
                    "paragraphFormat": {
                        "beforeSpacing": 12.0,
                        "afterSpacing": 3.0,
                        "outlineLevel": "Level3"
                    }
                },
                {
                    "type": "Character",
                    "name": "Default Paragraph Font"
                },
                {
                    "type": "Paragraph",
                    "name": "15",
                    "characterFormat": {
                        "fontSize": 12.0,
                        "fontFamily": "Verdana",
                        "fontSizeBidi": 12.0,
                        "fontFamilyBidi": "Verdana"
                    },
                    "paragraphFormat": {
                        "leftIndent": 9.0
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Style",
                    "characterFormat": {
                        "fontSize": 12.0,
                        "fontFamily": "Verdana",
                        "fontSizeBidi": 12.0,
                        "fontFamilyBidi": "Verdana"
                    },
                    "paragraphFormat": {
                        "leftIndent": 27.0
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Style4",
                    "characterFormat": {
                        "fontSize": 12.0,
                        "fontFamily": "Verdana",
                        "fontSizeBidi": 12.0,
                        "fontFamilyBidi": "Verdana"
                    },
                    "paragraphFormat": {
                        "leftIndent": 18.0
                    }
                },
                {
                    "type": "Character",
                    "name": "10",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 8.0,
                        "fontColor": "#000000FF",
                        "fontSizeBidi": 8.0,
                        "fontFamilyBidi": "Verdana"
                    }
                },
                {
                    "type": "Character",
                    "name": "11",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "bold": true,
                        "fontSize": 8.0,
                        "fontColor": "#000000FF",
                        "boldBidi": true,
                        "fontSizeBidi": 8.0,
                        "fontFamilyBidi": "Verdana"
                    }
                },
                {
                    "type": "Character",
                    "name": "Style3",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 8.0,
                        "fontColor": "#000000FF",
                        "fontSizeBidi": 8.0,
                        "fontFamilyBidi": "Verdana"
                    }
                },
                {
                    "type": "Character",
                    "name": "Hyperlink",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "underline": "Single",
                        "fontColor": "#0000FFFF"
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Header",
                    "basedOn": "Normal",
                    "link": "Header Char",
                    "paragraphFormat": {
                        "tabs": [
                            {
                                "tabJustification": "Center",
                                "position": 240.94999694824219,
                                "tabLeader": "None",
                                "deletePosition": 0.0
                            },
                            {
                                "tabJustification": "Right",
                                "position": 481.89999389648438,
                                "tabLeader": "None",
                                "deletePosition": 0.0
                            }
                        ]
                    }
                },
                {
                    "type": "Character",
                    "name": "Header Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 12.0,
                        "fontSizeBidi": 12.0
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Normal (Web)",
                    "basedOn": "Normal",
                    "next": "Normal",
                    "paragraphFormat": {
                        "beforeSpacing": 5.0,
                        "afterSpacing": 5.0
                    }
                },
                {
                    "type": "Paragraph",
                    "name": "Footer",
                    "basedOn": "Normal",
                    "link": "Footer Char",
                    "paragraphFormat": {
                        "tabs": [
                            {
                                "tabJustification": "Center",
                                "position": 225.64999389648438,
                                "tabLeader": "None",
                                "deletePosition": 0.0
                            },
                            {
                                "tabJustification": "Right",
                                "position": 451.29998779296875,
                                "tabLeader": "None",
                                "deletePosition": 0.0
                            }
                        ]
                    }
                },
                {
                    "type": "Character",
                    "name": "Footer Char",
                    "basedOn": "Default Paragraph Font",
                    "characterFormat": {
                        "fontSize": 12.0,
                        "fontSizeBidi": 12.0
                    }
                }
            ],
            "defaultTabWidth": 36.0,
            "formatting": true,
            "protectionType": "ReadOnly",
            "enforcement": true,
            "hashValue": "N/0tDhYx6tjLa8jwvc6g+8wv5pQ0P7pepfPdKSWQnL5HqkvGn/osISiQBmCNMKCYZBBpat7ViB8RxVI1wKmzMQ==",
            "saltValue": "bYZI+grxi0AzgWDskUZ5ZQ=="
        };
        // tslint:enable   
        this.container.documentEditor.open(JSON.stringify(defaultDocument));
        this.container.documentEditor.documentName = 'Document Protection';
        this.titleBar.updateDocumentTitle();
        this.container.documentChange = (): void => {
            this.titleBar.updateDocumentTitle();
            this.container.documentEditor.focusIn();
        };
    }
}