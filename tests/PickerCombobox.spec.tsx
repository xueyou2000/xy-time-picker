import React from "react";
import { render, fireEvent } from "react-testing-library";
import { PickerCombobox } from "../src";
import { PickerNumberType } from "../src/interface";

describe("PickerCombobox", () => {
    test("hourSystem", () => {
        const wrapper = render(<PickerCombobox showHourSystem={true} defaultHourSystem={1} />);
        const hourSystemOptions = wrapper.container.querySelectorAll(".xy-picker-number:last-child li") as NodeListOf<HTMLElement>;
        var hourOptions = wrapper.container.querySelectorAll(".xy-picker-number:first-child li") as NodeListOf<HTMLElement>;
        expect([].map.call(hourSystemOptions, (opt) => opt.textContent)).toEqual(["AM", "PM"]);
        expect(hourSystemOptions[1].classList.contains("xy-picker-number-selected")).toBeTruthy();
        expect(hourOptions.length).toBe(12);
        fireEvent.click(wrapper.getByText("AM"));

        expect(wrapper.getByText("AM").classList.contains("xy-picker-number-selected")).toBeTruthy();
        hourOptions = wrapper.container.querySelectorAll(".xy-picker-number:first-child li") as NodeListOf<HTMLElement>;
        expect(hourOptions.length).toBe(24);
    });

    test("format HH:mm", () => {
        const fn = jest.fn();
        const wrapper = render(<PickerCombobox format="HH:mm" onPicker={fn} />);
        expect(wrapper.container.querySelectorAll(".xy-picker-number").length).toBe(2);

        const minuteOption = wrapper.container.querySelectorAll(".xy-picker-number:nth-child(2) li");
        fireEvent.click(minuteOption[15]);

        expect(fn).toBeCalled();
        expect(fn.mock.calls[0][0]).toBe("00:15");
    });
});
