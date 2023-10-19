import { FunctionComponent } from 'react';
import { CartItem } from '../../models';
import { IconMinus, IconPlus, IconTrash } from '../../atoms';

export type QuantityControlHandlers = {
  onQuantityChange: (item: CartItem, quantity: number) => void;
}

type QuantityControlProps = QuantityControlHandlers & {
  cartItem: CartItem;
};

export const QuantityControl: FunctionComponent<QuantityControlProps> = (props) => {
  const { onQuantityChange, cartItem } = props;

  return (
    <div>
      <div className='flex gap-2 justify-end' data-testid='item-quantity'>
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
  );
}
