import * as React from 'react';
import * as jMoment_ from 'moment-jalaali';
import Grid from '@material-ui/core/Grid';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const jMoment = jMoment_;

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

class Calendar extends React.Component<ComponentProps, ComponentState> {
    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            selectedDate: this.props.date,
            currentMonth: this.props.date,
            selectedTime: this.props.inputMode === 'datetime' ? jMoment(this.props.date).format("HH:mm") : '00:00',
        };
    }

    public componentWillReceiveProps(nextProps: ComponentProps) {
        if (nextProps.date && !this.dateTimeIsEqual(nextProps.date, this.props.date)) {
            this.onDateClick(nextProps.date)();
        }
    }

    public dateTimeIsEqual = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate() &&
            d1.getHours() === d2.getHours() &&
            d1.getMinutes() === d2.getMinutes();
    }

    public onDateClick = (v: Date, fireOnDateChange: boolean = true) => {
        return () => {
            const value = jMoment(jMoment(v).format("jYYYY/jMM/jDD") + " " + this.state.selectedTime, "jYYYY/jMM/jDD HH:mm").toDate();
            if (this.state.selectedDate !== value) {
                this.setState({ selectedDate: value, currentMonth: value });
                if (fireOnDateChange && this.props.onDateChange) {
                    this.props.onDateChange(value);
                }
            }
        };
    };

    public renderHeader() {
        const { currentMonth } = this.state;
        const m = jMoment(currentMonth);
        return (
            <Grid container={true} spacing={8} direction="row" justify="space-between" alignItems="center" wrap="nowrap">
                <Grid item={true}>
                    <IconButton onClick={this.prevMonth}><ArrowRightIcon /></IconButton>
                </Grid>
                <Grid item={true}>
                    <Button size="small" variant="text">{m.format('jMMMM')}</Button>
                    <Button size="small" variant="text">{m.format('jYYYY')}</Button>
                </Grid>
                <Grid item={true}>
                    <IconButton onClick={this.nextMonth}><ArrowLeftIcon /></IconButton>
                </Grid>
            </Grid>
        );
    }

    public onTimeChange = (e: any) => {
        if (this.state.selectedTime !== e.target.value) {
            this.setState({ selectedTime: e.target.value || '00:00' }, () => {
                this.onDateClick(this.state.selectedDate)();
            });
        }
    }

    public renderTimePicker() {
        return <TextField fullWidth type="time" value={this.state.selectedTime} onChange={this.onTimeChange} />;
    }

    public renderDays() {
        const { currentMonth } = this.state;
        const m = jMoment(currentMonth);
        const days: any = [];
        const startDate = m.startOf('week');
        for (let i = 0; i < 7; i++) {
            days.push(
                <Grid item={true} key={i}>
                    <Button size="small" style={{ minWidth: 0 }} variant="text">{startDate.clone().add(i, 'day').format('dd')}</Button>
                </Grid>
            );
        }
        return <Grid container={true} spacing={8} direction="row" justify="space-between" alignItems="center" wrap="nowrap">
            {days}
        </Grid>;
    }

    public renderCells(currentMonth: Date) {
        const { selectedDate } = this.state;
        const m = jMoment(currentMonth);
        const monthStart = m.startOf('jMonth');
        const monthEnd = monthStart.clone().endOf('jMonth');
        const startDate = monthStart.clone().startOf('week');
        const endDate = monthEnd.clone().endOf('week');
        const rows: any = [];
        let days: any[] = [];
        let day = startDate.clone();
        let key: number = 1;
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const isCurrent = this.isEqualDate(day.toDate(), new Date());
                const isSelected = this.isEqualDate(day.toDate(), selectedDate);
                days.push(
                    <Grid item={true} key={i}>
                        <Button size="small" style={{ minWidth: 0 }} onClick={this.onDateClick(day.toDate())} variant={isSelected ? 'contained' : 'text'} color={(isSelected || isCurrent) ? 'primary' : 'default'}>{day.jDate()}</Button >
                    </Grid>
                );
                day = day.add(1, 'day');
            }
            rows.push(
                <Grid key={key} container={true} spacing={8} direction="row" justify="space-between" alignItems="center" wrap="nowrap">
                    {days}
                </Grid>
            );
            days = [];
            key++;
        }
        return <div>
            {rows}
        </div>;
    }

    public isEqualDate(a: Date, b: Date) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }

    public nextMonth = () => {
        this.setState({
            currentMonth: jMoment(this.state.currentMonth).add(1, 'jMonth').toDate()
        });
    };

    public prevMonth = () => {
        this.setState({
            currentMonth: jMoment(this.state.currentMonth).subtract(1, 'jMonth').toDate()
        });
    };

    public render() {
        const { currentMonth } = this.state;
        return <div>
            {this.renderHeader()}
            {this.renderTimePicker()}
            {this.renderDays()}
            {this.renderCells(currentMonth)}
        </div>;
    }
}

export default Calendar;