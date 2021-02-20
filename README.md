# Mask Up!
## A Keystone.js and React face mask marketplace

Buy and sell face masks to protect you and others during the pandemic :)  
Sign up for an account, sell your own products, or 'buy' one of the available masks.  
The payment API is Stripe, and is in test mode.  There are lots of test cards for you to use [here](https://stripe.com/docs/testing).

- Store: https://maskup.joshualokken.tech
  - [Frontend README](https://github.com/jrrlokken/maskup/blob/master/frontend/README.md)
- API: https://api.maskup.joshualokken.tech
- GraphQL Playground: https://api.maskup.joshualokken.tech/api/graphql
  - [Backend README](https://github.com/jrrlokken/maskup/blob/master/backend/README.md)

The backend is a [Keystone.js](https://www.keystonejs.com/) headless CMS and GraphQL API, and data is hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).  
Images are hosted on [Cloudinary](https://cloudinary.com). Email service is [Twilio Sendgrid](https://cloudinary.com).  
The marketplace is a Next/React app. Both are hosted on a Digital Ocean droplet.

Tests are in the \__tests\__ directories, and are written with Jest and Enzyme.
