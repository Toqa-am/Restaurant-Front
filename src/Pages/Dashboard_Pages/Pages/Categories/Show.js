import "../DataTable.css";
import { Tabs } from "antd";
import { TabPane } from "react-bootstrap";
import {
  FaInfoCircle,
  FaImage,
  FaThLarge,
  FaPlus,
  FaPuzzlePiece,
} from "react-icons/fa";

import { useParams, useHistory } from "react-router-dom";
import Information from "./Models/Information";
import Image from "./Models/Image";
import Extra from "./Models/Extra";
import Addon from "./Models/Addon";
import React, { useEffect, useState } from "react";
import instance from '../../../../axiosConfig/instance';


export default function ShowItem() {
  const { id } = useParams();
  const history = useHistory();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    try {
      const res = await instance.get(`/api/admin/refresh`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken"))
        }
      });

      if (res.data.data.Role !== "admin") {
        history.push("/admin/dashboard");
      } else {
        fetchDataCategory(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataCategory = async (categoryId) => {
    try {
      const res = await instance.get(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken"))
        }
      });
      setCategoryData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ShowItem ItemsTabs">
      <Tabs defaultActiveKey="1">
        <TabPane
          className="TabPane"
          tab={
            <span>
              <FaInfoCircle />
              Information
            </span>
          }
          key="1"
        >
          {categoryData && <Information data={categoryData} />}
        </TabPane>
        <TabPane
          tab={
            <span>
              <FaImage />
              Images
            </span>
          }
          key="2"
        >
          {categoryData && <Image data={categoryData.image} />}
          </TabPane>
        <TabPane
          tab={
            <span>
              <FaPlus />
              Extra
            </span>
          }
          key="4"
        >
          {categoryData && <Extra data={categoryData.extras} />}
        </TabPane>
        <TabPane
          tab={
            <span>
              <FaPuzzlePiece />
              Addon
            </span>
          }
          key="5"
        >
          {categoryData && <Addon data={categoryData.addons} />}
        </TabPane>
      </Tabs>
    </div>
  );
}