import { ColumnTypes, DataType } from './types.ts';
import React from 'react';
import { Button, Popconfirm } from 'antd';
import EditableRow from '../components/EditableRow/EditableRow.tsx';
import EditableCell from '../components/EditableCellProps/EditableCellProps.tsx';

type DefaultColumns = ColumnTypes[number] & {
  editable?: boolean;
  dataIndex: string;
};

export function fnDefaultColumns(
  dataSource: Array<object>,
  handleDelete: (key?: string | number) => void
) {
  const defaultColumns: DefaultColumns[] = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '0',
      render: (_, record: { key?: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Deletar?"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => handleDelete(record?.key)}
          >
            <Button type="primary" danger ghost>
              -
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  return defaultColumns;
}

export function fnMapColumns(
  column: DefaultColumns,
  handleSave: (row: DataType) => void
) {
  if (!column.editable) {
    return column;
  }
  return {
    ...column,
    onCell: (record: DataType) => ({
      record,
      editable: column.editable,
      dataIndex: column.dataIndex,
      title: column.title,
      handleSave,
    }),
  };
}

export const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};
