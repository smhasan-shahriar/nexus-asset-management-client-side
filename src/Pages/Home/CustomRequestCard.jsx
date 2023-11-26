import React from "react";

const CustomRequestCard = ({data}) => {
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
          <p>{data.assetType}</p>
          <p>Status: {data.status}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomRequestCard;
