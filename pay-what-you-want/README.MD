# Pay what you want form

If you want to use it, you'll need:

- a custom server for the "backend" folder. Personaly would recommend using https://render.com/ and a 7$/month "service" server.
- create a .env file based on .env.sample with your own data

## What you might need to know about stripe subscriptions:

- you need a planId to create a subscription
- once a plan is created, you cannot easily change its price (you can do discounts though but didn’t work for my usecase)
- the way people do when they want to do this is creating one plan per subscription.

## How we do the thing here:

### Front end:

- send a request to the custom server
- wait for the response with checkout link.
- Follow the link. over.

### Back end:

- receive the request, make all the checks.
- create a plan based on the price requested
- send a session id that redirects to the payment page

## With this method we get

- custom price payment
- automatic sync with ghost (we owe this to the beautiful architecture of Ghost :heart:)
  c- onfirmation email is sent like usual
