/* eslint-disable react/prop-types */
const RadioButton = ({ value, name, selected, onChange, label }) => {
    return (
        <button
            name={name}
            type="button"
            className={`mx-auto p-1 px-4 font-montserrat rounded-md text-sm focus:outline-none ${selected ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'
                }`}
            onClick={() => onChange(value)}
        >
            {label}
        </button>
    );
};

export default RadioButton;