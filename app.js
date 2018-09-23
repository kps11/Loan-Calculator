//listen for the submit button

document.querySelector('#loan-form').addEventListener('submit',function (e) {
    //hide results
    document.getElementById('results').style.display ='none';

    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResult,2000);

    e.preventDefault();

});

//Calculate Results
function calculateResult() {

    console.log('hii');
    //get the ui vars
    const loanAmount = document.getElementById('amount');
    const interst = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthly_payment =  document.getElementById('monthly-payment');
    const total_interest = document.getElementById('total-interest');
    const total_payment = document.getElementById('total-payment');


    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(interst.value)/100/12;
    const calculatedPAyments = parseFloat(years.value)*12;

    //compute monthly payment

    const  x = Math.pow(1+calculatedInterest,calculatedPAyments);
    const monthly =  (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){

        monthly_payment.value= monthly.toFixed(2);
        total_payment.value = (monthly* calculatedPAyments).toFixed(2);
        total_interest.value =((monthly * calculatedPAyments)- principal).toFixed(2);


        //show results
        document.getElementById('results').style.display ='block';
        //hide loading
        document.getElementById('loading').style.display='none';


    }else {
        showError('Please check your Number');
    }

    
}

//show error
function showError(error) {

    //hide results
    document.getElementById('results').style.display ='none';
    //hide loading
    document.getElementById('loading').style.display='none';


    //create errorDiv
    const errorDiv = document.createElement('div');

    //get element

    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    //Add class
    errorDiv.className = "alert alert-danger";

    //create textnode and append to the error div
    errorDiv.appendChild(document.createTextNode(error));


    //add error abovethe haeding
    card.insertBefore(errorDiv,heading);

    //clear error after 3 secs

    setTimeout(clearError,3000);

}

function clearError() {

    document.querySelector('.alert').remove();
}