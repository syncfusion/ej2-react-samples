/**
 * Default NumericTextBox sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'ar-AE': {
        'PdfViewer' : {
            'Apply': 'تطبيق',
            'Automatic' : 'تلقائي',
            'Bookmarks': 'المرجعية',
            'Cancel' : 'إلغاء',
            'Copy': 'نسخ',
            'Download': 'تحميل',
            'Download file' : 'تحميل الملف',
            'Enter Password' : 'هذا المستند محمي بكلمة مرور. يرجى إدخال كلمة مرور.',
            'File Corrupted' : 'ملف تالف',
            'File Corrupted Content' : 'الملف تالف ولا يمكن فتحه.',
            'Find in document': 'ابحث في المستند',
            'Fit Page' : 'لائق بدنيا الصفحة',
            'Fit Width' : 'لائق بدنيا عرض',
            'Go To First Page' : 'عرض الصفحة الأولى',
            'Go To Last Page' : 'عرض الصفحة الأخيرة',
            'GoToPage': 'انتقل إلى صفحة',
            'Invalid Password' : 'كلمة سر خاطئة. حاول مرة اخرى.',
            'Match case': 'حالة مباراة',
            'Next Page' : 'عرض الصفحة التالية',
            'No Text Found': 'لم يتم العثور على نص',
            'No matches': 'انتهى العارض من البحث في المستند. لم يتم العثور على مزيد من التطابقات',
            'OK': 'حسنا',
            'Open' : 'فتح الملف',
            'Page Number' : 'رقم الصفحة الحالية',
            'Page Thumbnails': 'مصغرات الصفحة',
            'Panning': 'وضع عموم',
            'Password Protected' : 'كلمة المرور مطلوبة',
            'PdfViewer': 'قوات الدفاع الشعبي المشاهد',
            'Previous Page' : 'عرض الصفحة السابقة',
            'Print' : 'اطبع الملف',
            // tslint:disable-next-line:max-line-length
            'Server error': 'خدمة الانترنت لا يستمع. يعتمد قوات الدفاع الشعبي المشاهد على خدمة الويب لجميع ميزاته. يرجى بدء خدمة الويب للمتابعة.',
            'Text Search': 'بحث عن نص',
            'Text Selection': 'أداة اختيار النص',
            'Zoom' : 'تكبير',
            'Zoom In' : 'تكبير في',
            'Zoom Out' : 'تكبير خارج',
			'Undo' : 'فك',
			'Redo' : 'فعل ثانية',
			'Annotation': 'إضافة أو تعديل التعليقات التوضيحية',
			'Highlight': 'تسليط الضوء على النص',
			'Underline': 'تسطير النص',
			'Strikethrough': 'نص يتوسطه خط',
			'Delete': 'حذف التعليق التوضيحي',
			'Opacity': 'غموض',
			'Color edit': 'غير اللون',
			'Opacity edit': 'تغيير التعتيم',
			'Highlight context': 'تسليط الضوء',
			'Underline context': 'أكد',
			'Strikethrough context': 'يتوسطه',
			'Open text': 'افتح',
			'First text': 'الصفحة الأولى',
			'Previous text': 'الصفحة السابقة',
			'Next text': 'الصفحة التالية',
			'Last text': 'آخر صفحة',
			'Zoom in text': 'تكبير',
			'Zoom out text': 'تصغير',
			'Selection text': 'اختيار',
			'Pan text': 'مقلاة',
			'Print text': 'طباعة',
			'Search text': 'بحث',
			'Annotation Edit text': 'تحرير التعليق التوضيحي'
        }
    }
});
export class RightToLeft extends SampleBase<{}, {}> {
  render() {
    return ( <div>
        <div className='control-section'>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent id="container" documentPath="RTLText.pdf" serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer" enableRtl={true} locale='ar-AE' style={{ 'height': '640px' }}  >
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation]} />
            </PdfViewerComponent>
          </div>
        <div id="action-description">
        <p>RTL provides an option to switch the text direction and layout of the PDF Viewer from right to left. It improves the user experiences and accessibility for users who use right-to-left languages (Arabic, Farsi, Urdu, etc.). To enable RTL PDF Viewer, set the enableRtl to true.</p>
        </div>
 
        <div id="description">
        <p>
        In this example, you can see PDF Viewer right-to-left and the locale set in arabic[locale value is ar-AE]
        </p>
        <p>
        By default, locale value is en-US. If you want to change the en-US culture to a different culture, you have to change the locale accordingly.
        </p>
        <p>
        More information on the PDF Viewer features can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started/">
        documentation section
        </a>.
        </p>
        </div>
        </div>
    );
  }
}