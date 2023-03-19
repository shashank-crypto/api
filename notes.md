## to think

- should I create a modifiers folder and check the roles and authorizations or should I create a modifiers.js file and club the functions there
- creating the delivery system > providing the delivery system
    - sharing the locations for the subscribers for one single subscriptions. (among number of drivers) 
    { min : 10}
    - defining rules for delivery

- modifiers :
    - modifiers check at the roles and define rules, but I need to define roles and rules for each roles somewhere.

- Authentication :
    - should I take the user data each time. On each call to the endpoint a call to the db is not good for db.
    - Caching this call ? 
    - Data to cache : 
    {
        email : "shashank.k.chaudhary@gmail.com",
        phoneNUmber : "",
        phoneVerified : false,
        displayName : "Shashank",
        disabled : false,
        isAdmin : false,
        hasActiveSubscription : false,
        hasTrial : false
    }

- Subscription payment handling :
    - security deposit at the beginning for the period of the subscription
    - can make the payment upfront

# Address in backend
- Hadling address from backend on just lat and long 
- Getting required fields from gMap