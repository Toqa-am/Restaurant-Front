import "../../SubModels.css";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import ImageTest from "../../../../../assets/global/profile.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../../../../axiosConfig/instance"; 
import Swal from "sweetalert2";

export default function Image({ data }) {
  const { id } = useParams();
  const initialImage = data ? `http://127.0.0.1:8000/storage/${data}` : ImageTest;
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const actions = document.querySelectorAll(".displayButton");

  useEffect(() => {
    if (selectedImage !== ImageTest) {
      actions.forEach((btn) => (btn.style.display = "flex"));
    } else {
      actions.forEach((btn) => (btn.style.display = "none"));
    }
  }, [selectedImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(ImageTest);
      setSelectedFile(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      Swal.fire("No Image Selected", "Please select an image to upload.", "error");
      return;
    }

    let url = '/api/admin/meals';
    let method = 'POST';

    const formData = new FormData();
    formData.append("image", selectedFile);

    if (id) {
      url = `/api/admin/meals/${id}`;
      method = 'POST';
      formData.append("_method", "PUT");
    }

    try {
      const response = await instance({
        url,
        method,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken"))
        }
      });

      if (id) {
        Swal.fire("Updated!", "The addon has been updated.", "success");
      } else {
        Swal.fire("Saved!", "The addon has been saved.", "success");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire("Error!", "Validation error occurred.", "error");
      } else {
        Swal.fire("Error!", "An error occurred while submitting the form.", "error");
      }
    }
  };

  const handleRefresh = () => {
    setSelectedImage(initialImage);
    setSelectedFile(null);
  };

  return (
    <div className="SubModel Image">
      <div className="preview" id="preview">
        <img src={selectedImage} alt="image" />
      </div>

      <div className="row">
        <div className="col">
          <label htmlFor="image" className="btn btn-primary">
            Upload New Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="col displayButton" style={{ display: "none" }}>
          <button className="btn btn-success" onClick={handleSave}>
            <FaCheckCircle />
            <span>save</span>
          </button>
        </div>
        <div className="col displayButton" style={{ display: "none" }}>
          <button className="btn btn-danger" onClick={handleRefresh}>
            <IoMdRefresh />
            <span>refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}
