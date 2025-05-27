import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="px-3 py-2">
      <div className="flex flex-row flex-wrap items-center justify-between gap-3">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name} <br />
          <span className="text-sm capitalize italic">
            {" "}
            {isLoadingIngredients ? "Loading..." : ingredients?.join(", ")}
          </span>
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
