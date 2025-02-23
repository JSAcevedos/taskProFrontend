const TextArea = ({ label, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <textarea 
                className="w-full border border-black p-3" 
                value={value} 
                onChange={onChange} 
            />
        </div>
    )
}

export default TextArea