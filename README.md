# mui-persian-datetime-picker

> react material-ui persian datetime picker

[![NPM](https://img.shields.io/npm/v/mui-persian-datetime-picker.svg)](https://www.npmjs.com/package/mui-persian-datetime-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add mui-persian-datetime-picker
npm install --save mui-persian-datetime-picker
```

## Usage

```tsx
import * as React from 'react'

import PersianDateTimePicker from 'mui-persian-datetime-picker'

class Example extends React.Component {
  render () {
    return (
      <PersianDateTimePicker name="dateTime" label="My date time" inputMode="datetime" fullWidth />
    )
  }
}
```

## Props
```
value             Date
inputMode        'datetime' | 'date'
label             material-ui TextField label
name              material-ui TextField name
autoFocus         material-ui TextField autoFocus
required          material-ui TextField required
fullWidth         material-ui TextField fullWidth
helperText        material-ui TextField helperText
error             material-ui TextField error
margin            material-ui TextField margin
variant           material-ui TextField variant
```

## License

MIT © [KarimFereidooni](https://github.com/KarimFereidooni)
