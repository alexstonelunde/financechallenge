function sanAndValInput(input) {

    /**
     * Error codes:
     *
     * 0: empty string
     * 1: spaces in string
     * 2: not a number
     * 3: string length > 10
     * 9: no error
     */

    let returnData = [];
    input = input.trim();

    let inputArray = Array.from(input);

    for (let i = 0; i < inputArray.length - 1; i++) {
        if (inputArray[i] === ' ') {
            returnData.push('ERROR: Field input cannot contain spaces.', 1);
            return returnData;
        }
    }

    if (input === '') {
        returnData.push('ERROR: Field cannot be empty.', 0);
        return returnData;
    }

    if (inputArray.length > 10) {
        returnData.push('ERROR: Length of field input cannot exceed 10 characters.', 3);
        return returnData;
    }

    else {
        if (isNaN(input)) {
            returnData.push('ERROR: Field input must be a valid number.', 2);
            return returnData;
        } else {
            returnData.push(input, 9);
            return returnData;
        }
    }
}

function checkOK (input, loanData) {

    let result = 0;
    let loanDataArray = Object.values(loanData);

    for (let i = 0; i < input.length; i++) {
        result += input[i];

        if (loanDataArray[i] === null) {
            return false;
        }
    }

    return result;
}

function calcTime(amountBorrowed, repaymentRate, salary) {

    let monthlySalary = salary / 12;

    return Math.ceil(amountBorrowed / (monthlySalary * repaymentRate));

}


function calcFinalPayment(amountBorrowed, repaymentRate, salary) {
    let monthlySalary = salary / 12;
    let monthlyRepayment = monthlySalary * repaymentRate;
    let monthsLeft = amountBorrowed / monthlyRepayment;

    if ((Number.isInteger(monthsLeft) === false) && (repaymentRate < 1)) {
        return ((monthsLeft - (Math.floor(monthsLeft))) * monthlyRepayment);
    }

    else {
        return 'EXACT';
    }
}


function calcAdminFee (amountBorrowed) {

    return (amountBorrowed / 20);

}


function calcCharge(amountBorrowed) {

    amountBorrowed = parseFloat(amountBorrowed);

    let charge = 0;

    if (amountBorrowed > 6400 && amountBorrowed <= 7200) {
        return charge = 500;
    } else if (amountBorrowed > 7200) {
        return charge = 1000;
    } else return charge;

}

function round(value, decimals) {

    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);

}

