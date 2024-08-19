import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
    const [isSeller, setIsSeller] = useState(false); // State to handle seller checkbox

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            addresses: [{ country: "", city: "", address: "", NearbyLandMark: "", Pincode: "", addressType: "" }],
            role: "User" // Default role is "User"
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "addresses"
    });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        // Modify the role based on the checkbox
        if (isSeller) {
            data.role = "seller";
        }
        
        axios.post(`http://localhost:9001/users/createUser`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            console.log('User created successfully:', res);
            alert('User created successfully!');
            reset(); // Reset the form
            navigate('/'); // Navigate to the home page
        })
        .catch((err) => {
            console.error(err);
            alert(err);
        });
    }

    const handleSellerChange = (event) => {
        setIsSeller(event.target.checked);
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-7 col-md-8 col-sm-10 mx-auto">
                    <h2 className="text-center my-3">Register here</h2>
                    <p className="text-center">Please register account details</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Name"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                                {...register("phoneNumber", { required: "Phone Number is required" })}
                            />
                            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
                        </div>

                        {fields.map((item, index) => (
                            <div key={item.id} className="border p-3 mb-3">
                                <h5 className="mb-3">Your Address</h5>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor={`addresses.${index}.country`} className="form-label">Country</label>
                                        <input
                                            type="text"
                                            id={`addresses.${index}.country`}
                                            className={`form-control ${errors?.addresses?.[index]?.country ? "is-invalid" : ""}`}
                                            {...register(`addresses.${index}.country`, { required: "Country is required" })}
                                        />
                                        {errors?.addresses?.[index]?.country && <div className="invalid-feedback">{errors.addresses[index].country.message}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor={`addresses.${index}.city`} className="form-label">City</label>
                                        <input
                                            type="text"
                                            id={`addresses.${index}.city`}
                                            className={`form-control ${errors?.addresses?.[index]?.city ? "is-invalid" : ""}`}
                                            {...register(`addresses.${index}.city`, { required: "City is required" })}
                                        />
                                        {errors?.addresses?.[index]?.city && <div className="invalid-feedback">{errors.addresses[index].city.message}</div>}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor={`addresses.${index}.address`} className="form-label">Address</label>
                                    <input
                                        type="text"
                                        id={`addresses.${index}.address`}
                                        className={`form-control ${errors?.addresses?.[index]?.address ? "is-invalid" : ""}`}
                                        {...register(`addresses.${index}.address`, { required: "Address is required" })}
                                    />
                                    {errors?.addresses?.[index]?.address && <div className="invalid-feedback">{errors.addresses[index].address.message}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor={`addresses.${index}.NearbyLandMark`} className="form-label">Nearby Landmark</label>
                                    <input
                                        type="text"
                                        id={`addresses.${index}.NearbyLandMark`}
                                        className={`form-control ${errors?.addresses?.[index]?.NearbyLandMark ? "is-invalid" : ""}`}
                                        {...register(`addresses.${index}.NearbyLandMark`, { required: "Nearby Landmark is required" })}
                                    />
                                    {errors?.addresses?.[index]?.NearbyLandMark && <div className="invalid-feedback">{errors.addresses[index].NearbyLandMark.message}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor={`addresses.${index}.Pincode`} className="form-label">Pincode</label>
                                    <input
                                        type="number"
                                        id={`addresses.${index}.Pincode`}
                                        className={`form-control ${errors?.addresses?.[index]?.Pincode ? "is-invalid" : ""}`}
                                        {...register(`addresses.${index}.Pincode`, { required: "Pincode is required" })}
                                    />
                                    {errors?.addresses?.[index]?.Pincode && <div className="invalid-feedback">{errors.addresses[index].Pincode.message}</div>}
                                </div>
                            </div>
                        ))}

                        <div className="mt-4 mb-4 form-check">
                            <input
                                type="checkbox"
                                id="isSeller"
                                className="form-check-input"
                                onChange={handleSellerChange}
                            />
                            <label htmlFor="isSeller" className="form-check-label "><i><strong>Register as seller</strong></i></label>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="gstNo" className="form-label">GST Number</label>
                            <input
                                type="text"
                                id="gstNo"
                                className="form-control"
                                disabled={!isSeller} // Disable until the checkbox is checked
                                {...register("gstNo", { required: isSeller ? "GST Number is required" : false })}
                            />
                            {errors.gstNo && <div className="invalid-feedback">{errors.gstNo.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="storeName" className="form-label">Store Name</label>
                            <input
                                type="text"
                                id="storeName"
                                className="form-control"
                                disabled={!isSeller} // Disable until the checkbox is checked
                                {...register("storeName", { required: isSeller ? "Store Name is required" : false })}
                            />
                            {errors.storeName && <div className="invalid-feedback">{errors.storeName.message}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
