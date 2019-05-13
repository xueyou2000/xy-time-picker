export interface InputGenericProps {
    /**
     * 输入框占位符
     */
    placeholder?: string;
    /**
     * 禁用
     */
    disabled?: boolean;
    /**
     * 输入框焦点事件
     */
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /**
     * 输入框失去焦点事件
     */
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /**
     * 键盘事件
     */
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    /**
     * 输入框change事件
     */
    onChange?: (value: string) => void;
}

export interface TimePickerProps extends TimePickerPanelProps {
    /**
     * 是否显示下拉面板
     */
    visible?: boolean;
    /**
     * 默认是否显示下拉面板
     */
    defaultVisible?: boolean;
    /**
     * 改变事件
     */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * 自定义渲染时间面板内容
     * @description 仅用于时间范围组件
     */
    renderTimePickerPanel?: (props: TimePickerPanelProps) => JSX.Element;
}

export interface TimePickerPanelProps extends PickerComboboxProps, InputGenericProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 输入框ref
     */
    inputRef?: React.MutableRefObject<any>;
    /**
     * 底部附加内容
     */
    addon?: React.ReactNode;
}

export interface TimeRangePickerPanelProps extends TimePickerPanelProps {
    /**
     * 分隔符
     * @description 默认 " - "
     */
    separator?: string;
}

export interface PickerComboboxProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 当前时间字符串(时分秒)
     */
    value?: string;
    /**
     * 默认时间字符串(时分秒)
     */
    defaultValue?: string;
    /**
     * onPicker事件
     */
    onPicker?: (value: string, hourSystem: number) => void;
    /**
     * 小时制
     * @description 0=24小时制, 1=12小时制
     */
    hourSystem?: number;
    /**
     * 默认小时制
     * @description 0=24小时制, 1=12小时制
     */
    defaultHourSystem?: number;
    /**
     * 小时制改变
     */
    onHourSystemChange?: (hourSystem: number) => void;
    /**
     * 展示的时间格式
     */
    format?: "HH:mm:ss" | "HH:mm";
    /**
     * 小时步长间隔
     * @description 默认为1
     */
    hourStep?: number;
    /**
     * 分钟步长间隔
     * @description 默认为1
     */
    minuteStep?: number;
    /**
     * 秒步长间隔
     * @description 默认为1
     */
    secondStep?: number;
    /**
     * 是否显示小时制控制
     */
    showHourSystem?: boolean;
    /**
     * 禁用小时部分
     */
    disabledHours?: () => boolean;
    /**
     * 禁用分钟部分
     */
    disabledMinutes?: (selectedHour: number) => boolean;
    /**
     * 禁用秒部分
     */
    disabledSeconds?: (selectedHour: number, selectedMinute: number) => boolean;
}

export type PickerNumberType = "hour" | "minute" | "second";
export type PickerNumberOption = { value: number; label?: string; disabled?: boolean; hide?: boolean };

export interface PickerNumberProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 自定义options
     */
    options?: PickerNumberOption[];
    /**
     * 步长
     */
    step?: number;
    /**
     * 数值
     */
    value?: number;
    /**
     * onChange事件
     */
    onChange?: (value: number, type: PickerNumberType) => void;
    /**
     * 使用 12 小时制
     * @description 为 true 时使用12小时制
     */
    use12Hours?: boolean;
    /**
     * 类型
     */
    type?: PickerNumberType;
    /**
     * 禁用函数
     */
    disabledOption?: (value: number, type: PickerNumberType) => boolean;
}
