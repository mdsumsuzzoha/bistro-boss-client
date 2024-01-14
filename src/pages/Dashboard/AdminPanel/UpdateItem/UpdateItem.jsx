import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";

const UpdateItem = () => {
    const item = useLoaderData();
    const axiosSecure = useAxiosSecure();
    console.log(item);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change Role"
        }).then((result) => {
            if (result.isConfirmed) {
                const itemInfo = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat( data.price),
                    recipe: data.recipe,
                }
                axiosSecure.patch(`/menu/${item._id}`, itemInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            // refetch();
                            Swal.fire({
                                title: "Changed!",
                                text: `${item.name} Updated`,
                                icon: "success"
                            });
                            reset();
                        }
                    })



            }
        });
    }
    // const handleUpdateUser = (user) => {
        
    // }

    return (
        <div>
            <SectionTitle Heading="UPDATE ITEM" 
            > </SectionTitle>
            <div className="w-[992px] mx-auto p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} 
                        defaultValue={item.name}
                        placeholder="name" className="input input-bordered" />
                        {errors.name && <span className='text-red-400'>Recipe name is required</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={item.category} {...register("category")}
                                className="select select-bordered w-full max-w-x">
                                <option disabled value='default'>Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizaa">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                            {errors.name && <span className='text-red-400'>Recipe name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="text" {...register("price", { required: true })}
                            defaultValue={item.price}
                            placeholder="price" className="input input-bordered" />
                            {errors.price && <span className='text-red-400'>Recipe name is required</span>}
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe details*</span>
                        </label>
                        {/* <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" /> */}

                        <textarea {...register("recipe", { required: true })}
                        defaultValue={item.recipe}
                         className="textarea textarea-bordered" placeholder="Bio"></textarea>

                        {errors.recipe && <span className='text-red-400'>Recipe is required</span>}
                    </div>
                    {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text"></span>
                        </label>
                        <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                        {errors.image && <span className='text-red-400'>Image is required</span>}
                    </div > */}
                    <button type="submit" className="btn btn-error my-6">Update Recipe Details<FaUtensils></FaUtensils></button>
                </form>
            </div>

        </div>
    );
};

export default UpdateItem;