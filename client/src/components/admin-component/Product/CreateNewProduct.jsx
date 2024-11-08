import React,{useState} from 'react';


const CreateNewProduct = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsUploading(true);
            setUploadProgress(0);

            // Simulate upload progress for demonstration
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                }
            }, 200);
        }
    };

    return(
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-black text-xl font-bold">Create New Product</h6>
                        <button
                            className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Add New Product
                        </button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gray-200 mt-6">
                    <form>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="Polo T-Shirt"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Product SKU Code
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="SKU0123456789"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4 mt-6">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Product Get Price
                                    </label>
                                    <input
                                        type="number"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="0.00"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4 mt-6">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Product Sell Price
                                    </label>
                                    <input
                                        type="number"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="0.00"
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-12/12 px-4 mt-6">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="image-upload"
                                    >
                                        Upload Product Image
                                    </label>
                                    <input
                                        type="file"
                                        id="image-upload"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        onChange={handleImageUpload}
                                    />

                                    {isUploading && (
                                        <div className="relative pt-1 mt-4">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div>
                                                    <span
                                                        className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                                      Uploading...
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs font-semibold inline-block text-blue-600">
                                                      {uploadProgress}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                                <div
                                                    style={{width: `${uploadProgress}%`}}
                                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-wrap mt-6">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Product Description
                                    </label>
                                    <textarea
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        defaultValue="This is Test Product Description"
                                        rows="4"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default CreateNewProduct;