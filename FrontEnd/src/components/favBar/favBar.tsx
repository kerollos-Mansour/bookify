import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/favoritesContext";

export default function FavBarSection() {
  const { favorites, openSidebar, setOpenSidebar, removeFavorite } =
    useFavorites();



  const navigate = useNavigate();

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <div className="flex">
        {/* <button
          onClick={toggleSidebar}
          className="p-3 bg-blue-600 text-white rounded-md m-3 hover:bg-blue-700 transition"
        >
          {openSidebar ? "Close" : "Trips"}
        </button> */}

        {openSidebar && (
          <div
            onClick={() => setOpenSidebar(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}

        <aside
          className={`fixed top-0 right-0 h-full w-2/5 bg-white shadow-xl p-6 z-50 transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center w-full mb-6">
              <button
                onClick={() => setOpenSidebar(false)}
                className="top-0 left-0 w-8 h-2 items-center justify-center cursor-pointer mb-6 rounded-xl"
              >
                <img
                  className="hover:bg-blue-200 rounded-2xl"
                  src="./src/assets/close-x-svgrepo-com.svg"
                />
              </button>

              <button
                onClick={() => setOpenSidebar(false)}
                className="flex items-center text-lg gap-2 font-medium text-blue-600 cursor-pointer rounded-full hover:bg-blue-100 transition p-2"
              >
                <img
                  className="w-5 h-5"
                  src="./src/assets/add-icon.svg"
                  alt="plan"
                />
                Plan a trip
              </button>
            </div>

            <h2 className="font-bold text-3xl mt-4 mb-4">Trips</h2>

            <div
              onClick={() => navigate("/Trips")}
              className="border border-gray-300 rounded-2xl p-3 mb-4 cursor-pointer hover:shadow-md transition bg-white"
            >
              <h3 className="font-medium text-lg">Go to your trips</h3>
              <p className="font-medium text-sm text-gray-500">
                View your booking and saves
              </p>
            </div>

            {favorites.length === 0 ? (
              <p className="text-gray-500">No saved properties yet.</p>
            ) : (
              <ul className="space-y-3">
                {favorites.map((item) => (
                  <li
                    key={item.id}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.address}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="text-red-500 font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}