import { createElement, Component, Fragment } from 'react';
import * as jMoment_ from 'moment-jalaali';
import Grid from '@material-ui/core/Grid';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputMask from 'react-input-mask';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputAdornment from '@material-ui/core/InputAdornment';
import CalendarIcon from '@material-ui/icons/CalendarTodayTwoTone';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import compose from 'recompose/compose';
import * as moment_ from 'moment';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var jMoment = jMoment_;
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props) {
        var _this = _super.call(this, props) || this;
        _this.dateTimeIsEqual = function (d1, d2) {
            return d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate() &&
                d1.getHours() === d2.getHours() &&
                d1.getMinutes() === d2.getMinutes();
        };
        _this.onDateClick = function (v, fireOnDateChange) {
            if (fireOnDateChange === void 0) { fireOnDateChange = true; }
            return function () {
                var value = jMoment(jMoment(v).format("jYYYY/jMM/jDD") + " " + _this.state.selectedTime, "jYYYY/jMM/jDD HH:mm").toDate();
                if (_this.state.selectedDate !== value) {
                    _this.setState({ selectedDate: value, currentMonth: value });
                    if (fireOnDateChange && _this.props.onDateChange) {
                        _this.props.onDateChange(value);
                    }
                }
            };
        };
        _this.onTimeChange = function (e) {
            if (_this.state.selectedTime !== e.target.value) {
                _this.setState({ selectedTime: e.target.value || '00:00' }, function () {
                    _this.onDateClick(_this.state.selectedDate)();
                });
            }
        };
        _this.nextMonth = function () {
            _this.setState({
                currentMonth: jMoment(_this.state.currentMonth).add(1, 'jMonth').toDate()
            });
        };
        _this.prevMonth = function () {
            _this.setState({
                currentMonth: jMoment(_this.state.currentMonth).subtract(1, 'jMonth').toDate()
            });
        };
        _this.state = {
            selectedDate: _this.props.date,
            currentMonth: _this.props.date,
            selectedTime: _this.props.inputMode === 'datetime' ? jMoment(_this.props.date).format("HH:mm") : '00:00',
        };
        return _this;
    }
    Calendar.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.date && !this.dateTimeIsEqual(nextProps.date, this.props.date)) {
            this.onDateClick(nextProps.date)();
        }
    };
    Calendar.prototype.renderHeader = function () {
        var currentMonth = this.state.currentMonth;
        var m = jMoment(currentMonth);
        return (createElement(Grid, { container: true, spacing: 8, direction: "row", justify: "space-between", alignItems: "center", wrap: "nowrap" },
            createElement(Grid, { item: true },
                createElement(IconButton, { onClick: this.prevMonth },
                    createElement(ArrowRightIcon, null))),
            createElement(Grid, { item: true },
                createElement(Button, { size: "small", variant: "text" }, m.format('jMMMM')),
                createElement(Button, { size: "small", variant: "text" }, m.format('jYYYY'))),
            createElement(Grid, { item: true },
                createElement(IconButton, { onClick: this.nextMonth },
                    createElement(ArrowLeftIcon, null)))));
    };
    Calendar.prototype.renderTimePicker = function () {
        return createElement(TextField, { fullWidth: true, type: "time", value: this.state.selectedTime, onChange: this.onTimeChange });
    };
    Calendar.prototype.renderDays = function () {
        var currentMonth = this.state.currentMonth;
        var m = jMoment(currentMonth);
        var days = [];
        var startDate = m.startOf('week');
        for (var i = 0; i < 7; i++) {
            days.push(createElement(Grid, { item: true, key: i },
                createElement(Button, { size: "small", style: { minWidth: 0 }, variant: "text" }, startDate.clone().add(i, 'day').format('dd'))));
        }
        return createElement(Grid, { container: true, spacing: 8, direction: "row", justify: "space-between", alignItems: "center", wrap: "nowrap" }, days);
    };
    Calendar.prototype.renderCells = function (currentMonth) {
        var selectedDate = this.state.selectedDate;
        var m = jMoment(currentMonth);
        var monthStart = m.startOf('jMonth');
        var monthEnd = monthStart.clone().endOf('jMonth');
        var startDate = monthStart.clone().startOf('week');
        var endDate = monthEnd.clone().endOf('week');
        var rows = [];
        var days = [];
        var day = startDate.clone();
        var key = 1;
        while (day <= endDate) {
            for (var i = 0; i < 7; i++) {
                var isCurrent = this.isEqualDate(day.toDate(), new Date());
                var isSelected = this.isEqualDate(day.toDate(), selectedDate);
                days.push(createElement(Grid, { item: true, key: i },
                    createElement(Button, { size: "small", style: { minWidth: 0 }, onClick: this.onDateClick(day.toDate()), variant: isSelected ? 'contained' : 'text', color: (isSelected || isCurrent) ? 'primary' : 'default' }, day.jDate())));
                day = day.add(1, 'day');
            }
            rows.push(createElement(Grid, { key: key, container: true, spacing: 8, direction: "row", justify: "space-between", alignItems: "center", wrap: "nowrap" }, days));
            days = [];
            key++;
        }
        return createElement("div", null, rows);
    };
    Calendar.prototype.isEqualDate = function (a, b) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    };
    Calendar.prototype.render = function () {
        var currentMonth = this.state.currentMonth;
        return createElement("div", null,
            this.renderHeader(),
            this.renderTimePicker(),
            this.renderDays(),
            this.renderCells(currentMonth));
    };
    return Calendar;
}(Component));

var jMoment$1 = jMoment_;
var DateTimeTextField = /** @class */ (function (_super) {
    __extends(DateTimeTextField, _super);
    function DateTimeTextField(props) {
        var _this = _super.call(this, props) || this;
        _this.dateTimeIsEqual = function (d1, d2) {
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
        };
        _this.onChange = function (e) {
            if (!e.target.value || e.target.value === '13--/--/-- --:--') {
                _this.handleChange(_this.defaultValue);
            }
            else {
                _this.handleChange(e.target.value, true);
            }
        };
        _this.onFocus = function () {
            if (!_this.state.value) {
                _this.handleChange(_this.defaultValue);
            }
        };
        _this.handleChange = function (value, fireOnDateChange) {
            if (fireOnDateChange === void 0) { fireOnDateChange = true; }
            if (value === _this.state.value) {
                return;
            }
            _this.setState({ value: value });
            var result = _this.getDateValue(value);
            if (_this.props.setFieldValue) {
                _this.props.setFieldValue(_this.props.name, result);
            }
            if (fireOnDateChange && _this.props.onDateChange && result) {
                _this.props.onDateChange(result);
            }
            _this.setState({
                dateValue: result
            });
        };
        _this.getDateValue = function (value) {
            if (!value) {
                return null;
            }
            if (value.indexOf('-') >= 0) {
                return null;
            }
            var m = jMoment$1(value, _this.dateFormat);
            return m.isValid() ? m.toDate() : null;
        };
        _this.onBlur = function () {
            if (_this.state.value === _this.defaultValue) {
                _this.handleChange('');
            }
            if (_this.props.setFieldTouched) {
                _this.props.setFieldTouched(_this.props.name);
            }
        };
        _this.dateFormat = _this.props.inputMode === 'datetime' ? 'jYYYY/jMM/jDD HH:mm' : 'jYYYY/jMM/jDD';
        _this.defaultValue = _this.props.inputMode === 'datetime' ? '13--/--/-- 00:00' : '13--/--/--';
        _this.state = {
            value: (_this.props.value) ? jMoment$1(_this.props.value).format(_this.dateFormat) : '',
            dateValue: _this.props.value,
        };
        if (_this.props.onDateChange && _this.props.value) {
            _this.props.onDateChange(_this.props.value);
        }
        return _this;
    }
    DateTimeTextField.prototype.componentWillReceiveProps = function (nextProps) {
        if (!this.dateTimeIsEqual(nextProps.value, this.props.value)) {
            if (nextProps.value) {
                this.handleChange(jMoment$1(nextProps.value).format(this.dateFormat), false);
            }
            else {
                this.handleChange('', false);
            }
        }
    };
    DateTimeTextField.prototype.render = function () {
        var _this = this;
        var _a = this.props, name = _a.name, endAdornment = _a.endAdornment, autoFocus = _a.autoFocus, label = _a.label, error = _a.error, required = _a.required, fullWidth = _a.fullWidth, margin = _a.margin, variant = _a.variant, helperText = _a.helperText;
        return createElement(InputMask, { maskChar: "-", mask: this.props.inputMode === "datetime" ? '1399/99/99 99:99' : '1399/99/99', value: this.state.value, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus }, function (inputProps) {
            return createElement(TextField, __assign({}, inputProps, {
                variant: variant
            }, { name: name, required: required, type: "text", error: error, fullWidth: fullWidth, label: label, helperText: helperText ? helperText : (_this.state.dateValue ? (jMoment$1(_this.state.dateValue).format('dddd، jDD jMMMM jYYYY')) : ""), margin: margin, InputProps: { endAdornment: endAdornment }, inputProps: {
                    style: { textAlign: 'right', direction: 'ltr' }
                }, autoFocus: autoFocus, placeholder: _this.props.inputMode === "datetime" ? '13--/--/-- 00:00' : '13--/--/--' }));
        });
    };
    return DateTimeTextField;
}(Component));

var moment = moment_;
var MuiPersianDateTimePicker = /** @class */ (function (_super) {
    __extends(MuiPersianDateTimePicker, _super);
    function MuiPersianDateTimePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.openCalendarDialog = function () {
            _this.setState(function (currentState) { return ({
                calendarDate: currentState.inputDate || _this.getNewDate(),
                calendarDialogOpen: true,
            }); });
        };
        _this.cancelCalendarDialog = function () {
            _this.setState({
                calendarDialogOpen: false
            });
        };
        _this.okCalendarDialog = function () {
            _this.setState(function (currentState) { return ({
                calendarDialogOpen: false,
                inputDate: currentState.calendarDate
            }); });
        };
        _this.saveInputDate = function (date) {
            _this.setState({
                inputDate: date
            });
        };
        _this.saveCalendarDate = function (date) {
            _this.setState({
                calendarDate: date,
            });
        };
        _this.setCalendarDateToday = function () {
            _this.setState({
                calendarDate: new Date(),
            });
        };
        Date.prototype.toISOString = function () {
            return moment(this).format("YYYY-MM-DDTHH:mm:ss");
        };
        _this.state = {
            calendarDialogOpen: false,
            inputDate: _this.props.value ? (typeof (_this.props.value) === "string" ? new Date(_this.props.value) : _this.props.value) : null,
            calendarDate: _this.getNewDate()
        };
        return _this;
    }
    MuiPersianDateTimePicker.prototype.getNewDate = function () {
        var t = new Date();
        return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
    };
    MuiPersianDateTimePicker.prototype.render = function () {
        var _a = this.props, name = _a.name, required = _a.required, label = _a.label, autoFocus = _a.autoFocus, setFieldValue = _a.setFieldValue, setFieldTouched = _a.setFieldTouched, error = _a.error, fullScreen = _a.fullScreen, fullWidth = _a.fullWidth, margin = _a.margin, variant = _a.variant, helperText = _a.helperText, inputMode = _a.inputMode;
        var _b = this.state, calendarDialogOpen = _b.calendarDialogOpen, calendarDate = _b.calendarDate, inputDate = _b.inputDate;
        return createElement(Fragment, null,
            createElement(DateTimeTextField, { name: name, value: inputDate, autoFocus: autoFocus ? true : false, setFieldValue: setFieldValue, setFieldTouched: setFieldTouched, onDateChange: this.saveInputDate, endAdornment: createElement(InputAdornment, { position: "end" },
                    createElement(IconButton, { onClick: this.openCalendarDialog },
                        createElement(CalendarIcon, null))), error: error || false, helperText: helperText || "", required: required ? true : false, fullWidth: fullWidth ? true : false, margin: margin ? margin : 'none', label: label ? label : '', variant: variant ? variant : 'standard', inputMode: inputMode || 'datetime' }),
            createElement(Dialog, { key: "date-input-dialog-" + name, open: calendarDialogOpen, onClose: this.cancelCalendarDialog, fullScreen: fullScreen },
                createElement(DialogContent, null,
                    createElement(Calendar, { onDateChange: this.saveCalendarDate, date: calendarDate, inputMode: inputMode || 'datetime' })),
                createElement(DialogActions, null,
                    createElement(Button, { onClick: this.okCalendarDialog, color: "primary" }, "\u062A\u0627\u06CC\u06CC\u062F"),
                    createElement(Button, { onClick: this.setCalendarDateToday }, "\u0627\u0645\u0631\u0648\u0632"),
                    createElement(Button, { onClick: this.cancelCalendarDialog }, "\u0628\u0633\u062A\u0646"))));
    };
    MuiPersianDateTimePicker.defaultProps = {
        required: false,
        autoFocus: false,
        helperText: undefined,
        error: undefined,
        fullWidth: true,
        margin: "none",
        variant: 'standard',
        inputMode: 'datetime',
    };
    return MuiPersianDateTimePicker;
}(Component));
var MuiPersianDateTimePicker$1 = compose(withMobileDialog({ breakpoint: 'xs' }))(MuiPersianDateTimePicker);

export default MuiPersianDateTimePicker$1;
export { DateTimeTextField, Calendar };
//# sourceMappingURL=index.es.js.map
