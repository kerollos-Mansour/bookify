import React, { useState, useEffect } from "react";

interface FormData {
    cardNumber: string;
    bank: string;
    expDate: string;
    cvv: string;
}

interface CardPreview {
    number: string;
    bank: string;
    expiry: string;
    cardType: string;
}

const detectCardType = (number: string): string => {
    const cleaned = number.replace(/\s/g, "");
    if (/^4/.test(cleaned)) return "Visa";
    if (/^5[1-5]/.test(cleaned)) return "Mastercard";
    if (/^3[47]/.test(cleaned)) return "Amex";
    if (/^6/.test(cleaned)) return "Discover";
    return "Card";
};

export default function PaymentTap() {
    const [edit, setEdit] = useState<boolean>(true);
    const [formData, setFormData] = useState<FormData>({
        cardNumber: "",
        bank: "",
        expDate: "",
        cvv: "",
    });

    const [cardPreview, setCardPreview] = useState<CardPreview>({
        number: "•••• •••• •••• ••••",
        bank: "Bank Name",
        expiry: "MM/YY",
        cardType: "Card",
    });

    // Update preview whenever formData changes
    useEffect(() => {
        const cleanedNumber = formData.cardNumber.replace(/\s/g, "");
        const showLast4 =
            cleanedNumber.length > 0
                ? "•••• •••• •••• " + cleanedNumber.slice(-4)
                : "•••• •••• •••• ••••";

        setCardPreview({
            number: formData.cardNumber || showLast4,
            bank: formData.bank || "Bank Name",
            expiry: formData.expDate || "MM/YY",
            cardType:
                cleanedNumber.length >= 1
                    ? detectCardType(cleanedNumber)
                    : "Card",
        });
    }, [formData]);

    const formatCardNumber = (value: string): string => {
        const cleaned = value.replace(/\D/g, "").slice(0, 16);
        return cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    };

    const formatExpDate = (value: string): string => {
        const cleaned = value.replace(/\D/g, "").slice(0, 4);
        if (cleaned.length >= 3) {
            return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
        }
        return cleaned;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Payment card added:", formData);
        alert("Card added successfully! (Demo)");
    };

    return (
        <div className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
                {/* Card Preview */}
                <div className="relative bg-linear-to-br from-blue-600 to-indigo-800 rounded-2xl p-8 text-white mb-8 shadow-2xl h-56 w-100 mx-auto">
                    {/* Chip & Contactless */}
                    <div className="absolute top-6 left-6 flex gap-4">
                        <svg
                            className="w-10 h-10 text-white/70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>

                    {/* Card Type & Bank */}
                    <div className="absolute top-6 right-8 text-right">
                        <div className="text-xl font-bold">
                            {cardPreview.cardType}
                        </div>
                        <div className="text-sm opacity-90">
                            {cardPreview.bank}
                        </div>
                    </div>

                    {/* Card Number */}
                    <div className="absolute top-24 left-8 right-8 font-mono text-2xl tracking-wider">
                        {cardPreview.number}
                    </div>

                    {/* Expiry */}
                    <div className="absolute bottom-8 left-8">
                        <div className="text-xs opacity-80">Valid Thru</div>
                        <div className="font-mono text-lg">
                            {cardPreview.expiry}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Card Number
                        </label>
                        <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => {
                                const formatted = formatCardNumber(
                                    e.target.value
                                );
                                setFormData((prev) => ({
                                    ...prev,
                                    cardNumber: formatted,
                                }));
                            }}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            disabled={edit}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-gray-50/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Bank
                        </label>
                        <select
                            value={formData.bank}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    bank: e.target.value,
                                }))
                            }
                            disabled={edit}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-gray-50/50"
                        >
                            <option value="">Select Bank</option>
                            <option value="QNB">QNB</option>
                            <option value="CIB">CIB</option>
                            <option value="HSBC">HSBC</option>
                            <option value="NBE">National Bank of Egypt</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                value={formData.expDate}
                                onChange={(e) => {
                                    const formatted = formatExpDate(
                                        e.target.value
                                    );
                                    setFormData((prev) => ({
                                        ...prev,
                                        expDate: formatted,
                                    }));
                                }}
                                placeholder="MM/YY"
                                maxLength={5}
                                disabled={edit}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-gray-50/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                CVV
                            </label>
                            <input
                                type="text"
                                value={formData.cvv}
                                onChange={(e) => {
                                    const cvv = e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 4);
                                    setFormData((prev) => ({ ...prev, cvv }));
                                }}
                                placeholder="123"
                                maxLength={4}
                                disabled={edit}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-gray-50/50"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={edit}
                        className="w-full bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-101 hover:shadow-2xl"
                    >
                        Add Card
                    </button>
                    <div className="text-center underline cursor-pointer select-none">
                        <div
                            onClick={() => {
                                setEdit(!edit);
                                alert(
                                    edit
                                        ? "now you can change"
                                        : "now you can't  change"
                                );
                            }}
                        >
                            Edit Card
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-600 mt-6">
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.5C16,17.1 15.4,17.7 14.8,17.7H9.2C8.6,17.7 8,17.1 8,16.5V12.6C8,12 8.6,11.4 9.2,11.4V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11.5H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
                        </svg>
                        <span>
                            Your card information is secure and encrypted
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
