import { Trash2, Mail, Smartphone, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import {
  useGetUserByIdQuery,
  useChangePasswordMutation,
  useUpdateUserByIdMutation,
  useDeleteUserMutation,
} from "../../../store/api/user.api";
import { storage } from "../../../utils/storage";

export default function SettingTap() {
  const userId = storage.getUser()?.id;
  const { data: profile, isLoading, isError } = useGetUserByIdQuery(userId!);

  // Mutations
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const [deleteUser, { isLoading: isDeletingAccount }] =
    useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdatingUser }] =
    useUpdateUserByIdMutation();

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
        description:
          "Keep your account safe with a secure password and by signing out of devices you're not actively using.",
        fields: [
          {
            label: "Email",
            value: profile.email || "Not provided",
            icon: <Mail className="w-4 h-4" />,
            action: "view", // Read-only
          },
          {
            label: "Mobile number",
            value: profile.phoneNo || "Not added",
            icon: <Smartphone className="w-4 h-4" />,
            action: profile.phoneNo ? "manage" : "add",
            onClick: () => setShowPhoneModal(true),
          },
          {
            label: "Change password",
            value: "",
            icon: <Lock className="w-4 h-4" />,
            action: "change",
            onClick: () => setShowPasswordModal(true),
          },
        ],
      },
      {
        title: "Account management",
        description:
          "Control other options to manage your data, like deleting your account.",
        fields: [
          {
            label: "Delete account",
            value: "Permanently delete your Expedia account and data",
            icon: <Trash2 className="w-4 h-4" />,
            destructive: true,
            action: "delete",
            onClick: () => setShowDeleteModal(true),
          },
        ],
      },
    ];
  }, [profile]);

  // Handler functions
  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
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
          phoneNo: phoneNumber, 
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
      await deleteUser(userId!).unwrap();
      setShowDeleteModal(false);
      // Logout and redirect
      storage.removeUser();
      storage.removeToken();
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  if (isLoading) return <p>Loading settings...</p>;
  if (isError) return <p>Failed to load settings</p>;

  return (
    <div className="bg-card rounded-3xl p-6 sm:p-8 border border-card-border shadow-sm">
      {/* Settings Sections */}
      <div className="space-y-8">
        {settingSections.map((section) => (
          <section key={section.title} className="space-y-6">
            {/* Section Header */}
            <div>
              <h2 className="text-lg font-semibold text-card-foreground mb-2">
                {section.title}
              </h2>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>

            {/* Divider */}
            <hr className="border-card-border" />

            {/* Fields */}
            <div className="space-y-6">
              {section.fields.map((field) => (
                <div key={field.label} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`mt-1 p-2 rounded-lg ${
                          field.destructive
                            ? "bg-red-100 text-red-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {field.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-card-foreground text-sm">
                          {field.label}
                        </h3>
                        {field.value && (
                          <p
                            className={`text-sm mt-1 ${
                              field.destructive
                                ? "text-red-600"
                                : "text-muted-foreground"
                            }`}
                          >
                            {field.value}
                          </p>
                        )}
                      </div>
                    </div>


                    {/* Action Button */}
                    {field.action !== "view" && (
                      <button
                        onClick={field.onClick}
                        disabled={
                          isChangingPassword ||
                          isUpdatingUser ||
                          isDeletingAccount
                        }
                        className={`text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${
                          field.destructive
                            ? "text-red-600 border-red-300 hover:bg-red-50 disabled:opacity-50"
                            : "text-blue-600 border-blue-300 hover:bg-blue-50 disabled:opacity-50"
                        }`}
                      >
                        {field.action === "add"
                          ? "Add"
                          : field.action === "change"
                          ? "Change"
                          : field.action === "delete"
                          ? "Delete"
                          : "Manage"}
                      </button>
                    )}
                  </div>


                  {/* Divider between fields */}
                  <hr className="border-card-border" />
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

              {/* THIS BUTTON WAS MISSING */}
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
            <h3 className="text-lg font-semibold text-gray-900">
              Update Phone Number
            </h3>
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

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Change Password
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const currentPassword = formData.get(
                  "currentPassword"
                ) as string;
                const newPassword = formData.get("newPassword") as string;
                const confirmPassword = formData.get(
                  "confirmPassword"
                ) as string;

                if (newPassword !== confirmPassword) {
                  alert("New passwords do not match!");
                  return;
                }

                handleChangePassword(currentPassword, newPassword);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  required
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  minLength={6}
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={6}
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  {isChangingPassword ? "Changing..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
