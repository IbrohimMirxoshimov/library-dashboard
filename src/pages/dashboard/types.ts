// types.ts
export type FieldType = 'text' | 'select' | 'date' | 'phone' | 'radio' | 'number';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: Array<{label: string; value: string}>;
  placeholder?: string;
  prefix?: string;
  width?: number | string;
}

export interface FormBuilderProps {
  fields: FormField[];
  onFinish?: (values: Record<string, unknown>) => void;
  onCancel?: () => void;
  title?: string;
  layout?: 'horizontal' | 'vertical';
  initialValues?: Record<string, unknown>;
}

export interface ModalProps {
  onSubmit?: (type: 'book' | 'user', values: Record<string, unknown>) => void;
}

// configurations.ts
export const bookFormConfig: FormField[] = [
  {
    name: 'bookTitle',
    label: 'Kitobxon',
    type: 'text',
    required: true,
  },
  {
    name: 'bookId',
    label: 'ID',
    type: 'text',
    required: true,
  },
  {
    name: 'submissionDate',
    label: 'Topshirilgan sana',
    type: 'date',
    required: true,
  },
  {
    name: 'returnDate',
    label: "Qaytarillishi kerak bo'lgan sana",
    type: 'date',
    required: true,
  },
  {
    name: 'specialNumber',
    label: 'Maxsus raqami',
    type: 'text',
  },
];

export const userFormConfig: FormField[] = [
  {
    name: 'firstName',
    label: 'Ism',
    type: 'text',
    required: true,
  },
  {
    name: 'familyName',
    label: 'Familiya',
    type: 'text',
    required: true,
  },
  {
    name: 'birthDate',
    label: "Tug'ilgan kun",
    type: 'date',
  },
  {
    name: 'passport',
    label: 'Passport',
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Telefon raqam',
    type: 'phone',
    required: true,
    prefix: '+998',
  },
  {
    name: 'gender',
    label: 'Jinsi',
    type: 'radio',
    required: true,
    options: [
      {label: 'Erkak', value: 'male'},
      {label: 'Ayol', value: 'female'},
    ],
  },
  {
    name: 'region',
    label: 'Viloyat',
    type: 'select',
    required: true,
    options: [
      {label: 'Tashkent', value: 'tashkent'},
      {label: 'Samarkand', value: 'samarkand'},
    ],
  },
  {
    name: 'district',
    label: 'Tuman',
    type: 'select',
    required: true,
    options: [
      {label: 'District 1', value: 'district1'},
      {label: 'District 2', value: 'district2'},
    ],
  },
];
