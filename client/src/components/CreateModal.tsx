import React, { ChangeEvent, useRef } from "react";
import { Modal, Row, Col, Input, Button, Image } from "antd";
import { Topic } from "../models/blogPostModel";
import { UserModel } from "../models/userModel";

interface CreateModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  handlePublish: () => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  coverImage: File | undefined;
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
        title="Publish Post"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        maskClosable
        keyboard
        centered
        width={"1000px"}
        bodyStyle={{ height: 300, borderRadius: "25px" }}>
        <Row gutter={16}>
          <Col span={12}>
            {coverImage ? (
              <Image
                src={URL.createObjectURL(coverImage)}
                alt="Cover"
                className="max-w-full h-auto rounded"
              />
            ) : (
              <div className="image-placeholder" onClick={triggerFileInput}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                  alt="Placeholder"
                  className=" w-2/4"
                />
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
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="text-xl font-semibold mt-4 p-2 rounded border-b-2 focus:outline-none"
            />
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
            <div className="mt-4">
              <Button type="primary" onClick={handlePublish}>
                Publish
              </Button>
              <Button
                type="default"
                onClick={handleCancel}
                style={{ marginLeft: "10px" }}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default CreateModal;
