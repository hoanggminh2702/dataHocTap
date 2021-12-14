export const emailCheck = (value) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};

export const passwordCheck = (value) => {
  const re = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    ""
  );
  return re.test(value);
};

export const blankInputCheck = (value) => {
  const re = /^\s*$/;
  return re.test(value);
};

export const usernameCheck = (value) => {
  const re = /^(?=.{8,25}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  return re.test(value);
};

export const showValidateMessage = (element, setMessage) => {
  switch (element.name) {
    case "username":
      if (!usernameCheck(element.value)) {
        setMessage((prev) => {
          return {
            ...prev,
            [element.name]: `${element.name} không hợp lệ`,
          };
        });
      } else {
        setMessage((prev) => {
          return {
            ...prev,
            [element.name]: "",
          };
        });
      }
      break;
    case "password":
      if (!passwordCheck(element.value)) {
        setMessage((prev) => {
          return {
            ...prev,
            [element.name]: `${element.name} không hợp lệ`,
          };
        });
      } else {
        setMessage((prev) => {
          return {
            ...prev,
            [element.name]: "",
          };
        });
      }
      break;

    case "email":
      if (!emailCheck(element.value)) {
        setMessage((prev) => {
          return {
            ...prev,
            [element.name]: `${element.name} không hợp lệ`,
          };
        });
      } else {
        setMessage((prev) => {
          return {
            ...prev,
            [element.name]: "",
          };
        });
      }
      break;
    case "fullname":
      if (!fullnameCheck(element.value)) {
        setMessage((prev) => {
          return {
            ...prev,
            [element.name]: `${element.name} không hợp lệ`,
          };
        });
      } else {
        setMessage((prev) => {
          return {
            ...prev,
            [element.name]: "",
          };
        });
      }
      break;
    default:
  }
};

function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

export function fullnameCheck(string) {
  var re = new RegExp("^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$", "i"); // regex here
  return re.test(removeAscent(string));
}
