import React, { useEffect, useState } from "react";
import { Table, Badge, Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

function Test(props) {
  
  const [datacardindex, setcardindex] = useState([]);

  useEffect(() => {
    filterdata(props.data);
  }, [props.data]);

  ////  maiking arry of projects

  const filterdata = (arry) => {
    let arryofprojects = [];
    if (arry) {
      const projects = arry.map((newob) => newob.project);
      const uniqueArray = projects.filter((item, pos) => {
        return projects.indexOf(item) == pos;
      });

      for (let i = 0; i < uniqueArray.length; i++) {
        const projectsunion = arry.filter(
          (item) => item.project === uniqueArray[i]
        );
        arryofprojects.push({ projectsunion });
      }
      // return arryofprojects;
      setcardindex(arryofprojects);
    }
  };



  function createData(project, code, cardindexi) {
    return {
      project,
      code,

      cardindexi: cardindexi,
    };
  }


  const rows = [];
  // console.log(datacardindex[0]?.projectsunion);
  const roes1 = () => {
    if (datacardindex) {
      for (let i = 0; i < datacardindex.length; i++) {
        rows.push(
          createData(
            datacardindex[i]?.projectsunion[0].project,
            datacardindex[i]?.projectsunion[0].code,
            datacardindex[i]?.projectsunion
          )
        );
      }
    }
  };

  roes1();
;
  const expandedRowRender = () => {

    


    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    // const data = [];
    // for (let i = 0; i < 3; ++i) {
    //   data.push({
    //     key: i,
    //     date: '2014-12-24 23:12:00',
    //     name: 'This is production name',
    //     upgradeNum: 'Upgraded: 56',
    //   });
    // }
    return <Table columns={rows} dataSource={rows} pagination={false} />;
  };

  const columns = [
    { title: 'פרויקט', dataIndex: 'project', key: 'project' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  // const data = [];
  // for (let i = 0; i < 3; ++i) {
  // data.push({
  //     key: i,
  //     name: 'Screem',
  //     platform: 'iOS',
  //     version: '10.3.4.5654',
  //     upgradeNum: 500,
  //     creator: 'Jack',
  //     createdAt: '2014-12-24 23:12:00',
  //   });
  // }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={rows}
    />
  );
}

export default Test;
