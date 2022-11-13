import { FC } from "react";

const PaymentForm: FC = () => {
  return (
    <div className="container rounded bg-white p-2 py-12">
      <h2 className="text-2xl font-bold">Payment method</h2>

      <div className="mt-8">
        <div className="grid grid-cols-2 gap-2 ">
          <label className="block">
            <span className="text-gray-700">Name on card</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
              required
              name="cardName"
              autoComplete="cc-name"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Card number</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
              required
              name="cardNumber"
              autoComplete="cc-number"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Expiry date</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder=""
              required
              name="expDate"
              autoComplete="cc-exp"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">CVV</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
              placeholder="Last three digits on signature strip"
              required
              name="cvv"
              autoComplete="cc-csc"
            />
          </label>

          <div className="col-span-2 mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="saveCard"
                className="rounded border-transparent bg-gray-200 text-gray-700 focus:border-transparent focus:bg-gray-200 focus:ring-1 focus:ring-gray-500 focus:ring-offset-2"
              />
              <span className="ml-2">
                Remember credit card details for next time
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentForm;
