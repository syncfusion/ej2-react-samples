import { ISparklineLoadEventArgs, SparklineTheme } from "@syncfusion/ej2-react-charts";
import { EmitType } from "@syncfusion/ej2/base";

export let loadSparkLineTheme: EmitType<ISparklineLoadEventArgs> = (args: ISparklineLoadEventArgs): string => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Tailwind3';
    args.sparkline.theme = <SparklineTheme>(theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    return args.sparkline.theme
};