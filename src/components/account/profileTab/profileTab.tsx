import { useState, useEffect } from "react";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  FileText,
  AlertCircle,
  Heart,
  Edit2,
  Save,
  X,
} from "lucide-react";
import {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} from "../../../store/api/user.api";
import { User } from "../../../types/user.type";
import { storage } from "../../../utils/storage";

interface FormData extends Partial<User> {}

export default function ProfileTab() {
  const userId = storage.getUser()?.id;
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserByIdMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        username: profile.username || "",
        email: profile.email || "",
        phoneNo: profile.phoneNo || "",
        country: profile.country || "",
        dateOfBirth: profile.dateOfBirth
          ? profile.dateOfBirth.split("T")[0]
          : "",
        gender: profile.gender || "",
        bio: profile.bio || "",
        address: profile.address || "",
        emergencyContact: profile.emergencyContact || "",
        accessibilityNeeds: profile.accessibilityNeeds || "",
      });
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!userId) return;

    try {
      await updateUser({
        id: userId,
        body: formData,
      }).unwrap();

      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        username: profile.username || "",
        email: profile.email || "",
        phoneNo: profile.phoneNo || "",
        country: profile.country || "",
        dateOfBirth: profile.dateOfBirth
          ? profile.dateOfBirth.split("T")[0]
          : "",
        gender: profile.gender || "",
        bio: profile.bio || "",
        address: profile.address || "",
        emergencyContact: profile.emergencyContact || "",
        accessibilityNeeds: profile.accessibilityNeeds || "",
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="bg-card rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Failed to load profile
          </h3>
          <p className="text-muted-foreground">
            {error && "data" in error
              ? JSON.stringify(error.data)
              : "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Profile updated successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">
                {formData.name || formData.username || "User"}
              </h2>
              <p className="text-blue-100 text-sm">@{formData.username}</p>
              <p className="text-blue-100 text-xs mt-1">
                Member since{" "}
                {new Date(profile.createdAt || "").toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Edit/Save Buttons */}
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-background text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/30 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-6 py-3 bg-background text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <div className="space-y-8">
          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<UserIcon className="w-4 h-4" />}
                placeholder="Enter your full name"
              />
              <InputField
                label="Username"
                name="username"
                value={formData.username || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<UserIcon className="w-4 h-4" />}
                placeholder="Enter your username"
              />
              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                disabled={true} // Email should not be editable
                icon={<Mail className="w-4 h-4" />}
                placeholder="your.email@example.com"
              />
              <InputField
                label="Phone Number"
                name="phoneNo"
                value={formData.phoneNo || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<Phone className="w-4 h-4" />}
                placeholder="+1 234 567 8900"
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<Calendar className="w-4 h-4" />}
              />
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Gender
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                  </div>
                  <select
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all ${
                      isEditing
                        ? "bg-background border-input-border text-foreground"
                        : "bg-muted border-input-border cursor-not-allowed text-muted-foreground"
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Location Information */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Location Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Country"
                name="country"
                value={formData.country || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MapPin className="w-4 h-4" />}
                placeholder="Enter your country"
              />
              <InputField
                label="Address"
                name="address"
                value={formData.address || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MapPin className="w-4 h-4" />}
                placeholder="Enter your address"
              />
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Additional Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none ${
                    isEditing
                      ? "bg-background border-input-border text-foreground"
                      : "bg-muted border-input-border cursor-not-allowed text-muted-foreground"
                  }`}
                />
              </div>
              <InputField
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<Heart className="w-4 h-4" />}
                placeholder="Emergency contact number"
              />
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Accessibility Needs
                </label>
                <textarea
                  name="accessibilityNeeds"
                  value={formData.accessibilityNeeds || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Let us know if you have any accessibility requirements..."
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none ${
                    isEditing
                      ? "bg-background border-input-border text-foreground"
                      : "bg-muted border-input-border cursor-not-allowed text-muted-foreground"
                  }`}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Field Component
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  icon: React.ReactNode;
  placeholder?: string;
  type?: string;
}

function InputField({
  label,
  name,
  value,
  onChange,
  disabled,
  icon,
  placeholder,
  type = "text",
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all ${
            disabled
              ? "bg-muted border-input-border cursor-not-allowed text-muted-foreground"
              : "bg-background border-input-border text-foreground"
          }`}
        />
      </div>
    </div>
  );
}
