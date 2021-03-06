# Interactive-form

This web form takes and validates user input in order to register for a conference.

Required fields include:

Name: a) cannot be blank, validated in real time. unique error message.
      b) cannot contain special characters, validated in real time. unique error message. 

Email: must be a valid email address (have only one '@' symbol), validated in real time

Activities: a) must register for at least one activity, validated upon submission.
           b) once an activity is selected, conflicting activities remaining with same date/time are disabled.

Payment: if credit card selected, must enter a valid credit card number (13-16 digits), a zip code (5 digits), and a cvv (3 digits).
         these fields are all validated in real time.

Other dynamic aspects of the form include:
  a) selection of a tshirt according to tshirt design choice.
  b) display of an 'Other' field in the title section if 'Other' is selected in the drop down menu.
