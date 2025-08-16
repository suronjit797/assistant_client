import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Input, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import PageHeader from "@/components/PageHeader";
import { TUser } from "@/interfaces/userInterface";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/api/usersApi";
import { setUser } from "@/redux/features/authSlice";
import { useUploadImageMutation } from "@/redux/mainApi";
import appConfig from "@/config/appConfig";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isFetching } = useGetProfileQuery(undefined);
  const userDetails = data?.data;

  const [updateUser, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [updateAvatar, { isLoading: isUploading }] = useUploadImageMutation();

  const [profileData, setProfileData] = useState<Partial<TUser>>({
    name: "",
    email: "",
    loginId: "",
    phone: "",
    avatar: {
      uid: "",
      name: "",
      status: "",
      url: "",
      size: 0,
    },
  });

  useEffect(() => {
    if (userDetails) {
      setProfileData({
        name: userDetails.name,
        email: userDetails.email,
        loginId: userDetails.loginId,
        phone: userDetails.phone,
        avatar: userDetails.avatar,
      });
    }
  }, [userDetails]);

  useEffect(() => {
    document.title = `${appConfig.name} - Edit Profile`;
  }, []);

  const handleFileUpload: UploadProps["beforeUpload"] = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);
    const { data } = await updateAvatar(formData).unwrap();
    setProfileData((pre) => ({ ...pre, avatar: data }));

    return false;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await updateUser(profileData).unwrap();
      dispatch(setUser(data));

      Swal.fire({
        title: "Success!",
        text: "Profile Updated Successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/profile");
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Spin spinning={isUpdating || isUploading || isFetching}>
      <PageHeader title="Profile" subTitle="Update Profile Information" />
      <div className="max-w-96 my-5">
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input
              type="text"
              name="name"
              value={profileData.name}
              onChange={onInputChange}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              value={profileData.email}
              onChange={onInputChange}
              placeholder="Enter your email"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <Input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={onInputChange}
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mt-3">Profile Photo</label>

            <Upload beforeUpload={handleFileUpload} showUploadList={false} accept="image/*" listType="picture-circle">
              {profileData.avatar?.url || userDetails?.avatar?.url ? (
                <img
                  src={profileData.avatar?.url || userDetails?.avatar?.url}
                  alt="Profile Photo"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <button className="w-28 h-2w-28" style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div className="mt-2">Upload</div>
                </button>
              )}
            </Upload>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="primary" htmlType="submit" disabled={!profileData.name}>
              Update
            </Button>
            <Button type="default" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Spin>
  );
}
