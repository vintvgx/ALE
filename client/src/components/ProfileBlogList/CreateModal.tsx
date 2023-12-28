import React, { ChangeEvent, useRef } from "react";
import { Modal, Row, Col, Input, Button, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Topic } from "../../models/blogPostModel";
import { UserModel } from "../../models/userModel";

interface CreateModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  handlePublish: () => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  coverImage: File | undefined;
  setCoverImage: (coverImage: File | undefined) => void;
  title: string;
  setTitle: (title: string) => void;
  topics: Topic[];
  selectedTopic: Topic | undefined;
  setSelectedTopic: (topic: Topic) => void;
  user: UserModel | null;
}

const CreateModal: React.FC<CreateModalProps> = ({
  isModalVisible,
  handleCancel,
  handlePublish,
  coverImage,
  handleImageChange,
  title,
  setTitle,
  topics,
  selectedTopic,
  setSelectedTopic,
  user,
  setCoverImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="h-full">
      <Modal
        title=""
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="link" onClick={handlePublish}>
            Publish
          </Button>,
          <Button
            key="back"
            type="text"
            className="cancel-button"
            onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        maskClosable
        keyboard
        centered
        width={"1000px"}
        bodyStyle={{ height: 300, borderRadius: "25px", marginTop: "20px" }}>
        <Row gutter={16}>
          <Col span={12}>
            {coverImage ? (
              <div className="relative image-placeholder flex flex-col items-center justify-center text-2xl cursor-pointer">
                <Image
                  src={URL.createObjectURL(coverImage)}
                  alt="Cover"
                  width={350}
                  className="rounded"
                />
                <Button
                  className="absolute bottom-0 right-5"
                  type="default"
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the click event of the parent div
                    setCoverImage(undefined);
                  }}></Button>
              </div>
            ) : (
              <div
                className="image-placeholder flex items-center justify-center text-2xl cursor-pointer hover:bg-gray-200"
                onClick={triggerFileInput}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                  alt="Placeholder"
                  style={{ width: "300px " }}
                />
                <span className="absolute text-gray-700 text-base">
                  Choose Cover
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  id="imageInput"
                  style={{ display: "none" }}
                />
              </div>
            )}
            <div className="flex justify-center items-center">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="text-xl flex text-center font-semibold p-2 rounded border-b-2 focus:outline-none"
              />
            </div>
          </Col>
          <Col span={12}>
            <span className=" text-lg ">
              Publishing to: {user?.first_name ?? ""} {user?.last_name ?? ""}
            </span>
            <p className="text-sm mb-2">
              Choose a topic or assign your own topic.{" "}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                padding: "10px",
              }}>
              {topics.map((topic, index) => (
                <Button
                  //   className=" text-gray-400 hover:text-green-400 outline-green-600"
                  key={index}
                  type={selectedTopic?.id === topic.id ? "primary" : "default"}
                  onClick={() => handleTopicSelect(topic)}>
                  {topic.name}
                </Button>
              ))}
            </div>
            <Input
              placeholder="Add a topic"
              // onChange={(e) => /* handle topic change */}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default CreateModal;
