import "../DataTable.css";
import { Tabs } from "antd";
import { FaInfoCircle, FaImage, FaThLarge, FaPlus, FaPuzzlePiece } from "react-icons/fa";
import { useParams, useHistory } from "react-router-dom";
import Information from "./Models/Information";
import Image from "./Models/Image";
import Variations from "./Models/Variations";
import Extra from "./Models/Extra";
import Addon from "./Models/Addon";
import React, { useEffect, useState } from "react";
import instance from '../../../../axiosConfig/instance';

export default function ShowItem() {
  const { id } = useParams();
  const history = useHistory();
  const [mealData, setMealData] = useState(null);

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
        fetchDataMeal(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataMeal = async (mealId) => {
    try {
      const res = await instance.get(`/api/admin/meals/${mealId}`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken"))
        }
      });
      setMealData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ShowItem ItemsTabs">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          className="TabPane"
          tab={
            <span>
              <FaInfoCircle />
              Information
            </span>
          }
          key="1"
        >
          {mealData && <Information data={mealData} />}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaImage />
              Images
            </span>
          }
          key="2"
        >
          {mealData && <Image data={mealData.image} />}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaThLarge />
              Variations
            </span>
          }
          key="3"
        >
          {mealData && <Variations data={mealData.meal_size_costs} />}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaPlus />
              Extra
            </span>
          }
          key="4"
        >
          {mealData && <Extra data={mealData.extras} />}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FaPuzzlePiece />
              Addon
            </span>
          }
          key="5"
        >
          {mealData && <Addon data={mealData.addons} />}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
