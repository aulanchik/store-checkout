import { FC } from 'react';
import { validateSpecialQuantity, validateDecimalInput, isValidKeyPress } from '@/utils/validators';

interface PriceInputProps {
    id: string;
    label: string;
    name: string;
    value: number | '';
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sku: string;
    error?: string;
}

const PriceInput: FC<PriceInputProps> = ({ id, label, name, value, onChange, sku, error }) => {

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        let inputValue = input.value;

        if (name === 'specialQuantity') {
            input.value = validateSpecialQuantity(inputValue);
        } else {
            input.value = validateDecimalInput(inputValue);
        }

        if (inputValue.startsWith('0') && !inputValue.startsWith('0.')) {
            input.value = inputValue.replace(/^0+/, '1');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowDecimal = name !== 'specialQuantity';
        if (!isValidKeyPress(e.key, e.currentTarget.value, allowDecimal)) {
            e.preventDefault();
        }
    };

    return (
        <div className="price-input">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="text"
                name={name}
                value={value}
                inputMode='numeric'
                pattern={name === 'specialQuantity' || name === 'unitPrice' ? '[0-9]*' : '[0-9]*[.,]?[0-9]*'}
                onChange={onChange}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                aria-label={`${label.replace(':', '')} for item ${sku}`}
                min={name === 'specialQuantity' ? '2' : '0.01'}
                step={name === 'specialQuantity' ? '1' : '0.01'}
                required
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default PriceInput;
