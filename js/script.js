const nameField = document.getElementById('name');
nameField.focus();

const jobRole = document.getElementById('other-job-role');
jobRole.style.display = 'none';

const jobMenu = document.getElementById('title');
jobMenu.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    jobRole.style.display = 'block';
  } else {
    jobRole.style.display = 'none'
  }
});

//hides tshirt color menu by default. then reenables the menu when the designs menu is changed.
//displays and hides t shirt selections according to theme selected.
const shirtColors = document.getElementById('color');
shirtColors.disabled = true;
const designs = document.getElementById('design');
const colorSelection = shirtColors.children;
designs.addEventListener('change', (e) => {
  shirtColors.disabled = false;
  for (let i = 0; i < colorSelection.length; i++) {
    colorSelection[i].style.display = '';
    shirtColors.value = '';
    if (e.target.value === 'heart js' && colorSelection[i].getAttribute('data-theme') === 'js puns') {
      colorSelection[i].style.display = 'none';
  } if (e.target.value === 'js puns' && colorSelection[i].getAttribute('data-theme') === 'heart js') {
      colorSelection[i].style.display = 'none';
  }
  }
});

//event listeners for focus/blur events to better visually identify the separate checkboxes
//in the activities section when tabbing through.
const activities = document.getElementById('activities');
const activitySelections = document.getElementById('activities-box');
const activityCheckBoxes = activitySelections.children;
for (let i = 0; i < activityCheckBoxes.length; i++ ) {
  const checkbox = activityCheckBoxes[i].firstElementChild;
  checkbox.addEventListener('focus', (e)=> {
    e.target.parentElement.classList.add('focus');
  });
  checkbox.addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('focus');
  })
};

//activities event listener adds up total dollar amount according to selection.
//also disables the other activities that have same date/time as selected.
//disabling logic referenced from Unit 3 WarmUp project 'Checkboxes'
const totalCost = document.getElementById('activities-cost');
let totalDollars = parseInt(totalCost.textContent.replace('Total: $0', '0'));
let datesTimes = [];
activities.addEventListener('change', (e) => {
  const selectedCost = e.target.getAttribute('data-cost');
  if (e.target.checked){
    totalDollars += parseInt(selectedCost);
    totalCost.textContent = 'Total: $' + totalDollars;
  } else {
    totalDollars -= parseInt(selectedCost);
    totalCost.textContent = 'Total: $' + totalDollars;
  }
  if (e.target.checked) {
    let dateTime = e.target.getAttribute('data-day-and-time');
    for (let i = 0; i < activityCheckBoxes.length; i++ ) {
      let secondDateTime = activityCheckBoxes[i].firstElementChild.getAttribute('data-day-and-time');
      if (dateTime === secondDateTime && e.target !== activityCheckBoxes[i].firstElementChild){
        activityCheckBoxes[i].firstElementChild.disabled = true
      }
}
} else {
      let dateTime = e.target.getAttribute('data-day-and-time');
      for (let i = 0; i < activityCheckBoxes.length; i++ ) {
        let secondDateTime = activityCheckBoxes[i].firstElementChild.getAttribute('data-day-and-time');
        if (dateTime === secondDateTime && e.target !== activityCheckBoxes[i].firstElementChild){
          activityCheckBoxes[i].firstElementChild.disabled = false;
      }};
}
});


//this section hides and displays payment options according to selections from payMenu.
//credit card option is enabled on page load, but upon changes from user these elements are hidden
//when event listener is fired. same goes for the paypal and bitcoin options.
const payMenu = document.getElementById('payment');
payMenu.value = 'credit-card';
const payPalOption = payMenu.children[2];
const bitCoinOption = payMenu.children[3];
const payPalDiv = document.getElementById('paypal');
const bitCoinDiv = document.getElementById('bitcoin');
const creditCard = document.getElementById('credit-card');
payPalDiv.style.display = 'none';
bitCoinDiv.style.display = 'none';
const button = document.getElementsByTagName('button')[0];
payMenu.addEventListener('change', (e) => {
  if (e.target.value === 'paypal') {
    creditCard.style.display = 'none';
    bitCoinDiv.style.display = 'none';
    payPalDiv.style.display = '';
} if (e.target.value === 'bitcoin') {
    creditCard.style.display = 'none';
    bitCoinDiv.style.display = '';
    payPalDiv.style.display = 'none';
} if (e.target.value === 'credit-card') {
    creditCard.style.display = '';
    bitCoinDiv.style.display = 'none';
    payPalDiv.style.display = 'none';
}
  button.style.display = '';
});

//referenced from Form Validation Warm Up exercise (Unit 3). validationPass and validationFail
//functions add and remove 'valid' or 'not-valid' class to element accordingly to activate
//error styling.
const form = document.getElementsByTagName('form')[0];
const email = document.querySelector('#email');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');

function validationPass(element){
  element.parentNode.className = 'valid';
  element.parentNode.classList.remove('not-valid');
  element.parentNode.lastElementChild.style.display = 'none';
};

function validationFail(element) {
 element.parentNode.className = 'not-valid';
 element.parentNode.classList.remove('valid');
 };

//the respective validator functions for each element then validate according to
//input requirements, using validationpass and validationfail functions created as helpers
//to indicate styling. upon failure, unique error message should display according to namefield's parent element
//textContent.

//nameValidator function has 2 error messages: one for leaving the name blank and
//the second for entering special characters.
const nameValidator = () => {
  let nameMessage = nameField.parentNode.lastElementChild
  let nameSpecCharacters = /[^a-z0-9 ]+/gi.test(nameField.value);
  const nameIsValid = /^[a-zA-Z0-9]+ ?$/.test(nameField.value);
  if (nameSpecCharacters){
    validationFail(nameField);
    nameMessage.style.display = 'initial';
    nameMessage.textContent = 'You cannot enter special characters in this field.'
    return false;
} if (!nameIsValid || nameField.value.length === 0) {
    validationFail(nameField);
    nameMessage.innerHTML = 'You cannot leave this field empty.';
    nameMessage.style.display = 'block'
    return false;
  } else if (nameIsValid) {
      validationPass(nameField);
      return true;

}
};


  const emailValidator = () => {
    let emailMessage = email.parentNode.lastElementChild;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    if (emailIsValid) {
      validationPass(email);
      return true;
  } else {
      validationFail(email);
      emailMessage.style.display = 'block';
      return false;
  }
};

//validates that at least one activity is chosen.
  let activitiesMessage = document.getElementsByTagName('legend')[2];
  const activityValidator = () => {
    const activitiesValid = (totalDollars > 0);
    if (activitiesValid) {
      validationPass(activities);
      return true;
    } else {
      validationFail(activities);
      activitiesMessage.style.display = 'block';
      return false;
    }
    button.style.display = '';
  };

//validates that the credit card number value is between 13 and 16 digits.
  const ccNumValidator = () => {
    let ccNumMessage = ccNum.parentNode.lastElementChild;
    if (payMenu.value === 'credit-card') {
      const ccNumIsValid = /^[0-9]{13,16}$/.test(ccNum.value);
      if (ccNumIsValid) {
        validationPass(ccNum);
        return true;
      } else {
        validationFail(ccNum);
        ccNumMessage.style.display = 'block';
        return false;
      }
    }
  };

    const zipValidator = () => {
      let zipMessage = zip.parentNode.lastElementChild;
      if (payMenu.value === 'credit-card') {
        const zipIsValid = /^[0-9]{5}$/.test(zip.value);
        if (zipIsValid) {
          validationPass(zip);
          return true;
        } else {
          validationFail(zip);
          zipMessage.style.display = 'block';
          return false;
      }
    }
  };

    const cvvValidator = () => {
      let cvvMessage = cvv.parentNode.lastElementChild;
      if (payMenu.value === 'credit-card') {
        const cvvIsValid = /^[0-9]{3}$/.test(cvv.value);
        if (cvvIsValid) {
          validationPass(cvv);
          return true;
        } else {
          validationFail(cvv);
          cvvMessage.style.display = 'block';
          return false;
        }
      }
    };

//dynamic validations as user interacts with form, before submission.
  nameField.addEventListener('keyup', nameValidator);
  email.addEventListener('keyup', emailValidator);
  ccNum.addEventListener('input', ccNumValidator);
  zip.addEventListener('input', zipValidator);
  cvv.addEventListener('input', cvvValidator);

//validation of all elements upon submission. if any element does not validate form
//does not submit (page does not refresh).
  form.addEventListener('submit', e => {
    if (payMenu.value === 'paypal' || payMenu.value === 'bitcoin') {
      if (!nameValidator() || !emailValidator() || !activityValidator()) {
        e.preventDefault();
  }
  } if (payMenu.value === 'credit-card') {
      if (!ccNumValidator() || !zipValidator() || !cvvValidator() || !nameValidator() || !emailValidator() || !activityValidator()){
        e.preventDefault();
  }
    button.style.display = '';
  }
  });
