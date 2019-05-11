import React, { useState } from "react";
import { Button } from "xy-button";
import "xy-button/assets/index.css";
import { TimePicker } from "../src";
import "./index.scss";

export default function() {
    const [value, setValue] = useState(null);
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <TimePicker
                value={value}
                onChange={setValue}
                visible={visible}
                onVisibleChange={setVisible}
                addon={
                    <div className="footer-btns">
                        <Button
                            className="btn-cancel"
                            type="text"
                            onClick={() => {
                                setValue(null);
                                setVisible(false);
                            }}
                        >
                            取消
                        </Button>
                        <Button className="btn-confirm" type="text" onClick={() => setVisible(false)}>
                            确定
                        </Button>
                    </div>
                }
            />
        </div>
    );
}
