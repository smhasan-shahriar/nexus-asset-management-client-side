import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const CustomRequestCard = ({ data, customRequestListRefetch }) => {
  const [updateClick, setUpdateClick] = useState(false);
  const axiosPublic = useAxiosPublic()
  const handleUpdate = (e) => {
    // axiosPublic.put(`/update-custom-request/${data._id}`)
    e.preventDefault()
    const form = e.target;
    const assetName = form.name.value;
    const assetType = form.type.value;
    const assetPrice = form.price.value;
    const assetImage = form.image.value;
    const requestReason = form.reason.value;
    const requestInfo = form.info.value;
    const updatedRequest = {assetName, assetType, assetPrice, assetImage, requestReason, requestInfo}
   
    axiosPublic.put(`/update-custom-request/${data._id}`, updatedRequest)
    .then(res => {
        if(res.data.modifiedCount > 0) {
            toast("Custom request successfully updated")
            setUpdateClick(false);
            document.getElementById("my_modal_1").close()
            customRequestListRefetch();
        }
    })

    
  }
  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={data.assetImage}
            alt="Shoes"
            className="w-full h-[250px] object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data.assetName}</h2>
          <p>Type: {data.assetType}</p>
          <p>Price: ${data.assetPrice}</p>
          <p>Status: {data.status}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="btn btn-primary"
            >
              View Details
            </button>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <p className="py-4">
                Press update details by pressing the Update Button
              </p>
              <div className="modal-action">
                <div className="">
                  <form onSubmit={handleUpdate} className="max-w-[380px] relative mr-16 md:mr-28 lg:mr-12">
                  <div className="flex lg:gap-5 flex-col ">
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">Asset Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Asset Name"
                          className="input input-bordered"
                          name="name"
                          required
                          disabled={!updateClick}
                          defaultValue={data.assetName}
                        />
                      </div>
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">Price</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Price"
                          className="input input-bordered"
                          name="price"
                          step="0.01"
                          required
                          disabled={!updateClick}
                          defaultValue={data.assetPrice}
                        />
                      </div>
                    </div>
                    <div className="flex gap-5 flex-col lg:flex-row">
                      <div className="form-control lg:w-1/5">
                        <label className="label">
                          <span className="label-text">Asset Type</span>
                        </label>
                        <select
                          disabled={!updateClick}
                          name="type"
                          className="input input-bordered"
                          defaultValue={data.assetType}
                        >
                          <option value="returnable">Returnable</option>
                          <option value="nonreturnable">Non Returnable</option>
                        </select>
                      </div>
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">Asset Image URL</span>
                        </label>
                        <input
                          disabled={!updateClick}
                          defaultValue={data.assetImage}
                          type="text"
                          placeholder="Image URL"
                          className="input input-bordered"
                          name="image"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex lg:gap-5 flex-col">
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">Why you need this</span>
                        </label>
                        <input
                          defaultValue={data.requestReason}
                          type="text"
                          placeholder="Why you need this"
                          className="input input-bordered"
                          name="reason"
                          required
                          disabled={!updateClick}
                        />
                      </div>
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">
                            Additional Information
                          </span>
                        </label>
                        <input
                          defaultValue={data.requestInfo}
                          type="text"
                          placeholder="Write Additional Information"
                          className="input input-bordered"
                          name="info"
                          required
                          disabled={!updateClick}
                        />
                      </div>
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">Requested Date</span>
                        </label>
                        <input
                          type="text"
                          disabled
                          className="input input-bordered"
                          defaultValue={new Date(data.dateAdded).toLocaleDateString()}
                          required
                        />
                      </div>
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">Status</span>
                        </label>
                        <input
                          type="text"
                          disabled
                          className="input input-bordered"
                          required
                          defaultValue={data.status}
                        />
                      </div>
                    </div>
                    {!updateClick && (
                      <div
                        className="btn normal-case text-lg font-semibold bg-blue-600 text-white my-5 mr-2"
                        onClick={() => setUpdateClick(true)}
                      >
                        Update
                      </div>
                    )}
                    {updateClick && (
                      <input
                        className="btn normal-case text-lg font-semibold bg-blue-600 text-white my-5 mr-2"
                         value="save"
                         type="submit"
                  
                  
                      />
                    )}
                     <button  onClick={() => {document.getElementById("my_modal_1").close(); setUpdateClick(false)}}  className="btn" type="button">
                      {" "}
                      {!updateClick ? "Close" : "Cancel"}
                    </button>
                  </form>
                </div>
                
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default CustomRequestCard;
