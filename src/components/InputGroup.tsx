import React from 'react';

interface InputGroupProps {
    label: string;
    name: string;
    type?: string;
    value: string | number;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string; // For grid span control
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
    label,
    name,
    type = "text",
    value,
    placeholder,
    required,
    disabled,
    className,
    onChange
}) => (
    <div className={`flex flex-col gap-2 ${className}`}>
        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">
            {label} {required && '*'}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#003399] focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
        />
    </div>
);

export default InputGroup;