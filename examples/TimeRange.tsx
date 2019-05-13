import React, { useState } from "react";
import { TimeRangePicker } from "../src";

export default function() {
    return (
        <div>
            <TimeRangePicker onChange={(v) => console.log("change - ", v)} onPicker={(v) => console.log(v)} />
        </div>
    );
}
