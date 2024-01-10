import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // console.log(data)
        // image upload to imgbb then get url
        const imgFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imgFile, {
            headers: {
                "content-type": "multipart/form-data",
            }
        });
        // console.log(res.data.data);
        if (res.data.success == true) {
            // send menu item data in mongoDB
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                price: parseFloat(data.price),
                category: data.category,
            }
            const menuRes = await axiosSecure.post('/menu', menuItem)
            // console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Item has been Added",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }

    return (
        <div>
            <SectionTitle Heading="Add an Item" subHeading="---What's new?---"
            > </SectionTitle>
            <div className="w-[992px] mx-auto p-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                        {errors.name && <span className='text-red-400'>Recipe name is required</span>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue='default' {...register("category")}
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
                            <input type="text" {...register("price", { required: true })} placeholder="price" className="input input-bordered" />
                            {errors.price && <span className='text-red-400'>Recipe name is required</span>}
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe details*</span>
                        </label>
                        {/* <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" /> */}

                        <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered" placeholder="Bio"></textarea>

                        {errors.recipe && <span className='text-red-400'>Recipe is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text"></span>
                        </label>
                        <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                        {errors.image && <span className='text-red-400'>Image is required</span>}
                    </div >
                    <button className="btn btn-error my-6">Add Item <FaUtensils></FaUtensils></button>
                </form>
            </div>

        </div>
    );
};

export default AddItems;