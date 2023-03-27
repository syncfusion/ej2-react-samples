import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';
import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
function HeadersAndFootersView() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let hostUrl: string = 'https://services.syncfusion.com/react/production/api/documenteditor/';
    let container: DocumentEditorContainerComponent;
    let titleBar: TitleBar;
    function rendereComplete(): void {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        }
        container.documentEditor.pageOutline = '#E0E0E0';
        container.documentEditor.acceptTab = true;
        container.documentEditor.resize();
        titleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), container.documentEditor, true);
        onLoadDefault();
    }
    return (<div className='control-pane'>
        <div className='control-section'>
            <div id='documenteditor_titlebar' className="e-de-ctn-title"></div>
            <div id="documenteditor_container_body">
                <DocumentEditorContainerComponent id="container" ref={(scope) => { container = scope; }} style={{ 'display': 'block' }}
                    height={'590px'} serviceUrl={hostUrl} enableToolbar={true} locale='en-US' />
            </div>
        </div>
        <div id="action-description">
            <p>This example demonstrates header and footer support in document editor. Different headers and footers can be added to the first page, odd pages, and even pages.</p>
        </div>
        <div id="description">
            <div>
                <p>Header and footer features in document editor.</p>
                <ul>
                    <li>Header and footer for the first page of the document.</li>
                    <li>Header and footer for even pages of the document.</li>
                    <li>Header and footer for odd pages of the document.</li>
                </ul>
                <p style={{ 'display': 'block' }}> More information about the document editor features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/document-editor/header-footer/">documentation section.</a>
                </p>
            </div>
        </div>
    </div>);
    function onLoadDefault(): void {
        // tslint:disable
        let defaultDocument: object = {"sfdt":"UEsDBAoAAAAIAEaJbVbG8ruutgwAAG/iAAAEAAAAc2ZkdO1dSW/cyBX+KwRzCwSj1Zts3SxbsseWZMGSDQzGPlSTxWZZJIsmi1psCAg8p1wCBJgEOWSA3HIIggyQATLIJT/GgI1k8iOmFnaryS5KlNUsqYlnG67uWt9Wj7W85vfepjEjIXmH9z2X2essyfCKnWLHXv/mvc3TOLHX39vxsb0+XO2u2LFvr6/d4x+CkH/gaZKnLE9Heep6sb2+ylOK1Qfftdd7wxXby9MRsdc7POEj2bv4eA+Nsc37H0cpz7ifoBFx+PfIoUEq2+O3xzINRsyRLVXJN6/PeCeS2tgTpI7cJBUp48O+52UBU2kyVuko/+6r5EgkPE1ZJAihSYgCPm5AvLzA8VRFIseYfGMB797epgkOLRKnWWi5NKCJlRJm2Wcr5YooxEyTvaKr69CIy51hliWaUm3vLolJ6pBoXLMBDoienBS7nBFtE5KlIXVrDsBwGNO65JPIIS5xs4jVbJBpKwZoxNVhYa0CpHawFaJxhLQiDMjbDGkK7lgvtB3iiIQ6KpBrhYSX6doc8UYorGsHbzOS1hRIRFM+cbXKwSc4cQhDjNBIK8sgQKFDaw4kZawnKyIpqa+sKhWQuK4Jn2hzUc3mDg25NdPatfmU5PbBtAbykCtKy1DGcN0pkGSJtq7yKkSrugTHCfZx5OJEO50rmh3RIIu5QdSl7ajCW2jln6Z1u3VIEGRhJc9Y231Ws3MvGxNUl+hIzIGadWOU8I61nvmOrv7miYNjhmu78pTU9oLUcRB2anPpZDFxEdPXj/TOIU4ocXFU8azgDluYmJMFMbL41NUS6XnEIXWl6+IUJ/WfAyEN6psmqnDYxNUbMruKS9Qa8h377LXIvda6RK5+7nTW7q0Oh8NBZ22t27nXXxP5TK6Cvmjd8spbBGkXD217/H/7AQ2JY+2jKLV29nklz0Pa3MjD2nxNdpGnJoept8hrnoLi6rH58VaMcqdd7zY/rFkNalboLWOxuEowYaRzmxUDTJZ3QS1TYnnf1jL2dDvNlrGYmWXtfNNdscM24FtLW/fmRyydCRhwO4W1qwG1ak4xmh+1fDzStoVO8UCnZX5n7gjKAH8VZ1sGnGz50Kxlypw75jPAX+n8sHVPSuOPxNmjVCOT0ewjEbVWe3Nn063jb+403cSarXRMb2AWFs7/27aVKt5YGOBOcxXS/KgVdywG2DXMqOZWqGUWe2T6hMrs87Bw89a2J0bprtCUt8FmVZi1VoHl+9i2bX6LN8gt427+ztvEcs3kaJpb+pbpsBhX0DLm5iMh2vb8m4/dMHEiY/hUbT7axMgt4gVhLAZMtxwf0zLLnY/oaRmD5Riktp0kmr55KoRjmdg2sXaf4pvdNkHI27q9QemhdT9i8lZ6It65TCXduez5XF242+KHuEqoW1Oj68LcmhprxRhXF4S3NTWkOY1VhrUtPWu6w8LmjLEilK0x5vRhbEuvNH342tKzVR22tvSsZe1jqWZIXGM+WRsO19Ro2lC4xtyWZjPSmLlUhsA1NaI+/G35F0C6sLeln+QV4W6N8XVhqFtjzlkf5tYOD23QKLWhbfBEvdojbT6crcHJZu6RhlqnrYrwtRbwVRG21tzaShuy1tgs04SrLf/WSRem1hhXlSFqTY14YXhaY2waZLAyLG3pLfPI5AmTueeZJgxt+T2/NvysWS+Czaksa53C9OFmy7/p1IWZLT1XVeFlzS2rTI1UGVa29DrThZMtPVNVYWTL//yqCh9r7sTD4ClVVdhYg7d1l4aMNWai+nCxpbfQqjCxpWdMHx62/CdyJm9iNCFhzW1fWnofaW77IkPAXq/YvhzKl8FW1389K+PUdSfxV48xcnGii79K39nrq3dX9Bym78Q7Z1XxYmOyzA2rZHzgk9Ti/6jrWjEaY8uXElGi57W8BUldiXuLUjYrbk5F3rcMx3N50u31ee4b+Z0FPJFktCMobk7YnpKHofn0yphHEq9gLr7h0FMBl75oJN4Mbco17t1/tGlZ1qtXv7Z2Np8/2tx69nzn/sE8bV1DBPXmRl7NZxq+SQc3F5tbdjULfc+i2aGLcw8f4WjW000cHb59nq4Fb7ycl7re5TVJwyujcflXdn2N/kjgS91fk0R1K12gFzfiA6uD7IUj6namPqfb0XmqcoWiZXskSVnZoayYgBCYyOw2Oa6Kn0xohFX2A9rp+iWz6jrGP227WmGjZyK7gGUhISyE3UpQCx2WRb9TwrLolLEsOgrLotsHLAvAsmgMywKAK5YZuAJQKgClAlAqAKUCUCoApQJQKgClAlAqAKUCUCoApQJQKgClAlAqAKUCUCoApQJQKgClAlAqAKUCUCoApQJQKtqBUmF2uwiIGICIAYgYgIgBiBiAiAGIGICIAYgYgIgBiBiAiLEEp82AvgHoG4C+AegbgL4B6BsL/V0DAGUAUAYAZQBQBgBlAFAGAGVciSUAsAAACwCwAAALALAAAAsAsAAACwCwAAALALAAAAsAsAAACwCwAAALALAAAAsAsAAACwCwAAALALBYZgALc/oDoAwAygCgDADKAKCMhoEyLn6BfPElxIASASgRgBIBKBGAEgEoEYASASgRzaFEnImFjjOZhh4KUiytNf+kvMbqxGuggIwSwgfL8ohz9XZ9pGSt3pjviXft/6qT/+F1R6Pz/sio0Lf0ObJ38Wmmf+ScN3FlrU53MJXItNpUFjM5hQzO6/Vi7kkkmUry1MtTplgepTJBPLl7eYD+1CvNCOFQEDL5fBxNPx87E7u1mRcIys/lwPNcdmyv94a8UAkdR57SASfc5mJI89QL1dCxSlyfhYFixFOABw4N41yXp2ykypgfqieGkyfCtz4T+3YBnhCiN16qCgLp1SK5QmdcMrzpueytbTL2mUBb4Hmdbmer0+P/i799+akvLTJSkQo1ajnphbVeK6t+bz+Jkaj+6aefPn748eOHf3389tuPH/4xpeYxirjK7Z//+vv/f/8b63///MvP3/1BZQtIiM9//+3nf/9ntrLg6NMff/j84w+f/vS7//7tO54rcCOEmyUhTq1dfGw9pyES3D/Go0RbcOAjYd/3o3GKIiSKeOYm80Xm7ikKhAA2sCTsJTc1V3x/lL0Rne37ScaEZT/1Q/F9h9Jggyay26eiJh8vi8aqRcLnpf0coSPR4IFiaTOLfRwSUeGBj0UXewFni3vMCDNLZNFDLBT7NSGCnh3iJDSlHrO+JtYGInLwAyImyEzZYxJysk+RYk5QsfPS2qCBqPwQH8kMLmn5c5ADHAi6HqGMoVD2hoQV2tuI+aKD/dNE+IzNlHG2xjig1qaL01QUPUtORVdPuUkpHneC01BmJIwcioxtRCnPeEgPH/gojGV/JOLT2P4qPeSyQtYeZbIllfIVCScTRVPeXhLMtFp7wa2gwLTIyMT64hGmUjengYdwJE0ijCSiCJEcb2RjIcptjAN0zBc82HrxlcimMS10+MTnSn+MBRVPkBSaSCKcYusAnwgL3CapkN0+HtO8k51TZQenKApRMqm3eyjFsMknXigFFziHwriI+EkOUi2fpSGarbPnIyERkaRxroioQhG86E11Ea4q4oZapuIABbgghAPEfQVWJVmhRChDlmay2JMKzMkX3jkkUS1XNOs4BrWc0KCWExrUcELca3z68/c1Hc9lLmdiX7mjmXzN3csDmrjket7lIcqiPcynDziXhTqXiabApdxql6K2kqdTXzL9RWO+ilrAzzeH4s9at9u9tzYc3h3MrQ5nDgSjk3MSJg5IHC1wa7VWF0OUWMAKoC2kFrKXrWBpoNCxtMcaw+IuYbqIUhuC7tagf2+4tTVz2DAsLejPWxSX9TP5mmyFzDXz49NZKXEXhMTsulCUk0pMrYhvDUsPsYeygFl7KEHjBMW+tUXzC6aourjAx1mZ2e7i7OZqZtOtMpveVWXca9xsunXMplttNjfL0iVmM6G/d1OW0KuyhO6FYlvd6q0NewWxdRu3hF4dS+hVW8LNslTTEvo3ZQn9eUsg6tij7gSS50mTBo1aQr+OJfR1lnAbWKppCYObsoRBFf7TpR60Wa0P6mh9oJ3/hsmvqeHhTWl4eCUNz3rGZjU8rKPh4RU13Aj5l2h4lzKcLka7Qq3DXK2VGxRBk3JTo4nHKsu5SqQ4WRydnSo6Zy//5K2fqw66xeVfd3L5tyKL+8NOoXigA2LWWhBOLjOf8xqzy/JaGp1eZy69qBQnF4mqWOPKojogLMAGJFXCOr9b9VDP8c3vNua+JMMXCbRQYW5hapbyKuW9FnIVUU9c6oFKnVClSf71RKUkHKf51WUkmEivHzKg1/OXvUQr63Q6vTxqzLmFtPUntEWGMMzz8A7Q1ZLo6uwXUEsBAhQACgAAAAgARoltVsbyu662DAAAb+IAAAQAAAAAAAAAAAAAAAAAAAAAAHNmZHRQSwUGAAAAAAEAAQAyAAAA2AwAAAAA"};
        // tslint:enable        
        container.documentEditor.open(JSON.stringify(defaultDocument));
        container.documentEditor.documentName = 'Headers and Footers';
        titleBar.updateDocumentTitle();
        container.documentChange = (): void => {
            titleBar.updateDocumentTitle();
            container.documentEditor.focusIn();
        };
    }
}
export default HeadersAndFootersView;