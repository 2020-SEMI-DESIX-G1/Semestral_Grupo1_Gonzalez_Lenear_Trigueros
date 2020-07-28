var stripe = require('stripe')('sk_test_51H9gRDLL931ZhLgotFaZVQVGtASx9EnmnuewwmEbbQMWX06TtDUh9NvppsNyAqqTvqSd1PSwJVf9XHesch0dEHqX00yieCGGVl');

function asociar(){

    (async () =>{
        const pma = await stripe.paymentMethods.attach(
            'pm_1H9m8pLL931ZhLgoGm47Liq5',
             {customer: 'cus_HjEYBOKmI6nIVn'},
        );
        console.log('pma: ', pma);
    })();
}

module.exports =  {
    "asociar": asociar
}