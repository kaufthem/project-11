/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/

const otherTextField = document.getElementById('other-title'),
titleSelect = document.getElementById('title'),
designSelect = document.getElementById('design'),
colorSelect = document.getElementById('color'),
colorDiv = document.getElementById('shirt-colors'),
activityFieldset = document.querySelector('.activities'),
activityInput = document.querySelectorAll('.activities input'),
paymentSelect = document.getElementById('payment'),
creditDiv = document.getElementById('credit-card'),
paypalDiv = document.getElementById('paypal'),
bitcoinDiv = document.getElementById('bitcoin'), 
nameField = document.getElementById('name'),
emailField = document.getElementById('mail');

//Hide the job role text field and shirt color selector initially
otherTextField.style.display = 'none';
colorDiv.style.visibility = 'hidden';

//If the title drop down value selected is "other", show the job role text field. Otherwise, hide it.
titleSelect.addEventListener('change', function() {
  if (this.value === 'other') 
    otherTextField.style.display = 'block';
  else 
    otherTextField.style.display = 'none';
});

//Add a placeholder option to the color drop down that reads “Please select a T-shirt theme”
var colorPh = document.createElement('option');
colorPh.text = 'Please select a T-shirt theme';
colorPh.disabled = true;
colorPh.selected = true;
colorPh.hidden = true;
colorSelect.add(colorPh, colorSelect[0]);

//For the T-Shirt "Color" menu, after a user selects a theme, only display the color options that match the design selected in the "Design" menu.
designSelect.addEventListener('change', function() {
  colorDiv.style.visibility = 'visible';
  colorPh.selected = true;
  for (i = 1; i < colorSelect.options.length; i++) {
    if ((this.value === 'js puns' && i > 3) || (this.value === 'heart js' && i < 4)) {
      colorSelect.options[i].hidden = true;
    }
    else colorSelect.options[i].hidden = false;
  }
});

var totalLabel = document.createElement('label'), totalValue = 0;
activityFieldset.appendChild(totalLabel);

activityFieldset.addEventListener('change', function() {
  totalValue = 0;
  [...activityInput].forEach((a) => {
    var aTime = a.getAttribute('data-day-and-time');
    if (a.checked) {
      console.log(a.parentElement);
      //Total cost of selected activities is calculated and displayed below the list of activities.s
      totalValue += parseInt(a.getAttribute('data-cost'));
      
      //User cannot select two activities that are at the same day and time.
      [...activityInput].forEach((b) => {
        if (a !== b && aTime === b.getAttribute('data-day-and-time'))
          b.disabled = true;
      });
    }
    else {
      [...activityInput].forEach((b) => {
        if (a !== b && aTime === b.getAttribute('data-day-and-time'))
          b.disabled = false;
      });
    }
  });

  totalLabel.innerHTML = `Total: $${totalValue}`;
  
  if (totalValue === 0)
    totalLabel.style.display = 'none';
  else 
    totalLabel.style.display = 'block';
});

//Display payment sections based on the payment option chosen in the select menu.
paypalDiv.style.display = 'none';
bitcoin.style.display = 'none';
paymentSelect.addEventListener('change', function() {
  if (this.value === 'credit card') 
    creditDiv.style.display = 'block';
  else 
    creditDiv.style.display = 'none';

  if (this.value === 'paypal') 
    paypalDiv.style.display = 'block';
  else 
    paypalDiv.style.display = 'none';

  if (this.value === 'bitcoin')
    bitcoin.style.display = 'block';
  else 
    bitcoin.style.display = 'none';
});

function validateForm() {
  var valid = true; 
  //Name field can't be blank.
  if (nameField.value === '') {
    nameField.classList.add('error-msg');
    valid = false;
  }
  else {
    nameField.classList.remove('error-msg');
  }
  //Email field must be a validly formatted e-mail address
  if (!checkEmail()) {
    emailField.classList.add('error-msg');
    valid = false;
  }
  else {
    emailField.classList.remove('error-msg');
  }
  //User must select at least one checkbox under the "Register for Activities" section of the form.
  if (totalValue === 0) {
    if (document.getElementById('error-reg') === null) {
      var errorReg = document.createElement('label');
      errorReg.innerHTML = 'You must select at least one activity.';
      errorReg.id = 'error-reg';
      errorReg.style.color = 'red';
      activityFieldset.appendChild(errorReg);
    }
    valid = false;
  }
  else if (document.getElementById('error-reg') !== null) {
    activityFieldset.removeChild(activityFieldset.lastElementChild);
  }

  //If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value
  if (paymentSelect.value === 'credit card') {
    const numField = document.getElementById('cc-num'),
    zipField = document.getElementById('zip'),
    cvvField = document.getElementById('cvv');
    //Conditional Error message
    if (document.getElementById('error-num') === null) {
      var errorNum = document.createElement('label');
      errorNum.innerHTML = 'Please enter a credit card number.';
      errorNum.id = 'error-num'
      errorNum.style.color = 'red';
      errorNum.style.display = 'none';
      paymentSelect.parentNode.appendChild(errorNum);
    }
    if (numField.value.search(/^\d{13,16}$/) == -1) {
      if (document.getElementById('error-num') !== null) {
        if (/^\d+$/.test(numField.value)) 
          document.getElementById('error-num').innerHTML = 'Please enter a credit card number that is between 13 and 16 digits long.';
        else
          document.getElementById('error-num').innerHTML = 'Please enter a credit card number.';
        document.getElementById('error-num').style.display = 'block';
      }
      numField.classList.add('error-msg');
      valid = false;
    }
    else {
      if (document.getElementById('error-num') !== null) document.getElementById('error-num').style.display = 'none';
      numField.classList.remove('error-msg');
    } 
    if (zipField.value.search(/^\d{5}$/) == -1) {
      zipField.classList.add('error-msg');
      valid = false;
    }
    else {
      zipField.classList.remove('error-msg');
    }
    if (cvvField.value.search(/^\d{3}$/) == -1) {
      cvvField.classList.add('error-msg');
      valid = false;
    }
    else {
      cvvField.classList.remove('error-msg');
    }
  }
  
  return valid;
}

//Real-time Error Message
emailField.addEventListener('input', function() {
  if (document.getElementById('error-mail') === null && !checkEmail()) {
    var errorMail = document.createElement('label');
    errorMail.innerHTML = 'You must enter a valid email address.';
    errorMail.id = 'error-mail'
    errorMail.style.color = 'red';
    this.parentNode.insertBefore(errorMail, this.nextSibling)
  }
  else if (document.getElementById('error-mail') !== null && checkEmail()) {
    this.parentNode.removeChild(document.getElementById('error-mail'));
  }
});

function checkEmail() {
  const reMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reMail.test(String(emailField.value).toLowerCase());
}