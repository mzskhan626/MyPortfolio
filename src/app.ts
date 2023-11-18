class FormValidator {

    public form : HTMLFormElement;
    public inputs : NodeListOf<HTMLInputElement>;

    constructor(form : HTMLFormElement) 
    {
        this.form = form;
        this.inputs = this.form.querySelectorAll('input');
        this.setupFormSubmission();
        this.setUpValidators();
    }
    setupFormSubmission() : void
    {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            let canSubmit = true;
            this.inputs.forEach(input => {
                if(input.getAttribute('data-valid') === 'false')
                {
                    canSubmit = false;
                }
            });

            if(canSubmit) this.form.submit();
        });
    }

    setUpValidators() : void
    {
        if(this.inputs.length === 0) return;
        this.inputs.forEach(input => {
            input.addEventListener('blur', () => {
                let errorList : HTMLElement[] = [];
                this.addValidationRulesToInput(input, errorList)
                this.generateErrorList(input, errorList);
            });
        });
    }

    addValidationRulesToInput(input : HTMLInputElement, errorList : HTMLElement[]) : void
    {
        const inputType = input.getAttribute('type')!.toLowerCase();
        switch (inputType) {
            case 'text':
                this.minLengthRule(input, errorList);
                this.maxLengthRule(input, errorList);
                this.requiredRule(input, errorList);
                break;
            case 'email':
                this.minLengthRule(input, errorList);
                this.maxLengthRule(input, errorList);
                this.emailRule(input, errorList);
                this.requiredRule(input, errorList);
                break;
            default:
                break;
        }
    }

    minLengthRule(input : HTMLInputElement, errorList : HTMLElement[])
    {
        if(!input.getAttribute('min')) return;
        if(input.value.length < parseInt(input.getAttribute('min')!))
        {
            errorList.push(this.createErrorLiElement('Min Length is ' + input.getAttribute('min')));
        }
    }

    maxLengthRule(input: HTMLInputElement, errorList : HTMLElement[])
    {
        if(!input.getAttribute('max')) return;
        if(input.value.length > parseInt(input.getAttribute('max')!))
        {
            errorList.push(this.createErrorLiElement('Max Length is ' + input.getAttribute('max')));
        }
    }

    requiredRule(input : HTMLInputElement, errorList : HTMLElement[])
    {
        if(!input.hasAttribute('required')) return;
        if(input.value.trim().length === 0)
        {
            errorList.push(this.createErrorLiElement('Required Field'));
        }
    }

    emailRule(input : HTMLInputElement, errorList : HTMLElement[])
    {
        // const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!emailRegex.exec(input.value))
        {
            errorList.push(this.createErrorLiElement('Invalid Email.'));
        }
    }

    generateErrorList(input : HTMLInputElement, errorList : HTMLElement[])
    {
        if(errorList.length > 0)
        {
            const previousErrors = input.parentElement!.querySelector('.error_class_container');
            if(previousErrors) previousErrors.remove();
            const errorListUl = document.createElement('ul');
            errorListUl.classList.add('error_class_container');
            input.setAttribute('data-valid', 'false');
            errorList.forEach(error => {
                errorListUl.appendChild(error);
            });
            input.parentElement!.appendChild(errorListUl);
            errorList = [];
        } else {
            errorList = this.removeErrorList(input);
        }
    }

    removeErrorList(input : HTMLInputElement)
    {
        input.setAttribute('data-valid', 'true');
        const previousErrors = input.parentElement!.querySelector('.error_class_container');
        if(previousErrors) previousErrors.remove();
        return [];
    }

    createErrorLiElement(message : string) : HTMLLIElement
    {
        const errorLi = document.createElement('li');
        errorLi.innerHTML = message;
        return errorLi;
    }
}
(function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        new FormValidator(form);
    })
})();

// animation

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Full Stack Developer.", "Front-end Developer.","Web-Developer.","Freelancer."];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;


function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex>=textArray.length) textArrayIndex=0;
        setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

