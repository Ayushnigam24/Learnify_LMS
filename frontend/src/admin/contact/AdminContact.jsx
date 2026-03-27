import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../main";
import Layout from "../utils/Layout";

const AdminContact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get(
                    `${server}/admin/contacts`,
                    {
                        headers: {
                            token: localStorage.getItem("token"),
                        },
                    }
                );

                setContacts(res.data.contacts || []);
            } catch (err) {
                setError("Failed to load contacts");
                toast.error("Failed to load contacts");
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4  text-blue-800">Contact Messages</h1>

                {loading && <p>Loading messages...</p>}

                {!loading && error && (
                    <p className="text-red-500">{error}</p>
                )}

                {!loading && !error && contacts.length === 0 && (
                    <p className="text-gray-500">No messages found</p>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                    {contacts.map((c) => (
                        <div
                            key={c._id}
                            className="bg-white shadow rounded-lg p-4 border"
                        >
                            <h2 className="font-semibold">{c.name}</h2>
                            <p className="text-sm text-gray-600">{c.email}</p>
                            <p className="mt-2">{c.message}</p>

                            <div className="flex justify-between items-center mt-3">
                                <span className="text-xs text-gray-400">
                                    {new Date(c.createdAt).toLocaleString()}
                                </span>

                                <button
                                    onClick={async () => {
                                        if (!window.confirm("Delete this message?")) return;

                                        try {
                                            await axios.delete(`${server}/admin/contact/${c._id}`, {
                                                headers: {
                                                    token: localStorage.getItem("token"),
                                                },
                                            });

                                            setContacts((prev) =>
                                                prev.filter((x) => x._id !== c._id)
                                            );

                                            toast.success("Message deleted");
                                        } catch {
                                            toast.error("Delete failed");
                                        }
                                    }}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default AdminContact;