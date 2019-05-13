import React from "react";
import classNames from "classnames";
import { TimePickerProps } from "./interface";
import TimePicker from "./TimePicker";
import TimeRangePickerPanel from "./TimeRangePickerPanel";

export function TimeRangePicker(props: TimePickerProps) {
    return (
        <div className="time-range-picker">
            <TimePicker {...props} renderTimePickerPanel={TimeRangePickerPanel} />
        </div>
    );
}

export default React.memo(TimeRangePicker);
