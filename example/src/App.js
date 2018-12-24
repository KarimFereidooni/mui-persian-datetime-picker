import React, { Component } from 'react'

import PersianDateTimePicker from 'mui-persian-datetime-picker'

export default class App extends Component {
  render () {
    return (
      <div>
        <PersianDateTimePicker name="dateTime" label="تاریخ" inputMode="datetime" fullWidth />
      </div>
    )
  }
}
