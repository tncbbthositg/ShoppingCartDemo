# Shopping Cart Demo

A potential employer asked me to put together a demo showing the way I approach front-end development.  This was the assignment.


## Approach

I treated the ShoppingCart component like the abstraction I wanted to build.  Thus, it's the component with tests.  I'll likely go and pull more reusable logic out of the "application side" and test it too.  I'm also going to add some kind of helper around the cart items and quantity change handler.  It's kind of a copout to say, "oh, I didn't test that because that logic doesn't belong in the card component per se."

Also, the employer wants to see this built with Redux.  I wouldn't in this case because it's so simple, Zustand is more pleasant, the Context API would likely suit, etc.  I'd rather just have state and drill the cart down . . . but . . . alas, I'm going to add some form of global state . . . and it'll probably be Redux.


## Getting Things Running

Start the app with:

```
yarn dev
```

You can run the tests with:

```
yarn test
```

It's just Jest, so this works too:

```
yart test --collect-coverage --watch-all
```


## Coming Soon

I'm going to add a github page so you can see what the app does.
