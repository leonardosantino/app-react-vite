import React from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/es/form';

interface EditableRowProps {
  index: number;
}

export const EditableContext = React.createContext<FormInstance<any> | null>(
  null
);

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableRow;
