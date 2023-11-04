import React, { useState } from "react";
import "./App.css";
import img1 from "./images/image-1.webp";
import img2 from "./images/image-2.webp";
import img3 from "./images/image-3.webp";
import img4 from "./images/image-4.webp";
import img5 from "./images/image-5.webp";
import img6 from "./images/image-6.webp";
import img7 from "./images/image-7.webp";
import img8 from "./images/image-8.webp";
import img9 from "./images/image-9.webp";
import remove from "./images/delete.png";
import { AiOutlineCheckCircle, } from "react-icons/ai";
import { BiSolidCloudUpload } from "react-icons/bi"

//get the img datas 
const DATA = [
  { id: "1", image: img1, isFeatured: true },
  { id: "2", image: img2 },
  { id: "3", image: img3 },
  { id: "4", image: img4 },
  { id: "5", image: img5 },
  { id: "6", image: img6 },
  { id: "7", image: img7 },
  { id: "8", image: img8 },
  { id: "9", image: img9 },
];

function App() {
  const [items, setItems] = useState(DATA);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  // for dragging
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetItem) => {
    if (draggedItem === targetItem) {
      return; // Prevent dropping on itself
    }

    const updatedItems = [...items];
    const draggedIndex = items.findIndex((item) => item === draggedItem);
    const targetIndex = items.findIndex((item) => item === targetItem);

    // Swap the positions of the dragged item and the target item
    [updatedItems[draggedIndex], updatedItems[targetIndex]] = [
      updatedItems[targetIndex],
      updatedItems[draggedIndex],
    ];

    setItems(updatedItems);
    setDraggedItem(null);
  };

  //for img addign 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newItem = { id: String(items.length + 1), image: URL.createObjectURL(file) };
      setItems([...items, newItem]);
    }
  };

  //select img 
  const handleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  //delete img 
  const handleDeleteSelected = () => {
    const updatedItems = items.filter((item) => !selectedImages.includes(item.id));
    setItems(updatedItems);
    setSelectedImages([]);
  };

  return (
    <div className="container mb-5">
      <h1 className="my-4 text-center">Image Gallery</h1>

      {selectedImages.length > 0 && (
        <div class="h4 pb-2 mb-4 text-danger border-bottom border-danger">

          <div className="d-flex justify-content-between">
            <p className="fs-2"> {selectedImages.length} Image Selected</p>
            <img src={remove} alt="" onClick={handleDeleteSelected} style={{ width: "70px", height: "65px", marginRight: "5px" }} />

          </div>
        </div>
      )}


      <div className="container">
        <div className="row">
          {items.map((item, index) => (
            <div
              className={
                index === 0
                  ? "col-md-4 mb-3"
                  : "col-md-3 mb-3"
              }
              key={item ? item.id : null}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(item)}
            >
              {item ? (
                <div className="card">
                  <img
                    src={item.image}
                    onClick={() => handleImageSelection(item.id)}
                    className="img-fluid"
                    alt=""
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, item)}
                  />
                  {selectedImages.includes(item.id) && (
                    <div className="position-absolute top-0 end-0">
                      <AiOutlineCheckCircle size={28} color="black" />
                    </div>
                  )}
                </div>
              ) : null}
            </div>

          ))}


          <div className="col-md-3  d-flex flex-column align-items-center justify-content-center border border-2 border-gray-300 border-dotted rounded-lg cursor-pointer bg-gray-50 ">
            <label htmlFor="dropzone-file" class="d-flex flex-column align-items-center justify-content-center">
              <BiSolidCloudUpload size={100} />
              <p class="mb-2 text-sm text-gray-500"><span class="fw-bold">Click to upload</span> or drag and drop</p>
              <p class="text-xs text-gray-500">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
            </label>
            <input id="dropzone-file" type="file" class="visually-hidden" onChange={handleFileChange} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
