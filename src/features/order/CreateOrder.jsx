import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "loading";
  const user = useSelector((state) => state.user);
  const {
    address,
    position,
    status: addressStatus,
    error: addressError,
  } = user;
  const isLoadingAddress = addressStatus === "loading";
  const [username, setUsername] = useState(() => user.username);
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const formErrors = useActionData();

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="my-4">
      <h2 className="mb-4 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST" action="/order/new">
        <div className="mb-4 flex flex-col gap-1 sm:mb-3 sm:flex-row sm:items-center sm:gap-0">
          <label className="sm:basis-40">First Name:</label>
          <div className="grow">
            <Input
              type="text"
              name="customer"
              placeholder="First Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-1 sm:mb-3 sm:flex-row sm:items-center sm:gap-0">
          <label className="sm:basis-40">Phone number:</label>
          <div className="grow">
            <Input type="tel" name="phone" placeholder="Phone" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-1 text-sm text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className={`${!isSubmitting ? "relative" : ""} mb-4 flex flex-col gap-1 sm:mb-3 sm:flex-row sm:items-center sm:gap-0`}>
          <label className="sm:basis-40">Address:</label>
          <div className="grow">
            <Input
              type="text"
              name="address"
              placeholder="Address"
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-1 text-sm text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-1 top-8 sm:top-1 md:top-1">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-8 mt-4 flex gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="inline-block h-6 w-6 rounded-full accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="text-lg font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing Order"
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your phone number. We might need it to cantact you";
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
