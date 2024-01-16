import './style.css';

import React, { useState } from 'react';

import { Button, Table } from 'antd';
import { ColumnTypes, DataType } from './misc/types.ts';
import { data } from './misc/data.ts';
import { components, fnDefaultColumns, fnMapColumns } from './misc/util.tsx';

const DataTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(data.dataSource);
  const m = 'coll';

  const handleDelete = (key?: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData: DataType = {
      key: dataSource.length + 1,
      name: '-',
      age: '-',
      address: '-',
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const defaultColumns = fnDefaultColumns(data.dataSource, handleDelete);

  const columns = defaultColumns.map((column) =>
    fnMapColumns(column, handleSave)
  );

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        +
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default DataTable;
