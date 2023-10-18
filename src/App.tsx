import { useCallback, useState } from "react"
import { ContentSection } from "./atoms"
import { ItemDisplay } from "./atoms/ItemDisplay"
import { CartItem, ITEMS, Item } from "./models"
import { ShoppingCart } from "./molecules"

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = useCallback(
    (item: Item) => {
      const newItems = [...cartItems];
      const currentItem = newItems.find((ci) => ci.item.id === item.id);

      if (currentItem) {
        currentItem.quantity++;
      } else {
        const newItem = { item, quantity: 1 };
        newItems.push(newItem);
      }

      setCartItems(newItems);
    },
    [cartItems]
  );

  const changeQuantity = useCallback(
    (cartItem: CartItem, newQuantity: number) => {
      let newItems = [...cartItems];
      const item = newItems.find((ci) => ci === cartItem);

      if (!item) {
        throw new Error("Unable to find specified item to update count.");
      }

      item.quantity = newQuantity;

      newItems = newItems.filter((ci) => ci.quantity > 0);
      setCartItems(newItems);
    },
    [cartItems]
  )

  return (
    <div className="grid md:grid-cols-2 gap-8 p-8 min-h-screen">
      <ContentSection heading="Store Front">
        <div className="space-y-10">
          {
            ITEMS.map((item) => (
              <ItemDisplay key={item.id} item={item} onAddToCart={addItemToCart} />)
            )
          }
        </div>
      </ContentSection>

      <ContentSection heading="Shopping Cart">
          <ShoppingCart
            cartItems={cartItems}
            onQuantityChange={changeQuantity}
          >
            { (item) => (<ItemDisplay item={item} />) }
          </ShoppingCart>
      </ContentSection>
    </div>
  )
}

export default App
