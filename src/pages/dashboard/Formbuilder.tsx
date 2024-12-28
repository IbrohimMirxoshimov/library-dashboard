import React from 'react';
import {Form, Input, Select, DatePicker, Button, Radio, Card} from 'antd';
import type {FormField, FormBuilderProps} from './types';

const FormBuilder: React.FC<FormBuilderProps> = ({fields, onFinish, onCancel, title = 'Form', layout = 'vertical', initialValues = {}}) => {
  const [form] = Form.useForm();

  const renderField = (field: FormField) => {
    const baseProps = {
      placeholder: field.placeholder || `Enter ${field.label}`,
      style: {width: field.width || '100%'},
    };

    switch (field.type) {
      case 'select':
        return (
          <Select {...baseProps}>
            {field.options?.map(opt => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );

      case 'date':
        return <DatePicker {...baseProps} />;

      case 'phone':
        return <Input {...baseProps} prefix={field.prefix || '+998'} />;

      case 'radio':
        return (
          <Radio.Group>
            {field.options?.map(opt => (
              <Radio key={opt.value} value={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        );

      case 'number':
        return <Input type="number" {...baseProps} />;

      default:
        return <Input {...baseProps} />;
    }
  };

  return (
    <Card title={title}>
      <Form form={form} layout={layout} onFinish={onFinish} initialValues={initialValues}>
        {fields.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={[
              {
                required: field.required,
                message: `Please enter ${field.label}`,
              },
            ]}>
            {renderField(field)}
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {onCancel && (
            <Button style={{marginLeft: 8}} onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormBuilder;
