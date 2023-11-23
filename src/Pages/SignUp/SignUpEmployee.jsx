import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignUpEmployee = () => {
    const navigate = useNavigate()
    const { createUser, updateUserProfile, socialLogIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSocialLogin = () => {
    socialLogIn()
    .then(result => {
        console.log(result.user)
        navigate('/')
    })
  }
  const onSubmit = (data) => {
    createUser(data.email, data.password)
    .then(result => {
        updateUserProfile(data.name) 
        .then(() => {
            console.log(result.user);
            navigate('/')
        })
    })

  };
  return (
    <div className="flex">
      <div className="hero min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="hero-content flex-col gap-5">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Join as Employee now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                   {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 16,
                    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
                  })}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                 {errors.password?.type === "required" && (
                  <p role="alert">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p role="alert">At least 8 character is required</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p role="alert">Maximum 16 characters are allowed</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p role="alert">
                    {" "}
                    at least one capital letter, one number, and one special
                    character is required
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date of Birth</span>
                </label>
                <input
                  {...register("dateofbirth")}
                  type="date"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
            </form>
            <div onClick={handleSocialLogin} className="flex flex-col justify-center items-center -mt-5">
                <h3 className="font-semibold">Sign Up with Social</h3>
                <hr className="border w-2/3 mt-2"/>
            <button className="btn bg-red-500 text-white my-5">
                <FaGoogle />
 
  Continue With Google
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpEmployee;
