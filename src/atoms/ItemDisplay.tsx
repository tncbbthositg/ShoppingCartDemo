import { FunctionComponent } from 'react';
import { Item } from '../models';
import { formatCurrency } from '../utilities';

type ItemDisplayProps = {
  item: Item;
  onAddToCart?: (item: Item) => void;
};

export const ItemDisplay: FunctionComponent<ItemDisplayProps> = (props) => {
  const { item, onAddToCart } = props;

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex grow space-x-4">
        <img src={item.image} alt={item.name} className="rounded" />
        <div className="grow">
          <h2 className="text-2xl">{item.name}</h2>
          <span>{formatCurrency(item.price)}</span>
        </div>
      </div>
      { !!onAddToCart && (
        <div>
          <button
            className="bg-teal-700 text-white px-6 py-3 rounded opacity-70 hover:opacity-100 w-full"
            type="button"
            onClick={() => onAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}
