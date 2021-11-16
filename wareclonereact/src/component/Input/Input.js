import React, { useState } from "react";

const Input = ({ type, rule, style, className, ...args }) => {
  let test;
  let pattern;
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(undefined);
  const [required, setRequired] = useState(!!rule);
  const requireCheck = (value) => {
    if (/.{0,}/.test(value)) {
      return "Vui lòng điền vào trường này";
    }
  };

  const emailCheck = (value) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return undefined;
    } else {
      return "Email không hợp lệ";
    }
  };

  const passwordCheck = (value) => {
    const re = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      ""
    );
    // Password có ít nhất 8 ký tự và phải có 1 số + 1 chữ hoa + 1 chữ thường + 1 ký tự đặc biệt
    if (re.test(value)) {
      return undefined;
    } else {
      return "Password không hợp lệ";
    }
  };

  switch (rule) {
    case "require":
      test = requireCheck;
      pattern = `.{0,}`;
      break;
    case "email":
      test = emailCheck;
      pattern = `^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$`;
      break;
    case "password":
      test = passwordCheck;
      pattern = `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`;
      break;
    default:
      test = () => undefined;
  }
  const handleOnInput = (e) => {
    if (error !== undefined) {
      setError(undefined);
      setInputValue(e.target.value);
      setRequired(false);
    } else {
      setInputValue(e.target.value);
      setRequired(true);
    }
  };
  const handleOnBlur = (e) => {
    if (test(e.target.value) === undefined) {
      setError(undefined);
      setRequired(false);
    } else {
      setError(test(e.target.value));
      setRequired(true);
    }
  };
  console.log(required);
  return (
    <>
      <input
        value={inputValue}
        type={type}
        onInput={handleOnInput}
        onBlur={handleOnBlur}
        required={required}
        pattern={pattern}
        style={style?.message || {}}
        className={className?.input || ""}
        {...args}
      />
      {error !== undefined && (
        <p
          style={style?.message || { color: "red" }}
          className={className?.message || ""}
        >
          {error}
        </p>
      )}
    </>
  );
};

export default Input;
