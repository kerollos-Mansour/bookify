import { Trash2, Mail, Smartphone, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import {
  useGetUserByIdQuery,
  useChangePasswordMutation,
  useAddMobileNumberMutation,
  useDeleteAccountMutation, useUpdateUserByIdMutation
} from "../../../store/api/user.api";
import { storage } from "../../../utils/storage";
console.log("STORED USER:", storage.getUser());

export default function SettingTap() {
  const userId = storage.getUser()?.id;
  const { data: profile, isLoading, isError } = useGetUserByIdQuery(userId!);

  // Mutations
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [addMobileNumber, { isLoading: isAddingPhone }] = useAddMobileNumberMutation();
  const [deleteAccount, { isLoading: isDeletingAccount }] = useDeleteAccountMutation();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserByIdMutation();

  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [phoneInput, setPhoneInput] = useState(profile?.phoneNo || "");


  const settingSections = useMemo(() => {
    if (!profile) return [];

    return [
      {
        title: "Sign-in and security",
        description: "Keep your account safe with a secure password and by signing out of devices you're not actively using.",
        fields: [
          {
            label: "Email",
            value: profile.email || "Not provided",
            icon: <Mail className="w-4 h-4" />,
            action: "view" // Read-only
          },
          {
            label: "Mobile number",
            value: profile.phoneNo || profile.phone || "Not added",
            icon: <Smartphone className="w-4 h-4" />,
            action: profile.phoneNo || profile.phone ? "manage" : "add",
            onClick: () => setShowPhoneModal(true)
          },
          {
            label: "Change password",
            value: "",
            icon: <Lock className="w-4 h-4" />,
            action: "change",
            onClick: () => setShowPasswordModal(true)
          },
        ],
      },
      {
        title: "Account management",
        description: "Control other options to manage your data, like deleting your account.",
        fields: [
          {
            label: "Delete account",
            value: "Permanently delete your Expedia account and data",
            icon: <Trash2 className="w-4 h-4" />,
            destructive: true,
            action: "delete",
            onClick: () => setShowDeleteModal(true)
          },
        ],
      },
    ];
  }, [profile]);

  // Handler functions
  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      setShowPasswordModal(false);
      // Show success message (you can use toast or alert)
      alert("Password changed successfully!");
    } catch (error) {
      // Show error message
      console.error("Failed to change password:", error);
      alert("Failed to change password. Please try again.");
    }
  };

  const handleSavePhone = async (phoneNumber: string) => {
    try {
      if (!userId) return;
       if (!/^\+?\d+$/.test(phoneNumber)) {
        alert("Phone number must contain only numbers.");
        return;
      }
      await updateUser({
        id: userId,
        body: {
          phoneNo: phoneNumber, // 👈 must match backend field
        },
      }).unwrap();

      setShowPhoneModal(false);
      alert("Phone number updated successfully!");
    } catch (error) {
      console.error("Failed to update phone:", error);
      alert("Failed to update phone number.");
    }
  };


  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(userId!).unwrap();
      setShowDeleteModal(false);
      // Logout and redirect
      storage.removeUser(); // Assuming you have this method
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  if (isLoading) return <p>Loading settings...</p>;
  if (isError) return <p>Failed to load settings</p>;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
      {/* Settings Sections */}
      <div className="space-y-8">
        {settingSections.map((section) => (
          <section key={section.title} className="space-y-6">
            {/* Section Header */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {section.title}
              </h2>
              <p className="text-sm text-gray-600">
                {section.description}
              </p>
            </div>

            {/* Divider */}
            <hr className="border-gray-300" />

            {/* Fields */}
            <div className="space-y-6">
              {section.fields.map((field) => (
                <div key={field.label} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`mt-1 p-2 rounded-lg ${field.destructive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                        {field.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {field.label}
                        </h3>
                        {field.value && (
                          <p className={`text-sm mt-1 ${field.destructive ? 'text-red-600' : 'text-gray-600'
                            }`}>
                            {field.value}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    {field.action !== "view" && (
                      <button
                        onClick={field.onClick}
                        disabled={isChangingPassword || isAddingPhone || isDeletingAccount}
                        className={`text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${field.destructive
                          ? 'text-red-600 border-red-300 hover:bg-red-50 disabled:opacity-50'
                          : 'text-blue-600 border-blue-300 hover:bg-blue-50 disabled:opacity-50'
                          }`}
                      >
                        {field.action === "add" ? "Add" :
                          field.action === "change" ? "Change" :
                            field.action === "delete" ? "Delete" : "Manage"}
                      </button>
                    )}
                  </div>

                  {/* Divider between fields */}
                  <hr className="border-gray-300" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete account
            </h3>

            <p className="text-sm text-gray-600">
              This action is permanent and cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              {/* ✅ THIS BUTTON WAS MISSING */}
              <button
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
              >
                {isDeletingAccount ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Update Phone Number</h3>
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full border px-3 py-2 rounded-lg"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPhoneModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePhone(phoneInput)}
                disabled={isUpdatingUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                {isUpdatingUser ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}