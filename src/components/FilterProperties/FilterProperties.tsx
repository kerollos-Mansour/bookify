export default function FilterProperties() {
    return (
        <div className="filter my-7">
            <h3 className="font-medium text-3xl mb-4">Filter By</h3>
            <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                <li className="flex items-center">
                    <input
                        id="hotel"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-4 border-gray-300 rounded text-primary-600 "
                    />

                    <label
                        htmlFor="hotel"
                        className="ml-2 text-sm font-medium text-black"
                    >
                        Hotel (56)
                    </label>
                </li>
                <li className="flex items-center">
                    <input
                        id="apartment"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-4 border-gray-300 rounded text-primary-600 "
                    />

                    <label
                        htmlFor="apartment"
                        className="ml-2 text-sm font-medium text-black"
                    >
                        apartment (56)
                    </label>
                </li>
                <li className="flex items-center">
                    <input
                        id="villa"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-4 border-gray-300 rounded text-primary-600 "
                    />

                    <label
                        htmlFor="villa"
                        className="ml-2 text-sm font-medium text-black"
                    >
                        villa (56)
                    </label>
                </li>
            </ul>
        </div>
    );
}
