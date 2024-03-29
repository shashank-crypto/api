# Namma Dabba

#### What is this ?
In Bangalore there are so many people who are completely dependent on the outside food or are missing on nutritious food. People are skipping food because they don't find the right options or can't get time to make food for themselves. This is creating an issue not only with physical health but mental health as well.

### Mission
- This system aims at changing this way of living by providing easy access to the people who are ready to provide ready, nutritious and regular food. 
- We are connecting the people to those who are hungry and busy to those who are hungry to feed.
- We are building a system that brings together those who need each other's services.
- We are aiming on creating the system for the food subscribers, food vendors and food delivery system if necessary.
- We are trying to make it easier to find, manage, connect and get delivered with the taste of the home.

### Explaining the system
- This is the api to the system that we have plans on building and serving the users.
- What can be done in this system : 
    - Can check several vendors catalogued and their subscriptions and trial plans.
    - Can subscribe to a plan.
    - Can cancel or pause subscriptions.
    - Has many options to choose from and can see others' reviews and ratings

### Endpoints 

- `/createUser`
- `/createVendor`
- `/createPlan`
- `/subscribe`
- `/getPlans`
- `/fetchPlans` 
    - First fetch plans by radius (default)
    - Filters 
        - By vendors
        - By name
        - By session
        - Sorting by [price, rating]

## Required ENVs
```
PORT = ''

# MongoDB connection details
MONGO_USER = ''
MONGO_PASSWORD = ''
MONGO_URI = ""

# redis connection details
REDIS_HOST = '127.0.0.1'
REDIS_PORT = 6379
REDIS_DB = 0
REDIS_PASSWORD = ''
```
## Authors

- [@shashank-crypto](https://github.com/shashank-crypto)


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Feedback

If you have any feedback, please reach out at shashank.k.chaudhary@gmail.com

