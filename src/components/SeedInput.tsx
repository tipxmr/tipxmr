import { FC } from "react";

const SeedInput: FC = () => {
  return (
    <label className="block">
      <span className="text-gray-700">XMR seed</span>
      <textarea
        className="w-full"
        required
        id="seed"
        name="seed"
        rows={4}
        autoFocus
      ></textarea>
    </label>
  );
};

export default SeedInput;
