import { FunctionComponent, ReactNode } from 'react';
import { CartItem, Item } from '../../models';
import { QuantityControl, QuantityControlHandlers } from './QuantityControl';

export type ShoppingCartProps = QuantityControlHandlers & {
  cartItems: CartItem[];
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
    <div className='space-y-10'>
      {
        cartItems.map(cartItem => (
          <div className='flex flex-col xl:flex-row gap-4' key={cartItem.item.id}>
            <div className='grow'>
              { children(cartItem.item) }
            </div>

            <QuantityControl cartItem={cartItem} onQuantityChange={onQuantityChange} />
          </div>
        ))
      }

      <div data-testid='cart-total' className='text-2xl font-bold text-right'>
        Total: ${PRICE_FORMAT.format(totalAmount)}
      </div>
    </div>
  );
}
