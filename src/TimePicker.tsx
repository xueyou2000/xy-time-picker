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

const ACTION: TriggerAction[] = ["click"];
const POPUPALIGN = { overflow: { adjust: false, flip: true }, targetOffset: [0, "-100%"] };

export const TimePicker = React.forwardRef((props: TimePickerProps, ref: React.MutableRefObject<any>) => {
    const { prefixCls = "xy-time-picker", className, style, onHourSystemChange, onVisibleChange, renderTimePickerPanel = TimePickerPanel, onChange, disabled, onBlur, placeholder = "请先择时间", ...rest } = props;
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

    const focus = useCallback(
        (trigger: HTMLElement, popup: HTMLElement) => {
            popup.style.display = "block";
            const input = inputRef.current as HTMLInputElement;
            if (visible && input) {
                input.focus();
            }
            popup.style.display = null;
        },
        [inputRef.current]
    );

    function renderPopup() {
        return React.createElement(renderTimePickerPanel, { ...rest, disabled, placeholder, onBlur, inputRef, value: inputValue, onChange: changeValue, onHourSystemChange: hourSystemChangeHandle });
    }

    return (
        <Trigger prefixCls={prefixCls} onAlign={focus} action={ACTION} visible={visible} onChange={changeVisible} offsetSize={0} popupAlign={POPUPALIGN} placement="bottomLeft" popup={renderPopup()}>
            <Input
                ref={ref}
                className={className}
                placeholder={placeholder}
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
});

export default React.memo(TimePicker);
