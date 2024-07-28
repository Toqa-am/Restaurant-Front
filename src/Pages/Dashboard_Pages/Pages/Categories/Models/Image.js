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
  const initialImage = data ? `${instance.defaults.baseURL}/storage/${data}` : ImageTest;
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

    let url = '/api/admin/categories';
    let method = 'POST';

    const formData = new FormData();
    formData.append("image_file", selectedFile);

    if (id) {
      url = `/api/admin/categories/${id}`;
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
        Swal.fire("Updated!", "The category has been updated.", "success");
      } else {
        Swal.fire("Saved!", "The category has been saved.", "success");
      }

      if (response.data.data.image) {
        setSelectedImage(`${instance.defaults.baseURL}/storage/${response.data.data.image}`);
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
          />
        </div>
        <div className="col displayButton">
          <button className="btn btn-success" onClick={handleSave}>
            <FaCheckCircle />
            <span>Save</span>
          </button>
        </div>
        <div className="col displayButton">
          <button className="btn btn-danger" onClick={handleRefresh}>
            <IoMdRefresh />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}
