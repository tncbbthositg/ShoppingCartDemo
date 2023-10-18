import { FunctionComponent, ReactNode } from 'react';
import { CartItem, Item } from '../models';
import { IconMinus, IconPlus, IconTrash } from '../atoms';

export type ShoppingCartProps = {
  cartItems: CartItem[];
  onQuantityChange: (item: CartItem, quantity: number) => void;
  children: (item: Item) => ReactNode;
};

const PRICE_FORMAT = new Intl.NumberFormat(
  'en-US',
  {
    minimumFractionDigits: 2,
  }
);

export const ShoppingCart: FunctionComponent<ShoppingCartProps> = (props) => {
  const { cartItems, children, onQuantityChange } = props;

  if (cartItems.length === 0) {
    return (
      <h1>Shopping cart is empty.  Add an item to checkout.</h1>
    );
  }

  const totalAmount = cartItems.reduce(
    (agg, cartItem) => agg + cartItem.item.price * cartItem.quantity,
    0
  );

  return (
    <div className='space-y-6'>
      {
        cartItems.map(cartItem => (
          <div className='flex' key={cartItem.item.id}>
            <div className='grow'>
              { children(cartItem.item) }
            </div>

            <div>
              <div className='flex space-x-2' data-testid='item-quantity'>
                <div className='border rounded flex items-center'>
                  <button
                    type='button'
                    aria-label='reduce count'
                    className='bg-gray-200 p-2'
                    onClick={() => onQuantityChange(cartItem, cartItem.quantity - 1)}
                  >
                    { cartItem.quantity > 1 ? <IconMinus /> : <IconTrash /> }
                  </button>

                  <span className='w-12 px-2 inline-block text-right'>
                    { cartItem.quantity }
                  </span>

                  <button
                    type='button'
                    aria-label='increase count'
                    className='bg-gray-200 p-2'
                    onClick={() => onQuantityChange(cartItem, cartItem.quantity + 1)}
                  >
                    <IconPlus />
                  </button>
                </div>

                <button
                  type='button'
                  aria-label='delete item'
                  className='text-pink-900 bg-gray-200 rounded p-2'
                  onClick={() => onQuantityChange(cartItem, 0)}
                >
                  <IconTrash />
                </button>
              </div>
            </div>
          </div>
        ))
      }

      <div data-testid='cart-total' className='text-2xl font-bold text-right'>
        Total: ${PRICE_FORMAT.format(totalAmount)}
      </div>
    </div>
  );
}
