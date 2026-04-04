import { useEffect, useState } from "react"
import Logincard from "../components/Logincard"
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";
import { HiLockClosed } from "react-icons/hi";
import NewLogin from "./NewLogin";
import api from "../api/axios";

const Dashboard = () => {

    const [loginCards, setLoginCards] = useState([]);
    const [editingCard, setEditingCard] = useState(null);

    const user = useAuthStore(state => state.user);
    const justLoggedIn = useAuthStore(state => state.justLoggedIn);
    const setJustLoggedIn = useAuthStore(state => state.setJustLoggedIn);

    const loading = useAuthStore(state => state.loading);
    const setLoading = useAuthStore(state => state.setLoading);

    const handleEdit = (id, name, username, password) => {
        setEditingCard({ id, name, username, password });
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/dashboard/delete/${id}`);
            setLoginCards(prevCards => prevCards.filter(card => card._id !== id));
            toast.success("Login deleted")
        } catch (err) {
            toast.error("Error while deleting")
        }
    }

    useEffect(() => {
        if (justLoggedIn) {
            toast.success(`Welcome back ${user.name}`)
        }
        setJustLoggedIn(false);
    }, [justLoggedIn])

    const fetchlogincards = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/dashboard/logins");
            setLoading(false);
            setLoginCards(data.decryptedCards);
        } catch (err) {
            setLoading(false);
            toast.error(`Error ${err.message}`)
        }
    }
    useEffect(() => {
        fetchlogincards()
    }, [])

    useEffect(() => {
        let toastId;
        if (loading) {
            toastId = toast.loading("Loading...");
        }
        return () => toast.dismiss(toastId);
    }, [loading]);

    return (
        <div className="h-screen">
            {loading ? (
                <div>
                </div>
            ) : (
                editingCard ? (
                    <NewLogin
                        id={editingCard.id}
                        name={editingCard.name}
                        username={editingCard.username}
                        password={editingCard.password}
                        onCardUpdate={
                            updatedCard => {
                                setLoginCards(prevCards =>
                                    prevCards.map(card => (card._id === updatedCard._id ? updatedCard : card))
                                )
                                setEditingCard(null);
                            }}
                    />
                ) :
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
                        {loginCards && loginCards.length > 0 ? (
                            loginCards.map((loginCard) => (
                                <Logincard key={loginCard._id} id={loginCard._id} name={loginCard.name} username={loginCard.username} password={loginCard.password} deleteCard={(id) => handleDelete(id)} editCard={(id, name, username, password) => handleEdit(id, name, username, password)} />
                            ))
                        ) : (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-24 gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                                    <HiLockClosed className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-900 font-semibold text-base">No logins saved yet</p>
                                    <p className="text-gray-400 text-sm mt-1">Add your first login to get started</p>
                                </div>
                            </div>
                        )}
                    </div>
            )
            }
        </div>
    );
}

export default Dashboard
