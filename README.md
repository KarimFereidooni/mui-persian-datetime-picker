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
#### value
- `Date`

#### inputMode
- `'datetime' | 'date'`

#### onChange
- `(Date | null) => void`

#### onBlur
- `() => void`

#### label
- like material-ui TextField label property

#### name
- like material-ui TextField name property

#### autoFocus
- like material-ui TextField autoFocus property

#### required
- like material-ui TextField required property

#### fullWidth
- like material-ui TextField fullWidth property

#### helperText
- like material-ui TextField helperText property

#### error
- like material-ui TextField error property

#### margin
- like material-ui TextField margin property

#### variant
- like material-ui TextField variant property


## License

MIT © [KarimFereidooni](https://github.com/KarimFereidooni)
