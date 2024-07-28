import "../Models.css";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import instance from '../../../../axiosConfig/instance';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { update } from "../../../../Store/action";

function Categories() {
  const dispatch = useDispatch();
  const updated = useSelector((state) => state.updated);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    status: "",
  });

  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  const handleChange = (e) => {
    const { name, value, id, files } = e.target;
    if (name === "status") {
      setCategory(prevCategory => ({
        ...prevCategory,
        status: id === "active" ? 1 : 0
      }));
    } else if (name === "image") {
      setCategory({ ...category, image: files[0] });
    } else {
      setCategory({ ...category, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    formData.append("status", category.status);
    if (category.image) {
      formData.append("image", category.image);
    }
  
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("AdminToken"))
      }
    };
    console.log("Request Configuration:", config);
  
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.post('/api/admin/categories', formData, config)
          .then((response) => {
            Swal.fire("Saved!", "The category has been saved.", "success");
            dispatch(update(!updated));
            closeModel();
          })
          .catch((error) => {
            if (error.response && error.response.status === 422) {
              setErrors(error.response.data.errors);
              Swal.fire("Error!", "Validation error occurred.", "error");
            } else {
              Swal.fire("Error!", "An error occurred while submitting the form.", "error");
            }
          });
      }
    });
  };
  


  return (
    <div id="AddTable">
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>{window.location.pathname.replace("/admin/dashboard/", "")}</h3>

          <div className="closeSidebar">
            <HiXMark onClick={closeModel} />
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={category.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    value={category.description}
                    onChange={handleChange}
                    required
                  />
                  {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        id="active" 
                        onChange={handleChange}
                        checked={category.status === 1}
                        required 
                      />
                      <span>Active</span>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        id="inactive" 
                        onChange={handleChange}
                        checked={category.status === 0}
                        required 
                      />
                      <span>Inactive</span>
                    </div>
                  </div>
                  {errors.status && <div className="text-danger">{errors.status}</div>}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    onChange={handleChange}
                  />
                  {errors.image && <div className="text-danger">{errors.image}</div>}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">Save</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModel}
                >
                  <HiXMark />
                  <span className="ps-2">Close</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Categories;
