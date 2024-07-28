import { Row, Col } from "antd";

export default function Information({ data }) {
  return (
    <div className="Information">
    <Row gutter={16}>
      <Col span={12}>
        <div className="d-flex align-items-center justify-content-between pt-2 pb-2">
          <label>Name</label>
          <span>{data.name}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-2 pb-2">
          <label>Status</label>
          <span>{data.status === 1 ? "Active" : "Inactive"}</span>
        </div>
      </Col>
      <Col span={24}>
        <div className="d-flex align-items-center justify-content-between pt-2 pb-2">
          <label>Description</label>
          <span>{data.description}</span>
        </div>
      </Col>
    </Row>
  </div>
  );
}
