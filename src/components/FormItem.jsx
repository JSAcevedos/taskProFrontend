import { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";

export default function FormItem({ itemName, children }) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((showForm) => !showForm);
  };

  return (
    <div>
      <button
        className="cursor-pointer flex items-center space-x-3"
        onClick={toggleForm}
      >
        <h1 className="text-xl text-left">{itemName}</h1>
        <MdArrowBackIos
          className={`transition-all ${showForm && "-rotate-90"}`}
        />
      </button>
      <div className={`${!showForm && "hidden"}`}>{children}</div>
    </div>
  );
}
