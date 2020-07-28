const Stripe = require('stripe');
const stripe = Stripe('sk_test_51H9gRDLL931ZhLgotFaZVQVGtASx9EnmnuewwmEbbQMWX06TtDUh9NvppsNyAqqTvqSd1PSwJVf9XHesch0dEHqX00yieCGGVl');

function crearCustomer(){
(async() => {
    try {
        const customer = await stripe.customers.create(
            {
              description: 'My First Test Customer (created for API docs)',
            }
          );
          console.log('Customers:',customer);
        
    } catch (error) {
        console.log('Error:', error);
    }

})();
}

module.exports =  {
  "crearCustomer": crearCustomer
}