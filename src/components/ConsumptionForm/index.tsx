'use client';

import * as Form from '@radix-ui/react-form';
import { useEffect, useState } from 'react';
import formStructure from './structure_form';
import { FuelLogFormData } from '@/types/types';
import { useConsumptionData } from '@/app/store/useConsumptionData';

const ConsumptionForm = ({ value, onFocus }: { value: string; onFocus: () => void }) => {
  const currentDate = new Date();
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [focusedRef, setFocusedRef] = useState<HTMLInputElement | null>(null);
  const { consumptionFormData, setFormData, submitForm } = useConsumptionData();

  /*const [formData, setFormData] = useState<FuelLogFormData>({
    date: currentDate.toLocaleDateString(),
    kilometers: '',
    dayKilometers: '',
    litres: '',
    price: '',
  });*/

  useEffect(() => {
    setFormData('date', currentDate.toLocaleDateString());
  });

  useEffect(() => {
    if (focusedRef) {
      focusedRef.value = value;
      const name = focusedRef.name as keyof FuelLogFormData;
      setFormData(name, value);
    }
  }, [focusedRef, value]);

  // Create a type for the field names
  type FormFieldName = (typeof formStructure)[number]['name'];

  // Create a type for the errors object
  type FormErrors = {
    [K in FormFieldName]: string;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FuelLogFormData> = {};
    if (!consumptionFormData.date) newErrors.date = 'Date is required';
    if (!consumptionFormData.kilometers) newErrors.kilometers = 'Total kilometers is required';
    if (!consumptionFormData.dayKilometers) newErrors.dayKilometers = 'Day kilometers is required';
    if (!consumptionFormData.litres) newErrors.litres = 'Litres is required';
    if (!consumptionFormData.price) newErrors.price = 'Price is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      submitForm();
      // Here you would typically send this data to your backend
    }
  };

  const setFocus = (evt: React.MouseEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const fieldname = evt.currentTarget.name;
    setFocusedField(fieldname);
    setFocusedRef(evt.target as HTMLInputElement);
    (evt.target as HTMLInputElement).blur();
    onFocus();
  };

  return (
    <>
      <Form.Root onSubmit={handleSubmit}>
        <div className={'grid grid-cols-2 gap-4 text-white'}>
          <Form.Field
            name={'date'}
            className={'col-span-full flex flex-col gap-y-1'}
          >
            <Form.Label className={'text-center text-xs'}>{'Datum'}</Form.Label>
            <Form.Control
              value={currentDate.toLocaleDateString()}
              disabled={true}
              className={
                'appearance-none rounded-sm border border-white bg-transparent py-1 text-center'
              }
            />
          </Form.Field>
          {formStructure.map((item) => (
            <Form.Field
              name={item.name}
              key={item.name}
              className={`flex flex-col gap-y-1 ${item.width === 'full' ? 'col-span-full' : 'col-span-1'}`}
            >
              <Form.Label className={'text-center text-xs'}>{item.label}</Form.Label>
              <Form.Control
                className={`appearance-none rounded-sm border bg-transparent py-1 text-center ${focusedField === item.name ? 'border-amber-500' : 'border-white'}`}
                onMouseDown={setFocus}
              />
              {errors[item.name] && (
                <Form.Message className="text-red-500">{item.error}</Form.Message>
              )}
            </Form.Field>
          ))}

          <div className={'col-span-full mt-4 flex flex-row justify-center'}>
            <Form.Field name={'submit'}>
              <Form.Submit
                className={
                  'border border-white bg-transparent px-4 py-2 uppercase hover:bg-white hover:text-gray-500'
                }
              >
                Speichern
              </Form.Submit>
            </Form.Field>
          </div>
        </div>
      </Form.Root>
    </>
  );
};
export default ConsumptionForm;
