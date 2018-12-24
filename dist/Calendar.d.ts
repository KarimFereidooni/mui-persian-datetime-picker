import * as React from 'react';
interface ComponentProps {
    date: Date;
    inputMode: 'datetime' | 'date';
    onDateChange?: (date: Date) => void;
}
interface ComponentState {
    selectedDate: Date;
    selectedTime: string;
    currentMonth: Date;
}
declare class Calendar extends React.Component<ComponentProps, ComponentState> {
    constructor(props: ComponentProps);
    componentWillReceiveProps(nextProps: ComponentProps): void;
    dateTimeIsEqual: (d1: Date, d2: Date) => boolean;
    onDateClick: (v: Date, fireOnDateChange?: boolean) => () => void;
    renderHeader(): JSX.Element;
    onTimeChange: (e: any) => void;
    renderTimePicker(): JSX.Element;
    renderDays(): JSX.Element;
    renderCells(currentMonth: Date): JSX.Element;
    isEqualDate(a: Date, b: Date): boolean;
    nextMonth: () => void;
    prevMonth: () => void;
    render(): JSX.Element;
}
export default Calendar;
