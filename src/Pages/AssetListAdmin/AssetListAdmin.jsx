import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const AssetListAdmin = () => {
    const axiosPublic = useAxiosPublic()
    const {data: assetList} = useQuery({
        queryKey: ["allAssets"],
        queryFn: async () => {
            const response = await axiosPublic.get("/assets")
            return response.data;
        }
    })
    console.log(assetList)
  return (
    <div>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        Asset List
      </h1>
      <div className=" rounded-lg lg:text-right my-5">
        <form className="mx-auto flex justify-between items-center flex-col lg:flex-row gap-5">
          <div className="flex items-center gap-3">
            <label className="label">
              <span className="label-text">Filter by Status</span>
            </label>
            <select name="category" className="input input-bordered">
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
          <div>
            <button type="button" className="btn">
              Sort By Quantity: High to Low
            </button>
          </div>
          <div>
            <input
              name="search"
              className="text-sm p-[13px] md:w-[360px] w-[220px] border border-r-0"
              type="text"
              placeholder="Search by title"
            />
            <input
              type="submit"
              className="w-[110px] h-[50px] bg-[#FF444A] text-white rounded-r-lg font-semibold btn rounded-none"
              value="Search"
            ></input>
          </div>
        </form>
      </div>
      <div>
      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Product Name</th>
        <th>Product Quantity</th>
        <th>Date Added</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {
            assetList?.map((asset, index) =>  <tr key={index}>
                <th>{index + 1}</th>
                <td>{asset.assetName}</td>
                <td>{asset.assetQuantity}</td>
                <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                <td className=""><button  className="btn bg-orange-500 text-white">Update</button></td>
                <td className=""><button  className="btn bg-red-600 text-white">Delete</button></td>
              </tr>)
        }
      {/* row 1 */}
     
   
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default AssetListAdmin;
