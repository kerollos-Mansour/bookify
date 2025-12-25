import { useState } from "react";
import { Tag, Copy, Check, Calendar, Percent } from "lucide-react";
import { useToast } from "../../UI/ToastProvider/ToastProvider";
import { useGetAllCouponsQuery } from "../../../store/api/coupon.api";
import { Coupon } from "../../../types/coupon.type";

export default function CouponsTab() {
  const toast = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Mock data - replace with API call
  // const [coupons] = useState<Coupon[]>([
  //   {
  //     _id: "1",
  //     code: "WINTER2025",
  //     discount: 20,
  //     discountType: "percentage",
  //     description: "Get 20% off on all hotel bookings",
  //     expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  //     minPurchase: 100,
  //     maxDiscount: 50,
  //     isActive: true,
  //     usedCount: 0,
  //     maxUses: 1,
  //   },
  //   {
  //     _id: "2",
  //     code: "NEWYEAR50",
  //     discount: 50,
  //     discountType: "fixed",
  //     description: "$50 off on bookings over $200",
  //     expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  //     minPurchase: 200,
  //     isActive: true,
  //     usedCount: 0,
  //     maxUses: 1,
  //   },
  //   {
  //     _id: "3",
  //     code: "FLASH15",
  //     discount: 15,
  //     discountType: "percentage",
  //     description: "Flash sale! 15% off for the next 24 hours",
  //     expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
  //     isActive: true,
  //     usedCount: 0,
  //     maxUses: 1,
  //   },
  // ]);
  // fetch
  const {
    data: coupons = [],
    isLoading,
    error,
  } = useGetAllCouponsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log("Raw response:", coupons);
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Coupon code copied!", `Use code: ${code} at checkout`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getDaysRemaining = (validTo: string) => {
    const days = Math.ceil(
      (new Date(validTo).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const activeCoupons = coupons.filter(
    (c) => c.isActive && (c.usedCount || 0) < c.usageLimit
  );
  const usedCoupons = coupons.filter((c) => (c.usedCount || 0) >= c.usageLimit);

  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
            <Tag className="w-8 h-8 text-white" />
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold">My Coupons</h2>
            <p className="text-purple-100 text-sm">
              {activeCoupons.length} active coupon
              {activeCoupons.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Active Coupons */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5 text-purple-600" />
            Available Coupons
          </h3>
          {activeCoupons.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No active coupons</p>
              <p className="text-gray-400 text-sm mt-1">
                Check back later for exclusive deals!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCoupons.map((coupon) => {
                const daysRemaining = getDaysRemaining(coupon.validTo);
                const isExpiringSoon = daysRemaining <= 3;

                return (
                  <div
                    key={coupon._id}
                    className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 overflow-hidden group hover:shadow-lg transition-all"
                  >
                    {/* Decorative circles */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl"></div>

                    <div className="relative">
                      {/* Discount Badge */}
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                        <Percent className="w-4 h-4" />
                        {coupon.discountType === "percentage"
                          ? `${coupon.discountValue}% OFF`
                          : `$${coupon.discountValue} OFF`}
                      </div>

                      {/* Description */}
                      <p className="text-gray-900 font-semibold mb-2">
                        {coupon.discountType === "percentage"
                          ? `Get ${coupon.discountValue}% off on your bookings`
                          : `Get $${coupon.discountValue} off on your bookings`}
                      </p>

                      {/* Coupon Code */}
                      <div className="bg-white rounded-xl p-3 mb-4 border-2 border-dashed border-purple-300">
                        <div className="flex items-center justify-between">
                          <code className="text-purple-700 font-mono font-bold text-lg">
                            {coupon.code}
                          </code>
                          <button
                            onClick={() => copyCode(coupon.code)}
                            className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                          >
                            {copiedCode === coupon.code ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy className="w-5 h-5 text-purple-600" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        {coupon.minPurchase && (
                          <p className="text-gray-600">
                            • Min. purchase: ${coupon.minPurchase}
                          </p>
                        )}
                        {coupon.maxDiscount && (
                          <p className="text-gray-600">
                            • Max. discount: ${coupon.maxDiscount}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span
                            className={
                              isExpiringSoon ? "text-red-600 font-semibold" : ""
                            }
                          >
                            Expires in {daysRemaining} day
                            {daysRemaining !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Used Coupons */}
        {usedCoupons.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Used Coupons
            </h3>
            <div className="space-y-3">
              {usedCoupons.map((coupon) => (
                <div
                  key={coupon._id}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 opacity-60"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <code className="text-gray-600 font-mono font-bold">
                        {coupon.code}
                      </code>
                      <p className="text-gray-500 text-sm mt-1">
                        {coupon.discountType === "percentage"
                          ? `Get ${coupon.discountValue}% off on your bookings`
                          : `Get $${coupon.discountValue} off on your bookings`}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-semibold">
                      Used
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* How to Use */}
        <section className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            How to use coupons
          </h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Click the copy button to copy the coupon code</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>Proceed to checkout with your booking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>Paste the code in the "Promo Code" field</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <span>Enjoy your discount!</span>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
}
