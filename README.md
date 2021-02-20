# maskup
## Mask Up! A Keystone.js and React face mask marketplace

Buy and sell face masks to protect you during the pandemic :)
Sign up for an account, post your own products, or 'buy' one of the available masks.
The payment API is Stripe, and is in test mode.  There are lots of test cards for you to use [here](https://stripe.com/docs/testing).

- Store: https://maskup.joshualokken.tech
  - [Frontend README](https://github.com/jrrlokken/maskup/blob/master/frontend/README.md)
- Backend: https://api.maskup.joshualokken.tech
  - [Backend README](https://github.com/jrrlokken/maskup/blob/master/backend/README.md)

The backend is Keystone.js with a GraphQL API, and data is hosted on MongoDB Atlas.
The marketplace is a Next/React app. Both are hosted on a Digital Ocean droplet.

Tests are in the __tests__ directory, and are written with Jest and Enzyme.
