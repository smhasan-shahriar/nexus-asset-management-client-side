import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const RequestAsset = () => {
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
        <th>Asset Name</th>
        <th>Asset Type</th>
        <th>Availability</th>
        <th>Request</th>
      </tr>
    </thead>
    <tbody>
        {
            assetList?.map((asset, index) =>  <tr key={index}>
                <th>{index + 1}</th>
                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{parseInt(asset.assetQuantity) ? 'Available' : 'Out of Stock'}</td>
                <td className=""><button disabled={!parseInt(asset.assetQuantity)}  className="btn bg-blue-500 text-white">Request</button></td>
                
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

export default RequestAsset;