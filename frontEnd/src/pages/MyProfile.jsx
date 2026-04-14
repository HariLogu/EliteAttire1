import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const MyProfile = () => {
    const { token, backendUrl } = useContext(ShopContext);
    const [user, setUser] = useState({ name: "", email: "", mobile: "" });

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const response = await fetch(`${backendUrl}/api/user/profile`, {
                    headers: { token },
                });
                const data = await response.json();
                if (data.success) setUser(data.user);
                else toast.error(data.message);
            } catch (err) {
                console.log(err);
                toast.error("Failed to fetch profile");
            }
        };
        fetchUser();
    }, [token]);

    return (
        <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow-sm">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>

            <div className="mb-4">
                <label>Name</label>
                <input
                    value={user.name}
                    readOnly
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label>Email</label>
                <input
                    value={user.email}
                    readOnly
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label>Mobile</label>
                <input
                    value={user.mobile}
                    readOnly
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                />
            </div>
        </div>
    );
};

export default MyProfile;
