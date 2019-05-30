import classNames from "classnames";
import React, { useCallback, useRef } from "react";
import { useControll } from "utils-hooks";
import { formatDate, isTime, timeParse } from "utils-dom";
import { PickerComboboxProps, PickerNumberOption, PickerNumberType } from "./interface";
import PickerNumber from "./PickerNumber";

const HOUR_SYSTEM: PickerNumberOption[] = [{ value: 0, label: "AM" }, { value: 1, label: "PM" }];

export function PickerCombobox(props: PickerComboboxProps) {
    const { prefixCls = "xy-picker-combobox", className, style, onPicker, format = "HH:mm:ss", hourStep, minuteStep, secondStep, disabledHours, disabledMinutes, disabledSeconds, showHourSystem, onHourSystemChange } = props;
    const showSecond = format === "HH:mm:ss";
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-show-second`]: showSecond,
        [`${prefixCls}-show-hour-system`]: showHourSystem
    });
    const [value, setValue, isControll] = useControll<string>(props, "value", "defaultValue");
    // 0=24小时制AM, 1=12小时制PM
    const [hourSystem, setHourSystem, isHSControll] = useControll<number>(props, "hourSystem", "defaultHourSystem", 0);
    const date = timeParse(isTime(value) ? value : "00:00:00");
    const dateRef = useRef(date);
    dateRef.current = date;
    const [hour, minute, second] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    function changeValue() {
        const d = dateRef.current;
        let str = formatDate(d, format);
        if (!isControll) {
            setValue(str);
        }
        if (onPicker) {
            onPicker(str, hourSystem);
        }
    }

    const disabledOptionHandle = useCallback(
        (num: number, type: PickerNumberType) => {
            switch (type) {
                case "hour":
                    return disabledHours ? disabledHours() : false;
                case "minute":
                    return disabledMinutes ? disabledMinutes(hour) : false;
                case "second":
                    return disabledSeconds ? disabledSeconds(hour, minute) : false;
            }
            return false;
        },
        [disabledHours, disabledMinutes, disabledSeconds]
    );

    function changeHandle(num: number, type: PickerNumberType) {
        const d = dateRef.current;
        switch (type) {
            case "hour":
                d.setHours(num);
                break;
            case "minute":
                d.setMinutes(num);
                break;
            case "second":
                d.setSeconds(num);
                break;
        }
        changeValue();
    }

    const changeHourSystem = useCallback(
        (num: number) => {
            if (num === 1 && hour > 11) {
                dateRef.current.setHours(11);
                changeValue();
            }

            if (!isHSControll) {
                setHourSystem(num);
            }
            if (onHourSystemChange) {
                onHourSystemChange(num);
            }
        },
        [hour]
    );

    return (
        <div className={classNames(classString)} style={style}>
            <PickerNumber type="hour" step={hourStep} disabledOption={disabledOptionHandle} onChange={changeHandle} use12Hours={hourSystem === 1} value={hour} />
            <PickerNumber type="minute" step={minuteStep} disabledOption={disabledOptionHandle} onChange={changeHandle} value={minute} />
            {showSecond && <PickerNumber type="second" step={secondStep} disabledOption={disabledOptionHandle} onChange={changeHandle} value={second} />}
            {showHourSystem && <PickerNumber value={hourSystem} onChange={changeHourSystem} options={HOUR_SYSTEM} />}
        </div>
    );
}

export default React.memo(PickerCombobox);
