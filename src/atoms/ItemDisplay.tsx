import { FunctionComponent } from 'react';
import { Item } from '../models';

type ItemDisplayProps = {
  item: Item;
  onAddToCart?: (item: Item) => void;
};

export const ItemDisplay: FunctionComponent<ItemDisplayProps> = (props) => {
  const { item, onAddToCart } = props;

  return (
    <div className="flex space-x-4">
      <img src={item.image} alt={item.name} className="rounded" />
      <div className="grow">
        <h2 className="text-2xl">{item.name}</h2>
        <span>{item.price}</span>
      </div>
      { !!onAddToCart && (
        <div>
          <button
            className="bg-teal-700 text-white px-6 py-3 rounded opacity-70 hover:opacity-100"
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
