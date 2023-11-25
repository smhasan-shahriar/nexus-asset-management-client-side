import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic()
  const [currentUser] = useRole();
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const dateOfBirth = form.dateOfBirth.value;
    const updateUser = {name, email, dateOfBirth}
    updateUserProfile(name)
    .then(() => {
        axiosPublic.put(`/users/${email}`, updateUser)
        .then(res => {
            if(res.data.modifiedCount > 0){
                toast('Successfully updated')
            }
        })

    })
    console.log(updateUser)
  }
  return (
    <div>
      <h1 className="text-5xl w-full bg-black flex justify-center items-center text-white py-20">
        Profile
      </h1>
      <div className="my-20 flex flex-col items-center">
        <div>
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={user?.photoURL}
            alt=""
          />
        </div>
        <div>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered"
                name="name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="text"
                defaultValue={user?.email}
                className="input input-bordered"
                name="email"
                disabled
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                placeholder="Product Quantity"
                className="input input-bordered"
                defaultValue={currentUser?.dateOfBirth}
                name="dateOfBirth"
                required
              />
            </div>

            <input
              className="btn normal-case text-lg font-semibold bg-black text-white my-5"
              type="submit"
              value="Update"
              disabled={!user}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
