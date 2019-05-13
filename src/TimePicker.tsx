import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useRef } from "react";
import { TriggerAction, useControll } from "utils-hooks";
import { Input } from "xy-input";
import "xy-input/assets/index.css";
import Trigger from "xy-trigger";
import "xy-trigger/assets/index.css";
import { TimePickerProps } from "./interface";
import TimePickerPanel from "./TimePickerPanel";

const ACTION: TriggerAction[] = [];
const POPUPALIGN = { overflow: { adjust: false, flip: true }, targetOffset: [0, "-100%"] };

export function TimePicker(props: TimePickerProps) {
    const { prefixCls = "xy-time-picker", className, style, onHourSystemChange, onVisibleChange, onChange, disabled, onBlur, placeholder = "请先择时间", ...rest } = props;
    const [visible, setVisible, isVisibleControll] = useControll(props, "visible", "defaultVisible", false);
    const [inputValue, setInputValue, isControll] = useControll(props, "value", "defaultValue");
    const hourSystemRef = useRef(0);
    const inputRef = useRef(null);
    const value = inputValue && props.showHourSystem ? `${inputValue} ${hourSystemRef.current === 0 ? "上午" : "下午"}` : inputValue;

    const hourSystemChangeHandle = useCallback((sys: number) => {
        hourSystemRef.current = sys;
        if (onHourSystemChange) {
            onHourSystemChange(sys);
        }
    }, []);

    const changeValue = useCallback((val: string) => {
        if (!isControll) {
            setInputValue(val);
        }
        if (onChange) {
            onChange(val);
        }
    }, []);

    const changeVisible = useCallback((show: boolean) => {
        if (!isVisibleControll) {
            setVisible(show);
        }
        if (onVisibleChange) {
            onVisibleChange(show);
        }
    }, []);

    function cleanHandle(e: React.MouseEvent<HTMLElement>) {
        if (inputValue) {
            changeValue(null);
        }
    }

    const focusHandle = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        changeVisible(true);
    }, []);

    const blurHandle = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        changeVisible(false);
        if (onBlur) {
            onBlur(e);
        }
    }, []);

    const focus = useCallback(
        (trigger: HTMLElement, popup: HTMLElement) => {
            popup.style.display = "block";
            const input = inputRef.current as HTMLInputElement;
            if (visible && input) {
                input.focus();
            }
            popup.style.display = null;
        },
        [inputRef.current],
    );

    return (
        <Trigger
            prefixCls={prefixCls}
            onAlign={focus}
            action={ACTION}
            visible={visible}
            onChange={changeVisible}
            offsetSize={0}
            popupAlign={POPUPALIGN}
            placement="bottomLeft"
            popup={<TimePickerPanel {...rest} disabled={disabled} placeholder={placeholder} onBlur={blurHandle} inputRef={inputRef} value={inputValue} onChange={changeValue} onHourSystemChange={hourSystemChangeHandle} />}
        >
            <Input
                placeholder={placeholder}
                onFocus={focusHandle}
                value={value}
                disabled={disabled}
                suffix={
                    <span className={`${prefixCls}-icon`} onClick={cleanHandle}>
                        <FontAwesomeIcon icon={inputValue ? faTimesCircle : faClock} />
                    </span>
                }
            />
        </Trigger>
    );
}

export default React.memo(TimePicker);
