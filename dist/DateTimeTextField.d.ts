import * as React from 'react';
interface ComponentProps {
    name?: string;
    label: string;
    value: Date | null;
    endAdornment: React.ReactNode;
    autoFocus: boolean;
    setFieldValue?: (field: any, value: any) => void;
    setFieldTouched?: (field: any) => void;
    onChange?: (value: Date | null) => void;
    onBlur?: () => void;
    onDateChange?: (dateValue: Date) => void;
    required: boolean;
    fullWidth: boolean;
    error: boolean;
    helperText: string;
    margin: "dense" | "none" | "normal";
    variant: 'standard' | 'outlined' | 'filled';
    inputMode: 'datetime' | 'date';
    className?: string;
    style?: React.CSSProperties;
}
interface ComponentState {
    value: string;
    dateValue: Date | null;
}
declare class DateTimeTextField extends React.Component<ComponentProps, ComponentState> {
    private dateFormat;
    private defaultValue;
    constructor(props: ComponentProps);
    componentWillReceiveProps(nextProps: ComponentProps): void;
    dateTimeIsEqual: (d1: Date | null, d2: Date | null) => boolean;
    private onChange;
    render(): JSX.Element;
    private onFocus;
    private handleChange;
    private getDateValue;
    private onBlur;
}
export default DateTimeTextField;
