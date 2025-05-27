import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2 px-3">
      <div className="flex gap-3 flex-wrap flex-row items-center justify-between">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name} <br/>
          <span className="capitalize italic text-sm"> {isLoadingIngredients ? "Loading..." : ingredients?.join(', ')}</span>
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
