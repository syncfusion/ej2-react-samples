import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
const StylesView = () => {
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let hostUrl: string =
        "https://services.syncfusion.com/react/production/api/documenteditor/";
    let container = useRef<DocumentEditorContainerComponent>(null);
    let titleBar: TitleBar;
    const onLoadDefault = (): void => {
        // tslint:disable
        let defaultDocument: object = {
            sfdt: "UEsDBAoAAAAIAHiJbVbcWj6tZAQAAFofAAAEAAAAc2ZkdN1Z227jNhD9FYF9DQJbN8d+S1Oku0ARbJF9C4xCkkmbNSVqRTrOBfn3HV5UW44sKVgpcRM/DDW8zMw5Q3GoPCOeS5rSJ3xLFhLNZLHBZ0jgBM3unhHIvECzZ5Rv0Swcu2coX6HZZAoNlkIDZGGltDK2ckFyNBuB5Ng0Vgs088IzRKyMqVbHYAnd4O23aIkRrL/MBCguiyimCTxnCWegGJ8h/GOrJYtlomeanrv5Cyyivc2JcjVeFEJJCWafoY9JI4ulkbF9XhlxrwRIITOw+51KptxglFh9Qsw4qk2UT5LB6uhWPjIs0Au40Iv1200s3+TAJVKWqzpHKK8cKpzIAYgYTiTlmcOJQ3iRRlLSbOnQTADTukfUrVGjk9zJC35PF1gvnAkqJM6kwzhfq9XlCjsLnmxSUNZMP+8PphsVBzsKUl9m/t5w2Z2K7xD+jw1N1k5c8G0GYD84/27SXDj8HhcaHRY9PQJEy46A32kH5u+G285+vJZ6h6lJ//zJf4+SdcU/3T8+6O/Lyy84WqgUHQ8BfS3ONbqdE6/75v+7TC6jcU8BUvdTQep95AuiAWXvU6Hsv1vi7ix+JvyCU9j4wQdDOoeJpmduu1TdSCImsB5iW0Q8weEGpxuBIegqYjQuKCy70UeiMCdjHJma1lSiRNWwv43sH4yN4916NK6srZ7M6qq1t36U7IaRqNJFSEbwgaaigBh/CUFGMx1IYSWxUpowY6FFBOICBqt6/Hw0mY7DMAxGk4k7mvoTpTfYWPxNhW8jWitHyvY2+6+9TcyVQyUEYWbaQm7NDcHW+TgjBmzwFkHswkqSGnu5EYuVTJnxnpgbQ8LT3JL2KGNWNnXWVzLGrvNrCB4mXfawM6FS/LC26cGo4kVdyiLDD2fmglR1xSZ0WE1o5y+6XElU5q57HfjT8Poa7XI0PMjD3YxqNu7pa9Tmcra3OfdRcK5WUYFaoCoHmZLzdEL6A5Now6TzLSqiZRHlK+ea25tPdry7EsfLYbBuf3lRTQv3WFp4b8XQGzwt3C5p4R5Pi48NqSUt9uvGQZj2jjHtNsIyvvYmoVeBxR2caa8L095xpj82pI5M+0Mx7b9mmpYf8LptAF2alBMGZdrvwrRfx/QphNSR6WAopoOaPd3tDTcsq0EXVoPa/fvO7rcweMMlFv2wp2gLbZH8qiZ+2bt4mCSNy3w9xLkO0vKLZC/1Kizoe+euvrJMQnfqTf3A3gBq9OomMLYV56jpxaM59EfqV92QdYmkA2pKosqA+tdCm8EW6ssv/j1RP2qlXh9d7sWxF5o5qUz/IJtXB9yEeWXAq0P3fT1vIe9rJnEmsHMiG+PC5ICSbRvEn7hXfvsGqQTYRFrtwKYNc9yBFsz3/knV270ZBMs4eLu3TbSbwaX6gZt14JSeNOFyOKaSz7UmOh72YY/p1vzlxa2+WRq+vKhaIXxTrWBq5OErhbBLpRC+sVIYwPlj5M8VquorInDBjExSIwv7+GAkTZdCo/8TUEsBAhQACgAAAAgAeIltVtxaPq1kBAAAWh8AAAQAAAAAAAAAAAAAAAAAAAAAAHNmZHRQSwUGAAAAAAEAAQAyAAAAhgQAAAAA",
        };
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Styles";
        titleBar.updateDocumentTitle();
        container.current.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.current.documentEditor.focusIn();
        };
    };
    const rendereComplete = (): void => {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        titleBar = new TitleBar(
            document.getElementById("documenteditor_titlebar"),
            container.current.documentEditor,
            true
        );
        onLoadDefault();
    };
    return (
        <div className="control-pane">
            <div className="control-section">
                <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                <div id="documenteditor_container_body">
                    <DocumentEditorContainerComponent
                        id="container"
                        ref={container}
                        style={{ display: "block" }}
                        height={"590px"}
                        serviceUrl={hostUrl}
                        enableToolbar={true}
                        locale="en-US"
                    />
                </div>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates character and paragraph formatting using
                    styles in the document editor. Both built-in styles (for example,
                    heading styles) and custom styles can be added.
                </p>
            </div>
            <div id="description">
                <div>
                    <p>
                        In this example, you can use, add, modify, or delete built-in and
                        custom styles.
                    </p>
                    <p style={{ display: "block" }}>
                        {" "}
                        More information about the document editor features can be found in
                        this{" "}
                        <a
                            target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/document-editor/styles/"
                        >
                            documentation section.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default StylesView;
