document.querySelector('.theForm').addEventListener('submit', (e) => {

    e.preventDefault();

    let resultsArray = [];

    let loanData = {
        loanAmount : null,
        salary : null,
        rate : null
    };

    document.querySelectorAll('.textInput').forEach(textbox => {

        if (textbox.name === 'amountToBorrow' ||
            textbox.name === 'expectedSalary' ||
            textbox.name === 'repaymentPercent') {

            let returnData = sanAndValInput(textbox.value);

            resultsArray.push(returnData[1]);

            switch (returnData[1]) {
                case 0:
                case 1:
                case 2:
                case 3:
                    textbox.nextElementSibling.textContent = returnData[0];
                    break;

                case 9:  //case where no errors have been flagged
                    if (textbox.name === 'amountToBorrow') {
                        if (returnData[0] < 1) {
                            textbox.nextElementSibling.innerHTML = `ERROR: Amount to borrow must be greater than &#163;1.`;
                        } else if (returnData[0] > 8000) {
                            textbox.nextElementSibling.innerHTML = `ERROR: Maximum loan size is &#163;8000.`;
                        } else {
                            returnData[0] = parseFloat(returnData[0]);

                            if (!Number.isInteger(returnData[0])) {
                                textbox.value = returnData[0].toFixed(2);
                            } else {
                                textbox.value = parseInt(returnData[0]);
                            }

                            textbox.nextElementSibling.textContent = '';
                            loanData.loanAmount = returnData[0];
                            resultsArray.push(100);  //valid input code
                        }
                    } else if (textbox.name === 'expectedSalary') {
                        if (returnData[0] <= 0) {
                            textbox.nextElementSibling.textContent = `ERROR: Expected salary must be greater than 0.`;
                        } else {
                            returnData[0] = parseFloat(returnData[0]);

                            if (!Number.isInteger(returnData[0])) {
                                textbox.value = returnData[0].toFixed(2);
                            } else {
                                textbox.value = parseInt(returnData[0]);
                            }

                            textbox.nextElementSibling.textContent = '';
                            loanData.salary = returnData[0];
                            resultsArray.push(100);   //valid input code
                        }
                    } else if (textbox.name === 'repaymentPercent') {
                        if (returnData[0] < 10) {
                            textbox.nextElementSibling.textContent = `ERROR: Repayment rate must be at least 10%.`;
                        } else if (returnData[0] > 100) {
                            textbox.nextElementSibling.textContent = `ERROR: Repayment rate must be between 10% and 100%`;
                        }
                        else {
                            returnData[0] = parseFloat(returnData[0]);

                            if (!Number.isInteger(returnData[0])) {
                                textbox.value = returnData[0].toFixed(2);
                            } else {
                                textbox.value = parseInt(returnData[0]);
                            }

                            textbox.nextElementSibling.textContent = '';
                            loanData.rate = returnData[0];
                            resultsArray.push(100); //valid input code
                        }
                    }
                    break;
            }
        }
    });

    if (checkOK(resultsArray, loanData) === 327) {   // all tests passed

        document.querySelectorAll('.textInput').forEach(textbox => {
           textbox.disabled = true;
        });

        document.querySelector('.theButton').disabled = true;

        document.querySelector('.success').textContent = `All fields have valid input.`;

        document.querySelector('.resultsContainer').classList.add('visible');

        let financeLoan = loanData.loanAmount + calcCharge(loanData.loanAmount);

        let adminFee = calcAdminFee(financeLoan);
        loanData.rate = loanData.rate / 100;

        let months = calcTime(financeLoan, loanData.rate, loanData.salary);

        let finalPayment = calcFinalPayment(financeLoan, loanData.rate, loanData.salary);

        let monthlyPayment = round((financeLoan - finalPayment) / (months - 1),2);


        document.querySelector('.resultLoanTotal').innerHTML = `&#163;${(financeLoan + adminFee).toFixed(2)}`;
        document.querySelector('.resultPrincipal').innerHTML = `&#163;${(loanData.loanAmount).toFixed(2)}`;
        document.querySelector('.resultBorrowingFee').innerHTML = `&#163;${(calcCharge(loanData.loanAmount)).toFixed(2)}`;
        document.querySelector('.resultAdminFee').innerHTML = `&#163;${adminFee.toFixed(2)}`;
        document.querySelector('.resultLoanFinanceComponent').innerHTML = `&#163;${financeLoan.toFixed(2)}`;

        let output = '';

        if (months > 1) {
            if (finalPayment !== 'EXACT') {
                output += `You will pay &#163;${monthlyPayment} for ${months - 1} months, with a final monthly payment of &#163;${round(financeLoan - (monthlyPayment * (months - 1)), 2)}`;
            } else {
                output += `You will pay &#163;${(financeLoan / (months)).toFixed(2)} for ${months} months.`;
            }
        } else output += `You will pay &#163;${financeLoan.toFixed(2)} for 1 month.`

        document.querySelector('.resultFinanceBreakdown').innerHTML = output;
    }
});