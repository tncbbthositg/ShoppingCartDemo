# Shopping Cart Demo

A potential employer asked me to put together a demo showing the way I approach front-end development.  This was the assignment.


## Approach

I like treating components as though I'm going to someday pull them out of the project and put them in a separate library.  It helps me keep things decoupled.  This is part of the reason I very seldom use global state rather than using local state and drilling down.

Typically, when I need global state, I can get what I want from the Context API.  When I can't I like Zustand.  For this demo, they wanted to see Redux and it just feels wrong.  I don't want to build a ShoppingCart component that's tightly coupled to a global state manager.  I'd rather pass state and handlers into the component.

I'm going to pull my local state and handlers into a hook so that I can test it independently of the "demo app" which I still don't feel compelled to test.  Then, I can replace the guts of the hook with whatever I want (like, local state . . . or local storage . . . or Redux).


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


## Demo App

You can interact with this application on github pages!

[https://tncbbthositg.github.io/ShoppingCartDemo/](https://tncbbthositg.github.io/ShoppingCartDemo/)
