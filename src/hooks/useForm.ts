import { useEffect, useMemo, useState } from 'react';

type FormValidations = {
    [key: string]: [(value: any) => boolean, string];
};

type FormState = {
    [key: string]: any;
};

export const useForm = (initialForm: FormState = {}, formValidations: FormValidations = {}) => {

    const [formState, setFormState] = useState<FormState>(initialForm);
    const [formValidation, setFormValidation] = useState<{ [key: string]: string | null }>({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation])

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
        const formCheckValues: { [key: string]: string | null } = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMssg] = formValidations[formField];
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMssg;
        }
        setFormValidation(formCheckValues);
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