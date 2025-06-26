import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import * as React from 'react';

export default function AIToast() {
    let toastInstance: ToastComponent;

    function contentTemplate() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '12px 16px',
                    color: '#333',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    width: '400px'
                }}
            >
                <div style={{ flex: 1, paddingRight: '8px' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '6px', letterSpacing:'0.5px' }}>
                        Explore AI Demos
                    </div>
                    You can now explore our <strong>Smart AI demos</strong> with limited AI token usage. Additionally, you can try out our <strong><a href="https://github.com/syncfusion/smart-ai-samples/tree/master/react" target="_blank" style={{ color: '#007bff', textDecoration: 'none' }}>Syncfusion Smart AI Samples</a></strong> locally by using your own API key
                </div>
                <button
                    onClick={() => toastInstance.hide()}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '0',
                        marginTop: '2px',
                        color: '#666'
                    }}
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
        );
    }

    function toastCreated(): void {
        toastInstance.show();
    }

    return (
        <ToastComponent
            className='ai-toast'
            width={420}
            ref={toast => toastInstance = toast!}
            content={contentTemplate}
            created={toastCreated.bind(this)}
            position={{ X: "Right", Y: "Top" }}
            timeOut={0}
            newestOnTop={true}
        />
    );
};
