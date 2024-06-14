import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { TimelineComponent, ItemsDirective, ItemDirective, TimelineItemModel } from '@syncfusion/ej2-react-layouts';
import './template.css';


// *  Template Sample for Timeline component

export class Template extends SampleBase<{}, {}> {

    public gitHubRoadmap = [
        { icon: "sf-icon-commit", message: "Created 10 commits in 5 repositories" },
        { icon: "sf-icon-create", message: "Created 1 repository" },
        { icon: "sf-icon-pull", message: "Created a pull request in <u>organization/new-control-roadmap</u>" },
        { icon: "sf-icon-review", message: "Reviewed 3 pull requests in 2 repositories" }
    ];

    public timelineItems: TimelineItemModel[] = this.gitHubRoadmap.map(({ icon, message }) => ({
        dotCss: icon,
        content: message
    }));

    getTemplate = (props: any) => {
        return (
            <div className='template-container'>
                <div className="progress-line">
                    <span className={`indicator ${props.item.dotCss}`}></span>
                </div>
                <div className="timeline-content">
                    <div className="content-container">
                        <span dangerouslySetInnerHTML={{ __html: props.item.content }}></span>
                        <span className="e-icons e-more-vertical-1"></span>
                    </div>
                    {
                        props.itemIndex == 1 &&
                        (
                            <div className="content-container">
                                <span className="e-icons e-lock">
                                    &nbsp; <span className="repo-name">Author/Getting-started-with-new-control</span>
                                </span>
                                <div>
                                    <div className="mini-circle"></div>
                                    <span className="mini-text">JavaScript</span>
                                </div>
                                <span className="mini-text"> Feb 15 </span>
                            </div>
                        )
                    }
                    {
                        props.itemIndex == 2 &&
                        (
                            <div className="mention-group">
                                <svg className="color-pr" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                                    aria-hidden="true">
                                    <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z">
                                    </path>
                                </svg>
                                <div className="mention-content">
                                    <p style={{ fontWeight: "bold" }}> 87231 - Updated Roadmap for new control </p>
                                    <span> Updated new control roadmap </span>
                                    <div className="diffstats">
                                        <span className="color-success"> +95 </span>
                                        <span className="color-danger"> -17 </span>
                                        <span>
                                            <span className="diff-block added"></span>
                                            <span className="diff-block added"></span>
                                            <span className="diff-block added"></span>
                                            <span className="diff-block added"></span>
                                            <span className="diff-block neutral"></span>
                                            lines changed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="control-pane">
                <div className="col-lg-12 control-section">
                    <div className="timeline-template-section">
                        <TimelineComponent cssClass="custom-timeline" template={this.getTemplate}>
                            <ItemsDirective>
                                {this.timelineItems.map((item, index) => {
                                    return <ItemDirective key={index} dotCss={item.dotCss} content={item.content} />
                                })}
                            </ItemsDirective>
                        </TimelineComponent>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the template functionality of the Timeline component.</p>
                </div>
                <div id="description">
                    <p>
                    In this example, we showcase repository activities by customizing each item using the <code>template</code> property. It allows to create unique appearances for items, including the connector, dot container, and contents.
                    </p>
                </div>
            </div >
        );
    }
}