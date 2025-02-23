const PriorityButtons = ({ selectedPriority, onSelectPriority }) => {
    const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <div className="flex flex-wrap space-x-2">
            {priorities.map(priority => (
                <button
                    key={priority}
                    className={`min-w-[2.5rem] min-h-[2.5rem] m-2 border cursor-pointer hover:bg-secondary hover:text-white ${selectedPriority === priority ? 'bg-secondary text-white' : 'bg-quaternary'}`}
                    type="button"
                    onClick={() => onSelectPriority(priority)}
                >
                    {priority}
                </button>
            ))}
        </div>
    )
}

export default PriorityButtons