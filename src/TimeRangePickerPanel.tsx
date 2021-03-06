import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { isTime, isTimeRange, timeRangeSplit } from "utils-dom";
import { DefineDefaultValue } from "utils-hooks";
import { TimeRangePickerPanelProps } from "./interface";
import { getLocal } from "./local";
import PickerCombobox from "./PickerCombobox";

export function TimeRangePickerPanel(props: TimeRangePickerPanelProps) {
    const {
        prefixCls = "xy-time-range-picker-panel",
        className,
        style,
        placeholder = getLocal().TimePicker.placeholder,
        separator = " - ",
        onHourSystemChange,
        inputRef,
        addon,
        onFocus,
        onBlur,
        onKeyDown,
        onChange,
        onPicker,
        disabled,
        ...rest
    } = props;
    const valueProps = DefineDefaultValue(props, "value", "defaultValue");
    const [inputValue, setInputValue] = useState(isTimeRange(valueProps, separator) ? valueProps : "");

    const isControll = "value" in props;
    // 记录最后一次输入正确的时间字符串
    const lastRef = useRef(inputValue);
    const timeValue = isTimeRange(inputValue, separator) || !inputValue ? inputValue : lastRef.current;
    const [startTime, endTime] = timeValue ? timeRangeSplit(timeValue, separator) : [null, null];

    // 受控时候由外部更新输入框的值
    useEffect(() => {
        if (isControll) {
            setInputValue(props.value || "");
        }
    }, [isControll ? props.value : 1]);

    function changeValue(val: string) {
        let _val: string = isTimeRange(val, separator) || !val ? val : lastRef.current;
        lastRef.current = _val;
        if (!isControll || (!props.value && !_val)) {
            setInputValue(_val);
        }
        if (onChange) {
            onChange(_val);
        }
    }

    const blurHandle = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            let val = event.target.value;
            const patten = new RegExp(`\s(${getLocal().TimePicker.AM}|${getLocal().TimePicker.PM})`);
            val = val.replace(patten, "");
            changeValue(val);
            if (onBlur) {
                onBlur(event);
            }
        },
        [lastRef.current],
    );

    const changeHandle = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        let val = event.target.value;
        const patten = new RegExp(`\s(${getLocal().TimePicker.AM}|${getLocal().TimePicker.PM})`);
        val = val.replace(patten, "");

        if (isTime(val)) {
            lastRef.current = val;
        }
        setInputValue(val);
    }, []);

    function startPickerHandle(val: string, hourSystem: number) {
        let tempValue = null;
        if (endTime) {
            tempValue = `${val}${separator}${endTime}`;
        } else {
            tempValue = `${val}${separator}00:00${props.format !== "HH:mm:ss" ? ":00" : ""}`;
        }

        changeValue(tempValue);
        if (onPicker) {
            onPicker(tempValue, hourSystem);
        }
    }

    function endPickerHandle(val: string, hourSystem: number) {
        let tempValue = null;
        if (startTime) {
            tempValue = `${startTime}${separator}${val}`;
        } else {
            tempValue = `00:00${props.format !== "HH:mm:ss" ? ":00" : ""}${separator}${val}`;
        }

        changeValue(tempValue);
        if (onPicker) {
            onPicker(tempValue, hourSystem);
        }
    }

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.keyCode) {
            // Enter 确定
            case 13:
                blurHandle(event as any);
                event.stopPropagation();
                break;
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    }, []);

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            <div className={`${prefixCls}-input-wrap`}>
                <input type="text" ref={inputRef} value={inputValue} placeholder={placeholder} onFocus={onFocus} onBlur={blurHandle} onKeyDown={handleKeyDown} onChange={changeHandle} />
            </div>
            <div className={`${prefixCls}__inner`}>
                <div className={`${prefixCls}__content_left`}>
                    <div className={`${prefixCls}__content_header`}>{getLocal().TimePicker.start}</div>
                    <PickerCombobox {...rest} value={startTime} onPicker={startPickerHandle} showHourSystem={false} />
                </div>
                <div className={`${prefixCls}__content_right`}>
                    <div className={`${prefixCls}__content_header`}>{getLocal().TimePicker.end}</div>
                    <PickerCombobox {...rest} value={endTime} onPicker={endPickerHandle} showHourSystem={false} />
                </div>
            </div>
            {addon && <div className={`${prefixCls}-footer`}>{addon}</div>}
        </div>
    );
}

export default React.memo(TimeRangePickerPanel);
