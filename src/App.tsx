import { ContentSection, ItemDisplay } from "./atoms"
import { ITEMS } from "./models"
import { ShoppingCart } from "./molecules"
import { useCart } from "./hooks"

function App() {
  const { cartItems, addItemToCart, changeItemQuantity} = useCart();

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
            onQuantityChange={changeItemQuantity}
          >
            { (item) => (<ItemDisplay item={item} />) }
          </ShoppingCart>
      </ContentSection>
    </div>
  )
}

export default App
