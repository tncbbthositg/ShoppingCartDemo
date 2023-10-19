import { ContentSection, ItemDisplay } from "./atoms"
import { ITEMS } from "./models"
import { ShoppingCart } from "./molecules"
import { useCart } from "./hooks"

function App() {
  const { cartItems, addItemToCart, changeItemQuantity} = useCart();

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 min-h-screen">
      <ContentSection heading="Store Front" className="grow">
        <div className="space-y-10">
          {
            ITEMS.map((item) => (
              <ItemDisplay key={item.id} item={item} onAddToCart={addItemToCart} />)
            )
          }
        </div>
      </ContentSection>

      <ContentSection heading="Shopping Cart" className="md:w-3/12 min-w-[400px]">
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
