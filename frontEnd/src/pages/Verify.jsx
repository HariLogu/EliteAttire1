import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    async function verifyPayment() {
        try {
            if (!token) return null;
            const response = await axios.post(
                backendUrl + "/api/order/verifyStripe",
                { success, orderId },
                { headers: { token } }
            );
            if (response.data.success) {
                setCartItems({});
                navigate("/orders");
            } else {
                navigate("/cart");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return (
        <div className="grid min-h-[60vh]">
            <div className="w-[100px] h-[100px] self-center border-[5px] border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
        </div>
    );
};
export default Verify;


// ok