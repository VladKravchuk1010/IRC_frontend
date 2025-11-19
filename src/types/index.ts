export interface ChemicalProcess {
    id: number;
    name: string;
    description: string;
    input_reagent: string;
    output_product: string;
    input_mass: number;
    output_mass: number;
    yield_percent: number;
    image: string | null;
    reaction_equation: string;
    parameter_name: string;
    parameter_unit: string;
    parameter_min: number;
    parameter_max: number;
    parameter_default: number;
    is_active: boolean;
}