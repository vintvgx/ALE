import React, { useState, useEffect, useRef } from "react";
import { Topic } from "../models/blogPostModel";

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
    const selectedIndex = topics.findIndex(
      (topic) => topic.id === selectedTopic
    );
    setCenterIndex(selectedIndex);
    // Scroll to center the selected topic
    if (containerRef.current) {
      containerRef.current.scrollLeft = getCenterScrollLeft(selectedIndex);
    }
  }, [selectedTopic, topics]);

  const getCenterScrollLeft = (index: number) => {
    if (!containerRef.current) return 0;

    const containerWidth = containerRef.current.clientWidth;
    const itemWidth = containerRef.current.scrollWidth / topics.length;

    return index * itemWidth - containerWidth / 2 + itemWidth / 2;
  };

  const handleTopicClick = (topicId: number, index: number) => {
    onTopicSelect(topicId);
    setCenterIndex(index);
  };

  return (
    <div
      ref={containerRef}
      className="flex p-4 overflow-x-scroll ml-4 justify-center"
      style={{ scrollBehavior: "smooth" }}>
      {topics.map((topic, index) => {
        const isCenter = index === centerIndex;
        const isLeft = index === centerIndex - 1;
        const isRight = index === centerIndex + 1;

        const opacity = isCenter ? 1 : 0.2;

        return (
          <button
            key={topic.id}
            className={`px-4 py-2 ${
              !isCenter ? "text-stone-500" : "text-black"
            } relative transition-all hover:text-zinc-950`}
            style={{
              opacity,
              zIndex: isCenter ? 1 : 0,
              transform: isLeft
                ? "translateX(-30%)"
                : isRight
                ? "translateX(30%)"
                : "none",
            }}
            onClick={() => handleTopicClick(topic.id, index)}>
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
  );
};

export default TopicFadeSlider;
