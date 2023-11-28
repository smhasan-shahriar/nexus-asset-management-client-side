import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import useRole from "../../Hooks/useRole";
import { Link, useNavigate } from "react-router-dom";
import "./AssetList.css"
import { useEffect } from "react";

const AssetListAdmin = () => {
  const axiosPublic = useAxiosPublic();
  const [quantityIndex, setQuantityIndex] = useState("");
  const [searchField, setSearchField] = useState("");
  const [quantityStatus, setQuantityStatus] = useState("");
  const [currentUser, pending] = useRole();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate()
  const getAssets = async () => {
    const response = await axiosPublic.get(
      `/assets?sortField=assetQuantity&sortOrder=${quantityIndex}&search=${searchField}&quantityStatus=${quantityStatus}&companySearch=${currentUser?.userCompany}&page=${currentPage}&size=${itemsPerPage}`
    );
    return response.data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setSearchField(search);
  };
  const { data: assetList } = useQuery({
    queryKey: ["allAssets", quantityIndex, searchField, quantityStatus, itemsPerPage, currentPage],
    enabled: !pending,
    queryFn: getAssets,
  });
  const [count, setCount] = useState(0);
  const getAssetsCount = async () => {
    const response = await axiosPublic.get(
      `/assetscount?companySearch=${currentUser?.userCompany}`
    );
    return response.data;
  };
  const { data: assetListCount } = useQuery({
    queryKey: ["allAssetsCount"],
    enabled: !pending,
    queryFn: getAssetsCount,
    onSuccess: data => {
      setCount(data.count)
      console.log(data.count)
    }
  });
 useEffect(()=> {
  setCount(assetListCount.count)
 },[assetListCount])
 

  const numberOfPages = Math.ceil(count / itemsPerPage);
  console.log(count)
  const pages = [...Array(numberOfPages).keys()];
  const handleItemsPerPage = (e) => {
    const value = e.target.value;
    const number = parseInt(value);
    setItemsPerPage(number);
    setCurrentPage(0);
  };
  const handlePrevious = () => {
    if (currentPage === 0) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage === numberOfPages - 1) {
      setCurrentPage(numberOfPages - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Nexus | Asset List</title>
      </Helmet>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        Asset List
      </h1>
      <div className=" rounded-lg lg:text-right my-5">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex justify-between items-center flex-col lg:flex-row gap-5"
        >
          <div className="flex items-center gap-3">
            <label className="label">
              <span className="label-text">Filter by Status</span>
            </label>
            <select
              onChange={(e) => setQuantityStatus(e.target.value)}
              name="category"
              defaultValue=""
              className="input input-bordered"
            >
              <option value="">No Selection</option>
              <option value="available">Available</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="label">
              <span className="label-text">Sort by Quantity</span>
            </label>
            <select
              onChange={(e) => setQuantityIndex(e.target.value)}
              defaultValue=""
              name="category"
              className="input input-bordered"
            >
              <option value="">No Selection</option>
              <option value="asc">low to high</option>
              <option value="desc">high to low</option>
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
                <th>Product Name</th>
                <th>Product Quantity</th>
                <th>Date Added</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {assetList?.map((asset, index) => (
                <tr key={index}>
                  <th>{index + 1 + currentPage * itemsPerPage}</th>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetQuantity}</td>
                  <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                  <td className="">
                    <Link to={`/updateasset/${asset._id}`} className="btn bg-orange-500 text-white">
                      Update
                    </Link>
                  </td>
                  <td className="">
                    <button className="btn bg-red-600 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
        <div className="pagination">
        <p>Current Page : {currentPage + 1}</p>
        <button onClick={handlePrevious}>Previous</button>
        {pages.map((page) => (
          <button
            className={currentPage === page ? "selected" : ""}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNext}>Next</button>
        <select
          value={itemsPerPage}
          name=""
          id=""
          onChange={handleItemsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      </div>
    </div>
  );
};

export default AssetListAdmin;
