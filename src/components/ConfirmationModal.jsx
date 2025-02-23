export default function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null

  return (
    <div className="fixed z-[100] inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg mx-10">
        <p>{message}</p>
        <div className="mt-4 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-alert text-white rounded cursor-pointer">Confirm</button>
        </div>
      </div>
    </div>
  )
}