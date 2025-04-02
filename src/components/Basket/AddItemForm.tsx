import { FC, KeyboardEvent } from 'react';

interface AddItemFormProps {
    skuInput: string;
    onSkuInput: (value: string) => void;
    onAddItem: () => void;
    isAddDisabled: boolean;
}

const AddItemForm: FC<AddItemFormProps> = ({ skuInput, onSkuInput, onAddItem, isAddDisabled }) => {
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddItem();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[A-Za-z]*$/.test(value)) {
            onSkuInput(value);
        }
    };

    return (
        <div role="form" aria-label="Add item to basket">
            <input
                type="text"
                value={skuInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Enter SKU"
                maxLength={1}
                aria-label="SKU input"
                id="sku-input"
            />
            <button
                onClick={onAddItem}
                disabled={isAddDisabled}
                aria-label="Add item to basket"
            >
                Add Item
            </button>
        </div>
    );
};

export default AddItemForm;
