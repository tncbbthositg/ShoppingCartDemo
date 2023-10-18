import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ShoppingCart } from '../../src/molecules';
import { CartItem, Item } from '../../src/models';
import { v4 } from 'uuid';

const testItem3: Item = {
  id: v4(),
  name: 'Test Item 3',
  image: '',
  price: 3.33,
};

const testItem7: Item = {
  id: v4(),
  name: 'Test Item 7',
  image: '',
  price: 7.77,
};

describe(ShoppingCart, () => {
  it('presents a helpful message when the shopping cart is empty', () => {
    const { rerender } = render(<ShoppingCart cartItems={[]} onQuantityChange={() => {}}>{ () => null }</ShoppingCart>);
    expect(screen.getByRole('heading')).toHaveTextContent('Shopping cart is empty.');

    const item: CartItem = { item: testItem3, quantity: 1 };
    rerender(<ShoppingCart cartItems={[item]} onQuantityChange={() => {}}>{ () => null }</ShoppingCart>);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('lists the items in the cart', () => {
    const items: CartItem[] = [
      { item: testItem3, quantity: 2 },
      { item: testItem7, quantity: 1 },
    ];
    render(
      <ShoppingCart cartItems={items} onQuantityChange={() => {}}>
        { (item) => (<h1>{item.name}</h1>) }
      </ShoppingCart>
    );

    expect(screen.getAllByRole('heading').map(e => e.textContent)).toEqual([
      'Test Item 3',
      'Test Item 7',
    ]);
  });

  describe('quantity', () => {
    it('shows the quantity for each item', () => {
      const items: CartItem[] = [
        { item: testItem3, quantity: 2 },
        { item: testItem7, quantity: 17 },
      ];

      render(
        <ShoppingCart cartItems={items} onQuantityChange={() => {}}>{ () => null }</ShoppingCart>
      );
      expect(screen.queryAllByTestId('item-quantity').map(e => e.textContent)).toEqual(['2', '17']);
    });

    it('increments if you press the plus button', async () => {
      const items: CartItem[] = [
        { item: testItem3, quantity: 2 },
      ];

      const quantityChangeMock = jest.fn();

      render(
        <ShoppingCart cartItems={items} onQuantityChange={quantityChangeMock}>{ () => null }</ShoppingCart>
      );

      const itemQuantity = screen.getAllByTestId('item-quantity')[0];
      const incrementButton = within(itemQuantity).getByRole('button', { name: /increase/i});
      await userEvent.click(incrementButton);

      expect(quantityChangeMock).toHaveBeenCalledWith(items[0], 3);
    });

    it('decrements if you press the minus button', async () => {
      const items: CartItem[] = [
        { item: testItem3, quantity: 2 },
      ];

      const quantityChangeMock = jest.fn();

      render(
        <ShoppingCart cartItems={items} onQuantityChange={quantityChangeMock}>{ () => null }</ShoppingCart>
      );

      const itemQuantity = screen.getAllByTestId('item-quantity')[0];
      const decrementButton = within(itemQuantity).getByRole('button', { name: /reduce/i});
      await userEvent.click(decrementButton);

      expect(quantityChangeMock).toHaveBeenCalledWith(items[0], 1);
    });

    it('deletes the item if you press the delete button', async () => {
      const items: CartItem[] = [
        { item: testItem3, quantity: 2 },
      ];

      const quantityChangeMock = jest.fn();

      render(
        <ShoppingCart cartItems={items} onQuantityChange={quantityChangeMock}>{ () => null }</ShoppingCart>
      );

      const itemQuantity = screen.getAllByTestId('item-quantity')[0];
      const deleteButton = within(itemQuantity).getByRole('button', { name: /delete/i});
      await userEvent.click(deleteButton);

      expect(quantityChangeMock).toHaveBeenCalledWith(items[0], 0);
    });

    it('shows a different decrement icon if there is only one item left', async () => {
      // todo: come up with a more pleasing way to test this

      const items: CartItem[] = [
        { item: testItem3, quantity: 2 },
      ];

      const { rerender } = render(
        <ShoppingCart cartItems={items} onQuantityChange={() => {}}>{ () => null }</ShoppingCart>
      );

      const itemQuantity = screen.getAllByTestId('item-quantity')[0];
      const decrementButton = within(itemQuantity).getByRole('button', { name: /reduce/i});
      const decrementIcon = decrementButton.querySelector('svg');

      items[0].quantity = 1;
      rerender(
        <ShoppingCart cartItems={items} onQuantityChange={() => {}}>{ () => null }</ShoppingCart>
      );

      const removeLastItemIcon = decrementButton.querySelector('svg');
      expect(removeLastItemIcon).not.toEqual(decrementIcon);

      const deleteButton = within(itemQuantity).getByRole('button', { name: /delete/i});
      const deleteIcon = deleteButton.querySelector('svg');
      expect(removeLastItemIcon).toEqual(deleteIcon);
    });
  });

  describe('cart total', () => {
    it('shows a total cost of the items in the cart based on quantity', () => {
      const items: CartItem[] = [
        { item: testItem3, quantity: 2 },
        { item: testItem7, quantity: 1 },
      ];

      render(
        <ShoppingCart cartItems={items} onQuantityChange={() => {}}>{ () => null }</ShoppingCart>
      );
      expect(screen.queryByTestId('cart-total')).toHaveTextContent('Total: $14.43');
    });

    it('pads the total with 0s if needed', () => {
      const items: CartItem[] = [
        { item: testItem3, quantity: 1 },
        { item: testItem7, quantity: 1 },
      ];

      render(
        <ShoppingCart cartItems={items} onQuantityChange={() => {}}>{ () => null }</ShoppingCart>
      );

      expect(screen.queryByTestId('cart-total')).toHaveTextContent('Total: $11.10');
    });
  });
});
