import React, { useState } from "react";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useRole from "../../Hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import PrintComponent from "../../Components/PrintCompnent/PrintComponent";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "react-toastify";

const MyAssets = () => {
  const axiosPublic = useAxiosPublic();
  const [currentUser, pending] = useRole();
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [itemName, setItemName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setItemName(search);
  };

  const getMyAssets = async () => {
    const response = await axiosPublic.get(
      `/allrequests?emailSearch=${currentUser?.email}&statusSearch=${status}&typeSearch=${type}&itemNameSearch=${itemName}`
    );
    return response.data.singleResult;
  };
  const { data: myAssetList, refetch: myAssetListRefetch } = useQuery({
    queryKey: ["myAssets", currentUser, status, type, itemName],
    enabled: !pending,
    queryFn: getMyAssets,
  });
  const handleDeleteRequest = (id) => {
    axiosPublic.delete(`/delete-request/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast("The request has been cancelled");
        myAssetListRefetch();
      }
    });
  };
  const handleReturnRequest = (asset) => {
    const assetId = asset.assetId;
    console.log(assetId);
    axiosPublic
      .put(`/manage-request/${asset._id}`, {
        assetId: assetId,
        newStatus: "returned",
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast("item returned");
          myAssetListRefetch();
        }
      });
  };
  const handlePrint = (data) => {
    console.log(data);
    return (
      <PDFViewer>
        <PrintComponent data={data}></PrintComponent>
      </PDFViewer>
    );
  };
  return (
    <div>
      <Helmet>
        <title>Nexus | My Assets</title>
      </Helmet>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        My Assets
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
              onChange={(e) => setStatus(e.target.value)}
              name="category"
              defaultValue=""
              className="input input-bordered"
            >
              <option value="">No Selection</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="label">
              <span className="label-text">Filter by Asset Type</span>
            </label>
            <select
              onChange={(e) => setType(e.target.value)}
              name="category"
              defaultValue=""
              className="input input-bordered"
            >
              <option value="">No Selection</option>
              <option value="returnable">Returnable</option>
              <option value="nonreturnable">Non Returnable</option>
            </select>
          </div>
          <div>
            <input
              onChange={(e) => setItemName(e.target.value)}
              name="search"
              className="text-sm p-[13px] md:w-[360px] w-[220px] border border-r-0"
              type="text"
              placeholder="Search by Name"
            />
            <input
              type="submit"
              className="w-[110px] h-[50px] bg-[#FF444A] text-white rounded-r-lg font-semibold btn rounded-none"
              value="Search"
            ></input>
          </div>
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Request Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myAssetList?.map((asset, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{new Date(asset.requestedDate).toLocaleDateString()}</td>
                <td>
                  {asset.status === "approved" &&
                    new Date(asset.actionDate).toLocaleDateString()}
                  {asset.status === "rejected" && "request rejected"}
                  {asset.status === "pending" && ""}
                </td>
                <td>{asset.status}</td>
                <td className="">
                  {asset.status === "pending" && (
                    <button
                      onClick={() => handleDeleteRequest(asset._id)}
                      className="btn bg-red-500 text-white"
                    >
                      Cancel Request
                    </button>
                  )}
                  {asset.status === "approved" ||
                    (asset.status === "returned" && (
                      <button
                        onClick={() => handlePrint(asset)}
                        className="btn bg-green-500 text-white"
                      >
                        Print Details
                      </button>
                    ))}
                  {(asset.status === "approved" &&
                    asset.assetType === "returnable") ||
                    (asset.status === "returned" && (
                      <button
                        disabled={asset.status === "returned"}
                        onClick={() => handleReturnRequest(asset)}
                        className="btn bg-yellow-500 text-white"
                      >
                        Return Item
                      </button>
                    ))}
                </td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
