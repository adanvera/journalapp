import { useEffect, useMemo, useState } from 'react';

interface FormValidation {
    [key: string]: string | null;
}

interface FormValidations {
    [key: string]: [(value: any) => boolean, string];
}

interface FormState {
    [key: string]: any;
}

export const useForm = (initialForm: FormState = {}, formValidations: FormValidations = {}) => {
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState<FormValidation>({});

    useEffect(() => {
        createValidators();
    }, [ formState ])

    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [ formValidation ])

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {
        const formCheckedValues: FormValidation = {};
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField];
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }
        setFormValidation( formCheckedValues );        
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}