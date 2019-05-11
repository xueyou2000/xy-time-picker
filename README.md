| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-time-picker.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-time-picker.svg?style=flat-square)

[![xy-time-picker](https://nodei.co/npm/xy-time-picker.png)](https://npmjs.org/package/xy-time-picker)

# xy-time-picker

时间选择器组件

## 安装

```bash
# yarn
yarn add xy-time-picker classnames utils-hooks utils-dom @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome xy-trigger xy-input
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { TimePicker, TimePickerPanel, PickerNumber, PickerCombobox } from "xy-time-picker";
ReactDOM.render(<TimePicker />, container);
```

## API

### TimePicker

> 其他属性均与`TimePickerPanel`相同

| 属性            | 说明                 | 类型                       | 默认值 |
| --------------- | -------------------- | -------------------------- | ------ |
| visible         | 是否显示下拉面板     | boolean                    | false  |
| defaultVisible  | 默认是否显示下拉面板 | boolean                    | false  |
| onVisibleChange | 改变事件             | (visible: boolean) => void | -      |

### TimePickerPanel

> 其他属性均与`PickerCombobox`相同

| 属性        | 说明               | 类型                                                                | 默认值 |
| ----------- | ------------------ | ------------------------------------------------------------------- | ------ |
| addon       | 底部附加内容       | React.ReactNode                                                     | -      |
| onChange    | 时间改变           | (time: string) => void                                              | -      |
| placeholder | 输入框占位符       | string                                                              | -      |
| disabled    | 是否禁用           | boolean                                                             | false  |
| onFocus     | 输入框焦点事件     | (e: React.FocusEvent<HTMLInputElement,HTMLTextAreaElement>) => void | -      |
| onBlur      | 输入框失去焦点事件 | (e: React.FocusEvent<HTMLInputElement,HTMLTextAreaElement>) => void | -      |

### PickerCombobox

> 其他属性均与`PickerCombobox`相同

| 属性               | 说明                                       | 类型                                                      | 默认值     |
| ------------------ | ------------------------------------------ | --------------------------------------------------------- | ---------- |
| value              | 当前时间字符串(时分秒)                     | string                                                    | -          |
| defaultValue       | 默认时间字符串(时分秒)                     | string                                                    | -          |
| onPicker           | onPicker 事件                              | (value: string, hourSystem: number) => void               | -          |
| hourSystem         | 小时制,0=24 小时制, 1=12 小时制            | number                                                    | 0          |
| defaultHourSystem  | 默认小时制,0=24 小时制, 1=12 小时制        | number                                                    | 0          |
| onHourSystemChange | 小时制改变                                 | (hourSystem: number) => void                              | -          |
| format             | 展示的时间格式,可选值为 `HH:mm:ss` `HH:mm` | string                                                    | `HH:mm:ss` |
| hourStep           | 小时步长间隔                               | number                                                    | 1          |
| minuteStep         | 分钟步长间隔                               | number                                                    | 1          |
| secondStep         | 秒步长间隔                                 | number                                                    | 1          |
| showHourSystem     | 是否显示小时制控制                         | boolean                                                   | false      |
| disabledHours      | 禁用小时部分                               | () => boolean                                             | -          |
| disabledMinutes    | 禁用分钟部分                               | (selectedHour: number) => boolean                         | -          |
| disabledSeconds    | 禁用秒部分                                 | (selectedHour: number, selectedMinute: number) => boolean | -          |

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-time-picker is released under the MIT license.
