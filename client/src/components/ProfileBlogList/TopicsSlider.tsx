// TopicsSlider.jsx
import React from "react";
import { Topic } from "../../models/blogPostModel";

interface TopicsSliderProps {
  topics: Topic[];
  selectedTopic: number | undefined;
  onTopicSelect: (topicId: number) => void;
}

const TopicsSlider: React.FC<TopicsSliderProps> = ({
  topics,
  selectedTopic,
  onTopicSelect,
}) => (
  <div className="flex p-4 overflow-x-scroll ml-4">
    {topics.map((topic) => (
      <button
        key={topic.id}
        className={`px-4 py-2 text-stone-300 relative transition-all hover:text-zinc-950 ${
          selectedTopic === topic.id ? "text-zinc-950" : "text-stone-300"
        }`}
        onClick={() => onTopicSelect(topic.id)}>
        {topic.name}
        {/* Gray line that takes up the width */}
        <div
          className={`${
            selectedTopic === topic.id ? "bg-zinc-950" : "bg-stone-300"
          } h-0.5 w-full absolute bottom-0 left-0`}
        />
      </button>
    ))}
  </div>
);

export default TopicsSlider;
