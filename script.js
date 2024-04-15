$(document).ready(function() {
  $('#taxForm').on('submit', function(event) {
    event.preventDefault();
    const age = $('#age').val();
    const income = parseFloat($('#income').val() || 0);
    const extraIncome = parseFloat($('#extraIncome').val() || 0);
    const deductions = parseFloat($('#deductions').val() || 0);

    const errorFields = [];

    // Validate age
    if (age === '') {
      showError('ageError', 'Age field is mandatory');
      errorFields.push('age');
    } else {
      hideError('ageError');
    }

    // Validate income
    if (isNaN(income)) {
      showError('incomeError', 'Invalid input');
      errorFields.push('income');
    } else {
      hideError('incomeError');
    }

    // Validate extra income
    if (isNaN(extraIncome)) {
      showError('extraIncomeError', 'Invalid input');
      errorFields.push('extraIncome');
    } else {
      hideError('extraIncomeError');
    }

    // Validate deductions
    if (isNaN(deductions)) {
      showError('deductionsError', 'Invalid input');
      errorFields.push('deductions');
    } else {
      hideError('deductionsError');
    }

    if (errorFields.length === 0) {
      const tax = calculateTax(age, income, extraIncome, deductions);
      const overallIncome = income + extraIncome - tax; // Calculate overall income after tax deductions
      showPopup(overallIncome);
    }
  });

  function calculateTax(age, income, extraIncome, deductions) {
    let taxableIncome = income + extraIncome - deductions;
    let taxRate = 0;

    if (age === '<40') {
      taxRate = 0.3;
    } else if (age === '≥40 &lt;60') {
      taxRate = 0.4;
    } else if (age === '≥60') {
      taxRate = 0.1;
    }

    let tax = 0;
    if (taxableIncome > 800000) {
      tax = (taxableIncome - 800000) * taxRate;
    }
    return tax;
  }

  function showPopup(overallIncome) {
    const popupContent = `
      <p>Gross Annual Income after Tax Deductions: ${overallIncome.toFixed(2)} Lakhs</p>
    `;
    const modalContent = $('#modalContent');
    modalContent.html(popupContent);
    $('.modal').css('display', 'block');
  }

  $('.close').on('click', function() {
    $('.modal').css('display', 'none');
  });

  function showError(fieldId, errorMessage) {
    const field = $('#' + fieldId);
    field.css('display', 'inline');
    field.attr('title', errorMessage);
    $('#' + fieldId.replace('Error', '')).addClass('input-error');
  }

  function hideError(fieldId) {
    const field = $('#' + fieldId);
    field.css('display', 'none');
    $('#' + fieldId.replace('Error', '')).removeClass('input-error');
  }
});
