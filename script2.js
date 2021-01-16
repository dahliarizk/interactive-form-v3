/**
 * Treehouse FSJS Techdegree - Project Warm Up
 * Checkboxes - JS
 * Developed by: Robert Manolis - Student Success Specialist
 *               Milwaukie, OR - 2019
 */

"use strict";


/***
 * Once loaded in the browser, you'll see two lists of checkboxes on the page
 * Users should only be able to select one item from each section
 * Currently, they can select as many as they want
 * Your job is to prevent this by listening for a user click on the checkboxes
 * Then disabling or enabling all the possibilities except the one the user just clicked
 * Follow the code and instructional comments below to complete this exercise
***/


/* Variable to store all the checkboxes - You will use this in the event listener below to create a loop */
const checkboxes = document.querySelectorAll('.super-stats input');


/**
 * Event listener for checkboxes
 */
document.querySelector('.super-stats').addEventListener('change', e => {

  // YOUR CODE GOES HERE!!! Do the steps below to complete this challenge
  const clicked = e.target;

  // 1) Create a variable named clicked to store the checkbox input that was just clicked
  //    - `e.target` will be helpful here
  const clickedType = clicked.getAttribute('data-type');

  // 2) Create a variable named clickedType to store the `data-type` attribute of the checkbox that was just clicked
  //    - the `getAttribute` method will be helpful here

  // 3) Log out the two variables you just created to confirm their values
  for (let i = 0; i < checkboxes.length; i++) {
    const checkboxType = checkboxes[i].getAttribute('data-type');

    console.log(clicked);

    if (checkboxType === clickedType && clicked !== checkboxes[i]) {
      if (clicked.checked) {
        checkboxes[i].disabled = true;
      } else {
        checkboxes[i].disabled = false;
      }
    }

  }
  // 4) Loop over the checkbox input elements
    // 5) In the loop, create a variable named `checkboxType` to store the `data-type` attribute of the `checkboxes[i]` in the loop's current iteration = `checkboxes[i].getAttribute('data-type');`

    // 6) Create an `if` statement to check which items to disable/enable.  The if statement needs two conditions:
    //    - We only want to disable/enable the item if it has the same 'data-ype' as the item that was checked/unchecked,
    //    - So check if the checkboxType and the clickedType variables equal
    //    AND
    //    - We don't want to disable/enable the checkbox that was just clicked
    //    - So check that the clicked checkbox is not the checkbox in the loop's current iteration
    //    - These two conditions will look something like this - `(clickedType === checkboxType && clicked !== checkboxes[i])`

      // 7) In the `if` statement, create an `if/else` statement to check if the clicked checkbox is checked or unchecked
      //    - That condition will look something like this - `(clicked.checked)`;
      // 8) If the `clicked` checkbox is `checked`, use dot notation to set the `disabled` property of `checkboxes[i]` to true
      // 9) Else, set the `disabled` property of `checkboxes[i]` to false


  /* Helpful log statement to test that the listener is working - feel free to delete this or comment it out */
  console.log("The checkboxes' change event listener is functional!");

  // Don't touch ↓↓↓ Handles disabled styles for checkbox parent labels
  [...checkboxes].forEach(cb => (cb.disabled) ? cb.parentElement.classList.add('disabled') : cb.parentElement.classList.remove('disabled'));
});

// Don't touch ↓↓↓ Handles tab index for checkbox parent labels
[...checkboxes].forEach((cb) => {
  cb.addEventListener('focus', e => cb.parentElement.classList.add('focus'));

  cb.addEventListener('blur', e => {
    const active = document.querySelector('.focus');
    if (active) active.classList.remove('focus');
  })
});


/**
 * Treehouse FSJS Techdegree - Project Warm Up
 * Form Input Validation - JS
 * Developed by: Robert Manolis - Student Success Specialist
 *               Milwaukie, OR - 2020
 */

"use strict";


/* Variable to store form inputs - You'll use these in the functions below' */
const form = document.querySelector("form");
const nameElement = document.querySelector("#name");
const email = document.querySelector("#email");
const languagesBox = document.querySelector('#languages-box');
const languageTotalElement = document.querySelector('#language-total');
let languageTotal = 0;

// Don't touch ↓↓↓ - Helper function for updating the total number of languages selected
document.querySelector('#languages').addEventListener('change', e => {
  (e.target.checked) ? languageTotal++ : languageTotal--;
  languageTotalElement.innerHTML = `Total: ${languageTotal}`;
});


// YOUR CODE GOES HERE!!! Do the steps below to complete this challenge

// 1. Create a function named `validationPass` and give it one parameter: `element`
  // Inside the function:
    // 1a. Give the `element` parameter's `parentElement` the className 'valid'
    // 1b. Remove from the `element` parameter's `parentElement` the className 'not-valid`
    // 1c. Hide the `lastElementChild` of the `element` parameter's `parentElement`

function validationPass(element){
  element.parentNode.className = 'valid';
  element.parentNode.classList.remove('not-valid');
  element.parentNode.lastElementChild.style.display = 'none';

}
// 2. Create a function named `validationFail` and give it one parameter: `element`
  // Inside the function:
    // 2a. Give the `element` parameter's `parentElement` the className 'not-valid'
    // 2b. Remove from the `element` parameter's `parentElement` the className 'valid`
    // 2c. Display the `lastElementChild` of the `element` parameter's `parentElement`

 function validationFail(element) {
  element.parentNode.className = 'not-valid';
  element.parentNode.classList.remove('valid');
  element.parentNode.lastElementChild.style.display = 'none';
 }

//3. Complete the steps in the three functions below



/* Helper function to validate name input */
const nameValidator = () => {

  // Tests that there is at least a first name containing only letters, and allows for a middle and last name.
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameElement.value);

  // YOUR CODE GOES HERE!!!

  // 3a. Create an if/else statement.
    // If `nameIsValid` equals true, call the `validationPass` function and pass it the `nameElement` variable from above as an argument
    // Else call the `validationFail` function and pass it the `nameElement` variable from above as an argument
  if (nameIsValid) {
    validationPass(nameElement);
  } else {
    validationFail(nameElement);
  }

  return nameIsValid;
}


/* Helper function to validate email input */
const emailValidator = () => {

  // Tests that email is validly formatted.
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);

  // YOUR CODE GOES HERE!!!

  // 3b. Create an if/else statement.
    // If `emailIsValid` equals true, call the `validationPass` function and pass it the `email` variable from above as an argument
    // Else call the `validationFail` function and pass it the `email` variable from above as an argument
  if (emailIsValid) {
    validationPass(email);
  } else {
    validationFail(email);
  }

  return emailIsValid;
}


/* Helper function to validate language section */
const languageValidator = () => {

  // Tests that the `languageTotal` variable provided for you above equals an integer greater than zero.
  const languageSectionIsValid = languageTotal > 0;

  // YOUR CODE GOES HERE!!!

  // 3c. Create an if/else statement.
    // If `languageSectionIsValid` equals true, call the `validationPass` function and pass it the `languagesBox` variable from above as an argument
    // Else call the `validationFail` function and pass it the `languagesBox` variable from above as an argument
  if (languageSectionIsValid) {
    validationPass(languagesBox);
  } else {
    validationFail(languagesBox);
  }

  // Tests that the `languageTotal` variable provided you above equals an integer greater than zero.
  return languageSectionIsValid;
}



/* OPTIONAL: Add real-time validation */
// To add real time validation, use the .addEventListener() method on the form elements/sections
// Use events like `keyup` and `change`
// As the callback, use the validation functions above, but remember,
// Don't use parens when passing a reference to a function as a callback
// Something like: `nameElement.addEventListener('keyup', nameValidator);`

nameElement.addEventListener('keyup', nameValidator);
email.addEventListener('keyup', emailValidator);





/* Submit listener on the form element */
form.addEventListener('submit', e => {

  // IMPORTANT NOTE: Firing the submit event will refresh the page and reset the form, erasing your log statements.
    // This can be prevented by calling `e.preventDefault()` here in this submit handler, or
    // by clicking on the gear icon in the upper right hand corner of the Chrome DevTools console to enter the settings menu,
    // locating the "Console" section and selecting the "Preserve log upon navigation" option.

  // IMPORTANT NOTE: If you call `e.preventDefault()` outside of a conditional, keep in mind that when this exercise is completed,
    // the form submission should only be prevented if one or more of the required fields is invalid.
    // Otherwise the form should be allowed to submit.  But it's okay to temporarily disrupt that behavior for testing purposes.

  // IMPORTANT NOTE: Also keep in mind that the form's submission behavior will differ depending on whether
    // this project is being live served with a server or just viewed locally in the browser.


  // Preventing form submission for testing purposes. Remove or comment out as needed and before completion
  e.preventDefault();


  if (!nameValidator()) {
    console.log('Invalid name prevented submission');
    e.preventDefault();
  }

  if (!emailValidator()) {
    console.log('Invalid email prevented submission');
    e.preventDefault();
  }

  if (!languageValidator()) {
    console.log('Invalid language total prevented submission');
    e.preventDefault();
  }

  // Submit handler test log - Feel free to delete this or comment it out
  console.log('Submit handler is functional!');
});


// Don't touch ↓↓↓ - Handles tab index for checkbox parent labels
[...document.querySelectorAll('#languages inputs')].forEach(cb => {
  cb.addEventListener('focus', e => cb.parentElement.classList.add('focus'));

  cb.addEventListener('blur', e => {
    const active = document.querySelector('.focus');
    if (active) active.classList.remove('focus');
  })
});
