import { create } from 'zustand';
import { FuelLogFormData } from '@/types/types';

interface ConsumptionData {
  consumptionFormData: FuelLogFormData;
  currentFormValue: string;
  setCurrentValue: (value: string) => void;
  setFormData: (field: keyof FuelLogFormData, value: string) => void;
  submitForm: () => void;
}

export const useConsumptionData = create<ConsumptionData>((set, getState) => ({
  consumptionFormData: {
    date: '',
    kilometers: '',
    dayKilometers: '',
    litres: '',
    price: '',
  },
  currentFormValue: '',

  setCurrentValue: (data: string) => {
    set({ currentFormValue: data });
  },

  setFormData: (field, value) => {
    set((state) => {
      // Check if the value is actually different before updating
      if (state.consumptionFormData[field] !== value) {
        return {
          consumptionFormData: {
            ...state.consumptionFormData,
            [field]: value,
          },
        };
      }
      // If the value hasn't changed, return the current state to prevent an update
      return state;
    });
  },

  submitForm: () => {
    const { consumptionFormData } = getState();
    console.log(consumptionFormData);
  },
}));
