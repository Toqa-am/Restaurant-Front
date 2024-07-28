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

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Information from "./Models/Information";
import Image from "./Models/Image";

export default function ShowItem() {
  const { id } = useParams();

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
          <Information />
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
          <Image />
        </TabPane>
      </Tabs>
    </div>
  );
}