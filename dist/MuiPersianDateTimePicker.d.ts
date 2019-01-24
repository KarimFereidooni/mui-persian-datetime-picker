import * as React from 'react';
interface ComponentProps {
    label?: string;
    name?: string;
    autoFocus?: boolean;
    setFieldValue?: (field: string, value: Date) => void;
    setFieldTouched?: (field: string) => void;
    onChange?: (value: Date | null) => void;
    onBlur?: () => void;
    required?: boolean;
    fullWidth?: boolean;
    value: Date | null;
    helperText?: string;
    error?: boolean;
    margin?: "dense" | "none" | "normal";
    variant?: 'standard' | 'outlined' | 'filled';
    inputMode?: 'datetime' | 'date';
    className?: string;
    style?: React.CSSProperties;
}
interface ComponentState {
    calendarDialogOpen: boolean;
    calendarDate: Date;
    inputDate: Date | null;
}
declare class MuiPersianDateTimePicker extends React.Component<ComponentProps, ComponentState> {
    static defaultProps: Partial<ComponentProps>;
    constructor(props: ComponentProps);
    openCalendarDialog: () => void;
    getNewDate(): Date;
    cancelCalendarDialog: () => void;
    okCalendarDialog: () => void;
    saveInputDate: (date: Date) => void;
    saveCalendarDate: (date: Date) => void;
    setCalendarDateToday: () => void;
    render(): JSX.Element;
}
export default MuiPersianDateTimePicker;
