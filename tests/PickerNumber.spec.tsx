import React from "react";
import { render, fireEvent } from "react-testing-library";
import { PickerNumber } from "../src";
import { PickerNumberType } from "../src/interface";

describe("PickerNumber", () => {
    test("render", () => {
        const wrapper = render(<PickerNumber />);
        var options = wrapper.container.querySelectorAll("li") as NodeListOf<HTMLElement>;
        expect(options.length).toBe(60);
        expect(options[0].textContent).toBe("00");
        expect(options[5].textContent).toBe("05");
        expect(options[25].textContent).toBe("25");

        wrapper.rerender(<PickerNumber type="hour" use12Hours={true} />);
        options = wrapper.container.querySelectorAll("li") as NodeListOf<HTMLElement>;
        expect(options.length).toBe(12);
        expect(options[0].textContent).toBe("00");
    });

    test("onChange", () => {
        const fn = jest.fn();
        const wrapper = render(<PickerNumber value={6} onChange={fn} />);
        expect(wrapper.getByText("06").classList.contains("xy-picker-number-selected")).toBeTruthy();
        fireEvent.click(wrapper.getByText("00"));

        expect(fn.mock.calls.length).toBe(1);
        expect(fn.mock.calls[0][0]).toBe(0);

        wrapper.rerender(<PickerNumber value={4} onChange={fn} use12Hours={true} />);

        fireEvent.click(wrapper.getByText("07"));
        expect(fn.mock.calls.length).toBe(2);
        expect(fn.mock.calls[1][0]).toBe(7);
    });

    test("customize options", () => {
        const wrapper = render(<PickerNumber options={[{ label: "A", value: 0 }, { label: "B", value: 1, disabled: true }, { label: "C", value: 2 }]} />);
        var options = wrapper.container.querySelectorAll("li") as NodeListOf<HTMLElement>;
        expect([].map.call(options, (opt) => opt.textContent)).toEqual(["A", "B", "C"]);
        expect(wrapper.getByText("B").classList.contains("xy-picker-number-disabled")).toBeTruthy();
    });

    test("disabled options", () => {
        const fn = jest.fn((value: number, type: PickerNumberType) => true);
        const wrapper = render(<PickerNumber disabledOption={fn} />);
        expect(wrapper.container.querySelectorAll(".xy-picker-number-disabled").length).toBe(60);
        expect(fn.mock.calls.length).toBe(60);

        expect(fn.mock.calls[0][0]).toBe(0);
        expect(fn.mock.calls[11][0]).toBe(11);
    });
});
