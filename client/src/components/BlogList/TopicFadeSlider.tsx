import React, { useState, useEffect, useRef } from "react";
import { Topic } from "../../models/blogPostModel";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Importing icons

interface TopicsSliderProps {
  topics: Topic[];
  selectedTopic: number | undefined;
  onTopicSelect: (topicId: number) => void;
}

const TopicFadeSlider: React.FC<TopicsSliderProps> = ({
  topics,
  selectedTopic,
  onTopicSelect,
}) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedIndex =
      selectedTopic !== undefined
        ? topics.findIndex((topic) => topic.id === selectedTopic)
        : 0;
    setCenterIndex(selectedIndex);
  }, [selectedTopic, topics]);

  const navigateTopics = (direction: "left" | "right") => {
    let newIndex = direction === "left" ? centerIndex - 1 : centerIndex + 1;
    if (newIndex < 0) newIndex = topics.length - 1;
    if (newIndex >= topics.length) newIndex = 0;
    setCenterIndex(newIndex);
    onTopicSelect(topics[newIndex].id);
  };

  return (
    <div className="flex items-center justify-center">
      <LeftOutlined
        onClick={() => navigateTopics("left")}
        className="cursor-pointer mx-2"
      />
      <div ref={containerRef} className="flex overflow-x-hidden">
        {topics.map((topic, index) => {
          const isCenter = index === centerIndex;
          return (
            <button
              key={topic.id}
              className={`px-4 py-2 ${
                !isCenter ? "text-stone-500" : "text-black"
              } transition-all`}
              style={{ opacity: isCenter ? 1 : 0.2 }}
              onClick={() => {
                setCenterIndex(index);
                onTopicSelect(topic.id);
              }}>
              {topic.name}
              <div
                className={`${
                  isCenter ? "bg-zinc-950" : "bg-stone-300"
                } h-0.5 w-full absolute bottom-0 left-0`}
              />
            </button>
          );
        })}
      </div>
      <RightOutlined
        onClick={() => navigateTopics("right")}
        className="cursor-pointer mx-2"
      />
    </div>
  );
};

export default TopicFadeSlider;
