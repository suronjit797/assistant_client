import PageHeader from "@/components/PageHeader";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IBlog } from "@/interfaces/blogInterface";
import { useGetAllBlogQuery, useDeleteBlogMutation, useDeleteManyBlogMutation } from "@/redux/api/blogApi";
import { Button, Input, Spin, TableProps, Tag } from "antd";
import React, { Key, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import Swal from "sweetalert2";
import CustomTable from "@/components/CustomTable";
import BlogForm from "./BlogForm";

const { Search } = Input;

const Blog: React.FC = () => {
  const { queryParams, setQueryParams, getNonEmptyQueryParams, clearQueryParams } = useQueryParams({
    page: 1,
    limit: 10,
  });

  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;

  const { data: blogData, isFetching, refetch } = useGetAllBlogQuery(getNonEmptyQueryParams);
  const [deleteBlog, { isLoading: deleteLoading }] = useDeleteBlogMutation();
  const [deleteManyBlogs, { isLoading: deleteManyLoading }] = useDeleteManyBlogMutation();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<IBlog>>();
  const [data, setData] = useState<IBlog[]>(blogData?.data || []);

  useEffect(() => {
    if (blogData?.data) setData(blogData?.data);
  }, [isFetching, blogData?.data]);

  const onSearch = (value: string) => {
    setQueryParams({ search: value });
  };

  const handleRefresh = () => refetch();

  const rowSelection: TableProps<IBlog>["rowSelection"] = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
    getCheckboxProps: (record) => ({
      disabled: false,
      name: record._id,
    }),
  };

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Delete this blog?",
      text: "Please confirm your action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (!confirm.isConfirmed) return;
    try {
      await deleteBlog(id).unwrap();
      Swal.fire("Deleted!", "Blog deleted successfully.", "success");
    } catch {
      Swal.fire("Error!", "Failed to delete blog.", "error");
    }
  };

  const handleDeleteMany = async (ids: string[] | Key[]) => {
    const confirm = await Swal.fire({
      title: "Delete selected blogs?",
      text: "Please confirm your action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete all",
    });

    if (!confirm.isConfirmed) return;
    try {
      await deleteManyBlogs(ids).unwrap();
      Swal.fire("Deleted!", "Blogs deleted successfully.", "success");
    } catch {
      Swal.fire("Error!", "Failed to delete blogs.", "error");
    }
  };

  const handleEdit = (record: IBlog) => {
    setEditData({ ...record });
    setOpen(true);
  };

  const columns: TableProps<IBlog>["columns"] = [
    {
      title: "No.",
      align: "center",
      width: 60,
      render: (_t, _r, index) => (page - 1) * limit + (index + 1),
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Slug", dataIndex: "slug", key: "slug" },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (cat) => <Tag>{cat}</Tag>,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => tags?.map((t) => <Tag key={t}>{t}</Tag>),
    },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      align: "center",
      width: 200,
      render: (_t, record) => (
        <div className="flex gap-2 justify-center">
          <Button icon={<FiEdit />} type="default" onClick={() => handleEdit(record)} />
          <Button icon={<RiDeleteBin7Line />} danger type="primary" onClick={() => handleDelete(record._id)} />
        </div>
      ),
    },
  ];

  const isLoading = isFetching || deleteLoading || deleteManyLoading;

  return (
    <Spin spinning={isLoading}>
      <PageHeader title="Blogs" subTitle="All blogs" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex gap-2">
          <Search
            placeholder="Search diary..."
            onSearch={onSearch}
            enterButton
            value={queryParams.search as string}
            allowClear
            className="w-full !max-w-60"
          />
        </div>
        <div className="ms-auto flex gap-2">
          <Button type="primary" onClick={() => setOpen(true)} icon={<AiOutlinePlus />} />
          <Button type="primary" danger onClick={() => handleDeleteMany(selectedRowKeys)} icon={<RiDeleteBin7Line />} />
          <Button type="default" onClick={() => clearQueryParams()} icon={<MdOutlineFilterAltOff />} />
          <Button color="purple" variant="solid" onClick={handleRefresh} icon={<TfiReload />} />
        </div>
      </div>

      <div className="mt-4">
        <CustomTable
          data={data?.map((d) => ({ ...d, key: d._id })) || []}
          columns={columns}
          total={blogData?.meta?.total || 0}
          query={queryParams}
          setQuery={setQueryParams}
          rowSelection={rowSelection}
        />
      </div>

      <BlogForm
        open={open}
        setOpen={setOpen}
        mode={editData ? "edit" : "create"}
        data={editData}
        setData={setEditData}
      />
    </Spin>
  );
};

export default Blog;
