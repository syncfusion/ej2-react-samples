/**
 * Default NumericTextBox sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer, Inject
} from '@syncfusion/ej2-react-pdfviewer';
import { updateSampleSection } from '../common/sample-base';
import { L10n } from '@syncfusion/ej2-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';

L10n.load({
    'ar-AE': {
        'PdfViewer': {
            'PdfViewer': 'قوات الدفاع الشعبي المشاهد',
            'Cancel': 'إلغاء',
            'Download file': 'تحميل الملف',
            'Download': 'تحميل',
            'Enter Password': 'هذا المستند محمي بكلمة مرور. يرجى إدخال كلمة مرور.',
            'File Corrupted': 'ملف تالف',
            'File Corrupted Content': 'الملف تالف ولا يمكن فتحه.',
            'Fit Page': 'لائق بدنيا الصفحة',
            'Fit Width': 'لائق بدنيا عرض',
            'Automatic': 'تلقائي',
            'Go To First Page': 'عرض الصفحة الأولى',
            'Invalid Password': 'كلمة سر خاطئة. حاول مرة اخرى.',
            'Next Page': 'عرض الصفحة التالية',
            'OK': 'حسنا',
            'Open': 'فتح الملف',
            'Page Number': 'رقم الصفحة الحالية',
            'Previous Page': 'عرض الصفحة السابقة',
            'Go To Last Page': 'عرض الصفحة الأخيرة',
            'Zoom': 'تكبير',
            'Zoom In': 'تكبير في',
            'Zoom Out': 'تكبير خارج',
            'Page Thumbnails': 'مصغرات الصفحة',
            'Bookmarks': 'المرجعية',
            'Print': 'اطبع الملف',
            'Password Protected': 'كلمة المرور مطلوبة',
            'Copy': 'نسخ',
            'Text Selection': 'أداة اختيار النص',
            'Panning': 'وضع عموم',
            'Text Search': 'بحث عن نص',
            'Find in document': 'ابحث في المستند',
            'Match case': 'حالة مباراة',
            'Apply': 'تطبيق',
            'GoToPage': 'انتقل إلى صفحة',
            'No matches': 'انتهى العارض من البحث في المستند. لم يتم العثور على مزيد من التطابقات',
            'No Text Found': 'لم يتم العثور على نص',
            'Undo': 'فك',
            'Redo': 'فعل ثانية',
            'Annotation': 'إضافة أو تعديل التعليقات التوضيحية',
            'Highlight': 'تسليط الضوء على النص',
            'Underline': 'تسطير النص',
            'Strikethrough': 'نص يتوسطه خط',
            'Squiggly': 'نص متعرج',
            'Delete': 'حذف التعليق التوضيحي',
            'Opacity': 'غموض',
            'Color edit': 'غير اللون',
            'Opacity edit': 'تغيير التعتيم',
            'highlight': 'تسليط الضوء',
            'underline': 'أكد',
            'strikethrough': 'يتوسطه',
            'squiggly': 'متعرج',
            // tslint:disable-next-line:max-line-length
            'Server error': 'خدمة الانترنت لا يستمع. يعتمد قوات الدفاع الشعبي المشاهد على خدمة الويب لجميع ميزاته. يرجى بدء خدمة الويب للمتابعة.',
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
            'Seach text': 'بحث',
            'Annotation Edit text': 'تحرير التعليق التوضيحي',
            'Line Thickness': 'سمك الخط',
            'Line Properties': 'خط الخصائص',
            'Start Arrow': 'ابدأ السهم',
            'End Arrow': 'نهاية السهم',
            'Line Style': 'أسلوب الخط',
            'Fill Color': 'ملء اللون',
            'Line Color': ' الخط اللون',
            'None': 'لا شيء',
            'Open Arrow': 'افتح',
            'Closed Arrow': 'مغلق',
            'Round Arrow': 'مستدير',
            'Square Arrow': 'مربع',
            'Diamond Arrow': 'الماس',
            'Cut': 'يقطع',
            'Paste': 'معجون',
            'Delete Context': 'حذف',
            'Properties': 'الخصائص',
            'Add Stamp': 'إضافة الطوابع',
            'Add Shapes': 'أضف الأشكال',
            'Stroke edit': 'تغيير لون السكتة الدماغية',
            'Change thickness': 'تغيير سمك الحدود',
            'Add line': 'إضافة خط',
            'Add arrow': 'سهم إضافة',
            'Add rectangle': 'أضف مستطيل',
            'Add circle': 'إضافة دائرة',
            'Add polygon': 'أضف مضلع',
            'Add Comments': 'أضف تعليقات',
            'Comments': 'تعليقات',
            'No Comments Yet': 'لا توجد تعليقات حتى الآن',
            'Accepted': 'وافقت',
            'Completed': 'منجز',
            'Cancelled': 'ألغيت',
            'Rejected': 'مرفوض',
            'Leader Length': 'زعيم الطول',
            'Scale Ratio': 'نسبة مقياس',
            'Calibrate': 'عاير',
            'Calibrate Distance': 'معايرة المسافة',
            'Calibrate Perimeter': 'معايرة محيط',
            'Calibrate Area': 'عاير منطقة',
            'Calibrate Radius': 'معايرة نصف القطر',
            'Calibrate Volume': 'معايرة الحجم',
            'Depth': 'عمق',
            'Closed': 'مغلق',
            'Round': 'مستدير',
            'Square': 'ميدان',
            'Diamond': 'الماس',
            'Edit': 'تصحيح',
            'Comment': 'تعليقات',
            'Comment Panel': 'لوحة التعليقات',
            'Set Status': 'تعيين الحالة',
            'Post': 'بريد',
            'Page': 'صفحة',
            'Add a comment': 'أضف تعليق',
            'Add a reply': 'أضف رد',
            'Import Annotations': 'استيراد التعليقات التوضيحية',
            'Export Annotations': 'شروح التصدير',
            'Add': 'أضف',
            'Clear': 'واضح',
            'Bold': 'بالخط العريض',
            'Italic': 'مائل',
            'Strikethroughs': 'يتوسطه',
            'Underlines': 'تحت الخط',
            'Superscript': 'حرف فوقي',
            'Subscript': 'الفرعية النصي',
            'Align left': 'محاذاة اليسار',
            'Align right': 'محاذاة اليمين',
            'Center': 'مركز',
            'Justify': 'برر',
            'Font color': 'لون الخط',
            'Text Align': 'محاذاة النص',
            'Text Properties': 'نوع الخط',
            'Draw Signature': 'ارسم التوقيع',
            'Create': 'خلق',
            'Font family': 'خط العائلة',
            'Font size': 'حجم الخط',
            'Free Text': 'نص حر',
            'Import Failed': 'نوع ملف سلمان أو اسم الملف غير صالح ؛ يرجى تحديد ملف سلمانصالح',
            'File not found': 'لم يتم العثور على ملف سلمان المستورد في الموقع المطلوب',
            'Export Failed': 'شل إجراء تصدير التعليقات التوضيحية ؛ يرجى التأكد من إضافة التعليقات التوضيحية بشكل صحيح',
            'Dynamic': 'متحرك',
            'Standard Business': 'الأعمال القياسية',
            'Sign Here': 'وقع هنا',
            'Custom Stamp': 'ختم مخصص',
            'InitialFieldDialogHeaderText': 'إضافة الأولية',
            'HandwrittenInitialDialogHeaderText': 'إضافة الأولية',
            'SignatureFieldDialogHeaderText': 'أضف التوقيع',
            'HandwrittenSignatureDialogHeaderText': 'أضف التوقيع',
            'Draw-hand Signature': 'يرسم',
            'Type Signature': 'نوع',
            'Upload Signature': 'تحميل',
            'Browse Signature Image': 'تصفح',
            'Save Signature': 'احفظ التوقيع',
            'Save Initial': 'حفظ الأولي',
            'Highlight context': 'تسليط الضوء',
            'Underline context': 'تسطير',
            'Strikethrough context': 'يتوسطه خط',
            'Squiggly context': 'نص متعرج',
            'FormDesigner': 'إضافة وتحرير حقل النموذج',
            'SubmitForm': 'تقديم النموذج',
            'Search text': 'بحث',
            'Draw Ink': 'ارسم الحبر',
            'Revised': 'مراجعة',
            'Reviewed': 'تمت المراجعة',
            'Received': 'تم الاستلام',
            'Confidential': 'مؤتمن',
            'Approved': 'وافق',
            'Not Approved': 'غير مقبول',
            'Witness': 'الشاهد',
            'Initial Here': 'المبدئي هنا',
            'Draft': 'مشروع',
            'Final': 'أخير',
            'For Public Release': 'للنشر العام',
            'Not For Public Release': 'ليس للنشر العام',
            'For Comment': 'للتعليق',
            'Void': 'فارغ',
            'Preliminary Results': 'نتائج اولية',
            'Information Only': 'المعلومات فقط',
            'Enter Signature as Name': 'أدخل أسمك',
            'Textbox': 'مربع الكتابة',
            'Password': 'كلمه السر',
            'Check Box': 'خانة اختيار',
            'Radio Button': 'زر الراديو',
            'Dropdown': 'اسقاط',
            'List Box': 'مربع القائمة',
            'Signature': 'إمضاء',
            'Delete FormField': 'حذف حقل النموذج',
            'FormDesigner Edit text': 'إضافة وتحرير حقل النموذج',
            'in': 'في',
            'm': 'م',
            'ft_in': 'قدم',
            'ft': 'قدم',
            'p': 'ص',
            'cm': 'سم',
            'mm': 'مم',
            'pt': 'نقطة',
            'cu': 'مكعب',
            'sq': 'قدم مربع',
            'General': 'جنرال لواء',
            'Appearance': 'مظهر خارجي',
            'Options': 'والخيارات',
            'Textbox Properties': 'خصائص مربع النص',
            'Name': 'اسم',
            'Tooltip': 'تلميح',
            'Value': 'القيمة',
            'Form Field Visibility': 'رؤية حقل النموذج',
            'Read Only': 'يقرأ فقط',
            'Required': 'مطلوب',
            'Checked': 'التحقق',
            'Show Printing': 'عرض الطباعة',
            'Formatting': 'صيغة',
            'Fill': 'يملأ',
            'Border': 'الحدود',
            'Border Color': 'لون الحدود',
            'Thickness': 'السماكة',
            'Max Length': 'الحد الاقصى للطول',
            'List Item': 'اسم العنصر',
            'Export Value': 'قيمة البند',
            'Dropdown Item List': 'قائمة العناصر المنسدلة',
            'List Box Item List': 'قائمة عناصر مربع القائمة',
            'Delete Item': 'حذف',
            'Up': 'فوق',
            'Down': 'تحت',
            'Multiline': 'متعدد الأسطر',
            'Initial': 'أولي',
            'Organize Pages': 'تنظيم الصفحات',
            'Insert Right': 'أدخل الحق',
            'Insert Left': 'أدخل اليسار',
            'Total': 'المجموع',
            'Pages': 'الصفحات',
            'Rotate Right': 'تدوير لليمين',
            'Rotate Left': 'استدر يسارا',
            'Delete Page': 'حذف الصفحة',
            'Delete Pages': 'حذف الصفحات',
            'Copy Page': 'انسخ الصفحة',
            'Copy Pages': 'نسخ الصفحات',
            'Save': 'يحفظ',
            'Save As': 'حفظ باسم',
            'Select All': 'اختر الكل',
            'Import Document': 'استيراد المستند',
            'Match any word': 'تطابق أي كلمة'
        }
    }
});
function RightToLeft() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let viewer: PdfViewerComponent;
    return (<div>
        <div className='control-section'>
            <div className="flex-container">
                <label htmlFor="checked" className="switchLabel" > Standalone PDF Viewer </label>
                <div className="e-message render-mode-info">
                    <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
                </div>
                <SwitchComponent cssClass="buttonSwitch" id="checked" change={change} checked={true}></SwitchComponent>

            </div>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent ref={(scope) => { viewer = scope; }} id="container" documentPath="https://cdn.syncfusion.com/content/pdf/rtl-text.pdf" resourceUrl = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" enableRtl={true} locale='ar-AE' annotationSettings={{ author: 'مقبول' }} style={{ 'height': '640px' }}  >
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer]} />
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
    function change(args){
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://services.syncfusion.com/react/production/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }
}
export default RightToLeft;