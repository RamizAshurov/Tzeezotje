document.querySelector(".header__burger").addEventListener("click", (e) => {
    const burger = e.currentTarget;
    const menu = document.querySelector(".header__nav");

    burger.classList.toggle("header__burger_open")
    menu.classList.toggle("header__nav_open")

    if (!headerEl.classList.contains("header_scroll")) {
        headerEl.querySelector(".header__bg").classList.toggle("header__bg_visible")
    }

    document.body.classList.toggle("body_lock")
})

// Header
const headerEl = document.querySelector(".header");

// const callback = function(entries, observer) {
//     if (entries[0].isIntersecting) {
//         headerEl.classList.remove("header_scroll")
//     } else {
//         headerEl.classList.add("header_scroll")
//     }
// }

// const headerObserver = new IntersectionObserver(callback)
// headerObserver.observe(headerEl)

document.querySelector(".hero__button").addEventListener("click", (e) => {
    const popup = document.querySelector(".header__popup")

    document.body.classList.add("body_lock");
    popup.classList.add("header__popup_open")
})

function closePopup(e) {
    const popup = document.querySelector(".header__popup")
    if (e.target.classList.contains("header__popup-container") || e.target.classList.contains("header__popup-close")) {
        popup.classList.remove("header__popup_open")
        popup.addEventListener("transitionend", () => {
            popup.querySelector(".header__popup-input_required").classList.remove("header__popup-input_error")
            popup.classList.contains("header__popup_form-sent") && popup.classList.remove("header__popup_form-sent")
            popup.querySelector("form").reset()
            document.body.classList.remove("body_lock")
        }, { once: true })
    }
}

document.querySelector(".header__popup-container").addEventListener("click", closePopup)
document.querySelector(".header__popup-close").addEventListener("click", closePopup)

document.addEventListener("scroll", () => {
    if (window.pageYOffset > 100 && !headerEl.classList.contains("header_scroll"))
        headerEl.classList.add("header_scroll")
    if (window.pageYOffset < 100 && headerEl.classList.contains("header_scroll"))
        headerEl.classList.remove("header_scroll")
})

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


document.querySelector(".header__popup-form").addEventListener("submit", (e) => {
    function changeContentPage(form) {
        form.closest(".header__popup-content").style.opacity = "0"
        form.closest(".header__popup-content").addEventListener("transitionend", () => {
            form.reset()
            form.closest(".header__popup").classList.add("header__popup_form-sent");
            form.closest(".header__popup-content").style.opacity = "1"
        }, { once: true })
    }

    const reqFiedls = e.target.querySelectorAll('.header__popup-input_required')

    e.preventDefault();
    let errors = 0;
    for (let i = 0; i < reqFiedls.length; i++) {
        if (reqFiedls[i].getAttribute("name") === "phone") {
            if (reqFiedls[i].value.trim() === "" || reqFiedls[i].value.length < 15) {
                reqFiedls[i].classList.add("header__popup-input_error");
                errors++;
            }
        }
    }
    if (errors) {
        console.log("Fill req fields");
    } else {
        // sendForm(form)
        setTimeout(() => {
            changeContentPage(e.target)
        })
    }
})

// validate inputs
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

document.querySelectorAll("input[name='phone']").forEach(inputElement => {
    inputElement.addEventListener("keypress", (e) => {
        const length = e.target.value.length;
        if (e.charCode < 48 || e.charCode > 57 || length > 14) {
            e.preventDefault();
            return;
        }
        switch (length) {
            case 0: 
                e.target.value = "8 " ;
                break;
            case 5:
            case 9:
            case 12:
                e.target.value += " ";
                break;
            default:
                break;
        }
    })
    inputElement.addEventListener("input", e => {e.target.value.length === 2 && (e.target.value = "")})
})

document.querySelector(".header__popup-input_required").addEventListener("input", (e) => {
    if (e.target.classList.contains("form__input_error")) {
        e.target.classList.remove("form__input_error")
    }
})

document.querySelector(".contacts__form").addEventListener("submit", e => {
    e.preventDefault();
    const emailValue = e.target.querySelector("input[type='email']").value;

    if (validateEmail(emailValue)) {
        e.target.reset();
    } else {
        e.target.querySelector("input[type='email']").classList.add('contacts__input_error')
    }
})

document.querySelector("input[type='email']").addEventListener("input", (e) => {
    if (e.target.classList.contains("contacts__input_error")) {
        e.target.classList.remove("contacts__input_error")
    }
})