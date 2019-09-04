import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TimePickerPanel } from "../src";

describe("TimePickerPanel", () => {
    test("render", () => {
        const wrapper = render(<TimePickerPanel />);
        const input = wrapper.getByPlaceholderText("请先择时间") as HTMLInputElement;
        expect(input.value).toBe("");

        const minuteOption = wrapper.container.querySelectorAll(".xy-picker-number:nth-child(2) li");
        fireEvent.click(minuteOption[15]);
        expect(input.value).toBe("00:15:00");
    });
});
