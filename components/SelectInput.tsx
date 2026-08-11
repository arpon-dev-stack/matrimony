import React from "react";

interface SelectInputProps<T extends string> {
  label: string;
  name: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  className?: string;
}

export const SelectInput = <T extends string>({
  label,
  name,
  value,
  options,
  onChange,
  className = "",
}: SelectInputProps<T>) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label 
        htmlFor={name}
        className="block text-xs uppercase tracking-wider font-semibold text-[#43474e]"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full bg-white border border-[#c4c6cf] rounded-lg px-4 py-3 focus:border-[#775a19] focus:outline-none appearance-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};