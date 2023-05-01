function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            //Kiểm tra xem cha của phần tử đó có khớp với bộ chọn
            //if(element.parentElement.matches(selector))
            if (element.closest(selector))
                return element.parentElement;
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
        var rules = selectorRules[rule.selector];

        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add("invalid");
        }
        else {
            errorElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
        }
        return !errorMessage;
    }
    //lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    var btnLogoutElement = formElement.querySelector(options.btnLogout);

    if (formElement) {
        //khi click btn đăng ký
        btnLogoutElement.onclick = function () {
            var isFormValid = true;
            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector)

                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                if (typeof options.onsubmit === "function") {
                    var enableInput = formElement.querySelectorAll("[name]:not([disable])");
                    var formValues = Array.from(enableInput).reduce(function (accumulator, currentValue) {
                        accumulator[currentValue.name] = currentValue.value
                        return accumulator;
                    }, {});
                    options.onsubmit(formValues);
                }
            }
            else {
                console.log("co loi");
            }
        }


        //lặp qua mỗi rule và xử lý các sự kiện(blur, click, ...)
        options.rules.forEach(rule => {
            //lưu lại các rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                //xử lý blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(".form-message");
                //xử lý khi nhập lại input
                inputElement.onclick = function () {
                    errorElement.innerText = "";
                    getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
                }
            }
        });

    }
}
//
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || "nhập đê";
        }
    }
}
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return regex.test(value) ? undefined : message || "email không hợp lệ!";
        }
    }
}
Validator.minLength = function (selector, size, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= size ? undefined : (message + " cần ít nhất " + size + " ký tự") || ("cần ít nhất " + size + " ký tự");
        }
    }
}
Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value == getConfirmValue() ? undefined : message || "giá trị nhập vào không chính xác!";
        }
    }
}