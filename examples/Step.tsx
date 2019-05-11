import React, { useState } from "react";
import { TimePicker } from "../src";

export default function() {
    return (
        <div>
            <TimePicker hourStep={2} minuteStep={5} secondStep={6} />
        </div>
    );
}
