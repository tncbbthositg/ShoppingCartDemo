# Shopping Cart Demo

A potential employer asked me to put together a demo showing the way I approach front-end development.  This was the assignment.


![coverage](https://img.shields.io/badge/coverage-80%25-yellowgreen)
![build and deploy](https://github.com/tncbbthositg/ShoppingCartDemo/actions/workflows/deploy.yml/badge.svg)

## Approach

I like treating components as though I'm going to someday pull them out of the project and put them in a separate library.  It helps me keep things decoupled.  This is part of the reason I very seldom use global state rather than using local state and drilling down.

Typically, when I need global state, I can get what I want from the Context API.  When I can't I like Zustand.  For this demo, they wanted to see Redux and it just feels wrong.  I don't want to build a ShoppingCart component that's tightly coupled to a global state manager.  I'd rather pass state and handlers into the component.

I started with just [plain ole local state and handlers](https://github.com/tncbbthositg/ShoppingCartDemo/commit/2c2914b7fbb307a191115a975f6f5fa2bc936cc9#diff-26ad4b834941d9b19ebf9db8082bd202aaf72ea0ddea85f5a8a0cb3c729cc6f2R8-R42).  To make it easier to test and to be "storage" agnostic, I pulled the state and handlers into a hook.  That allowed me to have 3 versions of the hook . . . one with [local state](https://github.com/tncbbthositg/ShoppingCartDemo/commit/ac7ec83d18cf3101f2f934394fd0a985912bc646#diff-32f5263f6923662702bdacb0459f2505addfc6aa14239227d6e11cf98d18fac5), one with [local storage](https://github.com/tncbbthositg/ShoppingCartDemo/commit/7e6b2e7689982d0ab01a07c09e90757e4b261bdc#diff-32f5263f6923662702bdacb0459f2505addfc6aa14239227d6e11cf98d18fac5L13-R14), and one with [redux](https://github.com/tncbbthositg/ShoppingCartDemo/commit/20ccbd7a1e193683a97d9ccc8e1decdabfff6538#diff-32f5263f6923662702bdacb0459f2505addfc6aa14239227d6e11cf98d18fac5).


### For a Fun Exercise, Check This Out

You can replace `useState` with `useLocalStorage` from [usehooks-ts](https://www.npmjs.com/package/usehooks-ts) and it Just Works™!

```ts
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
```

```ts
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);
```

Open it in two separate windows and change one . . . watch what happens to the other window.  Or close the window and open it back up again . . . and magic ensues.  I'll create a tag so we can easily get back to this state and see it work.


## Consuming the ShoppingCart Component

`ShoppingCart` component requires a collection of `CartItems`.  This is a reference to an `Item` and a quantity.  The shopping cart is also responsible for calling for quantity changes so you pass in an `onQuantityChange` handler.  The ShoppingCart is slightly agnostic regarding what the consumer does to handle this action.  It does expect this action to remove the item from the cart, but the consumer can decide how that gets done.

If we need more control over quantity decrement behavior or we don't want to delete at 0, we can always add a delete handler later.

That's it!  You can choose how you want to present the cart.  It should work fine on the page or in a popup.

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
