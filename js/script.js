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

//activities event listener adds up total dollar amount according to selection.
//also builds data into the datesTimes array for evaluating conflicting times/dates of activities later.
const activities = document.getElementById('activities');
const totalCost = document.getElementById('activities-cost');
let totalDollars = parseInt(totalCost.textContent.replace('Total: $0', '0'));
const activitySelections = document.getElementById('activities-box');
const activityCheckBoxes = activitySelections.children;
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
    const dateTime = e.target.getAttribute('data-day-and-time');
    datesTimes.push(dateTime);
    console.log(datesTimes);
} else {
    const dateTime = e.target.getAttribute('data-day-and-time');
    let index = datesTimes.indexOf(dateTime);
    datesTimes.splice(index, 1);
    console.log(datesTimes);
}
});

//this function pushes unique values of datesTimes array into new array called uniqueDatesTimes.
//if more than one selected, displays error messaging indicating this conflict, in addition to triggering
//validationFail function for activities so user cannot submit.
function validateDatesTimes() {
  let uniqueDatesTimes = [];
  uniqueDatesTimes.push(datesTimes[0])
  for (let i = 1; i < datesTimes.length; i++) {
    if (uniqueDatesTimes.includes(datesTimes[i])) {
      activitiesMessage.innerHTML = 'Conflict of dates/times. Please change your selection.';
      validationFail(activities);
      break;
  } else {
      uniqueDatesTimes.push(datesTimes[i])
    }
  }
  console.log(uniqueDatesTimes);
};

//this section hides and displays payment options according to selections from payMenu.
//credit card option enabled on page load, but upon changes from user these elements are hidden
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
const nameValidator = () => {
  let messageNumber = 0
  const nameIsValid = /^[a-zA-Z0-9]+$/.test(nameField.value);
  if (nameIsValid) {
    validationPass(nameField);
  } else {
    validationFail(nameField);
    if (messageNumber === 0) {
      nameField.parentNode.insertAdjacentHTML('afterbegin', `<br>${nameField.parentNode.lastElementChild.textContent}<br>`);
      messageNumber === 1;
  }
}
messageNumber++;
};


  const emailValidator = () => {
    let messageNumber = 0;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    if (emailIsValid) {
      validationPass(email);
  } else {
      validationFail(email);
      if (messageNumber === 0)
        email.parentNode.insertAdjacentHTML('afterbegin', `<br>${email.parentNode.lastElementChild.textContent}<br>`);
        messageNumber++;
        console.log(messageNumber);
  } if (!emailIsValid && messageNumber > 1){
      validationFail(email);
      email.parentNode.insertAdjacentHTML('afterbegin', '');
  }
};

//validates that at least one activity is chosen. 
  let activitiesMessage = document.getElementsByTagName('legend')[2];
  const activityValidator = () => {
    const activitiesValid = (totalDollars > 0);
    if (activitiesValid) {
      validationPass(activities);
    } else {
      validationFail(activities);
      activitiesMessage.innerHTML = 'You must choose at least one activity.';
    }
    button.style.display = '';
  };




  const ccNumValidator = () => {
    let messageNumber = 0;
    if (payMenu.value === 'credit-card') {
      const ccNumIsValid = /^[0-9]{13,16}$/.test(ccNum.value);
      if (ccNumIsValid) {
        validationPass(ccNum);
      } else if (!ccNumIsValid && ccNum.value.length > 5){
        validationFail(ccNum);
        if (messageNumber === 0) {
          ccNum.parentNode.insertAdjacentHTML('afterbegin', `<br>${ccNum.parentNode.lastElementChild.textContent}<br>`);
          messageNumber++;
      }
    }
  }

  };

      const zipValidator = () => {
        let messageNumber = 0;
        if (payMenu.value === 'credit-card') {
          const zipIsValid = /^[0-9]{5}$/.test(zip.value);
          if (zipIsValid) {
            validationPass(zip);
          } else {
            validationFail(zip);
            if (messageNumber === 0) {
              zip.parentNode.insertAdjacentHTML('afterbegin', `<br>${zip.parentNode.lastElementChild.textContent}<br>`);
            }
        }
      }
        messageNumber++;
      };

      const cvvValidator = () => {
        let messageNumber = 0;
        if (payMenu.value === 'credit-card') {
          const cvvIsValid = /^[0-9]{3}$/.test(cvv.value);
          if (cvvIsValid) {
            validationPass(cvv);
          } else {
            validationFail(cvv);
            if (messageNumber === 0) {
              cvv.parentNode.insertAdjacentHTML('afterbegin', `<br>${cvv.parentNode.lastElementChild.textContent}<br>`);
          }
        }
      }
        messageNumber++;
      };

//dynamic validations as user interacts with form, before submission.
  nameField.addEventListener('input', nameValidator);
  email.addEventListener('keyup', emailValidator);
  activities.addEventListener('keyup', activityValidator);
  ccNum.addEventListener('input', ccNumValidator);
  zip.addEventListener('input', zipValidator);
  cvv.addEventListener('input', cvvValidator);

//validation of all elements upon submission.
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!nameValidator()) {
      e.preventDefault();
    } if (!emailValidator()) {
      e.preventDefault();
    } if (!activityValidator()) {
      e.preventDefault();
    } if (validateDatesTimes()) {
      e.preventDefault();
    } if (!ccNumValidator()) {
      e.preventDefault();
    } if (!zipValidator()) {
      e.preventDefault();
    } if (!cvvValidator()){
      e.preventDefault();
    }
    button.style.display = '';
  });
