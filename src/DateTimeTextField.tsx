import * as React from 'react';
import * as jMoment_ from 'moment-jalaali';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';

const jMoment = jMoment_;

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

class DateTimeTextField extends React.Component<ComponentProps, ComponentState> {
    private dateFormat: string;
    private defaultValue: string;

    public constructor(props: ComponentProps) {
        super(props);
        this.dateFormat = this.props.inputMode === 'datetime' ? 'jYYYY/jMM/jDD HH:mm' : 'jYYYY/jMM/jDD';
        this.defaultValue = this.props.inputMode === 'datetime' ? '13--/--/-- 00:00' : '13--/--/--';
        this.state = {
            value: (this.props.value) ? jMoment(this.props.value).format(this.dateFormat) : '',
            dateValue: this.props.value,
        };
        if (this.props.onDateChange && this.props.value) {
            this.props.onDateChange(this.props.value);
        }
    }

    public componentWillReceiveProps(nextProps: ComponentProps) {
        if (!this.dateTimeIsEqual(nextProps.value, this.props.value)) {
            if (nextProps.value) {
                this.handleChange(jMoment(nextProps.value).format(this.dateFormat), false);
            }
            else {
                this.handleChange('', false);
            }
        }
    }

    public dateTimeIsEqual = (d1: Date | null, d2: Date | null) => {
        if (!d1 && !d2) {
            return true;
        }
        if (d1 && d2) {
            return d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate() &&
                d1.getHours() === d2.getHours() &&
                d1.getMinutes() === d2.getMinutes();
        }
        return false;
    }

    private onChange = (e) => {
        if (!e.target.value || e.target.value === '13--/--/-- --:--') {
            this.handleChange(this.defaultValue);
        }
        else {
            this.handleChange(e.target.value, true);
        }
    };

    public render() {
        const { name, endAdornment, autoFocus, label, error, required, fullWidth, margin, variant, helperText, className, style } = this.props;
        return <InputMask maskChar="-" mask={this.props.inputMode === "datetime" ? '1399/99/99 99:99' : '1399/99/99'} value={this.state.value} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus}>
            {(inputProps) =>
                <TextField
                    {...inputProps}
                    {...{
                        variant
                    } as any}
                    name={name}
                    required={required}
                    type="text"
                    className={className}
                    style={style}
                    error={error}
                    fullWidth={fullWidth}
                    label={label}
                    helperText={helperText ? helperText : (this.state.dateValue ? (jMoment(this.state.dateValue).format('dddd، jDD jMMMM jYYYY')) : "")}
                    margin={margin}
                    InputProps={{ endAdornment }}
                    inputProps={{
                        style: { textAlign: 'right', direction: 'ltr' }
                    }
                    }
                    autoFocus={autoFocus}
                    placeholder={this.props.inputMode === "datetime" ? '13--/--/-- 00:00' : '13--/--/--'}
                />
            }
        </InputMask>;
    }

    private onFocus = () => {
        if (!this.state.value) {
            this.handleChange(this.defaultValue);
        }
    };

    private handleChange = (value: string, fireOnDateChange: boolean = true) => {
        if (value === this.state.value) {
            return;
        }
        this.setState({ value });
        const result: Date | null = this.getDateValue(value);
        if (this.props.setFieldValue) {
            this.props.setFieldValue(this.props.name as string, result);
        }
        if (this.props.onChange) {
            this.props.onChange(result);
        }
        if (fireOnDateChange && this.props.onDateChange && result) {
            this.props.onDateChange(result);
        }
        this.setState({
            dateValue: result
        });
    };

    private getDateValue = (value: string): Date | null => {
        if (!value) {
            return null;
        }
        if (value.indexOf('-') >= 0) {
            return null;
        }
        const m = jMoment(value, this.dateFormat);
        return m.isValid() ? m.toDate() : null;
    };

    private onBlur = () => {
        if (this.state.value === this.defaultValue) {
            this.handleChange('');
        }
        if (this.props.setFieldTouched) {
            this.props.setFieldTouched(this.props.name);
        }
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    };
}

export default DateTimeTextField;