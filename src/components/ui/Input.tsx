import React from "react";
import { useField, FieldHookConfig } from "formik";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  formik?: boolean; // Optional flag to use Formik
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  className,
  formik = true, // Default to using Formik
  ...props
}) => {
  // Use Formik's useField if formik is true
  const [field, meta] = formik ? useField(props.name) : [null, null];

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={props.name}
        type={type}
        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm 
          focus:ring-blue-500 focus:border-blue-500 
          ${
            meta && meta.touched && meta.error
              ? "border-red-500"
              : "border-gray-300"
          } 
          ${className || ""}
        `}
        {...(formik ? field : {})} // Spread Formik field props if formik is true
        {...props} // Spread all other input props
      />
      {meta && meta.touched && meta.error && (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default Input;
