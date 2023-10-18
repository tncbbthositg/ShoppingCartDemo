import { act, renderHook } from '@testing-library/react';
import { useCart } from '../../src/hooks';
import { Item } from '../../src/models';
import { v4 } from 'uuid';

const testItem3: Item = {
  id: v4(),
  name: 'Test Item 3',
  image: '',
  price: 3.33,
};

describe(useCart, () => {
  it('returns an empty array to start with', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cartItems).toEqual([]);
  });

  describe('addItemToCart', () => {
    it('adds a new item to the cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItemToCart(testItem3);
      });

      expect(result.current.cartItems).toHaveLength(1);
    });

    it('increments the quantity when an item is added more than once', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItemToCart(testItem3);
      });

      act(() => {
        result.current.addItemToCart(testItem3);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].quantity).toBe(2);
    });
  });

  describe('changeItemQuantity', () => {
    it('updates the quantity', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItemToCart(testItem3);
      });

      act(() => {
        const cartItem = result.current.cartItems[0];
        result.current.changeItemQuantity(cartItem, 1118);
      });

      expect(result.current.cartItems[0]).toMatchObject({ quantity: 1118 });
    });

    it('throws an error if the item is not available to update', () => {
      const { result } = renderHook(() => useCart());

      expect(() =>
        act(() => {
          const cartItem = { item: testItem3, quantity: 2 };
          result.current.changeItemQuantity(cartItem, 1118);
        })
      ).toThrowError('Unable to find specified item to update count.');
    });

    it('removes items when their quantity drops below 1', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addItemToCart(testItem3);
      });

      act(() => {
        const cartItem = result.current.cartItems[0];
        result.current.changeItemQuantity(cartItem, 0);
      });

      expect(result.current.cartItems).toHaveLength(0);
    });
  });
});
