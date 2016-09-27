$(document).ready(function() {
  $('#entry').text(0);
  $('#entryHistory').text(0);

  var reset = false;
  var value, result;

  // Activate appropriate functions based on button pressed
  $("button").click(function() {
    var pressed = $(this); // Determine which key was pressed
    var pressedStr = pressed.val(); // Convert value of pressed button to a String
    var entered = $('#entry').text(); // For current number/button being pressed
    var enteredHistory = $('#entryHistory').text(); // Running history of operations
    value = $('#entryHistory').text(); // Use the enteredHistory outside of button click function

    // Based on which button is pressed, perform a specific action
    if (pressedStr === 'ac') {
      clearAll(); // Clear All input (AC)
    } else if (pressedStr === 'ce') {
      clearEntry(); // Clear current entry (CE)
    } else if (pressedStr === '=') {
      evaluate(enteredHistory, pressed); // Calculate operation
    } else if (pressedStr === '/') {
      showOperator('/', enteredHistory, pressed); // Display / sign in place of last number input
    } else if (pressedStr === 'x') {
      showOperator('x', enteredHistory, pressed); // Display x sign in place of last number input
    } else if (pressedStr === '-') {
      showOperator('-', enteredHistory, pressed); // Display - sign in place of last number input
    } else if (pressedStr === '+') {
      showOperator('+', enteredHistory, pressed); // Display + sign in place of last number input
    } else { // For number buttons and decimal point inputs

      // If calculation already done, clean entry fields before new number is submitted
      if (reset) {
        entered = "";
        enteredHistory = "";
        reset = false;
      }

      // Replace an operator symbol if shown in #entry field
      entered = cleanEntry(entered);

      // Remove leading zeroes
      enteredHistory = enteredHistory.replace(/^0+/, '');

      // Show number input in #entry field and the history in #entryHistory field
      $('#entry').text(entered).append(pressed.val());
      $('#entryHistory').text(enteredHistory).append(pressed.val());
    }

    // Check that the number is less than 10 figures
    isTooLarge($('#entry').text().length);

  });

  // Check that value isn't too large to display
  function isTooLarge(val) {
    if (val > 10) {
      $('#entry').text(0);
      $('#entryHistory').text("ERROR: Too many digits.");
      reset = true;
    }
  }

  // Display operator on entry and history fields
  function showOperator(op, currentEntry, keyPressed) {
    $('#entry').text(op);
    $('#entryHistory').text(currentEntry).append(keyPressed.val());
  }

  // Remove operator from entry and history fields
  function cleanEntry(text) {
    text = text.replace(/^0+/, '');
    text = text.replace('/', '');
    text = text.replace('x', '');
    text = text.replace('-', '');
    text = text.replace('+', '');
    return text;
  }

  // Replace 'x' with the '*' before calculating
  function cleanEval(val) {
    val = val.replace(/x/g, '*');
    return val;
  }

  // Clear all entry fields
  function clearAll() {
    $('#entry').text(0);
    $('#entryHistory').text(0);
  }

  // Cledar main entry field and remove last number inputs
  function clearEntry() {
    if ($('#entry').text().length > 0) {
      $('#entry').text($('#entry').text().substring(0, $('#entry').text().length - 1));
      $('#entryHistory').text($('#entryHistory').text().substring(0, $('#entryHistory').text().length - 1));
    }
    if ($('#entry').text().length == 0) {
      $('#entry').text(0);
    }
    if ($('#entryHistory').text().length == 0) {
      $('#entryHistory').text(0);
    }
  }

  // Perform calculation
  function evaluate(history, keyPress) {
    value = cleanEval(value);
    result = eval(value);
    if (result % 1 !== 0)
      result = result.toFixed(2);
    if (!isTooLarge(result)) {
      $('#entry').text(result);
      $('#entryHistory').text(history).append(keyPress.val()).append(result);
      reset = true;
    }
  }


});
