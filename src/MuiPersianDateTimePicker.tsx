import * as React from 'react';
import DateTimeTextField from './DateTimeTextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import CalendarIcon from '@material-ui/icons/CalendarTodayTwoTone';
import IconButton from '@material-ui/core/IconButton';
import Calendar from './Calendar';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import compose from 'recompose/compose';
import * as moment_ from 'moment';

const moment = moment_;

interface ComponentProps extends FinalComponentProps {
    fullScreen: boolean;
}

interface FinalComponentProps {
    label?: string;
    name: string;
    autoFocus?: boolean;
    setFieldValue?: (field: any, value: any) => void;
    setFieldTouched?: (field: any) => void;
    required?: boolean;
    fullWidth?: boolean;
    value: Date | null;
    helperText?: string;
    error?: boolean;
    margin?: "dense" | "none" | "normal";
    variant?: 'standard' | 'outlined' | 'filled';
    inputMode?: 'datetime' | 'date';
}

interface ComponentState {
    calendarDialogOpen: boolean;
    calendarDate: Date;
    inputDate: Date | null;
}

class MuiPersianDateTimePicker extends React.Component<ComponentProps, ComponentState> {
    public static defaultProps: Partial<ComponentProps> = {
        required: false,
        autoFocus: false,
        helperText: undefined,
        error: undefined,
        fullWidth: true,
        margin: "none",
        variant: 'standard',
        inputMode: 'datetime',
    };

    constructor(props: ComponentProps) {
        super(props);
        Date.prototype.toISOString = function () {
            return moment(this).format("YYYY-MM-DDTHH:mm:ss");
        };
        this.state = {
            calendarDialogOpen: false,
            inputDate: this.props.value ? (typeof (this.props.value) === "string" ? new Date(this.props.value) : this.props.value) : null,
            calendarDate: this.getNewDate()
        };
    }

    public openCalendarDialog = () => {
        this.setState((currentState) => ({
            calendarDate: currentState.inputDate || this.getNewDate(),
            calendarDialogOpen: true,
        }));
    };

    public getNewDate() {
        const t = new Date();
        return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
    }

    public cancelCalendarDialog = () => {
        this.setState({
            calendarDialogOpen: false
        });
    };

    public okCalendarDialog = () => {
        this.setState((currentState) => ({
            calendarDialogOpen: false,
            inputDate: currentState.calendarDate
        }));
    };

    public saveInputDate = (date: Date) => {
        this.setState({
            inputDate: date
        });
    };

    public saveCalendarDate = (date: Date) => {
        this.setState({
            calendarDate: date,
        });
    };

    public setCalendarDateToday = () => {
        this.setState({
            calendarDate: new Date(),
        });
    };

    public render() {
        const { name, required, label, autoFocus, setFieldValue, setFieldTouched, error, fullScreen, fullWidth, margin, variant, helperText, inputMode } = this.props;
        const { calendarDialogOpen, calendarDate, inputDate } = this.state;
        return <React.Fragment>
            <DateTimeTextField
                name={name}
                value={inputDate}
                autoFocus={autoFocus ? true : false}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                onDateChange={this.saveInputDate}
                endAdornment={<InputAdornment position="end"><IconButton onClick={this.openCalendarDialog}><CalendarIcon /></IconButton></InputAdornment>}
                error={error || false}
                helperText={helperText || ""}
                required={required ? true : false}
                fullWidth={fullWidth ? true : false}
                margin={margin ? margin : 'none'}
                label={label ? label : ''}
                variant={variant ? variant : 'standard'}
                inputMode={inputMode || 'datetime'}
            />
            <Dialog
                key={`date-input-dialog-${name}`}
                open={calendarDialogOpen}
                onClose={this.cancelCalendarDialog}
                fullScreen={fullScreen}
            >
                <DialogContent>
                    <Calendar onDateChange={this.saveCalendarDate} date={calendarDate} inputMode={inputMode || 'datetime'} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.okCalendarDialog} color="primary">
                        تایید
                    </Button>
                    <Button onClick={this.setCalendarDateToday}>
                        امروز
                    </Button>
                    <Button onClick={this.cancelCalendarDialog}>
                        بستن
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>;
    }
}

export default compose<ComponentProps, FinalComponentProps>(
    withMobileDialog({ breakpoint: 'xs' })
)(MuiPersianDateTimePicker);