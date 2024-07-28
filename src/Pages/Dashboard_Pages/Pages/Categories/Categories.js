import "../DataTable.css";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Filtration from "../../../../Components/Dashboard/Features/Filtration";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import instance from '../../../../axiosConfig/instance';
import { useHistory } from "react-router-dom";
import EditCategory from "../../Models/Edit/Categories"; 
import { useSelector } from "react-redux";


export default function Categorised() {
  const componentRef = useRef();
  const [categories, setCategories] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [updated, setUpdated] = useState(false);
  const added = useSelector((state) => state.updated);

  const history = useHistory();

  useEffect(() => {
    fetchCategoiers();
    fetchDataUser();
  }, [updated,added]);

  
  const fetchDataUser  = async () => {
    const res = await instance.get(`/api/admin/refresh`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) 
      }
     })
  
     if(res.data.data.Role !== "admin"){
      history.push("/admin/dashboard"); 
     }
  };

  const fetchCategoiers  = async () => {
    const res = await instance.get(`/api/categories`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken")) 
      }
     })
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data.data.map(item => ({ ...item, key: item.id })));

      })
      .catch((err) => {
        console.log(err);
      });
  };


  // const handleDisplayAddModel = () => {
  //   var AddTable = document.getElementById("AddTable");
  //   if (AddTable) AddTable.classList.toggle("visible");
  // };
  
  const handleEdit = (id) => {
    setEditItemId(id);
    setUpdated(!updated);
  };
  
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "STATUS",
      key: "status",
      render: (text, item) =>
        item.status === 1 ? (
          <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>
            Active
          </span>
        ) : (
          <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>
            Inactive
          </span>
        ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={`http://127.0.0.1:8000/storage/${record.image}`}
          alt={record.name}
          style={{ width: "70px", height: "auto" }}
        />
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/categories/show/${item.id}`}
            className="eyeIcon"
            data-tooltip="view"
            style={{ "--c": "#1772FF", "--bg": "#E2EDFB" }}
          >
            <BsEye />
          </Link>
          <Link
            to="#"
            className="editIcon"
            data-tooltip="edit"
            onClick={() => handleEdit(item.id)}
            style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}
          >
            <FiEdit />
          </Link>
        </>
      ),
    },
  ];
  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* filtration feature */}
      <Filtration componentRef={componentRef} />

      <div className="tableItems" ref={componentRef}>
        <Table 
          columns={columns} 
          dataSource={categories} 
          pagination={true} 
        />
      {editItemId && <EditCategory id={editItemId} />}
      </div>
    </div>
  );
    }