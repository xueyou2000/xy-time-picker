import classNames from "classnames";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { DefineDefaultValue, useControll } from "utils-hooks";
import { isTime } from "./date";
import { TimePickerPanelProps } from "./interface";
import { PickerCombobox } from "./PickerCombobox";

export function TimePickerPanel(props: TimePickerPanelProps) {
    const { prefixCls = "xy-time-picker-panel", className, style, placeholder = "请先择时间", onHourSystemChange, inputRef, addon, onFocus, onBlur, onKeyDown, onChange, onPicker, disabled, ...rest } = props;
    const valueProps = DefineDefaultValue(props, "value", "defaultValue");
    const [inputValue, setInputValue] = useState(isTime(valueProps) ? valueProps : "");
    // 0=24小时制AM, 1=12小时制PM
    const [hourSystem, setHourSystem, isHSControll] = useControll<number>(props, "hourSystem", "defaultHourSystem", 0);
    const isControll = "value" in props;
    // 记录最后一次输入正确的时间字符串
    const lastRef = useRef(inputValue);
    const timeValue = isTime(inputValue) || !inputValue ? inputValue : lastRef.current;
    const showInputValue = inputValue && props.showHourSystem ? `${inputValue} ${hourSystem === 0 ? "上午" : "下午"}` : inputValue;

    // 受控时候由外部更新输入框的值
    useEffect(() => {
        if (isControll) {
            setInputValue(props.value || "");
        }
    }, [isControll ? props.value : 1]);

    function changeValue(val: string) {
        let _val: string = isTime(val) || !val ? val : lastRef.current;
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
            val = val.replace(/\s(上午|下午)/, "");
            changeValue(val);
            if (onBlur) {
                onBlur(event);
            }
        },
        [lastRef.current]
    );

    const changeHandle = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        let val = event.target.value;
        val = val.replace(/\s(上午|下午)/, "");

        if (isTime(val)) {
            lastRef.current = val;
        }
        setInputValue(val);
    }, []);

    function pickerHandle(val: string, hourSystem: number) {
        changeValue(val);
        if (onPicker) {
            onPicker(val, hourSystem);
        }
    }

    function hourSystemChange(sys: number) {
        if (!isHSControll) {
            setHourSystem(sys);
        }
        if (onHourSystemChange) {
            onHourSystemChange(sys);
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
                <input type="text" ref={inputRef} value={showInputValue} placeholder={placeholder} onFocus={onFocus} onBlur={blurHandle} onKeyDown={handleKeyDown} onChange={changeHandle} />
            </div>
            <PickerCombobox {...rest} value={timeValue} onPicker={pickerHandle} hourSystem={hourSystem} onHourSystemChange={hourSystemChange} />
            {addon && <div className={`${prefixCls}-footer`}>{addon}</div>}
        </div>
    );
}

export default React.memo(TimePickerPanel);
