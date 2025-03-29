import { Button, Spin } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import appConfig from "@/config/appConfig";
import { useGetProfileQuery } from "@/redux/api/usersApi";
import PageHeader from "@/components/PageHeader";

export default function Profile() {
  const { data, isFetching } = useGetProfileQuery(undefined);
  const userDetails = data?.data;

  console.log({ userDetails });

  useEffect(() => {
    document.title = `${appConfig.name} - Profile`;
  }, []);

  return (
    <Spin spinning={isFetching}>
      <div className="">
        <PageHeader title="Profile" subTitle="Your Profile Information" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 primary_text mt-8">
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="w-32 font-medium">Full Name</span>
              <span>: {userDetails?.name || "--"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 font-medium">Email</span>
              <span>: {userDetails?.email || "--"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 font-medium">Login ID</span>
              <span>: {userDetails?.loginId || "--"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 font-medium">Phone Number</span>
              <span>: {userDetails?.phone ? `+6${userDetails.phone}` : "--"}</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {userDetails?.avatar?.url ? (
              <img src={userDetails?.avatar?.url} alt="Profile" className="rounded-full h-36 w-36 object-cover" />
            ) : (
              <div className="h-36 w-36 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500"></span>
              </div>
            )}
            <div className="mt-3 primary_text">Profile Photo</div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Link to="/profile/edit">
            <Button type="primary">Edit</Button>
          </Link>
          <Link to="/">
            <Button type="default">Cancel</Button>
          </Link>
        </div>
      </div>
    </Spin>
  );
}
