import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { PickerNumberOption, PickerNumberProps } from "./interface";
import { padStart, scrollTo } from "./Utils";

export function PickerNumber(props: PickerNumberProps) {
    const { prefixCls = "xy-picker-number", className, style, step = 1, value = 0, onChange, type, use12Hours, disabledOption, options } = props;
    const panelRef = useRef(null);
    const optionListRef = useRef(null);
    const opts: PickerNumberOption[] = getOptions();
    function getOptions() {
        if (options) {
            return options;
        } else {
            const list: PickerNumberOption[] = [];
            const length = type === "hour" ? (use12Hours ? 12 : 24) : 60;
            for (let i = 0; i < length; ++i) {
                // i
                list.push({
                    value: i,
                    hide: i % step !== 0,
                    label: padStart(i),
                    disabled: disabledOption ? disabledOption(i, type) : false,
                });
            }
            return list;
        }
    }

    useEffect(() => {
        scrollToSelected(200);
    }, [value, use12Hours]);

    function selectHandle(number: number) {
        if (onChange) {
            onChange(number, type);
        }
    }

    function scrollToSelected(duration: number) {
        const select = panelRef.current as HTMLElement;
        const list = optionListRef.current as HTMLElement;
        if (!list) {
            return;
        }
        let index = value;
        if (index < 0) {
            index = 0;
        }
        const option = list.children[index] as HTMLElement;
        if (option) {
            scrollTo(select, option.offsetTop, duration);
        }
    }

    return (
        <div className={classNames(prefixCls, className)} style={style} ref={panelRef}>
            <ul ref={optionListRef}>
                {opts.map((opt, i) => {
                    const cls = classNames({
                        [`${prefixCls}-selected`]: opt.value === (use12Hours && value >= 12 ? 11 : value),
                        [`${prefixCls}-disabled`]: opt.disabled,
                        [`${prefixCls}-hide`]: opt.hide,
                    });
                    return (
                        <li
                            key={i}
                            className={cls}
                            onClick={(e) => {
                                if (!opt.disabled) {
                                    selectHandle(opt.value);
                                }
                                e.stopPropagation();
                            }}
                        >
                            {opt.label || padStart(opt.value)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default React.memo(PickerNumber);
