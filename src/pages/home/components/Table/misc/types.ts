import { Table } from 'antd';
import React from 'react';

type EditableTableProps = Parameters<typeof Table>[0];

export interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
