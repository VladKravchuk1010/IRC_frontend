import type { ChemicalProcess } from "../types";

export const MOCK_PROCESSES: ChemicalProcess[] = [
    {
        id: 1,
        name: "[MOCK] Синтез Аммиака",
        description: "Тестовые данные. Используются для демонстрации интерфейса без бэкенда.",
        input_reagent: "Азот",
        output_product: "Аммиак",
        input_mass: 100,
        output_mass: 85,
        yield_percent: 85,
        image: null, 
        reaction_equation: "N2 + 3H2 -> 2NH3",
        parameter_name: "Давление",
        parameter_unit: "атм",
        parameter_min: 1,
        parameter_max: 100,
        parameter_default: 50,
        is_active: true
    },
    {
        id: 2,
        name: "[MOCK] Электролиз Воды",
        description: "Разложение воды на водород и кислород под действием тока.",
        input_reagent: "Вода",
        output_product: "Водород",
        input_mass: 500,
        output_mass: 55,
        yield_percent: 99,
        image: null,
        reaction_equation: "2H2O -> 2H2 + O2",
        parameter_name: "Сила тока",
        parameter_unit: "А",
        parameter_min: 1,
        parameter_max: 20,
        parameter_default: 5,
        is_active: true
    }
];